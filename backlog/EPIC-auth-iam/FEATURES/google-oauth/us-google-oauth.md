# US01.6.1 — Connexion Google OAuth2

**En tant que** utilisateur
**Je veux** me connecter avec mon compte Google
**Afin d'** accéder à PIVOT sans créer de mot de passe

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Bouton "Se connecter avec Google" sur la page login | ✅ | ✅ |
| Click → Google OAuth2 consent screen → Google ID token retourné au client | ✅ | ✅ |
| `POST /auth/google` avec ID token → vérification côté backend (`GoogleAuthService`) | ✅ | ✅ |
| Token Google valide → session opaque créée (même mécanisme qu'auth classique) | ✅ | ✅ |
| Nouveau compte Google → `User` créé automatiquement (JIT provisioning), `AuthMethod.GOOGLE_OAUTH` | ✅ | ✅ |
| Email Google déjà utilisé avec password → comptes fusionnés (ou erreur selon config) | ✅ | ✅ |
| Redirection post-login → même logique que login classique | ✅ | ✅ |
| Device confirmation OTP si nouvel appareil (même flow qu'auth classique) | ✅ | ✅ |
| Rate limiting sur `POST /auth/google` | ✅ | ✅ |
| Test `GoogleAuthControllerTest`, `GoogleAuthServiceTest` | ✅ | ✅ |

## Notes d'implémentation
- `GoogleAuthController` : `POST /auth/google` → `GoogleAuthRequest { idToken, deviceFingerprint }`
- `GoogleAuthService` : vérification ID token via Google JWKS → extract claims
- `UserRepository.findByGoogleId(googleId)` pour lookup

---
Item Type: US · Parent: F01.6 · Module: auth · Phase: MVP · Size: M · Priority: High
Human Gate: human-validated · Stage: Done
