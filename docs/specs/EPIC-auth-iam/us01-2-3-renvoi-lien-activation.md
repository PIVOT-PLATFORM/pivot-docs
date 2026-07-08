# US01.2.3 — Renvoi lien d'activation

## Contexte

- **US** : [`us-renvoi-lien-activation.md`](pathname:///pivot-docs/backlog/EPIC-auth-iam/FEATURES/inscription-verification/us-renvoi-lien-activation) · Parent `F01.2` · Module `auth` · Phase Socle · Sprint 1
- **PR** : `pivot-core` [#105](https://github.com/PIVOT-PLATFORM/pivot-core/pull/105) (`feat(auth): auth module MVP — E01`) + `pivot-ui` [#39](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/39) (`feat(ui): auth pages MVP — E01`)
- **Fusionnées le** : 2026-06-27
- **Gate 4 au figeage** : `pivot-core` 87/100 — `MERGE AUTONOME` · `pivot-ui` 86/100 — `MERGE AUTONOME`
- **Écart notable** : cette US n'a pas été livrée par une PR dédiée — elle fait partie d'un lot MVP
  ("auth module MVP — E01") qui livre l'ensemble du flux d'inscription/authentification en une
  seule PR par repo. Les scores et findings Gate 4 ci-dessus couvrent l'ensemble du lot, pas
  spécifiquement cette US — aucun des deux commentaires de revue ne contient de traçabilité AC par
  US. Ce document reconstruit cette traçabilité a posteriori à partir du code réellement livré.

---

## Spec fonctionnelle

### Page `/auth/resend-verification` (pivot-ui)

`ResendVerificationComponent` (`src/app/features/auth/pages/resend-verification/`), routée sous
`/auth/resend-verification` (`auth.routes.ts`) — **pas** `/auth/resend-activation` comme nommé
dans l'AC initial (voir "Écarts vs ACs" ci-dessous).

- Formulaire à un champ (email, `Validators.required` + `Validators.email`), bouton de soumission
  désactivé pendant l'appel (`loading` signal).
- Sur succès **et** sur erreur HTTP (ex. 404), le composant affiche le même bloc de succès
  (`sent.set(true)`) — anti-énumération appliquée côté client en plus du backend, testé
  explicitement (`sets sent=true even on error (RGPD — pas d'énumération)`).
- Bloc succès : icône, titre/texte i18n, lien retour connexion.

### Endpoint `POST /auth/resend-verification` (pivot-core)

`AuthController.resendVerification` → `RegistrationService.resendVerification` :

- Toujours `202 Accepted` avec un message générique
  (`"Si cet email est enregistré et non vérifié, un lien vous a été envoyé."`), que l'email soit
  inconnu, déjà vérifié, ou effectivement renvoyé — pas de distinction observable côté client
  (anti-énumération, RGPD Art. 5.1c).
- Email connu + compte non vérifié → nouveau token de vérification généré et email envoyé
  (`issueVerificationToken`, même chemin que l'inscription initiale — même template email,
  `sendVerificationEmail`).
- Email inconnu, ou compte déjà vérifié → no-op silencieux (`Optional.filter(...).ifPresent(...)`).
- Rate limiting : 429 (`ResponseStatusException`) au-delà de 3 appels/heure — voir "Écarts vs ACs"
  pour le détail de la clé utilisée.

### Renvoi silencieux depuis le flux de connexion

**Non implémenté.** L'AC "Renvoi silencieux depuis le flux de connexion (compte non vérifié
détecté)" décrit un déclenchement automatique du renvoi lorsqu'un utilisateur tente de se
connecter avec un compte `PENDING`. Le code réel ne fait pas cela :

- Backend (`SessionService.login`) : un compte non vérifié (`!user.isEmailVerified()`) lève
  directement `403 Forbidden` avec le message `"Email non vérifié"` — aucun appel à
  `RegistrationService.resendVerification`/`issueVerificationReminder` sur ce chemin.
- Frontend (`LoginComponent`) : un `403` (comme un `401`) affiche uniquement le message générique
  `auth.login.error_generic_credentials` (anti-énumération identifiants) — aucun appel API vers
  `resend-verification` n'est déclenché automatiquement.

Voir "Écarts vs ACs" pour la justification produit de cet écart.

---

## Contrat technique

### Fichiers introduits / modifiés (extraits pertinents du lot MVP E01)

| Fichier | Rôle |
|---------|------|
| `pivot-core/src/main/java/fr/pivot/auth/controller/AuthController.java` | `POST /auth/resend-verification` |
| `pivot-core/src/main/java/fr/pivot/auth/service/RegistrationService.java` | `resendVerification()`, `issueVerificationToken()` |
| `pivot-core/src/main/java/fr/pivot/auth/service/RateLimiterService.java` | `resendVerificationBucket(ip)` |
| `pivot-core/src/main/java/fr/pivot/auth/util/CryptoUtils.java` | `generateSecureToken()` (256-bit), `sha256()` |
| `pivot-core/src/test/java/fr/pivot/auth/service/RegistrationServiceTest.java` | TU `resendVerification_*` (3 cas) |
| `pivot-core/src/test/java/fr/pivot/auth/controller/AuthControllerTest.java` | TU `resendVerification_returnsMessage` |
| `pivot-ui/src/app/features/auth/pages/resend-verification/resend-verification.component.ts` | Page formulaire + succès |
| `pivot-ui/src/app/features/auth/pages/resend-verification/resend-verification.component.spec.ts` | TU Vitest (6 cas, dont anti-énumération) |
| `pivot-ui/src/app/core/auth/service/auth.service.ts` | `resendVerification(email)` → `POST /auth/resend-verification` |
| `pivot-ui/public/assets/i18n/{fr,en}.json` | Clés `auth.resend.*` |

### Endpoint

`POST /auth/resend-verification?email={email}` — public, sans authentification.

Réponses : `202 Accepted` (toujours, message générique) · `429 Too Many Requests` (rate limit).

### Token de vérification

- Génération : `CryptoUtils.generateSecureToken()` — 32 octets `SecureRandom` (Base64 URL-safe
  sans padding), soit 256 bits d'entropie.
- Stockage : `EmailVerification.tokenHash = CryptoUtils.sha256(rawToken)` — le token brut n'est
  jamais persisté, seul le hash SHA-256 l'est.
- TTL : `verificationTtlHours` (config `pivot.auth.verification-ttl-hours`, défaut 24h).
- **Pas d'invalidation de l'ancien token** : `issueVerificationToken` insère une nouvelle ligne
  `EmailVerification` à chaque appel (renvoi inclus) sans marquer les tokens précédents comme
  utilisés/expirés. Plusieurs tokens valides peuvent donc coexister pour un même compte tant que
  le TTL de chacun n'est pas écoulé — voir "Écarts vs ACs".

### Rate limiting

`RateLimiterService.resendVerificationBucket(ip)` → clé Redis `resend-verification:ip:{ip}` —
fenêtre glissante 3 tentatives / heure, **par adresse IP**, pas par adresse email (voir "Écarts vs
ACs" — le pattern par email existe déjà ailleurs dans la classe, ex. `loginEmailBucket`, mais n'a
pas été utilisé ici).

### i18n

Clés sous `auth.resend.*` (`fr.json` / `en.json`) : `title`, `subtitle`, `email`,
`email_placeholder`, `submit`, `back_login`, `sent_title`, `sent_body` — namespace `auth.resend`,
pas `auth.resendActivation` comme nommé dans l'AC initial.

---

## Écarts vs ACs initiaux

| AC initial | Écart | Justification / impact |
|------------|-------|-------------------------|
| Page `/auth/resend-activation` | Route réelle : `/auth/resend-verification`. Composant `ResendVerificationComponent`, i18n `auth.resend.*`. | Convention de nommage du lot MVP E01 : tout le flux "vérification email" (registre, verify-email, resend) utilise le vocable "verification"/"verify" de bout en bout plutôt que "activation" — cohérent avec les autres pages du même flux (`verify-email`, `verify_email` i18n). Aucun impact fonctionnel, uniquement une divergence de nommage vs le libellé de l'AC. |
| "Renvoi silencieux depuis le flux de connexion (compte non vérifié détecté)" | **Non implémenté.** Un login sur compte non vérifié renvoie un `403` générique, sans renvoi automatique d'email ni côté backend ni côté frontend. | Écart fonctionnel réel, pas seulement de nommage — précédemment coché ✅ dans le backlog sans preuve de test ni de code correspondant. Repassé à ⬜ dans le backlog (voir mise à jour ci-dessous). Le seul chemin de renvoi opérationnel est la page dédiée `/auth/resend-verification`, dont le lien apparaît côté UI de connexion (à vérifier séparément dans `LoginComponent` si un lien "renvoyer l'email" y est présent — hors ce contrat technique de resend lui-même). |
| "Rate limiting … au plus 3 renvois par heure **par adresse email**" | Implémenté **par adresse IP** (`resend-verification:ip:{ip}`), pas par email. | Protège correctement contre un spam de masse depuis une seule source, mais un attaquant multi-IP peut dépasser 3 emails/heure vers une même victime, et à l'inverse plusieurs utilisateurs légitimes derrière une même IP (NAT, proxy d'entreprise) partagent le même quota. Le pattern par email existe déjà dans `RateLimiterService` (`loginEmailBucket`) — pas de contrainte technique bloquante, écart de choix d'implémentation non documenté au moment du merge. |
| "Token de renvoi : 256-bit SecureRandom, SHA-256 stocké en BDD (même entropie que le token initial)" | **Conforme** — `generateSecureToken()` (32 octets `SecureRandom`) + `sha256()`, chemin partagé avec le token d'inscription initial. | Coché ✅ ci-dessous (le pré-marquage ⬜ du backlog sous-estimait ce qui a été livré). |
| "Ancien token invalidé" (dans le libellé du 2ᵉ AC) | **Non implémenté** — pas de marquage `usedAt`/suppression des tokens précédents lors d'un renvoi. | Le risque pratique est limité (le nouveau token reste le seul communiqué, l'ancien devient obsolète dès qu'il expire ou qu'un des deux est utilisé — `findByTokenHashAndUsedAtIsNull` accepte n'importe quel token valide et non utilisé), mais ce n'est pas l'invalidation explicite décrite par l'AC. |
| "Clés i18n dans l'espace `auth.resendActivation.*`" | Namespace réel : `auth.resend.*`. | Même remarque de nommage que la route — cohérence interne du lot livré, pas un gap fonctionnel. Coché ✅ ci-dessous (le fond — clés FR/EN complètes et utilisées dans le composant — est bien livré, seul le nom d'espace diffère du libellé AC). |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.2.1 / US01.2.2 (inscription, vérification email) | Chemin de token partagé : `issueVerificationToken` est appelé aussi bien à l'inscription initiale qu'au renvoi — même template email (`sendVerificationEmail`), même table `EmailVerification`. |
| US01.4.x (connexion, appareil de confiance) | `SessionService.login` est le point où un compte non vérifié est détecté (`403`) — c'est le point d'intégration manquant pour l'AC "renvoi silencieux depuis le flux de connexion" non livré par cette US. |
| Registre — tentative de ré-inscription sur email non vérifié | Chemin **distinct** : `RegistrationService.register()` sur un email déjà existant et non vérifié appelle `issueVerificationReminder()` (template `sendVerificationReminderEmail`, différent de `sendVerificationEmail`) — mécanisme voisin mais hors périmètre de cette US (déclenché par une tentative d'inscription, pas par la page de renvoi dédiée ni par une tentative de connexion). |

## Hors périmètre (explicitement exclu)

- Renvoi automatique déclenché depuis l'écran de connexion (voir écart ci-dessus — non livré,
  reste ouvert).
- Invalidation explicite des tokens de vérification précédents lors d'un renvoi.
- Rate limiting par adresse email (implémenté uniquement par IP).
