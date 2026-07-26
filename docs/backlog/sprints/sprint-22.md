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
> **Statut** : 🔎 en cours (réconcilié 2026-07-23) — **Gate 1 READINESS réalisé sur les 12 items
> réels** (voir §État réel). `EN19.4` reste `⬜ bloqué` sur `EN28.14`, même pattern que tous les
> autres enablers KPI de la séquence S17→S31. `EN19.1`/`EN19.2` sont posés dans les notes
> d'implémentation d'`US19.1.1`/`US19.1.2` (pas de fichier AC séparé) ; `EN19.3` s'avère déjà
> **quasiment acquis** (garde de module et route placeholder déjà en place, voir §État réel).

## Items (13)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US19.1.1 | Créer une session live | M | Critical | 🔧 Gate 1 fait — implémentation à faire |
| US19.1.2 | Démarrer, mettre en pause et terminer une session live | M | Critical | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.1.1 |
| US19.2.1 | Rejoindre une session via code court (authentifié ou anonyme) | M | Critical | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.1.1 |
| US19.2.2 | Vue participant en temps réel (affichage adapté au type d'activité) | XL | Critical | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.2.1 + toutes les US19.3.x |
| US19.3.1 | Activité QUIZ — quiz interactif réseau multijoueur | L | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.1.2 |
| US19.3.2 | Activité POLL — sondage instantané avec résultats temps réel | M | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.1.2 |
| US19.3.3 | Activité WORDCLOUD — nuage de mots collaboratif | M | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.1.2 |
| US19.3.4 | Activité BRAINSTORM — post-its virtuels collaboratifs | M | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.1.2 |
| US19.3.5 | Activité Q&A — questions des participants avec upvotes | M | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.1.2 |
| US19.3.6 | Activité VOTE — prise de décision structurée (Fist-to-Five / pondéré / matrice) | L | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.1.2 |
| US19.4.1 | Afficher les résultats de la session en temps réel (vue animateur) | L | High | 🔧 Gate 1 fait — implémentation à faire, dépend de toutes les US19.3.x |
| US19.4.2 | Exporter les résultats d'une session terminée | M | Medium | 🔧 Gate 1 fait — implémentation à faire, dépend d'US19.4.1 |
| EN19.4 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ **bloqué** — dépend d'EN28.14, même situation qu'EN09.2/EN15.7/EN10.1/EN14.1/EN20.3/EN50.1/EN11.2 |

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
