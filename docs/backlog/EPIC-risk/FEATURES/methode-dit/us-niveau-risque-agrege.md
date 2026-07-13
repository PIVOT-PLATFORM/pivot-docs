# US21.10.5 — Niveau de risque agrégé = Σ(criticité × impact)

**En tant que** Chef de projet appliquant la méthode DIT
**Je veux** que le niveau de chaque risque macro soit calculé automatiquement à partir des FR
**Afin de** mesurer l'exposition globale du projet et la comparer dans le temps

## Contexte

Hérité de SANDRA (US-11, US-16, EN-03, EN-08). C'est le calcul central de la méthode DIT :
`Niveau(risque) = Σ sur les FR de (criticité FR × impact FR→risque)`. Le résultat est restitué en
**radar des risques**, avec la période précédente en pointillé pour la comparaison.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des FR cotés (US21.10.3) et une grille d'impacts (US21.10.4), when le chef de projet consulte le niveau des risques, then chaque risque macro affiche `Σ(criticité FR × impact FR→risque)` recalculé automatiquement | ⬜ |
| Given un FR clôturé ou un impact vide, when le niveau est calculé, then ce FR (ou cette cellule) est exclu de la somme, en parité avec l'onglet « Calcul du Niveau des Risques » de SANDRA sur un jeu de test | ⬜ |
| Given un niveau des risques calculé sur au moins deux périodes, when le chef de projet ouvre le radar, then le niveau de la période courante et celui de la période précédente (en pointillé) sont superposés | ⬜ |
| Error : given une donnée de cotation ou d'impact manquante pour un FR contribuant, when le niveau est demandé, then le calcul aboutit en traitant l'absence comme 0 (jamais d'erreur bloquante) et signale les FR incomplets | ⬜ |
| Security : le niveau des risques est une donnée dérivée en lecture seule — aucun rôle ne peut l'éditer directement ; sa consultation respecte l'isolation par tenant (cross-tenant → 404) | ⬜ |
| A11y : le radar est doublé d'une restitution tabulaire (risque → niveau courant / précédent) perceptible sans la seule couleur ni la seule forme graphique (WCAG 2.1 AA 1.1.1) | ⬜ |

## Hors périmètre
- La contribution détaillée d'un FR isolé à chaque risque (fiche détail) est traitée par US21.10.7.
- L'extraction des FR critiques (règle de seuil) est traitée par US21.10.6.
- L'historisation des périodes et les courbes d'évolution sont portées par US21.5.5.
- La cotation (US21.10.3) et la grille d'impacts (US21.10.4) sont des dépendances, pas le périmètre de cette US.

## Notes d'implémentation
- Moteur de calcul **externalisé et testable** (remplace formules inter-onglets + VBA de SANDRA) ;
  gestion explicite des FR clôturés et des impacts vides (contribution nulle).
- Le niveau est dérivé : recalculé à la volée (ou matérialisé avec invalidation) à chaque
  changement de cotation ou d'impact, jamais saisi.
- La série « période précédente » réutilise l'historisation US21.5.5 ; le radar réutilise la
  couche de visualisation des restitutions F21.8.

---
Item Type: US · Parent: F21.10 · Module: risk · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: chef-de-projet
Dépendances: US21.10.3 · US21.10.4 · US21.5.5
