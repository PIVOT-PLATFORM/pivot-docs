# US08.3.4 — Taille du texte proportionnelle à la taille de la carte

**En tant que** utilisateur du canvas
**Je veux** que la taille du texte affiché sur une carte suive la taille de la carte (dans une limite plafonnée)
**Afin de** garder un contenu lisible quel que soit le niveau de zoom ou la taille à laquelle une carte a été redimensionnée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une carte texte redimensionnée (agrandie ou réduite), when son contenu est rendu, then la taille de police suit proportionnellement la taille de la carte | ⬜ |
| Given une carte très agrandie, when le texte est rendu, then la taille de police est plafonnée à une valeur maximale (jamais de texte disproportionné par rapport au reste du board) | ⬜ |
| Given une carte réduite jusqu'au plancher de taille (150×110, cf. US08.3.6), when le texte est rendu, then il reste lisible (pas de police tendant vers 0) | ⬜ |

## Hors périmètre

- Le choix manuel d'une taille de police indépendante de la taille de la carte — hors socle, la taille reste dérivée

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Source: PouetPouet v0.32.0 (`0684ee6` feat(board): taille du texte proportionnelle à la taille de la carte)
Dépendances: US08.3.2a (canvas local) — item net-new découvert lors de l'audit de parité POC
2026-07-10, distinct des 17 items Done du noyau F08.x ; à vérifier au Gate 1 contre l'état réel
de `pivot-collaboratif-ui` avant implémentation (peut déjà être partiellement couvert)
