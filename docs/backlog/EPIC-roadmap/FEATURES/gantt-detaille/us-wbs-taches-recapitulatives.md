# US22.4.1 — WBS : tâches & tâches récapitulatives

**En tant que** chef de projet
**Je veux** structurer le projet en arborescence (WBS) avec hiérarchisation (indent/outdent), tâches récapitulatives et numérotation WBS
**Afin de** organiser le travail comme dans MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une liste de tâches, when j'abaisse/relève le niveau (indent/outdent), then la hiérarchie WBS et la numérotation se recalculent | ⬜ |
| Given une tâche récapitulative, when ses sous-tâches changent, then ses dates/durée/avancement s'agrègent automatiquement | ⬜ |
| Given une tâche, when je la réordonne, then l'ordre et le WBS restent cohérents | ⬜ |

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Critical
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
