# E36 — Intégration SI (pilotage)

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « Intégration SI (pilotage) » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

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
| **F36.1 — Intégration SI (pilotage)** | |
| [US36.1.5 — Accompagnement et communauté](FEATURES/integration-si/us-accompagnement-communaute.md) | ⬜ |
| [US36.1.2 — API et interfaces standardisées](FEATURES/integration-si/us-api-interfaces-standardisees.md) | ⬜ |
| [US36.1.4 — Extensibilité low-code](FEATURES/integration-si/us-extensibilite-low-code.md) | ⬜ |
| [US36.1.3 — Intégration suite collaborative](FEATURES/integration-si/us-integration-suite-collaborative.md) | ⬜ |
| [US36.1.1 — Interface comptabilité publique](FEATURES/integration-si/us-interface-comptabilite-publique.md) | ⬜ |
