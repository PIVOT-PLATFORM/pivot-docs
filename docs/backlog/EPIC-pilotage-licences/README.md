# E37 — Licences & réversibilité (pilotage)

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « Licences & réversibilité (pilotage) » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

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
| **F37.1 — Licences & réversibilité (pilotage)** | |
| [US37.1.2 — Garanties de pérennité](FEATURES/licences-reversibilite/us-garanties-perennite.md) | ⬜ |
| [US37.1.4 — Offre d'entrée incluse](FEATURES/licences-reversibilite/us-offre-entree-incluse.md) | ⬜ |
| [US37.1.1 — Réversibilité contractuelle](FEATURES/licences-reversibilite/us-reversibilite-contractuelle.md) | ⬜ |
| [US37.1.3 — Segmentation des licences](FEATURES/licences-reversibilite/us-segmentation-licences.md) | ⬜ |
