# US41.4.1 — Réseau de référents & parcours formateur

**En tant que** responsable conduite du changement
**Je veux** constituer et animer un **réseau de référents/animateurs** par direction, avec un **parcours de formation formateur (train-the-trainer)**
**Afin de** démultiplier l'adoption par des relais internes (l'adoption est un projet, pas un déploiement — Insight I8)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une direction, when je désigne des référents, then ils suivent un parcours formateur et obtiennent un statut de référent | ⬜ |
| Given un référent, when il anime, then il dispose des supports et d'un espace communauté (questions, retours) | ⬜ |
| Given le réseau, when il évolue, then l'annuaire des référents par module/direction est à jour | ⬜ |
| Error : given un référent qui quitte sa direction ou perd le statut, when l'annuaire est consulté, then il n'apparaît plus comme référent actif (pas de contact périmé affiché aux utilisateurs) | ⬜ |
| Security : le statut de référent est attribué par un responsable habilité (conduite du changement, admin tenant), pas auto-déclarable par l'utilisateur lui-même | ⬜ |

## Hors périmètre

- Rémunération ou avantage formel lié au statut de référent — relève d'un processus RH hors Pivot

## Notes d'implémentation

- L'annuaire des référents doit être consommé par l'aide contextuelle (US41.2.2) pour orienter un utilisateur bloqué vers le bon référent de sa direction/module

---
Item Type: US · Parent: F41.4 · Module: core · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: US41.3.1
