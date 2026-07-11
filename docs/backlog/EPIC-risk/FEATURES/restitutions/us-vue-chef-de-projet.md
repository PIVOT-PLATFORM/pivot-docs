# US21.8.1 — Vue chef de projet

**En tant que** Chef de projet
**Je veux** une vue dédiée consolidant la matrice de risques de mon projet, le top risques, les plans d'action en cours et leurs échéances
**Afin de** piloter au quotidien les risques de mon projet sans naviguer entre plusieurs écrans

## Contexte

Matrice, top risques, plan d'action, échéances.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet dont le Chef de projet est responsable et qui compte des risques scorés, when il ouvre la vue chef de projet, then la matrice P × G du projet (US21.2.4), le top risques, la liste des plans d'action ouverts (US21.3.3) avec leurs échéances sont affichés sur un seul écran | ⬜ |
| Given un plan d'action dont l'échéance est dépassée, when la vue chef de projet est affichée, then ce plan d'action est mis en évidence comme en retard | ⬜ |
| Error : given un projet sans aucun risque qualifié, system affiche la vue avec un état vide explicite par section (matrice, top risques, plans d'action) plutôt qu'une erreur | ⬜ |
| Security : la vue n'affiche que les risques et plans d'action des projets dont l'utilisateur connecté est Chef de projet ou membre autorisé (pas d'agrégation de données d'un autre projet) | ⬜ |
| A11y : les sections de la vue (matrice, top risques, échéances) sont structurées par des titres hiérarchiques identifiables au lecteur d'écran, et les échéances en retard ne reposent pas uniquement sur la couleur (texte ou icône complémentaire) (WCAG 2.1 AA 1.3.1 et 1.4.1) | ⬜ |

## Hors périmètre
- Le calcul de la matrice P × G et son interaction propre — couverts par US21.2.4 ; cette US ne fait qu'agréger le composant dans la vue.
- La gestion (création/édition) des plans d'action — couverte par US21.3.3 ; cette vue est en lecture avec liens vers l'édition.
- L'export de cette vue en document formel — couvert par US21.8.5 (Export et rapport de risques).
- Les vues destinées aux autres rôles (Sponsor, Scrum Master, Contract Manager) — couvertes respectivement par US21.8.2, US21.8.3, US21.8.4.

## Notes d'implémentation
- Vue composite qui assemble des composants déjà spécifiés ailleurs (matrice US21.2.4, stratégies de traitement US21.3.2, plan d'action US21.3.3) : cette US porte l'agrégation et la mise en page, pas la logique métier sous-jacente.
- Le filtrage par projet doit s'appuyer sur le `project_ref` déjà utilisé pour corréler risques et projet (cf. ADR-006, US21.9.1) afin de garantir l'isolation par projet dès la requête serveur, pas seulement en affichage.
- Le tri des échéances en retard peut réutiliser la logique de statut de cycle de vie du risque (US21.3.1) et du plan d'action (US21.3.3) pour identifier les items à mettre en évidence.

---
Item Type: US · Parent: F21.8 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Dépendances: US21.2.4, US21.3.2
