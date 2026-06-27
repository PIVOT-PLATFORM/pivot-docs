# pivot-docs

Documentation générale de la suite collaborative **PIVOT**.

[![Plumber](https://github.com/PIVOT-PLATFORM/pivot-docs/actions/workflows/plumber.yml/badge.svg)](https://github.com/PIVOT-PLATFORM/pivot-docs/actions/workflows/plumber.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/PIVOT-PLATFORM/pivot-docs/badge)](https://scorecard.dev/viewer/?uri=github.com/PIVOT-PLATFORM/pivot-docs)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

---

## Contenu

| Dossier | Description |
|---------|-------------|
| [`architecture/`](architecture/) | Architecture cible de la plateforme (vue d'ensemble, modules, auth) |
| [`adr/`](adr/) | Architecture Decision Records |
| [`cicd/`](cicd/) | Documentation des pipelines CI/CD (pivot-core + pivot-ui) |
| [`audits/`](audits/) | Audits par domaine (cyber, QA, RGPD, UX…) |
| [`backlog/`](backlog/) | Modèle de backlog — hiérarchie, champs Project, Human Gate, workflow draft→Issue |

## Repos

| Repo | Rôle |
|------|------|
| [pivot-core](https://github.com/PIVOT-PLATFORM/pivot-core) | Backend Java 25 · Spring Boot 4.x · PostgreSQL 18 · Flyway · Redis |
| [pivot-ui](https://github.com/PIVOT-PLATFORM/pivot-ui) | Frontend Angular 22 · TypeScript strict · Vitest · Playwright |
| [pivot-docs](https://github.com/PIVOT-PLATFORM/pivot-docs) | Ce repo — documentation plateforme |

## Backlog opérationnel

Le backlog vit dans le **[Project GitHub de l'organisation](https://github.com/orgs/PIVOT-PLATFORM/projects)**
(items draft, pas d'Issues tant que le produit n'est pas public).
Le modèle et les conventions sont dans [`backlog/README.md`](backlog/README.md).

## Licence

AGPL-3.0-or-later — voir [LICENSE](LICENSE).
