# US25.2.2 — Définir son organisation

**En tant que** acheteur informatique (prescripteur)
**Je veux** choisir mon unité préférentielle dans mon profil
**Afin de** pré-remplir automatiquement l'organisation lors de la création d'une demande d'achat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given mon profil, when j'ouvre la liste déroulante « organisation », then je peux sélectionner mon unité préférentielle | ⬜ |
| Given une unité préférentielle définie, when je crée une demande d'achat, then l'organisation de la DA est pré-remplie avec cette unité | ⬜ |
| Given un agent détaché rattaché à plusieurs unités, when il définit son organisation, then il peut choisir parmi ses différentes unités | ⬜ |
| Error : given aucune unité préférentielle définie, system laisse l'organisation de la DA non pré-remplie sans bloquer la création | ⬜ |
| Security/Gouvernance : le choix ne sert qu'au prescripteur pour le pré-remplissage et ne modifie pas les droits issus du rattachement AD ; la liste est limitée aux unités du rattachement de l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La modification de l'organisation directement sur la demande d'achat (couverte par l'US de l'écran DA).

## Notes d'implémentation
- Liste déroulante dans le profil ; usage limité au pré-remplissage de l'organisation à la création d'une DA par le prescripteur.
- Exceptions pour les détachés rattachés à plusieurs unités.

---
Item Type: US · Parent: F25.2 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.2 Profil utilisateur & rattachement
Dépendances: —
