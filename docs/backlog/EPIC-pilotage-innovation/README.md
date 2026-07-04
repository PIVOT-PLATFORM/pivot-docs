# E38 — Innovation (pilotage)

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « Innovation (pilotage) » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

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
| **F38.1 — Innovation (pilotage)** | |
| [US38.1.6 — Archivage probant](FEATURES/innovation/us-archivage-probant.md) | ⬜ |
| [US38.1.8 — Format d'échange ouvert](FEATURES/innovation/us-format-echange-ouvert.md) | ⬜ |
| [US38.1.7 — Indicateurs de valeur publique](FEATURES/innovation/us-indicateurs-valeur-publique.md) | ⬜ |
| [US38.1.1 — Lien commande publique](FEATURES/innovation/us-lien-commande-publique.md) | ⬜ |
| [US38.1.4 — Livrables d'instance générés](FEATURES/innovation/us-livrables-instance-generes.md) | ⬜ |
| [US38.1.5 — Portail de transparence](FEATURES/innovation/us-portail-transparence.md) | ⬜ |
| [US38.1.3 — Simulation AP/CP](FEATURES/innovation/us-simulation-ap-cp.md) | ⬜ |
| [US38.1.2 — Suivi des subventions](FEATURES/innovation/us-suivi-subventions.md) | ⬜ |
