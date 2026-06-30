# US16.1.2 — Menu utilisateur (avatar bulle, nom, déconnexion)

**En tant que** utilisateur connecté
**Je veux** voir un menu utilisateur dans la navigation avec mon avatar, mon nom et un lien de déconnexion
**Afin d'** accéder facilement à mon compte et me déconnecter

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Bulle avatar (initiales ou photo de profil) visible dans la navbar | ✅ | ✅ |
| Clic sur la bulle ouvre un dropdown : nom complet, email, lien profil, déconnexion | ✅ | ✅ |
| Déconnexion appelle DELETE /api/auth/logout (révocation token) | ✅ | ✅ |
| Accessibilité WCAG 2.1 AA : aria-haspopup, aria-expanded, focus piégé | ✅ | ✅ |
| Tests Vitest UserMenuComponent | ✅ | ✅ |

## Notes
Couvert par l'implémentation existante de la NavbarComponent (US02.1.1 legacy).

---
Item Type: US · Parent: F16.1 · Module: core · Phase: MVP · Size: S · Priority: High
Human Gate: human-validated · Stage: Done
