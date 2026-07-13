# EN17.17 — DS Vague 4 : composants avancés

**Type d'enabler** : design-system / UI

**Stack :** Angular CDK (comportement / a11y) + SCSS BEM custom (visuel) — ADR-007, aucune lib
visuelle tierce.

**Objectif technique** : Livrer les composants avancés à la demande des modules
(`datepicker` · `autocomplete` · `drawer` · `popover` · `stepper` · `list` · `tree` +
directive `pvTone`), majoritairement à créer (comportement CDK riche : Overlay positionné,
`cdk/stepper`, `cdk/tree`, calendrier maison). Ces composants ne sont lancés que sur besoin module
confirmé, pas en anticipation.

**Justification** : Cette vague couvre les composants les plus coûteux et les moins universels du
socle — d'où une priorité Medium et un déclenchement à la demande. `datepicker` est un effort XL
réel (décision ADR-007 : calendrier maison, pas de lib) qu'il ne faut lancer que sur besoin module
confirmé, sinon un `input type="date"` natif stylé tient en attendant. `tree` (`cdk/tree`) prépare
l'arborescence whiteboard/portefeuille à venir. `drawer`, `popover`, `stepper`, `autocomplete` et
`list` répondent à des besoins d'interaction ciblés. La directive `pvTone` (optionnelle) applique
`pv-tone-*` par input plutôt qu'en classe, homogénéisant la couleur d'état sur badge/avatar/glyph.

## Composants livrés

- [ ] `pivot-ds-datepicker` — `Overlay` + calendrier maison (pas de lib, ADR-007) ;
      `ControlValueAccessor`. À ne lancer que sur besoin module confirmé. Effort XL (itératif).
- [ ] `pivot-ds-autocomplete` — `.form-control` + `Overlay` ; `cdk/listbox` + filtrage async,
      `ControlValueAccessor`. Effort L.
- [ ] `pivot-ds-drawer` — `Overlay` positionné (side panel), FocusTrap, Escape ; SCSS à ajouter.
      Effort M.
- [ ] `pivot-ds-popover` — `Overlay` (contenu riche vs tooltip texte) ; emballe `pv-card`. Effort M.
- [ ] `pivot-ds-stepper` — `cdk/stepper` (linéaire/optionnel) ; SCSS à ajouter. Effort M.
- [ ] `pivot-ds-list` / `list-item` — sémantique liste, densités ; SCSS à ajouter. Effort S.
- [ ] `pivot-ds-tree` — `cdk/tree` (futur : arbo whiteboard/portefeuille) ; SCSS à ajouter.
      Effort L.
- [ ] directive `pvTone` — applique `pv-tone-*` par input plutôt qu'en classe. Effort S.

## Critères de complétion communs

Chaque composant/directive livré :

- [ ] Standalone, `ChangeDetectionStrategy.OnPush`, sélecteur `pivot-ds-*`, exporté dans
      `public-api.ts` (des deux copies : shim + package — cf. Notes).
- [ ] Champ (`datepicker`, `autocomplete`) : `ControlValueAccessor` complet (`formControlName`,
      `disabled`, `touched`), erreur reliée via `aria-describedby`.
- [ ] Zéro couleur/taille en dur — tokens `var(--*)` ou classe `pv-*`/`.form-control`.
- [ ] A11y : rôle/ARIA corrects, navigation clavier, focus visible/trap pour les overlays,
      `prefers-reduced-motion`.
- [ ] Aucun libellé en dur — clés Transloco côté appelant.
- [ ] Story Storybook (variantes + story a11y) + test unitaire Vitest + test axe-core vert.
- [ ] Dark mode vérifié (`[data-theme="dark"]`) + entrée `DESIGN-SYSTEM.md` à jour (cf. §5 roadmap).

## Notes

- Dépend de EN17.2 (`@pivot-platform/design-system` publié) et de EN17.13 (Vague 0 : `icon`,
  helpers `A11yModule`, gabarit de test CVA, axe-core en CI, Storybook stabilisé).
- **Doublon shim / package** (gap EN17.2/EN17.3) : tant que la dédup n'est pas faite, chaque
  composant atterrit dans **les deux copies** — shim `pivot-ui/projects/design-system` + repo
  canonique `pivot-design-system`.
- Vague déclenchée à la demande des modules (dates, arbo, assistants) : ne pas anticiper le
  `datepicker` XL sans besoin confirmé (cf. §6 roadmap).

---
Item Type: Enabler · Parent: E17 · Type: design-system · Module: core · Phase: Socle
Stage: ⬜ · Priority: Medium
Dépendances: EN17.2 (`@pivot-platform/design-system` publié), EN17.13 (DS Vague 0)
