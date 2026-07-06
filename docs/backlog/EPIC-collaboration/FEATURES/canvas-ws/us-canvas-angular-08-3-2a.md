# US08.3.2a — Angular : canvas whiteboard — composant local & outils de dessin

**En tant que** utilisateur
**Je veux** un canvas interactif avec des outils de dessin (crayon, formes, texte, effacement)
**Afin de** créer et éditer du contenu sur le tableau blanc

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Route `/whiteboard/{boardId}` lazy-loaded depuis `pivot-collaboratif-ui` | ⬜ |
| `WhiteboardCanvasComponent` avec `<canvas>` HTML5 Canvas 2D API | ⬜ |
| Outil crayon : tracé libre (`path Canvas 2D`), épaisseur configurable | ⬜ |
| Outil rectangle : `x/y/width/height`, tracé par drag | ⬜ |
| Outil ellipse : `x/y/rx/ry`, tracé par drag | ⬜ |
| Redimensionnement/déplacement d'un objet : dimensions négatives ou position hors des limites du canvas clampées aux bornes valides (pas d'objet en état incohérent) | ⬜ |
| Outil texte : zone positionnée par double-clic, saisie inline, rendu `fillText` jamais `innerHTML` | ⬜ |
| Contenu texte tronqué à 500 caractères | ⬜ |
| Outil effacement : suppression de l'objet sélectionné (pas de gomme pixel) | ⬜ |
| Outil sélection : clic sur objet → sélectionné + handles de redimensionnement | ⬜ |
| Toolbar `<nav role="toolbar" aria-label="Outils de dessin">` — `<button>` natifs avec `aria-label` + `aria-pressed` sur outil actif | ⬜ |
| Raccourcis clavier : V=sélection · P=crayon · T=texte · E=effacement · R=rectangle · Ctrl+Z=annuler · Ctrl+Y=rétablir · Ctrl+A=tout sélectionner · Suppr=supprimer sélection | ⬜ |
| Dialog raccourcis via touche `?` : `role="dialog"` · focus trap · `aria-label="Raccourcis clavier"` | ⬜ |
| `<canvas aria-label="Canvas collaboratif — [titre]" role="application" tabindex="0">` avec `aria-describedby` raccourcis | ⬜ |
| Navigation clavier : Tab entre éléments · Entrée pour éditer · Suppr pour supprimer · Flèches pour déplacer | ⬜ |
| Zoom : Ctrl+molette ou Ctrl++ / Ctrl+- · Pan : Espace+glisser ou flèches en mode pan | ⬜ |
| Minimap coin inférieur droit (masquable, `aria-label="Minimap — vue d'ensemble du tableau"`) | ⬜ |
| Toolbar flottante repositionnable (défaut gauche) — ne recouvre pas la zone active | ⬜ |
| Choix Canvas 2D API documenté dans ADR projet (pas de lib canvas tierce sans décision explicite) | ⬜ |
| Tests Vitest `WhiteboardCanvasComponent` : rendu outils, raccourcis, a11y (axe-core) | ⬜ |
| Tous les labels toolbar et noms d'outils externalisés dans `whiteboard.canvas.*` (fr.json / en.json) | ⬜ |

## Hors périmètre

- Synchronisation temps réel des actions avec les autres participants (STOMP) : US08.3.2b.
- Curseurs et présence des autres participants : US08.3.2c.
- Logique de la stack undo/redo (application, limite, réinitialisation) : US08.3.3 — cette US ne
  câble que les raccourcis clavier et les boutons toolbar vers le service dédié.
- Reconnaissance d'encre, insertion d'images/fichiers, sections/frames : US30.1.5/.7/.8 (phase-3,
  hors Socle).
- Persistance du contenu du canvas (chargement à la connexion) : couverte côté backend par
  US08.3.1 (ambiguïté persistance à trancher).

## Notes d'implémentation

- **Composant** : `WhiteboardCanvasComponent` (Angular, lazy-loaded sur `/whiteboard/{boardId}`,
  `pivot-collaboratif-ui`), rendu via Canvas 2D API (ADR projet à rédiger — pas de lib canvas
  tierce sans décision explicite).
- **Modèle d'événements WebSocket (contrat partagé F08.3, cf. US08.3.1)** : les actions locales
  (crayon, formes, effacement, déplacement, redimensionnement) sont encodées comme des mutations
  `DRAW` avec un sous-champ `type` (`stroke`/`shape`/`erase`/`move`/`resize`/`text`) — la
  publication effective sur STOMP est faite par `WhiteboardSyncService` (US08.3.2b), ce composant
  reste local/offline-capable et ne connaît pas STOMP directement.
- Les raccourcis Ctrl+Z/Ctrl+Y émettent des événements locaux consommés par `UndoRedoService`
  (US08.3.3), pas d'implémentation de la stack ici.
- Dépend d'EN08.1 (isolation WS room, structure la route et le guard module) et US08.3.1 (contrat
  de messages côté backend).

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: L · Priority: High
Stage: Ready
Dépendances: EN08.1 (isolation WS room), US08.3.1 (connexion WS)
