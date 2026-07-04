# Audit — cicd

**Statut :** À compléter
**Dernière révision :** 2026-07-03

## Résumé

> _À remplir lors du premier audit formel._

## Points d'attention

- [ ] À identifier

## Décisions notables

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
