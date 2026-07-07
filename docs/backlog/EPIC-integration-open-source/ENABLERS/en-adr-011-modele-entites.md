# EN28.10 — ADR-017 : modèle d'entités du catalogue

**Type d'enabler** : gouvernance · architecture

**Contexte** : Documenter le modèle d'entités étendu (**Application**, Project, Portfolio, Contract, Vendor, Team, Capacity, Decision, Requirement, Epic — ADR-009 §4) et le réconcilier avec le schéma `public.teams` déjà existant (ADR-006), pour éviter deux modèles d'équipe divergents. La hiérarchie **Application 1..n Projet** (Projet = version d'application) et le rattachement des données projet à l'Application sont posés par [EN18.9](pathname:///pivot-docs/backlog/EPIC-pilotage/).

**Critères de complétion** :
- [ ] Modèle d'entités figé et documenté
- [ ] Réconciliation explicite avec `public.teams`/`public.team_members` (ADR-006)
- [ ] Le modèle est référencé par EN28.2 (catalogue) et par chaque adaptateur
- [ ] ADR-017 rédigée et acceptée

**Dépendances** : EN28.2 (catalogue d'entités étendu)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: gouvernance · Module: gouvernance · Phase: phase-3
Stage: Backlog · Priority: High
