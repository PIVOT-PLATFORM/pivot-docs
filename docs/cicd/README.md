# CI/CD — PIVOT Platform

| Document | Description |
|----------|-------------|
| [pivot-core-workflows.md](pivot-core-workflows.md) | Pipelines CI/CD du backend Java |
| [pivot-ui-workflows.md](pivot-ui-workflows.md) | Pipelines CI/CD du frontend Angular |

## Principes communs

- **Supply chain hardening** — toutes les actions GitHub pinnées par SHA de commit
- **Plumber** — gate compliance ≥ 90% sur chaque repo
- **OpenSSF Scorecard** — audit de sécurité hebdomadaire
- **Semantic Release** — versioning automatique depuis Conventional Commits
- **Dependabot** — mise à jour automatique des actions GitHub (+ Maven pour pivot-core, npm pour pivot-ui)
- **Gitleaks** — détection de secrets dans les commits
- **SonarCloud** — qualité et couverture de code
- **Trivy** — analyse des dépendances (SCA)
- **SBOM** — génération CycloneDX à chaque release

## Gates qualité

| Gate | Seuil | Bloquant |
|------|-------|---------|
| SonarCloud Quality Gate | Passed | Oui (release) |
| Couverture tests | ≥ 80% | Oui |
| Gitleaks | 0 secret | Oui (push protection) |
| Plumber compliance | ≥ 90% | Oui |
