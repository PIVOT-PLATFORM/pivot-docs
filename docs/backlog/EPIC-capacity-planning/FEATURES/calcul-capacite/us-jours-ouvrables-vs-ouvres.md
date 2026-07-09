# US11.6.1 — Jours ouvrables vs jours ouvrés

**En tant que** Scrum Master
**Je veux** que la capacité distingue les jours **ouvrables** (calendrier) des jours **ouvrés** (réellement travaillés = hors weekends, fériés de la localité et absences)
**Afin de** ne jamais surestimer la capacité en comptant des jours non travaillés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un sprint et une localité, when la capacité se calcule, then weekends et **jours fériés du pays/localité** sont exclus (réutilise EN22.3) | ⬜ |
| Given un membre avec son propre calendrier/localité, when il est pris en compte, then ses jours ouvrés suivent SA localité (weekend non standard géré) | ⬜ |
| Given les jours ouvrables, when on retire weekends + fériés + absences, then on obtient les **jours ouvrés nets** par membre | ⬜ |

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Dépendances: EN11.1 · EN22.3 (calendriers/fériés)
