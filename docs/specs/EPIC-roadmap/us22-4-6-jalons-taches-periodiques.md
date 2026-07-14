# US22.4.6 — Jalons & tâches périodiques

## Contexte

- **US** : [`us-jalons-taches-periodiques.md`](pathname:///pivot-docs/backlog/EPIC-roadmap/FEATURES/gantt-detaille/us-jalons-taches-periodiques) · Parent `F22.4` · Module `pilotage` · Phase `phase-3` · Sprint 17
- **PR** : `pivot-pilotage-core` [#55](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/55)
- **Commit figé** : `817adaa` (squash-merge, `feat(gantt): US22.4.6 — jalons & tâches périodiques`)
- **Gate 4 au figeage** : 100/100 — MERGE_AUTONOMOUS (détail complet dans le commentaire de review de la PR)
- **Périmètre** : backend uniquement (`pivot-pilotage-core`). Le rendu Angular (symbole losange du
  jalon, libellé des occurrences, `aria-label`) est délégué à `pivot-pilotage-ui`, non encore
  implémenté.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

**Jalon (AC1).** Une tâche créée via `POST .../gantt/tasks` avec `durationMinutes=0` est
automatiquement classée `node_kind=MILESTONE` au lieu de `LEAF` — aucun champ dédié à fournir, la
classification est dérivée server-side de la durée. Un jalon reste une ligne du graphe temporel
partagé (`pilotage.task`), jamais une entité séparée — cohérent avec le jalon stratégique de la
roadmap rapide (US22.3.4, même `node_kind`).

**Tâche périodique (AC2).** Un nouvel appel `POST .../gantt/tasks/recurring` crée en une seule
transaction :
1. une tâche « série » (`node_kind=RECURRING`) portant la règle de récurrence persistée
   (`recurrence_rule`, colonne `TEXT` déjà présente depuis EN22.1a — aucune migration nouvelle) ;
2. ses occurrences, matérialisées comme tâches enfants ordinaires (`parent_task_id` = la série) —
   `LEAF` si une durée positive est fournie, sinon `MILESTONE` (même règle que l'AC1, réutilisée
   telle quelle).

La date de chaque occurrence est dérivée de la fréquence (`DAILY`/`WEEKLY`/`MONTHLY`) et de
l'intervalle depuis `firstOccurrenceDate`, puis **décalée sur le calendrier ouvré du projet**
(US22.4.5) exactement comme n'importe quelle autre tâche : une occurrence tombant un jour non
travaillé glisse au prochain instant ouvré (`WorkingCalendar.snapForward`). Chaque occurrence est
épinglée en mode `MANUAL` pour que le recalcul CPM qui suit la création n'écrase pas les dates
calculées.

**Erreur (AC erreur).** `frequency` et `occurrenceCount` sont les deux champs couverts par l'AC —
absents ou `occurrenceCount ≤ 0` ⇒ `422 INVALID_RECURRENCE` avec un message explicite (validation
service, volontairement pas de bean-validation, pour porter un message dans le corps de réponse —
même pattern que `CreateMilestoneRequest.date`, US22.3.4). `occurrenceCount` est en outre plafonné
à 500 par appel (`RecurringTaskService.MAX_OCCURRENCES`) pour borner la croissance du graphe WBS
(note de perf du backlog, EN22.2).

**Sécurité.** L'écriture (création de jalon ou de série) reste gouvernée par le `WbsEditPolicy`
déjà en place (403 fail-closed tant que `pivot-core-starter` n'est pas publié). La génération de
*N* occurrences est tracée en **une seule** ligne de log structuré
(`event=recurring_task_created ... generatedOccurrences=N`), jamais une par occurrence.
L'isolation tenant/team/projet réutilise les 404 non-disclosure déjà en place sur le contrôleur.

**A11y.** `WbsTaskResponse` expose un nouveau champ `nodeKindLabel` (dérivé de `node_kind` par
`WbsTaskResponse.labelFor`), un libellé texte stable (`"Milestone"`, `"Recurring task series"`,
…) porté par **chaque** nœud de l'arbre WBS (créé via `POST .../gantt/tasks`, via
`POST .../gantt/tasks/recurring`, ou simplement lu via `GET .../gantt/tree`) — le losange et les
occurrences restent identifiables sans dépendre de la forme/couleur seule. Le nom de chaque
occurrence porte en outre un suffixe `"— occurrence i/N"` pour les distinguer entre elles à
l'affichage.

## Contrat technique final

### Jalon — delta sur un endpoint existant (US22.4.1a)

`POST /tenants/{tenantId}/teams/{teamId}/projects/{projectId}/gantt/tasks`

Aucun changement de signature. Delta comportemental uniquement : `durationMinutes=0` ⇒ la tâche
créée porte `nodeKind=MILESTONE` au lieu de `LEAF` dans la réponse `WbsTaskResponse`.

### Tâche périodique — nouvel endpoint

`POST /tenants/{tenantId}/teams/{teamId}/projects/{projectId}/gantt/tasks/recurring`

**Corps de la requête** (`CreateRecurringTaskRequest`) :

```json
{
  "name": "Comité hebdo",
  "parentTaskId": null,
  "firstOccurrenceDate": "2026-08-01",
  "frequency": "WEEKLY",
  "intervalCount": 1,
  "occurrenceCount": 10,
  "durationMinutes": null
}
```

| Champ | Requis | Détail |
|-------|--------|--------|
| `name` | oui | nom de la série, préfixe du nom de chaque occurrence |
| `parentTaskId` | non | rattachement WBS ; promeut le parent en `SUMMARY` (US22.4.1a) |
| `firstOccurrenceDate` | oui | date d'ancrage de la 1ʳᵉ occurrence, avant décalage calendrier |
| `frequency` | oui (voir AC erreur) | `DAILY` \| `WEEKLY` \| `MONTHLY` |
| `intervalCount` | non | multiplicateur de cadence ("tous les N …"), défaut `1` |
| `occurrenceCount` | oui (voir AC erreur) | nombre d'occurrences à générer, `> 0`, plafond 500 |
| `durationMinutes` | non | `0`/absent ⇒ occurrences `MILESTONE` ; `> 0` ⇒ occurrences `LEAF` |

**Réponse `201 Created`** (`RecurringTaskResponse`) :

```json
{
  "series": {
    "taskId": 501,
    "parentTaskId": null,
    "wbsCode": "3",
    "name": "Comité hebdo",
    "nodeKind": "RECURRING",
    "nodeKindLabel": "Recurring task series",
    "revision": 0,
    "...": "champs WbsTaskResponse standard (ARIA, dates agrégées si applicable)"
  },
  "recurrenceRule": "FREQ=WEEKLY;INTERVAL=1;COUNT=10;DTSTART=2026-08-01",
  "occurrences": [
    {
      "taskId": 502,
      "parentTaskId": 501,
      "wbsCode": "3.1",
      "name": "Comité hebdo — occurrence 1/10",
      "nodeKind": "MILESTONE",
      "nodeKindLabel": "Milestone",
      "startDate": "2026-08-03T00:00:00Z",
      "revision": 0
    }
  ]
}
```

**Erreurs :**

| Cas | Code |
|-----|------|
| `firstOccurrenceDate` absent | 400 (validation `@NotNull`) |
| `frequency` absent, ou `occurrenceCount` absent/`≤0` | 422 `INVALID_RECURRENCE` |
| `occurrenceCount` > 500 | 422 `INVALID_RECURRENCE` |
| Appelant sans rôle d'édition | 403 (bodyless) |
| `tenantId`/`teamId`/`projectId` inconnu ou cross-tenant | 404 (bodyless, non-divulgation) |
| `parentTaskId` fourni mais introuvable sur le projet | 404 (bodyless, non-divulgation) |

### Schéma BDD — aucune migration nouvelle

`pilotage.task.node_kind` accepte déjà `RECURRING`/`MILESTONE` et `pilotage.task.recurrence_rule`
(`TEXT`) existe depuis `V1__schema_init.sql` (EN22.1a, frozen contract §a). Cette US ne modifie
aucun DDL — la règle de récurrence est un texte de forme iCalendar
(`FREQ=...;INTERVAL=...;COUNT=...;DTSTART=...`) construit et interprété uniquement côté service,
jamais reparsé ailleurs à ce stade.

### Classes Java concernées

| Classe | Rôle |
|--------|------|
| `RecurrenceFrequency` | Enum requête (`DAILY`/`WEEKLY`/`MONTHLY`), non persisté tel quel |
| `CreateRecurringTaskRequest` / `RecurringTaskResponse` | DTOs — n'exposent jamais l'entité JPA |
| `InvalidRecurrenceException` | 422 — fréquence/nombre d'occurrences manquant ou invalide |
| `RecurringTaskService` | Création série + génération occurrences, une seule trace de log |
| `SchedulingService.defaultCalendar(projectId, tenantId)` | Nouveau — expose le calendrier ouvré effectif du projet sans re-dériver le chargement (réutilisé par `RecurringTaskService`, EN22.1b) |
| `WbsTaskService.createTask` | Delta AC1 — `durationMinutes=0` ⇒ `NodeKind.MILESTONE` |
| `WbsTaskResponse.nodeKindLabel` / `labelFor` | A11y — libellé texte stable par `node_kind` |
| `WbsTaskController` (`createRecurringTask`) | Endpoint REST (`POST .../tasks/recurring`, gated) |
| `WbsExceptionHandler` | Mapping `InvalidRecurrenceException` → 422 |

## Cohérence avec les US suivantes

| US | Dépendance |
|----|------------|
| US22.4.8 (suivi d'avancement) | Le suivi d'avancement individuel de chaque occurrence générée est explicitement hors périmètre ici — couvert par cette US |
| US22.8.6 (récurrence intelligente) | La récurrence basée sur un calendrier externe (ex. synchronisation MeetOps) est hors périmètre ici |
| `pivot-pilotage-ui` (à créer) | Rendu du symbole losange (jalon) et des occurrences dans le Gantt, à partir de `nodeKind`/`nodeKindLabel` exposés ici ; jamais forme/couleur seule (A11y) |

## Hors périmètre

- Récurrence intelligente basée sur un calendrier externe (synchronisation MeetOps) — US22.8.6
- Suivi d'avancement individuel de chaque occurrence générée — US22.4.8
- Modification en masse d'une série d'occurrences (ex. déplacer toute la série) — non détaillée,
  à préciser lors d'une future US si besoin
- Frontend Angular (losange, libellés d'occurrences) — `pivot-pilotage-ui`, non implémenté à ce
  stade

---

Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Sprint 17
Stage: Review
