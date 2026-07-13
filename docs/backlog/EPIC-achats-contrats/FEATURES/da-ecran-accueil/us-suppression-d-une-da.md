# US25.3.3 — Suppression d'une demande d'achat

**En tant que** acheteur informatique (prescripteur)
**Je veux** supprimer une demande d'achat au statut Brouillon
**Afin de** retirer une demande devenue inutile

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA au statut « Brouillon », when je clique sur le bouton rouge « Supprimer », then un message de confirmation « Etes vous sur de vouloir supprimer la demande d'achat ? » s'affiche | ⬜ |
| Given le message de confirmation, when je confirme, then la DA est supprimée | ⬜ |
| Error : given une DA qui n'est pas au statut « Brouillon », when je tente de la supprimer, then l'action est refusée ; la DA doit d'abord repasser en Brouillon (le prescripteur/admin la modifie, ou le vérificateur/valideur la refuse) | ⬜ |
| Security/Gouvernance : seul le propriétaire de la DA (ou l'administrateur) peut la supprimer ; disponible pour P/A et refusé à V/CM (OUI/NON/NON/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le retour en Brouillon via un refus est couvert par l'US Refus de la DA.
- Le retour en Brouillon via une modification est couvert par l'US Modification d'une DA.

## Notes d'implémentation
- Écran d'accueil des demandes d'achats (module WRAP/OPDN), bouton rouge « Supprimer ».
- Suppression possible uniquement au statut Brouillon ; message exact « Etes vous sur de vouloir supprimer la demande d'achat ? ».

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
