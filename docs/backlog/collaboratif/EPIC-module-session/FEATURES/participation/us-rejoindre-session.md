# US19.2.1 — Rejoindre une session via code court (authentifié ou anonyme)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** participant
**Je veux** rejoindre une session live via un code court
**Afin de** participer sans avoir besoin de compte PIVOT (en ROLE_GUEST)

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/collaboratif/sessions/join` (body: code, displayName) → retourne token participant + URL STOMP room | ⬜ |
| Participant authentifié : utilise son identité token porteur | ⬜ |
| Participant anonyme : ROLE_GUEST temporaire lié à la session uniquement | ⬜ |
| STOMP broadcast `PARTICIPANT_JOINED` aux autres participants | ⬜ |
| Code invalide ou session COMPLETED → 404 | ⬜ |
| Test TI : join authentifié · join anonyme · code invalide | ⬜ |

---
Item Type: US · Parent: F19.2 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Dépendances: US19.1.1
