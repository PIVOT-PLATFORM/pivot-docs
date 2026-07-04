# E34 — IA & agents (pilotage)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](../EPIC-formation-onboarding/README.md) (US41.5.23).*

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « IA & agents (pilotage) » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis le CSV benchmark (famille Pilotage, items `PP-###`). Voir la rationalisation dans [`BENCHMARK.md`](../BENCHMARK.md).

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
