# US21.5.1 — Consolidation de portefeuille

**En tant que** PMO, Sponsor
**Je veux** une heat map consolidée des risques agrégés par famille et par entité sur l'ensemble des projets du portefeuille
**Afin de** piloter les risques à l'échelle du portefeuille et arbitrer les priorités entre projets

## Contexte

Heat map multi-projets et agrégation des risques par famille et par entité.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un ensemble de projets scorés (P × G, US21.2.1) rattachés à un portefeuille, when le PMO ouvre la vue de consolidation, then une heat map affiche l'agrégation des risques par famille (taxonomie 12 familles, US21.1.3) et par entité, avec le nombre et la criticité des risques par cellule | ⬜ |
| Given une cellule de la heat map, when le PMO clique dessus, then la liste des risques concernés s'affiche avec un lien vers chaque risque et son projet d'origine | ⬜ |
| Error : given un portefeuille sans aucun projet scoré, system affiche une heat map vide avec un message explicite plutôt qu'une grille vide non expliquée ou une erreur | ⬜ |
| Security : la heat map n'agrège que les projets du portefeuille auxquels le PMO/Sponsor a un accès explicite ; aucun risque d'un projet hors périmètre d'habilitation n'apparaît, même agrégé | ⬜ |
| A11y : la criticité des cellules n'est pas portée uniquement par la couleur (texte ou motif complémentaire), la heat map est navigable au clavier et chaque cellule cliquable est exposée à l'aide technique avec un libellé explicite (WCAG 2.1 AA 1.4.1, 2.1.1) | ⬜ |

## Hors périmètre
- Le calcul du score P × G par risque, produit par US21.2.1 — cette US ne fait qu'agréger des scores déjà calculés.
- La détection de concentrations transverses (même fournisseur, échéance commune) — couverte par US21.5.2 (Risques systémiques).
- La courbe d'évolution du niveau de risque dans le temps — couverte par US21.5.5 (Tendance et historique).
- La définition du périmètre d'un portefeuille (quels projets le composent) — supposée déjà portée par le domaine Pilotage (E18).

## Notes d'implémentation
- Dépend de US21.2.1 pour la donnée de score P × G par risque ; l'agrégation se fait côté `pivot-risk-core` sans FK vers le schéma `pilotage` (corrélation par `project_ref`, cf. ADR-006).
- La notion de « portefeuille » ici correspond à un regroupement de projets par `project_ref` — le module risk ne porte pas la structure du portefeuille elle-même, il la consomme via le bus.
- Vue destinée au rôle PMO/Sponsor (cf. US21.8.2 Vue sponsor/COMEX) : penser la donnée agrégée comme réutilisable par cette vue plutôt que dupliquer la logique.

---
Item Type: US · Parent: F21.5 · Module: risk · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Dépendances: US21.2.1
