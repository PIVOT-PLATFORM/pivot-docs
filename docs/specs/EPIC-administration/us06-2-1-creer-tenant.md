# US06.2.1 — Super admin crée un tenant

## Contexte

- **US** : `docs/backlog/EPIC-administration/FEATURES/gestion-tenants/us-creer-tenant.md`
  (F06.2 — Gestion tenants, EPIC-administration E06)
- **PR** : `pivot-core` [#134](https://github.com/PIVOT-PLATFORM/pivot-core/pull/134)
  (`feat/us06-2-1-creer-tenant`) · `pivot-ui`
  [#76](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/76) (même nom de branche)
- **Dernier commit au moment du figeage** : `pivot-core` `c0d1ae5` — `fix(backend): corrige
  AuditServiceTest pour utiliser afterCompletion` · `pivot-ui` `9badb0a` — `test(ui): couvre les
  valeurs listées de plan/auth_mode (US06.2.1)`
- **Gate 4 MERGE_CONFIDENCE** : `pivot-core` 95/100 (2e passage de convergence) — MERGE_AUTONOMOUS
  · `pivot-ui` 100/100 (3e passage de convergence, après un 2e passage à 92/100
  `NEEDS_HUMAN_REVIEW`) — MERGE_AUTONOMOUS. Un audit Gate 4 indépendant a posteriori
  (`leo-brgn`, commentaire PR #76 du 2026-07-06) confirme à 98/100, sans action de merge (la PR
  était déjà mergée entre-temps).
- **Dépend de** : US06.2.3 (liste des tenants) — `pivot-core` PR #126 et `pivot-ui` PR #69, toutes
  deux mergées avant/avec cette US ; réutilise `SuperAdminTenantController`/`Service` (côté
  `pivot-core`) et le guard `superAdminGuard` + la feature `superadmin/tenants/` (côté `pivot-ui`)
- **Collision de PR parallèles** : `SuperAdminTenantController`/`Service` ont été créés
  indépendamment sur trois PR parallèles ciblant le même package `fr.pivot.tenant.api` — cette PR
  (`create()`/`checkSlug()`), PR #126 (`list()`, US06.2.3) et PR #135 (`updateStatus()`,
  US06.2.2). Réconciliées par le mainteneur en une seule classe une fois les trois PR mergées sur
  `main`. Idem côté migration Flyway : cette PR a dû renuméroter sa migration de `V4` vers `V6`
  pour éviter la collision de version avec les migrations des deux PR sœurs.

---

## Spec fonctionnelle

### Création d'un tenant (`pivot-core`)

`POST /api/superadmin/tenants` crée un nouveau tenant, réservé aux appelants `ROLE_SUPER_ADMIN` :

- **201** `{ id, slug, invitationUrl }` si la création réussit.
- **400** si le payload est invalide (champ manquant, slug mal formé, `plan`/`authMode` hors
  liste) — validation bean (`jakarta.validation`) sur `CreateTenantRequest`.
- **401** si le contexte d'authentification est invalide.
- **403** si l'appelant n'a pas `ROLE_SUPER_ADMIN`.
- **409** `{ "error": "TENANT_SLUG_ALREADY_EXISTS" }` si le slug est déjà pris par un autre
  tenant.
- **422** `{ "error": "TENANT_SLUG_RESERVED" }` si le slug est un terme réservé.
- **429** si le compte super admin appelant a dépassé 10 créations dans l'heure ; audit
  `TenantCreationRateLimitExceeded` enregistré.

Ordre de validation dans `SuperAdminTenantService#createTenant` : (1) rate limit Redis — 10/h
par compte super admin, évalué **avant** toute règle métier (même motif anti-oracle que
`RegistrationService#register`, pour ne pas laisser les réponses 409/422 servir d'oracle
gratuit au-delà du débit autorisé) ; (2) slug réservé (422) ; (3) slug déjà pris (409). Le
format du slug (regex, longueur) est déjà garanti en amont par la validation bean de
`CreateTenantRequest`.

Le tenant créé est immédiatement actif (`is_active: true`, pas de flux d'activation différée).
Audit `TenantCreated` enregistré sur succès (`AuditService`).

`GET /api/superadmin/tenants/check-slug?slug=...` vérifie la disponibilité d'un slug candidat
sans jamais renvoyer 409/422 : l'indisponibilité est portée dans le corps `200` de la réponse
(`SlugAvailabilityResponse`), utilisé par le debounce 500ms du formulaire Angular.

**Politique de slug** (`TenantSlugPolicy`, source unique partagée par la validation bean et
`check-slug`) :

- Format strict : `^[a-z0-9-]{3,50}$`.
- Liste de termes réservés : `api`, `admin`, `superadmin`, `auth`, `actuator`, `health`,
  `system`, `pivot`.

**Valeurs closes** : `plan` ∈ `{SAAS, ENTERPRISE, TRIAL}` (même contrainte `chk_tenants_plan`
que la base) ; `authMode` ∈ `{LOCAL, OIDC, GOOGLE}`.

### Formulaire de création (`pivot-ui`, `/superadmin/tenants/new`)

Route gardée par `superAdminGuard` (réutilisé de US06.2.3, pas redupliqué). Formulaire réactif :

- **Champs** : nom (obligatoire), slug (auto-généré en temps réel depuis le nom — accents
  supprimés, minuscules, tirets — mais éditable), plan (select `SAAS`/`ENTERPRISE`/`TRIAL`),
  mode d'authentification (select `LOCAL`/`OIDC`/`GOOGLE`).
- Vérification de disponibilité du slug en temps réel : `GET
  /api/superadmin/tenants/check-slug`, `debounceTime(500)` → `distinctUntilChanged()` →
  `switchMap()` (annule les requêtes obsolètes).
- Mapping d'erreurs (`handleSubmitError`, dans le composant) : `409` → erreur inline sur le
  champ slug uniquement (jamais de bannière générique) ; `422` → idem (même comportement 409 au
  check temps réel et à la soumission) ; `429` → bannière générique avec délai formaté
  (`formatRetryAfter`, plancher de 1s pour toute valeur manquante/nulle/négative/non-finie).
- Bouton submit `disabled` + spinner pendant la soumission — pas de double-soumission possible.
- Succès → toast `admin.tenants.create.toast_success` + redirection vers `/superadmin/tenants`
  (liste, US06.2.3).
- A11y : `aria-required="true"` sur les 4 champs obligatoires, erreurs liées via
  `aria-describedby` (hint/vérification en cours/erreur/disponibilité, composés dynamiquement),
  `role="alert"`/`role="status"` selon le cas. Correctif de contraste WCAG 2.1 AA appliqué en
  cours de revue (`.form-success`, commit `5b4280f`).
- i18n : tous les textes sous `admin.tenants.create.*` (fr.json / en.json) — suit le libellé
  littéral de l'AC plutôt que le namespace `superadmin.tenants.*` déjà utilisé par l'écran de
  liste voisin (US06.2.3). Incohérence de nommage documentée, harmonisation différée.
- Intégration bonus (hors AC strict) : lien "+ Nouveau tenant" ajouté dans l'en-tête de la liste
  des tenants (US06.2.3), pour la découvrabilité du formulaire.

---

## Contrat technique

### Fichiers introduits / modifiés — `pivot-core` (PR #134)

| Fichier | Rôle |
|---------|------|
| `CreateTenantRequest.java` (nouveau) | Record de requête — `name`, `slug`, `plan`, `authMode`, camelCase, validation bean (`@NotBlank`, `@Pattern`, `@Size`) |
| `CreateTenantResponse.java` (nouveau) | Record de réponse — `id`, `slug`, `invitationUrl` |
| `SlugAvailabilityResponse.java` (nouveau) | Corps de `GET check-slug` |
| `TenantSlugPolicy.java` (nouveau) | Source unique du format regex et de la blocklist réservée, partagée par la validation bean et `check-slug` |
| `ReservedTenantSlugException.java` / `TenantSlugAlreadyExistsException.java` (nouveaux) | Mappés en 422 / 409, gérés localement au contrôleur |
| `SuperAdminTenantController.java` (modifié) | Ajoute `POST /api/superadmin/tenants` (`create`) et `GET /check-slug` à la classe déjà introduite par PR #126 (US06.2.3, `list()`) ; neutralisation CR/LF avant log (`sanitizeForLog`, anti log-forging CWE-117) |
| `SuperAdminTenantService.java` (modifié) | Ajoute `createTenant`/`checkSlugAvailability`, `@PreAuthorize("hasRole('SUPER_ADMIN')")` porté par le service, construction de `invitationUrl` (`buildInvitationUrl`) |
| `RateLimiterService.java` (modifié) | Ajoute le bucket de création de tenant (10/h par compte super admin) |
| `AuditService.java` (modifié) | Ajoute les types d'événements `TENANT_CREATED` / `TENANT_CREATION_RATE_LIMIT_EXCEEDED` |
| `V6__tenant_auth_mode_creation_values.sql` (nouveau) | Élargit le `CHECK` constraint de `tenants.auth_mode` pour accepter `LOCAL`/`OIDC`/`GOOGLE` en plus de `SAAS`/`ENTERPRISE`/`HYBRID` — additif, aucune migration de données, renumérotée de `V4` à `V6` pour éviter la collision avec les migrations des PR sœurs #126/#135 |
| `SuperAdminTenantServiceTest.java`, `SuperAdminTenantControllerTest.java`, `TenantSlugPolicyTest.java` (TU), `SuperAdminTenantIntegrationTest.java` (TI, Testcontainers PostgreSQL + Redis réel) | Voir § Tests |

### Fichiers introduits / modifiés — `pivot-ui` (PR #76)

| Fichier | Rôle |
|---------|------|
| `create-tenant.model.ts` (nouveau) | `slugify()`, `TENANT_SLUG_PATTERN`, types miroir du contrat backend |
| `create-tenant.service.ts` (nouveau) | Appels `POST`/`check-slug`, pipeline RxJS debounce/distinct/switchMap |
| `create-tenant.component.ts/.html/.scss` (nouveau) | Formulaire réactif, `OnPush`, `inject()`, state en `signal`, zéro `any`, mapping d'erreurs HTTP inline dans le composant |
| `app.routes.ts` (modifié) | Route `/superadmin/tenants/new`, lazy-loaded, gardée par `superAdminGuard` (réutilisé de US06.2.3) |
| `tenants-list.component.ts/.html/.scss` (modifié) | Lien "+ Nouveau tenant" (intégration bonus, hors AC strict) |
| `fr.json` / `en.json` (modifiés) | Clés `admin.tenants.create.*` |
| `styles/components.scss` (modifié) | Correctif de contraste WCAG 2.1 AA sur `.form-success` |

### Endpoints / modèles

| Endpoint | Codes retour |
|----------|--------------|
| `POST /api/superadmin/tenants` | `201 { id, slug, invitationUrl }` · `400` · `401` · `403` · `409 TENANT_SLUG_ALREADY_EXISTS` · `422 TENANT_SLUG_RESERVED` · `429` |
| `GET /api/superadmin/tenants/check-slug?slug=...` | `200` (disponibilité dans le corps, jamais 409/422) · `401` · `403` |

`CreateTenantRequest` : `name` (`String`, requis, max 255), `slug` (`String`, requis,
`[a-z0-9-]{3,50}`), `plan` (`String`, requis, `SAAS|ENTERPRISE|TRIAL`), `authMode` (`String`,
requis, `LOCAL|OIDC|GOOGLE`). `CreateTenantResponse` : `id` (`Long`), `slug` (`String`),
`invitationUrl` (`String`).

**`invitationUrl`** : ce n'est **pas** un token d'invitation sécurisé par personne — PIVOT n'a
pas encore d'entité d'invitation à ce stade du backlog (ce serait une US distincte, non
planifiée). L'URL route simplement vers l'écran d'inscription scopé au tenant
(`{appUrl}/auth/register?tenant={slug}`), même convention que `EmailService`. Voir § Écarts.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US06.2.3 (Super admin liste tous les tenants) | Dépendance directe — partage `SuperAdminTenantController`/`Service` côté `pivot-core` (PR #126, mergée en premier) et `superAdminGuard` + feature `superadmin/tenants/` côté `pivot-ui` (PR #69, mergée avant le rebase final de cette PR) |
| US06.2.2 (Super admin désactive un tenant) | PR sœur `pivot-core` #135 (encore ouverte au moment de cette fusion) — même classe `SuperAdminTenantController`/`Service`, même package, collision de migration Flyway (`V4`) réconciliée manuellement par le mainteneur à son intégration |

## Écarts vs AC initiaux

### `invitationUrl` reçu par le frontend mais jamais exploité — ambiguïté d'AC non tranchée

Le Gate 4 `pivot-ui` (2e passage, 92/100, `NEEDS_HUMAN_REVIEW`) a explicitement soulevé ce point
comme une ambiguïté d'AC nécessitant une décision PO (afficher le lien dans l'UI — toast
persistant, modal, champ copiable — ou confirmer qu'aucune action UI n'est nécessaire). Le 3e
passage de convergence (100/100) ne mentionne plus ce finding et ne montre aucun commit
l'adressant : le patch de `create-tenant.component.ts` ne référence `invitationUrl` nulle part.
**L'AC « la réponse retourne l'ID du tenant créé et une URL d'invitation » est vérifiée côté
contrat API (backend, testé), mais le super admin n'a aujourd'hui aucun moyen de récupérer ce
lien depuis l'interface** — écart réel non résolu, sans trace de décision PO explicite l'ayant
tranché. À rouvrir si un besoin produit s'exprime.

### Pas de page de détail tenant — redirection de repli vers la liste

L'AC demande une redirection vers « la page de détail du tenant créé » après succès. Aucune page
de détail tenant n'existe dans `pivot-ui` à ce stade du backlog — la redirection pointe vers la
liste des tenants (`/superadmin/tenants`, US06.2.3) à la place. Déviation documentée par l'auteur
de la PR et acceptée en Gate 4 (3e passage, 100/100) comme repli raisonnable. À réévaluer quand
une US de détail tenant existera.

### Réutilisation de `tenants.auth_mode` pour une sémantique différente

La colonne existante `tenants.auth_mode` (V1, valeurs `SAAS/ENTERPRISE/HYBRID`, sémantique « mode
de déploiement ») est réutilisée par cette US pour un concept différent : le mode
d'authentification principal du nouveau tenant (`LOCAL/OIDC/GOOGLE`). Migration `V6` : élargit le
`CHECK` constraint pour accepter les deux jeux de valeurs (additif, aucune migration de données,
le tenant bootstrap `pivot-saas` garde `SAAS`). Décision produit documentée par l'auteur de la PR
mais jamais formellement validée par le mainteneur/Architecte BDD — qualifiée d'« irréductible
sans décision PO + Architecte BDD PostgreSQL » par le Gate 4 `pivot-core` (95/100). Dette de
modélisation assumée, pas un bug de code.

### Incohérence de nommage i18n

`admin.tenants.create.*` (cette US, texte AC littéral) vs `superadmin.tenants.*` (US06.2.3,
écran de liste voisin) — signalé dans les notes de livraison du backlog, harmonisation différée.

### Tests E2E Playwright différés

Aucune spec Playwright ajoutée pour ce formulaire — différé conformément à la politique ACDD de
ce repo (« E2E différable »), couverture Vitest jugée suffisante pour une US de taille S.

---

## Tests

### `pivot-core`

| Test | Comportement vérifié |
|---|---|
| `SuperAdminTenantServiceTest` | Création réussie, 409 si slug dupliqué, 422 si slug réservé, 429 + audit si rate limit dépassé, audit `TenantCreated` sur succès |
| `SuperAdminTenantControllerTest` | Mapping 400/409/422/429, délégation intégrale au service |
| `TenantSlugPolicyTest` (24 cas) | Format regex, blocklist réservée |
| `SuperAdminTenantIntegrationTest` (12 TI, Testcontainers PostgreSQL + Redis réel) | RBAC réel via proxy `@EnableMethodSecurity` (`ROLE_ADMIN` → 403), `is_active: true` à la création, audit `TenantCreated` réellement enregistré, 409/422 réels |

Coverage SonarCloud sur code neuf : 95.5%. Quality Gate passé (0 security hotspot, 0
duplication).

### `pivot-ui`

| Test | Comportement vérifié |
|---|---|
| `create-tenant.model.spec.ts` | `slugify()`, pattern de slug, valeurs listées `plan`/`authMode` |
| `create-tenant.service.spec.ts` | Debounce 500ms, `distinctUntilChanged`, annulation de requêtes obsolètes, échec réseau |
| `create-tenant.component.spec.ts` | Soumission 409/422/429, erreur inline vs bannière générique, toast succès + redirection, spinner + disabled pendant soumission, a11y (`aria-required`, `aria-describedby`) |

`test:ci` : 724/724 tests verts (61 fichiers). `tsc --noEmit` : 0 erreur. `eslint` : 0 warning.
i18n : 28/28 clés `admin.tenants.create.*` identiques fr/en. Contrat vérifié champ-pour-champ
contre le backend mergé (`create-tenant.model.ts`/`.service.ts`) par l'audit Gate 4 indépendant
post-merge (`leo-brgn`).

---

## Hors périmètre (explicitement exclu)

- Page de détail tenant — n'existe pas encore, redirection de repli vers la liste (US06.2.3).
- Affichage/exploitation de `invitationUrl` côté UI — reçu de l'API mais non utilisé, ambiguïté
  d'AC non tranchée (voir § Écarts).
- Système d'invitation à token sécurisé par personne — hors périmètre, non planifié.
- `updateStatus` (US06.2.2, désactivation d'un tenant) — PR sœur distincte (#135), même classe
  backend, à figer séparément.
- Harmonisation du namespace i18n `admin.tenants.create.*` vs `superadmin.tenants.*` — différée.
- Spec Playwright E2E — différée, politique ACDD du repo.
