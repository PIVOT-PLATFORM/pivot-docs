# EN03.4 — Contrat de module frontend (TypeScript)

## Contexte

- **Enabler** : `docs/backlog/EPIC-module-system/ENABLERS/en-module-contrat-frontend.md`
  (E03 — Système de modules, Phase Socle)
- **PR frontend** : `pivot-ui` [#45](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/45)
  (`feat/en03-4-module-contract`) — `feat(modules): PivotModuleDto, PivotModuleUi,
  ModuleRegistryService` ; suivie de [#62](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/62)
  (même branche) — PATCH_NOTES uniquement
- **PR backend** : `pivot-core` [#111](https://github.com/PIVOT-PLATFORM/pivot-core/pull/111)
  (`feat/en03-4-module-api`) — `feat(api): GET /api/modules — registre des modules PIVOT` ;
  suivie de [#118](https://github.com/PIVOT-PLATFORM/pivot-core/pull/118) (même branche) —
  PATCH_NOTES uniquement
- **Dernier commit au moment du figeage (ui #45)** : `684a77c`
- **Dernier commit au moment du figeage (core #111)** : `56132fb7`
- **Gate 2 / Gate 3 COVERAGE-QUALITY** : ui 87.1 % stmts (141/141 tests Vitest, SonarCloud
  100 % coverage on new code) · core 98.1 % coverage new code (SonarCloud, 13 tests
  JUnit/Mockito)
- **Gate 4 MERGE_CONFIDENCE** : ui #45 = 88/100 Gate 3 QUALITY → merge-ready (pas de second
  passage Gate 4 distinct tracé sur cette PR) · ui #62 = 100/100 (PATCH_NOTES, après un
  premier passage à 90/100) · core #111 = 93/100 (après un premier passage à 66/100 bloqué
  par un Quality Gate SonarCloud FAILED — voir § Écarts) · core #118 = 100/100 (PATCH_NOTES,
  après un premier passage à 90/100)
- **Dépend de** : rien formellement à la date de sa PR (28 juin 2026) — consomme un skeleton
  `PivotModule`/`TenantContext` déjà présent dans `fr.pivot.modules.registry`, antérieur à
  cette PR. **Refactoré depuis par EN03.1** (`pivot-core` PR #119, mergée 5 jours après,
  le 3 juillet 2026) — voir § Écarts et `docs/specs/EPIC-module-system/en03-1-module-registry-backend.md`.

---

## Spec fonctionnelle

### Contrat TypeScript (`module.model.ts`)

Trois types portent le contrat de module côté Angular :

- **`ModuleStatus`** — union `'online' | 'preview' | 'offline'`, miroir de l'enum backend.
- **`PivotModuleDto`** — forme brute retournée par `GET /api/modules` :
  `{ id, name, version, enabled, status }`. Commentaire de code : « Maps directly to
  `fr.pivot.modules.registry.PivotModuleDto` (pivot-core) » — **imprécis** : la classe
  backend réelle s'appelle `ModuleDto` (sans préfixe `Pivot`), voir § Écarts.
- **`PivotModuleUi`** — `PivotModuleDto` enrichi des champs UI statiques : `icon` (SVG
  inline), `description`, `route`, `comingSoon: boolean`, `color`. Jamais envoyé à l'API.

### Métadonnées statiques (`module-metadata.ts`)

`MODULE_METADATA: Record<string, ModuleUiMeta>` — une entrée par module métier prévu
(`whiteboard`, `session`, `roadmap`, `survey`, `quiz`), chacune avec icône SVG inline, route,
couleur d'accent et description ; toutes déclarées `comingSoon: true` à ce stade (aucun module
métier réel livré). `defaultMeta(id)` fournit un fallback (icône générique, route `/${id}`,
couleur grise `#6B7280`, `comingSoon: true`) pour tout `id` renvoyé par l'API mais absent de
`MODULE_METADATA`.

### `ModuleRegistryService` (`module-registry.service.ts`)

Service singleton (`@Injectable({ providedIn: 'root' })`) — pas d'`InjectionToken` explicite
(voir § Écarts pour la justification déjà actée dans le fichier backlog) :

- `modules` — signal en lecture seule des `PivotModuleDto` bruts, vide par défaut.
- `loadModules()` — `GET {apiUrl}/modules`. Sur succès, met à jour `_modules`. **Sur erreur
  HTTP (5xx) ou erreur réseau, réinitialise `_modules` à `[]` et complète l'observable sans
  erreur** (`catchError` → `of([])`) : aucun appelant n'a besoin de gérer un cas d'erreur
  explicite.
- `enrichedModules` (computed) — fusionne chaque `PivotModuleDto` avec `MODULE_METADATA[id]`
  ou `defaultMeta(id)`.
- `activeModules` (computed) — sous-ensemble de `enrichedModules` avec `enabled === true`
  **et** `comingSoon === false`. Tant qu'aucun module métier réel n'existe, cette liste est
  toujours vide (tous les modules connus sont `comingSoon: true`).
- `comingSoonModules` (computed) — entrées de `MODULE_METADATA` **absentes** de la réponse API
  courante, projetées en `PivotModuleUi` avec des valeurs par défaut non documentées à
  l'origine : `version: '0.0.0'`, `enabled: false`, `status: 'offline'` (point relevé non
  bloquant en Gate 3, § Écarts).

### Endpoint consommé (`GET /api/modules`, pivot-core)

- **Authentification** : `@PreAuthorize("isAuthenticated()")`. Le tenant est résolu
  exclusivement depuis le `User` porté par l'`Authentication` du token (jamais un paramètre
  ou un en-tête) ; `auth.getDetails()` est vérifié par pattern-matching `instanceof User user`
  — rejet `401` + log `WARN` structuré si le type ne correspond pas (chemin OIDC entreprise
  ou contexte inattendu).
- **Réponse** : `200` + `List<ModuleDto>` — jamais d'entité JPA exposée.
- Pour chaque `PivotModule` découvert par Spring, `ModuleRegistryService.getModulesForTenant`
  évalue `isEnabled(TenantContext)` : `true` → `ModuleStatus.ONLINE` / `enabled=true`,
  `false` → `ModuleStatus.OFFLINE` / `enabled=false`. **`ModuleStatus.PREVIEW` est déclaré
  dans l'enum mais n'est produit par aucun chemin de code actuel** — documenté comme
  limitation connue dans la Javadoc de l'enum, non bloquant pour ce scope (feature-flag
  granulaire hors périmètre EN03.4).

---

## Contrat technique

### Fichiers introduits — `pivot-ui` (PR #45, #62)

| Fichier | Rôle |
|---------|------|
| `src/app/core/modules/module.model.ts` | Types `ModuleStatus`, `PivotModuleDto`, `PivotModuleUi` |
| `src/app/core/modules/module-metadata.ts` | `MODULE_METADATA` (5 modules), `defaultMeta()` |
| `src/app/core/modules/module-registry.service.ts` | Service signal : `modules`, `enrichedModules`, `activeModules`, `comingSoonModules`, `loadModules()` |
| `src/app/core/modules/module-registry.service.spec.ts` | 9 tests Vitest annoncés dans l'AC — étendus à 12 lors de la review (ajout HTTP 500, erreur réseau, double appel réactif) |
| `PATCH_NOTES.md` (#62) | Entrée `[Unreleased]` — chargement dynamique des modules |

### Fichiers introduits — `pivot-core` (PR #111, #118)

| Fichier | Rôle |
|---------|------|
| `src/main/java/fr/pivot/modules/api/ModuleController.java` | Endpoint `GET /api/modules` — résolution `TenantContext` depuis le token, délégation au service |
| `src/main/java/fr/pivot/modules/registry/ModuleDto.java` | Record API `(id, name, version, enabled, status)` |
| `src/main/java/fr/pivot/modules/registry/ModuleRegistryService.java` | Projection de chaque `PivotModule` en `ModuleDto` selon `isEnabled(TenantContext)` |
| `src/main/java/fr/pivot/modules/registry/ModuleStatus.java` | Enum `ONLINE` / `PREVIEW` / `OFFLINE` |
| `src/test/java/fr/pivot/modules/api/ModuleControllerTest.java` | 9 tests — happy path, liste vide, détails non-`User`, détails `null`, tenant `null`, UUID déterministe |
| `src/test/java/fr/pivot/modules/registry/ModuleRegistryServiceTest.java` | 4 tests — liste vide, module activé/désactivé, liste mixte |
| `PATCH_NOTES.md` (#118) | Entrée `[Unreleased]` — endpoint `GET /api/modules` |

> Ces fichiers backend ont été **déplacés/adaptés par EN03.1** (`pivot-core` PR #119, 3 juillet
> 2026) : `PivotModule`/`TenantContext` migrent vers `fr.pivot.core.modules` /
> `fr.pivot.core.tenant` (packages du starter `pivot-core-starter`), et
> `TenantContext.tenantId` passe de `UUID` (converti depuis un `Long` via un hack
> `longToUuid()`/`ByteBuffer`) à un `Long` direct. `ModuleController`/`ModuleRegistryService`
> restent dans `fr.pivot.modules.{api,registry}` mais sont adaptés aux nouveaux imports — le
> contrat HTTP `GET /api/modules` lui-même (route, forme JSON) est inchangé. Voir
> `docs/specs/EPIC-module-system/en03-1-module-registry-backend.md` pour l'état courant
> canonique de `PivotModule`/`TenantContext`.

### Endpoints / modèles / contrats techniques pertinents

- `GET /api/modules` → `200 [{ id, name, version, enabled, status }]` | `401` (auth invalide).
  Pas de pagination, pas de filtrage — liste complète des modules enregistrés dans le binaire.
- `PivotModuleDto` (TS) ↔ `ModuleDto` (Java, `fr.pivot.modules.registry`) — même forme JSON,
  noms de classe différents (voir § Écarts).

---

## Écarts vs AC initiaux

Les 5 critères de complétion de l'Enabler sont couverts, mais avec des divergences de nommage
et de séquencement déjà partiellement documentées dans le fichier backlog — précisées et
complétées ici :

- **`PivotModuleConfig` → `PivotModuleDto` + `PivotModuleUi`.** L'AC demandait une interface
  unique `{ id, name, route, icon, enabled }` ; le livré sépare la forme API brute
  (`PivotModuleDto`, sans `route`/`icon`) de la forme enrichie UI (`PivotModuleUi`, avec
  `route`/`icon`/`description`/`color`/`comingSoon`) — superset fonctionnel de l'AC, décision
  déjà actée dans le backlog.
- **`MODULE_REGISTRY` `InjectionToken` → `ModuleRegistryService`.** Service Angular idiomatique
  (`providedIn: 'root'`) plutôt qu'un token d'injection explicite, au motif qu'une seule
  implémentation existe. Équivalent fonctionnel, pas de test de substitution multi-implémentation
  à ce jour — à revisiter si un jour plusieurs registres coexistent (aucun signe actuel que ce
  soit prévu).
- **`ModuleStatusService` → `ModuleRegistryService`.** Le cache de statut par session (Signal)
  demandé par l'AC est porté par les mêmes signals `enrichedModules`/`activeModules`/
  `comingSoonModules` du service de registre, pas par un service distinct. Note :
  **`ModuleStatusService` existe bien dans le repo**, mais introduit plus tard par **EN03.2**
  (`pivot-ui` PR #67) pour un besoin différent — l'appel à `GET /api/modules/{id}/status` côté
  guard — à ne pas confondre avec l'AC "cache de statut" d'EN03.4, qui reste porté par
  `ModuleRegistryService`.
- **Séquencement inversé avec EN03.1.** Numériquement, EN03.1 (« PivotModule interface +
  registre backend ») précède EN03.4 dans le backlog, mais **EN03.4 a été mergée en premier**
  (28 juin 2026, core PR #111) — 5 jours avant EN03.1 (3 juillet 2026, core PR #119). EN03.4 a
  donc dû consommer un skeleton `PivotModule`/`TenantContext` préexistant, non encore formalisé
  dans le starter `pivot-core-starter`, avec un `TenantContext.tenantId` en `UUID`
  (conversion `longToUuid()` depuis le `Long` réel) plutôt qu'un `Long` direct. Ce hack a été
  supprimé par EN03.1 sans impact sur le contrat HTTP `GET /api/modules` ni sur
  `PivotModuleDto`/`PivotModuleUi` côté frontend — mais l'implémentation backend revue et notée
  93/100 sous EN03.4 (commit `56132fb7`) **n'est plus l'implémentation présente sur `main`
  aujourd'hui** ; elle a été remplacée par celle documentée dans le spec EN03.1.
- **Incohérence de nommage `PivotModuleDto` (TS) vs `ModuleDto` (Java).** Le commentaire de
  `module.model.ts` référence `fr.pivot.modules.registry.PivotModuleDto` côté pivot-core — cette
  classe n'existe pas sous ce nom ; la classe réelle est `fr.pivot.modules.registry.ModuleDto`
  (sans préfixe `Pivot`). Aucun impact fonctionnel (la forme JSON coïncide), mais le commentaire
  de code est trompeur pour quiconque cherche la classe miroir dans pivot-core — à corriger en
  petite PR de nettoyage si l'occasion se présente.
- **Quality Gate SonarCloud initialement FAILED côté backend (core #111).** Premier passage
  Gate 4 = 66/100 : coverage new code 52,3 % (`ModuleController` totalement non testé), plus
  deux risques runtime non gardés (cast non gardé `(User) auth.getDetails()`, NPE potentielle
  sur `user.getTenant()`). Corrigés avant merge (commit `56132fb7`) : 9 tests `@WebMvcTest`
  ajoutés, garde `instanceof User user` + retour 401, null-check sur le tenant → 98,1 %
  coverage new code, Gate 4 = 93/100.
- **`comingSoonModules` — valeurs par défaut non documentées à l'origine.** `version: '0.0.0'`,
  `enabled: false`, `status: 'offline'` sont posées pour toute entrée `MODULE_METADATA` non
  encore retournée par l'API — comportement intentionnel (relevé en Gate 3, non bloquant), à
  documenter explicitement dans le code si le contrat évolue.

---

## Cohérence avec les items adjacents

| Item | Relation |
|------|----------|
| EN03.1 — `PivotModule` interface + registre backend | A refactoré/déplacé le backend consommé par cette PR 5 jours après son merge — voir § Écarts. `docs/specs/EPIC-module-system/en03-1-module-registry-backend.md` fait foi pour l'état courant du backend |
| EN03.2 — Guard Angular `moduleGuard` + status API | Étend `module.model.ts` (modèles de statut) et introduit un `ModuleStatusService` distinct, pour un besoin différent (statut par module unique, pas la liste complète) — à ne pas confondre malgré la proximité de nom avec l'AC d'EN03.4 |
| EN03.3 — Cache Redis statut modules TTL 60s | Sans lien direct avec le contrat frontend ; consommé côté backend par EN03.2 |
| US03.2.1 — UI liste modules disponibles avec statut | Consommateur direct de `ModuleRegistryService.enrichedModules`/`activeModules`/`comingSoonModules` |
| US03.1.1 / US03.1.2 — Admin active/désactive un module | Modifie l'état retourné par `isEnabled(TenantContext)`, donc la valeur `enabled`/`status` vue par ce contrat, sans changer sa forme |

## Hors périmètre (explicitement exclu)

- `InjectionToken` Angular explicite pour le registre — non livré, service singleton jugé
  suffisant tant qu'une seule implémentation existe (voir § Écarts).
- UI réelle de consommation du registre (grille de modules, badges de statut) — livrée sous
  US03.2.1, hors périmètre de ce contrat.
- Rafraîchissement automatique / polling de `loadModules()` — appel explicite à la charge de
  l'appelant (pas de `provideAppInitializer` ni d'intervalle), décision différée à
  l'intégration dans le shell.
- Statut `PREVIEW` : déclaré côté backend et frontend, jamais produit par aucun chemin de code
  à ce jour (feature-flag granulaire hors périmètre).
