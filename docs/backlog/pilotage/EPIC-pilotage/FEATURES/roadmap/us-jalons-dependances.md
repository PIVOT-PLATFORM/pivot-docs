# US18.1.3 — Gérer les jalons et dépendances entre projets

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** responsable pilotage
**Je veux** définir des jalons et des dépendances entre projets
**Afin de** modéliser le chemin critique de mon portefeuille

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../projects/{id}/milestones` crée un jalon (nom, date, type : LIVRAISON · REVUE · GO_LIVE) | ⬜ |
| POST `.../projects/{id}/dependencies` crée une dépendance (sourceId → targetId, type : FINISH_TO_START) | ⬜ |
| Dépendance circulaire → 409 Conflict | ⬜ |
| Vue Gantt : flèches de dépendances entre barres projets | ⬜ |
| Test : cycle dépendance rejeté · jalon visuel sur timeline | ⬜ |

---
Item Type: US · Parent: F18.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Dépendances: US18.1.2
