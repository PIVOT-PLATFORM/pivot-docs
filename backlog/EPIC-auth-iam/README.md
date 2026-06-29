# E01 — Auth & IAM

## Objectif
Fournir un système d'authentification complet et sécurisé : connexion email/password, inscription avec vérification email, réinitialisation de mot de passe, confirmation d'appareil par OTP. Opaque tokens SHA-256 stockés en BDD (pas de JWT). Multi-tenant ready.

## Périmètre
- Feature F01.1 : connexion email/password (+ remember me)
- Feature F01.2 : inscription & vérification email (+ renvoi lien)
- Feature F01.3 : réinitialisation de mot de passe
- Feature F01.4 : confirmation d'appareil OTP
- Enabler EN01.1 : opaque tokens (infrastructure)
- Enabler EN01.2 : configuration Spring Security
- Enabler EN01.3 : service email transactionnel

## Hors périmètre
- OIDC enterprise (SSO Keycloak / Azure AD / Okta) → v1-enterprise
- Google OAuth2 / social login → post-MVP
- Gestion des rôles avancée (RBAC multi-ressources) → E03 Admin

## Modules impactés
- `auth` (pivot-core + pivot-ui)

## Dépendances
- Aucune — EPIC fondateur
- Bloque : E02 Plateforme Core (shell auth guard), E03 Admin (accès admin)

## Statut global
🔄 En cours — code implémenté, E2E manquants

---

## Suivi d'avancement

| Élément | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| **F01.1 — Connexion** | | |
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
| **Enablers** | | |
| [EN01.1 — Opaque tokens](ENABLERS/en-opaque-tokens.md) | ✅ | ✅ |
| [EN01.2 — Spring Security config](ENABLERS/en-spring-security.md) | ✅ | ✅ |
| [EN01.3 — Service email](ENABLERS/en-email-service.md) | ✅ | ✅ |
