# US21.10.7 — Fiche de contribution d'un facteur aux risques

**En tant que** Chef de projet appliquant la méthode DIT
**Je veux** une fiche détail par Facteur de Risque montrant son effet sur chaque risque macro
**Afin de** comprendre la contribution précise d'un facteur à l'exposition globale

## Contexte

Hérité de SANDRA (US-18). Pour un FR donné, la fiche décompose sa contribution `criticité FR ×
impact FR→risque` pour chacun des risques macro, expliquant sa part dans le niveau agrégé calculé
par US21.10.5.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un FR coté avec des impacts saisis, when le chef de projet ouvre sa fiche de contribution, then chaque risque macro affiche la contribution `criticité FR × impact FR→risque` de ce facteur | ⬜ |
| Given la fiche d'un FR, when elle est consultée, then elle rappelle la criticité 1–6 du FR, ses impacts par risque, et la somme de ses contributions | ⬜ |
| Given un FR sans impact sur un risque donné, when la fiche est affichée, then la contribution correspondante vaut 0 et est présentée comme telle (pas d'omission silencieuse) | ⬜ |
| Error : given un FR sans cotation exploitable, when sa fiche est demandée, then la fiche s'affiche en signalant l'absence de criticité, sans erreur bloquante ni contribution erronée | ⬜ |
| Security : la fiche est en lecture seule et respecte l'isolation par tenant (cross-tenant → 404) ; aucune contribution n'y est éditable | ⬜ |
| A11y : les contributions sont restituées en tableau lisible au lecteur d'écran, en complément de toute représentation graphique (WCAG 2.1 AA 1.3.1) | ⬜ |

## Hors périmètre
- Le calcul du niveau agrégé par risque (somme sur tous les FR) est traité par US21.10.5 ; cette US isole la contribution d'un seul FR.
- Les radars et matrices d'ensemble relèvent de US21.10.5 et des restitutions F21.8.

## Notes d'implémentation
- Vue dérivée : réutilise les données de cotation (US21.10.3) et d'impacts (US21.10.4) sans
  stockage propre ; la fiche est une projection par FR de la même formule que US21.10.5.

---
Item Type: US · Parent: F21.10 · Module: risk · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Dépendances: US21.10.5
