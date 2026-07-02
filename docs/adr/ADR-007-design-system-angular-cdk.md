# ADR-007 — Design system : Angular CDK + SCSS BEM custom

**Date :** 2026-07-02
**Statut :** Accepté
**Décideurs :** Équipe PIVOT (5 mainteneurs)

---

## Contexte

L'architecture multi-repo (ADR-006) introduit `pivot-design-system` comme repo dédié publiant `@pivot/design-system`. Il faut décider de la stack technique : utiliser un design system open-source existant, ou construire un DS custom ?

---

## Décision

**Angular CDK (comportement/a11y) + SCSS BEM custom (visuel) — aucune lib visuelle tierce.**

### Stack retenue

| Couche | Choix | Raison |
|--------|-------|--------|
| Comportement & a11y | `@angular/cdk` | Headless, battle-tested, maintenu par Google, base d'Angular Material |
| Visuel | SCSS BEM custom + CSS custom properties | Identité visuelle PIVOT 100% maîtrisée |
| Icons | Lucide Icons (SVG inline) | Léger, tree-shakeable, pas de font icon |
| Tests a11y | axe-core (automatisé CI) | Standard WCAG 2.1 AA |
| Documentation | Storybook | Référence composants + a11y stories |

### Structure `pivot-design-system`

```text
src/
├── cdk/          # Wrappers Angular CDK (overlay, focus trap, a11y directives)
├── tokens/       # CSS custom properties : couleurs, spacing, typo, radius, shadows, z-index
├── components/   # Button, Input, Select, Card, Modal, Toast, Badge, Avatar, Spinner
├── scss/         # Mixins BEM, reset, utilitaires
└── index.ts      # Point d'entrée unique @pivot/design-system
```

### Composants MVP (priorité avant module repos)

`Button · Input · Select · Textarea · Card · Modal · Toast · Badge · Avatar · Spinner · Tabs · Table`

---

## Alternatives rejetées

### Angular Material (rejeté)

- Couche visuelle Material Design imposée, difficile à surcharger sans dette CSS
- Breaking changes fréquents entre versions Angular
- Identité visuelle = "encore une app Material"

### Taiga UI (rejeté)

- Très opinionâtre visuellement
- Learning curve pour 5 mainteneurs + agents
- Dépendance externe avec lag de mise à jour Angular

### Spartan UI / shadcn-angular (rejeté)

- Trop jeune (2024), communauté petite
- Risque MCO non acceptable pour une lib socle

### Tailwind CSS (rejeté)

- Incompatible avec la convention SCSS BEM déjà en place dans pivot-ui
- Pas de composants Angular natifs
- Classes utilitaires dans templates = dette de lisibilité

---

## Conséquences

- `pivot-design-system` dépend uniquement de `@angular/cdk` (zéro lib visuelle tierce)
- Tous les repos `pivot-xxx-ui` importent `@pivot/design-system` pour composants + tokens
- `pivot-ui` consomme ET réexporte `@pivot/design-system` via `@pivot/ui-core`
- Storybook = source de vérité visuelle — toute évolution composant passe par une story + test a11y
- Changement de token CSS = **breaking change potentiel pour tous les repos modules** → versioning sémantique strict
