# E18 — Module Pilotage

## Objectif

Suite de pilotage de projets et de portefeuille : visualisation roadmap / Gantt, gestion multi-projets, Architecture Decision Records (ADR) par projet, et suivi de la commande publique (consultations, appels d'offres, attribution marchés).

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
| **F18.7 — Gestion des risques** | |
| [US18.7.1 — Registre des risques (matrice 5x5)](FEATURES/risques/us-registre-risques.md) | ⬜ |
| [US18.7.2 — Plan de mitigation + risque résiduel](FEATURES/risques/us-plan-mitigation.md) | ⬜ |
