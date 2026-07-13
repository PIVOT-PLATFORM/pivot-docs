# US18.3.2 — Valider un jalon avec date de passage obligatoire

**En tant que** chef de projet (pilote d'activité)
**Je veux** ne pouvoir valider un jalon qu'avec une date de passage renseignée
**Afin de** garantir la fiabilité des jalons validés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un jalon sans date de passage, when je tente de le valider, then la validation est refusée | ⬜ |
| Given un jalon avec date de passage renseignée, when je le valide, then la validation est acceptée | ⬜ |
| Given la validation d'un jalon, when j'enregistre, then les modifications apportées aux autres jalons sont également enregistrées | ⬜ |
| Error : given une date de passage vide à la validation, system bloque et signale que la date de passage est obligatoire | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut valider un jalon | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La validation automatique du jalon CEN à date dépassée est couverte par l'US Gérer le jalon CEN.

## Notes d'implémentation
- Écran jalons de l'activité (module pilotage) : contrôle date de passage obligatoire à la validation.
- La validation d'un jalon persiste aussi les modifications en cours des autres jalons.

---
Item Type: US · Parent: F18.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-302
Dépendances: —
