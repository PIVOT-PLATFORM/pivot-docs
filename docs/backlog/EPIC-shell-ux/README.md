# E16 — Shell applicatif & UX

## Objectif
Shell de l'application Angular : navigation principale, page d'accueil (grille modules), page contact, charte graphique et thèmes utilisateur.

## Périmètre GitHub (MVP)
- Feature F16.1 : Barre de navigation principale
- Feature F16.2 : Page d'accueil (greeting + grille modules)
- Feature F16.3 : Page contact
- Feature F16.4 : Charte graphique & thèmes utilisateur

## Extras implémentés (hors périmètre GitHub)
- Footer Angular (liens légaux)
- i18n FR/EN (Transloco)
- Pages légales (Mentions légales, Politique de confidentialité, CGU)
- Pages "Bientôt disponible" (coming soon)
- Dashboard utilisateur (/dashboard)

## Modules impactés
`core`

## Dépendances
- Dépend de : E01 Auth & IAM (authMatchGuard, guestGuard)
- Dépend de : E03 Système de modules (statut modules pour la grille)

## Statut global
🔄 En cours — navigation ✅, accueil ✅, thèmes ✅, contact 🔄, badge notifs ⬜

---

## Suivi d'avancement

| Élément | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| **F16.1 — Navigation principale** | | |
| [US16.1.1 — Navigation (logo, liens, responsive)](FEATURES/navigation/us-navbar.md) | ✅ | ✅ |
| [US16.1.2 — Menu utilisateur (avatar, nom, déconnexion)](FEATURES/navigation/us-menu-utilisateur.md) | ✅ | ✅ |
| [US16.1.3 — Badge notifications](FEATURES/navigation/us-badge-notifications.md) | ⬜ | ⬜ |
| [Footer (hors GitHub)](FEATURES/navigation/us-footer.md) | ✅ | ✅ |
| [i18n FR/EN (hors GitHub)](FEATURES/navigation/us-i18n.md) | ✅ | ✅ |
| **F16.2 — Page d'accueil** | | |
| [US16.2.1 — Grille des modules actifs](FEATURES/accueil/us-accueil-grille.md) | ✅ | ✅ |
| [US16.2.2 — Section modules à venir](FEATURES/accueil/us-accueil-modules-avenir.md) | ⬜ | ⬜ |
| [Dashboard utilisateur (hors GitHub)](FEATURES/accueil/us-dashboard.md) | ✅ | ✅ |
| **F16.3 — Page contact** | | |
| [US16.3.1 — Formulaire de contact](FEATURES/contact/us-formulaire-contact.md) | 🔄 | ⬜ |
| **F16.4 — Charte graphique & thèmes** | | |
| [US16.4.1 — Sélection et persistance du thème](FEATURES/charte-themes/us-theme.md) | ✅ | ✅ |
| **Extras hors GitHub** | | |
| [Pages légales (ML/PC/CGU)](FEATURES/pages-legales/us-pages-legales.md) | ✅ | ✅ |
| [Pages coming soon](FEATURES/coming-soon-pages/us-coming-soon.md) | ✅ | ✅ |
