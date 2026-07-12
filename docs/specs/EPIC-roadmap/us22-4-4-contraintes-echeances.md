# US22.4.4 — Contraintes de date & échéances

## Contexte

- **US** : [`us-contraintes-echeances.md`](pathname:///pivot-docs/backlog/EPIC-roadmap/FEATURES/gantt-detaille/us-contraintes-echeances) · Parent `F22.4` · Module `pilotage` · Phase `phase-3` · Sprint 10
- **PR** : `pivot-pilotage-core` [#54](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/54)
- **Commit figé** : `4748198` (squash-merge, `feat(gantt): US22.4.4 — contraintes de date & échéances`)
- **Gate 4 au figeage** : 100/100 — MERGE_AUTONOMOUS (détail complet dans le commentaire de review de la PR)
- **Périmètre** : backend uniquement (`pivot-pilotage-core`). Le rendu Angular de l'indicateur
  (icône + texte, `aria-live`) est délégué à `pivot-pilotage-ui`, non encore implémenté.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Un utilisateur avec un rôle d'édition sur le projet peut poser, sur une tâche du Gantt détaillé,
une contrainte de date reprenant le référentiel MS Project (`ASAP`, `ALAP`, `MSO`, `MFO`, `SNET`,
`SNLT`, `FNET`, `FNLT`, EN22.1a) et/ou une échéance (deadline) indépendante. Une tâche porte au
plus une ligne `task_constraint` — poser une nouvelle contrainte remplace la précédente (upsert).

- Les types `ASAP`/`ALAP` ne portent jamais de date ; tout autre type exige `constraintDate`.
- La `deadline` est un indicateur mou : elle alimente un warning quand la date de fin calculée la
  dépasse, mais ne contraint jamais le calcul CPM (contrairement aux contraintes `Doit`).
- Un conflit entre une contrainte et une dépendance dure ne casse jamais la dépendance : la
  dépendance est honorée, la contrainte est silencieusement écartée pour le calcul, mais le
  conflit est explicité par un `SchedulingWarning` typé `CONSTRAINT_CONFLICT`.

### Correctif requis sur le moteur (EN22.1b)

En implémentant cette US, une régression a été identifiée dans `ScheduleEngine` (déjà mergé,
EN22.1b, marqué « frozen contract §b ») : la détection `CONSTRAINT_CONFLICT` du forward-pass
comparait la valeur **après fusion** (`laterOf(depFloor, cible)`) à `depFloor` — or
`max(a, b) ≥ a` par construction, donc cette comparaison ne pouvait **jamais** être vraie, pour
aucun type de contrainte. Une contrainte « doit » (ex. `MSO`) dont la cible précédait une
dépendance dure était donc silencieusement écrasée, sans aucun warning — contredisant à la fois
le JavaDoc de la classe et l'AC erreur de cette US.

**Correctif** : la cible brute de la contrainte (avant fusion avec `depFloor`) est désormais
comparée séparément. Les dates de sortie du moteur sont **strictement identiques** à avant (les
43 tests `schedule.engine` pré-existants passent sans modification) — seul le warning
précédemment manquant est maintenant émis.

## Contrat technique final

### Lecture — non gatée (visible à tout rôle)

`GET /tenants/{tenantId}/teams/{teamId}/projects/{projectId}/gantt/tasks/{taskId}/constraint`

Non soumis à `WbsEditPolicy` — seulement à l'isolation tenant/team/project/task — afin qu'un
conflit levé par un éditeur reste visible en lecture seule aux autres rôles (AC sécurité), sans
nécessiter une nouvelle écriture (le calcul CPM est recalculé en mémoire à chaque lecture via
`SchedulingService.previewSchedule()`, jamais persisté par un `GET`).

**Réponse `200 OK`** (défaut `ASAP`/pas de date/pas de deadline/pas de warning si aucune ligne
`task_constraint` n'a jamais été persistée) :

```json
{
  "taskId": 42,
  "constraintType": "MFO",
  "constraintDate": "2026-08-14T17:00:00Z",
  "deadline": null,
  "warnings": [
    { "type": "CONSTRAINT_CONFLICT", "detail": "constraint MFO target ... precedes hard dependency floor ...; dependency honoured" }
  ]
}
```

**Erreurs :** `404` (bodyless) — tenant/team/project/task inconnu ou cross-tenant (non-divulgation).

### Écriture — gatée (rôle d'édition requis)

`PUT /tenants/{tenantId}/teams/{teamId}/projects/{projectId}/gantt/tasks/{taskId}/constraint`

**Corps de la requête :**

```json
{
  "constraintType": "MSO",
  "constraintDate": "2026-08-01T09:00:00Z",
  "deadline": "2026-08-20T17:00:00Z"
}
```

`constraintType` obligatoire. `constraintDate` obligatoire sauf pour `ASAP`/`ALAP` (une date
fournie pour ces deux types est silencieusement effacée côté serveur, jamais rejetée).
`deadline` optionnelle, indépendante du type de contrainte ; `null` l'efface.

**Réponse `200 OK`** — même forme que le `GET`, recalculée après persistance (le CPM est
re-exécuté et persisté via `SchedulingService.scheduleProject()`).

**Erreurs :**

| Cas | Code |
|-----|------|
| `constraintType` absent | 400 (validation `@NotNull`) |
| Type ≠ `ASAP`/`ALAP` sans `constraintDate` | 422 `INVALID_TASK_CONSTRAINT` |
| Appelant sans rôle d'édition | 403 (bodyless) |
| `tenantId`/`teamId`/`projectId`/`taskId` inconnu ou cross-tenant | 404 (bodyless, non-divulgation) |

### Schéma BDD (`pilotage.task_constraint`, déjà en place depuis EN22.1a — aucune migration
### nouvelle apportée par cette US)

```sql
CREATE TABLE IF NOT EXISTS pilotage.task_constraint (
    id              BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id       BIGINT      NOT NULL REFERENCES public.tenants(id),
    team_id         BIGINT      NOT NULL REFERENCES public.teams(id),
    task_id         BIGINT      NOT NULL REFERENCES pilotage.task(id) ON DELETE CASCADE,
    constraint_type VARCHAR(8)  NOT NULL,
    constraint_date TIMESTAMPTZ,
    deadline        TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_task_constraint_type
        CHECK (constraint_type IN ('ASAP', 'ALAP', 'MSO', 'MFO', 'SNET', 'SNLT', 'FNET', 'FNLT')),
    CONSTRAINT uq_task_constraint_task UNIQUE (task_id)
);
```

### Classes Java concernées

| Classe | Rôle |
|--------|------|
| `TaskConstraint` / `TaskConstraintRepository` / `ConstraintType` | Entité, repository, enum (EN22.1a, déjà mergés) |
| `ScheduleEngine` (`forwardConstraintFloor`, ex-`applyForwardConstraint`) | Moteur CPM pur — **corrigé** par cette US (détection `CONSTRAINT_CONFLICT`) |
| `SchedulingService.previewSchedule(projectId, tenantId)` | Nouveau : recalcul CPM en mémoire, sans persistance (US22.4.4) |
| `TaskConstraintService` | `get()` (lecture pure) / `upsert()` (persistance + recalcul) |
| `UpsertTaskConstraintRequest` / `TaskConstraintResponse` / `ConstraintWarningResponse` | DTOs — n'exposent jamais l'entité JPA |
| `InvalidTaskConstraintException` | 422 — type ≠ ASAP/ALAP sans date |
| `WbsTaskController` (`getConstraint`/`setConstraint`) | Endpoints REST (GET non gaté, PUT gaté) |
| `WbsExceptionHandler` | Mapping `InvalidTaskConstraintException` → 422 |

## Cohérence avec les US suivantes

| US | Dépendance |
|----|------------|
| US22.4.7 (chemin critique, marges) | Le champ `warnings` (`NEGATIVE_FLOAT`) existe déjà côté moteur ; cette US n'en calcule pas l'exposition dédiée |
| US22.4.5 (calendriers ouvrés) | Les dates de contrainte sont projetées sur le calendrier effectif de la tâche, déjà en place |
| `pivot-pilotage-ui` (à créer) | Rendu de l'indicateur (icône + texte, jamais couleur seule) et annonce `aria-live`, à partir du couple `type`/`detail` exposé ici |

## Hors périmètre

- Résolution automatique des conflits (proposition de replanification) — hors périmètre US, détection uniquement
- Calcul du chemin critique impacté par les contraintes — US22.4.7
- Frontend Angular (indicateur visuel, `aria-live`) — `pivot-pilotage-ui`, non implémenté à ce stade

---

Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Sprint 10
Stage: Review
