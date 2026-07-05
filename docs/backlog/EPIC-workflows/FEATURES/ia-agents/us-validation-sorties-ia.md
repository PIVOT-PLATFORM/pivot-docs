# US29.5.7 — Validation des sorties IA

**En tant que** maker
**Je veux** valider les sorties IA par schéma, mesurer le taux d'erreur par étape IA et gérer les non-conformités
**Afin de** garantir la fiabilité des étapes IA

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une étape IA avec schéma de sortie, when la sortie ne respecte pas le schéma, then elle est rejetée ou reprise | ⬜ |
| Given plusieurs runs, when je consulte les métriques, then le taux d'erreur par étape IA est mesuré | ⬜ |
| Error : given une non-conformité répétée, system déclenche la gestion d'erreur configurée | ⬜ |

---
Item Type: US · Parent: F29.5 · Module: automatisation · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: WF-032 · MoSCoW: Must · Lot: Lot 3 · Origine: Insight I6 (règle 'IA minimale')
Justification: Dossier §8-I6 : principe d'architecture universel
Dépendances: —
