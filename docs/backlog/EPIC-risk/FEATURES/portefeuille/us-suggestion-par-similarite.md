# US21.5.4 — Suggestion par similarité

**En tant que** Chef de projet
**Je veux** recevoir, au cadrage d'un nouveau projet, des suggestions de risques issus de projets similaires déjà clôturés
**Afin de** anticiper les risques que des projets comparables ont déjà rencontrés

## Contexte

Proposer « les projets comme le vôtre ont rencontré ces risques ».

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un nouveau projet avec un profil de cadrage renseigné (typologie, secteur, taille), when le chef de projet consulte les risques suggérés, then la liste inclut les risques de la bibliothèque vivante (US21.5.3) issus de projets de typologie similaire, triés par fréquence d'occurrence et criticité historique | ⬜ |
| Given une suggestion de risque par similarité, when le chef de projet consulte son détail, then il voit le nombre de projets similaires concernés et l'efficacité historique des actions de traitement associées | ⬜ |
| Error : given un nouveau projet dont la typologie ne correspond à aucun projet clôturé dans la bibliothèque, system affiche un état vide explicite (« pas d'historique similaire disponible ») plutôt qu'une liste vide non expliquée ou des suggestions non pertinentes | ⬜ |
| Security : les suggestions n'exposent aucune donnée identifiante des projets d'origine (conformément à l'anonymisation appliquée en US21.5.3) — seuls le risque, sa famille et son efficacité de traitement sont visibles, jamais le nom du projet ou du client source | ⬜ |

## Hors périmètre
- L'alimentation de la bibliothèque vivante à la clôture d'un projet — pré-requis fourni par US21.5.3.
- La proposition initiale de risques types au cadrage à partir du catalogue par typologie — couverte par US21.1.5 (Bibliothèque de risques pré-suggérés), dont cette US est le prolongement basé sur l'historique réel plutôt que sur un catalogue statique.
- Le calcul de similarité par IA/scoring avancé (ex. embeddings) — cette US se limite à un rapprochement par critères de cadrage (typologie, secteur, taille) ; un rapprochement plus fin relèverait de F21.7 (IA gouvernée), hors périmètre ici.

## Notes d'implémentation
- Dépend directement de US21.5.3 : sans bibliothèque vivante alimentée par le REX, aucune suggestion par similarité n'est possible (US bloquée fonctionnellement tant que la bibliothèque est vide).
- Le rapprochement de similarité est basé sur les attributs du profil de cadrage (US21.1.1) déjà existants — pas de nouveau modèle de données à créer pour la similarité elle-même.
- Le tri par « criticité historique » réutilise les scores P × G (US21.2.1) conservés au moment de la capitalisation REX.

---
Item Type: US · Parent: F21.5 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US21.5.3
