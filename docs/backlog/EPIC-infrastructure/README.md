# E07 — Infrastructure & Déploiement

## Objectif
Stack de production complète : Docker Compose prod, gestion des secrets, ActiveMQ, PgBouncer, pipeline de déploiement CI/CD, TLS interne, Redis/PostgreSQL sécurisés, scaling horizontal.

## Périmètre GitHub (MVP — Critical)
- EN07.1 : Docker Compose production complet
- EN07.2 : Secret management Docker secrets
- EN07.3 : ActiveMQ persistence KahaDB
- EN07.4 : PgBouncer session mode configuration prod
- EN07.5 : deploy.yml GitHub Actions CI/CD vers prod

## Périmètre GitHub (v1-enterprise)
- EN07.7 : TLS interne nginx↔core cert CA entreprise
- EN07.8 : Redis TLS prod requirepass + tls-port
- EN07.9 : PostgreSQL TLS prod sslmode=require
- EN07.10 : Scaling N instances pivot-core configuration

## Modules impactés
`core`

## Statut global
⬜ À planifier — tous les items Critical/High en Backlog, Gate: Backlog sur EN07.1/2/5/7-9

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|-------|
| **Phase MVP — Critical** | | |
| [EN07.1 — Docker Compose production complet](ENABLERS/en-docker-compose-prod.md) | ⬜ |
| [EN07.2 — Secret management Docker secrets](ENABLERS/en-secret-management.md) | ⬜ |
| [EN07.3 — ActiveMQ persistence KahaDB](ENABLERS/en-activemq.md) | ⬜ |
| [EN07.4 — PgBouncer session mode prod](ENABLERS/en-pgbouncer.md) | ⬜ |
| [EN07.5 — deploy.yml GitHub Actions CI/CD vers prod](ENABLERS/en-deploy-ci.md) | ⬜ |
| **Phase v1-enterprise** | | |
| EN07.7 — TLS interne nginx↔core cert CA entreprise | ⏸️ | ⏸️ |
| EN07.8 — Redis TLS prod requirepass + tls-port | ⏸️ | ⏸️ |
| EN07.9 — PostgreSQL TLS prod sslmode=require | ⏸️ | ⏸️ |
| EN07.10 — Scaling N instances pivot-core | ⏸️ | ⏸️ |
