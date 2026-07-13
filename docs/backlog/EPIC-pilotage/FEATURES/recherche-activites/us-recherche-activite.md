# US18.14.2 — Recherche d'une activité

**En tant que** utilisateur final
**Je veux** rechercher une activité via une barre de recherche et des filtres combinables
**Afin de** retrouver précisément l'activité recherchée dans l'ensemble du tableau

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran de recherche, when je saisis du texte dans la barre de recherche, then la recherche porte sur l'intégralité du tableau | ⬜ |
| Given les filtres disponibles, when je les combine, then ce sont les mêmes filtres que l'écran Portefeuille et ils sont combinables entre eux | ⬜ |
| Given une recherche et des filtres, when je navigue puis reviens, then le contenu de la barre de recherche est conservé alors que les filtres sont réinitialisés | ⬜ |
| Given au moins un caractère saisi, when la barre contient du texte, then un bouton d'effacement est affiché | ⬜ |
| Error : given une recherche sans résultat, system affiche un tableau vide sans erreur | ⬜ |
| Security/Gouvernance : seul un utilisateur habilité peut rechercher une activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La réactualisation de la liste (US dédiée).

## Notes d'implémentation
- Module pilotage (OPDN), barre de recherche sur l'intégralité du tableau + filtres identiques à Portefeuille.
- Barre conservée à la navigation, filtres réinitialisés ; bouton d'effacement conditionné à un caractère.

---
Item Type: US · Parent: F18.14 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.10 Recherche d'activités
Dépendances: —
