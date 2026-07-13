# US25.6.9 — Contrôle CM

**En tant que** contract manager
**Je veux** cocher ou non la case « Contrôle CM »
**Afin de** ajouter une étape de contrôle CM au workflow des DA sur contrat utilisant ce contrat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Contrôle CM, when je crée un contrat, then la coche est à Non par défaut | ⬜ |
| Given un contrat avec Contrôle CM à Oui, when une DA sur contrat utilise ce contrat, then une première étape obligatoire « contrôle CM » est ajoutée à son workflow | ⬜ |
| Given un contrat avec Contrôle CM à Non, when une DA sur contrat utilise ce contrat, then aucune étape « contrôle CM » n'est ajoutée au workflow | ⬜ |
| Error : given une bascule de la coche sans droit de saisie, system empêche la modification | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent modifier la coche | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La construction complète du workflow des DA sur contrat (autres étapes que le contrôle CM).
- L'affectation du « Contract Manager - Vérification » (voir US Affectation des rôles).

## Notes d'implémentation
- Écran des contrats (module OPDN), coche booléenne, valeur par défaut Non.
- À Oui, ajoute une première étape obligatoire « contrôle CM » au workflow des DA sur contrat utilisant ce contrat.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
