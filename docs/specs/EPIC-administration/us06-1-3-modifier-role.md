# US06.1.3 — Admin modifie le rôle d'un utilisateur

## Contexte

- **US** : `docs/backlog/EPIC-administration/FEATURES/gestion-utilisateurs/us-modifier-role.md` (F06.1 — Gestion des utilisateurs, EPIC-administration)
- **PR backend** : `pivot-core` [#141](https://github.com/PIVOT-PLATFORM/pivot-core/pull/141) (`feat(api): admin modifie le rôle d'un utilisateur (US06.1.3)`) — mergée
- **PR frontend** : `pivot-ui` [#84](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/84) (`feat(ui): US06.1.3 - admin modifie le rôle d'un utilisateur`) — mergée, empilée sur `pivot-ui` #82 (US06.1.2)
- **PR de correction associée** : `pivot-ui` [#98](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/98) (`fix(ui): toast succès rôle/statut omet le nom de l'utilisateur (dédup incorrecte)`) — mergée le 2026-07-06, corrige un bug trouvé lors de la review Gate 4 rétrospective de #84
- **Gate 4 `pivot-core` #141** : 100/100 (2ᵉ passe, après correction d'un finding bloquant — voir Cohérence/Divergences)
- **Gate 4 `pivot-ui` #84** : 84/100 — MERGE_DOCUMENTED, revue rétrospective (PR déjà mergée par le mainteneur pendant la revue), finding réel corrigé par #98
- **Dépend de** : US06.1.2 (`pivot-ui` #82 — liste des utilisateurs, cellule d'actions partagée)

---

## Spec fonctionnelle

### Backend — `PATCH /api/admin/users/{userId}/role`

- Body : `{ "role": "ROLE_ADMIN" | "ROLE_USER" }`, validé par un enum fermé côté DTO
  (`AssignableRole`) — toute autre valeur (y compris `ROLE_SUPER_ADMIN`) ou valeur absente/inconnue
  → `400` (comportement de désérialisation Jackson par défaut, pas de code d'erreur structuré
  dédié).
- Auth : `@PreAuthorize("hasRole('ADMIN')")` sur le service. Appelant sans `ROLE_ADMIN` → `403`.
- Auto-rétrogradation : `targetUserId == callerUserId` rejeté avant toute lecture BDD → `403`
  `{"error":"SELF_ROLE_CHANGE_FORBIDDEN", ...}`.
- Isolation tenant : `userId` résolu uniquement via `findByIdAndTenantIdAndDeletedAtIsNull`, jamais
  depuis le body/header — cible inexistante ou d'un autre tenant → `404`
  `{"error":"USER_NOT_FOUND", ...}` (jamais `403`, indistinguable côté client entre les deux cas).
- **Garde supplémentaire non prévue dans l'AC initial, ajoutée en review Gate 4** : protection contre
  la désescalade de privilège d'un compte `ROLE_SUPER_ADMIN` partageant le même tenant qu'un simple
  `ROLE_ADMIN` (cas réel démontré via les seeds `V2__test_seeds.sql`, tenant système `pivot-saas`) —
  nouvelle exception `SuperAdminRoleChangeForbiddenException` → `403`
  `{"error":"SUPER_ADMIN_ROLE_PROTECTED", ...}`. Voir Divergences.
- Après succès (`200`, corps = `AdminUserDto` mis à jour) : tous les tokens actifs de l'utilisateur
  **cible** sont révoqués via `TokenService#revokeAllForUser` (défense en profondeur — le rôle est de
  toute façon résolu depuis la BDD à chaque requête via `TokenService#validate`, pas de cache de
  rôle sur le token).
- Audit event `UserRoleChanged` (`AuditService.USER_ROLE_CHANGED`), loggé par le contrôleur.

### Frontend — `AdminUsersComponent` / `AdminUsersService`

- Un `<select>` de rôle par ligne dans la cellule d'actions déjà prévue par US06.1.2
  (`.admin-users__col--actions`), `aria-label="Rôle de [nom de l'utilisateur]"` réellement unique
  par ligne (testé).
- Toute sélection différente du rôle courant ouvre `ConfirmDialogComponent`
  (`role="dialog"`, `aria-labelledby`, focus trap réel) avant tout appel API — jamais de mutation
  directe depuis le `<select>`. Annulation : reset explicite du DOM natif du `<select>` (le binding
  Angular seul ne le referait pas, le modèle sous-jacent n'ayant pas changé).
- Confirmation → `AdminUsersService.changeRole()` : mutation optimiste (même convention que
  `AdminModuleService.activate()/deactivate()`), `<select>` désactivé pendant l'appel
  (`[disabled]="service.isRoleChangeInFlight(user.id)"`), badge de la ligne mis à jour via le
  signal partagé `users()`.
- Succès → toast `admin.users.role.toast.updated` ("Rôle mis à jour **[nom]**" — voir Divergences
  pour la correction post-merge du paramètre `{ name }`).
- Échec → toast d'erreur classifié (400/403/404/générique via `AdminUserRoleChangeErrorKind`) +
  rollback optimiste côté service, indépendant par ligne (les autres lignes restent interactives).
- Libellés de rôle réutilisent les clés existantes `admin.users.list.role.admin`/`user` (pas de
  duplication) ; seules les chaînes réellement nouvelles (aria-label, texte du dialog, toasts)
  vivent sous `admin.users.role.*` (fr.json / en.json).

---

## Contrat technique

### Fichiers introduits / modifiés

**`pivot-core` (#141)**

| Fichier | Rôle |
|---------|------|
| `src/main/java/fr/pivot/auth/controller/AdminUserController.java` | Endpoint `PATCH /role`, `resolveActor()` (généralisation de `resolveAdmin()`, réutilisable par US06.1.4/US06.1.5) |
| `src/main/java/fr/pivot/auth/dto/AssignableRole.java` | Enum fermé `ROLE_ADMIN` / `ROLE_USER` |
| `src/main/java/fr/pivot/auth/dto/UpdateUserRoleRequest.java` | DTO d'entrée du PATCH |
| `src/main/java/fr/pivot/auth/exception/AdminUserNotFoundException.java` | → 404 |
| `src/main/java/fr/pivot/auth/exception/SelfRoleChangeForbiddenException.java` | → 403 auto-rétrogradation |
| `src/main/java/fr/pivot/auth/exception/SuperAdminRoleChangeForbiddenException.java` | → 403 protection `ROLE_SUPER_ADMIN` (ajouté en review) |
| `src/main/java/fr/pivot/auth/repository/UserRepository.java` | Requête tenant-scopée |
| `src/main/java/fr/pivot/auth/service/AdminUserService.java` | `updateRole()` — RBAC, gardes, révocation, audit |
| `src/main/java/fr/pivot/auth/service/AuditService.java` | Constante `USER_ROLE_CHANGED` |
| `src/test/java/fr/pivot/auth/controller/AdminUserControllerTest.java` | TU contrôleur (MockMvc standalone) |
| `src/test/java/fr/pivot/auth/controller/AdminUserIntegrationTest.java` | TI (Testcontainers Postgres + Spring Security réel) |
| `src/test/java/fr/pivot/auth/service/AdminUserServiceTest.java` | TU service (Mockito) |

**`pivot-ui` (#84, complétée par #98)**

| Fichier | Rôle |
|---------|------|
| `src/app/features/admin/users/admin-user.model.ts` | `AdminUserRoleChangeErrorKind` (classification 400/403/404/générique) |
| `src/app/features/admin/users/admin-users.service.ts` | `changeRole()` — optimiste, rollback, classification, in-flight par id |
| `src/app/features/admin/users/admin-users.component.ts` / `.html` / `.scss` | `<select>` par ligne, dialog de confirmation, toasts |
| `public/assets/i18n/{fr,en}.json` | Clés `admin.users.role.*` |
| `*.spec.ts` (component + service) | Tests Vitest dédiés (`describe('role change (US06.1.3)')`) |
| `admin-users.component.ts` (correction #98) | Toast succès rôle/statut : ajout du paramètre `{ name }` manquant |

### Endpoints / modèles / contrats techniques pertinents

```http
PATCH /api/admin/users/{userId}/role
Authorization: Bearer <token>
Content-Type: application/json

{ "role": "ROLE_ADMIN" | "ROLE_USER" }
```

| Code | Cas | Corps |
|------|-----|-------|
| `200` | Succès | `AdminUserDto` mis à jour |
| `400` | `role` absent ou hors `ROLE_ADMIN`/`ROLE_USER` | Corps d'erreur générique Spring/Jackson (pas de champ `error` dédié) |
| `403` | Non-admin, auto-rétrogradation, ou cible `ROLE_SUPER_ADMIN` | `{"error": "...", "message": "..."}` |
| `403` (et non `401`) | Token absent/invalide/révoqué | Convention repo (pas d'`AuthenticationEntryPoint` custom), voir Divergences |
| `404` | `userId` inexistant ou d'un autre tenant | `{"error":"USER_NOT_FOUND", ...}` |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US06.1.2 | Prérequis direct — fournit `AdminUsersComponent`, la liste des utilisateurs et la cellule `.admin-users__col--actions` étendue par cette US |
| US06.1.4 / US06.1.5 | `resolveActor()` (renommage généralisé de `resolveAdmin()`) et le pattern de garde `ROLE_SUPER_ADMIN` sont conçus pour être réutilisés tels quels par le futur endpoint `PATCH /api/admin/users/{userId}/status` ; le bug de toast corrigé par #98 touchait aussi `confirmStatusChange()` (introduit par #85), corrigé dans le même commit |

## Hors périmètre (explicitement exclu)

- Introduction d'un `AuthenticationEntryPoint` global renvoyant `401` (changement transversal à tous
  les endpoints authentifiés, hors périmètre de cette US) — voir Divergences
- Spec E2E Playwright pour ce flux — l'endpoint backend n'existait pas encore au moment de
  l'implémentation frontend initiale, et le repo `pivot-ui` n'a pas de suite Playwright pour les
  flux admin en général à ce stade (gap transverse, pas une régression de cette US)
- Corps d'erreur `400` structuré avec un code dédié (`INVALID_ROLE`) — reste le comportement par
  défaut Spring/Jackson

---

## Divergences par rapport au plan initial

1. **Code HTTP `403` au lieu de `401` pour un token révoqué.** L'AC demandait littéralement un
   `401` "dans les 100ms suivant la révocation". Le backend ne configure aucun
   `AuthenticationEntryPoint` personnalisé — convention déjà établie ailleurs dans le repo
   (`SessionControllerIntegrationTest`) — donc toute requête avec un token absent/invalide/révoqué
   reçoit `403`. Vérifié indépendamment en Gate 4 (`pivot-core` #141) comme légitime et non une
   régression. L'intention de l'AC (révocation immédiate et effective) est prouvée par une
   assertion BDD directe sur `access_tokens.status = REVOKED`, indépendamment du code HTTP.
2. **Garde `ROLE_SUPER_ADMIN` ajoutée en cours de review, absente de l'AC initial.** Une 2ᵉ passe
   de revue Gate 4 sur `pivot-core` #141 a démontré qu'un simple `ROLE_ADMIN` du tenant système
   pouvait rétrograder un `ROLE_SUPER_ADMIN` du même tenant faute de garde dédiée — désescalade de
   privilège réelle. Corrigée avant merge (`SuperAdminRoleChangeForbiddenException`, 5 tests
   ajoutés). Non couverte par l'AC dev original de `us-modifier-role.md`.
3. **Contrat backend non disponible au moment de l'implémentation frontend.** `pivot-ui` #84 a été
   développée sans PR `pivot-core` mergée pour cette US (empilée sur #82, backend implémenté en
   parallèle) — le contrat a été implémenté "à l'aveugle" depuis la description de l'US, puis
   revalidé après merge de #141 (aucune divergence trouvée sur la forme des payloads/sémantique).
4. **Bug post-merge : toast de succès sans le paramètre `{ name }`.** `ToastService.show()`
   déduplique sur `(messageKey, params)` ; le toast de succès de changement de rôle (et son
   pendant statut, introduit ensuite par #85 sur le même fichier) omettait `{ name }` — deux
   changements de rôle confirmés pour deux utilisateurs différents dans la fenêtre d'auto-dismiss
   ne produisaient qu'un seul toast visible, le second étant silencieusement absorbé. Trouvé lors
   d'une revue Gate 4 rétrospective (PR déjà mergée par le mainteneur au moment de la revue),
   corrigé par `pivot-ui` [#98](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/98) (mergée
   2026-07-06) avec 2 tests de régression. **État actuel sur `main` : corrigé.**
