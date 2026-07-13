# Sprint 41 — Parité whiteboard — Canvas UX & présence

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 5 items de **parité complète** whiteboard — confort du canevas (aimantation grille,
zoom avancé, collage presse-papiers) et présence étendue (curseurs nommés throttlés, verrou doux
d'édition), suite à la décision mainteneur du 2026-07-13 d'absorber tout le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 (lève le verrou phase-3, zone
d'ombre #11). `Phase: Socle`, module whiteboard.
**Jalon d'entrée :** dépend du modèle `Card` typé (EN08.4, Sprint 38) et des objets typés (Sprint
39) — les fonctions UX et de présence opèrent sur des cartes typées existantes.

## Contexte

Suite des Sprints 38 (fondation `Card`) et 39 (objets typés). Ce sprint livre le **confort du
canevas** (aimantation à la grille, zoom avancé, collage presse-papiers) et l'**extension de la
présence** temps réel (curseurs nommés throttlés, verrou doux d'édition). Il absorbe la Feature
benchmark US30.2.2 (présence & curseurs nommés).

| Item | Titre | Priority | Size | 🤖 Dev |
|------|-------|----------|------|--------|
| [US08.11.1](../EPIC-collaboration/FEATURES/canvas-ux/us-aimantation-grille.md) | Aimantation à la grille | Medium | S | ⬜ |
| [US08.11.2](../EPIC-collaboration/FEATURES/canvas-ux/us-zoom-avance.md) | Zoom avancé (boutons + ajuster au contenu / à la sélection) | Medium | M | ⬜ |
| [US08.11.3](../EPIC-collaboration/FEATURES/canvas-ux/us-collage-presse-papiers.md) | Collage presse-papiers (image / tableur / texte) | Medium | M | ⬜ |
| [US08.11.4](../EPIC-collaboration/FEATURES/canvas-ux/us-guides-alignement.md) | Guides d'alignement (§4.3, supersède 8 px d'US08.3.2a) | Medium | M | ⬜ |
| [US08.11.5](../EPIC-collaboration/FEATURES/canvas-ux/us-undo-redo-parite.md) | Undo / redo (§4.5, HISTORY_LIMIT 30, supersède pile 50 d'US08.3.3) | Medium | M | ⬜ |
| [US08.11.6](../EPIC-collaboration/FEATURES/canvas-ux/us-raccourcis-clavier.md) | Raccourcis clavier & nudge (§4.7, offset +24, supersède US08.3.2a) | Medium | M | ⬜ |
| [US08.11.7](../EPIC-collaboration/FEATURES/canvas-ux/us-redimensionnement-fin.md) | Redimensionnement fin & lasso (§4.4/§4.9, supersède US08.3.6) | Medium | M | ⬜ |
| [US08.5.2](../EPIC-collaboration/FEATURES/presence/us-curseurs-nommes.md) | Curseurs nommés throttlés | Medium | S | ⬜ |
| [US08.5.3](../EPIC-collaboration/FEATURES/presence/us-verrou-edition.md) | Verrou doux d'édition | Medium | S | ⬜ |

## Notes de séquencement

- Les trois items canvas UX (US08.11.1/.2/.3) et les deux items présence (US08.5.2/.3) sont
  parallélisables entre agents (branches séparées, fichiers disjoints).
- **US08.11.3** (collage presse-papiers) recoupe le collage tableur d'US08.6.6 (Sprint 39) : à
  vérifier au Gate 1 pour éviter la duplication de la logique de détection de source presse-papiers.
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Dépendances

- Dépend de : **Sprint 38 (EN08.4)** — modèle `Card` typé — et **Sprint 39** (objets typés à
  manipuler par les fonctions UX et de présence).
- Repo cible inchangé (`pivot-collaboratif-core`/`pivot-collaboratif-ui`).

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
