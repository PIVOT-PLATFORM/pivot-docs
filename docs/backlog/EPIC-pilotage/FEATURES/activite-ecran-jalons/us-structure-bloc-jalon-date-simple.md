# US18.19.5 — Structure des blocs jalons à date simple

**En tant que** chef de projet (pilote d'activité)
**Je veux** un bloc jalon simplifié (type + date de passage) pour les jalons sans sécurisation
**Afin de** saisir les jalons de comitologie et d'étape de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un bloc Revue DivNum, CT cadrage, CT conception, BIPSE, CATE, ARIS, AIPD, J3-Recette, J4-AQR, J5-Pré-PROD ou Jalon E, when il s'affiche, then il présente les champs « Type de jalon » et « Date de passage » | ⬜ |
| Given ce bloc non grisé, when j'agis dessus, then il propose les boutons « Supprimer » et « Modifier » | ⬜ |
| Given ce bloc grisé, when j'active « Modifier », then il se dégrise et autorise les modifications à la volée | ⬜ |
| Given des modifications, when je clique sur le bouton commun « Enregistrer », then elles sont enregistrées | ⬜ |
| Error : given une date de passage au format invalide, system refuse la saisie | ⬜ |
| Security/Gouvernance : les actions du bloc restent soumises aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Ces jalons n'ont pas de bouton « Valider » ni de copie de référence planning/budget.

## Notes d'implémentation
- Blocs à date simple (module pilotage, onglet Jalon) : Type, Date de passage, boutons Supprimer/Modifier ; enregistrement via le bouton commun de l'écran.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
