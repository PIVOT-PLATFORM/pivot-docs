# E02 — Plateforme Core

## Objectif
Fournir les briques transverses de la plateforme : shell Angular (navbar, footer, thème, i18n), pages légales, formulaire de contact, pages home/dashboard, pages coming-soon, système de modules et infrastructure multi-tenant.

## Périmètre
- Feature F02.1 : Shell Angular (navbar, footer, thème clair/sombre, i18n FR/EN)
- Feature F02.2 : Pages légales (mentions légales, confidentialité, CGU)
- Feature F02.3 : Formulaire de contact
- Feature F02.4 : Home & Dashboard
- Feature F02.5 : Pages "Bientôt disponible"
- Enabler EN02.1 : Système de modules backend (registre, bus événements)
- Enabler EN02.2 : Système de modules Angular (lazy-loading, guard activation)
- Enabler EN02.3 : Infrastructure multi-tenant (Tenant, TenantOidcConfig)

## Hors périmètre
- Modules collaboratifs eux-mêmes (E05–E09)
- Dashboard avancé (métriques, stats) → sprint suivant

## Modules impactés
- `core` · `admin` (pour l'activation modules)

## Dépendances
- Dépend de : E01 Auth & IAM (authMatchGuard, guestGuard)

## Statut global
🔄 En cours — shell + pages + home/dashboard/legal ✅, contact 🔄, module system ⬜

---

## Suivi d'avancement

| Élément | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| **F02.1 — Shell Angular** | | |
| [US02.1.1 — Navbar](FEATURES/shell-angular/us-navbar.md) | ✅ | ✅ |
| [US02.1.2 — Footer](FEATURES/shell-angular/us-footer.md) | ✅ | ✅ |
| [US02.1.3 — Thème clair/sombre](FEATURES/shell-angular/us-theme-switcher.md) | ✅ | ✅ |
| [US02.1.4 — i18n FR/EN](FEATURES/shell-angular/us-i18n.md) | ✅ | ✅ |
| **F02.2 — Pages légales** | | |
| [US02.2.1 — ML + PC + CGU](FEATURES/pages-legales/us-pages-legales.md) | ✅ | ✅ |
| **F02.3 — Contact** | | |
| [US02.3.1 — Formulaire de contact](FEATURES/contact/us-formulaire-contact.md) | 🔄 | ⬜ |
| **F02.4 — Home & Dashboard** | | |
| [US02.4.1 — Page d'accueil](FEATURES/home-dashboard/us-home.md) | ✅ | ✅ |
| [US02.4.2 — Dashboard utilisateur](FEATURES/home-dashboard/us-dashboard.md) | ✅ | ✅ |
| **F02.5 — Pages coming soon** | | |
| [US02.5.1 — Coming soon](FEATURES/coming-soon-pages/us-coming-soon.md) | ✅ | ✅ |
| **Enablers** | | |
| [EN02.1 — Module system backend](ENABLERS/en-module-system-backend.md) | ⬜ | ⬜ |
| [EN02.2 — Module system Angular](ENABLERS/en-module-system-angular.md) | ⬜ | ⬜ |
| [EN02.3 — Infrastructure multi-tenant](ENABLERS/en-tenant-infrastructure.md) | ✅ | ✅ |
