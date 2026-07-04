# US21.13.3 — Format d'échange ouvert

**En tant que** DSI
**Je veux** disposer d'un standard d'export/import de workflows entre outils (déclencheurs, étapes, mappings)
**Afin de** garantir la portabilité et éviter le lock-in

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un workflow, when je l'exporte au format ouvert, then déclencheurs, étapes et mappings sont représentés | ⬜ |
| Given un fichier au format ouvert, when je l'importe, then le workflow est reconstruit à l'identique quand l'outil le supporte | ⬜ |
| Error : given une fonctionnalité non portable, system la signale plutôt que de la perdre silencieusement | ⬜ |

---
Item Type: US · Parent: F21.13 · Module: automatisation · Phase: phase-3 · Size: L · Priority: Low
Stage: Backlog
Source: WF-068 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B3
Justification: Dossier §7-B3
Dépendances: —
