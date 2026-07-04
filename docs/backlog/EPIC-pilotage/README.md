# E18 — Domaine Pilotage

## Objectif

Suite de pilotage de projets et de portefeuille : visualisation roadmap / Gantt, gestion multi-projets, Architecture Decision Records (ADR) par projet, et suivi de la commande publique (consultations, appels d'offres, attribution marchés).

## Pilotage : un domaine, plusieurs modules

> **Décision structurante — [ADR-008 Domaines composables & cockpits par persona](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).**

« Pilotage » n'est pas un module monolithique : c'est un **domaine** qui regroupe plusieurs **modules de capacité** autonomes. Chaque module est activable indépendamment et **composable dans les cockpits des personas** concernés — l'intégration passe par le **bus d'événements PIVOT** et des **deep-links** (jamais de FK inter-modules, cf. ADR-006).

| Module de capacité | Feature | Statut |
|--------------------|---------|--------|
| Roadmap / Gantt | F18.1 | dans ce domaine |
| Portefeuille projets | F18.2 | dans ce domaine |
| ADR projet | F18.3 | dans ce domaine |
| Commande publique | F18.4 | dans ce domaine |
| Budget & suivi financier | F18.5 | dans ce domaine |
| OKR | F18.6 | dans ce domaine |
| **Gestion des risques** | ~~F18.7~~ | **→ module dédié [E21](../EPIC-risk/README.md)** (retiré du domaine Pilotage) |

Un **cockpit** est une vue composée, propre à un persona, qui agrège les widgets/vues des modules pertinents. Les personas et leurs compositions sont **à définir** — proposition de départ dans [ADR-008](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).

> La décomposition physique (un EPIC/repo par module) est **incrémentale** : E18 reste l'ombrelle du domaine tant que la migration n'est pas actée module par module.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F18.1 — Roadmap / Gantt** — projets, jalons, dépendances, vue temporelle
  - US18.1.1 : Créer un projet sur la roadmap
  - US18.1.2 : Visualiser la roadmap en vue Gantt
  - US18.1.3 : Ajouter des jalons et dépendances entre projets
- **F18.2 — Portefeuille projets** — tableau de bord multi-projets, indicateurs RAG, export
  - US18.2.1 : Tableau de bord portefeuille (KPIs, indicateurs RAG Rouge/Amber/Vert)
  - US18.2.2 : Rapport d'avancement export JSON/CSV
- **F18.3 — ADR projet** — Architecture Decision Records par projet
  - US18.3.1 : Créer un ADR dans un projet (titre, contexte, décision, conséquences)
  - US18.3.2 : Lister et filtrer les ADR d'un projet (statut : proposed / accepted / deprecated)
- **F18.4 — Commande publique** — consultations, appels d'offres, attribution marchés
  - US18.4.1 : Créer et gérer une consultation (appel d'offres, marché négocié, accord cadre)
  - US18.4.2 : Suivre les candidats et analyser les offres (grille critères pondérés)
  - US18.4.3 : Attribuer le marché et générer le rapport d'attribution

### Enablers
- **EN18.1** — Schéma Flyway `pilotage` + entités JPA (Project, Milestone, PortfolioView, Adr, Consultation, Candidate)
- **EN18.2** — Guard Angular module pilotage (moduleGuard `moduleId: 'pilotage'`)

## Modules impactés

`pilotage` (pivot-pilotage-core + pivot-pilotage-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses (pour associer un projet à une équipe)
- En lien avec : E21 Gestion des risques — intégration cockpit projet (onglet + widget), voir F21.9

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| EN18.1 — Schéma Flyway `pilotage` + entités JPA | ⬜ |
| EN18.2 — Guard Angular module pilotage | ⬜ |
| **F18.1 — Roadmap / Gantt** | |
| [US18.1.1 — Créer un projet sur la roadmap](FEATURES/roadmap/us-creer-projet-roadmap.md) | ⬜ |
| [US18.1.2 — Vue Gantt](FEATURES/roadmap/us-vue-gantt.md) | ⬜ |
| [US18.1.3 — Jalons et dépendances](FEATURES/roadmap/us-jalons-dependances.md) | ⬜ |
| **F18.2 — Portefeuille projets** | |
| [US18.2.1 — Tableau de bord portefeuille (RAG)](FEATURES/portfolio/us-tableau-bord-portfolio.md) | ⬜ |
| [US18.2.2 — Rapport d'avancement export CSV](FEATURES/portfolio/us-rapport-avancement.md) | ⬜ |
| **F18.3 — ADR projet** | |
| [US18.3.1 — Créer un ADR projet](FEATURES/adr/us-creer-adr-projet.md) | ⬜ |
| [US18.3.2 — Consulter et rechercher les ADRs](FEATURES/adr/us-consulter-adrs.md) | ⬜ |
| **F18.4 — Commande publique** | |
| [US18.4.1 — Créer une consultation](FEATURES/commande-publique/us-creer-consultation.md) | ⬜ |
| [US18.4.2 — Suivi candidats + grille critères](FEATURES/commande-publique/us-suivi-candidats.md) | ⬜ |
| [US18.4.3 — Attribution marché + rapport](FEATURES/commande-publique/us-attribution-notification.md) | ⬜ |
| **F18.5 — Budget & suivi financier** | |
| [US18.5.1 — Saisir le budget projet](FEATURES/budget/us-saisir-budget.md) | ⬜ |
| [US18.5.2 — Suivi consommation budgétaire](FEATURES/budget/us-suivi-consommation.md) | ⬜ |
| **F18.6 — OKR** | |
| [US18.6.1 — Créer objectifs et Key Results](FEATURES/okr/us-creer-objectif.md) | ⬜ |
| [US18.6.2 — Suivre l'avancement des KR](FEATURES/okr/us-suivre-kr.md) | ⬜ |
| **Gestion des risques** (ex-F18.7) | |
| → Module dédié **[E21 — Gestion des risques](../EPIC-risk/README.md)** | 🔗 |
