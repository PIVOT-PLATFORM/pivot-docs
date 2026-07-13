# US25.4.16 — Lien vers pièces-jointes

**En tant que** acheteur informatique (prescripteur)
**Je veux** ajouter un lien URL vers un complément d'information
**Afin de** fournir aux valideurs les pièces nécessaires à la validation de la DA

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Lien vers pièces-jointes, when je clique sur le bouton d'ajout, then je peux saisir un lien URL rattaché à la DA | ⬜ |
| Given aucune pièce jointe ajoutée, when l'écran s'affiche, then le commentaire « Il est possible d'ajouter un lien url vers un complément d'information nécessaire à la validation de la DA » est affiché | ⬜ |
| Error : given un lien mal formé, system signale que l'URL n'est pas valide | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'hébergement des documents pointés par l'URL (externe à l'application).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), bouton d'ajout d'un lien URL.
- Commentaire affiché sans pièce jointe : « Il est possible d'ajouter un lien url vers un complément d'information nécessaire à la validation de la DA ».

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
