# EN28.10 — ADR-017 : modèle d'entités du catalogue

**Type d'enabler** : gouvernance · architecture

**Contexte** : Documenter le modèle d'entités étendu (**Application**, Project, Portfolio, Contract, Vendor, Team, Capacity, Decision, Requirement, Epic — ADR-009 §4) et le réconcilier avec le schéma `public.teams` déjà existant (ADR-006), pour éviter deux modèles d'équipe divergents. La hiérarchie **Application 1..n Projet** (Projet = version d'application) et le rattachement des données projet à l'Application sont posés par [EN18.9](pathname:///pivot-docs/backlog/EPIC-pilotage/).

**Critères de complétion** :
- [ ] Modèle d'entités figé et documenté
- [ ] Réconciliation explicite avec `public.teams`/`public.team_members` (ADR-006)
- [ ] Le modèle est référencé par EN28.2 (catalogue) et par chaque adaptateur
- [ ] Trancher le point ouvert ci-dessous (vocabulaire `Component`/`API`/`Resource`/`System`)
- [ ] ADR-017 rédigée et acceptée

**Point ouvert — à valider par le mainteneur (benchmark plateforme développeur, `pivot-benchmarks/plateforme-developpeur/dossier-synthese-plateforme-developpeur.md` §7.3, pivot-benchmarks#1)** : le modèle d'entités ci-dessus est structuré autour du pilotage de portefeuille/projet (PPM). Le vocabulaire standard d'un *software catalog* au sens Backstage/Port/Cortex/OpsLevel (`Component`, `API`, `Resource`, `System`, `Domain`) n'y figure pas explicitement, alors que F28.10 (adaptateurs GitLab CE/Forgejo) mentionne déjà `Component`/`Resource` dans ses critères d'acceptation — incohérence naissante entre le modèle déclaré et son usage réel dans le backlog. Deux options, non tranchées ici :
- **Option A** — étendre le modèle avec un second groupe de Kinds « techniques » (`Component`, `API`, `Resource`, `System`) aux côtés du groupe « pilotage » déjà présent, sur le modèle Backstage.
- **Option B** — traiter `Component`/`Resource` comme des sous-types de `Project`/`Requirement` existants plutôt que d'ajouter des Kinds racines, en s'inspirant du modèle Port (types entièrement libres, pas de jeu figé).

Cette question conditionne F28.11 (scorecards, scaffolding, TechDocs), qui a besoin d'un type d'entité cible stable — à trancher avant d'implémenter F28.11, pas nécessairement avant de rédiger l'ADR elle-même.

**Dépendances** : EN28.2 (catalogue d'entités étendu)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: gouvernance · Module: gouvernance · Phase: phase-3
Stage: Backlog · Priority: High
