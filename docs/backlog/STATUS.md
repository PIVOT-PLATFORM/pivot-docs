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
| [E17 — Infrastructure multi-repo](EPIC-infra-multi-repo/README.md) | E17 | — | 8 (EN17.1–8) | — | 🔄 7/8 Done — EN17.1 In progress (extraction `modules`/`tenant`/`auth` incomplète, `team` jamais implémenté, [pivot-core#171](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171)) |
| [E09 — Module Scrum Poker](EPIC-scrum-poker/README.md) | E09 | 3 | 1 | 5 | ⏸️ phase-3 |
| [E10 — Module Daily Standup](EPIC-daily-standup/README.md) | E10 | 3 | — | 5 | ⏸️ phase-3 |
| [E11 — Module Capacity Planning](EPIC-capacity-planning/README.md) | E11 | 8 | 1 | 16 | ⏸️ phase-3 |
| [E12 — Module MeetOps](EPIC-meetops/README.md) | E12 | 3 (F12.1–3) | 2 (EN12.1–2) | 4 | ⬜ phase-3 · collaboratif |
| [E13 — Module Cahiers de tests](EPIC-cahiers-tests/README.md) | E13 | 3 (F13.1–3) | 2 (EN13.1–2) | 5 | ⬜ phase-3 · pilotage |
| [E14 — Module La Roue](EPIC-roue/README.md) | E14 | 3 | — | 3 | ⏸️ phase-3 |
| [E15 — Équipes transverses](EPIC-equipes/README.md) | E15 | — | 2 | 2 | ⏸️ phase-3 |
| [E16 — Shell applicatif & UX](EPIC-shell-ux/README.md) | E16 | 4+extras | — | 5+extras | 🔄 Sprint 1 Done + badge notifs/modules à venir (Sprint 4, 🔎 Review) |
| [E18 — Domaine Pilotage (ombrelle)](EPIC-pilotage/README.md) | E18 | — | 9 (EN18.1–9) | — | ⬜ phase-3 — éclaté en modules E21–E30 + E32–E40 (ADR-008) |
| [E19 — Module Session](EPIC-module-session/README.md) | E19 | 5 (F19.1–4 + VOTE) | 3 (EN19.1–3) | 12 | ⬜ phase-3 |
| [E20 — Module Retrospective](EPIC-retrospective/README.md) | E20 | 3 (F20.1–3) | 2 (EN20.1–2) | 5 | ⬜ phase-3 · agilite |
| [E21 — Module Gestion des risques](EPIC-risk/README.md) | E21 | 9 | 3 | 47 | ⬜ phase-3 · pilotage |
| [E22 — Module Roadmap & Planification](EPIC-roadmap/README.md) | E22 | 8 | 3 | 47 | ⬜ phase-3 · pilotage |
| [E23 — Module Portefeuille projets](EPIC-portefeuille/README.md) | E23 | 2 | — | 12 | ⬜ phase-3 · pilotage |
| [E24 — Module ADR projet](EPIC-adr-projet/README.md) | E24 | 1 | — | 2 | ⬜ phase-3 · pilotage |
| [E25 — Module Commande publique](EPIC-commande-publique/README.md) | E25 | 1 | — | 4 | ⬜ phase-3 · pilotage |
| [E26 — Module Budget & suivi financier](EPIC-budget/README.md) | E26 | 2 | — | 8 | ⬜ phase-3 · pilotage |
| [E27 — Module OKR](EPIC-okr/README.md) | E27 | 10 | 1 | 25 | ⬜ phase-3 · pilotage |
| [E28 — Intégration open source](EPIC-integration-open-source/README.md) | E28 | 11 | 12 | 38 | ⬜ phase-3 — dépend ADR-009 |
| [E29 — Workflows & Automatisation](EPIC-workflows/README.md) | E29 | 14 | 6 | 79 | ⬜ phase-3 |
| [E30 — Collaboration](EPIC-collaboration/README.md) | E30 | 19 (dont 4 Socle, ex-E08) | 14 (dont 2 Socle, ex-E08) | 103 (dont 15 Socle, ex-E08) | ⏸️ phase-3 (noyau F08.x/EN08.x : 🔄 En cours, Sprint 5 Vague 1+) |
| [E32 — Ressources & temps](EPIC-ressources-temps/README.md) | E32 | 1 | — | 3 | ⬜ phase-3 · pilotage |
| [E33 — Collaboration & tâches (pilotage)](EPIC-pilotage-taches/README.md) | E33 | 1 | — | 4 | ⬜ phase-3 · pilotage |
| [E34 — IA & agents (pilotage)](EPIC-pilotage-ia/README.md) | E34 | 1 | — | 4 | ⬜ phase-3 · pilotage |
| [E35 — Gouvernance & sécurité (pilotage)](EPIC-pilotage-gouvernance/README.md) | E35 | 1 | — | 8 | ⬜ phase-3 · pilotage |
| [E36 — Intégration SI (pilotage)](EPIC-pilotage-integration-si/README.md) | E36 | 1 | — | 5 | ⬜ phase-3 · pilotage |
| [E37 — Licences & réversibilité (pilotage)](EPIC-pilotage-licences/README.md) | E37 | 1 | — | 5 | ⬜ phase-3 · pilotage |
| [E38 — Management de l'innovation (SMI, pilotage)](EPIC-pilotage-innovation/README.md) | E38 | 15 | 2 | 45 | ⬜ phase-3 · pilotage |
| [E39 — Chantiers SI (pilotage)](EPIC-pilotage-chantiers/README.md) | E39 | 1 | — | 10 | ⬜ phase-3 · pilotage |
| [E40 — Profil & adaptation](EPIC-profil-adaptation/README.md) | E40 | 1 | — | 6 | ⬜ phase-3 · pilotage |
| [E41 — Formation & Onboarding](EPIC-formation-onboarding/README.md) | E41 | 6 | 1 | 42 | ⬜ phase-3 |
| [E42 — Pivot Forms](EPIC-pivot-forms/README.md) | E42 | 11 | 2 | 32 | ⬜ phase-3 |
| [E43 — Sécurité & Zero Trust](EPIC-securite/README.md) | E43 | — | 13 | — | ⬜ phase-3 — dépend ADR-015–020 |
| [E44 — SignDoc (signature électronique)](EPIC-signdoc/README.md) | E44 | 3 | 1 | 4 | ⬜ phase-3 |
| [E45 — PDF Manager (Mes PDF)](EPIC-pdf-manager/README.md) | E45 | 4 | 1 | 4 | ⬜ phase-3 |
| [E46 — Feedback](EPIC-feedback/README.md) | E46 | 2 | — | 2 | ⬜ phase-3 |
| [E47 — Mini-jeux collaboratifs](EPIC-mini-jeux/README.md) | E47 | 3 | — | 3 | ⬜ phase-3 · collaboratif |
| [E48 — Assistant IA (transverse)](EPIC-assistant-ia/README.md) | E48 | 1 | 1 | 1 | ⬜ phase-3 |
| **Total Socle** | **E01–E07 + E16 + E17 + noyau F08.x/EN08.x (sous E30, ex-E08)** | **27** | **54** | **74** | 🔄 En cours |
| **Total phase-3** | **E09–E48 (sauf E17 reséquencé Socle, E31 dissous) — hors noyau F08.x/EN08.x déjà compté en Socle** | **159** | **68** | **589** | ⏸️ Verrouillé |

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
- E17 Infrastructure multi-repo = Socle (reséquencé 2026-07-07) → 🔄 7/8 enablers Done (Sprint 5 Vague 0) — EN17.1 reste `In progress` (voir détail dans la synthèse EPICs ci-dessus)
- E30 noyau F08.x/EN08.x (ex-E08 Whiteboard) = Socle, Gate 1 PO Agent passé (2026-07-07, 17/17 items Ready) → 🔄 en cours (Sprint 5 Vague 1+, 0/17 encore Done — majorité en Review)
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
| Critical | E17 Infrastructure multi-repo (EN17.1–8 + nginx gateway) | Socle (reséquencé 2026-07-07) | 🔄 7/8 Done — EN17.1 In progress (pivot-core#171) |
| — | E30 — noyau F08.x/EN08.x (ex-E08 Whiteboard) | Socle | 🔄 En cours — Sprint 5 Vague 1+, Gate 1 passé (17/17 Ready) |
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
| Low | E32–E37, E39 Ressources, tâches, IA, gouvernance, intégration SI, licences, chantiers (pilotage) | phase-3 · pilotage | ⬜ Backlog |
| Medium | E38 Management de l'innovation (SMI, ISO 56002) | phase-3 · pilotage | ⬜ Backlog |
| Medium | E40 Profil & adaptation (profil d'organisation, PPM v2 adaptative) | phase-3 · pilotage | ⬜ Backlog |
| Medium | E41 Formation & Onboarding (tours guidés, supports, présentiel) | phase-3 | ⬜ Backlog |
| Medium | E42 Pivot Forms (form-builder no-code souverain) | phase-3 | ⬜ Backlog |
| Critical | E43 Sécurité & Zero Trust (BFF/Gateway/Mesh, secrets, autorisation, SIEM) | phase-3 | ⬜ Backlog — dépend ADR-015–020 |
| Medium | E44 SignDoc (signature électronique) | phase-3 | ⬜ Backlog |
| Medium | E45 PDF Manager (Mes PDF) | phase-3 | ⬜ Backlog |
| Low | E46 Feedback (kanban public bugs/idées) | phase-3 | ⬜ Backlog |
| Low | E47 Mini-jeux collaboratifs (Bingo, Post-it Rush, Trivia Agile) | phase-3 · collaboratif | ⬜ Backlog |
| Medium | E48 Assistant IA transverse (widget contextuel du shell) | phase-3 | ⬜ Backlog |

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
