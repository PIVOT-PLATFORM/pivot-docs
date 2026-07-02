# US18.7.1 — Créer et gérer le registre des risques projet

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** chef de projet
**Je veux** tenir un registre des risques avec probabilité et impact
**Afin de** anticiper et prioriser les risques du projet

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/pilotage/roadmap/projects/{id}/risks` crée un risque (titre, description, probabilité 1-5, impact 1-5, catégorie, owner) | ⬜ |
| Score risque = probabilité × impact (matrice 5×5) | ⬜ |
| Niveaux : FAIBLE (1-4) · MOYEN (5-9) · ELEVÉ (10-16) · CRITIQUE (17-25) | ⬜ |
| Statuts : IDENTIFIE · EN_COURS_MITIGATION · RESOLU · ACCEPTE · CLOS | ⬜ |
| Vue matrice risques : heatmap probabilité × impact | ⬜ |
| Test : risque CRITIQUE → badge rouge + alerte dashboard projet | ⬜ |

---
Item Type: US · Parent: F18.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US18.1.1
