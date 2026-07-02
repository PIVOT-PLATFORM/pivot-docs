# EN17.1 — Publication pivot-core-starter (Maven artifact)

**Type d'enabler** : infrastructure

**Critères de complétion** :
- [ ] `pom.xml` pivot-core configuré pour publier `fr.pivot:pivot-core-starter` dans GitHub Packages
- [ ] Packages exportés : `fr.pivot.core.auth`, `fr.pivot.core.tenant`, `fr.pivot.core.team`, `fr.pivot.core.modules`, `fr.pivot.core.db`
- [ ] CI GitHub Actions : step `mvn deploy` déclenché sur push `main` + tag semver
- [ ] Versioning sémantique via Semantic Release
- [ ] README expliquant comment consommer la lib dans un repo module
- [ ] Test de consommation : repo test qui importe `pivot-core-starter` et démarre sans erreur

**Dépendances** : EN03.1 (interface PivotModule finalisée)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: phase-3
Stage: Backlog · Priority: High
