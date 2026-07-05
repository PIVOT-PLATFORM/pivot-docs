# E33 — Collaboration & tâches (pilotage)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.22).*

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « Collaboration & tâches (pilotage) » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

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
| **F33.1 — Collaboration & tâches (pilotage)** | |
| [US33.1.1 — Collaboration contextuelle](FEATURES/collaboration-taches/us-collaboration-contextuelle.md) | ⬜ |
| [US33.1.2 — Continuum tâches-projets](FEATURES/collaboration-taches/us-continuum-taches-projets.md) | ⬜ |
| [US33.1.3 — Modularité par maturité](FEATURES/collaboration-taches/us-modularite-maturite.md) | ⬜ |
