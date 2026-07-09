# US29.5.5 — Traçabilité des appels de modèles

**En tant que** RSSI
**Je veux** disposer d'un journal de chaque appel IA (modèle, données, workflow appelant) dans une couche unique d'audit
**Afin de** auditer et contrôler toute l'activité IA

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un appel IA quelconque, when il s'exécute, then il est enregistré dans la couche d'audit unique (modèle, données, workflow) | ⬜ |
| Given la couche d'audit, when je la consulte, then je peux tracer tout appel à un modèle par workflow | ⬜ |
| Security/Gouvernance : les journaux d'appels IA sont exportables et immuables | ⬜ |

---
Item Type: US · Parent: F29.5 · Module: automatisation · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Source: WF-030 · MoSCoW: Must · Lot: Lot 3 · Origine: Gumloop (Gumstack) généralisé + I6/I9
Justification: Dossier §6.6 + §8 : exigible partout
Dépendances: —
