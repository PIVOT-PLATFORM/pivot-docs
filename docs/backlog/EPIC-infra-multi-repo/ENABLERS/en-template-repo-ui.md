# EN17.6 — Template repo pivot-xxx-ui

**Type d'enabler** : infrastructure

**Objectif technique** : Créer un GitHub template repository `pivot-template-ui` contenant le
scaffolding minimal et validé d'un repo module-ui Angular : dépendances `@pivot/ui-core` +
`@pivot/design-system`, feature module lazy-loading, ModuleGuard, CI Plumber, CLAUDE.md
pré-rempli — formalisé à partir du scaffolding réel de `pivot-collaboratif-ui`.

**Justification** : Sans ce template, chaque création de repo `pivot-*-ui` risque des divergences
sur le lazy-loading, le ModuleGuard et l'intégration shell — garantissant que tout repo module-ui
satisfait dès sa création les contraintes ADR-006 (isolation des modules UI). Le template est
formalisé après coup (après EN17.2 + EN17.3 publiés) pour refléter un scaffolding réel testé.

**Critères de complétion** :
- [ ] Repo `pivot-template-ui` créé dans l'org PIVOT-PLATFORM (GitHub template repository)
- [ ] Structure Angular : `package.json` avec dépendances `@pivot/ui-core` + `@pivot/design-system`
- [ ] Feature module de base : `src/app/features/{module}/{Module}Module.ts` avec lazy-loading
- [ ] `ModuleGuard` appliqué sur la route racine du module
- [ ] Un composant exemple (`{Module}HomeComponent`) utilisant des composants `@pivot/design-system`
- [ ] CI GitHub Actions (copie du pipeline pivot-ui : lint + test + build + Playwright + Plumber)
- [ ] CLAUDE.md template pré-rempli avec conventions module
- [ ] CODEOWNERS avec mainteneurs PIVOT
- [ ] `.plumber.yaml` configuré
- [ ] Dockerfile nginx production

**Dépendances** : EN17.2 + EN17.3 (libs publiées avant de créer le template)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: ui · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: ⬜ · Priority: High
