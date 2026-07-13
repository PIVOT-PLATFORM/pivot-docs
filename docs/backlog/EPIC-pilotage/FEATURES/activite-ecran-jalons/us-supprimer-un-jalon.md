# US18.19.12 — Supprimer un jalon

**En tant que** chef de projet (pilote d'activité)
**Je veux** supprimer un jalon après confirmation
**Afin de** retirer un jalon inutile de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given n'importe quel jalon de l'écran, when je le supprime, then la suppression est possible (tous les jalons sont supprimables) | ⬜ |
| Given un jalon validé, when je le supprime, then les enregistrements associés à la validation sont conservés | ⬜ |
| Given une suppression confirmée, when je confirme, then le jalon est supprimé immédiatement sans exiger le bouton « Enregistrer » global | ⬜ |
| Error : given une demande de suppression, when l'utilisateur n'a pas confirmé, then system ne supprime pas le jalon | ⬜ |
| Security/Gouvernance : la suppression d'un jalon reste soumise aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La restitution des références planning/budget d'un jalon validé supprimé n'est pas couverte par cette US.

## Notes d'implémentation
- Suppression d'un jalon (module pilotage, onglet Jalon) : tous supprimables, suppression immédiate après confirmation (indépendante du bouton « Enregistrer » global) ; les enregistrements de validation d'un jalon validé sont conservés.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
