# US01.1.5 — Expiration de session (front) + auto-logout

**En tant que** utilisateur
**Je veux** être automatiquement déconnecté quand ma session expire
**Afin de** protéger mon compte si j'oublie de me déconnecter

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Token interceptor Angular détecte 401 → déclenche logout et redirection /login | ✅ |
| Toast "Session expirée, veuillez vous reconnecter" affiché | ✅ |
| Si remember-me actif : tentative de refresh token silencieuse avant logout | ❌ supprimé |
| Tests Vitest TokenInterceptor (401 → logout flow) | ✅ |
| Suppression de l'AC "silent refresh" : pas de refresh token dans le modèle opaque tokens PIVOT. Le seul signal d'expiration est le 401 backend | ✅ |
| Si remember-me était actif, le toast d'expiration précise "Votre session longue a expiré" et invite à se reconnecter | ✅ |
| Si plusieurs onglets ouverts, BroadcastChannel déclenche le logout dans tous les onglets lorsqu'un 401 est détecté dans l'un d'eux | ✅ |
| Redirection /login post-expiration : returnUrl extrait de l'URL courante, validé comme URL relative interne uniquement (protection open redirect) | ✅ |

## Notes d'implémentation

- Implémentation : pivot-ui [#63](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/63)
- Pas de silent refresh : l'ancien flux « 401 → /auth/refresh → retry » du TokenInterceptor a été retiré — le 401 backend est le seul signal d'expiration (modèle opaque tokens).
- `SessionExpiryService` (pivot-ui `core/auth/service/`) orchestre : purge mémoire (`AuthService.clearSession()`), toast (variante remember-me), BroadcastChannel `pivot-session`, redirection `/auth/login?returnUrl=…`.
- Validation returnUrl locale (`core/auth/util/return-url.ts`) — **US01.1.4 et US01.1.5 sont
  toutes deux mergées sur `main` et le doublon annoncé n'a pas été résolu** : `core/auth/return-url.ts`
  (US01.1.4) et `core/auth/util/return-url.ts` (US01.1.5) coexistent toujours, avec des contrats
  légèrement différents (l'un retourne `string` avec fallback par défaut, l'autre `string | null`
  et bloque en plus les chemins `/auth/*`). Dette technique à traiter dans `pivot-ui` — hors
  périmètre de ce fichier backlog (pivot-docs), suivi requis côté `pivot-ui`.
- Le flag remember-me vit en mémoire uniquement : perdu après reload (le refresh cookie ne le renvoie pas) → toast générique dans ce cas.

---
Item Type: US · Parent: F01.1 · Module: auth · Phase: Socle · Size: M · Priority: High
Stage: ✅
Gate 5 : `pivot-ui` PR [#63](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/63) (Gate 4 =
96/100), spec figée `docs/specs/EPIC-auth-iam/us01-1-5-expiration-session.md` (rétroactif,
2026-07-08)
