# US16.2.1 — Page d'accueil : grille des modules actifs

**En tant que** utilisateur connecté
**Je veux** une page d'accueil après connexion
**Afin d'** avoir un point d'entrée dans l'application

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Route `/home` — accessible uniquement après authentification | ✅ |
| `HomeComponent` rendu avec le shell (navbar + footer) | ✅ |
| Redirection automatique `/` → `/home` pour les utilisateurs connectés | ✅ |
| Tests `home.component.spec.ts` | ✅ |

## Notes d'implémentation
- `HomeComponent` : `src/app/features/home/`
- Page stub Socle — contenu enrichi dans sprints suivants (modules dashboard, quick access)

---
Item Type: US · Parent: F16.2 · Module: core · Phase: Socle · Size: S · Priority: High
Stage: ✅
Rôle: utilisateur-final
Gate 5 : `pivot-ui` PR [#47](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/47) (Gate 4 = 98/100), spec figée `docs/specs/EPIC-shell-ux/us16-2-1-accueil-grille-modules.md` (rétroactif, 2026-07-08)
