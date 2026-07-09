# ADR-005 — Session opaque (Spring Session JDBC) pour l'authentification

**Statut :** Accepté
**Date :** 2026-06-20 (révisé 2026-07-10)

## Contexte

PIVOT doit gérer une session utilisateur pour les deux flux d'authentification : interne
(email / password) et enterprise (OIDC via le BFF, [ADR-004](ADR-004-oidc-multi-tenant.md)).

La v1 de cet ADR retenait un opaque token 256-bit géré manuellement (génération, hash SHA-256,
table `access_tokens`, relais `Authorization: Bearer` par Angular) et rejetait explicitement les
sessions côté serveur (`HttpSession`) au motif d'incompatibilité avec un déploiement
multi-instance stateless et de la complexité d'un store Redis.

Ce choix est révisé avec l'adoption du pattern BFF (ADR-004) : Angular ne portant plus aucun
token, il n'y a plus de relais `Authorization: Bearer` à faire manuellement. La session serveur
redevient pertinente — à condition de rester compatible multi-instance sans sticky sessions et
sans ajouter Redis à la stack. **Spring Session JDBC** remplit ces deux conditions en réutilisant
PostgreSQL, déjà présent.

## Décision

**Spring Session JDBC** : session serveur backée par PostgreSQL (table `SPRING_SESSION` /
`SPRING_SESSION_ATTRIBUTES`), exposée au navigateur via un cookie de session opaque (`SESSION`,
`HttpOnly`, `Secure`, `SameSite=Lax`). Ce mécanisme unique sert :

- **L'auth interne** (email / password) : après validation des credentials, une session est
  créée et associée à l'utilisateur
- **L'auth enterprise** (OIDC via BFF, ADR-004) : après le callback OIDC, le BFF crée la même
  session serveur — le JWT de l'IdP ne quitte jamais pivot-core

Dans les deux cas, le navigateur ne détient qu'un identifiant de session opaque en cookie —
jamais de JWT, jamais de payload lisible.

## Raisons

### Pourquoi pas de JWT (HS256/RS256) en session interne

| Problème JWT | Impact |
|-------------|--------|
| Non révocable sans blacklist | Un token volé reste valide jusqu'à expiration |
| TTL fixe dans le token | Impossible d'invalider sans rotation de clé |
| Payload lisible (base64) | Fuite de métadonnées si intercepté |
| Complexité rotation de clés | Gestion des clés HMAC/RSA en infra auto-hébergée |

### Pourquoi Spring Session JDBC plutôt qu'un opaque token géré à la main (v1 de cet ADR)

- **Cookie, pas de relais manuel** : avec le BFF (ADR-004), Angular ne relaie plus de
  `Authorization: Bearer` — le cookie de session est porté automatiquement par le navigateur,
  y compris sur le handshake WebSocket (whiteboard, session live)
- **Standard Spring Security** : pas de `TokenAuthenticationFilter` custom à maintenir
- **Révocabilité immédiate** : suppression de la ligne `SPRING_SESSION` → session invalide à la
  prochaine requête, propriété identique à l'opaque token v1
- **Pas de payload exposé** : le cookie ne contient qu'un identifiant de session, jamais de rôles
  ni de claims

### Pourquoi Spring Session JDBC plutôt que `HttpSession` in-memory ou Redis

| Option | Problème |
|--------|----------|
| `HttpSession` in-memory (défaut Tomcat) | Sticky sessions requises, incompatible scale horizontal sans affinité |
| Redis | Composant supplémentaire à opérer en infra auto-hébergée sans gain vs PostgreSQL déjà présent |
| **Spring Session JDBC (retenu)** | Réutilise PostgreSQL, aucune sticky session, migration vers Redis possible plus tard (une ligne de configuration) si la charge le justifie |

### Propriétés conservées de la v1

- **Révocabilité immédiate** : suppression en BDD → session invalide à la prochaine requête
- **Pas de payload côté client** : identifiant de session opaque uniquement
- **TTL flexible** : modifiable sans réémission
- **Multi-session contrôlable** : max 5 sessions par utilisateur (feature flag `MAX_SESSIONS_PER_USER`)
- **Audit natif** : chaque session = ligne BDD, exploitable pour `docs/specs/.../us02-2-3-sessions-actives.md`
- **Cohérence auto-hébergée** : pas de PKI ni de Redis à gérer, juste PostgreSQL

## Implémentation

```yaml
# application.yml
spring:
  session:
    store-type: jdbc
  datasource:
    url: jdbc:postgresql://...
```

Table BDD : `SPRING_SESSION` (`SESSION_ID`, `CREATION_TIME`, `LAST_ACCESS_TIME`, `EXPIRY_TIME`),
`SPRING_SESSION_ATTRIBUTES` (attributs de session : `userId`, `tenantId`, `roles`).

### Côté Angular (pivot-ui)

- Aucune gestion de token — le cookie `SESSION` est envoyé automatiquement par le navigateur
  (`withCredentials: true` sur les requêtes cross-origin le cas échéant)
- État de connexion déterminé par `GET /api/me` (200 + profil, ou 401)
- Déconnexion : `POST /api/auth/logout` invalide la session serveur et efface le cookie

## Conséquences

- Lookup BDD à chaque requête API — index sur `SESSION_ID` requis (fourni par le schéma Spring
  Session standard)
- Nettoyage des sessions expirées : `SpringSessionBackedSessionRegistry` + job planifié
  (`spring.session.jdbc.cleanup-cron`)
- CSRF désormais pertinent (cookie automatique) — jeton CSRF requis sur les requêtes de mutation,
  voir [ADR-004](ADR-004-oidc-multi-tenant.md#sécurité)
- Pas de déconnexion « push » vers d'autres onglets ouverts — l'UI détecte l'expiration via 401
  sur `/api/me`

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-06-20 | Décision initiale — opaque token 256-bit géré à la main, relais `Authorization: Bearer` par Angular, sessions serveur explicitement écartées |
| v2 | 2026-07-10 | Bascule vers Spring Session JDBC suite à l'adoption du pattern BFF (ADR-004) — même garanties (révocable, sans payload, PostgreSQL), portées par cookie plutôt que par relais manuel côté Angular |
