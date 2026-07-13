# US25.4.11 — Avenant contrat/commande

**En tant que** acheteur informatique (prescripteur)
**Je veux** indiquer via un bouton coche Oui/Non si la demande porte sur un avenant
**Afin de** faire apparaître les champs et contrôles propres aux avenants

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le bouton « Avenant contrat/commande », when j'ouvre une nouvelle DA, then il est positionné sur « Non » par défaut | ⬜ |
| Given l'avenant basculé sur « Oui », when la sélection est prise en compte, then l'écran affiche le champ « Montant total avenant compris (€) » | ⬜ |
| Given l'avenant = Oui combiné au type d'achats « Création ou modification de contrat », when la sélection est prise en compte, then l'écran affiche les champs Contrats et Acte de sous-traitance | ⬜ |
| Error : given l'avenant = Oui et le champ « Montant total avenant compris (€) » non renseigné, system bloque l'enregistrement (champ obligatoire) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le calcul du montant total avenant compris (US dédiée).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), bouton coche Oui/Non (défaut Non).
- À Oui : affiche « Montant total avenant compris (€) » ; combiné à Type=Création/modification de contrat : affiche Contrats et Acte de sous-traitance.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
