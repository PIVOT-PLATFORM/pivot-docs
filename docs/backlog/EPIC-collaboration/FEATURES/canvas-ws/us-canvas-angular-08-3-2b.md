# US08.3.2b — Angular : canvas whiteboard — synchronisation STOMP & états connexion

**En tant que** utilisateur
**Je veux** que mes actions de dessin soient synchronisées en temps réel avec les autres participants
**Afin de** collaborer sur le même tableau blanc simultanément

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| STOMP client connecté au board room via `@stomp/rx-stomp` (sujet `/topic/whiteboard/{boardId}`) | ⬜ |
| Chaque action locale (DRAW, ERASE, MOVE, RESIZE) publiée sur STOMP avec `boardId` + `userId` + `payload` | ⬜ |
| Actions reçues des autres participants appliquées au canvas local sans écraser l'état local en cours | ⬜ |
| Reconnexion automatique STOMP — backoff exponentiel (1s · 2s · 4s · max 30s) | ⬜ |
| À la navigation vers `/whiteboard/{boardId}` : `GET /api/collaboratif/whiteboard/boards/{boardId}` vérifie appartenance avant init canvas — 403 ou 404 → redirection `/whiteboard` + toast erreur | ⬜ |
| À chaque reconnexion WS : handshake ré-exécute la vérification d'appartenance — user révoqué → STOMP ERROR 1008 | ⬜ |
| État "connexion en cours" : bannière non-intrusive `role="status"` | ⬜ |
| État "connexion perdue" : bannière "Connexion perdue — tentative de reconnexion" · canvas lecture seule (inputs désactivés) | ⬜ |
| État "reconnecté" : bannière disparaît · toast "Reconnecté" (`role="status"` · 3s) · canvas redevient éditable | ⬜ |
| Échec reconnexion après 3 tentatives : "Impossible de rejoindre le tableau" + bouton "Réessayer manuellement" | ⬜ |
| Offline navigateur (événement `offline`) : bandeau "Mode hors ligne — les modifications ne sont pas sauvegardées" · outils désactivés | ⬜ |
| XSS : contenu texte des éléments rendu via `fillText` ou SVG `<text>` — jamais `innerHTML` | ⬜ |
| Messages STOMP entrants validés (type connu, boardId correspond) — ignorés sinon | ⬜ |
| Tests Vitest `WhiteboardSyncService` : mock STOMP · vérif publication · vérif application actions distantes | ⬜ |
| Messages d'état WS internalisés dans `whiteboard.ws.*` (fr.json / en.json) | ⬜ |

## Hors périmètre

- Rendu et outils de dessin locaux : US08.3.2a.
- Curseurs et présence des autres participants : US08.3.2c.
- Logique undo/redo (stack, application) : US08.3.3 — ce service ne fait que publier/relayer le
  message `UNDO`.
- Vérification serveur d'appartenance à la souscription STOMP elle-même (côté backend) : EN08.1 +
  US08.3.1 — cette US ne fait que réagir à un rejet (`STOMP ERROR` 1008) côté client.
- Résolution de conflits avancée (OT/CRDT) : Socle applique les actions distantes en Last-Write-Wins
  côté serveur (US08.3.1) ; ce service se contente d'appliquer ce que le serveur diffuse.

## Notes d'implémentation

- **Service** : `WhiteboardSyncService` (Angular, `pivot-collaboratif-ui`), client STOMP via
  `@stomp/rx-stomp`.
- **Modèle d'événements WebSocket (contrat partagé F08.3, cf. US08.3.1)** : publication client→
  serveur sur `/app/whiteboard/{boardId}/action`, souscription `/topic/whiteboard/{boardId}`.
  Toute mutation locale (crayon, forme, effacement, déplacement, redimensionnement) est encodée
  comme un message `DRAW` unique avec un sous-champ `type` (`stroke`/`shape`/`erase`/`move`/
  `resize`/`text`) — **pas** des types STOMP distincts — un message par action complète (pas de
  streaming point par point), cohérent avec la limite payload 64 Ko et le rate limit 30 msg/s
  définis en US08.3.1.
- **Endpoint d'appartenance** : `GET /api/collaboratif/whiteboard/boards/{boardId}` (backend
  F08.1/F08.2), appelé à la navigation et implicitement revérifié à chaque reconnexion WS via le
  handshake (EN08.1).
- Dépend de US08.3.2a (composant canvas local à qui les actions distantes sont appliquées), EN08.1
  (isolation WS room) et US08.3.1 (contrat de messages, endpoint STOMP, rate limiting côté serveur).

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: Ready
Dépendances: US08.3.2a (composant canvas local), EN08.1 (isolation WS room), US08.3.1 (connexion WS)
