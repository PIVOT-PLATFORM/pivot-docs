# US01.2.2 — Vérification email

## Contexte

- **US** : [`us-verification-email.md`](pathname:///pivot-docs/backlog/EPIC-auth-iam/FEATURES/inscription-verification/us-verification-email) · Parent `F01.2` · Module `auth` · Phase Socle · Sprint 1
- **PR** : `pivot-core` [#105](https://github.com/PIVOT-PLATFORM/pivot-core/pull/105) (`feat(auth): auth module MVP — E01`) + `pivot-ui` [#39](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/39) (`feat(ui): auth pages MVP — E01`)
- **Fusionnées le** : 2026-06-27
- **Gate 4 au figeage** : `pivot-core` 87/100 — `MERGE AUTONOME` · `pivot-ui` 86/100 — `MERGE AUTONOME`
- **Écart notable** : cette US n'a pas été livrée par une PR dédiée — elle fait partie du même lot
  MVP ("auth module MVP — E01") que US01.2.1 et US01.2.3, qui livre l'ensemble du flux
  inscription/vérification/connexion en une seule PR par repo. Le code d'endpoint et de service
  `verifyEmail` lui-même n'apparaît même pas dans le diff de la PR #105 (il préexistait sur la
  branche `feat/e01-auth-module` avant cette PR de consolidation) — seule la page frontend a été
  retravaillée dans cette PR ("Fix CSS verify-email : carte blanche + bouton primaire bleu"). Les
  scores et findings Gate 4 ci-dessus couvrent l'ensemble du lot, pas spécifiquement cette US.
  Ce document reconstruit la traçabilité AC a posteriori à partir du code réellement livré sur
  `main`.

---

## Spec fonctionnelle

### Endpoint `POST /auth/verify-email` (pivot-core)

`AuthController.verifyEmail` → `RegistrationService.verifyEmail` :

- Reçoit le token brut en query param (`?token=xxx`), **pas** en `GET` comme décrit dans l'AC
  initial — voir "Écarts vs ACs" ci-dessous.
- Rate limiting : 20 tentatives/heure par IP (`verifyEmailBucket`) → `429` au-delà.
- Hash SHA-256 du token brut, recherche `findByTokenHashAndUsedAtIsNull` — un token déjà consommé
  se comporte exactement comme un token inconnu (même exception, même code 400).
- Token trouvé mais `expiresAt` dépassé → `400` avec message `"Token expiré"`.
- Token trouvé et valide → marque `usedAt = now()` sur la ligne `EmailVerification` (la ligne
  **n'est pas supprimée** — voir "Écarts vs ACs"), positionne `user.emailVerified = true`, envoie
  l'email de bienvenue (`sendWelcomeEmail`), journalise `EMAIL_VERIFIED` en audit.
- Aucune distinction de code/message observable entre "token inconnu" et "token expiré" au niveau
  HTTP autre que le message texte (`"Token invalide"` vs `"Token expiré"`) — le frontend n'exploite
  pas cette distinction (voir page ci-dessous).

### Page `/auth/verify-email` (pivot-ui)

`VerifyEmailComponent` (`src/app/features/auth/pages/verify-email/`), route publique (pas de
`guestGuard`, accessible même connecté) :

- Lit `token` depuis les query params au chargement (`ngOnInit`). Absence de token → état `error`
  immédiat, **aucun appel réseau** (testé explicitement).
- Token présent → état `loading` (spinner + libellé i18n), puis appel
  `POST /auth/verify-email?token=...` via `AuthService.verifyEmail`.
- Réponse HTTP 2xx → état `success` : icône, titre "Email confirmé !", texte, bouton **Se
  connecter** vers `/auth/login`.
- Toute erreur HTTP (400, 429, réseau...) → un seul état générique `error` : icône, titre "Lien
  invalide", texte "Ce lien est expiré ou a déjà été utilisé. Demandez un nouveau lien depuis la
  page de connexion.", bouton **Retour à la connexion** vers `/auth/login`. Aucune distinction
  entre token expiré, déjà utilisé, ou inconnu — voir "Écarts vs ACs".
- Aucun `role="status"`/`role="alert"` sur les blocs `success`/`error` ni sur le spinner (seul un
  `aria-label` est présent sur le spinner) — non livré, cohérent avec le `⬜` déjà présent sur
  cette ligne dans le backlog.

---

## Contrat technique

### Fichiers pertinents (extraits du lot MVP E01)

| Fichier | Rôle |
|---------|------|
| `pivot-core/src/main/java/fr/pivot/auth/controller/AuthController.java` | `POST /auth/verify-email` (préexistant, non modifié par la PR #105) |
| `pivot-core/src/main/java/fr/pivot/auth/service/RegistrationService.java` | `verifyEmail()` (préexistant, non modifié par la PR #105) |
| `pivot-core/src/main/java/fr/pivot/auth/entity/EmailVerification.java` | Entité token (`tokenHash`, `expiresAt`, `usedAt`) |
| `pivot-core/src/main/java/fr/pivot/auth/entity/User.java` | Champ `emailVerified` (boolean) — distinct du champ `active` (non touché par cette US) |
| `pivot-core/src/main/resources/templates/email/verify-email.html` | Template email initial (modifié dans PR #105) |
| `pivot-core/src/test/java/fr/pivot/auth/service/RegistrationServiceTest.java` | TU `verifyEmail_*` (429, 400 invalide, 400 expiré, happy path) |
| `pivot-core/src/test/java/fr/pivot/auth/controller/AuthControllerTest.java` | TU `verifyEmail_returnsOk` |
| `pivot-ui/src/app/features/auth/pages/verify-email/verify-email.component.ts` | Page résultat (retravaillée dans PR #39 — fix CSS) |
| `pivot-ui/src/app/features/auth/pages/verify-email/verify-email.component.spec.ts` | TU Vitest (4 cas : sans token, loading, succès, erreur) |
| `pivot-ui/src/app/core/auth/service/auth.service.ts` | `verifyEmail(token)` → `POST /auth/verify-email` |
| `pivot-ui/src/app/features/auth/auth.routes.ts` | Route publique `verify-email` (pas de `guestGuard`) |
| `pivot-ui/public/assets/i18n/{fr,en}.json` | Clés `auth.verify_email.*` |

### Endpoint

`POST /auth/verify-email?token={token}` — public, sans authentification.

Réponses : `200 OK` (`{"message": "Email vérifié avec succès."}`) · `400 Bad Request` (token
invalide ou expiré, message texte différent mais même code) · `429 Too Many Requests` (rate limit,
20/heure/IP).

### Modèle de compte

Pas de statut de compte unique (`PENDING`/`ACTIVE`) au niveau entité : `User` porte deux booléens
indépendants, `emailVerified` (mis à `true` par cette US) et `active` (non touché ici, utilisé
ailleurs pour la suspension/suppression de compte). `SessionService.login` refuse la connexion
(`403 Forbidden`, `"Email non vérifié"`) tant que `emailVerified = false`.

### Token de vérification

- Génération : `CryptoUtils.generateSecureToken()` (256 bits `SecureRandom`), identique au token
  d'inscription initiale et de renvoi (US01.2.1/US01.2.3, même table `EmailVerification`).
- Stockage : `EmailVerification.tokenHash = CryptoUtils.sha256(rawToken)` — le token brut n'est
  jamais persisté.
- Consommation : `usedAt = Instant.now()` posé sur la ligne existante — **la ligne n'est pas
  supprimée** de la table. `findByTokenHashAndUsedAtIsNull` garantit qu'un token consommé ne peut
  pas être réutilisé, mais l'AC "supprimé après utilisation" n'est pas réalisée littéralement (voir
  "Écarts vs ACs").
- TTL : `verificationTtlHours` (config `pivot.auth.verification-ttl-hours`, défaut 24h).

### i18n

Clés sous `auth.verify_email.*` (`fr.json` / `en.json`, parité vérifiée) : `loading`,
`success_title`, `success_body`, `success_cta`, `error_title`, `error_body`, `error_cta` —
namespace réel `auth.verify_email` (snake_case), pas `auth.verifyEmail` (camelCase) comme nommé
dans l'AC initial.

---

## Écarts vs ACs initiaux

| AC initial | Écart | Justification / impact |
|------------|-------|-------------------------|
| `GET /api/auth/verify?token=xxx` → compte passé à `ACTIVE` | Endpoint réel : `POST /auth/verify-email?token=xxx`. Pas de statut `ACTIVE` : le champ réellement modifié est `User.emailVerified` (boolean), distinct de `User.active`. | Le `POST` (plutôt qu'un `GET` navigable directement) s'explique par le fait que la page Angular `/auth/verify-email` intercepte le lien de l'email et déclenche l'appel API en XHR — cohérent avec le reste du flux SPA (register, resend, reset-password sont aussi tous en `POST`). Aucun impact fonctionnel observable pour l'utilisateur final ; impact réel uniquement si un consommateur externe s'attendait à un `GET` idempotent. Comportement métier (compte activable après clic) livré et testé — coché ✅ ci-dessous. |
| Token valide → redirection `/auth/login` avec bannière succès "Compte activé !" | Pas de redirection ni de bannière sur la page de login. Le message de succès ("Email confirmé !") s'affiche **directement sur la page `/auth/verify-email`**, avec un bouton manuel "Se connecter" vers `/auth/login` (`LoginComponent` ne contient aucune logique de bannière post-vérification). | Le résultat perçu par l'utilisateur (confirmation claire + chemin vers la connexion) est équivalent, mais le mécanisme (page unique avec CTA, vs redirection + bannière sur une autre page) diverge du libellé exact de l'AC. Repassé à 🟡 dans le backlog. |
| Token expiré (> 24h) → page d'erreur avec bouton "Renvoyer un lien" | Un seul état d'erreur générique, sans bouton "Renvoyer un lien" dédié. Le texte invite à "demander un nouveau lien depuis la page de connexion" (chemin indirect via `/auth/login` → lien "Renvoyer" → `/auth/resend-verification`), mais aucune distinction n'est faite entre token expiré, déjà utilisé, ou inconnu — confirmé par les tests (`verify-email.component.spec.ts` ne teste qu'un état `error` unique, quel que soit le code d'erreur backend). | Le backend distingue pourtant "Token invalide" et "Token expiré" en message texte — cette distinction n'est simplement pas remontée/exploitée côté frontend. Un chemin de renvoi existe (page dédiée US01.2.3), mais pas le CTA direct décrit par l'AC. Repassé à 🟡 dans le backlog. |
| Token inconnu → page d'erreur générique (ne révèle pas l'existence du compte) | **Conforme** — même état `error` générique que pour un token expiré, aucune fuite d'information distinctive. | Coché ✅ ci-dessous. |
| Token SHA-256 stocké en BDD, supprimé après utilisation | Le hash SHA-256 est bien la seule forme persistée (conforme), mais la ligne `EmailVerification` **n'est pas supprimée** après consommation — elle est marquée `usedAt = now()` et conservée (probablement à des fins d'audit/traçabilité, cohérent avec `AuditService.log(user, EMAIL_VERIFIED, ...)` sur le même chemin). | Le risque de sécurité pratique est nul (`findByTokenHashAndUsedAtIsNull` empêche toute réutilisation), mais l'AC "supprimé" n'est pas réalisée littéralement. Repassé à 🟡 dans le backlog. |
| Clés i18n dans l'espace `auth.verifyEmail.*` (fr.json / en.json) | Namespace réel : `auth.verify_email.*` (snake_case). Contenu complet (7 clés, parité FR/EN, couvrant `loading`/`success_*`/`error_*`) et utilisé par le composant. | Le pré-marquage `⬜` du backlog sous-estimait ce qui a été livré — le fond (clés complètes, utilisées, testées indirectement via les specs de composant) est bien présent, seul le nom d'espace diffère du libellé de l'AC (cohérent avec la convention snake_case du reste du lot MVP E01, voir aussi US01.2.3). Coché ✅ ci-dessous. |
| A11y : page de résultat annonce le statut via `role="status"` ou `role="alert"` | **Non implémenté** — aucun `role` sur les blocs `success`/`error`/`loading` du template. | Confirmé par lecture du template (`verify-email.component.ts`) — aucune régression, l'AC était déjà `⬜` dans le backlog avant ce figeage. Reste `⬜`. |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.2.1 (Inscription) | Émet le premier token de vérification (`issueVerificationToken`, même table `EmailVerification`, même template `sendVerificationEmail`) que cette US consomme. |
| US01.2.3 (Renvoi lien d'activation) | Émet un token de remplacement via le même chemin (`issueVerificationToken`) sur la page dédiée `/auth/resend-verification` — c'est le chemin réel de "renvoi" que l'AC "bouton Renvoyer un lien" de cette US aurait dû exposer directement depuis la page d'erreur, mais qui reste aujourd'hui un chemin indirect (retour login → lien renvoi → page dédiée). |
| US01.4.x (connexion) | `SessionService.login` consulte `user.emailVerified` (positionné par cette US) pour bloquer la connexion (`403`) tant que l'email n'est pas vérifié. |

## Hors périmètre (explicitement exclu)

- Distinction observable côté frontend entre token expiré / déjà utilisé / inconnu (un seul état
  `error` générique).
- Bouton "Renvoyer un lien" directement sur la page d'erreur de vérification (le renvoi passe par
  la page dédiée US01.2.3, atteignable seulement depuis l'écran de connexion).
- Suppression physique de la ligne `EmailVerification` après consommation (marquage `usedAt`
  conservé à la place).
- Rôles ARIA (`status`/`alert`) sur les états de la page de résultat.
