# US23.2.4 — Météo et indicateurs normalisés

## Contexte

- **US** : `docs/backlog/EPIC-portefeuille/FEATURES/portefeuille-comites/us-meteo-indicateurs-normalises.md`
  (F23.2, E23 — Portefeuille, Phase phase-3, Sprint 17)
- **PR** : `pivot-pilotage-core` [#57](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/57)
  (`feat/us23-2-4-meteo-indicateurs`)
- **Dernier commit au moment du figeage** : squash-merge sur `main` le 2026-07-12
  (`65bd9d1f43588722bcb49c0580f96a35ae7ae38b`)
- **Gate 2 COVERAGE** : 100 % lignes sur le package nouveau `fr.pivot.pilotage.weather`
  (113/113, JaCoCo) ; bundle repo entier 95.18 % (seuil CI ≥ 80 %)
- **Gate 4 MERGE_CONFIDENCE** : 100/100 — auto-approuvé (CI 15/15 verte : SonarCloud, CodeQL,
  Semgrep, Gitleaks, Trivy, SCA, PITest, Plumber, Tests Backend TU+TI ; aucun finding bloquant)
- **Dépend de** : EN18.1 (schéma `pilotage.project`/`pilotage.application`), EN22.1a (schéma
  temporel — `task`, `task_progress`), EN18.9 (package `consolidation` — réutilise
  `ProjectNotFoundException`/`ApplicationNotFoundException`, foundational, déjà mergé). **Ne
  dépend pas** de US23.2.1 (vue portefeuille consolidée) ni de US23.2.2 (dashboards
  personnalisables) — ni l'une ni l'autre n'avait de PR ouverte au moment de cette
  implémentation ; le contrat est conçu pour rester consommable une fois ces deux US livrées
  (cf. § Cohérence avec les items adjacents).
- **Frontend** : non traité par cette PR (`pivot-pilotage-ui` restant — cf. § Hors périmètre).
  Aucun contrôleur REST non plus (cf. § Écarts).

---

## Spec fonctionnelle

### Principe

Un indicateur météo synthétique par projet, calculé à la demande (jamais persisté) à partir des
seules données déjà possédées par le domaine Pilotage (EN22.1a) : la date de fraîcheur du projet
(`project.status_date`), la fenêtre temporelle de ses tâches et leur avancement. Les règles de
calcul sont **fixes et homogènes** — mêmes seuils quel que soit le profil d'organisation (PME,
Grand groupe, Publique…) — et **non personnalisables par tenant** pour cette US (cf. § Hors
périmètre du backlog). Le service est le **point d'entrée unique** que US23.2.1 (vue consolidée)
et US23.2.2 (dashboards) sont censées consommer plutôt que réimplémenter leur propre calcul.

### Modèle de calcul

1. **Avancement réel** (`actualProgressPercent`) — moyenne de `task_progress.percent_complete`
   sur les tâches de nature `LEAF` du projet qui portent un enregistrement de progression (les
   tâches `SUMMARY`/`MILESTONE` ne portent pas directement d'avancement — même convention que
   `WbsTaskService#leafPercents`).
2. **Fenêtre temporelle** — bornée par le début le plus tôt et la fin la plus tardive parmi
   *toutes* les tâches du projet, période floue (`fuzzy_period_start`/`fuzzy_period_end`)
   prioritaire, sinon repli sur les dates précises (`start_date`/`finish_date` repliées en
   `LocalDate` UTC) — même logique que `ApplicationConsolidationService` (EN18.9).
3. **Avancement attendu** (`expectedProgressPercent`) — part linéaire homogène de la fenêtre
   écoulée à `project.statusDate` (ancre de fraîcheur EN22.1a), bornée à [0, 100]. Une fenêtre
   d'un seul jour (début = fin, ex. jalon isolé) résout à 0 avant cette date et 100 à partir
   d'elle.
4. **Variance** (`varianceInPoints`) = réel − attendu, en points de pourcentage.
5. **Classification** — seuils fixes, homogènes, non configurables par cette US :

   | Variance | Statut |
   |---|---|
   | ≥ −5 | `SUNNY` |
   | [−15, −5[ | `CLOUDY` |
   | < −15 | `STORMY` |

### Cas d'erreur — jamais de météo par défaut trompeuse

`statusDate` manquant, fenêtre temporelle indérivable (aucune tâche datée, ou fenêtre
incohérente — borne de fin antérieure à la borne de début), ou aucune tâche `LEAF` ne portant de
progression → `ProjectWeatherStatus.INDETERMINATE`, avec une raison explicite
(`ProjectWeatherIndeterminateReason` : `MISSING_STATUS_DATE` / `MISSING_WINDOW` /
`MISSING_PROGRESS`). `actualProgressPercent`/`expectedProgressPercent`/`varianceInPoints` sont
alors `null` — jamais une valeur numérique arbitraire.

### Sécurité

- **Isolation tenant** : `computeWeather`/`computeWeatherForApplication` ne lisent que des
  repositories tenant-scopés (`findByIdAndTenantId`, `findAllByApplicationIdAndTenantId`…). Un
  projet/application inexistant ou appartenant à un autre tenant est traité comme absent
  (`ProjectNotFoundException`/`ApplicationNotFoundException`, réutilisées du package
  `consolidation`, EN18.9 — mappent sur 404 au futur contrôleur, non-divulgation d'existence).
  Testé (TU + TI cross-tenant sur les deux méthodes).
- **Modification des règles de calcul** : `WeatherRuleAuthorization.assertCanModifyRules(role)`
  lève `UnauthorizedWeatherRuleChangeException` (403-équivalent) pour tout rôle autre que
  `WeatherRuleRole.PMO`/`PORTFOLIO_ADMIN`. Voir § Écarts pour la résolution de l'ambiguïté Gate 1
  entre cet AC et le hors-périmètre "pas de personnalisation par tenant".

### A11y

`ProjectWeatherStatus` porte, pour chacune de ses 4 valeurs, un libellé français (`label()`) et un
token d'icône stable (`icon()`) — jamais la couleur seule. Testé
(`WeatherDtoTest#everyStatus_carriesNonBlankLabelAndIcon_neverColorAlone`,
`#statusLabelsAndIcons_areDistinctAcrossStatuses`). Le mapping icône → glyphe/asset visuel reste
la responsabilité du consommateur (`pivot-pilotage-ui`, à venir).

---

## Contrat technique

### Fichiers introduits (`pivot-pilotage-core`, package `fr.pivot.pilotage.weather`)

| Fichier | Rôle |
|---|---|
| `ProjectWeatherService` | `@Service` — `computeWeather(long tenantId, long projectId)` et `computeWeatherForApplication(long tenantId, long applicationId)` (batch, ordre déterministe par `projectId`) |
| `ProjectWeather` | Record immuable — `(projectId, tenantId, status, actualProgressPercent, expectedProgressPercent, varianceInPoints, asOfDate, indeterminateReason)` |
| `ProjectWeatherStatus` | Enum `SUNNY \| CLOUDY \| STORMY \| INDETERMINATE`, chaque valeur porte `label()` + `icon()` |
| `ProjectWeatherIndeterminateReason` | Enum `MISSING_STATUS_DATE \| MISSING_WINDOW \| MISSING_PROGRESS` |
| `WeatherRuleAuthorization` | `@Service` — `assertCanModifyRules(WeatherRuleRole)`, lève `UnauthorizedWeatherRuleChangeException` |
| `WeatherRuleRole` | Enum local temporaire `PROJECT_MANAGER \| PMO \| PORTFOLIO_ADMIN` (placeholder en attendant les rôles réels via `pivot-core-starter`, TODO-SETUP §5) |
| `UnauthorizedWeatherRuleChangeException` | `RuntimeException` — mappe sur 403 au futur contrôleur |

**Aucune migration Flyway** — le calcul est entièrement à la volée depuis les données EN22.1a déjà
persistées (`project.status_date`, `task`, `task_progress`) ; aucune nouvelle table.

### Signature du contrat de service

```java
@Service
public class ProjectWeatherService {
    ProjectWeather computeWeather(long tenantId, long projectId);
    List<ProjectWeather> computeWeatherForApplication(long tenantId, long applicationId);
}

record ProjectWeather(
    long projectId, long tenantId, ProjectWeatherStatus status,
    BigDecimal actualProgressPercent, BigDecimal expectedProgressPercent, BigDecimal varianceInPoints,
    LocalDate asOfDate, ProjectWeatherIndeterminateReason indeterminateReason);

enum ProjectWeatherStatus { SUNNY, CLOUDY, STORMY, INDETERMINATE } // + label(), icon()
enum ProjectWeatherIndeterminateReason { MISSING_STATUS_DATE, MISSING_WINDOW, MISSING_PROGRESS }

@Service
public class WeatherRuleAuthorization {
    void assertCanModifyRules(WeatherRuleRole requesterRole); // throws UnauthorizedWeatherRuleChangeException
}
enum WeatherRuleRole { PROJECT_MANAGER, PMO, PORTFOLIO_ADMIN }
```

### Tests

- **TU (Mockito)** : `ProjectWeatherServiceTest` (15 cas — SUNNY/CLOUDY/STORMY/ahead-of-schedule,
  bornes de fenêtre à un jour, les 3 branches INDETERMINATE, batch multi-projets ordonné,
  isolation tenant sur les deux méthodes), `WeatherDtoTest` (4 cas — garde `status` non-null,
  contrat A11y label/icône), `WeatherRuleAuthorizationTest` (3 cas — PMO/PORTFOLIO_ADMIN
  autorisés, PROJECT_MANAGER refusé).
- **TI Testcontainers** (PostgreSQL 18, `ProjectWeatherServiceIT`, 9 tests) : mêmes AC contre une
  base réelle — classification SUNNY/STORMY, cas d'erreur `MISSING_PROGRESS`/
  `MISSING_STATUS_DATE`, cohérence batch/individuel, isolation cross-tenant sur les deux
  méthodes, project/application inconnus.
- Coverage nouveau package : **100 % lignes** (JaCoCo, confirmé Gate 2).

---

## Écarts vs AC initiaux

Les 6 AC (nominal, agrégation batch, erreur, 2× sécurité, A11y) sont tous couverts et testés.
Deux points de divergence entre le backlog et le livré réel, tous deux tranchés en amont de
l'implémentation (PO Agent self-challenge, Gate 1) :

- **Pas de contrôleur REST.** Comme pour EN18.9, `TenantContext`/rôles ne sont pas encore
  consommables (`fr.pivot:pivot-core-starter` non publié — gap documenté `TODO-SETUP.md` §5).
  `tenantId` reste un paramètre explicite de service, jamais extrait d'un contexte/header. La
  surface REST (et son mapping HTTP 403/404 réel) arrivera dans une US ultérieure, une fois le
  starter publié — sans changement de signature de service attendu.
- **Ambiguïté Gate 1 sur l'AC sécurité "règles modifiables uniquement par PMO/admin".** Cet AC
  semblait en tension avec la note "Hors périmètre : personnalisation des règles par
  tenant/organisation non incluse" du backlog. Résolution retenue : les seuils de classification
  restent des constantes Java fixes et homogènes dans `ProjectWeatherService`
  (`ON_TRACK_VARIANCE_THRESHOLD`/`AT_RISK_VARIANCE_THRESHOLD`) — aucune persistance, aucun
  override par tenant, conforme au hors-périmètre. `WeatherRuleAuthorization` est néanmoins
  implémenté comme un garde-fou de service réel et testé dès maintenant (et non différé ou
  simulé par une persistance hors périmètre) — le seam qu'une future capacité
  d'administration des règles (post-starter) viendra invoquer, sans changer le contrat actuel.
  Même pattern que `ApplicationNotFoundException` (EN18.9), qui ne se mappe sur un code HTTP
  qu'une fois un contrôleur branché.

---

## Cohérence avec les items adjacents

| Item | Relation |
|---|---|
| US23.2.1 (vue portefeuille consolidée, Sprint 17, non livrée au moment du figeage) | Consommateur attendu de `computeWeatherForApplication` — évite tout recalcul divergent par vue (AC2). Aucune dépendance inverse : cette US n'a pas attendu US23.2.1. |
| US23.2.2 (dashboards personnalisables, Sprint 17, non livrée au moment du figeage) | Consommateur attendu de `computeWeather`/`computeWeatherForApplication` pour l'affichage de l'indicateur dans un widget de dashboard. |
| EN18.9 (`consolidation`, mergé) | Fournit `ProjectNotFoundException`/`ApplicationNotFoundException`, réutilisées telles quelles (pas de duplication) pour l'isolation tenant. |
| EN22.1a (schéma temporel, mergé) | Source unique des données lues (`task`, `task_progress`, `project.status_date`) — aucune nouvelle colonne/table. |
| Futur contrôleur REST `/api/pilotage/*` (post `pivot-core-starter`) | Mappera `ProjectNotFoundException`/`ApplicationNotFoundException` → 404 et `UnauthorizedWeatherRuleChangeException` → 403, sans changement de signature de service. |
| `pivot-pilotage-ui` | Consommera le contrat une fois le contrôleur REST exposé ; le couple `label()`/`icon()` de `ProjectWeatherStatus` est le contrat A11y attendu côté rendu (jamais la couleur seule). |

## Hors périmètre (explicitement exclu)

- Personnalisation des règles de calcul par tenant/organisation (règles homogènes fixées au
  niveau portefeuille pour cette US — cf. backlog).
- Historisation de l'évolution de la météo dans le temps (tendance).
- Consommation dans la vue consolidée (US23.2.1) et les dashboards (US23.2.2) — cette US ne
  couvre que le calcul et la remontée du contrat.
- Contrôleur REST et mapping HTTP effectif des exceptions (403/404) — différé au même gap que
  EN18.9 (`pivot-core-starter` non publié).
- Frontend `pivot-pilotage-ui`.
