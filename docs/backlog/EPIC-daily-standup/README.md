# E10 — Module Daily Standup

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.3).*

## Repo cible (architecture multi-repo)
- Backend : **`pivot-agilite-core`** (schéma Flyway `agilite`, FK → `public.teams.id`)
- Frontend : **`pivot-agilite-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation
## Phase
⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Objectif
Animation de daily standups : sessions CRUD, minuteur configurable + rotation participants en temps réel, statistiques sessions terminées.

## Périmètre GitHub (phase-3)
- F10.1 : Sessions daily CRUD — US10.1.1, US10.1.2
- F10.2 : Animation temps réel (minuteur + rotation WS) — US10.2.1, US10.2.2
- F10.3 : Statistiques sessions terminées — US10.3.1

## Dépendances
- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo

## Statut global
⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint
