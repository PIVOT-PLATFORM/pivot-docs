# US18.9.3 — Suivre le financier de l'activité

**En tant que** contrôleur de gestion SI (responsable budgétaire)
**Je veux** suivre les indicateurs financiers d'une activité (en-cours, REx, PDS, PMT, type et financeurs)
**Afin de** piloter le budget et rendre compte de l'engagement financier

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran de suivi financier d'une activité, when je le consulte, then les indicateurs en-cours, REx, PDS, PMT, type et financeurs sont affichés | ⬜ |
| Given les financeurs d'une activité, when je consulte le suivi financier, then la répartition par financeur et le type de financement sont lisibles | ⬜ |
| Error : given un indicateur financier non calculable (donnée source manquante), system affiche une valeur neutre explicite (ex. « — ») plutôt qu'une valeur erronée | ⬜ |
| Security/Gouvernance : seul le contrôleur de gestion SI habilité sur le périmètre peut consulter le suivi financier de l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La saisie et le calcul détaillés des lignes budgétaires relèvent des écrans budget de l'activité.
- Les instantanés budgétaires (photos financières) sont couverts par l'US dédiée.

## Notes d'implémentation
- Écran de suivi financier de l'activité (module pilotage) : indicateurs en-cours, REx, PDS, PMT, type et financeurs.

---
Item Type: US · Parent: F18.9 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: Backlog OPPA (reconstitution v1–v2.1) — US-903
Dépendances: —
