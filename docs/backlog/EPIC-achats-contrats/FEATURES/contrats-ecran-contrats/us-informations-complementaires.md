# US25.6.15 — Informations complémentaires

**En tant que** contract manager
**Je veux** saisir des informations complémentaires dans un grand champ texte avec barre de défilement
**Afin de** compléter la description du contrat par des précisions libres

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Informations complémentaires, when je saisis un texte long, then le champ affiche une barre de défilement | ⬜ |
| Given des informations complémentaires saisies, when j'enregistre le contrat, then le texte est conservé et affiché en visualisation | ⬜ |
| Error : given un champ Informations complémentaires laissé vide, system enregistre le contrat sans blocage (champ facultatif) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent saisir | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La mise en forme riche du texte (gras, listes, etc.) au-delà du texte simple.

## Notes d'implémentation
- Écran des contrats (module OPDN), grand champ texte multi-lignes avec barre de défilement, facultatif.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
