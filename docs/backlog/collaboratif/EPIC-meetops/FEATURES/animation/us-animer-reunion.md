# US12.2.1 — Animer la réunion en temps réel (point courant + timer)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur de réunion
**Je veux** dérouler l'agenda en temps réel avec timer et point courant partagé
**Afin de** tenir les délais et garder tous les participants synchronisés

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../meetings/{id}/start` → STOMP broadcast `MEETING_STARTED` + point courant = point 1 | ⬜ |
| Timer par point : décompte visible de tous · STOMP `TIMER_TICK` chaque seconde | ⬜ |
| Animateur passe au point suivant (manuel ou automatique à expiration timer) | ⬜ |
| Point en dépassement de temps → indicateur visuel "overtime" | ⬜ |
| Participants voient le point courant + timer + agenda progression | ⬜ |
| Test : passage point suivant → STOMP `AGENDA_ITEM_CHANGED` reçu par tous participants | ⬜ |

---
Item Type: US · Parent: F12.2 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Dépendances: US12.1.1
