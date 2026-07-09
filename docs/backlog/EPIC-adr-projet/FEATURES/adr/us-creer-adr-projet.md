# US24.1.1 — Créer un ADR (Architecture Decision Record) projet

**En tant que** architecte / chef de projet
**Je veux** créer et suivre des ADRs liés à un projet spécifique
**Afin de** tracer les décisions architecturales du projet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet existant, when l'architecte crée un ADR avec titre, statut, contexte, décision et conséquences, then POST `/api/pilotage/roadmap/projects/{id}/adrs` persiste l'ADR et le retourne avec un statut parmi PROPOSED · ACCEPTED · DEPRECATED · SUPERSEDED | ⬜ |
| Given un ADR existant, when il est mis à jour ou supprimé (CRUD complet), then les modifications sont persistées et l'historique reste cohérent | ⬜ |
| Error : given une création d'ADR avec statut SUPERSEDED sans référence à l'ADR remplaçant, system retourne 400 | ⬜ |
| Security : un ADR n'est accessible en lecture/écriture qu'aux membres de l'équipe rattachée au projet (FK `public.teams.id`) ; toute autre requête retourne 403 | ⬜ |
| A11y : le formulaire de création d'ADR (vue Angular) est navigable au clavier et les champs obligatoires sont annoncés par lecteur d'écran | ⬜ |

## Hors périmètre
- La recherche et la consultation des ADRs (liste, filtre, full-text) sont couvertes par US24.1.2.
- La gestion de workflows d'approbation multi-étapes (revue collégiale avant ACCEPTED) n'est pas couverte.
- L'import/export d'ADRs au format Markdown externe n'est pas inclus.

## Notes d'implémentation
- Backend `pivot-pilotage-core` (schéma Flyway `pilotage`), endpoint sous `/api/pilotage/roadmap/projects/{id}/adrs`, cohérent avec la ressource `Project` (dépendance US22.1.1).
- Le lien "ADR remplaçant" pour un ADR SUPERSEDED doit référencer un ADR existant du même projet (contrainte FK ou vérification applicative).
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system`.

---
Item Type: US · Parent: F24.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: US22.1.1
