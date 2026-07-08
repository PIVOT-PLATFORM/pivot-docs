# US06.2.2 — Super admin désactive un tenant

## Contexte

- **US** : `docs/backlog/EPIC-administration/FEATURES/gestion-tenants/us-desactiver-tenant.md` (F06.2 — Gestion des tenants, EPIC-administration, Module admin)
- **PR** : `pivot-core` [#135](https://github.com/PIVOT-PLATFORM/pivot-core/pull/135) (`feat/us06-2-2-desactiver-tenant`, `feat(api): super admin désactive un tenant (US06.2.2)`) — mergée le 2026-07-05
- **Gate 2 COVERAGE (auto-évaluation dev)** : 97/100
- **Gate 4 MERGE_CONFIDENCE** : 100/100 (2ᵉ passe, après confirmation des 2 points du 1er passage — voir Divergences) — `MERGE_AUTONOMOUS`
- **Dépend de** : rien fonctionnellement, mais entre en collision de fichiers avec US06.2.1 (`pivot-core` #134) et US06.2.3 (`pivot-core` #126), déjà réconciliée à la fusion (voir Divergences)
- Backend uniquement — l'US ne porte aucun critère d'acceptation Angular (le bouton de désactivation côté portail super-admin, s'il est souhaité, n'est pas spécifié par cette US).

---

## Spec fonctionnelle

### `PATCH /api/superadmin/tenants/{tenantId}/status`

- Réservé `ROLE_SUPER_ADMIN` — RBAC porté par `SuperAdminTenantService#updateStatus`
  (`@PreAuthorize("hasRole('SUPER_ADMIN')")`), jamais par le seul contrôleur, pour rester
  incontournable même en appel interne. Appelant sans ce rôle → `AccessDeniedException` → `403`
  (comportement par défaut Spring Security).
- `tenantId` résolu exclusivement depuis le `@PathVariable` — jamais depuis le corps de requête,
  qui ne porte que `{ "status": "INACTIVE" }` (isolation IDOR).
- **Seul `"INACTIVE"` est un statut supporté.** Toute autre valeur (y compris vide, `"ACTIVE"`,
  `"deleted"`) → `UnsupportedTenantStatusException` → `400 {"error":"UNSUPPORTED_TENANT_STATUS"}`,
  rejetée avant même la recherche du tenant en base.
- Tenant introuvable → `TenantNotFoundException` → `404 {"error":"TENANT_NOT_FOUND"}`.
- **Protection du tenant système** : le tenant identifié par le slug configurable
  `pivot.tenant.system-tenant-slug` (défaut `pivot-saas`, comparaison insensible à la casse) ne
  peut jamais être désactivé via cet endpoint → `SystemTenantProtectedException` → `403
  {"error":"SYSTEM_TENANT_PROTECTED", "message": "..."}`. Empêche un super admin de se couper
  lui-même l'accès et de rendre la plateforme inadministrable.
- **Révocation en masse en O(1)** : `updateStatus` pose `tenant.active = false` et
  `tenant.tenant_invalidation_timestamp = now()` en une seule écriture sur la ligne `tenant` —
  jamais d'itération sur les `access_tokens` des utilisateurs du tenant. `TokenService#validate`
  rejette ensuite tout token dont `created_at` n'est **pas strictement postérieur**
  (`!createdAt.isAfter(invalidatedAt)`) à cet horodatage — un token émis exactement à
  l'instant `invalidatedAt` est donc rejeté (égalité stricte testée explicitement). `null` (tout
  tenant existant avant cette US, et tout tenant jamais désactivé) = jamais bloquant, aucune
  régression sur les sessions actives.
- Requête d'un utilisateur d'un tenant désactivé → `TokenService#validate` retourne
  `Optional.empty()`, exactement le même chemin que toute autre cause d'invalidité de token
  (expiré, révoqué, statut non-`ACTIVE`) → `401`, déjà couvert par les tests existants de la
  chaîne d'authentification (pas de nouveau code à ce niveau, chemin réutilisé tel quel).
- **200 uniquement après confirmation** : le service est `@Transactional` et utilise
  `tenantRepository.saveAndFlush(tenant)` — l'`UPDATE` est réellement exécuté avant que la
  méthode ne retourne, et le commit Spring intervient à la sortie du proxy, avant l'envoi de la
  réponse HTTP.
- **Audit** : `AuditService.TENANT_DEACTIVATED` (`tenant.deactivated`), loggé par le contrôleur
  après le succès du service, avec `tenantId` et `actorId` (résolu depuis le contexte de sécurité)
  dans le `meta` JSON. Aucun log d'audit sur les chemins d'erreur (404/403/400).
- Contexte de sécurité sans détail `User` exploitable → `401` avant même d'appeler le service
  (garde côté contrôleur, `resolveActor()`).

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `src/main/java/fr/pivot/tenant/api/SuperAdminTenantController.java` | Ajout de `PATCH /{tenantId}/status` (`updateStatus`), `resolveActor()`, 3 nouveaux `@ExceptionHandler` (`TenantNotFoundException`, `SystemTenantProtectedException`, `UnsupportedTenantStatusException`) |
| `src/main/java/fr/pivot/tenant/api/SuperAdminTenantService.java` | `updateStatus(tenantId, status)` — RBAC, garde tenant système, révocation bulk, `isSystemTenant()`, nouveau champ constructeur `systemTenantSlug` |
| `src/main/java/fr/pivot/tenant/api/TenantStatusRequest.java` | DTO d'entrée (`record`), constante `INACTIVE` |
| `src/main/java/fr/pivot/tenant/api/TenantStatusResponse.java` | DTO de sortie (`record`) |
| `src/main/java/fr/pivot/tenant/api/TenantNotFoundException.java` | → 404 |
| `src/main/java/fr/pivot/tenant/api/SystemTenantProtectedException.java` | → 403 protection tenant système |
| `src/main/java/fr/pivot/tenant/api/UnsupportedTenantStatusException.java` | → 400 statut non supporté |
| `src/main/java/fr/pivot/tenant/entity/Tenant.java` | Colonne `tenantInvalidationTimestamp` (getter/setter) |
| `src/main/java/fr/pivot/auth/service/TokenService.java` | `isTenantInvalidated()` — nouveau garde-fou inséré entre le contrôle d'expiration et le throttle `last_used_at` dans `validate()` |
| `src/main/java/fr/pivot/auth/repository/AccessTokenRepository.java` | `findByTokenHashAndStatusWithUser` étend le `JOIN FETCH` à `user.tenant` (évite un N+1 pour lire `tenant.tenantInvalidationTimestamp` à chaque validation) |
| `src/main/java/fr/pivot/auth/service/AuditService.java` | Constante `TENANT_DEACTIVATED` (`tenant.deactivated`) |
| `src/main/resources/db/migration/V7__tenant_invalidation_timestamp.sql` | `ALTER TABLE tenants ADD COLUMN tenant_invalidation_timestamp TIMESTAMPTZ` |
| `src/main/resources/application.yml` | `pivot.tenant.system-tenant-slug` (défaut `pivot-saas`, override `PIVOT_SYSTEM_TENANT_SLUG`) |
| `src/test/java/fr/pivot/tenant/api/SuperAdminTenantControllerTest.java` | TU contrôleur (MockMvc standalone, service mocké) — 401/200/400/404/403 |
| `src/test/java/fr/pivot/tenant/api/SuperAdminTenantServiceTest.java` | TU service (Mockito) — désactivation, tenant introuvable, protection système (dont casse), statut non supporté |
| `src/test/java/fr/pivot/tenant/api/SuperAdminTenantServiceIntegrationTest.java` | **Nouveau.** TI (Testcontainers Postgres réel, proxy Spring Security réel) — RBAC réel, protection du tenant système seedé (`pivot-saas`), révocation bulk + isolation cross-tenant |
| `src/test/java/fr/pivot/auth/service/TokenServiceTest.java` | TU `validate()` — token avant/après invalidation, égalité stricte, timestamp `null` (régression), token sans user résolvable (défensif) |
| `src/test/java/fr/pivot/tenant/entity/TenantTest.java` | TU accesseurs `tenantInvalidationTimestamp` (défaut `null`, round-trip) |

### Endpoints / modèles / contrats techniques pertinents

```http
PATCH /api/superadmin/tenants/{tenantId}/status
Authorization: Bearer <token ROLE_SUPER_ADMIN>
Content-Type: application/json

{ "status": "INACTIVE" }
```

| Code | Cas | Corps |
|------|-----|-------|
| `200` | Succès, révocation bulk confirmée en base | `{"tenantId": <id>, "status": "INACTIVE"}` |
| `400` | `status` absent/vide ou différent de `"INACTIVE"` | `{"error":"UNSUPPORTED_TENANT_STATUS", "message":"..."}` |
| `401` | Contexte de sécurité sans détail `User` exploitable | — (pas de corps structuré) |
| `403` | Appelant sans `ROLE_SUPER_ADMIN` | comportement par défaut Spring Security |
| `403` | `tenantId` désigne le tenant système (`pivot-saas` par défaut) | `{"error":"SYSTEM_TENANT_PROTECTED", "message":"..."}` |
| `404` | `tenantId` inexistant | `{"error":"TENANT_NOT_FOUND", "message":"..."}` |

Colonne ajoutée : `tenants.tenant_invalidation_timestamp TIMESTAMPTZ` (nullable, `null` = jamais
désactivé). Configuration : `pivot.tenant.system-tenant-slug` (`PIVOT_SYSTEM_TENANT_SLUG`,
défaut `pivot-saas`).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US06.2.1 (création de tenant, `pivot-core` #134) et US06.2.3 (liste des tenants, `pivot-core` #126) | Collision de fichiers attendue et documentée dès l'ouverture des 3 PR : les trois branches créent indépendamment `SuperAdminTenantController`/`SuperAdminTenantService` (package `fr.pivot.tenant.api`) et une migration Flyway `V4__...`. #134 et #126 ont fusionné en premier et renumérotée leur migration en `V6`. Au moment de la fusion de #135, la javadoc collision a été retirée et la migration renumérotée en `V7` — fusion réconciliée sans changement de contrat, uniquement une résolution de fichiers côté mainteneur. |
| Chaîne d'authentification (`TokenAuthenticationFilter`, tout endpoint authentifié de la plateforme) | Modifie le chemin partagé `TokenService#validate`, appelé sur *chaque* requête authentifiée. Revue Security Agent explicitement demandée dans la PR ; confirmé sans régression sur toute la suite `TokenService*` préexistante (`timestamp null` = toujours valide). |

## Hors périmètre (explicitement exclu)

- Tout écran Angular (bouton de désactivation côté portail super-admin, confirmation, toast) —
  aucun AC frontend dans `us-desactiver-tenant.md`, US 100 % `pivot-core`.
- Réactivation d'un tenant (`status: "ACTIVE"`) — explicitement rejetée par
  `UnsupportedTenantStatusException`, seule la désactivation est implémentée par cette US.
- Un test HTTP bout-en-bout (`MockMvc` + chaîne de sécurité réelle) prouvant le `401` littéral
  pour un utilisateur du tenant désactivé — le rejet (`TokenService#validate` → `Optional.empty()`)
  est testé directement (TU+TI) ; c'est le même retour vide que toute autre cause d'invalidité de
  token, déjà couvert par les tests existants de `TokenAuthenticationFilter` (gap assumé, noté en
  Gate 2 : 27/30 sur « pas de code non testé »).

---

## Divergences par rapport au plan initial

1. **Migration Flyway renumérotée `V4` → `V7` à la fusion.** La PR a été développée et son Gate 2
   auto-évalué avec une migration `V4__tenant_invalidation_timestamp.sql`, en collision annoncée
   avec les migrations `V4` des PR sœurs #134/#126 (même motif que la collision de classes
   `SuperAdminTenantController`/`Service`, documentée dans les trois PR dès leur ouverture). #134
   et #126 ayant fusionné avant #135 et déjà renumérotée en `V6`, le fichier final sur `main` est
   `V7__tenant_invalidation_timestamp.sql` — aucun changement de contrat, uniquement une
   renumérotation et une réconciliation de fichiers (voir notes de livraison de US06.2.1 pour le
   détail de la collision à trois).
2. **Duplication mineure `resolveCaller()` / `resolveActor()`.** Le contrôleur portait déjà un
   helper `resolveCaller()` (utilisé par `list()`/`create()`/`checkSlug()`) résolvant l'utilisateur
   authentifié depuis le contexte de sécurité. Cette PR, développée en parallèle sans visibilité
   sur le contenu final du fichier après fusion des PR sœurs, introduit un second helper quasi
   identique `resolveActor()` dédié à `updateStatus()` (mêmes vérifications, même log de rejet).
   Non réconcilié en un seul helper au moment de la fusion — dette mineure, sans impact
   fonctionnel, signalée ici pour visibilité plutôt que silencieusement laissée de côté.
3. **`MockMvc` standalone pour `updateStatus` ne couvre pas la chaîne Spring Security réelle.**
   Signalé comme finding au 1er passage Gate 4, puis confirmé **non-défaut** au 2ᵉ passage : c'est
   la convention établie du dépôt (même pattern que `AdminModuleControllerTest`) — le RBAC réel
   est couvert séparément par `SuperAdminTenantServiceIntegrationTest` (Testcontainers, proxy
   `@PreAuthorize` réel). Aucune correction nécessaire.
4. **Mise à jour du backlog `pivot-docs` explicitement hors périmètre de la PR `pivot-core`.**
   Le 1er passage Gate 4 a relevé que `Stage` restait à `Backlog` dans `us-desactiver-tenant.md` au
   moment de la review ; confirmé hors scope du dépôt `pivot-core` (la PR annonce elle-même ne pas
   toucher aux fichiers backlog) — actée comme suivi requis pour l'agent/mainteneur backlog. `Stage`
   était déjà passé à `Review` avant le présent figeage Gate 5 rétroactif.
