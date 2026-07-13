# US22.4.8 — Suivi d'avancement (% réalisé, réel/restant)

## Contexte

- **US** : `docs/backlog/EPIC-roadmap/FEATURES/gantt-detaille/us-suivi-avancement.md`
  (F22.4 — Gantt détaillé, EPIC-roadmap), Sprint 17
- **PR** : `pivot-pilotage-core`
  [#59](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/59)
  (`feat/us22-4-8-suivi-avancement`) — backend uniquement, `pivot-pilotage-ui` restant (non créé
  à ce stade, comme US22.4.4/US22.4.6)
- **Dernier commit au moment du figeage** : `pivot-pilotage-core` `23f2ab9` — `test: cover task
  progress tracking and progress line (US22.4.8)`
- **Commit de merge** : `3098971` (squash)
- **Gate 4 MERGE_CONFIDENCE** : `pivot-pilotage-core` 100/100 — MERGE_AUTONOMOUS
- **Dépend de** : EN22.1a (modèle temporel unique — `pilotage.task_progress`,
  `pilotage.assignment.actual_work_minutes`/`remaining_work_minutes`, déjà mergées), EN22.1c
  (rollup pondéré du % récapitulatif, déjà mergé et réutilisé tel quel — voir § Écarts)

---

## Spec fonctionnelle

### Saisie de l'avancement (`PATCH /tenants/{tenantId}/teams/{teamId}/projects/{projectId}/gantt/tasks/{taskId}/progress`)

Enregistre le % réalisé (temporel) d'une tâche, et optionnellement son % physique, ses dates
réelles début/fin et la date de fraîcheur de cette saisie :

- **200** avec l'état d'avancement rafraîchi : `percentComplete`, `progressLabel` (texte, ex.
  `"45%"`), `physicalPercentComplete`, `actualWorkMinutes`/`remainingWorkMinutes`/
  `totalWorkMinutes` (Σ sur les affectations de la tâche), `actualStart`/`actualFinish`,
  `statusDate`, `revision`.
- **403** si l'appelant n'a pas de rôle d'édition (`WbsEditPolicy`, deny-all aujourd'hui —
  gap `pivot-core-starter`).
- **404** si le projet/la tâche n'est pas visible pour le tenant/team porteur (non-disclosure —
  cross-tenant et cross-team collapsent sur le même 404).
- **422** si `percentComplete` (ou `physicalPercentComplete`) est hors `[0, 100]`, si
  `actualFinish` précède `actualStart`, si la tâche est un récapitulatif (`SUMMARY` — son % est
  agrégé, en lecture seule, même posture que US22.4.1c), ou si le corps porte un champ dérivé
  (`actualWorkMinutes`/`remainingWorkMinutes`).

Le travail réel/restant de chaque affectation de la tâche est re-dérivé du nouveau % réalisé
(parité MS Project) :

```text
actual   = round(percentComplete% × work)
remaining = max(work − actual, 0)
```

Chaque saisie ajoute une entrée immuable dans `pilotage.task_progress_history` (auteur, date,
valeurs saisies) — l'audit trail (Security AC) est distinct de la ligne courante
`pilotage.task_progress` (1:1 par tâche, `UNIQUE task_id`).

### Ligne de progression (`GET .../gantt/tree`)

Chaque nœud du `GET .../gantt/tree` porte désormais, en plus des champs existants
(`percentComplete`/`progressLabel`) :

- `expectedPercentComplete` — où le % réalisé **devrait** être à la date d'état du projet
  (`pilotage.project.status_date`), par interpolation linéaire sur `[startDate, finishDate]` du
  nœud (rollup min/max pour un récapitulatif). `null` avant le début, `100` après la fin.
- `late` — `true` si `percentComplete` est strictement inférieur à `expectedPercentComplete`.
- `progressVarianceLabel` — texte A11y : `"on track"` si non en retard, `"{N}d late"` sinon
  (`N` ≥ 1, jamais `"0d late"`).

Ces trois champs sont `null`/`false` quand le nœud n'a pas de dates ou que le projet n'a pas
(encore) de date d'état — la ligne de progression ne s'applique pas.

### Agrégation du % d'un récapitulatif (déjà livré, non réimplémenté)

« Given un récapitulatif, when ses sous-tâches avancent, then son % réalisé s'agrège » était
déjà couvert par EN22.1c (`PlanProjectionService.rollupOf`, pondération par le travail des
sous-tâches, poids par défaut 1 en l'absence d'affectation) et exposé par
`WbsTaskService.tree`. Cette US n'y touche pas — vérifié avant implémentation (Étape 0), la
pondération correspond à la note d'implémentation du backlog (« pondérée par la durée (ou le
travail) des sous-tâches »).

---

## Contrat technique

### Fichiers introduits / modifiés — `pivot-pilotage-core` (PR #59)

| Fichier | Rôle |
|---------|------|
| `V1__schema_init.sql` (modifié) | Table `pilotage.task_progress_history` (audit trail append-only) — schéma pré-BETA, plié dans le fichier V1 unique |
| `TaskProgressHistory.java`, `TaskProgressHistoryRepository.java` (nouveaux) | Entité/repository de l'audit trail |
| `UpdateTaskProgressRequest.java`, `TaskProgressResponse.java` (nouveaux) | DTOs requête/réponse de l'endpoint progress |
| `InvalidTaskProgressException.java` (nouveau) | % hors `[0,100]` / `actualFinish < actualStart` → 422 |
| `TaskProgressService.java` (nouveau) | Logique métier : upsert `task_progress`, ajout `task_progress_history`, recalcul actual/remaining work |
| `WbsTaskController.java` (modifié) | `PATCH .../tasks/{taskId}/progress` (gated) |
| `WbsExceptionHandler.java` (modifié) | Mapping `InvalidTaskProgressException` → 422 ; `actualWorkMinutes`/`remainingWorkMinutes` ajoutés à l'ensemble des champs dérivés |
| `WbsTaskResponse.java` (modifié) | Ajout `expectedPercentComplete`/`late`/`progressVarianceLabel` (ligne de progression) |
| `WbsTaskService.java` (modifié) | Calcul de la ligne de progression dans `toResponse`, lecture de `project.getStatusDate()` |
| `TaskProgressServiceIT.java` (nouveau, 10 TI Testcontainers), `WbsTaskControllerIT.java`/`WbsTaskServiceIT.java` (modifiés), `SchedulePojoTest.java` (modifié) | Voir § Tests |

### Endpoints

| Endpoint | Codes retour |
|----------|--------------|
| `PATCH .../gantt/tasks/{taskId}/progress` | `200` (état rafraîchi) · `403` (non autorisé) · `404` (non visible) · `422` (`INVALID_TASK_PROGRESS`, `DERIVED_FIELD_NOT_EDITABLE`) |
| `GET .../gantt/tree` (existant, US22.4.1a) | Réponse étendue : `expectedPercentComplete`/`late`/`progressVarianceLabel` par nœud |

Aucun changement de contrat `PivotModule`/`pivot-core-starter`.

### Gap-era — `actorRef`

`actorRef` (référence logique de l'appelant, gap-era ADR-006 — même esprit que
`Assignment.resourceRef`) stampe la colonne « auteur » de l'audit trail. Il n'est **jamais**
utilisé pour l'autorisation (seul `WbsEditPolicy` gate l'écriture) — remplacé par le principal
authentifié une fois `pivot-core-starter`/`TenantContext` consommable, sans changement de forme
attendu côté contrat.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| EN22.1a (modèle temporel unique) | Dépendance de base — `pilotage.task_progress`/`pilotage.assignment` déjà mergées, réutilisées telles quelles |
| EN22.1c (agrégation SUMMARY) | Dépendance — le rollup pondéré du % récapitulatif (AC3 de cette US) est entièrement porté par `PlanProjectionService`, non réimplémenté |
| US22.4.1c (agrégation tâches récapitulatives) | Pattern de refus réutilisé : édition directe d'un champ dérivé de `SUMMARY` → `DerivedFieldNotEditableException` (422) |
| US22.4.9 (baselines multiples & écarts) | Hors périmètre explicite de cette US (voir backlog « Hors périmètre ») — comparaison à une baseline figée |
| US22.5.4 (agrégation coûts réels) | Hors périmètre explicite — agrégation des coûts réels associés à l'avancement |

---

## Écarts vs AC initiaux

Aucun écart de fond — les 7 AC du backlog (3 fonctionnels + error + 2 security + A11y) sont
couverts, à deux nuances gap-era documentées près :

### Security AC « rôle d'édition sur le projet (ou affecté à la tâche) » — non distingué

Seul le gate booléen `WbsEditPolicy` (deny-all aujourd'hui) protège l'écriture, comme tous les
autres endpoints d'écriture du package `gantt`. La nuance « ou affecté à la tâche » nécessite de
résoudre l'identité de l'appelant contre `Assignment.resourceRef`, indisponible avant que
`pivot-core-starter` publie l'identité authentifiée. Non-régression : posture strictement
identique aux endpoints `duration`/`effort`/`scheduling-mode` (US22.4.2), `constraint`
(US22.4.4) et `recurring` (US22.4.6) déjà mergés.

### `actorRef` fourni par le client (pas encore l'identité authentifiée)

Voir § Contrat technique — gap-era documenté, jamais utilisé pour l'autorisation.

---

## Tests

### `pivot-pilotage-core`

| Test | Comportement vérifié |
|---|---|
| `TaskProgressServiceIT` (10 TI, Testcontainers PostgreSQL 18) | Rafraîchissement barre/travail restant, relation MS-Project `remaining = work − actual` (y compris 100% → `remaining = 0`), tâche sans affectation → totaux `null`, audit trail (2 saisies, ordre `recordedAt` desc, ligne courante = dernière valeur), erreurs `[0,100]`/`actualFinish < actualStart`, refus tâche récapitulative, cross-tenant/cross-team 404 |
| `WbsTaskControllerIT` (+7 tests US22.4.8, 46 au total après fusion avec US22.4.4/US22.4.6) | Contrat HTTP complet : 403 gate, 422 (percent/dates/summary/champ dérivé), 404, 200 avec bar+remaining work |
| `WbsTaskServiceIT` (+3 tests) | Ligne de progression : tâche en retard marquée (`late=true`, `expectedPercentComplete`, `"{N}d late"`), tâche en avance non marquée (`"on track"`), non applicable sans date d'état projet |
| `SchedulePojoTest` (+1 test) | `TaskProgressHistory` : constructeur, accesseurs, `@PrePersist` idempotent (jamais mis à jour après insertion) |

`mvn verify -Pcoverage` local : couverture lignes bundle ≈ 95 % (seuil pom.xml 80 %, cible
CLAUDE.md 85 %). `mvn compile checkstyle:check spotbugs:check` : 0 erreur/warning. CI réelle
(commit `23f2ab9`) : 15/15 checks verts (`SonarCloud Analysis`, `CodeQL` ×2, `Semgrep` ×2,
`Trivy`, `Gitleaks - Secret Scan`, `Plumber` ×2, `Mutation Testing (PITest)`, `SCA - Dependency
Audit`, `Code Quality - Java`, `Docker preview image (PR)`, `Maven deploy preview (PR)`, `Tests
Backend (TU + TI)`).

### `pivot-pilotage-ui`

Non créé à ce stade — E2E et rendu de la ligne de progression délégués au repo frontend, comme
US22.4.4/US22.4.6.

---

## Hors périmètre (explicitement exclu)

- Comparaison de l'avancement avec une baseline figée (écarts planifié vs réel) — US22.4.9.
- Calcul automatique de l'avancement à partir d'un pointage de temps externe — saisie manuelle
  uniquement dans cette US.
- Agrégation des coûts réels associés à l'avancement — US22.5.4.
- Distinction fine « éditeur du projet » vs « affecté à la tâche » dans l'autorisation d'écriture
  — gap `pivot-core-starter`, voir § Écarts.
- Rendu visuel de la ligne de progression (widget Gantt, tracé SVG) — délégué à
  `pivot-pilotage-ui` ; cette US ne livre que les données (`expectedPercentComplete`/`late`/
  `progressVarianceLabel`).
