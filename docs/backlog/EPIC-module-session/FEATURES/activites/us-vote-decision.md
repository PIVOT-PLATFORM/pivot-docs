# US19.3.6 — Activité VOTE — prise de décision structurée (Fist-to-Five / pondéré)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** animateur
**Je veux** organiser un vote de décision structuré (distinct d'un simple sondage)
**Afin d'** obtenir un consensus ou une décision d'équipe traçable

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Types de vote : FIST_TO_FIVE (0-5) · PONDÉRÉ (poids par option) · MATRICE (critères × options) | ⬜ |
| Fist-to-Five : chaque participant vote 0 (fist=veto) à 5 (full agreement) sur une proposition | ⬜ |
| Score consensus = moyenne des votes · résultat affiché avec niveau consensus (FORT ≥ 4 · MOYEN 3–4 · FAIBLE < 3) | ⬜ |
| Vote pondéré : chaque participant répartit N points entre les options | ⬜ |
| STOMP broadcast `VOTE_SUBMITTED` + résultats après clôture vote par animateur | ⬜ |
| Décision enregistrée avec date + résultat + participants (audit trail) | ⬜ |
| Résultat FIST_TO_FIVE avec vote 0 → alerte animateur "veto détecté" | ⬜ |
| Test : vote soumis deux fois même participant → 409 | ⬜ |

---
Item Type: US · Parent: F19.3 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: US19.1.2
