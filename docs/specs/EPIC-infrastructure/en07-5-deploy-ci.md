# EN07.5 — deploy.yml GitHub Actions CI/CD vers prod

## Contexte

- **US/Enabler source** : [EN07.5](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-deploy-ci) — `docs/backlog/EPIC-infrastructure/ENABLERS/en-deploy-ci.md`
- **PR** : [pivot-core#155](https://github.com/PIVOT-PLATFORM/pivot-core/pull/155)
- **Dernier commit au figeage (Gate 4 = 100/100)** : `80cf1783cf63effe68a25d8ca2af866094df777d` — `fix(deploy): empêcher deux déploiements concurrents (workflow_dispatch vs release)`
- **Repos** : `pivot-core` (`.github/workflows/deploy.yml`, `.github/workflows/release.yml`, `.plumber.yaml`)

## Spec fonctionnelle

`deploy.yml` automatise le déploiement de `pivot-core` en production à chaque release réelle,
avec un filet de sécurité (smoke test + rollback) et une visibilité de bout en bout :

1. **Déclenchement.** Quand `release.yml` (push sur `main`) calcule une nouvelle version, build +
   scan + publie l'image sur GHCR puis fait créer par Semantic Release le tag `vX.Y.Z` et la
   GitHub Release, `deploy.yml` démarre automatiquement (`release: published`). Un opérateur peut
   aussi le déclencher manuellement (`workflow_dispatch`, avec un input `version` optionnel) pour
   un rollback ou un redéploiement ciblé.
2. **Résolution de version.** Le job résout la version cible (`vX.Y.Z` du tag → `X.Y.Z`, ou
   l'input manuel) avant toute action distante.
3. **Déploiement.** Une connexion SSH vers le serveur de production exécute
   `docker compose -f docker-compose.prod.yml pull pivot-core && ... up -d pivot-core` —
   **uniquement** le service `pivot-core` ; le service `nginx` (image `pivot-ui`) n'est jamais
   touché par ce workflow, il relève du `deploy.yml` propre à `pivot-ui` sur sa propre release.
4. **Vérification.** Le serveur exécute lui-même jusqu'à 10 tentatives de
   `curl http://localhost/api/actuator/health` (6 s d'intervalle) — en local sur le serveur, pas
   depuis le runner GitHub, pour ne jamais confondre une panne réseau/pare-feu avec un échec de
   déploiement réel.
5. **Rollback automatique.** Si aucune tentative ne réussit, le serveur relit la dernière version
   connue comme saine (fichier `.pivot-core-version`, écrit uniquement après un smoke test
   réussi), y redéploie, et revérifie. Le job reste en échec dans les deux cas (rollback réussi ou
   non) : un échec de smoke test est toujours une alerte à traiter, jamais un événement silencieux.
6. **Notification.** Un message est envoyé sur Slack si `SLACK_WEBHOOK_URL` est configuré ;
   sinon un `::warning::` explicite l'indique dans les logs du run — jamais d'échec silencieux.
   Le statut du déploiement reste de toute façon visible sans aucun secret via l'onglet
   Environments/Deployments de GitHub (`environment: production`).
7. **Un seul déploiement à la fois.** Un `concurrency` group (`deploy-production`,
   `cancel-in-progress: false`) met en file d'attente tout déclenchement concurrent plutôt que
   d'annuler un déploiement déjà en cours.

## Contrat technique final

### Déclencheurs

```yaml
on:
  release:
    types: [published]
  workflow_dispatch:
    inputs:
      version:
        required: false
        type: string
```

**Pourquoi pas `push: tags: v*` en plus** : `release.yml` a déjà entièrement traité l'événement
(build, scan, push GHCR, création du tag + de la Release) au moment où `release: published` se
déclenche. Ajouter un déclencheur `push: tags` dupliquerait le build pour rien et ferait tourner
deux workflows pour le même événement logique. `pivot-ui` porte le même stub `deploy.yml` avec la
même justification depuis avant cette PR — convention déjà actée côté organisation, pas une
réinterprétation unilatérale de cet Enabler.

### Image déployée — tag semver stable

`release.yml` (même PR) ajoute un tag Docker `${VERSION}` (ex. `1.4.0`) à
`ghcr.io/pivot-platform/pivot-core`, en plus de `${GITHUB_SHA}`/`latest` déjà existants.
**Nécessaire** : le tag Git / la Release que `deploy.yml` observe pointe sur le commit de bump
créé par `@semantic-release/git` (`pom.xml`/`CHANGELOG.md`), pas sur `GITHUB_SHA` (le commit
buildé par le job `release`). Sans ce tag stable, `deploy.yml` n'aurait aucune façon fiable de
retrouver l'image de la release — et `:latest` est de toute façon interdit en déploiement par
`.plumber.yaml` (`containerImageMustNotUseForbiddenTags`).

### Déploiement (SSH)

- Action : `appleboy/ssh-action@0ff4204d59e8e51228ff73bce53f80d53301dee2` (`v1.2.5`)
- Secrets : `PROD_SSH_HOST`, `PROD_SSH_USER`, `PROD_SSH_KEY`, `PROD_SSH_PORT` (optionnel,
  défaut `22`), `PROD_DEPLOY_PATH` (répertoire serveur contenant `docker-compose.prod.yml`,
  synchronisé hors CI — hors périmètre de ce workflow)
- Commande : `docker compose -f docker-compose.prod.yml pull pivot-core` puis
  `... up -d pivot-core`, avec `PIVOT_CORE_VERSION` exporté vers la session SSH

### Smoke test + rollback

- Cible : `http://localhost/api/actuator/health` (contexte `server.servlet.context-path=/api`
  de `pivot-core` — pas `/actuator/health`), attendu `"status":"UP"`
- 10 tentatives, 6 s d'intervalle (couvre le `start_period: 30s` du health check Docker défini
  dans `docker-compose.prod.yml`, EN07.1)
- Marqueur de rollback : fichier `.pivot-core-version` dans `PROD_DEPLOY_PATH`, écrit uniquement
  après un smoke test réussi ; absent au tout premier déploiement (rollback alors impossible par
  construction — signalé explicitement, pas une erreur silencieuse)

### Notification

- Action : `slackapi/slack-github-action@45a88b9581bfab2566dc881e2cd66d334e621e2c` (`v3.0.3`),
  `webhook-type: incoming-webhook`
- Secret optionnel : `SLACK_WEBHOOK_URL` — absent aujourd'hui dans l'organisation (vérifié via
  `gh secret list` + `TODO-SETUP.md` des repos bootstrappés : seuls `SONAR_TOKEN`,
  `GITLEAKS_LICENCE_KEY`, `PLUMBER_TOKEN`, `SEMANTIC_RELEASE_TOKEN`, `SEMGREP_APP_TOKEN`,
  `PLUMBER_METADATA_TOKEN` existent) → repli `::warning::` explicite, pas d'échec silencieux
- Canal de secours gratuit : onglet Environments/Deployments GitHub (natif, actif via
  `environment: production`, aucun secret requis)

### Conformité `.plumber.yaml`

- `appleboy/ssh-action` et `slackapi/slack-github-action` ajoutés à `trustedGithubActions`
  (`githubActionMustComeFromAuthorizedSources`) — ni GitHub officiel, ni même organisation
- Permissions minimales : `read-all` (workflow) + `contents: read` (job) — pas de `write-all`
- Aucune interpolation directe de `github.event.*` dans un `run:` — indirection systématique par
  `env:` (`workflowMustNotInjectUserInputInScripts`)
- Aucune référence à un tag mutable (`latest`, `main`, …) dans la logique de déploiement
  (`containerImageMustNotUseForbiddenTags`)

## Écarts vs ACs initiaux

| AC initial | Statut | Justification |
|---|---|---|
| Déclenché sur tag `v*` ou merge sur `main` | Réinterprété | `release: published` couvre les deux sans dupliquer le build (voir § Déclencheurs) — convention déjà actée (stub identique côté `pivot-ui`) |
| Build images pivot-core + pivot-ui → GHCR | Partiel (par conception) | pivot-core : déjà fait par `release.yml` (tag semver ajouté ici) ; pivot-ui : hors périmètre (isolation par repo), même gap à corriger côté `pivot-ui` par son propre Enabler |
| Notification Slack/email | Implémenté avec dégradation | Aucune intégration Slack/e-mail dans l'organisation à ce jour — gap externe documenté, pas un échec silencieux |

Tous les autres AC (SSH + pull/up, smoke test, rollback automatique) sont implémentés
intégralement — voir table de traçabilité dans la review Gate 4 de la PR.

**Dépendance non bloquante — EN07.1 / EN07.2.** Ce workflow référence le service `pivot-core` et
le chemin `/api/actuator/health` de `docker-compose.prod.yml`, introduits par
[EN07.1](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-docker-compose-prod)
(`pivot-core#149`). Ni EN07.1 ni [EN07.2](pathname:///pivot-docs/backlog/EPIC-infrastructure/ENABLERS/en-secret-management)
(`pivot-core#150`) n'étaient mergées au moment du figeage — `pivot-core#155` est écrite contre
`main` normalement (pas de blocage) mais nécessitera un rebase une fois l'une des deux mergée.
Le point de coordination EN07.1 ↔ EN07.2 (nommage des cibles Docker secrets) ne concerne pas cet
Enabler : `deploy.yml` ne référence aucun secret applicatif, uniquement la variable
d'environnement `PIVOT_CORE_VERSION`.

## Scores

- **Gate 2 (coverage)** : non applicable — pas de code Java touché, uniquement des workflows
  GitHub Actions. Validation : `python3 -c yaml.safe_load` (parse) + `actionlint v1.7.12`
  (0 finding) sur les fichiers modifiés, lecture manuelle contre `.plumber.yaml`.
- **Gate 4 (merge confidence)** : **100/100** — `MERGE_AUTONOMOUS` (voir le commentaire de review
  sur [pivot-core#155](https://github.com/PIVOT-PLATFORM/pivot-core/pull/155) pour le détail du
  breakdown — 1 finding mineur, absence de `concurrency` group, détecté et corrigé en itération 1
  avant convergence).

## Statut

Figé le 2026-07-06.
