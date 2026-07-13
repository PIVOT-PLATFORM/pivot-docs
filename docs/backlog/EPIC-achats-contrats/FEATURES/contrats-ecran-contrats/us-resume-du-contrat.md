# US25.6.12 — Résumé du contrat

**En tant que** contract manager
**Je veux** saisir un résumé du contrat dans un grand champ texte avec barre de défilement
**Afin de** décrire le contenu et l'objet du contrat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Résumé du contrat, when je saisis un texte long, then le champ affiche une barre de défilement | ⬜ |
| Given un résumé saisi, when j'enregistre le contrat, then le texte est conservé et affiché en visualisation | ⬜ |
| Error : given un champ Résumé du contrat vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent saisir | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La mise en forme riche du texte (gras, listes, etc.) au-delà du texte simple.

## Notes d'implémentation
- Écran des contrats (module OPDN), grand champ texte multi-lignes avec barre de défilement, obligatoire.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
