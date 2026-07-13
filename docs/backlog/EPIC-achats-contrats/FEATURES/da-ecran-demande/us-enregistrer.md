# US25.4.21 — Enregistrer

**En tant que** acheteur informatique (prescripteur)
**Je veux** enregistrer la DA en « Brouillon » sans lancer le workflow
**Afin de** sauvegarder la demande et la compléter ultérieurement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA, when je clique sur « Enregistrer », then elle est enregistrée au statut « Brouillon » sans lancer le workflow | ⬜ |
| Given une DA au statut « Brouillon », when j'appuie sur « Enregistrer », then la DA est enregistrée et fermée | ⬜ |
| Given une DA en cours de modification, when j'appuie sur « Enregistrer », then la DA est enregistrée sans être fermée | ⬜ |
| Given l'enregistrement, when il aboutit, then le message « Enregistrement de la demande » est affiché | ⬜ |
| Error : given un champ obligatoire manquant, system bloque l'enregistrement et signale les champs requis | ⬜ |
| Security/Gouvernance : action ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le lancement du workflow (US « Lancer le workflow »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), bouton « Enregistrer » (statut « Brouillon », sans workflow).
- Comportement de fermeture : ferme la DA en Brouillon, ne la ferme pas en cours de modification. Message « Enregistrement de la demande ».

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
