# US25.3.9 — Onglet « Demandes à valider - suppléant »

**En tant que** responsable des marchés (valideur suppléant)
**Je veux** consulter l'onglet « Demandes à valider - suppléant »
**Afin de** traiter les demandes d'achat qui m'attendent en tant que valideur suppléant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet « Demandes à valider - suppléant », when je l'ouvre, then je vois les DA qui me sont adressées en tant que valideur suppléant | ⬜ |
| Given la liste des DA à valider en suppléant, when je l'affiche, then les colonnes incluent le Valideur principal et le Prescripteur | ⬜ |
| Error : given aucune DA adressée en tant que suppléant, when j'ouvre l'onglet, then la liste s'affiche vide sans erreur | ⬜ |
| Security/Gouvernance : chaque valideur suppléant ne voit que les DA où il est désigné suppléant ; onglet disponible pour V/CM/A et refusé à P (NON/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les actions Approuver / Refuser sont couvertes par les US Validation / Refus de la DA.

## Notes d'implémentation
- Écran d'accueil, sous-onglet « Demandes à valider - suppléant » (module WRAP/OPDN).
- Colonnes incluant Valideur principal et Prescripteur pour distinguer la délégation.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
