# US35.1.1 — Droits par rôle et périmètre

**En tant que** DSI
**Je veux** définir des rôles fins (élus, direction, PMO, MOA, MOE, métiers, externes) avec des périmètres de visibilité
**Afin de** garantir que chaque profil n'accède qu'aux données autorisées

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un rôle, when un utilisateur y est rattaché, then il n'accède qu'aux données de son périmètre de visibilité | ⬜ |
| Les rôles couvrent élus, direction, PMO, MOA, MOE, métiers et externes | ⬜ |
| Error : given une tentative d'accès hors périmètre, system refuse et journalise | ⬜ |
| Security/Gouvernance : les attributions de rôles et périmètres sont tracées (traçabilité des droits) | ⬜ |

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: Backlog
Source: PP-010 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: Tous
Justification: Dossier §4
Dépendances: —
