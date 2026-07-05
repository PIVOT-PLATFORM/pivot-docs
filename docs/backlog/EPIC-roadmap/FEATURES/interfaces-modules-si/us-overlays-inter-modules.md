# US22.8.5 — Overlays inter-modules Pilotage (risques, budget, décisions, marchés)

**En tant que** PMO
**Je veux** superposer sur la roadmap/Gantt les objets des autres modules du domaine via le bus PIVOT et des deep-links
**Afin de** obtenir une vue de pilotage composée sans coupler les modules (ADR-008)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le module Risque (E21), when je l'active en overlay, then les risques se positionnent sur les tâches/jalons concernés (via project_ref, pas de FK) | ⬜ |
| Given les modules Budget (E26), Décisions/ADR (E24), Commande publique (E25), when je les active, then jalons financiers, décisions et échéances de marché apparaissent sur la timeline | ⬜ |
| Given un overlay, when je clique un élément, then un deep-link ouvre le module source filtré | ⬜ |

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Rôle: officier-responsable-pmo
Profils: Grand groupe, Publique, État
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · bus PIVOT (ADR-008)
