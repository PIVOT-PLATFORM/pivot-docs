# US03.3.3 — Admin tenant voit uniquement modules de son plan

**En tant que** admin tenant
**Je veux** voir dans l'interface d'administration uniquement les modules inclus dans mon plan
**Afin de** ne pas voir de modules auxquels je n'ai pas droit

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| GET /api/admin/modules filtre par plan du tenant (+ overrides SUPER_ADMIN) | ⬜ | ⬜ |
| Modules hors plan invisibles (pas 403, juste absents de la liste) | ⬜ | ⬜ |
| Override SUPER_ADMIN visible si actif | ⬜ | ⬜ |
| Tests TI avec 2 tenants de plans différents | ⬜ | ⬜ |
| L'API retourne un champ source: 'plan' \| 'override' par module | ⬜ | ⬜ |
| Un module disponible via override SUPER_ADMIN est affiché avec un indicateur visuel distinct (badge "Activé par l'administrateur plateforme") | ⬜ | ⬜ |

---
Item Type: US · Parent: F03.3 · Module: core · Phase: MVP · Size: M · Priority: Medium
Human Gate: human-validated · Stage: Backlog
