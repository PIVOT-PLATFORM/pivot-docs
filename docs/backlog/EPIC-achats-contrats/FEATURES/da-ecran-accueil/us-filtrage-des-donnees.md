# US25.3.14 — Filtrage des données

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** filtrer les demandes d'achat via le bouton « Filtrer »
**Afin de** restreindre la liste aux DA correspondant à mes critères

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un onglet de demandes d'achat, when je clique sur le bouton « Filtrer », then un panneau de filtres s'ouvre avec les critères Numéro de DA, Fournisseur, Direction, Division, Unité, Type d'achat, Projet, Organisation, Avenant au contrat, Finalité métier, Valideur principal, Valideur suppléant | ⬜ |
| Given un ou plusieurs critères renseignés, when je clique sur le bouton vert « Filtrer » en bas du panneau, then la liste est restreinte aux DA correspondant aux critères combinés | ⬜ |
| Given des filtres actifs, when le panneau est affiché, then le nombre de filtres actifs est indiqué dans le titre et le bouton « Tout effacer » (en haut) permet de les réinitialiser | ⬜ |
| Error : given une combinaison de filtres sans résultat, when je filtre, then la liste s'affiche vide sans erreur | ⬜ |
| Security/Gouvernance : le filtrage reste borné au périmètre de visibilité de l'utilisateur ; disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La recherche texte libre est couverte par l'US Barre de recherche.

## Notes d'implémentation
- Écran d'accueil des demandes d'achats (module WRAP/OPDN), bouton « Filtrer ».
- Filtres combinables ; bouton vert « Filtrer » en bas, « Tout effacer » en haut, compteur de filtres actifs dans le titre.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
