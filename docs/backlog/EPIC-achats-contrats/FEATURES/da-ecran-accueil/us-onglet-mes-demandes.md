# US25.3.7 — Onglet « Mes demandes »

**En tant que** acheteur informatique (prescripteur)
**Je veux** consulter l'onglet « Mes demandes »
**Afin de** suivre mes propres demandes d'achat et leur statut

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet « Mes demandes », when je l'ouvre, then je vois uniquement mes propres DA et leur statut, avec les colonnes N° et Résumé, Acteur attendu, Date début, Date fin, Type, Montant, Statut | ⬜ |
| Given l'onglet « Mes demandes », when il s'ouvre, then les DA sont triées par date de début (filtre non modifiable) et filtrées par ordre alphabétique de statut (Brouillon, En cours, Validé) | ⬜ |
| Given la liste affichée, when je clique sur l'en-tête d'une colonne autre que Date début, then la liste est triée sur cette colonne (toutes les colonnes sont triables sauf Date début) | ⬜ |
| Error : given un utilisateur sans aucune DA, when il ouvre l'onglet, then la liste s'affiche vide sans erreur | ⬜ |
| Security/Gouvernance : chaque utilisateur ne voit que ses propres DA ; onglet disponible pour P/CM/A et refusé à V (OUI/NON/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La recherche texte et le filtrage avancé sont couverts par les US Barre de recherche / Filtrage des données.

## Notes d'implémentation
- Écran d'accueil, sous-onglet « Mes demandes » (module WRAP/OPDN).
- Tri par défaut par date de début non modifiable ; tri secondaire alphabétique par statut ; colonnes triables sauf Date début.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
