# EN17.8 — Incubation du design system dans pivot-ui

**Type d'enabler** : infrastructure

**Stack :** Angular CDK (comportement / a11y) + SCSS BEM custom (visuel) — stack actée par
ADR-007, inchangée.

## Contexte et décision

ADR-007 (Accepté) acte la stack et le repo cible `pivot-design-system`, mais le repo n'a
aujourd'hui **aucun consommateur** : les repos `pivot-*-ui` n'existent pas encore et
`pivot-ui` détient déjà l'embryon du design system en local (`src/styles/tokens.scss`,
`reset.scss`, `components.scss`, 3 composants partagés). Créer le repo maintenant ferait payer
immédiatement les coûts structurels d'un package publié (double PR par évolution, versioning
sémantique strict des tokens, GitHub Packages, CI dédiée) sans bénéfice en face.

**Décision de trajectoire** : le design system est **incubé comme librairie interne de
`pivot-ui`**, structurée selon la taxonomie ADR-007, afin que l'extraction vers le repo
`pivot-design-system` (EN17.2) soit un déménagement mécanique et non une réécriture.
L'extraction est déclenchée par la création du premier repo `pivot-*-ui` (voir EN17.2).

## Critères de complétion

- [ ] Librairie Angular workspace `projects/design-system` créée dans `pivot-ui`
      (ng-packagr), structure ADR-007 : `tokens/ · cdk/ · components/ · scss/`,
      point d'entrée unique
- [ ] Règle d'indépendance (condition d'extraction) : la librairie n'importe **aucun** service applicatif de
      `pivot-ui` (auth, tenant, i18n applicatif) — vérifiée par une règle de lint
      (frontière d'imports)
- [ ] `tokens.scss`, `reset.scss`, `components.scss` migrés dans la librairie — les tokens
      CSS custom properties deviennent la source unique
- [ ] Audit des valeurs codées en dur (couleurs, espacements) dans les SCSS de features,
      remplacées par les tokens
- [ ] `@angular/cdk` introduit — `confirm-dialog` migré sur overlay + focus trap CDK
      (première brique de la couche comportement/a11y)
- [ ] Composants partagés existants migrés dans la librairie (confirm-dialog, toast,
      password-strength) et alignés sur la liste Socle ADR-007
- [ ] Storybook monté sur la librairie dans `pivot-ui` (stories des composants migrés) —
      il déménagera avec la librairie à l'extraction
- [ ] Critère de déclenchement de l'extraction documenté dans le README de la librairie
      (renvoi vers EN17.2)

**Statut** : ⬜ À faire

## Notes

- Prérequis de : EN17.2 (Publication `@pivot/design-system`) — l'extraction consomme le
  contenu incubé ici.
- Contrairement au reste d'E17 (phase-3), cet enabler est **démarrable dès maintenant** :
  chaque critère est utile à `pivot-ui` seul, indépendamment de la création des repos modules.
- Les tests a11y axe-core et la publication GitHub Packages restent dans EN17.2 — hors
  périmètre de l'incubation.

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-v1-enterprise)
Stage: Backlog · Priority: Medium
