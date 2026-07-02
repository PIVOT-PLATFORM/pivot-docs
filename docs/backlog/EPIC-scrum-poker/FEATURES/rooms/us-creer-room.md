# US09.1.1 — Créer une room de planning poker

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master / facilitateur
**Je veux** créer une room de planning poker avec un code d'invitation
**Afin de** démarrer une session d'estimation avec mon équipe

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| POST `/api/agilite/poker/rooms` crée une room (nom, séquence Fibonacci par défaut) | ⬜ |
| Room génère un code d'invitation unique (6 caractères alphanumériques) | ⬜ |
| Créateur devient automatiquement facilitateur de la room | ⬜ |
| Room active par défaut, expiration configurable (défaut 24h) | ⬜ |
| Sécurité : tenantId extrait du TenantContext (jamais du body) | ⬜ |
| Test TI cross-tenant : room d'un autre tenant retourne 404 | ⬜ |

---
Item Type: US · Parent: F09.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
