# US09.1.1 — Créer une room de planning poker

**En tant que** Scrum Master / facilitateur
**Je veux** créer une room de planning poker avec un code d'invitation
**Afin de** démarrer une session d'estimation avec mon équipe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un facilitateur authentifié et un nom de room valide (1 à 120 caractères), when il appelle `POST /api/agilite/poker/rooms` avec `{ "name": "…" }`, then l'API retourne 201 avec la room créée : `id`, `name`, `inviteCode` (6 caractères), `sequence: "FIBONACCI"`, `cardValues` (jeu de cartes fixe), `facilitatorUserId`, `active: true`, `createdAt`, `expiresAt`, `wsTopic` | ⬜ |
| Given le champ `expirationHours` absent du corps de la requête, when la room est créée, then `expiresAt` = `createdAt` + 24h (valeur par défaut, configurable côté serveur via propriété d'application) | ⬜ |
| Given `expirationHours` = N fourni avec 1 ≤ N ≤ 168, when la room est créée, then `expiresAt` = `createdAt` + N heures | ⬜ |
| Given une room existante appartenant au tenant courant, when le facilitateur appelle `GET /api/agilite/poker/rooms/{roomId}`, then l'API retourne 200 avec les mêmes champs que la création | ⬜ |
| Given une room créée, then `inviteCode` fait exactement 6 caractères, alphanumériques majuscules, excluant les caractères ambigus à la lecture (`0`, `1`, `I`, `O`), et unique en base (retry serveur en cas de collision) | ⬜ |
| Given un utilisateur authentifié qui crée une room, then `facilitatorUserId` correspond exactement au `userId` du principal résolu côté serveur pour cet appel (jamais une valeur fournie par le client) | ⬜ |
| Given une room créée, then `sequence` vaut toujours `"FIBONACCI"` et `cardValues` est la suite fixe `["0","1","2","3","5","8","13","21","34","55","89","?"]` — aucun champ de la requête ne permet de la modifier (ADR-026 §2 : deck paramétrable différé v2+) | ⬜ |
| Given une room créée, then `wsTopic` vaut `/topic/agilite/poker/{id}` (convention actée par ADR-026 §2 pour US09.1.2) | ⬜ |
| Error : given `name` absent, vide ou composé uniquement d'espaces, when `POST /api/agilite/poker/rooms` est appelé, then 400 avec code `INVALID_NAME` | ⬜ |
| Error : given `name` de plus de 120 caractères, when `POST /api/agilite/poker/rooms` est appelé, then 400 avec code `INVALID_NAME` | ⬜ |
| Error : given `expirationHours` = 0 ou > 168, when `POST /api/agilite/poker/rooms` est appelé, then 400 avec code `INVALID_EXPIRATION` | ⬜ |
| Error : given un `roomId` inexistant, when `GET /api/agilite/poker/rooms/{roomId}` est appelé, then 404 | ⬜ |
| Error : given aucun header `Authorization: Bearer` valide (absent, malformé, token inconnu/expiré/révoqué/tenant ou utilisateur désactivé), when `POST` ou `GET` est appelé, then 401 générique — sans fuite d'information distinguant la cause exacte | ⬜ |
| Security : `tenantId` et `facilitatorUserId` sont exclusivement dérivés du principal authentifié résolu côté serveur depuis le token porteur (`RequestPrincipal`/`AuthenticatedPrincipalResolver`, `fr.pivot:pivot-core-starter`) — jamais acceptés depuis le corps JSON, un paramètre de requête ou un header custom | ⬜ |
| Security : Test TI cross-tenant obligatoire — `GET /api/agilite/poker/rooms/{roomId}` sur une room appartenant à un autre tenant retourne 404 (jamais 403, aucune confirmation d'existence cross-tenant) | ⬜ |
| Security : le jeu de cartes (`sequence`/`cardValues`) est figé côté serveur, non pilotable par l'appelant, quel que soit le rôle — évite qu'un client contourne le périmètre v1 (ADR-026 §2, dernier point "Interdit") | ⬜ |
| A11y : le formulaire de création de room a un champ nom avec label associé (`<label for>` ou `aria-label`) ; une erreur de validation est annoncée via `aria-invalid="true"` + message relié par `aria-describedby` | ⬜ |
| A11y : après création, le code d'invitation est affiché en texte lisible par lecteur d'écran (jamais uniquement une image ou une couleur) et copiable via un bouton focusable au clavier avec `aria-label` explicite (ex. "Copier le code d'invitation") | ⬜ |
| A11y : pendant la soumission, le bouton de création est désactivé avec `aria-busy="true"` ; le résultat (succès ou erreur réseau/5xx) est annoncé via une zone `aria-live="polite"` (succès) ou `role="alert"` (erreur) | ⬜ |

## Hors périmètre

- Jeu de cartes paramétrable par équipe (Fibonacci vs T-shirt vs suite personnalisée) — différé v2+, aucune US écrite (ADR-026 §2, ex-US09.1.3 mentionnée mais non créée)
- Distribution des votes à la révélation (moyenne/médiane/dispersion) — hors périmètre v1 (ADR-026 §2), de toute façon hors scope de cette US (couvre US09.2.2)
- Rejoindre une room via le code d'invitation, gestion des participants — US09.1.2 (US suivante, dépend de celle-ci)
- Vote asynchrone, intégrations tierces (import Jira/Plane/GitLab), compte invité persistant — différés v2+ (ADR-026 §2)
- Renommer/supprimer une room, lister les rooms d'un tenant — non spécifié par cette US, à couvrir par une US dédiée si le besoin est confirmé

## Notes d'implémentation

- **Backend** (`pivot-agilite-core`) : table `agilite.poker_rooms` ajoutée à `V1__schema_init.sql` (schéma non stabilisé pré-BETA, fichier unique par convention) — colonnes `tenant_id` (FK `public.tenants(id)`), `facilitator_user_id` (FK `public.users(id)`), `name`, `invite_code` (unique), `sequence` (contrainte `CHECK` limitée à `'FIBONACCI'` en v1), `active`, `created_at`, `expires_at`.
- **Premier consommateur de `fr.pivot:pivot-core-starter` dans ce repo** — la note de gap du `CLAUDE.md` de ce repo (starter non consommable) est obsolète : `pivot-core-starter` est publié et consommé depuis `pivot-collaboratif-core` (EN08.3, épinglé `0.27.1`, voir son `CLAUDE.md`). Reproduire ici le même pattern : `TokenValidationService implements AuthenticatedPrincipalResolver` (entités read-only `public.access_tokens`/`users`/`tenants`), `RequestPrincipal`/`RequestPrincipalResolver` (`HandlerMethodArgumentResolver`), `SecurityConfig` permit-all (le starter tire transitivement `spring-boot-starter-security`, qui challenge sinon toute requête en HTTP Basic — piège déjà rencontré et documenté sur `pivot-collaboratif-core`).
- `wsTopic` exposé dans la réponse suit la convention déjà actée par ADR-026 §2 (`/topic/agilite/poker/{roomId}`) pour US09.1.2 — à reconfirmer une fois EN09.1 (isolation WebSocket, en cours en parallèle dans ce même repo) mergé, si son mécanisme d'isolation diffère de la convention documentée.
- Code d'invitation généré via `SecureRandom`, alphabet réduit (sans `0`/`1`/`I`/`O`), retry sur violation de contrainte unique.
- **Frontend** (`pivot-agilite-ui`) : formulaire minimal (nom + soumission) + affichage du code généré. Aucune logique d'authentification locale (interdit par le `CLAUDE.md` de ce repo) — `HttpClient` appelle directement `POST/GET /api/agilite/poker/rooms`, l'attachement du header `Authorization` reste délégué à `@pivot/ui-core` (`AuthInterceptor`, EN17.3, pas encore consommable) une fois monté dans le shell `pivot-ui` ; aucun changement requis dans ce composant quand EN17.3 sera résolu.

---
Item Type: US · Parent: F09.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: aucune (Vague 1, Sprint 8 — parallélisable avec EN09.1)
