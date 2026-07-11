# US01.1.3 — Se souvenir de moi

**En tant que** utilisateur régulier
**Je veux** cocher "Se souvenir de moi" lors de la connexion
**Afin de** rester connecté pendant 30 jours sans re-saisir mes identifiants

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Case "Se souvenir de moi" visible sur le formulaire de connexion | ✅ |
| Case cochée → TTL token = 30 jours (vs 24h par défaut) | ✅ |
| Case non cochée → TTL token = 24h | ✅ |
| TTL stocké en BDD (`access_tokens.expires_at`), pas dans le cookie | ✅ |
| Token expiré → 401 → redirection `/auth/login` | ✅ |
| Clés i18n dans l'espace `auth.rememberMe.*` (fr.json / en.json) — libellé case à cocher | ⬜ |
| Case "Se souvenir de moi" a un `aria-label` explicite ou label associé via `for`/`id` | ⬜ |

## Notes d'implémentation
- `LoginRequest.rememberMe: boolean` → `TokenService.generateToken(rememberMe)`
- TTL configuré dans `application.yml` : `pivot.auth.token.ttl.short` / `pivot.auth.token.ttl.long`

---
Item Type: US · Parent: F01.1 · Module: auth · Phase: Socle · Size: XS · Priority: High
Stage: ✅
Rôle: utilisateur-final
Gate 5 : `pivot-core` PR [#67](https://github.com/PIVOT-PLATFORM/pivot-core/pull/67) (revue
humaine, `security`/Breaking Point 2 — pas de score Gate 4 automatisé) + `pivot-ui` PR
[#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11) (Gate 4 = 82/100), spec figée
`docs/specs/EPIC-auth-iam/us01-1-3-remember-me.md` (rétroactif, 2026-07-08)
