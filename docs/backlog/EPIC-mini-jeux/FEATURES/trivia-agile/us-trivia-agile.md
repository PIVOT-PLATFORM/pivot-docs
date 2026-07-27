# US47.3.1 — Jouer à Trivia Agile à plusieurs

**En tant que** participant à une pause d'équipe
**Je veux** répondre à une série de questions Scrum/agile chronométrées et voir le score final
**Afin de** apprendre en m'amusant avec mon équipe

Nouvelle mécanique temps réel du domaine `collaboratif`, alignée sur le pattern de room déjà
éprouvé par le module Session (E19) et le scrum-poker (isolation WebSocket par room, join par code,
jeton d'accès room-scopé). S'appuie sur la banque de questions Scrum/agile fournie avec la Feature.

**Cadrage Gate 1 (décisions figées ici) :**

- **Progression automatique, pilotée par le serveur** — le déroulé des questions n'est **pas**
  piloté manuellement par un animateur. Le créateur de la partie ne dispose que de deux actions
  (créer, démarrer) ; ensuite le serveur enchaîne les questions automatiquement (fin du minuteur
  **ou** tous les participants actifs ont répondu → clôture, puis intervalle de classement, puis
  question suivante). Ce choix évite délibérément l'extension de périmètre « rôle animateur/host
  distinct des joueurs » signalée non tranchée par l'Epic E47 (README §« Repères marché ») : un
  déroulé piloté question par question par un host reste **Hors périmètre** tant que le mainteneur
  ne l'a pas qualifié.
- **Formule de score (benchmark Kahoot, explicitée) :** pour une réponse **correcte**,
  `points = round(1000 × (1 − (responseTimeMs / timerMs) / 2))`, où `timerMs = timer_seconds × 1000`
  (défaut 15 000) et `responseTimeMs` est mesuré **côté serveur** (instant de réception − instant de
  diffusion `QUESTION_STARTED`), borné à `[0, timerMs]`. Une réponse correcte instantanée vaut 1000,
  une réponse correcte à l'extrême limite du minuteur vaut 500 (plancher Kahoot). Réponse
  **incorrecte** ou **absente** : 0. Aucun horodatage client n'entre jamais dans ce calcul (voir
  Sécurité).
- **Seuils de participants (dégradation progressive, benchmark Kahoot/Mentimeter/Slido) :** seuil
  souple `max-participants-soft` (défaut 100) et plafond dur `max-participants-hard` (défaut 300),
  configurables. Aucun blocage temporisé façon Mentimeter (contre-modèle explicite de l'Epic).

## Critères d'acceptation

### Rejoindre une partie (join par code, avec ou sans compte)

| Critère | 🤖 Dev |
|---------|--------|
| Given un participant du tenant, when `POST /api/collaboratif/trivia/games` avec `{ "teamId": <UUID>, "questionCount": <1-50, défaut 20>, "timerSeconds": <5-60, défaut 15> }`, then 201 avec `{ gameId, joinCode, status: "LOBBY", questionCount, timerSeconds }` et un `joinCode` unique (6 caractères alphanumériques majuscules, sans caractères ambigus `0/O/1/I`) est généré | ⬜ |
| Given une partie en `LOBBY`, when un utilisateur **authentifié** envoie `POST /api/collaboratif/trivia/games/join` avec `{ joinCode, displayName }`, then 200 avec `{ gameId, participantId, accessToken, isGuest: false }` — le `displayName` par défaut est celui du compte s'il n'est pas fourni | ⬜ |
| Given une partie en `LOBBY`, when un utilisateur **sans compte PIVOT** envoie `POST .../join` avec `{ joinCode, displayName }` (non authentifié), then 200 avec `{ gameId, participantId, accessToken, isGuest: true }` — un participant invité `ROLE_GUEST` room-scopé est créé, sans persistance d'identité utilisateur | ⬜ |
| Given un participant a rejoint, when il ouvre l'abonnement STOMP `/topic/collaboratif/trivia/{gameId}` en présentant l'en-tête natif `access-token`, then il reçoit les événements de la partie ; sans jeton d'accès valide pour ce `gameId`, l'abonnement est refusé par le `TriviaChannelInterceptor` | ⬜ |
| Given un participant rejoint **après** le démarrage (STOMP `QUESTION_STARTED` manqué), when il interroge `GET /api/collaboratif/trivia/games/{gameId}/current`, then 200 renvoie l'état courant `{ status, questionIndex, prompt, choices, timerSeconds, remainingMs }` **sans** `correctChoiceIndex`, ce qui lui permet d'afficher et de répondre à la question en cours | ⬜ |

### Déroulement d'une question (minuteur, diffusion, réponse)

| Critère | 🤖 Dev |
|---------|--------|
| Given une partie en `LOBBY`, when le créateur envoie `POST /api/collaboratif/trivia/games/{gameId}/start`, then la partie passe en `IN_QUESTION`, la banque tire `questionCount` questions Scrum/agile (défaut 20, ordre figé pour la partie) et un événement `QUESTION_STARTED` (`{ type, gameId, questionId, index, prompt, choices, timerSeconds, startedAt }`, **jamais** `correctChoiceIndex`) est diffusé sur `/topic/collaboratif/trivia/{gameId}` | ⬜ |
| Given une question `IN_QUESTION`, when un participant envoie `SEND /app/collaboratif/trivia/{gameId}/answer` (en-tête natif `access-token`, corps `{ questionId, choiceIndex }`), then sa réponse est persistée (une ligne par `(game, question, participant)`), les points sont calculés côté serveur (voir formule), et un événement agrégé `ANSWER_RECEIVED` (`{ type, gameId, questionId, answeredCount, totalParticipants }`) est diffusé — **aucune** valeur de réponse ni identité de répondant, ni pour quiconque | ⬜ |
| Given une question ouverte, when le minuteur expire **ou** tous les participants actifs ont répondu, then le serveur clôture la question et diffuse `QUESTION_CLOSED` (`{ type, gameId, questionId, correctChoiceIndex, ranking: [{ participantId, displayName, totalScore, rank, lastPoints }] }`) — c'est le **seul** événement qui révèle `correctChoiceIndex` | ⬜ |
| Given une question clôturée et qu'il reste des questions, when l'intervalle de classement (`between-questions-seconds`, défaut 5) s'écoule, then le serveur diffuse automatiquement le `QUESTION_STARTED` suivant ; à la dernière question, il diffuse `GAME_FINISHED` et passe la partie en `FINISHED` | ⬜ |

### Score, bonus de rapidité et classement intermédiaire

| Critère | 🤖 Dev |
|---------|--------|
| Given une réponse **correcte** reçue à `responseTimeMs` (borné `[0, timerMs]`), when les points sont calculés, then `points = round(1000 × (1 − (responseTimeMs / timerMs) / 2))` (1000 instantané, 500 à la limite du minuteur) | ⬜ |
| Given une réponse **incorrecte** ou **aucune réponse** avant clôture, when les points sont calculés, then `points = 0` et le `totalScore` du participant reste inchangé | ⬜ |
| Given une question vient d'être clôturée (pas seulement la fin de partie), when `QUESTION_CLOSED` est diffusé, then il porte un `ranking` complet trié par `totalScore` décroissant — le classement intermédiaire est visible **après chaque question** (benchmark Kahoot) | ⬜ |
| Given deux participants à égalité de `totalScore`, when le `rank` est calculé, then ils partagent le même `rank`, l'ordre d'affichage étant départagé par le `joinedAt` le plus ancien (départage déterministe, jamais aléatoire) | ⬜ |

### Écran de score final

| Critère | 🤖 Dev |
|---------|--------|
| Given la dernière question clôturée, when `GAME_FINISHED` est diffusé (`{ type, gameId, finalRanking: [{ participantId, displayName, totalScore, rank }] }`), then tous les participants voient l'écran de score final classant l'ensemble des participants par `totalScore` décroissant | ⬜ |
| Given une partie `FINISHED`, when un participant interroge `GET /api/collaboratif/trivia/games/{gameId}/results`, then 200 renvoie le `finalRanking` (même forme) — permet d'afficher à nouveau le classement final après un rechargement | ⬜ |

### Seuil de participants et dégradation progressive

| Critère | 🤖 Dev |
|---------|--------|
| Given une partie comptant moins de `max-participants-soft` (défaut 100) participants actifs, when un participant répond, then chaque `ANSWER_RECEIVED` est diffusé en temps réel (un par réponse) | ⬜ |
| Given une partie ayant atteint `max-participants-soft`, when des réponses affluent, then les `ANSWER_RECEIVED` sont **regroupés/throttlés** (agrégat rediffusé au plus toutes les `answer-broadcast-throttle-ms`, défaut 500 ms) — jamais de blocage, seulement une cadence de diffusion réduite | ⬜ |
| Given une partie ayant atteint `max-participants-hard` (défaut 300), when un nouveau participant tente `POST .../join`, then 409 `{ code: "GAME_FULL" }` avec un message non bloquant invitant à réessayer — **jamais** de verrouillage temporisé façon Mentimeter | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `joinCode` inexistant, expiré ou d'une partie déjà `FINISHED`, when `POST .../join`, then 404 `{ code: "GAME_NOT_FOUND" }` — convention anti-énumération (jamais 403, aucune distinction « existe mais fermée » vs « inexistante ») | ⬜ |
| Error : given un `displayName` vide ou > 40 caractères, when `POST .../join`, then 400 `{ code: "INVALID_DISPLAY_NAME" }` | ⬜ |
| Error : given un appelant qui n'est **pas** le créateur de la partie, when `POST .../start`, then 403 `{ code: "GAME_OWNER_ONLY" }` | ⬜ |
| Error : given une partie déjà `IN_QUESTION` / `FINISHED`, when `POST .../start`, then 409 `{ code: "GAME_ALREADY_STARTED" }` (démarrage idempotent-safe, pas de double tirage de questions) | ⬜ |
| Error : given un `SEND .../answer` portant un `questionId` qui n'est pas la question ouverte (question déjà clôturée, minuteur expiré, ou `questionId` d'une autre partie), when il est reçu, then il est rejeté sans diffusion (aucun `ANSWER_RECEIVED`), aucune persistance, et une erreur est envoyée à l'émetteur seul sur `/user/queue/errors` (`{ code: "QUESTION_NOT_OPEN" }`) | ⬜ |
| Error : given un participant a **déjà** répondu à la question en cours, when il renvoie un `SEND .../answer`, then la 2ᵉ réponse est ignorée (première réponse verrouillée — une seule réponse comptée par `(game, question, participant)`, benchmark Kahoot), erreur `{ code: "ALREADY_ANSWERED" }` à l'émetteur seul | ⬜ |
| Error : given un `choiceIndex` hors de l'intervalle des choix de la question, when `SEND .../answer`, then rejet sans persistance ni diffusion, erreur `{ code: "INVALID_CHOICE" }` à l'émetteur seul | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `correctChoiceIndex` n'est **jamais** exposé au client avant la clôture de la question — absent de `QUESTION_STARTED`, de `GET .../current`, de `ANSWER_RECEIVED` ; présent uniquement dans `QUESTION_CLOSED`. Test d'intégration obligatoire inspectant les **octets bruts** de la trame STOMP (pas seulement la désérialisation typée) prouvant qu'aucun abonné ne reçoit la bonne réponse pendant que la question est ouverte | ⬜ |
| Security : `responseTimeMs` (donc le score) est calculé exclusivement à partir de l'horloge serveur (`QUESTION_STARTED.startedAt` → instant de réception serveur) ; aucun horodatage, durée ou score fourni par le client n'est jamais lu — empêche la triche sur le bonus de rapidité | ⬜ |
| Security : l'identité du répondant pour la déduplication `(game, question, participant)` est dérivée exclusivement du grant `(gameId, accessToken)` vérifié par le `TriviaChannelInterceptor` avant l'exécution du handler ; aucun `participantId`/`userId` du payload client n'est jamais requis ni fait confiance | ⬜ |
| Security : le jeton d'accès brut n'est jamais persisté — la clé de déduplication `collaboratif.trivia_answer.participant_key` est un hachage SHA-256 (hex) du jeton d'accès | ⬜ |
| Security : une partie n'est visible que par ses participants (room dédiée) ; `teamId`/`tenantId` sont résolus depuis le `RequestPrincipal` sur les endpoints authentifiés (jamais depuis le corps/query) ; un `SEND .../answer` visant la destination d'une **autre** partie que celle du grant est rejeté (aucune fuite cross-room), avec test d'intégration cross-room dédié | ⬜ |

### Frontend (`pivot-collaboratif-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran de jonction, when un participant saisit un `joinCode` et un pseudo, then il rejoint qu'il soit connecté ou non (parcours invité proposé sans obligation de compte) | ⬜ |
| Given `QUESTION_STARTED` reçu (ou `GET .../current` à la connexion tardive), when l'UI l'affiche, then le libellé de la question, ses choix cliquables et un minuteur visuel décomptant `timerSeconds` sont rendus, sans jamais afficher la bonne réponse | ⬜ |
| Given un participant sélectionne un choix, when la réponse est envoyée, then seule **sa propre** sélection est mise en évidence localement (état de composant), les choix se verrouillent, et l'UI attend `QUESTION_CLOSED` sans révéler la bonne réponse tant qu'elle n'est pas reçue | ⬜ |
| Given `ANSWER_RECEIVED` reçu, when l'UI le traite, then un compteur « X/Y ont répondu » se met à jour, sans jamais afficher de réponse individuelle | ⬜ |
| Given `QUESTION_CLOSED` reçu, when l'UI l'affiche, then la bonne réponse est mise en évidence, les points gagnés à cette question sont affichés, puis le classement intermédiaire est présenté pendant l'intervalle avant la question suivante | ⬜ |
| Given `GAME_FINISHED` reçu, when l'UI l'affiche, then l'écran de score final classe tous les participants ; un rechargement réhydrate ce classement via `GET .../results` | ⬜ |

### A11y

| Critère | 🤖 Dev |
|---------|--------|
| A11y : les choix de réponse sont des `<button>` natifs, navigables au clavier, avec `aria-pressed` reflétant la sélection locale du participant | ⬜ |
| A11y : bonne/mauvaise réponse et rang ne reposent jamais sur la seule couleur — un libellé texte et/ou une icône accompagnent systématiquement l'indication visuelle | ⬜ |
| A11y : le compteur « X/Y ont répondu » et le classement intermédiaire sont des régions `aria-live="polite"` ; le minuteur n'est **pas** une région live assertive (pas d'annonce à chaque seconde) — le temps restant est annoncé au démarrage de la question et à un seuil critique proche de l'expiration | ⬜ |
| A11y : tous les libellés (jonction, question, choix, compteur, classement, erreurs) sont externalisés via Transloco (`fr.json`/`en.json`) — aucune chaîne littérale dans les templates | ⬜ |

## Hors périmètre

- **Déroulé piloté manuellement par un animateur/host** (avancer la question à la main, mettre en pause) — extension « rôle animateur distinct des joueurs » non tranchée par l'Epic E47, à qualifier avec le mainteneur ; cette US fige une progression automatique pilotée par le serveur
- **Édition de la banque de questions** (créer/importer ses propres questions) — la banque Scrum/agile fournie est consommée telle quelle ; pas d'endpoint d'administration de questions ici
- **Présence temps réel précise** (retrait immédiat du dénominateur `Y` à la déconnexion) — `totalParticipants` reflète le registre des jetons d'accès actifs, pas une détection de fermeture de connexion WebSocket
- **Persistance longue durée / historique des parties jouées** et statistiques d'équipe — seuls les résultats de la partie en cours sont exposés (`GET .../results` tant que la partie n'est pas purgée)
- **Rejouer/relancer une partie** avec les mêmes participants en un clic — hors périmètre, non demandé par le stub
- **Nuage de mots collaboratif** et **variante de notation/classement plus riche** — pistes F47.4 potentielles signalées non tranchées par l'Epic E47

## Notes d'implémentation

- **Repo cible** : backend **`pivot-collaboratif-core`** (schéma Flyway `collaboratif`, FK → `public.teams.id`) ; frontend **`pivot-collaboratif-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`). Pré-requis EN17 (pivot-core-starter + `@pivot/ui-core` publiés) — cf. Epic E47.
- **Entités (schéma `collaboratif`)** :
  - `collaboratif.trivia_game` : `id UUID PK`, `join_code VARCHAR(6) UNIQUE` (unicité sur les parties non `FINISHED`), `team_id UUID NOT NULL` (FK → `public.teams.id`), `owner_key CHAR(64) NOT NULL` (SHA-256 du grant du créateur), `status VARCHAR(20) NOT NULL DEFAULT 'LOBBY'` (`CHECK IN ('LOBBY','IN_QUESTION','BETWEEN_QUESTIONS','FINISHED')`), `question_count INT NOT NULL DEFAULT 20`, `timer_seconds INT NOT NULL DEFAULT 15`, `current_question_index INT NOT NULL DEFAULT -1`, `created_at`, `finished_at` (nullable).
  - `collaboratif.trivia_question` : banque fournie — `id UUID PK`, `category VARCHAR`, `prompt TEXT NOT NULL`, `choices JSONB NOT NULL` (liste ordonnée de libellés), `correct_choice_index INT NOT NULL`. Le `correct_choice_index` ne quitte **jamais** le backend avant `QUESTION_CLOSED`.
  - `collaboratif.trivia_game_question` : `game_id`, `question_id`, `order_index` — questions tirées et figées pour une partie (ordre déterministe).
  - `collaboratif.trivia_participant` : `id UUID PK`, `game_id`, `participant_key CHAR(64) NOT NULL` (SHA-256 du jeton d'accès), `display_name VARCHAR(40) NOT NULL`, `is_guest BOOLEAN NOT NULL`, `total_score INT NOT NULL DEFAULT 0`, `joined_at`. Unique `(game_id, participant_key)`.
  - `collaboratif.trivia_answer` : `id UUID PK`, `game_id`, `question_id`, `participant_key CHAR(64) NOT NULL`, `choice_index INT NOT NULL`, `is_correct BOOLEAN NOT NULL`, `response_time_ms INT NOT NULL`, `points_awarded INT NOT NULL`, `answered_at`. Unique `(game_id, question_id, participant_key)` — verrouille la première réponse.
- **Endpoints REST** (`/api/collaboratif/trivia`) : `POST /games` (création), `POST /games/join`, `POST /games/{gameId}/start`, `GET /games/{gameId}/current`, `GET /games/{gameId}/results`.
- **STOMP** :
  - Destination cliente : `SEND /app/collaboratif/trivia/{gameId}/answer` (en-tête natif `access-token`, corps `SubmitAnswerRequest(UUID questionId, int choiceIndex)`).
  - Topic de diffusion : `/topic/collaboratif/trivia/{gameId}`.
  - Événements (champ `type` littéral en tête) : `QUESTION_STARTED`, `ANSWER_RECEIVED`, `QUESTION_CLOSED`, `GAME_FINISHED` (formes exactes dans les AC ci-dessus). Erreurs par émetteur : `/user/queue/errors`.
- **Isolation & progression** : `TriviaChannelInterceptor` + `TriviaRoomAccessGrantService` (miroir du pattern EN09.1 scrum-poker / room Session E19) — grant `(gameId, accessToken)` room-scopé, y compris pour les invités `ROLE_GUEST`. Un `TriviaParticipantRegistryService` (Set Redis `trivia:participants:{gameId}`, TTL rafraîchi) fournit `totalParticipants`. La progression automatique (clôture minuteur + enchaînement des questions) est portée par un ordonnanceur serveur par partie (`TaskScheduler`), jamais par une action client.
- **Exceptions** (ajoutées au `GlobalExceptionHandler` collaboratif) : `GameNotFoundException` (404, `GAME_NOT_FOUND`), `InvalidDisplayNameException` (400, `INVALID_DISPLAY_NAME`), `GameOwnerOnlyException` (403, `GAME_OWNER_ONLY`), `GameAlreadyStartedException` (409, `GAME_ALREADY_STARTED`), `GameFullException` (409, `GAME_FULL`).
- **Configuration** (`application.yml`, préfixe `collaboratif.trivia`) : `max-participants-soft` (100), `max-participants-hard` (300), `answer-broadcast-throttle-ms` (500), `between-questions-seconds` (5) — valeurs par défaut, ajustables sans changement de code.
- **Frontend** `pivot-collaboratif-ui` : nouvelle feature `trivia/` (écrans join / lobby / question / classement intermédiaire / score final) montée depuis le Hub ; un `TriviaWsService` (abonnement + `publish` de la réponse, miroir de `RoomWsService`) et un `TriviaHttpService` pour les endpoints REST. i18n embarqué dans le package puis fusionné côté shell (post-build merge-module-i18n).
- **Conventions réutilisées** : 404 anti-énumération (scrum-poker US09.1.x), masquage prouvé par test d'intégration sur payload STOMP brut (US20.1.2a / US09.2.1).

---
Item Type: US · Parent: F47.3 · Module: collaboratif · Repo: pivot-collaboratif-core/ui · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Rôle: utilisateur-final
