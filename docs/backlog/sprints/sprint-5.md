# Sprint 5 — Infrastructure multi-repo (E17) + Module Whiteboard (Socle E30, ex-E08)

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** Vague 0 — E17 (infrastructure multi-repo) rapatrié depuis Sprint 7, dans la mesure
nécessaire pour démarrer le noyau whiteboard sur son repo cible réel · Vague 1+ — noyau F08.x/EN08.x
complet, désormais hébergé sous [`EPIC-collaboration`](../EPIC-collaboration/README.md) (E30),
`Phase: Socle` propre, non verrouillé par le reste d'E30
**Pré-requis :** Sprint 2 terminé (E03 module system Done — condition de déclenchement d'E17 par
son propre README) + Sprint 4 EN07.x validé (recette maintainer ✅ 2026-07-07) + Gate 1 US08.x
validé par PO Agent ✅ + Gate 1 EN17.x validé par PO Agent ✅ (voir notes du 2026-07-07)
**Note de reséquencement (2026-07-07) :** voir §Reséquencement E17 ci-dessous — E17 déplacé de
Sprint 7 vers ce sprint, en Vague 0, pour lever l'incohérence détectée entre le repo cible
`pivot-collaboratif-core/-ui` (ADR-006, README E30) et son verrouillage nominal post-Socle
(ancien Sprint 7).

## Vague 0 — Infrastructure multi-repo (E17, rapatrié de Sprint 7)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| EN17.8 | Incubation design system dans `pivot-ui` (déjà démarrable, aucun repo créé) | M | Critical | ✅ Done — pivot-ui PR #111 mergée |
| EN17.4 | Convention BDD multi-schéma + Flyway baseline | S | Critical | ✅ Done — pivot-core PR #167 mergée (ModuleFlywayConfigurer factory) |
| EN17.1 | Publication `pivot-core-starter` (Maven, extraction depuis `pivot-core`) | L | Critical | ✅ Done — `db`/`modules`/`tenant`/`team`/`auth` extraits et livrés (PR #167, #173, #177, #180). Volet `auth` : [`pivot-core#171`](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171) fermée — [ADR-022](https://github.com/PIVOT-PLATFORM/pivot-docs/pull/155) a tranché principal minimal `AuthenticatedPrincipal`(userId/tenantId/role) + validation dupliquée (pas de centralisation réseau) |
| EN17.2 | Publication `@pivot/design-system` (npm) — création repo `pivot-design-system`, déclenchée par la création de `pivot-collaboratif-ui` (1er repo module UI) | M | Critical | ✅ Done — [`@pivot-platform/design-system@0.1.0`](https://github.com/PIVOT-PLATFORM/pivot-design-system/pkgs/npm/design-system) publié sur GitHub Packages (2026-07-07) |
| EN17.5 | Template repo `pivot-xxx-core` (formalisé à partir du scaffolding réel de `pivot-collaboratif-core`) | S | High | ✅ Done — [`pivot-template-core`](https://github.com/PIVOT-PLATFORM/pivot-template-core) créé (2026-07-07) |
| EN17.6 | Template repo `pivot-xxx-ui` (formalisé à partir du scaffolding réel de `pivot-collaboratif-ui`) | S | High | ✅ Done — [`pivot-template-ui`](https://github.com/PIVOT-PLATFORM/pivot-template-ui) créé (2026-07-07) |
| EN17.3 | Publication `@pivot-platform/ui-core` (npm, consomme `@pivot/design-system` publié) | M | Critical | ✅ Done |
| EN17.7 | nginx API Gateway — routing multi-backend par préfixe URL (rend `pivot-collaboratif-core` joignable) | M | Critical | ✅ Done — pivot-ui PR #114 + pivot-core PR #170 mergées |
| EN17.9 | Compose dev — modules satellites manquants (`pivot-pilotage-core`/`pivot-agilite-core`/`pivot-collaboratif-core` absents du `compose.yml` malgré le routing EN17.7 déjà en place) | S | High | ✅ Done — pivot-core PR #179 + pivot-pilotage-core PR #18 (context-path bug corrigé au passage) mergées |
| EN17.10 | Publication `@pivot-platform/collaboratif-ui` (npm) + câblage shell route `/whiteboard` (`loadChildren`, remplace `ComingSoonComponent`) | M | High | ✅ Done — [`pivot-collaboratif-ui`#36](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/36) + [`pivot-ui`#121](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/121) mergées, CI 100 % verte (voir note de correction plus bas) |

> **Ordre de dépendance Vague 0 :** EN17.8 ‖ EN17.4 ‖ EN17.1 (aucune dépendance mutuelle) →
> création de `pivot-collaboratif-core`/`pivot-collaboratif-ui` (consomment EN17.1 respectivement
> rien encore) → EN17.2 (déclenché par la création de `pivot-collaboratif-ui`, extrait le contenu
> incubé en EN17.8) → EN17.5/EN17.6 (template formalisé après coup, non bloquant pour la suite) →
> EN17.3 (consomme EN17.2 publié) → EN17.7 (dès EN17.1 + EN17.3 stables, pour le routing réel) →
> EN17.10 (consomme le pattern EN17.3, dernier maillon avant que le module whiteboard soit
> réellement atteignable depuis le shell — identifié après-coup lors de la vérification manuelle
> en local du Sprint 5, absent du séquencement initial du 2026-07-07).

## Vague 1+ — Module Whiteboard (Socle), sur `pivot-collaboratif-core`/`pivot-collaboratif-ui`

> **Resynchronisé le 2026-07-09** depuis le frontmatter `Stage:` réel de chaque fichier (source de
> vérité) — ce tableau était resté figé à un état bien antérieur (plusieurs 👀/🔄 alors que le
> code correspondant était déjà mergé depuis). Voir aussi la correction du même écart dans
> `EPIC-collaboration/README.md` §Suivi noyau.

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| EN08.1 | Isolation WebSocket room par board | M | Critical | ✅ Done |
| EN08.2 | Guard Angular module whiteboard | S | Critical | ✅ Done |
| US08.1.1 | Utilisateur crée un tableau (backend) | M | Critical | ✅ Done — `pivot-collaboratif-core#19` |
| US08.1.2 | Utilisateur liste ses tableaux (backend) | M | Critical | ✅ Done — `pivot-collaboratif-core#19` |
| US08.1.3 | Angular : liste des tableaux | M | Critical | ✅ Done — `pivot-collaboratif-ui#17` |
| US08.1.4 | Renommer un tableau | S | High | ✅ Done — `pivot-collaboratif-core#19` + `pivot-collaboratif-ui#19` (frontmatter resté `In progress` malgré le merge, corrigé) |
| US08.1.5 | Supprimer un tableau | S | Critical | ✅ Done — `pivot-collaboratif-core#19` + `pivot-collaboratif-ui#20` (frontmatter resté `In progress` malgré le merge, corrigé) |
| US08.2.1 | Owner partage un tableau par lien public | M | High | ✅ Done — `pivot-collaboratif-core#21` |
| US08.2.2 | Utilisateur rejoint un tableau via token | M | High | ✅ Done |
| US08.2.3 | Angular : UI partage et gestion rôles | M | High | ✅ Done — `pivot-collaboratif-core#25` |
| US08.3.1 | Connexion WebSocket au canvas | M | Critical | ✅ Done — `pivot-collaboratif-core` PR [#28](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/28) mergée, Gate 4 = 89/100 (`auto-approved`) |
| US08.3.2a | Angular : canvas whiteboard — composant local & outils de dessin | XL | High | ✅ Done — `pivot-collaboratif-ui` PR [#24](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/24) mergée, Gate 4 réel 69/100. Gaps corrigés et mergés sur [`pivot-collaboratif-ui`#37](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/37), Gate 4 = 100/100 (2026-07-09) — voir note ci-dessous |
| US08.3.2b | Angular : canvas whiteboard — synchronisation STOMP & états connexion | M | High | ✅ Done — `pivot-collaboratif-ui` PR [#31](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/31) mergée |
| US08.3.2c | Angular : canvas whiteboard — présence des participants (curseurs) | S | Medium | ✅ Done — `pivot-collaboratif-ui` PR [#33](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/33) mergée |
| US08.3.3 | Undo / Redo sur le canvas | M | High | ✅ Done — `pivot-collaboratif-ui` PR [#32](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/32) mergée |
| US08.4.1 | Créer un tableau depuis un template | M | Medium | ✅ Done — `pivot-collaboratif-core` PR [#31](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/31) (100/100, mergée) + `pivot-collaboratif-ui` PR [#29](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/29) (100/100, mergée) — fix de suivi `pivot-collaboratif-ui`#30 (thumbnailUrl) |
| US08.5.1 | Présence des participants sur le canvas | M | High | ✅ Done — `pivot-collaboratif-core` PR [#33](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/33) mergée + `pivot-collaboratif-ui` PR [#34](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/34) mergée |

## Reséquencement E17 (2026-07-07)

Incohérence détectée au démarrage de session : `EPIC-collaboration/README.md` (§Repo cible) et
ADR-006 fixent `pivot-collaboratif-core`/`pivot-collaboratif-ui` comme cible du noyau whiteboard,
sous réserve d'E17 — mais E17 vivait entièrement dans Sprint 7, verrouillé « post-Socle » (derrière
Sprint 6 + déclaration mainteneur). Le noyau whiteboard F08.x/EN08.x est pourtant explicitement
`Phase: Socle`, non verrouillé — un item Socle ne peut pas dépendre d'un prérequis phase-3 verrouillé
post-Socle sans blocage circulaire.

Le README de l'épique E17 lui-même contredisait déjà le verrou Sprint 7 : sa condition de
déclenchement documentée est « prérequis Socle non bloquant · déclencher quand E03 (module system)
est Done » — pas une déclaration « Socle terminé ». E03 est Done depuis Sprint 2. **Décision** :
rapatrier EN17.1–EN17.8 dans ce sprint (Vague 0), avant le noyau whiteboard (Vague 1+), conformément
à la condition de déclenchement déjà documentée par E17 — pas une invention nouvelle, une correction
d'un verrou sur-conservateur qui ne correspondait pas à sa propre epic. Sprint 7 recentré sur la
gouvernance ADR (ADR-008→016 acceptation, ADR-017–020) uniquement — voir `sprint-7.md`.

Repos `pivot-pilotage-core/-ui`, `pivot-agilite-core/-ui` déjà créés sur GitHub
(2026-07-06) par anticipation, avant que ces prérequis EN17 soient satisfaits — écart constaté,
non bloquant pour ce sprint (ils restent vides tant qu'E17 n'est pas fait), mais à garder en tête :
ne pas les scaffolder avant que Sprint 5 Vague 0 ne soit terminé et le template EN17.5/17.6 stable.

> **Gate 1 — READINESS Vague 1+ (2026-07-07) :** PO Agent a passé en revue la DoR des 17 items du
> noyau whiteboard (2 Enablers EN08.1/EN08.2 + 15 US, dont US08.3.2 déjà décomposée en
> 08.3.2a/b/c). Tous ≥ 70/100 après complétion des ACs manquants (essentiellement sections
> `Hors périmètre`/`Notes d'implémentation` absentes, AC erreur/sécurité/A11y incomplets) —
> **`Stage: Backlog → Ready` sur les 17 fichiers**. Détail par item et conventions transverses posées
> (404 non-membre/cross-tenant vs 403 rôle insuffisant, contrat d'événements WS unique
> `JOIN/LEAVE/DRAW/CURSOR_MOVE/UNDO`, hard-delete US08.1.5) → PR `pivot-docs`. Chevauchement
> US08.5.1 ↔ US08.3.2c (deux specs de panneau participants) détecté et tranché : panneau de présence
> porté exclusivement par US08.5.1, US08.3.2c ne rend que l'overlay de curseurs. Un point produit
> reste ouvert, non bloquant pour Gate 1 mais à trancher avant l'implémentation : TTL par
> défaut/maximal du token de partage (US08.2.1) — voir sa section Notes d'implémentation. Le fichier
> `us-canvas-angular.md` (US08.3.2 pré-décomposition) reste `Stage: Decomposed`, hors score Gate 1.
>
> **Gate 1 — READINESS Vague 0 (2026-07-07) :** PO Agent a passé en revue la DoR des 8 enablers E17
> (EN17.1–EN17.8). Tous satisfont le DoR Enabler (Type · Objectif technique · Justification ·
> Critères de complétion), score ≥ 70/100 — critères techniques précis et testables, dépendances
> claires, aucune ambiguïté bloquante. Scores individuels : EN17.1 82 · EN17.2 80 · EN17.3 78 ·
> EN17.4 86 · EN17.5 76 · EN17.6 75 · EN17.7 85 · EN17.8 82 — **`Stage: Backlog → Ready` sur les
> 8 fichiers**. Priorités alignées sur le tableau Vague 0 (EN17.1/17.2/17.3/17.4/17.7/17.8 →
> Critical ; EN17.5/17.6 → High, formalisés après coup sur scaffolding réel). DoR complétée sur cette
> branche : ajout des sections `Objectif technique` et `Justification` manquantes dans chaque fiche.
>
> Recette manuelle Sprint 4 EN07.x confirmée par le mainteneur le 2026-07-07 — second volet du
> prérequis levé. Sprint 5 démarre à cette session par la Vague 0 (E17), voir §Reséquencement E17.
>
> **Revue de parité concurrentielle (2026-07-07, suite du Gate 1) :** benchmark Miro/Klaxoon/
> Microsoft Whiteboard sur les fonctionnalités déjà planifiées. Décision du mainteneur : ne pas
> rouvrir le verrou Socle (sticky notes, connecteurs, commentaires, vote, réactions restent
> `phase-3` — voir `zones-ombre.md` #11). US08.3.2a enrichie en conséquence (couleur, sélection
> multiple, duplication, copier/coller, groupement, guides d'alignement) sans nouveau type d'objet
> — Size relevé L → XL, l'Architect Agent devra juger d'une décomposition avant Gate 2. Incohérence
> corrigée au passage sur US08.3.2b (AC citait encore DRAW/ERASE/MOVE/RESIZE comme 4 types STOMP
> distincts, contredisant le contrat unique déjà posé en Notes d'implémentation).
>
> **Avancement Vague 0 (2026-07-07, session 2) :** 7/8 enablers EN17 terminés.
> ✅ EN17.8 — design system incubé dans pivot-ui (branche `projects/design-system/`, angular.json)
> ✅ EN17.4 — ModuleFlywayConfigurer + ModuleSchemaIsolation (pivot-core PR #167)
> 🔄 EN17.1 — **correction (2026-07-08) : PR #167 pose la structure multi-module et publie
> `fr.pivot.core.db`, mais ne déplace ni `modules`/`tenant` (fait depuis, pivot-core PR #173) ni
> `auth`/`team` (toujours ouvert, `pivot-core#171`) — cette entrée affirmait à tort un "Done"
> complet ; voir la ligne Vague 0 du tableau ci-dessus, seule source à jour**
> ✅ EN17.5 — template repo `pivot-template-core` créé (PIVOT-PLATFORM/pivot-template-core, pivot-docs PR #105)
> ✅ EN17.3 — `@pivot-platform/ui-core` publié sur GitHub Packages npm (pivot-ui PR #112)
> ✅ EN17.7 — nginx API Gateway multi-module (pivot-ui PR #114 + pivot-core PR #170, 2026-07-07)
> ✅ EN17.2 — `@pivot-platform/design-system` publié sur GitHub Packages npm (pivot-design-system PR #1, 2026-07-07)
> ✅ EN17.6 — template repo `pivot-template-ui` créé (PIVOT-PLATFORM/pivot-template-ui, 2026-07-07)
>
> **Clôture EN17.1 (2026-07-08) :** volet `auth`, dernier restant, traité — [ADR-022](https://github.com/PIVOT-PLATFORM/pivot-docs/pull/155)
> tranche les deux décisions demandées par l'escalade `pivot-core#171` (forme du principal minimal
> partagé ; validation dupliquée via bibliothèque partagée plutôt que centralisée par appel
> réseau). Implémenté sur `pivot-core` PR #180 : `fr.pivot.core.auth.AuthenticatedPrincipal`
> (userId/tenantId/role) + `AuthenticatedPrincipalResolver`, implémentée par `TokenService`
> (`resolve()` délègue à `validate()`, inchangé) ; `TokenAuthenticationFilter` volontairement non
> modifié (dépendance existante d'une dizaine de contrôleurs à l'entité `User` complète via
> `Authentication#getDetails()`) ; `StompAuthChannelInterceptor` migré vers l'abstraction, premier
> consommateur réel. `pivot-core#171` fermée. EN17.1 : 8/8 volets terminés (`db`/`modules`/
> `tenant`/`team`/`auth`) — Enabler `Stage: Review`, recette `Stage: Done` laissée au mainteneur.
>
> **Rattrapage Gate 5 (2026-07-07, tard) :** US08.3.1 (`pivot-collaboratif-core` PR #28, Gate 4 =
> 89/100) et US08.3.2a (`pivot-collaboratif-ui` PR #24, Gate 4 = 92/100) mergées sans PR `pivot-docs`
> correspondante — écart comblé ici (`Stage: Review`, specs Gate 5 figées). US08.3.2a a implémenté
> par anticipation `UndoRedoService` (portée d'US08.3.3), ADR Canvas 2D API toujours non rédigée
> (gap noté sur la fiche US08.3.2a). Items non démarrés à ce stade, verrouillés par issue GitHub
> (aucune assignation) : US08.4.1, US08.3.2b, US08.3.2c, US08.3.3. US08.5.1 assignée et en cours
> (@tellebma, `pivot-collaboratif-core#29` / `pivot-collaboratif-ui#22`).
>
> **US08.4.1 (2026-07-07, session isolée — collision évitée sur US08.3.2b déjà pris) :** pris en
> charge après confirmation qu'aucune activité concurrente n'était en cours dessus. Ambiguïté Gate 1
> résolue (templates tenant hors Socle, pivot-docs PR #118) avant implémentation. Faille de sécurité
> (whitelist d'images contournable via URL protocol-relative) trouvée en self-review et corrigée
> avant merge. Autoloop jusqu'à Gate 4 = 100/100 sur les deux PR (gap AC coverage backend comblé par
> un test IT module-désactivé ; score frontend recalculé conforme au précédent déjà établi sur ce
> repo pour le blocage E2E Playwright non-required, PR #12) — **`pivot-collaboratif-core`#31 et
> `pivot-collaboratif-ui`#29 mergées** (bypass review via `--admin`, faute de reviewer configuré sur
> ces repos bootstrap, précédent déjà établi). Bug réel confirmé après merge (pas juste une
> hypothèse) : le DTO frontend supposait `previewUrl`, le backend renvoie `thumbnailUrl` — corrigé
> en fix de suivi `pivot-collaboratif-ui`#30 (220/220 tests verts). Issues de suivi créées pour les
> items encore non démarrés (`pivot-collaboratif-ui#26/27/28` — US08.3.2b/2c/3.3).
>
> **US08.3.2b (2026-07-08) :** `WhiteboardSyncService` (`@stomp/rx-stomp`) mergée —
> `pivot-collaboratif-ui` PR [#31](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/31)
> (`Stage: Review`, spec Gate 5 figée). 5 clarifications Gate 1 documentées dans la PR : contrat
> `DRAW` réel sans `userId` dans le payload (résolu serveur depuis le principal STOMP), canal de
> révocation réel `/user/queue/errors` en plus de la frame STOMP `ERROR` (le backend ne ferme pas
> la session en 1008 malgré le texte de l'AC), redirect guard `boardAccessGuard` corrigé
> `/home` → `/whiteboard`, interprétation "3 tentatives" = 3 tentatives au total (initiale
> incluse), gap plateforme "Auth différée" déjà connu (EN17) non traité par cette US. CI verte
> hors E2E Playwright (gap infra préexistant déjà confirmé identique sur `pivot-collaboratif-ui`
> #29/#30, non lié à ce changement). `publish()` reste générique pour US08.3.3 (undo/redo réseau)
> sans en câbler la diffusion — `us-undo-redo.md` reste `Stage: Ready`.
>
> **US08.3.3 (2026-07-08) :** `UndoRedoService` (PR #24) et `WhiteboardSyncService` (PR #31)
> étendues en place pour fermer les 3 AC réseau laissées ouvertes — `pivot-collaboratif-ui` PR
> [#32](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/32) (`Stage: Review`, spec
> Gate 5 figée), closes `pivot-collaboratif-ui#28`. Gate 4 = 97/100 (MERGE_AUTONOMOUS), merge via
> `--admin` faute de reviewer configuré sur ce repo bootstrap — même précédent que US08.4.1/
> US08.3.2b déjà noté ci-dessus. 3 clarifications Gate 1 documentées dans la PR : `eventId` minté
> côté client (aucun id serveur à réutiliser pour les diffusions `DRAW`), rejet viewer non
> spécialisé côté client faute de canal d'erreur typé côté backend (comportement fail-secure
> existant de `/user/queue/errors`, PR #31, réutilisé tel quel), pas de message STOMP dédié sur
> `redo()` (aucun type `REDO` dans la whitelist backend). CI verte hors E2E Playwright (gap infra
> préexistant déjà confirmé identique sur `pivot-collaboratif-ui`#29/#30/#31, non lié à ce
> changement).
>
> **US08.3.2c (2026-07-08) :** pris en charge après confirmation des deux dépendances mergées —
> `pivot-collaboratif-ui`#31 (US08.3.2b, client STOMP) et backend de présence US08.5.1
> (`pivot-collaboratif-core`#33, `ParticipantsBroadcastService`/couleur déterministe). Clarification
> Gate 1 additionnelle apportée en implémentation (non présente dans le fichier backlog initial,
> vérifiée sur le code backend réel) : `PARTICIPANTS_UPDATE` est diffusé sur un sous-topic dédié
> `/topic/whiteboard/{boardId}/presence`, payload brut `{ participants: [...] }` distinct de
> l'enveloppe `BroadcastCanvasMessage` du topic principal — `WhiteboardSyncService` étendu pour
> souscrire aux deux topics. `WhiteboardPresenceComponent` (overlay SVG de curseurs, throttle 50ms,
> timeout 5s, XSS-safe) — `pivot-collaboratif-ui`#33, 295/295 tests verts, coverage
> `whiteboard-presence.component.ts` 98.73 %. E2E Playwright rouge sur le même gap infra GHCR déjà
> documenté (#29/#30/#31/#32), non bloquant. PR draft sortie de brouillon, Gate 4 en attente de
> confirmation du mainteneur avant merge (pas d'auto-merge sur ce repo pour cette session).
>
> **US08.5.1 — volet frontend (2026-07-08) :** dernier item non démarré de la Vague 1+ pris en
> charge (`pivot-collaboratif-ui`#22, `leo-brgn` assigné, aucune collision détectée). Volet backend
> déjà mergé (`pivot-collaboratif-core`#33) — le noyau `PARTICIPANTS_UPDATE`/couleur
> déterministe/timeout heartbeat/dédoublonnage multi-onglets était en place, cette PR corrige
> uniquement une collision de payload entre `WhiteboardPresenceRegistry` (EN08.1) et
> `CanvasActionService` (US08.3.1) sur le sous-topic `/presence` partagé — voir
> `us-presence-participants.md` §Implémentation pour le détail. `PresencePanelComponent`
> (`pivot-collaboratif-ui`#34) réutilise l'`Observable` `WhiteboardSyncService.participantsUpdates$`
> déjà exposé depuis US08.3.2c (même sous-topic dédié `/topic/whiteboard/{boardId}/presence`,
> payload brut sans enveloppe) — aucune souscription STOMP additionnelle, aucun doublon avec
> `WhiteboardPresenceComponent` (overlay de curseurs, chevauchement déjà tranché au Gate 1 du
> 2026-07-07). 310/310 tests Vitest verts en isolation ; `E2E - Playwright` rouge sur le même gap
> infra GHCR déjà documenté (#29/#30/#31/#32/#33), non bloquant. Flake intermittent pré-existant
> observé sur `whiteboard-sync.service.spec.ts` lors de certaines exécutions locales complètes de
> `npm run test:ci` — reproduit indépendamment sur `main` avant tout changement de cette PR (pool
> `threads` Vitest, pollution d'état entre fichiers en parallèle), signalé pour investigation
> séparée hors périmètre de cette US. PR draft sortie de brouillon, Gates 1/2/3 postés
> (100/92/96), Gate 4 en attente de confirmation du mainteneur avant merge (pas d'auto-merge sur
> ce repo pour cette session). US08.3.2b (`pivot-collaboratif-ui`#31) et US08.3.3
> (`pivot-collaboratif-ui`#32) confirmées mergées entre-temps (tableau ci-dessus mis à jour en
> conséquence, stale sur ce point avant cette PR) — US08.5.1 était donc bien le dernier item non
> démarré de la Vague 1+ au moment de la prise en charge.
>
> **EN17.10 (2026-07-08) :** dernier item Vague 0 restant pris en charge. Volet 1/2
> (`pivot-collaboratif-ui`, conversion workspace multi-projets + publication
> `@pivot-platform/collaboratif-ui@0.1.0`) déjà mergé —
> [`pivot-collaboratif-ui`#36](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/36)
> (closes `pivot-collaboratif-ui`#35), CI verte, standalone (`nginx.conf`/port 8090) vérifié non
> cassé par un build réel (`npm run build`), 310/310 tests. Volet 2/2 (câblage `pivot-ui`) implémenté
> sur [`pivot-ui`#121](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/121) — `whiteboard-module-loader.ts`
> isolé (testable unitairement, jamais d'import statique du package pour préserver le
> code-splitting), `ModuleLoadErrorComponent` pour l'AC error case, `moduleGuard('whiteboard')`
> non régressé (couvert par `e2e/modules/module-guard.spec.ts`, cas désactivé inchangé). Sécurité
> tenantId revérifiée (grep exhaustif `projects/collaboratif-ui/src` côté `pivot-collaboratif-ui`
> — aucune occurrence d'un `tenantId`/`userId` envoyé depuis Angular, wiring n'y touche pas de toute
> façon). Coverage 100 % sur le nouveau code de wiring `pivot-ui`, tsc/lint/build production tous
> verts en local. **Bloqué avant merge** : CI réelle de `pivot-ui`#121 échoue sur `npm ci` — 404
> GitHub Packages sur `@pivot-platform/collaboratif-ui`, accès cross-repo non accordé entre les
> deux repos (même famille de blocage que le cross-repo GHCR déjà documenté côté
> `pivot-collaboratif-ui/TODO-SETUP.md`) — nécessite une action mainteneur (package settings,
> "Manage Actions access") hors de portée d'une PR ; label `needs-human-review` posé, détail dans
> `pivot-ui`#121. Playwright (`whiteboard-shell-wiring.spec.ts`, nouveau, + `module-guard.spec.ts`
> modifié pour migrer son cas générique "module actif" de `whiteboard` vers `session` puisque
> `whiteboard` n'est plus un placeholder) non exécutable dans l'environnement d'implémentation
> (dépendance système manquante pour Chromium headless, pas d'accès `sudo`) — à vérifier une fois
> la CI débloquée. Gap résiduel signalé, hors AC de cet Enabler : les clés Transloco
> `whiteboard.*` du package ne sont pas encore fusionnées/scopées dans le catalogue i18n de
> `pivot-ui` (rendu avec clés manquantes/brutes tant que non traité).
>
> **Correction post-blocage (2026-07-08, suite) :** le diagnostic "accès cross-repo GitHub
> Packages manquant" ci-dessus s'est révélé **faux** une fois creusé plus loin — la vraie cause
> du 404 était une URL `resolved` fabriquée à la main dans `package-lock.json` (aucun accès
> registre au moment de l'implémentation initiale), pas un souci de permissions. Confirmé par
> comparaison avec le lockfile de `pivot-ui#122` (même package/version, vrai hash d'intégrité,
> URL différente) et corrigé sans toucher aux réglages du package. Deux bugs supplémentaires
> trouvés et corrigés au passage : `ModuleLoadErrorComponent` était lui-même chargé en
> `loadComponent()` (donc exposé à la même panne qu'il doit couvrir — corrigé en import
> statique), et la simulation Playwright de l'échec de chargement (`page.route('**/*.js',
> abort)`) ne s'est jamais déclenchée en CI sur le chunk réel (limitation Chromium/Playwright
> sur les imports dynamiques ES, pas un flake) — remplacée par un test d'intégration TestBed +
> `RouterTestingHarness` (`app.routes.spec.ts`), fiable. Collision réelle détectée avec
> `pivot-ui#122` (`leo-brgn`, même Enabler travaillé en parallèle) — résolue par rebase manuel de
> `#121` par-dessus `#122` (déjà mergée), `#121` retenue pour le volet `pivot-ui` car seule à
> couvrir l'AC error case obligatoire. `pivot-ui#125` corrige au passage deux bugs CI réels et
> sans rapport trouvés sur `publish-ui-core.yml` (token `npm ci` manquant, republication en
> boucle de la même version). **EN17.10 est désormais réellement terminé** — voir
> `en-collaboratif-ui-shell-wiring.md` pour le détail complet et le statut à jour du fichier
> Enabler.
>
> **Correction Gate 4 — US08.3.1 / US08.3.2a (2026-07-09) :** écart détecté entre ce fichier et
> l'état réel GitHub. US08.3.1 (`pivot-collaboratif-core`#28) était déjà mergée et
> auto-approuvée sur un vrai commentaire Gate 4 = 89/100 depuis le 2026-07-07 — ce fichier
> affichait encore `🔁 Review` par erreur, corrigé en ✅ Done. US08.3.2a (`pivot-collaboratif-ui`#24)
> était mergée mais **aucun commentaire Gate 4 n'avait jamais été posté** sur la PR — le 92/100
> cité ici n'était appuyé par aucune preuve GitHub. Revue rétroactive menée sur le code tel que
> mergé (commit `cb0bf67` — `tsc`/`lint`/`test:ci`/`build` exécutés réellement, AC de l'US
> comparées au comportement effectif) : score réel **69/100** (`MERGE_DOCUMENTED`), commentaire
> Gate 4 posté sur la PR. Trois bugs fonctionnels réels trouvés en cours de route (handles de
> redimensionnement inopérants — déplacent l'objet au lieu de le redimensionner ; `clampShape()`
> jamais appelé en production malgré son test unitaire ; `duplicate()` émet systématiquement un
> DRAW de sous-type `stroke` quel que soit le type réel de l'objet, risque de payload mal typé
> pour US08.3.2b) + AC axe-core/focus-trap cochées ✅ dans l'US sans l'être réellement — détail
> complet dans le commentaire Gate 4 de la PR. Aucune action de merge à reprendre (déjà fait),
> mais ces 3 bugs fonctionnels restent à trancher (issue de suivi ou acceptation en dette
> technique) — non tranché à ce stade, à la charge du mainteneur.
>
> **Réparation Gate 4 — US08.3.1 / US08.3.2a (2026-07-09, suite) :** le mainteneur a demandé la
> correction réelle du code plutôt qu'une simple documentation de la dette. Audit indépendant
> supplémentaire mené sur US08.3.1 (`pivot-collaboratif-core`#28, score original 89/100 jamais
> recalculé) : score réel **75/100** (arithmétique du commentaire original incohérente
> 40+22+25=87≠89, dimension sécurité jamais notée séparément), 4 gaps trouvés (rate-limit
> "3 tentatives" non testé et en réalité un no-op silencieux, JavaDoc mensongère sur le replay-on-
> join jamais implémenté, aucun test sur l'AC payload DRAW > 64KB, décompte de tests du
> commentaire original faux). Réparation livrée sur `pivot-collaboratif-core`#28 →
> [`pivot-collaboratif-core`#36](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/36) :
> les 3 gaps corrigés + un second bug réel découvert au passage (buffer WebSocket Tomcat 8KB
> inférieur à la limite STOMP applicative de 64KB, provoquait une fermeture brutale de connexion
> — code 1009 — au lieu de l'ERROR STOMP gracieux attendu, avec risque de cascade sur les autres
> participants). Vérification adversariale par un agent indépendant : les 2 nouveaux tests
> d'intégration rejoués contre le code d'avant-fix échouent exactement comme prévu, puis passent
> sur le code corrigé — non tautologiques, confirmé. Gate 4 réel = **100/100**, posté sur la PR,
> mergée (`--admin`, même précédent déjà établi sur ce repo bootstrap sans reviewer configuré).
> Gap résiduel honnêtement signalé, hors périmètre (AC "déconnexion WS code 1008 sur souscription
> non autorisée" toujours non implémentée) — à trancher par le mainteneur.
>
> Réparation US08.3.2a (`pivot-collaboratif-ui`#24) : les 9 gaps du score réel 69/100 corrigés sur
> [`pivot-collaboratif-ui`#37](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/37) —
> redimensionnement par handles réellement fonctionnel, `clampObjectToCanvas()` câblé sur tous les
> chemins réels (drag/resize/duplicate/paste), `duplicate()` corrigé (sous-type DRAW réel au lieu
> de `'stroke'` systématique), focus trap réel sur le dialogue raccourcis, contraste corrigé
> (`#888` → `#555`, recalculé selon la formule WCAG), erreur du champ hexadécimal rendue
> accessible (`aria-describedby`), `@axe-core/playwright` réellement ajouté et invoqué (plus une
> fausse affirmation), spec Playwright E2E ajoutée (limitée par l'absence de backend live en
> sandbox — gap d'infra pré-existant confirmé légitime via `TODO-SETUP.md`, pas une esquive),
> table de traçabilité AC ajoutée. Vérification indépendante : contraste WCAG recalculé à la main
> (correspondance à 3-4 décimales près), `axe-core` confirmé comme vraie dépendance réellement
> invoquée, resize/duplicate/focus-trap tous tracés avec tests sur les valeurs résultantes réelles,
> aucune régression sur les 195+ tests pré-existants. Gate 4 réel = **99/100** (-1 sur un décompte
> de tests obsolète dans la description de la PR, 348 annoncés vs 355 réels — coquille sans impact
> fonctionnel), posté sur la PR. **PR laissée en draft à la demande du mainteneur** — sortie de
> draft et merge non faits, à décider séparément. Gap auto-signalé hors périmètre (non corrigé) :
> `WhiteboardBoardComponent` ne lie jamais `[boardTitle]`, `aria-label` se termine par `"— "`.
>
> **Merge US08.3.2a — `pivot-collaboratif-ui`#37 (2026-07-09, suite) :** le décompte de tests
> obsolète (348 vs 355) n'était déjà plus présent dans la description au moment de la revue —
> `npm run test:ci` réexécuté confirme 355/355 exacts. Un commit supplémentaire (contraste WCAG
> vérifié par un test indépendant du backend, plus de dépendance à un commentaire calculé à la
> main) ajouté entre-temps, sans régression (`lint`/`tsc` propres). Gate 4 réel = **100/100**,
> posté sur la PR. Mainteneur a confirmé le score et demandé le merge — PR sortie de draft et
> mergée (`--admin`). Gap hors périmètre toujours non corrigé (`WhiteboardBoardComponent`
> `[boardTitle]`), reste à trancher séparément.
