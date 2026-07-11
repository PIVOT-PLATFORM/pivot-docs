# US08.3.6 — Redimensionnement d'une sélection multiple ou d'un groupe par cadre englobant

**En tant que** utilisateur du canvas
**Je veux** redimensionner plusieurs cartes sélectionnées (ou un groupe) via un unique cadre englobant leur taille affichée
**Afin de** ajuster la taille de plusieurs éléments à la fois sans les redimensionner un par un

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une sélection multiple de cartes, when je fais glisser un handle du cadre englobant, then toutes les cartes de la sélection sont redimensionnées solidairement, en direct (retour visuel live pendant le glissement, pas seulement au relâchement) | ⬜ |
| Given un groupe (Ctrl+G, cf. US08.3.2a), when je le redimensionne, then le même cadre englobant s'applique — pas seulement à la multi-sélection non groupée | ⬜ |
| Given une sélection multiple, when le cadre englobant est calculé, then il englobe la **taille affichée** des cartes (taille réellement rendue à l'écran), pas une taille de données brute qui pourrait diverger | ⬜ |
| Given un redimensionnement vers le bas, when la taille atteint le plancher (150×110), then aucune carte de la sélection ne descend en dessous de ce plancher | ⬜ |
| Given un lasso de sélection (glisser sur zone vide), when le rectangle de lasso touche une carte sans la contenir entièrement, then cette carte est incluse dans la sélection (sélection par intersection, pas uniquement par containment complet) | ⬜ |

## Hors périmètre

- Le redimensionnement d'une carte unique (déjà couvert par US08.3.2a)

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: PouetPouet v0.32.0 (`0f66f8b`/`7114289`/`bd235f7`/`ddc0a97`/`782a0d9`/`4ba4b2e` — série de
correctifs "confort des boards")
Dépendances: US08.3.2a (canvas local, sélection multiple et groupement) — item net-new découvert
lors de l'audit de parité POC 2026-07-10, distinct des 17 items Done du noyau F08.x ; à vérifier
au Gate 1 contre l'état réel de `pivot-collaboratif-ui` avant implémentation (le redimensionnement
par handles sur objet unique et le groupement Ctrl+G sont déjà `US08.3.2a — Done`, seul le cadre
englobant multi-sélection/groupe est net-new)
