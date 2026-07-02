# US10.2.2 — Contrôler l'animation manuellement (passer, réordonner, étendre)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur du standup
**Je veux** pouvoir passer un participant, étendre son temps ou modifier l'ordre à la volée
**Afin de** adapter le déroulement aux imprévus (absent, discussion plus longue, etc.)

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Animateur peut "passer" le participant courant → STOMP `PARTICIPANT_SKIPPED` + passage suivant | ⬜ |
| Animateur peut ajouter +30s / +60s au timer du participant courant → STOMP `TIMER_EXTENDED` | ⬜ |
| Animateur peut réordonner les participants suivants (drag & drop liste) | ⬜ |
| Participants non-animateurs voient uniquement les changements d'état (pas les contrôles) | ⬜ |
| Participant sauté : comptabilisé dans les stats session avec durée = 0 et statut SKIPPED | ⬜ |
| Test : extension timer → durée totale session recalculée correctement | ⬜ |

---
Item Type: US · Parent: F10.2 · Module: agilite · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Dépendances: US10.1.2
