# US25.6.4 — Libellé

**En tant que** contract manager
**Je veux** saisir le libellé du contrat (son nom) dans un champ alphanumérique
**Afin de** nommer le contrat de façon lisible

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Libellé, when je saisis le nom du contrat, then le champ accepte une saisie alphanumérique | ⬜ |
| Given un libellé saisi, when j'enregistre le contrat, then le nom est conservé et affiché en visualisation | ⬜ |
| Error : given un champ Libellé vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent saisir | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les règles de recherche / filtrage par libellé (écran d'accueil des contrats).

## Notes d'implémentation
- Écran des contrats (module OPDN), champ alphanumérique correspondant au nom du contrat, obligatoire.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
