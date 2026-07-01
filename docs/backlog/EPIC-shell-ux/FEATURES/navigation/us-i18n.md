# i18n FR/EN (Transloco) — hors périmètre GitHub E16

**En tant que** utilisateur
**Je veux** choisir la langue de l'interface (Français ou Anglais)
**Afin d'** utiliser PIVOT dans ma langue

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Sélecteur FR/EN en navbar (pilule, langue active visible) | ✅ |
| Changement de langue → toute l'interface mise à jour instantanément | ✅ |
| Langue persistée en `localStorage` entre sessions | ✅ |
| Fichiers i18n : `public/assets/i18n/fr.json` + `en.json` | ✅ |
| Clés i18n pour : navbar, footer, auth (login/register/etc.), contact, pages légales | ✅ |
| Pages légales : contenu hardcodé FR + banner EN "⚠ This document is legally binding in French only." | ✅ |
| `TranslocoPipe` utilisé dans les templates, `translate()` pour les signaux dynamiques | ✅ |
| Tests Vitest : `TranslocoTestingModule.forRoot()` (import depuis `@jsverse/transloco`, pas subpath `/testing`) | ✅ |

## Notes d'implémentation
- Library : `@jsverse/transloco`
- `TRANSLOCO_CONFIG` dans `app.config.ts`
- Loader HTTP depuis `public/assets/i18n/{lang}.json`

---
Item Type: US (hors GitHub) · Parent: F16.1 · Module: core · Phase: MVP · Size: M · Priority: High
Human Gate: human-validated · Stage: Done
