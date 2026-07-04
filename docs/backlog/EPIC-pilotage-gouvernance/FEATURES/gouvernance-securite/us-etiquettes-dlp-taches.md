# US35.1.6 — Étiquettes et DLP sur tâches

**En tant que** DSI
**Je veux** appliquer des étiquettes de confidentialité au niveau tâche avec des actions DLP (blocage copie/export/impression) qui suivent la tâche partout
**Afin de** protéger les informations sensibles jusqu'au niveau le plus fin

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche, when un utilisateur lui applique une étiquette de confidentialité, then les actions DLP associées s'appliquent partout où la tâche apparaît | ⬜ |
| Le blocage copie/export/impression suit la tâche à travers les vues et exports | ⬜ |
| Error : given une action interdite par l'étiquette, system la bloque et journalise la tentative | ⬜ |
| Security/Gouvernance : les étiquettes et l'application des politiques DLP sont tracées | ⬜ |

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: Backlog
Source: PP-043 · MoSCoW: Could · Lot: Lot 3 · Origine: Différenciant MS
Justification: Dossier §6.3 : marqueur de conformité rare
Dépendances: —
