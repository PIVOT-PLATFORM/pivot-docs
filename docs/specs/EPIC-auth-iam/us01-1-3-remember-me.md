# US01.1.3 — Rester connecté (remember-me)

## Contexte

- **US** : `docs/backlog/EPIC-auth-iam/FEATURES/login-email-password/us-remember-me.md` (F01.1 —
  Login email/mot de passe, EPIC-auth-iam E01)
- **PR** : `pivot-core` [#67](https://github.com/PIVOT-PLATFORM/pivot-core/pull/67) (`feature/auth`)
  et `pivot-ui` [#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11) (`feature/auth`)
- **Dernier commit au moment du figeage** : `2f071cf` (core, merge commit) / `573bd6c` (ui, merge
  commit)
- **Gate 4** :
  - `pivot-ui` #11 — **82/100 — merge documenté** (seuil ≥ 60), corrections Red→Blue Team
    appliquées avant merge (headers de sécurité `nginx.conf`)
  - `pivot-core` #67 — pas de score Gate 4 automatisé : PR labellisée `security` (réécriture
    complète de l'authentification, OIDC/rôles) → Breaking Point 2, revue **humaine** obligatoire.
    Validée par un mainteneur (`tellebma`) sur le HEAD `f307bfc` : `mvn verify -Pcoverage
    -Dmaven.compiler.release=24` → BUILD SUCCESS, 176 tests, 0 échec. Deux gaps de couverture
    signalés et non bloquants pour ce mainteneur (`rotation à MAX_SESSIONS_PER_USER atteint`,
    `default_role` inconnu) — sans lien avec remember-me.
- **Dépend de** : rien côté remember-me lui-même ; livré dans le cadre de la réécriture globale de
  l'authentification (tokens opaques, MFA appareil, OIDC/Google) — voir écart ci-dessous.

## Écart majeur vs découpage backlog — PR unique multi-US

Contrairement au principe "une branche/une PR par US" du workflow ACDD, **le sous-système
d'authentification complet a été livré en un seul PR par repo** (`pivot-core` PR #67 et
`pivot-ui` PR #11, toutes deux nommées `feature/auth`), couvrant en une fois la quasi-totalité de
l'epic `EPIC-auth-iam` (login, register, remember-me, MFA appareil par OTP, appareils de confiance,
Google Sign-In, OIDC PKCE entreprise, rotation de token, rate-limiting). Remember-me n'a donc **pas
sa propre PR** : le comportement décrit ci-dessous est un sous-ensemble fonctionnel de ce PR
massif, isolé a posteriori pour ce figeage Gate 5.

Les hints initiaux (`core#105`, `ui#39`) sont **incorrects** pour cette US : ce sont des PR
ultérieures ("auth module MVP — E01" / "auth pages MVP — E01") qui couvrent register/verify-email/
forgot-password/reset-password et une consolidation de schéma — `ui#39` n'introduit même pas de
page de login, et `core#105` ne touche `SESSION_TTL_REMEMBER_ME_SECONDS` que pour un correctif de
formatage SQL (espaces), pas pour la logique. Le login avec case "Se souvenir de moi" et le TTL
différencié sont apparus dans `core#67` / `ui#11`, vérifié par `git log --follow` sur
`TokenService.java` (core) et `login.component.ts` (ui) — aucun commit ultérieur ne les a
réintroduits ou modifiés.

---

## Spec fonctionnelle

### Formulaire de connexion (`LoginComponent`, pivot-ui)

Une case à cocher `formControlName="rememberMe"` est affichée dans `form-actions`, à côté du lien
"mot de passe oublié". Elle est imbriquée dans un `<label class="checkbox-label">` qui l'entoure
directement (association implicite input/label — pas d'attribut `for`/`id` explicite ni
`aria-label` séparé). Le libellé provient de la clé i18n `auth.login.remember_me` (fr.json/en.json,
namespace `auth.login.*`, pas `auth.rememberMe.*`).

À la soumission, `rememberMe` (booléen du form) est envoyé tel quel dans le payload
`POST /auth/login`. Sur la branche MFA appareil inconnu (202 + redirection vers
`/auth/device-confirm`), le choix `rememberMe` est propagé en query param
(`pendingRememberMe()`) pour être réappliqué lors de la validation de l'OTP
(`POST /auth/device/verify`), afin que le TTL long s'applique aussi à ce chemin.

### TTL différencié (`TokenService`, pivot-core)

`TokenService#issue(User, deviceFingerprint, deviceName, userAgent, ipAddress, authMethod,
rememberMe)` calcule le TTL de la session :

- `rememberMe = true` → `flagRepo.getInt("SESSION_TTL_REMEMBER_ME_SECONDS", 2_592_000)` (30 jours
  par défaut)
- `rememberMe = false`/absent → `flagRepo.getInt("SESSION_TTL_SECONDS", 86_400)` (24 h par défaut)

Ces valeurs sont pilotées par la table `feature_flags` (type `int`), **pas** par
`application.yml` — contrairement à ce que supposaient les Notes d'implémentation initiales de
l'US (`pivot.auth.token.ttl.short`/`.long`). `application.yml` ne définit que des TTL non liés à
remember-me (`device-ttl-days`, `verification-ttl-hours`, `password-reset-ttl-minutes`,
`device-verify-ttl-minutes`).

Le token opaque (`AccessToken`) est persisté avec `rememberMe` (colonne booléenne), `ttlSeconds`
et `expiresAt = now + ttlSeconds`. C'est cette colonne `expires_at` qui fait foi côté serveur pour
la validation ultérieure du token — jamais le `Max-Age` du cookie.

### Cookie de session — nuance vs AC initial

L'AC "TTL stocké en BDD, pas dans le cookie" est vrai pour la **validation** du token (le serveur
ne fait jamais confiance à l'expiration du cookie, il revalide systématiquement contre
`access_tokens.expires_at` en base) — mais le cookie `pivot_session` posé par `CookieHelper#
setSessionCookie(response, rawToken, ttlSeconds)` a bien un `Max-Age` égal à `ttlSeconds`, donc sa
durée de vie visible dans le navigateur reflète déjà le choix remember-me (24 h vs 30 jours). Il
n'y a pas de fuite de la date d'expiration absolue dans le cookie, seulement une durée relative
(`Max-Age`), cohérente avec l'intention de sécurité de l'AC (pas de confiance côté client) mais pas
strictement "aucune trace de TTL dans le cookie" au sens littéral.

### Expiration → 401 → redirection login

Un token expiré (ou absent) échoue à l'authentification Spring Security ; les endpoints protégés
répondent `401`. Côté `pivot-ui`, `token.interceptor.ts` intercepte les `401` et déclenche la
déconnexion locale + redirection vers `/auth/login` (`return-url.ts` mémorise l'URL demandée pour y
revenir après reconnexion). Ce comportement est générique à toute expiration de session (pas
spécifique à remember-me) et partagé avec `session-expiry.service.ts` (US01.1.5, PR ultérieure
`ui#63`, sans impact sur remember-me).

---

## Contrat technique

### Fichiers introduits / modifiés (sous-ensemble pertinent pour remember-me)

| Fichier | Rôle |
|---------|------|
| `pivot-core` `src/main/java/fr/pivot/auth/dto/LoginRequest.java` | `Boolean rememberMe` (payload `/auth/login`) |
| `pivot-core` `src/main/java/fr/pivot/auth/dto/DeviceOtpRequest.java` | `rememberMe` propagé sur la branche MFA appareil |
| `pivot-core` `src/main/java/fr/pivot/auth/service/TokenService.java` | `issue(...)`/`doIssue(...)` — calcul TTL 24 h / 30 j via `FeatureFlagRepository` |
| `pivot-core` `src/main/java/fr/pivot/auth/entity/AccessToken.java` | colonne `rememberMe`, `ttlSeconds`, `expiresAt` |
| `pivot-core` `src/main/java/fr/pivot/auth/controller/AuthController.java` | `POST /auth/login`, `POST /auth/device/verify` — pose le cookie via `CookieHelper` |
| `pivot-core` `src/main/java/fr/pivot/config/CookieHelper.java` | `setSessionCookie(res, rawToken, ttlSeconds)` — `Max-Age` = TTL choisi |
| `pivot-core` `src/main/resources/db/migration/V1__schema_init.sql` | flags `SESSION_TTL_SECONDS`, `SESSION_TTL_REMEMBER_ME_SECONDS` |
| `pivot-ui` `src/app/features/auth/pages/login/login.component.ts` / `.html` | case à cocher `rememberMe`, propagation vers `device-confirm` |
| `pivot-ui` `public/assets/i18n/fr.json` / `en.json` | clé `auth.login.remember_me` |
| `pivot-ui` `src/app/core/auth/interceptor/token.interceptor.ts` | redirection sur `401` |

### Endpoints / modèles / contrats techniques pertinents

`POST /auth/login` — payload `LoginRequest { email, password, deviceFingerprint?, deviceName?,
rememberMe?: boolean }` → `200 AuthResponse { accessToken, expiresAt, user }` (cookie
`pivot_session` posé, `Max-Age` = TTL choisi) ou `202` (`X-Device-Verification-Required: true`) si
MFA appareil inconnu déclenché.

`POST /auth/device/verify` — même contrat de sortie, `rememberMe` repris du payload OTP pour
appliquer le même TTL différencié après validation du code.

Feature flags (table `feature_flags`, `V1__schema_init.sql`) :

| Clé | Type | Défaut | Rôle |
|-----|------|--------|------|
| `SESSION_TTL_SECONDS` | `int` | `86400` (24 h) | TTL par défaut, remember-me décoché |
| `SESSION_TTL_REMEMBER_ME_SECONDS` | `int` | `2592000` (30 j) | TTL étendu, remember-me coché |

---

## Écarts vs ACs initiaux

| AC backlog | Statut réel |
|------------|-------------|
| Case visible sur le formulaire | ✅ confirmé (`login.component.html`) |
| Coché → TTL 30 j / décoché → TTL 24 h | ✅ confirmé (`TokenService#doIssue`, valeurs par défaut des feature flags) |
| TTL stocké en BDD, pas dans le cookie | 🟡 vrai pour la **validation** serveur (toujours `access_tokens.expires_at`, jamais le cookie) ; nuance : le cookie porte tout de même un `Max-Age` égal au TTL choisi (voir section dédiée ci-dessus) |
| Token expiré → 401 → redirection `/auth/login` | ✅ confirmé (`token.interceptor.ts`, comportement générique) |
| Clés i18n `auth.rememberMe.*` | 🟡 clé réellement utilisée : `auth.login.remember_me` (namespace `auth.login.*`, pas `auth.rememberMe.*`) — le libellé existe et est traduit FR/EN, mais pas dans l'espace de noms prévu |
| `aria-label` explicite ou association `for`/`id` | 🟡 association **implicite** (input imbriqué dans son `<label>`), valide pour l'accessibilité (nom accessible correctement calculé) mais ni `aria-label` ni `for`/`id` explicites comme littéralement demandé |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.1.4 — Redirection post-login | Même fichier `login.component.ts`, PR ultérieure `ui#64` — ne touche pas à `rememberMe` |
| US01.1.5 — Expiration de session (front) + auto-logout | `ui#63` — réutilise le même mécanisme de redirection sur 401, ne modifie pas le calcul de TTL |
| US01.4.1 — MFA appareil inconnu (porte OTP) | Même PR `core#67`/`ui#11` — `rememberMe` propagé via `DeviceOtpRequest`/query param pour rester cohérent après validation OTP |

## Hors périmètre (explicitement exclu)

- Renommage de la clé i18n vers `auth.rememberMe.*` (déclencherait une US de suivi si jugé
  nécessaire — pas fait rétroactivement dans ce figeage)
- Ajout d'un `aria-label`/`for`/`id` explicite sur la case à cocher (association implicite jugée
  suffisante à l'implémentation, non retouchée ici)
- Refonte du cookie de session pour supprimer tout `Max-Age` différencié (impliquerait un
  changement de contrat cookie, hors périmètre de ce figeage rétroactif)
