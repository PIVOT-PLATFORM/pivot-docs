# US21.10.2 — Classification EFQM & 5M d'un facteur

**En tant que** Contributeur risque
**Je veux** classer chaque Facteur de Risque selon les critères EFQM et la grille 5M (Ishikawa)
**Afin de** analyser et consolider les facteurs par axe de causes au niveau programme

## Contexte

Hérité de SANDRA (US-05 volet EFQM/5M, alimente US-23 et US-25). La classification par famille est
déjà couverte par la taxonomie 12 familles (US21.1.3) ; cette US ajoute les deux **axes de
classification supplémentaires** propres à la méthode DIT : EFQM (9 critères) et 5M (5 catégories),
et leur exploitation statistique.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un Facteur de Risque, when le contributeur le classe, then il peut sélectionner un critère EFQM (parmi 9) et une catégorie 5M (parmi 5 : Milieu, Main d'œuvre, Matériel, Matière, Méthodes) via des listes fermées | ⬜ |
| Given des FR classés, when un responsable programme consulte les statistiques, then les FR sont agrégés par critère EFQM, par catégorie 5M et par famille (nombre et exposition cumulée) | ⬜ |
| Given les référentiels EFQM (9) et 5M (5), when un rôle habilité les consulte, then leurs libellés sont servis comme axes de réflexion réutilisables (aide à l'identification, SANDRA US-25) | ⬜ |
| Error : given une valeur EFQM ou 5M hors référentiel, when elle est enregistrée sur un FR, then la saisie est rejetée (400) sans altérer la classification existante | ⬜ |
| Security : la modification des libellés des référentiels EFQM/5M est réservée à un rôle habilité (PMO/admin) ; un contributeur peut classer un FR mais pas altérer les référentiels ; isolation tenant respectée | ⬜ |
| A11y : les statistiques par axe sont restituées sous forme tabulaire lisible au lecteur d'écran, en complément de toute visualisation graphique (WCAG 2.1 AA 1.3.1) | ⬜ |

## Hors périmètre
- La famille de FR (taxonomie 12 familles) est portée par US21.1.3 ; cette US ne recrée pas l'axe famille, elle s'y adosse.
- La restitution graphique de consolidation programme relève de F21.5 (US21.5.1) et des restitutions F21.8.
- La saisie du FR lui-même est traitée par US21.10.1.

## Notes d'implémentation
- Référentiels EFQM (9 critères) et 5M (5 catégories) externalisés en **données de configuration**
  paramétrables (cf. EN21 référentiels), pas en dur — remplace les listes déroulantes figées du
  classeur SANDRA.
- Les axes EFQM/5M sont des attributs du `RiskFactor` (US21.10.1) ; leur agrégation réutilise le
  moteur de consolidation portefeuille (US21.5.1) plutôt qu'un calcul dédié.

---
Item Type: US · Parent: F21.10 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: macro:gestion-projet-portefeuille
Dépendances: US21.10.1 · US21.1.3 · US21.5.1
