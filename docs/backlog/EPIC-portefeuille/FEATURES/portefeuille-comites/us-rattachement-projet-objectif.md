# US23.2.6b — Rattachement projet ↔ objectif stratégique

**En tant que** direction
**Je veux** rattacher un projet à un ou plusieurs objectifs stratégiques et gérer ces rattachements
**Afin de** relier concrètement les projets aux orientations stratégiques et préparer leur suivi d'alignement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet (E22) et un objectif d'un plan stratégique ouvert, when la direction crée le rattachement, then l'association projet ↔ objectif est persistée et traçable (auteur, date) | ⬜ |
| Given un projet rattaché, when la direction retire le rattachement, then l'association est supprimée et le retrait est journalisé (le projet redevient rattachable ailleurs) | ⬜ |
| Given un projet appartenant à un programme (US23.2.5), when il est rattaché à un objectif, then le rattachement reste cohérent avec la hiérarchie programme/projets (pas de rattachement contradictoire avec le programme parent) | ⬜ |
| Error : given une tentative de rattachement à un objectif d'un plan clos ou inexistant, then l'opération est refusée avec un message explicite et aucun rattachement n'est créé | ⬜ |
| Security : un membre non habilité reçoit 403 ; un projet ou un objectif appartenant à un autre tenant renvoie 404 (isolation multi-tenant, pas de rattachement cross-tenant possible) | ⬜ |
| A11y : l'interface de rattachement (sélection projet/objectif, ajout, retrait) est utilisable au clavier avec un `aria-label` explicite sur chaque action et un retour de statut annoncé (`aria-live`) après ajout/retrait | ⬜ |

## Hors périmètre
- La création et l'édition du plan stratégique et des objectifs eux-mêmes (relèvent de US23.2.6a).
- La vue de suivi consolidée et le calcul du statut « non aligné » (relèvent de US23.2.6c).
- La synchronisation programme → projets (US23.2.5) ; cette US se contente de rester cohérente avec la hiérarchie existante, sans la modifier.

## Notes d'implémentation
- Table d'association `project_objective_link` dans le schéma `pilotage` (clé projet `Project` E22 + clé `ObjectiveContract` de US23.2.6a), relation many-to-many, avec colonnes de traçabilité (auteur, horodatage).
- La cohérence avec la hiérarchie programme/projets (US23.2.5) est vérifiée à la création : un projet descendant d'un programme ne peut être rattaché qu'à des objectifs compatibles avec ceux du programme parent, sinon refus.
- Le retrait est un soft-remove journalisé pour préserver l'auditabilité, conformément à l'exigence de traçabilité du parent.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US23.2.6a (modèle plan/objectifs)
