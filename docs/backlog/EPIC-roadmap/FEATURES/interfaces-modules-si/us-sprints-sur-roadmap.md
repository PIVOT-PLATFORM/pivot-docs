# US22.8.1 — Afficher les sprints sur la roadmap

**En tant que** PO
**Je veux** superposer les sprints/itérations d'un module agile (via le bus PIVOT) sur la roadmap et le Gantt
**Afin de** aligner la vision cascade (jalons) et la cadence agile (sprints)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un module agile publiant des sprints, when je l'active sur un projet, then les sprints s'affichent en bandes datées sur la timeline (deep-link, pas de FK — ADR-006) | ⬜ |
| Given un jalon proche d'une fin de sprint, when je consulte la roadmap, then l'alignement jalon/sprint est visible | ⬜ |
| Given un sprint modifié côté agile, when l'événement est reçu, then la bande se met à jour | ⬜ |
| Error : given un événement de sprint reçu pour un module non activé ou un projet inconnu (deep-link cassé), when il est traité, then il est rejeté/journalisé sans bloquer l'affichage de la roadmap | ⬜ |
| Security : l'affichage d'une bande de sprint respecte les permissions du projet cible ; un utilisateur sans accès au module agile source ne voit que la bande (dates), pas le contenu du sprint, et le deep-link revérifie ses droits à l'ouverture | ⬜ |
| A11y : les bandes de sprint superposées à la timeline sont identifiables au clavier et par lecteur d'écran (libellé, dates de début/fin annoncés, pas de distinction par la seule couleur) | ⬜ |

## Hors périmètre
- Édition des sprints depuis la roadmap (lecture seule côté pilotage — la modification se fait dans le module agile source)
- Création ou pilotage de sprints (backlog, vélocité, burndown) : hors E22, propriété du module agile
- Alignement automatique des jalons sur les fins de sprint (US décrit la visibilité, pas un recalage automatique du planning)

## Notes d'implémentation
- Consommation exclusivement via le bus d'événements PIVOT (topic sprint côté module agile) + deep-link vers le module source — aucune FK inter-modules (ADR-006/008)
- Le mapping projet Pilotage ↔ module agile se fait par référence logique (ex. `project_ref`), pas par jointure directe
- Dépend de EN22.1 (modèle temporel unique) pour positionner la bande sur la même timeline que jalons/tâches, et de EN22.3 pour le socle bus/deep-links
- Prévoir l'absence du module agile (non activé pour le tenant) : la fonctionnalité doit se dégrader proprement (pas de bande, pas d'erreur visible)

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: product-owner
Profils: PME, Grand groupe, Privée sous droit public
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · EN22.3 · bus PIVOT
