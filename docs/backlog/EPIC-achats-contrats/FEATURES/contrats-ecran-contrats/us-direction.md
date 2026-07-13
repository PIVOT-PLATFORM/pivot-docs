# US25.6.5 — Direction

**En tant que** contract manager
**Je veux** rattacher le contrat à une direction parmi celles sur lesquelles j'ai les droits
**Afin de** situer le contrat dans la structure organisationnelle autorisée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Direction, when j'ouvre la liste, then elle ne propose que les directions sur lesquelles j'ai les droits | ⬜ |
| Given une création de contrat, when l'écran s'ouvre, then le champ Direction est pré-rempli depuis mon profil | ⬜ |
| Given un utilisateur ayant des droits au niveau direction seulement, when il crée le contrat, then le rattachement peut rester au niveau direction | ⬜ |
| Error : given un champ Direction vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — la liste est bornée aux directions sur lesquelles l'utilisateur a les droits | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le paramétrage des droits par direction (écran Profil / rattachement, administration).

## Notes d'implémentation
- Écran des contrats (module OPDN), liste des directions filtrée par les droits de l'utilisateur, obligatoire.
- Pré-remplissage à la création depuis la direction du profil.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
