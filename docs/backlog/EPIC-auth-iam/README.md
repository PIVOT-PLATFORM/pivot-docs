# E01 — Authentification & IAM

## Objectif
Système d'authentification complet et sécurisé : connexion email/password, inscription avec vérification email, réinitialisation de mot de passe, MFA par appareil (OTP), restauration de session. Opaque tokens SHA-256 stockés en BDD (pas de JWT). Multi-tenant ready.

## Périmètre GitHub (MVP)
- Feature F01.1 : Connexion / session
- Feature F01.2 : Inscription & vérification e-mail
- Feature F01.3 : Réinitialisation mot de passe
- Feature F01.4 : MFA par appareil (OTP + gestion appareils)
- Feature F01.5 : Notifications de sécurité

## Périmètre GitHub (v1-enterprise)
- EN01.11 : OIDC multi-tenant (PKCE S256)

## Extras implémentés (hors périmètre GitHub)
- Feature F01.6 : Google OAuth2
- Feature F01.7 : OIDC enterprise login + provisionnement JIT

## Hors périmètre
- Social login hors Google (Apple, GitHub…) → post-MVP
- SAML → hors périmètre

## Modules impactés
`auth` · `oidc` (pivot-core + pivot-ui)

## Dépendances
- Aucune — EPIC fondateur
- Bloque : E16 Shell (authMatchGuard), E06 Administration (accès admin)

## Statut global
✅ Partiellement Done — F01.1 (3/5 US), F01.2 (3/4 US), F01.3 ✅, F01.4 (1/3 US), F01.5-F01.7 extras ✅

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|-------|
| **F01.1 — Connexion / session** | | |
| [US01.1.1 — Connexion email + mot de passe](FEATURES/login-email-password/us-connexion.md) | ✅ |
| [US01.1.2 — Déconnexion](FEATURES/login-email-password/us-deconnexion.md) | ✅ |
| [US01.1.3 — Rester connecté (remember-me)](FEATURES/login-email-password/us-remember-me.md) | ✅ |
| [US01.1.4 — Redirection post-login](FEATURES/login-email-password/us-redirection-post-login.md) | ⬜ |
| [US01.1.5 — Expiration de session (front) + auto-logout](FEATURES/login-email-password/us-expiration-session.md) | ⬜ |
| **F01.2 — Inscription & vérification e-mail** | | |
| [US01.2.1 — Inscription](FEATURES/inscription-verification/us-inscription.md) | ✅ |
| [US01.2.2 — Vérification e-mail](FEATURES/inscription-verification/us-verification-email.md) | ✅ |
| [US01.2.3 — Renvoi du lien de vérification](FEATURES/inscription-verification/us-renvoi-lien-activation.md) | ✅ |
| [US01.2.4 — Politique de robustesse du mot de passe](FEATURES/inscription-verification/us-politique-password.md) | ⬜ |
| **F01.3 — Réinitialisation mot de passe** | | |
| [US01.3.1 — Demande de réinitialisation](FEATURES/reset-password/us-mot-de-passe-oublie.md) | ✅ |
| [US01.3.2 — Réinitialisation par token](FEATURES/reset-password/us-reset-password.md) | ✅ |
| **F01.4 — MFA par appareil** | | |
| [US01.4.1 — OTP depuis un appareil inconnu](FEATURES/device-confirmation/us-device-confirm-otp.md) | ✅ |
| [US01.4.2 — Gestion des appareils de confiance](FEATURES/device-confirmation/us-appareils-confiance.md) | ⬜ |
| [US01.4.3a — Alerte connexion suspecte (appareil inconnu)](FEATURES/device-confirmation/us-alerte-connexion-suspecte.md) | ⬜ |
| [US01.4.3b — Alerte connexion depuis IP/pays inhabituel](FEATURES/device-confirmation/us-alerte-ip-suspecte.md) *(v1-enterprise)* | ⬜ |
| **F01.5 — Notifications de sécurité** | | |
| [US01.5.1 — E-mail de confirmation d'action sensible](FEATURES/notifications-securite/us-email-action-sensible.md) | ⬜ |
| **Extras hors GitHub** | | |
| [F01.6 — Google OAuth2](FEATURES/google-oauth/us-google-oauth.md) | ✅ |
| [F01.7 — OIDC Enterprise login](FEATURES/oidc-enterprise/us-oidc-login.md) | ✅ |
| [F01.7 — OIDC provisionnement JIT](FEATURES/oidc-enterprise/us-oidc-jit.md) | ✅ |
| [F01.8 — Restauration de session](FEATURES/session-restore/us-session-restore.md) | ✅ |
| **Enablers** | | |
| [EN01.1 — Opaque tokens + TTL BDD](ENABLERS/en-opaque-tokens.md) | ✅ |
| [EN01.2 — Spring Security config](ENABLERS/en-spring-security.md) | ✅ |
| [EN01.3 — Service email transactionnel](ENABLERS/en-email-service.md) | ✅ |
| [EN01.4 — Rate limiting Redis](ENABLERS/en-rate-limiting.md) | ✅ |
| [EN01.5 — Feature flags BDD](ENABLERS/en-feature-flags.md) | ✅ |
| [EN01.6 — Audit events](ENABLERS/en-audit-events.md) | ✅ |
| [EN01.7 — Anti-énumération](ENABLERS/en-anti-enumeration.md) | ✅ |
| [EN01.8 — Token cleanup scheduler](ENABLERS/en-token-cleanup.md) | ✅ |
| [EN01.9 — En-têtes sécurité (CSP, HSTS)](ENABLERS/en-security-headers.md) | ✅ |
| [EN01.10 — Auth frontend infra (Angular)](ENABLERS/en-frontend-auth-infra.md) | ✅ |
| EN01.11 — OIDC multi-tenant PKCE S256 *(v1-enterprise, couvert F01.7)* | ✅ |
| [EN01.12 — Infrastructure Multi-tenant (Tenant, TenantOidcConfig)](ENABLERS/en-tenant-infrastructure.md) *(hors GitHub)* | ✅ |
