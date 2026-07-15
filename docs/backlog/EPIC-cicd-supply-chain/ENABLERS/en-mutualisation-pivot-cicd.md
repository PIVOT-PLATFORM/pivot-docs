# EN05.17 — Mutualisation CI/CD (repo `pivot-cicd`)

**Type d'enabler** : infrastructure

**Objectif technique** : Créer un repo dédié **`pivot-cicd`**, source unique des pipelines
CI/CD de l'organisation, sous forme de **reusable workflows** (`on: workflow_call` + inputs) et
de **composite actions**. Chaque repo consommateur (les 14 repos `pivot-*-core`/`-ui`, plus
`pivot-docs`/`pivot-infra` là où pertinent) n'héberge plus que des **stubs minces** (déclencheurs
`on:`, plafond `permissions:`, passage explicite des secrets, quelques `with:`) qui appellent
`pivot-cicd` **épinglé par SHA**. Objectif : corriger un pipeline à un seul endroit, uniformiser,
et supprimer la duplication (≈ 11 workflows par repo `-core`, 13–16 par repo `-ui`, quasi
identiques).

**Justification** : L'audit de terrain (2026-07-16) confirme une duplication massive des
workflows entre les 14 repos module. La Vague 1 (reusable `security.yml` dans
`PIVOT-PLATFORM/.github`) a prouvé le mécanisme, mais tout le reste (`ci`, `deploy*`, `sbom`,
`dast-*`, `lighthouse`, `e2e`, `mutation`, `release`, `scorecard`) reste copié-collé. Cet
enabler généralise l'approche dans un **repo dédié** plutôt que dans `.github`, pour découpler
le CI/CD de la community-health (profile, CODEOWNERS, SECURITY.md) et de la gouvernance Plumber.

> **Inversion assumée d'une décision antérieure.** [US05.15.1](us-composite-action.md) (Done)
> avait justifié de **ne pas** créer de repo dédié et d'héberger la composite `setup` dans
> `pivot-core`. Une étude de faisabilité `pivot-cicd` (2026-07-13) allait dans le même sens.
> Cet enabler **inverse** ce choix sur décision du mainteneur (2026-07-16) : le besoin de
> mutualisation dépasse désormais le seul couple core+ui (14 repos concernés), ce qui justifie
> un foyer dédié. Pour **ne pas recréer une 3ᵉ source de vérité** (le risque que pointait
> l'étude), `pivot-cicd` devient LA source du CI/CD : `security.yml` est **migré** depuis
> `.github` (Vague 2) et la composite `setup` est **rapatriée** depuis `pivot-core` (Vague 6).
> `.github` retombe à son rôle GitHub natif : Plumber, CODEOWNERS org, `profile/`, community-health.

## Répartition cible

| Repo | Rôle après EN05.17 |
|------|--------------------|
| **`pivot-cicd`** (neuf) | Source unique : reusable workflows (`ci-core`, `ci-ui`, `security`, `scorecard`, `sbom`, `deploy*`, `release`, `dast-*`, `lighthouse`, `e2e`, `mutation`) + composite actions (`setup`) |
| **`PIVOT-PLATFORM/.github`** | Community-health + gouvernance uniquement : `.plumber.yaml`, CODEOWNERS org, `profile/`, `SECURITY.md`/`SUPPORT.md`/`CODE_OF_CONDUCT.md`, scorecard *par défaut* |
| **14 repos module** + `pivot-docs`/`pivot-infra` | Stubs minces appelant `pivot-cicd` par SHA + Dependabot `github-actions` pour auto-bump |

## Contraintes techniques (non négociables)

- **Pinning par SHA obligatoire** côté appelants (gate Plumber `actionsMustBePinnedByCommitSha`).
  `pivot-cicd` est taggé en semver (`vX.Y.Z`) pour la traçabilité, mais l'appel se fait par le
  SHA du tag. **Dependabot** (`ecosystem: github-actions`) bumpe les SHA dans chaque repo.
- **Pas de `permissions:` au niveau workflow** dans un reusable au-delà du plafond des appelants —
  sinon `startup_failure` (piège rencontré en Vague 1). Chaque job déclare son minimum.
- **Pas de `secrets: inherit`** (gate Plumber `reusableWorkflowsMustNotInheritSecrets`) — secrets
  passés explicitement.
- `pivot-cicd` doit être couvert par les sources d'actions autorisées Plumber (`trustSameOrgActions`).

## Roadmap en vagues (priorisée)

| Vague | US | Contenu | Priorité |
|-------|----|---------|----------|
| **Pilote** | [US05.17.1](us-bootstrap-pivot-cicd.md) | Bootstrap repo `pivot-cicd` (structure, `.plumber.yaml`, dependabot, README, `docs/USAGE.md`, CI interne actionlint/yamllint) | **High** |
| **Pilote** | [US05.17.2](us-reusable-ci-core.md) | Reusable `ci-core.yml` + conversion pilote `pivot-agilite-core` en stub, CI verte | **High** |
| **Pilote** | [US05.17.3](us-reusable-ci-ui.md) | Reusable `ci-ui.yml` + conversion pilote `pivot-agilite-ui` en stub, CI verte | **High** |
| **2** | US05.17.4 *(à créer)* | Migration `security.yml` depuis `.github` vers `pivot-cicd` (tous appelants re-pointés) | Medium |
| **3** | US05.17.5 *(à créer)* | Reusables `scorecard.yml` + `sbom.yml` | Medium |
| **4** | US05.17.6 *(à créer)* | Reusables `deploy*.yml` + `release.yml` (inputs cibles Cloud Run/GHCR) | Low |
| **5** | US05.17.7 *(à créer)* | Reusables `dast-*`, `lighthouse`, `e2e`, `mutation` | Low |
| **6** | US05.17.8 *(à créer)* | Rapatriement composite `setup` depuis `pivot-core` vers `pivot-cicd` | Low |
| **7** | US05.17.9 *(à créer)* | Rollout stubs sur les 12 repos restants + Dependabot bump généralisé | Low |

> Les US des vagues 2–7 sont créées au fil de l'eau (une par vague), après validation de la
> vague pilote. Seule la vague pilote est DoR-complète à ce stade.

**Critères de complétion (enabler)** :

- [ ] Repo `pivot-cicd` créé, structuré, avec `.plumber.yaml` alignée sur les gates de `.github`
      et une CI interne verte (actionlint + yamllint).
- [ ] `ci-core.yml` et `ci-ui.yml` disponibles comme reusable workflows paramétrés, documentés
      dans `docs/USAGE.md` (tableau des inputs).
- [ ] Les deux repos pilotes (`pivot-agilite-core`, `pivot-agilite-ui`) appellent le reusable
      via un stub épinglé par SHA, avec un run CI **vert de bout en bout** (evidence sur PR).
- [ ] Dependabot `github-actions` configuré dans les repos pilotes pour auto-bumper le SHA de
      `pivot-cicd`.
- [ ] Aucune régression de couverture des gates Plumber sur les repos pilotes.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E05 · Module: core · Phase: Socle · Size: L · Priority: High
Stage: ⬜
Profils: Tous
Justification: Source unique CI/CD (reusable workflows + composite actions) supprimant la duplication inter-repos, corrections centralisées
Dépendances: EN05.15 (standardisation CI core↔ui) · US05.15.1 (composite setup, décision inversée) · Vague 1 .github#13 (reusable security.yml, à migrer)
