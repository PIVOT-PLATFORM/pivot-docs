# US14.3.1 — Diffusion du résultat du tirage en temps réel (WebSocket)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** participant à une session avec La Roue
**Je veux** voir le résultat du tirage s'afficher en temps réel sur mon écran
**Afin de** suivre l'animation du tirage collectivement

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| STOMP broadcast `SPIN_RESULT` sur `/topic/collaboratif/roue/{wheelId}` après chaque tirage | ⬜ |
| Participants rejoignent le topic via code ou lien de partage | ⬜ |
| Animation Angular de la roue (rotation CSS) avant affichage du résultat | ⬜ |
| Résultat affiché après fin animation (durée configurable : 3–5s) | ⬜ |
| Reconnexion STOMP automatique si perte connexion | ⬜ |
| Test : broadcast reçu par tous les participants connectés | ⬜ |

---
Item Type: US · Parent: F14.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US14.2.1
