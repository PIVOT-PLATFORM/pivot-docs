# CI/CD — pivot-core

Repo : [PIVOT-PLATFORM/pivot-core](https://github.com/PIVOT-PLATFORM/pivot-core)
Stack : Java 25 · Spring Boot 4.x · Maven · Docker

## Workflows

### `ci.yml` — Intégration continue

Déclenché sur chaque push et PR vers `main`.

| Job | Description |
|-----|-------------|
| **Code Quality** | `mvn compile checkstyle:check spotbugs:check` |
| **Tests backend** | `mvn verify -Pcoverage` — JUnit 5 + Testcontainers |
| **SonarCloud** | Analyse qualité + couverture JaCoCo |
| **SCA - Trivy** | Audit des dépendances Maven (CVE) |

### `release.yml` — Release automatique

Déclenché sur push `main` après CI verte.

| Étape | Description |
|-------|-------------|
| Semantic Release | Analyse commits → calcule version SemVer |
| Docker build | `docker buildx build --push` → `ghcr.io/pivot-platform/pivot-core:{version}` |
| GitHub Release | Tag + changelog automatique |

### `security.yml` — Sécurité

Déclenché sur push et planning hebdomadaire.

| Job | Outil | Description |
|-----|-------|-------------|
| Gitleaks | `gitleaks/gitleaks-action` | Détection secrets dans l'historique |
| SAST | Semgrep | Analyse statique `src/main/java` + `src/test/java` |
| CodeQL | `github/codeql-action` | Analyse de sécurité Java |

### `scorecard.yml` — OpenSSF

Déclenché chaque lundi 6h UTC + push `main`.
Publie les résultats sur [OpenSSF Scorecard](https://scorecard.dev).

### `sbom.yml` — SBOM

Génère un SBOM CycloneDX à chaque release. Attaché aux GitHub Releases.

### `mutation.yml` — Tests de mutation

Déclenché manuellement (`workflow_dispatch`). PITest sur les tests unitaires Java.

### `plumber.yml` — Compliance CI/CD

Gate ≥ 90% sur tous les workflows. Vérifie : SHA pinning, permissions, triggers dangereux, supply chain.

## Variables et secrets requis

| Secret | Usage |
|--------|-------|
| `SONAR_TOKEN` | Authentification SonarCloud |
| `GITHUB_TOKEN` | Docker push GHCR, GitHub Release (auto-fourni) |

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
