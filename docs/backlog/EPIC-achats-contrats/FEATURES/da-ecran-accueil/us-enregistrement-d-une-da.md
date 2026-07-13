# US25.3.2 — Enregistrement d'une demande d'achat

**En tant que** acheteur informatique (prescripteur)
**Je veux** enregistrer ma demande d'achat en cours de saisie
**Afin de** conserver les données renseignées à l'état « Brouillon »

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA en cours de saisie, when je clique sur le bouton vert « Enregistrer » situé en haut à droite, then la DA est enregistrée au statut « Brouillon » | ⬜ |
| Given une DA enregistrée, when je consulte son statut, then il reste « Brouillon » tant que le workflow n'est pas lancé | ⬜ |
| Error : given un utilisateur qui n'est ni propriétaire ni administrateur ayant les droits sur l'unité/division/direction, when il tente d'enregistrer la DA, then l'action est refusée | ⬜ |
| Security/Gouvernance : seul le propriétaire de la DA (ou un administrateur ayant les droits sur l'unité/division/direction) peut l'enregistrer ; disponible pour P/A et refusé à V/CM (OUI/NON/NON/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contrôle des champs obligatoires à la saisie est couvert par l'US de création / les US de champs.
- Le lancement du workflow est couvert par l'US Statut « En cours ».

## Notes d'implémentation
- Écran d'accueil / écran de la demande d'achat (module WRAP/OPDN), bouton vert « Enregistrer » en haut à droite.
- Statut résultant « Brouillon » ; habilitation propriétaire ou admin sur l'unité/division/direction.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
