# US22.7.7 — Interop outils agiles & de travail (Jira, Azure DevOps, Asana…)

**En tant que** chef de projet
**Je veux** synchroniser (import/export) avec Jira, Azure DevOps, Asana, Trello, monday, GitHub/GitLab Projects
**Afin de** relier la planification et les outils d'exécution des équipes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet Jira/Azure DevOps, when je le connecte, then epics/stories/sprints deviennent tâches/jalons dans le Gantt | ⬜ |
| Given une modification de dates côté PIVOT, when la synchro s'exécute, then elle est propagée (ou proposée) côté outil agile | ⬜ |
| Security : les jetons de connexion sont stockés chiffrés (coffre-fort) | ⬜ |

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
