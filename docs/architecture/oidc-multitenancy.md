# Authentification — PIVOT

PIVOT adopte le pattern **BFF (Backend For Frontend)** : Angular ne manipule jamais de token —
`pivot-core` porte le flux d'authentification côté serveur et expose l'état de connexion via un
cookie de session opaque. Voir [ADR-004](https://pivot-platform.github.io/pivot-docs/adr/ADR-004-oidc-multi-tenant)
et [ADR-005](https://pivot-platform.github.io/pivot-docs/adr/ADR-005-opaque-tokens).

---

## 1. Auth interne — email / password

Mécanisme par défaut pour tous les tenants sans IdP externe.

```text
Utilisateur → pivot-ui → POST /api/auth/login (email + password)
                              ↓
                       pivot-core valide credentials
                              ↓
                       Crée une session serveur (Spring Session JDBC)
                       → cookie SESSION (HttpOnly, Secure, SameSite=Lax)
                              ↓
pivot-ui n'a AUCUN token à gérer — le cookie est porté automatiquement par le navigateur
pivot-ui → GET /api/me  pour connaître l'état de connexion (200 + profil, ou 401)
```

| Propriété | Valeur |
|-----------|--------|
| Session serveur | Spring Session JDBC (table `SPRING_SESSION`, PostgreSQL) |
| Cookie navigateur | `SESSION` — `HttpOnly`, `Secure`, `SameSite=Lax` |
| Payload côté client | Aucun — identifiant de session opaque uniquement |
| TTL | Configurable en BDD (feature flag) |
| Sessions max | 5 par utilisateur (configurable via feature flag `MAX_SESSIONS_PER_USER`) |
| Révocation | Immédiate (suppression de la ligne `SPRING_SESSION`) |

### Configuration côté Spring Boot

```yaml
spring:
  session:
    store-type: jdbc
```

---

## 2. Auth enterprise — OIDC par tenant (IdP externe)

Pour les tenants avec Keycloak (embarqué en option), Azure AD, Okta, ADFS/SAML (via bridging
Keycloak) ou tout autre IdP compatible OIDC.

```text
Utilisateur → pivot-ui → GET /oauth2/authorization/{tenant}
                              ↓ redirection gérée entièrement par pivot-core (Spring Security)
                       Authorization Code + PKCE (côté serveur) → IdP du tenant
                              ↓ callback
                       pivot-core valide le JWT de l'IdP (jamais transmis à Angular)
                       → crée la même session serveur (Spring Session JDBC)
                       → cookie SESSION posé
                              ↓
pivot-ui → GET /api/me  (identique au flux interne — Angular ne distingue pas les deux)
```

| Paramètre | Valeur |
|-----------|--------|
| Flux | Authorization Code + PKCE, exécuté entièrement côté serveur (pivot-core) |
| Token IdP | Ne quitte jamais pivot-core — jamais exposé au navigateur |
| Résolution IdP | `ClientRegistrationRepository` dynamique, résolu par tenant depuis PostgreSQL |
| Découverte | `/.well-known/openid-configuration` par IdP de tenant |
| Keycloak embarqué | Optionnel (profil Docker Compose) — IdP par défaut pour tenants sans IdP, bridging SAML pour IdP legacy |

### Configuration côté Spring Boot

```yaml
spring:
  security:
    oauth2:
      client:
        registration: # résolu dynamiquement par tenant, pas de config statique en dur
```

Le `ClientRegistrationRepository` statique de Spring Boot est remplacé par une implémentation
qui charge (`issuer`, `client_id`, `client_secret`) depuis PostgreSQL selon le tenant identifié
(sous-domaine ou chemin), puis effectue la découverte OIDC standard.

---

## 3. Rôles et mapping claims

| Rôle Spring | Claim OIDC (enterprise) | Périmètre |
|-------------|------------------------|-----------|
| `ROLE_SUPER_ADMIN` | `pivot_super_admin: true` | Plateforme entière |
| `ROLE_ADMIN` | `pivot_role: admin` | Tenant de l'utilisateur |
| `ROLE_USER` | `pivot_role: user` | Tenant de l'utilisateur |
| `ROLE_GUEST` | Aucun (session live) | Session live uniquement |

Le mapping claims/groupes IdP → rôles internes est configurable par tenant (ex. groupe AD
`PIVOT-Admins` → rôle `admin`). Pour l'auth interne, les rôles sont stockés en BDD et portés
comme attribut de la session Spring Session JDBC. L'activation des modules par tenant est
vérifiée côté serveur à chaque requête, jamais seulement masquée côté Angular.

---

## 4. Sécurité transversale

| Contrainte | Implémentation |
|------------|----------------|
| Aucun token côté navigateur | Cookie de session opaque uniquement, dans les deux flux |
| Cookie de session | `HttpOnly`, `Secure`, `SameSite=Lax` |
| CSRF | Jeton CSRF requis sur les requêtes de mutation (`/api/**`), le cookie seul ne suffit pas |
| Validation serveur | pivot-core valide chaque requête via la session Spring Session JDBC |
| CORS | `CORS_ALLOWED_ORIGINS` configurable |
| CSP | Headers nginx (pivot-ui) — bloque injection scripts tiers |
| Révocation | Suppression de la session en BDD → invalide immédiatement |
| Secrets IdP par tenant | `client_secret` chiffré en base — voir ADR-014 |

---

## Voir aussi

- [ADR-004 — OIDC Multi-tenant via BFF](https://pivot-platform.github.io/pivot-docs/adr/ADR-004-oidc-multi-tenant)
- [ADR-005 — Session opaque (Spring Session JDBC)](https://pivot-platform.github.io/pivot-docs/adr/ADR-005-opaque-tokens)
