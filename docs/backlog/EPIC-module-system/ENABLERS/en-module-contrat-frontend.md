# EN03.4 — Contrat de module frontend (TypeScript)

**Type d'enabler** : architecture

**Critères de complétion** :
- [x] Interface TypeScript `PivotModuleConfig` : `id`, `name`, `route`, `icon`, `enabled`
  *(livré sous la forme `PivotModuleDto` + `PivotModuleUi` dans `module.model.ts` — superset des
  champs demandés : `PivotModuleUi` porte `id`, `name`, `route`, `icon`, `enabled` et davantage)*
- [x] `MODULE_REGISTRY` token d'injection Angular (InjectionToken)
  *(livré sous la forme `ModuleRegistryService`, `@Injectable({providedIn: 'root'})` — singleton
  Angular idiomatique équivalent, pas de `InjectionToken` explicite car une seule implémentation)*
- [x] Chaque feature module exporte un objet de configuration conforme — `MODULE_METADATA`
  (`module-metadata.ts`) : métadonnées statiques par module (icône, route, couleur, description)
- [x] `ModuleStatusService` : cache local (Signal) du statut des modules pour la session
  *(livré sous la forme `ModuleRegistryService` — signal `_modules` + signals calculés
  `enrichedModules`/`activeModules`/`comingSoonModules`)*
- [x] Tests Vitest ModuleStatusService — `module-registry.service.spec.ts`, 9 tests (signaux
  calculés + appel API)

**Statut** : ✅ Fait — mergé sur `main` (pivot-core PR #111/#118, pivot-ui PR #45/#62,
`feat/en03-4-module-api` / `feat/en03-4-module-contract`). Contrat livré sous des noms différents
de ceux de l'AC d'origine (voir notes ci-dessus) — équivalence fonctionnelle vérifiée par lecture
du code, décision documentée dans `docs/backlog/sprints/sprint-2.md`.

---
Item Type: Enabler · Parent: E03 · Type: architecture · Module: core · Phase: Socle
Stage: ✅ · Priority: Critical
Gate 5 : `pivot-ui` PR [#45](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/45) (Gate 3 = 88/100)
et [#62](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/62) (Gate 4 = 100/100), `pivot-core`
PR [#111](https://github.com/PIVOT-PLATFORM/pivot-core/pull/111) (Gate 4 = 93/100) et
[#118](https://github.com/PIVOT-PLATFORM/pivot-core/pull/118) (Gate 4 = 100/100), spec figée
`docs/specs/EPIC-module-system/en03-4-contrat-module-frontend.md` (rétroactif, 2026-07-08) —
backend depuis refactoré par EN03.1 (PR core #119), voir § Écarts de la spec
