# US22.7.1 — Import de plannings MS Project

**En tant que** chef de projet
**Je veux** importer un planning MS Project (.mpp et/ou .xml MSPDI) : tâches, dépendances, ressources, calendriers, baselines
**Afin de** reprendre l'existant sans ressaisie (condition d'adoption)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fichier .xml MSPDI (ou .mpp), when je l'importe, then WBS, dépendances typées, contraintes, calendriers et ressources sont restitués | ⬜ |
| Given un import, when des éléments ne sont pas mappables, then un rapport d'import liste ce qui a été approximé | ⬜ |
| Security : le fichier importé est validé/assaini avant traitement | ⬜ |

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
