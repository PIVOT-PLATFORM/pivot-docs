# US22.7.6 — Export iCalendar (.ics)

**En tant que** utilisateur métier
**Je veux** exporter jalons, tâches et échéances au format iCalendar (.ics) et par abonnement (URL)
**Afin de** voir le planning dans Outlook / Google Agenda / Apple Calendar

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when je l'exporte en .ics, then jalons et tâches datées apparaissent dans un agenda standard | ⬜ |
| Given un abonnement iCal (URL), when le planning change, then l'agenda abonné se met à jour | ⬜ |

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
