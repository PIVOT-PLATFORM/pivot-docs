# US09.1.2 — Rejoindre une room de planning poker via code

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** développeur / membre d'équipe
**Je veux** rejoindre une room de planning poker via un code d'invitation
**Afin de** participer à la session d'estimation

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/agilite/poker/rooms/join` avec `{ code }` → rejoint la room | ⬜ |
| Code invalide ou room expirée → 404 avec message explicite | ⬜ |
| Participant ajouté à la liste des membres de la room | ⬜ |
| Room accessible via STOMP après join (`/topic/agilite/poker/{roomId}`) | ⬜ |
| Test TI : code invalide → 404 · room différent tenant → 404 | ⬜ |

---
Item Type: US · Parent: F09.1 · Module: agilite · Phase: phase-3 · Size: S · Priority: High
Stage: Backlog
Dépendances: US09.1.1
