# Module Session — Concept (hors GitHub Project)

## Note
Ce module (QUIZ, POLL, WORDCLOUD, BRAINSTORM, Q&A) est mentionné dans CLAUDE.md mais n'a pas encore d'Epic dans le GitHub Project PIVOT-PLATFORM.

Les modules collaboratifs disponibles dans GitHub (E09-E15) couvrent des périmètres différents (Scrum Poker, Daily Standup, Capacity Planning, MeetOps, Cahiers de tests, La Roue, Équipes).

Si ce module est créé dans GitHub, ce dossier sera converti en Epic correspondant.

## Périmètre envisagé (non validé GitHub)
- Types d'activité : QUIZ, POLL, WORDCLOUD, BRAINSTORM, Q&A
- Animateur crée et pilote la session
- Participants rejoignent via code (ROLE_GUEST possible)
- Résultats temps réel via WebSocket

## Inspiration
Klaxoon (sessions live collaboratives)


## Repo cible (architecture multi-repo)
- Backend : **`pivot-collaboratif-core`** (schéma Flyway `collaboratif`, FK → `public.teams.id`)
- Frontend : **`pivot-collaboratif-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation
## Phase
⏸️ Non planifié — pas d'Epic GitHub
