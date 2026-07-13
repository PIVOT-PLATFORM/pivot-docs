# US25.4.4 — Organisation

**En tant que** acheteur informatique (prescripteur)
**Je veux** sélectionner l'organisation parmi celles de l'unité choisie
**Afin de** préciser le rattachement organisationnel de la demande d'achat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une unité sélectionnée, when j'ouvre la liste Organisation, then elle ne propose que les organisations rattachées à cette unité | ⬜ |
| Given une organisation préférentielle définie au profil, when j'ouvre une nouvelle DA, then le champ Organisation est pré-rempli avec cette organisation préférentielle | ⬜ |
| Error : given un champ Organisation vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le paramétrage de l'organisation préférentielle au profil (écran Profil / rattachement).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), liste Organisation filtrée par l'unité sélectionnée.
- Pré-remplissage depuis l'organisation préférentielle du profil si définie.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
