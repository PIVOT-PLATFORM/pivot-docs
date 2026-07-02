# EN17.5 — Template repo pivot-xxx-core

**Type d'enabler** : infrastructure

**Critères de complétion** :
- [ ] Repo `pivot-template-core` créé dans l'org PIVOT-PLATFORM (GitHub template repository)
- [ ] Structure Maven Spring Boot : `pom.xml` avec dépendance `fr.pivot:pivot-core-starter`
- [ ] Package de base : `fr.pivot.{module}/` avec `{Module}Application.java`
- [ ] Flyway configuré : schéma `{module}`, migration `V1__init_{module}.sql`
- [ ] Un exemple `PivotModule` implémenté et enregistré dans le registre
- [ ] CI GitHub Actions (copie du pipeline pivot-core : build + test + quality + Plumber)
- [ ] CLAUDE.md template pré-rempli avec conventions module
- [ ] CODEOWNERS avec mainteneurs PIVOT
- [ ] `.plumber.yaml` configuré

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: phase-3
Stage: Backlog · Priority: High
