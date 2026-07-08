# US16.2.2 — Angular : Page d'accueil (section modules à venir)

## Contexte

- **US** : `docs/backlog/EPIC-shell-ux/FEATURES/accueil/us-accueil-modules-avenir.md` (F16.2 — Accueil, EPIC-shell-ux E16)
- **PR** : `pivot-ui` [#47](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/47) (`feat/us16-2-home`) — **même PR que
  `US16.2.1`** (grille des modules actifs) : les deux US ont été livrées en un seul commit fonctionnel,
  `HomeComponent` couvrant grille active + section "à venir" dans le même diff. Voir
  `docs/specs/EPIC-shell-ux/us16-2-1-accueil-grille-modules.md` pour le contrat technique complet du
  composant (fichiers modifiés, `ModuleRegistryService`, endpoints) — ce document se concentre sur la
  partie "modules à venir" spécifique à cette US, sans dupliquer le reste.
- **Dernier commit au moment du figeage** : `68f06383` (merge commit `762a4ac7`)
- **Gate 2 COVERAGE** : 86,33 % stmts (repo global, PR body) · SonarCloud 100 % coverage sur le code
  nouveau, 0 nouvelle issue, 0 hotspot
- **Gate 4 MERGE_CONFIDENCE** : 98/100 (2ᵉ revue Gate 4 dédiée à la PR, après le 88/100 Gate 3+4 initial
  corrigé sur `5ce551b`) — merge autonome. La revue Gate 4 98/100 référence explicitement l'AC "Cards
  'à venir'" dans son tableau de traçabilité (`AC Traceability 25/25`), avec test associé
  `renders coming-soon cards with badge`.
- **Dépend de** : `US16.2.1` (même PR, grille active livrée dans le même composant),
  contrat `GET /api/modules` exposé par `pivot-core` (module registry), registre statique
  `MODULE_METADATA` (`comingSoon: true` par module, côté `pivot-ui`)

---

## Spec fonctionnelle

### Section "Modules à venir" (`HomeComponent`, route `/home`)

Sous la grille des modules actifs (section "Vos modules"), une seconde section `<section
class="modules-section" aria-labelledby="coming-soon-heading">` s'affiche **uniquement si
`comingSoonModules().length > 0`** :

- **Titre** : `<h2 id="coming-soon-heading">Modules à venir</h2>` — hiérarchie de titres cohérente avec
  la section des modules actifs (même `h2`, landmark distinct).
- **Source des données** : `comingSoonModules` (signal exposé par `ModuleRegistryService`) — entrées de
  `MODULE_METADATA` marquées `comingSoon: true` (6 modules concernés dans le diff : pilotage, agilité,
  collaboratif — modules phase-3 non encore activés côté backend).
- **Carte "à venir"** : `<div class="module-card module-card--coming-soon" role="listitem"
  aria-disabled="true">` (pas de `routerLink`, pas de balise `<a>` — contrairement aux cartes actives
  qui sont des `<a [routerLink]>`). Contenu : icône (`aria-hidden="true"`, `[innerHTML]="mod.icon"`),
  nom, description, badge `<span class="module-card__badge">À VENIR</span>`.
- **Style désactivé** : `opacity: 0.55`, `filter: grayscale(0.4)`, `cursor: not-allowed`, pas d'effet
  hover (`transform: none`).
- **Accessibilité** : `aria-label` dynamique par carte = `"{nom} — bientôt disponible"` (attribut,
  distinct du texte du badge visible — voir *Écarts vs plan initial*), `aria-disabled="true"`,
  `role="listitem"` dans une grille `role="list"`.
- **Responsive** : même grille `.modules-grid` que la section active (`grid-template-columns:
  repeat(auto-fill, …)`), bascule en `1fr` (une colonne) sous `@media (max-width: 640px)` —
  règle partagée entre les deux sections, pas de style dédié à la section "à venir".

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-ui`, partie "à venir" du diff `#47`)

| Fichier | Rôle |
|---|---|
| `src/app/features/home/home.component.ts` | Bloc `@if (comingSoonModules().length > 0)` — section, boucle `@for` sur `comingSoonModules()`, carte non cliquable |
| `src/app/features/home/home.component.scss` | `.module-card--coming-soon`, `.module-card__badge`, media query `640px` (partagée avec la grille active) |
| `src/app/features/home/home.component.spec.ts` | `renders coming-soon cards with badge` (assertion sur `.module-card__badge` = `"À VENIR"`) + 2 tests d'état vide impliquant `comingSoonSignal` |
| `src/app/core/modules/module-metadata.ts` | `comingSoon: true` sur les entrées phase-3 (source du filtrage) |

Le reste des fichiers du diff (`app.routes.ts`, `Dockerfile`, `PATCH_NOTES.md`, `module.model.ts`) est
partagé avec `US16.2.1` — voir sa spec dédiée, non reproduit ici.

### Endpoints / modèles pertinents

`comingSoonModules` n'est **pas** issu d'un endpoint dédié : c'est un `computed()` côté
`ModuleRegistryService` qui croise la réponse de `GET /api/modules` (modules réellement connus du
backend) avec les entrées statiques de `MODULE_METADATA` marquées `comingSoon: true` côté client. Aucun
champ `comingSoon` n'existe dans `PivotModuleDto` (backend) — la distinction actif/à venir est
entièrement pilotée par la constante front `MODULE_METADATA`, jamais par l'API.

---

## Écarts vs plan initial

- **Label affiché ≠ libellé de l'AC.** L'AC backlog demande un label **"Bientôt disponible"** sur les
  cartes à venir. Le badge visible réellement rendu est **`"À VENIR"`** (`.module-card__badge`,
  couvert par le test `renders coming-soon cards with badge`) — la chaîne "bientôt disponible"
  n'apparaît que dans l'attribut `aria-label` (`"{nom} — bientôt disponible"`), invisible à l'écran,
  jamais dans le texte visible. L'intention de l'AC (signaler que le module n'est pas encore
  disponible) est respectée, mais le libellé exact diverge — non corrigé ici, à trancher par le PO
  Agent si l'harmonisation du wording est jugée nécessaire.
- **Aucune US/PR séparée** : cette US n'a jamais eu de branche ni de PR propres — elle a été absorbée
  dans le développement de `US16.2.1` (`feat/us16-2-home`), qui livrait la page d'accueil complète
  (grille + section à venir) en une seule fois. Les deux items backlog restent distincts côté
  traçabilité AC, mais pointent vers le même commit/PR.
- **Pas de test dédié à la non-cliquabilité.** L'AC "Pas de lien cliquable vers les modules à venir"
  n'est couverte par aucune assertion Vitest explicite (pas de test cherchant l'absence de
  `routerLink`/`<a>`) — elle est vérifiable par inspection du template (`<div>` sans `routerLink`,
  `aria-disabled="true"`, `cursor: not-allowed`) mais pas par un test automatisé dédié. Marqué 🟡 dans
  le backlog plutôt que ✅ pour cette raison.
- **Pas de test dédié au responsive.** L'AC "Responsive sur mobile" repose sur une media query CSS
  (`@media (max-width: 640px)`) partagée avec la grille active, non testée par Vitest (les tests
  Angular ne couvrent pas le rendu CSS). Vérifiable par inspection du SCSS uniquement. Marqué 🟡 pour
  la même raison.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US16.2.1 — Grille des modules actifs | Même composant, même PR (`#47`) — la section "à venir" est rendue juste après la grille active dans le même template |
| US16.1.1 / US16.1.2 — Shell (navbar, menu utilisateur) | `HomeComponent` s'affiche dans le shell livré par ces US, sans couplage direct avec la section "à venir" |
| US03.1.1 / US03.1.2 / US03.2.1 — Admin activation module | Quand un module `comingSoon: true` est activé côté backend et apparaît dans `GET /api/modules`, il bascule côté front de la section "à venir" vers la grille active (logique `ModuleRegistryService`, hors diff `#47`) |
| EN03.2 / US03.2.2 — `moduleGuard` | Sans effet ici : les cartes "à venir" ne portent aucun `routerLink`, donc aucune route à protéger n'est exposée par cette section |

---

## Hors périmètre (explicitement exclu)

- Notification / CTA "être prévenu" quand un module à venir devient disponible
- Tri, filtre ou personnalisation de la section "à venir"
- Distinction visuelle entre "désactivé" et "phase-3" au sein de la section (un seul badge générique
  `"À VENIR"` pour les deux cas)
- Correction du libellé du badge pour l'aligner sur le texte exact de l'AC ("Bientôt disponible") —
  voir *Écarts vs plan initial*
