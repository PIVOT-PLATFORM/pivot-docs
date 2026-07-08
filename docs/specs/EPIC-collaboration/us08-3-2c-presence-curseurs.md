# US08.3.2c — Angular : canvas whiteboard — présence des participants (curseurs)

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/canvas-ws/us-canvas-angular-08-3-2c.md`
  (F08.3 — Canvas collaboratif temps réel, EPIC-collaboration E30)
- **Issue** : `pivot-collaboratif-ui`
  [#27](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/issues/27)
- **PR** : `pivot-collaboratif-ui`
  [#33](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/33)
  (`feat/us08-3-2c-presence-curseurs`)
- **Gate 2 COVERAGE** : 92/100 — coverage globale du repo 87.46 % statements / 90.72 % lignes ;
  fichiers de cette US : `whiteboard-presence.component.ts` 98.73 % lignes / 98.48 % statements,
  `whiteboard-sync.service.ts` (étendu) 98.31 % statements / 97.51 % lignes
- **Gate 3 QUALITY** : 96/100 — 14/15 checks CI verts ; `E2E - Playwright` rouge sur le gap infra
  GHCR préexistant déjà documenté sur `pivot-collaboratif-ui`#29/#30/#31/#32 (image
  `ghcr.io/pivot-platform/pivot-collaboratif-core` introuvable sur le runner), non lié au code de
  cette PR
- **Dépend de** : US08.3.2b (`WhiteboardSyncService`, client STOMP — `pivot-collaboratif-ui`#31,
  mergée) et US08.5.1 volet backend (présence — `pivot-collaboratif-core`#33, mergée)
- **Périmètre de cette spec** : overlay de curseurs SVG uniquement. Le panneau/liste des
  participants (`PresencePanelComponent`) reste porté par US08.5.1 (`pivot-collaboratif-ui`#22,
  pas encore fait) — voir [Hors périmètre](#hors-périmètre-explicitement-exclu).

---

## Spec fonctionnelle

### Overlay de curseurs

`WhiteboardPresenceComponent` (nouveau) est un overlay SVG `aria-hidden="true"` (purement
décoratif — jamais interactif, jamais dans l'arbre d'accessibilité) projeté au-dessus du
`<canvas>` de `WhiteboardCanvasComponent` (US08.3.2a) via un nouveau slot `<ng-content>` ajouté
dans `wb-canvas-area` — ce placement garantit que l'overlay épouse exactement les dimensions du
canvas (CSS `position: absolute; inset: 0`), sans dupliquer la logique de layout.

Chaque participant actif est représenté par un curseur (triangle + libellé `displayName`),
coloré avec la couleur assignée par le serveur au `JOIN` (`ParticipantInfo.color`, palette de 12
couleurs déterministe par `userId`, `ColorPaletteService` côté backend — **jamais recalculée côté
client**).

### Découverte Gate 1 en implémentation — contrat à deux topics

Le fichier backlog initial décrivait `CURSOR_MOVE` et `PARTICIPANTS_UPDATE` comme diffusés tous
deux sur `/topic/whiteboard/{boardId}` (le topic principal, partagé avec JOIN/LEAVE/DRAW/UNDO).
Vérification du code backend réel (`ParticipantsBroadcastService`, `CanvasActionService`) montre
que ce n'est vrai que pour `CURSOR_MOVE` :

| Message | Topic | Forme du payload |
|---------|-------|-------------------|
| `CURSOR_MOVE` | `/topic/whiteboard/{boardId}` (topic principal) | `BroadcastCanvasMessage { type, boardId, userId, data: { x, y } }` |
| `PARTICIPANTS_UPDATE` | `/topic/whiteboard/{boardId}/presence` (sous-topic dédié) | `ParticipantsUpdatePayload { participants: [...] }` — **pas** d'enveloppe `type`/`boardId`/`userId` |

`WhiteboardSyncService` souscrit désormais aux deux topics (`connect()`), avec une validation
distincte par forme de payload (`onIncoming` vs `onPresenceIncoming`). Isolation du sous-topic
héritée d'`WhiteboardChannelInterceptor` (EN08.1) sans modification — son préfixe de destination
(`/topic/whiteboard/`) couvre déjà le suffixe `/presence`, non dupliqué côté client.

### Émission locale — throttle 50ms

`WhiteboardPresenceComponent` capture la position du pointeur local via un `HostListener` au
niveau `window` (l'overlay lui-même reste `pointer-events: none`, purement décoratif — jamais
d'interception des événements destinés au canvas) et calcule la position relative au rect de son
propre host (qui épouse le canvas). Un throttle "leading edge" — la première position après
50 ms de silence est envoyée immédiatement, les suivantes dans la fenêtre sont abandonnées, pas
mises en file — limite l'envoi STOMP (`sync.publish('CURSOR_MOVE', { x, y })`) à au plus un
message toutes les 50 ms, conformément à l'AC. Le throttle est implémenté dans le composant (pas
dans `WhiteboardSyncService.publish`) afin d'être directement observable par sa propre suite
Vitest.

### Réception distante — timeout d'inactivité et cohérence de présence

- Un `CURSOR_MOVE` reçu pour un `userId` déjà connu (présent dans la dernière liste
  `PARTICIPANTS_UPDATE`) positionne/repositionne son curseur et (ré)arme un minuteur
  d'inactivité de 5 s ; à expiration, le curseur est retiré.
- Un `CURSOR_MOVE` reçu pour un `userId` **sans** `JOIN` préalable (ex. message tardif après une
  reconnexion) est ignoré, avec un `console.warn` — jamais de curseur fantôme créé.
- Un `PARTICIPANTS_UPDATE` qui ne contient plus un `userId` déjà affiché retire son curseur
  **immédiatement**, indépendamment du minuteur d'inactivité (couvre le cas déconnexion propre
  comme la purge côté backend après timeout heartbeat, cf. US08.5.1).

### Sécurité — XSS

`displayName` est rendu via l'interpolation Angular standard (`{{ }}`) dans un `<text>`/`<title>`
SVG — jamais `[innerHTML]`. Angular échappe automatiquement le contenu interpolé ; testé
explicitement en vérifiant l'absence de balise injectée (`<img>`) dans le DOM rendu pour un
`displayName` contenant du markup.

### Simplification documentée — espace de coordonnées

`x`/`y` sont capturés/rendus en pixels bruts relatifs au rect de l'overlay (donc du canvas), sans
compensation du zoom/pan local de chaque participant (`WhiteboardCanvasComponent.zoom`/`panX`/
`panY` restent un état interne privé, non exposé pour réutilisation cross-composant). Deux
participants avec un zoom/pan local différent verront le curseur de l'autre à une position
visuellement différente relativement au contenu dessiné, bien que la position bouge en temps réel
pour les deux. Aucun AC de cette US n'exige un alignement pixel-parfait multi-viewport —
décision documentée dans le TSDoc du composant, pas un oversight silencieux. Une US future pourrait
aligner ce comportement sur la transformation monde de `WhiteboardCanvasComponent` si nécessaire.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-collaboratif-ui`)

| Fichier | Rôle |
|---------|------|
| `whiteboard/presence/whiteboard-presence.component.ts` (nouveau) | Overlay SVG de curseurs — throttle émission, timeout réception, cohérence JOIN/PARTICIPANTS_UPDATE |
| `whiteboard/presence/whiteboard-presence.component.html` (nouveau) | Template SVG, `aria-hidden="true"`, `<text>`/`<title>` interpolés (jamais `innerHTML`) |
| `whiteboard/presence/whiteboard-presence.component.scss` (nouveau) | Overlay `position: absolute; inset: 0; pointer-events: none` |
| `whiteboard/presence/whiteboard-presence.component.spec.ts` (nouveau, TU) | 13 tests — rendu overlay, throttle, timeout, ignore CURSOR_MOVE sans JOIN, retrait immédiat, XSS, cleanup |
| `core/whiteboard/whiteboard-sync.service.ts` (modifié) | Souscription au sous-topic `/presence`, routage `CURSOR_MOVE` vers `cursorMoves$`, nouveaux types `RemoteCursorMove`/`ParticipantInfo` |
| `core/whiteboard/whiteboard-sync.service.spec.ts` (modifié) | Tests routage CURSOR_MOVE, validation PARTICIPANTS_UPDATE, isolation `boardId` |
| `whiteboard/canvas/whiteboard-canvas.component.html` (modifié) | Ajout `<ng-content>` dans `wb-canvas-area` (slot de projection pour l'overlay) |
| `whiteboard/board/whiteboard-board.component.ts`/`.html`/`.spec.ts` (modifiés) | Câblage `<app-whiteboard-presence>` projeté dans `<app-whiteboard-canvas>` |
| `public/assets/i18n/fr.json`/`en.json` (modifiés) | `whiteboard.presence.cursorLabel` |

### Topics STOMP consommés (contrat fixé par US08.3.1/US08.5.1, non modifié côté backend)

| Topic | Contenu | Forme du payload |
|-------|---------|-------------------|
| `/topic/whiteboard/{boardId}` | `CURSOR_MOVE` (parmi JOIN/LEAVE/DRAW/UNDO) | `BroadcastCanvasMessage` |
| `/topic/whiteboard/{boardId}/presence` | `PARTICIPANTS_UPDATE` | `ParticipantsUpdatePayload` (brut, sans enveloppe) |

### API publique ajoutée à `WhiteboardSyncService`

| Membre | Rôle |
|--------|------|
| `cursorMoves$: Subject<RemoteCursorMove>` | Émet chaque `CURSOR_MOVE` validé (`{ userId, x, y }`) |
| `participantsUpdates$: Subject<ParticipantInfo[]>` | Émet la liste validée à chaque `PARTICIPANTS_UPDATE` |
| `publish('CURSOR_MOVE', { x, y })` | Réutilise l'entrée générique déjà existante (US08.3.3) — aucune nouvelle méthode publique dédiée |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US08.3.2a | Overlay projeté dans son nouveau slot `<ng-content>` (`wb-canvas-area`) — composant canvas lui-même non modifié fonctionnellement |
| US08.3.2b | Réutilise `WhiteboardSyncService` (client STOMP, gestion connexion) — étendu, pas remplacé |
| US08.3.3 | Réutilise l'entrée générique `publish(type, data)` déjà introduite pour `UNDO` — aucun changement à cette méthode |
| US08.5.1 (backend) | Consomme telle quelle la couleur/liste assignées côté serveur (`ParticipantsBroadcastService`, `ColorPaletteService`) — aucune logique dupliquée côté client |
| US08.5.1 (`PresencePanelComponent`, `ui#22`) | Reste à faire, hors périmètre de cette US — partage le même flux `participantsUpdates$` côté `WhiteboardSyncService` si besoin, sans couplage direct entre les deux composants |

## Hors périmètre (explicitement exclu)

- Panneau/liste des participants connectés (avatars, indicateur actif/inactif, overflow "+N") —
  porté exclusivement par US08.5.1/`PresencePanelComponent` (`pivot-collaboratif-ui`#22, pas
  encore fait).
- Historique/replay des positions de curseurs, avatars image, statut "en train d'écrire", laser
  pointer — non Socle (voir fichier backlog).
- Alignement pixel-parfait multi-viewport (compensation zoom/pan local par participant) — non
  couvert par les AC de cette US, voir "Simplification documentée" ci-dessus.
- Montée en charge > 50 participants mesurée (test de charge) — architecture dimensionnée par
  design (throttle + SVG), non mesurée ; montée en charge réelle relève d'US30.2.7 (phase-3).
