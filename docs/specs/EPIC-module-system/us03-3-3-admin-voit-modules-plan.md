# US03.3.3 — Admin tenant voit uniquement modules de son plan

## Contexte

- **US** : `docs/backlog/EPIC-module-system/FEATURES/activation-super-admin/us-admin-voit-modules-plan.md`
  (F03.3 — Activation super-admin)
- **PR** : `pivot-core` [#161](https://github.com/PIVOT-PLATFORM/pivot-core/pull/161)
  (`feat/us03-3-3-admin-voit-modules-plan`) · `pivot-ui`
  [#102](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/102) (même nom de branche)
- **Dernier commit au moment du figeage** : `pivot-core` `d357cf8` — `fix(test): réutilise le
  contexte Spring existant pour AdminModuleListIntegrationTest` · `pivot-ui` `c6666cb` —
  `fix(test): restaure les spies de ThemeService après chaque test (flake CI)`
- **Gate 2 COVERAGE** : `pivot-core` 100/100 (6/6 AC couverts par test automatisé — TU
  `AdminModuleListServiceTest` + TI `AdminModuleListIntegrationTest`) · `pivot-ui` 100/100 (1/1 AC
  frontend couvert — `admin-modules.component.spec.ts`, badge override)
- **Gate 4 MERGE_CONFIDENCE** : 100/100 sur les deux PR (Autoloop — CI verte après correction de
  deux problèmes détectés en cours de convergence, voir § Écarts)

## Dépendance non mergée au moment de l'implémentation

Cette US dépend du schéma introduit par deux PR `pivot-core` non fusionnées au moment de
l'implémentation :

- **#153** (`feat/us03-3-1-super-admin-modules-plan`, US03.3.1) — tables `plans` / `plan_modules`,
  colonne `tenants.billing_plan_id`.
- **#159** (`feat/us03-3-2-super-admin-override`, US03.3.2) — table `module_overrides`, entité
  `ModuleOverride`, classe `TenantModuleRecord`.

La branche `feat/us03-3-3-admin-voit-modules-plan` part de `main` puis merge localement (jamais
poussé séparément) les commits de ces deux branches, dans cet ordre. **Conflit résolu** sur
`V1__schema_init.sql` : les deux PR ajoutent chacune un bloc `CREATE TABLE` indépendant juste
après `module_activations`, sans se connaître (#153 : `plans` + `plan_modules` + `ALTER TABLE
tenants ADD CONSTRAINT fk_tenants_billing_plan` ; #159 : `module_overrides`). Résolution :
conservation des deux blocs complets, ordre `plans` → `plan_modules` → `ALTER TABLE` →
`module_overrides` — aucune dépendance FK entre les deux blocs eux-mêmes, seul l'ordre par
rapport à `tenants`/`plans` compte. DDL vérifié valide (`mvn compile` + suite TU 676/676 verte).

**Rebase requis** : cette branche devra être rebasée sur `main` une fois #153 et #159
effectivement mergées (ordre recommandé inchangé au moment du figeage : #153 puis #159, vérifié
via `gh pr list --state merged`) — le contenu du merge local disparaîtra du diff, ne laissant que
les commits propres de cette US par-dessus.

## Spec fonctionnelle

`GET /api/admin/modules` (admin de tenant, `ROLE_ADMIN`) ne retourne plus l'intégralité du
registre de modules PIVOT : la liste est filtrée par le plan commercial souscrit par le tenant,
avec un débordement possible via override SUPER_ADMIN.

Règles de visibilité, par module du registre :

1. **Tenant avec un plan assigné** (`tenants.billing_plan_id` référence un `Plan` existant) :
   - visible si le module appartient à `Plan.moduleIds` (`source: "plan"`) ;
   - visible aussi si un override SUPER_ADMIN **actif** (`module_overrides.enabled = true`)
     existe pour ce couple (tenant, module), même hors plan (`source: "override"`) ;
   - invisible sinon (hors plan, pas d'override actif) — **jamais `403`**, simple absence de la
     liste.
2. **Tenant sans plan assigné** (`billing_plan_id IS NULL`, ou plan référencé introuvable) :
   aucune restriction — tous les modules du registre sont visibles, `source: "plan"` pour tous.
   Comportement délibérément **non filtrant** par défaut : voir § Écarts / clarification PO Agent.
3. Le champ `enabled` de chaque module reste calculé exactement comme avant cette US
   (`ModuleActivationService#isEnabled` — override actif prioritaire, sinon
   `module_activations`) : cette US ne change **que** la liste des modules retournés et
   l'ajout du champ `source`, jamais la résolution de l'état d'activation lui-même.

Un module inclus dans le plan mais neutralisé par un override `enabled = false` reste **visible**
(toujours dans le plan, `source: "plan"`) mais avec `enabled: false` — la neutralisation ne le
retire pas de la liste, elle affecte uniquement son état d'activation affiché.

Côté frontend (`pivot-ui`, écran `/admin/modules` déjà existant depuis US03.1.1/US03.1.2/US03.2.1,
étendu ici) : chaque carte de module dont `source === "override"` affiche un second badge, à côté
du badge actif/inactif existant, libellé « Activé par l'administrateur plateforme » — couleur
distincte (info/bleu), jamais un remplacement du badge d'état.

## Contrat technique

### `pivot-core`

| Élément | Détail |
|---|---|
| `AdminModuleListService` (nouveau, `fr.pivot.modules.api`) | Résout la liste filtrée pour un `tenantId` donné — dépendances : `ModuleRegistry`, `ModuleActivationService`, `ModuleOverrideRepository`, `TenantRepository`, `PlanRepository` |
| `AdminModuleController#list()` | Délègue désormais à `AdminModuleListService#list(tenantId)` (au lieu d'itérer directement `ModuleRegistry`/`ModuleActivationService`) — RBAC `@PreAuthorize("hasRole('ADMIN')")` inchangé, toujours porté par le contrôleur |
| `AdminModuleDto` | Nouveau champ `source: String` (`"plan"` \| `"override"`), en plus de `id`, `name`, `enabled`, `description` (toujours vide, limitation préexistante inchangée) |
| `ModuleNotInPlanException` (Javadoc) | Clarifiée pour distinguer explicitement la simplification `activate`/`deactivate` (hors périmètre) du filtrage de visibilité de cette US (voir `AdminModuleListService`) — aucun changement de comportement, doc uniquement |

Aucun nouveau endpoint, aucun changement de méthode HTTP ou de statut de réponse existant.
`GET /api/admin/modules` conserve son contrat `200`/`401` — jamais de `403` lié au filtrage plan.

### `pivot-ui`

| Élément | Détail |
|---|---|
| `AdminModuleDto` (`admin-module.model.ts`) | Nouveau champ obligatoire `source: AdminModuleSource` (`'plan' \| 'override'`), miroir du DTO backend |
| `admin-modules.component.html`/`.scss` | Second badge `.admin-modules__badge--override`, affiché uniquement si `module.source === 'override'`, `align-self: flex-start` (enfant direct de `.admin-modules__card`, conteneur flex colonne en `stretch` par défaut) |
| `src/styles/tokens.scss` | Nouveau token `--color-info-dark: #075985` (contraste 6.5:1 sur `--color-info-light`, même convention que `success-dark`/`warning-dark`/`error-dark` — le token `--color-info` n'avait pas encore de variante `-dark`) |
| i18n | `admin.modules.card.override_badge` (fr : « Activé par l'administrateur plateforme » · en : « Enabled by the platform administrator ») |

Aucun changement de route, de guard, ni de contrat HTTP côté service (`AdminModuleService`
continue d'appeler `GET /api/admin/modules` tel quel — le filtrage est déjà fait côté backend
avant que la réponse n'arrive).

## Écarts vs AC initiaux

Aucun écart de fond sur les 6 AC — tous couverts tels quels. Deux clarifications PO Agent et deux
corrections de convergence CI, documentées ci-dessous.

### Clarification PO Agent — tenant sans plan assigné

L'AC ne couvre explicitement que le cas « module hors d'un plan **existant** ». Il ne dit rien du
cas où le tenant n'a **aucun** plan assigné — le cas de la quasi-totalité des tenants existants,
`billing_plan_id` étant une colonne additive fraîchement introduite par #153. Décision : traiter
« pas de plan » comme « aucune restriction » plutôt que comme un plan vide implicite (qui aurait
fait disparaître tous les modules actuellement visibles pour ces tenants du jour au lendemain —
régression non demandée par l'AC). Le filtrage strict ne s'active qu'une fois un plan
effectivement assigné par le SUPER_ADMIN.

### Hors périmètre confirmé — enforcement sur activate/deactivate

Bloquer `AdminModuleActivationService#activate`/`#deactivate` pour un module hors plan reste hors
périmètre de cette US (déjà documenté par l'`@implNote` « future enforcement » de `Plan`, #153) —
cette US ne porte que sur la **visibilité** de `GET /api/admin/modules`, jamais sur ce que l'admin
de tenant peut activer/désactiver.

### Correction Gate 3 — épuisement de connexions PostgreSQL (pivot-core)

Premier passage CI (`Tests Backend (TU + TI)`) : 41 erreurs, toutes `ApplicationContext failure
threshold exceeded` en cascade derrière une unique cause racine réelle — `FATAL: sorry, too many
clients already` (PostgreSQL) lors du chargement d'un contexte Spring. Cause : chaque combinaison
unique de `@Import(...TestModuleConfig.class)` parmi les classes `*IntegrationTest` de la suite
crée un `ApplicationContext`/pool HikariCP distinct contre le même conteneur Testcontainers
Postgres — la suite grossissant (accentué par la combinaison #153 + #159 + cette US, chacune
ajoutant sa propre classe), le nombre de connexions simultanées approche `max_connections`.
Fix : `AdminModuleListIntegrationTest` importe désormais exactement la même classe
`AdminModuleActivationIntegrationTest.TestModuleConfig` (Spring TestContext met en cache un
contexte par configuration, pas par classe de test) au lieu d'en déclarer une nouvelle — partage
le contexte/pool plutôt que d'en créer un second. Les 2 modules de test supplémentaires
nécessaires sont ajoutés à cette configuration partagée existante.

### Correction Gate 3 — flake CI préexistant (pivot-ui)

Premier passage CI (`Tests (Vitest)`) : échec non déterministe sur
`theme.service.spec.ts > setTheme() > persists the theme to localStorage` — absent en local
(843/843 verts), sans rapport avec le périmètre fonctionnel de cette US (thème, pas modules).
Cause : ce test espionne `Storage.prototype.setItem`, un prototype global partagé (contrairement
aux autres spies du repo, tous scopés à une instance injectée par TestBed), sans jamais restaurer
le spy — fuite possible vers le fichier de spec suivant planifié par Vitest dans le même worker,
dépendant de l'ordonnancement. Fix : `afterEach(() => vi.restoreAllMocks())` ajouté à ce
`describe`.

## Tests

### `pivot-core`

| Test | Comportement vérifié |
|---|---|
| `AdminModuleListServiceTest` (10 TU) | Résolution plan/override complète : tenant sans plan (illimité), tenant introuvable (défensif, illimité), filtrage strict par plan (module dans/hors plan), plan existant sans aucun module, override actif hors plan (`source: override`), override désactivé hors plan (exclu), override désactivé sur module du plan (reste visible, `enabled: false`, `source: plan`), `description` toujours vide |
| `AdminModuleListIntegrationTest` (6 TI, Testcontainers) | 2 tenants sur 2 plans différents (AC explicite), tenant sans plan (tous modules visibles), override actif hors plan (`source: override`, `enabled: true`), override désactivé hors plan (exclu), isolation cross-tenant (un seul tenant a l'override) |
| `AdminModuleControllerTest` (mis à jour) | Délégation à `AdminModuleListService`, 401 si contexte d'auth invalide, RBAC couvert par `AdminModuleActivationIntegrationTest#list_*` (proxy Spring réel) |

### `pivot-ui`

| Test | Comportement vérifié |
|---|---|
| `admin-modules.component.spec.ts` (nouveau cas) | Badge « Activé par l'administrateur plateforme » affiché uniquement pour `source: 'override'`, absent pour `source: 'plan'` |
| `admin-module.service.spec.ts` (fixture mise à jour) | `source` propagé sans dénaturer le comportement optimistic activate/deactivate existant |

Vérifications locales complètes (`mvn compile checkstyle:check spotbugs:check` + TU 676/676 côté
`pivot-core` ; `tsc --noEmit` + `eslint` + `test:ci` 843/843 + `build` côté `pivot-ui`) — détail
dans les corps de PR respectifs. TI `pivot-core` (Testcontainers) non exécutables dans le
sandbox local de l'agent (Docker inaccessible) — validées par la CI réelle avant sortie du mode
draft.
