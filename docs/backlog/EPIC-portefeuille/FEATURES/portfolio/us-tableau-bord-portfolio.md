# US23.1.1 — Tableau de bord portefeuille projets

**En tant que** directeur de programme / DSI
**Je veux** un tableau de bord consolidé de l'ensemble des projets du portefeuille
**Afin de** suivre l'avancement global et détecter les projets en risque

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des projets rattachés au tenant, when le directeur ouvre le tableau de bord, then GET `/api/pilotage/portfolio/dashboard` retourne les KPIs (nb projets par statut, taux avancement moyen, projets en retard) et la vue affiche les cartes KPI + la liste des projets avec indicateur RAG (Rouge/Amber/Vert) | ⬜ |
| Given un projet dont le planning est décalé par rapport à la date actuelle, when le RAG est calculé, then l'indicateur passe automatiquement à Rouge sans intervention manuelle | ⬜ |
| Given la liste des projets, when l'utilisateur filtre par équipe, responsable ou période, then seuls les projets correspondants sont affichés | ⬜ |
| Error : given un `teamId` ou une période de filtre invalide, system retourne 400 avec message d'erreur explicite | ⬜ |
| Security : seuls les projets rattachés aux équipes du tenant de l'utilisateur authentifié sont retournés (isolation multi-tenant, FK `public.teams.id`) | ⬜ |
| Security : given un accès direct (ou drill-down) au KPI d'un projet appartenant à un autre tenant, system retourne 404 (non-divulgation d'existence, jamais 403 exposant la ressource) | ⬜ |
| Security : given un utilisateur authentifié sans droit de consultation du portefeuille sur son propre tenant, system retourne 403 | ⬜ |
| A11y : le RAG n'est pas restitué uniquement par la couleur (icône/texte associé) et le tableau de bord est conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le paramétrage des règles de calcul du RAG (seuils de décalage) n'est pas configurable par l'utilisateur dans cette US — règle fixe côté backend.
- L'export du tableau de bord (CSV/PDF) est couvert par US23.1.2.
- Les notifications proactives sur passage au rouge ne sont pas incluses ici.

## Notes d'implémentation
- Backend `pivot-pilotage-core` (schéma Flyway `pilotage`), endpoint `GET /api/pilotage/portfolio/dashboard`.
- Le RAG se calcule à partir de l'entité `Project` (US22.1.1, dépendance déjà déclarée) : comparer date de jalon/fin planifiée vs date courante.
- Filtrage par équipe doit s'appuyer sur l'association projet ↔ équipe (FK `public.teams.id`, cf. E15).
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system` pour les cartes KPI.

---
Item Type: US · Parent: F23.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: directeur-de-programme-portefeuille
Dépendances: US22.1.1
