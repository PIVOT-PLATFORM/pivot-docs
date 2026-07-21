# Sprint 17 — Agilité — Scrum Poker (finition) + Référentiel Équipes

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E09 Scrum Poker + E15 Équipes. **Sortie** : planning poker finalisé et
> recetté (rooms, vote temps réel, participation anonyme, KPI) + référentiel Équipes (KPI) posé
> comme fondation cross-modules pour Capacity Planning et Rétrospective.
>
> **Note E09** : le socle Scrum Poker a déjà du code mergé récemment (parité planning poker —
> `pivot-core` #239/#240/#241, `pivot-ui` #234/#235/#236). Ce sprint est donc pour l'essentiel de
> la **finition + recette** plutôt que du net-new (`US09.1.3` jeu de cartes paramétrable et
> `EN09.1` isolation WebSocket restent hors fichier US écrit, non repris ici). Items listés
> ci-dessous quand même `⬜` — `Stage` non recetté par le mainteneur.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : E09 s'appuie sur E03 Système de modules + E17 Infrastructure multi-repo
> (acquis, socle `agilite` déjà amorcé depuis Sprint 8). E15 dépend d'E03 uniquement. E15
> (référentiel Équipes) livré ici lève un pré-requis pour E20 Rétrospective (S19) et E11 Capacity
> Planning (S20-S21), qui en dépendent tous deux.
>
> **Statut** : 🔎 en cours (réconcilié 2026-07-21) — Gate 1 READINESS déjà à 100 sur US09.2.3
> (AC figées, DoR complète, voir §État réel). **Gate 1 restant à faire** sur EN09.2/EN15.7 une fois
> leur dépendance EN28.14 levée (voir §État réel).

## Items (8)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US09.1.1 | Créer une room de planning poker | M | High | 🔎 code livré (core#239-241, ui#234-236) — recette |
| US09.1.2 | Rejoindre une room de planning poker via code | S | High | 🔎 code livré (core#239-241, ui#234-236) — recette |
| US09.2.1 | Voter sur un ticket en temps réel | M | High | 🔎 code livré — recette (écart AC : pick-then-Valider, voir §État réel) |
| US09.2.2 | Révéler les votes et calculer le consensus | S | High | 🔎 code livré, régression front **corrigée** ([ui#259](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/259)) — recette |
| US09.2.3 | Reset et revote, validation de l'estimation finale | S | High | 🔎 code livré ([core#253](https://github.com/PIVOT-PLATFORM/pivot-core/pull/253) + [ui#259](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/259)) — recette |
| US09.3.1 | Participer anonymement à une room (sans compte) | M | Medium | 🔎 code livré — recette |
| EN09.2 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ **bloqué** — dépend d'EN28.14 (contrat socle producteur KPI), non implémenté et non planifié |
| EN15.7 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ **bloqué** — même dépendance EN28.14 |

## État réel (constaté dans le code le 2026-07-21)

> **US09.1.1/US09.1.2/US09.2.1/US09.3.1** : code-complets, vérifiés dans `pivot-core`
> (`agilite/poker/`) — rooms, jonction par code, vote temps réel masqué, participation anonyme
> avec heartbeat de session invité. Recette mainteneur restante.
>
> ✅ **US09.2.2 : régression de contrat front/back résorbée** ([`pivot-ui#259`](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/259)).
> Le backend (`core#241`, "attributed reveal") envoyait `attributedVotes: {name, value}[]` alors
> que `pivot-ui` (`ticket.model.ts`/`room-board.component.ts`) attendait encore `values` — la
> liste des cartes révélées ne s'affichait jamais côté front. Corrigé avec la même PR qu'US09.2.3
> (même composant). L'attribution nominative elle-même reste un choix délibéré du mainteneur
> (2026-07-21, "classic parity" façon Klaxoon) qui amende la garantie d'anonymat écrite dans l'AC
> d'origine — **AC US09.2.2 à amender séparément** pour refléter ce choix (non fait dans cette PR).
>
> **US09.2.1** : écart mineur non bloquant — l'AC décrit un vote envoyé au clic sur la carte,
> l'implémentation ajoute une étape "Valider" (pick-then-Valider) avant envoi effectif. Choix UX
> délibéré (E09), à réconcilier avec l'AC au Gate 1 de recette.
>
> ✅ **US09.2.3 : code livré, backend + frontend.** Backend
> ([`pivot-core#253`](https://github.com/PIVOT-PLATFORM/pivot-core/pull/253), CI verte — 69/69
> tests TU+TI, Checkstyle/SpotBugs/SonarCloud Quality Gate propres) : deux endpoints
> `POST .../reset` et `POST .../finalize`, migration `V3` (colonne `final_estimate` nullable),
> deux nouvelles exceptions 409 (`TicketNotRevealedException`/`TicketAlreadyFinalizedException`).
> `GET .../recap` étend `TicketRecapEntry` avec `finalEstimate`. Frontend
> ([`pivot-ui#259`](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/259), CI verte — 471/471 tests
> Vitest, E2E Playwright, Lighthouse A11y, SonarCloud) : `TicketService.resetTicket`/
> `finalizeTicket`, actions "Relancer un vote"/"Valider l'estimation finale" sur `RoomBoardComponent`
> (sélecteur pré-rempli sur la majorité du consensus, badge "Estimation finale", compteur de resets
> en mémoire), UX inspirée de PouetPouet adaptée aux tokens `@pivot/design-system`. Même PR corrige
> la régression US09.2.2 ci-dessus.
>
> ⛔ **EN09.2/EN15.7 bloqués** : les deux enablers "Exposer les KPI du domaine" dépendent d'**EN28.14**
> (contrat socle producteur KPI — schéma `KpiRef`, endpoint `GET /api/{domaine}/kpi`, événement
> `kpi.updated`). Vérifié par grep exhaustif : **aucune implémentation de `KpiRef` n'existe dans le
> code**, sur aucun des ~38 producteurs prévus à terme, EN28.14 compris — et EN28.14 (EPIC E28
> Intégration open source) n'est planifié dans aucun sprint actif (`backlog-post-s12.md`,
> dépend d'ADR-009 accepté S7 + gouvernance forks ADR-018). Ces deux items ne sont donc **pas
> implémentables tels quels** dans ce sprint — proposition : les sortir en `Backlog` jusqu'à ce
> qu'EN28.14 soit lui-même planifié, plutôt que de les laisser `⬜` comme si le travail restait
> à portée immédiate.
>
> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
