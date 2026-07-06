# US03.3.1 — SUPER_ADMIN définit modules disponibles par plan

## Contexte

- **US** : `docs/backlog/EPIC-module-system/FEATURES/activation-super-admin/us-super-admin-modules-plan.md`
  (F03.3 — Activation super admin)
- **PR backend** : `pivot-core` [#153](https://github.com/PIVOT-PLATFORM/pivot-core/pull/153)
  (`feat/us03-3-1-super-admin-modules-plan`)
- **Dernier commit backend au moment du figeage** : `85d632c`
- **PR frontend** : `pivot-ui` [#101](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/101)
  (`feat/us03-3-1-super-admin-modules-plan`)
- **Dernier commit frontend au moment du figeage** : `7e5cb4b`
- **Gate 4 MERGE_CONFIDENCE** : 100/100 sur les deux PR (Autoloop convergé, revue neutre
  indépendante) — les deux sont **ouvertes, prêtes pour review, pas encore mergées** au moment
  du figeage (Gate 5 a lieu dès convergence de l'Autoloop, pas après la recette humaine, voir
  `docs/specs/README.md`).

## Spec fonctionnelle

Un `SUPER_ADMIN` définit, pour chaque plan commercial/tarifaire de la plateforme, quels modules
PIVOT y sont inclus. Un tenant est ensuite rattachable à un de ces plans (`Tenant.billingPlanId`)
— le rattachement lui-même et l'application de la restriction (un admin tenant ne voit que les
modules de son plan) sont hors périmètre de cette US, traités par `US03.3.2`/`US03.3.3`.

Comportement observable :

- Un plan est une simple entité nommée (`name` unique) sans module au moment de sa création.
- La liste des modules d'un plan peut être **remplacée intégralement** (y compris vidée
  complètement — cas valide, pas une erreur) ou **complétée d'un seul module à la fois**. Ajouter
  un module déjà présent est un no-op silencieux (`200`, pas d'erreur) — il n'y a pas de notion
  de conflit sur cette opération.
- Un identifiant de module qui n'existe pas dans le `ModuleRegistry` (auto-découverte des beans
  `PivotModule`, voir `pivot-core` CLAUDE.md « Système de modules ») est rejeté (`400`), que ce
  soit via le remplacement complet ou l'ajout unitaire.
- Toutes les opérations sont réservées à `ROLE_SUPER_ADMIN` — périmètre plateforme, cross-tenant
  par conception (même discipline que `/superadmin/tenants`, US06.2.x) : aucun `tenantId` n'est
  jamais lu ni accepté sur ce chemin.
- Côté Angular, un écran liste les plans existants (avec création inline par nom) et un écran de
  détail par plan affiche ses modules sous forme de puces, avec ajout (champ libre + endpoint
  d'ajout unitaire) et retrait (via un remplacement complet recalculé côté client — voir
  « Écarts / décisions de conception »).

## Contrat technique

### Backend (`pivot-core`)

#### Schéma (`V1__schema_init.sql`, plié dans le fichier unique, pas de V2 avant BETA)

| Table / colonne | Détail |
|---|---|
| `plans` | `id BIGSERIAL`, `name VARCHAR(100) UNIQUE`, `created_at`, `updated_at` |
| `plan_modules` | `id BIGSERIAL`, `plan_id BIGINT FK → plans.id ON DELETE CASCADE`, `module_id VARCHAR(100)` (identifiant plat, **pas** de FK — les modules sont déclarés dans le `ModuleRegistry` en mémoire, jamais persistés comme lignes, même convention que `module_activations.module_id`), `created_at`, contrainte unique `(plan_id, module_id)` |
| `tenants.billing_plan_id` | `BIGINT` nullable. FK `fk_tenants_billing_plan → plans(id)` ajoutée via un `ALTER TABLE` séparé (juste après la création de `plan_modules`), car `tenants` est déclarée en tête du fichier de migration consolidé, avant que `plans` n'existe |

**Décision de nommage — `billing_plan_id` et non `plan_id`** : `tenants` porte déjà une colonne
`plan` héritée (`SAAS`/`ENTERPRISE`/`TRIAL` — périmètre de déploiement / mode d'authentification
principal, voir le commentaire sur cette colonne dans la migration), un concept totalement
distinct du plan tarifaire/bundle de modules introduit par cette US. Un `plan_id` nu aurait
laissé croire qu'il référence cette même colonne `plan`. `billing_plan_id` lève l'ambiguïté sans
toucher à la colonne existante.

#### Entités / packages (`fr.pivot.plan.*`)

- `Plan` (`fr.pivot.plan.entity`) : `id`, `name`, `moduleIds` (`Set<String>` via
  `@ElementCollection` + `@CollectionTable(name = "plan_modules")` — pas d'entité `Module` JPA,
  cohérent avec l'absence de table pour les modules), `createdAt`/`updatedAt`.
- `Tenant.billingPlanId` (`Long`, nullable) — champ brut, pas d'association `@ManyToOne`, même
  convention que les autres FK de ce schéma (`ModuleActivation.tenantId`).
- `PlanRepository`, `PlanService` (porte `@PreAuthorize("hasRole('SUPER_ADMIN')")` sur chaque
  méthode publique — RBAC côté service, pas contrôleur, même motif que
  `SuperAdminTenantService`), `SuperAdminPlanController` (délégation pure).

#### Endpoints (`/api/superadmin/plans`, `ROLE_SUPER_ADMIN` uniquement)

| Méthode | Chemin | Body | Réponse | Erreurs |
|---|---|---|---|---|
| `POST` | `/superadmin/plans` | `{ "name": string }` | `201` `PlanDto` (modules vides) | `400` nom invalide · `409 PLAN_NAME_ALREADY_EXISTS` |
| `GET` | `/superadmin/plans` | — | `200` `PlanDto[]` (pas de pagination) | — |
| `GET` | `/superadmin/plans/{planId}` | — | `200` `PlanDto` | `404 PLAN_NOT_FOUND` |
| `PUT` | `/superadmin/plans/{planId}/modules` | `{ "moduleIds": string[] }` (liste vide acceptée) | `200` `{ "moduleIds": string[] }` (remplacement complet) | `404 PLAN_NOT_FOUND` · `400 UNKNOWN_MODULE_ID` |
| `POST` | `/superadmin/plans/{planId}/modules/{moduleId}` | — | `200` `{ "moduleIds": string[] }` (ajout, **idempotent**) | `404 PLAN_NOT_FOUND` · `400 UNKNOWN_MODULE_ID` |
| `GET` | `/superadmin/plans/{planId}/modules` | — | `200` `{ "moduleIds": string[] }` | `404 PLAN_NOT_FOUND` |

`PlanDto { id, name, moduleIds (triés alphabétiquement), createdAt }`. `planId`/`moduleId`
proviennent exclusivement des `@PathVariable`, jamais du corps (prévention IDOR).

### Frontend (`pivot-ui`)

| Route | Composant | Garde |
|---|---|---|
| `/superadmin/plans` | `PlansListComponent` (liste + création inline par nom) | `superAdminGuard` |
| `/superadmin/plans/:planId` | `PlanDetailComponent` (puces de modules, ajout/retrait) | `superAdminGuard` |

`PlansService` (`src/app/features/superadmin/plans/plans.service.ts`) — signals, encapsule les
5 endpoints ci-dessus (`GET .../modules` fusionné dans `loadOne()`, `PlanDto.moduleIds` porte
déjà l'information).

## Écarts vs AC initiaux (décisions de conception, PO Agent self-clarification)

1. **AC-gap comblé — CRUD `Plan` minimal ajouté.** L'AC littérale ne couvrait que la gestion de
   la liste de modules d'un plan *existant* — sans endpoint de création/liste, `{planId}` ne
   pourrait jamais exister en pratique. Ajoutés : `POST`/`GET /superadmin/plans`,
   `GET /superadmin/plans/{planId}`.
2. **Ajout unitaire idempotent, pas de `409`.** L'AC ne demandait aucune sémantique de conflit
   pour un module déjà présent — un no-op silencieux (`200`) a été retenu plutôt que d'inventer
   un cas d'erreur non spécifié.
3. **Retrait d'un module côté Angular via le `PUT` de remplacement complet, pas un `DELETE`
   dédié.** Le contrat backend n'expose que le remplacement complet et l'ajout unitaire (exigence
   HTTP explicite de l'AC) — aucune US ne demandait de endpoint de retrait unitaire. Le retrait
   est donc implémenté côté Angular comme « liste actuelle moins le module retiré », y compris
   dans le cas limite où cela vide la liste (cas valide, pas une erreur, côté backend comme
   frontend).
4. **Champ libre pour l'identifiant de module côté Angular, pas de sélecteur.** Il n'existe pas
   d'endpoint superadmin listant tous les identifiants de modules connus du registre (`GET
   /api/modules` existant exige un `TenantContext` résolu, incompatible avec cet écran
   plateforme/cross-tenant). Un identifiant inconnu est remonté par le `400 UNKNOWN_MODULE_ID`
   backend, affiché en ligne près du champ.
5. **Enforcement non traité — hors périmètre.** Cette US introduit la *définition* des plans et
   de leurs modules ; elle ne câble aucune vérification bloquant un tenant admin d'activer un
   module absent du plan de son tenant (`AdminModuleActivationService`/`ModuleNotInPlanException`
   inchangés). Ce point reste explicitement délégué à `US03.3.3` (« Admin tenant voit uniquement
   modules de son plan »).

## Tests

- **Backend** : 660 TU (`mvn test`, hors `*IntegrationTest`) + 24 TI Testcontainers
  (`SuperAdminPlanIntegrationTest`, exécutées avec succès en CI GitHub Actions — Testcontainers
  indisponible dans le sandbox local de l'agent, environnement, pas régression, voir description
  PR #153) couvrant : sécurité `ROLE_SUPER_ADMIN` par endpoint (401/403/200 ou 201), CRUD plan
  (création, liste, détail, doublon de nom), remplacement complet (y compris vidage), ajout
  unitaire idempotent, `404`/`400` sur plan/module inconnu. Checkstyle/SpotBugs/SonarCloud
  Quality Gate verts.
- **Frontend** : 892 tests Vitest CI (dont les specs `plans.service.spec.ts`,
  `plans-list.component.spec.ts`, `plan-detail.component.spec.ts` ajoutés par cette US),
  couverture code neuf 93.1 % (SonarCloud, ≥ 85 % Gate 2). `tsc --noEmit`/ESLint/build prod/E2E
  Playwright existant tous verts en CI. Pas de nouveau spec Playwright dédié — différé (« E2E
  différable si environnement indisponible », CLAUDE.md), compensé par la couverture Vitest
  happy-path + tous les cas d'erreur documentés par AC.
