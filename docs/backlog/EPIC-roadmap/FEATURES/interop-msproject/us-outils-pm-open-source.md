# US22.7.8 — Interop outils PM open source

**En tant que** chef de projet
**Je veux** importer/exporter avec GanttProject (.gan), ProjectLibre, OpenProject, TaskJuggler et GNOME Planner (.planner)
**Afin de** garantir la portabilité avec l'écosystème libre (anti lock-in)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fichier GanttProject .gan ou GNOME Planner .planner, when je l'importe, then tâches, dépendances et ressources sont restitués | ⬜ |
| Given un plan, when je l'exporte vers OpenProject / TaskJuggler, then il reste exploitable dans ces outils | ⬜ |

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
