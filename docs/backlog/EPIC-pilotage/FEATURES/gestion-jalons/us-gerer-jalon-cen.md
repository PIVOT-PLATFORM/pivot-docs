# US18.3.3 — Gérer le jalon CEN

**En tant que** chef de projet (pilote d'activité)
**Je veux** disposer d'un jalon CEN avec Date de passage, Date SECEN et Avis CEN
**Afin de** suivre le passage en comité CEN

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le jalon CEN, when je le renseigne, then les champs Date de passage, Date SECEN et Avis CEN sont disponibles | ⬜ |
| Given une date de passage dépassée, when le jalon CEN est évalué, then il est validé automatiquement | ⬜ |
| Error : given une saisie incomplète du jalon CEN à la validation manuelle, system signale les champs requis (date de passage) | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut gérer le jalon CEN | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La réinitialisation des champs CEN est couverte par l'US Réinitialiser les champs de jalon.

## Notes d'implémentation
- Jalon CEN de l'écran jalons (module pilotage) : Date de passage, Date SECEN, Avis CEN.
- Validation automatique lorsque la date de passage est dépassée.

---
Item Type: US · Parent: F18.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-303
Dépendances: —
