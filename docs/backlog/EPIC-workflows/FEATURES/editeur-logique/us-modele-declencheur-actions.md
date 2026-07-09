# US29.1.1 — Modèle déclencheur → actions

**En tant que** maker
**Je veux** créer des workflows multi-étapes avec un déclencheur et une ou plusieurs actions séquentielles
**Afin de** automatiser un processus de bout en bout sans intervention manuelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un workflow vide, when j'ajoute un déclencheur puis des actions, then les actions s'exécutent séquentiellement dans l'ordre défini | ⬜ |
| Given plusieurs actions enchaînées, when le déclencheur se produit, then chaque action reçoit la sortie de la précédente | ⬜ |
| Error : given une action en échec, system interrompt la séquence et journalise l'étape fautive | ⬜ |

---
Item Type: US · Parent: F29.1 · Module: automatisation · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Source: WF-001 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 6/6
Justification: Dossier §4 : présent chez les 6
Dépendances: —
