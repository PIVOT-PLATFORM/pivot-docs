# US25.3.15 — Statut « Brouillon »

**En tant que** acheteur informatique (prescripteur)
**Je veux** disposer du statut « Brouillon » comme état initial de la demande d'achat
**Afin de** préparer et ajuster ma DA avant le lancement de son workflow

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA au statut « Brouillon », when le workflow est lancé, then l'étape « Brouillon » est l'étape initialisée au lancement du WF et sa première étape porte le nom du créateur | ⬜ |
| Given une DA au statut « Brouillon », when son propriétaire (ou l'admin) agit dessus, then il peut la supprimer, la modifier ou la lancer | ⬜ |
| Error : given un utilisateur qui n'est ni propriétaire ni administrateur, when il tente de supprimer/modifier/lancer une DA en Brouillon, then l'action est refusée | ⬜ |
| Security/Gouvernance : suppression/modification/lancement réservés au propriétaire ou à l'admin ; statut visible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le passage effectif au statut « En cours » au lancement du workflow est couvert par l'US Statut « En cours ».

## Notes d'implémentation
- Écran d'accueil / écran de la demande d'achat (module WRAP/OPDN), statut « Brouillon ».
- Étape « Brouillon » initialisée au lancement du WF ; première étape du workflow nommée d'après le créateur ; actions Brouillon (supprimer/modifier/lancer) réservées propriétaire ou admin.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
