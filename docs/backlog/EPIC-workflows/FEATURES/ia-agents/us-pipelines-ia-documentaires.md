# US29.5.11 — Pipelines IA documentaires

**En tant que** maker
**Je veux** exécuter en batch de l'extraction structurée, classification et scoring sur documents (PDF, tableurs) sur des milliers d'éléments
**Afin de** traiter des volumes documentaires à l'échelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un lot de milliers de documents, when je lance le pipeline, then l'extraction/classification/scoring s'exécute en batch | ⬜ |
| Given un batch terminé, when je consulte les résultats, then chaque document a ses données structurées et son score | ⬜ |
| Error : given un document illisible, system l'isole en erreur sans bloquer le batch | ⬜ |

---
Item Type: US · Parent: F29.5 · Module: automatisation · Phase: phase-3 · Size: XL · Priority: Medium
Stage: Backlog
Rôle: citizen-developer
Source: WF-056 · MoSCoW: Could · Lot: Lot 4 · Origine: Différenciant Gumloop (+PA AI Builder)
Justification: Dossier §6.6 : ce que les autres ne savent pas faire
Dépendances: —
