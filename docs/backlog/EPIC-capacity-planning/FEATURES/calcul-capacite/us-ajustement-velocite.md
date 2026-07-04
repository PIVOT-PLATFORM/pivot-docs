# US11.6.3 — Ajustement par la vélocité du sprint précédent

**En tant que** Scrum Master
**Je veux** pondérer la capacité prévisionnelle par la **vélocité réelle** du/des sprint(s) précédent(s)
**Afin de** planifier sur la réalité mesurée plutôt que sur la théorie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la vélocité des sprints précédents (F11.4), when je planifie, then une capacité prévisionnelle (en points) est proposée à partir de la **moyenne glissante des 3 derniers sprints** (fenêtre paramétrable) | ⬜ |
| Given une vélocité **irrégulière** (**coefficient de variation = écart-type ÷ moyenne > 25 %**), when on l'exploite, then l'intervalle de confiance est **élargi** (± 1 écart-type) ; sinon **resserré** | ⬜ |
| Given un **premier sprint sans historique**, then repli sur **capacité en jours-homme × focus × (1 − marge de maturité)** (sans vélocité) | ⬜ |

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: US11.4.1 · US11.6.2
