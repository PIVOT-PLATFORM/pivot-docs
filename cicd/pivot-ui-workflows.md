# CI/CD — pivot-ui

Repo : [PIVOT-PLATFORM/pivot-ui](https://github.com/PIVOT-PLATFORM/pivot-ui)
Stack : Angular 22 · TypeScript · Node.js 24 · nginx · Docker

## Workflows

### `ci.yml` — Intégration continue

Déclenché sur chaque push et PR vers `main`.

| Job | Description |
|-----|-------------|
| **Code Quality** | ESLint + TypeScript strict (`tsc --noEmit`) |
| **Tests frontend** | Vitest avec couverture LCOV |
| **SonarCloud** | Analyse qualité + couverture |
| **Build prod** | `npm run build -- --configuration production` |
| **SCA - Trivy** | Audit des dépendances npm (CVE) |

### `release.yml` — Release automatique

Déclenché sur push `main` après CI verte.

| Étape | Description |
|-------|-------------|
| Semantic Release | Analyse commits → calcule version SemVer |
| Docker build | `docker buildx build --push` → `ghcr.io/pivot-platform/pivot-ui:{version}` |
| GitHub Release | Tag + changelog automatique |

### `security.yml` — Sécurité

| Job | Outil | Description |
|-----|-------|-------------|
| Gitleaks | `gitleaks/gitleaks-action` | Détection secrets |
| SAST | Semgrep | Analyse statique TypeScript |
| CodeQL | `github/codeql-action` | Analyse JavaScript/TypeScript |

### `e2e.yml` — Tests E2E Playwright

Déclenché manuellement (`workflow_dispatch`). Requiert `PIVOT_API_URL` (backend disponible).

1. Build Angular production
2. Serve sur `:4200` via `serve`
3. Playwright Chromium sur `src/e2e/`

### `lighthouse.yml` — Performance & Accessibilité

Déclenché manuellement. Build Angular + Lighthouse CI.
Métriques : Performance, Accessibility, Best Practices, SEO.

### `dast-baseline.yml` — DAST Baseline

Scan ZAP mensuel (1er du mois, 3h UTC) sur `PIVOT_PROD_URL`.
Non bloquant — crée une issue GitHub si alertes détectées.

### `dast-full.yml` — DAST Full Scan authentifié

Déclenché manuellement. Stack complète :
1. Pull image `ghcr.io/pivot-platform/pivot-core:latest`
2. Démarre postgres + redis + pivot-core
3. Build Angular + serve `:4200`
4. ZAP Full Scan avec auth JWT (`ROLE_USER` + `ROLE_ADMIN`)

### `scorecard.yml` — OpenSSF

Chaque lundi 6h UTC + push `main`.

### `sbom.yml` — SBOM

SBOM CycloneDX npm à chaque release.

### `plumber.yml` — Compliance CI/CD

Gate ≥ 90%.

## Variables et secrets requis

| Secret | Usage |
|--------|-------|
| `SONAR_TOKEN` | SonarCloud |
| `PIVOT_API_URL` | URL backend pour E2E / Lighthouse (optionnel) |
| `PIVOT_PROD_URL` | URL production pour DAST baseline |
| `GITHUB_TOKEN` | Docker push GHCR (auto-fourni) |

## Dev local

```bash
npm ci              # install dépendances
ng serve            # dev server :4200 (hot reload)
npm run test        # Vitest watch
npm run build       # build prod → dist/pivot-ui/browser/
docker compose up   # servir le build prod via nginx :80
```
