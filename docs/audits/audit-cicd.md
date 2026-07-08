# Audit — cicd

**Statut :** À compléter
**Dernière révision :** 2026-06-20
**Profil agent responsable :** Expert DevSecOps

## Résumé

Score de maturité pas encore calculé (`Statut: À compléter`). Voir aussi la sous-section
dédiée à la gouvernance des packages inter-repos ci-dessous.

## Points d'attention

- Convergence des rulesets de branche — `pivot-core`/`pivot-ui` ont un ruleset complet
      (checks requis, review obligatoire) ; les repos modules bootstrap (`pivot-agilite-*`,
      `pivot-pilotage-*`) démarrent volontairement avec un périmètre de checks requis plus
      restreint le temps d'observer leurs premiers runs (voir leurs `TODO-SETUP.md` respectifs).
      Suivre explicitement la convergence vers le ruleset `main-protection` complet plutôt que
      de laisser ces exceptions devenir permanentes par défaut.
- SonarCloud — projet inexistant sur au moins `pivot-pilotage-core`/`pivot-pilotage-ui` au
      bootstrap (`SonarCloud Analysis` volontairement exclu du gate initial) ; à créer avant que
      ces repos passent en développement actif.
- Incidents CI déjà rencontrés et corrigés à documenter comme jurisprudence pour éviter les
      redécouvertes : retry `actions/deploy-pages` sur échec transitoire (pivot-docs, 2026-07-04,
      voir Décisions notables ci-dessous), déplacement du mutation testing Stryker en cron
      hebdomadaire pour timeout (pivot-ui, 2026-07-03).
- Vérifier qu'aucun repo ne contourne la règle "0 erreur/0 warning avant push autonome" via
      un `continue-on-error` ajouté pour des raisons de confort plutôt que pour un indicateur
      qualité non bloquant assumé (seul cas légitime documenté : mutation testing).

## Décisions notables

- **2026-07-04 — Retry sur échec transitoire du déploiement GitHub Pages** :
  le job `actions/deploy-pages` échoue de façon intermittente avec
  `Deployment failed, try again later.` quand un déploiement précédent vient
  de se terminer (observé sur pivot-docs#26 et #27, check non-bloquant pour
  le merge mais générant un faux rouge sur chaque PR). Ajout d'un mécanisme
  de nouvelle tentative (jusqu'à 3 essais, backoff 20s/40s) sur
  `docs-checks.yml` (preview PR) et `deploy-docs.yml` (déploiement prod),
  factorisé dans un workflow réutilisable `_deploy-pages-retry.yml`,
  sans nouvelle dépendance externe (réutilise `actions/deploy-pages` déjà
  pinné SHA). **Effet de bord noté :** le passage en `workflow_call` renomme
  le check GitHub du job preview PR, qui passe de
  `Déployer l'aperçu PR sur GitHub Pages` à
  `preview-deploy / Déployer l'aperçu PR sur GitHub Pages` (format imposé
  par GitHub pour les jobs appelant un workflow réutilisable). Sans impact
  aujourd'hui car ce check n'est pas dans `required_status_checks` de
  `main` — mais si jamais ajouté aux checks requis, prévoir le nouveau nom.
  Voir pivot-docs#31.

- **2026-07-03 — Mutation testing (Stryker, pivot-ui) déplacé en exécution hebdomadaire** :
  le job `Mutation Testing (Stryker)` dans `pr-checks.yml` dépassait régulièrement le délai
  de 30min sur les PR touchant l'auth (gros volume de tests), affichant un "fail" trompeur alors que
  le score de mutation est un indicateur qualité non bloquant, jamais un gate de merge
  (`continue-on-error`, voir CLAUDE.md Gate 3). Déplacé dans un workflow dédié
  `mutation-testing.yml` — cron lundi 06:00 UTC + `workflow_dispatch` manuel, timeout porté
  à 60min. Voir pivot-ui#68.

## Sous-domaine — Gouvernance des packages inter-repos (GitHub Packages / GHCR)

**Profil agent responsable :** Expert DevSecOps

Sous-domaine ajouté suite à deux incidents réels déjà rencontrés :

1. **Course de versioning (2026-07-06)** — plusieurs merges rapprochés déclenchaient chacun
   `release.yml`, calculant la même "prochaine version" avant qu'un tag ne soit créé entre eux ;
   le second à publier échouait en conflit sur GitHub Packages (`pivot-core` : versions 0.22.0
   puis 0.25.0 restées orphelines sans tag). Corrigé par la règle `Release-Trigger: true` sur
   sa propre ligne, déclenchée uniquement au dernier item d'un sprint (voir
   `pivot-core/CLAUDE.md` et `pivot-ui/CLAUDE.md`, section Workflow — Release).
2. **Accès cross-repo GHCR refusé (2026-07-07/08)** — le package conteneur privé
   `ghcr.io/pivot-platform/pivot-collaboratif-core/pivot-collaboratif-core` n'accorde pas
   l'accès Actions à `pivot-collaboratif-ui`, qui en a besoin pour son E2E Playwright
   (`docker: denied` après login GHCR réussi). Documenté dans
   `pivot-collaboratif-ui/TODO-SETUP.md` (BLOQUANT #2), commande de correctif prête
   (`gh api orgs/PIVOT-PLATFORM/packages/container/.../repositories`) mais nécessite un rôle
   admin d'organisation — non exécutable avec un PAT de repo standard (confirmé 2026-07-08).

- Recenser tous les couples publisher/consumer package inter-repos existants ou prévus
      (`fr.pivot:pivot-core-starter` → `pivot-agilite-core`/`pivot-collaboratif-core`/
      `pivot-pilotage-core` ; `@pivot-platform/ui-core` → `pivot-agilite-ui`/
      `pivot-collaboratif-ui`/`pivot-pilotage-ui` ; images GHCR `-core` → E2E des `-ui` sœurs)
      et vérifier pour chacun si l'accès cross-repo ("Manage Actions access") est déjà accordé
- `@pivot-platform/ui-core` — le workflow `publish-ui-core.yml` échoue actuellement
      (`npm ci` plante sur un remote SSH sans clé) : le package n'existe pas encore, donc aucune
      permission cross-repo n'est encore pertinente pour lui
- `fr.pivot:pivot-core-starter` — dépendance pas encore déclarée dans les `pom.xml` des
      modules `-core` (EN17.1 tout juste mergé pour le volet modules/tenant, `auth`/`team`
      restent — voir issue pivot-core#171) ; permission à poser une fois la dépendance ajoutée

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
