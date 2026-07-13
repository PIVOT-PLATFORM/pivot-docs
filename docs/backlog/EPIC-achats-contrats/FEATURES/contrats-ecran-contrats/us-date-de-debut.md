# US25.6.13 — Date de début

**En tant que** contract manager
**Je veux** saisir la date de début du contrat dans un champ date
**Afin de** définir la date d'entrée en vigueur du contrat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Date de début, when je saisis une date, then le champ accepte les formats « XX/XX/XXXX » ou « XX. XX.XXXX » | ⬜ |
| Given une date de début saisie, when j'enregistre le contrat, then la date est conservée et affichée en visualisation | ⬜ |
| Error : given un champ Date de début vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent saisir | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les contrôles de cohérence entre date de début et date de fin validité PGI.

## Notes d'implémentation
- Écran des contrats (module OPDN), champ date, formats « XX/XX/XXXX » ou « XX. XX.XXXX », obligatoire.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
