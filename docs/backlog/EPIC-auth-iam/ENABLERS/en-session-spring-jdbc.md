# EN01.15 — Migration de l'auth interne vers Spring Session JDBC

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Remplacer le mécanisme actuel (`TokenService`/`AccessToken` custom,
table `access_tokens`, `SessionCreationPolicy.STATELESS`, `Authorization: Bearer` injecté par
`TokenInterceptor` côté Angular) par **Spring Session JDBC** — session serveur backée par
PostgreSQL (`SPRING_SESSION`/`SPRING_SESSION_ATTRIBUTES`), exposée via un cookie de session
opaque unique pour l'auth interne et l'auth enterprise (post-EN01.14).

**Justification** : [ADR-005 v2](../../../adr/ADR-005-opaque-tokens.md) retient Spring Session
JDBC. Ce n'est pas une simple mise à jour de doc : le code actuel (`EN01.1`, `EN01.2`, tous deux
Done) est stateless par design (`SecurityConfig` fixe explicitement
`SessionCreationPolicy.STATELESS`) et n'utilise aucun mécanisme Spring Session. C'est une
migration d'infrastructure sur du code déjà livré.

**Critères de complétion** :
- [ ] `spring-session-jdbc` ajouté, schéma `SPRING_SESSION`/`SPRING_SESSION_ATTRIBUTES` migré
- [ ] `TokenAuthenticationFilter` remplacé par le filtre de session Spring Security standard
- [ ] Cookie `SESSION` (`HttpOnly`, `Secure`, `SameSite=Lax`) — le `CookieHelper` actuel
      (`baseCookie()`) et son usage limité au seul endpoint `/auth/refresh` sont retirés
- [ ] Jeton CSRF requis sur les requêtes de mutation (le cookie automatique réintroduit une
      surface CSRF — voir ADR-004 v2 §Sécurité)
- [ ] `GET /api/me` remplace `GET /auth/refresh` comme source d'état de session
- [ ] Table `access_tokens` : plan de dépréciation documenté — impact direct sur
      [ADR-022](../../../adr/ADR-022-principal-authentification-minimal-partage.md), qui bâtit la
      validation cross-module sur cette table ; ADR-022 doit être révisée en parallèle, pas après
      coup
- [ ] Migration des sessions actives : stratégie de bascule sans déconnexion forcée de masse

**Dépendances** : [ADR-005 v2](../../../adr/ADR-005-opaque-tokens.md), impacte
[ADR-022](../../../adr/ADR-022-principal-authentification-minimal-partage.md) (table
`access_tokens` partagée), bloque EN01.17 (rework auth frontend)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E01 · Type: architecture · Module: auth · Phase: v1-enterprise · Size: XL
Stage: ⬜ · Priority: High
