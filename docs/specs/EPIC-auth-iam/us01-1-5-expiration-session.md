# US01.1.5 — Expiration de session (front) + auto-logout

## Contexte

- **US** : `docs/backlog/EPIC-auth-iam/FEATURES/login-email-password/us-expiration-session.md`
  (F01.1 — Login email/mot de passe, EPIC-auth-iam E01)
- **PR** : `pivot-ui` [#63](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/63)
  (`feat/us01-1-5-expiration-session`)
- **Dernier commit au moment du figeage** : `ef0374a` (merge commit, mergé 2026-07-03)
- **Gate 2 COVERAGE** : ≥ 85% (SonarCloud 96,4% coverage new code — 255/255 tests Vitest verts)
- **Gate 4 MERGE_CONFIDENCE** : 96/100 — `MERGE_AUTONOMOUS` (seuil ≥ 85)
- **Dépend de** : rien de bloquant côté implémentation ; partage `token.interceptor.ts` et
  `return-url.ts` avec US01.1.4 (redirection post-login), livrée en parallèle — voir divergence
  ci-dessous.

---

## Spec fonctionnelle

### `TokenInterceptor` (pivot-ui `core/auth/interceptor/`)

Intercepte toute réponse `401` sur un endpoint hors `/auth/*` et délègue à
`SessionExpiryService`. Le flux historique « 401 → `POST /auth/refresh` → retry de la requête
originale » a été **retiré** : le modèle de tokens opaques PIVOT n'a pas de refresh token, le 401
backend est donc le seul signal d'expiration disponible côté client. `token.interceptor.spec.ts`
vérifie explicitement l'absence de tout appel à `/auth/refresh` après un 401.

### `SessionExpiryService` (pivot-ui `core/auth/service/`)

Orchestre la réaction à une expiration détectée :

- **Purge mémoire** : `AuthService.clearSession()` — aucun appel HTTP supplémentaire (le serveur a
  déjà invalidé le token côté base, `access_tokens.expires_at`).
- **Toast** : message « Session expirée, veuillez vous reconnecter » via `ToastService` ; variante
  « Votre session longue a expiré » si `AuthService.rememberMe` (signal en mémoire, non persisté)
  est actif au moment de l'expiration. Le flag remember-me ne survit pas à un reload de page
  (pas de refresh cookie qui le renverrait) → dans ce cas, message générique.
- **Multi-onglets** : `BroadcastChannel('pivot-session')` (constante `SESSION_CHANNEL_NAME`) —
  quand un 401 est détecté dans un onglet, un message est diffusé et chaque onglet récepteur
  applique `expireLocalSession()` (purge + toast + redirection locale), sans re-broadcast en
  boucle.
- **Redirection** : `/auth/login?returnUrl=…`, `returnUrl` extrait de l'URL courante et validé par
  `sanitizeReturnUrl` avant d'être inclus dans le paramètre de requête.

### `sanitizeReturnUrl` (pivot-ui `core/auth/util/return-url.ts`)

Accepte uniquement une URL relative interne commençant par `/` : rejette les URLs absolues, les
variantes de protocole-relative (`//`, `/\`), les schémas `javascript:`, et bloque en plus les
chemins `/auth/*` (évite une boucle de redirection vers les pages d'authentification elles-mêmes).
Retourne `string | null` (`null` si invalide, charge à l'appelant de retomber sur une valeur par
défaut).

### Toast global accessible (`ToastService`/`ToastComponent`, pivot-ui `shared/toast/`)

Conteneur monté une fois dans le composant racine (`app.ts`), `role="alert"`, bouton de fermeture
avec `aria-label` traduit (Transloco fr/en), style SCSS BEM + tokens design partagés. Déduplique les
toasts en cas de rafale de 401 parallèles (plusieurs requêtes en vol expirant en même temps ne
déclenchent qu'un seul toast). Composant générique, réutilisable par d'autres US au-delà de
l'expiration de session.

---

## Écart vs Notes d'implémentation initiales — duplication `return-url`

**US01.1.4** (redirection post-login, livrée en parallèle) et **US01.1.5** sont toutes deux mergées
sur `main` et introduisent chacune leur propre utilitaire de validation de `returnUrl`, sans
réutilisation ni fusion au merge malgré la coordination annoncée dans les notes de la PR :

| Fichier | US d'origine | Contrat |
|---------|-------------|---------|
| `core/auth/return-url.ts` | US01.1.4 | retourne `string` avec fallback par défaut |
| `core/auth/util/return-url.ts` | US01.1.5 | retourne `string \| null`, bloque en plus `/auth/*` |

Les deux fichiers coexistent toujours sur `main` au moment de ce figeage. C'est une dette
technique côté `pivot-ui` (déduplication/harmonisation des deux implémentations), hors périmètre
de ce document (`pivot-docs`) — suivi à ouvrir côté `pivot-ui`.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `src/app/core/auth/interceptor/token.interceptor.ts` | détection 401 hors `/auth/*`, suppression du flux silent-refresh, délégation à `SessionExpiryService` |
| `src/app/core/auth/interceptor/token.interceptor.spec.ts` | tests 401 → logout flow, absence d'appel `/auth/refresh` |
| `src/app/core/auth/service/session-expiry.service.ts` | orchestration purge/toast/broadcast/redirection |
| `src/app/core/auth/service/session-expiry.service.spec.ts` | tests AC toast, remember-me, multi-onglets, returnUrl |
| `src/app/core/auth/service/auth.service.ts` | signal `rememberMe` (mémoire), `clearSession()` |
| `src/app/core/auth/service/auth.service.spec.ts` | tests associés |
| `src/app/core/auth/util/return-url.ts` | `sanitizeReturnUrl` — validation URL relative interne, blocage `/auth/*` |
| `src/app/core/auth/util/return-url.spec.ts` | 12 cas de test (open redirect, `//`, `/\`, `javascript:`, `/auth/*`) |
| `src/app/shared/toast/toast.service.ts` / `.spec.ts` | service toast générique, déduplication |
| `src/app/shared/toast/toast.component.ts` / `.html` / `.scss` / `.spec.ts` | conteneur toast accessible (`role=alert`) |
| `src/app/app.ts` / `.spec.ts` | montage du conteneur toast racine |
| `public/assets/i18n/fr.json` / `en.json` | libellés toast (fr/en) |
| `e2e/auth/session-expiry.spec.ts` | E2E Playwright : happy path 401 mid-session, cas critique 401 sur `/auth/login` (bad credentials, pas d'auto-logout) |

### Endpoints / modèles / contrats techniques pertinents

Aucun nouvel endpoint backend : le comportement repose entièrement sur l'interception côté client
d'un `401` déjà émis par tout endpoint protégé de `pivot-core` lorsque `access_tokens.expires_at`
est dépassé. Le contrat client :

- `BroadcastChannel` nom de canal : `pivot-session` (constante `SESSION_CHANNEL_NAME`).
- Redirection : `/auth/login?returnUrl=<url relative interne encodée>`.
- Toast : deux variantes de message (générique / remember-me), pas de code d'erreur structuré côté
  UI — texte uniquement, traduit.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.1.3 — Remember-me | Fournit le signal `AuthService.rememberMe` (mémoire uniquement, perdu au reload) consommé ici pour la variante de toast ; ne modifie pas le TTL ni le calcul serveur. |
| US01.1.4 — Redirection post-login | Introduit en parallèle un second utilitaire `returnUrl` (`core/auth/return-url.ts`, contrat différent) — duplication non résolue au merge, voir section « Écart » ci-dessus. |
| US01.1.1 — Connexion email/mot de passe | `TokenInterceptor` et `AuthService` réutilisés tels quels, pas de modification du flux de login initial. |

## Hors périmètre (explicitement exclu)

- Silent refresh token : explicitement supprimé de l'AC initial — le modèle opaque tokens PIVOT
  n'a pas de refresh token, non réintroduit.
- Fusion/harmonisation des deux implémentations `return-url.ts` (US01.1.4 vs US01.1.5) — dette
  technique documentée, à traiter dans une US/tâche de suivi côté `pivot-ui`.
- Persistance du flag `rememberMe` au reload (actuellement perdu, mémoire uniquement) — pas
  retouché dans cette PR.
