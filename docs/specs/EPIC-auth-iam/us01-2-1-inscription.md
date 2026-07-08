# US01.2.1 — Inscription

## Contexte

- **US** : [`us-inscription.md`](pathname:///pivot-docs/backlog/EPIC-auth-iam/FEATURES/inscription-verification/us-inscription) · Parent `F01.2` · Module `auth` · Phase Socle · Sprint 1
- **PR** : `pivot-core` [#105](https://github.com/PIVOT-PLATFORM/pivot-core/pull/105) (`feat(auth): auth module MVP — E01`) + `pivot-ui` [#39](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/39) (`feat(ui): auth pages MVP — E01`)
- **Fusionnées le** : 2026-06-27
- **Gate 4 au figeage** : `pivot-core` 87/100 — `MERGE AUTONOME` · `pivot-ui` 86/100 — `MERGE AUTONOME`
- **Écart notable** : comme US01.2.3 (même lot), cette US n'a pas été livrée par une PR dédiée —
  elle fait partie du lot MVP ("auth module MVP — E01") qui livre l'ensemble du flux
  inscription/vérification/authentification en une seule PR par repo. Les scores Gate 4
  ci-dessus couvrent l'ensemble du lot, sans traçabilité AC par US dans les commentaires de
  revue. Ce document reconstruit cette traçabilité a posteriori à partir du code réellement
  livré (diff à la date de merge, pas l'état courant de `main`).

---

## Spec fonctionnelle

### Formulaire d'inscription (pivot-ui)

`RegisterComponent` (`src/app/features/auth/pages/register/`), route `/auth/register` :

- Champs réels : prénom et nom (`required` + `minLength(2)`, non prévus par l'AC initial mais
  livrés), email (`required` + `Validators.email`), **un seul** champ mot de passe — **pas de
  champ de confirmation du mot de passe** (voir "Écarts vs ACs").
- Validateur mot de passe custom (`strongPassword`) : 12 caractères minimum, une majuscule, un
  chiffre, un caractère spécial — plus strict que la contrainte serveur en vigueur à cette date
  (`@Size(min = 8, max = 128)`). Indicateur de force en temps réel (`passwordStrength()`, 5
  niveaux, libellés i18n).
- Bouton "afficher/masquer le mot de passe" avec `aria-label` i18n (`show_password`/
  `hide_password`).
- État de chargement : bouton de soumission désactivé (`[disabled]="loading()"`) + spinner
  (`<span class="spinner">`) pendant l'appel réseau — testé (`does not submit while loading`).
- Sur `200`/`202` ou `409` → même écran de succès générique : "Vérifiez votre boîte email pour
  confirmer votre inscription." Le corps du message ne mentionne plus l'adresse email saisie
  (RGPD — retiré par cette PR ; auparavant le texte interpolait `{{ email }}`).
- Sur `429` → message d'erreur avec délai formaté (`auth.register.error_rate_limit`, variable
  `{{ time }}` → `2m 5s` / `2m` / `45s` selon la magnitude de `retryAfterSeconds`).
- Sur `400` (échec de validation serveur `@Valid`) → message générique
  (`common.error_generic`), pas de faux succès.
- Focus visible sur tous les éléments interactifs via `:focus-visible` (SCSS), labels `<label>`
  associés à chaque champ, messages d'erreur inline (`.form-error`).

### Endpoint `POST /auth/register` (pivot-core)

`AuthController.register` → `RegistrationService.register` :

- Répond toujours `202 Accepted` avec le message générique "Vérifiez votre boîte email pour
  confirmer votre inscription.", que l'email soit neuf, déjà existant et vérifié, ou déjà
  existant et non vérifié — aucune différence observable côté réponse HTTP.
- Rate limiting : 5 tentatives/heure par IP (`registerIpBucket`), mécanisme préexistant à cette
  PR. Cette PR remplace le `ResponseStatusException(429)` d'origine par une nouvelle exception
  dédiée `RateLimitException`, traduite par le nouveau `GlobalExceptionHandler` en `429` + header
  `Retry-After` + corps `{"code": "RATE_LIMITED", "retryAfterSeconds": N}`.
- **Email neuf** : création du `User` (tenant SaaS par défaut, `email_verified = false`,
  `role = ROLE_USER`), mot de passe haché `BCryptPasswordEncoder(12)`, génération d'un token de
  vérification (256 bits `SecureRandom`, hash SHA-256 stocké — jamais le token brut), email de
  vérification envoyé (`sendVerificationEmail`), événement d'audit `REGISTER`.
- **Email déjà existant** : le hash BCrypt "leurre" (`passwordEncoder.encode`) est toujours
  exécuté pour égaliser le temps de réponse. **Changement de comportement introduit par cette
  PR** : un email n'est réellement renvoyé que si le compte existant n'est pas encore vérifié
  (`issueVerificationReminder`, nouveau template `verify-reminder.html`, distinct du template
  d'inscription initiale). Si le compte est déjà vérifié : **aucun email n'est envoyé**, alors
  que la réponse HTTP reste identique (voir "Écarts vs ACs").
- Validation des champs à la date du figeage : `@Email`, `@Size(min = 8, max = 128)` sur
  `password` (Bean Validation standard, `400` par défaut via Spring) — remplacée depuis par
  `@StrongPassword` (US01.2.4, PR core#120, postérieure et hors périmètre de ce document).

---

## Contrat technique

### Fichiers introduits / modifiés (extraits pertinents du lot MVP E01)

| Fichier | Rôle |
|---------|------|
| `pivot-core/src/main/java/fr/pivot/auth/controller/AuthController.java` | `POST /auth/register` |
| `pivot-core/src/main/java/fr/pivot/auth/service/RegistrationService.java` | `register()`, `issueVerificationToken()`, `issueVerificationReminder()` (nouveau) |
| `pivot-core/src/main/java/fr/pivot/auth/exception/RateLimitException.java` | nouvelle exception dédiée (remplace `ResponseStatusException(429)`) |
| `pivot-core/src/main/java/fr/pivot/auth/web/GlobalExceptionHandler.java` | nouveau — traduit `RateLimitException` en `429` + header `Retry-After` |
| `pivot-core/src/main/java/fr/pivot/auth/service/RateLimiterService.java` | `getRemainingSeconds(bucket)` (nouveau) |
| `pivot-core/src/main/java/fr/pivot/auth/service/EmailService.java` | `sendVerificationReminderEmail()` (nouveau) |
| `pivot-core/src/main/java/fr/pivot/auth/dto/RegisterRequest.java` | `email`, `password` (`@Size(min=8,max=128)` au figeage), `firstName`, `lastName` — pas de champ confirmation |
| `pivot-core/src/main/java/fr/pivot/auth/entity/User.java` | `email_verified` (boolean) — pas de colonne statut `PENDING`/`ACTIVE` dédiée |
| `pivot-core/src/main/resources/templates/email/verify-reminder.html` | nouveau template |
| `pivot-core/src/test/java/fr/pivot/auth/service/RegistrationServiceTest.java` | TU `register_*` (4 cas : rate limit, doublon neutre, happy path, tenant par défaut manquant) |
| `pivot-core/src/test/java/fr/pivot/auth/web/GlobalExceptionHandlerTest.java` | nouveau — TU `handleRateLimit_*` (2 cas) |
| `pivot-ui/src/app/features/auth/pages/register/register.component.ts` | formulaire, validateur `strongPassword`, `formatRetryAfter()` |
| `pivot-ui/src/app/features/auth/pages/register/register.component.html` | template, a11y (`aria-label`, `:focus-visible`) |
| `pivot-ui/src/app/features/auth/pages/register/register.component.spec.ts` | TU Vitest (~20 cas) |
| `pivot-ui/public/assets/i18n/{fr,en}.json` | clés `auth.register.*` (parité FR/EN vérifiée) |

### Endpoint

`POST /auth/register` — public, sans authentification. Payload
`{email, password, firstName?, lastName?, locale?}`.

Réponses : `202 Accepted` (toujours, message générique) · `429 Too Many Requests` (header
`Retry-After` + corps `{code, retryAfterSeconds}`) · `400 Bad Request` (échec Bean Validation).

### Anti-énumération

- Réponse HTTP strictement identique (`202` + même message) que l'email soit neuf, déjà existant
  vérifié, ou déjà existant non vérifié.
- Hash BCrypt "leurre" systématique sur le chemin doublon pour égaliser le temps de traitement.
- Effet de bord observable uniquement côté boîte email (jamais côté réponse API) : email neuf →
  email de vérification ; doublon non vérifié → email de rappel (template différent) ; doublon
  déjà vérifié → silence total, aucun email envoyé.

### Mot de passe

- Hash : `BCryptPasswordEncoder(12)` (`SecurityConfig`).
- Validation serveur au figeage : `@Size(min = 8, max = 128)` — remplacée depuis par
  `@StrongPassword` (US01.2.4, PR core#120, hors périmètre de ce document).
- Validation client : validateur custom `strongPassword` — 12 caractères minimum, majuscule,
  chiffre, caractère spécial — strictement plus stricte que la contrainte serveur de l'époque.

### État "compte en attente"

Pas de colonne statut explicite (`PENDING`/`ACTIVE`) : l'état "en attente de vérification" est
représenté uniquement par `User.emailVerified = false`.

---

## Écarts vs ACs initiaux

| AC initial | Écart | Justification / impact |
|------------|-------|-------------------------|
| "Formulaire : email, password, confirm password" | **Champ de confirmation du mot de passe absent** — le formulaire réel ne comporte que prénom, nom, email et un seul champ mot de passe. Aucune validation de correspondance mot de passe/confirmation n'existe, ni côté client ni côté serveur (le DTO backend n'a jamais eu de champ `confirmPassword`, y compris à la version précédant cette PR). | Précédemment coché ✅ dans le backlog sans preuve de code ni de test correspondant — repassé à 🟡 (voir mise à jour ci-dessous). Impact UX réel (pas de garde-fou contre une faute de frappe silencieuse en saisissant le mot de passe), mais pas un problème de sécurité : le hash est calculé sur le seul champ réellement soumis. |
| "Passwords non identiques → erreur de validation" | **Non implémenté** — conséquence directe de l'absence de champ de confirmation ci-dessus ; ce mécanisme n'existe nulle part dans le code. | Repassé à ⬜ (aucune preuve possible, la fonctionnalité n'existe pas). |
| "Inscription réussie → email de vérification envoyé, compte en état `PENDING`" | `PENDING` n'est pas un état explicite en base : représenté par `email_verified = false` (booléen simple), pas par une colonne/enum de statut dédiée. Comportement observable conforme (email envoyé, compte non pleinement actif tant que non vérifié), seule la représentation interne diffère du libellé de l'AC. | Coché ✅ ci-dessous. |
| "Email déjà utilisé → réponse générique 'Un email vous a été envoyé' (anti-énumération)" | La réponse HTTP est bien toujours générique — l'anti-énumération au sens strict (pas de 409, pas de fuite via la réponse) est respectée. Mais **un email n'est réellement envoyé que si le compte existant n'est pas encore vérifié** (changement introduit par cette PR — avant, un email "compte existant" partait systématiquement, cf. diff `sendAccountExistsEmail` → conditionnel `issueVerificationReminder`). Si le compte est déjà vérifié, l'utilisateur voit le message de succès mais ne reçoit aucun email. | Coché ✅ ci-dessous car l'intention première de l'AC (ne pas révéler l'existence du compte via la réponse API) est respectée ; la divergence comportementale sur l'envoi effectif de l'email est documentée ici pour éviter toute surprise côté support ("j'ai vu le message mais rien reçu par email" — attendu si le compte était déjà vérifié). |
| "Password trop court (< 8 chars) → erreur de validation" | Conforme à la date du figeage : `@Size(min = 8, max = 128)` côté serveur, validateur client plus strict (12 caractères + critères de complexité). Depuis dépassé par `@StrongPassword` (US01.2.4, PR core#120) — hors périmètre de ce document. | Coché ✅ ci-dessous. |
| "Rate limiting sur POST /api/auth/register (voir EN01.x)" | Conforme et testé (`register_throws429_whenRateLimited`) — mécanisme préexistant à cette PR (5 tentatives/heure/IP) ; cette PR améliore uniquement la forme de l'erreur (`RateLimitException` dédiée + header `Retry-After` + corps structuré, au lieu d'un simple `ResponseStatusException`). Précédemment marqué ⬜ dans le backlog sans revérification du code existant. | Coché ✅ ci-dessous (preuve de test directe : `RegistrationServiceTest.register_throws429_whenRateLimited`). |
| "Clés i18n dans l'espace `auth.register.*` (fr.json / en.json)" | Conforme — parité FR/EN vérifiée sur l'ensemble des clés utilisées (`title`, `subtitle`, champs, `password.*`, `strength.*`, `error_rate_limit`, `show_password`/`hide_password`, `success_*`, `terms_*`...). | Coché ✅ ci-dessous. |
| "État de chargement (bouton désactivé + spinner) pendant la requête POST /api/auth/register" | Conforme — `[disabled]="loading()"` + `<span class="spinner">` sur le bouton de soumission, testé explicitement (`does not submit while loading`). | Coché ✅ ci-dessous. |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.2.2 (vérification email) | Consomme le token émis par `issueVerificationToken` — même table `EmailVerification`, même hash SHA-256, même TTL configurable. |
| US01.2.3 (renvoi lien d'activation) | Chemin **distinct** de `issueVerificationReminder` (déclenché ici par une tentative de ré-inscription sur un email non vérifié, alors que US01.2.3 est déclenché par la page dédiée `/auth/resend-verification`) — les deux insèrent une nouvelle ligne `EmailVerification` sans invalider les tokens précédents ; template email différent (`verify-reminder.html` vs `verify-email.html`). |
| US01.2.4 (politique de robustesse du mot de passe) | Remplace la contrainte serveur `@Size(min=8)` de cette US par `@StrongPassword` (PR core#120, postérieure) — la contrainte client (12 caractères + critères) de cette US anticipait déjà une politique plus stricte que le serveur de l'époque. |
| US01.5.1 (email de confirmation d'action sensible) | Le bandeau "Cette action ne vient pas de vous ?" avec `secureAccountUrl` est introduit plus tard (PR core#154) — les templates de cette US (`verify-email`, `verify-reminder`) reçoivent uniquement l'ajout de la variable `supportEmail` dans ce lot, pas encore ce bandeau complet. |

## Hors périmètre (explicitement exclu)

- Champ de confirmation du mot de passe côté formulaire (jamais implémenté — voir "Écarts vs ACs").
- État de compte `PENDING` explicite en base (représenté par `emailVerified = false`).
- Politique de robustesse du mot de passe avancée côté serveur (`@StrongPassword`) — livrée par
  US01.2.4 (PR core#120).
- Renvoi automatique de l'email de vérification depuis le flux de connexion — périmètre de
  US01.2.3 (non livré à ce jour, voir son propre spec figée).

---

## Statut

Figé le 2026-07-08 (rétroactif — implémentation mergée le 2026-06-27).
