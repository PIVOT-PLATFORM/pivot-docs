# US22.4.10c — Virtualisation du rendu et édition clavier accessible

**En tant que** chef de projet
**Je veux** que le Gantt reste fluide sur de très grands plannings et que chaque interaction souris dispose d'un équivalent clavier accessible
**Afin de** éditer un plan de 10 000+ tâches sans latence et sans dépendre exclusivement de la souris

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un planning de 10 000+ tâches, when je fais défiler ou zoomer le Gantt, then seules les barres visibles sont rendues (virtualisation) et l'interaction reste fluide (≥ 30 fps, EN22.2) | ⬜ |
| Given une tâche sélectionnée au clavier, when j'ouvre le formulaire d'édition accessible, then je peux modifier ses dates, sa durée, ses liens de dépendance et son pourcentage d'avancement sans souris | ⬜ |
| Given le focus sur le Gantt, when je navigue à la flèche/tabulation, then le focus se déplace de tâche en tâche de manière prévisible et la tâche focalisée est ramenée dans le viewport (virtualisation transparente pour le clavier) | ⬜ |
| Error : given une saisie invalide dans le formulaire d'édition clavier (date de fin antérieure au début, lien créant un cycle, avancement hors [0, 100]), then la modification est rejetée et l'erreur est annoncée via une région ARIA `live` | ⬜ |
| Security : seul un utilisateur membre du projet avec un rôle d'édition peut valider une modification depuis le formulaire clavier ; un non-membre reçoit 404 (isolation multi-tenant), un membre en lecture seule reçoit 403, la navigation clavier et la consultation restant possibles | ⬜ |
| A11y : le Gantt est entièrement pilotable au clavier (navigation, sélection, édition), chaque équivalent clavier reproduit exactement le résultat de l'interaction souris correspondante, et les changements d'état sont annoncés aux lecteurs d'écran ; conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le déplacement/redimensionnement/lien à la souris et le zoom/poignée à la souris : couverts par US22.4.10a et US22.4.10b (cette US fournit leur équivalent clavier et la virtualisation du rendu)
- Le moteur de virtualisation et de recalcul incrémental lui-même : fourni par EN22.2 (cette US en consomme les capacités côté interaction)
- La co-édition temps réel multi-utilisateurs et l'undo/redo : couverts par EN22.2

## Notes d'implémentation
- La virtualisation s'appuie sur EN22.2 : ne dessiner que les barres du viewport, mais garder un modèle de focus clavier stable même sur les tâches non rendues (le défilement virtuel doit ramener la tâche focalisée dans le viewport)
- Le formulaire d'édition clavier doit passer par le même moteur de validation/recalcul que l'édition directe (EN22.1), pour garantir l'équivalence stricte entre modification souris et modification clavier
- Les annonces d'état (dates modifiées, lien créé, avancement mis à jour, erreurs) utilisent une région ARIA `live` unique et coordonnée pour éviter les annonces contradictoires pendant une interaction rapide

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Dépendances: EN22.1 (modèle temporel unique), EN22.2 (performance & collaboration web du Gantt — virtualisation), US22.4.10a (interactions souris à rendre accessibles), US22.4.10b (zoom et poignée d'avancement à rendre accessibles)
