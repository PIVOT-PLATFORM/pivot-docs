# US29.7.4 — Environnements dev/test/prod

**En tant que** administrateur
**Je veux** disposer d'environnements isolés avec promotion contrôlée des workflows (pipelines)
**Afin de** industrialiser le cycle de vie des workflows

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des environnements dev/test/prod isolés, when je promeus un workflow, then il passe d'un environnement à l'autre de façon contrôlée | ⬜ |
| Given une promotion, when elle s'exécute, then les credentials et paramètres propres à l'environnement cible sont appliqués | ⬜ |
| Security/Gouvernance : les promotions vers la production requièrent une validation | ⬜ |

---
Item Type: US · Parent: F29.7 · Module: automatisation · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Source: WF-027 · MoSCoW: Should · Lot: Lot 2 · Origine: 3/6 (n8n, AP, PA)
Justification: Dossier §5.2 : prérequis d'industrialisation
Dépendances: —
