# US29.5.3 — Garde-fous d'agents

**En tant que** administrateur
**Je veux** définir des guardrails (périmètre d'actions, validations obligatoires, limites) et journaliser chaque action d'agent
**Afin de** maîtriser les risques liés aux agents autonomes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un agent, when une action sort de son périmètre autorisé, then elle est bloquée | ⬜ |
| Given une action sensible, when elle requiert validation, then l'agent attend une approbation avant de poursuivre | ⬜ |
| Security/Gouvernance : chaque action d'agent est journalisée de façon inaltérable pour audit | ⬜ |

---
Item Type: US · Parent: F29.5 · Module: automatisation · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Rôle: administrateur-plateforme
Source: WF-020 · MoSCoW: Must · Lot: Lot 3 · Origine: Zapier généralisé + I5/I6
Justification: Dossier §6.4 + §8-I6
Dépendances: —
