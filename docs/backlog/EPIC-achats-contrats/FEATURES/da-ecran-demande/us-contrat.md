# US25.4.13 — Contrat

**En tant que** acheteur informatique (prescripteur)
**Je veux** rechercher et sélectionner un contrat via une pop-up de recherche
**Afin de** rattacher la demande d'achat au contrat actif concerné

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Contrat, when je clique dessus, then une pop-up s'ouvre avec une barre de recherche et les colonnes « Informations contrat », « Contract Manager », « Structure » et « Fournisseur » | ⬜ |
| Given la recherche de contrat, when je saisis un critère, then je peux rechercher par numéro, libellé, Contract Manager, unité, division ou fournisseur, et seuls les contrats actifs de WRAP sont retournés (les inactifs n'apparaissent pas) | ⬜ |
| Given le besoin de créer un nouveau contrat, when je sélectionne le contrat C00000000, then les administrateurs sont notifiés qu'un nouveau contrat est à créer | ⬜ |
| Error : given une DA sur contrat sans contrat sélectionné, system bloque l'enregistrement (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le processus de création du contrat déclenché par C00000000 (couvert côté administration/contrats).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), pop-up de recherche de contrat (colonnes Informations contrat / Contract Manager / Structure / Fournisseur).
- Recherche par n°, libellé, CM, unité, division, fournisseur ; contrats actifs de WRAP uniquement ; obligatoire pour une DA sur contrat ; C00000000 notifie les administrateurs.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
