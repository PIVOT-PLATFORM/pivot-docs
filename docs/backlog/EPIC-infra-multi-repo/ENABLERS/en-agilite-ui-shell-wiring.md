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
- **Gap complémentaire, désormais dans le périmètre de cet Enabler (décision de scope tranchée
  au Gate 1)** : `public.plan_modules`, `public.module_activations` et `public.module_overrides`
  (schéma `pivot-core`) sont **entièrement vides** (0 ligne chacune) en environnement local —
  même une fois le shell câblé, l'API `GET /api/modules` ne renverra `enabled: true` pour aucun
  module tant que ces tables ne sont pas seedées. **Décision** : le seed minimal de
  `plan_modules`/`module_activations` pour le tenant de dev (`PIVOT SaaS`, seul tenant actif en
  local), `module_key='agilite'`, `enabled=true`, fait partie de cet Enabler — pas d'Enabler
  séparé `pivot-core`. L'administration générique et self-service du registre de modules
  (multi-tenants, UI d'activation) reste hors périmètre et pourra faire l'objet d'un Enabler
  futur si besoin ; seul le seed nécessaire pour rendre agilite visible de bout en bout en dev
  est couvert ici, condition nécessaire pour qu'`activeModules` (qui exige
  `enabled && !comingSoon`) puisse jamais afficher agilite comme actif.

**Critères de complétion** (Gate 1 complété — AC Given/When/Then prêtes pour implémentation ;
`Stage` frontmatter reste `⬜` tant que le code n'est pas mergé, avec recette mainteneur en
attente) :

- [ ] `pivot-agilite-ui` : conversion en workspace Angular multi-projets
      (`projects/agilite-ui/`), `ng-package.json`, `public-api.ts` exportant les routes agilite
      (poker, rétro, roue, capacity/standup à mesure de leur livraison) et les composants
      nécessaires à leur résolution — mirroring `pivot-collaboratif-ui`#36 (EN17.10)
- [ ] CI GitHub Actions `.github/workflows/publish-agilite-ui.yml` — `npm publish` sur push
      `main` + tag semver (mirroring `publish-collaboratif-ui.yml`/`publish-ui-core.yml`, scope
      `@pivot-platform`)
- [ ] `pivot-ui/src/app/core/modules/module-metadata.ts` : entrée `MODULE_METADATA['agilite']`
      avec `comingSoon: false` une fois le wiring réel en place (jamais avant, pour ne pas
      afficher un module inatteignable — même règle que documentée pour `whiteboard`)
- [ ] `pivot-ui/src/app/app.routes.ts` : route(s) `agilite` remplace(nt)
      `loadComponent(ComingSoonComponent)` par `loadChildren` réel via un loader dédié
      (`agilite-module-loader.ts`, mirroring `whiteboard-module-loader.ts` d'EN17.10),
      testable unitairement, isolé du reste du routing
- [ ] Given un utilisateur authentifié dont le tenant a le module `agilite` activé
      (`module_activations.enabled=true`), when il navigue vers une route `agilite` dans
      `pivot-ui`, then le composant réel (chargé depuis `@pivot-platform/agilite-ui`) s'affiche —
      pas `ComingSoonComponent`
- [ ] Given un tenant sans le module `agilite` activé (absent de `module_activations`, ou
      `enabled=false`), when un utilisateur navigue vers une route agilite, then `moduleGuard`
      bloque l'accès (comportement existant, non régressé)
- [ ] Error case : given `@pivot-platform/agilite-ui` indisponible ou erreur de chargement
      dynamique (échec réseau, chunk manquant), when le Router tente de résoudre
      `loadChildren`, then un fallback est géré côté shell — pas de page blanche silencieuse
      (`ModuleLoadErrorComponent` en import **statique**, pas un second chunk lazy — cf.
      incident déjà rencontré et corrigé sur EN17.10, à ne pas reproduire)
- [ ] **Seed `public.plan_modules`/`public.module_activations`** pour le tenant de dev
      (`PIVOT SaaS`, seul tenant actif en local), `module_key='agilite'`, `enabled=true` — **dans
      le périmètre de cet Enabler** (décision de scope tranchée au Gate 1, voir Justification :
      pas d'Enabler séparé `pivot-core` ; l'administration générique et self-service du registre
      de modules pour tenants multiples reste hors périmètre)
- [ ] Given le tenant de dev `PIVOT SaaS` et le module `agilite` catalogué mais non activé (état
      constaté avant seed, cf. Justification), when le seed de démarrage `pivot-core` (migration
      ou script d'amorçage, à la charge de cet Enabler côté `pivot-core`) s'exécute, then une
      ligne `public.plan_modules` associe `agilite` au plan du tenant de dev ET une ligne
      `public.module_activations` existe pour ce tenant avec `module_key='agilite'`,
      `enabled=true`
- [ ] Given le seed appliqué, when un utilisateur authentifié du tenant de dev appelle
      `GET /api/modules`, then la réponse contient une entrée `agilite` avec `enabled: true` —
      condition nécessaire (avec le wiring shell ci-dessus) pour qu'`activeModules` cesse d'être
      vide et que `agilite` sorte de `comingSoonModules` de bout en bout
- [ ] Given le seed déjà appliqué, when il est rejoué (redémarrage, re-déploiement, ou exécution
      manuelle répétée), then aucune erreur ni duplication — au plus une ligne
      `module_activations` par couple (tenant, `module_key`) — idempotence garantie (migration
      Flyway versionnée non rejouée par nature, ou script d'amorçage avec upsert/`ON CONFLICT`
      explicite, au choix de l'implémentation `pivot-core`)
- [ ] Error case : given un environnement fraîchement provisionné sans tenant `PIVOT SaaS` encore
      créé en base, when le seed s'exécute, then il échoue de façon explicite (log clair,
      contrainte FK vers `public.tenants` respectée) plutôt que de créer une ligne
      `module_activations` orpheline — pas d'échec silencieux
- [ ] Security : le seed est scopé à l'environnement de dev — jamais exécuté automatiquement
      contre un tenant de production, et n'introduit aucun endpoint HTTP d'activation de module
      accessible aux utilisateurs finaux ; seule une opération explicite côté déploiement/dev
      (migration ou script, hors surface API publique) modifie `module_activations`
- [ ] Security : aucune fuite de logique d'un tenant vers un autre via le module chargé
      dynamiquement — vérifier que le composant agilite résout son `tenantId` exclusivement
      depuis le token porteur (même garde-fou qu'EN17.10 pour whiteboard), jamais depuis un
      paramètre de route/query/body
- [ ] Coverage ≥ 85 % sur le nouveau code de wiring (`pivot-ui` : loader + route ;
      `pivot-agilite-ui` : workspace + routes exportées ; le seed `pivot-core` suit les standards
      de coverage de son propre `CLAUDE.md`)
- [ ] `pivot-agilite-ui` reste déployable en standalone pour le dev local (nginx/port existant,
      non cassé par la conversion en workspace multi-projets)

**Dépendances** : `EN17.10` (précédent technique direct, mergé — même pattern à répliquer),
`EN17.3` (précédent ui-core), backend `pivot-agilite-core` (déjà livré, plusieurs US mergées
Sprint 8). Périmètre de seeding tranché au Gate 1 (voir Justification) — inclus dans cet
Enabler, aucune dépendance externe supplémentaire.

**Contexte de découverte** : identifié le 2026-07-10 en vérifiant manuellement pourquoi
l'environnement dev local n'affichait aucun module actif malgré un backend `pivot-agilite-core`
fonctionnel et un tenant actif en base — root-cause tracée jusqu'au code (absence de route +
absence d'entrée `MODULE_METADATA`), pas un problème d'authentification ni de configuration
Docker (deux fausses pistes explorées et écartées avant celle-ci).

**Statut** : ⬜ Non démarré — Gate 1 complété (PO Agent : AC Given/When/Then complètes, décision
de périmètre tranchée — seed `plan_modules`/`module_activations` inclus dans cet Enabler). Prêt
pour implémentation (`Stage` frontmatter reste `⬜` jusqu'au merge + recette mainteneur).

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: agilite · Phase: Socle
Stage: ⬜ · Priority: High
