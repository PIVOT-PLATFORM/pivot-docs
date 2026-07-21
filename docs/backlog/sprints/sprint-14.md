# Sprint 14 — Parité whiteboard — Canvas UX & présence

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 5 items de **parité complète** whiteboard — confort du canevas (aimantation grille,
zoom avancé, collage presse-papiers) et présence étendue (curseurs nommés throttlés, verrou doux
d'édition), suite à la décision mainteneur du 2026-07-13 d'absorber tout le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 (lève le verrou phase-3, zone
d'ombre #11). `Phase: Socle`, module whiteboard.
**Jalon d'entrée :** dépend du modèle `Card` typé (EN08.4, Sprint 11) et des objets typés (Sprint
39) — les fonctions UX et de présence opèrent sur des cartes typées existantes.

## Contexte

Suite des Sprints 38 (fondation `Card`) et 39 (objets typés). Ce sprint livre le **confort du
canevas** (aimantation à la grille, zoom avancé, collage presse-papiers) et l'**extension de la
présence** temps réel (curseurs nommés throttlés, verrou doux d'édition). Il absorbe la Feature
benchmark US30.2.2 (présence & curseurs nommés).

| Item | Titre | Priority | Size | 🤖 Dev |
|------|-------|----------|------|--------|
| [US08.11.1](../EPIC-collaboration/FEATURES/canvas-ux/us-aimantation-grille.md) | Aimantation à la grille | Medium | S | 🔎 code livré (ui #241) — recette |
| [US08.11.2](../EPIC-collaboration/FEATURES/canvas-ux/us-zoom-avance.md) | Zoom avancé (boutons + ajuster au contenu / à la sélection) | Medium | M | 🔎 partiel — voir État réel |
| [US08.11.3](../EPIC-collaboration/FEATURES/canvas-ux/us-collage-presse-papiers.md) | Collage presse-papiers (image / tableur / texte) | Medium | M | 🔎 code livré — recette |
| [US08.11.4](../EPIC-collaboration/FEATURES/canvas-ux/us-guides-alignement.md) | Guides d'alignement (§4.3, supersède 8 px d'US08.3.2a) | Medium | M | 🔎 code livré (ui #247) — recette |
| [US08.11.5](../EPIC-collaboration/FEATURES/canvas-ux/us-undo-redo-parite.md) | Undo / redo (§4.5, HISTORY_LIMIT 30, supersède pile 50 d'US08.3.3) | Medium | M | 🔎 code livré — recette |
| [US08.11.6](../EPIC-collaboration/FEATURES/canvas-ux/us-raccourcis-clavier.md) | Raccourcis clavier & nudge (§4.7, offset +24, supersède US08.3.2a) | Medium | M | 🔎 code livré, écart mineur — voir État réel |
| [US08.11.7](../EPIC-collaboration/FEATURES/canvas-ux/us-redimensionnement-fin.md) | Redimensionnement fin & lasso (§4.4/§4.9, supersède US08.3.6) | Medium | M | 🔎 code livré — recette |
| [US08.5.2](../EPIC-collaboration/FEATURES/presence/us-curseurs-nommes.md) | Curseurs nommés throttlés | Medium | S | 🔎 code livré — recette |
| [US08.5.3](../EPIC-collaboration/FEATURES/presence/us-verrou-edition.md) | Verrou doux d'édition | Medium | S | 🔎 code livré — recette |

## État réel (constaté dans le code le 2026-07-20)

> ⚠️ **Désync backlog↔code partielle**, même schéma que Sprint 13 : contrairement aux Sprints 11/12
> (100% code-complets), ce sprint a un **vrai reste à faire** — vérifié sur `structured-canvas`, le
> composant canvas réellement routé (`pivot-ui`, `projects/collaboratif-ui/src/lib/whiteboard/`).

| Item | État réel | Détail |
|------|-----------|--------|
| US08.11.1 (aimantation grille) | Fait — **1 écart de spec à arbitrer** | Bouton « Grille » (`floating-toolbar`), snap dur `Math.round(c / 24) * 24` appliqué au déplacement **et** au redimensionnement, bascule points/quadrillage, préférence locale `localStorage['klx_board_grid']` (off par défaut). État détenu par `board-page`, partagé entre barre d'outils et canvas. `applySnap()` est le point de passage unique où la grille court-circuitera les guides d'alignement (§5.9) — ceux-ci n'existent pas encore, la branche est réservée à US08.11.4. **Écart** : l'US impose `Math.round(c / 24) * 24` *et* liste `36 -> 24` en valeur limite ; les deux se contredisent (36 est le point milieu exact, `Math.round(1.5) === 2`, donc la formule rend 48). La formule, normative et répétée, l'a emporté ; un test dédié verrouille et documente le choix — **arbitrage PO attendu**. |
| US08.11.2 (zoom avancé) | **Partiel** | Zoom molette OK (`MIN_ZOOM`/`MAX_ZOOM`, `board-constants.ts`) ; boutons zoom +/- et « ajuster au contenu/sélection » n'existent que dans l'ancien canvas retiré (`whiteboard-canvas.component.ts`, non routé depuis EN08.4) |
| US08.11.3 (collage presse-papiers) | Fait | `isImageClipboardItem`/`decideTablePaste`/`isUrlOnlyPaste` câblés sur `@HostListener('document:paste')` dans `structured-canvas.component.ts` |
| US08.11.4 (guides d'alignement) | Fait | Réécrit nativement sur `structured-canvas` (l'ancien canvas retiré n'a pas été porté). Logique pure `computeAlignGuides()` dans `board-constants.ts` : 3 repères par axe, tolérance `ALIGN_SNAP_PX = 6` px écran convertie `/ zoom`, meilleur candidat unique par axe, exclusion de la carte déplacée et des cartes `DRAW`. Bouton bascule dans `floating-toolbar` (`aria-pressed`), préférence locale `localStorage['klx_board_align']` **active par défaut**. Exclusion mutuelle §5.9 câblée dans `onPointerMove` : la grille court-circuite le calcul des guides. Guides `aria-hidden`, `#ec4899`, épaisseur `1/zoom`, `zIndex 60`, effacés au `pointerup`. |
| US08.11.5 (undo/redo, HISTORY_LIMIT 30) | Fait | `board.store.ts` — pile 30 niveaux (`undoStack`/`redoStack`) |
| US08.11.6 (raccourcis & nudge) | Fait, écart mineur | `board-page.component.ts` — undo/redo/select-all/copy/cut/paste/duplicate/delete/escape + nudge flèches ; nudge = 1px (20px avec Shift) contre 24px spécifié — écart mineur à trancher au Gate 1 |
| US08.11.7 (redimensionnement fin & lasso) | Fait | Handles 8 directions + sélection marquee dans `structured-canvas.component.ts` |
| US08.5.2 (curseurs nommés) | Fait | Signal `cursors` (`CursorState`), event `board:cursors` dans `board.store.ts` |
| US08.5.3 (verrou doux d'édition) | Fait | Map `remoteEditors` `{userId, name}` dans `board.store.ts` |

**Reste réellement à faire pour clore ce sprint :** la partie boutons/ajuster d'US08.11.2 — à
porter du canvas retiré vers `structured-canvas`, ou réécrire nativement. US08.11.1 (ui #241,
2026-07-20) et US08.11.4 (ui #247, 2026-07-21) sont livrées ; comme tout le reste du sprint, leur
`Stage` reste `⬜` jusqu'à la recette mainteneur —
voir [checklist de recette](pathname:///pivot-docs/workflow/checklist-recette-whiteboard).

## Notes de séquencement

- Les trois items canvas UX (US08.11.1/.2/.3) et les deux items présence (US08.5.2/.3) sont
  parallélisables entre agents (branches séparées, fichiers disjoints).
- **US08.11.3** (collage presse-papiers) recoupe le collage tableur d'US08.6.6 (Sprint 12) : à
  vérifier au Gate 1 pour éviter la duplication de la logique de détection de source presse-papiers.
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Dépendances

- Dépend de : **Sprint 11 (EN08.4)** — modèle `Card` typé — et **Sprint 12** (objets typés à
  manipuler par les fonctions UX et de présence). **Levées.**
- Repo cible : bascule Spring Modulith (ADR-030, 2026-07-17) — le code vit désormais dans
  `pivot-core` (module `fr.pivot.collaboratif.whiteboard`) et `pivot-ui`
  (`projects/collaboratif-ui`) ; `pivot-collaboratif-core`/`pivot-collaboratif-ui` sont archivés.

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
