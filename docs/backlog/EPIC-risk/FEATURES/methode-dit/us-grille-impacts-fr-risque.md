# US21.10.4 — Grille d'impacts Facteur × Risque

**En tant que** Contributeur risque appliquant la méthode DIT
**Je veux** indiquer, pour chaque Facteur de Risque, son impact sur chacun des risques macro
**Afin de** relier les facteurs aux risques qu'ils alimentent

## Contexte

Hérité de SANDRA (US-10). La méthode DIT établit une **matrice bipartite** FR × Risque : chaque
cellule porte l'intensité de l'impact d'un facteur sur un risque, saisie en Fort / Moyen / Faible
(raccourcis) ou en valeur numérique 0–1. Cette grille est la donnée d'entrée du calcul du niveau
des risques (US21.10.5).

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un FR et le référentiel de risques macro du projet, when le contributeur saisit un impact, then il peut choisir Fort / Moyen / Faible (correspondance Fort = 0,8 · Moyen = 0,5 · Faible = 0,2) ou saisir une valeur libre entre 0 et 1 | ⬜ |
| Given la grille d'impacts, when le contributeur l'ouvre, then elle présente les FR actifs en lignes et les risques macro en colonnes, chaque cellule étant éditable ou vide (absence d'impact = 0) | ⬜ |
| Given un FR clôturé (US21.3.1), when la grille est affichée, then sa ligne d'impacts est automatiquement vidée et exclue du calcul | ⬜ |
| Error : given une valeur d'impact hors intervalle 0–1 (ou hors {Fort, Moyen, Faible}), when elle est enregistrée, then la cellule est rejetée (400) sans modifier la grille | ⬜ |
| Security : seul un contributeur habilité du projet peut éditer la grille d'impacts ; l'accès est isolé par tenant (référence cross-tenant → 404) | ⬜ |
| A11y : la grille est navigable au clavier et chaque cellule expose en texte le FR (ligne) et le risque (colonne) concernés pour le lecteur d'écran (WCAG 2.1 AA 1.3.1) | ⬜ |

## Hors périmètre
- Le calcul du niveau agrégé de chaque risque à partir de cette grille est traité par US21.10.5.
- La cotation en criticité 1–6 du FR est traitée par US21.10.3.
- La définition des risques macro et des FR est traitée par US21.10.1.

## Notes d'implémentation
- Introduit l'entité `FactorImpact` (FR × Risque → valeur 0–1) portée par le schéma étendu de
  EN21.1 (US21.10.1) ; la correspondance Fort/Moyen/Faible → 0,8/0,5/0,2 est un référentiel
  paramétrable, pas une constante en dur.
- Le vidage automatique des lignes de FR clôturés remplace la logique VBA équivalente de SANDRA
  (sans caractères de balise).

---
Item Type: US · Parent: F21.10 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: macro:gestion-projet-portefeuille
Dépendances: US21.10.1 · US21.3.1
