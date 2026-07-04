# E31 — Demande & arbitrage

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « Demande & arbitrage » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

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
| **F31.1 — Demande & arbitrage** | |
| [US31.1.5 — Business cases dynamiques](FEATURES/demande-arbitrage/us-business-cases-dynamiques.md) | ⬜ |
| [US31.1.3 — Capacité à faire](FEATURES/demande-arbitrage/us-capacite-a-faire.md) | ⬜ |
| [US31.1.1 — Gestion de la demande](FEATURES/demande-arbitrage/us-gestion-demande.md) | ⬜ |
| [US31.1.4 — Scénarios what-if](FEATURES/demande-arbitrage/us-scenarios-what-if.md) | ⬜ |
| [US31.1.2 — Scoring multicritère](FEATURES/demande-arbitrage/us-scoring-multicritere.md) | ⬜ |
| [US31.1.6 — Approche 'tout est projet'](FEATURES/demande-arbitrage/us-tout-est-projet.md) | ⬜ |
