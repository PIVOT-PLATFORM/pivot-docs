# US09.1.2 — Rejoindre une room de planning poker via code

**En tant que** développeur / membre d'équipe
**Je veux** rejoindre une room de planning poker via un code d'invitation
**Afin de** participer à la session d'estimation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un utilisateur authentifié et un code d'invitation valide (6 caractères) correspondant à une room active de son propre tenant, when il appelle `POST /api/agilite/poker/rooms/join` avec `{ "code": "…" }`, then l'API retourne 200 avec `roomId`, `name`, `sequence`, `cardValues`, `active`, `expiresAt`, `wsTopic` (`/topic/agilite/poker/{roomId}`) et `accessToken` | ⬜ |
| Given un join réussi, then `RoomAccessGrantService.grantAccess(roomId, accessToken, ttl)` a été appelé côté serveur avant que la réponse ne soit renvoyée au client — `ttl` aligné sur le temps restant jusqu'à `room.expiresAt` (jamais une durée fixe déconnectée de l'expiration réelle de la room) | ⬜ |
| Given un `accessToken` obtenu par un join réussi, when le client ouvre une connexion STOMP sur `/ws/agilite` et souscrit à `wsTopic` en présentant `accessToken` dans l'en-tête natif `access-token`, then `PokerChannelInterceptor` autorise la souscription (le grant Redis posé par le join la couvre) | ⬜ |
| Given un code d'invitation, then il est comparé tel quel (6 caractères, alphabet `InviteCodeGenerator.ALPHABET`) — aucune normalisation implicite de casse côté serveur (le frontend est responsable de l'upper-case avant envoi, cf. Notes d'implémentation) | ⬜ |
| Error : given `code` absent, vide, ou de longueur différente de 6 caractères, when `POST /api/agilite/poker/rooms/join` est appelé, then 400 avec code `INVALID_CODE` | ⬜ |
| Error : given un `code` syntaxiquement valide (6 caractères) qui ne correspond à aucune room existante, when le join est tenté, then 404 — message générique, jamais distinct des deux cas suivants | ⬜ |
| Error : given un `code` qui correspond à une room dont `expiresAt` est déjà dépassé, when le join est tenté, then 404 (jamais 410 — choix délibérément différent de `RetroSessionExpiredException`/US20.1.1 : ADR-026 §2 fixe explicitement "404 explicite si invalide/expiré/autre tenant" pour planning poker, sans distinction entre les trois causes) | ⬜ |
| Error : given un `code` qui correspond à une room désactivée (`active = false`), when le join est tenté, then 404 (même traitement qu'un code inconnu — aucune API de désactivation n'existe encore, mais le contrat doit déjà être correct pour l'US qui l'introduira) | ⬜ |
| Error : given aucun header `Authorization: Bearer` valide (absent, malformé, token inconnu/expiré/révoqué), when `POST /api/agilite/poker/rooms/join` est appelé, then 401 générique — sans fuite d'information distinguant la cause exacte | ⬜ |
| Security : given une room appartenant au tenant A, when un utilisateur authentifié du tenant B tente de rejoindre avec le même code, then 404 — jamais 403, jamais de confirmation d'existence cross-tenant ; ce cas est indistinguable, côté réponse HTTP, d'un code inconnu ou d'une room expirée (même AC que ci-dessus, testé explicitement en TI avec deux tenants distincts) | ⬜ |
| Security : `tenantId` du principal est dérivé exclusivement du token porteur (`RequestPrincipal`) pour la comparaison avec le `tenantId` de la room — jamais un `tenantId` fourni par le corps JSON, un paramètre de requête ou un header custom | ⬜ |
| Security : `accessToken` est un identifiant opaque généré côté serveur (`UUID` aléatoire) — jamais accepté en entrée, jamais dérivable/prévisible à partir du `roomId` ou du code d'invitation | ⬜ |
| Security : la connaissance seule d'un `roomId` (par exemple deviné, ou lu dans un autre contexte) n'autorise jamais la souscription STOMP à `/topic/agilite/poker/{roomId}` — seul un `accessToken` valide, obtenu via un join réussi et vérifié par `RoomAccessGrantService.hasAccess`, autorise l'accès (`PokerChannelInterceptor`, EN09.1) ; aucun code de cette US ne doit introduire un chemin de souscription qui contournerait ce contrôle | ⬜ |
| A11y : le formulaire de saisie du code d'invitation (frontend) a un champ avec label associé (`<label for>`) ; une erreur de validation ou un code invalide/inconnu est annoncé via `aria-invalid="true"` + message relié par `aria-describedby`, jamais uniquement par une couleur | ⬜ |
| A11y : pendant la soumission du join, le bouton est désactivé avec `aria-busy="true"` ; le résultat (succès de connexion à la room, ou erreur réseau/4xx) est annoncé via une zone `aria-live="polite"` (succès) ou `role="alert"` (erreur), cohérent avec le pattern déjà en place dans `create-room.component.html` (US09.1.1) | ⬜ |

## Hors périmètre

- Liste des participants de la room, affichage temps réel de leur présence — dépend de la conception des tickets/votes (US09.2.1), pas de cette US
- Contenu de la room après connexion (tickets, cartes, vote) — US09.2.1/US09.2.2, hors périmètre ici : cette US s'arrête à l'obtention d'un `accessToken` valide et à la confirmation que la souscription STOMP au `wsTopic` fonctionne
- Participation anonyme sans compte (`ROLE_GUEST`, pseudonyme, `sessionId`) — US09.3.1, dépend de celle-ci mais traite un flux d'authentification distinct (non authentifié)
- Normalisation de la casse ou tolérance aux tirets/espaces dans le code saisi côté serveur — gérée uniquement côté frontend (uppercase avant envoi) ; aucune AC serveur ne l'exige
- API de désactivation manuelle d'une room (`active = false`) — n'existe pas encore ; l'AC "room désactivée → 404" fige déjà le contrat pour quand elle existera
- Rate limiting spécifique sur l'endpoint de join (tentatives de brute-force du code) — risque réel mais non traité par cette US ; signalé en note d'implémentation comme gap accepté (aligné sur la pratique déjà documentée du repo de ne pas sur-construire au-delà de l'AC écrite)

## Notes d'implémentation

- **Backend** (`pivot-agilite-core`) : nouvel endpoint `POST /poker/rooms/join` sur `PokerRoomController` existant (US09.1.1). Nouvelle méthode `PokerRoomService#join(String code, Long tenantId)` : résout la room via un nouveau `PokerRoomRepository#findByInviteCode(String)` (le code est unique globalement, donc la recherche ne filtre pas par tenant — la vérification `room.tenantId == tenantId` du principal a lieu ensuite, en mémoire), rejette (même exception, `InviteCodeNotFoundException` → 404 via `GlobalExceptionHandler`) si la room n'existe pas, appartient à un autre tenant, est inactive, ou est expirée. Sur succès, mint un `accessToken` (`UUID.randomUUID().toString()`) et appelle `RoomAccessGrantService.grantAccess(room.getId(), accessToken, Duration.between(now, room.getExpiresAt()))` (service EN09.1 déjà mergé, `fr.pivot.agilite.poker.ws.RoomAccessGrantService`) avant de construire la réponse.
- Nouveaux DTOs : `JoinRoomRequest(String code)` (`@NotBlank` + `@Size(min = 6, max = 6)`, message `INVALID_CODE`) et `JoinRoomResponse(UUID roomId, String name, String sequence, List<String> cardValues, boolean active, Instant expiresAt, String wsTopic, String accessToken)` — délibérément sans `inviteCode` (déjà connu du client) ni `facilitatorUserId` (pas nécessaire pour cette US, le rôle du participant est hors périmètre ici).
- Réutilise `PokerRoomDestinations.roomTopic(UUID)` et `PokerCardDeck.FIBONACCI_VALUES` déjà existants (US09.1.1/EN09.1) — aucune duplication de ces constantes.
- Tests TI (`PokerRoomControllerIT`) : succès, code invalide (longueur), code inconnu, room expirée (`expires_at` reculé via update SQL natif sur `agilite.poker_rooms`, même pattern que `RetroSessionControllerIT#expireSession`), cross-tenant, 401 sans bearer. Test TU (`PokerRoomServiceTest`) : vérifie l'appel exact à `grantAccess` (roomId, ttl calculé) via Mockito.
- **Frontend** (`pivot-agilite-ui`) : nouvelle feature `features/scrum-poker/join-room/` (service `RoomService` existant étendu avec `joinRoom(code)`, ou nouveau service dédié si la séparation reste plus lisible — à trancher par l'agent d'implémentation, aucun impact sur le contrat). Après réponse réussie, connexion STOMP via `@stomp/rx-stomp` (déjà dans le stack technique documenté par `CLAUDE.md`, mais jamais encore consommé dans ce repo ni dans `pivot-collaboratif-ui` — premier vrai consommateur de la dépendance) vers `/ws/agilite` (endpoint natif, sans SockJS — voir `WebSocketConfig#registerStompEndpoints`), souscription à `wsTopic` avec l'en-tête STOMP natif `access-token` = `accessToken` reçu. Route ajoutée à `app.routes.ts` (`scrum-poker/rooms/join`), lazy-loaded, cohérente avec `scrum-poker/rooms/new` (US09.1.1).
- Le champ code est upper-casé côté frontend avant envoi (le serveur ne normalise pas la casse, cf. AC dédiée) — cohérent avec l'alphabet réduit de `InviteCodeGenerator` (majuscules uniquement).

---
Item Type: US · Parent: F09.1 · Module: agilite · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Dépendances: US09.1.1
