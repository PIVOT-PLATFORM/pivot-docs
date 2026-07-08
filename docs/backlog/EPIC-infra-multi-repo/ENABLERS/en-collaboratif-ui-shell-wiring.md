# EN17.10 — Publication @pivot-platform/collaboratif-ui + câblage shell route whiteboard

**Type d'enabler** : infrastructure

**Objectif technique** : Convertir `pivot-collaboratif-ui` en workspace Angular multi-projets
(à l'image de `pivot-ui/projects/ui-core`, cf. EN17.3) exposant un package npm
`@pivot-platform/collaboratif-ui` (routes + composants whiteboard) publié dans GitHub Packages,
puis câbler la route `/whiteboard` du shell `pivot-ui` pour la lazy-loader réellement via
`loadChildren`, en remplacement du placeholder `ComingSoonComponent` — première application
concrète du pattern ADR-006 pour un module métier réel.

**Justification** : Le backend expose déjà `whiteboard` dans le registre de modules
(`pivot-core#178`, `moduleCount` 0→1) et `pivot-ui` affiche déjà la carte "coming soon"
correctement persistante une fois le module connu du backend (`pivot-ui#118`) — mais
`/whiteboard` route toujours vers `ComingSoonComponent` en dur dans `app.routes.ts`,
indépendamment de tout état réel : aucun utilisateur ne peut atteindre le tableau blanc
collaboratif déjà déployé et fonctionnel sur `pivot-collaboratif-ui` malgré un backend
opérationnel. Dernier maillon manquant identifié lors de la vérification manuelle en local du
Sprint 5 (whiteboard invisible sur la home page malgré `pivot-collaboratif-core` servant du
trafic réel).

**Critères de complétion** :
- [x] `pivot-collaboratif-ui` : workspace Angular multi-projets (`projects/collaboratif-ui/`),
      `ng-package.json`, `public-api.ts` exportant les routes whiteboard (`COLLABORATIF_ROUTES`)
      et les composants nécessaires à leur résolution — `pivot-collaboratif-ui`#36 (closes
      `pivot-collaboratif-ui`#35), mergée
- [x] Given un utilisateur authentifié dont le tenant a le module `whiteboard` activé, when il
      navigue vers `/whiteboard` dans `pivot-ui`, then le composant réel du tableau blanc
      (chargé depuis `@pivot-platform/collaboratif-ui`) s'affiche — pas `ComingSoonComponent` —
      implémenté `pivot-ui`#121 (e2e happy-path `whiteboard-shell-wiring.spec.ts`), **CI bloquée**
      (voir note plus bas), pas encore mergée
- [x] Given un tenant sans le module `whiteboard` activé, when un utilisateur navigue vers
      `/whiteboard`, then `moduleGuard` bloque l'accès (comportement existant, non régressé) —
      couvert par `e2e/modules/module-guard.spec.ts` (cas déjà existant, whiteboard, non modifié)
- [x] CI GitHub Actions `.github/workflows/publish-collaboratif-ui.yml` — `npm publish` sur push
      `main` + tag semver (mirroring `publish-ui-core.yml`, scope `@pivot-platform`) —
      `@pivot-platform/collaboratif-ui@0.1.0` publié (`pivot-collaboratif-ui`#36)
- [x] `pivot-ui/src/app/app.routes.ts` : route `whiteboard` remplace
      `loadComponent(ComingSoonComponent)` par
      `loadChildren(() => import('@pivot-platform/collaboratif-ui').then(m => m.COLLABORATIF_ROUTES))`
      — `pivot-ui`#121 (isolé dans `whiteboard-module-loader.ts`, testable unitairement)
- [x] Error case: given `@pivot-platform/collaboratif-ui` indisponible ou erreur de chargement
      dynamique (échec réseau, chunk manquant), then un fallback est géré côté shell — pas de
      page blanche silencieuse — `ModuleLoadErrorComponent` (`pivot-ui`#121), couverture Vitest
      100 % + e2e dédié (chunk abort)
- [x] Security: aucune fuite de logique d'un tenant vers un autre via le module chargé
      dynamiquement — le composant whiteboard résout déjà son `tenantId` depuis le token porteur
      (inchangé par ce wiring) — vérifié : aucune occurrence de `tenantId`/`userId` envoyée depuis
      Angular dans `projects/collaboratif-ui/src` (grep, code + tests), wiring n'y touche pas
- [x] Coverage ≥ 85 % sur le nouveau code de wiring (les deux repos) — `pivot-collaboratif-ui` :
      310/310 tests (PR #36) ; `pivot-ui` : `whiteboard-module-loader.ts` et
      `module-load-error.component.ts` à 100 % lignes/fonctions/branches (PR #121)
- [x] `pivot-collaboratif-ui` reste déployable en standalone pour le dev local (`nginx.conf`
      existant, port 8090, non cassé par la conversion en workspace multi-projets) — vérifié par
      build réel (`npm run build`, `dist/frontend`) en plus du build librairie (PR #36)

**Dépendances** : `pivot-core#178` (mergée — registre de modules), `pivot-ui#118` (mergée —
persistance `comingSoon`), `EN17.3` (précédent technique ui-core, mergé)

**Blocage CI réel (2026-07-08, `pivot-ui`#121)** : `npm ci` échoue en 404 sur
`@pivot-platform/collaboratif-ui` — GitHub Packages renvoie 404 (jamais 403, par design) quand le
repo consommateur (`pivot-ui`) n'a pas d'accès cross-repo explicite à un package publié par un
**autre** repo (`pivot-collaboratif-ui`). Exactement le même type de blocage que le cross-repo
GHCR déjà documenté (`pivot-collaboratif-ui/TODO-SETUP.md`, bloquant #2). Action mainteneur
requise, hors de portée d'une PR : package `collaboratif-ui` (org PIVOT-PLATFORM) → Package
settings → "Manage Actions access" → ajouter `pivot-ui` (ou visibilité interne à l'org). Détail
dans `pivot-ui`#121 (label `needs-human-review`).

**Statut** : 🔄 In progress — volet `pivot-collaboratif-ui` (`#36`) mergé et publié ; volet
`pivot-ui` (`#121`) implémenté et vérifié (tsc/lint/tests/build locaux verts) mais CI bloquée par
un accès cross-repo GitHub Packages manquant (voir note ci-dessus) — pas de merge possible avant
levée de ce blocage infra.

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: collaboratif · Phase: Socle
Stage: In progress · Priority: High
