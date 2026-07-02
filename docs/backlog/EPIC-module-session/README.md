# E19 — Module Session live

## Objectif

Sessions interactives en temps réel animées par un présentateur : QUIZ, POLL, WORDCLOUD, BRAINSTORM, Q&A. Participants rejoignent via code — avec ou sans compte (ROLE_GUEST). Inspiration : Klaxoon.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-collaboratif-core`** (schéma Flyway `collaboratif`, FK → `public.teams.id`)
- Frontend : **`pivot-collaboratif-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F19.1 — Création et configuration de session (animateur)**
  - US19.1.1 : Animateur crée une session live (titre, type activité, paramètres)
  - US19.1.2 : Animateur pilote la session (démarrer / passer activité suivante / terminer)
- **F19.2 — Participation à une session**
  - US19.2.1 : Participant rejoint via code (avec compte ROLE_USER ou anonyme ROLE_GUEST)
  - US19.2.2 : Participant interagit avec l'activité active (vote / réponse / contribution)
- **F19.3 — Types d'activité**
  - US19.3.1 : Activité QUIZ — questions + choix + timer + leaderboard temps réel
  - US19.3.2 : Activité POLL — questions + résultats en temps réel
  - US19.3.3 : Activité WORDCLOUD — contributions texte + nuage de mots temps réel
  - US19.3.4 : Activité BRAINSTORM — post-its temps réel (texte libre)
  - US19.3.5 : Activité Q&A — questions posées par participants + upvote
- **F19.4 — Résultats et diffusion**
  - US19.4.1 : Diffusion résultats temps réel aux participants (WebSocket STOMP)
  - US19.4.2 : Export résultats session (PDF ou JSON) après clôture

### Enablers
- **EN19.1** — Schéma Flyway `collaboratif` sessions (Session, Activity, Participant, Response)
- **EN19.2** — WebSocket room session isolation (salle dédiée par session)
- **EN19.3** — Guard Angular module session (moduleGuard `moduleId: 'collaboratif'`)

## Modules impactés

`collaboratif` (pivot-collaboratif-core + pivot-collaboratif-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Cohabite avec : E08 Whiteboard (même repo `pivot-collaboratif-*`)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| EN19.1 — Schéma Flyway `collaboratif` sessions | ⬜ |
| EN19.2 — WebSocket room session isolation | ⬜ |
| EN19.3 — Guard Angular module session | ⬜ |
| **F19.1 — Création session** | |
| [US19.1.1 — Créer une session live](FEATURES/creation/us-creer-session.md) | ⬜ |
| [US19.1.2 — Piloter la session](FEATURES/creation/us-piloter-session.md) | ⬜ |
| **F19.2 — Participation** | |
| [US19.2.1 — Rejoindre via code](FEATURES/participation/us-rejoindre-session.md) | ⬜ |
| [US19.2.2 — Interagir avec activité](FEATURES/participation/us-interagir-activite.md) | ⬜ |
| **F19.3 — Types activité** | |
| [US19.3.1 — Activité QUIZ](FEATURES/activites/us-activite-quiz.md) | ⬜ |
| [US19.3.2 — Activité POLL](FEATURES/activites/us-activite-poll.md) | ⬜ |
| [US19.3.3 — Activité WORDCLOUD](FEATURES/activites/us-activite-wordcloud.md) | ⬜ |
| [US19.3.4 — Activité BRAINSTORM](FEATURES/activites/us-activite-brainstorm.md) | ⬜ |
| [US19.3.5 — Activité Q&A](FEATURES/activites/us-activite-qa.md) | ⬜ |
| **F19.4 — Résultats** | |
| [US19.4.1 — Diffusion résultats temps réel](FEATURES/resultats/us-diffusion-resultats.md) | ⬜ |
| [US19.4.2 — Export résultats session](FEATURES/resultats/us-export-resultats.md) | ⬜ |
