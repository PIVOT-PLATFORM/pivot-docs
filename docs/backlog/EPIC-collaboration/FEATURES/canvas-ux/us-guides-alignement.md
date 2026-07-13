# US08.11.4 — Guides d'alignement (parité §4.3)

**En tant que** utilisateur-final éditant un tableau
**Je veux** des guides d'alignement dynamiques (lignes roses) qui apparaissent pendant le déplacement d'une carte
**Afin de** aligner précisément mes cartes sur les bords ou les centres des autres cartes sans grille

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'option guides d'alignement active et une seule carte déplacée, when un des 3 repères de la carte (`[x, x + w/2, x + w]` en X et `[y, y + h/2, y + h]` en Y) s'approche à moins de `ALIGN_SNAP_PX = 6` **pixels écran** (convertis en coordonnées canvas via `/ zoom` avant comparaison) du repère correspondant d'une autre carte, then une ligne guide s'affiche sur cet axe | ⬜ |
| Given plusieurs candidats d'alignement sur un même axe, when les guides sont calculés, then un seul meilleur candidat par axe est retenu (distance minimale ≤ seuil) → **au plus une ligne verticale + une ligne horizontale** affichées simultanément | ⬜ |
| Given une multi-sélection (`selectedIds.size > 1`), when je déplace la sélection, then **aucun guide n'est calculé ni affiché** — l'activation exige `alignGuidesEnabled && selectedIds.size <= 1`, les guides sont désactivés en multi-sélection | ⬜ |
| Given le calcul des cibles d'alignement, when les repères des autres cartes sont collectés, then toutes les cartes du board sont candidates **sauf la carte déplacée elle-même et sauf les cartes de type `DRAW`** | ⬜ |
| Given un guide affiché, when il est rendu, then il utilise la couleur `#ec4899` (rose), une épaisseur constante à l'écran de `1/zoom` px, et `zIndex: 60` | ⬜ |
| Given l'aimantation à la grille active (§5.9, US08.11.1), when je déplace une carte, then **le calcul des guides n'est pas exécuté** — grille et guides d'alignement sont **mutuellement exclusifs**, la grille est prioritaire | ⬜ |
| Given je bascule l'option guides, when je recharge la page ou rouvre le board, then l'état est restauré depuis `localStorage['klx_board_align']` (`'0'` = désactivé), **actif par défaut** si la clé est absente | ⬜ |
| Given cette US, when elle définit la tolérance d'accrochage, then elle **supersède / raffine la valeur de la legacy US08.3.2a** : elle remplace la tolérance **8 px** (`smart guides`, snap 8px) d'US08.3.2a par **6 px écran** (`ALIGN_SNAP_PX = 6`, `/ zoom`) conforme au spec de référence §4.3/§7 — la valeur 8px d'US08.3.2a est superseded | ⬜ |
| Given deux utilisateurs sur le même board, when l'un active/désactive les guides, then l'état reste **local à ce client** (préférence d'affichage persistée en navigateur) — aucun message STOMP émis, aucune écriture serveur | ⬜ |
| Error : given une valeur corrompue ou absente dans `localStorage['klx_board_align']` (ni `'1'` ni `'0'`), when le canvas s'initialise, then l'état retombe silencieusement sur le défaut (guides actifs), sans exception ni log d'erreur | ⬜ |
| Error : given un board sans autre carte alignable (une seule carte, ou toutes les autres de type `DRAW`), when je déplace la carte, then aucune ligne n'est affichée et le déplacement reste fluide (pas de division par zéro ni d'exception) | ⬜ |
| Security : la valeur lue depuis `localStorage` est uniquement interprétée comme booléen d'affichage (`!== '0'`) — jamais injectée dans le DOM ni évaluée comme CSS/expression ; la couleur `#ec4899` est une constante littérale, pas dérivée d'une entrée utilisateur (pas de surface d'injection `url()`/`expression()`) | ⬜ |
| A11y : les lignes guides sont purement décoratives (`aria-hidden`), n'altèrent ni l'ordre de tabulation ni les libellés des cartes ; le bouton d'activation des guides est un `<button>` natif avec `aria-label` et `aria-pressed` reflétant l'état actif/inactif, activable au clavier | ⬜ |
| Tests TI : mutation `card:move` reçue serveur avec la position finale (le snap guide est purement client, le serveur ne recalcule aucun guide) — les guides n'introduisent aucun contrat WS nouveau | ⬜ |
| Tests Vitest : conversion seuil 6 px écran `/ zoom`, 3 repères par axe, au plus 1 ligne V + 1 ligne H, désactivation stricte en multi-sélection (`selectedIds.size > 1`), exclusion de la carte déplacée et des cartes `DRAW`, court-circuit quand grille active (§5.9), persistance localStorage (`'0'`/absent/corrompu → défaut actif), rendu `#ec4899`/`zIndex 60`, a11y `aria-pressed` (axe-core) | ⬜ |

## Hors périmètre

- L'aimantation à la grille (US08.11.1) : cette US se contente d'être **court-circuitée** par la grille quand celle-ci est active (§5.9), elle ne la (re)définit pas.
- Guides d'alignement en multi-sélection : **explicitement hors périmètre** par conception (activation `selectedIds.size <= 1`) — conforme au POC de référence, non un manque.
- Alignement sur les cadres (frames) ou sur des repères de règle : hors scope — les cibles sont les cartes non-`DRAW` uniquement.
- Synchronisation de l'état guides entre participants ou persistance serveur : hors scope — préférence strictement locale au navigateur.

## Notes d'implémentation

- **Constantes (§4.3/§7)** : `ALIGN_SNAP_PX = 6` px **écran**, convertie via `/ zoom` avant comparaison en coordonnées canvas. Couleur guide `#ec4899`, épaisseur `1/zoom` px écran constante, `zIndex: 60`.
- **Repères comparés (§4.3)** : `vSelf = [x, x + w/2, x + w]` (gauche/centre/droite), `hSelf = [y, y + h/2, y + h]` (haut/milieu/bas), comparés aux 3 mêmes valeurs de chaque autre carte. Un seul meilleur candidat par axe (distance minimale ≤ seuil) → au plus une ligne verticale + une horizontale.
- **Activation** : `alignGuidesEnabled && selectedIds.size <= 1` — désactivé en multi-sélection. Cibles = toutes les cartes sauf celle déplacée et sauf type `DRAW`.
- **Supersession de la legacy** : cette US **remplace la tolérance 8px des « smart guides » d'US08.3.2a** (valeur superseded) par la valeur de référence **6 px écran** (`ALIGN_SNAP_PX = 6`, `/ zoom`) — US08.3.2a encodait une valeur périmée, cette US porte la valeur conforme au spec §4.3/§7 et devient la référence pour les guides d'alignement du Socle.
- **Mutuelle exclusion (§5.9)** : quand `snapToGrid` est actif, le calcul des guides n'est **pas exécuté** — court-circuit avant, grille prioritaire.
- **Persistance** : toggle client-only dans `localStorage['klx_board_align']` (`'0'` = désactivé), **actif par défaut**. Aucune écriture backend, aucun message STOMP.
- **Stack** : composant `pivot-collaboratif-ui` (canvas d'US08.3.2a). Calcul purement local (comparaison des bounding boxes), aucun événement réseau dédié ; le déplacement final est publié normalement comme mutation `card:move`.
- Dépend d'EN08.4 (modèle Card typé, coordonnées `posX`/`posY`, dimensions `width`/`height`) et supersède US08.3.2a (tolérance 8px → 6px).

---
Item Type: US · Parent: F08.11 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §4.3, §5.9, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé) + US08.3.2a (legacy supersédée : tolérance 8px des smart guides remplacée par 6px conforme §4.3)
