# US25.5.8 — Filtrage des données

**En tant que** utilisateur final
**Je veux** filtrer la liste des contrats selon plusieurs critères
**Afin de** restreindre l'affichage aux contrats pertinents

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran des contrats, when je clique sur le bouton « Filtrer », then le panneau de filtres propose : Contrôle CM, Actif, Numéro de contrat, Libellé du contrat, Fournisseur, Segment d'achat, Direction, Division, Unité | ⬜ |
| Given le panneau de filtres, when je le parcours, then le bouton « Filtrer » se trouve en bas, le bouton « Tout effacer » en haut, et le nombre de filtres actifs est affiché | ⬜ |
| Given des filtres sélectionnés, when je clique sur « Filtrer », then la liste n'affiche que les contrats correspondant aux critères choisis | ⬜ |
| Error : given un clic sur « Tout effacer », system réinitialise l'ensemble des filtres actifs et remet le compteur à zéro | ⬜ |
| Security/Gouvernance : fonction disponible pour tous les rôles (P/V/CM/A) dans leur périmètre (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La recherche texte plein champ est couverte par l'US Barre de recherche.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), bouton « Filtrer ».
- Critères : Contrôle CM, Actif, Numéro de contrat, Libellé du contrat, Fournisseur, Segment d'achat, Direction, Division, Unité.
- Disposition : « Filtrer » en bas, « Tout effacer » en haut, compteur de filtres actifs.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
