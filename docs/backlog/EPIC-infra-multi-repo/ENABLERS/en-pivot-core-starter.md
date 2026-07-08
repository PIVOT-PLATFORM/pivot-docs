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
- [ ] Packages exportés — vérifié fichier par fichier (2026-07-08, mis à jour au fil des PR) :
  - [x] `fr.pivot.core.db` — fait (`ModuleFlywayConfigurer` + autoconfigure, dans `pivot-core-starter`)
  - [x] `fr.pivot.core.modules` — déplacé vers `pivot-core-starter/src` (PR #173, mergée 2026-07-08) : `PivotModule`, `ModuleRegistry`, `ModuleActivation*`, `ModuleOverride*`, events, cache, autoconfiguration dédiée
  - [x] `fr.pivot.core.tenant` — `TenantContext` déplacé (PR #173) et testé (`TenantContextTest`, PR #177). `TenantContextHolder`/`@TenantAware` : décision de ne pas les créer (PR #177) — aucun consommateur réel identifié, tout le code passe `TenantContext` en paramètre explicite ; infrastructure spéculative sinon. Le reste (`Tenant` entité, repositories, API super-admin) reste sous `fr.pivot.tenant.*`, légitimement spécifique à l'app — non extrait, décision confirmée
  - [ ] `fr.pivot.core.auth` — analyse architecturale faite (2026-07-08), **escaladée** sur [`pivot-core#171`](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171) (`needs-human-review`) : `TokenService`/`TokenAuthenticationFilter` dépendent directement de l'entité JPA concrète `fr.pivot.auth.entity.User`, un déplacement mécanique n'est pas sûr ; un découplage propre nécessite une abstraction de principal minimal partagée — décision d'architecture sur un composant de sécurité critique (ADR requise avant implémentation), pas une décision unilatérale d'agent
  - [x] `fr.pivot.core.team` — créé (PR #177, 2026-07-08) : entités `Team`/`TeamMember` (schéma public), `TeamRepository`/`TeamMemberRepository`, migration `V1__schema_init.sql`. Colonne `parent_team_id` (auto-référence nullable) ajoutée par anticipation pour la hiérarchie d'équipes E15/EN15.3 (voir `EPIC-equipes/README.md`). Pas d'API REST/logique métier — aucune US ne les spécifie encore. Débloque la convention FK cross-schéma `public.teams(id)` pour les repos module
- [ ] CI GitHub Actions : step `mvn deploy` déclenché sur push `main` + tag semver — à vérifier
- [x] Versioning sémantique via Semantic Release (hérité de la config pivot-core existante)
- [x] README expliquant comment consommer la lib dans un repo module — corrigé (PR #177) pour ne plus sur-déclarer les packages réellement exportés
- [ ] Test de consommation : repo test qui importe `pivot-core-starter` et démarre sans erreur — aucun repo module ne consomme encore ce starter (`pivot-collaboratif-core` documente explicitement l'attente dans son propre `CLAUDE.md`)

Suivi détaillé de l'extraction restante (auth uniquement) → [`pivot-core#171`](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171).

**Dépendances** : EN03.1 (interface PivotModule finalisée)

**Statut** : 🔄 In progress — `modules`/`tenant`/`team` extraits et livrés (PR #167, #173, #177) ; seul `auth` reste, escaladé sur `pivot-core#171` (`needs-human-review`, ADR requise avant implémentation)

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: In progress · Priority: Critical
