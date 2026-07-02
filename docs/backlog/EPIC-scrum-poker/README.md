# E09 — Module Scrum Poker

## Repo cible (architecture multi-repo)
- Backend : **`pivot-agilite-core`** (schéma Flyway `agilite`, FK → `public.teams.id`)
- Frontend : **`pivot-agilite-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation
## Phase
⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Objectif
Planning poker interactif : rooms, tickets, votes temps réel WebSocket, participant anonyme via code.

## Périmètre GitHub (phase-3)
- F09.1 : Rooms planning poker (CRUD + code de rejoint) — US09.1.1, US09.1.2
- F09.2 : Tickets et votes en temps réel (WebSocket) — US09.2.1, US09.2.2
- F09.3 : Participant anonyme (join par code sans compte) — US09.3.1
- EN09.1 : WebSocket room Scrum Poker isolation

## Dépendances
- Dépend de : E03 Système de modules

## Statut global
⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint
