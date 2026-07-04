# EN28.11 — ADR-012 : stratégie de forks

**Type d'enabler** : gouvernance · git

**Contexte** : Définir la règle submodule vs subtree vs package et le cycle de vie des forks contributifs (ADR-009 §6) : branche miroir, resynchronisation hebdomadaire, `FORK.md`, condition de mort.

**Critères de complétion** :
- [ ] Règle de rattachement documentée (dépendance packagée / subtree / submodule / paquet npm embarqué)
- [ ] Gabarit `FORK.md` (PR, raison, condition de mort, responsable) publié
- [ ] Job CI de resynchronisation hebdomadaire (`git fetch upstream` + rapport de dérive) opérationnel
- [ ] ADR-012 rédigée et acceptée

**Dépendances** : ADR-009 (Accepté)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: gouvernance · Module: gouvernance · Phase: phase-3
Stage: Backlog · Priority: High
