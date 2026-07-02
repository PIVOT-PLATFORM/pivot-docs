# US10.1.2 — Démarrer et terminer une session daily standup

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur de la session
**Je veux** démarrer et terminer la session daily
**Afin de** contrôler le déroulement du standup

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../sessions/{id}/start` démarre la session → STOMP broadcast `SESSION_STARTED` | ⬜ |
| Session track le participant courant + temps restant | ⬜ |
| POST `.../sessions/{id}/stop` termine la session → sauvegarde durée réelle + statut `COMPLETED` | ⬜ |
| Session terminée → historique consultable | ⬜ |
| Test TI : start · passage participant suivant · stop | ⬜ |

---
Item Type: US · Parent: F10.1 · Module: agilite · Phase: phase-3 · Size: S · Priority: High
Stage: Backlog
Dépendances: US10.1.1
