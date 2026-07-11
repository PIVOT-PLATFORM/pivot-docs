# US50.3.2 — Gérer les dépendances entre tickets du Program Board

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** RTE ou Scrum Master
**Je veux** relier deux tickets du Program board par une dépendance (mode « Lier »), matérialisée par une flèche, avec statut OK/bloquant
**Afin de** repérer les risques de blocage inter-équipes avant le démarrage du PI

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Mode « Lier » : sélection de deux tickets, création d'une flèche de dépendance entre eux | ⬜ |
| Statut de la dépendance : OK ou bloquant | ⬜ |
| Détection et refus d'un cycle de dépendances (anti-cycle) — même exigence que les dépendances de Roadmap (E-roadmap) | ⬜ |

---
Item Type: US · Parent: F50.3 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: release-train-engineer, scrum-master
Source: PouetPouet v0.31.0 (PR5 #247 données/API — dépendances OK/bloquant + anti-cycle, PR6 #248 UI)
Dépendances: US50.3.1
