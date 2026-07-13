# US18.18.9 — Barre de recherche

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** rechercher des lignes budgétaires via une barre de recherche sur les champs texte
**Afin de** retrouver rapidement les lignes concernées dans les tableaux

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la barre de recherche, when je saisis un terme, then la recherche porte sur tous les champs texte affichés (Titre, Produit, Bénéficiaire, Priorité…) | ⬜ |
| Given une recherche, when elle s'exécute, then elle ne porte pas sur les montants ni sur le contenu des commentaires | ⬜ |
| Given une recherche donnant des résultats, when elle s'applique, then les rubriques ayant au moins une ligne correspondante passent en mode déployé | ⬜ |
| Error : given un terme sans correspondance, system n'affiche aucune ligne correspondante et ne déploie aucune rubrique | ⬜ |
| Security/Gouvernance : la recherche s'exerce sur les données que l'utilisateur est autorisé à consulter | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le déploiement/rétractation manuel des rubriques, couvert par les US Tableau budgétaire et Bouton Synthèse.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, barre de recherche.
- Recherche sur tous les champs texte affichés (Titre, Produit, Bénéficiaire, Priorité…), pas sur les montants ni le contenu des commentaires ; rubriques correspondantes déployées.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
