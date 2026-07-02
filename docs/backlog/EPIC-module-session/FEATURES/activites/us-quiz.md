# US19.3.1 — Activité QUIZ — questions chronométrées et scoring

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur
**Je veux** créer et diffuser un quiz chronométré avec scoring automatique
**Afin d'** évaluer les connaissances des participants en temps réel

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Quiz : liste de questions (texte, 2–6 options, une ou plusieurs bonnes réponses, durée) | ⬜ |
| POST `.../sessions/{id}/quiz/next` passe à la question suivante → STOMP broadcast `QUESTION_STARTED` | ⬜ |
| Participant soumet réponse avant fin du timer | ⬜ |
| Score = +N points si correct (N configurable) · bonus rapidité optionnel | ⬜ |
| Fin timer → STOMP `QUESTION_ENDED` + correction visible | ⬜ |
| Leaderboard temps réel mis à jour après chaque question | ⬜ |
| Test : réponse après timer → non comptabilisée | ⬜ |

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: US19.1.2
