# US10.3.1 — Consulter les statistiques d'une session terminée

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master
**Je veux** consulter les statistiques des sessions daily passées
**Afin de** suivre la régularité et la durée des standups

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/agilite/standup/sessions?teamId=&status=COMPLETED` retourne liste sessions terminées | ⬜ |
| Chaque session : date, durée totale, durée par participant, participants présents | ⬜ |
| Filtres : période (7j / 30j / custom) · équipe | ⬜ |
| Vue Angular : liste sessions + graphique durée moyenne par participant (dernier mois) | ⬜ |
| Test : données historiques paginées correctement | ⬜ |

---
Item Type: US · Parent: F10.3 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US10.1.2
