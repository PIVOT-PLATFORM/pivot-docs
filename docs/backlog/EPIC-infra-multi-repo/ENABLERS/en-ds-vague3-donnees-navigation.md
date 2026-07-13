# EN17.16 — DS Vague 3 : affichage de données & navigation

**Type d'enabler** : design-system / UI

**Stack :** Angular CDK (comportement / a11y) + SCSS BEM custom (visuel) — ADR-007, aucune lib
visuelle tierce.

**Objectif technique** : Livrer les composants d'affichage de données et de navigation
(`card` · `badge` · `chip` · `avatar` · `glyph` · `stat-card` · `page-header` · `segmented` ·
`tabs` · `accordion` · `pagination` · `breadcrumb` · `table`). L'essentiel est de l'emballage
rapide des motifs `pv-*` existants ; `tabs`, `accordion`, `pagination`, `breadcrumb` et surtout
`table` (structurant pour admin/portefeuille) portent le comportement/a11y CDK à écrire.

**Justification** : La plupart de ces composants sont des emballages `pv-*` déjà présents en SCSS
(`pv-card`, `pv-badge`, `pv-chip`, `pv-avatar`, `pv-glyph`, `pv-stat-card`, `pv-segmented`,
`pv-page-header`) : effort S, sans dépendance forte, d'où une vague largement parallélisable qui
peut même avancer en parallèle de la Vague 1. Le composant `table` est l'exception structurante — le
scan mesure **7 `<table>` natifs** (tri/pagination réécrits à chaque écran) ; il fonde l'affichage
tabulaire des écrans admin et portefeuille sur `cdk/table`. La priorité est Medium : ces composants
sont utiles mais moins bloquants que le socle formulaires (Vague 1) et les overlays (Vague 2).

## Composants livrés

- [ ] `pivot-ds-card` — emballe `pv-card`/`.card` ; header/body/footer + `--interactive`. Effort S.
- [ ] `pivot-ds-badge` — emballe `pv-badge` + `pv-tone-*` ; ton en input, variantes
      `--square`/`--fixed`. Effort S.
- [ ] `pivot-ds-chip` (+ list) — emballe `pv-chip` ; supprimable, `cdk/listbox` si sélectionnable.
      Effort M.
- [ ] `pivot-ds-avatar` — emballe `pv-avatar` + tons ; initiales/image, tailles xs→lg. Effort S.
- [ ] `pivot-ds-glyph` — emballe `pv-glyph` + tons ; lettre/icône carrée. Effort S.
- [ ] `pivot-ds-stat-card` — emballe `pv-stat-card` ; label/valeur/hint, `--accent`. Effort S.
- [ ] `pivot-ds-page-header` — emballe `pv-page-header` ; projection titre/icône/sous-titre/actions.
      Effort S.
- [ ] `pivot-ds-segmented` — emballe `pv-segmented` ; toggle segmenté (émet la valeur). Effort S.
- [ ] `pivot-ds-tabs` — `role="tablist"` + roving tabindex, contenu lazy ; SCSS à ajouter. Effort M.
- [ ] `pivot-ds-accordion` — `cdk/accordion`, `aria-expanded` ; SCSS à ajouter. Effort S.
- [ ] `pivot-ds-pagination` — contrôles + `aria-current` ; SCSS à ajouter. Effort S.
- [ ] `pivot-ds-breadcrumb` — `nav[aria-label]` + séparateurs ; SCSS à ajouter. Effort S.
- [ ] `pivot-ds-table` — `cdk/table` + tri + sticky + `scope="col"` ; remplace les 7 `<table>`
      natifs. Effort L.

## Critères de complétion communs

Chaque composant livré :

- [ ] Standalone, `ChangeDetectionStrategy.OnPush`, sélecteur `pivot-ds-*`, exporté dans
      `public-api.ts` (des deux copies : shim + package — cf. Notes).
- [ ] Zéro couleur/taille en dur — tokens `var(--*)` ou classe `pv-*`/`.card`.
- [ ] A11y : rôle/ARIA corrects (`role="tablist"`, `aria-expanded`, `aria-current`, `scope="col"`),
      navigation clavier, focus visible, `prefers-reduced-motion`.
- [ ] Aucun libellé en dur — clés Transloco côté appelant.
- [ ] Story Storybook (variantes + story a11y) + test unitaire Vitest + test axe-core vert.
- [ ] Dark mode vérifié (`[data-theme="dark"]`) + entrée `DESIGN-SYSTEM.md` à jour (cf. §5 roadmap).

## Notes

- Dépend de EN17.2 (`@pivot-platform/design-system` publié) et de EN17.13 (Vague 0 : `icon`,
  axe-core en CI, Storybook stabilisé). Les emballages `pv-*` peuvent avancer en parallèle de la
  Vague 1.
- **Doublon shim / package** (gap EN17.2/EN17.3) : tant que la dédup n'est pas faite, chaque
  composant atterrit dans **les deux copies** — shim `pivot-ui/projects/design-system` + repo
  canonique `pivot-design-system`.
- `table` : arbitrer tôt le périmètre (tri/pagination/sélection/sticky) pour éviter la
  sur-ingénierie (cf. §6 roadmap).

---
Item Type: Enabler · Parent: E17 · Type: design-system · Module: core · Phase: Socle
Stage: ⬜ · Priority: Medium
Dépendances: EN17.2 (`@pivot-platform/design-system` publié), EN17.13 (DS Vague 0)
