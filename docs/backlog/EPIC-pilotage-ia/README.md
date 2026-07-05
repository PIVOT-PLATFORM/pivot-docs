# E34 — IA & agents (pilotage)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.23).*

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)), issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project). IA appliquée au pilotage de projet : **synthèse gouvernée** (comptes-rendus, statuts consolidés, tracés et validables), **agent exécutant** (actions déléguées avec supervision humaine), transformation des **réunions en tâches** de suivi, et option d'**IA souveraine** (hébergement France/UE) pour les organismes contraints.

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis le CSV benchmark (famille Pilotage, items `PP-###`). Voir la rationalisation dans [`BENCHMARK.md`](pathname:///pivot-docs/backlog/BENCHMARK).

## Dépendances
- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E18 Domaine Pilotage (ombrelle)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F34.1 — IA & agents (pilotage)** | |
| [US34.1.2 — Agent exécutant](FEATURES/ia-agents/us-agent-executant.md) | ⬜ |
| [US34.1.4 — IA souveraine](FEATURES/ia-agents/us-ia-souveraine.md) | ⬜ |
| [US34.1.1 — IA de synthèse gouvernée](FEATURES/ia-agents/us-ia-synthese-gouvernee.md) | ⬜ |
| [US34.1.3 — Réunions vers tâches](FEATURES/ia-agents/us-reunions-vers-taches.md) | ⬜ |
