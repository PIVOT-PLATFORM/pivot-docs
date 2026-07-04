# E02 — Espace compte

## Objectif
Permettre aux utilisateurs de gérer leur profil, leur sécurité (mot de passe, email, sessions), et exercer leurs droits RGPD (export, suppression).

## Périmètre GitHub (MVP)
- Feature F02.1 : Profil utilisateur
- Feature F02.2 : Sécurité du compte
- Feature F02.3 : Droits RGPD (export)

## Périmètre GitHub (v1-enterprise)
- Enabler EN02.4 : Purge des comptes inactifs
- Enabler EN02.5 : Cron / job planifié RGPD

## Modules impactés
`auth` (pivot-core + pivot-ui)

## Dépendances
- Dépend de : E01 Auth & IAM (opaque tokens, session)

## Statut global
⬜ À planifier — Sprint 2/3

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|-------|
| **F02.1 — Profil utilisateur** | | |
| [US02.1.1 — Voir et éditer son profil](FEATURES/profil-utilisateur/us-voir-editer-profil.md) | ⬜ |
| [US02.1.2 — Préférence de langue](FEATURES/profil-utilisateur/us-preference-langue.md) | ⬜ |
| **F02.2 — Sécurité du compte** | | |
| [US02.2.1 — Changer son mot de passe](FEATURES/securite-compte/us-changer-password.md) | ⬜ |
| [US02.2.2 — Changer son e-mail](FEATURES/securite-compte/us-changer-email.md) | ⬜ |
| [US02.2.3 — Voir et révoquer ses sessions actives](FEATURES/securite-compte/us-sessions-actives.md) | ⬜ |
| [US02.2.4 — Suppression de compte (RGPD)](FEATURES/securite-compte/us-suppression-compte.md) | ⬜ |
| US02.2.5 — Réactivation de compte *(v1-enterprise)* | ⏸️ | ⏸️ |
| **F02.3 — Droits RGPD** | | |
| [US02.3.1 — Export de ses données personnelles](FEATURES/droits-rgpd/us-export-donnees.md) | ⬜ |
| **Enablers v1-enterprise** | | |
| EN02.4 — Purge des comptes inactifs | ⏸️ | ⏸️ |
| EN02.5 — Cron / job planifié RGPD | ⏸️ | ⏸️ |
