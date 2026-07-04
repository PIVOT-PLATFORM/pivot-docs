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

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: MVP · Size: L · Priority: High
Stage: Backlog
Dépendances: EN08.1 (isolation WS room), US08.3.1 (connexion WS)
