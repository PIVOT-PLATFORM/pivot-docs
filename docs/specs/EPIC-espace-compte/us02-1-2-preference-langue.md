# US02.1.2 — Préférence de langue

## Contexte

- **US** : `docs/backlog/EPIC-espace-compte/FEATURES/profil-utilisateur/us-preference-langue.md`
  (F02.1 — Profil utilisateur, EPIC-espace-compte E02)
- **PR backend** : `pivot-core` [#130](https://github.com/PIVOT-PLATFORM/pivot-core/pull/130)
  (`feat(api): préférence de langue du profil (US02.1.2)`) — merged `2026-07-05`, stackée sur
  `pivot-core` #129 (US02.1.1, mergée en amont)
- **PR frontend** : `pivot-ui` [#72](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/72)
  (`feat(ui): US02.1.2 — Préférence de langue`) — merged `2026-07-06`, stackée sur `pivot-ui` #71
  (US02.1.1, mergée en amont)
- **Gate 4 MERGE_CONFIDENCE (PR #130)** : 100/100 (2ᵉ passage, 97/100 au 1ᵉʳ) — MERGE_AUTONOMOUS
- **Gate 4 MERGE_CONFIDENCE (PR #72)** : 100/100 (3ᵉ passage — 93/100 puis 96/100 puis 100/100
  après rebase sur `main` post-#71) — MERGE_AUTONOMOUS
- **Gate 2 COVERAGE** : `pivot-core` 98/100 puis 100/100 auto-évalué · `pivot-ui` 91.94 % stmts /
  92.66 % branches (SonarCloud : 84.1 % coverage sur le nouveau code, Quality Gate passed)
- **Dépend de** : US02.1.1 — Voir et éditer son profil (`pivot-core` #129, `pivot-ui` #71, toutes
  deux mergées avant que #130/#72 ne sortent de Draft)

---

## Spec fonctionnelle

### Backend — `PATCH`/`GET /account/profile` (pivot-core, PR #130)

- Le champ `preferredLanguage` (`"fr"` | `"en"`) est exposé en lecture/écriture sur
  `/account/profile`, **sans nouvelle colonne** : réutilisation de la colonne `users.locale`
  existante (V1), déjà utilisée pour la localisation des emails transactionnels
  (`EmailService.toLocale`). L'invariant applicatif déjà en place (`RegisterRequest`
  `@Pattern("^(fr|en)$")`) est promu en contrainte BDD `chk_users_locale`.
- `PATCH` : champ optionnel — absent du body ⇒ no-op (langue inchangée, jamais un rejet) ; valeur
  fournie **insensible à la casse** (`FR`/`En`/`fr` tous acceptés, normalisés en minuscule avant
  persistance) ; valeur invalide (`"de"`, `""`, `"french"`) ⇒ rejet explicite `400
  INVALID_PREFERRED_LANGUAGE`, jamais silencieusement ignorée ni défaultée ; une valeur JSON
  non-string (nombre, tableau) est traitée comme absente (no-op), comportement cohérent avec
  `firstName`/`lastName` et couvert par un test dédié depuis le 2ᵉ passage Gate 4.
- `GET` : `preferredLanguage` toujours présent dans la réponse, jamais `null`.
- **Login** (`POST /auth/login`, `/auth/google`, `/auth/oidc/exchange`, restore-session) :
  `AuthResponse.UserInfo.preferredLanguage` exposé via `UserMapper.toUserInfo`, pour que le
  frontend applique la langue Transloco immédiatement après connexion sans `GET
  /account/profile` séparé.

### Frontend — synchronisation et sélecteurs (pivot-ui, PR #72)

- **`LanguagePreferenceService`** (`core/i18n`) — point d'entrée unique du changement de langue
  en session authentifiée : bascule optimiste (Transloco + `localStorage`), `PATCH
  /account/profile` en arrière-plan, toast de confirmation rendu dans la nouvelle langue, et
  **revert + toast d'erreur** en cas d'échec réseau ou 4xx. Appelle `HttpClient.patch(...)`
  directement plutôt que de passer par `ProfileService` (`features/account/profile`), pour éviter
  une dépendance `core → features` — décision documentée en TSDoc, validée implicitement par les
  Gate 4 successifs (aucune déduction sur ce point au 3ᵉ passage).
- **`LanguageSyncService`** (`core/i18n`) — `effect()` sur `AuthService.currentUser()`, appelle
  `applyFromServer()` à chaque changement d'utilisateur courant (login, Google, OIDC, device-OTP,
  restauration de session) : la valeur BDD écrase inconditionnellement le `localStorage` si
  différente (règle de conflit de l'AC). Construit via `provideAppInitializer` dans
  `app.config.ts`, donc actif avant le premier rendu.
- **Navbar** — `NavbarComponent.setLang()` délègue à `LanguagePreferenceService.saveAndApply()`
  si authentifié (PATCH serveur + localStorage) ; comportement local inchangé si anonyme (aucun
  appel `/account/*`).
- **Page profil** — `<select>` natif (`aria-label="Langue préférée"`, `aria-selected` sur
  l'option courante), lié au signal Transloco actif global (pas à `profile().preferredLanguage`)
  pour bénéficier du revert automatique en cas d'échec.
- **i18n** — clés `account.preferences.*` symétriques `fr.json`/`en.json`.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-core`, PR #130)

| Fichier | Rôle |
|---|---|
| `src/main/resources/db/migration/V8__users_locale_check_constraint.sql` | Contrainte `CHECK (locale IN ('fr','en'))` sur `users` |
| `src/main/java/fr/pivot/account/controller/AccountController.java` | `PATCH`/`GET /account/profile` — transmission de `preferredLanguage` |
| `src/main/java/fr/pivot/account/dto/ProfileDto.java` / `ProfileUpdateRequest.java` | Champ `preferredLanguage` |
| `src/main/java/fr/pivot/account/service/ProfileService.java` | `normalizeLanguage` — validation, insensibilité à la casse, no-op si absent |
| `src/main/java/fr/pivot/account/exception/InvalidPreferredLanguageException.java` | Nouvelle exception → 400 `INVALID_PREFERRED_LANGUAGE` |
| `src/main/java/fr/pivot/auth/entity/User.java` | Javadoc `locale` réutilisé comme `preferredLanguage` |
| `src/main/java/fr/pivot/auth/dto/AuthResponse.java`, `auth/mapper/UserMapper.java` | `UserInfo.preferredLanguage`, mapping depuis `User.locale` |
| `src/test/java/fr/pivot/auth/mapper/UserMapperTest.java` | Ajouté au 2ᵉ passage Gate 4 — ferme le gap "mapping non testé avec locale non-défaut" |
| `AccountControllerTest`, `AccountProfileIntegrationTest`, `ProfileServiceTest` | TU/TI par AC (`ac0212_*`), dont cas casse, no-op, rollback sur valeur invalide |

### Fichiers introduits / modifiés (`pivot-ui`, PR #72)

| Fichier | Rôle |
|---|---|
| `src/app/core/i18n/language-preference.service.ts` (+ spec) | Service de bascule optimiste + PATCH + revert-on-failure |
| `src/app/core/i18n/language-sync.service.ts` (+ spec) | Synchronisation login/session-restore → applique la langue serveur |
| `src/app/core/i18n/language.ts` | Type `SupportedLanguage`, partagé `core`/`features` sans inverser le sens de dépendance |
| `src/app/core/i18n/testing/local-storage-stub.ts` | Polyfill de test scope-limité — effet de bord : corrige `navbar.component.spec.ts`, précédemment cassé |
| `src/app/app.config.ts` | `provideAppInitializer` pour `LanguageSyncService` |
| `src/app/core/auth/service/auth.service.ts` | Point de funnel `storeAuth()` consommé par `LanguageSyncService` |
| `src/app/core/layout/navbar/navbar.component.ts` (+ spec) | `setLang()` → `LanguagePreferenceService` si authentifié |
| `src/app/features/account/profile/profile.component.html/.ts` (+ spec) | `<select>` natif, ARIA, clavier |
| `src/app/features/account/profile/profile.model.ts` | `ProfileDto`/`UserInfo` étendus (`preferredLanguage`) |
| `public/assets/i18n/en.json`, `fr.json` | Clés `account.preferences.*` |

### Endpoints / modèles / contrats techniques pertinents

| Aspect | Valeur |
|---|---|
| Champ `PATCH`/`GET /account/profile` | `preferredLanguage` (optionnel en écriture, toujours présent en lecture) |
| Champ login (`/auth/login`, `/auth/google`, `/auth/oidc/exchange`, restore-session) | `user.preferredLanguage` sur `AuthResponse` |
| Valeurs valides | `"fr"` \| `"en"` — minuscules en sortie, insensible à la casse en entrée |
| Erreur | `400 {"error":"INVALID_PREFERRED_LANGUAGE"}` |
| Défaut à l'inscription | `"fr"` (inchangé, US02.1.1/US-AUTH) |

---

## Écarts vs AC initiaux / vs plan pré-écrit

- **Décision d'architecture BDD non actée formellement** : le champ `preferredLanguage` demandé
  par l'US ("sauvegardé en BDD sur l'entité User") a été implémenté en réutilisant la colonne
  `locale` existante plutôt qu'en créant une colonne dédiée, pour éviter une double source de
  vérité avec `EmailService.toLocale`. Décision documentée dans le code et les PR, mais explicitement
  signalée par l'auteur comme "à valider par le mainteneur" (backlog + corps de PR #130) — aucune
  validation formelle du mainteneur retrouvée dans les commentaires de PR au moment du figeage.
- **Numéro de migration divergent de la description de PR** : le corps de PR #130 annonce la
  contrainte `chk_users_locale` comme portée par une migration `V4`, mais le fichier réellement
  mergé est `V8__users_locale_check_constraint.sql` — la description n'a pas été mise à jour après
  un rebase ayant renuméroté les migrations (probablement dû aux migrations introduites par
  d'autres US mergées entre-temps). Sans impact fonctionnel, la contrainte est bien celle décrite.
- **Convention `LanguagePreferenceService` vs `ProfileService` (pivot-ui)** : la PR #72 crée un
  second point d'entrée HTTP vers `/account/profile` (`LanguagePreferenceService` appelle
  `HttpClient` directement au lieu de passer par `ProfileService`). Ce point a été explicitement
  signalé par l'auteur comme nécessitant une validation de convention par le mainteneur dans les
  deux premiers passages Gate 4 (score 93 puis 96/100) ; le 3ᵉ passage (100/100, post-rebase) ne
  déduit plus aucun point sur ce sujet mais ne documente pas non plus de validation mainteneur
  explicite — traité en pratique comme accepté, sans trace écrite d'un arbitrage.
- **AC "opérable au clavier (Tab, Enter, flèches directionnelles)"** : couvert uniquement par un
  test de non-régression (absence de `tabindex` custom / de `preventDefault` sur `keydown`), pas
  par une simulation réelle d'un changement de valeur au clavier — `jsdom` n'implémente pas ce
  comportement natif du `<select>`. Seule une exécution Playwright réelle en navigateur pourrait
  l'exercer bout-en-bout ; aucune spec Playwright n'a été écrite pour cette US (différé,
  conformément à la règle "E2E différable" du workflow).
- **Gap backend initial comblé en cours de Gate 4** : le 1ᵉʳ passage Gate 4 de PR #130 (97/100)
  signalait qu'aucun test n'exerçait `UserMapper.toUserInfo` avec une valeur de `locale`
  non-défaut (`en`) — fermé au 2ᵉ passage par l'ajout de `UserMapperTest` (3 tests), sans
  modification de code de production.
- **Effet de bord positif (pivot-ui)** : le stub `localStorage` ajouté pour les tests de cette US
  (`core/i18n/testing/local-storage-stub.ts`) a corrigé au passage un test préexistant cassé
  (`navbar.component.spec.ts`), documenté dans le backlog dès la livraison initiale.
- **Rebase tardif de PR #72** : restée en Draft près de 24h en attendant le merge de #71
  (US02.1.1) et de `pivot-core` #130 ; le rebase final sur `main` a nécessité de résoudre des
  conflits add/add et a révélé/corrigé au passage un vrai bug de documentation (TSDoc de
  `profile.model.ts` affirmant "403 si non authentifié" alors que `AccountController.java` renvoie
  401) ainsi qu'une clé JSON `"account"` dupliquée en tête de `en.json`/`fr.json` (bug de fusion
  pré-existant sur `main`, non spécifique à cette US).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US02.1.1 — Voir et éditer son profil | Dépendance directe — `pivot-core` #130 et `pivot-ui` #72 sont toutes deux stackées sur les branches de US02.1.1 (#129/#71) ; `AccountController`/`ProfileService`/`ProfileDto` côté back et la page `/account/profile` côté front sont introduits par US02.1.1 et étendus ici. |
| US16.4.1 — Sélection et persistance du thème utilisateur | Spec `docs/specs/EPIC-shell-ux/us16-4-1-theme-clair-sombre.md` : mécanisme de persistance `localStorage` similaire côté frontend, sujet fonctionnel différent (thème, pas langue), pas de code partagé. |

## Hors périmètre (explicitement exclu)

- Détection automatique de la langue navigateur pour un utilisateur non connecté — comportement
  existant, non modifié par cette US.
- Spec Playwright e2e dédiée (langue) — différée, conformément à la règle "E2E différable" du
  workflow ; couverture Vitest/JUnit jugée suffisante par les Gate 4 successifs.
- Validation mainteneur explicite des deux décisions d'architecture signalées ci-dessus (réutilisation
  de `locale`, second point d'entrée HTTP `LanguagePreferenceService`) — restent ouvertes au moment
  du figeage de cette spec.
