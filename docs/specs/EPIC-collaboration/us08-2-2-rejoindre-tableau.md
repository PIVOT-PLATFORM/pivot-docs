# US08.2.2 — Utilisateur rejoint un tableau via token

## Contexte

- **US** : [`us-rejoindre-tableau.md`](pathname:///pivot-docs/backlog/EPIC-collaboration/FEATURES/partage-roles/us-rejoindre-tableau) · Parent `F08.2` · Module `collaboratif` · Phase Socle · Sprint 5
- **PR** : `pivot-collaboratif-core` [#23](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/23)
- **Commit figé** : `9ddb03f` (`feat(whiteboard): join board via share token — US08.2.2 (#23)`)
- **Gate 4 au figeage** : 100/100 — `AUTO-MERGE` (détail complet dans le commentaire de review de la PR)

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Un utilisateur authentifié porteur d'un lien d'invitation (URL contenant un token opaque généré
par US08.2.1) appelle `POST /api/collaboratif/whiteboard/join?token={token}`. Le backend :

1. Extrait le token du paramètre de requête et calcule son hash SHA-256 ;
2. Vérifie le rate limit (10 tentatives/heure par userId **et** par IP) ;
3. Recherche le `board_share_token` correspondant par hash — introuvable → 404 ;
4. Vérifie que le token n'est pas révoqué (`revokedAt IS NULL`) — révoqué → 404 ;
5. Vérifie l'utilisabilité : `expiresAt` dans le futur **et** `useCount < maxUses` — sinon → 410 ;
6. Charge le board associé — board d'un autre tenant → 403 ;
7. Vérifie que l'appelant n'est pas déjà membre (entrée `board_members` ou `board.ownerId`) → 409 ;
8. Crée une entrée `board_member` avec le rôle du token, incrémente `useCount`, sauvegarde ;
9. Journalise `BoardJoined` en audit log ;
10. Retourne 200 + `JoinBoardResponse`.

### Sécurité

| Propriété | Mécanisme |
|-----------|-----------|
| Token opaque (256 bits) | SecureRandom — jamais stocké en clair |
| Hachage constant-time | `MessageDigest.isEqual` — résiste aux attaques temporelles |
| Rate limiting | Redis INCR+EXPIRE, clés `rate:join:user:{UUID}` et `rate:join:ip:{ip}`, fenêtre 1 h, max 10 tentatives → 429 |
| Isolation tenant | `board.tenantId ≠ caller.tenantId` → 403 (pas 404 — le board existe mais est refusé) |
| Token absent / vide | Rejeté en `@RequestParam` avant toute lecture BDD → 400 `INVALID_TOKEN_FORMAT` |

## Contrat technique final

### Endpoint

`POST /api/collaboratif/whiteboard/join?token={token}`

| Paramètre | Type | Contrainte |
|-----------|------|-----------|
| `token` | query string | présent et non vide — sinon 400 |

Headers requis : `X-Pivot-User-Id: {UUID}`, `X-Pivot-Tenant-Id: {UUID}` — absents → 401.

### Réponse 200

```json
{
  "boardId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Mon tableau collaboratif",
  "role": "EDITOR",
  "redirectUrl": "/whiteboard/550e8400-e29b-41d4-a716-446655440000"
}
```

### Codes d'erreur

| Code HTTP | Raison |
|-----------|--------|
| 400 | `token` absent ou vide (`INVALID_TOKEN_FORMAT`) |
| 401 | Headers `X-Pivot-User-Id` / `X-Pivot-Tenant-Id` manquants |
| 403 | Board d'un tenant différent de l'appelant |
| 404 | Token inconnu ou révoqué |
| 409 | Appelant déjà membre du board (ou propriétaire) |
| 410 | Token expiré ou quota `maxUses` épuisé |
| 429 | Rate limit dépassé (10 tentatives/heure par user ou par IP) |

### Schéma BDD impacté

Table `board_share_token` (définie en US08.2.1, `V1__schema_init.sql`) — champ `use_count` incrémenté par `incrementUseCount()`.

Table `board_member` (définie en US08.1.1) — nouvelle entrée créée à la jointure :

| Colonne | Valeur |
|---------|--------|
| `board_id` | `board_share_token.board_id` |
| `user_id` | `callerId` |
| `role` | `board_share_token.role` |
| `joined_at` | `Instant.now()` |

### Classes Java

| Classe | Rôle |
|--------|------|
| `BoardJoinController` | `POST /whiteboard/join` — valide token non vide, résout IP, délègue au service |
| `BoardJoinService` | Logique métier : hash, lookup, checks, création membre, audit |
| `JoinRateLimitService` | Rate limiting Redis par user + par IP |
| `JoinBoardResponse` | DTO de réponse `{ boardId, title, role, redirectUrl }` |
| `BoardShareTokenExpiredException` | → 410 Gone |
| `BoardAlreadyMemberException` | → 409 Conflict |
| `TooManyRequestsException` | → 429 Too Many Requests |

### Événement d'audit

```text
AUDIT BoardJoined board={boardId} actor={userId} role={role}
```

## Cohérence avec US connexes

| US | Relation |
|----|---------|
| US08.2.1 | Fournit les tokens `board_share_token` consommés ici — même schéma, même constante `SALT_LENGTH` |
| US08.2.3 | Consomme `GET /whiteboard/boards/{boardId}/members` (listé avec `joinedAt`) — le rôle EDITOR/VIEWER créé ici y apparaît |
| US08.1.1 | Définit `board_member` — jointure ici crée la même structure (sauf rôle OWNER) |

## Hors périmètre

- Création de compte à la volée pour un invité sans compte PIVOT
- Notification à l'owner quand un utilisateur rejoint
- Choix du rôle par l'utilisateur rejoignant (le rôle est strictement celui du token)
- Audit event `SuspiciousJoinAttempt` sur excès de rate limit (prévu dans les ACs, journalisé en TODO dans le service — non implémenté dans cette US, reporté)
