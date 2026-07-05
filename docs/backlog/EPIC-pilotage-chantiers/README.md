# E39 — Chantiers SI (pilotage)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.28).*

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « Chantiers SI (pilotage) » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

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
| **F39.1 — Chantiers SI (pilotage)** | |
| [US39.1.1 — Articulation des familles](FEATURES/chantiers-si/us-articulation-familles.md) | ⬜ |
| [US39.1.10 — Audit RGAA](FEATURES/chantiers-si/us-audit-rgaa.md) | ⬜ |
| [US39.1.2 — Cadrage SI financier](FEATURES/chantiers-si/us-cadrage-si-financier.md) | ⬜ |
| [US39.1.4 — Classification et hébergement](FEATURES/chantiers-si/us-classification-hebergement.md) | ⬜ |
| [US39.1.5 — Clauses de pérennité](FEATURES/chantiers-si/us-clauses-perennite.md) | ⬜ |
| [US39.1.6 — Conduite du changement](FEATURES/chantiers-si/us-conduite-changement.md) | ⬜ |
| [US39.1.7 — Gouvernance de l'IA de pilotage](FEATURES/chantiers-si/us-gouvernance-ia-pilotage.md) | ⬜ |
| [US39.1.3 — Processus demande-arbitrage](FEATURES/chantiers-si/us-processus-demande-arbitrage.md) | ⬜ |
| [US39.1.8 — TCO par population](FEATURES/chantiers-si/us-tco-par-population.md) | ⬜ |
| [US39.1.9 — Traçabilité réglementaire](FEATURES/chantiers-si/us-tracabilite-reglementaire.md) | ⬜ |
