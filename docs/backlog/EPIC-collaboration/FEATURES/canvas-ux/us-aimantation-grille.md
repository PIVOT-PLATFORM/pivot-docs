# US08.11.1 — Aimantation à la grille

**En tant que** utilisateur-final éditant un tableau
**Je veux** activer une aimantation des objets sur une grille de 24 px
**Afin de** aligner mes cartes proprement et rapidement sans ajustement manuel au pixel près

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un bouton "Grille" dans la barre d'outils du canvas, when je l'active, then l'aimantation à la grille passe à l'état actif (bouton `aria-pressed="true"`) et le rendu de fond passe en quadrillage (`linear-gradient`) | ⬜ |
| Given l'aimantation à la grille désactivée (état par défaut), when le canvas est rendu, then le fond affiche des points (`radial-gradient`) et non un quadrillage — pas de snap appliqué aux déplacements | ⬜ |
| Given l'aimantation à la grille active, when je déplace ou redimensionne une carte, then sa position finale est arrondie au multiple de 24 px le plus proche sur X et Y (`Math.round(coord / 24) * 24`), snap **dur** sans rayon de tolérance — appliqué systématiquement, pas seulement à proximité d'une ligne de grille | ⬜ |
| Given l'aimantation à la grille active (§5.9), when je déplace une carte, then **aucun calcul de guide d'alignement n'est effectué** — la grille court-circuite les guides (les deux mécanismes sont mutuellement exclusifs, grille prioritaire) | ⬜ |
| Given je bascule l'état de la grille, when je recharge la page ou rouvre le board, then l'état est restauré depuis `localStorage['klx_board_grid']` (`'1'` = actif / `'0'` = inactif), **off par défaut** si la clé est absente | ⬜ |
| Given deux utilisateurs sur le même board, when l'un active la grille, then l'état de la grille reste **local à ce client** (préférence d'affichage persistée en navigateur) — aucun message STOMP émis, aucune écriture serveur, l'autre utilisateur n'est pas affecté | ⬜ |
| Error : given une valeur corrompue ou absente dans `localStorage['klx_board_grid']` (ni `'1'` ni `'0'`), when le canvas s'initialise, then l'état retombe silencieusement sur le défaut (grille inactive, rendu en points), sans exception ni log d'erreur | ⬜ |
| Security : la valeur lue depuis `localStorage` est uniquement interprétée comme booléen d'affichage (`=== '1'`) — jamais injectée dans le DOM ni évaluée comme CSS/expression, pas de surface d'injection via le presse-papiers ou une clé forgée | ⬜ |
| A11y : le bouton "Grille" est un `<button>` natif avec `aria-label="Aimantation à la grille"` et `aria-pressed` reflétant l'état actif/inactif, activable au clavier (Tab, Entrée/Espace) sans dépendre du survol souris | ⬜ |
| A11y : le passage points ↔ quadrillage est purement décoratif (fond `aria-hidden`) — il ne modifie ni l'ordre de tabulation ni les libellés des cartes, et ne repose pas uniquement sur la couleur pour signaler l'état actif (état porté par `aria-pressed`) | ⬜ |
| Tests TI : mutation `card:move`/`card:resize` reçue serveur avec coordonnées arbitraires → persistées telles quelles (le snap est purement client, le serveur ne ré-arrondit pas) — la grille n'introduit aucun contrat WS nouveau | ⬜ |
| Tests Vitest : arrondi 24 px sur X/Y (valeurs limites : 11→0, 12→24, 36→24, 37→48), persistance localStorage (`'1'`/`'0'`/absent/corrompu), court-circuit des guides quand grille active, bascule du rendu points/quadrillage, a11y `aria-pressed` (axe-core) | ⬜ |

## Hors périmètre

- Guides d'alignement dynamiques (lignes roses, tolérance 6 px écran) : portés par US08.3.2a — cette US ne fait que **court-circuiter** leur calcul quand la grille est active (§5.9), elle ne les (re)définit pas.
- Pas de grille configurable (autre que 24 px), ni magnétisme partiel, ni sous-grille — la constante `DOT_SPACING = 24` (§4.2/§7) est fixe.
- Synchronisation de l'état grille entre participants ou persistance serveur : hors scope — préférence strictement locale au navigateur (comme le POC de référence).
- Rendu visuel fin de la grille (opacité, densité au zoom) au-delà du choix points/quadrillage : détail d'implémentation UI, non contractualisé ici.

## Notes d'implémentation

- **Constante** : pas de grille `DOT_SPACING = 24` px (coordonnées canvas, §4.2/§7). Snap dur : `Math.round(x / 24) * 24` (idem Y), appliqué au commit du déplacement/redimensionnement.
- **Mutuelle exclusion (§5.9)** : quand `snapToGrid` est actif, le calcul des guides d'alignement (US08.3.2a) n'est **pas exécuté** — court-circuit avant, la grille est prioritaire. Un seul des deux mécanismes agit à un instant donné.
- **Persistance** : toggle client-only dans `localStorage['klx_board_grid']` (`'1'`/`'0'`), **off par défaut**. Aucune écriture backend, aucun message STOMP — préférence d'affichage propre au navigateur de l'utilisateur.
- **Rendu** : quadrillage (`linear-gradient`) si grille active, points (`radial-gradient`) sinon — bascule purement CSS sur le fond du conteneur canvas.
- **Stack** : composant `pivot-collaboratif-ui` (barre d'outils du canvas d'US08.3.2a). Le snap s'applique côté client avant l'émission de `card:move`/`card:resize` — le backend Spring/STOMP reçoit et persiste les coordonnées déjà arrondies, sans logique de grille propre. Aucune garde de rôle nouvelle (préférence locale, pas une mutation).
- Dépend d'EN08.4 (modèle Card typé, coordonnées `posX`/`posY`) et d'US08.3.2a (canvas local, barre d'outils, guides d'alignement court-circuités).

---
Item Type: US · Parent: F08.11 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §4.2, §5.9, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé) + US08.3.2a (canvas local, guides d'alignement mutuellement exclusifs §5.9)
