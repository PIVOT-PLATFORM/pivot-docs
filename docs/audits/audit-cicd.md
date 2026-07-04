# Audit — cicd

**Statut :** À compléter
**Dernière révision :** 2026-07-03

## Résumé

> _À remplir lors du premier audit formel._

## Points d'attention

- [ ] À identifier

## Décisions notables

- **2026-07-04 — Retry sur échec transitoire du déploiement GitHub Pages** :
  le job `actions/deploy-pages` échoue de façon intermittente avec
  `Deployment failed, try again later.` quand un déploiement précédent vient
  de se terminer (observé sur pivot-docs#26 et #27, check non-bloquant pour
  le merge mais générant un faux rouge sur chaque PR). Ajout d'un mécanisme
  de nouvelle tentative (jusqu'à 3 essais, backoff 20s/40s) sur
  `docs-checks.yml` (preview PR) et `deploy-docs.yml` (déploiement prod),
  sans nouvelle dépendance externe (réutilise `actions/deploy-pages` déjà
  pinné SHA). Voir pivot-docs#31.

- **2026-07-03 — Mutation testing (Stryker, pivot-ui) déplacé en exécution hebdomadaire** :
  le job `Mutation Testing (Stryker)` dans `pr-checks.yml` dépassait régulièrement le délai
  de 30min sur les PR touchant l'auth (gros volume de tests), affichant un "fail" trompeur alors que
  le score de mutation est un indicateur qualité non bloquant, jamais un gate de merge
  (`continue-on-error`, voir CLAUDE.md Gate 3). Déplacé dans un workflow dédié
  `mutation-testing.yml` — cron lundi 06:00 UTC + `workflow_dispatch` manuel, timeout porté
  à 60min. Voir pivot-ui#68.

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-03 | — | Mutation testing pivot-ui déplacé en hebdomadaire (voir Décisions notables) |
| v3 | 2026-07-04 | — | Retry déploiement GitHub Pages sur échec transitoire (voir Décisions notables) |
