# E07 — Infrastructure & Déploiement

## Objectif
Stack de production complète : Docker Compose prod, gestion des secrets, ActiveMQ, PgBouncer, pipeline de déploiement CI/CD, TLS interne, Redis/PostgreSQL sécurisés, scaling horizontal.

## Périmètre GitHub (Socle — Critical)
- EN07.1 : Docker Compose production complet
- EN07.2 : Secret management Docker secrets
- EN07.3 : ActiveMQ persistence KahaDB
- EN07.4 : PgBouncer session mode configuration prod
- EN07.5 : deploy.yml GitHub Actions CI/CD vers prod
- EN07.6 : Hébergement GCP en IaC (Terraform + Ansible) — test MVP

## Périmètre GitHub (v1-enterprise)
- EN07.7 : TLS interne nginx↔core cert CA entreprise
- EN07.8 : Redis TLS prod requirepass + tls-port
- EN07.9 : PostgreSQL TLS prod sslmode=require
- EN07.10 : Scaling N instances pivot-core configuration

## Périmètre GitHub (phase-3)
- EN07.11 : mTLS interne & intégration Service Mesh (socle infra pour E43 EN43.3)
- EN07.12 : Bascule infrastructure MVP → cible cloud managée/orchestrée
- EN07.13 : Politique de versioning API publique & portail développeur

## Modules impactés
`core`

## Dépendances
- Interface avec : [E43 — Sécurité & Zero Trust](../EPIC-securite/README.md) (EN07.11 socle du Service Mesh EN43.3 ; EN07.2 étendu par les secrets dynamiques EN43.6 ; EN07.13 s'appuie sur EN43.2 API Gateway)

## Statut global
✅ Done — EN07.1-EN07.5 (Phase Socle) tous `Stage: Done` (2026-07-09, recette métier différée) ·
EN07.6 test MVP déployé et fonctionnel sur GCP (2026-07-09, `pivot-infra`) — a mis en évidence
plusieurs bugs réels dans EN07.1/EN07.5 jamais visibles avant un déploiement réel (voir EN07.6) ·
EN07.7-10 différés (v1-enterprise) · EN07.11-13 différés (phase-3)

---

## Suivi d'avancement

> **Resynchronisé le 2026-07-09** — ce tableau affichait encore EN07.3/EN07.4 en ⬜ alors qu'ils
> étaient déjà mergés (`pivot-core#193`, `#197`) — écart trouvé par audit, corrigé.

| Élément | 🤖 Dev |
|---------|--------|
| **Phase Socle — Critical** | |
| [EN07.1 — Docker Compose production complet](ENABLERS/en-docker-compose-prod.md) | ✅ Done |
| [EN07.2 — Secret management Docker secrets](ENABLERS/en-secret-management.md) | ✅ Done |
| [EN07.3 — ActiveMQ persistence KahaDB](ENABLERS/en-activemq.md) | ✅ Done |
| [EN07.4 — PgBouncer session mode prod](ENABLERS/en-pgbouncer.md) | ✅ Done |
| [EN07.5 — deploy.yml GitHub Actions CI/CD vers prod](ENABLERS/en-deploy-ci.md) | ✅ Done |
| [EN07.6 — Hébergement GCP en IaC (Terraform + Ansible) — test MVP](ENABLERS/en-gcp-hosting-iac.md) | ✅ |
| **Phase v1-enterprise** | |
| EN07.7 — TLS interne nginx↔core cert CA entreprise | ⏸️ |
| EN07.8 — Redis TLS prod requirepass + tls-port | ⏸️ |
| EN07.9 — PostgreSQL TLS prod sslmode=require | ⏸️ |
| EN07.10 — Scaling N instances pivot-core | ⏸️ |
| **Phase phase-3** | |
| [EN07.11 — mTLS interne & intégration Service Mesh](ENABLERS/en-mtls-service-mesh.md) | ⬜ |
| [EN07.12 — Bascule infrastructure MVP → cible cloud managée/orchestrée](ENABLERS/en-bascule-cloud-manage.md) | ⬜ |
| [EN07.13 — Politique de versioning API publique & portail développeur](ENABLERS/en-politique-versioning-api-publique.md) | ⬜ |
