# US08.11.7 — Redimensionnement homothétique fin & sélection au lasso (parité §4.4/§4.9)

**En tant que** utilisateur-final éditant un tableau
**Je veux** redimensionner une multi-sélection/groupe de façon homothétique fine (facteur borné, minimum ~24 px garanti) et sélectionner au lasso par intersection
**Afin de** ajuster précisément la taille de plusieurs cartes à la fois et sélectionner rapidement une zone du board

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une multi-sélection ou un groupe, when je tire un handle du cadre englobant, then le point d'ancrage est le **coin opposé** : `anchorX = (corner ∈ {'se','ne'}) ? box.minX : box.maxX`, `anchorY = (corner ∈ {'se','sw'}) ? box.minY : box.maxY` | ⬜ |
| Given le drag en cours, when le facteur d'échelle est calculé, then `diag = hypot(handleX - anchorX, handleY - anchorY) \|\| 1`, `smallestDim = max(1, min(min(c.width, c.height) sur chaque carte))`, `minFactor = min(1, 24 / smallestDim)`, `factor = clamp(hypot(p.x - anchorX, p.y - anchorY) / diag, minFactor, 20)` — **20 = facteur max codé en dur** | ⬜ |
| Given le facteur calculé, when il est appliqué à chaque carte de l'ensemble, then `posX' = anchorX + (posX - anchorX) * factor`, `posY' = anchorY + (posY - anchorY) * factor`, `width' = width * factor`, `height' = height * factor` | ⬜ |
| Given un redimensionnement vers le bas, when le facteur atteint `minFactor = min(1, 24 / smallestDim)`, then **le plus petit côté ne descend jamais sous ~24 px** — le plancher est un minimum garanti sur la plus petite dimension, pas une taille fixe par carte | ⬜ |
| Given l'ensemble affecté, when il est calculé, then il inclut les cartes sélectionnées **+ tous les membres de leur(s) groupe(s)** et **exclut les cartes verrouillées** (`locked`) | ⬜ |
| Given un drag de redimensionnement, when il est en cours, then l'émission live est **throttlée à 60 ms** ; au relâchement, **un seul événement d'historique** est poussé (commit) | ⬜ |
| Given l'outil `select` actif et `toolMode !== 'draw'`, when je fais un mousedown avec `button === 0` dont la cible est **strictement l'élément canvas lui-même** (fond, pas une carte), then un lasso démarre | ⬜ |
| Given un lasso en cours, when `w > 3 \|\| h > 3`, then le rectangle visuel est affiché ; au relâchement, la sélection n'est appliquée que si `w > 5 \|\| h > 5` (en dessous = simple clic vide = désélection) | ⬜ |
| Given un lasso appliqué, when l'intersection est évaluée, then le critère est un **chevauchement AABB** (`card.posX < rect.x + rect.w && card.posX + card.width > rect.x && card.posY < rect.y + rect.h && card.posY + card.height > rect.y`) — une carte touchée même partiellement est prise, pas seulement si entièrement englobée | ⬜ |
| Given cette US, when elle définit le plancher de redimensionnement multi-sélection, then elle **supersède / raffine la valeur de la legacy US08.3.6** : elle remplace le plancher fixe **150×110** d'US08.3.6 par un **minimum ~24 px garanti** via `minFactor = min(1, 24 / smallestDim)` (homothétie bornée, `factor` clampé `[minFactor, 20]`) conforme au spec §4.4/§7 — le plancher 150×110 d'US08.3.6 est superseded | ⬜ |
| Error : given un `diag` nul (handle confondu avec l'ancre) ou `smallestDim` nul, when le facteur est calculé, then les gardes `\|\| 1` / `max(1, …)` évitent toute division par zéro et le redimensionnement reste stable (pas d'exception, pas de `NaN` propagé aux positions) | ⬜ |
| Error : given un lasso dont le mousedown démarre sur une carte (cible ≠ élément canvas) ou avec `button !== 0`, when il est évalué, then **aucun lasso ne démarre** (comportement réservé au clic direct sur le fond, bouton gauche) | ⬜ |
| Security : le redimensionnement et le lasso ne dérivent aucun `userId`/`tenantId` d'une entrée client ; les mutations `card:resize`/`card:move` émises passent par les gardes de rôle serveur (US08.3.1) — un `viewer` ne peut redimensionner (403 STOMP) ; les cartes verrouillées sont exclues côté client **et** non modifiables côté serveur (pas de contournement par appel direct) | ⬜ |
| A11y : les handles du cadre englobant sont des cibles focusables avec `aria-label` décrivant le coin ; le lasso est une aide visuelle (`aria-hidden`) doublée d'une sélection multiple aussi atteignable au clavier (Maj+clic hérité d'US08.3.2a) ; le retour visuel live ne repose pas uniquement sur la couleur | ⬜ |
| Tests TI : redimensionnement émis par un `viewer` → 403 STOMP ; carte verrouillée exclue de l'ensemble même si dans la sélection ; commit unique d'historique au relâchement (un seul événement serveur, pas un par frame throttlé) | ⬜ |
| Tests Vitest : formule d'ancrage par coin (`se`/`ne`/`sw`/`nw`), `factor = clamp(dist/diag, minFactor, 20)` (max 20 respecté, `minFactor` garantit ~24 px), formules `posX'/posY'/width'/height'`, inclusion membres de groupe + exclusion verrouillées, throttle 60 ms + commit unique, lasso : rectangle si `w>3\|\|h>3`, application si `w>5\|\|h>5`, `button===0` & cible = canvas strictement, intersection AABB (carte partiellement touchée incluse), gardes anti-division-par-zéro | ⬜ |

## Hors périmètre

- Le redimensionnement d'une carte **unique** (déjà couvert par US08.3.2a) : hors scope, cette US porte le cadre englobant multi-sélection/groupe.
- Le groupement `Ctrl+G` / dégroupement `Ctrl+Shift+G` (US08.3.2a) : réutilisé pour constituer l'ensemble affecté, non redéfini ici.
- Redimensionnement **non homothétique** (étirement sur un seul axe) de la multi-sélection : hors scope — le facteur est isotrope (même `factor` sur X et Y), conforme au POC de référence.
- La matrice de verrouillage complète (§4.6) : portée ailleurs — cette US n'en applique que la règle « cartes verrouillées exclues du redimensionnement multi-sélection ».

## Notes d'implémentation

- **Ensemble affecté (§4.4)** : cartes sélectionnées **+ tous les membres de leur(s) groupe(s)**, cartes verrouillées **exclues**.
- **Ancrage (§4.4)** : coin opposé au coin tiré — `anchorX = (corner ∈ {'se','ne'}) ? box.minX : box.maxX`, `anchorY = (corner ∈ {'se','sw'}) ? box.minY : box.maxY`.
- **Facteur borné (§4.4/§7)** : `diag = hypot(handleX-anchorX, handleY-anchorY) \|\| 1` ; `smallestDim = max(1, min(min(c.width,c.height)))` ; `minFactor = min(1, 24 / smallestDim)` (empêche le plus petit côté sous ~24 px) ; `factor = clamp(hypot(p.x-anchorX, p.y-anchorY) / diag, minFactor, 20)` — **20 codé en dur**.
- **Formules appliquées** : `posX' = anchorX + (posX-anchorX)*factor` ; `posY' = anchorY + (posY-anchorY)*factor` ; `width' = width*factor` ; `height' = height*factor`.
- **Émission** : throttlée à **60 ms** pendant le drag (`useBoard`-équivalent) ; **un seul** événement d'historique poussé au commit (relâchement) — cohérent avec `commitResizeSelection` couvert par l'historique (US08.11.5).
- **Lasso (§4.9)** : déclenchement `button===0`, outil `select`, `toolMode!=='draw'`, cible du mousedown **strictement** l'élément canvas. Rectangle affiché si `w>3\|\|h>3` ; appliqué si `w>5\|\|h>5` ; intersection **AABB** (chevauchement, pas containment) — comportement « à la Miro/Klaxoon ».
- **Supersession de la legacy** : cette US **remplace le plancher fixe 150×110 d'US08.3.6** (valeur superseded) par le **minimum ~24 px garanti** issu de `minFactor = min(1, 24 / smallestDim)` conforme au spec §4.4/§7. US08.3.6 encodait un plancher périmé ; cette US devient la référence Socle du redimensionnement homothétique fin et du lasso.
- **Stack** : `pivot-collaboratif-ui` (canvas d'US08.3.2a). Mutations `card:resize`/`card:move` via STOMP existant (US08.3.1), gardes de rôle serveur inchangées, cartes verrouillées non modifiables côté serveur.
- Dépend d'EN08.4 (modèle Card typé, `locked`, `groupId`, coordonnées/dimensions) et supersède US08.3.6 (plancher 150×110 → minimum ~24 px garanti).

---
Item Type: US · Parent: F08.11 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §4.4, §4.9, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé, locked/groupId) + US08.3.6 (legacy supersédée : plancher 150×110 remplacé par minimum ~24 px garanti conforme §4.4)
