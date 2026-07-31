# US47.1.1 — Jouer au Bingo des réunions à plusieurs

**En tant que** participant à une pause d'équipe
**Je veux** rejoindre une partie de Bingo des réunions et cocher les phrases cultes entendues en réunion
**Afin de** créer un moment ludique avec mon équipe

Repo cible : **`pivot-collaboratif-core`** (schéma Flyway `collaboratif`) / **`pivot-collaboratif-ui`**
(cf. E47 README, pré-requis EN17). La partie vit dans une **room** identifiée par un code
d'invitation ; on rejoint **avec un compte PIVOT** (`Authorization: Bearer`) **ou en invité anonyme**
(sans compte, pseudonyme fourni), sur le même modèle d'isolation WebSocket room-scopé que le
planning poker (US09.1.2 / EN09.1 : `RoomAccessGrantService` + `ChannelInterceptor`, en-tête natif
`access-token`). La grille et la **détection de victoire sont autoritatives côté serveur** : le
client ne déclare jamais lui-même une ligne complète. Chaque participant possède **sa propre grille**
(disposition privée) ; seuls des agrégats (nombre de cases cochées, événement de victoire) sont
diffusés aux autres — jamais la disposition ni les phrases cochées d'autrui.

## Critères d'acceptation

### Génération de grille & rejoindre la room

| Critère | 🤖 Dev |
|---------|--------|
| AC-47.1.1-01 — Given un utilisateur authentifié, when il appelle `POST /api/collaboratif/bingo/rooms` avec `{ "name": "<1-80 caractères>" }`, then 201 avec `{ roomId, code (6 caractères, alphabet InviteCodeGenerator.ALPHABET), name, status: "OPEN", maxPlayers, expiresAt, wsTopic ("/topic/collaboratif/bingo/{roomId}"), accessToken, grid }` — le créateur est immédiatement un joueur (grille générée) et reçoit son grant d'accès WebSocket dès la création (même correctif que US09.2.1 pour le facilitateur poker) | ⬜ |
| AC-47.1.1-02 — Given une room `OPEN` non pleine et un code valide, when un utilisateur authentifié appelle `POST /api/collaboratif/bingo/rooms/join` avec `{ "code": "…" }`, then 200 avec `{ roomId, name, status, wsTopic, accessToken, role: "PLAYER", grid }` ; `RoomAccessGrantService.grantAccess(roomId, accessToken, ttl)` est appelé côté serveur avant renvoi de la réponse, `ttl` aligné sur le temps restant jusqu'à `room.expiresAt` (jamais une durée fixe) | ⬜ |
| AC-47.1.1-03 — Given une room `OPEN` non pleine et un code valide, when un visiteur **sans compte** appelle `POST /api/collaboratif/bingo/rooms/join` **sans** `Authorization` mais avec `{ "code": "…", "displayName": "<2-30 caractères>" }`, then 200 avec la même forme qu'AC-47.1.1-02 (`role: "PLAYER"`), un `participantId` (UUID éphémère) est attribué à l'invité, aucun compte n'est requis ni créé | ⬜ |
| AC-47.1.1-04 — Given une grille générée pour un participant, then elle contient **exactement 25 cases** (5×5), chacune portant une phrase **distincte** tirée aléatoirement de la banque de phrases de la room (`{ cellIndex: 0..24, phrase, marked: false }`), la disposition est **indépendante par participant** (deux participants de la même room reçoivent des dispositions différentes) et **persistée** côté serveur (source de vérité pour la détection de victoire) | ⬜ |
| AC-47.1.1-05 — Given un participant déjà membre d'une room (reconnexion, onglet rechargé, STOMP manqué), when il appelle `GET /api/collaboratif/bingo/rooms/{roomId}/grid` en présentant son `accessToken`, then 200 renvoie **sa** grille avec l'état `marked` courant de chaque case et le `status` de la room — permet d'afficher de nouveau la partie sans générer une nouvelle grille | ⬜ |
| AC-47.1.1-06 — Given un `accessToken` obtenu par un join/create réussi, when le client ouvre une connexion STOMP sur `/ws/collaboratif` et souscrit à `wsTopic` en présentant `accessToken` dans l'en-tête natif `access-token`, then le `ChannelInterceptor` autorise la souscription (grant Redis posé par le join la couvre) ; un événement `PARTICIPANT_JOINED` `{ type: "PARTICIPANT_JOINED", roomId, participantId, displayName, playerCount, spectatorCount }` est diffusé sur le topic | ⬜ |

### Cocher une case en temps réel

| Critère | 🤖 Dev |
|---------|--------|
| AC-47.1.1-07 — Given un joueur (`role: PLAYER`) connecté à une room `OPEN`, when il envoie `SEND /app/collaboratif/bingo/{roomId}/mark` avec l'en-tête natif `access-token` et le corps `{ "cellIndex": 0..24, "marked": true \| false }`, then l'état `marked` de **sa** case est persisté côté serveur (upsert idempotent par `(grille, cellIndex)`) et un événement `CELL_MARKED` `{ type: "CELL_MARKED", roomId, participantId, markedCount }` est diffusé à tous les abonnés du topic | ⬜ |
| AC-47.1.1-08 — Given un `CELL_MARKED` reçu par un client, then il ne contient **jamais** l'index de case ni la phrase concernée — uniquement `participantId` et `markedCount` (nombre total de cases cochées par ce participant) ; la disposition et le contenu coché d'un participant ne sont jamais exposés aux autres | ⬜ |
| AC-47.1.1-09 — Given un participant coche puis décoche la même case (`marked: true` puis `marked: false`) avant toute victoire, when les deux `SEND .../mark` sont traités, then `markedCount` reflète l'état courant à jour (incrément puis décrément) — une case cochée deux fois ne compte pas double (idempotence par `cellIndex`) | ⬜ |

### Détection de victoire (bingo)

| Critère | 🤖 Dev |
|---------|--------|
| AC-47.1.1-10 — Given un joueur qui, en cochant une case, complète **une ligne, une colonne ou une des deux diagonales** (12 combinaisons gagnantes : 5 lignes + 5 colonnes + 2 diagonales) de **sa propre grille persistée**, when le serveur recalcule les combinaisons après persistance du `mark`, then il détecte la victoire, passe `room.status` à `"FINISHED"`, enregistre `winnerParticipantId` et diffuse `BINGO` `{ type: "BINGO", roomId, participantId, displayName, line: { kind: "ROW" \| "COLUMN" \| "DIAGONAL", index } }` à **tous** les abonnés du topic | ⬜ |
| AC-47.1.1-11 — Given une victoire déjà détectée (`status: FINISHED`), when un autre participant complète également une ligne par la suite, then **aucun** second `BINGO` n'est diffusé (premier gagnant figé) et tout nouveau `SEND .../mark` est rejeté (cf. AC erreur `ROOM_FINISHED`) | ⬜ |
| AC-47.1.1-12 — Given la détection de victoire, then elle est **exclusivement** calculée côté serveur à partir des cases persistées ; un client ne peut jamais déclencher un `BINGO` en envoyant un indicateur de victoire — le payload `mark` ne porte que `cellIndex` et `marked`, aucun champ « j'ai gagné » n'est accepté ni fait confiance | ⬜ |

### Seuil de participants & dégradation progressive

| Critère | 🤖 Dev |
|---------|--------|
| AC-47.1.1-13 — Given un seuil `maxPlayers` **documenté et configurable** (défaut **50** joueurs simultanés par room, valeur exposée dans la réponse de room et dans les notes ci-dessous), when un participant rejoint alors que la room a déjà `maxPlayers` joueurs, then il est admis en **spectateur** (`role: "SPECTATOR"`, `grid: null`) : il souscrit au topic et voit la progression et la victoire en direct, mais ne reçoit pas de grille — **jamais un blocage brutal 4xx**, dégradation progressive assumée (contre-modèle explicite : blocage 30 jours de Mentimeter, cf. E47 README) | ⬜ |
| AC-47.1.1-14 — Given un spectateur, when il tente `SEND /app/collaboratif/bingo/{roomId}/mark`, then l'action est rejetée (notification à l'émetteur seul sur `/user/queue/errors`, `{ code: "SPECTATOR_CANNOT_MARK" }`, aucun broadcast) — un spectateur observe mais ne joue pas ; `playerCount`/`spectatorCount` sont diffusés dans `PARTICIPANT_JOINED` pour matérialiser la dégradation | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| AC-47.1.1-15 — Error : given `code` absent, vide, ou de longueur ≠ 6 caractères, when `POST .../rooms/join`, then 400 `{ code: "INVALID_CODE" }` | ⬜ |
| AC-47.1.1-16 — Error : given un `code` syntaxiquement valide qui ne correspond à **aucune** room, **ou** à une room **expirée** (`expiresAt` dépassé), **ou** à une room **terminée** (`status: FINISHED`), when `POST .../rooms/join`, then **404 générique** — message identique pour les trois causes, jamais de distinction (anti-énumération, même convention qu'US09.1.2) | ⬜ |
| AC-47.1.1-17 — Error : given un join **anonyme** dont le `displayName` est absent, vide, > 30 caractères, ou ne contient que des espaces, when `POST .../rooms/join` sans `Authorization`, then 400 `{ code: "INVALID_DISPLAY_NAME" }` (un join authentifié dérive le nom du principal et ignore un `displayName` fourni) | ⬜ |
| AC-47.1.1-18 — Error : given un `cellIndex` hors de `[0, 24]` (ou absent/non entier), when `SEND .../mark`, then le mark est rejeté (notification à l'émetteur seul sur `/user/queue/errors`, `{ code: "INVALID_CELL" }`, aucune persistance, aucun broadcast) | ⬜ |
| AC-47.1.1-19 — Error : given une room `FINISHED`, when `SEND .../mark`, then le mark est rejeté (notification à l'émetteur seul, `{ code: "ROOM_FINISHED" }`, aucun broadcast) — la partie est close après le premier bingo | ⬜ |
| AC-47.1.1-20 — Error : given un `roomId` inexistant, ou existant mais pour lequel l'appelant ne possède pas de grant d'accès valide, when `GET .../rooms/{roomId}/grid`, then 404 générique (jamais 403, jamais de confirmation d'existence) | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| AC-47.1.1-SEC-01 — Security : la connaissance seule d'un `roomId` (deviné ou lu ailleurs) n'autorise **jamais** la souscription STOMP à `/topic/collaboratif/bingo/{roomId}` — seul un `accessToken` valide obtenu par un create/join réussi et vérifié par `RoomAccessGrantService.hasAccess` (via `ChannelInterceptor`, EN09.1) l'autorise ; aucun chemin de souscription ne contourne ce contrôle (« une partie n'est visible que par ses participants ») | ⬜ |
| AC-47.1.1-SEC-02 — Security : l'identité du participant qui coche (pour lier le mark à **sa** grille et pour la déduplication) est dérivée **exclusivement** du grant `(roomId, accessToken)` — jamais d'un `participantId`/`userId` fourni dans le corps, un query param ou un header custom ; un joueur ne peut cocher que **sa propre** grille, jamais celle d'un autre | ⬜ |
| AC-47.1.1-SEC-03 — Security : `accessToken` est un identifiant opaque généré côté serveur (`UUID.randomUUID()`) — jamais accepté en entrée, jamais dérivable/prévisible à partir du `roomId` ou du code d'invitation ; la clé de persistance participant (`participant_key`) est un hachage SHA-256 (hex) du jeton, jamais le jeton en clair | ⬜ |
| AC-47.1.1-SEC-04 — Security : la disposition d'une grille et l'état coché de ses cases ne sont diffusés **qu'au participant propriétaire** (réponse create/join et `GET .../grid`) ; test TI obligatoire (inspection du payload STOMP brut, même rigueur qu'US09.2.1) prouvant qu'aucun `CELL_MARKED`/`BINGO` ne fuit jamais l'index de case, la phrase, ni la disposition d'un participant à un autre | ⬜ |
| AC-47.1.1-SEC-05 — Security : le `displayName` d'un invité anonyme est validé côté serveur (longueur bornée, non vide) et **échappé/neutralisé** avant diffusion dans `PARTICIPANT_JOINED`/`BINGO` — aucune injection HTML/script possible via ce champ (rendu en texte pur côté frontend, jamais en HTML brut) | ⬜ |

### Frontend (`pivot-collaboratif-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| AC-47.1.1-FE-01 — Given un participant rejoint via code, when la réponse arrive, then sa grille 5×5 s'affiche avec les 25 phrases ; l'écran de join propose la saisie du code **et** (chemin anonyme) un champ pseudonyme, le chemin authentifié masquant ce champ | ⬜ |
| AC-47.1.1-FE-02 — Given un joueur clique sur une case, when le `SEND .../mark` est envoyé, then l'état coché **local** de cette case bascule immédiatement (retour optimiste) et est confirmé/rollback selon la réussite ; la sélection cochée locale n'est jamais dérivée d'un `CELL_MARKED` d'un autre participant | ⬜ |
| AC-47.1.1-FE-03 — Given des `CELL_MARKED` reçus, when l'UI les traite, then un tableau de progression « qui a coché combien » (`participantId`/`displayName` → `markedCount`) se met à jour en direct, sans jamais révéler quelle phrase a été cochée par autrui | ⬜ |
| AC-47.1.1-FE-04 — Given un `BINGO` reçu, when l'UI le traite, then la victoire (gagnant + ligne gagnante) est annoncée à tous et la grille passe en état « partie terminée » (cases non cliquables) | ⬜ |
| AC-47.1.1-FE-05 — Given un participant admis en spectateur (`role: SPECTATOR`), when l'UI se rend, then elle affiche le tableau de progression et la victoire sans grille jouable, avec un message explicite « room complète — mode spectateur » | ⬜ |

### A11y

| Critère | 🤖 Dev |
|---------|--------|
| AC-47.1.1-A11Y-01 — A11y : la grille est un conteneur `role="grid"` (lignes `role="row"`, cellules `role="gridcell"`), chaque case est un `<button>` natif navigable au clavier, avec la **phrase comme libellé accessible** et `aria-pressed` reflétant l'état coché | ⬜ |
| AC-47.1.1-A11Y-02 — A11y : l'annonce de victoire (`BINGO`) est rendue dans une région `role="alert"` (annonce assertive au lecteur d'écran) ; le tableau de progression et l'arrivée d'un participant sont dans une région `aria-live="polite"` | ⬜ |
| AC-47.1.1-A11Y-03 — A11y : le formulaire de join (code, pseudonyme) a des champs avec label associé (`<label for>`) ; une erreur (`INVALID_CODE`, `INVALID_DISPLAY_NAME`, room introuvable) est signalée via `aria-invalid="true"` + message relié par `aria-describedby`, jamais uniquement par la couleur ; pendant la soumission le bouton est `aria-busy="true"` | ⬜ |
| AC-47.1.1-A11Y-04 — A11y : tous les libellés (grille, boutons, tableau de progression, annonces, erreurs, mode spectateur) sont externalisés via Transloco (`fr.json`/`en.json`) — aucune chaîne littérale dans les templates | ⬜ |

## Hors périmètre

- **Banque de phrases personnalisable / éditable par l'utilisateur** — cette US consomme une banque
  par défaut seedée (≥ 25 phrases FR de réunion) ; l'édition d'une banque custom est une US ultérieure
  non écrite. Toute banque de room a `≥ 25` phrases (invariant vérifié à la création).
- **Case centrale « FREE »** (variante bingo classique) — non retenue : les 25 cases portent des
  phrases réelles distinctes ; introduire une case libre serait une évolution de règle, pas cette US.
- **Rejouer / relancer une partie dans la même room après un bingo** — la room passe `FINISHED` et
  n'est pas réinitialisée ; une nouvelle partie = une nouvelle room (nouveau `POST /rooms`).
- **Rôle animateur/host distinct** (pattern Kahoot) — extension E47 non tranchée, hors périmètre ici ;
  le créateur est un joueur ordinaire, pas un host à privilèges.
- **Présence temps réel précise** (retrait immédiat d'un participant qui ferme son onglet du décompte) —
  `playerCount`/`spectatorCount` reflètent le registre des grants actifs (même modèle qu'US09.2.1),
  pas une détection de fermeture de socket ; un participant reste compté jusqu'à expiration du grant.
- **Multi-tenant strict au join** — contrairement au poker (join réservé au tenant du principal), le
  Bingo est volontairement joignable par un invité **sans compte** via le seul code ; l'isolation
  repose donc sur le secret du code + le grant room-scopé, pas sur le tenant. Le rate limiting anti
  brute-force du code est un gap accepté (signalé en note), non traité par cette US.
- **KPI du domaine** (parties jouées, gagnants) — EN47.1, dépendance non bloquante pour cette US.

## Notes d'implémentation

- **Backend** `pivot-collaboratif-core` (schéma `collaboratif`, pliage `V1__schema_init.sql` tant que
  la BETA n'est pas déclarée). Réutilise les briques room temps réel introduites côté agilité
  (`RoomAccessGrantService`, `ChannelInterceptor`, en-tête natif `access-token`, endpoint STOMP natif
  sans SockJS) — à décliner dans `collaboratif` (package `fr.pivot.collaboratif.bingo`), pas à
  dupliquer si une abstraction commune existe déjà côté `pivot-core-starter` (EN17).
  - `collaboratif.bingo_rooms` : `id UUID PK`, `code CHAR(6) NOT NULL UNIQUE` (`InviteCodeGenerator`),
    `name VARCHAR(80) NOT NULL`, `creator_user_id`/`tenant_id` (nullable — créateur authentifié),
    `status VARCHAR(20) NOT NULL DEFAULT 'OPEN'` (`CHECK IN ('OPEN','FINISHED')`), `max_players INT NOT NULL DEFAULT 50`,
    `winner_participant_id UUID` (nullable), `winning_line VARCHAR(20)` (nullable), `created_at`, `expires_at`.
  - `collaboratif.bingo_phrase_banks` + `collaboratif.bingo_phrases` (ou banque par défaut seedée en
    Flyway `R__seed_bingo_phrases.sql`) : ≥ 25 phrases FR (ex. « On fait un point offline », « Ça manque de sponsor »,
    « Tu peux partager ton écran ? », « On est aligné ? »…). Invariant applicatif : banque ≥ 25.
  - `collaboratif.bingo_grids` : `id UUID PK`, `room_id UUID NOT NULL` (FK → `bingo_rooms.id` `ON DELETE CASCADE`),
    `participant_key CHAR(64) NOT NULL` (hex SHA-256 de l'`accessToken`), `display_name VARCHAR(30) NOT NULL`,
    `role VARCHAR(20) NOT NULL` (`PLAYER`|`SPECTATOR`), `layout` (25 phrase_id ordonnés — `jsonb` ou table
    `bingo_grid_cells`), `created_at`. Unique `(room_id, participant_key)`.
  - `collaboratif.bingo_grid_cells` (si non `jsonb`) : `grid_id UUID`, `cell_index SMALLINT` (0..24),
    `phrase_id UUID`, `marked BOOLEAN NOT NULL DEFAULT false`, unique `(grid_id, cell_index)`.
  - Équivalent `PokerParticipantRegistryService` : `Set` Redis `bingo:room-players:{roomId}` /
    `bingo:room-spectators:{roomId}`, membre = `accessToken`, TTL aligné sur `expiresAt` — source de
    `playerCount`/`spectatorCount` et de l'arbitrage joueur↔spectateur au join.
  - Endpoints REST : `BingoRoomController` — `POST /bingo/rooms`, `POST /bingo/rooms/join`,
    `GET /bingo/rooms/{roomId}/grid`. Controller STOMP : `BingoWsController`,
    `@MessageMapping("/collaboratif/bingo/{roomId}/mark")`.
  - DTOs : `CreateBingoRoomRequest(String name)`, `JoinBingoRoomRequest(String code, String displayName)`
    (`displayName` requis seulement en anonyme), `BingoRoomResponse(UUID roomId, String code, String name,
    String status, int maxPlayers, Instant expiresAt, String wsTopic, String accessToken, String role, GridDto grid)`,
    `GridDto(List<CellDto> cells)`, `CellDto(int cellIndex, String phrase, boolean marked)`,
    `MarkCellRequest(int cellIndex, boolean marked)`.
  - Événements STOMP sur `/topic/collaboratif/bingo/{roomId}` :
    `ParticipantJoinedEvent(type="PARTICIPANT_JOINED", roomId, participantId, displayName, playerCount, spectatorCount)`,
    `CellMarkedEvent(type="CELL_MARKED", roomId, participantId, markedCount)`,
    `BingoEvent(type="BINGO", roomId, participantId, displayName, LineDto line)` avec
    `LineDto(String kind, int index)` (`kind` ∈ `ROW|COLUMN|DIAGONAL`, `index` = 0..4 pour ROW/COLUMN,
    0 = diagonale principale / 1 = anti-diagonale). Erreurs ciblées émetteur : `/user/queue/errors`
    `{ code }` (`SPECTATOR_CANNOT_MARK`, `INVALID_CELL`, `ROOM_FINISHED`).
  - Détection de victoire : après persistance du `mark`, recalculer les 12 lignes sur les `marked` de la
    grille de l'émetteur ; première ligne complète → `status=FINISHED` (transition **atomique**,
    `UPDATE ... WHERE status='OPEN'` pour garantir un unique gagnant en concurrence), puis broadcast `BINGO`.
  - Exceptions (`fr.pivot.collaboratif.bingo.exception`) mappées par `GlobalExceptionHandler` :
    `InvalidCodeException` (400), `InvalidDisplayNameException` (400), `RoomNotFoundException` (404 anti-énumération),
    `RoomFinishedException`, `InvalidCellException`, `SpectatorCannotMarkException` (rejets STOMP → `/user/queue/errors`).
  - Tests : TI succès create/join authentifié + anonyme, code invalide/inconnu/expiré → 404, grille 25 cases
    distinctes, dispositions indépendantes entre 2 participants, mark + `CELL_MARKED` agrégé, bingo ligne/colonne/diagonale,
    unicité du gagnant en concurrence, seuil → spectateur, spectateur ne peut cocher, **TI d'inspection du payload STOMP brut**
    (aucune fuite de disposition/phrase), `displayName` échappé.
- **Frontend** `pivot-collaboratif-ui` : feature `features/bingo/` — `join-room` (code + pseudonyme
  optionnel), `bingo-board` (grille 5×5 de `<button>`, tableau de progression, bannière de victoire),
  `BingoWsService` (STOMP `@stomp/rx-stomp` vers `/ws/collaboratif`, souscription avec en-tête natif
  `access-token`, capacité `publish` du `mark`) et `BingoHttpService` (create/join/grid). Routes
  lazy-loaded sous `collaboratif/bingo/*`. Rendu du `displayName` en texte pur (jamais `innerHTML`).
- **Gap accepté** : pas de rate limiting anti brute-force sur le code de join dans cette US (aligné sur
  US09.1.2, signalé ici pour traçabilité, non couvert par une AC).

---
Item Type: US · Parent: F47.1 · Module: collaboratif · Repo: pivot-collaboratif-core/ui · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Rôle: utilisateur-final
Dépendances: EN17 (pivot-core-starter + @pivot/ui-core publiés), EN47.1 (KPI, non bloquant), briques room temps réel EN09.1
