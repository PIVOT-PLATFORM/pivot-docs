# Sprint 8 — Pilote multi-repo (agilité) + enforcement taxonomie

> ⏸️→🚀 **Verrou levé (2026-07-10) :** déclaration « Socle terminé » actée (Sprint 6). Sprint 7
> (gouvernance ADR) terminé — ADR-023 (catalogue) et ADR-024 (forks) notamment, pertinents pour ce
> sprint, Accepté. Démarré en solo (Sprint 9 volontairement pas en parallèle — voir §Séquencement
> du README des sprints : valider les templates satellites sur l'agilité avant d'engager Pilotage).

**Scope :** premiers modules satellites sur `pivot-agilite-*` — périmètres volontairement petits pour valider les templates EN17.5/6 avant d'engager le domaine Pilotage
**Sortie :** 1er repo satellite en prod + retour d'expérience sur les templates

> **Préparation PO Agent (2026-07-10) :** toutes les US ci-dessous étaient des stubs phase-3
> (« ACs à détailler par PO Agent lors de Gate 1 ») — Gate 1 (AC complètes Given/When/Then +
> erreur + sécurité) réalisé par l'agent d'implémentation de chaque US, pas en amont ici.
> Deux corrections apportées avant lancement :
> - **EN09.1** (isolation WebSocket room Scrum Poker) manquait du tableau alors que US09.2.1 en
>   dépend explicitement — ajouté ci-dessous, même précédent qu'EN08.1 au Sprint 5.
> - **US20.1.2** (XL) décomposée en **US20.1.2a/b/c** (contribution & révélation / vote / action)
>   avant toute implémentation — même précédent que US08.3.2 (whiteboard) au Sprint 5.

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| EN09.1 | Isolation WebSocket room Scrum Poker | S | Critical | ⬜ |
| US09.1.1 | Créer une room de planning poker | M | High | 🟡 frontend mergé ([pivot-agilite-ui#23](https://github.com/PIVOT-PLATFORM/pivot-agilite-ui/pull/23), Gate 4 100/100) · backend PR ouverte, `needs-human-review` ([pivot-agilite-core#26](https://github.com/PIVOT-PLATFORM/pivot-agilite-core/pull/26)) — Gate 4 100/100, CI verte, mais hard block CLAUDE.md sur l'ajout de `pivot-core-starter` (première dépendance de ce repo vers ce package), jamais de merge autonome quel que soit le score |
| US09.1.2 | Rejoindre une room via code | S | High | ⬜ |
| US09.2.1 | Voter sur un ticket en temps réel | M | High | 🟡 Gate 1 AC 100/100 ([pivot-docs#198](https://github.com/PIVOT-PLATFORM/pivot-docs/pull/198), non fusionnée — pas bloquant, recette humaine restante) · backend fusionné ([pivot-agilite-core#42](https://github.com/PIVOT-PLATFORM/pivot-agilite-core/pull/42), Gate 4 100/100, 477 tests, merge admin — incident CI `ci.yml` `pull_request` documenté en commentaire, même incident que #33/#35/#36, rebase sur US09.3.1/US20.1.2b avec conflit réel résolu sur `PokerFacilitatorOnlyException`/`TicketFacilitatorOnlyException`) · frontend fusionné ([pivot-agilite-ui#37](https://github.com/PIVOT-PLATFORM/pivot-agilite-ui/pull/37), Gate 4 100/100, 269 tests, CI 100% verte, merge admin — contrainte d'auto-approbation) — 🤖 Dev des deux repos passé à `✅`, recette humaine (Stage frontmatter US) restante |
| US09.2.2 | Révéler les votes et calculer le consensus | S | High | ⬜ |
| US09.3.1 | Participer anonymement (sans compte) | M | Medium | ⬜ |
| US14.1.1 | Créer et gérer une roue de tirage | M | High | 🟡 frontend mergé ([pivot-agilite-ui#19](https://github.com/PIVOT-PLATFORM/pivot-agilite-ui/pull/19), Gate 4 100/100) · backend PR ouverte, `needs-human-review` ([pivot-agilite-core#27](https://github.com/PIVOT-PLATFORM/pivot-agilite-core/pull/27)) — hard block CLAUDE.md sur l'ajout de `pivot-core-starter`, jamais de merge autonome quel que soit le score |
| US14.2.1 | Effectuer un tirage pondéré anti-repeat | M | High | ⬜ |
| US14.3.1 | Diffusion du résultat en temps réel (WebSocket) | M | High | ⬜ |
| US20.1.1 | Créer une session de rétrospective | M | High | ✅ |
| US20.1.2a | Contribution & révélation des cards *(ex-US20.1.2, décomposée)* | M | High | ⬜ |
| US20.1.2b | Phase Vote (dot-voting) *(ex-US20.1.2, décomposée)* | M | High | ⬜ |
| US20.1.2c | Phase Action (transition en session) *(ex-US20.1.2, décomposée)* | S | High | ⬜ |
| US20.2.1 | Formats de rétro prédéfinis + custom | M | Medium | ⬜ |
| US20.3.1 | Créer et assigner des actions de rétro | M | High | ⬜ |
| US20.3.2 | Revoir les actions de la rétro précédente | S | Medium | ⬜ |
| TAXO-1 | Merge `check-taxonomie.mjs` + câblage `lint:taxonomie` en CI | S | High | ✅ — déjà fait (`scripts/check-taxonomie.mjs` existe, `npm run lint`/`docs-checks.yml` le lancent, vérifié 2026-07-10) |
| TAXO-2 | Backfill champ `Rôle:` sur ~700 US/EN (résolution vers le référentiel) | M | High | ⬜ |

> **Parallélisable par vagues** (dépendances intra-epic) :
> - **Vague 1** (aucune dépendance) : EN09.1 ‖ US09.1.1 ‖ US14.1.1 ‖ US20.1.1 ‖ TAXO-2
> - **Vague 2** : US09.1.2 (← US09.1.1) ‖ US14.2.1 (← US14.1.1) ‖ US20.2.1 (← US20.1.1) ‖ US20.1.2a (← US20.1.1)
> - **Vague 3** : US09.2.1 (← US09.1.2, EN09.1) ‖ US09.3.1 (← US09.1.2) ‖ US14.3.1 (← US14.2.1) ‖ US20.1.2b (← US20.1.2a)
> - **Vague 4** : US09.2.2 (← US09.2.1) ‖ US20.1.2c (← US20.1.2b)
> - **Vague 5** : US20.3.1 (← US20.1.2c)
> - **Vague 6** : US20.3.2 (← US20.3.1)
>
> E09 ‖ E14 ‖ E20 restent parallélisables entre eux à chaque vague (même repo `pivot-agilite-*`,
> périmètres disjoints) ‖ TAXO-2 indépendant (pivot-docs).
>
> **US20.1.1 — statut détaillé (item réparti sur deux repos) :** frontend (`pivot-agilite-ui`)
> livré — PR [`pivot-agilite-ui#18`](https://github.com/PIVOT-PLATFORM/pivot-agilite-ui/pull/18)
> (`RetroApiService`, formulaire de création, route `retro/create`, i18n fr/en, tests Vitest +
> Playwright). Backend (`pivot-agilite-core`) livré — PR
> [`pivot-agilite-core#28`](https://github.com/PIVOT-PLATFORM/pivot-agilite-core/pull/28)
> (`POST`/`GET /retro/sessions`, `GET /retro/sessions/join/{joinCode}`, schéma Flyway
> `retro_sessions`/`retro_cards`, EN08.3 auth, 83 tests, coverage 96,6 %) — issue
> [`pivot-agilite-core#24`](https://github.com/PIVOT-PLATFORM/pivot-agilite-core/issues/24)
> fermée à la fusion de cette PR. 🤖 Dev de la ligne ci-dessus passé à `✅` : les deux repos sont
> désormais livrés (implémentation + tests Dev Agent complets des deux côtés) — reste la revue/
> fusion humaine de chaque PR, `Stage` frontmatter de l'US reste `⬜` jusqu'à la recette
> mainteneur (§5 de ce backlog).
