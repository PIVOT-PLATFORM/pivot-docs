# US06.2.3 — Super admin liste tous les tenants

## Contexte

- **US** : `docs/backlog/EPIC-administration/FEATURES/gestion-tenants/us-liste-tenants.md`
  (F06.2, EPIC-administration)
- **PR** : `pivot-core` [#126](https://github.com/PIVOT-PLATFORM/pivot-core/pull/126)
  (`feat/us06-2-3-liste-tenants`) — **mergée** `2026-07-05T13:23:11Z` · `pivot-ui`
  [#69](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/69) (même branche) — **mergée**
  `2026-07-06T00:22:31Z`, après le backend (ordre requis, voir § Écarts)
- **Gate 2 COVERAGE** : `pivot-core` 95/100 self-évalué en PR · `pivot-ui` 96/100 self-évalué en PR
- **Gate 4 MERGE_CONFIDENCE** : `pivot-core` 98/100 — `MERGE_AUTONOMOUS` · `pivot-ui` 99/100 (2e
  passage de convergence ; 1er passage 97/100 `NEEDS_HUMAN_REVIEW` sur un finding 🔴 de
  séquencement, voir § Écarts) — `MERGE_DOCUMENTED`
- **Dépend de** : rôle `ROLE_SUPER_ADMIN` déjà supporté nativement par
  `TokenAuthenticationFilter`/`@EnableMethodSecurity` (aucune modification de `SecurityConfig`
  nécessaire) ; pattern `@PreAuthorize` sur un service dédié réutilisé de `AdminModuleActivationService`
  (US03.1.1)
- **Consommé par (idiome réutilisé)** : US06.1.2 (`TenantsListComponent` cité comme modèle pour le
  debounce/la pagination), qui elle-même a réutilisé le pattern d'états loading/empty/error déjà
  établi ici
- **Pertinent pour** : US06.2.1/US06.2.2 (création/désactivation de tenant) — réutilisent le même
  guard `super-admin.guard.ts` et le même motif `@PreAuthorize("hasRole('SUPER_ADMIN')")`

---

## Spec fonctionnelle

### `GET /api/superadmin/tenants` (`pivot-core`)

Endpoint plateforme réservé à `ROLE_SUPER_ADMIN` (première utilisation de ce rôle via
`@PreAuthorize` dans ce repo), volontairement **cross-tenant** : pas de `TenantContext` à extraire,
aucun `tenantId`/`userId` client accepté. Retourne la liste paginée de tous les tenants de la
plateforme :

- **Champs** (`TenantSummaryDto`) : `id`, `slug`, `name`, `plan`, `authMode`, `isActive`,
  `userCount`, `createdAt`. Le JSON de réponse est **entièrement en camelCase**
  (`authMode`/`isActive`, pas `auth_mode`/`is_active`) pour rester cohérent avec le reste de l'API
  — seuls les **paramètres de requête** (`is_active`, `auth_mode`) restent en snake_case, copiés
  littéralement de l'AC.
- **Pagination** : `Page` Spring encapsulé explicitement dans `TenantPageResponse`
  (`content`/`totalElements`/`totalPages`/`number`/`size`) plutôt que de laisser Spring sérialiser
  un `Page` directement — isole le contrat HTTP d'un changement futur de la sérialisation Jackson
  par défaut. `page` 0-indexé, `size` par défaut 20 (`@PageableDefault`) ; **aucun plafond explicite**
  sur `size` (voir § Écarts).
- **Filtres** composables (`TenantSpecifications`, Criteria API — pas d'injection SQL) : `name`
  (sous-chaîne insensible à la casse), `is_active` (booléen), `plan`, `auth_mode` — égalité stricte
  sur ces deux derniers.
- **Tri par défaut** : `createdAt DESC` (`@PageableDefault(sort="createdAt", direction=DESC)`).
- **`userCount`** : calculé par une requête d'agrégation groupée
  (`UserRepository.countActiveUsersByTenantIds`) sur les utilisateurs non soft-deleted
  (`deleted_at IS NULL`) de la page courante — pas de compteur dénormalisé en base, pas de N+1.
  L'exclusion des soft-deleted n'était pas spécifiée explicitement par l'AC ; jugement cohérent
  avec le reste du modèle `User`.
- Aucune migration Flyway nécessaire — `tenants.plan`/`auth_mode`/`is_active` existaient déjà.

### Page `/superadmin/tenants` (`pivot-ui`)

Route lazy-loaded sous le shell authentifié, gardée par `superAdminGuard` (`CanActivateFn`,
miroir de `adminGuard`) — tout rôle autre que `ROLE_SUPER_ADMIN` (`ROLE_ADMIN`, `ROLE_USER`,
anonyme) est redirigé vers `/home`, vérifié pour les 4 cas de rôle.

- **Tableau** (`TenantsListComponent`, `OnPush`, signals, `inject()`) : colonnes nom, slug, plan,
  auth_mode, is_active, createdAt (+ `userCount`, présent dans le DTO backend). Rendu exclusivement
  via interpolation `{{ }}`, aucun `[innerHTML]`.
- **Filtres** : `name` en recherche texte soumise par formulaire (pas de debounce automatique, à la
  différence de US06.1.2 qui a réutilisé un debounce 300ms — ici soumission explicite) ; `is_active`
  / `plan` / `auth_mode` en `<select>` à application immédiate (enums exact-match backend).
- **Tri** : entièrement délégué au backend, aucun paramètre de tri envoyé côté Angular, aucune
  logique de tri côté client.
- **États** : skeleton pendant le chargement, message d'erreur + retry, état vide ("Aucun tenant ne
  correspond aux filtres").
- Recherche/filtres/bouton de soumission désactivés pendant le chargement d'une page via un
  `<fieldset [disabled]="loading()">` natif — ajouté en 2e passage de convergence Gate 4 (voir
  § Écarts) ; un `[disabled]` posé directement sur un contrôle `[ngModel]` se ferait silencieusement
  écraser par le `ControlValueAccessor` d'Angular, d'où le choix du `fieldset` natif.
- Lien de navigation sidebar réservé à `ROLE_SUPER_ADMIN`.
- i18n complet fr/en via Transloco (parité de clés vérifiée programmatiquement), aucune chaîne
  littérale.
- Aucun `tenantId`/`userId` envoyé côté client — filtrage et isolation entièrement côté backend,
  documenté explicitement en TSDoc.

---

## Contrat technique

### Fichiers introduits / modifiés — `pivot-core` (PR #126)

| Fichier | Rôle |
|---------|------|
| `tenant/api/SuperAdminTenantController.java` (nouveau) | `GET /api/superadmin/tenants`, délégation intégrale au service |
| `tenant/api/SuperAdminTenantService.java` (nouveau) | `@PreAuthorize("hasRole('SUPER_ADMIN')")`, logique métier, filtres, tri |
| `tenant/api/TenantSummaryDto.java` (nouveau) | DTO exposé — jamais l'entité `Tenant` |
| `tenant/api/TenantPageResponse.java` (nouveau) | Enveloppe `Page` explicite, `List.copyOf` défensif (correctif SpotBugs `EI_EXPOSE_REP`) |
| `tenant/api/TenantSpecifications.java` (nouveau) | 4 `Specification` JPA composables (`name`/`is_active`/`plan`/`auth_mode`) |
| `tenant/repository/TenantRepository.java` (modifié) | Support `JpaSpecificationExecutor` |
| `auth/repository/UserRepository.java`, `TenantUserCountProjection.java` (modifiés/nouveau) | `countActiveUsersByTenantIds` — agrégation groupée `userCount` |
| `config/PaginationConfig.java` (nouveau) | Config pagination globale |
| `SuperAdminTenantControllerTest.java`, `SuperAdminTenantServiceTest.java` (TU), `SuperAdminTenantIntegrationTest.java` (TI, Testcontainers) | Voir § Tests |

### Fichiers introduits / modifiés — `pivot-ui` (PR #69)

| Fichier | Rôle |
|---------|------|
| `core/auth/guard/super-admin.guard.ts` (nouveau) | Guard fonctionnel `ROLE_SUPER_ADMIN`, miroir de `adminGuard` |
| `features/superadmin/tenants/tenant.model.ts` (nouveau) | `TenantDto`, `TenantPage` — miroir des DTO backend |
| `features/superadmin/tenants/tenants.service.ts` (nouveau) | Signals liste/loading/erreur, `load()`, `DEFAULT_TENANT_PAGE_SIZE=20` envoyé explicitement |
| `features/superadmin/tenants/tenants-list.component.ts/.html/.scss` (nouveau) | Tableau, filtres, pagination, fieldset désactivable pendant le chargement |
| `core/layout/sidebar/sidebar.component.ts` (modifié) | Lien de navigation réservé `ROLE_SUPER_ADMIN` |
| `app.routes.ts` (modifié) | Route `/superadmin/tenants`, lazy-loaded, gardée |
| `public/assets/i18n/fr.json` / `en.json` (modifiés) | Clés i18n dédiées |
| `e2e/superadmin/tenants-list.spec.ts` (nouveau) | Spec Playwright |
| `tenants-list.component.spec.ts` (13 tests), `tenants.service.spec.ts` (7 tests), `super-admin.guard.spec.ts` (4 tests) | Voir § Tests |

### Endpoints / modèles

| Endpoint | Paramètres | Réponse |
|----------|-----------|---------|
| `GET /api/superadmin/tenants` | `page` (0-indexé), `size` (défaut 20, pas de plafond), `name`, `is_active`, `plan`, `auth_mode` | `Page` Spring — `{ content: TenantSummaryDto[], totalElements, totalPages, number, size }`, tri par défaut `createdAt DESC` |

Aucune migration Flyway. Aucun changement de contrat `PivotModule`/OIDC.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US03.1.1 (Admin active un module) | Motif `@PreAuthorize` sur un service dédié directement réutilisé pour porter `ROLE_SUPER_ADMIN`, première utilisation de ce rôle dans `pivot-core`. |
| US06.1.1/US06.1.2 (Liste utilisateurs tenant) | `TenantsListComponent` citée comme modèle idiomatique réutilisé par US06.1.2 pour le debounce de recherche et la pagination — relation bidirectionnelle de précédent UI, pas de dépendance de code directe. |
| US06.2.1/US06.2.2 (Création/désactivation de tenant, à venir) | Réutiliseront le même guard `super-admin.guard.ts` et la même zone `/superadmin`, ainsi que le motif `@PreAuthorize("hasRole('SUPER_ADMIN')")` posé côté backend. |

---

## Écarts vs AC initiaux / notes de process

### Séquencement de merge inter-repo — finding 🔴 corrigé avant merge

Le 1er passage Gate 4 sur `pivot-ui`#69 (97/100, `NEEDS_HUMAN_REVIEW`) a bloqué sur un finding 🔴 :
la description de la PR affirmait à tort que le backend `pivot-core`#126 était « déjà mergé »,
alors qu'il était encore `OPEN`. Merger le frontend en premier aurait exposé un lien sidebar et une
route `/superadmin/tenants` pointant vers un endpoint inexistant (404 garanti au clic pour tout
super-admin). Corrigé par réécriture de la description de la PR (`gh pr edit`) et respect de
l'ordre de merge recommandé : `pivot-core`#126 mergée en premier (`2026-07-05T13:23:11Z`), puis
`pivot-ui`#69 (`2026-07-06T00:22:31Z`). Le code frontend lui-même n'a jamais été en cause — seul
l'ordre de merge inter-repo posait problème.

### Pas de plafond explicite sur `Pageable.size` (backend)

Relevé en finding 🟡 mineur Gate 4 `pivot-core` : un `size` arbitrairement grand n'est pas rejeté
(`PageableHandlerMethodArgumentResolver#setMaxPageSize` non configuré). Non bloquant — appelant
restreint à `ROLE_SUPER_ADMIN`, rôle de confiance plateforme — mais à cadrer si le pattern
`@PageableDefault` se généralise à d'autres endpoints admin/superadmin.

### RBAC 403 vérifié uniquement via le proxy Spring, pas par requête HTTP bout-en-bout (backend)

Le contrôle `ROLE_SUPER_ADMIN` n'est vérifié que via un appel au service `@Autowired` (proxy
`@EnableMethodSecurity` réel), jamais par une requête HTTP complète avec `spring-security-test` —
gap assumé, cohérent avec le seul précédent existant (`AdminModuleActivationIntegrationTest`), pas
introduit par cette PR.

### Boutons de filtre/pagination non désactivés pendant `loading()` — corrigé en convergence (frontend)

Relevé en finding 🔵 au 1er passage Gate 4 `pivot-ui` : un double-clic rapide pouvait déclencher des
requêtes concurrentes (pas de corruption, juste un flicker UX). Corrigé au 2e passage par un
`<fieldset [disabled]="loading()">` natif — un `[disabled]` par contrôle se serait fait écraser par
le `ControlValueAccessor` Angular (confirmé par reproduction isolée avant correctif). Test Vitest
dédié ajouté (cycle disabled→enabled→disabled→enabled sur le fieldset ; jsdom ne simule pas la
cascade native fieldset→descendants, l'assertion porte donc sur le binding du fieldset lui-même).

### Tests E2E Playwright différés côté service, ajoutés côté UI

`pivot-ui`#69 inclut `e2e/superadmin/tenants-list.spec.ts` (contrairement à sa propre description
initiale qui le donnait comme non ajouté — corrigé en cours de revue). Différable selon le workflow
ACDD, non requis par l'AC de cette US.

### 39 échecs `test:ci` pré-existants — confirmés indépendants, non corrigés ici

Cause : `localStorage` global (au lieu de `window.localStorage`) dans 4 specs non touchées par
cette PR (`theme.service.spec.ts`, `navbar.component.spec.ts`, `auth-shell.component.spec.ts`,
`login.component.spec.ts`), incompatible avec l'environnement Vitest/Node du builder Angular.
Reproduit à l'identique sur un checkout `main` propre — hors périmètre de cette US, signalé au
mainteneur. Au 2e passage Gate 4, ces échecs ne se sont plus reproduits dans l'environnement de
vérification (482/482 verts) ; non retouché ici (fix transverse hors scope).

---

## Tests

### `pivot-core`

| Test | Comportement vérifié |
|---|---|
| `SuperAdminTenantServiceTest` (TU) | Champs `TenantSummaryDto` (id/slug/name/plan/authMode/isActive/userCount/createdAt) |
| `SuperAdminTenantControllerTest` (TU, MockMvc standalone) | Enveloppe `Page` JSON, pagination explicite, tri par défaut |
| `SuperAdminTenantIntegrationTest` (10 TI, Testcontainers PostgreSQL 18) | RBAC positif/négatif via proxy Method Security réel, pagination sur données seedées, 4 filtres, tri par défaut |

`mvn verify` : 363 tests, 0 failure, 0 error. Checkstyle + SpotBugs verts. CI 16 checks verts
(PITest, CodeQL, Semgrep, SCA, Gitleaks, Trivy, SonarCloud inclus).

### `pivot-ui`

| Test | Comportement vérifié |
|---|---|
| `tenants.service.spec.ts` (7 tests) | Succès/erreur, filtres partiels, trim whitespace, complete sans throw, 403 |
| `tenants-list.component.spec.ts` (13 tests) | Skeleton, empty, erreur + retry, rendu tableau, 4 filtres, bornes de pagination, affichage 1-indexé, désactivation du fieldset pendant le chargement |
| `super-admin.guard.spec.ts` (4 tests) | `ROLE_SUPER_ADMIN` passe ; `ROLE_ADMIN`, `ROLE_USER`, anonyme redirigés vers `/home` |
| `e2e/superadmin/tenants-list.spec.ts` (Playwright) | Vérifié passant en CI réelle |

`test:ci` (2e passage, Node 24 CI) : 482/482 passants. `tsc --noEmit` : 0 erreur. `eslint` :
0 warning. Build production OK (2 warnings de budget SCSS pré-existants, non liés à cette PR).

---

## Hors périmètre (explicitement exclu)

- Création et désactivation de tenant (US06.2.1/US06.2.2) — réutiliseront le guard et le motif
  `@PreAuthorize` posés ici, mais hors du périmètre fonctionnel de cette spec.
- Plafond explicite sur `Pageable.size` — signalé, non implémenté (rôle de confiance uniquement).
- Test HTTP bout-en-bout du RBAC `ROLE_SUPER_ADMIN` (`spring-security-test`) — gap assumé, cohérent
  avec l'existant.
- Distinction avancée des erreurs backend (ex. 400 `INVALID_FILTER`) dans un message dédié côté
  service Angular — repliée sur le message d'erreur réseau générique.
