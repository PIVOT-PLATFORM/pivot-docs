# US19.3.2 — Activité POLL — sondage instantané avec résultats temps réel

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur
**Je veux** lancer un sondage rapide et voir les résultats évoluer en temps réel
**Afin de** prendre la température de l'équipe ou valider une décision collective

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POLL : question + 2–8 options · choix unique ou multiple configurable | ⬜ |
| Résultats (%) mis à jour en temps réel sur écran animateur ET participants | ⬜ |
| Animateur peut masquer les résultats en cours de vote | ⬜ |
| Participant change son vote possible tant que POLL ouvert | ⬜ |
| STOMP event `POLL_UPDATED` à chaque vote | ⬜ |
| Test : vote changé → compteur mis à jour · résultats masqués → non broadcast aux participants | ⬜ |

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US19.1.2
