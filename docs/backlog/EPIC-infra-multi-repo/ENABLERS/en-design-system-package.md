# EN17.2 — Publication @pivot/design-system (npm package)

**Type d'enabler** : infrastructure

**Stack :** Angular CDK (comportement / a11y) + SCSS BEM custom (visuel) — aucune lib visuelle tierce.

**Objectif technique** : Extraire la librairie Angular UI incubée dans `pivot-ui` (EN17.8) vers un
package npm autonome `@pivot/design-system` dans un repo dédié `pivot-design-system`, avec pipeline
GitHub Packages, afin que tous les repos `pivot-*-ui` partagent composants et tokens visuels sans
duplication.

**Justification** : Chaque repo module-ui doit afficher les mêmes composants (Button, Modal,
Toast…) et respecter les mêmes tokens visuels. Sans package publié, chaque repo réimplémenterait
sa propre UI. L'extraction est déclenchée par la création du premier `pivot-*-ui` — créer le repo
avant éviterait la friction inutile d'un package sans consommateur (double PR par évolution,
versioning strict des tokens).

## Trajectoire (actée 2026-07-07)

Cet enabler est une **extraction**, pas une création ex nihilo : le contenu du design system
est incubé au préalable comme librairie interne de `pivot-ui` (EN17.8 — structure ADR-007,
tokens source unique, CDK, Storybook). L'extraction se réduit alors à un déménagement de la
librairie + mise en place du pipeline de publication.

**Déclencheur** : la création du premier repo module `pivot-*-ui`. Tant qu'aucun repo module
n'existe, `pivot-ui` est l'unique consommateur et le package publié n'apporte que de la
friction (double PR par évolution, versioning strict des tokens sans bénéficiaire).

**Points de vigilance à la création du repo** :

- Politique de version des tokens : breaking = major, avec période de dépréciation (ancien
  nom de variable conservé un cycle) — cf. conséquence ADR-007
- `peerDependencies` Angular alignées sur tous les consommateurs
- Distribution `next` (pre-release npm) pour ne pas bloquer les repos modules sur des
  publications stables
- `CLAUDE.md` propre au repo, créé avec lui (règle multi-repo)

**Critères de complétion** :
- [ ] Repo `pivot-design-system` créé avec structure Angular library — par extraction de la
      librairie incubée dans `pivot-ui` (EN17.8)
- [ ] Dépendance : `@angular/cdk` uniquement (pas d'Angular Material, pas de Taiga, pas de PrimeNG)
- [ ] Exports comportement (CDK wrappers) : overlay, focus trap, a11y, keyboard navigation
- [ ] Exports visuels (SCSS BEM) : tokens CSS vars (couleurs, spacing, typo, radius, shadows), mixins
- [ ] Composants Socle : Button, Input, Card, Modal, Toast, Badge, Avatar
- [ ] Storybook configuré et déployé (GitHub Pages)
- [ ] Tests a11y automatisés (axe-core) dans la CI — WCAG 2.1 AA
- [ ] Package publié dans GitHub Packages : `@pivot/design-system`
- [ ] Versioning sémantique via Semantic Release
- [ ] `pivot-ui` consomme `@pivot/design-system` — migration des composants existants
- [ ] README d'intégration pour les repos modules

**Statut** : ✅ Done — package [`@pivot-platform/design-system@0.1.0`](https://github.com/PIVOT-PLATFORM/pivot-design-system/pkgs/npm/design-system) publié sur GitHub Packages (2026-07-07). Repo [`pivot-design-system`](https://github.com/PIVOT-PLATFORM/pivot-design-system), 35 fichiers migrés depuis EN17.8. Note : scope npm `@pivot-platform` (correspond à l'org GitHub PIVOT-PLATFORM — contrainte GitHub Packages).

## Notes

- Dépend de : EN17.8 (Incubation du design system dans `pivot-ui`) — fournit le contenu à
  extraire (tokens, composants migrés CDK, Storybook).
- Repo créé avant la création de `pivot-collaboratif-ui` — décision actée pour éviter la friction
  de créer le package au moment où le premier consommateur en a besoin.

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: ✅ · Priority: Critical
