# US25.6.3 — Fournisseur

**En tant que** contract manager
**Je veux** saisir le fournisseur du contrat dans un champ alphanumérique
**Afin de** identifier le tiers avec lequel le contrat est conclu

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Fournisseur, when je saisis une valeur, then le champ accepte une saisie alphanumérique | ⬜ |
| Given un fournisseur saisi, when j'enregistre le contrat, then la valeur est conservée et affichée en visualisation | ⬜ |
| Error : given un champ Fournisseur vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent saisir | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le référentiel des fournisseurs / rapprochement avec un annuaire tiers.

## Notes d'implémentation
- Écran des contrats (module OPDN), champ alphanumérique, obligatoire.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
