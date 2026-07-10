# EN17.11 — Publication `@pivot-platform/agilite-ui` + câblage shell route agilite

**Type d'enabler** : infrastructure

**Objectif technique** : Convertir `pivot-agilite-ui` en workspace Angular multi-projets (à
l'image de `pivot-collaboratif-ui`/EN17.10 lui-même modelé sur `pivot-ui/projects/ui-core`,
EN17.3) exposant un package npm `@pivot-platform/agilite-ui` (routes + composants capacity
planning, daily standup timer, scrum poker, La Roue) publié dans GitHub Packages, puis câbler
la/les route(s) `agilite` du shell `pivot-ui` pour les lazy-loader réellement via
`loadChildren`, en remplacement du placeholder `ComingSoonComponent` — même pattern qu'EN17.10,
deuxième application concrète après whiteboard.

**Justification** : `pivot-agilite-core` et `pivot-agilite-ui` sont un domaine actif et
fonctionnel depuis le Sprint 8 (scrum poker, rétrospectives, La Roue — de nombreuses US mergées
des deux côtés, ex. `pivot-agilite-core#44`/`pivot-agilite-ui#34` pour US14.3.1), mais **aucun
utilisateur ne peut y accéder depuis le shell** :

- `pivot-ui/src/app/app.routes.ts` ne contient **aucune route** `agilite` (ni `pilotage`,
  d'ailleurs — même gap, hors périmètre de cet Enabler) — vérifié par grep, 0 occurrence.
- `pivot-ui/src/app/core/modules/module-metadata.ts` (`MODULE_METADATA`) ne contient pas non
  plus d'entrée `agilite` — tout module absent de ce catalogue statique retombe sur
  `defaultMeta()`, qui force `comingSoon: true` (voir le commentaire de tête de fichier :
  ajouter une entrée ici est explicitement documenté comme nécessaire "when a new module is
  introduced on the backend", jamais fait pour agilite).
- Constaté en conditions réelles (2026-07-10, vérification manuelle locale sur l'environnement
  dev tournant) : le tenant unique (`PIVOT SaaS`, actif) ne voit aucun module agilite, classé en
  permanence "à venir" côté `ModuleRegistryService.comingSoonModules` — comportement actuellement
  **exact** (pas un bug d'affichage : la route n'existe vraiment pas), mais qui masque un domaine
  métier livré et fonctionnel depuis plusieurs sprints.
- **Gap distinct, complémentaire, à ne pas confondre** : `public.plan_modules`,
  `public.module_activations` et `public.module_overrides` (schéma `pivot-core`) sont
  **entièrement vides** (0 ligne chacune) en environnement local — même une fois le shell câblé,
  l'API `GET /api/modules` ne renverra `enabled: true` pour aucun module tant que ces tables ne
  sont pas seedées/administrées. À traiter (ici ou dans un Enabler séparé, à trancher au Gate 1)
  avant que `activeModules` (qui exige `enabled && !comingSoon`) puisse jamais afficher agilite
  comme actif de bout en bout.

**Critères de complétion** (⬜ — Enabler non démarré, ACs à affiner au Gate 1) :

- ⬜ `pivot-agilite-ui` : conversion en workspace Angular multi-projets
  (`projects/agilite-ui/`), `ng-package.json`, `public-api.ts` exportant les routes agilite
  (poker, rétro, roue, capacity/standup à mesure de leur livraison) et les composants
  nécessaires à leur résolution — mirroring `pivot-collaboratif-ui`#36 (EN17.10)
- ⬜ CI GitHub Actions `.github/workflows/publish-agilite-ui.yml` — `npm publish` sur push
  `main` + tag semver (mirroring `publish-collaboratif-ui.yml`/`publish-ui-core.yml`, scope
  `@pivot-platform`)
- ⬜ `pivot-ui/src/app/core/modules/module-metadata.ts` : entrée `MODULE_METADATA['agilite']`
  avec `comingSoon: false` une fois le wiring réel en place (jamais avant, pour ne pas afficher
  un module inatteignable — même règle que documentée pour `whiteboard`)
- ⬜ `pivot-ui/src/app/app.routes.ts` : route(s) `agilite` remplace(nt)
  `loadComponent(ComingSoonComponent)` par `loadChildren` réel (mirroring
  `whiteboard-module-loader.ts`, EN17.10)
- ⬜ Given un utilisateur authentifié dont le tenant a le module `agilite` activé, when il
      navigue vers une route agilite dans `pivot-ui`, then le composant réel (chargé depuis
      `@pivot-platform/agilite-ui`) s'affiche — pas `ComingSoonComponent`
- ⬜ Given un tenant sans le module `agilite` activé, when un utilisateur navigue vers une route
      agilite, then `moduleGuard` bloque l'accès (comportement existant, non régressé)
- ⬜ Error case : fallback géré côté shell si `@pivot-platform/agilite-ui` indisponible/échec de
      chargement dynamique — pas de page blanche silencieuse (mirroring
      `ModuleLoadErrorComponent`, import statique — pas un second chunk lazy, cf. incident déjà
      documenté sur EN17.10)
- ⬜ **Décision Gate 1 à trancher explicitement** : le seeding de `plan_modules`/
      `module_activations` pour le tenant de dev fait-il partie du périmètre de cet Enabler, ou
      d'un Enabler séparé (`pivot-core`, administration du registre de modules) ? Sans ça,
      `activeModules` restera vide même une fois le shell câblé.
- ⬜ Security : aucune fuite de logique d'un tenant vers un autre via le module chargé
      dynamiquement — vérifier que le composant agilite résout son `tenantId` exclusivement
      depuis le token porteur (même garde-fou qu'EN17.10 pour whiteboard)
- ⬜ Coverage ≥ 85 % sur le nouveau code de wiring (les deux repos)
- ⬜ `pivot-agilite-ui` reste déployable en standalone pour le dev local (nginx/port existant,
      non cassé par la conversion en workspace multi-projets)

**Dépendances** : `EN17.10` (précédent technique direct, mergé — même pattern à répliquer),
`EN17.3` (précédent ui-core), backend `pivot-agilite-core` (déjà livré, plusieurs US mergées
Sprint 8) — et la décision Gate 1 ci-dessus sur le périmètre du seeding `module_activations`.

**Contexte de découverte** : identifié le 2026-07-10 en vérifiant manuellement pourquoi
l'environnement dev local n'affichait aucun module actif malgré un backend `pivot-agilite-core`
fonctionnel et un tenant actif en base — root-cause tracée jusqu'au code (absence de route +
absence d'entrée `MODULE_METADATA`), pas un problème d'authentification ni de configuration
Docker (deux fausses pistes explorées et écartées avant celle-ci).

**Statut** : ⬜ Non démarré — Gate 1 (PO Agent, AC Given/When/Then complètes + décision sur le
périmètre du seeding) à faire avant implémentation.

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: agilite · Phase: Socle
Stage: ⬜ · Priority: High
