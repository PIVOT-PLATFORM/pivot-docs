# US16.2.2 — Page d'accueil : section modules à venir

**En tant que** utilisateur
**Je veux** voir sur la page d'accueil une section des modules pas encore activés ou en développement
**Afin de** découvrir les fonctionnalités à venir et donner de l'appétit sur le produit

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Section "À venir" visible sur /home sous la grille des modules actifs | ✅ |
| Affiche les modules désactivés ou phase-3 avec label "Bientôt disponible" | 🟡 |
| Pas de lien cliquable vers les modules à venir | 🟡 |
| Responsive sur mobile | 🟡 |

> 🟡 = comportement livré et vérifiable dans le diff, mais sans assertion Vitest dédiée (pas de
> test explicite), ou avec un écart de libellé — voir *Écarts vs plan initial* dans la spec figée.
> Badge visible réellement rendu : `"À VENIR"` (test `renders coming-soon cards with badge`), le
> texte "bientôt disponible" n'existe que dans l'`aria-label`, pas dans le libellé visible attendu
> par l'AC.

---
**Statut réel vérifié (2026-07-06) :** implémenté et mergé sur `pivot-ui` main (PR #47,
`HomeComponent` — grille modules, cartes "coming-soon", registre de modules). Les 4 AC sont
couvertes. Repassé de `In progress` à `Review` — `Stage: Done` reste au mainteneur (recette).

---
Item Type: US · Parent: F16.2 · Module: core · Phase: Socle · Size: S · Priority: Low
Stage: Done
Gate 5 : `pivot-ui` PR [#47](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/47) (Gate 4 = 98/100,
même PR que US16.2.1), spec figée
`docs/specs/EPIC-shell-ux/us16-2-2-modules-a-venir.md` (rétroactif, 2026-07-08)
