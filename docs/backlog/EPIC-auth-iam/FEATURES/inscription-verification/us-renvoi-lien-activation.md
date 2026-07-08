# US01.2.3 — Renvoi lien d'activation

**En tant que** utilisateur dont le lien d'activation a expiré
**Je veux** demander un nouveau lien
**Afin de** finaliser mon inscription

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Page `/auth/resend-activation` avec champ email | 🟡 |
| Email connu + compte PENDING → nouveau token généré, ancien invalidé, email envoyé | 🟡 |
| Email inconnu ou compte déjà ACTIVE → réponse générique (anti-énumération) | ✅ |
| Renvoi silencieux depuis le flux de connexion (compte non vérifié détecté) | ⬜ |
| Rate limiting sur POST /api/auth/resend-activation — au plus 3 renvois par heure par adresse email | 🟡 |
| Token de renvoi : 256-bit SecureRandom, SHA-256 stocké en BDD (même entropie que le token initial) | ✅ |
| Clés i18n dans l'espace `auth.resendActivation.*` (fr.json / en.json) | 🟡 |

> 🟡 = livré mais avec un écart vs le libellé exact de l'AC (nommage route/i18n `resend-verification`/`auth.resend.*` au lieu de `resend-activation`/`auth.resendActivation.*` ; rate limiting par IP au lieu de par email ; ancien token non invalidé explicitement) — détail complet dans la spec figée. ⬜ = non livré (renvoi automatique depuis l'écran de connexion : absent côté backend et frontend).

---
Item Type: US · Parent: F01.2 · Module: auth · Phase: Socle · Size: XS · Priority: High
Stage: Done
Gate 5 : `pivot-core` PR [#105](https://github.com/PIVOT-PLATFORM/pivot-core/pull/105) (Gate 4 = 87/100) + `pivot-ui` PR [#39](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/39) (Gate 4 = 86/100), spec figée `docs/specs/EPIC-auth-iam/us01-2-3-renvoi-lien-activation.md` (rétroactif, 2026-07-08) — écarts vs AC initiaux documentés dans la spec (nommage route/i18n, rate limiting par IP, pas d'invalidation explicite de l'ancien token, renvoi automatique depuis le login non livré)
