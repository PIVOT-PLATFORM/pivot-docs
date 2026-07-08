# US01.1.4 — Redirection post-login

## Contexte

- **US** : `docs/backlog/EPIC-auth-iam/FEATURES/login-email-password/us-redirection-post-login.md`
  (F01.1 — Login email/mot de passe, EPIC-auth-iam E01)
- **PR** : `pivot-ui` [#64](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/64)
  (`feat/us01-1-4-redirection-post-login`)
- **Dernier commit au moment du figeage** : PR mergée `2026-07-03T21:17:50Z` (squash sur `main`,
  release `v0.7.0`)
- **Gate 4 MERGE_CONFIDENCE** : **100/100** — auto-approuvé (seuil ≥ 85), après une review
  initiale à 99/100 (11/11 AC tracés dès la première passe ; le point restant concernait
  uniquement un job non bloquant `Mutation Testing (Stryker)`, corrigé puis review finale à
  100/100)
- **Dépend de** : rien côté redirection post-login elle-même ; pas de dépendance `pivot-core`
  (mécanisme entièrement front, résolu côté `pivot-ui`)

---

## Spec fonctionnelle

### Mémorisation de l'URL d'origine (`authGuard` / `authMatchGuard`, `core/auth/guard/auth.guard.ts`)

Lorsqu'un utilisateur anonyme tente d'accéder à une route protégée, le guard mémorise l'URL
tentée avant de rediriger vers `/auth/login` :

- `authGuard` (reçoit un `RouterStateSnapshot`) mémorise l'URL complète tentée.
- `authMatchGuard` (utilisé sur `canMatch`, qui ne reçoit **pas** de `RouterStateSnapshot`) mémorise
  l'URL via la session Angular en mémoire, en secours.

### Résolution et redirection (`PostLoginRedirectService`)

`PostLoginRedirectService.resolveTarget()` détermine la cible de redirection post-login avec
priorité stricte :

1. Query param `?returnUrl=` s'il est présent et valide (même origine, relatif interne) — priorité
   absolue même si une valeur est aussi présente en session Angular.
2. Sinon, valeur mémorisée en session Angular (posée par `authMatchGuard`).
3. Sinon, `DEFAULT_POST_LOGIN_URL` (`/home`).

`resolveTarget()` appelle systématiquement `clear()` après résolution : la valeur mémorisée
(query param comme session) n'est jamais réutilisée au-delà de la tentative de navigation
courante — pas de persistance longue durée (ni `localStorage`, ni `sessionStorage`).

`LoginComponent.submit()` et `DeviceConfirmComponent` (flux MFA appareil, `POST
/auth/device/verify`) appellent tous deux `PostLoginRedirectService.redirectAfterLogin()` après
authentification réussie — le mécanisme de redirection est donc identique, que l'authentification
passe ou non par la porte OTP appareil.

### Protection open redirect (`sanitizeReturnUrl` / `isSafeReturnUrl`, `core/auth/return-url.ts`)

Validation en profondeur (defense-in-depth), sans dépendance Angular (fonctions pures) :

- Rejette toute URL absolue (`http://`, `https://`, autre scheme).
- Rejette les URLs protocol-relative (`//evil.example`).
- Rejette les schemes dangereux même encodés (`javascript:`, `data:`).
- Rejette le double encodage et l'encodage partiel qui contourneraient un simple `startsWith('/')`.
- Rejette les backslashes (`\evil.example`, interprétés comme `/` par certains navigateurs).
- Rejette les caractères de contrôle (bornes exactes testées : `U+001F`/`U+0020` et
  `U+007E`/`U+007F`).
- N'accepte que des chemins relatifs internes commençant par `/` après toutes ces vérifications.

Toute valeur `returnUrl` qui échoue à ces contrôles → fallback silencieux vers `/home` (pas
d'erreur affichée à l'utilisateur, pas de log de sécurité applicatif spécifique documenté dans ce
périmètre).

### Route inconnue (`app.routes.ts`, wildcard `**`)

Une route wildcard `**` a été ajoutée (`notFoundRedirect`) : redirige vers `/home` si
l'utilisateur est authentifié, vers `/auth/login` sinon — plutôt que de planter sur une route
inconnue. C'est ce mécanisme qui couvre l'AC « returnUrl pointe vers une route inexistante →
redirection /home » : la validation se fait par renvoi vers la route wildcard existante, pas par
une liste blanche de routes valides consultée en amont.

### Indicateur de chargement (`RouteLoadingComponent`)

Composant `OnPush`, `signal()`/`toSignal()` pour l'état, affiché uniquement si la navigation
dépasse `ROUTE_LOADING_DELAY_MS` (500 ms) — évite le flash visuel sur les navigations rapides.
Template avec `role="status"` et `aria-label` résolu via la clé i18n `common.loading`
("Chargement en cours..." en fr.json), couvrant l'AC d'accessibilité par un test dédié
(`route-loading.component.spec.ts`).

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `src/app/core/auth/return-url.ts` | `sanitizeReturnUrl`/`isSafeReturnUrl` — validation open redirect, fonctions pures |
| `src/app/core/auth/return-url.spec.ts` | 35+ cas (absolu, protocol-relative, schemes, encodage, backslash, caractères de contrôle) |
| `src/app/core/auth/service/post-login-redirect.service.ts` | `PostLoginRedirectService` — résolution cible (`resolveTarget`), priorité query param > session, `clear()` systématique |
| `src/app/core/auth/service/post-login-redirect.service.spec.ts` | Tests priorité, fallback `/home`, non-persistance |
| `src/app/core/auth/guard/auth.guard.ts` | `authGuard`/`authMatchGuard` — mémorisation URL tentée (query param + session Angular pour `canMatch`) |
| `src/app/core/layout/route-loading/route-loading.component.ts` / `.scss` | Indicateur de navigation global, seuil 500 ms, `role="status"` |
| `src/app/features/auth/pages/login/login.component.ts` | Redirection post-login via `PostLoginRedirectService` |
| `src/app/features/auth/pages/device-confirm/device-confirm.component.ts` | Redirection post-login après validation OTP appareil |
| `src/app/app.routes.ts` | Route wildcard `**` → `/home` (authentifié) ou `/auth/login` (anonyme) |
| `e2e/auth/redirect-post-login.spec.ts` | Playwright — happy path + open redirect bloqué |

### Endpoints / modèles / contrats techniques pertinents

Aucun endpoint `pivot-core` nouveau ou modifié — mécanisme entièrement résolu côté client
(`pivot-ui`). Query param convention : `?returnUrl=/chemin/interne` sur `/auth/login`.

---

## Écarts vs ACs initiaux

| AC backlog | Statut réel |
|------------|-------------|
| URL d'origine conservée (query param ou session Angular) | ✅ confirmé (`auth.guard.spec.ts`) |
| Redirection vers `returnUrl` si valide après login | ✅ confirmé (`post-login-redirect.service.spec.ts`) |
| Pas de `returnUrl` → `/home` | ✅ confirmé (fallback `DEFAULT_POST_LOGIN_URL`) |
| Open redirect bloqué (même origine) | ✅ confirmé (`return-url.spec.ts`, 35+ cas + e2e) |
| Tests Vitest AuthGuard avec `returnUrl` | ✅ confirmé (`auth.guard.spec.ts`) |
| Priorité query param > session Angular | ✅ confirmé (test dédié « query param ET session… le query param gagne ») |
| Non-persistance au-delà de la tentative | ✅ confirmé (`clear()` appelé systématiquement dans `resolveTarget`, test dédié) |
| Route inexistante → `/home` | ✅ confirmé (`app.routes.spec.ts`) — via route wildcard `**`, pas via validation explicite de la cible avant redirection |
| `returnUrl` relative interne uniquement | ✅ confirmé (`return-url.spec.ts`) |
| Indicateur si résolution > 500 ms | ✅ confirmé (`route-loading.component.spec.ts`) |
| Spinner `role="status"` + `aria-label` annoncé | ✅ confirmé (test A11y dédié) |

Les 11 AC sont explicitement tracés dans le breakdown Gate 4 (review du 2026-07-03) avec un
fichier de test associé à chacun — aucun AC non couvert.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.1.3 — Rester connecté (remember-me) | Même fichier `login.component.ts`, livré en amont dans `core#67`/`ui#11` — ne touche pas au mécanisme de redirection post-login |
| US01.1.5 — Expiration de session (front) + auto-logout | Branche sœur non mergée sur `main` au moment de cette PR — duplication signalée (voir ci-dessous) |

## Duplication signalée avec US01.1.5 (non bloquante pour ce merge)

Le Gate 4 relève une duplication fonctionnelle : `src/app/core/auth/return-url.ts` (introduit par
cette US) et `src/app/core/auth/util/return-url.ts` (branche sœur US01.1.5, non mergée au moment
de cette PR) implémentent la même protection open redirect sous des noms/chemins différents.
Aucune des deux branches ne pouvant dépendre d'une branche sœur non mergée, la duplication n'a pas
été résolue au moment du merge de `ui#64` — signalée pour réconciliation (garder une seule
implémentation partagée, migrer les imports) lors du merge des deux US. Non traité rétroactivement
dans ce figeage Gate 5 : à vérifier lors du figeage de US01.1.5.

## Hors périmètre (explicitement exclu)

- Réconciliation `return-url.ts` / `util/return-url.ts` avec US01.1.5 — signalée, pas résolue à ce
  stade (dépend de l'état de la branche sœur au moment considéré)
- Log de sécurité applicatif dédié sur tentative de `returnUrl` invalide/malveillante — le
  comportement observé est un fallback silencieux vers `/home`, aucun mécanisme de journalisation
  spécifique n'a été ajouté dans cette PR
- Liste blanche explicite de routes valides consultée en amont de la redirection — l'AC "route
  inexistante → /home" est couvert via la route wildcard `**` du routeur, pas par une validation
  positive de la cible avant navigation
