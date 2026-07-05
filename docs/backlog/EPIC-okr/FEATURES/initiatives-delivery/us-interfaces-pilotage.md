# US27.6.2 — Interfaces OKR ↔ pilotage (roadmap, portefeuille, risques)

**En tant que** PMO
**Je veux** relier les OKR aux autres modules du domaine — **roadmap (E22)**, **portefeuille (E23)**, **risques (E21)** — via le bus PIVOT et des deep-links
**Afin de** connecter l'ambition (OKR) à l'exécution et aux aléas, sans coupler les modules

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une initiative liée à un KR, when elle correspond à un projet roadmap (E22), then un deep-link relie OKR et projet (pas de FK — ADR-006/008) | ⬜ |
| Given un risque (E21) menaçant un KR, when il est corrélé, then il apparaît en overlay sur l'OKR | ⬜ |
| Given un OKR de portefeuille, when il agrège, then il consomme les avancements via événements (bus PIVOT) | ⬜ |

---
Item Type: US · Parent: F27.6 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
