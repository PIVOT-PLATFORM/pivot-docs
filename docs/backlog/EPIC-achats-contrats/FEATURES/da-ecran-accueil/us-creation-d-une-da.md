# US25.3.1 — Création d'une demande d'achat

**En tant que** acheteur informatique (prescripteur)
**Je veux** créer une nouvelle demande d'achat depuis l'écran d'accueil
**Afin de** initier une demande et la renseigner avant de lancer son workflow

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran d'accueil des demandes d'achats, when je clique sur le bouton « + Nouvelle Demande », then une nouvelle DA est créée à l'état « Brouillon » | ⬜ |
| Given le formulaire de la DA, when je l'affiche, then les champs obligatoires (Num DA, Montant, Date début, Date fin, type de DA, num contrat, résumé, métier…) sont marqués d'une étoile rouge | ⬜ |
| Given le formulaire de la DA, when je sélectionne le prescripteur, then certains champs complémentaires ne s'affichent qu'après cette sélection | ⬜ |
| Error : given une DA en cours de saisie, when je sors de l'écran sans enregistrer, then les données saisies sont auto-enregistrées et restituées à mon retour | ⬜ |
| Security/Gouvernance : création de DA disponible pour P/CM/A et refusée à V (OUI/NON/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail des règles de saisie de chaque champ (format Montant, plafonds…) est couvert par les US de l'écran de la demande d'achat.
- Le déroulé du workflow de validation est couvert par les US Validation / Refus.

## Notes d'implémentation
- Écran d'accueil des demandes d'achats (module WRAP/OPDN), bouton « + Nouvelle Demande ».
- État initial « Brouillon » ; champs obligatoires signalés par une étoile rouge ; affichage conditionnel de certains champs après sélection du prescripteur ; auto-sauvegarde au retour sur une DA non enregistrée.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
