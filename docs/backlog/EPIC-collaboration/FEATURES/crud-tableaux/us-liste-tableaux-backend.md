# US08.1.2 — Utilisateur liste ses tableaux (backend)

**En tant que** utilisateur
**Je veux** récupérer la liste de mes tableaux via l'API
**Afin de** retrouver mes espaces de travail

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| GET /api/whiteboard/boards retourne les tableaux accessibles par l'utilisateur | ✅ |
| Inclut : tableaux owned + tableaux partagés avec l'user | ✅ |
| Champs : id, title, role, createdAt, updatedAt, thumbnailUrl | ✅ |
| Paginé (20 par page), trié par updatedAt DESC | 🟡 pagination confirmée (`Pageable`) — taille de page par défaut et tri explicite non confirmés individuellement au Gate 4, à vérifier en recette |
| Tests TI GET /api/whiteboard/boards | ✅ |
| thumbnailUrl = null acceptable en Socle — valeur null retournée si aucune miniature générée | ✅ |
| Valeurs du champ role : "owner" \| "editor" \| "viewer" | ✅ |
| activeParticipantCount (entier) inclus dans la réponse : nombre de participants actuellement connectés au board | 🟡 champ présent dans le DTO, mais son alimentation réelle dépend d'EN08.1 (mergée après cette PR) — à vérifier que la valeur n'est pas restée figée à 0 |
| Réponse inclut totalElements, totalPages, currentPage, hasNext pour pagination côté Angular | ✅ |
| Taille de page plafonnée côté backend à 50 ; size négatif ou nul → 400 Bad Request | ✅ |
| Requête filtre double obligatoire : (owner_id = :userId OR membre actif) AND tenant_id = :tenantId — test TI avec deux tenants distincts vérifiant l'isolation | ✅ |
| Recherche par titre : hors scope Socle (note explicite) | ✅ |
| tenantId résolu exclusivement depuis le SecurityContext (token opaque) — aucun tenantId accepté en query param | 🟡 écart assumé : résolu depuis les headers `X-Pivot-User-Id`/`X-Pivot-Tenant-Id` (bootstrap, TODO EN17) — voir Gate 5 spec |

## Hors périmètre
- Recherche par titre (filtre texte) : hors scope Socle
- Tri configurable par l'utilisateur (autre que `updatedAt DESC`) : hors scope
- Filtrage par rôle ou par statut d'activité récente : hors scope
- Génération/calcul de `thumbnailUrl` : hors scope (valeur `null` acceptée, cf. US08.1.1)

## Notes d'implémentation
- Backend `pivot-collaboratif-core` (schéma `collaboratif`), endpoint `GET /api/whiteboard/boards` → `BoardController.list()` → `BoardService.findAccessible()`
- tenantId résolu exclusivement depuis le SecurityContext (token opaque), jamais depuis un paramètre de requête — cohérent avec US08.1.1
- Requête : jointure `board` ⋈ `board_member` avec filtre `(b.owner_id = :userId OR bm.user_id = :userId) AND b.tenant_id = :tenantId`
- `activeParticipantCount` alimenté par le registre de présence WebSocket (EN08.1 — isolation room par board)
- Pagination Spring Data `Pageable` (page, size) ; `size` plafonné à 50 côté serveur même si le client en demande plus ; `size` négatif ou nul → 400
- Test TI dédié : deux tenants distincts, vérifier qu'aucun board de l'autre tenant n'apparaît dans la réponse

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: Socle · Size: S · Priority: High
Stage: Review
Dépendances: US08.1.1
Gate 5 : `pivot-collaboratif-core` PR [#19](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/19)
(Gate 4 = 88/100, même PR que US08.1.1), spec figée
`docs/specs/EPIC-collaboration/us08-1-2-liste-tableaux-backend.md` (rétroactif, 2026-07-07)
