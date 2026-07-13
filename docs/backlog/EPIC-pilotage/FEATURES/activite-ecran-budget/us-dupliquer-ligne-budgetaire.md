# US18.18.10 — Dupliquer une ligne budgétaire

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** dupliquer une ligne budgétaire existante via l'icône Dupliquer
**Afin de** créer rapidement une ligne similaire sans ressaisir les données paramètre

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une ligne budgétaire, when je clique sur l'icône Dupliquer, then l'écran de saisie s'ouvre pré-rempli avec les données paramètre de la ligne (hors données financières) | ⬜ |
| Given une duplication, when l'écran de saisie s'ouvre, then la ligne dupliquée s'appelle « Copie de XXX » | ⬜ |
| Given l'écran de saisie de la ligne dupliquée, when je la complète, then les mêmes règles que la création s'appliquent | ⬜ |
| Error : given des données financières sur la ligne source, system ne les reporte pas sur la ligne dupliquée | ⬜ |
| Security/Gouvernance : la duplication respecte les mêmes droits que la création d'une ligne budgétaire | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les règles détaillées des champs, couvertes par l'US Création d'une nouvelle ligne budgétaire.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, icône Dupliquer d'une ligne.
- Pré-remplissage des données paramètre (pas des données financières) ; nom « Copie de XXX » ; mêmes règles que la création.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
