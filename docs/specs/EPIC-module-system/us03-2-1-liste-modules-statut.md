# US03.2.1 — UI liste modules disponibles avec statut

## Contexte

- **US** : `docs/backlog/EPIC-module-system/FEATURES/interface-admin-angular/us-liste-modules.md`
  (F03.2 — Interface admin Angular, EPIC-module-system)
- **PR** : `pivot-core` [#122](https://github.com/PIVOT-PLATFORM/pivot-core/pull/122)
  (`feat/us03-1-admin-module-activation`) · `pivot-ui`
  [#66](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/66) (même nom de branche)
- **Dernier commit au moment du figeage** : `pivot-core` `a0bd97d` — `fix(api): neutralise CR/LF
  avant de loguer moduleId (CWE-117 log forging)` · `pivot-ui` `abbeb64` — `fix(ui): reconcilie
  AdminModulesComponent avec le ToastService partagé`
- **Gate 4 MERGE_CONFIDENCE** : `pivot-core` 98/100 (révisé, voir § Écarts) — MERGE_AUTONOMOUS ·
  `pivot-ui` 92/100 — MERGE_AUTONOMOUS
- **Dépend de** : EN03.1 (module registry, `pivot-core` PR #119 — mergée)
- **Périmètre réel des deux PR** : la PR `pivot-core` #122 et la PR `pivot-ui` #66 livrent en une
  seule fois **US03.1.1** (activer, spec dédiée
  `docs/specs/EPIC-module-system/us03-1-1-admin-active-module.md`), **US03.1.2** (désactiver) et
  l'écran de liste **US03.2.1** — les trois US partagent le même contrôleur/service backend
  (`AdminModuleController`/`AdminModuleActivationService`) et le même composant
  `AdminModulesComponent` côté frontend. Cette spec ne documente que le périmètre **US03.2.1**
  (liste + statut) ; US03.1.2 sera figée séparément si elle ne l'est pas déjà.

---

## Spec fonctionnelle

### Endpoint de liste (`pivot-core`)

`GET /api/admin/modules` retourne, pour le tenant de l'administrateur authentifié, la liste des
modules avec leur état d'activation :

- **200** `[{ "id": "...", "name": "...", "enabled": true|false, "description": "" }]`
- **401** si le contexte d'authentification est invalide ou ne porte pas de tenant.

Le `tenantId` est résolu exclusivement depuis l'entité `User` posée par
`TokenAuthenticationFilter` (même mécanisme que `POST/DELETE .../activate`) — aucune fuite
cross-tenant possible sur la liste retournée.

**Champ `description` toujours vide** : `PivotModule` (contrat EN03.1) n'expose pas de
`getDescription()`. L'AC prévoyait un fallback « metadata séparée » si le champ n'était pas
disponible dans l'interface — ce fallback n'a pas été implémenté côté backend ; `AdminModuleDto`
retourne simplement `description: ""` pour tous les modules, documenté dans son Javadoc comme
simplification assumée plutôt que comme le mécanisme prévu par l'AC. Suivi ouvert (voir backlog) :
exposer une metadata séparée côté API, ou étendre `PivotModule` — nécessite coordination de tous
les repos `pivot-xxx-core`.

### Grille et statuts (`pivot-ui`, `/admin/modules`)

Route `/admin/modules`, lazy-loaded, sous le shell authentifié, gardée par `adminGuard` (premier
guard de route par rôle de `pivot-ui`) — redirige tout utilisateur non `ROLE_ADMIN` vers `/home`
(pas de page 403 dédiée à ce stade).

`AdminModulesComponent` affiche chaque module comme un élément `<li>` d'une liste `<ul>`
(`role="article"`/liste sémantique plutôt qu'ARIA custom) :

- **Badge de statut** : texte "Actif"/"Inactif" visible (pas de différenciation couleur seule),
  également porté en `aria-label`.
- **Toggle** activer/désactiver par carte : `aria-label` dynamique ("Activer [nom]" /
  "Désactiver [nom]"), `aria-pressed`, cible tactile ≥ 44px (WCAG 2.5.5), désactivé
  (`disabled`) pendant que sa propre requête est en cours (`isInFlight(id)`) — sans bloquer les
  autres cartes de la grille.
- **États de chargement** : skeleton de grille pendant le `GET` initial ; état vide ("Aucun module
  disponible pour votre plan") si la liste est vide ; état d'erreur + bouton "Réessayer" si le
  `GET` échoue.
- **Échec d'activation (403 `MODULE_NOT_IN_PLAN`)** : message inline explicite dans la carte
  ("Ce module n'est pas inclus dans votre plan"), en plus du rollback optimiste du toggle.
- **Responsive** : sous 768px, grille en colonne unique (media query CSS) — non couvert par un
  test automatisé, vérification visuelle/E2E uniquement (voir § Écarts).
- Toutes les chaînes sous la clé `admin.modules.*` dans `fr.json`/`en.json`.

---

## Contrat technique

### Fichiers introduits / modifiés — `pivot-core` (PR #122)

| Fichier | Rôle |
|---------|------|
| `AdminModuleController.java` (nouveau) | `GET /api/admin/modules` — délègue à `AdminModuleActivationService`/`ModuleRegistry`, protégé `@PreAuthorize("hasRole('ADMIN')")` (voir § Écarts — correctif Gate 4) |
| `AdminModuleActivationService.java` (nouveau) | Résolution `tenantId` exclusivement via le token porteur, partagé avec US03.1.1/US03.1.2 |
| `AdminModuleDto.java` (nouveau) | `{ id, name, enabled, description }` — `description` toujours `""` (voir § Spec fonctionnelle) |
| `AdminModuleControllerTest.java` (TU), `AdminModuleActivationIntegrationTest.java` (TI, Testcontainers) | Voir § Tests |

### Fichiers introduits / modifiés — `pivot-ui` (PR #66)

| Fichier | Rôle |
|---------|------|
| `admin-module.model.ts` (nouveau) | Modèle `AdminModuleDto` miroir du DTO backend |
| `admin-module.service.ts` (nouveau) | Signals liste (`loading`/`error`), classification 403 `MODULE_NOT_IN_PLAN` |
| `admin-modules.component.ts/.html/.scss` (nouveau) | Grille `<ul><li>`, badge texte, toggle accessible, skeleton, état vide, état d'erreur + retry |
| `admin.guard.ts` (nouveau) | Guard `ROLE_ADMIN` sur `/admin/modules` |
| `app.routes.ts` (modifié) | Route `/admin/modules`, lazy-loaded, gardée par `adminGuard` |
| `shared/toast/` (nouveau) | `ToastService`/`ToastComponent` génériques (pas de composant toast dans `@pivot/design-system`, encore inexistant) |
| `fr.json` / `en.json` (modifiés) | Clés `admin.modules.list.*` |

### Endpoints / modèles

| Endpoint | Codes retour |
|----------|--------------|
| `GET /api/admin/modules` | `200 [{ id, name, enabled, description }]` · `401` |

Aucun changement de contrat `PivotModule`/OIDC.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US03.1.1 (Admin active un module) | Livrée dans les **mêmes PR** (`pivot-core` #122, `pivot-ui` #66) — spec dédiée `docs/specs/EPIC-module-system/us03-1-1-admin-active-module.md`. |
| US03.1.2 (Admin désactive un module) | Livrée dans les **mêmes PR** — contrôleur, service et composant UI partagés. À figer séparément si pas déjà fait. |
| EN03.1 (Module registry) | Dépendance de base (`ModuleRegistry`) — mergée avant cette PR (#119). `PivotModule` (interface EN03.1) est la source du manque de champ `description` (voir § Écarts). |
| EN03.2 (Guard Angular / `/api/modules/{id}/status`) | Non requis pour l'affichage de la liste elle-même ; le guard `adminGuard` créé ici est un guard de rôle (pas le guard de statut module d'EN03.2). |
| US03.3.1/US03.3.2/US03.3.3 (Plans/entitlement) | Le 403 `MODULE_NOT_IN_PLAN` affiché ici repose sur la simplification « module non enregistré dans le registre » — un vrai système plan/entitlement est introduit plus tard par ces US. |

---

## Écarts vs AC initiaux

### Champ `description` — fallback "metadata séparée" non implémenté

L'AC prévoyait explicitement deux issues possibles si `description` n'est pas exposée par
`PivotModule` : soit l'étendre, soit fournir une metadata séparée côté API. Aucune des deux n'a été
faite — l'implémentation réelle retourne juste une chaîne vide pour tous les modules. Marqué ⬜
*(partiel)* dans le backlog, non ✅ : c'est un écart réel entre l'AC et le livré, pas un détail
d'implémentation neutre. Hard block Gate 4 documenté par le Gate 4 `pivot-core`, suivi ouvert
nécessitant coordination de tous les repos `pivot-xxx-core`.

### RBAC manquant initialement sur `GET /api/admin/modules` — corrigé avant merge

En traitant un finding mineur du Gate 4 initial (absence de test HTTP de bout en bout dédié à
`list()`), la review a découvert que l'endpoint `GET /api/admin/modules` **n'avait aucune
vérification de rôle serveur** : contrairement à `activate`/`deactivate` (protégés par
`@PreAuthorize` sur `AdminModuleActivationService`), `list()` appelait directement
`ModuleRegistry`/`ModuleActivationService` sans passer par ce service — un `ROLE_USER`
authentifié pouvait donc lister l'état d'activation des modules de son tenant en appelant l'API
directement, la restriction `ROLE_ADMIN` n'existant que côté garde de route Angular. Corrigé dans
la même PR (#122) par ajout de `@PreAuthorize("hasRole('ADMIN')")` directement sur
`AdminModuleController.list()`, avec tests d'intégration exerçant le vrai proxy Spring Security
(`ROLE_USER` → 403, `ROLE_ADMIN` → 200). Score Gate 4 `pivot-core` révisé de 92 à 98/100 suite à ce
correctif. L'AC backlog « Page Angular `/admin/modules` accessible uniquement aux ROLE_ADMIN » est
coché ✅ sur la base de cette protection serveur, pas seulement du guard client.

### Tab order clavier et breakpoint mobile 768px — non couverts par test automatisé

Relevé en finding 🔵 du Gate 4 `pivot-ui` : la navigation clavier (garantie structurellement par
des `<button>` natifs) et le comportement responsive à 768px n'ont pas de test Vitest dédié —
vérification manuelle/E2E uniquement. Différé, non bloquant.

### Tests E2E Playwright différés

Environnement E2E indisponible lors de l'implémentation — couverture actuelle = tests Vitest
unitaires uniquement (269/269, 90,9 % coverage stmt), déjà noté dans les notes de livraison du
backlog.

---

## Tests

### `pivot-core`

| Test | Comportement vérifié |
|---|---|
| `AdminModuleControllerTest` (TU) | 200 liste avec `description` vide, 401 si détails d'auth invalides/tenant absent |
| `AdminModuleActivationIntegrationTest` (TI, Testcontainers) | RBAC réel sur `list()` via proxy `@EnableMethodSecurity` (`ROLE_USER` → 403, `ROLE_ADMIN` → 200) |

### `pivot-ui`

| Test | Comportement vérifié |
|---|---|
| `admin-module.service.spec.ts` | Chargement succès/erreur de la liste, classification 403 `MODULE_NOT_IN_PLAN` |
| `admin-modules.component.spec.ts` | Skeleton de chargement, état vide, état d'erreur + retry, badge texte de statut, structure `<ul><li>`, `aria-label` du toggle, toggle désactivé pendant l'appel en cours (sans affecter les autres cartes) |
| `admin.guard.spec.ts` | `ROLE_ADMIN` passe, autres rôles redirigés vers `/home` |

`test:ci` : 269/269 passing, 90,9 % coverage stmt. `tsc --noEmit` : 0 erreur. `eslint` : 0 warning.
Build prod OK (2 warnings de budget SCSS pré-existants, non liés à cette PR).

---

## Hors périmètre (explicitement exclu)

- Activation (US03.1.1) et désactivation (US03.1.2) d'un module — livrées dans les mêmes PR mais
  hors du périmètre fonctionnel de cette spec (liste + statut uniquement).
- Système plan/entitlement réel (table `plans`, `plan_modules`) — introduit plus tard par
  US03.3.1/US03.3.2/US03.3.3.
- Metadata séparée ou extension de `PivotModule` pour le champ `description` — suivi ouvert, non
  clos par cette US.
- Tests E2E Playwright (navigation clavier de bout en bout, breakpoint mobile 768px) — différés.
