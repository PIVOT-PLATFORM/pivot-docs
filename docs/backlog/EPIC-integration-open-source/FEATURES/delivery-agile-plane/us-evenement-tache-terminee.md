# US23.1.3 — Événement tâche terminée

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master ou manager
**Je veux** qu'une tâche terminée dans Plane émette un événement sur le bus
**Afin de** déclencher des mises à jour dans d'autres briques (ex. portefeuille)

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Webhook Plane normalisé vers `task.completed` sur le bus (EN23.4) | ⬜ |
| Terminer une tâche dans Plane émet bien `task.completed` | ⬜ |

---
Item Type: US · Parent: F23.1 · Module: delivery-agile · Phase: phase-3 · Size: M · Priority: Highest
Stage: Backlog
Dépendances: US23.1.1, EN23.4
