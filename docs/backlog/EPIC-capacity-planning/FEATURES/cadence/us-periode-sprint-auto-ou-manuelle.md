# US11.5.2 — Période de sprint : API préconfigurée ou durée manuelle

**En tant que** Scrum Master
**Je veux** récupérer automatiquement les dates de sprint depuis une API externe préalablement configurée (Jira, Azure DevOps…), ou à défaut saisir une durée de sprint
**Afin de** éviter la double saisie des dates et rester source-agnostique

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une API de sprints préconfigurée (connecteur agile), when je crée un sprint, then ses dates `[début, fin]` sont **récupérées automatiquement** | ⬜ |
| Given aucune API configurée, when je crée un sprint, then je saisis une **durée** (ex. 2 semaines) + date de début, et les dates sont calculées | ⬜ |
| Given un sprint synchronisé, when ses dates changent côté outil agile, then la capacité est recalculée | ⬜ |
| Error : given l'API indisponible, then repli sur la saisie manuelle + signalement (pas de blocage) | ⬜ |

---
Item Type: US · Parent: F11.5 · Module: agilite · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Rôle: scrum-master
Dépendances: EN11.1
