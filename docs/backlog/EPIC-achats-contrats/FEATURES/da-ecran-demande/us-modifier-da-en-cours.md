# US25.4.23 — Modifier (DA en cours de workflow)

**En tant que** acheteur informatique (prescripteur)
**Je veux** modifier une DA en cours de workflow après confirmation
**Afin de** corriger la demande en réinitialisant le circuit de validation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA en cours de workflow, when un administrateur ayant les droits sur l'unité ou le prescripteur l'ouvre, then il peut la modifier | ⬜ |
| Given une modification, when je l'enregistre, then une pop-up affiche « Attention, la modification de la DA va entrainer la réinitialisation du Workflow de validation et le retour à l'état "Brouillon". Etes-vous sûr de vouloir continuer ? » | ⬜ |
| Given la pop-up de confirmation, when je confirme, then le workflow est réinitialisé et la DA revient à l'état « Brouillon » | ⬜ |
| Error : given un utilisateur sans droit (V, ou admin sans droits sur l'unité), system n'autorise pas la modification de la DA en cours | ⬜ |
| Security/Gouvernance : action ouverte au prescripteur (P) et à l'administrateur (A) ayant les droits sur l'unité ; non ouverte à V ni à CM — matrice P/V/CM/A = OUI/NON/NON/OUI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'action administrateur « Modifier » sur une DA « Traitée » (US dédiée).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), modification d'une DA en cours de workflow.
- Pop-up exacte : « Attention, la modification de la DA va entrainer la réinitialisation du Workflow de validation et le retour à l'état "Brouillon". Etes-vous sûr de vouloir continuer ? ».

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
