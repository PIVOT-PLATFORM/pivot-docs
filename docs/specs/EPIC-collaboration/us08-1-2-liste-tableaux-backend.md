# US08.1.2 — Utilisateur liste ses tableaux (backend)

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/crud-tableaux/us-liste-tableaux-backend.md` (F08.1 — CRUD tableaux, EPIC-collaboration E30)
- **PR** : `pivot-collaboratif-core` [#19](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/19)
  (`feat/us08-1-1-creer-tableau`) — même PR que US08.1.1, CRUD complet
- **Merge commit** : `b13e34c`
- **Gate 2 COVERAGE** : couvert par les 16 tests unitaires + 13 scénarios IT de la PR #19 (dont un
  dédié à l'isolation cross-tenant sur la liste)
- **Gate 4 MERGE_CONFIDENCE** : 88/100 — auto-approuvé (voir détail complet dans la spec US08.1.1)
- **Dépend de** : US08.1.1 (entités `Board`/`BoardMember`)

---

## Spec fonctionnelle

### `GET /whiteboard/boards`

- Retourne les boards accessibles à l'appelant : `owner_id = userId OR` membre via `board_member`,
  filtré par `tenant_id`
- Pagination Spring Data `Pageable` (`page`, `size`) ; `size` plafonné à 50 côté serveur même si le
  client en demande plus ; `size` négatif ou nul → 400
- Réponse : `id, title, role, createdAt, updatedAt, thumbnailUrl, activeParticipantCount`,
  `totalElements`, `totalPages`, `currentPage`, `hasNext`
- `role` ∈ `owner | editor | viewer` — résolu par board (voir N+1 noté au Gate 4, spec US08.1.1)
- `thumbnailUrl` : toujours `null` en Socle (génération de miniature hors scope)
- `activeParticipantCount` : alimenté par le registre de présence WebSocket (EN08.1), pas encore
  branché à l'écriture de cette US (EN08.1 mergée séparément, après)
- Test IT dédié : deux tenants distincts, vérifie qu'aucun board de l'autre tenant n'apparaît

---

## Contrat technique

Voir `docs/specs/EPIC-collaboration/us08-1-1-creer-tableau.md` — fichiers introduits, écart
d'authentification (headers `X-Pivot-User-Id`/`X-Pivot-Tenant-Id`, TODO EN17), et points relevés
au Gate 4 sont communs aux deux US (même PR).

### Endpoint

| Méthode | URL | Réponse |
|---------|-----|---------|
| `GET` | `/whiteboard/boards?page={n}&size={s}` | `BoardPageResponse` (liste paginée) |

### DTO

`BoardPageResponse` — voir `whiteboard/board/dto/BoardPageResponse.java` : encapsule
`List<BoardResponse>` + métadonnées de pagination (`totalElements`, `totalPages`, `currentPage`,
`hasNext`).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US08.1.1 | Même PR — entités et convention 404/403 partagées |
| US08.1.3 | `GET /whiteboard/boards` consommé par la liste Angular |
| EN08.1 | `activeParticipantCount` sera alimenté par le registre de présence une fois branché côté Angular (US08.1.3+) |

## Hors périmètre (explicitement exclu)

- Filtrage par rôle ou par statut d'activité récente
- Génération/calcul de `thumbnailUrl` (valeur `null` acceptée)
