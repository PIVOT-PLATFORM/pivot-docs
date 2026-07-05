# US22.8.5 — Overlays inter-modules Pilotage (risques, budget, décisions, marchés)

**En tant que** PMO
**Je veux** superposer sur la roadmap/Gantt les objets des autres modules du domaine via le bus PIVOT et des deep-links
**Afin de** obtenir une vue de pilotage composée sans coupler les modules (ADR-008)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le module Risque (E21), when je l'active en overlay, then les risques se positionnent sur les tâches/jalons concernés (via project_ref, pas de FK) | ⬜ |
| Given les modules Budget (E26), Décisions/ADR (E24), Commande publique (E25), when je les active, then jalons financiers, décisions et échéances de marché apparaissent sur la timeline | ⬜ |
| Given un overlay, when je clique un élément, then un deep-link ouvre le module source filtré | ⬜ |
| Error : given un overlay référençant un objet supprimé ou inaccessible côté module source (deep-link cassé), when la roadmap l'affiche, then l'élément est signalé indisponible sans faire échouer le rendu des autres overlays | ⬜ |
| Security : un overlay n'affiche que les éléments (risques, budget, décisions, marchés) sur lesquels l'utilisateur a un droit de lecture dans le module source ; le deep-link revérifie les permissions à l'ouverture plutôt que de faire confiance à l'affichage roadmap | ⬜ |
| A11y : chaque overlay est identifiable indépendamment de la couleur (icône/libellé de type) et les éléments superposés restent atteignables au clavier avec un intitulé explicite pour lecteur d'écran | ⬜ |

## Hors périmètre
- Édition des objets superposés (risque, ligne budgétaire, décision, marché) depuis la roadmap : strictement en lecture, l'édition reste dans le module source
- Agrégations/calculs croisés entre overlays (ex. corrélation risque-budget automatique) : cette US couvre l'affichage positionné, pas l'analyse transverse
- Activation des overlays par profil non listé (Grand groupe/Publique/État uniquement, cf. frontmatter) : les profils PME ne sont pas dans le périmètre de cette US

## Notes d'implémentation
- Chaque overlay consomme le bus d'événements PIVOT + un `project_ref` (ou équivalent) pour se positionner sur la timeline — aucune FK inter-modules (ADR-006/008), conformément au principe de domaines composables
- Le module Pilotage ne connaît pas le schéma interne des modules Risque/Budget/Décisions/Commande publique : seule une projection minimale (libellé, date, type, deep-link) doit transiter
- Chaque overlay doit pouvoir être activé/désactivé indépendamment (les modules E21/E24/E25/E26 ne sont pas tous forcément activés pour un tenant donné)
- Dépend d'EN22.1 pour le positionnement sur l'axe temporel unique

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Profils: Grand groupe, Publique, État
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · bus PIVOT (ADR-008)
