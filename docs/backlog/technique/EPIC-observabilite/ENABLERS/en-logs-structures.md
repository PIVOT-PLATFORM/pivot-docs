# EN04.1 — Logs structurés JSON + MDC

**Type d'enabler** : observabilité · logging

**Critères de complétion** :
- [ ] Logback configuré en sortie JSON (`logstash-logback-encoder` ou `logback-json-encoder`) sur tous les backends
- [ ] MDC propagé sur chaque requête HTTP entrante : `requestId` (UUID généré), `tenantId`, `userId`
- [ ] MDC propagé sur les handlers STOMP WebSocket : `requestId`, `userId`, `boardId`/`sessionId`
- [ ] Log structuré sur toute action state-changing : `INFO` create/update · `WARN` attempt échoué · `ERROR` exception non prévue
- [ ] Log de démarrage : version du service, port, profil Spring actif
- [ ] Aucune donnée personnelle dans les logs (email, mot de passe, token) — hash SHA-256 pour userId si nécessaire
- [ ] `// NOSONAR` interdit — Sonar "Won't fix" si faux positif
- [ ] Tests TU : vérification MDC propagé (Logback test appender)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E04 · Type: observabilité · Module: core · Phase: MVP
Stage: Backlog · Priority: High
