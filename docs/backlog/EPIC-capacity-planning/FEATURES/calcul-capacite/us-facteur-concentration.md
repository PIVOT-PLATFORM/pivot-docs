# US11.6.2 — Facteur de concentration (% max par jour moyen)

**En tant que** Scrum Master
**Je veux** appliquer un **facteur de concentration** (focus factor) — un pourcentage maximal de temps réellement productif par jour moyen (ex. 70 %), paramétrable
**Afin de** refléter qu'un jour ouvré n'est pas 100 % de dev (réunions, support, contexte)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un facteur de concentration (ex. 70 %), when la capacité se calcule, then **capacité nette = jours ouvrés × quotité × facteur** | ⬜ |
| Given un facteur défini au niveau équipe / membre / rôle, when ils diffèrent, then le plus spécifique s'applique | ⬜ |
| Error : given un facteur > 100 % ou < 0, then il est refusé (garde-fou) | ⬜ |

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US11.6.1
