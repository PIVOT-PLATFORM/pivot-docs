# EN-NOTIF — Infrastructure notifications in-app

## Contexte

- **Enabler** : `docs/backlog/EPIC-module-system/ENABLERS/en-notifications.md` (E03 —
  transversal)
- **PR** : `pivot-core` [#160](https://github.com/PIVOT-PLATFORM/pivot-core/pull/160)
  (`feat/en-notif-infrastructure`)
- **Dernier commit au moment du figeage** : `8bc6ba6` — `fix(notifications): mark
  fr.pivot.notification.config @NullMarked (java:S2638)`
- **Gate 2 COVERAGE** : 89.7 % coverage new code (SonarCloud) — tous les critères de
  complétion de l'Enabler couverts par au moins un test TU ou TI
- **Gate 4 MERGE_CONFIDENCE** : 100/100 (Autoloop, 3 itérations — 1 assertion HTTP corrigée
  [403 vs 401 attendu], 5 findings SonarCloud new-code résolus, 1 finding Sonar résiduel
  documenté comme limitation connue de l'analyseur — voir § Écarts)

## Spec fonctionnelle

Chaque utilisateur authentifié dispose d'un flux de notifications in-app strictement
personnel et cantonné à son tenant : liste paginée triée par date décroissante, compteur de
non-lues, marquage individuel ou en masse comme lu, et un canal de poussée temps réel en
complément (jamais en remplacement) du polling.

- **Création** — `NotificationService.create(userId, type, payload)` résout le destinataire
  (tenant + locale) depuis `users`, rend titre et corps **une fois, à la création**, dans la
  locale du destinataire, puis persiste la ligne. Un changement ultérieur de
  `messages.properties` ou de la locale de l'utilisateur n'altère jamais rétroactivement une
  notification déjà créée.
- **Lecture** — `GET /api/notifications?page=&size=` retourne uniquement les notifications de
  l'appelant, dans son tenant, triées `createdAt DESC` par défaut (page 20, plafond global 100
  via `PaginationConfig`).
- **Compteur** — `GET /api/notifications/unread-count` → `{ count }`.
- **Marquage** — `PATCH /api/notifications/{id}/read` (idempotent — un `id` déjà lu ne change
  pas `readAt`) et `PATCH /api/notifications/read-all` (bulk, une seule requête SQL).
- **Push** — dès qu'une notification est créée et que la transaction est validée
  (`AFTER_COMMIT`), un message est poussé sur `/user/{userId}/queue/notifications` via STOMP.
  Un échec de livraison (utilisateur non connecté, canal indisponible) est journalisé et ne
  fait jamais échouer la création : le polling `GET .../unread-count` (recommandé toutes les
  30 s côté client) reste le filet de sécurité.
- **Isolation tenant** — un utilisateur ne voit jamais les notifications d'un autre tenant, ni
  d'un autre utilisateur de son propre tenant. `tenantId`/`userId` sont toujours résolus depuis
  le token porteur (jamais du corps, d'un paramètre de requête ou d'un en-tête).

### Producteurs

| Producteur | US | Statut | Détail |
|---|---|---|---|
| Changement de rôle | US06.1.3 | ✅ câblé réel | `AdminUserService#updateRole` appelle `NotificationService.create` après révocation des tokens — `NotificationType.ROLE_CHANGED` |
| Désactivation de compte | US06.1.4 | ✅ câblé réel | `AdminUserService#updateStatus` (branche `INACTIVE` uniquement — jamais pour la réactivation US06.1.5) — `NotificationType.ACCOUNT_DEACTIVATED` |
| Action sensible sur le compte | US01.5.1 | ⏳ défini, pas câblé | `NotificationType.SENSITIVE_ACTION` + clés i18n existent ; `pivot-core` PR [#154](https://github.com/PIVOT-PLATFORM/pivot-core/pull/154) (branche `feat/us01-5-1-email-action-sensible`) n'est pas fusionnée et ne publie aucun `ApplicationEvent` à ce jour (appel direct `EmailService`) |
| Connexion depuis un appareil inconnu | US01.4.3a | ⏳ défini, pas câblé | `NotificationType.UNKNOWN_DEVICE` + clés i18n existent ; `pivot-core` PR [#151](https://github.com/PIVOT-PLATFORM/pivot-core/pull/151) (branche `feat/us01-4-3a-alerte-connexion-suspecte`) n'est pas fusionnée, même constat |

## Contrat technique

### Schéma BDD (`public.notifications`, pliée dans `V1__schema_init.sql`)

| Colonne | Type | Détail |
|---|---|---|
| `id` | `BIGSERIAL` | PK |
| `user_id` | `BIGINT NOT NULL` | FK `users(id)` ON DELETE CASCADE |
| `tenant_id` | `BIGINT NOT NULL` | FK `tenants(id)` ON DELETE CASCADE — dénormalisé depuis `users.tenant_id` à la création, jamais accepté de l'appelant |
| `type` | `VARCHAR(30) NOT NULL` | `CHECK IN ('ROLE_CHANGED','ACCOUNT_DEACTIVATED','SENSITIVE_ACTION','UNKNOWN_DEVICE')` |
| `title` / `body` | `VARCHAR(255)` / `TEXT` | déjà rendus dans la locale du destinataire à la création |
| `read_at` | `TIMESTAMPTZ` (nullable) | `NULL` = non lue |
| `created_at` | `TIMESTAMPTZ NOT NULL DEFAULT NOW()` | — |

Index : `(user_id, tenant_id, created_at DESC)` pour la pagination · index partiel
`(user_id, tenant_id) WHERE read_at IS NULL` pour le comptage non-lues.

### Endpoints (`fr.pivot.notification.controller.NotificationController`, `/notifications`)

| Méthode | Route | Réponse | Codes |
|---|---|---|---|
| `GET` | `/api/notifications?page=&size=` | `Page<NotificationDto>` (Spring Data, tri `createdAt DESC` par défaut) | 200 / 401 |
| `GET` | `/api/notifications/unread-count` | `{ "count": number }` | 200 / 401 |
| `PATCH` | `/api/notifications/{id}/read` | `NotificationDto` mis à jour | 200 / 401 / 404 (id inconnu ou d'un autre utilisateur — jamais 403) |
| `PATCH` | `/api/notifications/read-all` | `{ "updatedCount": number }` | 200 / 401 |

`NotificationDto` : `id, type, title, body, readAt, createdAt` — jamais `userId`/`tenantId`
(implicites, propres à l'appelant), jamais l'entité JPA.

### Service (`fr.pivot.notification.service.NotificationService`)

```java
Notification create(Long userId, NotificationType type, NotificationPayload payload)
Page<NotificationDto> list(Long userId, Long tenantId, Pageable pageable)
long unreadCount(Long userId, Long tenantId)
NotificationDto markAsRead(Long notificationId, Long userId)
int markAllAsRead(Long userId, Long tenantId)
```

`NotificationType` (enum fermé) porte les clés `messages.properties` titre/corps.
`NotificationPayload.of(Object... args)` porte les arguments de substitution
(`java.text.MessageFormat`).

### Push STOMP

- Endpoint `POST /api/ws/notifications` (STOMP over WebSocket, `NotificationWebSocketConfig`).
  `permitAll()` côté `SecurityConfig` — la poignée de main HTTP ne peut pas porter d'en-tête
  `Authorization` personnalisé (limitation du WebSocket natif des navigateurs).
- Authentification réelle sur la première frame STOMP `CONNECT`
  (`StompAuthChannelInterceptor`) : en-tête natif `Authorization: Bearer <token>`, validé via
  `TokenService#validate` (même mécanisme que les requêtes REST). Toute frame `CONNECT` sans
  token valide est rejetée (`MessagingException`), la session STOMP n'est jamais établie.
- `NotificationService.create` publie un `NotificationCreatedEvent` (userId + DTO, jamais
  l'entité JPA) après persistance ; `NotificationPushListener`
  (`@TransactionalEventListener(phase = AFTER_COMMIT)`) traduit l'événement en
  `SimpMessagingTemplate.convertAndSendToUser(userId, "/queue/notifications", dto)`.

### Fichiers introduits / modifiés (`pivot-core`)

| Fichier | Rôle |
|---|---|
| `fr.pivot.notification.entity.Notification` | Entité JPA |
| `fr.pivot.notification.repository.NotificationRepository` | Requêtes scopées `userId`+`tenantId` |
| `fr.pivot.notification.service.{NotificationService,NotificationType,NotificationPayload}` | Logique métier |
| `fr.pivot.notification.dto.{NotificationDto,UnreadCountResponse,MarkAllReadResponse}` | Contrat API |
| `fr.pivot.notification.controller.NotificationController` | Endpoints REST |
| `fr.pivot.notification.config.{NotificationWebSocketConfig,StompAuthChannelInterceptor}` | STOMP + auth CONNECT |
| `fr.pivot.notification.event.NotificationCreatedEvent` / `fr.pivot.notification.listener.NotificationPushListener` | Push découplé (AFTER_COMMIT) |
| `fr.pivot.notification.listener` (package-info.java) | Documente les 2 points d'intégration en attente (US01.5.1/US01.4.3a) |
| `fr.pivot.auth.service.AdminUserService` | Câblage réel des 2 producteurs déjà fusionnés (US06.1.3/US06.1.4) |
| `fr.pivot.config.SecurityConfig` | Route WS `permitAll()` documentée |
| `V1__schema_init.sql`, `messages.properties`, `messages_en.properties`, `spotbugs-exclude.xml` | Schéma, i18n, exclusions SpotBugs |

## Écarts vs AC initiaux

Aucun écart de fond sur les 10 critères de complétion de l'Enabler — tous couverts. Deux
précisions de portée, conformes à l'AC elle-même (« producteurs définis », pas « producteurs
câblés ») :

- **US01.5.1 et US01.4.3a définis mais pas câblés.** Leurs PR productrices (`pivot-core` #154
  et #151) ne sont pas fusionnées sur `main` et, telles qu'implémentées sur leurs branches
  respectives, ne publient aucun `ApplicationEvent` consommable (appel direct à `EmailService`
  pour #154 ; simple log structuré pour #151). `NotificationType.SENSITIVE_ACTION` /
  `UNKNOWN_DEVICE` et leurs clés i18n existent déjà côté infrastructure ; le point d'intégration
  exact (deux options : appel direct dans le service producteur, ou nouvel événement + listener)
  est documenté dans `fr.pivot.notification.listener` (package-info.java) plutôt que fabriqué
  par anticipation — voir CLAUDE.md, principe « pas de câblage à du code qui n'existe pas
  encore sur main ».
- **`TrustedDeviceRevokedEvent`** (US01.4.2 / `pivot-core` PR
  [#152](https://github.com/PIVOT-PLATFORM/pivot-core/pull/152), également non fusionnée) existe
  réellement sur sa branche et est documenté comme point de câblage futur pour US01.5.1 — mais
  ce n'est ni US01.5.1 ni US01.4.3a. Non consommé ici (hors périmètre des 4 producteurs listés
  par l'AC EN-NOTIF), pour la même raison que ci-dessus.

## Point résiduel non bloquant (SonarCloud)

Un finding **CRITICAL** persistant `java:S2638` sur `StompAuthChannelInterceptor.java` malgré
2 corrections distinctes (retour `@Nullable`, puis package `fr.pivot.notification.config`
marqué `@NullMarked`) — limitation confirmée de l'analyseur Sonar Java face à la surcharge
d'une méthode JSpecify `@Nullable` de Spring Framework (`ChannelInterceptor#preSend`) depuis un
package tiers, documentée par la communauté SonarSource. Ne fait pas échouer le Quality Gate
SonarCloud (PASSED) ni les hard blocks Gate 3 (Gitleaks / label security-breaking-change /
contrat module-OIDC). À disposer côté SonarCloud UI (Won't Fix / False Positive) par le
mainteneur — aucune suppression inline posée (`// NOSONAR` interdit sans exception, voir
CLAUDE.md).

## Tests

- **TU** : `NotificationServiceTest` (10, create/list/unreadCount/markAsRead/markAllAsRead),
  `StompAuthChannelInterceptorTest` (5, authentification CONNECT), `NotificationPushListenerTest`
  (2, traduction événement → STOMP + tolérance aux échecs), `AdminUserServiceTest` (étendu —
  vérifie le câblage réel des 2 producteurs et l'absence d'appel pour la réactivation US06.1.5).
- **TI** (Testcontainers, `NotificationIntegrationTest`, 10 tests) : isolation tenant (y
  compris défense en profondeur `tenantId` erroné avec `userId` correct), producteur →
  consommateur bout-en-bout via `AdminUserService` réel (rôle changé, compte désactivé, jamais
  pour la réactivation), unread-count end-to-end (création/lecture/lecture en masse), contrat
  HTTP complet (pagination/tri, 404 cross-user, 403 sans token — comportement
  `SecurityConfig` existant, pas spécifique à cet endpoint).
