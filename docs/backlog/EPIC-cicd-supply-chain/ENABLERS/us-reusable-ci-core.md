# US05.17.2 — Reusable `ci-core.yml` + pilote `pivot-agilite-core`

**En tant que** ingénieur plateforme
**Je veux** un reusable workflow `ci-core.yml` paramétré, appelé par un stub dans un repo `-core` pilote
**Afin de** valider le mécanisme de mutualisation CI backend avant de le généraliser

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given `pivot-cicd/.github/workflows/ci-core.yml`, when on l'inspecte, then il déclare `on: workflow_call` avec les inputs `java-version` (défaut `25`), `maven-compiler-release` (défaut `24`), `sonar-project-key` (requis), `run-sonar` (défaut `true`), `needs-redis` (défaut `true`), `runs-on` (défaut `ubuntu-latest`) | ⬜ |
| Given le reusable, when il s'exécute, then il reproduit les jobs actuels (`quality-backend`, `tests-backend`, `sonar` conditionné à `run-sonar`, `sca` Trivy) sans perte de couverture | ⬜ |
| Given `pivot-agilite-core/.github/workflows/ci.yml` converti en stub, when on le lit, then il appelle `uses: PIVOT-PLATFORM/pivot-cicd/.github/workflows/ci-core.yml@<SHA>` avec `sonar-project-key: PIVOT-PLATFORM_pivot-agilite-core` et passe les secrets explicitement (pas de `secrets: inherit`) | ⬜ |
| Given une PR sur `pivot-agilite-core` utilisant le stub, when la CI tourne, then le run est **vert de bout en bout** (evidence : lien du run dans la PR) | ⬜ |
| Given Dependabot `github-actions` sur `pivot-agilite-core`, when `pivot-cicd` publie une release, then une PR de bump du SHA est proposée | ⬜ |
| Error : given le reusable déclarant au niveau workflow des `permissions` au-delà du plafond du stub appelant, when la CI démarre, then `startup_failure` — le reusable ne déclare donc que le minimum par job | ⬜ |
| Security : given le stub, when Plumber s'exécute, then `ci-core.yml` est épinglé par SHA (`actionsMustBePinnedByCommitSha` vert) et aucun secret n'est hérité | ⬜ |

## Notes d'implémentation

- Repo pilote **`pivot-agilite-core`** (déjà pilote du reusable `security.yml`, known-good).
- Service `redis` conditionné par `needs-redis` ; PostgreSQL reste fourni par Testcontainers.
- `GITHUB_TOKEN` requis pour résoudre `fr.pivot:pivot-core-starter` (GitHub Packages) — passé
  comme secret implicite du workflow appelant.
- Ne pas casser `pr-preview.yml` (jobs PR-only) : hors périmètre de ce reusable.

**Hors périmètre** : `ci-ui.yml` (US05.17.3), rollout sur les autres repos `-core` (Vague 7).

---
Item Type: US · Parent: EN05.17 · Module: core · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Profils: Tous
Dépendances: US05.17.1 (bootstrap repo)
