# US22.4.9 — Baselines multiples & analyse des écarts

## Contexte

- **US** : [`us-baselines-ecarts.md`](pathname:///pivot-docs/backlog/EPIC-roadmap/FEATURES/gantt-detaille/us-baselines-ecarts) · Parent `F22.4` · Module `pilotage` · Phase `phase-3` · Sprint 17
- **PR backend** : `pivot-pilotage-core` [#63](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/63) — **Commit figé** : `3098971` (squash-merge, package `fr.pivot.pilotage.baseline`)
- **PR frontend** : `pivot-pilotage-ui` [#43](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/43) (`feat/us22-4-9-baselines-ecarts`) — **Commit au figeage** : `b0e26bd` (PR non fusionnée au moment du figeage — Gate 5 a lieu dès convergence de l'Autoloop, avant merge, voir `docs/specs/README.md` ; fusion différée, séquencée séparément par le mainteneur, une autre US du même sprint — US22.4.8 — étant active en parallèle sur des fichiers partagés `pivot-pilotage-ui`)
- **Périmètre** : backend **et** frontend, contrairement aux autres specs Gate 5 de ce même
  epic (`us22-4-4-contraintes-echeances.md`, `us22-4-6-jalons-taches-periodiques.md`) écrites
  avant que leur frontend n'existe — le backend #63 était déjà mergé sans spec figée avant que
  cette PR frontend ne démarre ; ce fichier couvre donc les deux d'un coup.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Un rôle PMO ou chef de projet peut figer, à tout instant, l'état courant du planning d'un projet
dans une **baseline** — un instantané non révisable des dates/durée/travail/coût de chaque tâche.
Jusqu'à **11 baselines** par projet (parité MS Project : `Baseline` + `Baseline 1` à `Baseline
10`), identifiées par un slot numérique `0..10`, jamais par un nom libre (voir "Écart vs AC
initiaux" ci-dessous). Poser sur un slot déjà utilisé **écrase** silencieusement l'ancien
instantané (et ses lignes de snapshot, `ON DELETE CASCADE`) — c'est l'action "écraser" de l'AC
sécurité.

Une fois une baseline posée, deux lectures sont possibles, jamais mutuellement exclusives :

1. **Écarts vs le planning courant** (`variance`) — pour chaque tâche de la baseline, compare la
   valeur figée à la valeur *actuelle* du graphe temporel unique (EN22.1), jamais une baseline
   recalculée rétroactivement. Dates, durée, travail (Σ assignations) et coût (Σ assignations)
   sont chacun comparés ; le delta de durée/travail/coût porte en plus un pourcentage.
2. **Comparaison de deux baselines entre elles** (`compare`) — même structure de delta, mais entre
   deux instantanés figés, sans valeur "courante" impliquée. Une tâche présente dans une seule des
   deux baselines (créée ou supprimée entre les deux captures) porte `null` du côté absent, et
   chaque delta associé est alors lui-même `null` ("non comparable").

Chaque variance/delta est accompagné d'un **libellé texte français déjà généré côté serveur**
(ex. `"Début en retard de 3 j"`, `"Durée sans écart"`, `"Coût : non comparable (donnée absente)"`)
— jamais un simple signe ou une couleur (A11y AC). L'altitude temporelle (EN22.1a,
`bl_temporal_precision`) est également figée par tâche : un booléen `temporalPrecisionChanged`
signale quand l'altitude a changé depuis la capture, pour interpréter l'écart avec prudence
(comparer une baseline roadmap floue à un Gantt précis courant, ou l'inverse).

### Performance (EN22.2)

La capture d'une baseline sur un plan volumineux (10 000+ tâches, note d'implémentation de l'US)
reste bornée : `BaselineService.setBaseline` charge toutes les tâches du projet **en une requête**,
puis toutes leurs assignations **en un seul `IN (...)`** (jamais une requête par tâche), avant
d'insérer les snapshots en lot (`saveAll`).

### Sécurité

- Lecture (`list`/`variance`/`compare`) : **non gatée** — un contributeur planning en lecture
  seule peut consulter les écarts (AC sécurité).
- Écriture (`setBaseline`/`deleteBaseline`) : gatée par `BaselineEditPolicy` — **fail-closed
  aujourd'hui** (`DenyAllBaselineEditPolicy`, même gap plateforme que tout autre write Gantt de ce
  repo : `pivot-core-starter` non publié, pas de résolution réelle du rôle PMO/chef de projet
  encore possible). Tout appel `POST`/`DELETE` répond `403` inconditionnellement tant que ce gap
  n'est pas comblé — comportement volontaire, pas un bug.
- Isolation tenant/team/projet : toute résolution échouée (projet inconnu, cross-tenant, baseline
  inconnue) retourne un `404` sans corps (non-divulgation) — jamais un `403` qui confirmerait
  l'existence de la ressource.

## Contrat technique final

### Base URL

`/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/baselines` — **pas** de segment
`/gantt/` (à la différence de `WbsTaskController`) : `BaselineController` est monté directement
sous `projects/{projectId}`. `tenantId`/`teamId`/`projectId` en path (gap-era, jamais
body/query/header — `TenantContext` non consommable, `TODO-SETUP.md` §5).

### Lecture — non gatée

| Endpoint | Réponse |
|----------|---------|
| `GET .../baselines` | `200` — `List<BaselineResponse>` triée par slot |
| `GET .../baselines/{baselineIndex}/variance` | `200` — `BaselineVarianceResponse` (écarts vs courant) |
| `GET .../baselines/{fromIndex}/compare/{toIndex}` | `200` — `BaselineComparisonResponse` (évolution entre deux baselines) |

Erreurs communes : `404` bodyless (projet non visible, ou baseline/slot inconnu).

```json
// GET .../baselines/0/variance
{
  "baselineIndex": 0,
  "baselineCapturedAt": "2026-07-01T09:00:00Z",
  "tasks": [
    {
      "taskId": 42,
      "taskName": "Analyse",
      "baselineStart": "2026-07-01T09:00:00Z",
      "currentStart": "2026-07-04T09:00:00Z",
      "startVarianceMinutes": 4320,
      "startVarianceLabel": "Début en retard de 3 j",
      "baselineFinish": "2026-07-05T17:00:00Z",
      "currentFinish": "2026-07-05T17:00:00Z",
      "finishVarianceMinutes": 0,
      "finishVarianceLabel": "Fin sans écart",
      "baselineDurationMinutes": 2400,
      "currentDurationMinutes": 2400,
      "durationVarianceMinutes": 0,
      "durationVariancePercent": 0.00,
      "durationVarianceLabel": "Durée sans écart",
      "baselineWorkMinutes": 4800,
      "currentWorkMinutes": 4800,
      "workVarianceMinutes": 0,
      "workVariancePercent": 0.00,
      "workVarianceLabel": "Travail sans écart",
      "baselineCostAmount": 1000.00,
      "currentCostAmount": 1000.00,
      "costVarianceAmount": 0.00,
      "costVariancePercent": 0.00,
      "costVarianceLabel": "Coût sans écart",
      "baselineTemporalPrecision": "DAY",
      "currentTemporalPrecision": "DAY",
      "temporalPrecisionChanged": false
    }
  ]
}
```

`compare` renvoie la même forme de ligne (`BaselineComparisonRowResponse`), avec `from*`/`to*` au
lieu de `baseline*`/`current*`, et sans les champs d'altitude (non repris côté comparaison
baseline-à-baseline).

### Écriture — gatée (rôle PMO/chef de projet requis)

| Endpoint | Effet |
|----------|-------|
| `POST .../baselines` | Pose ou écrase (`SetBaselineRequest{baselineIndex}`) — `201 Created`, corps `BaselineResponse` |
| `DELETE .../baselines/{baselineIndex}` | Supprime (cascade sur les snapshots) — `204 No Content` |

`POST` — corps optionnel :

```json
{ "baselineIndex": 3 }
```

- `baselineIndex` absent, ou corps entièrement absent (`required = false`) : auto-assigne le plus
  petit slot libre (`0..10`).
- `baselineIndex` explicite déjà utilisé : écrase cette baseline (l'ancien snapshot est supprimé
  puis remplacé, jamais fusionné).
- `baselineIndex` hors `0..10` : `422` `INVALID_BASELINE_INDEX`.
- Slot omis et les 11 slots déjà utilisés : `409` `BASELINE_LIMIT_EXCEEDED` — message invitant à
  écraser ou supprimer une baseline existante (AC erreur).

Erreurs communes aux deux endpoints d'écriture : `403` bodyless (non autorisé, fail-closed
aujourd'hui — voir Sécurité), `404` bodyless (projet non visible).

```json
// 409 sur un POST sans baselineIndex, les 11 slots déjà utilisés
{ "code": "BASELINE_LIMIT_EXCEEDED", "message": "..." }
```

### Schéma BDD — `pilotage.baseline` / `pilotage.baseline_snapshot`

Posé par EN22.1a (frozen contract §a), aucune migration nouvelle apportée par cette US.

| Table | Contraintes clés |
|-------|-------------------|
| `pilotage.baseline` | `baseline_index SMALLINT NOT NULL`, `CHECK baseline_index BETWEEN 0 AND 10`, `UNIQUE (project_id, baseline_index)` |
| `pilotage.baseline_snapshot` | Une ligne par tâche figée : `bl_start`, `bl_finish`, `bl_duration_minutes`, `bl_work_minutes`, `bl_cost_amount`, `bl_temporal_precision` — FK `baseline_id` `ON DELETE CASCADE` |

### Classes Java concernées (`fr.pivot.pilotage.baseline`)

| Classe | Rôle |
|--------|------|
| `BaselineController` | REST — thin, délègue à `BaselineService`, gate via `BaselineEditPolicy` |
| `BaselineService` | Pose/écrase/supprime/liste, calcule `variance`/`compare` — jamais de recalcul rétroactif de la baseline elle-même |
| `Baseline` / `BaselineSnapshot` | Entités JPA — jamais exposées directement (DTOs dédiés) |
| `BaselineResponse` / `SetBaselineRequest` / `BaselineVarianceResponse` / `TaskVarianceResponse` / `BaselineComparisonResponse` / `BaselineComparisonRowResponse` | DTOs |
| `BaselineEditPolicy` / `DenyAllBaselineEditPolicy` | Extension point du rôle d'édition, fail-closed aujourd'hui |
| `BaselineLimitExceededException` / `InvalidBaselineIndexException` / `BaselineNotFoundException` / `BaselineProjectNotFoundException` / `BaselineEditForbiddenException` | Exceptions domaine, mappées par `BaselineExceptionHandler` (409/422/404/404/403) |
| `BaselineApiError` | Corps d'erreur `{code, message}` pour les 422/409 |

## Frontend (`pivot-pilotage-ui`)

### Route

`tenants/:tenantId/teams/:teamId/projects/:projectId/gantt/baselines` → `BaselinePanelComponent`
(`loadComponent`, lazy). **Panneau dédié, pas d'intégration dans `WbsTreeComponent`** — décision
documentée dans le TSDoc du composant : `WbsTreeComponent`/`wbs.models.ts` sont modifiés en
parallèle par US22.4.8 sur ce même sprint (issue
[#40](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/issues/40)), une intégration inline
aurait créé une collision de fichiers réelle. Choix cohérent avec le découpage déjà établi par
`TaskConstraintComponent`/`TaskSchedulingComponent`/`DependencyManagerComponent` (routes
dédiées plutôt qu'édition inline de l'arbre WBS).

### Composants / services

| Fichier | Rôle |
|---------|------|
| `features/gantt/data-access/baseline.models.ts` | Miroir TypeScript des DTOs backend |
| `features/gantt/data-access/baseline-api.service.ts` | `HttpClient` — `list`/`setBaseline`/`deleteBaseline`/`variance`/`compare`, aucune gestion d'erreur (propage `HttpErrorResponse`) |
| `features/gantt/baseline-panel/baseline-panel.component.{ts,html,scss}` | Panneau : poser/écraser (slot optionnel), lister/supprimer, sélecteur de baseline active + tableau d'écarts, comparaison de deux baselines |

### Écart vs AC initiaux — pas de champ "nom" de baseline (Gate 1 PO Agent)

Le brief de cette US demandait "un bouton + nom optionnel" pour poser une baseline. Le contrat
backend figé (`SetBaselineRequest{baselineIndex}`, `BaselineResponse{id, baselineIndex,
capturedAt, taskCount}`, entité `Baseline`) n'expose **aucun champ nom** — uniquement le slot
numérique `0..10` déjà documenté ci-dessus. Le frontend réalise donc le "nom optionnel" comme le
**choix optionnel du slot** (laissé vide ⇒ auto-assignation du premier libre), affiché
`"Baseline"` / `"Baseline N"` (`gantt.baselines.slotLabel.*`) — jamais un nom libre inventé côté
client sans backend pour le persister (aurait été silencieusement perdu au rechargement, ou un
état local non partageable entre utilisateurs). Décision consignée dans `baseline.models.ts`
(TSDoc de classe), l'issue frontend
[#41](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/issues/41) et la PR
[#43](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/43).

### A11y

Tableaux natifs (`<table>`/`<th scope="col">`), aucun widget custom — navigation clavier native
(AC). Chaque cellule d'écart affiche la valeur **et** le libellé texte fourni par le backend
(`*VarianceLabel`/`*DeltaLabel`), un modificateur de couleur (`--behind`/`--ahead`) n'étant qu'un
renfort décoratif superposé, jamais le seul vecteur d'information (AC). Une baseline dont
l'altitude a changé depuis la capture (`temporalPrecisionChanged`) porte un badge visible
(icône + texte, `title`), jamais une simple couleur. Une région `aria-live="polite"` annonce
chaque pose/écrasement/suppression réussie.

### Tests

- Vitest : `baseline-api.service.spec.ts` (13 tests, tous les endpoints + codes d'erreur),
  `baseline-panel.component.spec.ts` (37 tests — AC1/AC2/AC3, AC erreur limite 11 baselines,
  sécurité 403/404 sans retry, A11y). Coverage des fichiers ajoutés : 99.4 % statements / 89.4 %
  branches.
- Playwright (`e2e/baseline-panel.e2e.spec.ts`) : happy path (pose auto-assignée puis écarts par
  tâche) + cas d'erreur (refus client-side d'une 12e baseline auto-assignée). Réseau stubé
  (`page.route`), aucun `pivot-pilotage-core` réel démarré en CI — même posture que les autres
  specs E2E de ce repo.

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US22.4.8 (suivi d'avancement) | La saisie de l'avancement réel qui alimente les écarts (`currentDurationMinutes`/`currentCostAmount` côté `Task`/`Assignment`) est hors périmètre ici — couverte par US22.4.8, active en parallèle sur ce sprint |
| US22.5.4 (coûts) | Le calcul des coûts réels affectés (main-d'œuvre, autres coûts) est hors périmètre ici — `costVariance*` compare des `Assignment.costAmount` déjà existants, sans recalcul |
| F22.6/F22.7 | L'export des écarts en rapport formaté (PDF/Excel) est hors périmètre ici |
| EN22.1 | Modèle temporel unique — `variance`/`compare` comparent au graphe courant, jamais une baseline recalculée rétroactivement |

## Hors périmètre

- La saisie de l'avancement réel qui alimente les écarts — US22.4.8
- Le calcul des coûts réels affectés (main-d'œuvre, autres coûts) — US22.5.4
- L'export des écarts en rapport formaté (PDF/Excel) — F22.6/F22.7
- Renommage libre d'une baseline (pas de champ backend) — voir "Écart vs AC initiaux" ci-dessus

---

Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Sprint 17
Stage: Review
