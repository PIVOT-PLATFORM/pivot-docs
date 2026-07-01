# US03.3.1 — SUPER_ADMIN définit modules disponibles par plan

**En tant que** SUPER_ADMIN
**Je veux** définir quels modules sont disponibles pour chaque plan tarifaire
**Afin de** contrôler l'offre SaaS par niveau de plan

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| POST /api/superadmin/plans/{planId}/modules configure la liste des modules d'un plan | ⬜ |
| Requiert ROLE_SUPER_ADMIN | ⬜ |
| Entité `Plan` avec association M-N modules | ⬜ |
| Tenant associé à un plan (champ `planId` sur Tenant) | ⬜ |
| Tests TI POST /api/superadmin/plans/{planId}/modules | ⬜ |
| Sémantique HTTP clarifiée : PUT /api/superadmin/plans/{planId}/modules pour remplacement complet de la liste, POST /api/superadmin/plans/{planId}/modules/{moduleId} pour ajout unitaire | ⬜ |
| GET /api/superadmin/plans/{planId}/modules retourne la liste courante des modules du plan | ⬜ |
| Interface Angular /superadmin/plans pour visualiser et modifier la configuration des plans (AC frontend à définir dans une US dédiée ou ajoutés ici) | ⬜ |

---
Item Type: US · Parent: F03.3 · Module: core · Phase: MVP · Size: S · Priority: High
Human Gate: human-validated · Stage: Backlog
