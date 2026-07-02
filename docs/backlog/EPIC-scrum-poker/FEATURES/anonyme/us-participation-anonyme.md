# US09.3.1 — Participer anonymement à une room (sans compte)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** invité externe sans compte PIVOT
**Je veux** rejoindre une room de planning poker via un code
**Afin de** participer à l'estimation sans avoir à créer un compte

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Accès room via code sans authentification (ROLE_GUEST) | ⬜ |
| Invité saisit un pseudonyme avant de rejoindre | ⬜ |
| Invité peut voter mais ne peut pas créer de tickets ni révéler les votes | ⬜ |
| Session invité expirée à la fermeture de la room ou après 2h d'inactivité | ⬜ |
| Invité identifié uniquement par `sessionId` temporaire (pas de persistance BDD) | ⬜ |
| Sécurité : token invité ne donne accès qu'à cette room spécifique | ⬜ |

---
Item Type: US · Parent: F09.3 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US09.1.2
