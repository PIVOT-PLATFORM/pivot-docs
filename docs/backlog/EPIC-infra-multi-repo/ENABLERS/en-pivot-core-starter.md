# EN17.1 — Publication pivot-core-starter (Maven artifact)

**Type d'enabler** : infrastructure

**Objectif technique** : Extraire les packages partagés de `pivot-core` (`auth`, `tenant`, `team`,
`modules`, `db`) en un artifact Maven `fr.pivot:pivot-core-starter` publiable dans GitHub Packages,
consommable par tout repo `pivot-xxx-core` via une dépendance versionnée standard.

**Justification** : Sans ce starter, chaque repo module-core devrait soit copier le code
d'auth/tenant (divergence garantie), soit créer une dépendance directe non versionnée à `pivot-core`
(couplage fort, impossible à déployer indépendamment). C'est le prérequis des templates repo (EN17.5)
et du scaffolding de `pivot-collaboratif-core`.

**Critères de complétion** :
- [x] `pom.xml` pivot-core configuré pour publier `fr.pivot:pivot-core-starter` dans GitHub Packages (PR #167)
- [ ] Packages exportés — vérifié fichier par fichier (2026-07-08), état réel très en-deçà de ce que PR #167 et le README du module laissaient penser :
  - [x] `fr.pivot.core.db` — fait (`ModuleFlywayConfigurer` + autoconfigure, dans `pivot-core-starter`)
  - [ ] `fr.pivot.core.modules` — le code existe (14 fichiers : `PivotModule`, `ModuleRegistry`, `ModuleActivation*`, `ModuleOverride*`, events, cache, autoconfiguration dédiée) mais reste physiquement dans `pivot-core-app/src`, jamais déplacé vers `pivot-core-starter/src`
  - [ ] `fr.pivot.core.tenant` — seul `TenantContext` existe sous ce nom (toujours dans `pivot-core-app/src`, pas déplacé). Le reste (`Tenant` entité, repositories, API super-admin) vit sous `fr.pivot.tenant.*`, légitimement spécifique à l'app — ne devrait probablement pas être extrait
  - [ ] `fr.pivot.core.auth` — n'existe pas. `fr.pivot.auth.*` gère tout l'auth applicatif (login, opaque tokens, 2FA, appareils de confiance) ; mélange probable de générique (validation token, config OIDC resource server) et de spécifique à l'app — nécessite un tri architectural, pas un simple déplacement
  - [ ] `fr.pivot.core.team` — n'existe pas. Aucune classe `Team`/`TeamMember` dans le codebase à ce jour : pas une extraction, une feature jamais implémentée — bloque la convention FK cross-schéma `public.teams(id)` déjà documentée par EN17.4
- [ ] CI GitHub Actions : step `mvn deploy` déclenché sur push `main` + tag semver — à vérifier
- [x] Versioning sémantique via Semantic Release (hérité de la config pivot-core existante)
- [x] README expliquant comment consommer la lib dans un repo module — existe, mais sur-déclare les packages réellement exportés (à corriger avec le point ci-dessus)
- [ ] Test de consommation : repo test qui importe `pivot-core-starter` et démarre sans erreur — aucun repo module ne consomme encore ce starter (`pivot-collaboratif-core` documente explicitement l'attente dans son propre `CLAUDE.md`)

Suivi détaillé de l'extraction restante → [`pivot-core#171`](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171).

**Dépendances** : EN03.1 (interface PivotModule finalisée)

**Statut** : 🔄 In progress — pivot-core PR #167 a posé la structure multi-module et publié `fr.pivot.core.db` ; le reste de l'extraction (`modules`, `tenant`, `auth`, `team`) reste à faire, voir `pivot-core#171`

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: In progress · Priority: Critical
