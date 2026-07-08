# US16.1.2 — Menu utilisateur (avatar bulle, nom, déconnexion)

**En tant que** utilisateur connecté
**Je veux** voir un menu utilisateur dans la navigation avec mon avatar, mon nom et un lien de déconnexion
**Afin d'** accéder facilement à mon compte et me déconnecter

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Bulle avatar (initiales ou photo de profil) visible dans la navbar | ✅ (initiales uniquement — pas de photo de profil) |
| Clic sur la bulle ouvre un dropdown : nom complet, email, lien profil, déconnexion | 🟡 (nom/email/déconnexion OK ; "lien profil" était un stub `aria-disabled` au merge de #49, câblé plus tard par US02.1.1) |
| Déconnexion appelle DELETE /api/auth/logout (révocation token) | 🟡 (fonctionnel, mais l'endpoint réel est un **POST** `/auth/logout`, pas un DELETE — AC à corriger) |
| Accessibilité WCAG 2.1 AA : aria-haspopup, aria-expanded, focus piégé | 🟡 (aria-haspopup/aria-expanded confirmés dans le code ; focus piégé au clavier non implémenté, aucun handler Échap/Tab) |
| Tests Vitest UserMenuComponent | 🟡 (29 tests Vitest dans `navbar.component.spec.ts` couvrent le menu utilisateur, mais aucun composant `UserMenuComponent` distinct n'existe) |

## Notes
Couvert par l'implémentation existante de la NavbarComponent (US16.1.1 legacy).

---
Item Type: US · Parent: F16.1 · Module: core · Phase: Socle · Size: S · Priority: High
Stage: Done
Gate 5 : `pivot-ui` PR [#49](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/49) (Gate 4 = 93/100),
spec figée `docs/specs/EPIC-shell-ux/us16-1-2-menu-utilisateur.md` (rétroactif, 2026-07-08) —
divergences AC documentées dans la spec (verbe HTTP logout, stub profil, focus trap absent,
pas de composant `UserMenuComponent` dédié)
