# US25.4.9 — Fin de prestation

**En tant que** acheteur informatique (prescripteur)
**Je veux** renseigner la date de fin de prestation avec initialisation et contrôle de cohérence
**Afin de** garantir une période de prestation valide

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une date de début de prestation renseignée et un champ Fin laissé vide, when le champ Fin est initialisé, then il prend par défaut la date de début | ⬜ |
| Given une date de fin, when je saisis une date antérieure à la date de début, then la saisie est impossible | ⬜ |
| Error : given un champ Fin de prestation vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les formats et modes de saisie du champ date (couverts par « Début de prestation »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), champ date Fin de prestation.
- Si vide, initialisée à la date de début ; saisie bloquée si antérieure à la date de début.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
