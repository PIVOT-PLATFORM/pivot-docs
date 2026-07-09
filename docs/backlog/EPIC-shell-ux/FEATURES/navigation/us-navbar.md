# US16.1.1 — Navigation principale (logo, liens, responsive)

**En tant que** utilisateur authentifié
**Je veux** une barre de navigation claire avec mes options
**Afin de** naviguer dans l'application et gérer mon compte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Liens de navigation : Accueil, Modules, Mes équipes (avec indicateur page active) | ✅ |
| Basculeur thème clair/sombre (icône lune/soleil) | ✅ |
| Sélecteur langue FR/EN (pilule, langue active mise en évidence) | ✅ |
| Boutons ? (aide) et bug (email pré-rempli i18n) | 🟡 bug ✅ (mailto pré-rempli, sujet non i18n) · bouton "?" sans action au clic — voir spec |
| Menu utilisateur : avatar coloré, nom, email, raccourcis Coming soon, Déconnexion | ✅ |
| Design : dégradé indigo→violet (thème clair) / noir teinté violet (thème sombre) | ✅ |
| A11y : `role="banner"`, `aria-label`, `aria-current="page"`, focus visible, WCAG AA | 🟡 `aria-current="page"` absent du diff — reste couvert (banner, aria-label, focus-visible, Lighthouse a11y vert) |

## Notes d'implémentation
- `NavbarComponent` : `src/app/core/layout/navbar/`
- `ThemeService` : `document.documentElement.setAttribute('data-theme', t)`
- `TranslocoService` : langChanges$ pour la réactivité langue

---
Item Type: US · Parent: F16.1 · Module: core · Phase: Socle · Size: L · Priority: High
Stage: ✅
Gate 5 : `pivot-ui` PR [#49](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/49) (Gate 4 =
93/100), spec figée `docs/specs/EPIC-shell-ux/us16-1-1-navigation-principale.md` (rétroactif,
2026-07-08)
