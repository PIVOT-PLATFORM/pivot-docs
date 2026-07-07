# US08.2.1 — Owner partage un tableau par lien public

## Contexte

- **US** : [`us-partager-tableau.md`](pathname:///pivot-docs/backlog/EPIC-collaboration/FEATURES/partage-roles/us-partager-tableau) · Parent `F08.2` · Module `collaboratif` · Phase Socle · Sprint 5
- **PR** : `pivot-collaboratif-core` [#21](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/21)
- **Commit figé** : `5843603` (`feat(whiteboard): share token generation and revocation — US08.2.1`)
- **Gate 4 au figeage** : 100/100 — MERGE_AUTONOMOUS (détail complet dans le commentaire de review de la PR)

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Le OWNER d'un tableau peut générer un lien d'invitation à usage limité permettant à d'autres
utilisateurs de rejoindre le tableau avec un rôle fixé (EDITOR ou VIEWER). Le lien est valide
pendant une durée configurable (défaut 7 jours, max 30 jours) et pour un nombre d'utilisations
configurable (défaut 1 usage).

Le OWNER peut révoquer un token à tout moment. Après révocation, tout accès via le lien correspondant
est rejeté (404).

### Règles métier

- Seul le OWNER du tableau peut générer ou révoquer des tokens d'invitation — non-OWNER → 403.
- Le rôle assigné au token doit être EDITOR ou VIEWER. Toute tentative de créer un token de rôle
  OWNER retourne 400 INVALID_ROLE.
- Un tableau inexistant ou appartenant à un autre tenant retourne 404 (anti-énumération).
- Le token en clair est inclus une seule fois dans la réponse de génération (`shareLink`), jamais
  persisté en BDD ni écrit dans les logs.
- Seul le hash SHA-256 du token est stocké dans la colonne `token_hash` (type `VARCHAR(64)`).
- La révocation d'un token déjà révoqué ou d'un tokenId inexistant retourne 404 (pas d'idempotence
  garantie — action explicite requise pour chaque révocation).

### Décision PO : valeurs par défaut TTL et maxUses

La Note d'implémentation de l'US signalait une ambiguïté sur le TTL par défaut. Décision produit
actée à l'implémentation :

| Paramètre | Valeur par défaut | Valeur maximale |
|-----------|-------------------|-----------------|
| `ttlDays` | 7 jours | 30 jours (plafond enforced côté service) |
| `maxUses` | 1 (usage unique) | 100 (contrainte `@Max(100)` sur le DTO) |

Ces valeurs correspondent à l'usage d'invitation le plus courant (lien à usage unique, durée
d'une semaine) tout en offrant de la flexibilité pour des partages plus larges.

## Contrat technique final

### Endpoint de génération

`POST /api/collaboratif/whiteboard/boards/{boardId}/share`

**En-têtes requis (provisoires — avant branchement `pivot-core-starter`) :**

| En-tête | Type |
|---------|------|
| `X-Pivot-User-Id` | UUID |
| `X-Pivot-Tenant-Id` | UUID |

**Corps de la requête (`application/json`) :**

```json
{
  "role": "EDITOR",
  "maxUses": 1,
  "ttlDays": 7
}
```

Seul `role` est obligatoire. `maxUses` et `ttlDays` sont optionnels (valeurs par défaut appliquées
si absents).

**Réponse 201 Created :**

```json
{
  "tokenId": "550e8400-e29b-41d4-a716-446655440000",
  "boardId":  "a1b2c3d4-...",
  "shareLink": "http://localhost:4200/whiteboard/join?token=<base64url_plain_token>",
  "role": "EDITOR",
  "expiresAt": "2026-07-14T17:21:00Z"
}
```

Le champ `shareLink` contient le token en clair encodé en Base64URL (43 caractères, sans padding,
256 bits d'entropie). C'est la seule occurrence du token en clair — jamais répétée.

**Erreurs :**

| Cas | Code |
|-----|------|
| `role` absent ou null | 400 (validation `@NotNull`) |
| `role` = OWNER | 400 INVALID_ROLE |
| `maxUses` hors [1, 100] | 400 |
| `ttlDays` hors [1, 30] | 400 |
| Appelant non OWNER du tableau | 403 |
| `boardId` inexistant ou autre tenant | 404 |

### Endpoint de révocation

`DELETE /api/collaboratif/whiteboard/boards/{boardId}/share/{tokenId}`

**Réponse 204 No Content** — token marqué révoqué (`revokedAt` = now).

**Erreurs :**

| Cas | Code |
|-----|------|
| Appelant non OWNER du tableau | 403 |
| `boardId` inexistant ou autre tenant | 404 |
| `tokenId` inexistant, autre board, ou déjà révoqué | 404 |

### Schéma BDD (`collaboratif.board_share_token`)

```sql
CREATE TABLE IF NOT EXISTS collaboratif.board_share_token (
    id          UUID         NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    board_id    UUID         NOT NULL REFERENCES collaboratif.board(id) ON DELETE CASCADE,
    token_hash  VARCHAR(64)  NOT NULL UNIQUE,  -- SHA-256 hex
    role        VARCHAR(20)  NOT NULL,
    max_uses    INTEGER      NOT NULL DEFAULT 1,
    use_count   INTEGER      NOT NULL DEFAULT 0,
    expires_at  TIMESTAMPTZ  NOT NULL,
    revoked_at  TIMESTAMPTZ,                   -- NULL = actif
    created_by  UUID         NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_share_token_board_id ON collaboratif.board_share_token(board_id);
CREATE INDEX IF NOT EXISTS idx_share_token_hash     ON collaboratif.board_share_token(token_hash);
```

La suppression d'un board entraîne la suppression en cascade de tous ses tokens (`ON DELETE CASCADE`).

### Génération du token

```text
SecureRandom.nextBytes(32)                    -- 256 bits d'entropie
→ Base64URL sans padding (43 caractères)      -- plain token (retourné dans shareLink, jamais stocké)
→ SHA-256 hex (64 caractères)                 -- token_hash (seule valeur persistée)
```

L'URL du shareLink est composée à partir de la propriété de configuration
`pivot.share.base-url` (défaut `http://localhost:4200`).

### Classes Java concernées

| Classe | Rôle |
|--------|------|
| `BoardShareToken` | Entité JPA — `isUsable(Instant)`, `revoke(Instant)` |
| `BoardShareTokenRepository` | `findActiveByIdAndBoardId(UUID, UUID)` — filtre `revokedAt IS NULL` |
| `ShareBoardRequest` | DTO entrée — `role (@NotNull)`, `maxUses (@Min(1) @Max(100))`, `ttlDays (@Min(1) @Max(30))` |
| `ShareBoardResponse` | DTO sortie — `tokenId`, `boardId`, `shareLink`, `role`, `expiresAt` |
| `BoardShareService` | Génération + révocation — constantes `DEFAULT_TTL_DAYS=7`, `MAX_TTL_DAYS=30`, `DEFAULT_MAX_USES=1` |
| `BoardShareController` | POST → 201, DELETE → 204 |
| `BoardShareTokenNotFoundException` | 404 token inexistant/révoqué/autre board |

## Audit

Un événement d'audit est journalisé pour chaque opération :

- `BoardShared` — génération d'un token (boardId, actorId, role, expiresAt)
- `BoardShareRevoked` — révocation d'un token (boardId, actorId, tokenId)

## Cohérence avec les US suivantes

| US | Dépendance |
|----|------------|
| US08.2.2 | Utilise `token_hash` pour vérifier et consommer le token à la jointure |
| US08.2.3 | Angular : génération du lien + liste des tokens actifs + révocation depuis l'UI |

## Hors périmètre

- Comptage des usages (`use_count` prévu en BDD, non incrémenté dans cette US — implémenté en US08.2.2 à la jointure)
- Dépassement du quota d'usages (`maxUses`) → 410 Gone — implémenté en US08.2.2
- Partage par email/notification automatique
- Renouvellement/prolongation d'un token existant

---

Item Type: US · Parent: F08.2 · Module: collaboratif · Phase: Socle · Sprint 5
Stage: Review
