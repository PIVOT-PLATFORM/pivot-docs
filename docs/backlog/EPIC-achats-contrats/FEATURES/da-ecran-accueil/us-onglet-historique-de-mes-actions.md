# US25.3.10 — Onglet « Historique de mes actions »

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** consulter l'onglet « Historique de mes actions »
**Afin de** retrouver les demandes d'achat sur lesquelles je suis intervenu

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet « Historique de mes actions », when je l'ouvre, then je vois les DA dans l'historique desquelles j'apparais | ⬜ |
| Given la liste de l'historique, when je l'affiche, then les colonnes sont N° et Résumé, Valideur principal, Prescripteur, Date début, Type, Montant, Statut | ⬜ |
| Error : given un utilisateur n'ayant réalisé aucune action, when il ouvre l'onglet, then la liste s'affiche vide sans erreur | ⬜ |
| Security/Gouvernance : chaque utilisateur ne voit que les DA où il apparaît dans l'historique de ses propres actions | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail de la traçabilité (commentaires, dates d'action) par étape est couvert par les US de l'écran de la demande d'achat.

## Notes d'implémentation
- Écran d'accueil, sous-onglet « Historique de mes actions » (module WRAP/OPDN).
- Liste des DA où l'utilisateur figure dans l'historique ; colonnes N° et Résumé, Valideur principal, Prescripteur, Date début, Type, Montant, Statut.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
