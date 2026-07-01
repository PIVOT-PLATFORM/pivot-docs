# ADR-005 — Opaque tokens pour l'authentification interne

**Statut :** Accepté
**Date :** 2026-06-20

## Contexte

PIVOT doit gérer des sessions utilisateur pour le flux d'authentification interne
(email / password). Deux approches principales : JWT auto-signé ou opaque token avec
lookup en base de données.

ADR-004 couvre l'OIDC enterprise (JWT émis par un IdP externe). Ce document couvre
exclusivement l'auth **interne**.

## Décision

**Opaque tokens** : token 256-bit SecureRandom, hash SHA-256 stocké en BDD (`access_tokens`),
raw token jamais persisté côté serveur, TTL géré en BDD, révocable immédiatement.

## Raisons

### Pourquoi pas de JWT (HS256/RS256) en session interne

| Problème JWT | Impact |
|-------------|--------|
| Non révocable sans blacklist | Un token volé reste valide jusqu'à expiration |
| TTL fixe dans le token | Impossible d'invalider sans rotation de clé |
| Payload lisible (base64) | Fuite de métadonnées si intercepté |
| Stockage côté client | localStorage → vulnérable XSS ; cookie → CSRF |
| Complexité rotation de clés | Gestion des clés HMAC/RSA en infra auto-hébergée |

### Pourquoi opaque tokens

- **Révocabilité immédiate** : suppression en BDD → session invalide à la prochaine requête
- **Pas de payload** : aucune information exposée côté client
- **TTL flexible** : modifiable sans réémettre le token
- **Multi-session contrôlable** : max 5 sessions par utilisateur (feature flag `MAX_SESSIONS_PER_USER`)
- **Audit natif** : chaque token = ligne BDD avec `created_at`, `last_used_at`, `device_info`
- **Cohérence auto-hébergée** : pas de PKI à gérer, juste PostgreSQL

### Pourquoi pas de sessions côté serveur (HttpSession)

- Incompatible avec un déploiement multi-instance stateless
- Redis session store complexifie l'infra sans gain vs opaque token en BDD

## Implémentation

```java
// Génération
byte[] raw = new byte[32];
SecureRandom.getInstanceStrong().nextBytes(raw);
String rawToken = Base64.getUrlEncoder().withoutPadding().encodeToString(raw);
String hash = sha256hex(rawToken);

// Stockage (jamais le raw token)
accessTokenRepository.save(new AccessToken(userId, hash, expiresAt));

// Retour client (une seule fois)
return rawToken;

// Validation à chaque requête
String hash = sha256hex(bearerToken);
AccessToken token = accessTokenRepository.findByHashAndNotExpired(hash)
    .orElseThrow(UnauthorizedException::new);
```

Table BDD : `access_tokens` (colonnes : `id`, `user_id`, `token_hash`, `expires_at`,
`created_at`, `last_used_at`, `revoked`).

### Côté Angular (pivot-ui)

- Token stocké en mémoire uniquement (`AuthService`, signal privé)
- **Jamais localStorage** (XSS) — **jamais cookie** (CSRF)
- Propriété `expiresAt` pour auto-refresh côté client avant expiration
- `isAuthenticated()` vérifie `expiresAt > Date.now()` (pas juste token != null)

## Conséquences

- Lookup BDD à chaque requête API — index sur `token_hash` requis (PostgreSQL hash index)
- Nettoyage des tokens expirés : job planifié ou purge lazy à la connexion
- En cas de perte du token client (refresh page sans restore) : re-authentification requise
- Pas de déconnexion "push" côté client — l'UI détecte l'expiration via `expiresAt`

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-06-20 | Décision initiale |
