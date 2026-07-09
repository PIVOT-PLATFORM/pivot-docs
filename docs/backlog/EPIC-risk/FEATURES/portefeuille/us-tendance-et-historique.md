# US21.5.5 — Tendance et historique

**En tant que** Sponsor, PMO
**Je veux** visualiser une courbe d'évolution du niveau de risque par projet et par portefeuille dans le temps
**Afin de** suivre la trajectoire du risque et détecter une dégradation ou une amélioration avant la revue suivante

## Contexte

Courbe d'évolution du niveau de risque par projet et portefeuille.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet dont les risques ont été scorés (US21.2.1) à plusieurs dates (ex. lors de revues successives), when le Sponsor/PMO ouvre la vue tendance, then une courbe affiche le niveau de risque agrégé du projet à chaque point de mesure dans le temps | ⬜ |
| Given un portefeuille de projets, when le Sponsor/PMO bascule la vue tendance en mode portefeuille, then la courbe agrège le niveau de risque de tous les projets du portefeuille (données de US21.5.1) sur la même échelle de temps | ⬜ |
| Error : given un projet ou portefeuille avec un seul point de mesure (pas d'historique), system affiche ce point unique avec un message indiquant l'absence d'historique suffisant pour une tendance, plutôt qu'une courbe trompeuse ou une erreur | ⬜ |
| Security : la courbe portefeuille n'agrège que les projets auxquels le Sponsor/PMO consultant a un accès explicite, cohérent avec les habilitations appliquées à la consolidation de portefeuille (US21.5.1) | ⬜ |
| A11y : la courbe est doublée d'une table de données textuelle équivalente (valeurs par date), consultable au clavier et par lecteur d'écran, sans dépendre uniquement du rendu graphique (WCAG 2.1 AA 1.1.1) | ⬜ |

## Hors périmètre
- Le calcul du score de risque à un instant T — produit par US21.2.1, cette US ne fait qu'historiser et représenter son évolution.
- L'agrégation par famille/entité en heat map à un instant donné — couverte par US21.5.1 (Consolidation de portefeuille), dont cette US réutilise la donnée agrégée pour construire l'axe temporel.
- La détection automatique d'une dégradation (alerte sur tendance) — non couverte ici, simple restitution visuelle sans mécanisme d'alerte associé.
- L'export de la courbe dans un rapport formel — couvert par US21.8.5 (Export et rapport de risques).

## Notes d'implémentation
- Nécessite la conservation d'un historique des scores (snapshot périodique ou à chaque revue de risques, cf. US21.3.5) — un point de mesure par date de revue, pas un recalcul continu.
- Dépend de US21.5.1 pour la donnée agrégée en mode portefeuille ; en mode projet, s'appuie directement sur l'historique de scoring du projet (US21.2.1).
- Le pas de temps et la rétention de l'historique (durée de conservation des points) sont à préciser au raffinement technique selon le volume attendu de revues par projet.

---
Item Type: US · Parent: F21.5 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US21.5.1
