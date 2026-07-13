# US25.4.12 — Montant total avenant compris (€)

**En tant que** acheteur informatique (prescripteur)
**Je veux** saisir le montant total incluant l'avenant dans un champ nombre dédié
**Afin de** déterminer le seuil du workflow sur le montant global

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'avenant = Oui, when l'écran s'affiche, then le champ « Montant total avenant compris (€) » est visible ; sinon il reste masqué | ⬜ |
| Given un montant initial de 20 000 € et un avenant de 6 000 €, when je renseigne le montant total, then il vaut 26 000 € (montant incluant l'avenant) et sert à déterminer le seuil du workflow | ⬜ |
| Given le champ, when je quitte la zone de saisie (blur), then il applique les mêmes règles de mise en forme que le champ Montant (points → espaces, virgule décimale) | ⬜ |
| Error : given l'avenant = Oui et ce champ vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le comportement du bouton Avenant qui déclenche l'affichage de ce champ (US dédiée).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), champ nombre visible uniquement si avenant = Oui.
- Mêmes règles de mise en forme que « Montant de la demande (€) » ; sert au calcul du seuil du workflow.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
