# US29.14.6 — Principe 'IA minimale'

**En tant que** DSI/architecte
**Je veux** adopter la règle d'architecture réservant le LLM aux étapes de raisonnement, avec déterminisme partout ailleurs, sorties validées et appels tracés
**Afin de** maîtriser le recours à l'IA dans les workflows

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la règle 'IA minimale', when un workflow est conçu, then le LLM n'est utilisé que pour les étapes de raisonnement | ⬜ |
| Given les étapes non-IA, when elles sont conçues, then elles sont déterministes et leurs sorties validées | ⬜ |
| Security/Gouvernance : tout appel IA est tracé conformément au principe adopté | ⬜ |

---
Item Type: US · Parent: F29.14 · Module: automatisation · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: architecte-d-entreprise
Source: WF-079 · MoSCoW: Must · Lot: Lot 1 · Origine: Insight I6 (Gumloop)
Justification: Dossier §8-I6
Dépendances: —
