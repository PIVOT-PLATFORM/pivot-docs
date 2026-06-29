# Backlog PIVOT — Tableau de bord

Vue macro de l'avancement. Mis à jour manuellement après chaque sprint / session.

## Légende

| Colonne | Signification |
|---------|---------------|
| 🤖 Dev | Implémenté par Claude — code + tests passants |
| ✅ PO | Validé par le mainteneur (recette métier) |
| 🎭 E2E | Tests Playwright couvrant le nominal + cas d'erreur |
| 🚀 Merge | Mergé sur `main` + prêt pour production |

États : ✅ Fait · 🔄 En cours · ⬜ À faire · ❌ Bloqué · ⏸️ Reporté

---

## Synthèse EPICs

| EPIC | Features | Enablers | US | Avancement |
|------|----------|----------|----|------------|
| [E01 — Auth & IAM](EPIC-auth-iam/README.md) | 4 | 3 | 9 | 🔄 En cours |
| [E02 — Plateforme Core](EPIC-platform-core/README.md) | 3 | 2 | 9 | 🔄 En cours |
| [E03 — Administration](EPIC-admin/README.md) | 3 | 1 | 8 | ⬜ À planifier |
| [E04 — CI/CD & DevSecOps](EPIC-cicd-devops/README.md) | 0 | 5 | 5 | ⬜ À planifier |
| [E05 — Module Whiteboard](EPIC-module-whiteboard/README.md) | — | — | — | ⏸️ Post-MVP |
| [E06 — Module Session](EPIC-module-session/README.md) | — | — | — | ⏸️ Post-MVP |
| **Total MVP** | **10** | **11** | **31** | 🔄 En cours |

---

## Suivi Sprint actif

### Sprint 1 — Auth & Plateforme Core (MVP)

| US | Titre | 🤖 Dev | ✅ PO | 🎭 E2E | 🚀 Merge |
|----|-------|--------|-------|--------|----------|
| US01.1.1 | Connexion email/password | ✅ | ✅ | ⬜ | ✅ |
| US01.1.2 | Déconnexion | ✅ | ✅ | ⬜ | ✅ |
| US01.1.3 | Se souvenir de moi | ✅ | ✅ | ⬜ | ✅ |
| US01.2.1 | Inscription | ✅ | ✅ | ⬜ | ✅ |
| US01.2.2 | Vérification email | ✅ | ✅ | ⬜ | ✅ |
| US01.2.3 | Renvoi lien activation | ✅ | ✅ | ⬜ | ✅ |
| US01.3.1 | Mot de passe oublié | ✅ | ✅ | ⬜ | ✅ |
| US01.3.2 | Réinitialisation mot de passe | ✅ | ✅ | ⬜ | ✅ |
| US01.4.1 | Confirmation d'appareil OTP | ✅ | ✅ | ⬜ | ✅ |
| US02.1.1 | Navbar (thème, langue, user menu) | ✅ | ✅ | ⬜ | ✅ |
| US02.1.2 | Footer avec liens légaux | ✅ | ✅ | ⬜ | ✅ |
| US02.1.3 | Thème clair/sombre | ✅ | ✅ | ⬜ | ✅ |
| US02.1.4 | i18n FR/EN (Transloco) | ✅ | ✅ | ⬜ | ✅ |
| US02.2.1 | Pages légales (ML/PC/CGU) | ✅ | ✅ | ⬜ | ✅ |
| **US02.3.1** | **Formulaire de contact** | 🔄 | ⬜ | ⬜ | ⬜ |

> US02.3.1 : branche `feat/us16-3-1-contact` en cours — pivot-core + pivot-ui

### Sprint 2 — Système de modules + Administration (MVP)

| US | Titre | 🤖 Dev | ✅ PO | Branche |
|----|-------|--------|-------|---------|
| EN02.1 | Module system backend (registry) | ⬜ | ⬜ | — |
| EN02.2 | Module system Angular (guard) | ⬜ | ⬜ | — |
| US03.1.x | Activation/désactivation de modules | ⬜ | ⬜ | — |
| US03.2.x | Gestion des utilisateurs admin | ⬜ | ⬜ | — |

---

## Verrou MVP

**Phase active : MVP.** Seuls les items `Phase: MVP` sont implémentables.
Modules (whiteboard, session, quiz, survey, roadmap) = `phase-3` — **verrouillés**.

Passage à `v1-enterprise` ou `phase-3` : décision explicite du mainteneur.

---

## Plan de priorisation

| Priorité | Item | Phase | Statut |
|----------|------|-------|--------|
| Critical | Auth complète (E01) | MVP | ✅ Implémenté |
| Critical | Shell + Plateforme Core (E02 sans contact) | MVP | ✅ Implémenté |
| High | Formulaire de contact (US02.3.1) | MVP | 🔄 En cours |
| High | Système de modules backend (EN02.1) | MVP | ⬜ Next |
| High | Système de modules Angular (EN02.2) | MVP | ⬜ Next |
| Medium | Administration (E03) | MVP | ⬜ À planifier |
| Medium | CI/CD complet (E04) | MVP | ⬜ À planifier |
| Low | E2E Playwright (toutes features) | MVP | ⬜ Différable |
| — | Modules collaboratifs (E05–E06+) | phase-3 | ⏸️ Verrouillé |

---

*Dernière mise à jour : 2026-06-29*
