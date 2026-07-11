# US09.2.1 — Voter sur un ticket en temps réel

**En tant que** participant à une room de planning poker
**Je veux** voter sur le ticket en cours
**Afin d'** estimer la complexité avec mon équipe

Prolonge US09.1.1 (room, séquence Fibonacci fixe), US09.1.2 (join par code, jeton d'accès room-
scopé) et EN09.1 (isolation WebSocket par room, `PokerChannelInterceptor`/`RoomAccessGrantService`,
en-tête natif `access-token`). Ne couvre que la création de ticket et le vote lui-même — la
**révélation** (déclenchée par le facilitateur, calcul du consensus) est le périmètre exclusif
d'US09.2.2, qui dépend de cette US.

**Cadrage ADR-026 §2 (périmètre v1 figé) :** deck Fibonacci fixe uniquement (`PokerCardDeck`,
aucun deck personnalisable) ; aucune statistique de distribution des votes (différée v2+) ; **le
masquage vaut pour absolument tout le monde, y compris le facilitateur** — contrairement au
précédent rétrospective (US20.1.2a, `RetroCardWsController`/`CardAddedFacilitatorEvent`) où un
canal de prévisualisation facilitateur non masqué existe, le planning poker n'a **aucun** canal
équivalent : la « révélation simultanée » évoquée par le stub signifie que même le facilitateur ne
voit aucune valeur avant l'action de révélation d'US09.2.2. Toute équivalence structurelle avec le
précédent retro s'arrête donc au principe de masquage lui-même (compteur d'agrégat public, jamais
la valeur), pas à l'existence d'un canal secondaire.

## Critères d'acceptation

### Création de ticket (backend `pivot-agilite-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une room active appartenant au tenant de l'appelant dont l'appelant est le facilitateur, when `POST /api/agilite/poker/rooms/{roomId}/tickets` avec `{ "title": "<1-200 caractères>" }`, then la réponse est 201 avec `{ id, roomId, title, status: "VOTING", createdAt }` et un événement `TICKET_CREATED` est broadcasté sur `/topic/agilite/poker/{roomId}` (`{ type: "TICKET_CREATED", roomId, ticketId, title, createdAt }`, aucune valeur de vote — il n'y en a pas encore) | ⬜ |
| Given un ticket vient d'être créé, when un participant interroge `GET /api/agilite/poker/rooms/{roomId}/tickets/current`, then la réponse 200 renvoie ce ticket (même forme que ci-dessus) — nécessaire pour qu'un participant qui rejoint la room *après* la création du ticket (STOMP manqué) puisse quand même afficher le ticket actif et voter | ⬜ |
| Given aucune room de ce tenant n'a de ticket `VOTING` en cours, when `GET .../tickets/current`, then la réponse 200 renvoie `null` (pas une erreur — état légitime avant le premier ticket) | ⬜ |
| Given un ticket déjà `VOTING` existe pour cette room, when le facilitateur tente `POST .../tickets` à nouveau, then la requête est rejetée (voir AC erreur `ACTIVE_TICKET_EXISTS`) — un seul ticket ouvert à la fois par room, la création du suivant n'est possible qu'après révélation (US09.2.2) | ⬜ |

### Voter sur le ticket en cours (STOMP)

| Critère | 🤖 Dev |
|---------|--------|
| Given un participant présentant un jeton d'accès room valide (grant EN09.1) et un ticket `VOTING` existant dans cette room, when il envoie `SEND /app/agilite/poker/{roomId}/vote` avec l'en-tête natif `access-token` et le corps `{ ticketId, value }` (`value` ∈ `PokerCardDeck.FIBONACCI_VALUES`, incluant `"?"`), then le vote est persisté (une ligne par `(ticket, participant)`) et un événement masqué `VOTE_CAST` est broadcasté à **tous** les abonnés de `/topic/agilite/poker/{roomId}` (`{ type: "VOTE_CAST", roomId, ticketId, votedCount, totalParticipants }`) — **aucune valeur de carte, d'aucun participant, n'apparaît jamais dans ce payload, y compris pour le facilitateur** | ⬜ |
| Given un participant qui a déjà voté sur le ticket en cours, when il envoie un nouveau `SEND .../vote` avec une valeur différente avant toute révélation, then son vote précédent est remplacé (pas de doublon — une seule ligne par `(ticket, participant)`) et `votedCount` du `VOTE_CAST` rediffusé reste inchangé (un changement de vote ne compte pas comme un vote supplémentaire) | ⬜ |
| Given deux jetons d'accès distincts obtenus pour la même room (deux onglets/participants), when chacun vote sur le même ticket, then `votedCount` reflète bien 2 participants distincts et les deux votes restent indépendants (upsert par participant, jamais par session) | ⬜ |
| Given un facilitateur qui a lui-même une chaise de vote (voir clarification Gate 1 ci-dessous — le facilitateur reçoit désormais son propre jeton d'accès room dès la création), when il vote comme n'importe quel participant, then son vote suit exactement les mêmes règles (masqué pour lui-même aussi, compté dans `votedCount`) | ⬜ |
| Given `totalParticipants`, when il est calculé, then il correspond au nombre de participants ayant rejoint la room (facilitateur inclus, via le registre de présence — voir Notes d'implémentation) dont le jeton d'accès n'a pas expiré — **pas** une mesure de connexion WebSocket instantanée (voir Hors périmètre) | ⬜ |

### Compteur temps réel « X/Y ont voté »

| Critère | 🤖 Dev |
|---------|--------|
| Given un `VOTE_CAST` reçu par un client, when l'UI l'affiche, then seuls `votedCount` (X) et `totalParticipants` (Y) sont rendus (« X/Y ont voté ») — jamais une valeur de carte ni une identité de participant | ⬜ |
| Given plusieurs votes/changements de vote consécutifs sur le même ticket, when chacun est traité, then chaque `VOTE_CAST` rediffusé porte un `votedCount`/`totalParticipants` recalculés à jour (pas de compteur en cache périmé côté serveur) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `roomId` inexistant ou appartenant à un autre tenant, when `POST` ou `GET .../tickets*`, then 404 — même convention anti-énumération qu'US09.1.1/US09.1.2 (`RoomNotFoundException`), jamais 403 | ⬜ |
| Error : given un appelant authentifié, même tenant, mais **pas** le facilitateur de la room, when `POST .../tickets`, then 403 `{ code: "FACILITATOR_ONLY" }` (nouvelle exception poker dédiée, ne réutilise pas `RetroFacilitatorOnlyException` — modules distincts) | ⬜ |
| Error : given un ticket déjà `VOTING` dans la room, when `POST .../tickets` (tentative de 2ᵉ ticket concurrent), then 409 `{ code: "ACTIVE_TICKET_EXISTS" }` — garantie applicative **et** contrainte structurelle en base (index unique partiel `WHERE status = 'VOTING'`, même précédent que `agilite.wheel_entry`/US14.1.1) | ⬜ |
| Error : given un titre de ticket vide ou > 200 caractères, when `POST .../tickets`, then 400 `{ code: "INVALID_TITLE" }` | ⬜ |
| Error : given un `ticketId` inexistant, ou existant mais appartenant à une **autre room** que celle de la destination STOMP `/app/agilite/poker/{roomId}/vote`, when `SEND .../vote`, then le vote est rejeté silencieusement pour le broadcast (aucun `VOTE_CAST` émis) et une notification d'erreur est envoyée uniquement à l'émetteur sur `/user/queue/errors` — jamais une confirmation d'existence cross-room | ⬜ |
| Error : given un ticket déjà révélé (`status = "REVEALED"` — état qu'US09.2.2 pourra produire), when `SEND .../vote` sur ce ticket, then le vote est rejeté (notification d'erreur à l'émetteur seul, aucun broadcast) — le vote n'est plus modifiable après révélation | ⬜ |
| Error : given une `value` qui n'appartient pas à `PokerCardDeck.FIBONACCI_VALUES`, when `SEND .../vote`, then le vote est rejeté (notification d'erreur à l'émetteur seul, aucun broadcast, aucune persistance) | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` (token porteur) sur les deux endpoints REST — jamais acceptés depuis le corps, un query param ou un header custom (règle transversale du repo) | ⬜ |
| Security : l'autorisation de vote sur le canal WebSocket repose exclusivement sur le grant `(roomId, accessToken)` déjà vérifié par `PokerChannelInterceptor` (EN09.1) avant que le handler STOMP ne s'exécute — aucun `userId` client n'est jamais requis ni fait confiance pour identifier le votant ; l'identité du votant pour la déduplication `(ticket, participant)` est dérivée du jeton d'accès lui-même, jamais d'un champ du payload | ⬜ |
| Security : le jeton d'accès brut n'est **jamais** persisté en base — la clé de déduplication `agilite.poker_votes.participant_key` est un hachage SHA-256 (hex) du jeton, jamais le jeton en clair (défense en profondeur : une fuite de la table `poker_votes` ne permet pas de rejouer un jeton encore valide) | ⬜ |
| Security : test TI obligatoire (inspection du payload STOMP brut, même rigueur qu'`RetroCardSubmissionIT`) prouvant qu'**aucun** abonné — participant ou facilitateur — ne reçoit jamais une valeur de vote ni une identité de votant avant révélation, y compris en inspectant les octets bruts de la trame (pas seulement la désérialisation typée) | ⬜ |
| Security : test TI cross-room obligatoire — un `ticketId` valide d'une room A envoyé sur la destination `/app/agilite/poker/{roomB}/vote` d'une room B est rejeté, aucun `VOTE_CAST` broadcasté sur B | ⬜ |

### Frontend (`pivot-agilite-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given le facilitateur connecté au salon (après création ou consultation de sa room), when aucun ticket n'est actif, then un formulaire « Créer un ticket » (titre) lui est proposé ; les participants non-facilitateurs ne voient jamais ce formulaire | ⬜ |
| Given un ticket actif (reçu via `TICKET_CREATED` ou chargé via `GET .../tickets/current` à la connexion), when l'UI l'affiche, then son titre est visible par tous les participants de la room | ⬜ |
| Given un ticket actif, when un participant consulte les cartes de vote, then les valeurs Fibonacci exactes de la room (`cardValues`, déjà transmises par US09.1.1/US09.1.2 — jamais recalculées côté client) s'affichent sous forme de boutons cliquables | ⬜ |
| Given un participant clique sur une carte, when le vote est envoyé, then **seule sa propre sélection** est mise en évidence localement (état de composant, jamais dérivé d'un événement serveur) — le serveur ne renvoie jamais la valeur choisie par quiconque | ⬜ |
| Given un participant a déjà voté, when il clique sur une autre carte avant toute révélation, then sa sélection locale bascule sur la nouvelle carte et un nouveau `SEND .../vote` est envoyé (changement de vote, pas d'accumulation de votes) | ⬜ |
| Given des événements `VOTE_CAST` reçus, when l'UI les traite, then le compteur « X/Y ont voté » se met à jour en direct pour tous les participants, sans jamais afficher une valeur de carte | ⬜ |
| Given une erreur réseau/STOMP lors de l'envoi d'un vote, when elle survient, then un message d'erreur non bloquant s'affiche et la sélection locale précédente (dernier vote confirmé envoyé) reste affichée — pas d'état incohérent laissé à l'écran | ⬜ |

### A11y

| Critère | 🤖 Dev |
|---------|--------|
| A11y : les boutons de carte sont des éléments `<button>` natifs, navigables au clavier, avec `aria-pressed` reflétant la sélection locale du participant | ⬜ |
| A11y : le compteur « X/Y ont voté » est une région `aria-live="polite"` — mise à jour de texte annoncée automatiquement au lecteur d'écran sans navigation manuelle | ⬜ |
| A11y : tous les libellés (formulaire de création de ticket, cartes, compteur, erreurs) sont externalisés via Transloco (`fr.json`/`en.json`) — aucune chaîne littérale dans les templates | ⬜ |

## Hors périmètre

- **Révélation des votes et calcul du consensus** (moyenne/médiane/valeur majoritaire) — US09.2.2, qui dépend directement de cette US et consomme telle quelle la forme `{ ticketId, value }` persistée ici
- **Distribution/dispersion des votes** à la révélation — confirmé hors périmètre v1 par ADR-026 §2
- **Deck de cartes personnalisable** (T-shirt, suite custom) — ADR-026 §2, US09.1.3 non écrite
- **Participation anonyme** (`ROLE_GUEST`, `sessionId` temporaire) — US09.3.1, périmètre séparé ; cette US ne couvre que les participants authentifiés du tenant (même modèle d'accès qu'US09.1.2)
- **Présence temps réel précise** (un participant déconnecté retiré immédiatement du dénominateur `Y`) — `totalParticipants` reflète le registre des jetons d'accès actifs (rafraîchi à chaque connexion), pas une détection de fermeture de connexion WebSocket ; un participant qui ferme son onglet sans revenir reste compté jusqu'à expiration de son jeton (aligné sur l'expiration de la room, US09.1.1)
- **Historique des tickets précédents d'une room** (liste des tickets déjà révélés) — pas d'endpoint de liste ; seul le ticket `VOTING` courant est exposé (`GET .../tickets/current`)
- **Notification "un participant a rejoint/quitté"** — hors périmètre de cette US, non demandé par le stub

## Notes d'implémentation

- **Clarification Gate 1 (gap découvert en lisant le code réel d'US09.1.1) :** `PokerRoomService#create` ne mint aujourd'hui **aucun** grant d'accès WebSocket pour le facilitateur (seul `#join`, US09.1.2, le fait pour un participant) — `CreateRoomComponent` (frontend) ne se connecte d'ailleurs jamais en STOMP après création. Sans correction, le facilitateur ne pourrait recevoir aucun `TICKET_CREATED`/`VOTE_CAST`, ni voter lui-même. Cette US **corrige ce gap** en étendant `PokerRoomService#create` pour émettre le même grant que `#join` (registre de présence inclus) et en ajoutant un champ `accessToken` (nullable) à `RoomResponse`, peuplé uniquement sur le chemin de création (`GET /rooms/{id}` continue de renvoyer `accessToken: null` — pas de re-mint sur une simple lecture). Extension additive, non un changement de contrat de module (`PivotModule`) — aucune coordination `pivot-core`/`pivot-ui` requise.
- **Backend** `pivot-agilite-core` (schéma `agilite`, pliage dans `V1__schema_init.sql` tant que la BETA n'est pas déclarée) :
  - `agilite.poker_tickets` : `id UUID PK`, `room_id UUID NOT NULL` (FK → `agilite.poker_rooms.id` `ON DELETE CASCADE`), `title VARCHAR(200) NOT NULL`, `status VARCHAR(20) NOT NULL DEFAULT 'VOTING'` (`CHECK IN ('VOTING','REVEALED')`), `created_at`, `revealed_at` (nullable, écrit par US09.2.2). Index unique partiel `WHERE status = 'VOTING'` sur `room_id` — un seul ticket ouvert par room, même précédent que `wheel_entry`/US14.1.1.
  - `agilite.poker_votes` : `id UUID PK`, `ticket_id UUID NOT NULL` (FK → `agilite.poker_tickets.id` `ON DELETE CASCADE`), `participant_key CHAR(64) NOT NULL` (hex SHA-256 du jeton d'accès), `value VARCHAR(10) NOT NULL`, `created_at`, `updated_at`. Contrainte unique `(ticket_id, participant_key)` — upsert par participant.
  - Nouveau package `fr.pivot.agilite.poker.ticket` (entité/repository/service/controller/dto, `PokerTicketController` sous `/poker/rooms/{roomId}/tickets`) et `fr.pivot.agilite.poker.vote` (entité/repository/service/dto + `fr.pivot.agilite.poker.vote.ws.PokerVoteWsController`, `@MessageMapping("/poker/{roomId}/vote")` — destination déjà anticipée telle quelle par `PokerRateLimitEnforcementIT`, EN09.1).
  - Nouveau `PokerParticipantRegistryService` (`fr.pivot.agilite.poker.ws`, aux côtés de `RoomAccessGrantService`) : `Set` Redis `poker:room-participants:{roomId}`, membre = jeton d'accès, TTL rafraîchi à chaque `register()` (facilitateur à la création, participant au join) — source de `totalParticipants`.
  - Nouvelles exceptions (`fr.pivot.agilite.poker.exception`) : `PokerFacilitatorOnlyException` (403, `FACILITATOR_ONLY`), `ActiveTicketExistsException` (409, `ACTIVE_TICKET_EXISTS`) — ajoutées à `GlobalExceptionHandler`.
  - Réponse `POST/GET .../tickets*` : `TicketResponse(UUID id, UUID roomId, String title, String status, Instant createdAt)`.
  - Événements STOMP sur `/topic/agilite/poker/{roomId}` : `TicketCreatedEvent(String type="TICKET_CREATED", UUID roomId, UUID ticketId, String title, Instant createdAt)` et `VoteCastEvent(String type="VOTE_CAST", UUID roomId, UUID ticketId, long votedCount, long totalParticipants)` — forme figée pour US09.2.2, qui ajoutera son propre `REVEAL`/`CONSENSUS` sur le même topic sans modifier ces deux-là.
  - Requête `SEND /app/agilite/poker/{roomId}/vote` : `SubmitVoteRequest(UUID ticketId, String value)`.
- **Frontend** `pivot-agilite-ui` : étend la feature `scrum-poker/` existante — nouveau composant `room-board` (ticket actif + cartes + compteur), monté par `create-room`/`join-room` une fois `RoomWsService` connecté ; `RoomWsService` gagne une capacité `publish` (actuellement lecture seule), mirroring `RetroSessionWsService.submitCard`. Nouveau `TicketService` (HTTP) pour `POST`/`GET .../tickets*`.
- **Convention réutilisée** : 404 anti-énumération cross-tenant (US09.1.1/US09.1.2), masquage prouvé par TI sur payload brut (US20.1.2a).

---
Item Type: US · Parent: F09.2 · Module: agilite · Repo: pivot-agilite-core/ui · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US09.1.2, EN09.1
