# US02.2.2 — Changer son adresse email

## Contexte

- **US** : `docs/backlog/EPIC-espace-compte/FEATURES/securite-compte/us-changer-email.md` (F02.2 — Sécurité du compte, EPIC-espace-compte E02)
- **PR backend** : `pivot-core` [#131](https://github.com/PIVOT-PLATFORM/pivot-core/pull/131) (`feat/us02-2-2-changer-email`) — Gate 4 = 97/100 (MERGE_DOCUMENTED), mergée
- **PR frontend** : `pivot-ui` [#73](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/73) (`feat/us02-2-2-changer-email`) — Gate 4 = 100/100 puis 94/100 (relecture indépendante), mergée
- **Dernier commit au moment du figeage** : `030973e` (pivot-core), `1e1ae77` / `28ac64f` (pivot-ui)
- **Gate 2 COVERAGE** : backend 16/16 TU (`EmailChangeServiceTest`) + 12 TI Testcontainers (`AccountEmailControllerIntegrationTest`), 84.1 % coverage new code (SonarCloud) · frontend 494/494 tests Vitest, 96.7 % coverage new code (SonarCloud)
- **Dépend de** : E01 Auth & IAM (tokens opaques, session) ; réutilise le mécanisme de vérification mot de passe de US02.2.1 (`AccountPasswordService`, PR pivot-core #128) par duplication de l'appel — #128 n'était pas encore mergée au moment de l'implémentation

---

## Spec fonctionnelle

### Backend (`pivot-core`)

- `POST /api/account/email` — authentifié (`Authorization: Bearer`), body `{ newEmail, currentPassword }`. Identité exclusivement dérivée du token porteur, jamais du body (`userId` injecté dans le JSON est sans effet, testé explicitement).
- `GET /api/account/email/confirm?token=...` — public (`permitAll` ciblé sur cette seule route), applique le changement.
- **Anti-énumération** : `POST` retourne **toujours 202 Accepted, corps vide**, que `newEmail` soit déjà pris ou non.
  - Adresse libre → `EmailChangeRequest` créé, token émis, email de confirmation envoyé à la nouvelle adresse.
  - Adresse déjà prise → **aucune ligne créée**, aucun token émis ; un email de notification est envoyé **exclusivement à l'adresse candidate** (jamais à l'ancienne adresse du demandeur, jamais exposé dans le corps HTTP).
- **Token** : `CryptoUtils.generateSecureToken()` (SecureRandom 256 bits) + `sha256()` — réutilise exactement le mécanisme déjà utilisé par `RegistrationService`/`PasswordService`. Brut jamais persisté ni loggé. TTL 24h configurable (`pivot.auth.email-change-ttl-hours`). Consommation atomique à usage unique (`markUsed`, vérification du row-count) : second clic → `410 Gone` (`EMAIL_CHANGE_TOKEN_ALREADY_USED`).
- `users.email` n'est modifié qu'à la confirmation réussie : une connexion avec la nouvelle adresse avant confirmation échoue naturellement en `401` (aucune ligne `users` ne porte encore cette adresse — pas de branche spéciale dédiée).
- Une nouvelle demande annule (`cancelled_at`) toute demande encore pendante pour l'utilisateur.
- Edge case ajouté au-delà du texte strict de l'AC : re-vérification d'unicité de l'adresse **au moment de la confirmation** — si l'adresse a été prise par un tiers entre la demande et le clic, `409 Conflict` (`EMAIL_CHANGE_TARGET_TAKEN`), le token est tout de même consommé (pas de réessai sur le même lien). Un correctif de convergence Gate 4 (`saveAndFlush` + catch `DataIntegrityViolationException`) a fermé une fenêtre TOCTOU entre le pré-check et l'écriture, pour garantir un 409 propre même en cas de course entre deux confirmations concurrentes vers la même cible.
- Rate limiting : `RateLimiterService` étendu de deux buckets (`emailChangeUserBucket` : 3 req/h/`userId` sur `POST` → 429 ; `emailChangeConfirmIpBucket` : 30/h par IP sur `GET /confirm`, anti-brute-force générique non explicitement dans l'AC).
- Pas de révocation de session au changement d'email confirmé (contrairement au changement de mot de passe, US02.2.1) — décision assumée : les tokens opaques sont liés à `userId`, pas à l'email.

### Frontend (`pivot-ui`)

- `EmailChangeService` (thin HTTP boundary, idiome `ProfileService`) — jamais de `userId` dans le body.
- `ChangeEmailComponent` (`account/security/change-email/`) — formulaire nouvelle adresse + mot de passe actuel, `autocomplete="email"`/`autocomplete="current-password"`, erreur 401 inline `role="alert"`/`aria-describedby`. Au `202`, bascule systématique et unique vers un état "Email envoyé" persistant (pas un toast) quelle que soit l'issue réelle côté serveur (adresse libre ou doublon anti-énumération) — aucune branche de code frontend ne peut révéler la différence (testé explicitement).
- `EmailConfirmComponent` (`account/security/email-confirm/`), route publique `/account/email/confirm?token=...` déclarée **avant** la route shell `canMatch: [authMatchGuard]` (régression testée) : fonctionne avec ou sans session active. 7 états gérés : `loading`, `success`, `invalid`, `expired`, `already_used`, `target_taken`, `rate_limited`, `error`. CTA "Refaire la demande" sur les 4 échecs récupérables ; absent sur `rate_limited` (relance immédiate = même 429). Spinner `aria-hidden="true"` (purement décoratif, le `<output>` compagnon porte l'annonce).
- i18n complet sous `account.security.email.*` (fr.json/en.json).
- Lien "Sécurité" du menu utilisateur (`navbar.component.ts`) **non activé** dans cette PR — dépend de pivot-ui PR #70 (`change-password`), non mergée au moment de cette livraison. La page `/account/security/email` est fonctionnelle mais accessible uniquement par navigation directe.

---

## Contrat technique

### Backend — fichiers introduits / modifiés (`pivot-core` PR #131)

| Fichier | Rôle |
|---------|------|
| `auth/controller/AccountEmailController.java` | `POST /account/email`, `GET /account/email/confirm` |
| `auth/dto/ChangeEmailRequest.java` | DTO entrée (record) — aucun champ `userId`/`accountId` |
| `auth/entity/EmailChangeRequest.java` | Entité JPA — `tokenHash`, `expiresAt`, `usedAt`, `cancelledAt` |
| `auth/exception/EmailChangeTargetTakenException.java`, `EmailChangeTokenException.java` | Exceptions typées → mapping HTTP dédié |
| `auth/repository/EmailChangeRequestRepository.java` | Spring Data JPA, `markUsed` atomique, `cancelPendingForUser` |
| `auth/service/EmailChangeService.java` | Logique métier, `@Transactional` |
| `auth/service/EmailService.java` (modifié) | 3 templates Thymeleaf (`email-change-confirm`, `email-change-duplicate`, `email-changed`) |
| `auth/service/RateLimiterService.java` (modifié) | Buckets `emailChangeUserBucket`, `emailChangeConfirmIpBucket` |
| `auth/web/GlobalExceptionHandler.java` (modifié) | Mapping 400/409/410/429 |
| `config/SecurityConfig.java` (modifié) | `permitAll` ciblé sur `GET /account/email/confirm` uniquement |
| `resources/db/migration/V4__email_change_requests.sql` | Nouvelle table, FK `ON DELETE CASCADE`, index |

### Frontend — fichiers introduits / modifiés (`pivot-ui` PR #73)

| Fichier | Rôle |
|---------|------|
| `features/account/security/change-email/email-change.model.ts`, `email-change.service.ts` | Modèle + service HTTP |
| `features/account/security/change-email/change-email.component.*` | Formulaire de demande |
| `features/account/security/email-confirm/email-confirm.component.*` | Page de confirmation publique, 7 états |
| `app.routes.ts` (modifié) | `account/security/email` (authentifié) + `account/email/confirm` (public, avant la route shell) |
| `public/assets/i18n/{fr,en}.json` (modifiés) | Clés `account.security.email.*` |

### Endpoints / contrat HTTP

| Endpoint | Code | Condition | Corps |
|----------|------|-----------|-------|
| `POST /api/account/email` | `202` | Toujours, sauf 401/429/400 — y compris doublon (anti-énumération) | vide |
| | `401` | Mot de passe actuel incorrect, ou compte OAuth-only sans mot de passe | vide |
| | `400` | Validation Jakarta (`newEmail`/`currentPassword`) | erreur de validation standard Spring |
| | `429` | > 3 req/h/`userId` | `{"code":"RATE_LIMITED","retryAfterSeconds":N}` + `Retry-After` |
| `GET /api/account/email/confirm?token=...` | `200` | Confirmation réussie | vide |
| | `400` | Token inconnu / expiré | `{"code":"EMAIL_CHANGE_TOKEN_INVALID"}` / `{"code":"EMAIL_CHANGE_TOKEN_EXPIRED"}` |
| | `410` | Token déjà utilisé ou annulé par une demande plus récente | `{"code":"EMAIL_CHANGE_TOKEN_ALREADY_USED"}` |
| | `409` | Adresse prise par un tiers entre la demande et le clic | `{"code":"EMAIL_CHANGE_TARGET_TAKEN"}` |
| | `429` | Rate limit IP (30/h) | `{"code":"RATE_LIMITED","retryAfterSeconds":N}` |

---

## Écarts vs AC initiaux (divergences notables)

- **Tension AC "409 si doublon" vs AC "toujours 202 Accepted" — non résolue formellement par le PO Agent.** Le texte de l'US contient les deux exigences dans des lignes séparées. Le développeur a tranché unilatéralement : `POST /api/account/email` retourne toujours `202` (anti-énumération), le `409 EMAIL_CHANGE_TARGET_TAKEN` n'existe que sur `GET /confirm` en cas de course tardive (adresse prise entre la demande et le clic). Ce choix est cohérent avec `RegistrationService` et RGPD art. 5.1.c (minimisation/anti-énumération), testé explicitement des deux côtés, mais reste — de l'aveu du Gate 4 backend (2ᵉ passage, score plafonné à 97/100 pour cette raison) — une **interprétation d'AC ambigu non actée par le PO Agent**, ce qui contrevient formellement à la règle « AC ambigu → stopper, PO Agent clarifie ». Point à faire valider a posteriori : confirmer que le tableau AC de l'US ci-dessus doit être lu comme "409 réservé au `GET /confirm`", ou reformuler l'AC.
- **Bug TOCTOU trouvé et corrigé en cours de review** (pas une divergence de plan, mais un fix réel sur le comportement livré) : la première version de `confirmEmailChange` pouvait renvoyer un `500` générique au lieu du `409` documenté en cas de double confirmation concurrente vers la même adresse cible. Corrigé par `saveAndFlush` + catch `DataIntegrityViolationException` (commit `030973e`) avant merge.
- **Pas d'égalisation du coût CPU** entre branche doublon et branche normale sur `POST /api/account/email` (contrairement à `RegistrationService`) : analysé en Gate 4 et jugé non exploitable en pratique (BCrypt déjà exécuté avant la bifurcation, écart résiduel = une insertion SQL ; endpoint authentifié et rate-limité à 3/h). Risque résiduel accepté sans correctif de code.
- **Dépendance non mergée réutilisée par duplication** : la vérification du mot de passe actuel réutilise l'appel de `AccountPasswordService` (US02.2.1, PR pivot-core #128) directement plutôt que par dépendance de classe, car #128 n'était pas encore mergée — à surveiller pour ne pas diverger une fois #128 intégrée.
- **Lien "Sécurité" du menu non activé** côté frontend — dépend de pivot-ui PR #70 (`change-password`), hors scope de cette US. Navigation à `/account/security/email` possible uniquement par URL directe tant que #70 n'est pas mergée.
- **Spec Playwright E2E différée** (environnement indisponible), politique explicitement autorisée par le `CLAUDE.md` de `pivot-ui`.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US02.2.1 (Changer son mot de passe) | Réutilise le pattern de vérification `PasswordEncoder#matches` et l'idiome `ChangePasswordComponent` côté UI ; à la différence de US02.2.1, pas de révocation de session au changement d'email |
| US01.2.2 (Vérification e-mail à l'inscription) | Réutilise le même mécanisme de token (`CryptoUtils`, `RegistrationService`) et la même stratégie anti-énumération sur doublon d'adresse |
| US01.3.2 (Reset password) | Réutilise le pattern de consommation atomique de token à usage unique (`PasswordResetTokenRepository#markUsed`) |

## Hors périmètre (explicitement exclu)

- Activation du lien "Sécurité" dans le menu utilisateur (pivot-ui PR #70, US02.2.1)
- Révocation de session au changement d'email confirmé (comportement intentionnellement différent du changement de mot de passe)
- Égalisation du coût CPU entre branche doublon et branche normale sur `POST /api/account/email` (risque résiduel accepté)
- Spec Playwright E2E (différée, environnement indisponible au moment de la livraison)
- Clarification formelle PO Agent de la tension AC "409 doublon" vs "202 toujours" (signalée, non tranchée par le PO Agent à ce stade)
