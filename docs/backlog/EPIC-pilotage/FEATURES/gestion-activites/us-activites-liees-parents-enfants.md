# US18.1.6 — Visualiser les activités liées Parents / Enfants

**En tant que** chef de projet (pilote d'activité)
**Je veux** voir les activités liées séparées en Enfants et Parents, avec un indicateur quand aucune n'est ajoutée
**Afin de** comprendre les rattachements de mon activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des activités liées, when je consulte la section des liens, then elles sont présentées séparément en deux groupes : Enfants et Parents | ⬜ |
| Given aucun lien dans un groupe, when je consulte ce groupe, then un indicateur signale explicitement qu'aucune activité n'est ajoutée | ⬜ |
| Error : given un groupe sans activité liée, system affiche l'indicateur « aucune » sans provoquer d'erreur ni de liste vide ambiguë | ⬜ |
| Security/Gouvernance : la visualisation des liens respecte les habilitations d'accès aux activités liées | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La création/suppression des liens Parents/Enfants n'est pas détaillée dans cette US (visualisation).

## Notes d'implémentation
- Section des activités liées de l'écran activité (module pilotage), deux groupes distincts Enfants / Parents.
- Indicateur d'état vide par groupe.

---
Item Type: US · Parent: F18.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-106
Dépendances: —
