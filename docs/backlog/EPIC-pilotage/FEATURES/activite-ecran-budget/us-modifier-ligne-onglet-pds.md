# US18.18.11 — Modifier une ligne budgétaire (onglet PDS Pluriannuel)

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** modifier une ligne budgétaire de l'onglet PDS Pluriannuel en cliquant dessus
**Afin de** mettre à jour ses données paramètre et financières

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une ligne de l'onglet PDS Pluriannuel, when je clique sur la ligne, then l'écran de saisie s'ouvre pré-rempli avec ses données | ⬜ |
| Given l'écran de saisie en modification, when je le complète, then les mêmes règles que la création s'appliquent | ⬜ |
| Given l'ouverture de l'écran de modification, when il s'affiche, then l'année affichée est la première du carrousel | ⬜ |
| Given une ligne cliquable, when elle s'affiche dans le tableau, then l'utilisateur est informé visuellement qu'elle est cliquable | ⬜ |
| Error : given une donnée modifiée non conforme aux règles de saisie, system bloque la validation comme en création | ⬜ |
| Security/Gouvernance : la modification n'est possible que pour les utilisateurs autorisés sur le budget de l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les onglets Élaboration PMT et Photos financières, couverts par l'US Modifier (Élab PMT / Photos).
- Les règles détaillées des champs, couvertes par l'US Création d'une nouvelle ligne budgétaire.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglet PDS Pluriannuel, modification d'une ligne au clic.
- Écran de saisie pré-rempli ; mêmes règles que la création ; année affichée = première du carrousel ; indication visuelle de ligne cliquable.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
