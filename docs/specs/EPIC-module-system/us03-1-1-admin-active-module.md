# US03.1.1 — Admin active un module pour son tenant

## Contexte

- **US** : `docs/backlog/EPIC-module-system/FEATURES/activation-admin/us-admin-active-module.md`
  (F03.1 — Activation admin, EPIC-module-system)
- **PR** : `pivot-core` [#122](https://github.com/PIVOT-PLATFORM/pivot-core/pull/122)
  (`feat/us03-1-admin-module-activation`) · `pivot-ui`
  [#66](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/66) (même nom de branche)
- **Dernier commit au moment du figeage** : `pivot-core` `a0bd97d` — `fix(api): neutralise CR/LF
  avant de loguer moduleId (CWE-117 log forging)` · `pivot-ui` `abbeb64` — `fix(ui): reconcilie
  AdminModulesComponent avec le ToastService partagé`
- **Gate 4 MERGE_CONFIDENCE** : `pivot-core` 92/100 — MERGE_AUTONOMOUS · `pivot-ui` 92/100 —
  MERGE_AUTONOMOUS
- **Dépend de** : EN03.1 (module registry, `pivot-core` PR #119 — mergée, cible initiale de la
  branche avant rebase sur `main`)
- **Périmètre réel des deux PR** : la PR `pivot-core` #122 et la PR `pivot-ui` #66 livrent en une
  seule fois **US03.1.1** (activer) et **US03.1.2** (désactiver), plus l'écran de liste
  **US03.2.1** côté `pivot-ui` — les trois US partagent le même contrôleur/service backend et le
  même composant `AdminModulesComponent` côté frontend. Cette spec ne documente que le périmètre
  **US03.1.1** (activation) ; US03.1.2 et US03.2.1 seront figées séparément si elles ne le sont
  pas déjà.

---

## Spec fonctionnelle

### Activation d'un module (`pivot-core`)

`POST /api/admin/modules/{id}/activate` active le module `{id}` pour le tenant de l'administrateur
authentifié (`ROLE_ADMIN`) :

- **200** `{ "id": "...", "enabled": true }` si l'activation réussit.
- **409** `{ "error": "MODULE_ALREADY_ACTIVE", "message": "..." }` si le module est déjà actif
  pour ce tenant.
- **403** `{ "error": "MODULE_NOT_IN_PLAN", "message": "..." }` si le module n'est pas enregistré
  dans le `ModuleRegistry` — voir § Simplification documentée.
- **401** si le contexte d'authentification est invalide ou ne porte pas de tenant.

Le `tenantId` cible est résolu **exclusivement** depuis l'entité `User` posée par
`TokenAuthenticationFilter` (jamais depuis le corps, un paramètre ou un en-tête) — une tentative de
cibler un autre tenant est structurellement impossible plutôt que rejetée a posteriori par un
contrôle explicite. L'isolation cross-tenant (l'activation pour le tenant A n'affecte jamais le
tenant B) est garantie par ce mécanisme et vérifiée en test d'intégration.

Le contrôle `ROLE_ADMIN` est porté par `@PreAuthorize("hasRole('ADMIN')")` sur
`AdminModuleActivationService` (couche service), pas uniquement sur le contrôleur — vérifié contre
le vrai proxy Spring `@EnableMethodSecurity` en test d'intégration (un appel `ROLE_USER` produit un
`AccessDeniedException` réel, pas un mock).

Chaque activation réussie déclenche un événement d'audit (`AuditService.MODULE_ACTIVATED`), en
complément du `ApplicationEventPublisher` déjà publié par `ModuleActivationService` (EN03.1).

### UI d'activation (`pivot-ui`, `/admin/modules`)

Le composant `AdminModulesComponent` (grille de cartes module, route `/admin/modules` sous le
shell authentifié, gardée par `adminGuard`) applique une mise à jour **optimiste** du toggle au
clic : l'état visuel bascule immédiatement, sans attendre la réponse serveur ni le TTL 60s du cache
Redis (EN03.3).

- **Succès** : toast succès "Module [nom] activé" (`role="status"`, `aria-live="polite"`).
- **Échec réseau ou 403** `MODULE_NOT_IN_PLAN` : le toggle revient à son état précédent (rollback
  optimiste) ; en complément, un message inline explicite s'affiche dans la carte du module
  ("Ce module n'est pas inclus dans votre plan") et un toast d'erreur générique
  (`role="alert"`, `aria-live="assertive"`) est affiché pour les autres cas d'échec.
- Chaque carte suit son propre état "en cours" (`isInFlight(id)`) — le toggle d'une carte en cours
  de traitement est désactivé, sans bloquer les autres cartes de la grille.
- Toutes les chaînes (noms de statuts, toasts, message inline) sont internationalisées sous la clé
  `admin.modules.*` dans `fr.json`/`en.json`.

---

## Contrat technique

### Fichiers introduits / modifiés — `pivot-core` (PR #122)

| Fichier | Rôle |
|---------|------|
| `AdminModuleController.java` (nouveau) | Endpoints `POST/DELETE /api/admin/modules/{id}/activate`, `GET /api/admin/modules` — délègue à `AdminModuleActivationService`, journalise l'audit après succès |
| `AdminModuleActivationService.java` (nouveau) | Logique métier activate/deactivate, `@PreAuthorize("hasRole('ADMIN')")`, résolution `tenantId` exclusivement via le token porteur |
| `AdminModuleDto.java` (nouveau) | `{ id, name, enabled, description }` — `description` toujours vide (`PivotModule` n'expose pas ce champ ; l'ajouter serait un changement de contrat de module, hors périmètre) |
| `ModuleAlreadyActiveException.java` (nouveau) | Mappé en 409 `MODULE_ALREADY_ACTIVE` |
| `ModuleNotInPlanException.java` (nouveau) | Mappé en 403 `MODULE_NOT_IN_PLAN`, Javadoc documentant la simplification plan/entitlement |
| `AuditService.java` (modifié) | Ajout des types d'événements `MODULE_ACTIVATED` / `MODULE_DEACTIVATED` |
| `spotbugs-exclude.xml` (modifié) | Whitelist `EI_EXPOSE_REP2` étendue à `fr.pivot.modules.api` (même pattern que les packages déjà whitelistés) |
| `AdminModuleActivationServiceTest.java`, `AdminModuleControllerTest.java` (TU), `AdminModuleActivationIntegrationTest.java` (TI, Testcontainers) | Voir § Tests |

### Fichiers introduits / modifiés — `pivot-ui` (PR #66)

| Fichier | Rôle |
|---------|------|
| `admin-module.model.ts` (nouveau) | Modèle `AdminModuleDto` miroir du DTO backend |
| `admin-module.service.ts` (nouveau) | Signals pour la liste (loading/error), `activate()`/`deactivate()` optimistes avec suivi par-module de l'état "en cours" et de l'erreur inline |
| `admin-modules.component.ts/.html/.scss` (nouveau) | Grille de cartes (`<ul><li>`), badge de statut texte, toggle (`aria-label`, `aria-pressed`, cible tactile ≥44px), skeleton de chargement, état vide, état d'erreur + retry |
| `admin.guard.ts` (nouveau) | Premier guard de route par rôle de `pivot-ui` — redirige les non-admins vers `/home` |
| `app.routes.ts` (modifié) | Route `/admin/modules`, lazy-loaded, gardée par `adminGuard` |
| `shared/toast/` (nouveau : `toast.service.ts`, modifié : `toast.component.html`) | `ToastService`/`ToastComponent` génériques (pas de composant toast dans `@pivot/design-system`, encore inexistant) |
| `shared/confirm-dialog/` (nouveau) | `ConfirmDialogComponent` — introduit par cette PR pour US03.1.2 (désactivation), sans usage direct dans le périmètre US03.1.1 |
| `fr.json` / `en.json` (modifiés) | Clés `admin.modules.*` |
| `shell.component.ts` (modifié) | Montage de `<piv-toast/>` une seule fois au niveau shell |

### Endpoints / modèles

| Endpoint | Codes retour |
|----------|--------------|
| `POST /api/admin/modules/{id}/activate` | `200 { id, enabled: true }` · `401` · `403 MODULE_NOT_IN_PLAN` · `409 MODULE_ALREADY_ACTIVE` |

Aucun changement de contrat `PivotModule`/OIDC. `spotbugs-exclude.xml` est la seule modification de
configuration qualité partagée, dans un pattern déjà existant.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US03.1.2 (Admin désactive un module) | Livrée dans les **mêmes PR** (`pivot-core` #122, `pivot-ui` #66) — contrôleur, service et composant UI partagés. À figer séparément (spec dédiée) si pas déjà fait. |
| US03.2.1 (UI liste modules avec statut) | Livrée dans la **même PR** `pivot-ui` #66 — `AdminModulesComponent`/`AdminModuleService` sont l'écran de liste lui-même, US03.1.1 n'en est que l'action "activer". À figer séparément si pas déjà fait. |
| EN03.1 (Module registry) | Dépendance de base (`ModuleRegistry`, `ModuleActivationService`) — mergée avant cette PR (#119). |
| EN03.3 (Cache Redis TTL 60s) | Dépendance différée et **non close** — voir § Écarts. |
| EN03.2 (`GET /api/modules/{id}/status`, guard Angular) | Non requis par le périmètre US03.1.1 (activation) — concerne surtout US03.1.2 (guard 403 post-désactivation), hors scope ici. |

---

## Écarts vs AC initiaux

Aucun écart de fond sur le périmètre fonctionnel de l'activation — les 15 AC listés dans le
backlog sont couverts, à une exception documentée près :

### Invalidation cache Redis (EN03.3) — non raccordée, AC non vérifiable

L'AC « Invalidation immédiate du cache Redis (EN03.3) » reste ⬜ dans le backlog. EN03.3 est
mergée sur `main` (`pivot-core` PR #121) mais son cache n'est pas raccordé au chemin de lecture
réel du statut module au moment de cette PR — l'activation ne peut donc pas être vérifiée comme
invalidant un cache qui n'est pas encore lu en production. Suivi technique à rouvrir/clore une fois
ce raccordement fait (déjà documenté dans le corps de la PR `pivot-core` #122 comme différé, hors
périmètre de cette US).

### Simplification documentée — pas de système plan/entitlement

« Module hors plan » (403 `MODULE_NOT_IN_PLAN`) est implémenté comme « module non enregistré dans
le `ModuleRegistry` » — il n'existe pas encore de table `plans`/`plan_modules` à ce stade du
backlog (introduite plus tard par US03.3.1). Documenté dans le Javadoc de `ModuleNotInPlanException`
et accepté en Gate 4 (92/100, pas de finding bloquant).

### `GET /api/admin/modules` sans test HTTP de bout en bout dédié

Relevé en finding 🟡 mineur du Gate 4 `pivot-core` : l'endpoint de liste est couvert par test
unitaire seul (pas de test d'intégration HTTP dédié), la résolution tenant étant déjà couverte par
les IT sur `activate`/`deactivate`. Accepté, à surveiller si l'endpoint évolue.

### Tests E2E Playwright différés

Environnement E2E indisponible lors de l'implémentation, des deux côtés (`pivot-core` et
`pivot-ui`) — déjà noté dans les notes de livraison du backlog.

---

## Tests

### `pivot-core`

| Test | Comportement vérifié |
|---|---|
| `AdminModuleActivationServiceTest` (5 TU) | Activation réussie, 409 si déjà actif, 403 si module non enregistré (+ variantes deactivate) |
| `AdminModuleControllerTest` (9 TU) | 200 + audit au succès, 401 si détails d'auth invalides / tenant absent, mapping 409/403, 200 liste avec `description` vide |
| `AdminModuleActivationIntegrationTest` (8 TI, Testcontainers) | RBAC réel via proxy `@EnableMethodSecurity` (`ROLE_USER` → 403), isolation cross-tenant (`activate_shouldNotAffectOtherTenant`), 409 sur double appel, 403 module non enregistré |

`mvn verify` local : 294 tests, 0 failure, 0 error. `mvn compile checkstyle:check spotbugs:check` :
0 warning.

### `pivot-ui`

| Test | Comportement vérifié |
|---|---|
| `admin-module.service.spec.ts` | Chargement succès/erreur, `activate()` optimiste + rollback, classification 403 `MODULE_NOT_IN_PLAN`, isolation de l'état "en cours" par module |
| `admin-modules.component.spec.ts` | Skeleton de chargement, état vide, état d'erreur + retry, toggle déclenche `activate()`, toggle désactivé pendant l'appel (sans affecter les autres cartes), message inline 403, toast succès/erreur, structure `<ul><li>`, `aria-label` |
| `admin.guard.spec.ts` | `ROLE_ADMIN` passe, autres rôles redirigés vers `/home` |

`test:ci` : 269/269 passing, 90.9% coverage stmt. `tsc --noEmit` : 0 erreur. `eslint` : 0 warning.
Build prod OK (2 warnings de budget SCSS pré-existants, non liés à cette PR).

---

## Hors périmètre (explicitement exclu)

- Désactivation d'un module (US03.1.2) et écran de liste complet (US03.2.1) — livrés dans les
  mêmes PR mais hors du périmètre fonctionnel de cette spec (activation uniquement).
- Système plan/entitlement réel (table `plans`, `plan_modules`) — introduit plus tard par
  US03.3.1/US03.3.2/US03.3.3.
- Invalidation effective du cache Redis (EN03.3 non raccordé au chemin de lecture) — suivi
  technique ouvert, non clos par cette US.
- `GET /api/modules/{id}/status` (TTL 60s, EN03.2) — hors périmètre.
- Terminaison WebSocket STOMP <5s sur désactivation — N/A, aucun module WebSocket n'existe encore
  dans la plateforme.
