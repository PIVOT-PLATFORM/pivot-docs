# US08.3.2a — Angular : canvas whiteboard — composant local & outils de dessin

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/canvas-ws/us-canvas-angular-08-3-2a.md` (F08.3 — Canvas collaboratif temps réel, EPIC-collaboration E30)
- **PR** : `pivot-collaboratif-ui` [#24](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/24)
  (`feat/us08-3-2a-canvas-local`) — ferme l'issue #23
- **Merge commit** : `cb0bf67`
- **Gate 2 COVERAGE** : 195 tests Vitest, 86.32 % coverage (≥ 85 requis)
- **Gate 4 MERGE_CONFIDENCE** : 92/100 — AC coverage 45/50 · Code quality 22/25 · Hard blocks 25/25 — auto-approuvé (seuil ≥ 85)
- **Dépend de** : EN08.1 (isolation WS room), US08.3.1 (connexion WS canvas — contrat de message consommé plus tard par US08.3.2b)

---

## Spec fonctionnelle

### WhiteboardCanvasComponent

Composant canvas local complet, **sans synchronisation réseau** à ce stade (déléguée à US08.3.2b) :

- 6 outils de dessin, sélection multiple, groupement, copier/coller, minimap, zoom/pan, édition de
  texte, guides d'alignement intelligents — périmètre enrichi lors de la revue de parité
  concurrentielle (2026-07-07, voir note Size L → XL dans le backlog)
- Undo/redo local via `UndoRedoService` dédié (voir US08.3.3 ci-dessous — implémenté par
  anticipation dans cette même PR, une pile de snapshots à 50 entrées, exposée via signals)
- i18n complet (fr/en), WCAG 2.1 AA, route lazy-loaded

### Anticipation de la synchronisation réseau (US08.3.2b)

`applyRemoteAction()` est déjà exposée par le composant pour appliquer une action reçue du réseau
sans provoquer de ré-émission (évite l'écho) — le contrat exact (forme du message, service
d'appel) reste à finaliser par US08.3.2b, qui consommera l'endpoint STOMP et les topics posés par
US08.3.1.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-collaboratif-ui`)

| Fichier | Rôle |
|---------|------|
| `whiteboard/canvas/whiteboard-canvas.component.ts` (nouveau) | Composant principal, standalone, signals |
| `whiteboard/canvas/whiteboard-canvas.component.html` (nouveau) | Template — canvas + barre d'outils |
| `whiteboard/canvas/whiteboard-canvas.component.scss` (nouveau) | BEM |
| `whiteboard/canvas/whiteboard-canvas.component.spec.ts` (nouveau) | 195 tests (composant + modèle + géométrie) |
| `whiteboard/canvas/model/canvas.model.ts` (nouveau) | Types et constantes (outils, formes, limites) |
| `whiteboard/canvas/model/canvas-geometry.ts` (nouveau) | Bounding box, hit-test, translation |
| `core/whiteboard/undo-redo.service.ts` (nouveau) | Pile de snapshots (50 entrées), signals — US08.3.3 |
| `whiteboard/whiteboard.routes.ts` (modifié) | Route canvas lazy-loaded |
| `public/assets/i18n/{fr,en}.json` (modifiés) | Clés canvas + outils |

### Point d'extension pour US08.3.2b

```typescript
applyRemoteAction(action: RemoteCanvasAction): void
```

Applique une action reçue du serveur (DRAW/UNDO d'un autre participant) à l'état local du canvas
sans déclencher de nouvelle émission — le service de synchronisation (US08.3.2b, `WhiteboardSyncService`
à créer) appellera cette méthode en réaction aux messages du topic `/topic/whiteboard/{boardId}`
posé par US08.3.1.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US08.3.1 | Backend WS déjà en place (endpoint + topics) — cette US ne s'y connecte pas encore, `applyRemoteAction()` est le point d'attache prévu |
| US08.3.2b | Branchera `WhiteboardSyncService` sur `applyRemoteAction()` et gérera les états de connexion STOMP |
| US08.3.2c | Overlay de curseurs — se greffera sur ce composant une fois la présence temps réel branchée (US08.3.2b + US08.5.1) |
| US08.3.3 | Undo/Redo implémenté par anticipation dans cette même PR (`UndoRedoService`) — l'US US08.3.3 elle-même reste à documenter/clôturer séparément si un écart de périmètre subsiste (ex. émission de l'événement `UNDO` réseau, porté par US08.3.1 côté backend, restant à câbler côté client par US08.3.2b) |
| US08.2.3 | `SharePanelComponent` sera déclenché depuis l'interface de ce canvas (hors périmètre de cette US) |

## Hors périmètre (explicitement exclu)

- Toute synchronisation réseau réelle (US08.3.2b)
- Overlay de curseurs des autres participants (US08.3.2c)
- Panneau de présence (US08.5.1)
- Tests E2E Playwright (différés, environnement complet non disponible à ce stade)
