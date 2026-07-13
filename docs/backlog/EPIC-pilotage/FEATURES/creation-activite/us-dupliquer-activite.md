# US18.15.9 — Dupliquer une activité

**En tant que** chef de projet
**Je veux** dupliquer une activité existante pour en repartir comme base
**Afin de** gagner du temps à la création d'activités similaires

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité existante, when je déclenche la duplication, then une nouvelle activité est créée à partir de ses données | ⬜ |
| Given une duplication, when la nouvelle activité est créée, then elle respecte la règle de nommage (nom unique par type) | ⬜ |
| Error : given une duplication en échec, system n'ajoute aucune activité et signale l'échec | ⬜ |
| Security/Gouvernance : seul un chef de projet peut dupliquer une activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'utilité de la fonction de duplication est signalée « à confirmer » dans la spec : le cadrage précis (périmètre des données dupliquées, déclencheur UI, comportement) reste à valider au Gate 1 avant implémentation.

## Notes d'implémentation
- Module pilotage (OPDN), fonction de duplication d'activité — cadrage à confirmer.
- La duplication doit respecter la règle de nommage à la création (unicité par type d'activité).

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
