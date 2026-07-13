# US18.14.1 — Affichage de la liste des activités

**En tant que** utilisateur final
**Je veux** afficher la liste des activités au moment de rechercher une activité
**Afin de** consulter et ouvrir les activités correspondant à mon besoin

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran de recherche, when je clique sur « Rechercher une activité », then une image incite à filtrer/rechercher | ⬜ |
| Given une ligne d'activité, when je clique dessus, then l'activité s'ouvre en modification | ⬜ |
| Given la liste par défaut, when elle s'affiche, then les activités archivées ne sont pas affichées | ⬜ |
| Given l'affichage de la Météo, when la liste s'affiche, then la Météo apparaît en icônes dans le tableau et en textes colorés dans les vues détaillées | ⬜ |
| Given le tableau des activités, when il s'affiche, then les colonnes sont identiques à celles de l'écran Portefeuille | ⬜ |
| Error : given aucune activité correspondante, system affiche un tableau vide sans erreur | ⬜ |
| Security/Gouvernance : seul un utilisateur habilité peut consulter la liste des activités | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'affichage des activités archivées (US dédiée).

## Notes d'implémentation
- Module pilotage (OPDN), écran « Rechercher une activité ».
- Colonnes identiques à l'écran Portefeuille ; Météo icônes (tableau) / textes colorés (détail).

---
Item Type: US · Parent: F18.14 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.10 Recherche d'activités
Dépendances: —
