# Sprint 19 — Agilité — Rétrospective + PI Planning

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E20 Rétrospective + E50 PI Planning. **Sortie** : rétrospective d'équipe
> complète (formats prédéfinis/custom, animation temps réel par phases, plan d'action suivi
> inter-session) et cycle PI Planning SAFe (itérations, équipes du Train, Program Board
> multi-équipes avec dépendances) livrés.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : E20 s'appuie sur E03 Système de modules + E17 Infrastructure multi-repo
> (EN17.1/EN17.3/EN17.5/EN17.6) + E15 Équipes transverses (livré S17). E50 s'appuie sur E01 Auth &
> IAM + E03 + E17. Couplage avec **E11 Capacity Planning** (cadence PI SAFe, `US11.5.1`, livré
> seulement en **S21**) **tranché au Gate 1** : `US50.1.1` génère sa cadence de façon autonome
> (cadence par défaut découplée), aucune dépendance dure sur `US11.5.1` — voir §État réel E50 et
> `US50.1.1` §Architecture. `US20.1.2` (US mère XL) a été décomposée en
> `US20.1.2a/b/c` (Gate 1 PO Agent, 2026-07-10) — le fichier `US20.1.2` original n'est pas
> implémenté, seules les trois sous-US le sont.
>
> **Statut** : 🔎 en cours (réconcilié 2026-07-22) — **Gate 1 READINESS réalisé sur le lot E50
> retenu** (`US50.1.1`, `US50.3.1`, `US50.3.2` — voir §État réel E50). `US50.2.1`/`EN50.1` restent
> `⬜ bloqués` (dépendances hors plan, voir §État réel E50) ; `EN20.3` bloqué même pattern. E20
> Rétrospective : voir la reconciliation dédiée (`pivot-docs#298`, en attente de fusion).

## Items (13)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US20.1.1 | Créer une session de rétrospective | M | High | ⬜ |
| US20.1.2a | Contribution & révélation des cards | M | High | ⬜ |
| US20.1.2b | Phase Vote (dot-voting) | M | High | ⬜ |
| US20.1.2c | Phase Action (transition en session) | S | High | ⬜ |
| US20.2.1 | Formats de rétrospective prédéfinis et format custom | M | Medium | ⬜ |
| US20.3.1 | Créer et assigner des actions issues de la rétrospective | M | High | ⬜ |
| US20.3.2 | Revoir les actions de la rétro précédente au démarrage | S | Medium | ⬜ |
| EN20.3 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ **bloqué** — dépend d'EN28.14, non planifié |
| US50.1.1 | Créer un cycle PI avec itérations et équipes du Train | L | Medium | 🔧 Gate 1 fait — implémentation à faire |
| US50.2.1 | Rattacher formulaire de logistique et tâches de préparation | M | Medium | ⬜ **bloqué** — dépend d'E42 Pivot Forms (hors plan S17→S31) et E49 Module To-Do (hors plan), aucun code sur ces deux modules |
| US50.3.1 | Planifier le Program Board par équipe × itération | L | Medium | 🔧 Gate 1 fait — implémentation à faire, dépend d'US50.1.1 |
| US50.3.2 | Gérer les dépendances entre tickets du Program Board | M | Medium | 🔧 Gate 1 fait — implémentation à faire, dépend d'US50.3.1 |
| EN50.1 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ **bloqué** — dépend d'EN28.14, même situation qu'EN20.3/EN09.2/EN15.7/EN10.1/EN14.1 |

## État réel — E50 PI Planning (Gate 1, 2026-07-22)

> **Périmètre retenu** : sur les 5 items E50, seuls `US50.1.1`, `US50.3.1`, `US50.3.2` sont
> implémentables ce sprint (décision mainteneur, 2026-07-22) :
>
> - `US50.2.1` (intégrations Forms/To-Do en un clic) dépend de **E42 Pivot Forms** — retiré
>   explicitement du plan S17→S31 lors du recentrage post-extraction Pilotage — et **E49 Module
>   To-Do** — module `todo` distinct, jamais planifié dans la séquence Agilité/Collaboration.
>   Aucun code n'existe pour ces deux modules. Laissé `⬜ bloqué` plutôt que retiré silencieusement.
> - `EN50.1` (KPI) : bloqué sur EN28.14, non implémenté et non planifié — même traitement que
>   `EN20.3` (ci-dessus), `EN09.2`/`EN15.7` (S17), `EN10.1`/`EN14.1` (S18).
>
> **Cadence PI découplée de Capacity Planning** : `US50.1.1` dépendait dans le stub d'origine
> d'`US11.5.1` (cadence PI SAFe, Capacity Planning), livré seulement en **S21**. Décision Gate 1
> (voir `US50.1.1` §Architecture) : génération d'itérations **autonome** (`iterationCount`/
> `iterationWeeks` fournis à la création, calcul pur), aucun couplage avec Capacity Planning au
> socle — `US50.1.1` n'a donc plus de dépendance dure sur `US11.5.1`.
>
> **Modèle d'accès Train** : PIVOT n'a pas de mécanisme de partage nominatif par ressource
> (contrairement au `ModuleShare` du POC de référence PouetPouet) — retenu : créateur du cycle
> et tout membre d'une équipe du Train importée depuis `public.teams`, même principe que
> Rétro/Standup/Roue (« tout membre = gestion possible », pas de rôle SAFe RTE/Scrum Master dédié
> au niveau plateforme).
>
> **Program Board sans temps réel WebSocket** : conforme à l'EPIC (`EPIC-pi-planning/README.md`
> §Hors périmètre socle, "Temps réel Socket.io sur le Program board" explicitement candidat v2) —
> API REST classique + rafraîchissement manuel/mise à jour optimiste côté frontend, pas de
> `PiDestinations`/`PiChannelInterceptor`.
>
> **Anti-cycle des dépendances** (`US50.3.2`) : PIVOT n'a pas encore de module Roadmap implémenté
> (`E-roadmap` reste au stade backlog) — l'algorithme de référence retenu est celui du POC
> PouetPouet (`wouldCreateDependencyCycle`/`pi-board.routes.ts`, lui-même adapté de
> `validateDeps`/`roadmap.routes.ts`) : DFS de détection d'atteignabilité avant insertion d'une
> arête.
>
> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
