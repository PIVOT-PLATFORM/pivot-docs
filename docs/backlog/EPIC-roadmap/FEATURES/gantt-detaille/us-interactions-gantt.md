# US22.4.10 — Interactions Gantt directes

**En tant que** chef de projet
**Je veux** manipuler le Gantt à la souris : déplacer/redimensionner les barres, lier par glisser, zoomer l'échelle de temps, ajuster l'avancement à la poignée
**Afin de** éditer le planning aussi fluidement qu'un client lourd, dans le navigateur

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une barre, when je la déplace ou la redimensionne, then dates/durée se mettent à jour et le moteur recalcule les dépendances | ⬜ |
| Given deux barres, when je tire de l'une à l'autre, then un lien de dépendance est créé | ⬜ |
| Given l'échelle de temps, when je zoome (jour→semaine→mois→trimestre), then le rendu s'adapte sans perte de contexte | ⬜ |

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Critical
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
