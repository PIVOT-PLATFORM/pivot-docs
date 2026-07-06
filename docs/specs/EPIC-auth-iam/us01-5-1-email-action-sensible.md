# US01.5.1 — E-mail de confirmation d'action sensible

## Contexte

- **US source** : [`docs/backlog/EPIC-auth-iam/FEATURES/notifications-securite/us-email-action-sensible.md`](pathname:///pivot-docs/backlog/EPIC-auth-iam/FEATURES/notifications-securite/us-email-action-sensible)
- **Repo d'implémentation** : `pivot-core`
- **PR** : [PIVOT-PLATFORM/pivot-core#154](https://github.com/PIVOT-PLATFORM/pivot-core/pull/154)
- **Dernier commit au moment du figeage** : `3eb80b8` — `feat(auth): US01.5.1 - email de confirmation d'action sensible`
- **Figé le** : 2026-07-06

## Spec fonctionnelle

### Déclencheurs

Une notification de sécurité par e-mail est envoyée après chacune des quatre actions sensibles
suivantes sur un compte utilisateur :

| Action | Point d'entrée backend | Destinataire |
|--------|------------------------|--------------|
| Changement de mot de passe (authentifié) | `POST /account/password` → `AccountPasswordService.changePassword` | adresse email courante du compte |
| Changement de mot de passe (mot de passe oublié) | `POST /auth/reset-password` → `PasswordService.resetPassword` | adresse email courante du compte |
| Changement d'adresse email confirmé | `POST /account/email/confirm` → `EmailChangeService.confirmEmailChange` | **ancienne** adresse email (la nouvelle vient d'être activée, l'ancienne est le seul canal restant pour alerter le propriétaire légitime en cas d'usurpation) |
| Demande de suppression de compte confirmée | `DELETE /account` → `AccountDeletionService.requestDeletion` | adresse email du compte (non anonymisée à ce stade) |
| Révocation d'une session unique | `DELETE /api/account/sessions/{tokenId}` → `SessionService.revokeSession` | adresse email du compte |
| Révocation de toutes les sessions sauf la courante | `DELETE /api/account/sessions` → `SessionService.revokeAllSessionsExceptCurrent` | adresse email du compte — **un seul email récapitulatif**, jamais un email par session révoquée |

Chaque déclencheur ci-dessus appelle une méthode dédiée de `SecurityNotificationService`
(`fr.pivot.auth.service`, nouveau) plutôt que d'appeler `EmailService` directement — ce service est
le point d'entrée unique pour cette famille de notifications, centralisant la résolution de la
locale du destinataire et l'URL "sécuriser mon compte" partagée par ces emails.

### Contenu des emails

- **Password changed** / **Email changed** / **Sessions revoked** : bloc "détail" (date/heure de
  l'action, adresse IP de la requête à l'origine de l'action — `"inconnue"` / `"unknown"` si
  absente) + bandeau d'alerte "Cette action ne vient pas de vous ?" avec bouton
  **Sécuriser mon compte** pointant vers `/account/security?action=report-suspicious`.
- **Account deletion requested** : bloc détail (date de suppression effective + **IP de la
  demande**, ajoutée par cette US) + bouton principal **Annuler la suppression** (lien de
  cancellation à usage unique, US02.2.4) — voir "Écarts vs ACs" ci-dessous pour la justification
  du choix de ne pas dupliquer un second lien "sécuriser mon compte" sur cet email précis.
- Chaque email a un sujet distinct identifiant le type d'action (`email.subject.password-changed`,
  `email.subject.email-changed`, `email.subject.account-deletion-confirm`,
  `email.subject.sessions-revoked`).
- Tous les emails sont envoyés en asynchrone (`@Async` sur les méthodes `EmailService`, mécanisme
  préexistant et inchangé) — la requête API qui a déclenché l'action sensible ne bloque jamais sur
  l'envoi.
- i18n FR (`messages.properties`) / EN (`messages_en.properties`) — parité de clés vérifiée.

### Cas particulier — révocation de sessions

- Révocation d'une seule session (bouton "Déconnecter cet appareil" côté UI) → notification avec
  `revokedCount = 1`.
- Révocation en masse (`DELETE /api/account/sessions`, bouton "Déconnecter tous les autres
  appareils") → **un seul appel** à `SecurityNotificationService.notifySessionsRevoked` avec le
  nombre total de sessions effectivement révoquées par cet appel.
- Si aucune session n'a été révoquée (ex. seule la session courante était active), l'appel est un
  no-op silencieux (`revokedCount <= 0` → aucun email, rien à signaler à l'utilisateur).

## Contrat technique final

### Nouvelle classe : `fr.pivot.auth.service.SecurityNotificationService`

```java
public class SecurityNotificationService {
    void notifyPasswordChanged(User user, Instant changedAt, String ip);
    void notifyEmailChanged(User user, String oldEmail, String newEmail, Instant changedAt, String ip);
    void notifyAccountDeletionRequested(User user, Instant effectiveAt, String cancelToken, String ip);
    void notifySessionsRevoked(User user, int revokedCount, Instant revokedAt, String ip);
}
```

Délègue à `EmailService` (préexistant) — n'introduit aucune nouvelle dépendance BDD ni
d'événement asynchrone au-delà de `@Async` déjà en place sur `EmailService`.

### `EmailService` — changements de signature

- `sendAccountDeletionConfirmationEmail(String to, String firstName, Instant effectiveAt, String cancelToken, Locale locale)`
  → ajout du paramètre `String ip` avant `locale`.
- Nouvelle méthode : `sendSessionsRevokedEmail(String to, String firstName, int revokedCount, Instant revokedAt, String ip, Locale locale)`.
- `sendPasswordChangedEmail` et `sendEmailChangedNotificationEmail` : le lien "Pas moi" (variable
  de template `secureAccountUrl`, précédemment `resetUrl`) pointe désormais vers
  `{appUrl}/account/security?action=report-suspicious` au lieu de `{appUrl}/auth/forgot-password`.

### Nouveau template

`src/main/resources/templates/email/sessions-revoked.html` — variables Thymeleaf : `firstName`,
`revokedCount`, `revokedAt`, `ip`, `secureAccountUrl`, `appUrl`, `supportEmail`.

### Nouvelles clés i18n (FR + EN, parité vérifiée)

`email.subject.sessions-revoked`, `email.sessions-revoked.page-title`, `.body`, `.label.count`,
`.label.date`, `.label.ip`, `.not-you.title`, `.not-you.body`, `.not-you.cta`,
`email.account-deletion-confirm.label.ip`.

### Contrôleurs — changements de signature interne (non exposés dans le contrat HTTP)

`SessionController.revokeSession` / `revokeAllExceptCurrent` résolvent désormais l'IP cliente via
`CookieHelper.clientIp(HttpServletRequest)` (déjà utilisé ailleurs dans le codebase, anti-spoofing
XFF géré par `RemoteIpValve`) et la transmettent à `SessionService`. Aucun changement de contrat
HTTP (endpoints, codes de statut, payloads inchangés).

### Aucune migration BDD

Design stateless — les notifications sont calculées et envoyées à partir des données déjà
disponibles au moment de l'action (pas de table de suivi des notifications envoyées).

## Écarts vs ACs initiaux

| AC initial | Écart | Justification |
|------------|-------|----------------|
| "Le lien 'Pas moi' redirige vers /account/security?action=report-suspicious" | Appliqué à 3 des 4 emails (password-changed, email-changed, sessions-revoked). L'email de suppression de compte garde son CTA principal existant "Annuler la suppression" (lien de cancellation à usage unique, US02.2.4) plutôt que d'ajouter un second lien concurrent. | Pour une suppression de compte, annuler la suppression **est** le remède "pas moi" le plus direct et le plus fort (il défait littéralement l'action) — un second lien générique vers la page sécurité aurait dupliqué le call-to-action et introduit une ambiguïté UX (lequel cliquer ?). L'IP a néanmoins été ajoutée à cet email pour satisfaire pleinement le contenu attendu par l'AC ("action, date/heure, IP"). |
| "Tests TU SecurityNotificationService (mock EmailService)" | `SecurityNotificationServiceTest` couvre les 4 méthodes + le garde-fou `revokedCount <= 0`, avec `EmailService` mocké — conforme à l'AC tel qu'écrit. | — |

Aucun autre écart — les 8 critères d'acceptation de l'US sont couverts sans autre déviation.

## Scores

- **Gate 2 (Coverage)** : tests unitaires ajoutés/mis à jour sur chaque flux touché (voir PR) ; 616
  tests unitaires exécutés hors TI Testcontainers (Docker indisponible dans l'environnement sandbox
  au moment de l'implémentation) — 0 échec, 0 erreur. `checkstyle:check` et `spotbugs:check` : 0
  violation.
- **Gate 4 (Merge confidence)** : **100/100** — voir [commentaire de revue sur la PR](https://github.com/PIVOT-PLATFORM/pivot-core/pull/154) pour le détail du breakdown (architecture 25/25, traçabilité AC 25/25, sécurité 25/25, qualité 25/25).

## Statut

Figé le 2026-07-06.
