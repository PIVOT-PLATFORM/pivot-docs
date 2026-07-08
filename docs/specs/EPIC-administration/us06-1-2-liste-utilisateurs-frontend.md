# US06.1.2 — Admin liste les utilisateurs de son tenant (Angular)

## Contexte

- **US** : `docs/backlog/EPIC-administration/FEATURES/gestion-utilisateurs/us-liste-utilisateurs-frontend.md`
  (F06.1 — Gestion des utilisateurs, EPIC-administration)
- **PR** : `pivot-ui` [#82](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/82)
  (`feat/us06-1-2-liste-utilisateurs-frontend`) — **mergée**
- **Dernier commit au moment du figeage** : commit de merge `mergedAt` 2026-07-06T02:56:06Z
- **Gate 4 MERGE_CONFIDENCE** : 100/100 — MERGE_AUTONOMOUS (revue `ApoSkunz`, 2026-07-06). Une
  seconde revue rétrospective a été postée après coup par cet agent lui-même (score 96/100) sans
  savoir que la PR était déjà mergée sur la base d'une revue à 100/100 — traitée comme du bruit de
  process, pas comme un score alternatif à retenir (voir § Écarts).
- **Dépend de** : US06.1.1 (`GET /api/admin/users`, contrat pagination Spring `Page`,
  `pivot-core` PR [#127](https://github.com/PIVOT-PLATFORM/pivot-core/pull/127) — mergée avant le
  merge de cette PR, contrat vérifié directement dans le code, pas seulement dans la description).
- **US sœurs empilées sur cette branche** : US06.1.3 (`pivot-ui` #84) et US06.1.4/US06.1.5
  (`pivot-ui` #85) — toutes deux déjà mergées au moment du figeage de cette spec, sans modification
  requise du périmètre US06.1.2.

---

## Spec fonctionnelle

### `AdminUsersComponent` (`/admin/users`)

Route `/admin/users`, lazy-loaded (`loadComponent`), sous le shell authentifié, gardée par
`adminGuard` (réutilisé tel quel, pas de guard dédié créé pour cette US) — tout utilisateur non
`ROLE_ADMIN` est redirigé vers `/home`.

Le composant affiche un tableau HTML natif (pas de composant `@pivot/design-system`, inexistant à
ce stade) des utilisateurs du tenant courant :

- **Colonnes** : nom, email, rôle (badge), statut (badge), date de création. Sur mobile
  (< 768px), seules nom + statut + action restent visibles en colonnes ; les colonnes secondaires
  sont accessibles via une ligne expandable (`aria-expanded` + bouton de bascule dédié).
- **Recherche** : champ debouncé à 300 ms (`vi.useFakeTimers()` dans les tests), label associé
  via `for`/`id`, résultat de filtrage annoncé par une région `aria-live="polite"` persistante
  ("X utilisateurs affichés").
- **Filtres** rôle/statut : appliqués immédiatement (pas de debounce), regroupés dans un
  `role="search"` avec `<fieldset>`/`<legend>`.
- **Pagination** : taille fixe 20 (non paramétrable dans cette US), `nav[aria-label="Pagination"]`,
  boutons Précédent/Suivant avec `aria-label` explicites, désactivés aux bornes, total affiché
  ("Utilisateurs 1-20 sur 47") avec calcul d'intervalle 1-indexé.
- **États** : skeleton de tableau pendant le chargement ; état vide ("Aucun utilisateur
  correspondant à vos filtres" + bouton "Réinitialiser les filtres") ; état d'erreur réseau
  (message + bouton "Réessayer").
- **Badges** rôle/statut : texte toujours inclus (jamais de différenciation par la seule couleur).
  Un défaut de contraste WCAG AA a été détecté et corrigé pendant la revue Gate 4 sur le badge de
  rôle "Autre" (voir § Écarts).
- **`<caption>`/`aria-label="Liste des utilisateurs du tenant"`** sur la table.
- Toutes les chaînes (en-têtes de colonnes, labels de filtres, statuts, badges) sous
  `admin.users.list.*` dans `fr.json`/`en.json`, parité de clés vérifiée programmatiquement.
- Architecture : `ChangeDetectionStrategy.OnPush`, `inject()` (pas de constructor DI), signals
  Angular pour tout l'état local/service, zéro `any`, aucune logique métier dans le composant
  (déléguée à `AdminUsersService`).
- Aucun `tenantId`/`userId` envoyé côté Angular — résolu serveur depuis le token porteur.

### `AdminUsersService`

Lecture seule (aucune méthode de mutation dans le périmètre de cette US — `updateRole`/
`activate`/`deactivate` sont ajoutées par les US sœurs empilées). Expose des signals
`users`/`loading`/`loadError`/`page`/`size`/`totalPages`/`totalElements` et une méthode
`load(page, filters)`. Consomme `GET /api/admin/users` (contrat `Page` Spring de US06.1.1) avec
paramètres `page`/`size`/`role`/`status`/`search`. Le champ `status` (`ACTIVE`/`INACTIVE`/`BLOCKED`)
est utilisé tel quel, jamais dérivé en booléen côté Angular.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-ui` PR #82)

| Fichier | Rôle |
|---------|------|
| `src/app/features/admin/users/admin-users.component.ts/.html/.scss` (nouveau) | Composant liste, tableau, filtres, pagination, états loading/empty/error |
| `src/app/features/admin/users/admin-users.service.ts` (nouveau) | Signals liste, appel `GET /api/admin/users` |
| `src/app/features/admin/users/admin-user.model.ts` (nouveau) | `AdminUserDto`, `AdminUserFilters` — miroir du DTO backend US06.1.1 |
| `src/app/features/admin/users/admin-users.component.spec.ts` (nouveau) | 20 tests Vitest composant |
| `src/app/features/admin/users/admin-users.service.spec.ts` (nouveau) | 5-6 tests Vitest service |
| `e2e/admin/admin-users.spec.ts` (nouveau) | Spec Playwright ajoutée pendant la revue Gate 4 (RBAC ROLE_USER → redirection sans appel API, happy-path, erreur réseau + retry) |
| `src/app/app.routes.ts` (modifié) | Route `/admin/users`, lazy-loaded, gardée par `adminGuard` |
| `public/assets/i18n/fr.json` / `en.json` (modifiés) | Clés `admin.users.list.*` |
| `src/styles/tokens.scss` (modifié) | Ajout `--color-warning-dark` (correctif contraste, voir § Écarts) |

### Endpoints / modèles consommés

| Endpoint | Paramètres | Réponse |
|----------|-----------|---------|
| `GET /api/admin/users` (US06.1.1, `pivot-core` #127) | `page`, `size` (fixe 20), `role`, `status`, `search` | `Page<AdminUserDto>` Spring — `content`/`totalElements`/`totalPages`/`number`/`size` |

Aucune mutation exposée par cette US (lecture seule).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US06.1.1 (backend, `pivot-core` #127) | Dépendance directe — contrat `GET /api/admin/users` consommé tel quel. Le backend a ajouté, pendant sa propre revue Gate 4, une validation `role` invalide → 400 (symétrique à `status`) ; ce cas reste structurellement inatteignable depuis cette UI (le `<select>` rôle n'envoie que `''`/`ROLE_ADMIN`/`ROLE_USER`). |
| US06.1.3 (Modifier le rôle, `pivot-ui` #84) | Empilée directement sur cette branche — insère un `<select>` dans la cellule d'actions dédiée (`.admin-users__col--actions`) prévue par cette US. Déjà mergée au moment du figeage, sans divergence signalée sur le périmètre US06.1.2. |
| US06.1.4 / US06.1.5 (Désactiver/réactiver un compte, `pivot-ui` #85) | Empilées sur la même branche, ajoutent leurs boutons dans la même cellule d'actions. Déjà mergées, sans impact sur ce périmètre. |
| US03.2.1 (Liste modules avec statut) | Modèle idiomatique réutilisé pour les états loading/empty/error. |
| US06.2.3 (`TenantsListComponent`) | Modèle idiomatique réutilisé pour le debounce de recherche et la pagination. |

---

## Écarts vs AC initiaux / notes de process

### Nombre d'échecs de tests pré-existants signalé dans la PR — invalidé par la vérification CI réelle

Le corps de la PR rapportait "39 échecs pré-existants" (`localStorage` vs `window.localStorage`)
issus d'une exécution locale sous Node 26 (Homebrew, par défaut sur la machine de l'auteur). La
vérification en CI réelle (Node 24, version épinglée par `.github/actions/setup-node`) donne en
réalité **483/483 tests passants** — la suite est intégralement verte sous la version de Node
réellement utilisée en CI. Ce chiffre de "39 échecs" documenté dans le corps de la PR est donc un
artefact d'environnement local, pas un état réel de la CI ; il est corrigé ici pour ne pas polluer
la traçabilité de coverage de cette US.

### Correctif de contraste WCAG AA — badge de rôle "Autre"

Non prévu par les AC initiaux, découvert pendant la revue Gate 4 : le badge de rôle "Autre"
(`--color-warning` sur `--color-warning-light`) mesurait un ratio de contraste de 2.86:1, sous le
minimum AA (4.5:1) pour du texte de taille normale. Corrigé par l'ajout de
`--color-warning-dark` (6.4:1) dans `tokens.scss`, suivant le pattern déjà établi par les autres
badges du repo (fond `-light` / texte `-dark`).

### Redondance de requête réseau lors d'un changement de filtre pendant un debounce en cours

Relevé (non bloquant) dans la revue rétrospective : `resetFilters()`/`onRoleChange()`/
`onStatusChange()` déclenchent immédiatement `load(0)` sans annuler un debounce de recherche
(300 ms) encore en vol ; la requête différée qui se déclenche ensuite relit les filtres courants
au moment de son exécution, donc le résultat final reste correct (idempotent), mais un aller-retour
réseau et un second rendu `aria-live` superflus peuvent survenir sur certains enchaînements
(ex. taper une recherche puis changer immédiatement un filtre). Jugé trop mineur pour justifier
une PR de suivi sur du code déjà livré et déjà étendu par les US sœurs — signalé ici pour la
prochaine personne qui touche la logique de debounce.

### Breakpoint CSS mobile (< 768px) — non couvert par un test automatisé

Déjà signalé dans les notes de livraison du backlog : limitation jsdom (les media queries ne sont
pas évaluées), cohérent avec l'absence de test similaire sur `TenantsListComponent`/US06.2.3. Le
mécanisme JS sous-jacent (toggle d'expansion, `aria-expanded`, contenu de la ligne étendue) est en
revanche entièrement testé. Vérification visuelle manuelle recommandée, non bloquante.

### Absence de test dédié au guard sur `/admin/users`

Aucun test dans `app.routes.spec.ts` ne couvre spécifiquement le guard de cette route — cohérent
avec le précédent déjà établi par `/admin/modules` (US03.2.1), `adminGuard` ayant sa propre suite
de tests dédiée par ailleurs. Non traité comme un gap introduit par cette PR.

---

## Tests

### `pivot-ui`

| Test | Comportement vérifié |
|---|---|
| `admin-users.component.spec.ts` (20 tests) | Rendu du tableau, badges texte rôle/statut, recherche debouncée (fake timers), filtres rôle/statut, pagination bidirectionnelle avec bornes désactivées, skeleton loading, état vide + reset filtres, état erreur + retry, `aria-live` sur le compte de résultats, expansion mobile (`aria-expanded`) |
| `admin-users.service.spec.ts` (5-6 tests) | Chargement succès/erreur via `HttpTestingController`, construction des paramètres de requête (page/size/role/status/search) |
| `e2e/admin/admin-users.spec.ts` (Playwright, ajouté en revue Gate 4) | ROLE_ADMIN voit le tableau ; ROLE_USER redirigé vers `/home` sans appel API (AC sécurité) ; erreur réseau + retry — vérifié passant en CI réelle (non exécutable en local sandbox, Chromium système absent) |

`test:ci` (Node 24, CI réelle) : 483/483 passants (43 fichiers). `tsc --noEmit` : 0 erreur.
`eslint` : 0 warning. Build production : succès (2 warnings de budget SCSS pré-existants,
non liés à cette PR — `navbar.component`, `register.component`). Commits signés GPG vérifiés.

---

## Hors périmètre (explicitement exclu)

- Mutation de rôle, activation/désactivation de compte — livrées par US06.1.3/US06.1.4/US06.1.5,
  empilées sur la même branche mais hors du périmètre fonctionnel de cette spec.
- Pagination paramétrable (taille de page variable) — taille fixée à 20, non prévue par cette US.
- Test automatisé du breakpoint CSS mobile — limitation jsdom, différé (vérification manuelle).
- Distinction du 400 `INVALID_FILTER` backend dans un message dédié côté service — repliée sur le
  message d'erreur réseau générique, choix assumé (le cas est structurellement inatteignable
  depuis cette UI).
