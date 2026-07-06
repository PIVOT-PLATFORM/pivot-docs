# EN-NOTIF — Infrastructure notifications in-app

**Type d'enabler** : architecture · transversal

> **Prérequis de US16.1.3 (badge notifications).** Sans cet enabler, US16.1.3 ne peut pas être implémentée.

**Critères de complétion** :
- [x] Table BDD `notifications` : id, userId, tenantId, type, title, body, readAt (nullable), createdAt
- [x] Service `NotificationService` : `create(userId, type, payload)` + `markAsRead(notificationId, userId)`
- [x] Endpoint GET /api/notifications?page=0&size=20 (paginé, trié createdAt DESC)
- [x] Endpoint GET /api/notifications/unread-count → { count: number }
- [x] Endpoint PATCH /api/notifications/{id}/read → marquer comme lu
- [x] Endpoint PATCH /api/notifications/read-all → marquer toutes comme lues
- [x] Isolation tenant : un utilisateur ne voit jamais les notifications d'un autre tenant
- [x] Producteurs définis : US01.5.1 (actions sensibles), US01.4.3a (appareil inconnu), US06.1.3 (changement rôle), US06.1.4 (désactivation compte)
- [x] Mécanisme push : STOMP channel /user/{userId}/queue/notifications (ou polling 30s si WS non dispo)
- [x] Tests TI : isolation tenant, producteur → consommateur, unread-count

**Dépendances** : EN01.1 (opaque tokens), EN03.1 (module system si notifications liées aux modules)

**Statut** : 🔎 En review — `pivot-core` PR [#160](https://github.com/PIVOT-PLATFORM/pivot-core/pull/160)

**Notes d'implémentation (producteurs)** :
- US06.1.3 (changement de rôle) et US06.1.4 (désactivation de compte) sont câblés réellement dans
  `AdminUserService`, déjà fusionné sur `main` — `NotificationType.ROLE_CHANGED` /
  `ACCOUNT_DEACTIVATED`.
- US01.5.1 (`pivot-core` PR [#154](https://github.com/PIVOT-PLATFORM/pivot-core/pull/154)) et
  US01.4.3a (`pivot-core` PR [#151](https://github.com/PIVOT-PLATFORM/pivot-core/pull/151)) ne sont
  pas encore fusionnées et ne publient aujourd'hui aucun événement consommable (appel direct
  `EmailService`, pas d'`ApplicationEvent`) — `NotificationType.SENSITIVE_ACTION` /
  `UNKNOWN_DEVICE` et leurs clés i18n existent déjà côté infrastructure, mais le câblage réel est
  documenté comme point d'intégration en attente (`fr.pivot.notification.listener`,
  package-info.java) plutôt que fabriqué par anticipation. À finir dès la fusion de ces deux PR.

---
Item Type: Enabler · Parent: E03 (transversal) · Type: architecture · Module: core · Phase: Socle
Stage: Review · Priority: Medium
