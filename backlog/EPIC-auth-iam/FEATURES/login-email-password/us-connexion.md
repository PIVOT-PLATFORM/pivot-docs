# US01.1.1 — Connexion email/password

**En tant que** utilisateur inscrit et vérifié
**Je veux** me connecter avec mon email et mon mot de passe
**Afin d'** accéder à mon espace PIVOT

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Email + password corrects → token opaque posé en cookie HttpOnly, redirection `/home` | ✅ | ✅ |
| Email inexistant → message générique "Identifiants invalides" (anti-énumération) | ✅ | ✅ |
| Mot de passe incorrect → même message générique (anti-énumération) | ✅ | ✅ |
| Compte non vérifié → renvoi silencieux du lien d'activation + réponse générique | ✅ | ✅ |
| Token opaque 256-bit SecureRandom, SHA-256 stocké en BDD, raw token jamais persisté | ✅ | ✅ |
| Cookie HttpOnly, SameSite=Strict, Secure — jamais de token en LocalStorage | ✅ | ✅ |
| Champ email focus au chargement de la page de login | ✅ | ✅ |
| A11y : `role="alert"` sur le message d'erreur, labels explicites, focus trap | ✅ | ✅ |
| Clés i18n dans l'espace `auth.login.*` (fr.json / en.json) — libellés, erreurs, placeholders | ⬜ | ⬜ |
| État de chargement (bouton désactivé + spinner) pendant la requête POST /api/auth/login | ⬜ | ⬜ |

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
Item Type: US · Parent: F01.1 · Module: auth · Phase: MVP · Size: M · Priority: Critical
Human Gate: human-validated · Stage: Done
