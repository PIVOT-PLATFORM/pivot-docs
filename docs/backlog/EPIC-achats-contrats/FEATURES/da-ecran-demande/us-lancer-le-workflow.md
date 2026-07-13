# US25.4.22 — Lancer le workflow

**En tant que** acheteur informatique (prescripteur)
**Je veux** lancer le workflow de validation de la DA
**Afin de** transmettre la demande au premier vérificateur/valideur du circuit

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA complète, when je clique sur le bouton « Lancer le workflow » (en bas à droite), then les informations sont enregistrées, le workflow est lancé et la DA est fermée | ⬜ |
| Given le lancement du workflow, when il aboutit, then un mail est envoyé au premier vérificateur/valideur et les étapes se mettent à jour | ⬜ |
| Error : given un workflow non configuré ou des champs obligatoires manquants, system empêche le lancement | ⬜ |
| Security/Gouvernance : action ouverte au prescripteur (P), au contract manager (CM) et à l'administrateur (A), non ouverte au vérificateur/valideur (V) — matrice P/V/CM/A = OUI/NON/OUI/OUI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le calcul des étapes (US « Prévisualisation du Workflow »).
- L'approbation et le refus par les valideurs (US dédiées).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), bouton « Lancer le workflow » en bas à droite.
- Enregistre, lance le workflow, envoie un mail au premier vérificateur/valideur, ferme la DA ; les étapes se mettent à jour.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
