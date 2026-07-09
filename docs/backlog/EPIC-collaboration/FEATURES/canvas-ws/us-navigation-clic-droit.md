# US08.3.7 — Navigation au clic droit

**En tant que** utilisateur du canvas
**Je veux** naviguer (pan) sur le board en maintenant le clic droit, au même titre que le clic molette déjà supporté
**Afin de** disposer d'un second moyen de navigation, plus accessible sur les souris/trackpads sans bouton molette dédié

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le canvas affiché, when l'utilisateur maintient le clic droit et déplace la souris, then la vue se déplace (pan) — même comportement que le clic molette existant | ⬜ |
| Given un clic droit maintenu suivi d'un relâchement sans déplacement significatif, when le clic est relâché, then le menu contextuel natif du navigateur ne s'affiche pas (le clic droit est intercepté pour la navigation, pas laissé au comportement par défaut) | ⬜ |

## Hors périmètre

- Un menu contextuel PIVOT dédié au clic droit (copier/coller, propriétés, etc.) — hors socle, cette US ne couvre que la navigation

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: XS · Priority: Low
Stage: ⬜
Source: PouetPouet v0.32.0 (`0160618` feat(board): navigation au clic droit (comme le clic molette))
Dépendances: US08.3.2a (canvas local, zoom/pan existant) — item net-new découvert lors de l'audit
de parité POC 2026-07-10, distinct des 17 items Done du noyau F08.x ; à vérifier au Gate 1 contre
l'état réel de `pivot-collaboratif-ui` avant implémentation
