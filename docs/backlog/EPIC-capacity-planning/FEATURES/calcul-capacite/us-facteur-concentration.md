# US11.6.2 — Facteur de concentration (% max par jour moyen)

**En tant que** Scrum Master
**Je veux** appliquer un **facteur de concentration** (focus factor) — un pourcentage maximal de temps réellement productif par jour moyen (ex. 70 %), paramétrable
**Afin de** refléter qu'un jour ouvré n'est pas 100 % de dev (réunions, support, contexte)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un facteur de concentration, when la capacité se calcule, then **capacité nette = jours ouvrés × quotité × facteur** | ⬜ |
| Given aucun facteur saisi, when la capacité se calcule, then le **facteur par défaut = 70 %** (ou dérivé de la maturité : **60 %** peu mature / **70 %** en cours / **80 %** performante — cf. US11.6.4) | ⬜ |
| Given un facteur défini au niveau équipe / membre / rôle, when ils diffèrent, then le plus spécifique s'applique | ⬜ |
| Error : given un facteur > 100 % ou < 0, then il est refusé (garde-fou) | ⬜ |

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: US11.6.1
