# Sprint 18 — Agilité — Daily Standup + La Roue

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E10 Daily Standup + E14 La Roue. **Sortie** : daily standup et roue de
> tirage utilisables de bout en bout — sessions CRUD, animation temps réel (minuteur/rotation),
> statistiques, tirage pondéré anti-repeat, diffusion WebSocket du résultat.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : E10 et E14 s'appuient sur E03 Système de modules + E17 Infrastructure
> multi-repo (acquis, socle `agilite` déjà amorcé). Aucune dépendance croisée entre les deux
> domaines de ce sprint (`US10.2.3`, `US10.3.2`, `US14.1.2` restent hors fichier US écrit, non
> repris ici).
>
> **Statut** : 🔎 en cours (réconcilié 2026-07-22) — les 5 US E10 Daily Standup sont **code-complètes,
> backend + frontend mergés** ([core#255](https://github.com/PIVOT-PLATFORM/pivot-core/pull/255),
> [ui#262](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/262)) — recette mainteneur restante. E14
> La Roue est **également code-complète** (vérifié dans le code le 2026-07-22, voir §État réel) —
> recette mainteneur restante, aucun développement net-new requis. EN10.1/EN14.1 **bloqués** sur
> EN28.14 (voir §État réel), même situation que EN09.2/EN15.7 au Sprint 17.

## Items (10)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US10.1.1 | Créer une session de daily standup | M | High | 🔎 code livré (core#255 + ui#262) — recette |
| US10.1.2 | Démarrer et terminer une session daily standup | S | High | 🔎 code livré (core#255 + ui#262) — recette |
| US10.2.1 | Minuteur configurable et rotation participants (temps réel) | M | High | 🔎 code livré (core#255 + ui#262) — recette |
| US10.2.2 | Contrôler l'animation manuellement (passer, réordonner, étendre) | S | Medium | 🔎 code livré (core#255 + ui#262) — recette |
| US10.3.1 | Consulter les statistiques d'une session terminée | M | Medium | 🔎 code livré (core#255 + ui#262) — recette |
| EN10.1 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ **bloqué** — dépend d'EN28.14 (contrat socle producteur KPI), non implémenté et non planifié |
| US14.1.1 | Créer et gérer une roue de tirage | M | High | 🔎 code déjà livré (`fr.pivot.agilite.wheel` + `pivot-ui` `features/wheels/`) — recette |
| US14.2.1 | Effectuer un tirage pondéré anti-repeat | M | High | 🔎 code déjà livré (`WeightedEntrySelector`, `WheelDrawService`) — recette |
| US14.3.1 | Diffusion du résultat du tirage en temps réel (WebSocket) | M | High | 🔎 code déjà livré (`WheelDestinations`/`WheelChannelInterceptor`, WS front) — recette |
| EN14.1 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ **bloqué** — même dépendance EN28.14 |

## État réel (constaté dans le code le 2026-07-22)

> **US10.1.1 → US10.3.1 : code-complètes, backend + frontend.** Backend
> ([`pivot-core#255`](https://github.com/PIVOT-PLATFORM/pivot-core/pull/255), Gate 4 100/100, 708
> tests) : module `fr.pivot.agilite.standup` complet — CRUD session, start/next/end avec verrou
> conditionnel anti double-clic, scheduler d'expiration automatique (`StandupTimerScheduler`),
> skip/extend/reorder, stats agrégées, WS `StandupDestinations`/`StandupChannelInterceptor`.
> Frontend ([`pivot-ui#262`](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/262), Gate 4 100/100,
> 551 tests) : `features/standup/` — `standup-list`/`standup-form`/`standup-runner`/`standup-timer`
> (minuteur circulaire dérivé client, calqué sur `CircleTimer` du POC PouetPouet)/`standup-stats`,
> route `/standup` reliée au hub (évite l'orphelinage de navigation). Déviation documentée : les
> événements WS de transition ne portent qu'un payload partiel, le runner refait un `GET
> .../sessions/{id}` sur ces événements plutôt que de reconstruire l'état depuis le delta —
> comportement correct, non bloquant. Pas de vérification manuelle en navigateur (pas
> d'environnement dev conjoint backend+frontend disponible en session) — à faire en recette.
>
> ✅ **E14 La Roue : déjà 100 % code-complète, aucun gap AC trouvé** (vérification exhaustive
> US14.1.1/US14.2.1/US14.3.1 contre le code réel le 2026-07-22, pas seulement une reconduction de
> l'audit précédent). `pivot-core` `fr.pivot.agilite.wheel` : entités `Wheel`/`WheelEntry`/
> `WheelDraw`, `WheelService`/`WheelDrawService`, `WeightedEntrySelector` (pur, testé
> statistiquement sur 1000 tirages), `WheelController`, `wheel/ws/{WheelDestinations,
> WheelChannelInterceptor}`, codes d'erreur `EMPTY_WHEEL`/`INVALID_ANTI_REPEAT_MODE`/
> `INVALID_LIMIT`/`DUPLICATE_ENTRY`/`INVALID_ENTRY_TEAM_MEMBER` tous présents ; broadcast WS via
> `TransactionSynchronizationManager#afterCommit` (choix documenté, diverge délibérément du
> pattern synchrone de Rétro) ; schéma `agilite.wheel`/`wheel_entry`/`wheel_draw` dans
> `V1__schema_init.sql` conforme à l'AC (FKs, index uniques partiels, `ON DELETE`
> `SET NULL`/`CASCADE`). `fr.pivot.agilite.team.{TeamMembershipController,TeamMembershipService}`
> couvre l'AC `GET /api/agilite/teams`/`.../teams/{teamId}/members` explicitement signalée comme
> risque dans le fichier US d'origine. `pivot-ui` `features/wheels/` : `wheel-list`/`wheel-form`/
> `wheel-detail` + `services/{wheel-api,wheel-ws,wheel-error}.service.ts` — CRUD complet, spin,
> zone résultat `aria-live`, sélecteur anti-repeat, historique des tirages, reconnexion WS. Aucun
> développement restant, uniquement recette mainteneur.
>
> ⛔ **EN10.1/EN14.1 bloqués** : les deux enablers "Exposer les KPI du domaine" dépendent
> d'**EN28.14** (contrat socle producteur KPI — schéma `KpiRef`, endpoint `GET /api/{domaine}/kpi`,
> événement `kpi.updated`), exactement comme EN09.2/EN15.7 au Sprint 17 (même vérification par
> grep exhaustif reconduite : aucune implémentation de `KpiRef` dans le code). EN28.14 n'est
> planifié dans aucun sprint actif. Ces deux items ne sont donc **pas implémentables tels quels**
> dans ce sprint — même traitement que Sprint 17 : laissés `⬜ bloqué` plutôt que sortis
> silencieusement, jusqu'à ce qu'EN28.14 soit lui-même planifié.
>
> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
