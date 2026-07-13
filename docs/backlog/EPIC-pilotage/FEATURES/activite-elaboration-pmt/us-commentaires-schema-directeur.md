# US18.17.6 — Commentaires schéma directeur

**En tant que** chef de projet
**Je veux** saisir un commentaire de schéma directeur dans un champ texte limité à 400 caractères
**Afin de** justifier l'activité en l'absence de schéma directeur

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la coche « Présence schéma directeur » à faux, when j'affiche l'écran, then le champ « Commentaires schéma directeur » est affiché et obligatoire | ⬜ |
| Given la coche « Présence schéma directeur » à vrai, when j'affiche l'écran, then le champ « Commentaires schéma directeur » n'est pas affiché | ⬜ |
| Given le champ « Commentaires schéma directeur », when je saisis du texte, then la saisie est limitée à 400 caractères | ⬜ |
| Error : given le champ obligatoire vide à l'enregistrement alors que « Présence schéma directeur » = faux, system bloque l'enregistrement | ⬜ |
| Security/Gouvernance : seul un chef de projet habilité sur l'activité peut saisir le commentaire | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le pilotage de la coche « Présence schéma directeur » est couvert par l'US dédiée.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, champ texte 400 caractères.
- Affichage et obligation conditionnés à « Présence schéma directeur » = faux.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
