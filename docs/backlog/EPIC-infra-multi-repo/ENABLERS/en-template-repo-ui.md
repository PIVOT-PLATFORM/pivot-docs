# EN17.6 — Template repo pivot-xxx-ui

**Type d'enabler** : infrastructure

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
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: ui · Phase: phase-3
Stage: Backlog · Priority: High
