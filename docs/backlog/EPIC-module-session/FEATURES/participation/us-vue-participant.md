# US19.2.2 — Vue participant en temps réel (affichage adapté au type d'activité)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** participant
**Je veux** voir une interface adaptée au type d'activité de la session
**Afin de** interagir de façon intuitive selon le contexte (quiz, poll, wordcloud, etc.)

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Angular router charge le composant adapté selon `session.type` (lazy-loaded) | ⬜ |
| QUIZ : questions séquentielles, chrono visible, une réponse à la fois | ⬜ |
| POLL : choix unique ou multiple, résultats en temps réel après vote | ⬜ |
| WORDCLOUD : champ texte libre → mot ajouté au nuage en temps réel | ⬜ |
| BRAINSTORM : post-it virtuels, ajout en temps réel | ⬜ |
| QA : envoi question + vote (like) sur questions des autres | ⬜ |
| Reconnexion STOMP → état session rechargé depuis API | ⬜ |

---
Item Type: US · Parent: F19.2 · Module: collaboratif · Phase: phase-3 · Size: XL · Priority: Critical
Stage: Backlog
Dépendances: US19.2.1, US19.3.1 → US19.3.5
