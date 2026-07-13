# US25.6.8 — Contrat actif

**En tant que** contract manager
**Je veux** cocher ou non la case « Contrat actif »
**Afin de** rendre le contrat disponible ou non à la recherche des demandes d'achat sur contrat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Contrat actif, when je crée un contrat, then la coche est à Non par défaut | ⬜ |
| Given un contrat avec la coche à Oui, when un utilisateur crée une DA sur contrat, then le contrat apparaît dans la recherche de contrat | ⬜ |
| Given un contrat inactif (coche à Non), when un utilisateur recherche un contrat pour une DA sur contrat, then le contrat n'apparaît pas dans les résultats | ⬜ |
| Error : given une bascule de la coche sans droit de saisie, system empêche la modification | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent modifier la coche | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'écran de recherche de contrat des DA sur contrat (comportement de filtrage détaillé).

## Notes d'implémentation
- Écran des contrats (module OPDN), coche booléenne, valeur par défaut Non.
- Un contrat inactif est exclu de la recherche de contrat des DA sur contrat.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
