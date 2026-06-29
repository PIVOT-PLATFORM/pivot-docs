# E02 — Plateforme Core

## Objectif
Fournir les briques transverses de la plateforme : shell Angular (navbar, footer, thème, i18n), pages légales (ML/PC/CGU), formulaire de contact, et le système de modules (registre backend + guard Angular).

## Périmètre
- Feature F02.1 : Shell Angular (navbar, footer, thème clair/sombre, i18n FR/EN)
- Feature F02.2 : Pages légales (mentions légales, confidentialité, CGU)
- Feature F02.3 : Formulaire de contact
- Enabler EN02.1 : Système de modules backend (registre, bus événements)
- Enabler EN02.2 : Système de modules Angular (lazy-loading, guard activation)

## Hors périmètre
- Modules collaboratifs eux-mêmes (E05–E09)
- Dashboard avancé (métriques, stats) → post-MVP

## Modules impactés
- `core` · `admin` (pour l'activation modules)

## Dépendances
- Dépend de : E01 Auth & IAM (shell utilise authMatchGuard)

## Statut global
🔄 En cours — shell + pages légales ✅, contact 🔄, module system ⬜

---

## Suivi d'avancement

| Élément | 🤖 Dev | ✅ PO | 🎭 E2E | 🚀 Merge |
|---------|--------|-------|--------|----------|
| **F02.1 — Shell Angular** | | | | |
| [US02.1.1 — Navbar](FEATURES/shell-angular/us-navbar.md) | ✅ | ✅ | ⬜ | ✅ |
| [US02.1.2 — Footer](FEATURES/shell-angular/us-footer.md) | ✅ | ✅ | ⬜ | ✅ |
| [US02.1.3 — Thème clair/sombre](FEATURES/shell-angular/us-theme-switcher.md) | ✅ | ✅ | ⬜ | ✅ |
| [US02.1.4 — i18n FR/EN](FEATURES/shell-angular/us-i18n.md) | ✅ | ✅ | ⬜ | ✅ |
| **F02.2 — Pages légales** | | | | |
| [US02.2.1 — ML + PC + CGU](FEATURES/pages-legales/us-pages-legales.md) | ✅ | ✅ | ⬜ | ✅ |
| **F02.3 — Contact** | | | | |
| [US02.3.1 — Formulaire de contact](FEATURES/contact/us-formulaire-contact.md) | 🔄 | ⬜ | ⬜ | ⬜ |
| **Enablers** | | | | |
| [EN02.1 — Module system backend](ENABLERS/en-module-system-backend.md) | ⬜ | ⬜ | — | ⬜ |
| [EN02.2 — Module system Angular](ENABLERS/en-module-system-angular.md) | ⬜ | ⬜ | — | ⬜ |
