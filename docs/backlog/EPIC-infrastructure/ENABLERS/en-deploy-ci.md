# EN07.5 — deploy.yml GitHub Actions CI/CD vers prod

**Type d'enabler** : CI/CD · déploiement

**Déclenchement (Gate 1, clarification à l'implémentation) :** l'AC d'origine dit "tag `v*` ou
merge sur `main`". Les deux sont déjà couverts par `pivot-core/.github/workflows/release.yml`
(push sur `main` → calcule la version → build/scan/push GHCR → Semantic Release crée le tag
`vX.Y.Z` + la GitHub Release). Un déclencheur `push: tags: v*` séparé rebuilderait/repousserait
l'image une seconde fois pour rien et tournerait deux fois pour le même événement. `deploy.yml`
déclenche donc sur `release: types: [published]` — capture exactement l'intention de l'AC (une
vraie release, jamais un run "skipped" sur un push sans release) en réutilisant l'image déjà
scannée/publiée par `release.yml`, + `workflow_dispatch` pour un rollback/redéploiement manuel.
**Ce n'est pas une réinterprétation unilatérale** : `pivot-core` et `pivot-ui` avaient déjà tous
les deux un stub `deploy.yml` identique portant ce même commentaire de justification avant cette
PR — c'est la convention déjà actée côté organisation.

**Critères de complétion** :
- [x] Workflow `deploy.yml` déclenché sur une vraie release (`release: published` — couvre
      "tag `v*` ou merge sur `main`", voir note ci-dessus) + `workflow_dispatch` manuel
- [x] Build images Docker pivot-core + pivot-ui → push GHCR — déjà fait par le `release.yml` de
      chaque repo (ce PR ajoute un tag Docker `${VERSION}` (semver) au `release.yml` de
      pivot-core, nécessaire pour que `deploy.yml` retrouve l'image de la release — le tag Git
      observé par `deploy.yml` pointe sur le commit de bump `@semantic-release/git`, pas sur le
      commit buildé). pivot-ui n'est pas modifié dans ce PR (isolation par repo) — a le même
      gap (pas de tag semver), à corriger quand son propre `deploy.yml` sera câblé
- [x] SSH vers serveur prod + `docker compose pull && docker compose up -d` — via
      `appleboy/ssh-action`, **uniquement le service `pivot-core`** de
      `docker-compose.prod.yml` ([EN07.1](en-docker-compose-prod.md)) ; jamais `nginx`
      (image pivot-ui), responsabilité du `deploy.yml` de pivot-ui sur sa propre release
- [x] Smoke test post-déploiement (curl `/api/actuator/health` — pas `/actuator/health` :
      `server.servlet.context-path=/api` s'applique aussi à Actuator, confirmé via
      `SecurityConfig`/`application.yml` de pivot-core), 10 tentatives × 6 s, exécuté en
      `localhost` sur le serveur (pas depuis le runner GitHub — évite les faux négatifs
      réseau/pare-feu)
- [x] Rollback automatique si smoke test échoue — fichier marqueur `.pivot-core-version` sur le
      serveur (écrit uniquement après un smoke test réussi), rollback vers la dernière version
      saine + re-vérification ; le job reste en échec dans tous les cas (alerte nécessaire,
      que le rollback ait réussi ou non)
- [x] Notification Slack/email sur succès/échec — `slackapi/slack-github-action` (webhook) avec
      repli explicite (`::warning::`) si `SLACK_WEBHOOK_URL` absent. **Vérifié avant
      implémentation** (`gh secret list`, `TODO-SETUP.md` des repos bootstrappés) : aucune
      intégration Slack/e-mail n'existe dans l'organisation aujourd'hui (seuls `SONAR_TOKEN`,
      `GITLEAKS_LICENCE_KEY`, `PLUMBER_TOKEN`, `SEMANTIC_RELEASE_TOKEN`, `SEMGREP_APP_TOKEN`,
      `PLUMBER_METADATA_TOKEN` existent) — gap externe documenté, pas une intégration
      silencieusement absente. Le run reste visible sans aucun secret via l'onglet
      Environments/Deployments (natif GitHub, actif via `environment: production`)

**Secrets à créer par le mainteneur (gap externe)** : `PROD_SSH_HOST`, `PROD_SSH_USER`,
`PROD_SSH_KEY`, `PROD_SSH_PORT` (optionnel, défaut 22), `PROD_DEPLOY_PATH` (répertoire serveur
contenant `docker-compose.prod.yml`, synchronisé hors CI), `SLACK_WEBHOOK_URL` (optionnel).

**Dépendance non bloquante — EN07.1 / EN07.2 :** ce workflow référence le service `pivot-core`
et le chemin `/api/actuator/health` tels qu'introduits par
[EN07.1](en-docker-compose-prod.md) (`pivot-core#149`, pas encore mergée). Écrit contre `main`
normalement (pas de blocage), mais **nécessitera un rebase une fois EN07.1 ou EN07.2 mergée**
pour que `docker-compose.prod.yml` existe réellement sur la branche. Ne dépend pas du point de
coordination EN07.1 ↔ EN07.2 (nommage des cibles Docker secrets) : EN07.5 ne référence aucun
secret applicatif, uniquement la variable d'environnement `PIVOT_CORE_VERSION`.

**PR** : [pivot-core#155](https://github.com/PIVOT-PLATFORM/pivot-core/pull/155) (Gate 4 =
100/100, `MERGE_AUTONOMOUS`, sortie de draft — en attente de recette mainteneur)

**Statut** : 🔎 Autoloop convergée (Gate 4 = 100/100) — déclenchement clarifié (note ci-dessus),
secrets SSH/Slack en gap externe documenté — Gate: Review

---
Item Type: Enabler · Parent: E07 · Type: CI/CD · Module: core · Phase: Socle
Stage: ✅ · Priority: Critical
