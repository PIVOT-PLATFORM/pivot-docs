# EN03.2 — Guard Angular moduleGuard + status API

## Contexte

- **Enabler** : `docs/backlog/EPIC-module-system/ENABLERS/en-module-guard-angular.md` (E03 —
  Module System, Socle), couvert conjointement avec **US03.2.2** (Guard Angular bloque accès
  module désactivé) — même guard, mêmes tests, deux PR (une par repo) traitées comme une seule
  pièce de travail
- **PR backend** : `pivot-core` [#123](https://github.com/PIVOT-PLATFORM/pivot-core/pull/123)
  (`feat/en03-2-module-guard`) — `feat(api): EN03.2/US03.2.2 - GET /api/modules/{id}/status`
- **Dernier commit au moment du figeage (core)** : `7248fa4`
- **PR frontend** : `pivot-ui` [#67](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/67)
  (`feat/en03-2-module-guard`) — `feat(modules): EN03.2/US03.2.2 - moduleGuard bloque accès
  module désactivé`
- **Dernier commit au moment du figeage (ui)** : `950051f`
- **Gate 2 COVERAGE** : core 90.6 % coverage new code (SonarCloud) ; ui 89.77 % stmts / 92.3 %
  lignes (249 tests Vitest ciblés guard, 458 tests Vitest suite complète)
- **Gate 4 MERGE_CONFIDENCE** : core 100/100 (révisé depuis 99/100 — branchement cache Redis
  EN03.3, voir § Écarts) · ui 100/100 (révisé depuis 98/100 puis 97/100 sur un second passage
  ciblé US03.2.2 — clé i18n orpheline corrigée)
- **Dépend de** : EN03.1 (Module Registry) — branche core partie de `feat/en03-1-module-registry`
  (#119), rebasée après merge

---

## Spec fonctionnelle

### Endpoint `GET /api/modules/{id}/status` (pivot-core)

Endpoint d'introspection du statut d'un module pour le tenant de l'appelant, consommé
exclusivement par le guard Angular ci-dessous.

- **Authentification** : `@PreAuthorize("isAuthenticated()")` — `401` si contexte d'auth
  invalide. Le `tenantId` utilisé pour résoudre le statut est **exclusivement** celui du
  `User` porté par le token (`user.getTenant().getId()`) — jamais accepté en paramètre ou en
  body, ce qui élimine toute possibilité de consulter le statut d'un module pour un autre
  tenant.
- **Réponses** :
  - `200 {"enabled": true}` — module enregistré dans le `ModuleRegistry` et activé pour le
    tenant courant.
  - `200 {"enabled": false}` — module enregistré mais désactivé pour le tenant courant.
  - `404` — identifiant de module absent du `ModuleRegistry` (n'existe pas du tout),
    traduit depuis `UnknownModuleException` par le `GlobalExceptionHandler` ; ne fuite aucune
    information sur les modules existant réellement.
  - **Aucun `403`** — voir décision de sémantique HTTP déjà actée dans le fichier backlog
    `en-module-guard-angular.md` (200/404 retenu plutôt que 403, pour rester cohérent avec la
    règle transversale « ne pas confirmer/infirmer l'existence d'une ressource »).
- **Cache-Control** : `no-store` sur la réponse HTTP (pas de cache navigateur).
- **Anti-log-forging (CWE-117)** : le `moduleId` est neutralisé (CR/LF supprimés) avant tout
  logging côté `ModuleController` — finding SonarCloud détecté et corrigé pendant la review,
  avec test dédié.
- **Source du statut** : `ModuleActivationCacheService` (cache Redis d'EN03.3), et non
  `ModuleActivationService` en accès direct comme documenté à l'origine — voir § Écarts.

### `moduleGuard` (pivot-ui)

`moduleGuard(moduleId)` — factory `CanActivateFn` posée en `canActivate` sur chaque route
protégée, **au même niveau que le `loadComponent`** de cette route.

- Appelle `GET /api/modules/{id}/status` via `ModuleStatusService` avant toute navigation.
- Traite **de façon strictement identique** `enabled:false`, `404`, `401` et toute erreur
  réseau : refus de navigation + redirection `/home` + toast "Module {nom} non disponible"
  (`role="alert"`), avec lien direct vers `/admin/modules` si l'utilisateur porte `ROLE_ADMIN`.
  Le guard ne branche jamais sa décision sur le code HTTP précis reçu — la distinction
  403-vs-404 reste entièrement côté contrat API/backend.
- Un interstitiel `role="status"` (`ModuleGuardLoadingService` +
  `ModuleAccessOverlayComponent`, montés une fois dans `ShellComponent`) s'affiche pendant la
  vérification, sans affichage partiel de la route protégée.
- **Garantie structurelle "bundle non chargé si désactivé"** : parce que le guard est posé sur
  la route qui porte elle-même `loadComponent`, Angular Router résout tous les guards de
  l'arbre avant de déclencher le moindre `import()` dynamique — propriété du framework, pas un
  comportement ad hoc du guard. Vérifiée par un test E2E Playwright dédié (inspection réseau
  des requêtes `script`, stratégie hash-agnostic comptant les nouvelles requêtes plutôt que de
  filtrer par nom de chunk), non testable en Vitest.
- 5 routes placeholder (`whiteboard`, `session`, `roadmap`, `survey`, `quiz`) ajoutées sous le
  shell et gardées par `moduleGuard`, réutilisant `ComingSoonComponent` — l'UI réelle de chaque
  module reste dans son repo `pivot-xxx-ui` dédié ; ce shell ne porte que le point d'entrée
  route et sa frontière de lazy-loading.
- i18n `modules.guard.*` (fr/en).

---

## Contrat technique

### Fichiers introduits / modifiés — `pivot-core` (PR #123)

| Fichier | Rôle |
|---------|------|
| `src/main/java/fr/pivot/modules/api/ModuleController.java` | Endpoint `GET /api/modules/{id}/status`, résolution tenant depuis token, `Cache-Control: no-store`, neutralisation CR/LF avant log |
| `src/main/java/fr/pivot/modules/registry/ModuleStatusDto.java` | DTO dédié `{enabled: boolean}`, JavaDoc de la sémantique HTTP 200/404 |
| `src/main/java/fr/pivot/auth/web/GlobalExceptionHandler.java` | Mapping `UnknownModuleException` → `404` |
| `src/test/java/fr/pivot/modules/api/ModuleControllerTest.java` | 200 enabled/disabled, 404 module inconnu, 401, `Cache-Control`, isolation tenant, neutralisation CR/LF |
| `src/test/java/fr/pivot/modules/api/ModuleStatusEndpointIntegrationTest.java` | Testcontainers bout-en-bout, isolation stricte inter-tenant, flush cache Redis en `tearDown()` |
| `src/test/java/fr/pivot/auth/web/GlobalExceptionHandlerTest.java` | Mapping 404, pas de fuite d'info |

### Fichiers introduits / modifiés — `pivot-ui` (PR #67)

| Fichier | Rôle |
|---------|------|
| `src/app/core/modules/module.guard.ts` | `moduleGuard` — `CanActivateFn` |
| `src/app/core/modules/module-status.service.ts` | Appel `GET /api/modules/{id}/status` |
| `src/app/core/modules/module-guard-loading.service.ts` | État signal de l'interstitiel |
| `src/app/core/modules/module-access-overlay.component.ts` | Overlay `role="status"` pendant vérification |
| `src/app/core/modules/module.model.ts` | Modèles TS du statut module |
| `src/app/shared/toast/toast.service.ts`, `toast.component.ts/.html/.scss` | Toast étendu avec lien d'action optionnel (Transloco), consommé par le guard |
| `src/app/app.routes.ts` | 5 routes placeholder gardées par `moduleGuard`, `ComingSoonComponent` |
| `src/app/core/layout/shell/shell.component.ts/.html` | Montage unique de l'overlay et du conteneur de toasts |
| `public/assets/i18n/fr.json`, `en.json` | Clés `modules.guard.*` |
| `e2e/modules/module-guard.spec.ts` | E2E Playwright — bundle non requêté si désactivé, requêté si activé, overlay visible |
| `src/app/core/modules/module.guard.spec.ts`, `module-status.service.spec.ts`, `module-guard-loading.service.spec.ts`, `module-access-overlay.component.spec.ts` | Tests Vitest dédiés |

### Endpoints / modèles / contrats techniques pertinents

- `GET /api/modules/{id}/status` → `200 {"enabled": boolean}` | `404` (module inconnu) |
  `401` (auth invalide) — jamais `403`.
- Réponse non cachée par le navigateur (`Cache-Control: no-store`).
- Côté backend, le statut est désormais lu via `ModuleActivationCacheService` (cache Redis
  EN03.3) plutôt que `ModuleActivationService` en accès direct — invalidation immédiate déjà
  gérée par les événements d'activation/désactivation existants.

---

## Cohérence avec les US adjacentes

| US / Enabler | Relation |
|----|----------|
| EN03.1 — Module Registry | Prérequis direct — la branche core part de `feat/en03-1-module-registry` (#119) |
| US03.2.2 — Guard Angular bloque accès module désactivé | Couverte par la **même** implémentation (même guard, mêmes tests des deux côtés) — spec fusionnée dans ce document plutôt que dupliquée |
| EN03.3 — Cache module (Redis) | Initialement hors périmètre déclaré de cette PR (« sujet séparé, non traité ici », commentaire d'ouverture de PR core) ; **branché en cours de PR** à la demande du mainteneur — voir § Écarts |
| EN08.2 — Guard Angular module whiteboard | Consommateur direct de `moduleGuard` (EN03.2, générique) en complément d'un `boardAccessGuard` propre au module whiteboard |

## Hors périmètre (explicitement exclu)

- Guards spécifiques à un module métier au-delà de la simple activation/désactivation (ex.
  droits fins par ressource — voir EN08.2 `boardAccessGuard` pour le whiteboard).
- Contenu réel des 5 modules métier derrière les routes placeholder — seul le point d'entrée
  route et la frontière de lazy-loading sont livrés ici, l'UI réelle vit dans chaque repo
  `pivot-xxx-ui`.

---

## Écarts entre le plan initial et l'implémentation réelle

- **Cache Redis EN03.3 branché en avance de phase** : le plan initial (backlog + corps de PR
  core à l'ouverture) explicitement scope le cache comme « sujet séparé, non traité ici » —
  l'endpoint appelait `ModuleActivationService` directement. En cours de revue, à la demande du
  mainteneur, `ModuleActivationCacheService` (mécanisme d'EN03.3) a été branché en remplacement
  drop-in, ce qui résout de fait un point jusque-là différé (guard non réactif immédiatement
  après désactivation, documenté comme limitation connue sur pivot-ui#66) sans attendre un TTL.
  EN03.3 reste néanmoins à traiter comme enabler à part entière pour le reste de son périmètre
  (le composant cache lui-même, sa configuration, ses propres tests) — seul son usage en lecture
  par ce endpoint a été anticipé ici.
- **Duplication de `ToastService` découverte au rebase** : le rebase de la PR ui sur `main`
  (post-merge PR#66) a révélé une troisième implémentation indépendante de
  `ToastService`/`ToastContainerComponent` dans `core/notifications/`, en collision de sélecteur
  (`piv-toast-container`) avec le service canonique `shared/toast/` déjà fusionné via PR#63/#66.
  Réconciliée dans cette PR : le service canonique gagne un lien d'action optionnel, les
  fichiers dupliqués sont supprimés, `ShellComponent` ne monte le conteneur qu'une fois. Ce
  n'était pas prévu au plan de cette US mais était bloquant pour livrer le toast avec lien admin
  demandé par l'AC.
- **AC "403 retourné par l'API" (US03.2.2 telle que rédigée à l'origine)** : la sémantique
  finale retenue est `200 {enabled:false}` / `404` (jamais `403`) — décision déjà actée et
  documentée dans le fichier backlog `en-module-guard-angular.md` avant implémentation, donc pas
  une dérive silencieuse, mais un écart réel par rapport au texte littéral de l'AC d'origine
  côté `pivot-ui`. Le guard ne distingue de toute façon jamais la cause HTTP précise.
