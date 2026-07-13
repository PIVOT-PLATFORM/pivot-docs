# US25.6.10 — Segment d'achat

**En tant que** contract manager
**Je veux** sélectionner le segment d'achat du contrat dans une liste
**Afin de** catégoriser le contrat selon la nature de l'achat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Segment d'achat, when j'ouvre la liste, then elle propose les valeurs : Logiciel, Matériel, Prestation, Services opérés | ⬜ |
| Given une valeur sélectionnée, when j'enregistre le contrat, then le segment d'achat est conservé et affiché en visualisation | ⬜ |
| Error : given une valeur hors liste (saisie non prévue), system n'accepte que les valeurs de la liste | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent saisir | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le paramétrage / l'extension des valeurs de la liste des segments d'achat.

## Notes d'implémentation
- Écran des contrats (module OPDN), liste à valeurs fixes : Logiciel / Matériel / Prestation / Services opérés.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
