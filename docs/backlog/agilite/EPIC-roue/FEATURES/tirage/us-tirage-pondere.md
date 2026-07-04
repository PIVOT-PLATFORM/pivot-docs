# US14.2.1 — Effectuer un tirage pondéré anti-repeat

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur
**Je veux** effectuer un tirage aléatoire pondéré anti-repeat
**Afin d'** éviter que le même participant soit tiré deux fois de suite

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `.../wheels/{id}/spin` retourne le résultat du tirage | ⬜ |
| Algorithme pondéré : probabilité proportionnelle au poids de chaque entrée | ⬜ |
| Anti-repeat : le dernier tiré a probabilité réduite (configurable : exclure / poids réduit) | ⬜ |
| Historique des tirages conservé par session (derniers N tirages) | ⬜ |
| Résultat tirage sauvegardé en BDD (wheelId, entryId, timestamp) | ⬜ |
| Test : distribution statistique sur 1000 tirages (~proportionnelle aux poids) | ⬜ |

---
Item Type: US · Parent: F14.2 · Module: agilite · Repo: pivot-agilite-core/ui · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US14.1.1
