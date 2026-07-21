# US08.11.8 — Verrouillage d'axe au déplacement (Shift)

**En tant que** utilisateur-final éditant un tableau
**Je veux** maintenir une touche pendant le déplacement pour contraindre la carte à un seul axe
**Afin de** faire glisser une carte loin le long d'une colonne ou d'une rangée sans jamais en dériver

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given `Shift` maintenu dès le `pointerdown` d'un déplacement de carte, when je glisse verticalement au-delà du seuil, then la coordonnée X reste strictement constante et Y suit le pointeur | ⬜ |
| Given `Shift` maintenu, when je glisse horizontalement, then Y reste strictement constant et X suit le pointeur | ⬜ |
| Given une carte amenée sur un guide d'alignement (colonne `x = v`), when je presse `Shift` **après** cet alignement puis descends de 400 px, then X reste égal à `v` au pixel près — la position **affichée** au moment de la pression fait autorité, jamais celle du début du geste | ⬜ |
| Given un déplacement ayant déjà parcouru 400 px en X et 0 px en Y, when je presse `Shift` puis descends, then l'axe libéré est le **vertical** — la dominance est mesurée depuis l'instant de capture, jamais depuis l'origine du geste | ⬜ |
| Given `Shift` pressé, when le pointeur s'est déplacé de moins de `AXIS_LOCK_THRESHOLD_PX = 8` **pixels écran** depuis la capture, then aucun axe n'est verrouillé et le déplacement reste libre sur les deux axes | ⬜ |
| Given un axe déjà verrouillé, when l'autre axe prend l'avantage sans dépasser un facteur `AXIS_LOCK_HYSTERESIS = 1,5`, then l'axe verrouillé **ne change pas** — l'hystérésis évite l'oscillation près de la diagonale | ⬜ |
| Given un axe verrouillé, when `Shift` est relâché en cours de geste, then la carte reprend le déplacement libre **sans saut de rattrapage** (la position brute est recalculée depuis `startPos` à chaque frame, l'écart ne s'accumule pas) | ⬜ |
| Given `Shift` relâché puis re-pressé dans le même geste, when le pointeur repart, then un **nouveau** verrou est capturé sur la position courante — deux segments orthogonaux s'enchaînent dans un seul déplacement | ⬜ |
| Given l'aimantation à la grille active (US08.11.1) et un axe verrouillé, when je déplace la carte, then l'axe libre est arrondi à `DOT_SPACING = 24` px et l'axe verrouillé n'est **jamais** arrondi — sinon la carte sauterait sur l'axe qu'on lui demande de tenir | ⬜ |
| Given les guides d'alignement actifs (US08.11.4) et un axe verrouillé, when un guide correspond sur l'**axe verrouillé**, then la correction `dx`/`dy` n'est **pas** appliquée sur cet axe — `computeAlignGuides` renvoie des deltas additionnés sans condition, la coordonnée verrouillée est ré-imposée en dernier | ⬜ |
| Given un axe verrouillé, when aucun guide plein ne marque cet axe, then une ligne **pointillée** de couleur `ALIGN_GUIDE_COLOR` (`#ec4899`) est affichée, centrée sur l'élément ; when un guide plein marque déjà cet axe, then la ligne pointillée est **retirée** (pointillé = verrouillé, plein = verrouillé **et** réellement aligné) | ⬜ |
| Given une multi-sélection et un axe verrouillé, when je déplace la sélection, then aucune carte ne dérive sur l'axe verrouillé (le delta de l'ancre est contraint, les suiveurs en héritent) | ⬜ |
| Given un cadre (frame) et un axe verrouillé, when je le déplace, then le verrou opère — un `Shift` actif sur une carte mais pas sur un cadre serait perçu comme un défaut | ⬜ |
| Given un zoom à 0,25× ou 4×, when le verrou s'engage, then le seuil de 8 px et l'hystérésis sont mesurés en pixels **écran** (seuil divisé par `zoom`), pour un ressenti identique à toute échelle | ⬜ |
| Given un déplacement terminé (`pointerup`), when un nouveau déplacement commence, then aucun verrou de l'ancien geste ne subsiste | ⬜ |
| Error : given `Alt+Tab` ou l'ouverture des devtools avec `Shift` enfoncé, when je reviens et poursuis le déplacement, then aucun verrou fantôme ne subsiste — `event.shiftKey` est lu à chaque `pointermove`, jamais suivi via `keydown`/`keyup` dont le relâchement peut être avalé | ⬜ |
| Error : given un `zoom` non fini ou ≤ 0, ou un delta non fini, when l'axe est calculé, then la décision courante est conservée sans exception (le seuil deviendrait `Infinity`/`NaN`) | ⬜ |
| Security : le verrou est **strictement client** — aucun contrat WebSocket nouveau, aucune écriture serveur dédiée ; la mutation `card:move` publie la position finale exactement comme aujourd'hui | ⬜ |
| A11y : la ligne d'axe est décorative (`aria-hidden`), n'altère ni l'ordre de tabulation ni les libellés ; **aucune annonce `aria-live`** (elle saturerait le lecteur d'écran à chaque `pointermove`) ; l'alternative sans glisser reste le déplacement aux flèches (US08.11.6), conforme à WCAG 2.2 SC 2.5.7 | ⬜ |
| A11y : la lecture de `event.shiftKey` à chaque `pointermove` rend la fonction utilisable sous **StickyKeys**, pour qui ne peut pas maintenir un modificateur et glisser simultanément | ⬜ |
| Découvrabilité : le raccourci apparaît dans le panneau `?` (« Contraindre le déplacement à un axe » / « Constrain movement to one axis »), seul vecteur de découverte réaliste — aucun concurrent ne l'annonce autrement | ⬜ |
| Non-régression : `Shift`+clic sur une carte **déjà sélectionnée** suivi d'un glisser **ne la désélectionne pas** ; le retrait de la sélection est différé au `pointerup` et annulé au-delà du seuil de clic (`CLICK_SLOP_PX = 4` px écran) | ⬜ |
| Non-régression : `Shift` sur une poignée de redimensionnement conserve le ratio ; `Shift` pendant le tracé d'une ligne conserve `snapAngle` (15°) | ⬜ |
| Tests Vitest : décision d'axe (zone morte, dominance, hystérésis symétrique, conversion écran/canvas aux zooms extrêmes, entrées dégénérées), contrainte (idempotence, maintien de la coordonnée capturée à 4000 px d'écart), et câblage composant (capture au `pointerdown`, capture en cours de geste, grille sur l'axe libre uniquement, rendu de la ligne, nettoyage au `pointerup`, toggle de sélection différé) | ⬜ |

## Hors périmètre

- **Poignées de redimensionnement** : `Shift` (ratio) et `Alt` (depuis le centre) y ont une sémantique établie — inchangée.
- **Tracé de ligne** : `Shift` y applique déjà `snapAngle` à 15°, strictement plus riche qu'un verrou H/V — inchangé.
- **Contrainte à 45°** : écartée. Le marché du whiteboard (Miro, Excalidraw, PowerPoint) est H/V strict ; seul Illustrator fait des incréments de 45°, héritage du tracé vectoriel. Chaque angle intermédiaire rétrécirait le bassin de capture de l'horizontale et de la verticale — l'inverse du besoin exprimé (aligner en colonnes et en rangées).
- **Commandes « aligner » / « distribuer »** sur multi-sélection : absentes du produit (seul `alignSelectedText` existe, qui aligne le texte *dans* une carte). Identifiées comme le manque le plus important du domaine lors de l'analyse UX, mais **hors périmètre** de cette US — à tracer séparément.
- **Connecteurs** : leur déplacement n'existe pas (le `pointerdown` sur un connecteur est explicitement court-circuité) — rien à contraindre.

## Notes d'implémentation

- **Module dédié** `model/axis-lock.ts` (fonctions pures) plutôt qu'un ajout à `board-constants.ts`, déjà fourre-tout à 344 lignes : `decideFreeAxis(current, dx, dy, zoom)` et `constrainToAxis(lock, pos)`.
- **`FreeAxis`** nomme l'axe **libre** (`'x'` = la carte glisse horizontalement, Y est figé). Nommer l'axe libre plutôt que l'axe verrouillé évite l'inversion mentale permanente à la lecture du code.
- **Ordre d'application** dans `onPointerMove`, branche `drag-card` : `raw` → grille **XOR** guides (exclusivité §5.9 inchangée) → `constrainToAxis` **en dernier**. L'étape finale n'est pas cosmétique : `computeAlignGuides` renvoie `dx`/`dy` à `0` par défaut et l'appelant les additionne sans condition, donc un guide sur l'axe verrouillé tirerait la carte hors de son axe.
- **Capture au `pointerdown`** quand `Shift` est déjà maintenu : sans elle, la capture aurait lieu au premier `pointermove` avec une origine décalée d'une frame, et cette frame rapporterait un déplacement nul — le verrou ne pourrait jamais s'engager sur un geste court.
- **Variante retenue** : verrou sur la position **affichée** à la capture. C'est une généralisation stricte du verrou d'axe canonique — `Shift` tenu dès le `pointerdown` donne `cardPos == startPos`, soit le comportement Figma à l'identique ; pressé plus tard, il fait ce que le verrou canonique ne sait pas faire.
- **Rendu** : ligne pointillée construite en TS (`repeating-linear-gradient`) et non en SCSS, car elle porte la couleur constante partagée avec les guides et une longueur de tiret divisée par `zoom` — une longueur fixe en unités canvas s'étirerait en barre pleine au zoom. `border-style: dashed` est inapplicable (ce sont des `div` remplis, pas des boîtes bordées).
- **Correctif de sélection embarqué** : `selectItem` différait déjà le cas non-additif ; le cas additif sur un élément déjà sélectionné est désormais mis en attente (`pendingToggle`) et résolu au `pointerup` seulement si le pointeur n'a pas dépassé `CLICK_SLOP_PX`. Sans ce correctif, presser `Shift` avant de cliquer désélectionne la carte que l'on s'apprête à déplacer — bug latent préexistant, mais que cette US rendrait systématiquement visible.
- **Dette corrigée au passage** : la JSDoc d'`applySnap` annonçait les guides d'alignement comme « pas encore implémentés » et désignait un emplacement (`else`) qui n'est pas celui où US08.11.4 les a finalement câblés.
- **Stack** : `projects/collaboratif-ui` (workspace `pivot-ui` depuis EN53.4). Calcul purement local, aucun événement réseau dédié.
- Dépend d'EN08.4 (modèle `Card` typé), et compose avec US08.11.1 (grille) et US08.11.4 (guides) sans modifier leur exclusivité mutuelle.

## Analyse UX de référence

Benchmark mené sur Figma, Miro, FigJam, Illustrator, PowerPoint, Excalidraw et tldraw : **`Shift` est unanime**, l'axe est choisi par dominance du déplacement et recalculé dynamiquement, et le relâchement rend la main sans saut. Aucun de ces outils n'affiche d'indicateur — choix ici assumé différemment : sur un canvas collaboratif où le pointeur va vite, l'absence de retour visuel est un défaut documenté (le fil communautaire Miro le plus lu sur le sujet porte précisément sur l'incertitude quant à la prise du verrou), d'où la ligne pointillée.

Deux variantes ont été écartées explicitement :

- **Aimant renforcé** (élargir la tolérance des guides sous `Shift`) : ne permet pas de parcourir un axe, seulement de mieux y rester. Ne répond pas au besoin exprimé.
- **Capture dure sur le guide** (« coller au guide et ne plus le quitter ») : rédhibitoire. Deux guides simultanés (`v` **et** `h`) immobiliseraient totalement la carte pendant que le pointeur parcourt plusieurs centaines de pixels, et l'écart pointeur↔carte deviendrait non borné, sans issue acceptable (téléportation au relâchement, ou drag rompu). Le seul outil du marché à implémenter ce motif (AutoCAD, Object Snap Tracking) s'appuie sur le repositionnement de son propre réticule — capacité qu'un navigateur n'a pas.

---
Item Type: US · Parent: F08.11 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Demande mainteneur (2026-07-21) — « une touche pour rester figé sur une ligne, comme cela peut exister sur d'autres applications » ; intention précisée en séance : parcourir l'axe, pas seulement mieux y adhérer
Dépendances: EN08.4 (modèle Card typé) + US08.11.1 (grille, exclusivité préservée) + US08.11.4 (guides, exclusivité préservée)
