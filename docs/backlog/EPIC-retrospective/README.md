# E20 — Module Retrospective (Agilité)

## Objectif

Animer des rétrospectives d'équipe structurées avec formats multiples (Start/Stop/Continue, KIF/KAF, 4L, Mad/Sad/Glad), plan d'action intégré et suivi des engagements entre sprints.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-agilite-core`** (schéma Flyway `agilite`, FK → `public.teams.id`)
- Frontend : **`pivot-agilite-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre (phase-3)

### Features
- **F20.1 — Session rétrospective** — créer, animer, clore
  - US20.1.1 : Créer une session rétrospective (format, équipe, durée)
  - US20.1.2 : Animer la session en temps réel (STOMP — contribution cards + timer par phase)
- **F20.2 — Formats de rétrospective**
  - US20.2.1 : Formats prédéfinis (Start/Stop/Continue · KIF/KAF · 4L · Mad/Sad/Glad) + format custom
- **F20.3 — Plan d'action**
  - US20.3.1 : Créer des actions issues de la rétrospective (titre, owner, échéance)
  - US20.3.2 : Suivre les actions des rétros précédentes au démarrage de la rétro suivante

### Enablers
- **EN20.1** — Schéma Flyway `agilite` — tables `retro_sessions`, `retro_cards`, `retro_actions`
- **EN20.2** — Guard Angular module retrospective + isolation STOMP room `/topic/agilite/retro/{sessionId}`

## Modules impactés

`agilite` (pivot-agilite-core + pivot-agilite-ui)

## Dépendances

- Dépend de : E03 Système de modules
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

Item Type: Epic · Clé: E20 · Phase: phase-3 · Module: agilite
Stage: Backlog · Priority: High
