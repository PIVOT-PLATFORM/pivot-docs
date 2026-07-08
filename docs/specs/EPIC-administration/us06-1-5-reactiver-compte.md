# US06.1.5 — Admin réactive un compte utilisateur

## Contexte

- **US** : `docs/backlog/EPIC-administration/FEATURES/gestion-utilisateurs/us-reactiver-compte.md` (F06.1 — Gestion des utilisateurs, EPIC-administration)
- **Implémentée conjointement avec US06.1.4** (« Admin désactive un compte ») — un seul endpoint
  partagé, une seule direction distinguée par la valeur de `status`, une seule paire de PR.
- **PR backend** : `pivot-core` [#142](https://github.com/PIVOT-PLATFORM/pivot-core/pull/142)
  (`feat/us06-1-4-5-desactiver-reactiver-compte`) — mergée, stackée sur #141 (US06.1.3), rebasée
  sur `main` après le merge de #141
- **PR frontend** : `pivot-ui` [#85](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/85) (même nom
  de branche) — mergée, stackée sur #84 (US06.1.3) puis #82 (US06.1.2)
- **Gate 4 `pivot-core` #142** : 98/100 en première passe (gap RBAC trouvé : aucun test ne
  prouvait qu'un `ROLE_USER` est rejeté sur le nouvel endpoint partagé) → corrigé pendant la
  review (`ac0614Sec03_throwsAccessDenied_whenCallerIsRoleUser`, commit `0fd3f47`) → **100/100**,
  MERGE_AUTONOMOUS
- **Gate 4 `pivot-ui` #85** : 100/100 en review initiale (PR laissée en draft pour une raison
  purement mécanique — dépendance de stack sur #84/#82 encore ouvertes, pas un problème de score)
  · **89/100 en review rétrospective post-merge** (2026-07-06T05:46:50Z, contre le diff final sur
  `main`) — voir Divergences pour le détail des deux findings 🟡 et le désaccord entre les deux
  reviews sur la couverture Playwright
- **Dépend de** : US06.1.3 (`pivot-core` #141, `pivot-ui` #84) — réutilise `resolveActor()`
  (généralisation de `resolveAdmin()`) et la cellule d'actions `.admin-users__col--actions`
  introduite par US06.1.2

---

## Spec fonctionnelle

### Backend — `PATCH /api/admin/users/{userId}/status` (direction réactivation)

- Body `{ "status": "ACTIVE" }` — `AssignableStatus` est un enum fermé partagé avec la
  désactivation (`ACTIVE` / `INACTIVE`) ; toute autre valeur (y compris `"BLOCKED"`, qui existe
  comme état réel mais n'est jamais une cible atteignable via cet endpoint) ou valeur absente →
  `400`.
- Auth : `@PreAuthorize("hasRole('ADMIN')")` sur `AdminUserService#updateStatus` — appelant
  `ROLE_USER` → `403` (couvert par `ac0614Sec03`, ajouté en review Gate 4 car absent du diff
  initial).
- Isolation tenant : `userId` résolu uniquement via la requête tenant-scopée déjà utilisée par
  US06.1.3/US06.1.4 — cible inexistante ou d'un autre tenant → `404`, jamais `403`.
- **Idempotence** : réactiver un compte déjà `ACTIVE` → `200`, jamais d'erreur. Prouvé à trois
  niveaux — TU service (`ac0615_02`, `verifyNoInteractions(emailService)`), TI service, TI HTTP
  (`ac0615Http03`).
- **Pas de garde "self"** contrairement à la désactivation : un admin peut réactiver son propre
  compte sans `403` — asymétrie assumée et documentée dans le JavaDoc de
  `SelfStatusChangeForbiddenException` (le cas n'a pas de sens métier pour la désactivation mais
  n'a aucune raison d'être bloqué pour la réactivation).
- Email de notification (`EmailService#sendAccountReactivatedEmail`, template
  `email/account-reactivated.html`, clés i18n `email.account-reactivated.*` /
  `email.subject.account-reactivated`, fr + en) **envoyé uniquement lors d'une transition réelle
  `INACTIVE → ACTIVE`**, jamais sur l'appel idempotent — décision assumée pour éviter un envoi en
  double sur un appel rejoué (le bouton "Réactiver" de l'IHM n'apparaissant de toute façon que sur
  les lignes `INACTIVE`, un clic normal déclenche toujours une vraie transition).
- Audit event `UserReactivated` avec `userId` (`targetUserId` en méta) et `actorId`.
- `TokenService#validate` relit `user.isActive()` en base à chaque requête (`isUserDeactivated`,
  ajouté par cette PR, symétrique de la vérification `tenant_invalidation_timestamp` existante
  US06.2.2) — pertinent pour le cycle complet désactivation → réactivation sur un même token
  jamais réémis, testé par `ac0615Http05`. La réactivation elle-même ne réémet aucun token :
  l'utilisateur réactivé doit se reconnecter (les tokens actifs au moment de la désactivation ont
  été révoqués par `TokenService#revokeAllForUser`, US06.1.4).

### Frontend — `AdminUsersComponent` / `AdminUsersService`

- Bouton "Réactiver" (`btn-secondary`) affiché uniquement sur les lignes `INACTIVE`, mutuellement
  exclusif par construction avec le bouton "Désactiver" (`ACTIVE`) — aucun bouton sur les lignes
  `BLOCKED` (état backend distinct, hors périmètre de cet endpoint).
- Clic → ouvre `ConfirmDialogComponent` avec `role="dialog"` (plus léger que l'`alertdialog` de la
  désactivation, cohérent avec le fait que la réactivation n'est pas une action destructive) —
  jamais de mutation directe avant confirmation.
- Confirmation → `AdminUsersService.changeStatus()` : mutation optimiste (même convention que
  `changeRole()` US06.1.3), le statut de la ligne change immédiatement en local puis est réconcilié
  avec la réponse du backend (nécessaire pour le cas idempotent où le backend renvoie `200` sans
  changement réel), suivi in-flight/erreur indépendant par utilisateur.
- Succès → toast `admin.users.status.toast.reactivated` ("Compte réactivé") + badge de statut mis à
  jour via le signal partagé `users()`.
- Échec → toast d'erreur classifié (`AdminUserStatusChangeErrorKind` : générique/403/404/statut
  invalide) + rollback optimiste, indépendant des autres lignes et du role-change.
- `aria-label="Réactiver le compte de {{ name }}"` par ligne, pour différencier les boutons du
  tableau.
- Textes sous `admin.users.status.*` (fr.json / en.json), parité fr/en vérifiée programmatiquement
  par la review Gate 4.

---

## Contrat technique

### Fichiers introduits / modifiés

**`pivot-core` (#142)**

| Fichier | Rôle |
|---------|------|
| `src/main/java/fr/pivot/auth/controller/AdminUserController.java` | Endpoint `PATCH /status` (délègue entièrement au service) |
| `src/main/java/fr/pivot/auth/dto/AssignableStatus.java` | Enum fermé `ACTIVE` / `INACTIVE` |
| `src/main/java/fr/pivot/auth/dto/UpdateUserStatusRequest.java` | DTO d'entrée du PATCH |
| `src/main/java/fr/pivot/auth/exception/SelfStatusChangeForbiddenException.java` | → 403, désactivation uniquement (pas de garde symétrique côté réactivation, voir Spec fonctionnelle) |
| `src/main/java/fr/pivot/auth/service/AdminUserService.java` | `updateStatus()` — RBAC, idempotence, email conditionnel, audit |
| `src/main/java/fr/pivot/auth/service/AuditService.java` | Constante `USER_REACTIVATED` (et `USER_DEACTIVATED`) |
| `src/main/java/fr/pivot/auth/service/EmailService.java` | `sendAccountReactivatedEmail()` |
| `src/main/java/fr/pivot/auth/service/TokenService.java` | `isUserDeactivated()` — relecture `user.isActive()` par requête |
| `src/main/resources/messages.properties` / `messages_en.properties` | Clés `email.account-reactivated.*` |
| `src/main/resources/templates/email/account-reactivated.html` | Template email de réactivation |
| `src/test/java/fr/pivot/auth/controller/AdminUserControllerTest.java` | TU contrôleur |
| `src/test/java/fr/pivot/auth/controller/AdminUserIntegrationTest.java` | TI (`ac0615*` réactivation, `ac0614Sec03` RBAC ajouté en review) |
| `src/test/java/fr/pivot/auth/service/AdminUserServiceTest.java` | TU service |
| `src/test/java/fr/pivot/auth/service/EmailServiceTest.java` | TU email |
| `src/test/java/fr/pivot/auth/service/TokenServiceTest.java` | TU `isUserDeactivated` |

**`pivot-ui` (#85)**

| Fichier | Rôle |
|---------|------|
| `src/app/features/admin/users/admin-user.model.ts` | `AdminUserToggleableStatus` (`'ACTIVE' \| 'INACTIVE'`), `AdminUserStatusChangeErrorKind` |
| `src/app/features/admin/users/admin-users.service.ts` | `changeStatus()` — optimiste, réconciliation avec la réponse (cas idempotent), in-flight/erreur par id |
| `src/app/features/admin/users/admin-users.component.ts` / `.html` / `.scss` | Boutons statut mutuellement exclusifs, dialog de confirmation, toasts |
| `public/assets/i18n/{fr,en}.json` | Clés `admin.users.status.*` |
| `*.spec.ts` (component + service) | Tests Vitest dédiés (`describe('status toggle — deactivate/reactivate (US06.1.4/US06.1.5)')`) |
| `e2e/admin/admin-users-status.spec.ts` | Spec Playwright ajoutée pendant la review Gate 4 initiale — cycle désactivation → réactivation + rollback sur erreur (voir Divergences : couverture contestée par la review rétrospective) |

### Endpoints / modèles / contrats techniques pertinents

```http
PATCH /api/admin/users/{userId}/status
Authorization: Bearer <token>
Content-Type: application/json

{ "status": "ACTIVE" }
```

| Code | Cas | Corps |
|------|-----|-------|
| `200` | Réactivation effective ou idempotente (déjà `ACTIVE`) | `AdminUserDto` mis à jour |
| `400` | `status` absent ou hors `ACTIVE`/`INACTIVE` | Corps d'erreur générique Spring/Jackson |
| `403` | Non-admin, ou token absent/invalide/révoqué (jamais `401`, aucun `AuthenticationEntryPoint` custom — même convention que US06.1.3/#141) | `{"error": "...", "message": "..."}` ou corps Spring Security par défaut |
| `404` | `userId` inexistant ou d'un autre tenant | `{"error":"USER_NOT_FOUND", ...}` |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US06.1.2 | Prérequis — fournit `AdminUsersComponent`, la liste des utilisateurs et la cellule `.admin-users__col--actions` |
| US06.1.3 | Fournit `resolveActor()` réutilisé tel quel par `updateStatus()`, et le bug de toast `{ name }` manquant (trouvé sur `confirmRoleChange()`) dont le même défaut existe sur `confirmStatusChange()` — corrigé dans le même correctif `pivot-ui` #98 |
| US06.1.4 | Même endpoint, même PR, direction opposée (`INACTIVE`) — implémentées et testées ensemble ; la garde `SelfStatusChangeForbiddenException` ne s'applique qu'à cette direction, pas à la réactivation |

## Hors périmètre (explicitement exclu)

- Réémission automatique de tokens à la réactivation — l'utilisateur réactivé doit se reconnecter,
  ses anciens tokens restant révoqués depuis la désactivation
- Verrou pessimiste contre l'envoi en double de l'email de réactivation sous appels concurrents
  (voir Divergences) — aucun AC n'exige de garantie de concurrence, coût jugé mineur
- Redirection/déconnexion automatique côté frontend d'un onglet déjà ouvert par l'utilisateur
  réactivé/désactivé (`token.interceptor.ts` ne traite que `401` comme signal d'expiration de
  session, jamais `403`) — gap transverse touchant l'intercepteur d'auth, nécessite le sign-off
  Expert_OIDC_IAM, hors périmètre de cette US (voir Divergences)

---

## Divergences par rapport au plan initial

1. **Code HTTP `403` au lieu de `401` pour un token révoqué/invalide.** Même convention déjà
   établie et documentée par US06.1.3 (`pivot-core` #141) — pas de régression, comportement par
   défaut Spring Security en l'absence d'`AuthenticationEntryPoint` custom.
2. **Gap RBAC trouvé et corrigé pendant la review Gate 4 de `pivot-core` #142** (98 → 100/100) :
   contrairement à `updateRole` (US06.1.3), aucun test ne prouvait qu'un appelant `ROLE_USER` est
   rejeté sur le nouvel endpoint partagé `PATCH /status`. Corrigé par l'ajout de
   `ac0614Sec03_throwsAccessDenied_whenCallerIsRoleUser` avant merge.
3. **Bug de dédup toast (paramètre `{ name }` manquant) — trouvé en review rétrospective de
   `pivot-ui` #85** (89/100, 2026-07-06T05:46:50Z) : `confirmStatusChange()` omettait `{ name }`
   dans son toast de succès, même défaut que `confirmRoleChange()` (US06.1.3). Deux
   réactivations/désactivations sur deux utilisateurs différents dans la fenêtre d'auto-dismiss ne
   produisaient qu'un seul toast visible. Corrigé par `pivot-ui`
   [#98](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/98) (mergée 2026-07-06), avec tests de
   régression pour les deux méthodes (`confirmRoleChange()` et `confirmStatusChange()`). **État
   actuel sur `main` : corrigé.**
4. **Incohérence entre les deux reviews Gate 4 de `pivot-ui` #85 sur la couverture Playwright.**
   La review initiale (100/100, avant merge) affirme avoir ajouté
   `e2e/admin/admin-users-status.spec.ts` comme correctif pour combler une exigence du
   `PULL_REQUEST_TEMPLATE.md` — et ce fichier apparaît bien dans la liste des fichiers modifiés de
   la PR mergée. La review rétrospective (89/100, post-merge) affirme au contraire qu'« aucune
   spec Playwright n'a été ajoutée pour désactivation/réactivation », classant ceci comme un gap
   `🔵` hérité des PR de base. Cette spec retient la **présence confirmée du fichier dans le diff
   mergé** comme fait vérifiable ; l'affirmation contraire de la review rétrospective est une
   incohérence du dossier de review à signaler pour correction, pas un gap réel de couverture.
5. **Gap non corrigé, signalé en suivi (review rétrospective `pivot-ui` #85) :**
   `token.interceptor.ts` ne traite que `err.status === 401` comme signal d'expiration de session
   (redirection `/auth/login`) ; comme le backend renvoie systématiquement `403` (voir point 1),
   un utilisateur désactivé puis réactivé dont l'onglet reste ouvert n'est jamais redirigé
   explicitement — ses appels API échouent silencieusement. Préexistant depuis US06.1.3/US06.1.4
   (pas une régression de cette US), nécessite une revue dédiée avec sign-off Expert_OIDC_IAM par
   la règle hard-block OIDC du projet — non traité ici.
6. **Absence de garde "self" pour la réactivation**, contrairement à la désactivation
   (`SelfStatusChangeForbiddenException`) — asymétrie non explicitement demandée par l'AC initial
   mais cohérente avec la sémantique métier (aucune raison de bloquer un admin réactivant son
   propre compte) ; documentée dans le JavaDoc du repo, confirmée intentionnelle par la review
   Gate 4.
7. **Concurrence non gérée sur l'email de réactivation** : deux `PATCH` simultanés sur un même
   compte `INACTIVE` peuvent tous deux lire `wasInactive == true` avant qu'un `save()` ne
   s'applique, et donc envoyer l'email en double — signalé comme point non bloquant en review
   Gate 4 (`pivot-core` #142), aucun AC n'exigeant de garantie sous concurrence pour ce cas.
