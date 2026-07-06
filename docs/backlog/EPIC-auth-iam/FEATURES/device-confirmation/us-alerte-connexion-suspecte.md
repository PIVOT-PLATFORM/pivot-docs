# US01.4.3a — Alerte connexion suspecte (appareil inconnu)

**En tant que** utilisateur
**Je veux** recevoir une alerte email quand une connexion depuis un nouvel appareil inconnu est détectée
**Afin de** réagir rapidement en cas de compromission

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Détection basée sur le fingerprint d'appareil inconnu (hors géolocalisation IP — périmètre Socle uniquement) | ✅ |
| Email d'alerte envoyé avec : appareil, date/heure, lien "Pas moi" (OTP à usage unique TTL 1h) | ✅ |
| Pas d'alerte si appareil de confiance déjà connu | ✅ |
| Alerte journalisée (audit event SuspiciousLoginDetected) | ✅ |
| Tests TU SuspiciousLoginService (mock fingerprint inconnu) | ✅ |
| Détection basée uniquement sur le fingerprint d'appareil (pas de géolocalisation IP en Socle) | ✅ |
| Le fingerprint d'appareil de confiance est stocké en BDD (lié au userId, pas uniquement côté client). Suppression du cookie n'entraîne pas la suppression de l'approbation BDD | ✅ |
| Le lien "Pas moi" dans l'email est un OTP à usage unique (TTL 1h) qui redirige vers une page de ré-authentification complète (mot de passe actuel obligatoire) — ne déclenche pas directement de changement sans authentification | ✅ |
| Pas d'alerte si appareil de confiance déjà connu en BDD (pas basé sur cookie seul) | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#151](https://github.com/PIVOT-PLATFORM/pivot-core/pull/151) (Gate 4 self-évalué : 96/100 — MERGE_DOCUMENTED, détail dans la PR).
- **Distinction avec US01.4.1** (porte OTP bloquante déjà en place) : la nouvelle alerte passive de `SuspiciousLoginService` se déclenche **uniquement** sur la branche de `SessionService#login` où la porte OTP US01.4.1 **ne s'applique pas** (flag `MFA_NEW_DEVICE_OTP` désactivé, ou compte non `ROLE_SUPER_ADMIN`) — les deux mécanismes ne se déclenchent jamais sur la même requête. L'appareil est marqué de confiance après la première alerte passive pour ne pas ré-alerter à chaque connexion suivante.
- Token "Pas moi" : nouvelle table `suspicious_login_tokens` (pliée dans `V1__schema_init.sql`), même primitive que `password_reset_tokens` (hash SHA-256, `expires_at`/`used_at`) plutôt que l'OTP HMAC 6 chiffres de `device_verify_tokens` — le lien est cliqué depuis un email, jamais saisi à la main. TTL piloté par le flag `SUSPICIOUS_LOGIN_OTP_TTL_MINUTES` (défaut 60 min).
- `POST /auth/suspicious-login/confirm` exige le mot de passe actuel avant toute action (révocation de la confiance de l'appareil ciblé + toutes les sessions actives) — le clic sur le lien seul ne déclenche rien.
- Point signalé en review (non bloquant) : le Quality Gate SonarCloud de la PR échoue sur `new_duplicated_lines_density` (boilerplate JPA de `SuspiciousLoginToken` partagé avec `TrustedDevice`/`DeviceVerifyToken`/`PasswordResetToken`/`EmailVerification`) — pattern déjà toléré sur `main` (`PasswordResetToken`/`EmailVerification` sont déjà quasi-identiques). Action recommandée pour le mainteneur : marquer l'issue "Won't Fix" côté SonarCloud UI.

---
Item Type: US · Parent: F01.4 · Module: auth · Phase: Socle · Size: S · Priority: Medium · Note: US01.4.3b (alerte IP/géo) → v1-enterprise
Stage: Review
