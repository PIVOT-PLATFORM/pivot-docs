# US01.1.2 — Déconnexion

**En tant que** utilisateur connecté
**Je veux** pouvoir me déconnecter
**Afin de** protéger mon compte lors d'un accès partagé

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Clic "Déconnexion" → `POST /api/auth/logout` → token révoqué en BDD | ✅ | ✅ |
| Cookie `pivot_session` supprimé après déconnexion | ✅ | ✅ |
| Redirection vers `/auth/login` après déconnexion | ✅ | ✅ |
| Token révoqué → toute requête ultérieure avec ce token renvoie 401 | ✅ | ✅ |
| A11y : bouton "Déconnexion" accessible au clavier dans le menu utilisateur | ✅ | ✅ |
| Clés i18n dans l'espace `auth.logout.*` (fr.json / en.json) — libellé bouton, confirmation éventuelle | ⬜ | ⬜ |

## Notes d'implémentation
- Bouton dans `NavbarComponent` → user menu dropdown
- `AuthService.logout()` → `DELETE /api/auth/logout`

---
Item Type: US · Parent: F01.1 · Module: auth · Phase: MVP · Size: XS · Priority: Critical
Human Gate: human-validated · Stage: Done
