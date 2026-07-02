# US01.5.1 — Restauration de session

**En tant que** utilisateur connecté
**Je veux** retrouver ma session sans me reconnecter après rechargement ou réouverture du navigateur
**Afin de** ne pas perdre mon contexte de travail

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| `GET /auth/session` avec cookie valide → 200 + données utilisateur | ✅ |
| `GET /auth/session` sans cookie ou token expiré → 401 (pas de redirect serveur) | ✅ |
| Angular : `AuthService` appelle `GET /auth/session` à l'init → signal `isAuthenticated` mis à jour | ✅ |
| Cookie expiré → 401 → Angular redirige vers `/auth/login` | ✅ |
| Restauration transparente → aucun flash écran de login visible si session valide | ✅ |
| E2E `session-restore.spec.ts` : rechargement page → session persistée | ✅ |

## Notes d'implémentation
- `SessionService.restore()` : `GET /auth/session` → `User + AccessToken`
- `AuthService.init()` appelé dans `APP_INITIALIZER` Angular
- E2E : `pivot-ui/e2e/auth/session-restore.spec.ts`

---
Item Type: US · Parent: F01.5 · Module: auth · Phase: MVP · Size: S · Priority: Critical
Stage: Done
