# E14 — Module La Roue


## Repo cible (architecture multi-repo)
- Backend : **`pivot-collaboratif-core`** (schéma Flyway `collaboratif`, FK → `public.teams.id`)
- Frontend : **`pivot-collaboratif-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation
## Phase
⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Objectif
Roue de tirage pondéré anti-repeat pour animer des événements : CRUD roues, tirage pondéré, diffusion temps réel du résultat.

## Périmètre GitHub (phase-3)
- F14.1 : Roues CRUD (events avec liste membres) — US14.1.1
- F14.2 : Tirage pondéré anti-repeat — US14.2.1
- F14.3 : Diffusion temps réel du tirage (WS) — US14.3.1

## Dépendances
- Dépend de : E03 Système de modules

## Statut global
⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint
