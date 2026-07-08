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
      `pivot-ui`#121, **mergée**, e2e happy-path vert (`whiteboard-shell-wiring.spec.ts`)
- [x] Given un tenant sans le module `whiteboard` activé, when un utilisateur navigue vers
      `/whiteboard`, then `moduleGuard` bloque l'accès (comportement existant, non régressé) —
      couvert par `e2e/modules/module-guard.spec.ts` (cas déjà existant, whiteboard, non modifié)
- [x] CI GitHub Actions `.github/workflows/publish-collaboratif-ui.yml` — `npm publish` sur push
      `main` + tag semver (mirroring `publish-ui-core.yml`, scope `@pivot-platform`) —
      `@pivot-platform/collaboratif-ui@0.1.0` publié (`pivot-collaboratif-ui`#36)
- [x] `pivot-ui/src/app/app.routes.ts` : route `whiteboard` remplace
      `loadComponent(ComingSoonComponent)` par `loadChildren: loadWhiteboardModule` — `pivot-ui`#121
      (isolé dans `whiteboard-module-loader.ts`, testable unitairement)
- [x] Error case: given `@pivot-platform/collaboratif-ui` indisponible ou erreur de chargement
      dynamique (échec réseau, chunk manquant), then un fallback est géré côté shell — pas de
      page blanche silencieuse — `ModuleLoadErrorComponent` (`pivot-ui`#121), couverture Vitest
      100 % + test d'intégration Router réel (`app.routes.spec.ts`, voir note technique ci-dessous
      sur pourquoi ce n'est pas un test Playwright)
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

**Notes techniques (incidents réels rencontrés et résolus avant merge)** :
- **`npm ci` 404 en CI, diagnostiqué à tort comme un accès cross-repo GitHub Packages
  manquant** : la vraie cause était une URL `resolved` fabriquée à la main dans
  `package-lock.json` (format générique `<pkg>/-/<pkg>-<version>.tgz` au lieu du vrai format de
  téléchargement GitHub Packages `/download/<scope>/<pkg>/<version>/<hash>`), écrite sans accès
  registre au moment de l'implémentation initiale. Confirmé par comparaison directe avec le
  lockfile de `pivot-ui`#122 (même package/version, vraie installation authentifiée, même hash
  d'intégrité, URL différente) — corrigé en copiant la bonne entrée. Aucune configuration
  d'accès package n'a dû être changée pour résoudre ce point précis.
- **`ModuleLoadErrorComponent` chargé en `loadComponent()` (donc un second chunk lazy)** :
  exposait le fallback exactement à la même classe de panne (échec de chargement de chunk)
  qu'il est censé couvrir. Corrigé en import statique — le composant fait désormais partie du
  bundle déjà chargé du shell, sans requête réseau supplémentaire au moment où il est affiché.
- **Simulation Playwright de l'échec de chargement dynamique non fiable** : `page.route('**/*.js',
  route => route.abort('failed'))` ne s'est jamais déclenché sur le chunk réel en CI (0
  interception loggée sur plusieurs runs), malgré un `import()` ES module qui continuait à
  réussir — limitation de l'interception réseau Playwright/Chromium sur les imports dynamiques
  de modules ES, pas un flake. Remplacé par un test d'intégration TestBed +
  `RouterTestingHarness` (`app.routes.spec.ts`) qui exerce exactement le même chemin
  `loadChildren -> reject -> .catch() -> activation Router réelle -> rendu réel` via `vi.doMock`
  au niveau du registre de modules plutôt que du réseau — fiable, et tourne dans la suite unit
  standard.
- **`pivot-ui#121` et `pivot-ui#122`** : collision réelle avec un collègue (`leo-brgn`) ayant
  travaillé le même Enabler en parallèle sans détecter l'issue déjà assignée. `#122` mergée en
  premier (workspace + publication déjà couverts par ailleurs) ; `#121`, rebasée dessus avec
  résolution manuelle des conflits (dont un doublon de route introduit par l'auto-merge), a
  finalement été retenue et mergée pour le volet `pivot-ui` car elle couvrait un AC obligatoire
  (fallback d'erreur) que `#122` seule ne couvrait pas.
- **`publish-ui-core.yml` cassé sur `main` en cours de route** (sans rapport direct avec cet
  Enabler, mais découvert et corrigé pendant ces travaux) : `npm ci` sans `NODE_AUTH_TOKEN` sur
  cette même dépendance, et republication de la même version à chaque push non-tag — `pivot-ui`#125.

**Statut** : ✅ Terminé — `pivot-collaboratif-ui`#36 et `pivot-ui`#121 mergées, CI 100 % verte
sur les deux repos (17/17 checks `pivot-ui`, y compris l'E2E happy-path et le test d'intégration
Router du cas d'erreur).

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: collaboratif · Phase: Socle
Stage: Review · Priority: High
