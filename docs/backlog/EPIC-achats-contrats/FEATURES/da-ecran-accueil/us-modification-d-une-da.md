# US25.3.4 — Modification d'une demande d'achat

**En tant que** acheteur informatique (prescripteur)
**Je veux** modifier une demande d'achat existante
**Afin de** corriger ou compléter ses informations

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA, when je clique sur le bouton « Modifier », then j'accède au formulaire de la DA en édition | ⬜ |
| Given une DA dont le workflow a déjà été lancé, when je la modifie, then une pop-up de confirmation s'affiche, la DA repasse au statut « Brouillon » et le workflow se réinitialise | ⬜ |
| Error : given un utilisateur qui n'est ni propriétaire ni administrateur, when il tente de modifier la DA, then l'action est refusée | ⬜ |
| Security/Gouvernance : seul le propriétaire de la DA (ou l'administrateur) peut la modifier ; disponible pour P/CM/A et refusé à V (OUI/NON/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les règles de saisie détaillées de chaque champ sont couvertes par les US des champs de la DA.
- Le déroulé du workflow réinitialisé est couvert par les US Statut « Brouillon » / « En cours ».

## Notes d'implémentation
- Écran d'accueil / écran de la demande d'achat (module WRAP/OPDN), bouton « Modifier ».
- Modification après lancement du workflow → retour « Brouillon » + réinitialisation du workflow, précédée d'une pop-up de confirmation.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
