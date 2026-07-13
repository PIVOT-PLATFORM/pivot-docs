# US18.17.18 — Zone Activités liées

**En tant que** chef de projet
**Je veux** gérer les liaisons entre activités dans la zone « Activités liées »
**Afin de** relier une activité Groupement/Transverse à ses activités Build/Run et naviguer entre elles

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité Groupement ou Transverse, when je clique sur le bouton « + Ajouter », then une pop-up de recherche d'activités Build/Run s'ouvre avec recherche sur les colonnes du tableau, sélection un à un | ⬜ |
| Given une activité liée, when je clique sur l'icône « corbeille », then la liaison est supprimée | ⬜ |
| Given une activité liée, when je clique dessus, then elle s'ouvre dans un nouvel onglet | ⬜ |
| Given une activité de type Build ou Run, when j'affiche la zone, then elle affiche seulement les activités « mères » | ⬜ |
| Error : given aucune activité liée, system masque le label de la zone « Activités liées » | ⬜ |
| Security/Gouvernance : seul un chef de projet habilité sur l'activité peut ajouter ou supprimer une liaison | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contenu détaillé du tableau de recherche des activités est couvert par les US de recherche/liste d'activités.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, zone facultative « Activités liées ».
- Groupement/Transverse : bouton « + Ajouter » (pop-up recherche Build/Run, sélection un à un, suppression via corbeille, ouverture nouvel onglet). Build/Run : affichage des seules activités « mères ». Label masqué si aucune liaison.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
