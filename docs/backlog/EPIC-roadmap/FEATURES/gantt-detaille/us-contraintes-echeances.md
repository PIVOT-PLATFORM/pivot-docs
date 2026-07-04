# US22.4.4 — Contraintes de date & échéances

**En tant que** chef de projet
**Je veux** poser des contraintes (Dès que possible/Le plus tard/Doit commencer le/Doit finir le/Ne pas commencer avant…) et des échéances (deadlines)
**Afin de** refléter les engagements externes comme dans MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une contrainte de type « Doit finir le », when l'ordonnancement s'exécute, then elle est respectée ou un conflit est signalé | ⬜ |
| Given une échéance (deadline), when la date de fin la dépasse, then un indicateur d'alerte apparaît sans bloquer | ⬜ |
| Error : given une contrainte incompatible avec une dépendance, then le conflit est explicité | ⬜ |

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
