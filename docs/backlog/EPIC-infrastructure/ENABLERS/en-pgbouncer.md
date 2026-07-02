# EN07.4 — PgBouncer session mode configuration prod

**Type d'enabler** : performance · infrastructure

**Critères de complétion** :
- [ ] PgBouncer configuré en `session` mode (compatible JPA/Hibernate)
- [ ] Pool size configuré (max_client_conn, default_pool_size)
- [ ] pivot-core se connecte à PgBouncer (pas directement à Postgres)
- [ ] Métriques PgBouncer exposées (pool utilization)
- [ ] Tests de charge basiques (vérification pas de connexion leak)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E07 · Type: performance · Module: core · Phase: MVP
Stage: Backlog · Priority: High
