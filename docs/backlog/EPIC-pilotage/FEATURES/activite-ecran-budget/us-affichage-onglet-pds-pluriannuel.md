# US18.18.2 — Affichage de l'onglet PDS Pluriannuel

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** consulter l'onglet PDS Pluriannuel avec ses tableaux budgétaires par compte et son carrousel d'années
**Afin de** visualiser et piloter le budget pluriannuel de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet PDS Pluriannuel, when il s'affiche, then les boutons « + Ligne budgétaire » et « Enregistrer », un bouton de mise à jour, un bouton « Synthèse » (déployer/rétracter) et une barre de recherche sont présents | ⬜ |
| Given le carrousel d'années, when l'onglet s'ouvre, then 3 années N/N+1/N+2 sont affichées, positionnées par défaut sur l'année en cours | ⬜ |
| Given les données, when elles s'affichent, then elles sont découpées en tableaux budgétaires par compte avec un seul en-tête, dans l'ordre CAPEX/HMO, CAPEX/MO, APCO/HMO, OPEX/HMO, OPEX/MO | ⬜ |
| Given une catégorie sans aucune ligne, when le tableau s'affiche, then la catégorie reste affichée, et un total final est présent | ⬜ |
| Error : given la suppression de la valeur d'un montant, system enregistre `null` en base mais compte `0` dans les sommes | ⬜ |
| Security/Gouvernance : la consultation est ouverte ; la modification des lignes dépend des règles du profil budgétaire | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La saisie/édition détaillée des colonnes, couverte par l'US Tableau budgétaire.
- Le comportement des boutons Enregistrer, Synthèse et mise à jour, couverts par leurs US dédiées.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglet PDS Pluriannuel (MVP).
- Carrousel 3 ans N/N+2 (défaut année courante) ; ordre catégories CAPEX/HMO, CAPEX/MO, APCO/HMO, OPEX/HMO, OPEX/MO ; catégories toujours affichées ; total final ; valeur supprimée = null en base, 0 dans les sommes.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
