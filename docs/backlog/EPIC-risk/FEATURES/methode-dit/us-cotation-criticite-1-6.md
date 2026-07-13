# US21.10.3 — Cotation en criticité 1–6 (table DIT)

**En tant que** Contributeur risque appliquant la méthode DIT
**Je veux** coter chaque Facteur de Risque par probabilité d'apparition et gravité si apparition
**Afin d'** obtenir automatiquement sa criticité 1–6 selon le barème DIT

## Contexte

Hérité de SANDRA (US-07, EN-02). Le score P × G paramétrable est déjà porté par US21.2.1 ; cette US
ajoute le **barème DIT** comme variante de profil : probabilité à **5 niveaux** × gravité à **4
niveaux**, projetées par une **table de correspondance** vers une criticité **1 à 6** (et non le
produit brut 1–25). Le barème est un service configurable, pas une formule figée.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un FR sur un projet en profil DIT, when le contributeur saisit une probabilité (5 niveaux) et une gravité (4 niveaux), then la criticité (1–6) est calculée automatiquement par correspondance dans la table DIT et affichée sur la fiche du FR | ⬜ |
| Given la table de correspondance DIT (probabilité × gravité → 1–6), when un rôle habilité la consulte, then elle est servie depuis la configuration (barème modifiable sans recompilation) et produit des résultats identiques à la table Excel de référence sur un jeu de test | ⬜ |
| Given un FR coté, when le contributeur ouvre l'aide à la cotation, then une matrice de criticité vierge (probabilité × gravité) est consultable comme guide | ⬜ |
| Error : given une probabilité ou une gravité hors des niveaux du référentiel, when la cotation est enregistrée, then elle est rejetée (400) sans écrire de criticité | ⬜ |
| Security : seul un rôle habilité (PMO/admin) peut modifier la table de correspondance DIT ; un contributeur cote un FR mais ne peut pas altérer le barème ni écrire directement la criticité dérivée | ⬜ |
| A11y : le cran de criticité est doublé d'un libellé textuel (ex. « Critique », « Élevé ») et non porté par la seule couleur (WCAG 2.1 AA 1.4.1) | ⬜ |

## Hors périmètre
- Le barème direct P × G → 1–25 (US21.2.1) reste la cotation par défaut hors profil DIT ; cette US ne le remplace pas.
- Le suivi de la maîtrise du FR relève de US21.3.2 (traitement 4 T).
- Le positionnement dans la matrice de criticité visuelle est traité par US21.2.4.
- L'agrégation de la criticité vers le niveau des risques est traitée par US21.10.5.

## Notes d'implémentation
- La criticité 1–6 est **dérivée** (probabilité, gravité) via la table de correspondance : elle
  n'est jamais stockée comme champ libre indépendant, pour garantir l'intégrité du calcul.
- Externalise la table SANDRA (onglet *Criticité*) en configuration ; parité de résultats attendue
  sur un jeu de test issu d'un classeur réel (cf. EN21.5, jeu de réconciliation).
- La cotation est historisée par période (US21.5.5) : la criticité est portée par le couple
  (FR, période).

---
Item Type: US · Parent: F21.10 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: macro:gestion-projet-portefeuille
Dépendances: US21.10.1 · US21.2.1 · US21.5.5
