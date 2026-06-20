# ADR-004 — OIDC Multi-tenant

**Statut :** Accepté
**Date :** 2026-06-20

## Contexte

PIVOT doit s'intégrer avec n'importe quel IdP (Keycloak, Azure AD, Okta…) et supporter plusieurs tenants avec des configurations d'auth distinctes.

## Décision

- **Flux :** Authorization Code + PKCE S256 (côté Angular)
- **Validation :** Spring Security OAuth2 Resource Server (côté Spring Boot)
- **Mapping claims :** configurable par tenant
- **Rôles :** portés via claims OIDC, mappés côté Spring Security

## Raisons

- **PKCE S256** : standard actuel pour SPAs — pas de client_secret exposé côté navigateur
- **Stateless** : pivot-core valide chaque JWT via JWKS, pas de session serveur
- **Configurable** : un seul binaire Spring Boot, `OIDC_ISSUER_URI` variable d'environnement par tenant
- vs sessions serveur : stateless = scalabilité horizontale sans sticky sessions
- vs custom JWT : réutilise les IdPs existants des clients enterprise (Azure AD, Okta…)

## Sécurité

| Contrainte | Implémentation |
|------------|----------------|
| Token en mémoire uniquement | Côté Angular — jamais localStorage |
| Silent refresh | iframe OIDC ou rotating refresh token |
| CORS strict | `CORS_ALLOWED_ORIGINS` configurable |
| CSP | Headers nginx (pivot-ui) |
| Validation signature | Spring Security via JWKS endpoint |

## Conséquences

- Chaque tenant doit avoir un IdP compatible OIDC
- Le mapping claims → rôles doit être documenté pour chaque IdP supporté
- Silent refresh complexifie les tests E2E (mock nécessaire)

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-06-20 | Décision initiale |
