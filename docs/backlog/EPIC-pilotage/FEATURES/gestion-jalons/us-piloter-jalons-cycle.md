# US18.3.1 — Piloter les jalons du cycle (J4–J7, PMPG)

**En tant que** chef de projet (pilote d'activité)
**Je veux** suivre les jalons PMPG et J4 à J7
**Afin de** piloter l'avancement de l'activité sur son cycle de vie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la vue jalons, when je la consulte, then je peux suivre les jalons PMPG et J4 à J7 | ⬜ |
| Given un jalon du cycle, when je le renseigne, then son état d'avancement est mis à jour dans la vue jalons | ⬜ |
| Error : given un jalon obligatoire non renseigné, system signale le jalon manquant sans bloquer la consultation des autres | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut piloter les jalons | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les règles de validation détaillées de chaque jalon sont couvertes par les US dédiées (J6, J7, CEN, validation).

## Notes d'implémentation
- Écran jalons de l'activité (module pilotage) : PMPG, J4, J5, J6, J7.

---
Item Type: US · Parent: F18.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-301
Dépendances: —
