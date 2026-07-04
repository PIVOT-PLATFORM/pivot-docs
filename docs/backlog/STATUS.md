# Backlog PIVOT — Tableau de bord

Vue macro de l'avancement. Mis à jour manuellement après chaque sprint / session.

## Légende

| Colonne | Signification |
|---------|---------------|
| 🤖 Dev | Implémenté par Claude — code + tests passants |
| ✅ PO | Validé par le mainteneur (recette métier) |

États : ✅ Fait · 🔄 En cours · ⬜ À faire · ❌ Bloqué · ⏸️ Reporté

---

## Synthèse EPICs

| EPIC | Clé | Features | Enablers | US | Avancement |
|------|-----|----------|----------|----|------------|
| [E01 — Auth & IAM](EPIC-auth-iam/README.md) | E01 | 7+1extra | 10 | 13+6pending | 🔄 Partiellement Done |
| [E02 — Espace compte](EPIC-espace-compte/README.md) | E02 | 3 | 2 (v1-ent) | 7+1pending | ⬜ À planifier |
| [E03 — Système de modules](EPIC-module-system/README.md) | E03 | 3 | 4 | 7 | 🔄 EN03.1-3 + US03.x en Review · EN03.4 backlog · Sprint 2 |
| [E04 — Observabilité](EPIC-observabilite/README.md) | E04 | — | 4 MVP + 2 v1-ent | — | ⬜ Sprint 4 |
| [E05 — CI/CD & Supply-chain](EPIC-cicd-supply-chain/README.md) | E05 | — | 15 | 7 | 🔄 EN05.1-12 ✅ |
| [E06 — Administration](EPIC-administration/README.md) | E06 | 2 | — | 7 | ⬜ À planifier |
| [E07 — Infrastructure & Déploiement](EPIC-infrastructure/README.md) | E07 | — | 9 | — | ⬜ Critical |
| [E08 — Module Whiteboard](EPIC-whiteboard/README.md) | E08 | 4 | 2 | 7 | ⏸️ Gate MVP |
| [E09 — Module Scrum Poker](EPIC-scrum-poker/README.md) | E09 | 3 | 1 | 5 | ⏸️ phase-3 |
| [E10 — Module Daily Standup](EPIC-daily-standup/README.md) | E10 | 3 | — | 5 | ⏸️ phase-3 |
| [E11 — Module Capacity Planning](EPIC-capacity-planning/README.md) | E11 | 3 | — | 5 | ⏸️ phase-3 |
| [E12 — Module MeetOps](EPIC-meetops/README.md) | E12 | 3 (F12.1–3) | 2 (EN12.1–2) | 4 | ⬜ phase-3 · collaboratif |
| [E13 — Module Cahiers de tests](EPIC-cahiers-tests/README.md) | E13 | 3 (F13.1–3) | 2 (EN13.1–2) | 3 | ⬜ phase-3 · pilotage |
| [E14 — Module La Roue](EPIC-roue/README.md) | E14 | 3 | — | 3 | ⏸️ phase-3 |
| [E15 — Équipes transverses](EPIC-equipes/README.md) | E15 | — | 2 | 2 | ⏸️ phase-3 |
| [E16 — Shell applicatif & UX](EPIC-shell-ux/README.md) | E16 | 4+extras | — | 5+extras | ✅ Sprint 1 Done |
| [E17 — Infrastructure multi-repo](EPIC-infra-multi-repo/README.md) | E17 | — | 7 (EN17.1–7) | — | ⬜ phase-3 |
| [E18 — Module Pilotage](EPIC-pilotage/README.md) | E18 | 19 (F18.1–19) | 8 (EN18.1–8) | 80 | ⬜ phase-3 · +benchmark PP |
| [E19 — Module Session](EPIC-module-session/README.md) | E19 | 5 (F19.1–4 + VOTE) | 3 (EN19.1–3) | 12 | ⬜ phase-3 |
| [E20 — Module Retrospective](EPIC-retrospective/README.md) | E20 | 3 (F20.1–3) | 2 (EN20.1–2) | 5 | ⬜ phase-3 · agilite |
| [E21 — Workflows & Automatisation](EPIC-workflows/README.md) | E21 | 14 (F21.1–14) | 6 (EN21.1–6) | 78 | ⬜ phase-3 · benchmark WF |
| [E22 — Collaboration](EPIC-collaboration/README.md) | E22 | 15 (F22.1–15) | 12 (EN22.1–12) | 86 | ⬜ phase-3 · benchmark BL |
| **Total MVP** | **E01–E08 + E16** | **27** | **46** | **66** | 🔄 En cours |
| **Total benchmark** | **E18(ext) + E21 + E22** | **41** | **26** | **228** | ⬜ phase-3 · voir [BENCHMARK.md](BENCHMARK.md) |

---

## Suivi Sprint actif

### Sprint 1 — Auth & Shell (MVP) — ✅ Terminé sauf contact

| US | Titre | 🤖 Dev |
|----|-------|--------|
| US01.1.1 | Connexion email + mot de passe | ✅ |
| US01.1.2 | Déconnexion | ✅ |
| US01.1.3 | Rester connecté (remember-me) | ✅ |
| US01.2.1 | Inscription | ✅ |
| US01.2.2 | Vérification email | ✅ |
| US01.2.3 | Renvoi lien activation | ✅ |
| US01.3.1 | Demande de réinitialisation | ✅ |
| US01.3.2 | Réinitialisation par token | ✅ |
| US01.4.1 | OTP appareil inconnu | ✅ |
| F01.6 | Connexion Google OAuth2 | ✅ |
| F01.7/F01.8 | OIDC enterprise + JIT + session restore | ✅ |
| US16.1.1 | Navigation principale | ✅ |
| US16.1.2 | Menu utilisateur | ✅ |
| US16.2.1 | Page d'accueil (grille modules) | ✅ |
| US16.4.1 | Thème clair/sombre | ✅ |
| Pages légales | ML + PC + CGU | ✅ |
| Footer + i18n | Footer + Transloco FR/EN | ✅ |
| Dashboard utilisateur | Accueil connecté | ✅ |
| Pages Bientôt disponible | Modules non activés | ✅ |
| **US16.3.1** | **Formulaire de contact** | ⬜ |

> US16.3.1 : branche `feat/us16-3-1-contact` — pivot-core + pivot-ui

### Sprint 2 — Système de modules + Auth manquant (MVP)

| US | Titre | 🤖 Dev |
|----|-------|--------|
| EN03.1 | PivotModule interface + registre backend | ⬜ |
| EN03.2 | Guard Angular moduleGuard + status API | ⬜ |
| EN03.3 | Cache Redis statut modules TTL 60s | ⬜ |
| EN03.4 | Contrat module frontend (TypeScript) | ⬜ |
| US03.1.1 | Admin active un module | ⬜ |
| US03.1.2 | Admin désactive un module | ⬜ |
| US03.2.1 | UI liste modules avec statut | ⬜ |
| US03.2.2 | Guard Angular bloque module désactivé | ⬜ |
| US01.1.4 | Redirection post-login | ⬜ |
| US01.1.5 | Expiration session + auto-logout | ⬜ |
| US01.2.4 | Politique robustesse mot de passe | ⬜ |

---

## Verrou MVP

**Phase active : MVP.** Seuls les items `Phase: MVP` sont implémentables.

- Modules collaboratifs E09–E15 = `phase-3` — **verrouillés**
- E08 Whiteboard = MVP mais Gate 1 PO Agent pending → **bloqué**
- E02/E04/E06/E07 = MVP mais non démarré

Passage à `v1-enterprise` ou `phase-3` : décision explicite du mainteneur.

---

## Plan de priorisation MVP

| Priorité | Item | Phase | Statut |
|----------|------|-------|--------|
| Critical | US16.3.1 Formulaire de contact | MVP | 🔎 Review |
| Critical | E03 Système de modules (EN03.1-4 + US03.x) | MVP | 🔄 EN03.1-3 + US03.x en Review · EN03.4 backlog · Sprint 2 |
| Critical | E07 Infrastructure prod (EN07.1/2/5) | MVP | ⬜ Backlog |
| High | E06 Administration (F06.1/F06.2) | MVP | ⬜ Sprint 2/3 |
| High | US01.1.4/1.5 + US01.2.4 (Auth manquant) | MVP | 🔎 En Review · Sprint 2 |
| High | E02 Espace compte (F02.1/F02.2) | MVP | ⬜ Sprint 3 |
| Medium | E04 Observabilité | MVP | ⬜ Sprint 3/4 |
| Medium | US16.1.3 Badge notifications | MVP | ⬜ À planifier |
| Medium | US16.2.2 Section modules à venir | MVP | 🔄 En cours |
| — | E08 Whiteboard | MVP | ⬜ Backlog |
| — | E09–E15 Modules collaboratifs | phase-3 | ⏸️ Verrouillé |
| High | E17 Infrastructure multi-repo (EN17.1–7 + nginx gateway) | phase-3 | ⬜ Backlog |
| High | E18 Module Pilotage (roadmap, portefeuille, ADR, commande publique + **benchmark PPM** : demande/arbitrage, capacité à faire, PPI, M57, subventions, AP/CP) | phase-3 | ⬜ Backlog |
| High | E19 Module Session (QUIZ multijoueur/POLL/WORDCLOUD/BRAINSTORM/QA/VOTE) | phase-3 | ⬜ Backlog |
| High | E21 Workflows & Automatisation (**benchmark WF** : éditeur no-code, connecteurs, IA/agents, gouvernance, souveraineté) | phase-3 · automatisation | ⬜ Backlog |
| High | E22 Collaboration (**benchmark BL** : canevas, temps réel, facilitation, IA, sécurité/gouvernance, plateformes) | phase-3 · collaboratif | ⬜ Backlog |
| High | E20 Module Retrospective (formats rétro, dot-voting, plan action) | phase-3 · agilite | ⬜ Backlog |
| Medium | E12 MeetOps (agenda, animation reunions, compte-rendu) | phase-3 · collaboratif | ⬜ Backlog |
| Medium | E13 Cahiers de tests (cas test, campagnes, reporting qualite) | phase-3 · pilotage | ⬜ Backlog |
| Medium | E11 + velocity tracking (burndown chart, velocite sprint) | phase-3 · agilite | ⬜ Backlog |

---

*Dernière mise à jour : 2026-07-04*
