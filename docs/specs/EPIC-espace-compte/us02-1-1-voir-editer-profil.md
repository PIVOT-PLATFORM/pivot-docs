# US02.1.1 — Voir et éditer son profil

## Contexte

- **US** : `docs/backlog/EPIC-espace-compte/FEATURES/profil-utilisateur/us-voir-editer-profil.md`
  (F02.1 — Profil utilisateur, EPIC-espace-compte, module `auth`)
- **PR backend** : `pivot-core` [#129](https://github.com/PIVOT-PLATFORM/pivot-core/pull/129)
  (`feat/us02-1-1-voir-editer-profil`) — mergée le 2026-07-05
- **PR frontend** : `pivot-ui` [#71](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/71)
  (`feat/us02-1-1-voir-editer-profil`) — mergée le 2026-07-06, basée sur le contrat de #129
- **Dernier commit au moment du figeage** : `4483481` (`pivot-core`, tête de PR au merge) ·
  `7aed5f5` (`pivot-ui`, tête de PR au merge, après les 2 correctifs de convergence décrits
  ci-dessous)
- **Gate 2 COVERAGE** : `pivot-core` self-évalué 92/100 (JaCoCo `fr.pivot.account.*` :
  96,1 % instructions / 84,7 % branches / 93,8 % lignes, 58 tests) — SonarCloud 91,0 % coverage
  new code · `pivot-ui` self-évalué 92/100 (`profile.component.ts` 95,7 % stmts / 85,2 % branches,
  `profile.model.ts` 100 %) — SonarCloud 93,9 % coverage new code
- **Gate 4 MERGE_CONFIDENCE** : `pivot-core` **100/100** (convergence après 1 itération : fix
  casse insensible sur la détection du champ `email`, rebase sur `main`) · `pivot-ui` **94/100**
  au dernier passage (review indépendante post-merge du backend, 2 correctifs de convergence —
  voir § Écarts)
- **Dépend de** : aucune dépendance backend nouvelle hors `pivot-core` lui-même ; consommé
  ensuite par `us-menu-utilisateur.md` (US16.1.2, lien "Profil" du menu utilisateur, câblé
  après coup vers `/account/profile` — voir `docs/specs/EPIC-shell-ux/us16-1-2-menu-utilisateur.md`)

---

## Spec fonctionnelle

### Backend (`pivot-core`) — `AccountController` / `ProfileService` / `AvatarStorageService`

- `GET /api/account/profile` : résout l'utilisateur exclusivement depuis
  `SecurityContextHolder` (jamais d'identifiant en entrée) et retourne
  `{firstName, lastName, email, avatarUrl}` ; `avatarUrl` vaut `null` si aucun avatar n'a jamais
  été défini.
- `PATCH /api/account/profile` : accepte uniquement `{firstName, lastName}`. Toute clé `email`
  présente dans le body — **insensible à la casse** (`"email"`, `"Email"`, `"EMAIL"`…) — déclenche
  un `400 EMAIL_CHANGE_NOT_ALLOWED`. Les deux champs sont obligatoires, non vides après trim, et
  strippés de tout HTML avant persistance (`HtmlStripper`, implémentation maison en O(n) pour
  éviter un ReDoS sur un regex `<[^>]*>` naïf).
- `POST /api/account/profile/avatar` : multipart, un seul part `file`. Format vérifié par
  **sniffing des magic bytes** du contenu (pas par le `Content-Type` déclaré, non spoofable) —
  JPEG/PNG/WEBP acceptés, 2 Mo max. Stockage filesystem local
  (`pivot.storage.avatars.base-path`, défaut `./data/avatars`, override
  `PIVOT_AVATAR_STORAGE_PATH`), un sous-dossier par tenant, nom de fichier UUID aléatoire
  (jamais dérivé de `userId`). Chaque nouvel upload génère une nouvelle URL et supprime
  l'ancien fichier (suppression protégée contre le path traversal, testée explicitement).
- Les avatars sont servis en lecture publique non authentifiée sous
  `GET /api/avatars/{tenantId}/{uuid}.{ext}` (ressource statique Spring MVC, cache 1h) — choix
  documenté et assumé (nom de fichier UUID non énumérable, image non sensible), permet un simple
  `<img src="{avatarUrl}">` sans en-tête d'autorisation.

### Frontend (`pivot-ui`) — `ProfileComponent` / `ProfileService`

- `ProfileComponent` (standalone, `OnPush`) : formulaire réactif prénom/nom
  (`Validators.required`, `maxLength(100)`), avatar avec repli sur les initiales
  (`profileInitials()`, dupliqué intentionnellement depuis `NavbarComponent.initials()` — cf.
  convention déjà établie pour `passwordsMatch` dans `register.component.ts`), toute la
  communication HTTP déléguée à `ProfileService` (aucun state caché côté service, state local
  géré par signals : `profile`, `loading`, `saving`, `saveError`, `avatarError`,
  `avatarUploading`).
- Bouton "Enregistrer" désactivé + spinner pendant la sauvegarde (`saving()`) et tant qu'aucun
  changement n'a été détecté (`hasChanges()`).
- Erreur réseau sur le PATCH → toast d'erreur localisé FR/EN (`account.profile.error_save_generic`).
- Formulaire : `<label>` explicite via `for`/`id`, erreurs annoncées via `aria-describedby` +
  `role="alert"`, focus renvoyé automatiquement sur le premier champ invalide
  (`focusFirstInvalidField()`, prénom avant nom) après une tentative de soumission invalide.
- Champ `email` affiché en lecture seule uniquement (jamais éditable, jamais inclus dans le body
  du PATCH — vérifié explicitement en test : `Object.keys(body)).toEqual(['firstName','lastName'])`).
- Toutes les chaînes (labels, placeholders, messages succès/erreur) sous les clés i18n
  `account.profile.*` dans `fr.json`/`en.json`.
- Route `/account/profile`, lazy-loaded, protégée par le `authMatchGuard` déjà appliqué au
  parent (pas de trou d'auth) ; le lien "Mon profil" du menu utilisateur (jusqu'ici un stub
  "bientôt disponible", voir US16.1.2) est câblé vers cette route.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `pivot-core` `src/main/java/fr/pivot/account/controller/AccountController.java` | GET/PATCH profil, POST avatar — résolution identité via `SecurityContextHolder` uniquement |
| `pivot-core` `src/main/java/fr/pivot/account/service/ProfileService.java` | Validation (longueur, obligatoire), délégation strip HTML, orchestration avatar |
| `pivot-core` `src/main/java/fr/pivot/account/service/AvatarStorageService.java` | Stockage filesystem, sniffing magic-bytes, suppression protégée path traversal |
| `pivot-core` `src/main/java/fr/pivot/account/util/HtmlStripper.java` | Strip HTML en O(n), anti-ReDoS |
| `pivot-core` `src/main/java/fr/pivot/account/dto/{ProfileDto,ProfileUpdateRequest}.java` | Contrat API — jamais l'entité `User` exposée |
| `pivot-core` `src/main/java/fr/pivot/account/exception/*.java` | Exceptions métier typées (`EmailFieldNotAllowedException`, `InvalidAvatarFormatException`, `AvatarTooLargeException`, `InvalidProfileNameException`, `AvatarStorageException`) |
| `pivot-core` `src/main/java/fr/pivot/account/config/{AvatarStorageProperties,AvatarWebConfig}.java` | Config chemin de stockage + route statique publique `/avatars/**` |
| `pivot-ui` `src/app/features/account/profile/profile.service.ts` + `.model.ts` | Contrat HTTP, types, `profileInitials()` |
| `pivot-ui` `src/app/features/account/profile/profile.component.{ts,html,scss}` | Écran édition profil |
| `pivot-ui` `src/app/app.routes.ts` | Route `/account/profile` |
| `pivot-ui` `src/app/core/layout/navbar/navbar.component.ts` | Câblage du lien "Mon profil" vers la route réelle |
| `pivot-ui` `public/assets/i18n/{fr,en}.json` | Clés `account.profile.*` |

### Endpoints

```text
GET /api/account/profile
→ 200 { firstName, lastName, email, avatarUrl|null }
→ 401 Unauthorized (pas de token / token invalide)

PATCH /api/account/profile
Body: { firstName, lastName }   # jamais "email" (toute casse) → 400 EMAIL_CHANGE_NOT_ALLOWED
→ 200 { firstName, lastName, email, avatarUrl|null }   (HTML strippé)
→ 400 INVALID_NAME | EMAIL_CHANGE_NOT_ALLOWED
→ 401 Unauthorized

POST /api/account/profile/avatar   (multipart/form-data, part "file")
→ 200 { ...profil avec nouvel avatarUrl }
→ 400 AVATAR_INVALID_FORMAT | AVATAR_TOO_LARGE
→ 401 Unauthorized

GET /api/avatars/{tenantId}/{uuid}.{ext}   (public, non authentifié, cache 1h)
```

---

## Écarts vs AC initiaux / vs contrat initialement documenté (divergences réelles, non gommées)

| AC / contrat initial | Réalité vérifiée | Statut |
|---|---|---|
| Contrat documenté dans la description de `pivot-core#129` : "403 Forbidden — pas de token / token invalide" sur `GET/PATCH /api/account/profile` | Le code réel (`AccountController`) renvoie **401 Unauthorized**, pas 403, sur ces deux endpoints. Repéré et corrigé côté `pivot-ui` (commit de convergence `819f299`) : `profile.model.ts`/`profile.service.ts`/`profile.service.spec.ts` documentaient et testaient un 403 hérité par erreur du reste de l'app. Sans impact fonctionnel réel — `tokenInterceptor` traite déjà tout 401 hors `/auth/` comme une expiration de session — mais la documentation du contrat API dans la PR backend elle-même est inexacte sur ce point précis. | Corrigé côté frontend avant merge ; la description de `pivot-core#129` reste, elle, non corrigée (403 y est toujours écrit) |
| AC "PATCH rejette le champ `email`" | Implémentation initiale : `body.containsKey("email")`, sensible à la casse — une clé `"Email"` contournait le rejet explicite (sans permettre de modifier réellement l'email, seuls `firstName`/`lastName` étant lus). Corrigé en convergence Gate 4 (`body.keySet().stream().anyMatch("email"::equalsIgnoreCase)`), avec tests TU + TI dédiés à la casse différente, **avant** le merge sur `main`. | Corrigé avant merge — code mergé sur `main` est déjà la version insensible à la casse |
| TSDoc de `profile.model.ts`/`profile.component.ts` (version intermédiaire, avant merge) | Référençait `change-password.component.ts`/`ChangePasswordComponent` (US02.2.1) comme précédent de justification de design — fichier absent de `main` et de l'historique de la branche à ce stade (US02.2.1 non mergée). Corrigé (commit `779e5ec`) pour référencer `passwordsMatch` de `register.component.ts`, réellement présent. | Corrigé avant merge |
| Tests E2E Playwright (mentionnés dans les Notes de livraison du backlog) | Différés dans les deux PR — environnement E2E indisponible au moment de l'implémentation. Autorisé explicitement par le workflow pivot-docs ("E2E différable"), non compté comme un gap de score Gate 4, mais reste un suivi ouvert avant `Stage: Done`. | Non implémenté — dette assumée et documentée, pas un oubli silencieux |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US02.2.2 — Modification email | Explicitement hors périmètre ici ; le rejet 400 `EMAIL_CHANGE_NOT_ALLOWED` sur le champ `email` est le point d'ancrage contractuel entre les deux US |
| US02.1.2 — Préférence de langue | Hors périmètre ici, US sœur dans la même FEATURE `profil-utilisateur` |
| US16.1.2 — Menu utilisateur (`pivot-ui` PR #49) | Le lien "Profil" du dropdown, laissé en stub `aria-disabled` par #49, est câblé vers la route réelle `/account/profile` par cette US (voir `docs/specs/EPIC-shell-ux/us16-1-2-menu-utilisateur.md`, § Écarts) |
| US02.2.4 — Suppression de compte | Hors périmètre ici |

## Hors périmètre (explicitement exclu)

- Modification de l'adresse email (→ US02.2.2)
- Préférence de langue (→ US02.1.2)
- Suppression de compte (→ US02.2.4)
- Tests E2E Playwright (différés — voir § Écarts)
- Autorisation par spectateur sur les avatars (route `/avatars/**` publique en lecture, choix
  assumé tant qu'aucun besoin de confidentialité par image n'est exprimé)
