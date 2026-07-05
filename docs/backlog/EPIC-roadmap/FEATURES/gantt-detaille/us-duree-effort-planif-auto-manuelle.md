# US22.4.2 — Durées, effort, planification auto vs manuelle

**En tant que** chef de projet
**Je veux** saisir durée/effort et choisir par tâche la planification automatique (pilotée par le moteur) ou manuelle
**Afin de** garder le contrôle là où c'est nécessaire, comme MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche en planification auto, when une dépendance ou un calendrier change, then ses dates se recalculent | ⬜ |
| Given une tâche en planification manuelle, when le moteur recalcule, then ses dates ne sont pas écrasées mais un écart est signalé | ⬜ |
| Given durée et effort, when les unités de ressource changent, then la relation travail = durée × unités est respectée | ⬜ |

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
