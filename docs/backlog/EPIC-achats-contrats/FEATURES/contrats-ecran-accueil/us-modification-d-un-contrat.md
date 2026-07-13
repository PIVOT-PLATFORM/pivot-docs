# US25.5.4 — Modification d'un contrat

**En tant que** contract manager
**Je veux** modifier un contrat via le bouton « modifier », tous champs éditables
**Afin de** mettre à jour les informations et les CMs rattachés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un contrat en visualisation, when je clique sur « modifier », then le contrat passe en mode édition et tous les champs sont modifiables | ⬜ |
| Given une modification des CMs rattachés au contrat, when des DA sont en cours de workflow, then le changement de CMs n'est pas effectif sur ces DA en cours | ⬜ |
| Error : given une modification laissant un champ obligatoire vide, system bloque l'enregistrement (étoile rouge, cf. règles d'enregistrement) | ⬜ |
| Security/Gouvernance : seuls les contract managers (CM) et les administrateurs (A) peuvent modifier un contrat, sur les niveaux où ils ont les droits (NON/NON/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La suppression depuis le mode modification est couverte par l'US Suppression d'un contrat.
- Les règles d'activation du bouton « Enregistrer » sont couvertes par l'US Enregistrement d'un contrat.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), bouton « modifier ».
- Tous les champs sont modifiables.
- Règle métier : la modification des CMs n'est pas propagée aux DA déjà en cours de workflow.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
