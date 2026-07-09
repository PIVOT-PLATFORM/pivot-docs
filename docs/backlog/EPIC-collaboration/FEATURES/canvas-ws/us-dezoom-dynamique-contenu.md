# US08.3.5 — Dézoom dynamique selon la taille du contenu

**En tant que** utilisateur d'un board volumineux
**Je veux** que la borne de dézoom minimale s'adapte à l'étendue réelle du contenu du board
**Afin de** pouvoir voir l'intégralité d'un très grand board en une seule vue, y compris quand la borne de dézoom fixe habituelle ne le permettrait pas

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un board dont le contenu dépasse l'étendue couverte par la borne de dézoom minimale par défaut, when l'utilisateur dézoome au maximum, then la borne s'étend dynamiquement pour couvrir l'ensemble du contenu | ⬜ |
| Given un board de taille standard (contenu dans la borne par défaut), when l'utilisateur dézoome, then le comportement reste identique à l'existant (pas de régression sur les boards de taille courante) | ⬜ |

## Hors périmètre

- Le zoom automatique "ajuster à l'écran" en un clic (fonction distincte, non couverte ici) — cette US ne change que la borne minimale atteignable en dézoomant manuellement

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: S · Priority: Low
Stage: ⬜
Source: PouetPouet v0.32.0 (`322123f` feat(board): borne de dézoom dynamique selon la taille du contenu)
Dépendances: US08.3.2a (canvas local) — item net-new découvert lors de l'audit de parité POC
2026-07-10, distinct des 17 items Done du noyau F08.x ; à vérifier au Gate 1 contre l'état réel
de `pivot-collaboratif-ui` avant implémentation
