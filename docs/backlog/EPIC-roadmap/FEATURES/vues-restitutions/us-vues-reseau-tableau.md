# US22.6.1b — Vues Réseau (PERT) & Tableau/Kanban

**En tant que** utilisateur métier
**Je veux** basculer vers la vue Réseau (diagramme PERT) et la vue Tableau/Kanban du même projet
**Afin de** visualiser l'enchaînement des dépendances et piloter les tâches par statut (parité vues MS Project)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when j'ouvre la vue Réseau via le sélecteur multi-vues (US22.6.1a), then les tâches et leurs dépendances apparaissent en diagramme PERT à partir du même modèle (EN22.1) | ⬜ |
| Given des dépendances modifiées, when j'ouvre à nouveau ou rafraîchis la vue Réseau, then le diagramme se recalcule pour rester cohérent avec le chemin critique (calcul porté par US22.2.2, cette US n'assure que l'affichage) | ⬜ |
| Given un projet, when j'ouvre la vue Tableau/Kanban, then les tâches se répartissent en colonnes par statut et la charge de rendu reste fluide en forte volumétrie via la virtualisation (EN22.2) | ⬜ |
| Error : given un projet sans tâches ni dépendances exploitables, when j'ouvre la vue Réseau, then le système affiche un état vide explicite plutôt qu'un diagramme cassé | ⬜ |
| Security : given un utilisateur non membre de l'équipe rattachée au projet (EN18.2), when il tente d'ouvrir la vue Réseau ou Tableau via l'API, then le système répond 404 (non-membre et cross-tenant traités de façon identique) sans exposer tâches ni dépendances ; isolation multi-tenant garantie | ⬜ |
| Security : given un utilisateur authentifié membre du tenant mais sans droit de lecture sur ce projet, when il tente d'ouvrir la vue Réseau ou Tableau via l'API, then le système répond 403 (droit insuffisant, distinct du 404 de non-divulgation) sans exposer tâches ni dépendances | ⬜ |
| A11y : la vue Réseau expose une représentation navigable au clavier (parcours des nœuds et de leurs liens, alternative textuelle des dépendances) et la vue Tableau/Kanban est pilotable au clavier (déplacement de focus entre colonnes et cartes), conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Vues temporelles (Gantt, Chronologie, Calendrier) et socle du sélecteur multi-vues : couverts par US22.6.1a.
- Vues ressources (Feuille de ressources, Utilisation tâches/ressources) : couvertes par US22.6.1c.
- Le calcul du chemin critique lui-même : porté par US22.2.2 — cette US n'assure que l'affichage dans la vue Réseau.
- Déplacement de cartes entre colonnes déclenchant un changement de statut métier (workflow) : hors périmètre de la parité vues ; ici la vue Kanban est une restitution du statut existant.
- Colonnes, filtres, regroupements et tris : couverts par US22.6.2 ; export des vues : US22.6.4 et F22.7.

## Notes d'implémentation
- La vue Réseau et la vue Tableau consomment le même graphe temporel unique (EN22.1) via le sélecteur mutualisé introduit par US22.6.1a : aucun stockage de données propre à ces vues.
- La disponibilité de la vue Réseau peut être conditionnée par le profil d'organisation (altitude pilotée par E40 — une TPE/PME en roadmap rapide n'a pas nécessairement besoin du PERT).
- La vue Tableau doit rester compatible avec la virtualisation visée par EN22.2 pour les fortes volumétries.
- L'affichage du chemin critique dans la vue Réseau consomme le résultat calculé par US22.2.2 ; cette US ne recalcule rien côté client.

---
Item Type: US · Parent: F22.6 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: US22.6.1a (socle sélecteur multi-vues), EN22.1 (modèle temporel unique), EN22.2 (performance web), US22.2.2 (calcul du chemin critique, pour affichage), EN18.2 (guard d'accès projet)
