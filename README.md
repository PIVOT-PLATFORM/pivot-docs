# pivot-docs

Documentation générale de la suite collaborative **PIVOT**.

📖 **[Consulter le site publié](https://pivot-platform.github.io/pivot-docs/)**

[![Plumber](https://github.com/PIVOT-PLATFORM/pivot-docs/actions/workflows/plumber.yml/badge.svg)](https://github.com/PIVOT-PLATFORM/pivot-docs/actions/workflows/plumber.yml)
[![Deploy Docs](https://github.com/PIVOT-PLATFORM/pivot-docs/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/PIVOT-PLATFORM/pivot-docs/actions/workflows/deploy-docs.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/PIVOT-PLATFORM/pivot-docs/badge)](https://scorecard.dev/viewer/?uri=github.com/PIVOT-PLATFORM/pivot-docs)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

---

## Contenu

Le contenu source vit sous [`docs/`](docs/) et est publié via [Docusaurus](https://docusaurus.io/) sur GitHub Pages.

| Dossier | Description |
|---------|-------------|
| [`docs/architecture/`](docs/architecture/) | Architecture cible de la plateforme (vue d'ensemble, modules, auth) |
| [`docs/adr/`](docs/adr/) | Architecture Decision Records |
| [`docs/cicd/`](docs/cicd/) | Documentation des pipelines CI/CD (pivot-core + pivot-ui) |
| [`docs/audits/`](docs/audits/) | Audits par domaine (cyber, QA, RGPD, UX…) |
| [`docs/backlog/`](docs/backlog/) | Modèle de backlog — hiérarchie, champs Project, workflow draft→Issue |
| [`docs/workflow/`](docs/workflow/) | Workflow agentique PIVOT (ACDD) |

### Développer le site localement

```bash
npm install
npm start      # http://localhost:3000/pivot-docs/
npm run build  # génère build/
```

## Repos

| Repo | Rôle |
|------|------|
| [pivot-core](https://github.com/PIVOT-PLATFORM/pivot-core) | Backend Java 25 · Spring Boot 4.x · PostgreSQL 18 · Flyway · Redis |
| [pivot-ui](https://github.com/PIVOT-PLATFORM/pivot-ui) | Frontend Angular 22 · TypeScript strict · Vitest · Playwright |
| [pivot-docs](https://github.com/PIVOT-PLATFORM/pivot-docs) | Ce repo — documentation plateforme |

## Backlog opérationnel

Le backlog vit dans le **[Project GitHub de l'organisation](https://github.com/orgs/PIVOT-PLATFORM/projects)**
(items draft, pas d'Issues tant que le produit n'est pas public).
Le modèle et les conventions sont dans [`docs/backlog/README.md`](docs/backlog/README.md).

## Licence

AGPL-3.0-or-later — voir [LICENSE](LICENSE).
