# US25.4.10 — Montant de la demande (€)

**En tant que** acheteur informatique (prescripteur)
**Je veux** saisir le montant de la demande d'achat dans un champ nombre normalisé
**Afin de** déterminer le seuil et le circuit de validation applicable

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Montant, when je quitte la zone de saisie (blur), then le montant est mis en forme (les points deviennent des espaces, la virgule sépare la partie décimale) : `100.200,6` devient `100 200,60` | ⬜ |
| Given une saisie supérieure au plafond, when je valide, then le montant est borné aux environs de 2 100 000 000 € | ⬜ |
| Error : given un champ Montant vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le calcul du workflow selon le seuil est couvert par l'US « Prévisualisation du Workflow ».
- Le montant total avenant compris (US dédiée).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), champ nombre, mise en forme au blur.
- Règles d'affichage/saisie identiques au champ « Montant total avenant compris (€) ».

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
