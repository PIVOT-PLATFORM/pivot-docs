# CI/CD — pivot-ui

Repo : [PIVOT-PLATFORM/pivot-ui](https://github.com/PIVOT-PLATFORM/pivot-ui)
Stack : Angular 22 · TypeScript · Node.js 24 · nginx · Docker

---

## Workflows

### `ci.yml` — Intégration continue

Déclenché sur push `main`/`develop`, toute PR, et `workflow_dispatch`.
Ignoré si seuls des fichiers `docs/**`, `**.md` ou `.github/ISSUE_TEMPLATE/**` changent.
Concurrence : un run par branche (cancel-in-progress).

| Job | Dépendances | Description |
|-----|-------------|-------------|
| **quality** | — | `npx tsc --noEmit` + `npm run lint` (ESLint) |
| **tests** | — | `npm run test:ci` (Vitest + coverage LCOV) · upload artifact `coverage/` |
| **build** | quality, tests | `npm run build -- --configuration production` |
| **sonar** | tests | SonarCloud · télécharge artifact coverage · skippé pour `dependabot[bot]` |
| **sca** | — | Trivy FS scan `package-lock.json` (HIGH/CRITICAL, bloquant) · SARIF uploadé · `npm audit --audit-level=high --omit=dev` |

> Build output : `dist/frontend/browser/` (nom du projet Angular = `frontend` dans `angular.json`).

### `release.yml` — Release automatique

Déclenché sur push `main`. SLSA L2 (attestation `actions/attest-build-provenance`).

| Étape | Description |
|-------|-------------|
| Build | `npm run build -- --configuration production` |
| Docker | `docker buildx build --platform linux/amd64,linux/arm64 --push` → `ghcr.io/pivot-platform/pivot-ui:{sha}` + `latest` |
| Semantic Release | Tag + changelog + GitHub Release |
| Trivy | Scan image `pivot-ui:{sha}` (CRITICAL/HIGH) · SARIF uploadé |
| SLSA L2 | `actions/attest-build-provenance` sur `build-checksums.txt` (sha256sum des `.js` + `.css`) |

> Trivy tourne **après** le push (contrairement à pivot-core où c'est un gate avant push).
> SLSA L2 uniquement — pas de `slsa-framework/slsa-github-generator` (jobs de provenance séparés).

### `security.yml` — Sécurité

Déclenché sur push `main`/`develop`, toute PR, et chaque lundi 6h UTC.

| Job | Outil | Description |
|-----|-------|-------------|
| **gitleaks** | `gitleaks/gitleaks-action@v2` | Détection secrets · config `.github/workflows/configuration/.gitleaks.toml` · `GITLEAKS_LICENCE_KEY` |
| **codeql** | `github/codeql-action@v4` | SAST JavaScript/TypeScript · config `.github/codeql/config.yml` |
| **semgrep** | Semgrep CLI | Règles : `p/javascript`, `p/typescript`, `p/owasp-top-ten`, `p/security-audit`, `p/xss`, `p/secrets` · bloquant si findings > 0 |
| **plumber** | `getplumber/plumber@v0.3.68` | Compliance CI/CD · SARIF + PBOM CycloneDX |

### `e2e.yml` — Tests E2E Playwright

Déclenché manuellement (`workflow_dispatch`). Requiert que pivot-core soit disponible.
Input : `pivot_api_url` (défaut `http://localhost:8080`).

1. Build Angular `--configuration production`
2. Serve `dist/pivot-ui/browser` via `serve` sur `:4200`
3. Playwright Chromium · workers 1 (CI)

> **Issue connue** : le nom du projet Angular est `frontend` → output correct = `dist/frontend/browser/`.
> Le workflow référence `dist/pivot-ui/browser` — à corriger.

### `lighthouse.yml` — Performance & Accessibilité

Déclenché manuellement (`workflow_dispatch`).

1. Build Angular `--configuration production`
2. Serve `dist/pivot-ui/browser` via `http-server` sur `:4200`
3. `npx lhci autorun` + upload `target: filesystem`
4. Résumé SARIF parsant `lhr-*.json`

> **Issues connues** :
> - `npx lhci` installe un package squatter non-Lighthouse (utiliser `npx @lhci/cli@0.15.1`).
> - Serve path : `dist/pivot-ui/browser` (voir issue ci-dessus).
> - Résumé parsant `lhr-*.json` : ce format n'existe pas avec `target: filesystem` — utiliser `manifest.json`.

### `dast-baseline.yml` — DAST Baseline

Scan ZAP mensuel (1er du mois, 3h UTC) sur `PIVOT_PROD_URL`.
Non bloquant — crée une issue GitHub si alertes détectées.

### `dast-full.yml` — DAST Full Scan authentifié

Déclenché manuellement. Stack complète :
1. Pull `ghcr.io/pivot-platform/pivot-core:latest`
2. Démarre postgres + redis + pivot-core
3. Build Angular + serve `:4200`
4. ZAP Full Scan avec auth (`ROLE_USER` + `ROLE_ADMIN`)

### `scorecard.yml` — OpenSSF Scorecard

Chaque lundi 6h UTC + push `main`.

### `sbom.yml` — SBOM

SBOM CycloneDX npm à chaque release.

---

## Variables et secrets requis

| Secret | Usage |
|--------|-------|
| `SONAR_TOKEN` | SonarCloud |
| `SEMANTIC_RELEASE_TOKEN` | PAT Semantic Release (écriture tags + releases) |
| `GITLEAKS_LICENCE_KEY` | Licence Gitleaks |
| `SEMGREP_APP_TOKEN` | Authentification Semgrep App (optionnel) |
| `PIVOT_API_URL` | URL backend pour E2E / Lighthouse (optionnel, défaut localhost) |
| `PIVOT_PROD_URL` | URL production pour DAST baseline |
| `GITHUB_TOKEN` | Auto-fourni (GHCR, GitHub Release) |

---

## Dev local

```bash
npm ci                                          # install dépendances
ng serve                                        # dev server :4200 (hot reload)
npm run test                                    # Vitest watch
npm run build -- --configuration production    # build prod → dist/frontend/browser/
docker compose up                              # servir le build prod via nginx :80
```
