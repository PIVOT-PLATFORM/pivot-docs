# E11 — Module Capacity Planning


## Repo cible (architecture multi-repo)
- Backend : **`pivot-agilite-core`** (schéma Flyway `agilite`, FK → `public.teams.id`)
- Frontend : **`pivot-agilite-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation
## Phase
⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Objectif
Gestion de la capacité d'équipe : événements (PI Planning, Sprint, Release, Custom), membres et absences, hiérarchie événements.

## Périmètre GitHub (phase-3)
- F11.1 : Événements capacité — US11.1.1, US11.1.2
- F11.2 : Membres et absences — US11.2.1, US11.2.2
- F11.3 : Hiérarchie événements (Sprint sous PI) — US11.3.1

## Dépendances
- Dépend de : E03 Système de modules

## Statut global
⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint
