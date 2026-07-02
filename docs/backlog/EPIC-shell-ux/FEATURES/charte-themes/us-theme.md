# US16.4.1 — Sélection et persistance du thème utilisateur

**En tant que** utilisateur
**Je veux** basculer entre le thème clair et sombre
**Afin d'** adapter l'interface à mes préférences visuelles

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Icône lune (clair) / soleil (sombre) dans la navbar — bascule au clic | ✅ |
| Thème persisté en `localStorage` entre sessions | ✅ |
| Thème par défaut : préférence système (`prefers-color-scheme`) | ✅ |
| `data-theme="dark"` posé sur `<html>` en thème sombre | ✅ |
| Tokens CSS (`--surface-bg`, `--color-brand-*`, etc.) changent selon le thème | ✅ |
| Pages légales : fond violet (`var(--auth-gradient)`) en thème sombre | ✅ |
| A11y : `aria-label` adapté à l'état courant (ex. "Passer en thème clair") | ✅ |

## Notes d'implémentation
- `ThemeService` : `src/app/core/services/theme.service.ts`
- Signal `theme$` : 'light' | 'dark'
- `document.documentElement.setAttribute('data-theme', t)` via effect()

---
Item Type: US · Parent: F16.4 · Module: core · Phase: MVP · Size: S · Priority: Medium
Stage: Done
