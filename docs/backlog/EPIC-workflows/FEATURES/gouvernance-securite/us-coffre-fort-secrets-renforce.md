# US21.7.5 — Coffre-fort de secrets renforcé

**En tant que** RSSI
**Je veux** garantir une portée limitée (scoped access), la rotation, le moindre privilège par workflow, l'absence de secrets dans les logs et l'audit de chaque utilisation
**Afin de** protéger les 'clés du royaume' — critère sécurité n°1

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un secret, when un workflow y accède, then l'accès est limité à sa portée et au moindre privilège | ⬜ |
| Given un secret, when sa rotation est planifiée, then il est renouvelé sans interruption des workflows | ⬜ |
| Security/Gouvernance : aucun secret n'apparaît dans les logs et chaque utilisation est auditée | ⬜ |

---
Item Type: US · Parent: F21.7 · Module: automatisation · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Source: WF-029 · MoSCoW: Must · Lot: Lot 2 · Origine: Insight I4
Justification: Dossier §8-I4 : 'les clés du royaume' — critère sécurité n°1
Dépendances: —
