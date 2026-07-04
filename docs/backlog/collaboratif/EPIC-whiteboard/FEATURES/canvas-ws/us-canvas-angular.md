# US08.3.2 — Angular : canvas whiteboard ⚠️ DÉCOMPOSÉE

> **Cette US a été décomposée en 3 sous-US. Ne pas implémenter ce fichier — implémenter les 3 sous-US à la place :**
>
> - [US08.3.2a — Canvas local, outils de dessin et a11y](us-canvas-angular-08-3-2a.md)
> - [US08.3.2b — Sync STOMP et états de connexion](us-canvas-angular-08-3-2b.md)
> - [US08.3.2c — Présence, curseurs temps réel](us-canvas-angular-08-3-2c.md)
>
> **Raison :** US trop volumineuse (XL) pour un seul agent/PR — les 3 sous-US sont indépendantes et parallélisables.

**En tant que** utilisateur
**Je veux** un canvas interactif dans l'interface Angular pour dessiner et collaborer
**Afin de** utiliser le tableau blanc en temps réel

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Route `/whiteboard/{boardId}` (lazy-loaded) | ⬜ |
| Canvas HTML5 ou SVG avec outils : crayon, formes de base, texte, effacement | ⬜ |
| Curseurs des autres participants visibles en temps réel | ⬜ |
| STOMP client connecté au board room (EN08.1) | ⬜ |
| Reconnexion automatique si perte WS | ⬜ |
| Tests Vitest WhiteboardCanvasComponent (mock STOMP) | ⬜ |
| Outil crayon : tracé libre (path Canvas 2D). Formes : rectangle et ellipse (x/y/width/height). Texte : zone de texte positionnable double-clic. Effacement : suppression de l'objet sélectionné (pas de gomme pixel) | ⬜ |
| Choix technologique documenté en ADR : Canvas 2D API (décision à valider) | ⬜ |
| CURSOR_MOVE throttlé à 50ms minimum avant envoi STOMP | ⬜ |
| À la navigation vers /whiteboard/{boardId}, appel GET /api/whiteboard/boards/{boardId} vérifie l'appartenance avant d'initialiser le canvas. 403 ou 404 → redirection /whiteboard + toast d'erreur | ⬜ |
| À chaque reconnexion WS, handshake ré-exécute la vérification d'appartenance. User révoqué → STOMP ERROR 1008 | ⬜ |
| Contenu texte des éléments canvas rendu via Canvas 2D fillText ou SVG <text> textContent — jamais innerHTML. Contenu tronqué à 500 caractères | ⬜ |
| État WS "connexion en cours" : bannière non-intrusive (role="status") | ⬜ |
| État WS "connexion perdue" : bannière "Connexion perdue — tentative de reconnexion", canvas en mode lecture seule (inputs désactivés) | ⬜ |
| État WS "reconnecté" : bannière disparaît + toast "Reconnecté" (role="status", 3s), canvas redevient éditable | ⬜ |
| Échec reconnexion après 3 tentatives : "Impossible de rejoindre le tableau" + bouton "Réessayer manuellement" | ⬜ |
| Offline navigateur (événement offline) : bandeau "Mode hors ligne — les modifications ne sont pas sauvegardées", outils de dessin désactivés | ⬜ |
| Chaque curseur distant : displayName + couleur unique attribuée lors du JOIN. Curseurs en SVG overlay (aria-hidden="true") | ⬜ |
| Toolbar outils : <nav role="toolbar" aria-label="Outils de dessin"> avec <button> natifs. Chaque outil : aria-label explicite + aria-pressed="true" sur l'outil actif | ⬜ |
| Canvas : <canvas aria-label="Canvas collaboratif — [titre]" role="application" tabindex="0"> avec aria-describedby pointant vers liste de raccourcis | ⬜ |
| Mode clavier : Tab pour naviguer entre éléments, Entrée pour éditer, Suppr pour supprimer, flèches pour déplacer | ⬜ |
| Raccourcis clavier : V=sélection, P=crayon, T=texte, E=effacement, R=rectangle, Ctrl+Z=annuler, Ctrl+Y=rétablir, Ctrl+A=tout sélectionner, Suppr=supprimer sélection | ⬜ |
| Dialog raccourcis accessible via touche ? : role="dialog", focus trap, aria-label="Raccourcis clavier" | ⬜ |
| Zoom : Ctrl+molette ou Ctrl++ / Ctrl+- ; Pan : Espace+glisser ou flèches en mode pan | ⬜ |
| Minimap en coin inférieur droit (masquable, aria-label="Minimap — vue d'ensemble du tableau") | ⬜ |
| Toolbar flottante repositionnable (position défaut : gauche), ne recouvre pas la zone de dessin active | ⬜ |
| Tous aria-labels toolbar, messages WS et noms d'outils internalisés dans whiteboard.canvas.* (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: MVP · Size: L · Priority: High
Stage: Decomposed — voir US08.3.2a/b/c
