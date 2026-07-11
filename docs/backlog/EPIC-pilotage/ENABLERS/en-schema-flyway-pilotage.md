# EN18.1 — Schéma Flyway `pilotage` + entités JPA

**Type d'enabler** : architecture (socle données du domaine Pilotage)

**Objectif technique** : Créer le schéma PostgreSQL `pilotage` (convention multi-schéma EN17.4)
et les entités JPA de base partagées par tous les modules du domaine : `Application`, `Project`
(Milestone, PortfolioView, Adr, Consultation, Candidate rattachés), selon la hiérarchie
**Application 1..n Projet** posée par EN18.9.

**Justification** : Chaque module du domaine (E22 Roadmap, E23 Portefeuille, E24 ADR projet, E25
Commande publique, E26 Budget, E27 OKR, E13 Cahiers de tests) a besoin du même socle de données
(schéma `pilotage`, entités `Application`/`Project`) pour rattacher ses propres tables via FK
`project_id` — sans ce socle commun, chaque module réimplémenterait sa propre hiérarchie
Application/Projet de façon incohérente.

**Critères de complétion** :
- [ ] Migration Flyway `V1__init_pilotage.sql` créant le schéma `pilotage` (convention EN17.4 :
      FK cross-schéma uniquement vers `public.teams(id)`/`public.tenants(id)`)
- [ ] Entité JPA `Application` (schéma `pilotage`), FK `public.teams.id`
- [ ] Entité JPA `Project` (`Application 1 — 1..n Project`, FK `application_id`)
- [ ] Entités JPA `Milestone`, `PortfolioView`, `Adr`, `Consultation`, `Candidate` — chacune
      porteuse d'un `project_id` traçable jusqu'à l'`Application` (EN18.9)
- [ ] Test Testcontainers validant la contrainte « un Projet = une Application »
- [ ] Test Testcontainers validant l'isolation schéma (`pilotage` ne peut pas écrire dans `public`)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given la dépendance EN17.4 (`ModuleFlywayConfigurer`) et un schéma `public` stabilisé, when la migration Flyway `V1__init_pilotage.sql` s'exécute au démarrage du module pilotage, then le schéma PostgreSQL `pilotage` existe et les tables `application`, `project`, `milestone`, `portfolio_view`, `adr`, `consultation`, `candidate` sont créées (vérifiable via `information_schema.tables`).
- [ ] Given le schéma `pilotage` migré, when on inspecte la table `pilotage.application`, then elle porte une colonne `tenant_id BIGINT NOT NULL` avec une FK vers `public.tenants(id)` et un index sur `tenant_id` (conforme au template `V1__init_{schema}.sql` / EN17.4).
- [ ] Given une Application persistée (id=A, tenant=T), when on crée un Project rattaché via `application_id=A`, then le Project est persisté avec `application_id=A` et un `tenant_id` égal à T, lisible via le repository JPA `Project`.
- [ ] Given une Application A possédant deux Projects P1 et P2, when on charge Application A via l'entité JPA, then la relation Application 1..n Project expose la collection {P1, P2} (association bidirectionnelle mappée).
- [ ] Given une entité satellite (Milestone, PortfolioView, Adr, Consultation ou Candidate) portant un `project_id`, when on remonte la chaîne `project_id → application_id`, then chaque entité est traçable jusqu'à son Application parente (`project_id NOT NULL` + FK `project(id)`).
- [ ] Given un test d'intégration Testcontainers PostgreSQL, when on tente de rattacher un même Project à deux Applications, then la contrainte « un Projet = une Application » garantit un `application_id` non nul unique par Project.
- [ ] Error case: given l'insertion d'un Project avec un `application_id` inexistant — ou d'une entité satellite avec un `project_id` orphelin — when la persistance est tentée, then la contrainte de clé étrangère rejette l'opération (violation d'intégrité référentielle, SQLState 23503), aucune ligne n'est écrite.
- [ ] Security: (1) isolation schéma — given le rôle applicatif du module pilotage, when il tente un `INSERT`/`UPDATE`/DDL sur une table du schéma `public`, then l'opération est refusée (écriture limitée au schéma `pilotage`), validée par test Testcontainers ; (2) isolation multi-tenant — given deux tenants T1 et T2, when une requête s'exécute dans le contexte de T1, then aucune donnée portant `tenant_id=T2` n'est accessible (`tenant_id NOT NULL`, filtrage systématique, FK `public.tenants(id)`).

**Statut** : ⬜ À faire — dépend d'EN17.4 (convention BDD multi-schéma)

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN17.4 (convention BDD multi-schéma) · EN18.9 (modèle Application → Projet)
