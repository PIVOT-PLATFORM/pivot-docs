# US18.7.2 — Définir un plan de mitigation et suivre les actions

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** chef de projet / owner du risque
**Je veux** définir des actions de mitigation pour chaque risque critique
**Afin de** réduire la probabilité ou l'impact de manière traçable

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../risks/{id}/mitigations` crée une action (description, responsable, échéance, statut) | ⬜ |
| Statut action : A_FAIRE · EN_COURS · TERMINEE | ⬜ |
| Réévaluation possible après mitigation : nouvelle probabilité + impact (risque résiduel) | ⬜ |
| Historique des réévaluations conservé | ⬜ |
| Test : risque réévalué avec score résiduel < score initial → tendance DOWN affichée | ⬜ |

---
Item Type: US · Parent: F18.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US18.7.1
