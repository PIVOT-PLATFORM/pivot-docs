# EN17.13 — DS Vague 0 : fondations & dette

**Type d'enabler** : design-system / UI

**Stack :** Angular CDK (comportement / a11y) + SCSS BEM custom (visuel) — ADR-007, aucune lib
visuelle tierce.

**Objectif technique** : Poser les briques transverses sans lesquelles aucune vague de composants
ne tient sa Definition of Done : composant `icon` (wrapper Lucide SVG inline), réconciliation du
`ToastService` sur les 4 repos, conteneur `form-field`, et la chaîne qualité (axe-core en CI +
Storybook stabilisé). Cette vague ne livre pas un socle fonctionnel complet mais l'outillage et les
fondations dont dépendent les Vagues 1 à 4.

**Justification** : La charte visuelle existe déjà en SCSS (`tokens.scss` / `patterns.scss` /
`components.scss`) — l'essentiel du travail des vagues suivantes n'est donc pas du design mais de
l'emballage : composant standalone fin posant les classes `pv-*`/`.btn`/`.form-*` existantes +
comportement/a11y CDK. Mais cet emballage est impossible tant que quatre prérequis manquent : (1) la
moitié des composants (menu, alert, empty-state…) affichent une icône et attendent un `icon`
fondateur, absent aujourd'hui ; (2) le `ToastService` est la **seule duplication inter-modules
réelle** (pivot-ui complet, collaboratif/pilotage en stubs console, agilité en variante signal
divergente) — la normaliser est l'urgence n°1 ; (3) tous les champs de formulaire de la Vague 1
s'accrochent au conteneur `form-field` (label/erreur/hint, `aria-describedby`) ; (4) la DoD exige
une story Storybook + un test axe-core vert, or Storybook a été retiré au bootstrap (incompat
Angular 22) et axe-core n'est pas branché en CI. Vague 0 débloque donc tout le reste.

## Composants livrés

- [ ] `pivot-ds-icon` — wrapper Lucide SVG inline tree-shakeable (ADR-007) ; dépendance de la moitié
      des composants des Vagues 2/3/4. À créer (comportement + registre d'icônes).
- [ ] Réconciliation `ToastService` — normaliser les 4 implémentations (pivot-ui complet,
      collaboratif/pilotage stubs, agilité variante signal), publier dans le DS, brancher
      collaboratif/agilité/pilotage dessus (retrait des stubs/variantes) ; ajouter `LiveAnnouncer`
      CDK (`A11yModule`) pour l'annonce accessible. *Urgence n°1 : seule duplication réelle.*
- [ ] `pivot-ds-form-field` — conteneur label + contrôle projeté + erreur + hint, réutilise
      `.form-group`/`.form-label`/`.form-error`/`.form-hint`, câble `aria-describedby` vers l'erreur ;
      socle de tous les champs de la Vague 1.
- [ ] Directive/helpers `A11yModule` partagés — `LiveAnnouncer` mutualisé + tokens focus-ring, base
      commune des composants interactifs.

## Chaîne qualité (prérequis DoD des vagues suivantes)

- [ ] axe-core branché en CI (job dédié, échec bloquant sur violation a11y).
- [ ] Storybook réactivé et stabilisé (branche `chore/storybook-toolchain` en cours) — condition de
      la DoD « une story par composant » avant la Vague 1.
- [ ] Gabarit de test `ControlValueAccessor` (patron Vitest réutilisable) pour les champs de la
      Vague 1.

## Critères de complétion communs

Chaque composant/brique livré :

- [ ] Standalone, `ChangeDetectionStrategy.OnPush`, sélecteur `pivot-ds-*`, exporté dans
      `public-api.ts` (des deux copies : shim + package — cf. Notes).
- [ ] Zéro couleur/taille en dur — tokens `var(--*)` ou classe `pv-*`/`.btn`/`.form-*`.
- [ ] Aucun libellé en dur — clés Transloco côté appelant.
- [ ] Story Storybook (variantes + story a11y) + test unitaire Vitest + test axe-core vert.
- [ ] Dark mode vérifié (`[data-theme="dark"]`) + entrée `DESIGN-SYSTEM.md` à jour (cf. §5 roadmap).

## Notes

- Dépend de EN17.2 (`@pivot-platform/design-system` publié). Vague 0 est le prérequis des Vagues 1
  à 4 (EN17.14 → EN17.17).
- **Doublon shim / package** (gap EN17.2/EN17.3) : le DS vit aujourd'hui en deux copies — le shim
  `pivot-ui/projects/design-system` (buildé par le shell) et le repo canonique
  `pivot-design-system` (`@pivot-platform/design-system`). Tant que la dédup (EN17.2/EN17.3) n'est
  pas faite, chaque composant doit atterrir dans **les deux copies**.
- Worktrees DS actifs (`.ds-worktrees/wt-a11y-edit`, `wt-sb`) : sessions a11y/axe et Storybook en
  cours — coordonner avant d'ouvrir les branches composants pour éviter les conflits.

---
Item Type: Enabler · Parent: E17 · Type: design-system · Module: core · Phase: Socle
Stage: ⬜ · Priority: Critical
Dépendances: EN17.2 (`@pivot-platform/design-system` publié)
