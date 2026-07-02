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

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: MVP · Size: M · Priority: High
Stage: Backlog
Dépendances: US08.3.2a (composant canvas local), EN08.1 (isolation WS room), US08.3.1 (connexion WS)
