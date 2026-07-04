# US19.3.1 — Activité QUIZ — quiz interactif réseau multijoueur

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur
**Je veux** lancer un quiz interactif multijoueur en temps réel (réseau)
**Afin de** tester les connaissances du groupe avec scoring et classement live

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Quiz : liste de questions (texte, 2–6 options, une ou plusieurs bonnes réponses, durée par question) | ⬜ |
| Salle multijoueur : N participants connectés simultanément via STOMP room `/topic/collaboratif/quiz/{sessionId}` | ⬜ |
| POST `.../sessions/{id}/quiz/next` → STOMP broadcast `QUESTION_STARTED` (question + options + durée) à tous les joueurs | ⬜ |
| Chaque joueur soumet sa réponse indépendamment avant fin timer | ⬜ |
| Score = points si correct (configurable) + bonus rapidité selon rang de soumission (1er = max bonus) | ⬜ |
| Fin timer → STOMP `QUESTION_ENDED` : réponse correcte révélée + scores mis à jour → broadcast leaderboard | ⬜ |
| Leaderboard temps réel affiché entre chaque question (podium animé) | ⬜ |
| Résultats finaux : classement complet + score par joueur + taux de bonnes réponses par question | ⬜ |
| Joueur déconnecté en cours : reconnexion STOMP → état courant rechargé (question en cours + son score) | ⬜ |
| Test : réponse après timer → non comptabilisée · bonus rapidité décroissant selon ordre soumission | ⬜ |

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: US19.1.2
