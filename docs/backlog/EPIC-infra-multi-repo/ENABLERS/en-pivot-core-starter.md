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
- [x] Packages exportés — vérifié fichier par fichier (2026-07-08, mis à jour au fil des PR) :
  - [x] `fr.pivot.core.db` — fait (`ModuleFlywayConfigurer` + autoconfigure, dans `pivot-core-starter`)
  - [x] `fr.pivot.core.modules` — déplacé vers `pivot-core-starter/src` (PR #173, mergée 2026-07-08) : `PivotModule`, `ModuleRegistry`, `ModuleActivation*`, `ModuleOverride*`, events, cache, autoconfiguration dédiée
  - [x] `fr.pivot.core.tenant` — `TenantContext` déplacé (PR #173) et testé (`TenantContextTest`, PR #177). `TenantContextHolder`/`@TenantAware` : décision de ne pas les créer (PR #177) — aucun consommateur réel identifié, tout le code passe `TenantContext` en paramètre explicite ; infrastructure spéculative sinon. Le reste (`Tenant` entité, repositories, API super-admin) reste sous `fr.pivot.tenant.*`, légitimement spécifique à l'app — non extrait, décision confirmée
  - [x] `fr.pivot.core.auth` — **principal minimal extrait (ADR-022, pivot-docs#155 ; implémentation pivot-core#180, mergée)**, lève l'escalade [`pivot-core#171`](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171) (fermée). `AuthenticatedPrincipal(userId, tenantId, role)` + interface `AuthenticatedPrincipalResolver`, implémentée par `TokenService` (`resolve()` délègue à `validate()`, inchangé). `TokenAuthenticationFilter` volontairement non modifié (dizaine de contrôleurs dépendant de `Authentication#getDetails()` = `User` complet). `StompAuthChannelInterceptor` (EN-NOTIF) premier consommateur réel de l'abstraction. La logique de validation elle-même (hash, expiration, révocation, désactivation tenant/utilisateur) n'est **pas** dupliquée dans le starter — aucun repo `pivot-xxx-core` n'a de besoin consommateur réel à ce jour ; suivi dans un ticket dédié une fois un module concerné (voir ADR-022 « Ce qui n'est pas fait maintenant »)
  - [x] `fr.pivot.core.team` — créé (PR #177, 2026-07-08) : entités `Team`/`TeamMember` (schéma public), `TeamRepository`/`TeamMemberRepository`, migration `V1__schema_init.sql`. Colonne `parent_team_id` (auto-référence nullable) ajoutée par anticipation pour la hiérarchie d'équipes E15/EN15.3 (voir `EPIC-equipes/README.md`). Pas d'API REST/logique métier — aucune US ne les spécifie encore. Débloque la convention FK cross-schéma `public.teams(id)` pour les repos module
- [ ] CI GitHub Actions : step `mvn deploy` déclenché sur push `main` + tag semver — à vérifier
- [x] Versioning sémantique via Semantic Release (hérité de la config pivot-core existante)
- [x] README expliquant comment consommer la lib dans un repo module — corrigé (PR #177), puis complété (PR #180) pour le principal minimal `fr.pivot.core.auth`
- [ ] Test de consommation : repo test qui importe `pivot-core-starter` et démarre sans erreur — aucun repo module ne consomme encore ce starter (`pivot-collaboratif-core` documente explicitement l'attente dans son propre `CLAUDE.md`)

Suivi de l'extraction auth (principal minimal, ADR-022) → [`pivot-core#171`](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171) (fermée).

**Dépendances** : EN03.1 (interface PivotModule finalisée)

**Statut** : ✅ Done — `db`/`modules`/`tenant`/`team`/`auth` (principal minimal) extraits et livrés
(PR #167, #173, #177, #180). Les deux critères restants (déclenchement CI `mvn deploy` réel,
premier repo module consommateur) ne bloquent pas la clôture de cet enabler — aucun repo module
n'a encore de besoin métier réel ; suivis passivement, pas de ticket dédié tant qu'aucun
consommateur ne se présente. `Stage: Done` positionné par décision explicite du mainteneur
(2026-07-09) — recette métier formelle différée, pas bloquante pour la suite du backlog.

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: Done · Priority: Critical · Done: 2026-07-08 (pivot-core #167, #173, #177, #180)
