# US16.2.1 — Angular : Page d'accueil (grille des modules actifs)

## Contexte

- **US** : `docs/backlog/EPIC-shell-ux/FEATURES/accueil/us-accueil-grille.md` (F16.2 — Accueil, EPIC-shell-ux E16)
- **PR** : `pivot-ui` [#47](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/47) (`feat/us16-2-home`)
- **Dernier commit au moment du figeage** : `68f06383` (merge commit `762a4ac7`)
- **Gate 2 COVERAGE** : 86,33 % stmts (repo global, PR body) · SonarCloud 100 % coverage sur le
  code nouveau, 0 nouvelle issue, 0 hotspot
- **Gate 4 MERGE_CONFIDENCE** : 98/100 (2ᵉ revue, après correctif ESLint `5ce551b`) — merge
  autonome
- **Dépend de** : `US16.1.1` (navigation principale, shell), `US16.1.2` (menu utilisateur, shell),
  contrat `GET /api/modules` exposé par `pivot-core` (module registry)

---

## Spec fonctionnelle

### HomeComponent (`piv-home`, route `/home`)

Page d'accueil du shell authentifié, rendue dans `ShellComponent` (navbar + footer). La racine `/`
redirige vers `/home` (route `dashboard` conservée en parallèle pour compatibilité des liens
existants, mais n'est plus la cible de la redirection racine).

Comportement observable :

- **Salutation personnalisée** : `Bonjour, {{ prénom ?? email ?? 'vous' }} 👋`, résolue depuis
  `AuthService.currentUser`. Fallback en cascade prénom → email → `"vous"` si aucun des deux n'est
  disponible.
- **Chargement** : au montage, `ModuleRegistryService.loadModules()` déclenche
  `GET /api/modules`. Pendant la requête, `loading()` reste `true` et affiche 3 cartes squelette
  (animation pulse) dans une section `aria-busy="true"`.
- **Grille des modules actifs** : une fois chargé, chaque module renvoyé par l'API avec
  `enabled=true` et `comingSoon=false` (résolu via `MODULE_METADATA`) s'affiche en carte cliquable
  (icône, nom, description, CTA "Ouvrir →"), `role="listitem"` dans une grille `role="list"`,
  navigation via `routerLink`.
- **Cartes "à venir"** : les entrées de `MODULE_METADATA` non encore retournées par l'API
  s'affichent en cartes grisées (`opacity: 0.55`, `filter: grayscale`), badge "À VENIR",
  `aria-disabled="true"`, non cliquables.
- **États vides distincts** : (a) aucun module actif mais des modules à venir existent → message
  "Aucun module activé pour l'instant, contactez votre administrateur" ; (b) aucun module du tout
  (actif ou à venir) → message générique "Aucun module disponible". Les deux cas sont couverts par
  des tests séparés.
- **Erreur réseau** : `ModuleRegistryService.loadModules()` absorbe l'erreur HTTP
  (`catchError` → `of([])`), `loading()` repasse à `false` sans jamais faire planter le composant —
  le rendu retombe sur l'état vide.
- **Accessibilité** : landmark `<main aria-label="Accueil">`, hiérarchie `h1` (salutation) /
  `h2` (titres de section), grilles `role="list"`/`role="listitem"`, `aria-label` dynamique par
  carte ("Ouvrir {nom}" / "{nom} — bientôt disponible"), anneau de focus visible
  (`:focus-visible`) sur les cartes actives, icônes SVG `aria-hidden="true"`.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-ui`)

| Fichier | Rôle |
|---|---|
| `src/app/features/home/home.component.ts` | Réécriture complète — logique de la page (signals, `ngOnInit`, `hexToRgba`) |
| `src/app/features/home/home.component.scss` (nouveau) | Styles BEM dédiés (`.home`, `.modules-grid`, `.module-card--*`), tokens CSS uniquement |
| `src/app/features/home/home.component.spec.ts` | 12 cas Vitest (mount, salutation + fallbacks, skeleton, 2 états vides, cartes actives, cartes à venir, erreur registry, `hexToRgba`) |
| `src/app/app.routes.ts` | Redirection racine `'' → 'home'` (au lieu de `'dashboard'`) ; route `dashboard` conservée en second |
| `src/app/core/modules/module-metadata.ts` | `aria-hidden="true"` ajouté sur tous les SVG inline ; simplification de l'icône `quiz` |
| `src/app/core/modules/module.model.ts` | Clarifications TSDoc uniquement, pas de changement de contrat |
| `Dockerfile` | `apk upgrade --no-cache` (durcissement image nginx, sans lien fonctionnel avec cette US) |
| `PATCH_NOTES.md` | Entrée `[Unreleased]` — annonce utilisateur de la nouvelle page d'accueil |

`ModuleRegistryService` (`src/app/core/modules/module-registry.service.ts`, `activeModules` /
`comingSoonModules` / `enrichedModules` / `loadModules()`) est **consommé** par cette PR mais n'en
fait pas partie — introduit par une PR antérieure, hors du diff `#47`.

### Endpoints / modèles consommés

```text
GET /api/modules
→ 200 PivotModuleDto[]  ({ id, name, version, enabled, status })
→ erreur réseau/HTTP → absorbée par ModuleRegistryService, résout [] côté HomeComponent
```

`PivotModuleUi` = `PivotModuleDto` enrichi côté client par `MODULE_METADATA[id]` (icône, couleur,
description, route, `comingSoon`) — jamais envoyé à l'API, jamais de champ `icon`/`color` côté
backend (confirmé Gate 4 : vecteur XSS exclu, le SVG vient exclusivement d'une constante statique
client-side, jamais de l'API).

---

## Écarts vs plan initial

- **Périmètre livré plus large que prévu à l'écriture de l'US.** Les "Notes d'implémentation"
  d'origine du fichier backlog décrivaient une "page stub Socle — contenu enrichi dans sprints
  suivants (modules dashboard, quick access)". La PR réellement mergée livre directement la grille
  complète (modules actifs + à venir, skeleton, états vides, salutation dynamique) — le
  fractionnement en sprints suivants annoncé n'a pas eu lieu, tout est arrivé en une fois dans
  cette US.
- **Textes en français non externalisés (i18n) au moment du merge**, en contradiction avec la
  règle absolue `pivot-ui/CLAUDE.md` ("tous les libellés externalisés, jamais de chaîne littérale
  dans les templates"). Le Gate 3/4 a classé ce point "mineur" (−2 sur 100) plutôt que bloquant, et
  la PR a été mergée en l'état. La chaîne littérale a effectivement cassé le changement de langue
  côté page d'accueil en production, corrigé ensuite par
  [`pivot-ui` #108](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/108) (`fix(ui): home page
  ignores language switch`, mergée 2026-07-07) — postérieure au figeage de cette US, traitée comme
  correctif de bug plutôt que comme un retour en arrière du Gate 5.
- **Deux findings Gate 4 ("mineurs", −2/25 sur Quality) non vérifiables dans le diff réel** : champ
  mort `_moduleType` et import `CommonModule` superflu. Aucune occurrence de `_moduleType` ni de
  `CommonModule` n'existe dans les fichiers effectivement modifiés par `#47` (`home.component.ts`
  final n'importe que `RouterLink`). Ces findings visent probablement un fichier hors du diff de
  cette PR (candidat : `module-registry.service.ts`, introduit ailleurs) — non résolu ici, à
  vérifier lors du figeage Gate 5 de la PR qui a réellement introduit ce service.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US16.1.1 — Navigation principale | `HomeComponent` s'affiche à l'intérieur du shell (navbar) livré par cette US |
| US16.1.2 — Menu utilisateur | Fournit `AuthService.currentUser` consommé pour la salutation |
| US16.1.3 — Badge notifications | Même zone shell (navbar), livrée séparément, aucun couplage de code |
| US03.1.1 / US03.1.2 / US03.2.1 — Admin activation module | Alimentent côté backend la liste retournée par `GET /api/modules`, consommée ici |
| EN03.2 / US03.2.2 — `moduleGuard` | Protège les routes des modules dont les cartes pointent ici (`routerLink`) — pas de duplication de la logique d'activation côté `HomeComponent` |

---

## Hors périmètre (explicitement exclu)

- Widgets de tableau de bord (KPIs, activité récente) — route `dashboard` toujours présente et
  distincte, non retravaillée par cette US
- Personnalisation / réorganisation de la grille par l'utilisateur (drag & drop, favoris)
- Liste détaillée des notifications (US16.1.3 — badge uniquement)
- Recherche ou filtre dans la grille de modules
- Correction i18n des libellés (traitée hors de cette US, voir *Écarts vs plan initial* — PR #108)
