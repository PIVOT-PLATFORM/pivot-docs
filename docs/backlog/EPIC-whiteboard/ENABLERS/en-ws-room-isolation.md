# EN08.1 — Isolation WebSocket room par board

**Type d'enabler** : architecture · sécurité

**Critères de complétion** :
- [ ] Channel STOMP dédié par board : `/topic/whiteboard/{boardId}`
- [ ] Vérification autorisation à la souscription (l'user doit être membre du board)
- [ ] Isolation stricte : aucune fuite de messages inter-boards
- [ ] Gestion de la présence (connected/disconnected) par board room
- [ ] Tests TI isolation : user non-membre ne reçoit pas les messages
- [ ] Handler STOMP vérifie l'autorisation à deux niveaux : (1) souscription au topic + (2) chaque message DRAW/UNDO reçu — cache court-TTL 5s acceptable pour la performance
- [ ] Révocation de droits prise en compte dans les 5 secondes maximum (cache TTL ≤ 5s)
- [ ] Toute publication SEND sur topic protégé rejetée si non-membre : log WARN + STOMP ERROR sans déconnecter les autres participants
- [ ] IDs de board = UUID v4 générés côté serveur (jamais séquentiels, jamais fournis par le client)
- [ ] Registre de présence doublement indexé par (tenantId, boardId) — aucun événement sans les deux clés
- [ ] Liste des présents émise sur /topic/whiteboard/{boardId}/presence à chaque JOIN/LEAVE
- [ ] Vérification membre = BDD + cache Redis TTL 5min (évite N appels BDD par heartbeat)
- [ ] Token opaque transmis au handshake via Authorization: Bearer — jamais cookie ou query param. Test TI : handshake sans header → 401
- [ ] Test TI : même boardId dans deux tenants distincts = événements de présence indépendants

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E08 · Type: architecture · Module: whiteboard · Phase: MVP
Stage: Backlog · Priority: High
