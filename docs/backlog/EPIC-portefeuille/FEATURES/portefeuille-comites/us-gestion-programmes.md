# US23.2.5 — Gestion de programmes

**En tant que** PMO
**Je veux** gérer des programmes descendants avec création et synchronisation de projets depuis un programme
**Afin de** structurer les initiatives multi-projets et propager les changements du programme vers ses projets

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un programme, when le PMO crée des projets rattachés, then ils héritent du contexte du programme | ⬜ |
| Les modifications au niveau programme sont synchronisées vers les projets descendants | ⬜ |
| Error : given un conflit de synchronisation, system le signale et n'écrase pas silencieusement le projet | ⬜ |
| Security/Gouvernance : la hiérarchie programme/projets respecte les périmètres (un projet descendant reste rattaché à l'équipe/tenant qui le détient) et est traçable | ⬜ |
| A11y : la vue hiérarchique programme/projets est conforme RGAA 4 / WCAG 2.1 AA (navigation clavier de l'arborescence) | ⬜ |

## Hors périmètre
- La simulation d'impacts (charge, budget, trésorerie) lors de la création/synchronisation de projets relève de US23.2.7 (scénarios what-if).
- La gestion des conflits de synchronisation se limite à la détection et au signalement ; la résolution automatique des conflits n'est pas couverte (résolution manuelle par le PMO).
- Le pilotage de l'alignement stratégique des programmes relève de US23.2.6.

## Notes d'implémentation
- La relation programme → projets est une hiérarchie descendante : le programme porte le contexte partagé (objectifs, contraintes), chaque projet enfant en hérite à la création.
- La synchronisation programme → projets doit être un mécanisme explicite (pas de propagation silencieuse) pour permettre la détection de conflit exigée par l'AC erreur.
- Backend `pivot-pilotage-core`, schéma `pilotage` ; s'appuie sur l'entité `Project` (E22) étendue d'un rattachement programme.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Source: PP-038 · MoSCoW: Could · Lot: Lot 3 · Origine: Différenciant Sciforma
Profils: Grand groupe, État
Justification: Dossier §6.2
Dépendances: —
