# US25.4.5 — Type d'achats

**En tant que** acheteur informatique (prescripteur)
**Je veux** choisir le type d'achats de la DA dans une liste qui adapte les champs affichés
**Afin de** déclencher les champs et contrôles propres au type de demande

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Type d'achats, when j'ouvre la liste, then elle propose « Sur contrat », « Hors contrat » et « Création ou modification de contrat », triée du type le plus utilisé au moins utilisé | ⬜ |
| Given le type « Sur contrat » sélectionné, when la sélection est prise en compte, then l'écran affiche la recherche de contrat et le champ « Acte de sous-traitance » | ⬜ |
| Given le type « Hors contrat » sélectionné, when la sélection est prise en compte, then l'écran affiche le champ « Finalité métier » | ⬜ |
| Given le type « Création ou modification de contrat » avec avenant = Oui, when la sélection est prise en compte, then l'écran affiche les champs Contrat et Acte de sous-traitance | ⬜ |
| Error : given un champ Type d'achats vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail des champs conditionnels (US « Finalité métier », « Contrat », « Acte de sous-traitance », « Avenant contrat/commande »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), liste triée par fréquence d'usage (du plus au moins utilisé).
- Comportements conditionnels : Sur contrat → recherche contrat + Acte de sous-traitance ; Hors contrat → Finalité métier ; Création/modification + avenant=Oui → Contrat + Acte de sous-traitance.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
