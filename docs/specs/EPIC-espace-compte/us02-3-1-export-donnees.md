# US02.3.1 — Export de ses données personnelles

## Contexte

- **US** : `docs/backlog/EPIC-espace-compte/FEATURES/droits-rgpd/us-export-donnees.md` (F02.3 — Droits RGPD, EPIC-espace-compte E02)
- **PR backend** : `pivot-core` [#133](https://github.com/PIVOT-PLATFORM/pivot-core/pull/133) (`feat/us02-3-1-export-donnees`)
- **PR frontend** : `pivot-ui` [#75](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/75) (`feat/us02-3-1-export-donnees`)
- **Dernier commit au moment du figeage** :
  - `pivot-core` #133 : `8170e0f` (merge commit `c8d5f8c`)
  - `pivot-ui` #75 : `6331a75` (merge commit `2734cea`)
- **Gate 2 COVERAGE** :
  - `pivot-core` #133 : 95/100 (auto-évalué) — 377 tests module, 0 échec (`./mvnw verify`), `checkstyle`/`spotbugs` 0 violation
  - `pivot-ui` #75 : 100/100 (auto-évalué, corrigé en revue de 98→100 — voir Divergences) — 651/651 tests Vitest verts, `npm run lint` 0 erreur
- **Gate 4 MERGE_CONFIDENCE** :
  - `pivot-core` #133 : 97/100 — **MERGE_AUTONOMOUS**
  - `pivot-ui` #75 : 94/100 — **MERGE_AUTONOMOUS**
- **Dépend de** : `EmailService` i18n Thymeleaf (PR #107, réutilisé tel quel pour les gabarits `export-ready.html`/`export-failed.html`) · `AccessTokenRepository`/`AuditEventRepository` existants (extension mineure, pas de nouvelle dépendance).

---

## Spec fonctionnelle

### Demande d'export (backend)

`POST /api/account/export` crée une demande `PENDING`, journalise l'audit event `DataExportRequested`
et déclenche la génération en arrière-plan via **Spring `@Async` simple** (`DataExportService`,
`@EnableAsync` déjà déclaré sur `AppConfig` pour `AuditService`/`TokenService` — premier job
asynchrone réel de `pivot-core`, aucune nouvelle queue/broker introduite). Règles :

- **Rate limit** : 1 export / 24h par utilisateur — rejet `429 Too Many Requests` avec `Retry-After`
  (réutilise `RateLimitException` + `GlobalExceptionHandler`, déjà en place pour login/reset
  password — zéro nouveau code de gestion d'erreur).
- **Demande déjà en cours** : rejet `409 Conflict` (`ResponseStatusException`, pattern
  `PasswordService`).
- **Contenu de l'archive** (ZIP : `manifest.json`, `profil.json`, `sessions.json`,
  `audit-events.json`) : périmètre MVP explicite de l'AC — profil, sessions, audit events ;
  données des modules collaboratifs différées à une phase ultérieure.
- **Stockage** : filesystem local (`pivot.export.storage-path`, configurable, gitignored),
  cohérent avec le choix déjà fait pour les avatars (US02.1.1). Purge planifiée nocturne des
  archives expirées (`ExportCleanupScheduler`).
- **Lien de téléchargement** : envoyé par email (`EmailService#sendExportReadyEmail`, gabarit
  Thymeleaf `export-ready.html`), TTL 24h. Un email d'échec (`export-failed.html`) est aussi
  envoyé si la génération plante, pour ne jamais laisser l'utilisateur sans réponse.

### Endpoint de statut — addition au-delà de l'AC littéral

`GET /api/account/export/status` a été ajouté par l'auteur backend **au-delà des deux endpoints
littéralement cités par l'AC**, pour résoudre une ambiguïté d'AC documentée selon la règle CLAUDE.md
("AC ambigu → clarifier, jamais d'interprétation unilatérale") : l'AC décrit le comportement du
bouton désactivé ("Si demande en cours ou < 24h écoulées...") mais ne précise pas comment le
frontend connaît cet état **avant** que l'utilisateur ne clique. `GET /status` renvoie
`{ status, requestedAt, completedAt, expiresAt, nextAvailableAt }` et permet à Angular de rendre
l'état initial correct (et de faire du polling après un `POST`) sans deviner depuis un `POST` en
échec. Signalé explicitement pour revue PO — non remis en cause depuis (les deux Gate 4 le
documentent comme dépendance de contrat à surveiller, pas comme un défaut).

### Téléchargement authentifié

`GET /api/account/export/download/{exportToken}` — jamais un lien signé public (pas de S3 presigned
URL sans auth). Vérifie `session.userId == export.ownerUserId` **avant** de vérifier l'expiration
(pas de fuite d'état d'expiration à un non-propriétaire) → `403` sur mismatch, `410` si expiré,
`404` si token inconnu/pas prêt. Le token brut n'est jamais persisté, seul son hash SHA-256 (même
convention que `access_tokens`/`password_reset_tokens`).

Côté Angular, le téléchargement ne peut pas être un simple `<a href>` vers l'API car l'endpoint est
authentifié par bearer token, non portable par un lien brut. `ExportDownloadComponent` :

1. Appelle `ExportService.download(token)` via `HttpClient` (`tokenInterceptor` attache le bearer
   automatiquement, `responseType: 'blob'`, `observe: 'response'`).
2. Construit une URL objet depuis le `Blob` reçu et déclenche l'enregistrement via un `<a download>`
   synthétique hors DOM.
3. Lit le token depuis `queryParamMap` (pas un snapshot ponctuel) pour qu'un second lien email
   ouvert dans le même onglet redéclenche correctement le téléchargement même si la stratégie de
   réutilisation de route Angular garde l'instance du composant en vie.

### Page Angular "Demander mon export"

`ExportComponent` (`/account/export`) :

- Affiche l'état initial du bouton (actif/désactivé) depuis `GET /status` **avant** toute tentative
  de `POST`, conformément à la logique documentée par le backend.
- Bouton désactivé (rate limit) : `aria-disabled="true"` (jamais `disabled` natif, pour rester
  accessible au clavier/lecteur d'écran) + motif "Prochain export disponible à HH:MM" via
  `aria-describedby`. Affichage `HH:MM` en 24h, locale-indépendant (`Intl`/`toLocaleTimeString`,
  `hour12: false`) — tronqué sans date (edge case mineur documenté si la fenêtre chevauche minuit).
- Après un `202` : état persistant "Demande reçue" (pas un toast) avec l'estimation, avec polling
  contre `GET /status` (intervalle 5s, plafonné à 60 tentatives) jusqu'à `READY`/`FAILED`.
- Erreur backend générique → toast "error" localisé + bouton réactivé. Les `409`/`429`
  spécifiquement **resynchronisent depuis `GET /status`** plutôt que de réactiver aveuglément, car
  ils reflètent un vrai conflit d'état (course avec un autre onglet), pas une erreur transitoire.
- Pendant la soumission du `POST` lui-même : `disabled` natif + spinner.
- Toutes les transitions d'état (idle/submitting/received/ready/failed/rate-limited) passent par une
  seule région `aria-live="polite"`.
- Tous les textes sous `account.rgpd.export.*` (`fr.json`/`en.json`).
- Le lien navbar "Mes données" (précédemment un placeholder désactivé "bientôt disponible") pointe
  désormais vers `/account/export`.

---

## Contrat technique

### Fichiers introduits / modifiés

**`pivot-core` (PR #133)**

| Fichier | Rôle |
|---------|------|
| `account/controller/AccountExportController.java` | Endpoints `POST /export`, `GET /export/status`, `GET /export/download/{token}` |
| `account/service/DataExportService.java` | Logique métier : création demande, rate-limit, génération `@Async`, résolution téléchargement |
| `account/service/ExportArchiveBuilder.java` | Construction du ZIP (`manifest.json`, `profil.json`, `sessions.json`, `audit-events.json`) |
| `account/service/ExportStorageService.java` | Persistance filesystem de l'archive |
| `account/scheduler/ExportCleanupScheduler.java` | Purge planifiée des archives expirées |
| `account/entity/DataExportRequest.java`, `DataExportStatus.java` (+ `Converter`) | Persistance de la demande, enum de statut |
| `account/dto/Export{Requested,Status,Profile,Session,AuditEvent}Dto.java` | DTOs jamais d'entité JPA exposée |
| `account/repository/DataExportRequestRepository.java` | Requêtes rate-limit / résolution token |
| `db/migration/V5__data_export_requests.sql` | Schéma table demandes d'export |
| `auth/repository/AccessTokenRepository.java`, `AuditEventRepository.java` | Extensions mineures (requêtes scopées `user_id`) |
| `auth/service/AuditService.java` | Constante `DATA_EXPORT_REQUESTED` |
| `auth/service/EmailService.java` | `sendExportReadyEmail` / échec, gabarits Thymeleaf (pattern PR #107) |
| `templates/email/export-{ready,failed}.html` | Gabarits email |

**`pivot-ui` (PR #75)**

| Fichier | Rôle |
|---------|------|
| `features/account/pages/export/export.component.ts` | Page `/account/export` : bouton, statut, polling, a11y |
| `features/account/pages/export-download/export-download.component.ts` | Route `/account/export/download`, lecture `?token=`, téléchargement blob authentifié |
| `features/account/service/export.service.ts`, `export.model.ts` | Client HTTP des 3 endpoints backend |
| `app/routes.ts` | Déclaration des 2 routes en `loadComponent()` lazy |
| `core/layout/navbar/navbar.component.ts` | Lien "Mes données" activé vers `/account/export` |
| `public/assets/i18n/{fr,en}.json` | 40 clés `account.rgpd.export.*` |

### Endpoints / modèles / contrats techniques pertinents

| Endpoint | Auth | Body | Succès | Erreurs |
|---|---|---|---|---|
| `POST /api/account/export` | Bearer | — | `202 {"requestId","status":"PENDING","requestedAt"}` | `401` · `409` déjà en cours · `429` <24h (`Retry-After`) |
| `GET /api/account/export/status` | Bearer | — | `200 {"status","requestedAt","completedAt","expiresAt","nextAvailableAt"}` | `401` |
| `GET /api/account/export/download/{exportToken}` | Bearer | — | `200` octet-stream (`Content-Disposition: attachment`) | `401` · `403` token d'un autre utilisateur · `404` inconnu/pas prêt · `410` expiré (>24h) |

Route email : `{appUrl}/account/export/download?token={token}` — l'auteur backend l'avait signalée
comme placeholder à confirmer côté frontend ; `ExportDownloadComponent` implémente exactement cette
route, aucun changement `EmailService` nécessaire.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US02.1.1 (avatar) | `ExportStorageService` réutilise le même choix de stockage filesystem local, pas de nouvelle dépendance infra |
| US02.2.4 (suppression de compte) | `AccountDeletionScheduler` (US02.2.4) suit le pattern déjà posé ici par `ExportCleanupScheduler` (`@EnableScheduling`) — un seul mécanisme de scheduling partagé, pas de duplication |
| PR #107 (`EmailService` i18n Thymeleaf) | Gabarits `export-{ready,failed}.html` réutilisent l'infrastructure email existante sans modification de contrat |

## Hors périmètre (explicitement exclu)

- Données des modules collaboratifs dans l'archive — différées à une phase ultérieure (AC "Socle"
  explicite)
- `DataExportDownloaded` — aucun audit event dédié au téléchargement réussi (l'AC ne requiert que
  `DataExportRequested`) ; un simple `WARN` log existe pour les tentatives cross-user refusées,
  signalé par l'auteur backend en cas de besoin futur d'une piste d'audit durable
- Spec Playwright E2E — différée conformément à l'exception explicite CLAUDE.md ("E2E différable si
  environnement indisponible"), couverture Vitest jugée exhaustive par les deux Gate 4

---

## Divergences notables vs plan pré-écrit

- **Endpoint `GET /status` non prévu par l'AC littéral** : ajouté par l'auteur backend pour lever
  une ambiguïté d'AC plutôt que d'interpréter unilatéralement le comportement du bouton désactivé
  (voir "Spec fonctionnelle" ci-dessus). Les deux Gate 4 le documentent comme un point de contrat à
  surveiller en cas d'évolution future, pas comme un défaut — accepté tel quel, jamais remis en
  cause depuis.
- **Fenêtre TOCTOU sur le rate-limit (finding Gate 4 backend, non bloquant)** : deux `POST
  /api/account/export` quasi simultanés du même utilisateur peuvent tous deux lire "pas de PENDING"
  avant que l'un des deux ne valide sa transaction — pas de contrainte DB unique partielle sur
  `(user_id) WHERE status IN ('pending','processing')`. Jugé à faible risque (mono-utilisateur,
  fenêtre courte) et non corrigé dans cette PR ; à envisager si observé en production.
- **Auto-évaluation Gate 2 frontend corrigée en revue (98→100)** : la description de la PR #75
  affirmait initialement que le cas limite `MAX_POLL_ATTEMPTS` (60 tentatives) n'était pas testé
  ("délibérément") — vérifié faux en Gate 4 : `export.service.spec.ts` contient bien un test dédié
  qui passe. Score corrigé en conséquence, pas une divergence fonctionnelle.
- **Bug pré-existant sur `main` trouvé et corrigé au passage (hors AC de cette US)** : lors du
  rebase de #75, `en.json`/`fr.json` avaient deux clés JSON de premier niveau `"account"` (la
  seconde écrasait silencieusement la première), rendant `account.security.*` invisible en
  production. Consolidé en un seul bloc par le reviewer Gate 4 — correction incidentale, non liée
  aux AC de l'export mais gardée dans le même merge faute d'US dédiée pour l'isoler.
- **Ordre de merge backend/frontend** : `pivot-ui` #75 a été écrite et auto-évaluée alors que
  `pivot-core` #133 était encore en draft/non mergée ; la PR frontend documente explicitement sa
  dépendance stricte au contrat de #133 et recommande de merger #133 en premier (ou en même temps).
  Confirmé a posteriori : #133 mergé le 2026-07-05, #75 le 2026-07-06 — ordre respecté.
