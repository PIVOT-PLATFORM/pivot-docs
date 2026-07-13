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
| [E01 — Auth & IAM](EPIC-auth-iam/README.md) | E01 | 7+1extra | 10 | 16+4pending | 🔄 Partiellement Done |
| [E02 — Espace compte](EPIC-espace-compte/README.md) | E02 | 3 | 2 (v1-ent) | 7+1pending | 🔎 Sprint 3 — US Socle mergées, en attente de recette |
| [E03 — Système de modules](EPIC-module-system/README.md) | E03 | 3 | 4 | 7 | ✅ Sprint 2 terminé — EN03.1-4 + US03.x mergés |
| [E04 — Observabilité](EPIC-observabilite/README.md) | E04 | — | 4 Socle + 2 v1-ent | — | ✅ Sprint 4 terminé (EN04.1-4) |
| [E05 — CI/CD & Supply-chain](EPIC-cicd-supply-chain/README.md) | E05 | — | 15 | 7 | 🔄 EN05.1-12 ✅ |
| [E06 — Administration](EPIC-administration/README.md) | E06 | 2 | — | 7 | 🔎 Sprint 3 — US mergées, en attente de recette |
| [E07 — Infrastructure & Déploiement](EPIC-infrastructure/README.md) | E07 | — | 9 | — | ✅ Sprint 4 terminé (EN07.1/2/5) |
| [E17 — Infrastructure multi-repo](EPIC-infra-multi-repo/README.md) | E17 | — | 10 (EN17.1–10) | — | 🔎 10/10 mergés — EN17.1 clos 2026-07-08 (8/8 volets `db`/`modules`/`tenant`/`team`/`auth`, [pivot-core#171](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171) fermée) · en attente de recette mainteneur |
| [E09 — Module Scrum Poker](EPIC-scrum-poker/README.md) | E09 | 3 | 1 | 5 | ⏸️ phase-3 |
| [E10 — Module Daily Standup](EPIC-daily-standup/README.md) | E10 | 3 | — | 5 | ⏸️ phase-3 |
| [E11 — Module Capacity Planning](EPIC-capacity-planning/README.md) | E11 | 8 | 1 | 16 | ⏸️ phase-3 |
| [E12 — Module MeetOps](EPIC-meetops/README.md) | E12 | 3 (F12.1–3) | 2 (EN12.1–2) | 4 | ⬜ phase-3 · collaboratif |
| [E13 — Module Cahiers de tests](EPIC-cahiers-tests/README.md) | E13 | 3 (F13.1–3) | 2 (EN13.1–2) | 5 | ⬜ phase-3 · pilotage |
| [E14 — Module La Roue](EPIC-roue/README.md) | E14 | 3 | — | 3 | ⏸️ phase-3 |
| [E15 — Équipes transverses](EPIC-equipes/README.md) | E15 | — | 2 | 2 | ⏸️ phase-3 |
| [E16 — Shell applicatif & UX](EPIC-shell-ux/README.md) | E16 | 4+extras | — | 5+extras | 🔄 Sprint 1 Done + badge notifs/modules à venir (Sprint 4, 🔎 Review) |
| [E19 — Module Session](EPIC-module-session/README.md) | E19 | 5 (F19.1–4 + VOTE) | 3 (EN19.1–3) | 12 | ⬜ phase-3 |
| [E20 — Module Retrospective](EPIC-retrospective/README.md) | E20 | 3 (F20.1–3) | 2 (EN20.1–2) | 5 | ⬜ phase-3 · agilite |
| [E21 — Module Gestion des risques](EPIC-risk/README.md) | E21 | 10 | 5 | 54 | ⬜ phase-3 · pilotage |
| [E22 — Module Roadmap & Planification](EPIC-roadmap/README.md) | E22 | 8 | 3 | 47 | ⬜ phase-3 · pilotage |
| [E23 — Module Portefeuille projets](EPIC-portefeuille/README.md) | E23 | 2 | — | 12 | ⬜ phase-3 · pilotage |
| [E24 — Module ADR projet](EPIC-adr-projet/README.md) | E24 | 1 | — | 2 | ⬜ phase-3 · pilotage |
| *(E25 — Module Commande publique → [BACKLOG-IDEATION](BACKLOG-IDEATION/EPIC-commande-publique/README.md))* | E25 | 1 | — | 4 | 📋 Idéation |
| [E26 — Module Budget & suivi financier](EPIC-budget/README.md) | E26 | 2 | — | 8 | ⬜ phase-3 · pilotage |
| [E27 — Module OKR](EPIC-okr/README.md) | E27 | 10 | 1 | 25 | ⬜ phase-3 · pilotage |
| [E28 — Intégration open source](EPIC-integration-open-source/README.md) | E28 | 11 | 12 | 38 | ⬜ phase-3 — dépend ADR-009 |
| [E29 — Workflows & Automatisation](EPIC-workflows/README.md) | E29 | 14 | 6 | 79 | ⬜ phase-3 |
| [E30 — Collaboration](EPIC-collaboration/README.md) | E30 | 19 (dont 4 Socle, ex-E08) | 14 (dont 2 Socle, ex-E08) | 107 (dont 19 Socle, ex-E08) | ⏸️ phase-3 (noyau F08.x/EN08.x : 🔎 17/17 mergés Sprint 5 Vague 1+, en attente de recette) |
| [E38 — Management de l'innovation (SMI, pilotage)](EPIC-pilotage-innovation/README.md) | E38 | 16 | 2 | 46 | ⬜ phase-3 · pilotage |
| [E41 — Formation & Onboarding](EPIC-formation-onboarding/README.md) | E41 | 6 | 1 | 42 | ⬜ phase-3 |
| [E42 — Pivot Forms](EPIC-pivot-forms/README.md) | E42 | 11 | 2 | 34 | ⬜ phase-3 |
| [E43 — Sécurité & Zero Trust](EPIC-securite/README.md) | E43 | — | 13 | — | ⬜ phase-3 — dépend ADR-015–020 |
| [E44 — SignDoc (signature électronique)](EPIC-signdoc/README.md) | E44 | 3 | 1 | 4 | ⬜ phase-3 |
| [E45 — PDF Manager (Mes PDF)](EPIC-pdf-manager/README.md) | E45 | 4 | 1 | 4 | ⬜ phase-3 |
| [E46 — Feedback](EPIC-feedback/README.md) | E46 | 2 | — | 2 | ⬜ phase-3 |
| [E47 — Mini-jeux collaboratifs](EPIC-mini-jeux/README.md) | E47 | 3 | — | 3 | ⬜ phase-3 · collaboratif |
| [E48 — Assistant IA (transverse)](EPIC-assistant-ia/README.md) | E48 | 1 | 1 | 1 | ⬜ phase-3 |
| [E49 — Module To-Do](EPIC-todo/README.md) | E49 | 3 | — | 3 | ⬜ phase-3 |
| [E50 — Module PI Planning](EPIC-pi-planning/README.md) | E50 | 3 | — | 4 | ⬜ phase-3 · agilite |
| [E51 — Cockpits DSI](EPIC-cockpits/README.md) | E51 | 3 | 10 | 4+ | ⬜ phase-3 · transverse — reséquencé en [backlog post-S12](sprints/backlog-post-s12.md) (déprogrammé du Sprint 14 le 2026-07-12, remplacé par le raffinage E52 · ADR-028 accès externe conservé) |
| [E52 — Clarification des domaines](EPIC-clarification-domaines/README.md) | E52 | 3 | 3 | 9+ | ⬜ Socle · transverse (raffinage) — **repoussé après S33** (complétion Pilotage/Risques) : [Sprint 34](sprints/sprint-34.md) Vague 1 Socle ; Pilotage S35, Agilité/Collaboratif + synthèse S36 |
| **Total Socle** | **E01–E07 + E16 + E17 + noyau F08.x/EN08.x (sous E30, ex-E08)** | **27** | **54** | **78** | 🔄 En cours |
| **Total phase-3** | **E09–E50 (sauf E17 Socle, E31 dissous, E18/E32–E37/E39/E40 → Idéation)** | **~159** | **~69** | **~561** | ⏸️ Verrouillé |
| **Total Idéation** | **E18, E32–E37, E39, E40 — hors backlog opérationnel** | **8** | **9** | **~45** | 📋 Voir `BACKLOG-IDEATION/` |

---

## Suivi Sprint actif

### Sprint 1 — Auth & Shell (Socle) — ✅ Terminé sauf contact

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
| **US16.3.1** | **Formulaire de contact** | 🔎 Review |

> US16.3.1 : branche `feat/us16-3-1-contact` — pivot-core + pivot-ui

### Sprint 2 — Système de modules + Auth manquant (Socle) — ✅ Terminé

| US | Titre | 🤖 Dev |
|----|-------|--------|
| EN03.1 | PivotModule interface + registre backend | ✅ |
| EN03.2 | Guard Angular moduleGuard + status API | ✅ |
| EN03.3 | Cache Redis statut modules TTL 60s | ✅ |
| EN03.4 | Contrat module frontend (TypeScript) | ✅ |
| US03.1.1 | Admin active un module | ✅ |
| US03.1.2 | Admin désactive un module | ✅ |
| US03.2.1 | UI liste modules avec statut | ✅ |
| US03.2.2 | Guard Angular bloque module désactivé | ✅ |
| US01.1.4 | Redirection post-login | ✅ |
| US01.1.5 | Expiration session + auto-logout | ✅ |
| US01.2.4 | Politique robustesse mot de passe | ✅ |

> Statuts resynchronisés le 2026-07-05 après audit du code sur `main` (pivot-core + pivot-ui) —
> voir `docs/backlog/sprints/sprint-2.md` pour le détail. Gaps techniques restants (non bloquants) : cache Redis EN03.3
> non raccordé au chemin de lecture du statut module ; champ `description` de l'API modules non
> aligné avec `PivotModule` (US03.2.1, hard block Gate 4 documenté) ; doublon `sanitizeReturnUrl`
> entre US01.1.4/US01.1.5 côté pivot-ui.

---

## Verrou Socle

**Phase active : Socle.** Seuls les items `Phase: Socle` sont implémentables.

- Modules collaboratifs E09–E15 = `phase-3` — **verrouillés**
- E17 Infrastructure multi-repo = Socle (reséquencé 2026-07-07) → 🔎 10/10 enablers mergés (Sprint 5 Vague 0) — EN17.1 clos le 2026-07-08 ([pivot-core#171](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171) fermée) · en attente de recette mainteneur
- E30 noyau F08.x/EN08.x (ex-E08 Whiteboard) = Socle, Gate 1 PO Agent passé (2026-07-07, 17/17 items Ready) → 🔎 17/17 mergés (Sprint 5 Vague 1+) · en attente de recette mainteneur
- E02/E06 = Sprint 3, mergés, en attente de recette · E04/E07 = Sprint 4, mergés, en attente de recette

Passage à `v1-enterprise` ou `phase-3` : décision explicite du mainteneur.

---

## Plan de priorisation Socle

| Priorité | Item | Phase | Statut |
|----------|------|-------|--------|
| Critical | US16.3.1 Formulaire de contact | Socle | 🔎 Review |
| Critical | E03 Système de modules (EN03.1-4 + US03.x) | Socle | ✅ Sprint 2 terminé |
| Critical | E07 Infrastructure prod (EN07.1/2/5) | Socle | 🔎 Sprint 4 — mergé, en attente de recette |
| High | E06 Administration (F06.1/F06.2) | Socle | 🔎 Sprint 3 — mergé, en attente de recette |
| High | US01.1.4/1.5 + US01.2.4 (Auth manquant) | Socle | ✅ Sprint 2 terminé |
| High | US01.4.2/1.4.3a/1.5.1 (Auth avancé — appareils, alertes, notif e-mail) | Socle | 🔎 Sprint 4 — mergé, en attente de recette |
| High | E02 Espace compte (F02.1/F02.2) | Socle | 🔎 Sprint 3 — mergé, en attente de recette |
| Medium | E04 Observabilité | Socle | 🔎 Sprint 4 — mergé, en attente de recette |
| Medium | EN-NOTIF + US03.3.1/3.2/3.3 (notifications in-app + SUPER_ADMIN plans) | Socle | 🔎 Sprint 4 — mergé, en attente de recette |
| Medium | US16.1.3 Badge notifications | Socle | 🔎 Review |
| Medium | US16.2.2 Section modules à venir | Socle | 🔎 Review |
| Critical | E17 Infrastructure multi-repo (EN17.1–10 + nginx gateway) | Socle (reséquencé 2026-07-07) | 🔎 10/10 mergés — EN17.1 clos (pivot-core#171 fermée) · en attente de recette |
| — | E30 — noyau F08.x/EN08.x (ex-E08 Whiteboard) | Socle | 🔎 17/17 mergés — Sprint 5 Vague 1+ · en attente de recette |
| — | E09–E15 Modules collaboratifs | phase-3 | ⏸️ Verrouillé |
| High | E18 Domaine Pilotage — ombrelle (ADR-008), éclaté en E21–E30 + E32–E40 | phase-3 | ⬜ Backlog |
| High | E19 Module Session (QUIZ multijoueur/POLL/WORDCLOUD/BRAINSTORM/QA/VOTE) | phase-3 | ⬜ Backlog |
| High | E20 Module Retrospective (formats rétro, dot-voting, plan action) | phase-3 · agilite | ⬜ Backlog |
| Medium | E12 MeetOps (agenda, animation reunions, compte-rendu) | phase-3 · collaboratif | ⬜ Backlog |
| Medium | E13 Cahiers de tests (cas test, campagnes, reporting qualite) | phase-3 · pilotage | ⬜ Backlog |
| Medium | E11 + velocity tracking (burndown chart, velocite sprint) | phase-3 · agilite | ⬜ Backlog |
| High | E21 Gestion des risques (profil adaptatif, scoring, 4T, IA gouvernée) | phase-3 · pilotage | ⬜ Backlog |
| High | E22 Roadmap & Planification (parité MS Project web) | phase-3 · pilotage | ⬜ Backlog |
| Medium | E23–E27 Portefeuille, ADR projet, Commande publique, Budget, OKR | phase-3 · pilotage | ⬜ Backlog |
| Medium | E28 Intégration open source (adaptateurs OSS + natif coexistants) | phase-3 | ⬜ Backlog — dépend ADR-009 |
| Medium | E29 Workflows & Automatisation (no-code/low-code, IA/agents) | phase-3 | ⬜ Backlog |
| Medium | E30 Collaboration (whiteboard, ateliers, facilitation) | phase-3 | ⬜ Backlog |
| Medium | E38 Management de l'innovation (SMI, ISO 56002) | phase-3 · pilotage | ⬜ Backlog |
| — | E18, E32–E37, E39, E40 — EPICs benchmark sans périmètre suffisant | — | 📋 Idéation — voir `BACKLOG-IDEATION/` |
| Medium | E41 Formation & Onboarding (tours guidés, supports, présentiel) | phase-3 | ⬜ Backlog |
| Medium | E42 Pivot Forms (form-builder no-code souverain) | phase-3 | ⬜ Backlog |
| Critical | E43 Sécurité & Zero Trust (BFF/Gateway/Mesh, secrets, autorisation, SIEM) | phase-3 | ⬜ Backlog — dépend ADR-015–020 |
| Medium | E44 SignDoc (signature électronique) | phase-3 | ⬜ Backlog |
| Medium | E45 PDF Manager (Mes PDF) | phase-3 | ⬜ Backlog |
| Low | E46 Feedback (kanban public bugs/idées) | phase-3 | ⬜ Backlog |
| Low | E47 Mini-jeux collaboratifs (Bingo, Post-it Rush, Trivia Agile) | phase-3 · collaboratif | ⬜ Backlog |
| Medium | E48 Assistant IA transverse (widget contextuel du shell) | phase-3 | ⬜ Backlog |
| Medium | E49 Module To-Do (listes de tâches perso/partagées, dashboard consolidé) | phase-3 | ⬜ Backlog |
| Medium | E50 Module PI Planning (cycle PI SAFe, Program board multi-équipes) | phase-3 · agilite | ⬜ Backlog |

---

## Idéation — EPICs hors backlog opérationnel

> Déplacés dans `BACKLOG-IDEATION/` (2026-07-09) : Gate 1 non atteignable en l'état — aucun de ces EPICs ne peut passer à `Stage: Ready` sans décision explicite du mainteneur.

| EPIC | Titre | Raison |
|------|-------|--------|
| [E18](BACKLOG-IDEATION/EPIC-pilotage/README.md) | Domaine Pilotage (ombrelle) | Conteneur sans US propres — rôle documentaire uniquement |
| [E25](BACKLOG-IDEATION/EPIC-commande-publique/README.md) | Commande publique | Niche secteur public français (appels d'offres), périmètre décalé vs POC PouetPouet — D1 résolue : en idéation |
| [E32](BACKLOG-IDEATION/EPIC-ressources-temps/README.md) | Ressources & temps | Issu du benchmark CSV, section Périmètre manquante |
| [E33](BACKLOG-IDEATION/EPIC-pilotage-taches/README.md) | Collaboration & tâches (pilotage) | Idem |
| [E34](BACKLOG-IDEATION/EPIC-pilotage-ia/README.md) | IA & agents (pilotage) | Idem |
| [E35](BACKLOG-IDEATION/EPIC-pilotage-gouvernance/README.md) | Gouvernance & sécurité (pilotage) | Idem |
| [E36](BACKLOG-IDEATION/EPIC-pilotage-integration-si/README.md) | Intégration SI (pilotage) | Idem |
| [E37](BACKLOG-IDEATION/EPIC-pilotage-licences/README.md) | Licences & réversibilité (pilotage) | Idem |
| [E39](BACKLOG-IDEATION/EPIC-pilotage-chantiers/README.md) | Chantiers SI (pilotage) | Idem + item "demande-arbitrage" déclaré supprimé (ex-E31) mais toujours présent |
| [E40](BACKLOG-IDEATION/EPIC-profil-adaptation/README.md) | Profil & adaptation | Idem |

---

## Décisions ouvertes (mainteneur requis)

| # | Sujet | EPICs concernés | Impact |
|---|-------|----------------|--------|
| ~~D1~~ | ~~**Périmètre E25**~~ — **Résolu (2026-07-09)** : E25 déplacé en [BACKLOG-IDEATION](BACKLOG-IDEATION/EPIC-commande-publique/README.md). Module appels d'offres publics trop niche, décalé vs POC PouetPouet (workflow achat interne). À reprendre uniquement sur décision explicite du mainteneur. | E25 | ✅ Résolu — en idéation |
| D2 | **Chevauchement E28/E29** — frontières entre adaptateurs OSS (E28) et moteur de workflow natif (E29) non tracées dans les deux sens | E28, E29 | Clarifier avant implémentation |
| D3 | **E29 vs moteur Parcours** — E29 ne référence pas le moteur Parcours livré dans le POC (étapes typées, classification C0–C3, GCS) | E29 | Aligner ou créer l'EPIC manquant |
| D4 | **Chevauchement E48/E29** — assistant IA transverse (E48) vs chatbots connectés (E29 US29.9.4) partiellement clarifié côté E48 uniquement | E48, E29 | Compléter côté E29 |
| D5 | **Dépôt d'idée E38 vs POC Innovation** — F38.15 route *tout* dépôt d'idée via Pivot Forms (US38.15.3, par conception) alors que le POC PouetPouet capture la fiche idée de base nativement et ne route que le dépôt via challenge par formulaire | E38, E42 | Confirmer le choix Forms-driven avec le mainteneur avant Gate 1 (cf. EPIC-pilotage-innovation/README.md) |
| D6 | **Recette fonctionnelle Socle KO** — la recette bout-en-bout du 2026-07-13 ([audit-recette-fonctionnelle](../audits/audit-recette-fonctionnelle.md)) révèle **6 bloquants + 7 majeurs** sur des items déclarés `✅` / mergés : i18n éditeur whiteboard en clés brutes (E30 F08.x), OTP appareil inopérant (US01.4.1), langue connectée cassée (US02.1.2), avatar 500 (US02.1.1), SUPER_ADMIN injoignable (E06/F06.2, bloqué par E01), Prometheus KO 4/4 backends (EN04.3). Aucun `Stage` modifié (recette = mainteneur) — **ces items ne doivent pas passer `✅` en l'état.** | E01, E02, E03, E06, E16, E30, E04, E07 | Trancher le plan de correction avant recette (cf. §Recommandations de l'audit) |

---

*Dernière mise à jour : 2026-07-06 — ajout E21–E43 (sauf E31, dissous) suite au merge des branches split/pilotage, split/integration-oss, split/workflows, split/collaboration, split/agilite, split/onboarding, split/pivot-forms, split/securite et docs/taxonomie-referentiel-roles*

*Resync 2026-07-07 : Sprint 4 (E04/E07 + auth avancé + EN-NOTIF + US03.3.x + US16.1.3/16.2.2) — 16/16 items mergés sur `pivot-core`/`pivot-ui`, `Stage: Review` en attente de recette. Voir `docs/backlog/sprints/sprint-4.md` pour le détail PR par item.*

*Ajout 2026-07-08 : E44–E48 — audit de parité contre le POC PouetPouet (`FEATURES.md`/`ROADMAP.md`/`CHANGELOG.md`) ayant révélé 5 modules livrés sans EPIC : SignDoc (signature électronique), PDF Manager, Feedback, Mini-jeux collaboratifs, Assistant IA transverse. Le même audit a identifié deux décalages de périmètre à trancher séparément avec le mainteneur (hors scope de cet ajout) : E25 Commande publique décrit un module d'appel d'offres alors que le POC construit un workflow de demandes d'achat internes (PGI/LDAP externes) ; E29 Workflows ne référence pas concrètement le moteur Parcours livré (étapes typées, classification C0–C3, GCS).*

*Refinement 2026-07-08 : audit de cohérence sur les 44 EPICs (aucune promotion `Stage`/`Phase` en dehors des faits déjà actés ailleurs). Corrections objectives : E17 resynchronisé Socle (son propre README l'annonçait déjà, la synthèse ne l'avait jamais répercuté — 8/8 enablers Done, Sprint 5 Vague 0) ; E30 noyau F08.x/EN08.x resynchronisé sur le `Stage:` réel de chaque fichier (le tableau de suivi était resté à ⬜ pour les 17 items malgré le Gate 1 du 2026-07-07 et des PR déjà en Review/In progress) et son compte US corrigé (7→15 Socle, 93→101 total) ; E11 Capacity Planning resynchronisé sur son propre périmètre déclaré (3→8 Features, 5→16 US — la synthèse datait d'avant l'ajout de F11.4-F11.8) ; E18 (7→9 enablers) et E21 (—→3 enablers) resynchronisés sur leur propre tableau de suivi. E09/E10/E14 : ajout d'E17 en Dépendances (incohérent avec leur propre mention « Pré-requis EN17 »). EPIC-roadmap : correction d'une clé erronée (E03→E32 pour "Ressources & temps"). E44-E48 : ajout de sections Hors périmètre clarifiant les frontières avec E45/E29/E34 relevées par l'audit.*

*Findings identifiés mais non corrigés dans cette passe (décision produit/mainteneur requise, hors scope d'un simple fix de cohérence) — détail complet dans la PR : chevauchement E28 (adaptateur workflow OSS) / E29 (moteur natif) non tracé dans les deux sens ; chevauchement E48 (assistant transverse) / E29 US29.9.4 (chatbots connectés) partiellement seulement clarifié côté E48 ; E05 CI/CD sans section Dépendances alors qu'il chevauche EN07.5 (E07) ; E39 Chantiers SI porte encore un item "demande-arbitrage" qu'E18 déclare pourtant supprimé (ex-E31) ; E39 vs E34 chevauchement IA de pilotage non tracé ; E32 Ressources & temps ne référence pas E22 alors que F22.5 recouvre largement son objectif ; EPICs benchmark E32/E33/E34/E35/E36/E37/E40 sans section Périmètre détaillée (Gate 1 non atteignable en l'état).*

*Resync 2026-07-08 (soir) : la PR #119 avait déjà corrigé EN17.1 de `Done` → `In progress` (extraction `pivot-core-starter` très en-deçà de ce qui était affiché — `team` n'existe même pas dans le codebase, voir [pivot-core#171](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171)) mais cette correction n'avait jamais été répercutée dans `STATUS.md` (Synthèse EPICs, Verrou Socle, Plan de priorisation) ni dans `EPIC-infra-multi-repo/README.md` (§Statut global) — tous les trois affirmaient encore « 8/8 Done ». Corrigé ici. Contradiction supplémentaire résolue : `US16.3.1` (formulaire de contact) était `⬜` dans la table Sprint 1 mais `🔎 Review` dans le Plan de priorisation du même fichier — les deux fichiers de fond confirment `Review`, table Sprint 1 alignée. Tableau de suivi du noyau whiteboard (`EPIC-collaboration/README.md`) resynchronisé une seconde fois (12 Review · 2 In progress · 5 Ready · 0 Done — 5 items ont avancé Ready→Review depuis le dernier resync du même jour). Voir aussi `sprints/sprint-6.md` pour la Definition of Done Socle rédigée à cette occasion (zones-ombre.md #1).*

*Raffinement 2026-07-08 : croisement du backlog E30 Collaboration contre les 4 cahiers de
spécifications individuels du benchmark (`pivot-benchmarks/collaboration-visuelle`, en complément
du dossier de synthèse déjà exploité pour les 98 items `BL-###`). 2 écarts fonctionnels ajoutés
sous leur Feature existante — US30.1.11 Liens enrichis et lecture vidéo intégrée (cahier Microsoft
Whiteboard) et US30.4.4 Rituels récurrents (cahier FigJam) — E30 : 101→103 US. E12 MeetOps et E19
Module Session vérifiés contre le même benchmark sans écart supplémentaire identifié (couverture
déjà complète pour leur périmètre). Voir `EPIC-collaboration/README.md` §Origine pour le détail.*

*Raffinage benchmark 2026-07-08 : relecture croisée des 6 cahiers de spécifications individuels du benchmark workflows (`pivot-benchmarks/workflows/`), au-delà du dossier de synthèse déjà entièrement répercuté dans E29 (84 items `WF-###`). Deux écarts mineurs corrigés par extension d'AC existantes (`US29.7.1` credentials-centralisés : détection de credentials expirés/révoqués + reconnexion guidée, cahier IFTTT ENF-04 ; `US29.7.6` inventaire-propriétaires : transfert explicite de propriété, cahier Zapier §2.2). Un écart réel identifié hors CSV initial : `US29.1.8` édition collaborative temps réel de l'éditeur de workflows (cahier Power Automate EF-RPA-04, mentionné uniquement pour le RPA mais généralisable — absent du dossier de synthèse car ne portant que sur un seul outil). E29 : 78 → 79 US (compte mis à jour ci-dessus). Aucune décision d'architecture prise unilatéralement : la note d'implémentation de `US29.1.8` marque explicitement le choix du modèle de synchronisation temps réel (OT centralisée vs CRDT) comme « à valider par le mainteneur ».*

*Nettoyage backlog 2026-07-09 : E18, E32–E37, E39, E40 déplacés dans `BACKLOG-IDEATION/` (dossiers hors backlog opérationnel) — Gate 1 non atteignable en l'état (section Périmètre manquante, ACs insuffisantes). E18 est un conteneur documentaire sans US propres ; E32–E40 sont des EPICs générés depuis un CSV benchmark PPM sans raffinement suffisant. 4 décisions ouvertes tracées dans §Décisions ouvertes (E25 périmètre, E28/E29 chevauchement, E29/Parcours, E48/E29). Liens relatifs mis à jour dans EPIC-pilotage/README.md, EPIC-roadmap/README.md, EPIC-portefeuille/README.md, EPIC-budget/README.md, sprints/zones-ombre.md.*

*Nettoyage backlog 2026-07-09 (2e passe) : E25 déplacé en BACKLOG-IDEATION. F28.6/28.9/28.10/28.11 (E28), F29.10/29.14 (E29), F38.14/US38.13.2/US38.13.4/US38.7.1/EN38.2 (E38), US23.2.9/23.2.10 (E23), US26.2.2/26.2.4/26.2.5/26.2.6 (E26), US30.14.3/30.14.5 (E30), US41.5.14 (E41) déplacés en BACKLOG-IDEATION — doublons, hors domaine, niche secteur public, ou trop spéculatif.*

*Ajout 2026-07-10 : audit de parité contre le POC PouetPouet, borné aux releases postérieures au
dernier audit du même type (2026-07-08, `c62a710`, qui couvrait le CHANGELOG jusqu'à v0.28.1 —
28 versions). Quatre releases livrées depuis (v0.29.0 à v0.32.0) comparées à `ROADMAP.md`/
`CHANGELOG.md` puis croisées au backlog existant :*

- *v0.30.0 Module To-Do (listes perso/partagées, dashboard consolidé) et v0.31.0 Module PI
  Planning (cycle PI SAFe, Program board multi-équipes) — **aucune EPIC existante ne les
  couvrait** → **E49** et **E50** créées (gabarit standard E44-E48 : README + Features + US stubs
  phase-3, Gate 1 PO Agent à faire au démarrage du sprint).*
- *v0.29.0 Module Innovation (fiches idée, challenges/jury/scoring, gamification, rattachement
  organisationnel hybride LDAP+hiérarchie interne) — **E38 SMI existait déjà et couvrait
  l'essentiel** (gamification US38.10.1/38.10.2, challenges/dépôt Forms US38.15.3, schéma
  extensible US38.15.4) à l'exception du rattachement organisationnel hybride, absent → nouvelle
  **F38.16/US38.16.1**. Écart d'architecture noté en **D5** ci-dessus plutôt que résolu
  unilatéralement (le choix Forms-driven d'E38 est documenté et justifié, mais diverge de
  l'implémentation de référence du POC).*
- *v0.31.0 Formulaires génériques (destinataires nommés + lien personnel, relances
  manuelles/automatiques paramétrables), livrés pour les besoins de PI Planning — absents de
  F42.3 → **US42.3.4/US42.3.5** ajoutées (E42 : 32→34 US).*
- *v0.32.0 Import Klaxoon revu (dépôt direct du `.klx`, décompression/repérage d'activités
  automatiques, fidélité de conversion améliorée — zones→cadres, post-its image, dessins au
  brush, champs personnalisés depuis les catégories/dimensions Klaxoon, annulation d'import,
  placement anti-collision) — **EN30.13 existant décrivait l'ancienne méthode** (décompression
  manuelle par l'utilisateur) → enabler mis à jour en place, pas de nouvel item.*
- *v0.32.0 "Confort des boards" (texte proportionnel à la carte, dézoom dynamique selon le
  contenu, redimensionnement d'une sélection multiple/groupe par cadre englobant, navigation au
  clic droit) — raffinements du noyau **F08.x/EN08.x (Socle, 17/17 Done au 2026-07-09)**, non
  couverts par les 17 items déjà clos → **US08.3.4 à US08.3.7** ajoutées en `Stage: Backlog`,
  net-new, sans remettre en cause le 17/17 Done (voir `EPIC-collaboration/README.md`).*

*Total : 2 EPICs créées (E49, E50 : 6 Features, 7 US), 1 Feature + 1 US ajoutées à E38, 2 US
ajoutées à E42, 1 enabler mis à jour (EN30.13, sans nouvel item), 4 US ajoutées au noyau Socle
E30/F08.3. Une décision d'architecture nouvellement identifiée tracée en D5, à trancher avec le
mainteneur avant Gate 1 d'E38/F38.15.*

*Re-tri sprints Pilotage 2026-07-10 (Scrum Master + PO Agent + Architecte Modules) — « valeur
pilotage avant idéation ». Objectif : ordonnancer tout le pilotage à forte valeur avant les items
d'idéation qui bloquaient son démarrage. Décision d'architecture pivot validée par le mainteneur :
**découpler E40 (profil adaptatif) de la roadmap** via un nouvel enabler net-new **EN18.10 (profil
d'organisation par défaut, altitude fixe)** — le couplage roadmap→profil est mou (curseur d'altitude
et activation de features seulement). Changements de séquencement (fichiers `sprints/` uniquement,
aucun renommage d'EPIC/US, aucune promotion de `Stage`) :*
- ***Sprint 9** recentré « Socle technique Pilotage + Roadmap v0 » : sortie d'US40.1.1-6 (E40) et
  d'EN18.3-8 (habillage entreprise) ; conservés EN18.1/18.2/18.9 (socle technique, à extraire de
  `BACKLOG-IDEATION/EPIC-pilotage` + Gate 1 comme 1re action) + EN18.10 (net-new) + EN22.1/22.2 +
  US22.3.x.*
- ***Sprint 13** créé — satellites Pilotage à valeur (E24 ADR projet, E26 Budget socle, E27 OKR socle,
  E23 vague 2 US23.2.3/2.5/2.6) remontés de `backlog-post-s12.md`, avant la queue idéation.*
- *Sprints 10/11/12 inchangés au fond (aucune dépendance E40/EN18.3-8) ; entêtes de verrou
  actualisés (verrou Socle levé 2026-07-10). Section README « Sprints 7–12 » → « 7–13 ».*
- *Reséquencés en **queue idéation** (`backlog-post-s12.md` §Queue idéation, promotion = décision
  mainteneur) : **E40** profil adaptatif (se greffera sur EN18.10) et **E18 EN18.3-8**. L'extraction
  physique des fiches EN18.1/18.2/18.9 hors de `BACKLOG-IDEATION` n'a pas été pré-exécutée ici (risque
  de liens Docusaurus cassés, cf. commit `f26f4ab`) : elle est cadrée comme 1re action de Sprint 9,
  PR dédiée avec `npm run build` vert.*

*Resync Sprint 5 (2026-07-11) — formulation uniquement, **aucun `Stage` frontmatter touché**
(recette = mainteneur, jamais Claude). Les résumés (synthèse E17/E30, Verrou Socle, Plan de
priorisation) et la ligne Sprint 5 de `sprints/README.md` affirmaient encore « Vague 0 7/8,
EN17.1 In progress (`pivot-core#171`), Vague 1+ en cours / 0/17 Done » — état antérieur au
2026-07-08. Réalité (source : `sprints/sprint-5.md`, resynchronisé le 2026-07-09 depuis le
frontmatter réel) : **Vague 0 = 10/10 enablers mergés** (EN17.1 clos le 2026-07-08, 8/8 volets
`db`/`modules`/`tenant`/`team`/`auth`, `pivot-core#171` fermée) et **Vague 1+ = 17/17 items
mergés**. Le Sprint 5 est **dev-terminé, en attente de recette mainteneur** — les fiches restent
`Stage: ⬜` tant que la recette n'est pas actée (EN17.1/17.2/17.5 déjà `✅` = déjà recettés). Le
compte d'enablers E17 corrigé 8→10 (EN17.9/17.10 ajoutés en cours de sprint, jamais répercutés
dans la synthèse). Aucune promotion de statut de recette, aucun changement de périmètre.*

*Refonte Sprint 14 — programme de raffinage 2026-07-12 (PO Agent + Scrum Master + Architecte Modules,
à la demande du mainteneur) : le Sprint 14 « Cockpits DSI » est **remplacé** par le lancement d'un
programme de **clarification des domaines** — nouvelle EPIC **E52** (3 enablers framework + 9 fiches de
domaine Socle en Vague 1). Objectif : rendre chaque domaine déjà livré parfaitement clair sur 4 axes
(entités & CRUD · accès par profil utilisateur · mécanisme d'accès · API externes & sources de
données). Programme multi-sprint : Vague 1 Socle (S14), Vague 2 Pilotage (S15), Vague 3
Agilité/Collaboratif + synthèse transverse (S16). Livrables documentaires dans
`docs/architecture/domaines/` — aucun code, les écarts détectés (droit non appliqué serveur, source
non tracée) sont des findings à arbitrer. **E51 Cockpits DSI** n'est pas supprimée : l'EPIC reste
intacte, reséquencée en [backlog post-S12](sprints/backlog-post-s12.md) (queue non planifiée), à
replanifier après la vague de raffinage. Aucun `Stage` frontmatter d'un item existant touché.*

*Complétion 100 % Pilotage & Risques — 2026-07-13 (PO Agent + Scrum Master + Architecte Modules, à la
demande du mainteneur : « modifie les sprints de 14 à N pour inclure 100 % des domaines Pilotage et
Risques »). Les sprints **S14→S33** sont créés pour planifier l'intégralité des **282 items restants**
des domaines **Pilotage (E18)** et **Risques (E21)**, dans l'ordre de priorité imposé **E18 base →
E22 Roadmap → E27 OKR → E38 Innovation (en surplus)**, E21 Risques placé juste après la base E18,
satellites (E23/E24/E26/E13) intercalés en S30. Détail du séquencement : [sprints/README §Complétion
Pilotage & Risques](sprints/README.md). Le **programme de raffinage E52** (ex-S14) est **repoussé
après S33** (S34 Vague 1 Socle, S35 Pilotage, S36 Agilité/synthèse). Aucun `Stage` frontmatter d'un
item existant touché ; les items planifiés restent `⬜` (Gate 1 READINESS au démarrage de chaque
sprint).*

*Recette fonctionnelle Socle 2026-07-13 : première recette **bout-en-bout en conditions réelles**
(stack Docker en marche, Playwright, 4 agents parallèles + reprise manuelle du parcours whiteboard)
des items du Socle déclarés faits, contre le POC de référence PouetPouet. Résultat consigné dans le
nouvel [audit-recette-fonctionnelle](../audits/audit-recette-fonctionnelle.md) (score 5/10) et tracé
en **décision ouverte D6** ci-dessus : **6 bloquants + 7 majeurs** sur des items `✅`/mergés. Le
symptôme signalé par le mainteneur (« titres de boutons KO type `whiteboard.board.untitled` ») est
**reproduit** dans l'éditeur whiteboard au sein du shell — cause : clés absentes des catalogues i18n
et dérive de version entre la lib publiée `@pivot-platform/collaboratif-ui@0.2.0` et les fichiers de
traduction, sur fond d'un bug systémique `transloco.translate()` synchrone (aussi visible sur le
guard de module `modules.guard.names.whiteboard`, `nav.theme_to_dark`, `nav.notifications`, la grille
de modules). Plusieurs features `✅ Done` sont codées mais **branchées nulle part** (partage
whiteboard US08.2.3, changement d'e-mail US02.2.2, sessions US02.2.3, suppression compte RGPD
US02.2.4). **Aucun `Stage` modifié** (recette = mainteneur) — ces items ne doivent pas passer `✅`
avant correction. Correction positive au passage : E17 `pivot-core-starter` est publié **et déjà
consommé** par `pivot-collaboratif-core`/`pivot-agilite-core` (la note « aucun module ne consomme
encore » était obsolète).*
