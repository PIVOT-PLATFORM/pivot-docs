# US22.8.1 — Afficher les sprints sur la roadmap

**En tant que** PO
**Je veux** superposer les sprints/itérations d'un module agile (via le bus PIVOT) sur la roadmap et le Gantt
**Afin de** aligner la vision cascade (jalons) et la cadence agile (sprints)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un module agile publiant des sprints, when je l'active sur un projet, then les sprints s'affichent en bandes datées sur la timeline (deep-link, pas de FK — ADR-006) | ⬜ |
| Given un jalon proche d'une fin de sprint, when je consulte la roadmap, then l'alignement jalon/sprint est visible | ⬜ |
| Given un sprint modifié côté agile, when l'événement est reçu, then la bande se met à jour | ⬜ |

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · EN22.3 · bus PIVOT
