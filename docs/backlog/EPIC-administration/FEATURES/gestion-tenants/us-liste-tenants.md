# US06.2.3 — Super admin liste tous les tenants

**En tant que** SUPER_ADMIN
**Je veux** voir la liste de tous les tenants de la plateforme
**Afin de** avoir une vue d'ensemble de tous les clients

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| GET /api/superadmin/tenants retourne la liste paginée des tenants | ✅ |
| Requiert ROLE_SUPER_ADMIN | ✅ |
| Champs : id, slug, name, plan, auth_mode, is_active, userCount, createdAt | ✅ |
| Page Angular `/superadmin/tenants` avec tableau et filtres | ✅ |
| Tests TI GET /api/superadmin/tenants | ✅ |
| Réponse JSON conforme à Spring Page : { content: [...], totalElements, totalPages, number, size }. Page size par défaut : 20 | ✅ |
| Paramètres de pagination : page (0-indexed) et size | ✅ |
| Colonnes du tableau : nom, slug, plan, auth_mode, is_active, createdAt | ✅ |
| Filtres disponibles : name (search), is_active (boolean), plan, auth_mode | ✅ |
| Tri par défaut : createdAt DESC | ✅ |
| Tests Vitest TenantsListComponent (loading, empty state, error state) | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#126](https://github.com/PIVOT-PLATFORM/pivot-core/pull/126) **mergée** (CI verte, correctif SpotBugs `EI_EXPOSE_REP` appliqué en cours de revue) · `pivot-ui` PR [#69](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/69) **draft, ouverte, non mergée** (Gate 2 self-évalué : 96/100 — détail dans la PR).
- Nouveau guard `ROLE_SUPER_ADMIN` côté Angular (`super-admin.guard.ts`, miroir de `adminGuard`) — réutilisable par US06.2.1/US06.2.2 (création/désactivation de tenant), qui exposeront la même zone `/superadmin`.
- `userCount` calculé par requête de comptage (pas de compteur dénormalisé en base).
- Un run `test:ci` complet montre 39 échecs pré-existants sur `main` (bug `localStorage` vs `window.localStorage` sous Vitest dans `theme.service.spec.ts`, `navbar.component.spec.ts`, `auth-shell.component.spec.ts`, `login.component.spec.ts`) — confirmé indépendant de cette US par comparaison avec un checkout `main` propre ; signalé au mainteneur, non corrigé ici (hors périmètre de cette US).

---
Item Type: US · Parent: F06.2 · Module: admin · Phase: MVP · Size: S · Priority: Medium
Stage: In progress
