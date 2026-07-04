# US01.7.1 — Connexion OIDC enterprise (SSO)

**En tant que** utilisateur d'un tenant enterprise
**Je veux** me connecter via le SSO de mon entreprise (Keycloak, Azure AD, Okta)
**Afin d'** accéder à PIVOT sans compte PIVOT distinct

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| `GET /auth/oidc/config?tenantSlug=xxx` → retourne `{ issuerUri, clientId, scopes }` | ✅ |
| Angular PKCE S256 : génération `code_verifier` + `code_challenge`, redirect IdP | ✅ |
| Callback IdP → `POST /auth/oidc/exchange` avec `{ tenantSlug, accessToken, deviceInfo }` | ✅ |
| Backend valide JWT IdP via JWKS (spring-security-oauth2-jose) | ✅ |
| Claims mappés vers `User` (email, nom, sub = OIDC subject) | ✅ |
| Session opaque créée (même mécanisme que login classique) | ✅ |
| Access token IdP jamais stocké — session PIVOT uniquement | ✅ |
| Device confirmation OTP si nouvel appareil | ✅ |
| Azure AD : validation `tid` (tenant ID) si configuré | ✅ |
| Test `OidcAuthControllerTest`, `OidcAuthServiceTest` | ✅ |

## Notes d'implémentation
- `TenantOidcConfig` : `issuerUri`, `clientId`, `scopes`, `claimsMapping`, `jitEnabled`, `azureTenantId`, `jwksOverride`
- `OidcAuthController` : config endpoint + exchange endpoint
- Config JWKS override pour IdP internes (sans discovery)

---
Item Type: US · Parent: F01.7 · Module: oidc · Phase: v1-enterprise · Size: L · Priority: High
Stage: Done
