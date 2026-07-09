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

**Statut** : ⬜ À faire — dépend d'EN17.4 (convention BDD multi-schéma)

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN17.4 (convention BDD multi-schéma) · EN18.9 (modèle Application → Projet)
