# EN17.2 — Publication @pivot/design-system (npm package)

**Type d'enabler** : infrastructure

**Stack :** Angular CDK (comportement / a11y) + SCSS BEM custom (visuel) — aucune lib visuelle tierce.

**Critères de complétion** :
- [ ] Repo `pivot-design-system` créé avec structure Angular library
- [ ] Dépendance : `@angular/cdk` uniquement (pas d'Angular Material, pas de Taiga, pas de PrimeNG)
- [ ] Exports comportement (CDK wrappers) : overlay, focus trap, a11y, keyboard navigation
- [ ] Exports visuels (SCSS BEM) : tokens CSS vars (couleurs, spacing, typo, radius, shadows), mixins
- [ ] Composants MVP : Button, Input, Card, Modal, Toast, Badge, Avatar
- [ ] Storybook configuré et déployé (GitHub Pages)
- [ ] Tests a11y automatisés (axe-core) dans la CI — WCAG 2.1 AA
- [ ] Package publié dans GitHub Packages : `@pivot/design-system`
- [ ] Versioning sémantique via Semantic Release
- [ ] `pivot-ui` consomme `@pivot/design-system` — migration des composants existants
- [ ] README d'intégration pour les repos modules

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: phase-3
Stage: Backlog · Priority: High
