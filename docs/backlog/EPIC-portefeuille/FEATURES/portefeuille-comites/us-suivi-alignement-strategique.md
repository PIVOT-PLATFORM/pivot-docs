# US23.2.6c — Vue de suivi d'alignement stratégique et statut « non aligné »

**En tant que** direction
**Je veux** une vue de suivi qui présente l'alignement et l'avancement des projets au regard des contrats d'objectifs et signale les projets non alignés
**Afin de** piloter la contribution des projets aux orientations stratégiques et détecter les écarts

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un plan stratégique avec des projets rattachés, when la direction ouvre la vue de suivi, then chaque objectif affiche les projets rattachés avec leur avancement (US23.1.1) et leur météo (US23.2.4), sans recalcul propre à cette US | ⬜ |
| Given un projet non rattaché à un objectif stratégique, when la vue de suivi est affichée, then le projet est signalé avec le statut « non aligné » distinct visuellement et non uniquement par la couleur | ⬜ |
| Given un plan stratégique, when la direction consulte le suivi, then le taux global de couverture stratégique (part des projets alignés) est affiché de manière lisible | ⬜ |
| Error : given un plan sans aucun objectif ou sans projet rattaché, then la vue affiche un état vide explicite (message d'accompagnement) au lieu d'une erreur ou d'un tableau vide ambigu | ⬜ |
| Security : un membre non membre du plan ou d'un autre tenant reçoit 404 sur la vue (isolation multi-tenant) ; seule la direction habilitée accède au suivi, un rôle insuffisant reçoit 403 | ⬜ |
| A11y : la vue de suivi est conforme RGAA 4 / WCAG 2.1 AA — tableau avec en-têtes associés (`scope`), statut « non aligné » exposé textuellement (pas seulement visuel), navigation clavier complète | ⬜ |

## Hors périmètre
- La création/édition du plan et des objectifs (US23.2.6a) et la gestion des rattachements (US23.2.6b) ; cette vue est en lecture/consolidation.
- Le calcul de l'avancement et de la météo d'un projet, portés respectivement par US23.1.1 et US23.2.4 — cette US ne fait qu'agréger et afficher la dimension d'alignement.
- Les scénarios de simulation d'impact sur les objectifs stratégiques (US23.2.7).

## Notes d'implémentation
- Vue de lecture consolidée : agrège les rattachements (US23.2.6b), l'avancement (US23.1.1) et la météo (US23.2.4) ; le statut « non aligné » est dérivé de l'absence de rattachement projet ↔ objectif, non stocké.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system` ; le statut « non aligné » doit être doublé d'un libellé/icône pour respecter le critère « pas uniquement par la couleur ».
- Le taux de couverture stratégique = nombre de projets alignés / nombre total de projets du périmètre consulté, calculé à l'affichage.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US23.2.6a (modèle plan/objectifs), US23.2.6b (rattachement projet ↔ objectif)
