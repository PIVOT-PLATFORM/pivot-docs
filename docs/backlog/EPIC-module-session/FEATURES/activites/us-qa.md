# US19.3.5 — Activité Q&A — questions des participants avec upvotes

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** participant
**Je veux** poser des questions et voter pour les questions des autres
**Afin de** faire remonter les sujets les plus pertinents

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Participant soumet une question (texte · anonyme optionnel) | ⬜ |
| Participant upvote une question (1 vote par question par participant) | ⬜ |
| STOMP broadcast `QUESTION_ADDED` / `QUESTION_UPVOTED` | ⬜ |
| Liste questions triée par nb votes décroissant, mise à jour temps réel | ⬜ |
| Animateur peut marquer une question comme `ANSWERED` | ⬜ |
| XSS : texte question échappé | ⬜ |
| Test : double vote même participant → 409 | ⬜ |

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US19.1.2
