# US08.2.5 — Inviter par email + gouvernance des rôles

## Contexte

- **US** : [`us-inviter-email.md`](pathname:///pivot-docs/backlog/EPIC-collaboration/FEATURES/partage-roles/us-inviter-email) · Parent `F08.2` · Module `collaboratif` · Phase Socle · Sprint 16
- **PR backend** : `pivot-collaboratif-core` [#108](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/108) — commit HEAD `46eb3b8` (branche `feat/us08-2-5-inviter-email`, état `ready`, label `security`)
- **PR frontend** : `pivot-collaboratif-ui` [#169](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/169) — commit HEAD `a8f66b9e` (branche `feat/us08-2-5-inviter-email`, état `ready`)
- **Gate 4 au figeage** : backend `HOLD / needs-human-review` (hard block sécurité §6.1, Breaking Point 2) · frontend `90/100` — détail dans les commentaires de review des PR
- **CI au figeage** : backend verte (Tests TU+TI, SonarCloud, Semgrep, CodeQL, Trivy, Gitleaks, Docker, Plumber) ; frontend en cours

> Spec figée avant merge : les deux PR sont `ready` mais non fusionnées (le merge séquentiel est
> orchestré ensuite ; la PR backend porte le label `security` = revue humaine obligatoire).

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Un manager d'un tableau (OWNER ou EDITOR) invite un utilisateur **nommé par son email** avec un
rôle, et gère les rôles des partages existants, sans passer par le lien public. La hiérarchie des
rôles est stricte : un EDITOR ne peut jamais toucher à un OWNER (ni le promouvoir, ni le
rétrograder, ni le révoquer) ni attribuer le rôle OWNER. Chaque action émet une notification in-app
à la personne concernée.

Le modèle `BoardShare` de la spec de référence est réconcilié avec l'entité **`BoardMember`**
existante (pas de table dupliquée) : une clé de substitution `shareId` board-indépendante est
ajoutée à `board_member`, cible stable des routes `/shares/{shareId}` et support du scoping
`(shareId, boardId)`.

### Endpoints (`/api/collaboratif/whiteboard/boards/{boardId}/shares`)

1. **`POST /invite`** — `{ email (valide), role ∈ {VIEWER, EDITOR, OWNER} défaut VIEWER }`.
   Garde `canManageShares` (OWNER ou EDITOR ; VIEWER → 403 ; non-membre → 404). Ordre des refus :
   1. manager EDITOR + `role = OWNER` → **403**
   2. email inconnu (aucun utilisateur actif du même tenant) → **404**
   3. auto-invitation → **400** (`SELF_INVITE`)
   4. email = créateur du board → **400** (`ALREADY_OWNER`)

   Upsert sur `(boardId, userId)` : nouveau partage → notif `BOARD_SHARED` ; rôle différent d'un
   partage existant → notif `ROLE_CHANGED` ; même rôle → no-op fonctionnel, aucune notification.
   Réponse **201**.
2. **`PATCH /{shareId}`** — `{ role }` requis. `canManageShares` ; un EDITOR ne peut ni attribuer
   OWNER ni modifier une cible **déjà OWNER** (403). Notif `ROLE_CHANGED` **systématique** (sans
   comparaison avec l'ancien rôle, contrairement à l'invite). Scoping `where { id: shareId,
   boardId }`. Réponse **200**.
3. **`DELETE /{shareId}`** — `canManageShares` ; un EDITOR ne peut pas révoquer une cible OWNER
   (403). Scoping `where { id: shareId, boardId }`. Notif `ACCESS_REVOKED` au membre retiré.
   Réponse **204**.

### Jointure via lien (comportement modifié)

`POST /whiteboard/join?token={token}` adopte une sémantique **upsert `update:{}`** : le créateur
renvoie OWNER sans upsert ; un membre déjà présent conserve son rôle (jamais rétrogradé/promu,
aucune consommation de quota de token) ; seul un nouveau membre est créé et consomme un usage.
**Supersede** le comportement `409` (déjà membre / propriétaire) de US08.2.2.

### Créateur du board

`Board.ownerId` n'est jamais atteignable via les routes `/shares` : sa ligne `board_member`
(ensemencée à la création) est traitée comme non-partage (404 si ciblée par `shareId`), et une
invitation nommant son email est refusée en 400. Aucune méthode n'écrit `Board.ownerId`.

### Sécurité

| Propriété | Mécanisme |
|-----------|-----------|
| Fix IDOR §6.1 (POC PouetPouet) | `PATCH`/`DELETE` scopés par `boardId` explicite (`findByShareIdAndIdBoardId(shareId, boardId)`) — un manager du board A ne peut jamais résoudre ni altérer un partage du board B, même en connaissant son `shareId` → 404 |
| Résolution identité | `tenantId` et `userId` du manager exclusivement issus du `RequestPrincipal` (token opaque, EN08.3) — jamais du path/body |
| Gouvernance sur état actuel | La vérification EDITOR vs OWNER porte sur le rôle **relu en base** de la ligne cible, jamais sur une valeur transmise par le client |
| Isolation tenant email | Résolution email tenant-scopée (`findByEmailIgnoreCaseAndTenantIdAndActiveTrue`) — email d'un autre tenant traité comme inconnu → 404 (pas d'énumération inter-tenant) |
| Anti-énumération | Board/share inconnu, hors tenant, ou incohérent → 404 |

## Contrat technique final

### Réponse `ShareResponse` (201 / 200)

```json
{
  "shareId": "426a83d7-62ed-4bcf-8cac-7a726984d5bb",
  "userId": 87,
  "role": "VIEWER",
  "joinedAt": "2026-07-17T16:00:32.065Z"
}
```

### Codes d'erreur

| Code HTTP | `code` ProblemDetail | Raison |
|-----------|----------------------|--------|
| 400 | `INVALID_EMAIL` | email vide ou syntaxiquement invalide |
| 400 | `SELF_INVITE` | le manager s'invite lui-même |
| 400 | `ALREADY_OWNER` | l'email est celui du créateur du board |
| 400 | `INVALID_ROLE` | `role` absent en `PATCH` |
| 401 | — | token bearer absent ou invalide |
| 403 | — | VIEWER (non manager), EDITOR attribuant OWNER, ou EDITOR ciblant/révoquant un OWNER |
| 404 | `INVITEE_NOT_FOUND` | aucun utilisateur actif du tenant pour cet email |
| 404 | — | board ou `shareId` inconnu, hors tenant, incohérent, ou ciblant le créateur |

### Schéma BDD impacté — `V7__board_share_invite_notifications.sql`

- `collaboratif.board_member` — colonne ajoutée `share_id UUID NOT NULL DEFAULT gen_random_uuid()`,
  contrainte `UNIQUE (share_id)`. Clé de substitution board-indépendante (le PK reste
  `(board_id, user_id)`).
- `collaboratif.notification` — nouvelle table : `id`, `tenant_id`, `recipient_user_id`,
  `actor_user_id`, `board_id` (FK `board` `ON DELETE CASCADE`), `type`, `body`, `created_at`,
  `read_at`. FK vers `public.*` sans cascade (modèle de désactivation/soft-delete, ADR-022).

> Migration V7 : le schéma `collaboratif` porte déjà V1–V6 ; l'édition en place de V1 est évitée
> (piège connu). Nouvelle version numérotée.

### Classes Java principales

| Classe | Rôle |
|--------|------|
| `BoardInviteController` | `POST /shares/invite`, `PATCH /shares/{shareId}`, `DELETE /shares/{shareId}` |
| `BoardInviteService` | Gouvernance, upsert, scoping IDOR, ordre des refus |
| `UserDirectoryEntry` / `UserDirectoryRepository` | Résolution email → user tenant-scopée (lecture seule `public.users`) |
| `NotificationService` / `Notification` / `NotificationType` | Notifications in-app `BOARD_SHARED` / `ROLE_CHANGED` / `ACCESS_REVOKED`, corps FR |
| `InvalidInvitationException` / `InviteeNotFoundException` | → 400 (`SELF_INVITE`/`ALREADY_OWNER`) / 404 (`INVITEE_NOT_FOUND`) |
| `BoardMember` (étendu) | Surrogate `shareId` + `findByShareIdAndIdBoardId` |
| `BoardJoinService` (modifié) | Upsert `update:{}` — jointure ne rétrograde/promeut jamais |

### Notifications — libellés FR

`{ VIEWER: 'lecteur', EDITOR: 'éditeur', OWNER: 'propriétaire' }`.

### Frontend (`pivot-collaboratif-ui`)

`SharePanelComponent` : formulaire d'invitation par email (input labellisé + select de rôle borné
par `managerRole` — un EDITOR n'expose jamais OWNER). Erreurs annoncées `role="alert"`, mappées
depuis le status HTTP + `code` (`unknownEmail`/`selfInvite`/`creatorInvite`/`forbiddenRole`/
`invalidEmail`/`generic`). Clés i18n `whiteboard.share.invite.*` et `whiteboard.share.error.*`
(fr + en). La confirmation de révocation (`aria-modal` + piège à focus) réutilise celle de
US08.2.3.

> **Drift i18n pivot-ui** : vérifié via `pivot-ui/scripts/merge-module-i18n.mjs` — le deep-merge
> ajoute les **nouveaux** sous-arbres (`whiteboard.share.invite`/`error`) absents du shell. Le
> shell ne possède que `whiteboard.share.panel` → pas de conflit de feuille, aucune PR pivot-ui
> requise (le drift ne concerne que les clés déjà dupliquées côté shell).

## Cohérence avec US connexes

| US | Relation |
|----|---------|
| US08.2.1 | Génération du lien public — inchangée ; l'invite nominale est un canal distinct |
| US08.2.2 | **Superseded** : la jointure via lien passe de `409` (déjà membre/propriétaire) à un upsert `update:{}` no-op qui ne rétrograde jamais |
| US08.2.3 | Fournit `SharePanelComponent` (liste membres, changement de rôle via `/members`, dialog de révocation) — étendu ici par le formulaire d'invitation |
| US08.1.1 | Définit `board_member` — étendu ici par la colonne `share_id` |

## Hors périmètre

- Invitation d'un utilisateur **sans compte** (onboarding self-service) — l'invite exige un
  utilisateur existant du même tenant (404 sinon)
- Envoi d'un email transactionnel réel — cette US produit une **notification in-app**, le canal
  email sortant est hors périmètre
- Génération/révocation du lien public (US08.2.1) et jointure par token (US08.2.2)
- UI complète de transfert de propriété (promotion OWNER par un OWNER reste possible par le
  contrat, sans écran dédié)
- Vue d'historique/audit des invitations et révocations dans l'UI
