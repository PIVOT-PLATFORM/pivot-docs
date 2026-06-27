# CI/CD — pivot-core

Repo : [PIVOT-PLATFORM/pivot-core](https://github.com/PIVOT-PLATFORM/pivot-core)
Stack : Java 25 · Spring Boot 4.x · Maven · Docker

---

## Workflows

### `ci.yml` — Intégration continue

Déclenché sur push `main`/`develop`, toute PR, et `workflow_dispatch`.
Ignoré si seuls des fichiers `docs/**`, `**.md` ou `.github/ISSUE_TEMPLATE/**` changent.
Concurrence : un run par branche (cancel-in-progress).

| Job | Dépendances | Description |
|-----|-------------|-------------|
| **quality-backend** | — | `mvn compile checkstyle:check spotbugs:check` |
| **tests-backend** | — | `mvn verify -Pcoverage` · JUnit 5 + Testcontainers (PostgreSQL via `@ServiceConnection`) · Redis CI service · upload artifact classes + jacoco.xml |
| **sonar** | tests-backend | SonarCloud via `mvn sonar:sonar` · réutilise l'artifact · skippé pour `dependabot[bot]` |
| **sca** | — | Trivy FS scan sur `pom.xml` (HIGH/CRITICAL) · SARIF uploadé · exit-code 1 (bloquant) |

> PostgreSQL fourni par Testcontainers (`@ServiceConnection`) — pas de service CI postgres.
> Seul Redis est en service CI (port 6379).

### `release.yml` — Release automatique

Déclenché sur push `main`. Pipeline en 4 jobs séquencés.

```
prepare (dry-run) → release (build/scan/push/publish) → provenance-jar (SLSA L3)
                                                       → provenance-container (SLSA L3)
```

| Job | Description |
|-----|-------------|
| **prepare** | Semantic Release `--dry-run` → calcule la version SemVer (output `version`) |
| **release** | Build JAR à la version finale · Trivy image gate (HIGH/CRITICAL, ignore-unfixed) **avant** push · Push GHCR (`pivot-core:{sha}` + `latest`) · Deploy JAR → GitHub Packages (idempotent, vérifie SHA-256 si 409) · `npx semantic-release` (tag + changelog + GitHub Release) |
| **provenance-jar** | SLSA L3 via `slsa-framework/slsa-github-generator@v2.1.0` (référencé par TAG, pas SHA — `builder-fetch.sh` exige `refs/tags/vX.Y.Z`) · sujets = checksums JAR base64 · `upload-assets: false` (ref = `heads/main`, pas un tag) |
| **provenance-container** | SLSA L3 container · image + digest depuis le job `release` · push attestation OCI dans GHCR via cosign |

### `deploy.yml` — Déploiement production

Déclenché sur `release: published` + `workflow_dispatch` (rollback / re-déploiement manuel).
Environnement GitHub `production` (approvals, secrets, historique des deployments).

> Implémentation TODO — brancher SSH + docker compose ou Kubernetes selon l'infra cible.

### `pr-preview.yml` — PR Checks

Déclenché sur `pull_request` (même filtre `paths-ignore` que `ci.yml`). Same-repo uniquement.

| Job | Description |
|-----|-------------|
| **mutation** | PITest `mvn test-compile pitest:mutationCoverage -Pmutation` · `continue-on-error: true` (indicateur qualité, non bloquant) · rapport uploadé |
| **docker-preview** | Build `pivot-core-preview:pr-{N}` · Trivy gate identique à la Release (parité zéro-surprise) · SARIF catégorie `trivy-container` (parité code scanning PR/main) · push GHCR si scan OK |
| **maven-deploy-preview** | Deploy JAR `0.0.0-prN-SNAPSHOT` → GitHub Packages · nettoyage automatique (sauf si unique version du package partagé) |

### `pr-image-cleanup.yml` — Nettoyage preview

Déclenché sur `pull_request: closed`. Supprime `pivot-core-preview:pr-{N}` de GHCR.

### `security.yml` — Sécurité

Déclenché sur push `main`/`develop`, toute PR, et chaque lundi 6h UTC.
Pas de `paths-ignore` : les jobs SARIF doivent tourner sur chaque push (sinon code scanning
signale « configuration not found » sur les PRs suivantes).

| Job | Outil | Description |
|-----|-------|-------------|
| **gitleaks** | `gitleaks/gitleaks-action@v2` | Détection secrets · config `.github/workflows/configuration/.gitleaks.toml` · `GITLEAKS_LICENCE_KEY` |
| **codeql** | `github/codeql-action@v4` | SAST Java · config `.github/codeql/config.yml` |
| **semgrep** | Semgrep CLI | Règles : `p/java`, `p/spring`, `p/owasp-top-ten`, `p/security-audit`, `p/jwt`, `p/sql-injection`, `p/command-injection`, `p/secrets` · exclut `spring-csrf-disabled` · bloquant si findings > 0 |
| **plumber** | `getplumber/plumber@v0.3.68` | Compliance CI/CD ≥ 90% · SARIF + PBOM CycloneDX · `PLUMBER_TOKEN` (branch protection) · `PLUMBER_METADATA_TOKEN` (résolution versions actions tierces) |

### `scorecard.yml` — OpenSSF Scorecard

Déclenché chaque lundi 6h UTC + push `main`.
Publie les résultats sur [scorecard.dev](https://scorecard.dev).

### `sbom.yml` — SBOM

Génère un SBOM CycloneDX Maven à chaque release. Attaché aux GitHub Releases.

---

## Variables et secrets requis

| Secret | Usage |
|--------|-------|
| `SONAR_TOKEN` | Authentification SonarCloud |
| `SEMANTIC_RELEASE_TOKEN` | PAT Semantic Release (écriture tags + releases) |
| `GITLEAKS_LICENCE_KEY` | Licence Gitleaks (scan historique complet) |
| `SEMGREP_APP_TOKEN` | Authentification Semgrep App (optionnel) |
| `PLUMBER_TOKEN` | Fine-grained PAT `Administration:read` (branch protection) |
| `PLUMBER_METADATA_TOKEN` | PAT `public_repo` — résolution versions actions tierces (IP allow list org) |
| `GITHUB_TOKEN` | Auto-fourni (GHCR, GitHub Release, Packages) |

---

## Infrastructure locale

```bash
docker compose up -d   # postgres:18 + redis:7 + mailpit + pivot-core app
```

| Service | Port | Usage |
|---------|------|-------|
| PostgreSQL | 5432 | Base de données principale |
| Redis | 6379 | Cache + WebSocket sessions |
| Mailpit | 8025 | Interface SMTP de test |
| pivot-core | 8080 | API REST + WebSocket |

---

## Branch protection — vérifications GitHub Settings

`Settings → Branches → Branch protection rules → main` :

| Règle | Valeur attendue |
|-------|-----------------|
| Require a pull request before merging | ✅ activé |
| Require approvals | ≥ 1 |
| **Require review from Code Owners** | ✅ activé — sinon CODEOWNERS ignoré |
| Require status checks to pass | ✅ activé (CI obligatoire) |
| Require branches to be up to date | ✅ activé |
| Do not allow bypassing the above settings | ✅ activé |

> **Action requise après toute modification de `.github/CODEOWNERS`** : vérifier que
> « Require review from Code Owners » est bien coché — GitHub ne l'active pas automatiquement.
