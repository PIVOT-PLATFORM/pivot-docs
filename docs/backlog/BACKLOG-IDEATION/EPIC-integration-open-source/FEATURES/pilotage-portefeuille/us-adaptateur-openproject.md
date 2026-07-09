# US28.6.1 — Adaptateur OpenProject

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** chef de projet ou PMO
**Je veux** que les projets et portefeuilles **OpenProject** soient exposés comme entités PIVOT
**Afin de** piloter le portefeuille depuis le catalogue, en complément ou à la place du module natif **Pilotage** ([E18](pathname:///pivot-docs/backlog/EPIC-pilotage/)) selon le choix de mon instance

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Adaptateur `adapter-openproject` conforme au contrat PivotAdapter (EN28.3) | ⬜ |
| Projets et portefeuilles OpenProject traduits en entités `Project`/`Portfolio` | ⬜ |
| Une mise à jour dans OpenProject émet un événement `project.updated` | ⬜ |
| Une instance peut activer le Pilotage natif (E18), OpenProject, ou les deux simultanément — coexistence, pas d'exclusion (ADR-009) | ⬜ |

---
Item Type: US · Parent: F28.6 · Module: pilotage-portefeuille · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: EN28.3
