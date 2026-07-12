# E05 — CI/CD & Supply-chain

## Objectif
Pipeline CI/CD complet avec supply-chain sécurisée : build/test/lint, qualité SonarCloud, SAST/SCA, secrets scanning, SBOM, SLSA, Scorecard, Semantic Release, protection de branche et standardisation CI.

## Périmètre GitHub (Socle)

### Enablers Done ✅
- EN05.1 — Pipelines CI (build/test/lint/coverage)
- EN05.2 — Quality gate SonarCloud
- EN05.3 — SAST (CodeQL + Semgrep)
- EN05.4 — Secret scanning (Gitleaks)
- EN05.5 — SCA dépendances (Trivy + audit + Dependabot)
- EN05.6 — SBOM
- EN05.7 — Provenance SLSA L3
- EN05.8 — OpenSSF Scorecard
- EN05.9 — Plumber CI/CD compliance
- EN05.10 — Release automatisée (Semantic Release + GHCR)
- EN05.11 — Gate E2E (Playwright)
- EN05.12 — Gate Lighthouse (a11y)

### Enablers — à faire
- EN05.16 — Exposer les KPI du domaine

## Modules impactés
`core`

## Statut global
✅ Done — EN05.1-15 tous terminés (2026-07-09, recette différée pour les items de code ;
EN05.14 réglé après mise à jour du token `gh` avec la permission "Administration: Read and write")

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| EN05.1 — Pipelines CI (build/test/lint/coverage) | ✅ |
| EN05.2 — Quality gate SonarCloud | ✅ |
| EN05.3 — SAST (CodeQL + Semgrep) | ✅ |
| EN05.4 — Secret scanning (Gitleaks) | ✅ |
| EN05.5 — SCA dépendances (Trivy + audit + Dependabot) | ✅ |
| EN05.6 — SBOM | ✅ |
| EN05.7 — Provenance SLSA L3 | ✅ |
| EN05.8 — OpenSSF Scorecard | ✅ |
| EN05.9 — Plumber CI/CD compliance | ✅ |
| EN05.10 — Release automatisée (Semantic Release + GHCR) | ✅ |
| EN05.11 — Gate E2E (Playwright) | ✅ |
| EN05.12 — Gate Lighthouse (a11y) | ✅ |
| **EN05.13 — DAST (ZAP)** | |
| [US05.13.1 — ZAP baseline planifié](ENABLERS/us-zap-baseline.md) | ✅ |
| [US05.13.2 — ZAP full scan + rapport](ENABLERS/us-zap-full-scan.md) | ✅ |
| **EN05.14 — Protection de branche + required checks** | |
| [US05.14.1 — Required checks pivot-core](ENABLERS/us-required-checks-core.md) | ✅ |
| [US05.14.2 — Required checks pivot-ui](ENABLERS/us-required-checks-ui.md) | ✅ |
| [US05.14.3 — Required checks pivot-docs](ENABLERS/us-required-checks-docs.md) | ✅ |
| **EN05.15 — Standardisation CI core ↔ ui** | |
| [US05.15.1 — Composite action setup partagée](ENABLERS/us-composite-action.md) | ✅ |
| [US05.15.2 — Aligner workflows ui sur conventions core](ENABLERS/us-aligner-workflows.md) | ✅ |
| [EN05.16 — Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md) | ⬜ |
