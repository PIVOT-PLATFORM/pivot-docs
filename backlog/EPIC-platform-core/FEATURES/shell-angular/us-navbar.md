# US02.1.1 — Navbar

**En tant que** utilisateur authentifié
**Je veux** une barre de navigation claire avec mes options
**Afin de** naviguer dans l'application et gérer mon compte

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO | 🎭 E2E | 🚀 Merge |
|---------|--------|-------|--------|----------|
| Liens de navigation : Accueil, Modules, Mes équipes (avec indicateur page active) | ✅ | ✅ | ⬜ | ✅ |
| Basculeur thème clair/sombre (icône lune/soleil) | ✅ | ✅ | ⬜ | ✅ |
| Sélecteur langue FR/EN (pilule, langue active mise en évidence) | ✅ | ✅ | ⬜ | ✅ |
| Boutons ? (aide) et bug (email pré-rempli i18n) | ✅ | ✅ | ⬜ | ✅ |
| Menu utilisateur : avatar coloré, nom, email, raccourcis Coming soon, Déconnexion | ✅ | ✅ | ⬜ | ✅ |
| Design : dégradé indigo→violet (thème clair) / noir teinté violet (thème sombre) | ✅ | ✅ | ⬜ | ✅ |
| A11y : `role="banner"`, `aria-label`, `aria-current="page"`, focus visible, WCAG AA | ✅ | ✅ | ⬜ | ✅ |

## Notes d'implémentation
- `NavbarComponent` : `src/app/core/layout/navbar/`
- `ThemeService` : `document.documentElement.setAttribute('data-theme', t)`
- `TranslocoService` : langChanges$ pour la réactivité langue

---
Item Type: US · Parent: F02.1 · Module: core · Phase: MVP · Size: L · Priority: Critical
Human Gate: human-validated · Stage: Done
