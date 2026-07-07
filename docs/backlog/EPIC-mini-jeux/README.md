# E47 — Mini-jeux collaboratifs

## Objectif

Petits jeux d'équipe temps réel pour animer une pause ou un icebreaker : bingo de réunion, jeu de rapidité sur post-its et quiz agile/Scrum. Accessibles depuis le Hub, sans préparation de contenu.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-collaboratif-core`** (schéma Flyway `collaboratif`, FK → `public.teams.id`)
- Frontend : **`pivot-collaboratif-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre (phase-3)

### Features

- **F47.1 — Bingo des réunions** — grille 5×5 de phrases cultes de réunion, coche en temps réel
  - US47.1.1 : Jouer au Bingo des réunions à plusieurs
- **F47.2 — Post-it Rush** — cliquer sur les post-its avant qu'ils disparaissent, combo multiplicateur
  - US47.2.1 : Jouer à Post-it Rush
- **F47.3 — Trivia Agile** — questions Scrum/agile, timer, score final
  - US47.3.1 : Jouer à Trivia Agile à plusieurs

## Modules impactés

`collaboratif` (pivot-collaboratif-core + pivot-collaboratif-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo
- Interface avec : **E19 Module Session** — accessibles depuis le Hub comme animations d'équipe, même logique de room temps réel que les sessions live

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F47.1 — Bingo des réunions** | |
| [US47.1.1 — Jouer au Bingo des réunions à plusieurs](FEATURES/bingo-reunions/us-bingo-reunions.md) | ⬜ |
| **F47.2 — Post-it Rush** | |
| [US47.2.1 — Jouer à Post-it Rush](FEATURES/post-it-rush/us-post-it-rush.md) | ⬜ |
| **F47.3 — Trivia Agile** | |
| [US47.3.1 — Jouer à Trivia Agile à plusieurs](FEATURES/trivia-agile/us-trivia-agile.md) | ⬜ |

---
Item Type: Epic · Clé: E47 · Phase: phase-3 · Module: collaboratif
Stage: Backlog · Priority: Low
