# US41.1.2 — Tooltips & aide contextuelle

**En tant que** utilisateur
**Je veux** disposer de **tooltips** et d'**aide contextuelle** sur les éléments d'interface complexes
**Afin de** lever un doute au moment précis où il se pose

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un élément complexe, when je le survole/focus, then une infobulle explicative s'affiche (désactivable) | ⬜ |
| Given un écran, when je clique « ? », then l'aide contextuelle de cet écran s'ouvre | ⬜ |
| Error : given un élément dont le texte d'aide n'a pas encore été rédigé pour un module récemment ajouté, when l'utilisateur le survole, then aucune infobulle vide ne s'affiche (silence plutôt qu'un tooltip cassé) | ⬜ |
| A11y : l'infobulle est accessible au clavier (focus, pas seulement survol souris) et annoncée au lecteur d'écran ; le bouton « ? » a un intitulé explicite (pas une icône seule sans texte alternatif) | ⬜ |

## Hors périmètre

- Rédaction éditoriale du contenu des tooltips par écran — relève du centre d'aide (US41.2.1/US41.2.2) comme source ; cette US couvre le mécanisme d'affichage, pas la production de contenu

## Notes d'implémentation

- Le contenu affiché doit pouvoir pointer vers un article détaillé du centre d'aide (US41.2.1) plutôt que dupliquer un texte long dans l'infobulle elle-même

---
Item Type: US · Parent: F41.1 · Module: core · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
