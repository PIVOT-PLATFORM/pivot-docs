# US11.2.2 — Saisir les absences et jours non disponibles

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master
**Je veux** saisir les absences de chaque membre sur un événement
**Afin de** calculer la capacité réelle disponible

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../events/{id}/absences` crée une absence (memberId, dateDebut, dateFin, motif) | ⬜ |
| Absence validée si dans la période de l'événement | ⬜ |
| Jours fériés configurables au niveau tenant (liste nationale) | ⬜ |
| Calcul capacité nette mis à jour automatiquement après saisie absence | ⬜ |
| Test : absence hors période événement → 400 | ⬜ |

---
Item Type: US · Parent: F11.2 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US11.2.1
