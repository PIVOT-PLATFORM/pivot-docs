# EN22.1b — Moteur CPM & API d'ordonnancement

**Type d'enabler** : architecture (moteur de calcul)

**Objectif technique** : Implémenter la section **(b) API du moteur** du contrat figé
[EN22.1](en-modele-temporel-unique.md#b-api-du-moteur-dordonnancement) — `schedule` (calcul
complet) et `reSchedule` (recalcul incrémental renvoyant un **DIFF**), CPM déterministe (passe
avant/arrière, dates au plus tôt/tard, marges libre/totale, chemin critique) respectant
dépendances+lag, contraintes et calendriers. Modes **AUTO** (recalcul) et **MANUAL** (dates figées +
écart signalé). Co-édition optimiste (`scheduleVersion` monotone, `STALE_BASE_VERSION` + rebase).

**Justification** : Le moteur est une **fonction pure in-memory** sur un snapshot du graphe (aucune
FK ni lecture inter-modules — ADR-006) ; son isolation permet un test déterministe et alimente le
rendu virtualisé d'EN22.2 par des DIFF ciblés (10 000+ tâches).

**Hors-périmètre** : le schéma/persistance (→ EN22.1a) ; la projection de vues, le rollup et les
événements (→ EN22.1c). L'altitude **n'entre pas** dans le calcul (elle paramètre la projection de
sortie, pas le moteur).

**Critères de complétion** :
- [ ] `schedule(ScheduleInput)` complet + `reSchedule(state, changeSet)` incrémental renvoyant un DIFF (patch par tâche + `newCriticalPath` seulement s'il change)
- [ ] CPM : dates au plus tôt/tard, marges libre/totale, chemin critique ; dépendances FS/SS/FF/SF + lag, contraintes, calendriers
- [ ] AUTO vs MANUAL (dates figées + écart `{plannedManual, wouldBeAuto, delta}`) ; ne casse jamais une dépendance dure (SchedulingWarning typé)
- [ ] Déterminisme total (tie-break stable par `wbsPath`/`taskId`, aucun `now()`) + idempotence (delta vide ⇒ patch vide)
- [ ] Co-édition optimiste : `scheduleVersion` monotone, `STALE_BASE_VERSION` + rebase, ChangeSet atomique inversible (undo/redo)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un graphe valide, when `schedule` s'exécute deux fois sur la même entrée, then il produit un résultat **identique** (déterminisme, tie-break stable), et `reSchedule` converge vers le même état que `schedule` complet (oracle anti-drift).
- [ ] Given un changement local sur une tâche, when `reSchedule` est appelé, then il renvoie un DIFF borné à la fermeture transitive aval + récapitulatifs ancêtres (pas un snapshot complet).
- [ ] Given une tâche en mode MANUAL, when le recalcul s'exécute, then ses dates restent figées et un écart `{plannedManual, wouldBeAuto, delta}` est émis (garde-fou « Gantt qui ment »).
- [ ] Error case: given un ChangeSet introduisant un cycle de dépendances (ou basé sur une version périmée), when le moteur l'évalue, then il rejette l'opération (`SCHEDULING_CYCLE` / `STALE_BASE_VERSION`) sans produire d'état partiel.
- [ ] Security: given le moteur, when il est invoqué, then il opère sur un snapshot **mono-tenant** fourni en argument (aucune FK ni lecture inter-modules) ; les données externes (dispo ressources, calendriers tiers) entrent via agrégation bus PIVOT, jamais par accès direct.

**Statut** : ⬜ À faire — issu de la scission d'EN22.1 (contrat figé §b)

---
Item Type: Enabler · Parent: E22 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Dépendances: EN22.1a (schéma temporel — snapshot du graphe) · contrat figé EN22.1 §(b)
