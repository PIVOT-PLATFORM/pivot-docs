# EN17.3 — Publication @pivot/ui-core (npm package)

**Type d'enabler** : infrastructure

**Objectif technique** : Publier les services, guards et composants shell de `pivot-ui`
(`AuthService`, `AuthInterceptor`, `ModuleGuard`, `HeaderComponent`, `FooterComponent`,
`TenantService`, `ModuleStatusService`) en un package npm `@pivot/ui-core` dans GitHub Packages,
consommable par tout repo `pivot-xxx-ui`.

**Justification** : Sans `@pivot/ui-core`, chaque repo module-ui devrait ré-implémenter
l'authentification OIDC, la gestion du tenant et l'intégration header/footer — travail non
différenciant et source de divergences. Ce package est le contrat de dépendance entre `pivot-ui`
(shell) et les modules UI : il garantit que tous les modules partagent la même session, les mêmes
tenants et la même logique de guard.

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
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: Ready · Priority: Critical
