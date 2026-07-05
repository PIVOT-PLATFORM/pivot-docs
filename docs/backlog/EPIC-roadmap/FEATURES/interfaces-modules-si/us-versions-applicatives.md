# US22.8.2 — Afficher les versions applicatives (releases) sur la timeline

**En tant que** chef de projet
**Je veux** afficher les versions d'une Application (chaque Projet = une version, cf. EN18.9) en bandes de release avec leurs jalons de mise en production
**Afin de** visualiser la trajectoire de release d'un produit à travers ses versions

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une Application avec plusieurs Projet-versions, when j'ouvre sa vue release, then chaque version apparaît en bande datée avec son jalon de MEP | ⬜ |
| Given une version, when sa date de MEP change, then la timeline de l'Application se recalcule | ⬜ |
| Given plusieurs applications, when je filtre par application, then seules ses versions s'affichent | ⬜ |

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Rôle: chef-de-projet
Profils: Tous
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · EN18.9 (Application→Projet)
