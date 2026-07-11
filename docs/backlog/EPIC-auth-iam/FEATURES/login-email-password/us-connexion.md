# US01.1.1 — Connexion email/password

**En tant que** utilisateur inscrit et vérifié
**Je veux** me connecter avec mon email et mon mot de passe
**Afin d'** accéder à mon espace PIVOT

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Email + password corrects → token opaque posé en cookie HttpOnly, redirection `/home` | ✅ |
| Email inexistant → message générique "Identifiants invalides" (anti-énumération) | ✅ |
| Mot de passe incorrect → même message générique (anti-énumération) | ✅ |
| Compte non vérifié → renvoi silencieux du lien d'activation + réponse générique | ✅ |
| Token opaque 256-bit SecureRandom, SHA-256 stocké en BDD, raw token jamais persisté | ✅ |
| Cookie HttpOnly, SameSite=Strict, Secure — jamais de token en LocalStorage | ✅ |
| Champ email focus au chargement de la page de login | 🟡 non implémenté à date (pas d'`autofocus`/`.focus()` en code) — voir spec Gate 5 |
| A11y : `role="alert"` sur le message d'erreur, labels explicites, focus trap | 🟡 labels explicites confirmés ; `role="alert"` et focus trap absents du code — voir spec Gate 5 |
| Clés i18n dans l'espace `auth.login.*` (fr.json / en.json) — libellés, erreurs, placeholders | ✅ |
| État de chargement (bouton désactivé + spinner) pendant la requête POST /api/auth/login | ✅ |

## Hors périmètre
- Rate limiting (voir EN01.x)
- Social login
- OIDC SSO

## Notes d'implémentation
- Controller : `POST /api/auth/login` → `AuthController`
- Service : `AuthService.login()` → vérification BCrypt + génération token
- Token : `TokenService.generateToken()` → 256-bit SecureRandom, SHA-256 stocké dans `access_tokens`
- Frontend : `LoginComponent` (`pivot-ui/src/app/features/auth/login/`)
- Guard : `authMatchGuard` (CanMatchFn) protège le shell

---
Item Type: US · Parent: F01.1 · Module: auth · Phase: Socle · Size: M · Priority: Critical
Stage: ✅
Rôle: utilisateur-final
Gate 5 : `pivot-core` PR [#67](https://github.com/PIVOT-PLATFORM/pivot-core/pull/67) (Gate 4 = 78/100) +
`pivot-ui` PR [#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11) (Gate 4 = 82/100), spec figée
`docs/specs/EPIC-auth-iam/us01-1-1-connexion-email-password.md` (rétroactif, 2026-07-08) — hints
initiaux `core#105`/`ui#39` invalidés, PR réelles identifiées par vérification du diff
