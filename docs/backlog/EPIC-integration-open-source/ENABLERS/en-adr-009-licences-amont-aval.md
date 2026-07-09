# EN28.9 — ADR-009 : règle de licences amont/aval

**Type d'enabler** : gouvernance · juridique

**Contexte** : ADR-009 §3 pose la règle de fond ; ADR-009 la formalise. Il ne s'agit pas de rechoisir une licence pour le noyau (`pivot-core` reste AGPL-3.0, ADR-002 inchangée), mais de documenter et faire respecter la règle amont/aval.

**Critères de complétion** :
- [ ] Chaque outil tiers intégré a sa licence d'origine documentée, sans modification demandée
- [ ] Chaque adaptateur du dépôt est étiqueté AGPL-3.0
- [ ] Le processus fork → PR upstream pour toute amélioration générique est documenté et suivi (cf. EN28.12)
- [ ] ADR-009 rédigée et acceptée

**Dépendances** : ADR-009 (Accepté)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: gouvernance · Module: gouvernance · Phase: phase-3
Stage: ⬜ · Priority: Highest
