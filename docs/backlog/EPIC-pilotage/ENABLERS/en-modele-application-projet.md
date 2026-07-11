# EN18.9 — Modèle Application → Projet

**Type d'enabler** : architecture (modèle de données du domaine Pilotage)

**Objectif technique** : Poser la hiérarchie de données structurante du domaine :
une **Application** possède **1..n Projet**. Un **Projet** est une **version de
l'application** (release, palier, millésime) — ou, plus largement, une autre unité
de travail rattachée à l'Application. Toutes les données produites au niveau Projet
(jalons, budget, risques, décisions, demandes, feuille de temps, ADR…) sont
**reliées à l'Application** parente et **consolidables** à ce niveau.

```text
Application (1) ───────< (1..n) Projet          Projet = version d'appli (ou autre)
     │                          │
     │  agrège / consolide      ├─ Roadmap & jalons ............ E22
     │  toutes les données      ├─ Portefeuille & comités ...... E23
     │  de ses Projets          ├─ Budget & finances ........... E26
     │                          ├─ Risques ..................... E21
     │                          ├─ Décisions / ADR ............. E24
     └──────────────────────────┴─ … toute entité portant un projet
```

**Principes**
- Chaque entité de donnée du domaine porte un `project_id` ; le `Projet` porte un
  `application_id` (FK `projet.application_id`).
- La **vue Application** = consolidation de toutes les données de ses Projets
  (agrégation via le bus PIVOT / API, jamais par FK inter-modules — cf. ADR-006).
- Un Projet appartient à **une seule** Application ; une Application regroupe ses
  versions/projets successifs pour un suivi transverse aux versions.

**Justification** : sans niveau Application, les données restent cloisonnées par
projet/version. Le pilotage exige une consolidation **par application** (suivre un
produit à travers ses versions, relier budget/risques/roadmap d'une même appli).

**Critères de complétion** :
- [ ] Entité `Application` au schéma `pilotage`, relation `Application 1 — 1..n Projet`
- [ ] FK `projet.application_id` ; contrainte « un Projet = une Application »
- [ ] Toute donnée projet (jalon, budget, risque, décision, demande…) traçable jusqu'à l'Application
- [ ] Vue/consolidation « par Application » exposée aux modules du domaine (E21–E27, E32–E39)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given le schéma `pilotage` avec les entités Application et Project (EN18.1), when on crée un Project avec un `application_id` valide, then la relation Application 1 — 1..n Project est établie et `project.application_id` référence l'Application parente.
- [ ] Given une Application possédant plusieurs Projects (versions successives), when on interroge le contrat de consolidation « par Application », then le système retourne l'agrégation des données de tous ses Projects rattachés, **sans** traverser de FK inter-modules (agrégation via bus PIVOT / API, cf. ADR-006 et ADR-008).
- [ ] Given une donnée du domaine portant un `project_id` (jalon, budget, risque, décision…), when on remonte la chaîne `project_id → project.application_id`, then la donnée est traçable de manière déterministe jusqu'à exactement une Application parente.
- [ ] Given une Application rattachée à une team/tenant, when on crée ou consolide un Project sous cette Application, then le Project hérite du même périmètre tenant que son Application et aucune donnée ne franchit la frontière `pilotage → public` en écriture (isolation EN17.4).
- [ ] Error case: given une création/mise à jour de Project avec un `application_id` nul, inexistant, ou pointant vers une Application d'un autre tenant, when la contrainte « un Projet = exactement une Application du même tenant » est évaluée, then l'opération est rejetée (violation d'intégrité / 400 pour `application_id` absent/invalide), aucun Project orphelin ou multi-rattaché n'est persisté.
- [ ] Security: given un utilisateur authentifié et le contrat de consolidation « par Application », when il demande la vue consolidée d'une Application, then un non-membre du tenant reçoit `404` (ressource invisible cross-tenant), un membre sans le rôle requis reçoit `403`, et la consolidation n'agrège jamais les données d'une Application d'un autre tenant.

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: — · Modèle Application → Projet (Projet = version d'application)
Justification: Structuration des données du domaine Pilotage autour de l'entité Application
Dépendances: EN18.1 (schéma `pilotage`)
