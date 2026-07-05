# US23.2.7 — Scénarios what-if

**En tant que** direction
**Je veux** simuler sur plusieurs portefeuilles des ajouts, reports ou abandons de projets avec leurs impacts charge, budget et trésorerie, et comparer les scénarios
**Afin de** disposer de la fonction reine de l'arbitrage et décider en connaissance des conséquences

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille, when un utilisateur ajoute/reporte/abandonne un projet en simulation, then les impacts charge, budget et trésorerie sont recalculés | ⬜ |
| Plusieurs scénarios peuvent être créés et comparés côte à côte | ⬜ |
| Error : given un scénario incohérent (report au-delà de l'horizon), system signale l'erreur sans altérer les données réelles | ⬜ |
| Security/Gouvernance : les simulations n'impactent pas les données de référence tant qu'elles ne sont pas validées (traçabilité) | ⬜ |

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: Backlog
Source: PP-036 · MoSCoW: Could · Lot: Lot 3 · Origine: Différenciant Sciforma
Profils: Grand groupe, État
Justification: Dossier §6.2 : la fonction reine de l'arbitrage
Dépendances: —
