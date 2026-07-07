# E36 — Intégration SI (pilotage)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.25).*

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)), issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project). Ouverture du domaine Pilotage vers le reste du SI : **API et interfaces standardisées**, **interface comptabilité publique**, **intégration à la suite collaborative** (partage documentaire, messagerie), **extensibilité low-code** pour les besoins spécifiques d'un organisme, et **accompagnement/communauté** d'utilisateurs.

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis le CSV benchmark (famille Pilotage, items `PP-###`), rationalisé directement dans le README d'[E18 — Domaine Pilotage](../EPIC-pilotage/README.md) — le document source `BENCHMARK.md` n'a jamais été mergé sur `main` (ex-PR #38).

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
