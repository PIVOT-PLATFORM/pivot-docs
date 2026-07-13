# US23.2.1 — Vue portefeuille consolidée

## Contexte

- **US** : `docs/backlog/EPIC-portefeuille/FEATURES/portefeuille-comites/us-vue-portefeuille-consolidee.md`
  (F23.2 — Portefeuille, EPIC-portefeuille), Sprint 17
- **PR** : `pivot-pilotage-core`
  [#65](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/65)
  (`feat/us23-2-1-vue-portefeuille-consolidee`) — backend uniquement, `pivot-pilotage-ui` restant
- **Dernier commit au moment du figeage** : `pivot-pilotage-core` `12c6684` — `feat(portfolio):
  US23.2.1 — vue portefeuille consolidée`
- **Commit de merge** : `e3e18ed` (mergé 2026-07-12T13:50:38Z)
- **Gate 4 MERGE_CONFIDENCE** : `pivot-pilotage-core` 100/100 — MERGE_AUTONOMOUS
- **Dépend de** : EN18.9 (`ApplicationConsolidationService`, déjà mergé, réutilisé inchangé pour
  jalons/dates clés), US23.2.4 (météo, PR #57, déjà mergé — santé consommée via
  `ProjectHealthProvider`/`WeatherProjectHealthProvider`)
- Closes #62

---

## Spec fonctionnelle

### Vue consolidée (`GET /tenants/{tenantId}/portfolio`)

Vision 360° multi-projets pour la direction : santé, avancement, phases, jalons et dates clés,
consolidés par application puis par projet.

`PortfolioConsolidationService.consolidate(tenantId)` :

1. liste toutes les `Application` visibles du tenant ;
2. pour chacune, appelle `ApplicationConsolidationService#consolidate` (EN18.9, **inchangé**)
   pour les dimensions « jalons »/« dates clés » (déjà tagués par `projectId` pour le
   drill-down) ;
3. ajoute, par projet : santé (`health`), avancement (`progressPercent`), phases (`phases`).

Détails de calcul introduits par cette PR :

- **`planningStatus`** — partagé avec EN18.9 via le nouveau `ProjectPlanningStatus.deriveFrom(tasks)`
  (extraction/refactor de l'ancienne méthode privée `planningStatusOf` d'`ApplicationConsolidationService`)
  — même formule utilisée aux deux altitudes (application EN18.9, projet US23.2.1), jamais
  dupliquée.
- **`progressPercent`** — moyenne non pondérée du `percentComplete` des tâches `LEAF` qui portent
  un enregistrement `task_progress` ; `BigDecimal.ZERO` si aucune n'en porte — simplification
  délibérée pour cette statistique de synthèse au niveau portefeuille (pas un remplacement du
  rollup pondéré de `PlanProjectionService`, un concern WBS différent).
- **`phases`** — liste des `Phase` du projet, triées par position.

### Santé (health) — consommée, jamais recalculée

Extension point `ProjectHealthProvider` (SPI) :

- `WeatherProjectHealthProvider` câble US23.2.4 (`ProjectWeatherService.computeWeather`, déjà
  mergé) : `SUNNY`/`CLOUDY`/`STORMY` → `ON_TRACK`/`AT_RISK`/`CRITICAL` ; `INDETERMINATE` →
  `Optional.empty()` (fallthrough vers l'état explicite `NOT_SET`, error AC). Un
  `ProjectNotFoundException` levé par `computeWeather` (concurrent delete) est aussi traité comme
  `Optional.empty()`.
- `NoOpProjectHealthProvider` reste enregistré comme filet de sécurité défensif (toujours vide).
- `PortfolioConsolidationService#resolveHealth` interroge chaque provider dans l'ordre, le
  premier qui répond gagne ; sinon `ProjectHealthIndicator.notSet()` (error AC « non renseigné »).

### Drill-down

`PortfolioProjectEntry` ne porte que `projectId`/`teamId` (ids seuls, jamais de contenu dupliqué)
— le frontend navigue vers la fiche projet existante (`RoadmapController`, module Roadmap E22).

### Sécurité

- `PortfolioController` expose `GET /tenants/{tenantId}/portfolio`, gaté par
  `PortfolioReadPolicy` — seule implémentation câblée aujourd'hui : `DenyAllPortfolioReadPolicy`
  (fail-closed, en attendant les rôles `pivot-core-starter`, CLAUDE.md §gap) → 403 systématique
  tant que le starter n'est pas publié.
- Isolation tenant : toutes les lectures passent par des repositories tenant-scopés
  (`findAllByTenantId`, `findAllByApplicationIdAndTenantId`, `findAllByProjectIdAndTenantId`) —
  jamais de FK inter-schéma, jamais de second store.
- Drill-down cross-tenant → réutilise le 404 non-disclosure déjà testé de
  `RoadmapController`/`RoadmapExceptionHandler` (pas de nouvelle surface).

### A11y

`ProjectHealthStatus` est un vocabulaire sémantique (`ON_TRACK`/`AT_RISK`/`CRITICAL`/`NOT_SET`),
jamais une couleur en donnée — le rendu icône/texte est délégué à `pivot-pilotage-ui` (contrat
structurel côté backend uniquement, non testable en l'absence de frontend).

---

## Contrat technique

### Fichiers introduits/modifiés — `pivot-pilotage-core` (PR #65)

| Fichier | Rôle |
|---------|------|
| `ApplicationConsolidationService.java` (modifié) | `planningStatusOf(tasks)` extraite vers `ProjectPlanningStatus.deriveFrom(tasks)` |
| `ProjectPlanningStatus.java` (modifié) | +`deriveFrom(List<Task>)` statique, formule partagée EN18.9/US23.2.1 |
| `PortfolioConsolidationService.java` (nouveau) | Service de consolidation tenant-scopé (application → projets) |
| `PortfolioController.java` (nouveau) | `GET /tenants/{tenantId}/portfolio` |
| `PortfolioReadPolicy.java` / `DenyAllPortfolioReadPolicy.java` (nouveaux) | Extension point de gate lecture, fail-closed |
| `PortfolioExceptionHandler.java` / `PortfolioReadForbiddenException.java` (nouveaux) | Mapping 403 |
| `PortfolioResponse.java` / `PortfolioApplicationEntry.java` / `PortfolioProjectEntry.java` / `PortfolioPhaseEntry.java` (nouveaux) | DTOs records immuables (copies défensives) |
| `ProjectHealthProvider.java` / `ProjectHealthIndicator.java` / `ProjectHealthStatus.java` (nouveaux) | SPI santé + vocabulaire sémantique + état `NOT_SET` |
| `NoOpProjectHealthProvider.java` / `WeatherProjectHealthProvider.java` (nouveaux) | Implémentations du SPI (défensif / câblage US23.2.4) |
| 6 fichiers de test (nouveaux) | Voir § Tests |

Aucune migration Flyway — vue de lecture pure, aucune nouvelle table.

### Endpoints

| Endpoint | Codes retour |
|----------|--------------|
| `GET /tenants/{tenantId}/portfolio` | `200` (`PortfolioResponse`) · `403` (lecture refusée, `DenyAllPortfolioReadPolicy` fail-closed tant que `pivot-core-starter` n'est pas publié) |

Pas de `teamId`/`projectId` dans le path (contrairement à `RoadmapController`) — le portefeuille
est tenant-wide (couvre toutes les équipes) ; `teamId`/`projectId` voyagent dans le corps de la
réponse pour que le frontend construise l'URL de drill-down.

### Gap-era

`tenantId` reste un path variable explicite (`pivot-core-starter`/`TenantContext` non publié,
CLAUDE.md §gap, `TODO-SETUP.md` §5) — pas de contrat `actorRef` ici (endpoint de lecture pure,
pas d'audit trail).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| EN18.9 (`ApplicationConsolidationService`) | Dépendance — réutilisée inchangée pour jalons/dates clés ; `ProjectPlanningStatus.deriveFrom` désormais partagée entre EN18.9 et US23.2.1 |
| US23.2.4 (météo, #57, déjà mergé) | Dépendance — santé consommée via `WeatherProjectHealthProvider`, jamais recalculée ; `SUNNY`/`CLOUDY`/`STORMY`/`INDETERMINATE` mappés vers le vocabulaire `ON_TRACK`/`AT_RISK`/`CRITICAL`/`NOT_SET` propre à cette US |
| US23.2.2 (dashboards personnalisables, #60, PR parallèle) | Aucun recouvrement de fichiers confirmé avant de démarrer (package `dashboard/` distinct) ; pas de dépendance entre les deux |
| Module Roadmap E22 (`RoadmapController`) | Drill-down réutilise le contrôleur et le 404 non-disclosure existants, sans dupliquer le contenu |

---

## Écarts vs AC initiaux

Les 7 AC du backlog (consolidation, drill-down, error santé, 3× security, A11y) sont tous
couverts, sans écart de fond. Une nuance gap-era documentée :

- **Security « lecture sans droit → 403 »** : seul le gate booléen `PortfolioReadPolicy`
  (deny-all aujourd'hui) protège la lecture — pas de distinction fine par projet, en attendant que
  `pivot-core-starter` publie rôles/membership. Non-régression : posture identique à
  `RoadmapEditPolicy` et aux autres gates deny-all déjà mergés dans le repo.
- **A11y** : le contrat backend est structurel (vocabulaire sémantique, jamais de couleur) — le
  rendu effectif (icône/texte, conformité RGAA 4/WCAG 2.1 AA) est délégué à `pivot-pilotage-ui`,
  non testable côté backend seul.

---

## Tests

### `pivot-pilotage-core`

| Test | Comportement vérifié |
|---|---|
| `PortfolioConsolidationServiceIT#consolidate_multiApplicationPortfolio_aggregatesAllFiveDimensions` | Consolidation multi-application : santé/avancement/phases/jalons/dates agrégés |
| `PortfolioConsolidationServiceIT#consolidate_projectWithComputableWeather_surfacesRealHealthIndicator` | Santé réelle calculée via US23.2.4, pas un placeholder |
| `PortfolioConsolidationServiceIT#consolidate_crossTenantData_neverAppears` | Isolation multi-tenant |
| `PortfolioConsolidationServiceIT#consolidate_applicationWithNoProject_listedWithEmptyProjects` / `#consolidate_tenantWithNoApplication_returnsEmptyPortfolio` | Cas limites (application sans projet, tenant sans application) |
| `PortfolioConsolidationServiceTest#consolidate_projectWithNoHealthProvider_reportsExplicitNotSet` | Error AC « non renseigné » |
| `PortfolioConsolidationServiceTest#consolidate_reusesApplicationConsolidationServiceUnchanged` / `#consolidate_onlyReadsThroughTenantScopedRepositories` | Non-duplication EN18.9, isolation tenant au niveau repository |
| `PortfolioConsolidationServiceTest#consolidate_progressPercent_averagesLeafTaskProgress` / `#consolidate_someLeafTasksWithoutProgress_averagesOnlyTheOnesWithARecord` / `#consolidate_noLeafTaskProgress_progressPercentIsZero` | Calcul de l'avancement moyen |
| `PortfolioConsolidationServiceTest#consolidate_phases_orderedByPosition` | Tri des phases |
| `PortfolioControllerIT#getPortfolio_authorized_returns200AndInvokesService` | Contrat HTTP 200 |
| `PortfolioControllerIT#getPortfolio_notAuthorized_returns403AndNeverInvokesService` | Security AC 403, service jamais invoqué |
| `ProjectHealthIndicatorTest#notSet_carriesTheExplicitNotSetStatus` / `#constructor_rejectsNullStatus` | DTO santé |
| `WeatherProjectHealthProviderTest#healthOf_sunnyWeather_mapsToOnTrack` / `#healthOf_cloudyWeather_mapsToAtRisk` / `#healthOf_stormyWeather_mapsToCritical` / `#healthOf_indeterminateWeather_isEmpty` / `#healthOf_projectNotFound_isEmpty` | Mapping météo → santé, tous les cas |

Selon le corps de la PR : 544/544 tests, coverage bundle 95,7 % (ligne), package `portfolio`
100 % lignes/branches (`WeatherProjectHealthProvider` inclus). Checkstyle/SpotBugs : 0 violation.
CI réelle (commentaire Gate 4) : 15/15 checks verts.

### `pivot-pilotage-ui`

Non créé à ce stade — rendu icône/texte de la santé (A11y AC), navigation drill-down effective,
délégués au repo frontend.

---

## Hors périmètre (explicitement exclu)

- Personnalisation de la vue (choix des indicateurs affichés) — US23.2.2.
- Calcul détaillé de l'indicateur de santé/météo — US23.2.4 (cette US consomme, elle ne calcule
  pas).
- Édition des données projet depuis la vue consolidée — lecture seule, la modification se fait
  sur la fiche projet.
- Frontend `pivot-pilotage-ui`.
