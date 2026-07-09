# US13.3.1 — Tableau de bord campagne

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** responsable qualité
**Je veux** un tableau de bord de la campagne (taux de succès, cas bloquants, progression)
**Afin de** suivre l'avancement de la recette et détecter les blocages

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/pilotage/test-campaigns/{id}/dashboard` retourne % exécuté, taux de succès (PASS/total), nb cas BLOCKED/FAIL | ⬜ |
| Liste des cas bloquants (BLOCKED) mise en avant avec leur motif | ⬜ |
| Progression mise à jour en temps réel au fil des exécutions (US13.2.2) | ⬜ |
| Export du résultat de campagne (CSV) | ⬜ |
| Sécurité : tenantId extrait du TenantContext | ⬜ |
| Test TI : dashboard d'une campagne d'un autre tenant → 404 | ⬜ |

---
Item Type: US · Parent: F13.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Dépendances: US13.2.2
