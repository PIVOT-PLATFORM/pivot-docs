# US20.3.2 — Revoir les actions de la rétro précédente au démarrage

## Contexte

- **US** : `docs/backlog/EPIC-retrospective/FEATURES/action/us-suivi-actions.md`
  (F20.3, EPIC E20 — Module Retrospective)
- **Gate 1 READINESS** : 100/100 — `pivot-docs` PR
  [#208](https://github.com/PIVOT-PLATFORM/pivot-docs/pull/208) (AC Given/When/Then complètes,
  au moment de la rédaction de cette spec en attente de fusion humaine — `pivot-docs` ne fusionne
  jamais en autonome, voir `CLAUDE.md`)
- **Issue** : `pivot-agilite-ui`
  [#46](https://github.com/PIVOT-PLATFORM/pivot-agilite-ui/issues/46)
- **PR** : `pivot-agilite-ui`
  [#47](https://github.com/PIVOT-PLATFORM/pivot-agilite-ui/pull/47)
  (`feat/us20-3-2-warmup-actions`) — **mergée** (squash), trailer `Release-Trigger: true` (dernier
  item du Sprint 8 pour ce repo)
- **Gate 2 COVERAGE** : coverage globale du repo 93.45 % statements / 95.89 % lignes ;
  `session-room.component.ts` (étendu) 98.72 % statements / 98.61 % lignes
- **Gate 4 MERGE CONFIDENCE** : 100/100 — CI intégralement verte (16 checks : build, lint,
  Vitest, E2E Playwright, Lighthouse a11y, SonarCloud, CodeQL, Semgrep ×2, Gitleaks, Trivy, SCA,
  Docker preview), aucun hard block (pas de label `security`/`breaking-change`, aucune
  modification du contrat de module ni de `@pivot/ui-core`)
- **Dépend de** : US20.3.1 — `RetroActionResponse`/`RetroActionStatus`, `RetroApiService
  .updateActionStatus`/`.listTeamActions`, `PATCH /retro/actions/{actionId}` (`pivot-agilite-ui`
  [#45](https://github.com/PIVOT-PLATFORM/pivot-agilite-ui/pull/45), mergée ; `pivot-agilite-core`
  #50, mergée)
- **Backend en parallèle** : `pivot-agilite-core`
  [#52](https://github.com/PIVOT-PLATFORM/pivot-agilite-core/issues/52) (issue ouverte, PR pas
  encore livrée au moment de cette spec) — le frontend est codé contre le contrat Gate 1 figé
  (PR #208) et testé avec `RetroApiService` intégralement mocké au niveau HTTP ; aucun couplage
  bloquant, aucune attente active du backend.
- **Périmètre de cette spec** : uniquement le volet frontend (`pivot-agilite-ui`). Le nouvel
  endpoint `GET /retro/teams/{teamId}/retro/pending-actions` lui-même (filtrage/tri
  serveur) relève du backend `pivot-agilite-core`, hors périmètre de ce document.

---

## Spec fonctionnelle

### Panneau "warm-up" — un état transitoire purement côté client

À l'ouverture d'une session de rétrospective (`SessionRoomComponent`, juste après que
`joinRealtimeSession` a réussi et que `loadSessionDetailBestEffort()` a résolu le `teamId` de la
session), le client appelle désormais `RetroApiService.listPendingActions(teamId)` — un nouvel
usage du client HTTP, **aucune modification** des appels existants.

- **Au moins une action retournée** → un panneau "warm-up" s'affiche, listant chaque action
  (titre, responsable, échéance, statut), avant tout accès à l'interface de la phase
  `CONTRIBUTION`.
- **Liste vide** → le panneau est sauté automatiquement, accès direct à l'interface de phase —
  sans flash visuel d'un panneau vide (voir "Gating anti-flash" ci-dessous).

Le panneau n'est **jamais** une valeur de `RetroPhase` — la session reste créée directement en
`CONTRIBUTION` (US20.1.1). Deux nouveaux signaux pilotent uniquement le rendu du template :

| Signal | Rôle |
|--------|------|
| `warmupResolved` | `false` tant que l'appel `listPendingActions` (ou son échec) n'a pas résolu — gate anti-flash |
| `showWarmup` | `true` une fois résolu, si au moins une action a été trouvée |
| `pendingActions` | La liste courante des actions à afficher/marquer |

### Gating anti-flash

Le template ajoute deux branches `@else if` entre l'état "join en erreur" et le rendu existant
de l'interface de phase :

1. `!warmupResolved()` → message neutre ("Vérification des actions en cours…", `role="status"
   aria-live="polite"`, même traitement que l'état `joining()` déjà existant).
2. `showWarmup()` → le panneau lui-même.
3. (sinon, branche `@else` déjà existante, **inchangée**) → interface de phase.

Tant que `listPendingActions` n'a pas répondu, ni le panneau ni l'interface de phase ne
s'affichent — élimine à la fois le flash d'un panneau vide et l'affichage prématuré de
`CONTRIBUTION` avant que la vérification n'ait eu lieu.

### Marquer une action depuis le panneau

Chaque ligne du panneau porte deux boutons ("Marquer terminée" / "Marquer abandonnée"), tous deux
accessibles à tout participant (facilitateur ou non — pas de restriction, cohérent avec
`TeamActionsComponent`, US20.3.1, qui n'impose pas non plus de restriction facilitateur pour le
changement de statut). Chaque clic appelle **directement** `RetroApiService.updateActionStatus`
(US20.3.1, `PATCH /retro/actions/{actionId}`) — **aucune modification** du service, seul un
nouvel appelant. Succès → l'action est retirée de `pendingActions` (elle n'est plus "en cours"
par définition) ; échec → erreur inline par ligne (`warmupErrorActionId`), l'action reste dans la
liste, aucun blocage du reste du panneau (un `warmupUpdatingActionId` empêche seulement un
double-clic concurrent sur la **même** action).

Un bouton "Continuer vers la rétrospective" (`dismissWarmup()`) fait passer `showWarmup` à
`false`, sans toucher au `currentPhase` réel de la session — transition purement locale.

### Fail-open partout

Aucun chemin ne bloque indéfiniment l'accès à l'interface de phase :

| Échec | Comportement |
|-------|--------------|
| `getById` (session detail) échoue — `teamId` inconnu (gap d'auth du bootstrap, voir TSDoc de classe de `RetroApiService`) | `listPendingActions` jamais appelé, `warmupResolved` mis à `true` directement dans la branche d'erreur — panneau sauté |
| `listPendingActions` échoue (ex. 404 appelant non membre de l'équipe) | Traité comme une liste vide — panneau sauté, jamais d'erreur bloquante |
| `updateActionStatus` échoue depuis le panneau | Erreur inline par ligne uniquement, jamais de blocage des autres actions ni de la sortie du panneau |

### Sécurité

- `teamId` provient exclusivement de `sessionDetail().teamId` (résolu côté serveur via
  `getById`), jamais saisi ni recalculé côté client — même règle transversale que tout appel
  `RetroApiService` existant.
- Titre/responsable/échéance de chaque action pending rendus via interpolation Angular standard
  (`{{ }}`) — jamais `[innerHTML]`. Testé explicitement (payload `<img onerror>` dans le titre,
  absence de `<img>` dans le DOM rendu).

### Accessibilité

Chaque bouton "Marquer terminée"/"Marquer abandonnée" porte un `aria-label` paramétré par le
titre de l'action (`retro.sessionRoom.warmup.markDoneLabel`/`markAbandonedLabel`), mirroring la
convention déjà établie pour les boutons de vote (`vote.castLabel`/`uncastLabel`, US20.1.2b) —
sans quoi un lecteur d'écran annoncerait le même libellé générique pour chaque ligne du panneau
quand plusieurs actions sont affichées.

---

## Contrat technique

### Fichiers modifiés (`pivot-agilite-ui`)

| Fichier | Rôle |
|---------|------|
| `retro/data-access/retro.models.ts` | TSDoc de `RetroActionResponse` étendu (nouvel usage par `pending-actions`) — **aucun nouveau type**, la réponse réutilise `RetroActionResponse[]` telle quelle |
| `retro/data-access/retro-api.service.ts` | Nouvelle méthode `listPendingActions(teamId): Observable<RetroActionResponse[]>` — `GET /retro/teams/{teamId}/retro/pending-actions` |
| `retro/data-access/retro-api.service.spec.ts` | 4 tests — GET, liste vide (jamais 404), 404 (non membre), 401 (gap d'auth) |
| `retro/session-room/session-room.component.ts` | Signaux `warmupResolved`/`showWarmup`/`pendingActions`/`warmupUpdatingActionId`/`warmupErrorActionId` ; `checkPendingActions()` (privé, appelé depuis `loadSessionDetailBestEffort()`) ; `dismissWarmup()`/`markPendingAction()` (publics au template) |
| `retro/session-room/session-room.component.html` | 2 nouvelles branches `@else if` (gating anti-flash + panneau warm-up) insérées avant le rendu de phase existant, **inchangé** |
| `retro/session-room/session-room.component.scss` | Une seule règle nouvelle (`margin-bottom`) — le panneau réutilise entièrement les classes existantes (`.session-room__column`/`.session-room__card`/`.session-room__action-item*`/`.session-room__vote-controls`/`.session-room__vote-button`/`.session-room__create-action-button`/`.session-room__error`/`.session-room__fallback-note`) pour rester sous le budget `anyComponentStyle` |
| `retro/session-room/session-room.component.spec.ts` | 11 nouveaux tests — affichage/saut auto du panneau, anti-flash, dismiss, marquage succès/erreur/no-op concurrent, fail-open (404/401), XSS, aria-label par action |
| `public/assets/i18n/fr.json`/`en.json` | `retro.sessionRoom.warmup.*` (12 clés) |

### API HTTP ajoutée à `RetroApiService`

| Méthode | Endpoint | Retour |
|---------|----------|--------|
| `listPendingActions(teamId: number)` | `GET /retro/teams/{teamId}/retro/pending-actions` | `Observable<RetroActionResponse[]>` — filtré `A_FAIRE`/`EN_COURS` et trié par échéance croissante côté serveur ; 200 + liste vide si aucune action (jamais 404 pour une équipe valide) |

Aucune méthode existante modifiée (`updateActionStatus` réutilisé tel quel).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US20.1.1 | `currentPhase` de la session créée reste toujours `CONTRIBUTION` — le warm-up n'introduit aucune nouvelle valeur de `RetroPhase`, uniquement un état de rendu client transitoire |
| US20.3.1 | Réutilise intégralement `RetroActionResponse`, `RetroActionStatus`, `RetroApiService.updateActionStatus`/`PATCH /retro/actions/{actionId}` — aucune modification de ce contrat |
| `TeamActionsComponent` (US20.3.1) | Même absence de restriction facilitateur pour le changement de statut — cohérence délibérée entre les deux vues d'actions |

## Hors périmètre (explicitement exclu)

- L'endpoint backend `GET /retro/teams/{teamId}/retro/pending-actions` lui-même (filtrage/tri,
  isolation tenant/équipe) — `pivot-agilite-core`, spec distincte côté backend.
- Historique des actions closes depuis le panneau warm-up d'une session ultérieure (l'AC Gate 1
  garantit que `sessionId` reste inchangé par le `PATCH` — comportement déjà couvert par
  l'implémentation backend US20.3.1, aucun changement requis ni testé côté frontend pour cette
  US).
- Toute restriction de rôle (facilitateur uniquement) sur le marquage des actions depuis le
  panneau — non demandé par le Gate 1 AC, cohérence volontaire avec `TeamActionsComponent`.
