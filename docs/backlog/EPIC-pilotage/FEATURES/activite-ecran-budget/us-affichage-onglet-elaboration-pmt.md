# US18.18.3 — Affichage de l'onglet Élaboration PMT

**En tant que** contrôleur de gestion SI (profil GPP-CGO)
**Je veux** consulter et, selon mon profil, modifier l'onglet Élaboration PMT
**Afin de** élaborer le plan moyen terme budgétaire de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet Élaboration PMT, when il s'affiche, then les données sont découpées par compte de façon identique à l'onglet PDS Pluriannuel, avec les boutons de l'écran | ⬜ |
| Given un utilisateur du groupe GPP-CGO (groupe DIVNUM-LISTE-BUDGET-OPPA), when il consulte l'onglet, then il peut modifier, créer et supprimer des lignes budgétaires | ⬜ |
| Given une copie de PMT, when elle est réalisée, then le nom du PMT sélectionné est affiché | ⬜ |
| Given l'ouverture de l'onglet, when le carrousel s'initialise, then la première année affichée est l'année courante + 1 | ⬜ |
| Error : given un utilisateur hors groupe GPP-CGO, system interdit la modification/création/suppression de lignes (lecture seule) | ⬜ |
| Security/Gouvernance : seuls les profils GPP-CGO (groupe DIVNUM-LISTE-BUDGET-OPPA) peuvent modifier/créer/supprimer des lignes | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'onglet Élaboration PMT est post-MVP.
- Le mécanisme de copie/génération du PMT lui-même.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglet Élaboration PMT (post-MVP).
- Droit d'écriture réservé au groupe GPP-CGO DIVNUM-LISTE-BUDGET-OPPA ; à l'ouverture première année = année courante + 1 ; découpage par compte identique au PDS.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
