# US22.7.7 — Interop outils agiles & de travail (Jira, Azure DevOps, Asana…)

**En tant que** chef de projet
**Je veux** synchroniser (import/export) avec Jira, Azure DevOps, Asana, Trello, monday, GitHub/GitLab Projects
**Afin de** relier la planification et les outils d'exécution des équipes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet Jira/Azure DevOps, when je le connecte, then epics/stories/sprints deviennent tâches/jalons dans le Gantt | ⬜ |
| Given une modification de dates côté PIVOT, when la synchro s'exécute, then elle est propagée (ou proposée) côté outil agile | ⬜ |
| Error : given des identifiants de connexion invalides/expirés, un projet source introuvable, ou une réponse d'API malformée/de version non supportée de l'outil tiers, when la connexion ou la synchro s'exécute, then la synchro échoue proprement avec un message d'erreur explicite et sans altérer le planning PIVOT existant | ⬜ |
| Security : les jetons de connexion sont stockés chiffrés (coffre-fort) ; seul un chef de projet/PMO habilité sur le Projet peut créer/révoquer une connexion ; la propagation de dates côté outil agile respecte les permissions de l'utilisateur ayant configuré la connexion (pas d'élévation de privilège via la synchro) | ⬜ |

## Hors périmètre
- Synchronisation du contenu fonctionnel des tickets (description, commentaires, pièces jointes) — seuls dates/statuts/hiérarchie (epics/stories/sprints → tâches/jalons) sont synchronisés
- Résolution automatique de conflits en cas de modification simultanée des deux côtés (PIVOT propose, ne résout pas silencieusement — cf. AC "propagée ou proposée")
- Support d'outils agiles au-delà de la liste énumérée (Jira, Azure DevOps, Asana, Trello, monday, GitHub/GitLab Projects)

## Notes d'implémentation
- Chaque outil tiers a son propre modèle d'API et d'auth (OAuth2 pour la plupart) — prévoir un connecteur par outil plutôt qu'une abstraction unique prématurée, dans l'esprit des connecteurs EN22.3
- Le mapping epic/story/sprint → tâche/jalon doit être configurable par projet (les hiérarchies Jira/Azure DevOps ne sont pas identiques)
- Cette US est priorisée hors profils Publique/État (cf. `Profils` en frontmatter) — les organisations publiques utilisant moins ces outils d'exécution agile externes

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
