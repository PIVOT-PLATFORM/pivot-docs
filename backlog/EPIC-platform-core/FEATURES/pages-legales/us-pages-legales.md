# US02.2.1 — Pages légales (ML, PC, CGU)

**En tant que** visiteur ou utilisateur
**Je veux** accéder aux mentions légales, à la politique de confidentialité et aux CGU
**Afin de** connaître les conditions d'utilisation de PIVOT

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO | 🎭 E2E | 🚀 Merge |
|---------|--------|-------|--------|----------|
| `/legal/mentions-legales`, `/legal/confidentialite`, `/legal/cgu` accessibles | ✅ | ✅ | ⬜ | ✅ |
| Contenu intégralement en français (obligation légale) — titres et corps hardcodés FR | ✅ | ✅ | — | ✅ |
| Banner jaune "⚠ This document is legally binding in French only." quand lang=EN uniquement | ✅ | ✅ | ⬜ | ✅ |
| Bouton "← Retour" → `Location.back()` (adapté au contexte : shell ou login) | ✅ | ✅ | ⬜ | ✅ |
| Connecté → pages avec navbar + footer (shell via `authMatchGuard`) | ✅ | ✅ | ⬜ | ✅ |
| Non connecté → pages standalone (sans navbar/footer, fond violet dark mode) | ✅ | ✅ | ⬜ | ✅ |
| Dark mode : fond violet `var(--auth-gradient)` via `:host-context([data-theme="dark"])` | ✅ | ✅ | ⬜ | ✅ |
| A11y : heading hierarchy h1 > h2, liens descriptifs, contraste AA | ✅ | ✅ | ⬜ | ✅ |

## Notes d'implémentation
- Pattern routing : `LEGAL_CHILDREN` constant partagée dans `app.routes.ts`
- `authMatchGuard` sur le shell → fallback public si non authentifié
- Components : `LegalNoticeComponent`, `PrivacyComponent`, `TermsComponent`
- `lang` signal via `toSignal(transloco.langChanges$, { initialValue: transloco.getActiveLang() })`
- Aucun `TranslocoPipe` sur les composants légaux (contenu hardcodé FR)

---
Item Type: US · Parent: F02.2 · Module: core · Phase: MVP · Size: M · Priority: High
Human Gate: human-validated · Stage: Done
