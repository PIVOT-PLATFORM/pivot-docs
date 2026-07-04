# E32 — Ressources & temps

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](../EPIC-formation-onboarding/README.md) (US41.5.21).*

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « Ressources & temps » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

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
| **F32.1 — Ressources & temps** | |
| [US32.1.3 — Plan de charge temps réel](FEATURES/ressources-temps/us-plan-de-charge.md) | ⬜ |
| [US32.1.1 — Ressources et affectations](FEATURES/ressources-temps/us-ressources-affectations.md) | ⬜ |
| [US32.1.2 — Saisie des temps](FEATURES/ressources-temps/us-saisie-des-temps.md) | ⬜ |
