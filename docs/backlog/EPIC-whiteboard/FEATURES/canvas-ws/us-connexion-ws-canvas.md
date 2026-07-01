# US08.3.1 — Connexion WebSocket au canvas d'un tableau

**En tant que** utilisateur
**Je veux** me connecter en temps réel au canvas d'un tableau via WebSocket
**Afin de** collaborer simultanément avec d'autres participants

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Endpoint STOMP : `/ws/whiteboard/{boardId}` avec isolation room (EN08.1) | ⬜ | ⬜ |
| Authentification token opaque sur le handshake WS | ⬜ | ⬜ |
| Messages : JOIN, LEAVE, DRAW, CURSOR_MOVE, UNDO | ⬜ | ⬜ |
| Broadcast aux participants du même tableau uniquement | ⬜ | ⬜ |
| Tests TI WebSocket board session (Testcontainers + WS client) | ⬜ | ⬜ |
| À la souscription STOMP sur /topic/whiteboard/{boardId}, backend vérifie que l'user est membre actif (owner/editor/viewer) ET board.tenantId == token.tenantId. Souscription non autorisée → déconnexion WS code 1008 | ⬜ | ⬜ |
| Handler STOMP rejette tout message dont le type n'est pas dans la whitelist {JOIN, LEAVE, DRAW, CURSOR_MOVE, UNDO} avec log WARN | ⬜ | ⬜ |
| Payload DRAW limité à 64 Ko. Payload > limite → STOMP ERROR frame sans déconnecter les autres participants | ⬜ | ⬜ |
| Rate limit par connexion WS : maximum 30 messages DRAW/seconde par user par board. Dépassement → STOMP ERROR + fermeture après 3 violations consécutives | ⬜ | ⬜ |
| Token opaque transmis au handshake WS via header HTTP Authorization: Bearer {token} — jamais via cookie, query param ou header personnalisé | ⬜ | ⬜ |
| Contrat JSON des messages : JOIN { userId, displayName, avatarUrl, color } · LEAVE { userId } · CURSOR_MOVE { userId, x, y } · DRAW { type, tool, payload } · UNDO { userId, eventId } | ⬜ | ⬜ |
| Message PARTICIPANTS_UPDATE émis à chaque JOIN/LEAVE contenant la liste complète des participants connectés | ⬜ | ⬜ |
| Heartbeat STOMP : serveur envoie ping toutes les 25s. Client sans heartbeat pendant 30s = connexion perdue → reconnexion | ⬜ | ⬜ |
| Les événements DRAW sont persistés en BDD pour qu'un utilisateur rejoignant plus tard voie le canvas existant (à valider : persistance complète ou snapshot périodique) | ⬜ | ⬜ |
| UNDO : hors scope de cette US — délégué à US08.3.3 (US dédiée à créer) | ⬜ | ⬜ |
| Stratégie de conflit en cas de modification simultanée : Last-Write-Wins (MVP) | ⬜ | ⬜ |
| Métrique messages_throttled_total exposée via Micrometer | ⬜ | ⬜ |

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: MVP · Size: M · Priority: High
Human Gate: needs-human-valid · Stage: Backlog
