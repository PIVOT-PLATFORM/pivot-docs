# US11.1.2 — Visualiser la capacité de l'équipe sur un calendrier

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master
**Je veux** voir la capacité disponible de mon équipe sur un calendrier
**Afin de** planifier le sprint en tenant compte des absences

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/agilite/capacity/events/{id}/summary` retourne : durée jours · membres · absences · capacité nette | ⬜ |
| Vue calendrier Angular : événements de l'équipe + zones d'absence colorées | ⬜ |
| Capacité nette = (jours ouvrés × membres) - jours d'absence | ⬜ |
| Export capacité en points (configurable : 1 jour = N points) | ⬜ |
| Test : calcul capacité nette avec absences | ⬜ |

---
Item Type: US · Parent: F11.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US11.1.1, US11.2.2
