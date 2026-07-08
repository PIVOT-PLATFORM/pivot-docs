# US01.1.2 — Déconnexion

## Contexte

- **US** : `docs/backlog/EPIC-auth-iam/FEATURES/login-email-password/us-deconnexion.md` (F01.1 — Connexion email/password, EPIC-auth-iam E01)
- **PR backend** : `pivot-core` [#67](https://github.com/PIVOT-PLATFORM/pivot-core/pull/67) — `feature/auth` (US-AUTH-002, réécriture complète de l'authentification — login, logout, MFA, OIDC, Google)
- **PR frontend** : `pivot-ui` [#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11) — `feature/auth` (implémentation initiale `AuthService.logout()` + bouton dans le menu utilisateur)
- **PR frontend complémentaire** : `pivot-ui` [#49](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/49) — `feat(ui): redesign shell and navbar` (déplace le bouton de déconnexion dans le nouveau dropdown avatar de la navbar redessinée — logique inchangée)
- **Dernier commit au moment du figeage** : `pivot-core` `682edd1` · `pivot-ui` `87a1196` (PR #11), `pivot-ui` PR #49 fusionnée après (navbar redessinée)
- **Gate 4 `pivot-core` PR#67** : 78/100 — `VALIDATE_WITH_HUMAN` (hard block `security` + `modif_systeme_oidc_roles`, validation humaine explicite requise — approuvée, cf. commentaire de review du mainteneur sur la PR)
- **Gate 4 `pivot-ui` PR#11 (final)** : 82/100 — merge documenté autorisé (score initial 68/100, corrections Red→Blue Team appliquées au commit `7730260` : headers de sécurité `nginx.conf`, `prodMode`, styles inline)
- **Dépend de** : US01.1.1 — Connexion email/password (même PR d'implémentation backend et frontend — login et logout livrés ensemble comme un seul module auth)

---

## Spec fonctionnelle

### Déconnexion — comportement réellement livré

Un seul token opaque de session (256-bit, SecureRandom, haché SHA-256 en base) sert à la fois de
cookie `HttpOnly`/`Secure`/`SameSite=Strict` (`pivot_session`, path `/api/auth`) posé par le
backend à la connexion, et de valeur gardée **en mémoire** côté frontend (signal Angular, jamais
`localStorage`) pour l'en-tête `Authorization: Bearer` des appels API authentifiés.

1. **Déclenchement** — clic sur "Déconnexion" dans le dropdown du menu utilisateur de la navbar
   (`NavbarComponent`, avatar en haut à droite).
2. **Frontend** — `AuthService.logout()` appelle `POST /api/auth/logout` avec `withCredentials: true`
   (nécessaire pour que le cookie `pivot_session` parte avec la requête, seul moyen pour le backend
   de retrouver le token à révoquer côté serveur), puis, dans tous les cas (succès ou erreur réseau),
   vide l'état d'authentification en mémoire et redirige vers `/auth/login`.
3. **Backend** — `AuthController.logout()` lit le cookie via `CookieHelper.extractSessionCookie`,
   délègue à `SessionService.logout(rawToken)` → `TokenService.revokeByRawToken()` qui bascule la
   ligne `access_tokens` correspondante de `ACTIVE` à `REVOKED` (`revoked_at` horodaté), puis
   `CookieHelper.clearSessionCookie()` renvoie le cookie avec `Max-Age=0`. Réponse `204 No Content`.
   Le logout est **silencieux et idempotent** : cookie absent ou token déjà révoqué → no-op, jamais
   d'erreur renvoyée au client (`TokenService.revokeByRawToken` retourne simplement sans effet si le
   token n'est pas trouvé en statut `ACTIVE`).
4. **Révocation effective** — `TokenService.validate()` (utilisé par `TokenAuthenticationFilter` sur
   chaque requête protégée) ne matche que les tokens en statut `ACTIVE` ; un token révoqué renvoie
   donc `Optional.empty()`, aucune authentification n'est établie, la requête protégée suivante
   échoue en 401.
5. **A11y** — le bouton est un `<button type="button" role="menuitem">` natif dans le dropdown
   (`navbar__dropdown-item--danger`), donc focusable/activable au clavier nativement (Tab + Entrée/
   Espace), avec un style `:focus-visible` dédié (`outline: 2px solid var(--color-brand-500)`).

### Divergences par rapport aux ACs pré-écrits

- **Audit non journalisé** : la constante `AuditService.LOGOUT = "auth.logout"` existe dans le code
  mais n'est **jamais invoquée** — `SessionService.logout()` se contente d'un `LOG.info("event=LOGOUT")`
  applicatif (log technique, pas une ligne dans la table `audit_events`). Contrairement à
  `login`/`register`, l'événement de déconnexion n'est donc pas traçable dans l'audit trail RGPD/
  sécurité actuel. Écart non bloquant mais réel — à lever si l'audit trail doit un jour couvrir le
  logout (ticket de suivi à créer si jugé nécessaire).
- **Clés i18n hors du namespace attendu** : l'AC prévoyait des clés dans l'espace `auth.logout.*`.
  Le libellé du bouton livré (PR ui#49) vit dans `nav.dropdown.logout` (`fr.json`/`en.json` :
  "Déconnexion"/"Sign out") — cohérent avec le reste des libellés de la navbar (`nav.dropdown.*`),
  mais **pas** dans le namespace `auth.*` prévu par l'US. C'est la raison pour laquelle cette ligne
  d'AC reste ⬜ dans le backlog : le comportement existe et fonctionne, mais pas au chemin i18n
  spécifié à l'origine.
- **Pas de confirmation avant déconnexion** : aucun dialogue de confirmation — clic = déconnexion
  immédiate. Conforme à l'esprit de l'US (le champ "confirmation éventuelle" de l'AC i18n restait
  au conditionnel) mais à noter explicitement : aucune US adjacente ne l'implémente non plus.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Repo | Rôle |
|---------|------|------|
| `src/main/java/fr/pivot/auth/controller/AuthController.java` | pivot-core | `POST /api/auth/logout` → 204, orchestre extraction cookie + révocation + clear cookie |
| `src/main/java/fr/pivot/auth/service/SessionService.java` | pivot-core | `logout(String rawCookieToken)` — délègue à `TokenService`, log applicatif |
| `src/main/java/fr/pivot/auth/service/TokenService.java` | pivot-core | `revokeByRawToken()` (passe `ACTIVE` → `REVOKED`) ; `validate()` (filtre `status=ACTIVE`) |
| `src/main/java/fr/pivot/config/CookieHelper.java` | pivot-core | `extractSessionCookie()` / `clearSessionCookie()` — cookie `pivot_session`, path `/api/auth`, `SameSite=Strict` |
| `src/main/java/fr/pivot/config/TokenAuthenticationFilter.java` | pivot-core | Authentifie chaque requête via `Authorization: Bearer`, ignore les tokens non `ACTIVE` |
| `src/app/core/auth/service/auth.service.ts` | pivot-ui | `logout(): Observable<void>` — `POST /auth/logout` (`withCredentials: true`), vide l'état, redirige `/auth/login` |
| `src/app/shared/navbar/navbar.component.ts` (PR ui#49, remplace le `user-dropdown` initial de PR ui#11) | pivot-ui | Bouton "Déconnexion" dans le dropdown avatar, `(click)="logout()"` |
| `public/assets/i18n/fr.json` / `en.json` | pivot-ui | Clé `nav.dropdown.logout` (pas `auth.logout.*`, cf. divergences) |

### Endpoints / modèles / contrats techniques pertinents

- `POST /api/auth/logout` — public au sens Spring Security (pas de garde explicite avant filtre),
  mais nécessite le cookie `pivot_session` pour avoir un effet ; réponse `204 No Content` dans tous
  les cas (idempotent, ne fuite jamais si un token était déjà invalide/absent).
- Table `access_tokens` (schéma `public`, `V1__schema_init.sql`) : colonnes `status`
  (`ACTIVE`/`REVOKED`/…) et `revoked_at` — la révocation logout est une mise à jour de ces deux
  colonnes, pas une suppression de ligne.
- Le même token brut sert de valeur de cookie **et** de Bearer token — un seul mécanisme de
  révocation (`TokenService.revokeByRawToken`) invalide donc les deux usages simultanément.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.1.1 — Connexion email/password | Même PR d'implémentation (`pivot-core` #67, `pivot-ui` #11) — login pose le cookie + retourne le token en mémoire, logout défait exactement cet état |
| US01.1.5 — Expiration de session (auto-logout) | PR `pivot-ui` [#63](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/63) — réutilise `AuthService.logout()` en interne pour l'auto-déconnexion à expiration, sans dupliquer la logique |
| US01.4.3a — Alerte connexion suspecte | Le flux "Ce n'était pas moi" révoque **toutes** les sessions actives de l'utilisateur — mécanisme de révocation en masse distinct de `revokeByRawToken()` (un seul token) utilisé ici |

## Hors périmètre (explicitement exclu)

- Déconnexion globale multi-appareils (révocation de toutes les sessions d'un coup) — traitée par
  US01.4.3a (flux "Ce n'était pas moi") et par la gestion de sessions actives (US02.2.3), pas par
  cette US.
- Journalisation de l'événement `auth.logout` dans `audit_events` — constante définie mais non
  câblée (cf. divergences).
- Dialogue de confirmation avant déconnexion.
- Clés i18n dans le namespace `auth.logout.*` tel que spécifié à l'origine (livré sous
  `nav.dropdown.logout` à la place).
