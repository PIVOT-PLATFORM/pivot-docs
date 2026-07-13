# US25.4.8 — Début de prestation

**En tant que** acheteur informatique (prescripteur)
**Je veux** renseigner la date de début de prestation via un champ date
**Afin de** cadrer la période de la prestation demandée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Début de prestation, when je saisis la date, then je peux la choisir dans un calendrier, la coller (copier-coller) ou la saisir au clavier | ⬜ |
| Given une saisie clavier, when j'entre la date, then les formats « XX/XX/XXXX » et « XX.XX.XXXX » sont acceptés | ⬜ |
| Error : given un champ Début de prestation vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La contrainte de cohérence entre début et fin de prestation (US « Fin de prestation »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), champ date : calendrier, copier-coller ou saisie clavier.
- Formats acceptés : « XX/XX/XXXX » et « XX.XX.XXXX ».

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
