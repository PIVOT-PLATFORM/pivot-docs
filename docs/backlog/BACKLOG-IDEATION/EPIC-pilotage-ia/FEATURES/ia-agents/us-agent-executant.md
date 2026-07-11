# US34.1.2 — Agent exécutant

**En tant que** chef de projet
**Je veux** un agent IA membre d'équipe capable d'assigner des tâches standard, générer des rapports d'état, faire des relances et produire des plans à rebours (workback)
**Afin de** déléguer les tâches répétitives de coordination et fluidifier le suivi

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when l'agent est sollicité, then il peut assigner des tâches standard, générer un rapport d'état et déclencher des relances | ⬜ |
| Given une date cible, when le chef de projet demande un plan à rebours, then l'agent produit un workback détaillant les jalons intermédiaires | ⬜ |
| Error : given une action hors de son périmètre autorisé (ex. assignation à une personne hors équipe, modification budgétaire), system bloque l'agent, ne l'exécute pas et journalise le refus | ⬜ |
| Security : chaque action de l'agent (assignation, relance, rapport, workback) nécessite une validation humaine préalable ou une autorisation de périmètre explicite ; toute action est journalisée avec horodatage, auteur (agent) et déclencheur pour permettre l'audit et le rollback | ⬜ |
| A11y : le rapport d'état et le plan à rebours générés sont consultables au clavier et restituables par lecteur d'écran (structure sémantique, pas uniquement visuelle) | ⬜ |

## Hors périmètre
- L'agent ne prend aucune décision stratégique (arbitrage priorité, réallocation budgétaire, décision de go/no-go) : ces actions restent de la responsabilité du chef de projet.
- Pas de définition ici du moteur de règles déterminant le "périmètre autorisé" de l'agent (couvert par un enabler dédié à la gouvernance des agents IA).
- Pas d'intégration avec des outils tiers de messagerie pour les relances (canal de relance = notifications Pivot uniquement dans cette US).

## Notes d'implémentation
- Repose sur le schéma `pilotage` (Flyway) pour la persistance des tâches assignées et des workbacks, avec FK vers `public.teams.id`.
- Le refus d'action hors périmètre doit être journalisé dans la même table d'audit que les actions exécutées, pour permettre une revue a posteriori des tentatives bloquées.
- Le calcul du plan à rebours doit s'appuyer sur les dépendances et durées déjà modélisées dans le plan de projet existant (pas de nouveau moteur d'ordonnancement).

---
Item Type: US · Parent: F34.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: PP-041 · MoSCoW: Could · Lot: Lot 4 · Origine: Différenciant MS (Project Manager agent)
Profils: PME, Grand groupe
Justification: Dossier §6.3 : le plus abouti de la catégorie généraliste
Dépendances: —
