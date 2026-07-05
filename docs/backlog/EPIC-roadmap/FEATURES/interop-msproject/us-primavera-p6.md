# US22.7.4 — Import/export Primavera P6 (XER / P6 XML)

**En tant que** chef de projet
**Je veux** importer et exporter des plannings Oracle Primavera P6 (formats .xer et P6 XML)
**Afin de** interopérer avec l'outil de référence des grands projets d'ingénierie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fichier .xer ou P6 XML, when je l'importe, then WBS, activités, relations, contraintes, calendriers et ressources sont restitués | ⬜ |
| Given un plan PIVOT, when je l'exporte en P6 XML, then il se ré-ouvre dans Primavera sans perte structurante | ⬜ |
| Given des champs propres à P6 non mappables, then un rapport d'import les liste | ⬜ |

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: Backlog
Profils: Grand groupe, Publique, État
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
