# US25.3.5 — Validation d'une demande d'achat

**En tant que** responsable des marchés (vérificateur / valideur)
**Je veux** approuver une demande d'achat à l'étape dont je suis responsable
**Afin de** faire progresser la DA dans son workflow jusqu'à sa validation finale

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA rattachée à une UNITE et en attente de mon action, when je clique sur le bouton « Approuver », then une pop-up s'affiche avec un champ commentaire multi-lignes non obligatoire et la DA passe à l'étape suivante du workflow | ⬜ |
| Given l'approbation de la dernière étape par le valideur final, when la validation est effectuée, then le statut passe à « Validé » et la colonne « Acteur attendu » est vide | ⬜ |
| Given une DA passée au statut « Validé », when la coche d'envoi de mail est activée, then un mail est envoyé au prescripteur | ⬜ |
| Error : given un utilisateur qui n'a pas le rôle CM/vérificateur/valideur attendu sur l'étape courante, when il tente d'approuver, then l'action est refusée | ⬜ |
| Security/Gouvernance : validation disponible pour V/CM/A sur la bonne étape et refusée à P (NON/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le refus d'une DA est couvert par l'US Refus de la DA.
- La configuration des étapes et des acteurs du workflow est couverte par les US de paramétrage du workflow.

## Notes d'implémentation
- Écran d'accueil / sous-onglet « Demandes à valider » (module WRAP/OPDN), bouton « Approuver ».
- DA rattachée à une UNITE ; pop-up avec commentaire non obligatoire ; statut final « Validé » ; « Acteur attendu » vide si Validé ; mail au prescripteur conditionné par la coche.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
