# EN01.1 — Opaque Tokens (infrastructure)

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Infrastructure de tokens de session opaques SHA-256 stockés en BDD. Remplace JWT. Révocation immédiate possible. Pas de payload décodable côté client.

**Justification** : JWT (HS*/RS*) = interdit dans les règles absolues PIVOT. Token opaque = révocation en O(1) via BDD, pas de fuite de claims, TTL maîtrisé.

**Critères de complétion** :
- [x] Table `access_tokens` (id, user_id, token_hash VARCHAR(64), created_at, expires_at, revoked_at)
- [x] `TokenService.generateToken()` : 256-bit SecureRandom → raw token → SHA-256 → BDD
- [x] `TokenService.validateToken()` : hash reçu → lookup BDD → vérif expiry + revoked
- [x] Raw token transmis une seule fois (réponse), jamais stocké
- [x] `TokenCleanupJob` : purge périodique des tokens expirés/révoqués

**Statut** : ✅ Fait — Stage: Done

---
Item Type: Enabler · Parent: E01 · Type: architecture · Module: auth · Phase: MVP
Stage: Done
