# US01.1.2 — Déconnexion

**En tant que** utilisateur connecté
**Je veux** pouvoir me déconnecter
**Afin de** protéger mon compte lors d'un accès partagé

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Clic "Déconnexion" → `POST /api/auth/logout` → token révoqué en BDD | ✅ |
| Cookie `pivot_session` supprimé après déconnexion | ✅ |
| Redirection vers `/auth/login` après déconnexion | ✅ |
| Token révoqué → toute requête ultérieure avec ce token renvoie 401 | ✅ |
| A11y : bouton "Déconnexion" accessible au clavier dans le menu utilisateur | ✅ |
| Clés i18n dans l'espace `auth.logout.*` (fr.json / en.json) — libellé bouton, confirmation éventuelle | ⬜ |

## Notes d'implémentation
- Bouton dans `NavbarComponent` → user menu dropdown
- `AuthService.logout()` → `DELETE /api/auth/logout`

---
Item Type: US · Parent: F01.1 · Module: auth · Phase: Socle · Size: XS · Priority: Critical
Stage: ✅
Gate 5 : `pivot-core` PR [#67](https://github.com/PIVOT-PLATFORM/pivot-core/pull/67) (Gate 4 = 78/100, VALIDATE_WITH_HUMAN) + `pivot-ui` PR [#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11) (Gate 4 = 82/100) / [#49](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/49), spec figée `docs/specs/EPIC-auth-iam/us01-1-2-deconnexion.md` (rétroactif, 2026-07-08)
