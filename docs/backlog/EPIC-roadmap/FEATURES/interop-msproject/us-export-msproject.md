# US22.7.2 — Export MS Project & Excel

**En tant que** chef de projet
**Je veux** exporter le plan au format MS Project (.xml MSPDI) et en Excel
**Afin de** interopérer avec l'écosystème MS Project et éviter le lock-in

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un plan, when je l'exporte en .xml MSPDI, then il se ré-ouvre dans MS Project sans perte majeure (tâches/dép./ressources/calendriers) | ⬜ |
| Given un aller-retour import→export, when je le compare, then aucune donnée structurante n'est perdue | ⬜ |

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
