# US10.2.1 — Minuteur configurable et rotation participants (temps réel)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** participant au standup
**Je veux** voir le minuteur décompter et passer au participant suivant automatiquement
**Afin de** respecter le timebox de la session

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| STOMP broadcast `TIMER_TICK` chaque seconde (participant courant + temps restant) | ⬜ |
| Minuteur expiré → passage automatique au participant suivant + STOMP `PARTICIPANT_CHANGED` | ⬜ |
| Animateur peut passer manuellement au participant suivant | ⬜ |
| Interface Angular : minuteur visuel (cercle décomptant) + nom participant courant | ⬜ |
| Test : expiration timer → rotation · passage manuel → saut participant | ⬜ |

---
Item Type: US · Parent: F10.2 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US10.1.2, EN19.2 (WS room isolation)
