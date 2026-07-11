# EN22.1a — Schéma temporel `pilotage`

**Type d'enabler** : architecture (schéma de données)

**Objectif technique** : Matérialiser la section **(a) Modèle de données** du contrat figé
[EN22.1](en-modele-temporel-unique.md#a-modèle-de-données--schéma-pilotage) — les 11 tables du
schéma `pilotage` (`project`, `phase`, `task`, `task_dependency`, `task_constraint`, `calendar`,
`calendar_exception`, `assignment`, `task_progress`, `baseline`, `baseline_snapshot`) via migrations
Flyway + entités JPA. Porte l'**altitude effective** par nœud (`temporal_precision` + bornes floues
coexistant avec `start_date`/`finish_date` sur la même ligne), `tenant_id` transverse, et les champs
**dérivés serveur** (`wbs_code`…) en écriture refusée.

**Justification** : Livrable indépendant testable (migrations + contraintes + invariants), socle de
persistance sur lequel s'appuient le moteur (EN22.1b) et la projection de vues (EN22.1c). Sépare la
donnée du calcul.

**Hors-périmètre** : le calcul d'ordonnancement (moteur CPM → EN22.1b) ; la projection de vues, le
rollup récapitulatif et les événements (→ EN22.1c).

**Critères de complétion** :
- [ ] Migrations Flyway `V*__…pilotage.sql` créant les 11 tables du §(a) du contrat figé
- [ ] `tenant_id BIGINT NOT NULL` (FK `public.tenants(id)`, indexé) + `project_id` traçable sur toutes les tables
- [ ] Altitude effective : `temporal_precision` ENUM + bornes floues coexistant avec les dates précises ; invariant de nullabilité
- [ ] Champs dérivés serveur (`wbs_code`…) : écriture directe refusée (422)
- [ ] Aucune FK sortant de `pilotage` sauf `public.tenants`/`public.teams` (ADR-006)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given les migrations appliquées, when on inspecte le schéma `pilotage`, then les 11 tables du §(a) existent avec leurs colonnes, types et FK conformes au contrat figé.
- [ ] Given une `task`, when on renseigne `temporal_precision=QUARTER` avec des bornes floues, then les dates précises et la période floue coexistent sur la même ligne (aucune table de vue séparée).
- [ ] Error case: given une tentative d'écriture directe d'un champ dérivé (`wbs_code`), when la persistance est tentée, then l'opération est refusée (`422`), le champ reste calculé serveur.
- [ ] Security: given deux tenants T1 et T2, when une requête s'exécute dans le contexte de T1, then aucune ligne portant `tenant_id=T2` n'est accessible (`tenant_id NOT NULL`, filtrage systématique, FK `public.tenants(id)`).

**Statut** : ⬜ À faire — issu de la scission d'EN22.1 (contrat figé §a)

---
Item Type: Enabler · Parent: E22 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Dépendances: EN18.1 (schéma `pilotage`) · EN18.9 (Application→Projet) · contrat figé EN22.1 §(a)
