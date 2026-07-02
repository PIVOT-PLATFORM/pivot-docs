# US19.1.2 — Démarrer, mettre en pause et terminer une session live

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur
**Je veux** contrôler le cycle de vie de ma session (démarrer / pause / terminer)
**Afin de** maîtriser le rythme de l'animation

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../sessions/{id}/start` → STOMP broadcast `SESSION_STARTED` | ⬜ |
| POST `.../sessions/{id}/pause` → STOMP broadcast `SESSION_PAUSED` (participants voient écran pause) | ⬜ |
| POST `.../sessions/{id}/resume` → STOMP broadcast `SESSION_RESUMED` | ⬜ |
| POST `.../sessions/{id}/end` → STOMP broadcast `SESSION_ENDED` · statut `COMPLETED` · résultats figés | ⬜ |
| Animateur seul peut changer le statut (ROLE_USER propriétaire ou ROLE_ADMIN) | ⬜ |
| Test : transitions invalides (ex. pause → start) → 409 | ⬜ |

---
Item Type: US · Parent: F19.1 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Dépendances: US19.1.1
