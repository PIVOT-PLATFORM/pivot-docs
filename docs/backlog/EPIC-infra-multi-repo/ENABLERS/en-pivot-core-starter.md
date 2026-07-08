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
- [ ] Packages exportés — vérifié fichier par fichier (mis à jour 2026-07-08 après PR #173) :
  - [x] `fr.pivot.core.db` — fait (`ModuleFlywayConfigurer` + autoconfigure, dans `pivot-core-starter`)
  - [x] `fr.pivot.core.modules` — fait (PR #173, closes #172) : 14 fichiers (`PivotModule`, `ModuleRegistry`, `ModuleActivation*`, `ModuleOverride*`, events, cache, autoconfiguration dédiée) déplacés de `pivot-core-app/src` vers `pivot-core-starter/src`, plus 6 TU suivis et un nouveau test de démarrage combiné (`PivotCoreStarterAutoConfigurationIntegrationTest`)
  - [x] `fr.pivot.core.tenant` — fait (PR #173) : `TenantContext` (seul membre du package, dépendance de `PivotModule#isEnabled`) déplacé vers `pivot-core-starter/src`. Le reste (`Tenant` entité, repositories, API super-admin) vit sous `fr.pivot.tenant.*`, package distinct, légitimement spécifique à l'app — ne doit pas être extrait
  - [ ] `fr.pivot.core.auth` — n'existe pas. `fr.pivot.auth.*` gère tout l'auth applicatif (login, opaque tokens, 2FA, appareils de confiance) ; mélange probable de générique (validation token, config OIDC resource server) et de spécifique à l'app — nécessite un tri architectural, pas un simple déplacement
  - [ ] `fr.pivot.core.team` — n'existe pas. Aucune classe `Team`/`TeamMember` dans le codebase à ce jour : pas une extraction, une feature jamais implémentée — bloque la convention FK cross-schéma `public.teams(id)` déjà documentée par EN17.4
- [ ] CI GitHub Actions : step `mvn deploy` déclenché sur push `main` + tag semver — à vérifier
- [x] Versioning sémantique via Semantic Release (hérité de la config pivot-core existante)
- [x] README expliquant comment consommer la lib dans un repo module — existe, mais sur-déclare encore les packages réellement exportés tant qu'`auth`/`team` ne sont pas faits (à corriger en clôture d'Enabler)
- [ ] Test de consommation : repo test qui importe `pivot-core-starter` et démarre sans erreur — aucun repo module ne consomme encore ce starter (`pivot-collaboratif-core` documente explicitement l'attente dans son propre `CLAUDE.md`). Un smoke test combiné existe désormais *dans* pivot-core (`PivotCoreStarterAutoConfigurationIntegrationTest`, PR #173) — approximation la plus proche atteignable avant publication réelle, voir `pivot-core#171`

Suivi détaillé de l'extraction restante (`auth`, `team`) → [`pivot-core#171`](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171).

**Dépendances** : EN03.1 (interface PivotModule finalisée)

**Statut** : 🔄 In progress — pivot-core PR #167 (structure multi-module + `fr.pivot.core.db`) et PR #173 (`fr.pivot.core.modules` + `fr.pivot.core.tenant.TenantContext`, closes #172) faits ; reste `auth` et `team`, voir `pivot-core#171`

> **Note Gate 5 (spec figée) :** non générée à ce stade — l'Enabler EN17.1 n'a pas atteint Gate 4 = 100/100
> *dans son ensemble* (2 volets sur 4 faits : `db`, `modules`+`tenant` ; `auth` et `team` restent, voir
> `pivot-core#171`). PR #173 a bien atteint Gate 4 = 100/100 **pour son propre périmètre** (issue #172,
> mergée dans `pivot-core`), mais figer une spec technique pour l'Enabler entier maintenant
> décrirait un contrat encore incomplet, contredisant la règle d'immutabilité dès le volet suivant.
> Spec à générer une fois les 4 volets (`db`/`modules`+`tenant`/`auth`/`team`) et les critères de
> complétion ci-dessus tous cochés.

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: In progress · Priority: Critical
