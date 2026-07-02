# EN17.3 — Publication @pivot/ui-core (npm package)

**Type d'enabler** : infrastructure

**Critères de complétion** :
- [ ] `pivot-ui` configuré pour publier `@pivot/ui-core` dans GitHub Packages
- [ ] Exports : `AuthService`, `AuthInterceptor`, `AuthGuard`, `TenantService`, `HeaderComponent`, `FooterComponent`, `ModuleGuard`, `ModuleStatusService`
- [ ] Ré-export complet de `@pivot/design-system`
- [ ] CI GitHub Actions : step `npm publish` déclenché sur push `main` + tag semver
- [ ] Versioning sémantique via Semantic Release
- [ ] Test de consommation : repo module test qui importe `@pivot/ui-core` et affiche le header

**Dépendances** : EN17.2 (@pivot/design-system publié)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: phase-3
Stage: Backlog · Priority: High
