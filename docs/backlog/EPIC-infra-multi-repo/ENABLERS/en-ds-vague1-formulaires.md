# EN17.14 — DS Vague 1 : socle formulaires

**Type d'enabler** : design-system / UI

**Stack :** Angular CDK (comportement / a11y) + SCSS BEM custom (visuel) — ADR-007, aucune lib
visuelle tierce.

**Objectif technique** : Livrer le socle de composants de formulaire de l'ADR-007
(`button` · `input` · `textarea` · `select` · `checkbox` · `radio-group` · `switch`), chaque champ
intégrant `ControlValueAccessor` pour un branchement Reactive Forms natif (`formControlName`, état
`disabled`/`touched`/`invalid` propagé). Les composants emballent les classes SCSS existantes
(`.btn*`, `.form-control`) et ajoutent le comportement/a11y via CDK.

**Justification** : C'est la vague au plus fort effet de levier sur le shell. Le scan de `pivot-ui`
mesure **31 `<select>` natifs** (aucun composant Select, accessibilité/UX refaites à la main
partout), **20 fichiers avec `form-*`** (champs recomposés écran par écran) et **25 fichiers avec
`.btn`** (états loading/disabled ad hoc) : ce socle refactorise ces écrans et équipe simultanément
les modules encore bootstrap (agilité/pilotage n'ont qu'un `HomeComponent`), qui construiront leurs
premiers formulaires directement sur le DS. La charte visuelle étant déjà en SCSS, l'essentiel est
l'emballage + le comportement CDK + `ControlValueAccessor` ; seuls `select`/`checkbox`/`radio-group`
demandent de créer du comportement (overlay listbox, roving tabindex). Chaque composant est une
branche parallélisable.

## Composants livrés

- [ ] `pivot-ds-button` — emballe `.btn*` (primary/secondary/danger/ghost/lg/full) ; états
      `loading`/`disabled`, `icon`, `type`. Effort S.
- [ ] `pivot-ds-input` — emballe `.form-control` ; `ControlValueAccessor`, préfixe/suffixe/icône.
      Effort M.
- [ ] `pivot-ds-textarea` — emballe `.form-control` ; `ControlValueAccessor`, auto-resize via
      `cdkTextareaAutosize`. Effort S.
- [ ] `pivot-ds-select` — `.form-control` + `Overlay` ; `cdk/listbox`, mono/multi + recherche,
      `ControlValueAccessor`. Remplace les 31 `<select>` natifs. Effort L.
- [ ] `pivot-ds-checkbox` — `ControlValueAccessor`, `aria-checked`, état indéterminé (SCSS mineur à
      ajouter). Effort S.
- [ ] `pivot-ds-radio-group` — roving tabindex (`A11yModule`), `ControlValueAccessor` (SCSS mineur à
      ajouter). Effort M.
- [ ] `pivot-ds-switch` — `role="switch"`, `ControlValueAccessor` ; proche de `pv-segmented`.
      Effort S.

## Critères de complétion communs

Chaque composant livré :

- [ ] Standalone, `ChangeDetectionStrategy.OnPush`, sélecteur `pivot-ds-*`, exporté dans
      `public-api.ts` (des deux copies : shim + package — cf. Notes).
- [ ] Champ : `ControlValueAccessor` complet (`formControlName`, `disabled`, `touched`), erreur
      reliée via `aria-describedby` (conteneur `form-field` d'EN17.13).
- [ ] Zéro couleur/taille en dur — tokens `var(--*)` ou classe `pv-*`/`.btn`/`.form-*`.
- [ ] A11y : rôle/ARIA corrects, navigation clavier, focus visible, `prefers-reduced-motion`.
- [ ] Aucun libellé en dur — clés Transloco côté appelant.
- [ ] Story Storybook (variantes + story a11y) + test unitaire Vitest + test axe-core vert.
- [ ] Dark mode vérifié (`[data-theme="dark"]`) + entrée `DESIGN-SYSTEM.md` à jour (cf. §5 roadmap).

## Notes

- Dépend de EN17.2 (`@pivot-platform/design-system` publié) et de EN17.13 (Vague 0 : `form-field`,
  gabarit de test CVA, axe-core en CI, Storybook stabilisé).
- **Doublon shim / package** (gap EN17.2/EN17.3) : tant que la dédup n'est pas faite, chaque
  composant atterrit dans **les deux copies** — shim `pivot-ui/projects/design-system` + repo
  canonique `pivot-design-system`.
- Peut avancer en parallèle des emballages `pv-*` de la Vague 3 (sans dépendance croisée).

---
Item Type: Enabler · Parent: E17 · Type: design-system · Module: core · Phase: Socle
Stage: ⬜ · Priority: High
Dépendances: EN17.2 (`@pivot-platform/design-system` publié), EN17.13 (DS Vague 0)
