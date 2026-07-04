# US23.3.3 — Événements d'exécution

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** développeur ou Ops
**Je veux** que les exécutions et échecs de workflow n8n soient normalisés sur le bus
**Afin de** superviser l'automatisation et déclencher des réactions dans d'autres briques

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Webhooks n8n normalisés vers `workflow.run` et `workflow.failed` sur le bus (EN23.4) | ⬜ |
| Un run et un échec de workflow émettent bien leurs événements respectifs | ⬜ |

---
Item Type: US · Parent: F23.3 · Module: workflows · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US23.3.1, EN23.4
