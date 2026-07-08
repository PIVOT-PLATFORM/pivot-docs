# EN17.9 — Publication @pivot-platform/collaboratif-ui + câblage shell route whiteboard

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
- [ ] `pivot-collaboratif-ui` : workspace Angular multi-projets (`projects/collaboratif-ui/`),
      `ng-package.json`, `public-api.ts` exportant les routes whiteboard (`COLLABORATIF_ROUTES`)
      et les composants nécessaires à leur résolution
- [ ] Given un utilisateur authentifié dont le tenant a le module `whiteboard` activé, when il
      navigue vers `/whiteboard` dans `pivot-ui`, then le composant réel du tableau blanc
      (chargé depuis `@pivot-platform/collaboratif-ui`) s'affiche — pas `ComingSoonComponent`
- [ ] Given un tenant sans le module `whiteboard` activé, when un utilisateur navigue vers
      `/whiteboard`, then `moduleGuard` bloque l'accès (comportement existant, non régressé)
- [ ] CI GitHub Actions `.github/workflows/publish-collaboratif-ui.yml` — `npm publish` sur push
      `main` + tag semver (mirroring `publish-ui-core.yml`, scope `@pivot-platform`)
- [ ] `pivot-ui/src/app/app.routes.ts` : route `whiteboard` remplace
      `loadComponent(ComingSoonComponent)` par
      `loadChildren(() => import('@pivot-platform/collaboratif-ui').then(m => m.COLLABORATIF_ROUTES))`
- [ ] Error case: given `@pivot-platform/collaboratif-ui` indisponible ou erreur de chargement
      dynamique (échec réseau, chunk manquant), then un fallback est géré côté shell — pas de
      page blanche silencieuse
- [ ] Security: aucune fuite de logique d'un tenant vers un autre via le module chargé
      dynamiquement — le composant whiteboard résout déjà son `tenantId` depuis le token porteur
      (inchangé par ce wiring)
- [ ] Coverage ≥ 85 % sur le nouveau code de wiring (les deux repos)
- [ ] `pivot-collaboratif-ui` reste déployable en standalone pour le dev local (`nginx.conf`
      existant, port 8090, non cassé par la conversion en workspace multi-projets)

**Dépendances** : `pivot-core#178` (mergée — registre de modules), `pivot-ui#118` (mergée —
persistance `comingSoon`), `EN17.3` (précédent technique ui-core, mergé)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: collaboratif · Phase: Socle
Stage: Ready · Priority: High
