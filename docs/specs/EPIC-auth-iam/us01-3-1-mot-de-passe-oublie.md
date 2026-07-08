# US01.3.1 — Mot de passe oublié (demande)

## Contexte

- **US** : [`us-mot-de-passe-oublie.md`](pathname:///pivot-docs/backlog/EPIC-auth-iam/FEATURES/reset-password/us-mot-de-passe-oublie) · Parent `F01.3` · Module `auth` · Phase Socle · Sprint 1
- **PR de référence (lot MVP, Gate 4 formel)** : `pivot-core` [#105](https://github.com/PIVOT-PLATFORM/pivot-core/pull/105) (`feat(auth): auth module MVP — E01`) + `pivot-ui` [#39](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/39) (`feat(ui): auth pages MVP — E01`)
- **Fusionnées le** : 2026-06-27 (`#105` à 21:21:51Z, `#39` à 21:21:47Z)
- **Gate 4 au figeage** : `pivot-core` 87/100 — `MERGE AUTONOME` · `pivot-ui` 86/100 — `MERGE AUTONOME`
- **Écart notable — traçabilité PR** : contrairement à ce que les hints laissaient supposer, `#105`/`#39`
  ne sont **pas** les PR qui ont introduit la page `/auth/forgot-password` ni l'endpoint
  `POST /auth/forgot-password` — ceux-ci existent depuis les PR initiales du module auth,
  `pivot-core` [#67](https://github.com/PIVOT-PLATFORM/pivot-core/pull/67) (`Feature/auth`, mergée
  2026-06-24, sans revue Gate 4 formelle — process ACDD pas encore en place) et `pivot-ui`
  [#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11) (`Feature/auth`, mergée 2026-06-27
  13:52:00Z, ~7h30 avant `#39`). `#105`/`#39` ne font que **modifier** ce flux déjà existant (voir
  "Évolution TTL" ci-dessous) et sont retenues comme référence de figeage uniquement parce que ce
  sont elles qui portent la revue Gate 4 documentée (même convention que les specs sœurs
  `us01-2-1`, `us01-2-3` de ce même lot).
- **Dépend de** : rien (racine du flux F01.3) — `US01.3.2` (réinitialisation avec le token) est en
  aval, périmètre distinct (voir "Hors périmètre").

---

## Spec fonctionnelle

### Page `/auth/forgot-password` (pivot-ui)

`ForgotPasswordComponent` (`src/app/features/auth/pages/forgot-password/`), route enregistrée dans
`auth.routes.ts` sous `guestGuard` (redirige un utilisateur déjà connecté) :

- Formulaire à un seul champ `email` (`required` + `Validators.email`).
- Soumission → `AuthService.forgotPassword(email)` → `POST /auth/forgot-password`.
- État de chargement : bouton de soumission désactivé (`[disabled]="loading()"`) + `<span
  class="spinner">` pendant l'appel réseau — testé (`sets loading during submit`, `does not submit
  while loading`). Le spinner n'a en revanche **pas d'`aria-label`** (relevé comme finding LOW par
  la revue Gate 4 de `#39`, non corrigé à ce jour).
- Sur succès **ou erreur HTTP** (y compris `404`), le composant affiche systématiquement le même
  écran `sent()` — testé explicitement (`sets sent=true even on error (RGPD — ne révèle pas si
  email existant)`) : aucune différenciation visible côté client entre email connu et inconnu.
- Écran `sent()` : icône enveloppe (SVG depuis `#39`, remplace un emoji `✉️` — changement
  cosmétique sans impact fonctionnel), titre + texte de confirmation, lien retour connexion.
- **Aucun `role="status"` ni `role="alert"`** n'est présent sur l'écran de résultat ni sur le bloc
  d'erreur (`<div class="alert alert-error">{{ error() | transloco }}</div>`) — l'AC visant une
  annonce du résultat aux lecteurs d'écran via `role="status"` n'est pas implémentée.

### Endpoint `POST /auth/forgot-password` (pivot-core)

`AuthController.forgotPassword` → `PasswordService.forgotPassword` :

- Répond toujours `202 Accepted` avec un message générique
  ("Si cet email est enregistré, vous recevrez un lien de réinitialisation."), quel que soit l'état
  réel de l'email (inconnu, connu non vérifié, connu inactif, connu et actif) — aucune branche ne
  renvoie de statut différent.
- Rate limiting : `rateLimiter.checkAndRecord(forgotPasswordBucket(ip), 5, 1h)` — **par IP**, 5
  tentatives/heure. Si la limite est atteinte, la méthode retourne silencieusement (`return;`) sans
  lever d'exception ni changer la réponse HTTP — cohérent avec l'anti-énumération (un attaquant ne
  peut pas distinguer "rate limité" de "email inconnu" depuis la réponse).
- **Email connu, vérifié et actif** : génération d'un token brut (`CryptoUtils.generateSecureToken()`,
  256 bits), hash SHA-256 stocké en base (`PasswordResetToken.tokenHash`, colonne `unique`, jamais
  le token brut), `expiresAt = now + TTL` où le TTL est lu depuis `FeatureFlagRepository.getInt(
  "PASSWORD_RESET_TTL_MINUTES", 15)` (voir "Évolution TTL"), email envoyé
  (`EmailService.sendPasswordResetEmail`), événement d'audit `PASSWORD_RESET_REQUEST`.
- **Email inconnu, non vérifié ou inactif** : aucune ligne créée, aucun email envoyé, retour
  silencieux — comportement identique à la réponse HTTP.

### Évolution du TTL — écart avec l'AC initial

L'AC du backlog précise deux fois "TTL 1h". Ce chiffre était exact **au moment de la PR
d'implémentation initiale** (`core#67`, 2026-06-24) : TTL codé en dur via
`@Value("${pivot.auth.password-reset-ttl-minutes:60}")` (défaut 60 min), et le template email
affichait littéralement "Ce lien expire dans 60 minutes.".

La PR de référence de ce document (`core#105`, 2026-06-27) a **changé ce comportement** : le TTL
est désormais lu depuis un feature flag admin-configurable (`PASSWORD_RESET_TTL_MINUTES`,
`FeatureFlagRepository.getInt`), et la valeur seedée en base par la migration `V1__schema_init.sql`
est **15 minutes**, pas 60. Le template `reset-password.html` a été mis à jour en conséquence
("Ce lien expire dans 15 minutes."). Au moment du figeage de cette US (`#105`/`#39`), le TTL
observable en production est donc **15 minutes, pas 1 heure** — l'AC "TTL 1h" est obsolète au
moment où l'US passe `Stage: Done`. Le flag reste modifiable par un futur admin sans redéploiement.

### Rate limiting — écart avec l'AC initial

L'AC spécifie "au plus 3 demandes par heure **par adresse email**". L'implémentation réelle limite
à **5 demandes par heure par adresse IP** (`forgotPasswordBucket(ip)`, pas de bucket par email).
Aucun test ne couvre le seuil "3/h/email" car ce mécanisme n'existe pas — le test
`forgotPassword_isSilent_whenRateLimited` couvre uniquement le comportement silencieux une fois la
limite (IP) atteinte, pas la valeur du seuil ni sa dimension.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle | PR |
|---------|------|----|
| `pivot-core/src/main/java/fr/pivot/auth/controller/AuthController.java` | `POST /auth/forgot-password` (`@ResponseStatus(ACCEPTED)`) | `#67` (création) |
| `pivot-core/src/main/java/fr/pivot/auth/service/PasswordService.java` | `forgotPassword()` — anti-énumération, génération token, TTL, email | `#67` (création) · `#105` (TTL via feature flag) |
| `pivot-core/src/main/java/fr/pivot/auth/dto/ForgotPasswordRequest.java` | DTO `{email}` (`@NotBlank @Email`) | `#67` |
| `pivot-core/src/main/java/fr/pivot/auth/entity/PasswordResetToken.java` | Entité `password_reset_tokens` (`tokenHash` unique, `expiresAt`, `usedAt`) | `#67` |
| `pivot-core/src/main/java/fr/pivot/auth/repository/PasswordResetTokenRepository.java` | `findByTokenHashAndUsedAtIsNull`, `deleteExpired` | `#67` |
| `pivot-core/src/main/java/fr/pivot/auth/repository/FeatureFlagRepository.java` | `getInt("PASSWORD_RESET_TTL_MINUTES", 15)` | `#105` |
| `pivot-core/src/main/java/fr/pivot/auth/service/RateLimiterService.java` | `forgotPasswordBucket(ip)` (bucket `forgot:ip:{ip}`) | `#67` |
| `pivot-core/src/main/java/fr/pivot/auth/service/EmailService.java` | `sendPasswordResetEmail(to, firstName, token)` | `#67` |
| `pivot-core/src/main/resources/templates/email/reset-password.html` | Template email, lien `{{appUrl}}/auth/reset-password?token=...`, mention TTL | `#67` (60 min) · `#105` (15 min) |
| `pivot-core/src/main/resources/db/migration/V1__schema_init.sql` | Table `password_reset_tokens` + seed `feature_flags.PASSWORD_RESET_TTL_MINUTES = 15` | `#105` (consolidation V1) |
| `pivot-core/src/test/java/fr/pivot/auth/service/PasswordServiceTest.java` | TU `forgotPassword_*` (5 cas : rate limit, email inconnu, non vérifié, happy path, tenant manquant) | `#67`/`#105` |
| `pivot-ui/src/app/features/auth/pages/forgot-password/forgot-password.component.ts` | Formulaire, état `loading`/`sent`/`error` | `#67`… non — `#11` (création) · `#39` (icône SVG) |
| `pivot-ui/src/app/features/auth/pages/forgot-password/forgot-password.component.spec.ts` | TU Vitest (6 cas, dont anti-énumération explicite) | `#11` |
| `pivot-ui/src/app/core/auth/service/auth.service.ts` | `forgotPassword(email)` → `POST /auth/forgot-password` | `#11` |
| `pivot-ui/src/app/features/auth/auth.routes.ts` | Route `forgot-password` sous `guestGuard`, lazy-loaded | `#11` |
| `pivot-ui/public/assets/i18n/{fr,en}.json` | Clés `auth.forgot_password.*` (parité FR/EN vérifiée) | `#11` |
| `e2e/auth/forgot-password.spec.ts` | Spec Playwright E2E | `#11` (création) · `#39` (étoffée) |

### Endpoint

`POST /auth/forgot-password` — public, sans authentification. Payload `{email}`.

Réponse : `202 Accepted` (toujours, message générique) — pas de `400`/`404`/`409` distinctif. Rate
limit dépassé → toujours `202` identique (silence côté service, pas d'exception).

`GET /auth/check-reset-token?token=...` existe également (`#105`) mais appartient au périmètre
`US01.3.2` (vérification du token avant affichage du formulaire de nouveau mot de passe) — hors
scope fonctionnel de cette US, mentionné ici uniquement car livré par la même PR de référence.

### Anti-énumération

- Réponse HTTP strictement identique (`202` + même message) que l'email soit inconnu, connu non
  vérifié, connu inactif ou connu et éligible.
- Rate limit atteint → retour silencieux, même réponse `202` (pas de `429` observable sur cet
  endpoint, contrairement à `register`/`reset-password` qui lèvent `RateLimitException`).
- Côté frontend, `sent()` est positionné à `true` aussi bien sur succès HTTP que sur erreur
  (`404` testé explicitement) — double couche anti-énumération, testée aux deux niveaux.

### Token

- Génération : `CryptoUtils.generateSecureToken()` — 256 bits, `SecureRandom`.
- Stockage : hash SHA-256 uniquement (`PasswordResetToken.tokenHash`, colonne `unique(64)`) —
  jamais le token brut en base.
- TTL : `PASSWORD_RESET_TTL_MINUTES` (feature flag, défaut code `15`, valeur seedée `15`) — **15
  minutes en pratique au figeage**, pas 1h (voir "Évolution du TTL").

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.3.2 (réinitialisation — nouveau mot de passe) | Consomme le token émis ici via `POST /auth/reset-password` (`findByTokenHashAndUsedAtIsNull` + `markUsed` atomique, `#105`) et `GET /auth/check-reset-token` (`#105`) ; périmètre entièrement distinct de cette US, spec propre non couverte par ce document. |
| US01.2.1 (inscription) | Même mécanique anti-énumération (réponse HTTP générique, hash BCrypt/SHA-256 selon le cas) et même pattern de rate limiting par IP introduit dans le même lot de PR. |

## Hors périmètre (explicitement exclu)

- Consommation du token et changement effectif du mot de passe — `US01.3.2` (`POST
  /auth/reset-password`, `GET /auth/check-reset-token`).
- Email de notification "mot de passe modifié" (`sendPasswordChangedEmail`, template
  `password-changed.html`) — déclenché par le flux `US01.3.2`, pas par la demande elle-même.
- Rate limiting par adresse email (3/h) tel que littéralement décrit par l'AC — non implémenté ;
  seul un rate limiting par IP (5/h) existe (voir "Rate limiting — écart avec l'AC initial").
- Annonce accessible du résultat via `role="status"`/`role="alert"` — non implémentée sur l'écran
  de confirmation ni sur le bloc d'erreur.

---

## Mise à jour du backlog (Gate 5)

| AC | Statut retenu | Justification |
|----|----------------|----------------|
| Page `/auth/forgot-password` avec champ email | ✅ | Route + composant confirmés (`auth.routes.ts`, `guestGuard`), formulaire testé. |
| Email connu → token reset généré (TTL 1h), email envoyé avec lien | 🟡 | Mécanisme conforme et testé, **mais TTL réel = 15 min au figeage**, pas 1h (voir "Évolution du TTL"). |
| Email inconnu → réponse générique anti-énumération | ✅ | Confirmé côté backend (réponse HTTP identique) et côté frontend (test explicite `sets sent=true even on error`). |
| Token SHA-256 stocké en BDD, TTL 1h | 🟡 | Hash SHA-256 confirmé (`CryptoUtils.sha256`, colonne unique) ; **TTL réel = 15 min**, pas 1h. |
| Rate limiting — au plus 3 demandes/heure par email | ⬜ | Implémenté différemment : 5/heure **par IP**, pas par email — l'AC tel que rédigé n'est pas couvert. |
| Clés i18n `auth.forgotPassword.*` | ✅ | Clés présentes et utilisées, parité FR/EN vérifiée — sous l'espace `auth.forgot_password.*` (snake_case, convention réelle du projet) plutôt que `auth.forgotPassword.*` (camelCase) tel que littéralement nommé par l'AC. |
| État de chargement (bouton désactivé + spinner) + résultat via `role="status"` | 🟡 | Bouton désactivé + spinner implémentés et testés ; **`role="status"` absent** sur l'écran de résultat comme sur le bloc d'erreur — spinner lui-même sans `aria-label` (finding LOW Gate 4 `#39`, non corrigé). |

---

## Statut

Figé le 2026-07-08 (rétroactif — implémentation mergée le 2026-06-27, avec code d'origine remontant
au 2026-06-24 pour `pivot-core` et au 2026-06-27 13:52 pour `pivot-ui`).
