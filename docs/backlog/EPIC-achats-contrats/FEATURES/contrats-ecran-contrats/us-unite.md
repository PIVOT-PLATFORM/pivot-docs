# US25.6.7 — Unité

**En tant que** contract manager
**Je veux** rattacher le contrat à une unité parmi celles autorisées
**Afin de** préciser le rattachement organisationnel du contrat au niveau le plus fin

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Unité, when j'ouvre la liste, then elle ne propose que les unités autorisées selon mes droits | ⬜ |
| Given une création de contrat, when l'écran s'ouvre, then le champ Unité est laissé vide | ⬜ |
| Given un utilisateur selon ses droits, when il saisit l'unité, then le champ est obligatoire ou facultatif selon ces droits | ⬜ |
| Error : given un champ Unité obligatoire laissé vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — la liste est bornée aux unités autorisées | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le paramétrage des droits par unité (écran Profil / rattachement, administration).

## Notes d'implémentation
- Écran des contrats (module OPDN), liste des unités autorisées, caractère obligatoire/facultatif dépendant des droits.
- Champ laissé vide à la création.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
