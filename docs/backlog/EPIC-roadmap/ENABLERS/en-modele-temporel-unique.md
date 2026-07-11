# EN22.1 — Modèle temporel unique & moteur d'ordonnancement

**Type d'enabler** : architecture (modèle de données + moteur)

**Objectif technique** : Poser **un seul graphe temporel** dont la roadmap rapide et le Gantt détaillé sont **deux vues** (pas deux stockages). Interdit la double saisie et la divergence (vision data-centric PIVOT, cf. ADR-010).

Entités (schéma `pilotage`, rattachées à `Projet` → `Application`, cf. EN18.9) :

```text
Projet ─< Phase ─< Tâche (récapitulative | feuille | jalon durée 0 | périodique)
                      │
                      ├─< Dépendance (type FS/SS/FF/SF, retard/avance)
                      ├─< Contrainte (ASAP/ALAP/MSO/MFO/SNET/FNLT…) + Deadline
                      ├─< Affectation (Ressource, unités, travail) ─ Coût
                      └─  Avancement (% réalisé, réel/restant, dates réelles)
Calendrier (projet | tâche | ressource : jours ouvrés, exceptions)
Baseline (0..10) : dates/durée/travail/coût figés
Jalon = objet **partagé** entre la vue roadmap (macro) et la vue Gantt (détail)
```

**Moteur d'ordonnancement** : calcule dates au plus tôt/tard, marges (libre/totale), **chemin critique**, en respectant dépendances, contraintes et calendriers ; planification **auto** (recalcul) ou **manuelle** (dates figées + signalement d'écart).

**Justification** : c'est la condition pour « faire aussi bien que MS Project, mais web » sans silo roadmap/Gantt ; **le jalon partagé** garantit la cohérence des deux vues.

## Contrat figé (2026-07-10)

> Fusion des trois angles d'architecture (schéma champ · moteur & API · dérivation de vues + événements). Cohérence : ADR-010 (un graphe, deux vues, jalon partagé, zéro double stockage), ADR-006 (aucune FK inter-modules, agrégation via bus PIVOT), EN18.1 (schéma `pilotage`, `tenant_id`), EN18.9 (Application → Projet), EN18.10 (altitude par défaut fournie par le profil, seam substituable E40).
>
> **Principe d'altitude à deux niveaux (décision cadre qui lève la contradiction ADR-010 §2 vs EN18.10)** :
>
> - **Altitude EFFECTIVE** persistée sur chaque nœud (`temporal_precision` + bornes floues coexistant avec les dates précises sur la même ligne) : c'est la valeur du graphe, jamais dupliquée entre roadmap et Gantt.
> - **Altitude par DÉFAUT / curseur de vue** : politique de rendu lue via `resolveProfile(tenant).altitude` (EN18.10), substituable E40 sans toucher au schéma `pilotage`. Le profil ne fait que fournir le défaut à la création et le cran d'ouverture de vue.
>
> Le profil = politique ; le nœud = valeur effective. Le moteur d'ordonnancement ne consomme jamais l'altitude (elle paramètre la **projection** de sortie, pas le calcul).

### (a) Modèle de données — schéma `pilotage`

Convention transverse : toutes les tables portent `id BIGINT` (PK, identity), `tenant_id BIGINT NOT NULL` (FK `public.tenants(id)`, indexé — EN18.1), `created_at`/`updated_at TIMESTAMPTZ NOT NULL`. Types PostgreSQL. **Aucune FK sortant de `pilotage`** sauf vers `public.tenants` / `public.teams` (ADR-006, EN17.4). Les colonnes de convention ne sont pas répétées dans chaque table ci-dessous.

#### `pilotage.project`

| Champ | Type | Null | Notes |
|---|---|---|---|
| `application_id` | BIGINT | NON | FK `pilotage.application(id)` — rattachement traçable (EN18.9) |
| `calendar_id` | BIGINT | NON | FK `pilotage.calendar(id)` — calendrier projet par défaut |
| `scheduling_mode` | ENUM(`AUTO`,`MANUAL`) | NON | défaut `AUTO` ; peut être surchargé par tâche |
| `status_date` | DATE | OUI | date d'arrêté (fraîcheur, garde-fou « Gantt qui ment » ADR-010) — **source de vérité projet** |
| `default_temporal_precision` | ENUM(`SEMESTER`,`QUARTER`,`MONTH`,`WEEK`,`DAY`) | OUI | snapshot de `resolveProfile(tenant).altitude` à la création ; NULL ⇒ relire le profil à la volée |

> Le Projet ne stocke aucune « altitude de vue » : c'est une préférence de rendu résolue via EN18.10.

#### `pilotage.phase`

| Champ | Type | Null | Notes |
|---|---|---|---|
| `project_id` | BIGINT | NON | FK `pilotage.project(id)` |
| `parent_task_id` | BIGINT | OUI | FK `pilotage.task(id)` — phase adossée à une tâche récapitulative racine (NULL = regroupement macro simple) |
| `name` | VARCHAR(255) | NON | |
| `position` | INT | NON | ordre d'affichage |

#### `pilotage.task` — nœud central du graphe, porteur de l'altitude effective

| Champ | Type | Null | Notes |
|---|---|---|---|
| `project_id` | BIGINT | NON | FK `pilotage.project(id)` |
| `phase_id` | BIGINT | OUI | FK `pilotage.phase(id)` |
| `parent_task_id` | BIGINT | OUI | FK `pilotage.task(id)` — WBS auto-référent |
| `wbs_code` | VARCHAR(64) | OUI | **dérivé serveur** (parent + rang), matérialisé pour tri/virtualisation (EN22.2) ; écriture refusée (422) |
| `position` | INT | NON | ordre au sein du parent |
| `name` | VARCHAR(512) | NON | |
| `node_kind` | ENUM(`SUMMARY`,`LEAF`,`MILESTONE`,`RECURRING`) | NON | récapitulative / feuille / jalon durée 0 / périodique |
| `shared_in_roadmap` | BOOLEAN | NON | nœud projeté dans la vue macro (un seul objet, pas de copie) |
| `temporal_precision` | ENUM(`SEMESTER`,`QUARTER`,`MONTH`,`WEEK`,`DAY`) | NON | **altitude EFFECTIVE du nœud** — grain temporel |
| `fuzzy_period_start` | DATE | OUI | borne basse période floue (vue roadmap) |
| `fuzzy_period_end` | DATE | OUI | borne haute période floue (vue roadmap) |
| `start_date` | TIMESTAMPTZ | OUI | date précise (vue Gantt) |
| `finish_date` | TIMESTAMPTZ | OUI | date précise (vue Gantt) |
| `duration_minutes` | INT | OUI | durée en minutes ouvrées (0 pour jalon) |
| `early_start` / `early_finish` | TIMESTAMPTZ | OUI | **dérivé moteur** (au plus tôt) |
| `late_start` / `late_finish` | TIMESTAMPTZ | OUI | **dérivé moteur** (au plus tard) |
| `total_slack_minutes` | INT | OUI | **dérivé moteur** — marge totale |
| `free_slack_minutes` | INT | OUI | **dérivé moteur** — marge libre |
| `is_critical` | BOOLEAN | OUI | **dérivé moteur** — chemin critique |
| `scheduling_mode` | ENUM(`AUTO`,`MANUAL`) | OUI | NULL ⇒ hérite du Projet ; `MANUAL` ⇒ dates figées + signalement d'écart |
| `calendar_id` | BIGINT | OUI | FK `pilotage.calendar(id)` ; NULL ⇒ calendrier projet |
| `recurrence_rule` | TEXT | OUI | règle de récurrence (norme iCalendar) — requis si `node_kind=RECURRING`, sinon NULL |
| `revision` | INT | NON | compteur monotone — verrou optimiste co-édition + ordre d'événements (EN22.2) |

**Invariant altitude (une seule ligne = deux vues, ADR-010 §1) :**

- `temporal_precision=DAY` ⇒ `start_date`/`finish_date` font foi ; `fuzzy_period_*` dérivables (dates arrondies).
- `temporal_precision ∈ {WEEK,MONTH,QUARTER,SEMESTER}` ⇒ `fuzzy_period_*` font foi ; `start_date`/`finish_date` NULL ou dérivées (ancrage début de période) et **non figées**.
- La roadmap projette `(fuzzy_period_start, fuzzy_period_end)` ; le Gantt projette `(start_date, finish_date)`. Descendre l'altitude (QUARTER→DAY) = préciser des dates ; monter = flouter. Dans les deux cas l'`id` reste stable — jamais de recréation, jamais de copie.

**Jalon partagé** : `node_kind=MILESTONE` + `shared_in_roadmap=true`, satisfaisant **simultanément** le filtre macro (`altitude=macro`) et le filtre détail (`start_date`/`finish_date` précises) → un seul enregistrement, deux rendus. Invariant testable de non-divergence (AC T1).

#### `pilotage.task_dependency`

| Champ | Type | Null | Notes |
|---|---|---|---|
| `predecessor_task_id` | BIGINT | NON | FK `pilotage.task(id)` |
| `successor_task_id` | BIGINT | NON | FK `pilotage.task(id)` |
| `link_type` | ENUM(`FS`,`SS`,`FF`,`SF`) | NON | finish-start / start-start / finish-finish / start-finish |
| `lag_minutes` | INT | NON | retard (>0) / avance (<0) en minutes ouvrées, défaut 0 |

Contraintes : UNIQUE (`predecessor_task_id`,`successor_task_id`,`link_type`) · CHECK `predecessor ≠ successor` · acyclicité validée par le moteur (rejet `SCHEDULE_CYCLE`).

#### `pilotage.task_constraint` (0..1 par tâche)

| Champ | Type | Null | Notes |
|---|---|---|---|
| `task_id` | BIGINT | NON | FK `pilotage.task(id)`, UNIQUE |
| `constraint_type` | ENUM(`ASAP`,`ALAP`,`MSO`,`MFO`,`SNET`,`SNLT`,`FNET`,`FNLT`) | NON | must-start/finish-on, start/finish no-earlier/later-than |
| `constraint_date` | TIMESTAMPTZ | OUI | requis si type ≠ ASAP/ALAP |
| `deadline` | TIMESTAMPTZ | OUI | échéance souple (ne contraint pas le calcul, alimente le signalement d'écart) |

#### `pilotage.calendar`

| Champ | Type | Null | Notes |
|---|---|---|---|
| `project_id` | BIGINT | OUI | NULL ⇒ calendrier tenant/base réutilisable |
| `scope` | ENUM(`PROJECT`,`TASK`,`RESOURCE`) | NON | |
| `name` | VARCHAR(255) | NON | |
| `working_days_mask` | SMALLINT | NON | bitmask lun..dim des jours ouvrés |
| `working_time` | JSONB | NON | plages horaires ouvrées par jour |

#### `pilotage.calendar_exception`

| Champ | Type | Null | Notes |
|---|---|---|---|
| `calendar_id` | BIGINT | NON | FK `pilotage.calendar(id)` |
| `exception_date` | DATE | NON | jour dérogatoire (férié / ouvré exceptionnel) |
| `is_working` | BOOLEAN | NON | true ⇒ ouvré, false ⇒ chômé |
| `working_time` | JSONB | OUI | plages spécifiques si `is_working` |

#### `pilotage.assignment`

| Champ | Type | Null | Notes |
|---|---|---|---|
| `task_id` | BIGINT | NON | FK `pilotage.task(id)` |
| `resource_ref` | VARCHAR(255) | NON | **référence logique** de ressource (pas de FK inter-modules ; identité résolue via bus PIVOT — ADR-006) |
| `units_percent` | NUMERIC(6,2) | NON | unités d'affectation (%), défaut 100 |
| `work_minutes` | INT | OUI | travail planifié |
| `actual_work_minutes` | INT | OUI | travail réel |
| `remaining_work_minutes` | INT | OUI | travail restant |
| `cost_amount` | NUMERIC(18,4) | OUI | coût planning **interne au Gantt** — valeur portée, pas l'agrégat budget E26 |
| `cost_currency` | CHAR(3) | OUI | ISO 4217 |
| `actual_cost_amount` | NUMERIC(18,4) | OUI | coût réel |

#### `pilotage.task_progress` (1:1 task)

| Champ | Type | Null | Notes |
|---|---|---|---|
| `task_id` | BIGINT | NON | FK `pilotage.task(id)`, UNIQUE |
| `percent_complete` | NUMERIC(5,2) | NON | % réalisé temporel, défaut 0 |
| `physical_percent_complete` | NUMERIC(5,2) | OUI | avancement physique distinct |
| `actual_start` / `actual_finish` | TIMESTAMPTZ | OUI | dates réelles |
| `status_date` | DATE | OUI | date d'état de cet avancement (fraîcheur) |

#### `pilotage.baseline` (0..10 par projet) + `pilotage.baseline_snapshot`

`baseline` :

| Champ | Type | Null | Notes |
|---|---|---|---|
| `project_id` | BIGINT | NON | FK `pilotage.project(id)` |
| `baseline_index` | SMALLINT | NON | 0..10 ; UNIQUE (`project_id`,`baseline_index`) ; CHECK 0..10 |
| `captured_at` | TIMESTAMPTZ | NON | |

`baseline_snapshot` (figé par tâche) :

| Champ | Type | Null | Notes |
|---|---|---|---|
| `baseline_id` | BIGINT | NON | FK `pilotage.baseline(id)` |
| `task_id` | BIGINT | NON | FK `pilotage.task(id)` |
| `bl_start` / `bl_finish` | TIMESTAMPTZ | OUI | dates figées |
| `bl_duration_minutes` | INT | OUI | durée figée |
| `bl_work_minutes` | INT | OUI | travail figé |
| `bl_cost_amount` | NUMERIC(18,4) | OUI | coût figé |
| `bl_temporal_precision` | ENUM(`SEMESTER`…`DAY`) | OUI | altitude figée (comparer une baseline roadmap floue à un réel Gantt précis) |

> **Champs dérivés** (`wbs_code`, `early_*`/`late_*`, marges, `is_critical`, agrégats récapitulatifs) : exposés en lecture, **écriture refusée** (422). L'agrégation des tâches `SUMMARY` (start=min, finish=max, work/cost=Σ, %=pondéré charge, `is_critical` si ≥1 feuille critique) est **calculée** par le moteur, jamais stockée en double.

### (b) API du moteur d'ordonnancement

Le moteur est une **fonction pure in-memory** sur un snapshot du graphe : aucune FK ni lecture inter-modules ; toute donnée externe (dispo ressources, calendriers tiers) entre en argument via agrégation bus PIVOT (ADR-006). Un appel = un projet, un tenant. L'altitude (EN18.10) n'entre **pas** dans le calcul — elle paramètre la projection de sortie.

```text
# Calcul complet (première ouverture, import, changement de calendrier global)
Schedule schedule(ScheduleInput input)
    → { tasks:{id→{ES,EF,LS,LF,freeFloat,totalFloat,isCritical}},
        summaryAgg:{id→…}, criticalPath[], warnings[], variances[],
        computedAt, scheduleVersion, inputHash }
    erreurs: SCHEDULE_CYCLE, TENANT_VIOLATION, UNKNOWN_CALENDAR

# Recalcul INCRÉMENTAL sur delta (co-édition, drag d'une barre, edit de lag)
SchedulePatch reSchedule(ScheduleState prev, ChangeSet delta)
    → { patch:[ {taskId, changed:{ES?,EF?,LS?,LF?,float?,isCritical?}} … ],
        affectedCount, newCriticalPath?, warnings[], removed[],
        baseVersion, scheduleVersion }   # scheduleVersion = baseVersion + 1
    erreurs: STALE_BASE_VERSION (delta sur version périmée → rebase),
             SCHEDULE_CYCLE (delta introduit un cycle → rejet du delta entier, patch vide)

# Projection de sortie selon altitude (EN18.10) — NE recalcule PAS
View project(Schedule s, Altitude a)   # a résolue en amont via resolveProfile(tenant)
    → filtrage jalons/phases + agrégation + unité d'affichage
```

`ScheduleInput` : `{ projectId, tenantId, dataDate, tasks[], dependencies[], calendars[], baselineRef? }`. Le réalisé avant `dataDate` est figé.

`ChangeSet` = liste d'opérations atomiques : `ADD_TASK | REMOVE_TASK | SET_DURATION | SET_MODE | SET_CONSTRAINT | SET_DEADLINE | ADD_DEP | REMOVE_DEP | SET_LAG | SET_PROGRESS | MOVE_WBS | SET_CALENDAR`, chacune portant l'`entityId` visé.

**Algorithme CPM** : passe avant (Early, topologique amont→aval, `ES(succ)=max` des dépendances entrantes projeté sur le calendrier, planchers SNET/MSO), passe arrière (Late, aval→amont depuis `max(EF)` ou plafonds ALAP/FNLT/MFO/deadline), marges `totalFloat=LS−ES`, `freeFloat=min(ES succ)−EF−lag` borné à 0, chemin critique `totalFloat ≤ ε` (ε=0 par défaut). Calcul en **minute ouvrée** (unité canonique indépendante de l'affichage).

**AUTO vs MANUAL** :

- `AUTO` : dates recalculées à chaque `schedule`/`reSchedule` (deps + contraintes + calendrier).
- `MANUAL` : dates figées ; le moteur ne les déplace pas mais calcule la date théorique AUTO et émet un écart `{taskId, plannedManual, wouldBeAuto, deltaDuration, cause}`.
- Le moteur ne casse **jamais** une dépendance dure : conflit de contrainte ⇒ dépendance honorée + `SchedulingWarning` typé (`CONSTRAINT_CONFLICT | DEADLINE_MISSED | NEGATIVE_FLOAT`). Garde-fou « Gantt qui ment » : chaque `Schedule` porte `computedAt` + `varianceVsBaseline` si `baselineRef`.

**Déterminisme & idempotence** (exigence dure EN22.2 / co-édition) :

- **D1** `schedule(input)` pure ⇒ même entrée = `Schedule` byte-identique (pas de `now()`, pas d'ordre d'insertion).
- **D2** tie-break stable par clé totale `(wbsPath, taskId)`.
- **D3** `reSchedule(schedule, ∅)` = patch vide ; `reSchedule(schedule(input), delta) == schedule(apply(input, delta))` (convergence incrémental ⇄ complet, oracle anti-drift).
- **Portée incrémentale** : `reSchedule` ne touche que la fermeture transitive aval des tâches modifiées + les récapitulatifs ancêtres ; coût O(sous-graphe impacté) ; patch = **diff** (pas snapshot) ; cible < 16 ms (budget frame 30 fps).
- **Co-édition** : versionnement optimiste (`scheduleVersion` monotone, `STALE_BASE_VERSION` → rebase) ; deltas disjoints commutatifs ; `ChangeSet` atomique (tout ou rien) et inversible (`inverse(delta)` pour undo/redo).

### (c) Dérivation des vues — roadmap macro ↔ Gantt détail

Deux vues = **deux projections d'une seule requête**, jamais deux schémas ni deux endpoints :

```text
GET /projects/{id}/plan?altitude={macro|detail}&grain={…}&layout={timeline|buckets|Gantt}
```

| Vue consommatrice | altitude | layout | grain | Nœuds retournés |
|---|---|---|---|---|
| Roadmap échelle floue (US22.3.2) | `macro` | `timeline` | `quarter`\|`semester` | initiatives + jalons, bornes **calculées** (pas re-stockées) |
| Now/Next/Later (US22.3.3) | `macro` | `buckets` | — (axe supprimé) | groupé par `horizon` |
| Jalons stratégiques (US22.3.4) | `macro` **et** `detail` | les deux | — | jalons (mêmes `id`) |
| Gantt WBS (US22.4.1a) | `detail` | `Gantt` | `day` | arbre complet + `wbs_code` |
| Gantt dépendances (US22.4.3) | `detail` | `Gantt` | `day` | tâches + arêtes `link_type`/`lag` |

L'`altitude` par défaut est fournie par `resolveProfile(tenant).altitude` (EN18.10) ; E40 se substitue sans changer la signature. L'altitude effective d'une requête peut surcharger le défaut **sans muter le graphe** (réglage de vue, pas donnée projet). La roadmap lit `fuzzy_period_*` + `horizon`, le Gantt lit `start_date`/`finish_date` ; le **jalon partagé** (`id` stable) est le seul nœud rendu à l'identique dans les deux — invariant de non-divergence.

Pour le bucket Now/Next/Later, le nœud macro porte un attribut nullable `horizon ENUM(now,next,later)` (`pilotage.task`, ajouté si `node_kind` haut-niveau / initiative), sans axe temporel ni table dédiée.

### (d) Contrat d'événements — bus PIVOT (ADR-006)

Topic `pilotage.plan.v1`. Événements de domaine, **projection minimale** (jamais le schéma interne), **idempotents**, **ordonnés par `revision`**. Enveloppe commune :

```json
{
  "event": "<type>", "version": 1,
  "tenant_id": "…", "project_ref": "…",
  "revision": 42,
  "occurred_at": "…", "emitted_by": "pilotage"
}
```

| Événement | Émis quand | Payload additionnel | Consommateurs |
|---|---|---|---|
| `PlanRecalculated` | fin de recalcul incrémental | `changed_node_ids[]`, `critical_path_changed:bool` | EN22.2, E23, E21 |
| `MilestoneMoved` | date d'un jalon change | `milestone_id`, `old_date`, `new_date`, `altitude:["macro","detail"]` | US22.3.4, E23, E24 |
| `NodeScheduleChanged` | dates/durée d'un nœud (feuille ou récap agrégé) changent | `node_id`, `agg:bool`, `new_start`, `new_end` | EN22.2, US22.4.1c, E26 |
| `DependencyChanged` | lien créé/supprimé/typé | `edge_id`, `type`, `lag`, `cycle_rejected:bool` | US22.4.3, EN22.2 |
| `HorizonChanged` | initiative change de bucket | `node_id`, `old_horizon`, `new_horizon` | US22.3.3, E23 |
| `WbsRestructured` | hiérarchie recalculée serveur | `affected_node_ids[]` | US22.4.1a/b, EN22.2 |

Règles ADR-006 : aucune FK vers un autre module (corrélation par `project_ref`/`node_id` logiques) ; consommateur inconnu / module non activé ⇒ événement ignoré silencieusement (dégradation propre) ; payload = projection minimale (libellé, date, type, id, deep-link) ; idempotence : rejouer une `revision ≤ dernière vue` = no-op.

### (e) Matrice de couverture consommateur → élément de contrat

| Consommateur | Champ / modèle | API projection | Événement |
|---|---|---|---|
| **US22.3.2** échelle floue | `temporal_precision`, `fuzzy_period_*` (bornes dérivées), `altitude=macro` | `?altitude=macro&layout=timeline&grain=quarter\|semester` | — (réglage de vue) |
| **US22.3.3** Now/Next/Later | `horizon` (nullable) | `?altitude=macro&layout=buckets` | `HorizonChanged` |
| **US22.3.4** jalons stratégiques | jalon `MILESTONE`, `altitude=macro`+dates, `id` unique | `?altitude=macro` **et** `?altitude=detail`, même `id` | `MilestoneMoved` (propagation bidirectionnelle) |
| **US22.4.1a** WBS modèle | `wbs_code` dérivé serveur, `revision` | `?altitude=detail&layout=Gantt` | `WbsRestructured` |
| **US22.4.1c** agrégation récap | agrégats dérivés, 422 si édition | plan detail | `NodeScheduleChanged(agg:true)` |
| **US22.4.3** dépendances typées | `task_dependency.link_type`+`lag_minutes`, détection cycle serveur | arêtes dans plan detail | `DependencyChanged(cycle_rejected)` |
| **US22.4.7** chemin critique | `is_critical`, `free_slack_minutes`, `total_slack_minutes` dérivés | flag critique dans plan | `PlanRecalculated(critical_path_changed)` |
| **EN22.2** perf/co-édition | `revision` (verrou optimiste), `changed_node_ids` | — | **tous** (déclencheurs du rendu incrémental) |
| **E21** risques (overlay) | `project_ref`, `node_id` | plan (lecture) | `PlanRecalculated`, `MilestoneMoved` |
| **E23** portefeuille consolidé | jalons/dates/avancement agrégés | plan macro multi-projets | `PlanRecalculated`, `MilestoneMoved`, `HorizonChanged` |

## Critères d'acceptation (Given/When/Then)

**Non-divergence & jalon partagé**

- [ ] Given un projet avec un jalon `node_kind=MILESTONE`, `shared_in_roadmap=true` et des dates précises, when j'interroge `GET /plan?altitude=macro` puis `GET /plan?altitude=detail`, then le jalon apparaît dans les deux projections avec **le même `id`** et la même date.
- [ ] Given ce jalon, when je déplace sa date via la vue détail (Gantt), then un seul événement `MilestoneMoved(altitude:["macro","detail"])` est émis et la requête macro reflète la nouvelle date **sans écriture parallèle** (aucune ligne dupliquée).
- [ ] Given une tâche à `temporal_precision=QUARTER`, when je descends son altitude à `DAY` en précisant des dates, then l'`id` du nœud est inchangé (pas de recréation) et `fuzzy_period_*` restent cohérentes avec `start_date`/`finish_date`.

**Moteur d'ordonnancement**

- [ ] Given un graphe acyclique avec dépendances FS/SS/FF/SF + lag et calendriers, when j'appelle `schedule(input)`, then chaque tâche reçoit `{ES,EF,LS,LF,freeFloat,totalFloat,isCritical}` et le chemin critique est l'ensemble des tâches `totalFloat ≤ ε`.
- [ ] Given le même `ScheduleInput` (mêmes ids, `dataDate`, calendriers), when j'appelle `schedule` deux fois, then les deux `Schedule` sont **byte-identiques** (déterminisme D1, tie-break `(wbsPath, taskId)`).
- [ ] Given un `Schedule` calculé, when j'applique un `delta` puis compare `reSchedule(schedule(input), delta)` à `schedule(apply(input, delta))`, then les deux résultats **convergent** (oracle anti-drift D3).
- [ ] Given l'édition d'une feuille, when `reSchedule` s'exécute, then `PlanRecalculated.changed_node_ids` ⊂ fermeture transitive aval + récapitulatifs ancêtres (pas tout le plan) et le patch est un **diff**, pas un snapshot.
- [ ] Given une tâche `MANUAL` dont les dates divergent du calcul AUTO, when le moteur tourne, then les dates figées ne bougent pas et un écart `{plannedManual, wouldBeAuto, deltaDuration}` est émis.
- [ ] Given une tâche récapitulative `SUMMARY`, when le moteur agrège, then `start=min`, `finish=max`, `work/cost=Σ`, `is_critical` vrai si ≥1 feuille critique — jamais stocké en double sur la ligne `SUMMARY`.

**Cas d'erreur**

- [ ] Error case: given un `ChangeSet` (ou un `ScheduleInput`) introduisant un cycle de dépendances, system rejette le delta entier (`SCHEDULE_CYCLE`), patch vide, warning `REJECTED`, aucune op appliquée (atomicité).
- [ ] Error case: given un `delta` dont `baseVersion` ≠ `prev.scheduleVersion`, system retourne `STALE_BASE_VERSION` et l'appelant doit rejouer son delta sur l'état courant (rebase — pas d'application silencieuse).
- [ ] Error case: given une écriture PATCH sur un champ dérivé (`wbs_code`, `is_critical`, marges, agrégat récap), system retourne **422** (champ en lecture seule).
- [ ] Error case: given un `calendar_id` inconnu dans `ScheduleInput`, system retourne `UNKNOWN_CALENDAR`.
- [ ] Error case: given un consommateur d'un module non activé recevant un événement `pilotage.plan.v1`, system l'ignore silencieusement (dégradation propre, pas d'erreur remontée).

**Sécurité — isolation multi-tenant**

- [ ] Security: given une requête `GET /projects/{id}/plan` sur un projet appartenant à un autre `tenant_id`, system retourne **404** (non-divulgation d'existence, jamais 403 exposant la ressource).
- [ ] Security: given un utilisateur authentifié sans droit sur le projet de son propre tenant, system retourne **403**.
- [ ] Security: given un `ScheduleInput` ou une dépendance mélangeant deux `tenant_id`, system rejette avec `TENANT_VIOLATION` — le moteur ne calcule jamais un graphe multi-tenant.
- [ ] Security: given un événement bus, then son payload ne contient que la projection minimale (id/date/type/deep-link) et **jamais** le schéma interne `pilotage` ni une FK inter-modules.
- [ ] Security: chaque table `pilotage` porte `tenant_id BIGINT NOT NULL` indexé (FK `public.tenants`) et tout accès est filtré par tenant.

## Recommandation de découpage

EN22.1 reste **XL** après ce freeze : il couvre un schéma de 11 tables, un moteur CPM déterministe avec API de recalcul incrémental, la dérivation de vues et un contrat d'événements. Une fois le contrat gelé (fait ici — condition préalable), la scission recommandée, **à exécuter dans un second temps** (ne pas exécuter maintenant) :

- **EN22.1a — Schéma temporel `pilotage`** : les 11 tables (§a), l'invariant d'altitude effective, `tenant_id`, champs dérivés + refus 422. Livrable indépendant testable (migrations + contraintes).
- **EN22.1b — Moteur CPM & API** : `schedule` complet + `reSchedule` incrémental (§b), déterminisme, AUTO/MANUAL, borne O(sous-graphe), co-édition optimiste. Consomme le snapshot de 22.1a.
- **EN22.1c — Jalon partagé, agrégation & dérivation de vues + événements** : projection roadmap↔Gantt (§c), rollup récapitulatif, contrat d'événements `pilotage.plan.v1` (§d), matrice de couverture (§e). Dépend de 22.1a + 22.1b.

Le freeze du contrat vaut pour les trois sous-enablers : la scission ne rouvre aucune décision figée ci-dessus, elle ne fait que répartir la charge d'implémentation.

---
Item Type: Enabler · Parent: E22 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Critical
Stage: ⬜
Profils: Tous
Justification: Fondation « roadmap & Gantt = deux vues d'un modèle temporel unique » (ADR-010)
Dépendances: EN18.1 (schéma pilotage) · EN18.9 (Application→Projet)
