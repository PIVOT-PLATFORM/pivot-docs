# EN07.4 — PgBouncer session mode configuration prod

**Type d'enabler** : performance · infrastructure

**Objectif technique** : Introduire un pooler de connexions PostgreSQL (PgBouncer) en mode
`session` — seul mode compatible avec les usages JPA/Hibernate (prepared statements, transactions
longues) — entre `pivot-core` et Postgres, pour absorber la charge de connexions concurrentes sans
épuiser `max_connections` côté Postgres.

**Justification** : Depuis EN17.9, 4 services Spring Boot (backend + 3 satellites module-core)
partagent une seule instance Postgres, chacun avec son propre pool Hikari non mutualisé. En prod,
cette absence de mutualisation risque d'épuiser les connexions natives Postgres à mesure que
d'autres modules/replicas démarrent. Pré-requis du jalon « Socle terminé » (`sprint-6.md` Axe 1).

**Critères de complétion** :
- [ ] PgBouncer configuré en `session` mode (compatible JPA/Hibernate)
- [ ] Pool size configuré (max_client_conn, default_pool_size)
- [ ] pivot-core se connecte à PgBouncer (pas directement à Postgres)
- [ ] Métriques PgBouncer exposées (pool utilization)
- [ ] Tests de charge basiques (vérification pas de connexion leak)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E07 · Type: performance · Module: core · Phase: Socle
Stage: Ready · Priority: High
