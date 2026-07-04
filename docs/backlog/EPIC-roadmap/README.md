# E22 — Roadmap / Gantt

> Module de capacité du **domaine Pilotage** (E18) — cf. [ADR-008 Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).

## Objectif

Roadmap projets et vue Gantt : création de projets, jalons, dépendances et timeline du portefeuille. Porte l'entité **Project** du domaine Pilotage — chaque **Projet** (version d'application, ou autre unité) est rattaché à une **Application** parente (1 Application → 1..n Projet, cf. [EN18.9](../EPIC-pilotage/ENABLERS/en-modele-application-projet.md)).

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage` partagé du domaine, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F22.1 — Roadmap / Gantt**
  - US22.1.1 : Créer et gérer un projet sur la roadmap
  - US22.1.2 : Visualiser la roadmap en vue Gantt
  - US22.1.3 : Gérer les jalons et dépendances entre projets
- **F22.2 — Planification (benchmark PPM)** — issu du CSV benchmark (cf. [BENCHMARK.md](../BENCHMARK.md))
  - US22.2.1 : Gantt, dépendances, jalons
  - US22.2.2 : Chemin critique
  - US22.2.3 : Vues multiples
  - US22.2.4 : Modèles de projets
  - US22.2.5 : Baselines et historisation
  - US22.2.6 : Hybride cascade/agile

### Enablers
- Partagés au niveau du domaine Pilotage : **EN18.1** (schéma Flyway `pilotage` + entités JPA) · **EN18.2** (guard Angular `moduleId: 'pilotage'`)

## Modules impactés

`pilotage` (pivot-pilotage-core + pivot-pilotage-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses (association projet ↔ équipe)
- Dépend de : E18 Domaine Pilotage — enablers partagés EN18.1 (schéma `pilotage`) + EN18.2 (guard)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F22.1 — Roadmap / Gantt** | |
| [US22.1.1 — Créer et gérer un projet sur la roadmap](FEATURES/roadmap/us-creer-projet-roadmap.md) | ⬜ |
| [US22.1.2 — Visualiser la roadmap en vue Gantt](FEATURES/roadmap/us-vue-gantt.md) | ⬜ |
| [US22.1.3 — Gérer les jalons et dépendances entre projets](FEATURES/roadmap/us-jalons-dependances.md) | ⬜ |
| **F22.2 — Planification (benchmark PPM)** | |
| [US22.2.1 — Gantt, dépendances, jalons](FEATURES/planification/us-gantt-dependances-jalons.md) | ⬜ |
| [US22.2.2 — Chemin critique](FEATURES/planification/us-chemin-critique.md) | ⬜ |
| [US22.2.3 — Vues multiples](FEATURES/planification/us-vues-multiples.md) | ⬜ |
| [US22.2.4 — Modèles de projets](FEATURES/planification/us-modeles-projets.md) | ⬜ |
| [US22.2.5 — Baselines et historisation](FEATURES/planification/us-baselines-historisation.md) | ⬜ |
| [US22.2.6 — Hybride cascade/agile](FEATURES/planification/us-hybride-cascade-agile.md) | ⬜ |
