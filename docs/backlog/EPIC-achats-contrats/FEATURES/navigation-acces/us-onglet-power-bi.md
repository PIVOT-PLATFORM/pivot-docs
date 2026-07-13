# US25.1.7 — Onglet « Power BI »

**En tant que** responsable des marchés (vérificateur/valideur) ou contract manager
**Je veux** accéder à l'onglet « Power BI » redirigeant vers le PBI de WRAP
**Afin de** consulter les tableaux de bord décisionnels

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un manager (gestionnaire de contrat hors externe, valideur/vérificateur hors externe) ou un administrateur, when il consulte le bandeau de menu, then l'onglet « Power BI » est visible | ⬜ |
| Given l'onglet « Power BI », when l'utilisateur habilité clique dessus, then il est redirigé vers le PBI de WRAP | ⬜ |
| Given le code AD de l'utilisateur (DIGIT ou DIVNUM), when la redirection est déclenchée, then le lien PBI correspondant à son entité (2 liens distincts) est ouvert | ⬜ |
| Error : given un utilisateur externe ou un prescripteur, when il consulte le bandeau de menu, then l'onglet « Power BI » n'est pas affiché | ⬜ |
| Security/Gouvernance : onglet réservé aux managers et CM hors externes et à l'administrateur — le prescripteur n'y a pas accès (P=NON) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contenu et la conception des rapports Power BI (hors application WRAP/OPDN).

## Notes d'implémentation
- Visibilité restreinte aux managers/CM hors externe et à l'administrateur ; prescripteur exclu.
- Distinction DIGIT/DIVNUM : deux liens PBI sélectionnés selon le code AD.

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.1 Navigation générale & accès
Dépendances: —
