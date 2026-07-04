# US18.5.2 — Suivre la consommation budgétaire en temps réel

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** chef de projet / responsable financier
**Je veux** enregistrer les dépenses réelles et voir l'écart prévu/réel
**Afin de** piloter le budget et détecter les dérives avant qu'elles deviennent critiques

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../projects/{id}/expenses` enregistre une dépense (poste, montant, date, description) | ⬜ |
| Vue tableau de bord : budget alloué · dépensé · restant · % consommé par poste | ⬜ |
| Alerte automatique si consommation > 80% du budget (configurable) | ⬜ |
| Graphique évolution consommation dans le temps (courbe prévu vs réel) | ⬜ |
| Export CSV des dépenses | ⬜ |
| Test : dépense dépassant budget total → warning (non bloquant) | ⬜ |

---
Item Type: US · Parent: F18.5 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: US18.5.1
