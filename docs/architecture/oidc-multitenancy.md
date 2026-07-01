# Authentification — PIVOT

PIVOT supporte deux mécanismes d'authentification distincts. Voir [ADR-004](https://pivot-platform.github.io/pivot-docs/adr/ADR-004-oidc-multi-tenant) et [ADR-005](https://pivot-platform.github.io/pivot-docs/adr/ADR-005-opaque-tokens).

---

## 1. Auth interne — Opaque tokens (email / password)

Mécanisme par défaut pour tous les tenants sans IdP externe.

```text
Utilisateur → pivot-ui → POST /api/auth/login (email + password)
                              ↓
                       pivot-core valide credentials
                              ↓
                       Génère token 256-bit SecureRandom
                       → hash SHA-256 stocké en BDD (access_tokens)
                       → raw token renvoyé UNE SEULE FOIS dans la réponse
                              ↓
pivot-ui stocke le token EN MÉMOIRE uniquement
pivot-ui → pivot-core  Authorization: Bearer {raw_token}
                              ↓
                       pivot-core retrouve le hash SHA-256
                       → vérifie TTL + révocation
```

| Propriété | Valeur |
|-----------|--------|
| Entropie | 256 bits (SecureRandom) |
| Stockage serveur | SHA-256 du token en BDD (`access_tokens`) |
| Stockage client | Mémoire uniquement — jamais localStorage, jamais cookie |
| TTL | Configurable en BDD (feature flag) |
| Sessions max | 5 par utilisateur (configurable via feature flag `MAX_SESSIONS_PER_USER`) |
| Révocation | Immédiate (suppression en BDD) |

### Configuration côté Spring Boot

```yaml
# Pas de JWT/OAuth2 resource server pour l'auth interne.
# Spring Security filtre via un TokenAuthenticationFilter custom
# qui lookup le hash SHA-256 en BDD à chaque requête.
```

---

## 2. Auth enterprise — OIDC PKCE S256 (IdP externe)

Pour les tenants avec Keycloak, Azure AD, Okta ou autre IdP compatible OIDC.

```text
Utilisateur → pivot-ui → IdP (Keycloak / Azure AD / Okta)
                ↓ Authorization Code + PKCE S256
            code → token endpoint IdP
                ↓ Access Token (JWT signé par l'IdP)
pivot-ui stocke le token EN MÉMOIRE uniquement
pivot-ui → pivot-core  Authorization: Bearer {jwt_from_idp}
                ↓
pivot-core valide signature via JWKS de l'IdP
→ extrait claims → mappe roles Spring Security
```

| Paramètre | Valeur |
|-----------|--------|
| Flux | Authorization Code + PKCE S256 (pas d'implicit flow) |
| Token storage | Mémoire uniquement — jamais localStorage |
| Silent refresh | Iframe OIDC ou rotating refresh token (selon IdP) |
| Intercepteur Angular | `Authorization: Bearer {token}` sur toutes les requêtes API |

### Configuration côté Spring Boot

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: ${OIDC_ISSUER_URI}
```

Spring Security valide le JWT via le JWKS de l'IdP. Pas de client_secret côté Angular.

### Configuration multi-tenant

Un `TenantOidcConfig` par tenant. Provisionnement JIT configurable.
Variable d'environnement `OIDC_ISSUER_URI` — un binaire Spring Boot, N tenants.

---

## 3. Rôles et mapping claims

| Rôle Spring | Claim OIDC (enterprise) | Périmètre |
|-------------|------------------------|-----------|
| `ROLE_SUPER_ADMIN` | `pivot_super_admin: true` | Plateforme entière |
| `ROLE_ADMIN` | `pivot_role: admin` | Tenant de l'utilisateur |
| `ROLE_USER` | `pivot_role: user` | Tenant de l'utilisateur |
| `ROLE_GUEST` | Aucun (token de session live) | Session live uniquement |

Pour l'auth interne, les rôles sont stockés en BDD et portés dans le `SecurityContext`
via le `TokenAuthenticationFilter`.

---

## 4. Sécurité transversale

| Contrainte | Implémentation |
|------------|----------------|
| Token jamais persisté côté client | Mémoire uniquement (opaque ou JWT) |
| Pas d'implicit flow | PKCE S256 obligatoire pour OIDC |
| Validation serveur | Stateless : pivot-core valide chaque requête |
| CORS | `CORS_ALLOWED_ORIGINS` configurable |
| CSP | Headers nginx (pivot-ui) — bloque injection scripts tiers |
| Révocation opaque token | Suppression en BDD → invalide immédiatement |

---

## Voir aussi

- [ADR-004 — OIDC Multi-tenant](https://pivot-platform.github.io/pivot-docs/adr/ADR-004-oidc-multi-tenant)
- [ADR-005 — Opaque tokens (auth interne)](https://pivot-platform.github.io/pivot-docs/adr/ADR-005-opaque-tokens)
