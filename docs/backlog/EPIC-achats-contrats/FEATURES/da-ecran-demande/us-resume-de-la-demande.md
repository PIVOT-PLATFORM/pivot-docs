# US25.4.7 — Résumé de la demande

**En tant que** acheteur informatique (prescripteur)
**Je veux** saisir un résumé de la demande dans un grand champ texte
**Afin de** décrire l'objet de la demande d'achat pour les valideurs

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Résumé de la demande, when je saisis un texte long, then le champ affiche une barre de défilement permettant de parcourir tout le contenu | ⬜ |
| Given un résumé saisi, when j'enregistre la DA, then le contenu est conservé | ⬜ |
| Error : given un champ Résumé vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le champ Commentaires réservé aux administrateurs (US dédiée).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), grand champ texte multiligne avec barre de défilement.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
