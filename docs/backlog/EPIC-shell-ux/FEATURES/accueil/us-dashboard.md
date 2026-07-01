# Dashboard utilisateur — hors périmètre GitHub E16

**En tant que** utilisateur connecté
**Je veux** un tableau de bord personnel
**Afin de** visualiser mes activités et accéder rapidement aux modules

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Route `/dashboard` — accessible uniquement après authentification | ✅ |
| `DashboardComponent` rendu avec le shell (navbar + footer) | ✅ |
| Tests `dashboard.component.spec.ts` | ✅ |

## Notes d'implémentation
- `DashboardComponent` : `src/app/features/dashboard/`
- Page stub MVP — métriques + quick links dans sprint suivant

---
Item Type: US (hors GitHub) · Parent: F16.2 · Module: core · Phase: MVP · Size: XS · Priority: Medium
Human Gate: human-validated · Stage: Done
