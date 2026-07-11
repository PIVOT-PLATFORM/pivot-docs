# US08.2.2 — Utilisateur rejoint un tableau via token

**En tant que** utilisateur invité
**Je veux** rejoindre un tableau en utilisant un lien d'invitation
**Afin d'** accéder à l'espace de collaboration

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| POST /api/whiteboard/join?token={token} ajoute l'utilisateur au tableau avec le rôle du token | ⬜ |
| 401 si non authentifié → redirection login puis retour au lien | ⬜ |
| 404/410 si token expiré ou invalide | ⬜ |
| 409 si utilisateur déjà membre (idempotent) | ⬜ |
| Tests TI POST /api/whiteboard/join | ⬜ |
| POST /api/whiteboard/join?token={token} vérifie que l'utilisateur authentifié appartient au même tenant que l'owner du tableau. Utilisateur cross-tenant → 403 | ⬜ |
| Le token d'invitation est un opaque token SecureRandom 256 bits, stocké hashé SHA-256 en BDD | ⬜ |
| Rate limit sur POST /api/whiteboard/join : 10 tentatives / heure par userId ET par IP → 429. Tentatives échouées répétées → audit event SuspiciousJoinAttempt | ⬜ |
| La comparaison du token d'invitation hashé utilise une comparaison à temps constant (MessageDigest.isEqual en Java) | ⬜ |
| Paramètre `token` absent ou vide → 400 BAD_REQUEST (INVALID_TOKEN_FORMAT) avant toute recherche en BDD | ⬜ |
| Succès (200) retourne `{ boardId, title, role, redirectUrl: "/whiteboard/{boardId}" }` — cohérent avec le contrat de réponse posé par US08.1.1 | ⬜ |

## Hors périmètre

- Création de compte à la volée pour un utilisateur externe non authentifié (le lien exige un compte existant du même tenant — pas d'onboarding self-service depuis ce flux ; voir US30.8.4 pour l'accès invité sans compte, hors socle F08.x)
- Notification à l'owner quand un utilisateur rejoint (couvert éventuellement par EN08.1/présence ou une US de notification ultérieure)
- Choix du rôle par l'utilisateur rejoignant : le rôle est strictement celui porté par le token, non négociable côté client

## Notes d'implémentation

- Endpoint : `POST /api/whiteboard/join?token={token}` → `BoardJoinController` (module whiteboard, schéma `collaboratif`)
- Recherche du token par hash SHA-256 (jamais en clair) dans `board_share_token`, puis vérification `expiresAt`, `useCount < maxUses`, `revokedAt IS NULL`
- Entrée `board_members` créée automatiquement à la jointure : `{ boardId, userId, role: <role du token> }` — même modèle que US08.1.1 (owner) et cohérent avec les rôles "editor"/"viewer" exposés par US08.1.2
- La vérification cross-tenant (403) s'appuie sur le TenantContext résolu depuis le token opaque de session de l'utilisateur authentifié, jamais sur une valeur transmise par le client

---
Item Type: US · Parent: F08.2 · Module: whiteboard · Phase: Socle · Size: S · Priority: High
Stage: ✅
Rôle: utilisateur-final
