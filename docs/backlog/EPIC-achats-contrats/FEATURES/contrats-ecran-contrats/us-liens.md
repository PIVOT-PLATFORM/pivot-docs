# US25.6.16 — Liens

**En tant que** contract manager
**Je veux** ajouter des pièces jointes sous forme de liens URL via un bouton d'ajout
**Afin de** rattacher au contrat des documents accessibles par lien

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la zone Liens, when je clique sur le bouton d'ajout, then je peux saisir une pièce jointe sous forme de lien URL | ⬜ |
| Given un ou plusieurs liens ajoutés, when j'enregistre le contrat, then les liens sont conservés et affichés en visualisation | ⬜ |
| Error : given une valeur qui n'est pas une URL valide, system signale la saisie invalide | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) — seuls le contract manager et l'administrateur peuvent ajouter des liens | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le téléversement de fichiers (les pièces jointes sont des liens URL, pas des fichiers stockés).

## Notes d'implémentation
- Écran des contrats (module OPDN), bouton d'ajout de pièces jointes sous forme de lien URL.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
