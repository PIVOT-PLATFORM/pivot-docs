# US25.4.6 — Finalité métier

**En tant que** acheteur informatique (prescripteur)
**Je veux** qualifier la finalité métier de la demande dans une liste
**Afin de** distinguer les achats relevant du métier de ceux hors métier

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Finalité métier, when j'ouvre la liste, then elle propose les valeurs « Métier » et « Hors métier », chacune accompagnée de sa définition | ⬜ |
| Given le type d'achats « Hors contrat » sélectionné, when l'écran s'affiche, then le champ Finalité métier est visible et sélectionnable | ⬜ |
| Error : given une valeur de finalité métier non renseignée alors qu'elle est requise, system signale le champ manquant | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La condition d'affichage du champ selon le type d'achats (US « Type d'achats »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), liste Finalité métier : « Métier » / « Hors métier » avec définitions affichées.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
