# ADR-004 — OIDC Multi-tenant via BFF (Backend For Frontend)

**Statut :** Accepté
**Date :** 2026-06-20 (révisé 2026-07-10)

## Contexte

PIVOT doit s'intégrer avec n'importe quel IdP par tenant (Keycloak, Azure AD, Okta, ADFS/SAML…)
et supporter plusieurs tenants avec des configurations d'auth distinctes, sans imposer de
composant IdP au client qui possède déjà le sien.

La v1 de cet ADR retenait un flux Authorization Code + PKCE S256 côté Angular, avec le JWT de
l'IdP gardé en mémoire côté SPA et relayé en `Authorization: Bearer` vers pivot-core (stateless,
validation via JWKS). Ce choix est révisé : pivot-ui adopte le pattern **BFF** — pivot-core
porte le flux OIDC côté serveur, Angular ne voit jamais de token, et l'état de connexion est un
cookie de session opaque.

## Décision

- **Pattern** : BFF — `pivot-core` exécute lui-même le flux OIDC (Authorization Code, PKCE côté
  serveur) ; Angular ne manipule aucun token, IdP ou JWT
- **Session navigateur** : cookie de session (`HttpOnly`, `Secure`, `SameSite=Lax`), backé par
  **Spring Session JDBC** (PostgreSQL) — voir [ADR-005](ADR-005-opaque-tokens.md) révisé en
  cohérence
- **Connexion** : redirection `GET /oauth2/authorization/{tenant}` → IdP → callback géré par
  Spring Security → cookie de session posé
- **État de session côté Angular** : un seul endpoint `GET /api/me` (utilisateur courant, rôles,
  modules activés, ou 401) — pas de librairie OIDC côté client, pas de gestion de refresh
- **Résolution IdP par tenant** : `ClientRegistrationRepository` dynamique, résout la
  configuration OIDC (issuer, client_id, client_secret) depuis PostgreSQL selon le tenant
  (sous-domaine ou chemin), découverte via `/.well-known/openid-configuration`
- **Keycloak** : embarqué en option (profil Docker Compose) comme IdP par défaut pour les tenants
  sans IdP existant, avec bridging SAML pour les IdP legacy SAML-only — jamais imposé aux tenants
  qui ont déjà un IdP OIDC (Entra ID, Okta…)
- **Mapping claims → rôles** : configurable par tenant (ex. groupe AD `PIVOT-Admins` → rôle
  `admin`)
- **Activation des modules** : vérifiée côté serveur à chaque requête, jamais seulement masquée
  côté Angular

## Raisons

- **Sécurité perçue (avant-vente grand compte)** : « aucun token dans le navigateur » lève une
  classe entière de questions de pentest/audit DSI qu'une SPA manipulant des access tokens
  déclenche systématiquement
- **WebSocket** : les modules whiteboard et session live dépendent du WebSocket ; le handshake
  transporte nativement les cookies, alors que les Bearer tokens n'ont pas de mécanisme standard
  sur `new WebSocket(...)` (contournements fragiles en query string ou sous-protocole)
- **Simplicité côté Angular** : zéro librairie OIDC, zéro refresh token à gérer côté client
- **Multi-tenant = multi-IdP réel** : un `ClientRegistrationRepository` statique (configuré par
  variable d'environnement) ne permet pas à chaque tenant de brancher son propre IdP à chaud ;
  la résolution dynamique depuis PostgreSQL le permet, ce qui est attendu de tout SaaS B2B
  sérieux
- **Autorisation ≠ authentification** : l'IdP dit qui est l'utilisateur, PIVOT décide ce qu'il
  peut faire (tenant, rôle, modules) — ce mapping doit rester dans pivot-core, jamais délégué à
  l'IdP
- vs PKCE côté SPA (v1 de cet ADR) : le token JWT de l'IdP n'a plus besoin de transiter par le
  navigateur ni d'être rafraîchi côté client — le BFF absorbe cette complexité
- vs stateless JWT resource server (v1) : la session serveur backée par Spring Session JDBC ne
  réintroduit pas les problèmes de scalabilité qui avaient motivé le choix stateless — voir
  [ADR-005](ADR-005-opaque-tokens.md)

## Sécurité

| Contrainte | Implémentation |
|------------|----------------|
| Cookie de session | `HttpOnly`, `Secure`, `SameSite=Lax` — jamais lisible en JS |
| Aucun token IdP côté navigateur | Le JWT de l'IdP reste côté serveur (pivot-core) |
| CSRF | Cookie `SameSite=Lax` + jeton CSRF sur les requêtes de mutation (`/api/**`) |
| Secrets IdP par tenant | `client_secret` par tenant chiffré en base — voir ADR-014 (secrets externes) |
| CORS | `CORS_ALLOWED_ORIGINS` configurable |
| CSP | Headers nginx (pivot-ui) |
| Validation IdP | Spring Security OIDC via découverte `/.well-known/openid-configuration` |
| Modules par tenant | Vérification serveur systématique, jamais côté UI seule |

## Conséquences

- Chaque tenant doit avoir un IdP compatible OIDC, ou utiliser le Keycloak embarqué fourni
- Le mapping claims → rôles doit être documenté pour chaque IdP supporté
- pivot-core porte désormais l'état de session (via Spring Session JDBC) — voir ADR-005 pour
  l'implémentation et les conséquences de scalabilité
- Les tests E2E simulent le flux OIDC serveur-à-serveur plutôt qu'un silent refresh côté SPA
- La checklist « enterprise-ready » (SSO OIDC par tenant couvert ici) reste à traiter par
  ailleurs : logs d'audit des connexions/actions admin (ADR-020), politiques de session
  configurables par tenant (durée, RP-Initiated Logout, back-channel logout), provisioning SCIM,
  tokens d'API (client credentials/PAT) pour les intégrations machine-to-machine — aucun de ces
  points ne remet en cause le pattern BFF, ils s'y greffent
- Si PIVOT évolue vers des modules déployés comme services séparés, le BFF intégré devient
  naturellement un BFF/gateway relayant un JWT interne vers ces services — n'enferme pas
  l'architecture actuelle

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-06-20 | Décision initiale — PKCE S256 côté Angular, JWT en mémoire, resource server stateless |
| v2 | 2026-07-10 | Bascule vers le pattern BFF — cookie de session serveur (Spring Session JDBC), `ClientRegistrationRepository` dynamique par tenant, Keycloak optionnel embarqué |
