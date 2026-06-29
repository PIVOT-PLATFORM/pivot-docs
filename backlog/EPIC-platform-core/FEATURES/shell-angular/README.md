# F02.1 — Shell Angular

**Description** : Layout principal de l'application : navbar avec menu utilisateur, thème et langue, footer avec liens légaux. Routage shell vs auth (canMatch guard).

**US rattachées** :
- [US02.1.1 — Navbar](us-navbar.md) ✅
- [US02.1.2 — Footer](us-footer.md) ✅
- [US02.1.3 — Thème clair/sombre](us-theme-switcher.md) ✅
- [US02.1.4 — i18n FR/EN](us-i18n.md) ✅

**Pattern routing clé** : `authMatchGuard` (CanMatchFn) sur la route shell — quand non authentifié, Angular tombe sur les routes publiques (legal, auth). Pages légales visibles avec navbar si connecté, sans navbar si non connecté (via `LEGAL_CHILDREN` constant partagée).
