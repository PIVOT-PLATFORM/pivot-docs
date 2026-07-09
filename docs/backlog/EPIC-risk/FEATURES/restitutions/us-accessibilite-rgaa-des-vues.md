# US21.8.6 — Accessibilité RGAA des vues

**En tant que** membre de l'équipe projet
**Je veux** que les vues et matrices de risques (chef de projet, sponsor/COMEX, Scrum Master, Contract Manager) soient conformes RGAA 4 / WCAG 2.1 AA
**Afin de** pouvoir consulter et agir sur les risques quel que soit mon mode d'interaction (clavier, lecteur d'écran, contraste réduit)

## Contexte

Vues et matrices conformes RGAA 4 / WCAG 2.1 AA. Cette US transverse consolide et vérifie l'accessibilité des composants de restitution livrés par F21.8 (US21.8.1 à US21.8.5) ; elle ne les réimplémente pas mais couvre les exigences A11y qui dépassent le composant individuel (navigation inter-vues, cohérence globale).

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'ensemble des vues de restitution (chef de projet, sponsor/COMEX, Scrum Master, Contract Manager) et la matrice de risques, when un audit RGAA 4 est exécuté sur ces écrans, then aucun critère RGAA de niveau bloquant (AA) n'est en échec, et le résultat de l'audit est documenté par écran | ⬜ |
| Given la matrice de risques ou toute vue codant une information par couleur (criticité, statut, retard), when l'utilisateur consulte l'écran sans perception des couleurs (simulation daltonisme ou niveaux de gris), then l'information reste compréhensible grâce à un texte, une icône ou un motif complémentaire (WCAG 2.1 AA 1.4.1) | ⬜ |
| Given n'importe laquelle des vues de restitution, when un utilisateur navigue et interagit exclusivement au clavier (tabulation, entrée, flèches sur la matrice), then toutes les actions (ouvrir un risque, filtrer, exporter, arbitrer) sont atteignables et l'ordre de tabulation est cohérent avec l'ordre visuel (WCAG 2.1 AA 2.1.1 et 2.4.3) | ⬜ |
| Given un utilisateur de lecteur d'écran, when il parcourt une vue de restitution, then les titres de section sont hiérarchisés (WCAG 1.3.1), chaque élément interactif (risque cliquable, bouton d'export, action d'arbitrage) porte un libellé explicite et non ambigu (WCAG 4.1.2), et les messages d'état (chargement, erreur, succès d'export) sont annoncés via une zone live ARIA (WCAG 4.1.3) | ⬜ |
| Error : given un composant de restitution ne respectant pas un critère RGAA bloquant lors de l'audit, system (processus de recette) bloque son passage en production tant que le défaut n'est pas corrigé ou dérogé formellement | ⬜ |
| Security : l'audit et ses résultats (y compris dérogations RGAA éventuelles) sont tracés et horodatés, sans exposer de donnée de risque réelle dans les rapports d'audit publiés (utilisation de données de test/anonymisées) | ⬜ |

## Hors périmètre
- L'implémentation initiale des vues elles-mêmes (structure HTML, composants) — portée par US21.8.1 à US21.8.5 ; cette US vérifie et complète leur conformité A11y, elle ne les construit pas de zéro.
- L'accessibilité des autres modules PIVOT hors périmètre risque (whiteboard, Scrum Poker, etc.) — hors champ de cette US.
- La déclaration d'accessibilité RGAA légale globale du produit (document de conformité au niveau site) — relève d'un enabler transverse plateforme, pas de cette US module.
- La correction de défauts d'accessibilité de niveau AAA — seul le niveau AA (RGAA 4 / WCAG 2.1 AA) est requis ici.

## Notes d'implémentation
- Composant matrice P × G (US21.2.4) : point d'attention particulier car il encode une information critique (criticité) principalement visuelle par défaut — nécessite une double lecture texte/icône dès la conception du composant partagé (`@pivot/design-system`).
- Les 4 vues par rôle (US21.8.1-US21.8.4) et l'export (US21.8.5) partagent des composants UI communs via `@pivot/ui-core` / `@pivot/design-system` : corriger un défaut d'accessibilité au niveau du composant partagé bénéficie à toutes les vues consommatrices, à privilégier plutôt que des correctifs par vue.
- L'audit RGAA doit couvrir a minima : navigation clavier complète, contraste des couleurs (y compris codes couleur de criticité), structure sémantique des titres, alternatives textuelles, annonces ARIA des changements d'état dynamiques (filtre, chargement, export).
- Dépend de US21.8.1 comme première vue livrée : l'audit et le référentiel de vérification A11y sont établis sur cette vue puis répliqués aux autres.

---
Item Type: US · Parent: F21.8 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: US21.8.1
