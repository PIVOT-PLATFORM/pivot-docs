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
- **F18.2 — Portefeuille projets** — vue multi-projets, statut, filtres
  - US18.2.1 : Vue portefeuille multi-projets avec filtres et statut
  - US18.2.2 : Modifier le statut d'un projet (planning / in progress / done / on hold)
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
| [US18.1.1 — Créer un projet sur la roadmap](FEATURES/roadmap-gantt/us-creer-projet.md) | ⬜ |
| [US18.1.2 — Visualiser la roadmap en vue Gantt](FEATURES/roadmap-gantt/us-vue-gantt.md) | ⬜ |
| [US18.1.3 — Jalons et dépendances](FEATURES/roadmap-gantt/us-jalons-dependances.md) | ⬜ |
| **F18.2 — Portefeuille projets** | |
| [US18.2.1 — Vue portefeuille multi-projets](FEATURES/portefeuille/us-vue-portefeuille.md) | ⬜ |
| [US18.2.2 — Modifier statut d'un projet](FEATURES/portefeuille/us-statut-projet.md) | ⬜ |
| **F18.3 — ADR projet** | |
| [US18.3.1 — Créer un ADR](FEATURES/adr-projet/us-creer-adr.md) | ⬜ |
| [US18.3.2 — Lister et filtrer les ADR](FEATURES/adr-projet/us-liste-adr.md) | ⬜ |
