# US16.4.1 — Sélection et persistance du thème utilisateur

## Contexte

- **US** : `docs/backlog/EPIC-shell-ux/FEATURES/charte-themes/us-theme.md` (F16.4 — Thèmes,
  EPIC-shell-ux E16)
- **PR principale** : `pivot-ui` [#46](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/46)
  (`feat(ui): ThemeService — light/dark/ocean themes with CSS token overrides`) — merged
  `2026-06-28`
- **PR complémentaires** (fonctionnalité livrée en réalité sur 3 PR distinctes, voir § Écarts) :
  - `pivot-ui` [#49](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/49) (`feat(ui): redesign
    shell and navbar — top-nav layout, theme toggle, user menu`) — bouton icône lune/soleil +
    `aria-label` dynamique, déjà figée sous
    `docs/specs/EPIC-shell-ux/us16-1-1-navigation-principale.md` (US16.1.1)
  - `pivot-ui` [#48](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/48) (`feat(ui):
    ContactComponent — contact cards, form validation, public route`) — migration des pages
    légales vers les tokens CSS, incluant le fond violet conditionnel au thème sombre (AC non
    lié au sujet principal de cette PR, voir § Écarts)
- **Dernier commit au moment du figeage (PR #46)** : dernier commit de la branche
  `feat/us16-4-1-theme` avant merge (squash) — `ThemeService` + tests + tokens dark
- **Gate 4 MERGE_CONFIDENCE (PR #46)** : 80/100 — décision "merge documenté" (seuil ≥ 85 requis
  pour l'auto-merge documenté dans le commentaire de revue ; 2 bloquants documentation identifiés
  — voir § Écarts — corrigés dans le diff final avant merge, pas de second commentaire Gate 4
  posté après correction)
- **Gate 2 COVERAGE (PR #46)** : SonarCloud 93.9 % coverage sur le nouveau code, 0 % duplication,
  Quality Gate passed
- **Dépend de** : aucune dépendance backend — feature 100 % front (pas de PR `pivot-core`
  associée)

---

## Spec fonctionnelle

### ThemeService (`src/app/core/theme/theme.service.ts`, PR #46)

Service injectable `providedIn: 'root'`, expose un signal `theme` en lecture seule (`'light' |
'dark'`).

- **Résolution initiale** (`resolveInitialTheme()`) : `localStorage['pivot_theme']` (si valeur
  valide dans `VALID_THEMES`) → sinon `window.matchMedia('(prefers-color-scheme: dark)')` →
  sinon `'light'`.
- **`setTheme(theme)`** : met à jour le signal `_theme`.
- **`toggleTheme()`** : bascule `light ↔ dark` (implémentation finale — la PR mentionnait
  initialement un thème `'ocean'` et un `cycleTheme()` à 3 états, retirés avant merge, voir
  § Écarts).
- **`effect()`** posé dans le constructeur, s'exécute de façon synchrone à la création du
  service (donc avant le premier rendu — pas de flash de mauvais thème) et à chaque changement de
  `_theme` : pose/retire `data-theme="dark"` sur `<html>` (`light` → attribut retiré, `dark` →
  attribut posé) et persiste la valeur dans `localStorage['pivot_theme']`.
- **9 tests Vitest** (`theme.service.spec.ts`) : résolution initiale (stockée valide, valeur
  invalide ignorée), `setTheme()` (signal, attribut DOM, persistance), `toggleTheme()`
  (light→dark→light), effet appliqué dès la construction avec préférence stockée.

### Tokens CSS (`src/styles/tokens.scss`, PR #46 puis PR #107)

- PR #46 introduit le bloc `[data-theme="dark"]` : surcharge `--color-brand-*`, `--color-gray-*`,
  `--surface-bg`, `--surface-card`, `--surface-sidebar`, `--surface-navbar`, `--color-error`,
  `--color-success` pour la palette bleue d'origine.
- PR #107 (`style(ui): charte graphique v3 — violet/magenta duotone`, hors périmètre de cette US,
  postérieure de plus d'une semaine) remplace entièrement la palette de couleurs (bleu → violet/
  magenta) mais conserve le mécanisme `[data-theme="dark"]` mis en place par cette US — pas de
  changement d'architecture du theming, uniquement des valeurs de tokens.

### Basculeur navbar (`NavbarComponent`, livré par PR #49 — US16.1.1)

- Bouton icône lune (thème clair actif) / soleil (thème sombre actif) dans la navbar,
  `(click)="toggleTheme()"` → `ThemeService.toggleTheme()`.
- `aria-label` / `title` dynamiques via `themeLabel()` (computed) : `"Passer en mode sombre"`
  quand le thème actif est clair, `"Passer en mode clair"` quand il est sombre.
- Ce mécanisme est physiquement dans le diff de PR #49 (US16.1.1 — refonte navbar), pas dans la
  PR #46 dédiée à cette US — voir § Écarts.

### Pages légales — fond thème sombre (`legal-notice`/`privacy`/`terms.component.ts`, livré par
PR #48)

- À l'origine (PR #11, `Feature/auth`), les 3 pages légales avaient un fond dégradé
  (`var(--auth-gradient)`) **fixe, quel que soit le thème**.
- PR #48 (`feat(ui): ContactComponent...`) migre ces composants des couleurs hex en dur vers les
  tokens CSS et, à cette occasion, change le fond par défaut en `var(--surface-bg)` (suit le
  thème actif) puis ajoute `:host-context([data-theme="dark"]) .legal-page { background:
  var(--auth-gradient); }` — c'est cette ligne, à ce jour, qui réalise concrètement l'AC "fond
  violet en thème sombre". Voir § Écarts : ce changement n'a aucun rapport fonctionnel avec le
  sujet de la PR #48 (ContactComponent) ni avec la US16.4.1 elle-même dans son titre/description.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-ui`)

| Fichier | PR | Rôle |
|---|---|---|
| `src/app/core/theme/theme.service.ts` | #46 (créé), #49 (intégration navbar) | Service thème — signal, résolution initiale, effect DOM + localStorage |
| `src/app/core/theme/theme.service.spec.ts` | #46 | 9 tests Vitest |
| `src/styles/tokens.scss` | #46 (bloc `[data-theme="dark"]`), #107 (nouvelle palette) | Tokens CSS surchargés en thème sombre |
| `src/test-setup.ts` | #46 | Mock global `window.matchMedia` (JSDOM) |
| `vitest.config.ts` | #46 | Ajout `setupFiles: ['src/test-setup.ts']` |
| `PATCH_NOTES.md` | #46 | Note utilisateur "Deux thèmes disponibles : Clair et Sombre" |
| `src/app/core/layout/navbar/navbar.component.ts` | #49 | Bouton icône lune/soleil, `toggleTheme()`, `themeLabel()` computed |
| `src/app/features/legal/legal-notice.component.ts` / `privacy.component.ts` / `terms.component.ts` | #48 | Fond `var(--surface-bg)` par défaut + `var(--auth-gradient)` en thème sombre |

### Endpoints / modèles / contrats techniques pertinents

Feature 100 % front, aucun endpoint backend. Persistance exclusivement `localStorage`
(`pivot_theme`) — classifiée cookie/stockage strictement nécessaire (UX fonctionnel, pas de
donnée personnelle), sans consentement RGPD requis (point relevé en Gate 4 PR #46, à consigner
côté audit RGPD `pivot-docs`).

---

## Écarts vs AC initiaux / vs plan pré-écrit

- **AC "Icône lune/soleil dans la navbar" et AC "`aria-label` adapté à l'état courant" ne sont
  pas dans la PR de cette US.** La PR #46 ne livre que `ThemeService` (aucune UI, aucun bouton).
  Le bouton et son `aria-label` dynamique sont apparus dans PR #49, physiquement rattachée à
  US16.1.1 (refonte navbar) et déjà figée sous ce nom. Ces deux AC de US16.4.1 ne sont donc
  vérifiables qu'en allant lire une PR/spec qui n'affiche pas cet id — traçabilité AC → PR cassée
  pour ces deux lignes.
- **AC "Pages légales : fond violet en thème sombre" livré par une PR sans rapport thématique**
  (`pivot-ui` #48, `ContactComponent`). Le fond conditionnel au thème sombre est un effet de bord
  d'une migration de couleurs en dur vers les tokens CSS, faite dans une PR dont le sujet
  principal est une toute autre fonctionnalité (page de contact). Aucune mention de US16.4.1 dans
  le titre, le corps ou les tests de PR #48.
- **Thème `ocean` et `cycleTheme()` prévus puis retirés en cours de PR #46** — le corps de la PR
  #46 et son titre mentionnent encore "light/dark/ocean" et `cycleTheme()`, mais le diff réel
  mergé (vérifié via `gh pr diff`) ne contient que `Theme = 'light' | 'dark'` et `toggleTheme()`
  (bascule binaire). Le titre de la PR n'a jamais été renommé malgré la demande explicite du
  commentaire Gate 4 (`"→ à renommer : feat(ui): ThemeService — light/dark themes..."`) — la PR a
  été mergée avec un titre qui ne reflète pas son contenu final. `PATCH_NOTES.md`, en revanche, a
  bien été corrigé ("Deux thèmes disponibles" et non "Trois thèmes").
- **Gate 4 = 80/100 en score affiché mais PR mergée** — le commentaire Gate 4 de PR #46 posait la
  décision "merge documenté — 2 correctifs à apporter avant merge" avec un score de 80/100 (seuil
  d'auto-merge = 85). Les 2 bloquants (PATCH_NOTES incohérent, titre PR non renommé) ont été
  partiellement corrigés dans le diff final (PATCH_NOTES oui, titre non) sans qu'un second
  commentaire Gate 4 recalculé n'ait été posté sur la PR — pas de trace du score final réel au
  moment du merge.
- **Résidu CSS `[data-theme="ocean"]`** : les tokens `ocean` mentionnés dans la spec US16.1.1
  (`docs/specs/EPIC-shell-ux/us16-1-1-navigation-principale.md`, § "Choix technique") comme
  réservés à `feat/us16-4-1-theme` n'apparaissent pas dans le diff final de PR #46 — soit ils
  n'ont jamais été ajoutés côté CSS dans cette PR, soit retirés avant merge en même temps que le
  TypeScript. Aucun résidu `[data-theme="ocean"]` trouvé dans `tokens.scss` au moment du figeage.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US16.1.1 — Navigation principale | Spec `docs/specs/EPIC-shell-ux/us16-1-1-navigation-principale.md` : `ThemeService` y est consommé par la navbar (bouton icône, `aria-label` dynamique) — c'est cette PR (#49) qui réalise concrètement 2 des 7 AC de US16.4.1 (voir § Écarts). |
| US16.1.2 — Menu utilisateur | Le dropdown utilisateur inclut un sélecteur de thème inline (mentionné dans le corps de PR #49 : "User dropdown: info, selecteur theme inline, deconnexion") — mécanisme secondaire de bascule, non détaillé dans les AC de cette US, hors périmètre de ce figeage. |
| US02.1.2 — Préférence de langue | PR distincte (`pivot-ui` #72), mécanisme de persistance similaire (`localStorage`) mais sujet fonctionnel différent (langue, pas thème). |

## Hors périmètre (explicitement exclu)

- Thème `ocean` / thème à 3 états — prévu en cours de développement de PR #46, retiré avant merge,
  aucun résidu fonctionnel.
- Détail du sélecteur de thème inline dans le dropdown utilisateur (US16.1.2) — non couvert par
  les AC de cette US.
- Toute UI de préférence de thème en dehors du bouton navbar (pas de page réglages dédiée à ce
  stade).
