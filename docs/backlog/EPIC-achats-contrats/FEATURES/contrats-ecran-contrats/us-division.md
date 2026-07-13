# US25.6.6 — Division

**En tant que** contract manager
**Je veux** rattacher le contrat à une division parmi celles autorisées
**Afin de** préciser le rattachement organisationnel du contrat sous la direction

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Division, when j'ouvre la liste, then elle ne propose que les divisions autorisées selon mes droits | ⬜ |
| Given une création de contrat, when l'écran s'ouvre, then le champ Division est pré-rempli | ⬜ |
| Given un utilisateur selon ses droits, when il saisit la division, then le champ est obligatoire ou facultatif selon ces droits | ⬜ |
| Error : given un champ Division obligatoire laissé vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — la liste est bornée aux divisions autorisées | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le paramétrage des droits par division (écran Profil / rattachement, administration).

## Notes d'implémentation
- Écran des contrats (module OPDN), liste des divisions autorisées, caractère obligatoire/facultatif dépendant des droits.
- Pré-remplissage à la création.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
