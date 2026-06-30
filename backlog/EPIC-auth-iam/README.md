# E01 — Auth & IAM

## Objectif
Fournir un système d'authentification complet et sécurisé : connexion email/password, Google OAuth2, OIDC enterprise, inscription avec vérification email, réinitialisation de mot de passe, confirmation d'appareil par OTP, restauration de session. Opaque tokens SHA-256 stockés en BDD (pas de JWT). Multi-tenant ready.

## Périmètre
- Feature F01.1 : connexion email/password (+ remember me)
- Feature F01.2 : inscription & vérification email (+ renvoi lien)
- Feature F01.3 : réinitialisation de mot de passe
- Feature F01.4 : confirmation d'appareil OTP
- Feature F01.5 : restauration de session
- Feature F01.6 : Google OAuth2
- Feature F01.7 : OIDC enterprise (v1-enterprise, implémenté)
- Enabler EN01.1 : opaque tokens
- Enabler EN01.2 : Spring Security config
- Enabler EN01.3 : service email transactionnel
- Enabler EN01.4 : rate limiting (Redis)
- Enabler EN01.5 : feature flags (BDD)
- Enabler EN01.6 : audit events
- Enabler EN01.7 : token cleanup scheduler
- Enabler EN01.8 : infrastructure auth frontend (Angular)

## Hors périmètre
- Social login hors Google (Apple, GitHub…) → post-MVP
- SAML → hors périmètre

## Modules impactés
- `auth` · `oidc` (pivot-core + pivot-ui)

## Dépendances
- Aucune — EPIC fondateur
- Bloque : E02 Plateforme Core (authMatchGuard), E03 Admin (accès admin)

## Statut global
✅ Implémenté — E2E partiellement couverts (8 specs Playwright auth)

---

## Suivi d'avancement

| Élément | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| **F01.1 — Connexion email/password** | | |
| [US01.1.1 — Connexion](FEATURES/login-email-password/us-connexion.md) | ✅ | ✅ |
| [US01.1.2 — Déconnexion](FEATURES/login-email-password/us-deconnexion.md) | ✅ | ✅ |
| [US01.1.3 — Se souvenir de moi](FEATURES/login-email-password/us-remember-me.md) | ✅ | ✅ |
| **F01.2 — Inscription & vérification** | | |
| [US01.2.1 — Inscription](FEATURES/inscription-verification/us-inscription.md) | ✅ | ✅ |
| [US01.2.2 — Vérification email](FEATURES/inscription-verification/us-verification-email.md) | ✅ | ✅ |
| [US01.2.3 — Renvoi lien activation](FEATURES/inscription-verification/us-renvoi-lien-activation.md) | ✅ | ✅ |
| **F01.3 — Reset password** | | |
| [US01.3.1 — Mot de passe oublié](FEATURES/reset-password/us-mot-de-passe-oublie.md) | ✅ | ✅ |
| [US01.3.2 — Réinitialisation](FEATURES/reset-password/us-reset-password.md) | ✅ | ✅ |
| **F01.4 — Device confirmation** | | |
| [US01.4.1 — OTP appareil](FEATURES/device-confirmation/us-device-confirm-otp.md) | ✅ | ✅ |
| **F01.5 — Session restore** | | |
| [US01.5.1 — Restauration de session](FEATURES/session-restore/us-session-restore.md) | ✅ | ✅ |
| **F01.6 — Google OAuth2** | | |
| [US01.6.1 — Connexion Google](FEATURES/google-oauth/us-google-oauth.md) | ✅ | ✅ |
| **F01.7 — OIDC Enterprise** | | |
| [US01.7.1 — OIDC login](FEATURES/oidc-enterprise/us-oidc-login.md) | ✅ | ✅ |
| [US01.7.2 — Provisionnement JIT](FEATURES/oidc-enterprise/us-oidc-jit.md) | ✅ | ✅ |
| **Enablers** | | |
| [EN01.1 — Opaque tokens](ENABLERS/en-opaque-tokens.md) | ✅ | ✅ |
| [EN01.2 — Spring Security config](ENABLERS/en-spring-security.md) | ✅ | ✅ |
| [EN01.3 — Service email](ENABLERS/en-email-service.md) | ✅ | ✅ |
| [EN01.4 — Rate limiting Redis](ENABLERS/en-rate-limiting.md) | ✅ | ✅ |
| [EN01.5 — Feature flags](ENABLERS/en-feature-flags.md) | ✅ | ✅ |
| [EN01.6 — Audit events](ENABLERS/en-audit-events.md) | ✅ | ✅ |
| [EN01.7 — Token cleanup scheduler](ENABLERS/en-token-cleanup.md) | ✅ | ✅ |
| [EN01.8 — Auth frontend infra](ENABLERS/en-frontend-auth-infra.md) | ✅ | ✅ |
