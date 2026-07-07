# EN08.2 — Guard Angular module whiteboard

## Contexte

- **Enabler** : `docs/backlog/EPIC-collaboration/ENABLERS/en-guard-angular-whiteboard.md`
- **PR** : `pivot-collaboratif-ui`
  [#15](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/15)
  (`feat/en08-2-guard-angular-whiteboard`)
- **Dernier commit au moment du figeage** : `79ef94c` — `feat(modules): EN08.2 —
  whiteboardModuleGuard + boardAccessGuard`
- **Gate 2 COVERAGE** : 100 % (statements / branches / functions / lines) — 8 tests Vitest
- **Gate 4 MERGE_CONFIDENCE** : 100/100 (1 itération — 0 finding)

## Spec fonctionnelle

Deux `CanActivateFn` Angular protègent l'accès au module whiteboard à deux niveaux indépendants
et cumulatifs.

### `whiteboardModuleGuard` (activation module)

Appliqué sur la route `/whiteboard` (lazy-loaded). Vérifie que le module whiteboard est activé
pour le tenant courant. **Stub actuel** : retourne `of(true)` inconditionnellement — la vraie
vérification (`moduleGuard('whiteboard')` de `@pivot-platform/ui-core`) sera branchée dès que
EN17.3 aura résolu la publication du package.

Comportement cible (une fois EN17.3 résolu) :
- Module activé → accès accordé
- Module désactivé → redirection `/home` + toast "Module non disponible"
- Erreur API → fail-closed, redirection `/home`

### `boardAccessGuard` (accès board)

Appliqué sur la route `/whiteboard/:boardId`, en complément du `whiteboardModuleGuard`. Appelle
`GET /api/collaboratif/whiteboard/boards/{boardId}` avant d'instancier le composant canvas.

| Cas | Comportement |
|-----|-------------|
| 200 OK | Accès accordé (`true`) |
| 403 Forbidden | Redirection `/home` + toast "Vous n'avez pas accès à ce tableau" |
| 404 Not Found | Idem 403 (cross-tenant ou inexistant — anti-énumération) |
| Erreur réseau | Idem 403/404 — fail-closed, jamais d'accès accordé par défaut |
| `boardId` absent du paramMap | Idem 403/404 (défensif, théoriquement impossible sur cette route) |

Toast géré via `ToastService` (stub console jusqu'à `@pivot/design-system` — EN17.2). La
redirection utilise `router.createUrlTree(['/home'])` (retour `UrlTree` — idiomatique Angular,
pas `router.navigateByUrl` impératif).

## Spec technique

### Routes

```text
/whiteboard
  canActivate: [whiteboardModuleGuard]    ← module guard (stub)
  loadChildren: () => import('./whiteboard/whiteboard.routes').then(m => m.whiteboardRoutes)

/whiteboard/:boardId
  canActivate: [boardAccessGuard]         ← board guard (pleinement implémenté)
```

Bundle : `whiteboard-routes` chunk distinct dans le build Angular production (lazy-loading
confirmé — aucun code whiteboard dans le bundle initial).

### Fichiers implémentés

| Fichier | Rôle |
|---------|------|
| `src/app/core/whiteboard/whiteboard-module.guard.ts` | Stub module guard |
| `src/app/core/whiteboard/board-access.guard.ts` | Board access guard |
| `src/app/core/toast/toast.service.ts` | Stub ToastService |
| `src/app/whiteboard/whiteboard.routes.ts` | Routes whiteboard lazy-loaded |
| `src/app/app.routes.ts` | Route `/whiteboard` avec moduleGuard |
| `public/assets/i18n/{fr,en}.json` | Clés `whiteboard.guard.*` |

### i18n

| Clé | FR | EN |
|-----|----|----|
| `whiteboard.guard.moduleDisabled` | Module non disponible | Module not available |
| `whiteboard.guard.accessDenied` | Vous n'avez pas accès à ce tableau | You don't have access to this board |
| `whiteboard.guard.networkError` | Erreur réseau, veuillez réessayer | Network error, please try again |

## Écarts et limitations connues

- **`whiteboardModuleGuard` est un stub** : retourne toujours `true`. Le module whiteboard est
  donc accessible à tout utilisateur, quelle que soit la configuration tenant. Dépend de EN17.3.
- **`ToastService` est un stub console** : les toasts ne s'affichent pas en UI — seulement dans
  la console navigateur. Dépend de EN17.2 (`@pivot/design-system`).
- **Route `/home` non définie** : la redirection en cas d'accès refusé pointe vers `/home` qui
  n'existe pas encore dans ce repo. Angular ne navigue pas mais ne plante pas non plus. À
  implémenter lors de l'intégration shell (`pivot-ui`).
- **Auth absente** : le `boardAccessGuard` appelle l'API sans token — côté backend, l'endpoint
  utilise le header `X-Pivot-User-Id` (stub EN17). Dépend de `@pivot-platform/ui-core` (EN17.3)
  pour l'injection du token réel.
