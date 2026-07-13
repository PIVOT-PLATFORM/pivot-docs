# US08.11.2 — Zoom avancé (boutons + ajuster au contenu / à la sélection)

**En tant que** utilisateur-final naviguant sur un board
**Je veux** des commandes de zoom précises (molette centrée sur le curseur, boutons ×1,25/÷1,25, réinitialisation, ajuster au contenu, ajuster à la sélection)
**Afin de** cadrer rapidement la vue sur ce que je veux voir sans manipuler le zoom au jugé

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le canvas, when je fais défiler la molette au-dessus d'un point, then le zoom change en restant **centré sur la position du curseur** (le point sous le curseur reste immobile à l'écran), borné par la borne min dynamique (`computeMinZoom`) et `MAX_ZOOM = 3` | ⬜ |
| Given le contrôle de zoom, when je clique le bouton "+", then le zoom est multiplié par **1,25** (centré sur le centre du conteneur) ; when je clique "−", then le zoom est multiplié par **1/1,25** (÷1,25), même centrage — chaque clic borné [min dynamique ; 3] | ⬜ |
| Given le contrôle de zoom, when je clique le bouton "%" (pourcentage affiché), then le zoom est réinitialisé à **1** (100 %), centré sur le centre du conteneur | ⬜ |
| Given un board avec du contenu, when je déclenche "Ajuster au contenu", then la vue cadre l'intégralité des cartes/cadres avec `pad = 64`, zoom = `clamp(fit, minZoomDynamique, min(1, MAX_ZOOM))` — **jamais au-delà de 100 %** (`maxZoom = 1`) | ⬜ |
| Given une sélection d'au moins une carte, when je déclenche "Ajuster à la sélection", then la vue cadre la bounding box de la sélection, `maxZoom = 1,5` (peut donc dépasser 100 % jusqu'à 150 % pour une petite sélection), borné bas par la min dynamique | ⬜ |
| Given un board dont le contenu dépasse l'étendue de la borne de dézoom fixe, when je dézoome (molette ou bouton), then la borne basse effective utilisée est la **borne dynamique** `computeMinZoom` (jamais `MIN_ZOOM = 0,1` seul), recalculée sur changement de `cards`/`frames` — cohérent avec US08.3.5 | ⬜ |
| Given un zoom molette en cours, when les événements molette s'enchaînent, then l'application de `setViewport` est différée de **80 ms** après le dernier événement (debounce), sans perte de fluidité perçue | ⬜ |
| Given l'ouverture d'un board contenant déjà du contenu, when le canvas s'initialise, then un **auto-fit unique** cadre le contenu (équivalent "Ajuster au contenu"), **désarmé après 2000 ms** (ne se redéclenche plus ensuite) ; le contenu reste masqué (`opacity:0`) jusqu'à stabilisation du cadrage puis apparaît en fondu (`transition: opacity 0.2s`) | ⬜ |
| Error : given "Ajuster à la sélection" déclenché sans aucune carte sélectionnée, when l'action est invoquée, then no-op silencieux (bouton `aria-disabled="true"`) — aucune bounding box vide, aucun NaN de zoom | ⬜ |
| Error : given un board totalement vide, when "Ajuster au contenu" est déclenché, then no-op silencieux (pas de division par une bounding box de dimension 0, pas d'exception) | ⬜ |
| Security : les bornes de zoom sont clampées côté client (`clamp(..., minZoomDynamique, MAX_ZOOM)`) — une valeur de zoom forgée (ex. via devtools) ne peut ni provoquer de division par zéro ni d'allocation démesurée ; le zoom est un état de vue purement local, jamais persisté serveur ni diffusé aux autres participants | ⬜ |
| A11y : chaque commande ("+", "−", "%", "Ajuster au contenu", "Ajuster à la sélection") est un `<button>` natif avec `aria-label` explicite, activable au clavier ; le bouton "%" annonce le niveau de zoom courant (`aria-label="Zoom : [N] % — réinitialiser à 100 %"`) | ⬜ |
| A11y : le zoom molette reste doublé par des commandes clavier/boutons accessibles (pas de fonction disponible uniquement à la molette), conformément aux commandes zoom déjà exposées par US08.3.2a | ⬜ |
| Tests Vitest : centrage molette sur curseur (point fixe sous curseur), facteurs boutons exacts ×1,25 / ÷1,25, reset à 1, `fitToContent` plafonné à `maxZoom=1`, `fitToSelection` plafonné à `maxZoom=1,5`, clamp sur borne dynamique, debounce 80 ms, no-op sur board vide / sélection vide, a11y (axe-core) | ⬜ |

## Hors périmètre

- **Borne de dézoom dynamique elle-même** (`computeMinZoom`, extension de la borne min selon l'étendue du contenu) : couverte par **US08.3.5** — cette US **complète** US08.3.5 sans la dupliquer. Le net-new ici : boutons ×1,25/÷1,25, réinitialisation "%", ajuster au contenu (`maxZoom=1`), ajuster à la sélection (`maxZoom=1,5`), et zoom molette **centré sur le curseur**. Cette US **consomme** la borne dynamique définie par US08.3.5, elle ne la (re)calcule pas.
- Minimap et pan (Espace+glisser) : déjà portés par US08.3.2a.
- Formule exacte de `computeMinZoom` (`pad=64`, `fitAll`, `fitAll*0.6`) : détail de US08.3.5 — rappelée ici seulement pour préciser que le dézoom **borne bas** sur cette valeur, pas sur `MIN_ZOOM` seul.

## Notes d'implémentation

- **Constantes (§4.1/§7)** : `MIN_ZOOM = 0,1`, `MAX_ZOOM = 3` (bornes statiques) ; borne basse effective = `computeMinZoom` (US08.3.5). Zoom molette centré curseur : `base = (ctrl||meta) ? 0.01 : 0.0008`, `damp = zoom>1 ? 1/sqrt(zoom) : 1`, `newZoom = clamp(zoom * exp(-deltaY * base * damp), minZoomDynamique, MAX_ZOOM)`. `setViewport` différé **80 ms** après le dernier événement molette.
- **Boutons** : facteurs `1/1,25` (dézoom) / `1,25` (zoom), centrés sur le centre du conteneur ; bouton "%" → reset `zoom:1`, même centrage.
- **Ajuster (`fitBox`)** : `pad=64`, `fit = min((rect.width-pad*2)/box.w, (rect.height-pad*2)/box.h)`, `zoom = clamp(fit, minZoomDynamique, min(maxZoomParam, MAX_ZOOM))`. `fitToContent()` → `maxZoom=1` ; `fitToSelection()` → `maxZoom=1,5`.
- **Auto-fit à l'ouverture (§4.1)** : déclenché **une seule fois** si contenu présent, **désarmé après 2000 ms** ; contenu masqué (`opacity:0`) jusqu'à stabilisation puis fade-in `transition: opacity 0.2s`. Réutilise `fitToContent()`.
- **État de vue local** : le zoom/viewport est un état client (jamais persisté serveur, jamais diffusé STOMP aux autres participants — chacun a son propre cadrage). Aucun contrat WS nouveau, aucune garde de rôle (lecture seule de la vue, applicable même en VIEWER).
- **Stack** : composant `pivot-collaboratif-ui` (barre de zoom du canvas d'US08.3.2a). Le calcul de zoom et de cadrage est purement client (Angular). Dépend d'US08.3.5 pour la borne min dynamique.
- Dépend d'EN08.4 (modèle Card typé, `posX`/`posY`/`width`/`height` pour les bounding boxes), d'US08.3.2a (canvas local, commandes zoom/pan de base) et d'US08.3.5 (borne de dézoom dynamique — complétée, non dupliquée).

---
Item Type: US · Parent: F08.11 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §4.1, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé) + US08.3.2a (canvas local, commandes zoom de base) + US08.3.5 (borne de dézoom dynamique, complétée non dupliquée)
