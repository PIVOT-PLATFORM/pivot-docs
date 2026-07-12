# EN51.1 — Composant Card & tous ses états

**Type d'enabler** : design-system / UI

**Objectif technique** : Fournir dans `pivot-design-system` un composant **Card** canonique, avec son
anatomie (titre, valeur principale, tendance, action contextuelle) et **tous ses états**, dont l'état
**`module-wip`** qui rend un cockpit composable même quand la brique de données n'est pas prête.

**Justification** : Sans un composant card qui gère nativement l'absence de donnée, chaque cockpit
réinventerait ses placeholders et le principe « marche même si les modules sont WIP » serait
impossible. C'est la brique de plus bas niveau de l'EPIC.

## États couverts (obligatoires)

- `loading` — squelette (skeleton).
- `ready` — donnée affichée (valeur + tendance + action).
- `empty` — pas de donnée métier (premier lancement) ; message actionnable.
- `error` — échec de chargement, avec réessai.
- `no-permission` — masquée ou grisée selon le rôle (cf. EN51.5).
- **`module-wip`** — la brique de données n'est pas encore livrée/activée : placeholder informatif
  « bientôt », non-bloquant, non-cliquable (`aria-disabled`) — même famille visuelle que les pages
  « Bientôt disponible » du shell E16.

**Critères de complétion** :
- [ ] Composant `Card` publié dans `@pivot-platform/design-system` (Angular CDK + SCSS BEM).
- [ ] Les 6 états ci-dessus rendus et documentés dans Storybook, un story par état.
- [ ] État `module-wip` distinct de `empty` et de `no-permission` (sémantique + visuel).
- [ ] Accessibilité WCAG 2.1 AA : `aria-busy` (loading), `aria-disabled` (module-wip/no-permission),
      contrastes, focus visible, région `aria-live` pour les transitions d'état.
- [ ] Tests a11y axe-core en CI.
- [ ] Modes de densité (confortable / compact) supportés par le composant.

## Notes

- Le composant est **de présentation** : il reçoit son état et sa donnée en entrée ; c'est le moteur
  de composition (EN51.2) qui décide de l'état (notamment `module-wip` selon le statut module E03).

---
Item Type: Enabler · Parent: E51 · Type: design-system · Module: core · Phase: phase-3
Stage: ⬜ · Priority: Critical
Dépendances: EN17.2 (`@pivot-platform/design-system` publié)
