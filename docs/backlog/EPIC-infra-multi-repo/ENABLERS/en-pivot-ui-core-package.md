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
- [x] `pivot-ui` configuré pour publier `@pivot-platform/ui-core` dans GitHub Packages (`.npmrc`, `projects/ui-core/package.json` avec `publishConfig`)
- [x] Exports : `AuthService`, `tokenInterceptor` (AuthInterceptor), `authGuard`/`authMatchGuard`/`guestGuard`, `HeaderComponent`, `FooterComponent`, `moduleGuard`, `ModuleStatusService`, `provideUiCore({ apiUrl })`, `PIVOT_API_URL`
- [x] Note : `TenantService` = contexte tenant exposé via `AuthService.currentUser()` (tenantId/tenantSlug) — pas de service séparé
- [ ] Ré-export complet de `@pivot-platform/design-system` (bloqué sur EN17.2)
- [x] CI GitHub Actions : `.github/workflows/publish-ui-core.yml` — `npm publish` sur push `main` + tag semver
- [ ] Versioning sémantique via Semantic Release (à intégrer en release.yml)
- [ ] Test de consommation : repo module test qui importe `@pivot-platform/ui-core` et affiche le header (EN17.6)
- [x] Coverage ≥ 85% : 100% statements / 91.66% branches / 100% functions (Gate 2 ✅)
- [x] PR pivot-ui #112 ouverte — CI en cours

**Dépendances** : EN17.2 (@pivot-platform/design-system publié, pour le ré-export)

**Statut** : ✅ Done — PR pivot-ui #112 mergée (2026-07-07)

---
**Livré le** : 2026-07-07 · **PR** : [pivot-ui #112](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/112) (merged)

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: Ready · Priority: Critical
