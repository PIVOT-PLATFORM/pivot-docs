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

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: — · Modèle Application → Projet (Projet = version d'application)
Justification: Structuration des données du domaine Pilotage autour de l'entité Application
Dépendances: EN18.1 (schéma `pilotage`)
