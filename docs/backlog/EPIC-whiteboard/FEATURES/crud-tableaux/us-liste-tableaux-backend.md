# US08.1.2 — Utilisateur liste ses tableaux (backend)

**En tant que** utilisateur
**Je veux** récupérer la liste de mes tableaux via l'API
**Afin de** retrouver mes espaces de travail

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| GET /api/whiteboard/boards retourne les tableaux accessibles par l'utilisateur | ⬜ |
| Inclut : tableaux owned + tableaux partagés avec l'user | ⬜ |
| Champs : id, title, role, createdAt, updatedAt, thumbnailUrl | ⬜ |
| Paginé (20 par page), trié par updatedAt DESC | ⬜ |
| Tests TI GET /api/whiteboard/boards | ⬜ |
| thumbnailUrl = null acceptable en MVP — valeur null retournée si aucune miniature générée | ⬜ |
| Valeurs du champ role : "owner" \| "editor" \| "viewer" | ⬜ |
| activeParticipantCount (entier) inclus dans la réponse : nombre de participants actuellement connectés au board | ⬜ |
| Réponse inclut totalElements, totalPages, currentPage, hasNext pour pagination côté Angular | ⬜ |
| Taille de page plafonnée côté backend à 50 ; size négatif ou nul → 400 Bad Request | ⬜ |
| Requête filtre double obligatoire : (owner_id = :userId OR membre actif) AND tenant_id = :tenantId — test TI avec deux tenants distincts vérifiant l'isolation | ⬜ |
| Recherche par titre : hors scope MVP (note explicite) | ⬜ |

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: MVP · Size: S · Priority: High
Human Gate: needs-human-valid · Stage: Backlog
