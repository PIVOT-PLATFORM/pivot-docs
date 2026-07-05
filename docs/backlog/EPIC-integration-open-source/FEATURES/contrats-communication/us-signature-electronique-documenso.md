# US28.5.1 — Signature électronique (Documenso)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Contract Manager
**Je veux** signer des documents via Documenso depuis le portail
**Afin de** déclencher automatiquement le suivi du cycle de vie contractuel

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Adaptateur `adapter-documenso` conforme au contrat PivotAdapter (EN28.3) | ⬜ |
| Un document signé via Documenso émet `contract.signed` sur le bus | ⬜ |

---
Item Type: US · Parent: F28.5 · Module: contrats · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Rôle: contract-manager
Dépendances: EN28.3, EN28.4
