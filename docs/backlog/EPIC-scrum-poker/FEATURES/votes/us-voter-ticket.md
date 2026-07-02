# US09.2.1 — Voter sur un ticket en temps réel

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** participant à une room de planning poker
**Je veux** voter sur le ticket en cours
**Afin d'** estimer la complexité avec mon équipe

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Facilitateur crée un ticket (titre) → STOMP broadcast aux participants | ⬜ |
| Participant vote (valeur Fibonacci) → vote masqué jusqu'à révélation | ⬜ |
| Changement de vote avant révélation autorisé | ⬜ |
| Compteur "X/Y ont voté" visible en temps réel (sans révéler les votes) | ⬜ |
| STOMP event `VOTE_CAST` publié sur `/topic/agilite/poker/{roomId}` (sans valeur) | ⬜ |
| Test TI : vote reçu sans révélation · changement de vote · compteur mis à jour | ⬜ |

---
Item Type: US · Parent: F09.2 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US09.1.2, EN09.1
