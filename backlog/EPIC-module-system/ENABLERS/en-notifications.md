# EN-NOTIF — Infrastructure notifications in-app

**Type d'enabler** : architecture · transversal

> **Prérequis de US16.1.3 (badge notifications).** Sans cet enabler, US16.1.3 ne peut pas être implémentée.

**Critères de complétion** :
- [ ] Table BDD `notifications` : id, userId, tenantId, type, title, body, readAt (nullable), createdAt
- [ ] Service `NotificationService` : `create(userId, type, payload)` + `markAsRead(notificationId, userId)`
- [ ] Endpoint GET /api/notifications?page=0&size=20 (paginé, trié createdAt DESC)
- [ ] Endpoint GET /api/notifications/unread-count → { count: number }
- [ ] Endpoint PATCH /api/notifications/{id}/read → marquer comme lu
- [ ] Endpoint PATCH /api/notifications/read-all → marquer toutes comme lues
- [ ] Isolation tenant : un utilisateur ne voit jamais les notifications d'un autre tenant
- [ ] Producteurs définis : US01.5.1 (actions sensibles), US01.4.3a (appareil inconnu), US06.1.3 (changement rôle), US06.1.4 (désactivation compte)
- [ ] Mécanisme push : STOMP channel /user/{userId}/queue/notifications (ou polling 30s si WS non dispo)
- [ ] Tests TI : isolation tenant, producteur → consommateur, unread-count

**Dépendances** : EN01.1 (opaque tokens), EN03.1 (module system si notifications liées aux modules)

**Statut** : ⬜ À planifier — priorité Medium (débloque US16.1.3)

---
Item Type: Enabler · Parent: E03 (transversal) · Type: architecture · Module: core · Phase: MVP
Human Gate: needs-human-valid · Stage: Backlog · Priority: Medium
