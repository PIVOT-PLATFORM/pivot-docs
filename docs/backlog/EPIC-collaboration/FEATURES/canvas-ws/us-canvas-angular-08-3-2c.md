# US08.3.2c — Angular : canvas whiteboard — présence des participants (curseurs)

**En tant que** utilisateur
**Je veux** voir les curseurs des autres participants en temps réel sur le canvas
**Afin de** savoir où chacun travaille et éviter les conflits d'édition

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Chaque participant connecté a un curseur visible sur le canvas | ⬜ |
| Curseur affiche `displayName` du participant + couleur unique attribuée au JOIN | ⬜ |
| Couleur attribuée côté serveur (déterministe par `userId`) — pas côté client | ⬜ |
| Overlay curseurs en SVG au-dessus du `<canvas>` (`aria-hidden="true"` — décoratif) | ⬜ |
| Événement `CURSOR_MOVE` throttlé à **50ms minimum** avant envoi STOMP | ⬜ |
| Curseur disparaît après 5s sans activité du participant (timeout local) | ⬜ |
| Participant déconnecté → curseur retiré de l'overlay immédiatement | ⬜ |
| `CURSOR_MOVE` reçu pour un `userId` sans `JOIN` préalable (état incohérent, ex. message tardif après reconnexion) → ignoré côté client, log `console.warn`, pas de curseur fantôme créé | ⬜ |
| Grand nombre de curseurs affichés simultanément (≥ 50, cf. US30.2.7 hors Socle) : pas de dégradation visuelle du canvas (throttle + overlay SVG déjà dimensionnés pour cette charge) | ⬜ |
| Security : `displayName` rendu échappé (texte SVG `<text>`/`textContent`, jamais `innerHTML`) dans l'overlay curseurs — prévention XSS | ⬜ |
| Security : isolation héritée d'EN08.1 — un client abonné à `/topic/whiteboard/{boardId}` ne reçoit jamais de `JOIN`/`LEAVE`/`CURSOR_MOVE` d'un autre board | ⬜ |
| Tests Vitest `WhiteboardPresenceComponent` : rendu overlay SVG · throttle · timeout inactivité | ⬜ |
| Labels présence internalisés dans `whiteboard.presence.*` (fr.json / en.json) | ⬜ |

## Hors périmètre

- Historique/replay des positions de curseurs : non Socle.
- Avatars image, statut "en train d'écrire", laser pointer : non Socle.
- Attribution de la couleur elle-même (algorithme déterministe par `userId`) : implémentée côté
  backend, US08.5.1 (présence backend) — cette US ne fait que consommer la couleur reçue.
- **Panneau/liste des participants connectés (avatars, indicateur actif/inactif, overflow) :
  entièrement porté par US08.5.1 (`PresencePanelComponent`)** — cette US-ci ne rend que l'overlay
  de curseurs SVG sur le canvas, jamais de liste de participants. (Chevauchement identifié lors du
  Gate 1 entre les deux fichiers, tranché ici pour éviter un composant dupliqué : un seul panneau
  de présence, celui de US08.5.1.)
- Montée en charge à très grande échelle (200 participants simultanés) : US30.2.7 (phase-3).

## Notes d'implémentation

- **Composant** : `WhiteboardPresenceComponent` (Angular, `pivot-collaboratif-ui`), overlay SVG
  positionné au-dessus du `<canvas>` de US08.3.2a.
- **Modèle d'événements WebSocket (contrat partagé F08.3, cf. US08.3.1/US08.3.2b)** : consomme
  `CURSOR_MOVE { userId, x, y }` (throttle 50 ms) et `PARTICIPANTS_UPDATE` (émis par le serveur à
  chaque `JOIN`/`LEAVE`, liste complète des participants) sur `/topic/whiteboard/{boardId}`.
- Dépend de US08.3.2b (client STOMP connecté et souscrit) et US08.5.1 (présence backend —
  attribution de couleur déterministe, liste des participants actifs).

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: Ready
Dépendances: US08.3.2b (sync STOMP), US08.5.1 (présence backend)
