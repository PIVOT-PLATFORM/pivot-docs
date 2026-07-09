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
- [x] PgBouncer configuré en `session` mode (compatible JPA/Hibernate)
- [x] Pool size configuré (`MAX_CLIENT_CONN=200`, `DEFAULT_POOL_SIZE=20`)
- [x] pivot-core se connecte à PgBouncer (pas directement à Postgres) — `SPRING_DATASOURCE_URL` basculé
- [x] Métriques PgBouncer exposées — sidecar `pgbouncer-exporter` + cible `prometheus.yml`, vérifié (`pool_size=20`, `max_client_conn=200`)
- [x] Tests de charge basiques — `docker/pgbouncer/loadtest.sh`, exécuté : pic borné à 20 sous 40 clients concurrents, `sv_active` revenu à 0 après charge (aucune fuite)

**Implémentation** : [pivot-core#197](https://github.com/PIVOT-PLATFORM/pivot-core/pull/197) (mergée).

**Statut** : ✅ Done — `Stage: Done` positionné le 2026-07-09 (recette métier différée)

---
Item Type: Enabler · Parent: E07 · Type: performance · Module: core · Phase: Socle
Stage: Done · Priority: High
