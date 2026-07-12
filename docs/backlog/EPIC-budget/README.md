# E26 — Budget & suivi financier

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.15).*

> Module de capacité du **domaine Pilotage** (E18) — cf. [ADR-008 Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).

## Objectif

Budget & suivi financier : saisie du budget par poste et suivi de la consommation prévu/réel avec alertes de dérive.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage` partagé du domaine, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F26.1 — Budget & suivi financier**
  - US26.1.1 : Saisir le budget d'un projet
  - US26.1.2 : Suivre la consommation budgétaire en temps réel
- **F26.2 — Budgets & finances (benchmark PPM)** — issu du CSV benchmark, rationalisé dans le README d'[E18 — Domaine Pilotage](../BACKLOG-IDEATION/EPIC-pilotage/README.md) (le document source `BENCHMARK.md` n'a jamais été mergé sur `main`, ex-PR #38)
  - US26.2.1 : Coûts au niveau projet
  - *(US26.2.2 Budgets pluriannuels PPI → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-budget/FEATURES/budgets-finances/us-budgets-pluriannuels-ppi.md) 2026-07-09 — secteur public uniquement)*
  - US26.2.3 : Flux de trésorerie
  - *(US26.2.4 Interface ERP finance → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-budget/FEATURES/budgets-finances/us-interface-erp-finance.md) 2026-07-09 — dépendance externe lourde)*
  - *(US26.2.5 Suivi des subventions → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-budget/FEATURES/budgets-finances/us-suivi-subventions.md) 2026-07-09 — secteur public uniquement)*
  - *(US26.2.6 Simulation AP/CP → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-budget/FEATURES/budgets-finances/us-simulation-ap-cp.md) 2026-07-09 — secteur public uniquement)*

### Enablers
- Partagés au niveau du domaine Pilotage : **EN18.1** (schéma Flyway `pilotage` + entités JPA) · **EN18.2** (guard Angular `moduleId: 'pilotage'`)
- **EN26.1** — [Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md)

## Modules impactés

`pilotage` (pivot-pilotage-core + pivot-pilotage-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses (association projet ↔ équipe)
- Dépend de : E18 Domaine Pilotage — enablers partagés EN18.1 (schéma `pilotage`) + EN18.2 (guard)
- Dépend de : E22 Roadmap (entité Project)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F26.1 — Budget & suivi financier** | |
| [US26.1.1 — Saisir le budget d'un projet](FEATURES/budget/us-saisir-budget.md) | ⬜ |
| [US26.1.2 — Suivre la consommation budgétaire en temps réel](FEATURES/budget/us-suivi-consommation.md) | ⬜ |
| **F26.2 — Budgets & finances (benchmark PPM)** | |
| [US26.2.1 — Coûts au niveau projet](FEATURES/budgets-finances/us-couts-projet.md) | ⬜ |
| *(US26.2.2 — Budgets pluriannuels PPI → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-budget/FEATURES/budgets-finances/us-budgets-pluriannuels-ppi.md))* | — |
| [US26.2.3 — Flux de trésorerie](FEATURES/budgets-finances/us-flux-tresorerie.md) | ⬜ |
| *(US26.2.4 — Interface ERP finance → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-budget/FEATURES/budgets-finances/us-interface-erp-finance.md))* | — |
| *(US26.2.5 — Suivi des subventions → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-budget/FEATURES/budgets-finances/us-suivi-subventions.md))* | — |
| *(US26.2.6 — Simulation AP/CP → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-budget/FEATURES/budgets-finances/us-simulation-ap-cp.md))* | — |
| **Enablers** | |
| [EN26.1 — Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md) | ⬜ |
