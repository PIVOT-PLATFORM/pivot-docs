# OIDC Multi-tenant — PIVOT

## Flux d'authentification

```
Utilisateur → pivot-ui → IdP (Keycloak/Azure/Okta)
                ↓ PKCE S256
            Authorization Code
                ↓
            Access Token (JWT)
                ↓
pivot-ui → pivot-core (Bearer token)
                ↓
pivot-core valide signature + claims
```

## Configuration OIDC côté Angular (pivot-ui)

| Paramètre | Valeur |
|-----------|--------|
| Flow | Authorization Code + PKCE S256 |
| Token storage | Mémoire uniquement (jamais localStorage) |
| Silent refresh | Via iframe OIDC ou rotating refresh token |
| Intercepteur | `Authorization: Bearer {token}` sur toutes les requêtes API |

## Configuration côté Spring Boot (pivot-core)

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: ${OIDC_ISSUER_URI}
```

Spring Security valide le JWT via le JWKS de l'IdP. Pas de client_secret côté Angular.

## Rôles et mapping claims

| Rôle Spring | Claim OIDC | Périmètre |
|-------------|------------|-----------|
| `ROLE_SUPER_ADMIN` | `pivot_super_admin: true` | Plateforme entière |
| `ROLE_ADMIN` | `pivot_role: admin` | Tenant de l'utilisateur |
| `ROLE_USER` | `pivot_role: user` | Tenant de l'utilisateur |
| `ROLE_GUEST` | Aucun (token de session) | Session live uniquement |

Le mapping claims → rôles est configurable par tenant dans la configuration IdP.

## Sécurité

- **Pas de implicit flow** — PKCE S256 obligatoire
- **Access token en mémoire** — protège contre XSS
- **Validation côté serveur** — pivot-core valide chaque requête (stateless)
- **CORS** configuré strictement (`CORS_ALLOWED_ORIGINS`)
- **CSP** via headers nginx (pivot-ui) — bloque injection scripts tiers

## Voir aussi

- [ADR-004 — OIDC Multi-tenant](../adr/ADR-004-oidc-multi-tenant.md)
- [skill-oidc-angular](https://github.com/PIVOT-PLATFORM/pivot-ui/blob/main/.project/skills/skill-oidc-angular.yaml)
- [skill-oidc-security](https://github.com/PIVOT-PLATFORM/pivot-core/blob/main/.project/skills/skill-oidc-security.yaml)
