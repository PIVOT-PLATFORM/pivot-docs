# EN08.1 — Isolation WebSocket room par board

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Garantir que tout événement WebSocket échangé sur un board (dessin,
undo/redo, présence) est strictement cloisonné par board et par tenant côté serveur, sans jamais
faire confiance à une vérification côté client — un utilisateur ne peut ni s'abonner ni publier
sur la room STOMP d'un board auquel il n'a pas accès.

**Justification** : Sans cette isolation, un utilisateur authentifié pourrait s'abonner à
n'importe quel topic `/topic/whiteboard/{boardId}` en devinant ou énumérant un boardId, et
recevoir en clair le contenu (dessins, présence) d'un board privé ou d'un autre tenant — une
violation multi-tenant critique, équivalente à un IDOR appliqué au WebSocket. C'est un prérequis
bloquant pour F08.3 (canvas collaboratif temps réel) et US08.5.1 (présence des participants), qui
s'appuient tous deux sur cette isolation pour être sûrs par construction plutôt que de
réimplémenter des vérifications ad hoc.

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
- [ ] Vérification membre pour le heartbeat de présence (liveness, pas une décision d'autorisation) = BDD + cache Redis TTL 5min (évite N appels BDD par heartbeat) ; l'autorisation SEND/SUBSCRIBE reste sur le cache court ≤ 5s (critère ci-dessus) pour respecter le SLA de révocation
- [ ] Token opaque transmis au handshake via Authorization: Bearer — jamais cookie ou query param. Test TI : handshake sans header → 401
- [ ] Test TI : même boardId dans deux tenants distincts = événements de présence indépendants
- [ ] Tentative de souscription (SUBSCRIBE) à un topic non autorisé : rejetée par une frame STOMP ERROR ("Accès refusé à ce tableau"), aucune entrée ajoutée au registre de présence, session WebSocket non fermée (les autres souscriptions actives de l'utilisateur restent valides)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E08 · Type: architecture · Module: whiteboard · Phase: Socle · Size: M
Stage: Ready · Priority: High
Dépendances: Aucune — prérequis bloquant pour F08.3 (Canvas WS) et US08.5.1 (Présence)
