# US05.17.3 — Reusable `ci-ui.yml` + pilote `pivot-agilite-ui`

**En tant que** ingénieur plateforme
**Je veux** un reusable workflow `ci-ui.yml` paramétré, appelé par un stub dans un repo `-ui` pilote
**Afin de** valider le mécanisme de mutualisation CI frontend et couvrir les deux familles de repos

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given `pivot-cicd/.github/workflows/ci-ui.yml`, when on l'inspecte, then il déclare `on: workflow_call` avec au minimum les inputs `node-version`, `sonar-project-key` (requis), `run-sonar` (défaut `true`), `runs-on` (défaut `ubuntu-latest`) — la liste exacte est figée après lecture du `ci.yml` réel de `pivot-agilite-ui` | ⬜ |
| Given le reusable, when il s'exécute, then il reproduit les jobs CI actuels du frontend (lint, build, tests unitaires + coverage, SonarCloud, SCA) sans perte de couverture | ⬜ |
| Given `pivot-agilite-ui/.github/workflows/ci.yml` converti en stub, when on le lit, then il appelle `uses: PIVOT-PLATFORM/pivot-cicd/.github/workflows/ci-ui.yml@<SHA>` avec `sonar-project-key: PIVOT-PLATFORM_pivot-agilite-ui` et passe les secrets explicitement | ⬜ |
| Given une PR sur `pivot-agilite-ui` utilisant le stub, when la CI tourne, then le run est **vert de bout en bout** (evidence : lien du run dans la PR) | ⬜ |
| Given Dependabot `github-actions` sur `pivot-agilite-ui`, when `pivot-cicd` publie une release, then une PR de bump du SHA est proposée | ⬜ |
| Error : given un input requis (`sonar-project-key`) manquant dans le stub, when la CI démarre, then l'appel échoue explicitement (input requis non fourni) | ⬜ |
| Security : given le stub, when Plumber s'exécute, then `ci-ui.yml` est épinglé par SHA et aucun secret n'est hérité (`secrets: inherit` interdit) | ⬜ |
| A11y : given le pipeline UI, when les gates a11y existants (Lighthouse) sont concernés, then ils restent dans leurs workflows dédiés (hors `ci-ui.yml`) et ne sont pas dégradés | ⬜ |

## Notes d'implémentation

- Repo pilote **`pivot-agilite-ui`**.
- La liste précise des inputs UI (`run-lighthouse`, `run-e2e`, matrice Node, cache npm…) est
  arrêtée en implémentation, après lecture de `pivot-agilite-ui/.github/workflows/ci.yml` — les
  gates lourds (`lighthouse`, `e2e`, `mutation`, `dast-*`) restent dans leurs workflows séparés
  et feront l'objet de la Vague 5, pas de `ci-ui.yml`.
- Réutiliser la composite `setup` (Node) — tant qu'elle n'est pas rapatriée (Vague 6), référencer
  la source actuelle épinglée par SHA.

**Hors périmètre** : reusables `lighthouse`/`e2e`/`mutation`/`dast-*` (Vague 5), rollout sur les
autres repos `-ui` (Vague 7).

---
Item Type: US · Parent: EN05.17 · Module: core · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Profils: Tous
Dépendances: US05.17.1 (bootstrap repo)
