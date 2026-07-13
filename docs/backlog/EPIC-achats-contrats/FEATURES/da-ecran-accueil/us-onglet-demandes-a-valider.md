# US25.3.8 — Onglet « Demandes à valider »

**En tant que** responsable des marchés (valideur principal)
**Je veux** consulter l'onglet « Demandes à valider »
**Afin de** traiter les demandes d'achat qui m'attendent en tant que valideur principal

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet « Demandes à valider », when je l'ouvre, then je vois les DA à valider en tant que valideur principal, avec les colonnes N° et Résumé, Prescripteur, Date début, Date fin, Type, Montant, Statut | ⬜ |
| Given l'onglet « Demandes à valider », when des DA m'attendent, then le nombre de demandes à valider est affiché à côté de l'onglet | ⬜ |
| Error : given aucune DA en attente de ma validation, when j'ouvre l'onglet, then la liste s'affiche vide et le compteur indique 0 | ⬜ |
| Security/Gouvernance : chaque valideur ne voit que les DA où il est valideur principal ; onglet disponible pour V/CM/A et refusé à P (NON/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les actions Approuver / Refuser sont couvertes par les US Validation / Refus de la DA.

## Notes d'implémentation
- Écran d'accueil, sous-onglet « Demandes à valider » (module WRAP/OPDN).
- Compteur du nombre de DA affiché à côté de l'onglet ; colonne Prescripteur présente (à la place de Acteur attendu).

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
