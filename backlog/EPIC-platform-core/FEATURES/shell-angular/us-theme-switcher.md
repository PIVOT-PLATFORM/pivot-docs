# US02.1.3 — Thème clair/sombre

**En tant que** utilisateur
**Je veux** basculer entre le thème clair et sombre
**Afin d'** adapter l'interface à mes préférences visuelles

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO | 🎭 E2E | 🚀 Merge |
|---------|--------|-------|--------|----------|
| Icône lune (clair) / soleil (sombre) dans la navbar — bascule au clic | ✅ | ✅ | ⬜ | ✅ |
| Thème persisté en `localStorage` entre sessions | ✅ | ✅ | ⬜ | ✅ |
| Thème par défaut : préférence système (`prefers-color-scheme`) | ✅ | ✅ | — | ✅ |
| `data-theme="dark"` posé sur `<html>` en thème sombre | ✅ | ✅ | — | ✅ |
| Tokens CSS (`--surface-bg`, `--color-brand-*`, etc.) changent selon le thème | ✅ | ✅ | ⬜ | ✅ |
| Pages légales : fond violet (`var(--auth-gradient)`) en thème sombre | ✅ | ✅ | ⬜ | ✅ |
| A11y : `aria-label` adapté à l'état courant (ex. "Passer en thème clair") | ✅ | ✅ | ⬜ | ✅ |

## Notes d'implémentation
- `ThemeService` : `src/app/core/services/theme.service.ts`
- Signal `theme$` : 'light' | 'dark'
- `document.documentElement.setAttribute('data-theme', t)` via effect()

---
Item Type: US · Parent: F02.1 · Module: core · Phase: MVP · Size: S · Priority: High
Human Gate: human-validated · Stage: Done
