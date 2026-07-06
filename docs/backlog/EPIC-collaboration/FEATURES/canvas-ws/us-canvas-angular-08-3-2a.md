# US08.3.2a — Angular : canvas whiteboard — composant local & outils de dessin

**En tant que** utilisateur
**Je veux** un canvas interactif avec des outils de dessin (crayon, formes, texte, effacement) au
niveau de finition d'un outil comme Miro ou Microsoft Whiteboard (couleur, sélection multiple,
duplication, alignement)
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
| Palette de couleurs (trait crayon, contour + remplissage formes, texte) : 12 couleurs prédéfinies alignées `@pivot/design-system` + 1 case "personnalisée" (hex validé `^#[0-9A-Fa-f]{6}$`, sinon rejet silencieux et conservation de la dernière couleur valide) | ⬜ |
| Couleur par défaut à la création d'un objet = dernière couleur utilisée par l'utilisateur courant (persistée en session, pas en BDD) | ⬜ |
| Sélection multiple : Maj+clic ajoute/retire un objet de la sélection · glisser sur zone vide dessine un rectangle de sélection (marquee) et sélectionne tous les objets qu'il recouvre | ⬜ |
| Déplacement/suppression/changement de couleur appliqués à toute la sélection multiple simultanément | ⬜ |
| Dupliquer la sélection (`Ctrl+D`) : copie décalée de +16px en x/y, immédiatement sélectionnée à la place de l'originale | ⬜ |
| Copier/coller (`Ctrl+C` / `Ctrl+V`) : presse-papiers interne à l'application (pas de Clipboard API OS, pas de collage cross-board en Socle) — coller sans copie préalable = no-op silencieux | ⬜ |
| Grouper (`Ctrl+G`) une sélection multiple : déplacement/redimensionnement solidaire du groupe · dégrouper (`Ctrl+Maj+G`) restaure l'indépendance des objets | ⬜ |
| Guides d'alignement dynamiques ("smart guides") : pendant un déplacement, ligne pointillée + accrochage (snap, tolérance 8px) quand un bord ou le centre de l'objet déplacé s'aligne avec un bord/centre d'un autre objet | ⬜ |
| Toolbar `<nav role="toolbar" aria-label="Outils de dessin">` — `<button>` natifs avec `aria-label` + `aria-pressed` sur outil actif | ⬜ |
| Sélecteur de couleur : `<button aria-label="Couleur : [nom couleur]">` par swatch, `role="listbox"`/`role="option"` sur le panneau, sélection clavier (flèches + Entrée) | ⬜ |
| Raccourcis clavier : V=sélection · P=crayon · T=texte · E=effacement · R=rectangle · Ctrl+Z=annuler · Ctrl+Y=rétablir · Ctrl+A=tout sélectionner · Ctrl+D=dupliquer · Ctrl+C/Ctrl+V=copier/coller · Ctrl+G/Ctrl+Maj+G=grouper/dégrouper · Suppr=supprimer sélection | ⬜ |
| Dialog raccourcis via touche `?` : `role="dialog"` · focus trap · `aria-label="Raccourcis clavier"` (mis à jour avec les nouveaux raccourcis) | ⬜ |
| `<canvas aria-label="Canvas collaboratif — [titre]" role="application" tabindex="0">` avec `aria-describedby` raccourcis | ⬜ |
| Navigation clavier : Tab entre éléments · Entrée pour éditer · Suppr pour supprimer · Flèches pour déplacer | ⬜ |
| Zoom : Ctrl+molette ou Ctrl++ / Ctrl+- · Pan : Espace+glisser ou flèches en mode pan | ⬜ |
| Minimap coin inférieur droit (masquable, `aria-label="Minimap — vue d'ensemble du tableau"`) | ⬜ |
| Toolbar flottante repositionnable (défaut gauche) — ne recouvre pas la zone active | ⬜ |
| Choix Canvas 2D API documenté dans ADR projet (pas de lib canvas tierce sans décision explicite) | ⬜ |
| Security : couleur personnalisée validée par regex hex stricte côté client ET serveur (schéma JSON du payload `DRAW`, cf. US08.3.1) — jamais interprétée comme expression CSS libre (pas d'injection `url()`/`expression()`) | ⬜ |
| Error : `Ctrl+D`/`Ctrl+C`/`Ctrl+G` sans sélection active → no-op silencieux, boutons toolbar correspondants `aria-disabled="true"` | ⬜ |
| Tests Vitest `WhiteboardCanvasComponent` : rendu outils, couleurs, sélection multiple, duplication, groupement, guides d'alignement, raccourcis, a11y (axe-core) | ⬜ |
| Tous les labels toolbar et noms d'outils/couleurs externalisés dans `whiteboard.canvas.*` (fr.json / en.json) | ⬜ |

## Hors périmètre

- Synchronisation temps réel des actions avec les autres participants (STOMP) : US08.3.2b.
- Curseurs et présence des autres participants : US08.3.2c.
- Logique de la stack undo/redo (application, limite, réinitialisation) : US08.3.3 — cette US ne
  câble que les raccourcis clavier et les boutons toolbar vers le service dédié.
- **Sticky notes, connecteurs/flèches entre objets, sections/frames, reconnaissance d'encre,
  insertion d'images/fichiers** : US30.1.2/.3/.5/.7 (phase-3, hors Socle — périmètre volontairement
  non étendu lors de la revue de parité concurrentielle Miro/Klaxoon/Microsoft Whiteboard du
  2026-07-07, voir `zones-ombre.md` #11). Les ajouts de cette révision (couleur, sélection
  multiple, duplication, copier/coller, groupement, guides d'alignement) restent des
  enrichissements des 5 outils déjà en Socle — aucun nouveau type d'objet.
- Copier/coller **entre boards différents** ou via le presse-papiers OS (Clipboard API) : hors
  scope Socle — presse-papiers interne à la session du composant uniquement.
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
- **Attributs de style** (`strokeColor`, `fillColor`, `groupId`) : portés par le champ générique
  `payload` du message `DRAW` déjà défini par US08.3.1 (`DRAW { type, tool, payload }`) — aucun
  changement du contrat WebSocket, `payload` reste opaque/spécifique à l'outil pour le transport.
- **Sélection multiple / groupement** : géré en mémoire côté composant via un `Set<objectId>` ;
  un `groupId` optionnel sur l'objet (dans `payload`) matérialise un groupement persistant, un
  déplacement/duplication en sélection multiple sans groupe reste une opération ponctuelle sur
  chaque objet (autant de mutations `DRAW` que d'objets déplacés/dupliqués, pas de message groupé
  en un seul envoi — cohérent avec la limite payload 64 Ko et le rate limit 30 msg/s d'US08.3.1).
- **Guides d'alignement** : calcul purement local (comparaison des bounding boxes des objets
  visibles à l'écran), aucun événement réseau dédié — le résultat du déplacement (une fois
  relâché) est publié normalement comme mutation `DRAW` de type `move`.
- Les raccourcis Ctrl+Z/Ctrl+Y émettent des événements locaux consommés par `UndoRedoService`
  (US08.3.3), pas d'implémentation de la stack ici.
- Dépend d'EN08.1 (isolation WS room, structure la route et le guard module) et US08.3.1 (contrat
  de messages côté backend).

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: XL · Priority: High
Stage: Ready
Dépendances: EN08.1 (isolation WS room), US08.3.1 (connexion WS)
Note taille : Size relevé de L à XL lors de la revue de parité concurrentielle (2026-07-07) — le
périmètre enrichi (couleur, multi-sélection, duplication, groupement, guides d'alignement)
justifie un découpage en sous-US par l'Architect Agent avant Gate 2, sur le même principe que la
décomposition déjà appliquée à US08.3.2 (→ 08.3.2a/b/c).
