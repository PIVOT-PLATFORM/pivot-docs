# EN17.15 — DS Vague 2 : overlays & feedback

**Type d'enabler** : design-system / UI

**Stack :** Angular CDK (comportement / a11y) + SCSS BEM custom (visuel) — ADR-007, aucune lib
visuelle tierce.

**Objectif technique** : Livrer les surfaces flottantes et les composants de feedback
(`dialog` + `DialogService` · `menu` · `tooltip` · `alert` · `spinner` · `progress-bar` ·
`skeleton` · `empty-state`), en généralisant l'existant (`confirm-dialog`, `.alert`, `.spinner`,
`pv-skeleton`, `pv-empty-state`) et en couvrant les besoins d'interaction courants via CDK Overlay
et `cdk/menu`.

**Justification** : Cette vague généralise ce qui existe déjà partiellement et comble les besoins
d'interaction transverses. `pivot-ds-dialog` absorbe et remplace le `confirm-dialog` actuel
(overlay + FocusTrap déjà en place) en le pilotant par un `DialogService` (tailles, scroll),
supprimant les modales recomposées à la main. Les composants de feedback sont majoritairement de
l'emballage rapide (`.alert`, `.spinner`, `pv-skeleton`, `pv-empty-state` existent en SCSS) — seuls
`menu`, `tooltip` et `progress-bar` demandent du comportement CDK à écrire. La plupart consomment le
`pivot-ds-icon` fondateur de la Vague 0.

## Composants livrés

- [ ] `pivot-ds-dialog` (+ `DialogService`) — généralise `confirm-dialog` sur `cdk/dialog` ; emballe
      `pv-modal`/`pv-modal-overlay` ; tailles/scroll ; FocusTrap. Effort M.
- [ ] `pivot-ds-menu` — dropdown via `cdk/menu` (navigation clavier, sous-menus) ; SCSS à ajouter.
      Effort M.
- [ ] `pivot-ds-tooltip` (directive) — `Overlay` + `aria-describedby`, délais d'affichage ; SCSS à
      ajouter. Effort S.
- [ ] `pivot-ds-alert` — emballe `.alert` ; variantes info/success/warning/error, dismissible.
      Effort S.
- [ ] `pivot-ds-spinner` — emballe `.spinner` ; tailles, `aria-busy`/label. Effort S.
- [ ] `pivot-ds-progress-bar` — `role="progressbar"`, déterminé/indéterminé ; SCSS à ajouter.
      Effort S.
- [ ] `pivot-ds-skeleton` — emballe `pv-skeleton` ; respecte `prefers-reduced-motion` (déjà géré).
      Effort S.
- [ ] `pivot-ds-empty-state` — emballe `pv-empty-state` ; icône/titre/texte/action. Effort S.

## Critères de complétion communs

Chaque composant livré :

- [ ] Standalone, `ChangeDetectionStrategy.OnPush`, sélecteur `pivot-ds-*`, exporté dans
      `public-api.ts` (des deux copies : shim + package — cf. Notes).
- [ ] Zéro couleur/taille en dur — tokens `var(--*)` ou classe `pv-*`/`.alert`/`.spinner`.
- [ ] A11y : rôle/ARIA corrects (`aria-busy`, `role="progressbar"`, `aria-describedby`), navigation
      clavier, focus visible/trap pour les overlays, `prefers-reduced-motion`.
- [ ] Aucun libellé en dur — clés Transloco côté appelant.
- [ ] Story Storybook (variantes + story a11y) + test unitaire Vitest + test axe-core vert.
- [ ] Dark mode vérifié (`[data-theme="dark"]`) + entrée `DESIGN-SYSTEM.md` à jour (cf. §5 roadmap).

## Notes

- Dépend de EN17.2 (`@pivot-platform/design-system` publié) et de EN17.13 (Vague 0 : `icon`,
  helpers `A11yModule`/`LiveAnnouncer`, axe-core en CI, Storybook stabilisé).
- **Doublon shim / package** (gap EN17.2/EN17.3) : tant que la dédup n'est pas faite, chaque
  composant atterrit dans **les deux copies** — shim `pivot-ui/projects/design-system` + repo
  canonique `pivot-design-system`.

---
Item Type: Enabler · Parent: E17 · Type: design-system · Module: core · Phase: Socle
Stage: ⬜ · Priority: High
Dépendances: EN17.2 (`@pivot-platform/design-system` publié), EN17.13 (DS Vague 0)
