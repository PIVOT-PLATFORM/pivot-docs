# US08.1.1 — Utilisateur crée un tableau (backend)

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/crud-tableaux/us-creer-tableau.md` (F08.1 — CRUD tableaux, EPIC-collaboration E30)
- **PR** : `pivot-collaboratif-core` [#19](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/19)
  (`feat/us08-1-1-creer-tableau`) — couvre US08.1.1 à US08.1.5 (CRUD complet dans une seule PR)
- **Merge commit** : `b13e34c`
- **Gate 2 COVERAGE** : 16 tests unitaires Mockito (toutes branches) + 13 scénarios Testcontainers IT
- **Gate 4 MERGE_CONFIDENCE** : 88/100 — auto-approuvé (seuil ≥ 85)
- **Dépend de** : aucune (racine du domaine whiteboard)

---

## Spec fonctionnelle

### `POST /whiteboard/boards`

Crée un tableau et son entrée `BoardMember` (rôle `OWNER`) dans la même transaction.

- 201 avec le board créé
- `tenantId` résolu exclusivement via `RequestPrincipal` (voir Contrat technique — écart
  d'authentification assumé), jamais depuis le body/query
- Module désactivé → 403 (`WhiteboardModuleDisabledException`, stub toujours actif à ce stade)

### Rename et Delete (US08.1.4/US08.1.5, même PR)

- `PATCH /whiteboard/boards/{id}` — renommage, réservé au rôle `OWNER`
- `DELETE /whiteboard/boards/{id}` — hard-delete, réservé au rôle `OWNER`
- Non-`OWNER` (editor/viewer) → 403 sur les deux
- Convention transverse posée ici et réutilisée par tout le module : accès à un board d'un autre
  tenant, ou dont l'appelant n'est pas membre → **404** (anti-énumération, jamais 403) ; membre
  existant avec rôle insuffisant pour l'action → **403**

---

## Contrat technique

### Fichiers introduits (`pivot-collaboratif-core`)

| Fichier | Rôle |
|---------|------|
| `context/RequestPrincipal.java`, `RequestPrincipalResolver.java` (nouveaux) | `HandlerMethodArgumentResolver` — voir écart d'authentification ci-dessous |
| `whiteboard/board/Board.java`, `BoardMember.java`, `BoardMemberId.java`, `BoardRole.java`, `BoardVisibility.java` (nouveaux) | Entités JPA + enums |
| `whiteboard/board/BoardRepository.java`, `BoardMemberRepository.java` (nouveaux) | Spring Data JPA |
| `whiteboard/board/BoardService.java`, `BoardController.java` (nouveaux) | Logique CRUD complète (create/list/get/rename/delete) |
| `whiteboard/board/WhiteboardModuleCheck.java`, `DefaultWhiteboardModuleCheck.java` (nouveaux) | Stub toujours activé (voir US08.4.1, même mécanisme réutilisé) |
| `whiteboard/board/dto/{BoardResponse,BoardPageResponse,CreateBoardRequest,RenameBoardRequest}.java` (nouveaux) | DTOs — aucune entité JPA exposée |
| `exception/{BoardAccessDeniedException,BoardNotFoundException,WhiteboardModuleDisabledException}.java`, `GlobalExceptionHandler.java` (nouveaux) | Mapping 403/404/403 |
| `resources/db/migration/V1__schema_init.sql` (nouveau) | Tables `board`, `board_member` + index (`tenant_id`, `owner_id`, `updated_at`, `user_id`) |

### Écart d'authentification assumé (bootstrap, TODO EN17)

`RequestPrincipal` extrait `userId`/`tenantId` des headers `X-Pivot-User-Id` /
`X-Pivot-Tenant-Id` — **pas** du `SecurityContext`/token opaque comme le prévoyait la note
d'implémentation d'origine de la fiche backlog. Écart assumé et documenté explicitement dans la PR
et son Gate 4 : aucune infrastructure de sécurité réelle n'existe encore dans ce repo (dépend de
`pivot-core-starter`, EN17.1, toujours partiel — voir `pivot-core#171`). Migration vers
`SecurityContext` prévue à la publication réelle du starter, pas avant. Risque jugé borné au Gate 4
(88/100) : headers non falsifiables *pour l'instant* car aucun autre mécanisme d'auth n'existe à
contourner.

### Points relevés au Gate 4 (non bloquants, suivi)

- `findAccessible()` (US08.1.2) résout le rôle par board individuellement (N+1) — accepté pour le
  Socle, à remplacer par une jointure/projection batch si le volume le justifie
- Journalisation d'audit (`logAuditEvent`) via `java.util.logging`, pas le format JSON structuré
  standard — stub bootstrap explicite, TODO service d'audit centralisé
- `BoardControllerIT` partage des UUID statiques entre tests sans rollback — tests écrits pour
  rester indépendants de l'ordre (pas d'assertion sur `totalElements` global)

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US08.1.2 | Même PR — `findAccessible()` réutilise `Board`/`BoardMember` posés ici |
| US08.1.4, US08.1.5 | Même PR — réutilisent la convention 404/403 posée ici |
| US08.1.3 | Consomme `GET /whiteboard/boards` (US08.1.2) côté Angular |
| US08.4.1 | Réutilise `WhiteboardModuleCheck`/`BoardService.create` sans les dupliquer |
| EN17.1 | La migration `RequestPrincipal` → `SecurityContext` est bloquée sur l'extraction réelle du starter, toujours partielle |

## Hors périmètre (explicitement exclu)

- Création depuis un template (US08.4.1)
- Génération de thumbnail à la création (`thumbnailUrl` nullable, US08.1.2)
- Quota / limite du nombre de tableaux par tenant ou utilisateur
