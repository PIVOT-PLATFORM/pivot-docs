# US22.5.2 — Courbes de charge & sur-affectation

**En tant que** chef de projet
**Je veux** visualiser la charge par ressource et détecter les sur-affectations
**Afin de** repérer les goulots avant qu'ils ne dérapent

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des affectations, when une ressource dépasse sa capacité sur une période, then elle est signalée en sur-affectation | ⬜ |
| Given une ressource, when je consulte sa courbe de charge (utilisation), then la répartition période par période est affichée | ⬜ |
| Error : given une ressource sans capacité renseignée, when sa charge est calculée, then le système signale la capacité manquante plutôt que d'afficher un taux de sur-affectation erroné | ⬜ |
| Security : la courbe de charge d'une ressource (personne) n'est visible que par les rôles habilités (chef de projet, PMO) du projet/portefeuille concerné, pas par l'ensemble des utilisateurs du domaine `pilotage` | ⬜ |
| A11y : la courbe de charge (graphique) fournit une alternative textuelle/tabulaire des valeurs par période, navigable au clavier (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Le nivellement (résolution automatique/manuelle des sur-affectations) — couvert par US22.5.3.
- L'affectation initiale des ressources aux tâches — couverte par US22.5.1.
- Le calcul des coûts liés à la charge — couvert par US22.5.4.

## Notes d'implémentation

- La charge se calcule à partir des affectations (US22.5.1) rapprochées de la capacité de la ressource (calendrier ouvré, EN22.3) sur chaque période du modèle temporel unique (EN22.1).
- Fonctionnalité réservée aux profils Grand groupe/Publique/État (cf. frontmatter `Profils`) — pas d'affichage pour les profils TPE/PME en roadmap rapide.

---
Item Type: US · Parent: F22.5 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Profils: Grand groupe, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
