# US41.2.1 — Centre d'aide in-app (recherche & articles)

**En tant que** utilisateur
**Je veux** accéder à un **centre d'aide in-app** avec recherche, articles et catégories
**Afin de** trouver une réponse sans quitter l'outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le centre d'aide, when je recherche, then les articles pertinents remontent (recherche plein texte) | ⬜ |
| Given un article, when je l'ouvre, then il s'affiche in-app avec liens vers les fonctions concernées (deep-links) | ⬜ |
| Error : given une recherche sans résultat, when elle est lancée, then une suggestion de reformulation ou un lien vers le réseau de référents (US41.4.1) s'affiche plutôt qu'une page vide | ⬜ |
| Security : un article catégorisé pour un rôle/module non activé sur le tenant n'apparaît pas dans les résultats de recherche d'un utilisateur qui n'y a pas accès | ⬜ |
| A11y : recherche et navigation des articles utilisables au clavier ; structure de titres cohérente pour la navigation au lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Rédaction et maintenance éditoriale du contenu des articles — relève du processus de formation (F41.3), cette US couvre le mécanisme de consultation

## Notes d'implémentation

- La recherche doit couvrir le contenu réellement publié (pas un index figé au build) pour rester à jour sans redéploiement

---
Item Type: US · Parent: F41.2 · Module: core · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
