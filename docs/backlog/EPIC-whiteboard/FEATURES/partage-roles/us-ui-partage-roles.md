# US08.2.3 — Angular : UI partage et gestion des rôles

**En tant que** owner d'un tableau
**Je veux** gérer les membres et leurs rôles depuis l'interface Angular
**Afin de** contrôler qui peut modifier ou visualiser mon tableau

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Panneau "Partager" : génération lien + liste membres + rôles | ⬜ |
| Copier le lien d'invitation (clipboard API) | ⬜ |
| Modifier le rôle d'un membre (select EDITOR/VIEWER) | ⬜ |
| Révoquer un membre (DELETE /api/whiteboard/boards/{id}/members/{userId}) | ⬜ |
| Tests Vitest SharePanelComponent | ⬜ |
| L'endpoint de modification de rôle membre (PATCH /api/whiteboard/boards/{id}/members/{userId}/role) vérifie OWNER uniquement. EDITOR ou VIEWER → 403 | ⬜ |
| Le nom du tableau et tous les champs texte affichés dans le panneau partage sont rendus via text content Angular (binding {{ }}) et jamais via [innerHTML]. Test E2E vérifie qu'un nom de tableau contenant <script> est affiché comme texte brut | ⬜ |
| CSP de l'application interdit eval et scripts inline (EN sécurité existant ou à créer) | ⬜ |
| Dialog de confirmation avant révocation d'un membre : role="dialog", aria-modal="true", focus trap | ⬜ |

---
Item Type: US · Parent: F08.2 · Module: whiteboard · Phase: MVP · Size: M · Priority: High
Stage: Backlog
