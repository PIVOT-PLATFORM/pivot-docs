# EN01.3 — Service email transactionnel

**Type d'enabler** : infrastructure

**Objectif technique** : Service d'envoi d'emails transactionnels (vérification, reset, OTP, contact) avec templates Thymeleaf i18n (FR/EN).

**Critères de complétion** :
- [x] `EmailService.send(template, to, locale, params)` : abstraction SMTP
- [x] Templates Thymeleaf : vérification email, reset password, device OTP
- [x] i18n FR/EN sur tous les templates
- [x] Configuration SMTP via `application.yml` (host, port, credentials en env vars)
- [x] Fallback : log en dev si pas de SMTP configuré (profil `dev`)
- [x] Contact form email (US02.3.1 — en cours)

**Statut** : ✅ Fait (template contact en cours)

---
Item Type: Enabler · Parent: E01 · Type: infrastructure · Module: core · Phase: MVP
Human Gate: human-validated · Stage: Done
