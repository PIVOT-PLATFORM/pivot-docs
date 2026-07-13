# US25.4.14 — Acte de sous-traitance

**En tant que** acheteur informatique (prescripteur)
**Je veux** qualifier l'acte de sous-traitance de la DA dans une liste dédiée
**Afin de** documenter la sous-traitance et déclencher les avertissements associés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA sur contrat, when j'ouvre le champ Acte de sous-traitance, then la liste propose « Non », « Non défini » et « Oui » ; le champ n'est disponible que pour les DA sur contrat | ⬜ |
| Given la valeur « Non défini » sélectionnée, when elle est prise en compte, then un commentaire d'avertissement spécifique s'affiche | ⬜ |
| Given la valeur « Oui » sélectionnée, when elle est prise en compte, then un commentaire d'avertissement spécifique (distinct de celui de « Non défini ») s'affiche | ⬜ |
| Error : given une DA sur contrat sans acte de sous-traitance renseigné, system bloque l'enregistrement (champ obligatoire) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La condition d'affichage du champ selon le type d'achats (US « Type d'achats »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), liste « Non » / « Non défini » / « Oui », disponible uniquement pour les DA sur contrat.
- « Non défini » et « Oui » affichent chacun un commentaire d'avertissement spécifique ; obligatoire pour une DA sur contrat.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
