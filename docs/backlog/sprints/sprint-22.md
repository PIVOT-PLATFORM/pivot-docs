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
| US19.4.2 | Exporter les résultats d'une session terminée | M | Medium | ⬜ |
| EN19.4 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |

> **Légende 🤖 Dev** : `⬜` non démarré · `🔵 FE` vue frontend livrée et mergée sur `pivot-ui:main`,
> backend `pivot-core` et/ou recette mainteneur en attente · `✅` Done (recette mainteneur — jamais posé par Claude).

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
| US19.1.1 | Créer / lister une session | [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) | `8581c9d` | _(à figer — reste à faire)_ |
| US19.1.2 | Runner : cycle de vie | [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) | `8581c9d` | _(à figer — reste à faire)_ |
| US19.2.1 | Join via code court | [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) | `8581c9d` | _(à figer — reste à faire)_ |
| US19.4.1 | Résultats temps réel (animateur) | [#282](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/282) | `76cfba8` | [`us19-4-1-resultats-temps-reel`](pathname:///pivot-docs/specs/EPIC-module-session/us19-4-1-resultats-temps-reel) |

**US19.4.1 (#282)** — remplace le placeholder de résultats par la vue animateur : chargement
autoritaire (`getSession`), snapshot par type + temps réel sur le topic STOMP partagé (POLL barres %,
WORDCLOUD nuage ∝ fréquence, Q&A trié + badge répondu, BRAINSTORM groupé par catégorie, VOTE
mode-aware, QUIZ leaderboard + taux/question), mode projection. Deux lectures REST additives
(`getPollResults`, `listWordcloudWords`) pour hydrater les activités _event-sourced_. Le placeholder
et son test sont supprimés. Après ce PR, le module Session live est **fonctionnellement complet côté
frontend**.

### Reste à faire

- **Backend `pivot-core`** (`fr.pivot.collaboratif.session.*`) — producteur REST/WS des activités et
  des lectures animateur (dont `getPollResults`/`listWordcloudWords` ajoutées par US19.4.1) : hors
  périmètre GitHub de la session de fusion frontend ; à merger + déployer pour un fonctionnement
  bout-en-bout. Les specs figées documentent le contrat **tel que consommé** par le client.
- **Recette mainteneur** — `Stage: ⬜ → ✅` sur chaque US après recette (jamais posé par Claude).
- **Gate 5 restant** — figer les specs des US animateur livrées au PR1 (US19.1.1 création/liste,
  US19.1.2 runner/cycle de vie, US19.2.1 join) sur le même modèle que les autres.
- **US non démarrées** — US19.4.2 (export des résultats), EN19.4 (KPI — producteur KpiRef).
- **Tier polish différé** (étude d'ergonomie) — skeletons de chargement (T5), sweep `:focus-visible`
  tokenisé (T8), copy par code d'erreur (T10), spinners de soumission (T11), urgence visuelle du timer QUIZ (T12).
