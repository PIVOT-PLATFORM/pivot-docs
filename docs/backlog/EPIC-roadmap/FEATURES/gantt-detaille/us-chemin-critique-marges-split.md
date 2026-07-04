# US22.4.7 — Chemin critique, marges & fractionnement

**En tant que** chef de projet
**Je veux** visualiser le chemin critique, les marges (libre/totale) et fractionner une tâche (split)
**Afin de** prioriser et gérer les interruptions comme dans MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un planning, when j'active le chemin critique, then les tâches critiques (marge totale ≤ 0) sont mises en évidence | ⬜ |
| Given une tâche, when je consulte ses marges, then marge libre et marge totale sont affichées | ⬜ |
| Given une tâche interrompue, when je la fractionne, then elle apparaît en segments avec un creux | ⬜ |

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
