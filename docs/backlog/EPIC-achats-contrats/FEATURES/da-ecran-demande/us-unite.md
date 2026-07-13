# US25.4.3 — Unité

**En tant que** acheteur informatique (prescripteur)
**Je veux** sélectionner l'unité de la DA dans une liste pré-remplie avec l'unité de mon profil
**Afin de** rattacher la demande d'achat à la bonne unité organisationnelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'ouverture d'une nouvelle DA, when l'écran s'affiche, then le champ Unité est pré-rempli avec l'unité de mon profil | ⬜ |
| Given un utilisateur disposant de droits sur d'autres unités, when il ouvre la liste Unité, then il peut changer l'unité pré-remplie pour une autre unité autorisée | ⬜ |
| Error : given un champ Unité vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/CM/A, non ouverte à V — matrice P/V/CM/A = OUI/NON/OUI/OUI ; le choix est limité aux unités sur lesquelles l'utilisateur a des droits | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La liste des organisations rattachées à l'unité (US « Organisation »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), liste Unité pré-remplie depuis le profil.
- Modifiable uniquement si l'utilisateur détient des droits sur d'autres unités.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
