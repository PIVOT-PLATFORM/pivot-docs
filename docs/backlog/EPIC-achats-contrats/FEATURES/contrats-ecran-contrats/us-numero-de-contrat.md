# US25.6.2 — Numéro de contrat

**En tant que** contract manager
**Je veux** saisir le numéro de contrat dans un champ alphanumérique de 10 caractères
**Afin de** identifier le contrat, y compris ses contrats subséquents

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Numéro de contrat, when je saisis une valeur, then le champ accepte jusqu'à 10 caractères alphanumériques | ⬜ |
| Given un numéro déjà utilisé par un autre contrat (contrat subséquent), when je l'enregistre, then la saisie est acceptée (le numéro n'est pas forcément unique) | ⬜ |
| Error : given un champ Numéro de contrat vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent saisir | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La génération automatique ou le contrôle d'unicité du numéro de contrat (volontairement non unique).

## Notes d'implémentation
- Écran des contrats (module OPDN), champ alphanumérique borné à 10 caractères, obligatoire.
- Numéro non unique pour permettre les contrats subséquents.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
