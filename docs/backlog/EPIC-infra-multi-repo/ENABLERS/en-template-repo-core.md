# EN17.5 — Template repo pivot-xxx-core

**Type d'enabler** : infrastructure

**Objectif technique** : Créer un GitHub template repository `pivot-template-core` contenant le
scaffolding minimal et validé d'un repo module-core Spring Boot : dépendance `pivot-core-starter`,
schéma Flyway configuré, CI Plumber, CLAUDE.md pré-rempli — utilisable comme point de départ
immédiat par `git clone --template` ou via l'interface GitHub.

**Justification** : Sans ce template, la création de chaque repo module-core (`pivot-collaboratif-core`,
`pivot-pilotage-core`, `pivot-agilite-core`) est un travail manuel de 15–20 fichiers qui risque
des divergences par rapport aux conventions. Le template est formalisé à partir du scaffolding
réel de `pivot-collaboratif-core` (premier repo créé), garantissant qu'il reflète un état testé
plutôt qu'une spécification théorique.

**Critères de complétion** :
- [x] Repo `pivot-template-core` créé dans l'org PIVOT-PLATFORM (GitHub template repository)
- [x] Structure Maven Spring Boot : `pom.xml` avec dépendance `fr.pivot:pivot-core-starter`
- [x] Package de base : `fr.pivot.{module}/` avec `{Module}Application.java`
- [x] Flyway configuré : schéma `{module}`, migration `V1__init_{module}.sql`
- [x] Un exemple `PivotModule` implémenté et enregistré dans le registre
- [x] CI GitHub Actions (copie du pipeline pivot-core : build + test + quality + Trivy SCA)
- [x] CLAUDE.md template pré-rempli avec conventions module
- [ ] CODEOWNERS avec mainteneurs PIVOT — différé (hors scope EN17.5)
- [ ] `.plumber.yaml` configuré — différé (hors scope EN17.5)

**Notes de complétion (2026-07-07)** :
Repo [`PIVOT-PLATFORM/pivot-template-core`](https://github.com/PIVOT-PLATFORM/pivot-template-core)
créé et poussé. Critères CODEOWNERS et `.plumber.yaml` non inclus conformément au scope défini
dans la tâche EN17.5 (« What NOT to include »). Release workflow simplifié (`mvn deploy` sur
`Release-Trigger: true`) sans Semantic Release (pattern pivot-core trop lourd pour un template).

**Statut** : ✅ Done

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: ✅ · Priority: High
