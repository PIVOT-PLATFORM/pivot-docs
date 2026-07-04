# US11.3.1 — Créer une hiérarchie d'événements (Sprint sous PI Planning)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Release Train Engineer
**Je veux** organiser les Sprints sous un PI Planning
**Afin de** visualiser la capacité à plusieurs niveaux (PI / Sprint)

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Un événement peut avoir un `parentEventId` (Sprint → PI Planning, Release → PI) | ⬜ |
| Profondeur max : 2 niveaux (PI → Sprint) | ⬜ |
| GET `.../events/{piId}/children` retourne les Sprints du PI | ⬜ |
| Capacité agrégée PI = somme capacités Sprints enfants | ⬜ |
| Vue Angular : hiérarchie expandable PI → Sprints | ⬜ |
| Test : PI agrégation capacité · sprint sans parent valide | ⬜ |

---
Item Type: US · Parent: F11.3 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US11.1.1
