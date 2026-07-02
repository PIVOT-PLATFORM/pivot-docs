# US09.2.2 — Révéler les votes et calculer le consensus

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** facilitateur d'une room de planning poker
**Je veux** révéler les votes et voir le consensus
**Afin de** finaliser l'estimation du ticket

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Facilitateur déclenche la révélation → STOMP broadcast `VOTES_REVEALED` avec toutes les valeurs | ⬜ |
| Calcul automatique : moyenne · médiane · valeur majoritaire | ⬜ |
| Facilitateur peut relancer un vote sur le même ticket (reset) | ⬜ |
| Facilitateur valide l'estimation finale → sauvegardée en BDD sur le ticket | ⬜ |
| Test TI : révélation · calcul consensus · reset | ⬜ |

---
Item Type: US · Parent: F09.2 · Module: agilite · Phase: phase-3 · Size: S · Priority: High
Stage: Backlog
Dépendances: US09.2.1
