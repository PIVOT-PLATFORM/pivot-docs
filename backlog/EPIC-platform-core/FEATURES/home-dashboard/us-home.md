# US02.4.1 — Page d'accueil

**En tant que** utilisateur connecté
**Je veux** une page d'accueil après connexion
**Afin d'** avoir un point d'entrée dans l'application

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Route `/home` — accessible uniquement après authentification | ✅ | ✅ |
| `HomeComponent` rendu avec le shell (navbar + footer) | ✅ | ✅ |
| Redirection automatique `/` → `/home` pour les utilisateurs connectés | ✅ | ✅ |
| Tests `home.component.spec.ts` | ✅ | ✅ |

## Notes d'implémentation
- `HomeComponent` : `src/app/features/home/`
- Page stub MVP — contenu enrichi dans sprints suivants (modules dashboard, quick access)

---
Item Type: US · Parent: F02.4 · Module: core · Phase: MVP · Size: XS · Priority: High
Human Gate: human-validated · Stage: Done
