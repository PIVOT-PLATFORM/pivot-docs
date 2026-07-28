# Sprint 22 — Collaboration — Module Session (QUIZ/POLL/WORDCLOUD/BRAINSTORM/QA/VOTE)

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E19. **Sortie** : le module Session live complet — création, animation
> et clôture d'une session, participation temps réel (authentifiée ou anonyme), six types
> d'activités interactives (QUIZ/POLL/WORDCLOUD/BRAINSTORM/QA/VOTE) et restitution/export des
> résultats.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.collaboratif.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : socle `collaboratif` (STOMP temps réel, isolation multi-tenant) livré lors
> des sprints précédents du domaine Collaboration.
>
> **Statut** : 🔵 en cours — **vue participant + six types d'activités livrés côté frontend**
> (`pivot-ui:main`), backend `pivot-core` et recette mainteneur en attente. Détail :
> [§ Journal d'avancement](#journal-davancement). Gate 1 READINESS (PO Agent) réalisé au démarrage
> (DoR — AC Given/When/Then + cas d'erreur + sécurité).

## Items (13)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US19.1.1 | Créer une session live | M | Critical | 🔵 FE |
| US19.1.2 | Démarrer, mettre en pause et terminer une session live | M | Critical | 🔵 FE |
| US19.2.1 | Rejoindre une session via code court (authentifié ou anonyme) | M | Critical | 🔵 FE |
| US19.2.2 | Vue participant en temps réel (affichage adapté au type d'activité) | XL | Critical | 🔵 FE |
| US19.3.1 | Activité QUIZ — quiz interactif réseau multijoueur | L | High | 🔵 FE |
| US19.3.2 | Activité POLL — sondage instantané avec résultats temps réel | M | High | 🔵 FE |
| US19.3.3 | Activité WORDCLOUD — nuage de mots collaboratif | M | High | 🔵 FE |
| US19.3.4 | Activité BRAINSTORM — post-its virtuels collaboratifs | M | High | 🔵 FE |
| US19.3.5 | Activité Q&A — questions des participants avec upvotes | M | High | 🔵 FE |
| US19.3.6 | Activité VOTE — prise de décision structurée (Fist-to-Five / pondéré / matrice) | L | High | 🔵 FE |
| US19.4.1 | Afficher les résultats de la session en temps réel (vue animateur) | L | High | 🔵 FE |
| US19.4.2 | Exporter les résultats d'une session terminée | M | Medium | 🔵 FE |
| EN19.4 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | 🔵 BE |

> **Légende 🤖 Dev** : `⬜` non démarré · `🔵 FE` vue frontend livrée et mergée sur `pivot-ui:main`,
> backend `pivot-core` et/ou recette mainteneur en attente · `⬛ BE` enabler **backend pur** (`pivot-core`,
> aucune surface frontend) non démarré · `🔵 BE` enabler backend pur implémenté, PR ouverte (CI/recette
> mainteneur en attente) · `✅` Done (recette mainteneur — jamais posé par Claude).

## État réel (Gate 1, 2026-07-23)

> **Les 12 stubs réels ont été réécrits en AC Gate-1-complètes** (Given/When/Then, cas d'erreur,
> sécurité, A11y, notes d'implémentation backend/frontend) — voir chaque fichier US pour le détail.
> Décisions d'architecture notables :
>
> - **Pas de couplage avec le module whiteboard** (`US19.3.1` QUIZ, `US19.3.6` VOTE §Architecture) :
>   `fr.pivot.collaboratif.whiteboard.quiz`/`.vote` existent déjà (mergés, FK dure `board_id`) mais
>   une session `E19` n'est pas un board — nouvelle implémentation `session_id`-scopée pour chacun,
>   inspirée de la forme éprouvée mais sans dépendance de code croisée. Consolidation future des
>   deux moteurs quiz/vote en bibliothèque partagée notée comme candidat v2, non tentée ici.
> - **`EN19.1`/`EN19.2` posés en notes d'implémentation** d'`US19.1.1` (schéma) et `US19.1.2`
>   (isolation WebSocket, `SessionDestinations`/`SessionChannelInterceptor` calqués sur
>   `WhiteboardChannelInterceptor`) plutôt qu'en fichiers AC séparés — infrastructure directe de
>   ces deux US, pas un enabler transverse bloquant.
> - **`EN19.3` déjà quasiment acquis** (`US19.2.2` §Architecture) : `moduleGuard()` existe déjà et
>   `'session'` figure **déjà** dans `MODULE_IDS` du shell (`app.routes.ts`), routé vers
>   `ComingSoonComponent` en placeholder — même état que `whiteboard`/`agilite` avant leur bascule.
>   Il ne reste qu'à remplacer le placeholder par le vrai module (`loadSessionModule`, calqué sur
>   `loadWhiteboardModule`), pas d'infrastructure de garde à construire. Écart terminologique
>   corrigé : le moduleId réel est `'session'`, pas `'collaboratif'` comme l'écrivait le stub
>   d'origine de l'EPIC.
> - **`US19.4.2` (export) : JSON/CSV uniquement, jamais PDF** — écart entre le README de l'EPIC
>   (« PDF ou JSON ») et le fichier AC détaillé (déjà JSON/CSV avant ce Gate 1) résolu en faveur du
>   fichier AC — cohérent avec l'absence de librairie PDF dans le codebase et ADR-007.
> - **Correction de périmètre reconduite sur plusieurs fichiers** : le type `VOTE` (`US19.3.6`)
>   était omis des listes de types/dépendances de `US19.1.1`, `US19.2.2` et `US19.4.1` dans les
>   stubs d'origine — corrigé partout, 6 types couverts de façon cohérente.
>
> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.

## Journal d'avancement

> Le `Stage: ⬜` du frontmatter de chaque US reste inchangé jusqu'à la recette mainteneur ; ce journal
> et la colonne 🤖 Dev tracent l'avancement intermédiaire (protocole sprint standard).

### 2026-07-23 — Vague activités : vue participant + 6 types d'activités (frontend `pivot-ui`)

Toutes les vues participant du module Session live sont livrées et **mergées sur `pivot-ui:main`**
(squash, sans `Release-Trigger` — pas de release à ce stade). Après cette vague, `PLACEHOLDER_TYPES`
est vide : les six types d'activité résolvent un composant lazy-loadé réel.

| US | Activité | PR `pivot-ui` | Commit `main` | Spec figée (Gate 5) |
|----|----------|---------------|---------------|---------------------|
| US19.2.2 | Infra vue participant temps réel | [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) | `8581c9d` | [`us19-2-2-vue-participant`](pathname:///pivot-docs/specs/EPIC-module-session/us19-2-2-vue-participant) |
| US19.3.2 | POLL | [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) | `8581c9d` | [`us19-3-2-poll`](pathname:///pivot-docs/specs/EPIC-module-session/us19-3-2-poll) |
| US19.3.3 | WORDCLOUD | [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) | `8581c9d` | [`us19-3-3-wordcloud`](pathname:///pivot-docs/specs/EPIC-module-session/us19-3-3-wordcloud) |
| US19.3.5 | Q&A | [#272](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/272) | `d247910` | [`us19-3-5-qa`](pathname:///pivot-docs/specs/EPIC-module-session/us19-3-5-qa) |
| US19.3.4 | BRAINSTORM | [#274](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/274) | `10d763a` | [`us19-3-4-brainstorm`](pathname:///pivot-docs/specs/EPIC-module-session/us19-3-4-brainstorm) |
| US19.3.6 | VOTE (Fist / pondéré) | [#276](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/276) | `e786086` | [`us19-3-6-vote-decision`](pathname:///pivot-docs/specs/EPIC-module-session/us19-3-6-vote-decision) |
| US19.3.1 | QUIZ | [#278](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/278) | `041ad7a` | [`us19-3-1-quiz`](pathname:///pivot-docs/specs/EPIC-module-session/us19-3-1-quiz) |
| — | Balayage a11y/ergonomie (6 activités) | [#279](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/279) | `8c8c963` | _(transverse — voir spec VOTE/QUIZ)_ |
| US19.3.6 | VOTE — mode MATRICE (différé) | [#280](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/280) | `6e21016` | (inclus dans la spec VOTE) |

**Fusion en cascade** : les PR étaient empilées (fichiers partagés `session.model.ts`, `session-api.service.ts`,
shell, i18n). Chaque merge a été suivi d'un rebase réel `--onto main` de la PR suivante (drop des
commits déjà mergés), CI verte (CI/PR Checks/E2E/Security) vérifiée avant chaque fusion.

**Balayage a11y (#279)** — tier prioritaire de l'étude d'ergonomie : décompte QUIZ non annoncé par
lecteur d'écran (assertif « temps écoulé » seul), VOTE/BRAINSTORM `radio`→`aria-pressed`, noms
accessibles contextualisés Q&A/BRAINSTORM, POLL résultats en `aria-live` + barre visuelle,
suppression BRAINSTORM en deux temps, alerte over-budget VOTE, cibles tactiles 44 px.

### 2026-07-23 — Versant animateur : création / cycle de vie / join (déjà livré au PR1) + résultats

Constat en reprenant le versant animateur : la **création** (`session-form` + `session-list`), le
**cycle de vie** (`session-runner` — Démarrer/Pause/Reprendre/Terminer) et le **join code court**
(`session-join`) sont des composants réels, routés et testés, **déjà livrés au PR1** (#270) — les US
correspondantes passent donc `⬜ → 🔵 FE` (correction de suivi ; elles n'avaient pas été marquées lors
de la vague activités). Le seul manque réel du versant animateur était la **vue résultats**, qui
n'était qu'un placeholder (différé explicitement à « PR2/2 » au PR1).

| US | Vue | PR `pivot-ui` | Commit | Spec figée (Gate 5) |
|----|-----|---------------|--------|---------------------|
| US19.1.1 | Créer / lister une session | [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) | `8581c9d` | [`us19-1-1-creer-session`](pathname:///pivot-docs/specs/EPIC-module-session/us19-1-1-creer-session) |
| US19.1.2 | Runner : cycle de vie | [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) | `8581c9d` | [`us19-1-2-gerer-session`](pathname:///pivot-docs/specs/EPIC-module-session/us19-1-2-gerer-session) |
| US19.2.1 | Join via code court | [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) | `8581c9d` | [`us19-2-1-rejoindre-session`](pathname:///pivot-docs/specs/EPIC-module-session/us19-2-1-rejoindre-session) |
| US19.4.1 | Résultats temps réel (animateur) | [#282](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/282) | `76cfba8` | [`us19-4-1-resultats-temps-reel`](pathname:///pivot-docs/specs/EPIC-module-session/us19-4-1-resultats-temps-reel) |
| US19.4.2 | Export des résultats (animateur) | [#284](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/284) | `a4e22c5` | [`us19-4-2-export-resultats`](pathname:///pivot-docs/specs/EPIC-module-session/us19-4-2-export-resultats) |

**US19.4.1 (#282)** — remplace le placeholder de résultats par la vue animateur : chargement
autoritaire (`getSession`), snapshot par type + temps réel sur le topic STOMP partagé (POLL barres %,
WORDCLOUD nuage ∝ fréquence, Q&A trié + badge répondu, BRAINSTORM groupé par catégorie, VOTE
mode-aware, QUIZ leaderboard + taux/question), mode projection. Deux lectures REST additives
(`getPollResults`, `listWordcloudWords`) pour hydrater les activités _event-sourced_. Le placeholder
et son test sont supprimés.

**US19.4.2 (#284)** — export animateur des résultats d'une session `COMPLETED` : boutons Exporter
JSON / CSV → `GET /sessions/{id}/results?format=…` en blob, téléchargement navigateur ; contrôles
masqués hors `COMPLETED`, `exportError` sur échec. Le contenu formaté est produit backend.

**Bilan frontend** : avec US19.4.1 + US19.4.2, **toutes les US du sprint 22 sont livrées côté
frontend** (`🔵 FE`) ; le module Session live est **fonctionnellement complet côté `pivot-ui`**. Seul
reste **EN19.4**, un enabler **backend pur** (`⬛ BE`, `pivot-core`) sans surface frontend.

### 2026-07-24 — Backend `pivot-core` : vague activités PR2 mergée + release Sprint 22

Le producteur backend des six activités est **mergé sur `pivot-core:main`** (main vert). La vague PR2
s'appuie sur `#267` (infra Session + POLL + WORDCLOUD) et `#269` (Q&A), déjà sur `main`, puis :

| PR `pivot-core` | Activité | Migration | Commit `main` |
|-----------------|----------|-----------|---------------|
| [#271](https://github.com/PIVOT-PLATFORM/pivot-core/pull/271) | BRAINSTORM | V14 | `e708f5b` |
| [#273](https://github.com/PIVOT-PLATFORM/pivot-core/pull/273) | VOTE (Fist / pondéré) | V15 | `950ff2f` |
| [#275](https://github.com/PIVOT-PLATFORM/pivot-core/pull/275) | QUIZ | V16 | `402bff9` |
| [#276](https://github.com/PIVOT-PLATFORM/pivot-core/pull/276) | VOTE — mode MATRICE | — | `05b643a` |

**Fusion en cascade** : chaque PR **rebasée `--onto main`** (jamais de merge « behind » lossy sur
fichiers partagés), ordre de migration préservé (V15 avant V16 — Flyway sans `out-of-order` sur la
recette persistante), CI verte vérifiée avant chaque squash-merge. Deux défauts réels corrigés en
cours de route : registration SpotBugs perdue par un merge « behind » de `#269` (rétablie dans `#271`)
et une **collision de bean Spring** — les nouveaux `session.{vote,quiz}.*Controller` entraient en
conflit avec les contrôleurs homonymes du module whiteboard (nom de bean par défaut identique),
corrigée par un nom de bean explicite `sessionVoteController` / `sessionQuizController`.

**Test flaky pré-existant** hors périmètre (domaine tenant, `SuperAdminTenantIntegrationTest`) —
documenté dans [`pivot-core#277`](https://github.com/PIVOT-PLATFORM/pivot-core/issues/277) (cause
racine + correctif test-only pour le mainteneur), contourné par re-run jusqu'au vert, jamais patché à
l'aveugle.

**Release Sprint 22** — le trailer `Release-Trigger: true` a été posé sur le squash-merge marqueur
[`#278`](https://github.com/PIVOT-PLATFORM/pivot-core/pull/278) (`629c6d2`). `release.yml` a **bien
détecté le trigger** (job _Check release trigger_ vert) mais le job _Compute release version_ a
**échoué au checkout** : `SEMANTIC_RELEASE_TOKEN` (PAT) **n'est pas garni** dans les secrets du dépôt
→ `fatal: could not read Username for 'https://github.com'`. Aucune publication, aucun tag (échec
propre, pas d'état partiel). **Action mainteneur** : garnir le secret `SEMANTIC_RELEASE_TOKEN` puis
re-lancer le run `release.yml` (30082104396) — il republiera depuis `629c6d2`.

### 2026-07-25 — EN19.4 : producteur KPI Session live (backend, périmètre réduit)

[`pivot-core#280`](https://github.com/PIVOT-PLATFORM/pivot-core/pull/280) — `GET /api/collaboratif/kpi`
(liste, filtrée par rôle) + `GET /api/collaboratif/kpi/{kpiKey}?scope=…` (pull) pour les 5 KPI du
domaine (`session.sessions_run`, `session.avg_participants`, `session.participation_rate`,
`session.activities_run`, `session.completion_rate`), calculés à la demande via une requête native
unique agrégeant `session`/`session_participant`/les 6 tables d'interaction d'activité. Événement
`kpi.updated` publié via `ApplicationEventPublisher` depuis `ModuleSessionService#start`/`#end`.

**Vérification avant implémentation** : recherche exhaustive dans `pivot-core` — aucune classe
`Kpi*`, route `/kpi`, ni événement `kpi.updated` n'existait nulle part dans le repo (tous domaines
confondus). EN28.14 (contrat KPI transverse, EPIC E28) est donc resté à l'état ⬜ tel quel ; cette
PR ne le construit pas, elle reproduit uniquement la forme du schéma `KpiRef` qu'il documente, pour
ce seul domaine — décision utilisateur explicite (portée minimale plutôt que poser le socle
générique réutilisable par les ~38 autres domaines en side-effect d'un enabler de sprint). Détail
complet (dont les deux critères de complétion non atteints — `kpi.updated` non signé, conformité
EN28.14 non applicable) dans `EN19.4`'s propre fichier backlog.

CI en cours sur la PR au moment de cette entrée ; recette mainteneur en attente, comme le reste du
sprint.

### Reste à faire

- ~~**EN19.4 — Producteur KPI (`⬛ BE`, `pivot-core`)**~~ ✅ **implémenté** —
  [`pivot-core#280`](https://github.com/PIVOT-PLATFORM/pivot-core/pull/280) : `GET /api/collaboratif/kpi`
  (liste) + `GET /api/collaboratif/kpi/{kpiKey}` (pull) + événement `kpi.updated`
  (`ApplicationEventPublisher`, depuis `ModuleSessionService#start`/`#end`), pour les 5 KPI du
  domaine. **Portée volontairement réduite au domaine Session live** — EN28.14 (contrat KPI
  transverse, EPIC E28) n'a aucun code producteur dans `pivot-core` à ce jour (vérifié avant
  implémentation) ; cette PR suit la forme du schéma `KpiRef` qu'EN28.14 documente sans poser
  l'abstraction générique réutilisable par les ~38 autres domaines — voir la note « Périmètre /
  honnêteté » de la PR et le détail dans `EN19.4`'s propre fichier backlog. CI en cours, recette
  mainteneur en attente.
- ~~**Backend `pivot-core`** — producteur REST/WS des activités, lectures animateur, export~~
  ✅ **Mergé sur `pivot-core:main`** (voir journal 2026-07-24) — les six activités, le cycle de vie,
  les résultats live et l'export sont en place ; `main` vert. Les specs figées documentent le contrat
  **tel que consommé** par le client.
- **Recette mainteneur** — `Stage: ⬜ → ✅` sur chaque US après recette (jamais posé par Claude).
- **Release fin de sprint — bloquée sur infra** — trigger posé (`#278`, `629c6d2`) et **détecté** par
  `release.yml`, mais le run échoue au checkout : secret `SEMANTIC_RELEASE_TOKEN` non garni. **À faire
  côté mainteneur** : garnir le secret puis re-lancer le run `release.yml` (30082104396).
- **Tier polish différé** (étude d'ergonomie) — skeletons de chargement (T5), sweep `:focus-visible`
  tokenisé (T8), copy par code d'erreur (T10), spinners de soumission (T11), urgence visuelle du timer QUIZ (T12).
