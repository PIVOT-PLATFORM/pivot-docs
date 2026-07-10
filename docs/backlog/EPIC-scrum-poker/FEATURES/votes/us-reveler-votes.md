# US09.2.2 — Révéler les votes et calculer le consensus

**En tant que** facilitateur d'une room de planning poker
**Je veux** révéler les votes du ticket en cours et voir le consensus
**Afin de** finaliser l'estimation collective avec mon équipe

Prolonge US09.2.1 (création de ticket, vote masqué en temps réel — `poker/ticket/` et
`poker/vote/`) et EN09.1 (isolation WebSocket par room). Consomme telle quelle la forme figée par
US09.2.1 : `PokerTicket{id, roomId, title, status['VOTING'|'REVEALED'], createdAt, revealedAt}`
(`revealedAt`/`status='REVEALED'` étaient des colonnes **pré-provisionnées, jamais écrites** par
US09.2.1, réservées explicitement à cette US) et `PokerVote{id, ticketId, participantKey, value,
createdAt, updatedAt}` (une ligne par `(ticket, participant)`, `value` ∈
`PokerCardDeck.FIBONACCI_VALUES` = `"0","1","2","3","5","8","13","21","34","55","89","?"`).

**Cadrage ADR-026 §2 (périmètre v1 figé) :** révélation broadcastée simultanément à tous les
participants, calcul moyenne/médiane/valeur majoritaire — **aucune** statistique de distribution/
dispersion des votes (différée v2+, déjà notée hors périmètre par le README d'E09 et confirmée par
ADR-026). `PokerCardDeck.FIBONACCI_VALUES` contient une entrée non numérique (`"?"`) : le calcul
moyenne/médiane l'exclut explicitement (AC dédiée ci-dessous), la valeur majoritaire la compte
comme n'importe quelle autre valeur.

**Décision Gate 1 — révélation à tout moment, jamais de verrou de complétude.** Le stub original
n'imposait aucune condition sur le moment où le facilitateur peut révéler. Le compteur « X/Y ont
voté » (US09.2.1) existe déjà comme **information**, pas comme verrou — imposer que 100 % des
participants aient voté avant de permettre la révélation ajouterait un état bloquant non demandé
par le stub ni par ADR-026, et diverge du comportement de référence du benchmark cité par ADR-026
(PlanningPoker.com : le facilitateur révèle quand il le juge utile, y compris avec des votes
manquants). Cette US retient donc : **le facilitateur peut révéler à tout moment tant que le
ticket est `VOTING`, quel que soit `votedCount` (y compris 0)** — « révélation simultanée »
(l'ancre du stub) qualifie la diffusion (tous les votes visibles au même instant pour tout le
monde, jamais une révélation partielle/échelonnée), pas une condition de complétude préalable.

**Décision Gate 1 — pas de réponse REST dupliquant l'événement WebSocket.** L'action de
révélation est une transition d'état existant (pas une création de ressource) : `POST
.../tickets/{ticketId}/reveal` répond **200 OK** (jamais 201), avec le même contenu que
l'événement broadcasté (voir AC ci-dessous) — le facilitateur (appelant REST) et tout autre
participant (abonné WebSocket) reçoivent une information strictement identique, simultanément.

**Écart documenté avec ADR-026 §2 (à signaler au mainteneur, pas résolu unilatéralement par ce
Gate 1) :** la ligne du tableau ADR-026 §2 consacrée à US09.2.2 mentionne aussi « reset et revote
possibles » et « estimation finale validée et sauvegardée sur le ticket ». Ces deux capacités ne
sont **pas** couvertes par cette US — aucune AC ci-dessous ne les traite, aucune colonne
`final_estimate` n'existe sur `agilite.poker_tickets`, aucun endpoint de reset n'est ajouté. Ce
Gate 1 fige volontairement un périmètre plus étroit que la lettre d'ADR-026 §2 pour rester
cohérent avec le calibrage `Size: S` de cette US et clôturer la boucle
créer/rejoindre/voter/révéler du sprint courant. **Action de suivi nécessaire** (US non écrite ou
amendement ADR-026) : « reset et revote sur un ticket déjà révélé » et « validation d'une
estimation finale persistée sur le ticket » restent hors périmètre de toute US existante à ce
jour — E09 n'est donc pas totalement clos par cette US au sens strict d'ADR-026 §2, seulement au
sens du périmètre explicitement demandé pour cette implémentation.

## Critères d'acceptation

### Révélation (backend `pivot-agilite-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une room active appartenant au tenant de l'appelant, dont l'appelant est le facilitateur, et un ticket `VOTING` de cette room, when `POST /api/agilite/poker/rooms/{roomId}/tickets/{ticketId}/reveal`, then la réponse est **200 OK** avec `{ id, roomId, title, status: "REVEALED", createdAt, revealedAt, values: string[], consensus: { mean, median, majority } }` — `revealedAt` fraîchement défini (horodatage serveur, `Clock` injecté comme le reste du module) | ⬜ |
| Given la révélation ci-dessus, when elle a lieu, then le ticket passe en base `status = 'REVEALED'` avec `revealed_at` renseigné — transition persistée avant tout broadcast (cohérence : un participant qui interrogerait `GET .../tickets/current` juste après ne verrait plus ce ticket comme actif, cf. US09.2.1) | ⬜ |
| Given la révélation ci-dessus, when elle a lieu, then un événement `VOTES_REVEALED` est broadcasté sur `/topic/agilite/poker/{roomId}` à **tous** les abonnés simultanément : `{ type: "VOTES_REVEALED", roomId, ticketId, values: string[], consensus: { mean, median, majority }, revealedAt }` — strictement le même contenu que la réponse REST (hors `id`/`title`/`createdAt`/`status`, propres à la ressource ticket, absents de l'événement topique comme `TICKET_CREATED`/`VOTE_CAST` avant elle) | ⬜ |
| Given l'événement `VOTES_REVEALED`, when il est émis, then `values` contient la valeur brute de **chaque** vote déjà déposé sur ce ticket (une entrée par participant ayant voté, y compris `"?"`) — **jamais** une identité de participant associée (aucun champ `participantKey`/`userId` dans `values` ni ailleurs dans l'événement ou la réponse ; l'ordre des entrées ne porte aucune signification, `values` étant un ensemble anonyme) | ⬜ |
| Given aucun participant n'a encore voté sur le ticket au moment de la révélation (`votedCount == 0`, cas limite volontairement permis — voir décision Gate 1 ci-dessus), when la révélation a lieu, then elle réussit quand même (200 OK, transition persistée, broadcast émis) avec `values: []` et `consensus: { mean: null, median: null, majority: null }` | ⬜ |

### Calcul du consensus

| Critère | 🤖 Dev |
|---------|--------|
| Given au moins un vote **numérique** déposé (toute valeur de `PokerCardDeck.FIBONACCI_VALUES` sauf `"?"`), when `mean`/`median` sont calculés, then ils portent exclusivement sur le sous-ensemble numérique des votes — `"?"` est totalement exclu de ces deux calculs (jamais traité comme 0 ni ignoré silencieusement d'une façon qui fausserait le compte : le dénominateur de la moyenne est le nombre de votes numériques, pas le nombre total de votes) | ⬜ |
| Given le sous-ensemble numérique des votes, when `mean` est calculé, then c'est la moyenne arithmétique de ce sous-ensemble, arrondie à 1 décimale (arrondi standard, ex. `Math.round(x * 10) / 10.0`) — exemple : votes `["1","1","2"]` → `mean = 1.3` (4/3 = 1.333… arrondi) | ⬜ |
| Given le sous-ensemble numérique des votes, when `median` est calculé, then c'est la médiane standard de ce sous-ensemble trié (valeur centrale si effectif impair, moyenne des deux valeurs centrales si effectif pair), arrondie à 1 décimale — exemple : votes numériques triés `[3, 5]` (effectif pair) → `median = 4.0` ; votes triés `[3, 5, 5, 8, 8]` (effectif impair) → `median = 5.0` | ⬜ |
| Given **zéro** vote numérique parmi les votes déposés (tous `"?"`, ou aucun vote du tout), when `mean`/`median` sont calculés, then les deux valent `null` (jamais `0`, jamais `NaN` — `0` serait une valeur de carte légitime et donc ambiguë) | ⬜ |
| Given l'ensemble **complet** des votes déposés (numériques et `"?"` confondus), when `majority` est calculé, then c'est la valeur (parmi toutes les valeurs présentes, `"?"` incluse) dont la fréquence est la plus élevée — exemple : votes `["3","?","?","5"]` → `majority = "?"` (fréquence 2, la plus élevée) alors que `mean`/`median` ne portent que sur `[3, 5]` (`mean = 4.0`, `median = 4.0`) : `majority` peut légitimement diverger de `mean`/`median` quant à la valeur qu'il désigne | ⬜ |
| Given une égalité de fréquence entre plusieurs valeurs pour `majority` (ex. votes `["5","5","8","8","3"]`, `"5"` et `"8"` à fréquence 2 chacune), when le calcul départage l'égalité, then la valeur retenue est celle qui apparaît en premier dans l'ordre du deck `PokerCardDeck.FIBONACCI_VALUES` (`"0","1","2",...,"89","?"`) — dans l'exemple, `"5"` précède `"8"` dans cet ordre, donc `majority = "5"` ; règle déterministe, jamais un ordre d'insertion ou un choix arbitraire | ⬜ |
| Given zéro vote déposé sur le ticket au moment de la révélation, when `majority` est calculé, then il vaut `null` (aucune valeur n'a de fréquence à comparer) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `roomId` inexistant ou appartenant à un autre tenant, when `POST .../tickets/{ticketId}/reveal`, then 404 — même convention anti-énumération que la création de ticket (US09.2.1, `RoomNotFoundException`), jamais 403 | ⬜ |
| Error : given une room valide du tenant de l'appelant mais un `ticketId` inexistant, ou existant mais appartenant à une **autre room** que `roomId`, when `POST .../reveal`, then 404 avec une nouvelle exception dédiée `TicketNotFoundException` (nouvelle, mappée `GlobalExceptionHandler`) — les deux cas (inexistant, cross-room) sont indistinguables dans la réponse, même discipline anti-énumération que `RoomNotFoundException`/`InviteCodeNotFoundException` | ⬜ |
| Error : given un ticket déjà `REVEALED` (deuxième appel de révélation sur le même ticket), when `POST .../reveal`, then 409 avec une nouvelle exception dédiée `TicketAlreadyRevealedException`, code `TICKET_ALREADY_REVEALED` — la révélation n'est jamais idempotente ni répétable, contrairement à la lecture (`GET .../tickets/current`) | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given un appelant authentifié, même tenant, mais **pas** le facilitateur de la room, when `POST .../reveal`, then 403 avec le **même** mécanisme que la création de ticket (US09.2.1) — réutilisation stricte de `TicketFacilitatorOnlyException`/code `FACILITATOR_ONLY` déjà existants, **aucune nouvelle exception facilitateur** n'est créée pour cette AC (contrairement à `TicketNotFoundException`/`TicketAlreadyRevealedException`, qui eux sont propres à la révélation) | ⬜ |
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` (token porteur), jamais depuis le corps/un paramètre/un header custom — règle transversale du repo, aucune exception pour ce nouvel endpoint | ⬜ |
| Security : `values` (réponse REST et événement `VOTES_REVEALED`) ne contient et n'a jamais contenu de `participantKey`, de hash, ni d'aucun identifiant de participant — vérifié par test TI d'inspection de la réponse JSON brute (même rigueur que `PokerVoteSubmissionIT`, US09.2.1) | ⬜ |
| Security : test TI obligatoire prouvant la transition `status`/`revealedAt` du ticket en base (avant révélation : `VOTING`/`revealedAt == null` ; après : `REVEALED`/`revealedAt` non nul) | ⬜ |
| Security : test TI obligatoire prouvant qu'un appelant authentifié du même tenant mais non-facilitateur reçoit 403 sur `POST .../reveal`, et que le ticket reste inchangé (`VOTING`, `revealedAt == null`) après cette tentative rejetée | ⬜ |

### Frontend (`pivot-agilite-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given le facilitateur avec un ticket `VOTING` actif, when le board de room s'affiche, then un bouton « Révéler les votes » lui est proposé, **quel que soit** `votedCount`/`totalParticipants` (jamais désactivé pour cause de vote incomplet — décision Gate 1) ; les participants non-facilitateurs (authentifiés ou invités anonymes, US09.3.1) ne voient jamais ce bouton | ⬜ |
| Given le facilitateur clique sur « Révéler les votes », when la requête est en cours, then le bouton est désactivé (`aria-busy`) le temps de la réponse — pas de double-soumission | ⬜ |
| Given une révélation réussie (réponse REST **ou** événement `VOTES_REVEALED` reçu — les deux mènent au même état, y compris pour le facilitateur qui reçoit potentiellement les deux de façon idempotente), when l'UI l'affiche, then : les boutons de carte deviennent non cliquables (plus de vote possible sur un ticket révélé), la liste `values` s'affiche (cartes révélées, ordre quelconque, sans identité associée), et un résumé de consensus s'affiche (`mean`/`median`/`majority`, chacun affiché seulement si non `null` — un libellé explicite remplace une valeur `null`, ex. « Pas de consensus numérique » plutôt qu'un champ vide) | ⬜ |
| Given un ticket révélé affiché, when le facilitateur consulte le board, then le formulaire « Créer un ticket » redevient disponible (même condition que l'état initial « aucun ticket actif ») — un ticket `REVEALED` compte comme « pas de ticket `VOTING` en cours » pour ce formulaire, permettant d'enchaîner un nouveau tour d'estimation sans recharger la page ; la création d'un nouveau ticket réinitialise l'affichage de révélation précédent (`values`/`consensus` remis à vide, même moment que la remise à zéro de `votedCount`/`selectedValue` déjà faite par US09.2.1) | ⬜ |
| Given une erreur réseau/HTTP lors de l'appel de révélation (403/404/409/générique), when elle survient, then un message d'erreur non bloquant s'affiche (mêmes conventions i18n que les erreurs de création de ticket, US09.2.1) et l'état du ticket affiché reste inchangé (pas de transition locale optimiste avant confirmation serveur) | ⬜ |

### A11y

| Critère | 🤖 Dev |
|---------|--------|
| A11y : le bouton « Révéler les votes » est un `<button>` natif, navigable au clavier | ⬜ |
| A11y : le résumé de consensus (moyenne/médiane/majorité) et la liste des votes révélés sont rendus dans une région `aria-live="polite"` — annoncés automatiquement au lecteur d'écran, même convention que le compteur « X/Y ont voté » (US09.2.1) | ⬜ |
| A11y : tous les nouveaux libellés (bouton, résumé de consensus, valeurs révélées, erreurs de révélation) sont externalisés via Transloco (`fr.json`/`en.json`) — aucune chaîne littérale dans les templates | ⬜ |

## Hors périmètre

- **Distribution/dispersion des votes à la révélation** (variance, écart-type, histogramme) — confirmé hors v1 par ADR-026 §2, différé v2+
- **Reset et revote sur un ticket déjà révélé** — mentionné par la ligne ADR-026 §2 consacrée à cette US mais non traité ici (voir « Écart documenté » en tête de fichier) ; nécessite une US dédiée (non écrite) ou un amendement ADR-026
- **Validation d'une estimation finale persistée sur le ticket** (ex. colonne `final_estimate`) — même remarque que ci-dessus, non traité ici
- **Verrou de complétude avant révélation** (bloquer tant que `votedCount < totalParticipants`) — décision Gate 1 explicite : le facilitateur révèle à tout moment
- **Historique des tickets révélés d'une room** (liste consultable) — toujours hors périmètre (US09.2.1 l'excluait déjà), cette US ne l'ajoute pas
- **Jeu de cartes personnalisable** (T-shirt, suite custom) — ADR-026 §2, US09.1.3 non écrite
- **Participation anonyme au calcul de consensus** — aucune distinction : un vote d'invité anonyme (US09.3.1) compte exactement comme un vote authentifié dans `values`/`mean`/`median`/`majority`, rien de spécifique à ajouter ici (déjà le comportement naturel puisque `PokerVote` ne distingue pas la provenance du participant)

## Notes d'implémentation

- **Backend** `pivot-agilite-core`, package `fr.pivot.agilite.poker.ticket` (étendu, pas de nouveau package — la révélation est une opération sur le cycle de vie du ticket) :
  - `PokerTicket` : nouvelle méthode `reveal(Instant revealedAt)` (mute `status`/`revealedAt` en place), même style que `PokerVote#changeValue`.
  - `PokerVoteRepository` : nouvelle méthode `List<PokerVote> findByTicketId(UUID ticketId)` (les méthodes existantes ne couvrent que le comptage/l'upsert, pas la récupération de la liste complète nécessaire au calcul de consensus).
  - Nouveau `fr.pivot.agilite.poker.ticket.ConsensusCalculator` (classe utilitaire, méthodes statiques, testable isolément) : `ConsensusResponse compute(List<String> values)` — implémente les règles ci-dessus (exclusion `"?"` pour mean/median, arrondi 1 décimale, départage de `majority` par l'ordre `PokerCardDeck.FIBONACCI_VALUES`).
  - Nouveaux DTOs `fr.pivot.agilite.poker.ticket.dto` : `ConsensusResponse(Double mean, Double median, String majority)`, `RevealResponse(UUID id, UUID roomId, String title, String status, Instant createdAt, Instant revealedAt, List<String> values, ConsensusResponse consensus)`, `VotesRevealedEvent(String type, UUID roomId, UUID ticketId, List<String> values, ConsensusResponse consensus, Instant revealedAt)` avec constante `TYPE = "VOTES_REVEALED"` et fabrique statique `of(...)`, même style que `TicketCreatedEvent`/`VoteCastEvent`.
  - `PokerTicketService` : nouvelle méthode `reveal(UUID roomId, UUID ticketId, Long callerUserId, Long tenantId)` — résout la room (`RoomNotFoundException` sinon), vérifie le facilitateur (réutilise `TicketFacilitatorOnlyException`, **ne pas** en créer une nouvelle), résout le ticket par id **et** appartenance à `roomId` (`TicketNotFoundException` sinon, nouvelle exception), vérifie `status == VOTING` (`TicketAlreadyRevealedException` sinon, nouvelle exception), charge tous les votes du ticket, calcule le consensus, persiste la transition, broadcast `VotesRevealedEvent`, retourne `RevealResponse`.
  - `PokerTicketController` : nouveau `@PostMapping("/{ticketId}/reveal")` sans corps de requête, retour `RevealResponse` (200 par défaut).
  - `GlobalExceptionHandler` : deux nouveaux `@ExceptionHandler` (`TicketNotFoundException` → 404, `TicketAlreadyRevealedException` → 409 code `TICKET_ALREADY_REVEALED`).
  - **Aucune migration Flyway** : `revealed_at`/`status CHECK IN ('VOTING','REVEALED')` existent déjà dans `V1__schema_init.sql` (pré-provisionnés par US09.2.1 explicitement pour cette US) — ne pas toucher ce fichier partagé.
  - **`pom.xml` : ne pas toucher** — aucune nouvelle dépendance requise, respecter le hard block CLAUDE.md sur `pivot-core-starter`.
  - Tests : `ConsensusCalculatorTest` (TU pur, tous les cas ci-dessus : moyenne/médiane/majorité, égalité, exclusion `"?"`, listes vides/tout-`"?"`, arrondi) ; extension `PokerTicketServiceTest` (mock repositories/messagingTemplate, vérifie le contenu exact de l'événement broadcasté) ; extension `PokerTicketControllerIT` (Testcontainers, seed de votes directement via `PokerVoteRepository` autowired — les votes transitent normalement par STOMP mais l'IT n'a pas besoin d'un client STOMP pour les faire exister en base) prouvant la transition `status`/`revealedAt` et le 403 non-facilitateur, a minima.
- **Frontend** `pivot-agilite-ui` : étend `RoomBoardComponent`/`TicketService`/`ticket.model.ts` (pas de nouveau composant) — nouveau `revealTicket(roomId, ticketId)` sur `TicketService` (`POST .../tickets/{ticketId}/reveal`), nouveaux types `ConsensusResponse`/`RevealResponse`/`VotesRevealedEvent` (`RoomTopicEvent` étendu), nouveaux signaux `revealedValues`/`consensus` sur `RoomBoardComponent`, condition du formulaire de création de ticket étendue à `!currentTicket() || currentTicket()?.status === 'REVEALED'`.
- **Convention réutilisée** : anti-énumération 404 (US09.1.1/US09.1.2/US09.2.1), masquage d'identité prouvé par TI sur payload brut (US09.2.1/US20.1.2a), réutilisation stricte de l'exception facilitateur existante plutôt qu'une nouvelle (règle explicite de ce Gate 1).

---
Item Type: US · Parent: F09.2 · Module: agilite · Repo: pivot-agilite-core/ui · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US09.2.1
