# US01.1.1 — Connexion email + mot de passe

## Contexte

- **US** : `docs/backlog/EPIC-auth-iam/FEATURES/login-email-password/us-connexion.md` (F01.1 — Connexion email/password, EPIC-auth-iam)
- **PR** : `pivot-core` [#67](https://github.com/PIVOT-PLATFORM/pivot-core/pull/67) (`Feature/auth`) — introduit `AuthController`, `SessionService`, `TokenService`, `CookieHelper` ; `pivot-ui` [#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11) (`Feature/auth`) — introduit `LoginComponent`, `AuthService`, `authGuard`/`authMatchGuard`, `token.interceptor`
- **Dernier commit au moment du figeage** : `2f071cf0` (`pivot-core`, merge de la PR#67) ; `7730260` (`pivot-ui`, dernier commit de correctifs Gate 4 sur la PR#11)
- **Gate 1 READINESS (core, US #73 — réécriture globale du sous-système auth)** : 86/100
- **Gate 4 MERGE_CONFIDENCE (`pivot-core` #67)** : 78/100 — `VALIDATE_WITH_HUMAN` (hard block `security` + `modif_systeme_oidc_roles` — la PR touche le système OIDC/rôles en plus du login ; merge non autonome, validé par le mainteneur)
- **Gate 4 MERGE_CONFIDENCE (`pivot-ui` #11)** : 82/100 — `MERGE_DOCUMENTED` (seuil ≥ 60 ; un bloquant Red Team — headers de sécurité `nginx.conf` — corrigé avant merge en commit `7730260`)
- **Dépend de** : rien (US socle de l'EPIC-auth-iam) — `US01.1.2` (déconnexion), `US01.1.3` (remember-me), `US01.1.4` (redirection post-login) et `US01.4.1`/`US01.4.3a` (MFA/alerte appareil inconnu) sont construites par-dessus ce même flux `POST /auth/login`.

### Note sur les hints de PR fournis en entrée de ce figeage

Les hints initiaux (`core#105`, `ui#39`) sont **incorrects pour cette US** — vérifiés et écartés :
- `core#105` (`feat(auth): auth module MVP — E01`, mergée le 2026-06-27) ajoute les TTL configurables,
  le rate limiter et l'i18n des emails ; elle modifie `AuthController`/`SessionService` à la marge mais
  ne crée ni l'endpoint `/auth/login` ni le mécanisme de session — déjà livrés par `core#67`.
- `ui#39` (`feat(ui): auth pages MVP — E01`) ne touche que `register`, `verify-email`,
  `forgot-password`, `reset-password`, `resend-verification` — **aucun fichier `login.*`** n'apparaît
  dans son diff.

Le véritable code de connexion (`AuthController#login`, `SessionService#login`, `TokenService`,
`CookieHelper`, `LoginComponent`, `AuthService`, `authGuard`/`authMatchGuard`, `token.interceptor`)
a été introduit par `core#67` et `ui#11`, toutes deux mergées le 2026-06-27 — c'est sur ces deux PR
que ce Gate 5 est figé.

---

## Spec fonctionnelle

### Backend — `POST /auth/login`

`AuthController#login` délègue à `SessionService#login(LoginRequest, clientIp, userAgent)` :

- Vérifie l'email (recherche `UserRepository`) puis le mot de passe (BCrypt, cost 12).
- **Email inconnu** : exécute un leurre BCrypt (`runDecoyPasswordCheck`) pour égaliser le temps de
  réponse, puis renvoie le même message générique que « mot de passe incorrect » — anti-énumération
  (testé : `SessionServiceTest`, cf. table AC→tests `gates/us-73/ac-traceability.md` au moment du
  merge).
- **Mot de passe incorrect** : même message générique.
- **Compte non vérifié** : renvoie une réponse neutre et déclenche un renvoi silencieux du lien
  d'activation (pas de fuite d'information sur l'état du compte).
- **Appareil inconnu + `MFA_NEW_DEVICE_OTP` actif (ou compte `ROLE_SUPER_ADMIN`)** : `202 Accepted` +
  header `X-Device-Verification-Required: true`, porte OTP bloquante (US01.4.1, hors périmètre de
  cette US mais partage le même endpoint).
- **Succès** : `TokenService` génère un token opaque (256 bits `SecureRandom`, encodé hex), stocké en
  base sous forme de hash SHA-256 (`CryptoUtils.sha256`) — le raw token n'est jamais persisté.
  `CookieHelper.setSessionCookie` pose le cookie de session (`pivot_session`) avec `HttpOnly=true`,
  `Secure` (piloté par `pivot.auth.secure-cookie`, `true` par défaut), `SameSite=Strict`, path
  `/api/auth`, `Max-Age` = TTL dynamique (`SESSION_TTL_SECONDS` / `SESSION_TTL_REMEMBER_ME_SECONDS`,
  feature flags). Le contrôleur renvoie en plus `200` avec un corps JSON `AuthResponse` contenant le
  même token opaque en clair (`accessToken`) — **le raw token est donc à la fois posé en cookie
  HttpOnly ET renvoyé dans le corps de la réponse** (cf. divergence ci-dessous).

### Frontend — `LoginComponent` (`pivot-ui/src/app/features/auth/pages/login/`)

- Formulaire réactif (email, password, `rememberMe`), soumission via `AuthService.login()`.
- `loading` (signal) désactive le bouton submit et affiche un spinner pendant la requête
  (`[disabled]="loading()"` + `@if (loading()) { <span class="spinner"></span> }`).
- Erreur affichée dans `.error-slot` via un signal `error()`, libellés résolus par clés i18n
  `auth.login.*` (fr/en) : `error_invalid_credentials`, `error_not_verified`, `error_disabled`,
  `error_rate_limit`, `error_generic`.
- `AuthResponse.accessToken` reçu du backend est conservé **en mémoire uniquement** côté Angular
  (jamais `localStorage`, jamais relu depuis un cookie côté JS puisque le cookie est `HttpOnly`) — la
  persistance inter-rechargement repose sur le cookie `HttpOnly` + `POST /auth/refresh` au démarrage
  de l'app (`APP_INITIALIZER`), la rotation en cours de session repose sur le header `X-New-Token`.
- `authMatchGuard` (`CanMatchFn`) protège le shell applicatif ; `authGuard` (`CanActivateFn`) protège
  les routes enfants et redirige vers `/auth/login` avec `returnUrl` (US01.1.4) ; `guestGuard`
  redirige un utilisateur déjà authentifié loin des pages `auth/*`.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `pivot-core` `src/main/java/fr/pivot/auth/controller/AuthController.java` | `POST /auth/login` — HTTP uniquement, délègue à `SessionService` |
| `pivot-core` `src/main/java/fr/pivot/auth/service/SessionService.java` | Logique login : vérification BCrypt, anti-énumération, décision MFA |
| `pivot-core` `src/main/java/fr/pivot/auth/service/TokenService.java` | Génération token opaque 256-bit `SecureRandom`, hash SHA-256, rotation |
| `pivot-core` `src/main/java/fr/pivot/config/CookieHelper.java` | Pose/efface le cookie de session (HttpOnly/Secure/SameSite=Strict/path) |
| `pivot-core` `src/main/java/fr/pivot/auth/util/CryptoUtils.java` | `sha256(...)` — hash du token avant persistance |
| `pivot-core` `src/main/java/fr/pivot/auth/dto/{LoginRequest,LoginResult,AuthResponse}.java` | DTOs entrée/sortie du login |
| `pivot-core` `src/main/resources/db/migration/V1__schema_init.sql` | Table `access_tokens` (token_hash, expires_at, revoked_at…) |
| `pivot-ui` `src/app/features/auth/pages/login/login.component.{ts,html,scss,spec.ts}` | Page de connexion |
| `pivot-ui` `src/app/core/auth/service/auth.service.ts` | `login()`, état `isAuthenticated`, rotation via intercepteur |
| `pivot-ui` `src/app/core/auth/guard/auth.guard.ts` | `authGuard`, `authMatchGuard`, `guestGuard` |
| `pivot-ui` `src/app/core/auth/interceptor/token.interceptor.ts` | Injection/rotation du token, retry 401 → refresh |
| `pivot-ui` `public/assets/i18n/{fr,en}.json` | Clés `auth.login.*` |

### Endpoints / modèles / contrats techniques pertinents

- `POST /api/auth/login` — body `LoginRequest{email, password, deviceFingerprint?, deviceName?, rememberMe}`
  → `200 AuthResponse{accessToken, expiresAt, user}` + `Set-Cookie: pivot_session` (HttpOnly, Secure,
  SameSite=Strict) · `202` + `X-Device-Verification-Required: true` si MFA appareil inconnu requis.
- Table `access_tokens` : `token_hash` (SHA-256, unique), `user_id`, `expires_at`, `revoked_at`,
  `last_used_at` (écrit en asynchrone, hors chemin critique de la requête).
- Feature flags consommés : `SESSION_TTL_SECONDS`, `SESSION_TTL_REMEMBER_ME_SECONDS`,
  `MFA_NEW_DEVICE_OTP` (table `feature_flags`, lus via `FeatureFlagRepository.getInt()`).

---

## Écarts vs ACs initiaux

1. **Token à la fois en cookie HttpOnly et en JSON body** — l'AC « token opaque posé en cookie
   HttpOnly » est respecté (cookie bien posé, `HttpOnly`/`Secure`/`SameSite=Strict` confirmés dans
   `CookieHelper`), mais le contrôleur renvoie *en plus* le raw token en clair dans
   `AuthResponse.accessToken`. Ce n'est pas un défaut de sécurité en soi (le token JSON est consommé
   une fois par Angular puis gardé en mémoire, jamais en storage persistant), mais c'est un mécanisme
   plus riche que ce que l'AC laissait entendre (« jamais de token en LocalStorage » reste vrai — le
   risque LocalStorage n'existe pas ici — mais le token transite bien en clair dans le corps de la
   réponse HTTP, ce que l'AC ne mentionne pas explicitement). Documenté ici pour traçabilité,
   non-bloquant.

2. **AC « Champ email focus au chargement de la page de login » — marqué ✅ dans le backlog mais NON
   implémenté.** Vérification directe de `login.component.html`/`.ts` (HEAD `main`, `pivot-ui`) :
   aucun attribut `autofocus`, aucun appel `.focus()` dans `ngOnInit` ou équivalent. Le champ email
   ne reçoit donc pas le focus automatiquement au chargement. Rétrogradé à 🟡 dans le backlog (voir
   mise à jour ci-dessous).

3. **AC « A11y : `role="alert"` sur le message d'erreur, (…), focus trap » — marqué ✅ dans le
   backlog mais partiellement implémenté.** Les labels explicites sont bien présents
   (`<label for="email">`, `<label for="password">`), mais :
   - `role="alert"` est absent du bloc d'erreur (`<div class="alert alert-error">` sans attribut
     ARIA) — confirmé par recherche exhaustive (`gh search code "role=\"alert\"" --repo
     PIVOT-PLATFORM/pivot-ui` → 0 résultat).
   - Aucun focus trap n'est implémenté sur la page de login (recherche `trapFocus`/`cdkTrapFocus` →
     0 résultat dans `pivot-ui`) ; la page de login n'est d'ailleurs pas une modale, donc l'utilité
     d'un focus trap classique y est discutable, mais l'AC le mentionnait explicitement sans
     nuance — à clarifier avec le PO Agent lors d'une prochaine itération plutôt que de considérer
     l'AC comme couvert. Rétrogradé à 🟡 dans le backlog.

Aucun autre écart : les mécanismes anti-énumération (email inconnu / mot de passe incorrect / compte
non vérifié), la génération et le stockage du token (256-bit SecureRandom, SHA-256, raw jamais
persisté) et les clés i18n `auth.login.*` sont confirmés par lecture directe du code mergé.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.1.2 — Déconnexion | Consomme le même `access_tokens` / `pivot_session` posés par cette US |
| US01.1.3 — Se souvenir de moi | Pilote le TTL du cookie via `SESSION_TTL_REMEMBER_ME_SECONDS` sur ce même endpoint |
| US01.1.4 — Redirection post-login | `authGuard`/`authMatchGuard` (introduits ici) mémorisent l'URL tentée, consommée après un login réussi |
| US01.4.1 — OTP appareil inconnu (préexistante au moment de cette US) | Porte bloquante sur ce même `POST /auth/login` (branche `202` + `X-Device-Verification-Required`) |
| US01.4.3a — Alerte connexion suspecte | Branche passive (non bloquante) du même endpoint, sur les connexions qui ne déclenchent pas la porte OTP |

## Hors périmètre (explicitement exclu)

- Rate limiting (couvert plus tard par `core#105` / EN01.x)
- Social login (Google Sign-In) — bouton présent dans `LoginComponent` mais volontairement désactivé
  (`googleEnabled = signal(false)`), flux non câblé
- OIDC SSO entreprise — `OidcAuthController`/`OidcAuthService` existent dans `core#67` mais hors
  périmètre fonctionnel de cette US (US dédiée séparée)
