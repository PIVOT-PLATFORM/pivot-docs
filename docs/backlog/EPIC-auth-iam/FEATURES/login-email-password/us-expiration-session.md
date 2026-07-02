# US01.1.5 — Expiration de session (front) + auto-logout

**En tant que** utilisateur
**Je veux** être automatiquement déconnecté quand ma session expire
**Afin de** protéger mon compte si j'oublie de me déconnecter

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Token interceptor Angular détecte 401 → déclenche logout et redirection /login | ✅ |
| Toast "Session expirée, veuillez vous reconnecter" affiché | ✅ |
| Si remember-me actif : tentative de refresh token silencieuse avant logout | ❌ supprimé |
| Tests Vitest TokenInterceptor (401 → logout flow) | ✅ |
| Suppression de l'AC "silent refresh" : pas de refresh token dans le modèle opaque tokens PIVOT. Le seul signal d'expiration est le 401 backend | ✅ |
| Si remember-me était actif, le toast d'expiration précise "Votre session longue a expiré" et invite à se reconnecter | ✅ |
| Si plusieurs onglets ouverts, BroadcastChannel déclenche le logout dans tous les onglets lorsqu'un 401 est détecté dans l'un d'eux | ✅ |
| Redirection /login post-expiration : returnUrl extrait de l'URL courante, validé comme URL relative interne uniquement (protection open redirect) | ✅ |

## Notes d'implémentation

- Pas de silent refresh : l'ancien flux « 401 → /auth/refresh → retry » du TokenInterceptor a été retiré — le 401 backend est le seul signal d'expiration (modèle opaque tokens).
- `SessionExpiryService` (pivot-ui `core/auth/service/`) orchestre : purge mémoire (`AuthService.clearSession()`), toast (variante remember-me), BroadcastChannel `pivot-session`, redirection `/auth/login?returnUrl=…`.
- Validation returnUrl locale (`core/auth/util/return-url.ts`) — à dédupliquer avec le validateur returnUrl de l'US01.1.4 au merge.
- Le flag remember-me vit en mémoire uniquement : perdu après reload (le refresh cookie ne le renvoie pas) → toast générique dans ce cas.

---
Item Type: US · Parent: F01.1 · Module: auth · Phase: MVP · Size: M · Priority: Medium
Stage: Review
