# US22.4.7 — Chemin critique, marges & fractionnement

## Contexte

- **US** : `docs/backlog/EPIC-roadmap/FEATURES/gantt-detaille/us-chemin-critique-marges-split.md`
  (F22.4 — Gantt détaillé, EPIC-roadmap), Sprint 17
- **PR** : `pivot-pilotage-core`
  [#64](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/64)
  (`feat/us22-4-7-chemin-critique-marges`) — backend uniquement, `pivot-pilotage-ui` restant (non
  créé à ce stade, comme US22.4.4/US22.4.6/US22.4.8)
- **Dernier commit au moment du figeage** : `pivot-pilotage-core` `1e25d06` — `feat(gantt):
  US22.4.7 — chemin critique & marges (fractionnement hors périmètre, réserve D1)`
- **Commit de merge** : `bfca46a` (mergé 2026-07-12T13:37:11Z)
- **Gate 4 MERGE_CONFIDENCE** : `pivot-pilotage-core` 100/100 — MERGE_AUTONOMOUS
- **Dépend de** : EN22.1b (moteur CPM — `SchedulingService`, déjà mergé, calcule et persiste
  `is_critical`/`total_slack_minutes`/`free_slack_minutes`), EN22.1c (`SummaryAggregate#critical`,
  contrat figé — sémantique du rollup summary)
- **Portée réduite** : Sprint 17 Gate 1 READINESS, réserve D1 (2026-07-11) — le fractionnement
  (split) est hors scope de cette PR (issue #51), décision réservée au mainteneur
- Closes #51

---

## Spec fonctionnelle

### Lecture du chemin critique & marges (`GET .../gantt/tree`)

Chaque nœud du `GET .../gantt/tree` (US22.4.1a) porte désormais 4 nouveaux champs — exposition
pure des colonnes déjà calculées et persistées par le moteur CPM EN22.1b, **rien n'est
recalculé** :

- `isCritical` (`Boolean`) — flag dérivé du moteur (`totalFloat ≤ 0`) ; pour un nœud `SUMMARY`,
  rollup any-leaf-critical (mêmes sémantiques que `SummaryAggregate#critical`, contrat figé
  EN22.1c) ; `null` si pas encore planifié.
- `totalSlackMinutes` (`Integer`) — marge totale en minutes ouvrées, valeur propre (own value) ;
  `null` sur un summary (« float d'un rollup » n'a pas de sémantique CPM, le contrat figé
  `SummaryAggregate` — EN22.1c §c — ne la définit pas) ou si pas encore planifié.
- `freeSlackMinutes` (`Integer`) — marge libre, mêmes règles que `totalSlackMinutes`.
- `criticalLabel` (`String`) — alternative textuelle (`"Critical"` / `"Not critical"`) à
  `isCritical` pour l'A11y (jamais de dépendance à la seule couleur), même pattern que
  `progressLabel` existant ; `null` exactement quand `isCritical` l'est.

### Sécurité en écriture

Lecture non gatée (accessible à tout utilisateur ayant accès au projet, comme le reste de l'arbre
WBS). Une tentative d'écriture d'un des 4 champs dérivés est rejetée `422` — réutilise le garde
`DERIVED_FIELDS` déjà en place dans `WbsExceptionHandler` depuis US22.4.2.

### Fractionnement (split) — hors périmètre de cette PR

Réserve D1 (Sprint 17 Gate 1 READINESS, 2026-07-11, cf. issue #51) : le fractionnement d'une
tâche n'a aucun porteur dans le schéma EN22.1 actuel (`pilotage.task` sans notion de segments).
Seule la moitié « chemin critique / marges » de l'US est traitée ici ; le split reste réservé au
mainteneur (avenant schéma vs. enabler dédié — cf. § Écarts vs AC initiaux).

---

## Contrat technique

### Fichiers modifiés — `pivot-pilotage-core` (PR #64)

| Fichier | Rôle |
|---------|------|
| `WbsTaskResponse.java` | +4 champs (`isCritical`, `totalSlackMinutes`, `freeSlackMinutes`, `criticalLabel`), JavaDoc étendu |
| `WbsTaskService.java` | `toResponse()` : lecture pure de `Task#getCritical()`/`getTotalSlackMinutes()`/`getFreeSlackMinutes()`, rollup summary via `SummaryAggregate#critical()` |
| `WbsTaskController.java` | JavaDoc du contrat `GET .../gantt/tree` mis à jour (pas de nouvel endpoint) |
| `package-info.java` | JavaDoc package étendu (chemin critique & marges) |
| `WbsTaskControllerIT.java` (test, modifié) | +2 tests (exposition des champs, 422 sur écriture) |
| `WbsTaskServiceIT.java` (test, modifié) | +2 tests (diamant de dépendances, rollup summary) |

### Endpoints

| Endpoint | Codes retour |
|----------|--------------|
| `GET .../gantt/tree` (existant, US22.4.1a) | Réponse étendue : `isCritical`/`totalSlackMinutes`/`freeSlackMinutes`/`criticalLabel` par nœud |
| `PATCH .../gantt/tasks/{taskId}/duration` (existant, US22.4.2) | `422` (`DERIVED_FIELD_NOT_EDITABLE`) si le corps porte un des 4 champs dérivés |

Aucun nouvel endpoint, aucune migration Flyway — exposition pure de colonnes déjà persistées
(EN22.1b).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| EN22.1b (moteur CPM, `SchedulingService`) | Dépendance — calcule et persiste `is_critical`/`total_slack_minutes`/`free_slack_minutes`, réutilisés tels quels, jamais recalculés |
| EN22.1c (`SummaryAggregate`, contrat figé) | Dépendance — rollup `isCritical` d'un summary suit exactement `SummaryAggregate#critical` (any-leaf-critical) ; l'absence de sémantique CPM pour une marge de rollup vient du même contrat figé |
| US22.4.2 (durée/effort, garde `DERIVED_FIELDS`) | Réutilisé tel quel pour rejeter l'écriture des 4 nouveaux champs dérivés (422) |
| US22.4.8 (suivi d'avancement, #59, mergée juste avant) | Même package `gantt`, même pattern `criticalLabel`/`progressLabel` ; PR rebasée sans conflit après cette US |
| US22.5.3 (nivellement des ressources) | Hors périmètre explicite (backlog) |
| US22.4.9 (baselines multiples & écarts) | Hors périmètre explicite (backlog) — comparaison du chemin critique entre baselines |
| US22.4.10 (interactions Gantt) | Hors périmètre explicite (backlog) — modification interactive du fractionnement à la souris |

---

## Écarts vs AC initiaux

Sur les 7 AC du backlog (2 fonctionnels + error + 2 security + A11y), 5 sont couverts par cette
PR ; le fractionnement (les AC restants) est explicitement hors périmètre.

### Fractionnement (split) — non implémenté, réserve D1

Le backlog documentait déjà cette réserve (« Décision à trancher (mainteneur) » : `pilotage.task`
ne porte ni segments ni interruption dans le contrat figé EN22.1 §a). La PR confirme et acte ce
report — deux options restent ouvertes pour le mainteneur (avenant au schéma via une nouvelle
table/colonne, ou enabler dédié), non tranchées dans cette PR. Les AC suivants du backlog ne sont
donc pas couverts ici :

- « Given une tâche interrompue, when je la fractionne, then elle apparaît en segments avec un
  creux »
- Error : tentative de fractionnement produisant un segment de durée nulle/négative
- Security : « seul un utilisateur avec un rôle d'édition sur le projet peut fractionner une
  tâche » (rien à gater, aucune écriture de split n'existe)

### AC couverts sans écart

- Chemin critique mis en évidence (marge totale ≤ 0) ✅
- Marges libre/totale affichées ✅
- Security : lecture non gatée / écriture refusée 422 ✅
- Security : cross-tenant → 404 sans divulgation — couvert par le test préexistant sur `tree()`
  (même garde, pas de nouvelle surface) ✅
- A11y : alternative textuelle (`criticalLabel`) ✅

---

## Tests

### `pivot-pilotage-core`

| Test | Comportement vérifié |
|---|---|
| `WbsTaskServiceIT#criticalPath_flagsLongerBranchCritical_andExposesPositiveSlackOnTheShorterOne` | Graphe diamant (A/B → C) : la branche la plus longue (A, 8h) est marquée critique à marge nulle, la plus courte (B, 4h) affiche une marge positive (totale et libre), C (convergence) critique à marge nulle |
| `WbsTaskServiceIT#summary_rollsUpCriticalFlag_butNotSlack_noRollupDefinedForFloat` | Un summary avec une unique tâche enfant critique rollup `isCritical=true` mais `totalSlackMinutes`/`freeSlackMinutes` restent `null` (pas de sémantique de rollup pour une marge) |
| `WbsTaskControllerIT#tree_exposesCriticalPathAndSlackFields` | Le payload JSON du tree expose bien `isCritical`/`totalSlackMinutes`/`freeSlackMinutes`/`criticalLabel` |
| `WbsTaskControllerIT#setDuration_withSlackDerivedField_returns422_andServiceNeverCalled` | `PATCH duration` avec un `totalSlackMinutes` fourni par le client → 422 (`DERIVED_FIELD_NOT_EDITABLE`), service jamais appelé |

Selon le corps de la PR : 506 tests dans la branche (0 échec/erreur), passés à 578 après rebase
pré-merge (mentionné au Gate 4). Coverage LINE 95.53 % global, 96.56 % package `gantt` (Gate 2 ≥
85 %). Checkstyle 0 violation, SpotBugs 0 bug. CI réelle (commentaire Gate 4) : 15/15 checks
verts (SonarCloud, CodeQL ×2, Semgrep ×2, Trivy, Gitleaks, Plumber ×2, Mutation Testing PITest,
SCA, Code Quality Java, Docker/Maven preview, Tests Backend TU+TI).

### `pivot-pilotage-ui`

Non créé à ce stade — rendu visuel du chemin critique/marges (icône/motif, vue tabulaire
accessible au clavier, A11y AC) délégué au repo frontend, comme US22.4.4/US22.4.6/US22.4.8.

---

## Hors périmètre (explicitement exclu)

- Fractionnement (split) d'une tâche — réserve D1, décision mainteneur (avenant schéma vs.
  enabler dédié).
- Nivellement des ressources sur les tâches critiques — US22.5.3.
- Modification interactive du fractionnement à la souris (glisser un segment) — US22.4.10.
- Comparaison du chemin critique entre plusieurs baselines — US22.4.9.
- Rendu visuel (icône/motif, vue tabulaire accessible au clavier) — délégué à
  `pivot-pilotage-ui` ; cette US ne livre que les données (`isCritical`/`totalSlackMinutes`/
  `freeSlackMinutes`/`criticalLabel`).
