# US12.3.1 — Générer et partager le compte-rendu de réunion

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** organisateur / participant
**Je veux** obtenir un compte-rendu structuré à la fin de la réunion
**Afin de** partager les décisions et actions à toute l'équipe

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/collaboratif/meetings/{id}/report` génère le compte-rendu (points traités, décisions, actions, durée réelle) | ⬜ |
| Compte-rendu inclut : participants présents · durée réelle par point · décisions enregistrées · actions (owner, échéance) | ⬜ |
| Export JSON et Markdown | ⬜ |
| Compte-rendu consultable après clôture de la réunion | ⬜ |
| Test : réunion non clôturée → compte-rendu partiel (draft) | ⬜ |

---
Item Type: US · Parent: F12.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US12.2.1
