# US27.3.3 — Carte d'alignement & dépendances inter-équipes

**En tant que** PMO
**Je veux** visualiser une **carte d'alignement** (qui contribue à quoi) et les **dépendances inter-équipes** entre OKR
**Afin de** repérer les OKR orphelins, les surcharges et les dépendances à risque

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'ensemble des OKR d'un cycle, when j'ouvre la carte, then l'arbre / graphe d'alignement s'affiche avec avancement et confiance | ⬜ |
| Given un OKR orphelin (non aligné) ou une dépendance inter-équipes, when elle existe, then elle est mise en évidence | ⬜ |
| Error : given un cycle sans aucun OKR (ou inexistant), when j'ouvre la carte, then un état vide explicite est affiché plutôt qu'une erreur ou un graphe cassé | ⬜ |
| Security : given un PMO, when il consulte la carte, then seuls les OKR visibles dans son tenant/périmètre sont représentés, et les OKR individuels confidentiels apparaissent agrégés ou masqués (cf. US27.10.2) | ⬜ |
| A11y : la carte graphique est doublée d'une vue tabulaire équivalente (liste des liens d'alignement et dépendances) accessible au clavier et aux lecteurs d'écran | ⬜ |

## Hors périmètre
- La création ou modification des liens d'alignement (cf. US27.3.1) et de la déclinaison organisationnelle (cf. US27.3.2) — cette US est en lecture seule (restitution)
- Le calcul du statut/tendance ON_TRACK/AT_RISK/OFF_TRACK affiché sur la carte (cf. F27.4, calculé en amont)
- L'export de la carte en rapport de comité (cf. US27.9.2)

## Notes d'implémentation
- Vue de restitution s'appuyant sur les entités `Alignment` et `Initiative` (dépendances delivery, EN27.1) — pas de nouvelle donnée métier, uniquement agrégation/rendu.
- La détection des OKR « orphelins » consiste à identifier les `Objective` sans `Alignment` parent ni enfant sur le cycle sélectionné.
- Les dépendances inter-équipes se déduisent des `Initiative`/contributions croisant plusieurs `teams.id` — respecter le découplage FK inter-modules (ADR-008).

---
Item Type: US · Parent: F27.3 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: officier-responsable-pmo
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
