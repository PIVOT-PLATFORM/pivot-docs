# US16.4.1 — Sélection et persistance du thème utilisateur

**En tant que** utilisateur
**Je veux** basculer entre le thème clair et sombre
**Afin d'** adapter l'interface à mes préférences visuelles

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Icône lune (clair) / soleil (sombre) dans la navbar — bascule au clic | 🟡 livré par `pivot-ui` PR #49 (US16.1.1), pas par la PR de cette US — voir spec § Écarts |
| Thème persisté en `localStorage` entre sessions | ✅ testé (`theme.service.spec.ts`, persistance `pivot_theme`) |
| Thème par défaut : préférence système (`prefers-color-scheme`) | ✅ testé (`resolveInitialTheme()`, mock `matchMedia`) |
| `data-theme="dark"` posé sur `<html>` en thème sombre | ✅ testé (`theme.service.spec.ts`, assertion attribut DOM) |
| Tokens CSS (`--surface-bg`, `--color-brand-*`, etc.) changent selon le thème | ✅ `tokens.scss` bloc `[data-theme="dark"]`, Quality Gate SonarCloud passed |
| Pages légales : fond violet (`var(--auth-gradient)`) en thème sombre | 🟡 livré par `pivot-ui` PR #48 (ContactComponent, sujet sans rapport) — voir spec § Écarts |
| A11y : `aria-label` adapté à l'état courant (ex. "Passer en thème clair") | 🟡 livré par `pivot-ui` PR #49 (US16.1.1), pas par la PR de cette US — voir spec § Écarts |

## Notes d'implémentation
- `ThemeService` : `src/app/core/services/theme.service.ts`
- Signal `theme$` : 'light' | 'dark'
- `document.documentElement.setAttribute('data-theme', t)` via effect()

---
Item Type: US · Parent: F16.4 · Module: core · Phase: Socle · Size: S · Priority: Medium
Stage: ✅
Gate 5 : `pivot-ui` PR [#46](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/46) (Gate 4 = 80/100,
merge documenté) + PR [#49](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/49) + PR
[#48](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/48), spec figée
`docs/specs/EPIC-shell-ux/us16-4-1-theme-clair-sombre.md` (rétroactif, 2026-07-08 — fonctionnalité
livrée sur 3 PR distinctes, voir § Écarts de la spec)
