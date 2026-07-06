# EN04.1 — Logs structurés JSON + MDC

**Type d'enabler** : observabilité · logging

**Critères de complétion** :
- [x] Logback configuré en sortie JSON (`logstash-logback-encoder`) sur tous les backends — `logback-spring.xml`, profil `test` conservé lisible (rien ne le consomme en JSON), tous les autres profils (dont `dev`) en JSON
- [x] MDC propagé sur chaque requête HTTP entrante : `requestId` (UUID généré, ou repris du header `X-Request-Id` entrant), `tenantId`, `userId` — `RequestMdcFilter`, câblé juste après `TokenAuthenticationFilter`
- [ ] MDC propagé sur les handlers STOMP WebSocket : `requestId`, `userId`, `boardId`/`sessionId` — **différé** : aucun handler `@MessageMapping`/`ChannelInterceptor` STOMP n'existe dans `pivot-core` à ce jour (seule la dépendance `spring-boot-starter-websocket`, inutilisée, est présente). Le même pattern MDC sera appliqué via un `ChannelInterceptor` sur le canal STOMP entrant dès qu'un premier handler sera introduit (EN08.1/whiteboard ou équivalent)
- [x] Log structuré sur toute action state-changing : `INFO` create/update · `WARN` attempt échoué · `ERROR` exception non prévue — convention déjà largement en place dans le code existant (`TokenService`, `AuditService`, `ModuleActivationService`…), désormais enrichie automatiquement du contexte MDC
- [x] Log de démarrage : version du service, port, profil Spring actif — `StartupLogListener` (`event=APPLICATION_STARTED`)
- [x] Aucune donnée personnelle dans les logs (email, mot de passe, token) — `userId` en MDC reste l'id numérique `public.users.id` non haché, cohérent avec tous les logs structurés existants du repo (clé de substitution interne, pas une donnée personnelle au sens des exemples de l'AC) ; email/mot de passe/token ne sont jamais journalisés
- [x] `// NOSONAR` interdit — aucune occurrence ajoutée
- [x] Tests TU : vérification MDC propagé (Logback test appender) — `RequestMdcFilterTest` (10 tests, `ListAppender`) + `StartupLogListenerTest` (6 tests), 100 % couverture instructions

**Statut** : 🔄 En cours de revue — PR pivot-core [#156](https://github.com/PIVOT-PLATFORM/pivot-core/pull/156) (`feat/en04-1-logs-structures`)

---
Item Type: Enabler · Parent: E04 · Type: observabilité · Module: core · Phase: Socle
Stage: In progress · Priority: High
