# US08.12.1 — Minuteur partagé (facilitation)

**En tant que** owner ou éditeur d'un tableau
**Je veux** démarrer, arrêter et prolonger un compte à rebours partagé, avec un temps de fin faisant autorité côté serveur
**Afin de** cadencer un atelier collaboratif pour tous les participants avec le même minuteur synchronisé, sans dérive d'horloge entre clients

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis owner ou éditeur d'un tableau, when j'envoie `timer:start` `{boardId, duration}` (durée en secondes), then le serveur calcule `endsAt = now + duration*1000` **côté serveur** (jamais depuis le client) et diffuse `timer:started {endsAt, serverNow}` sur `/topic/board/{boardId}` à toute la room (émetteur inclus), `serverNow` = horloge serveur au moment de l'émission | ⬜ |
| Given un `timer:start` diffusé, when un client reçoit `timer:started {endsAt, serverNow}`, then il peut corriger sa dérive d'horloge locale (offset = `serverNow − Date.now()` client) et afficher un compte à rebours aligné sur l'horloge serveur, pas la sienne | ⬜ |
| Given un `timer:start` avec `duration <= 0`, when le serveur le reçoit, then c'est un **no-op silencieux** : aucun timer démarré, aucune diffusion, aucune erreur renvoyée | ⬜ |
| Given un timer démarré, when le serveur le persiste, then il est stocké dans Redis avec expiration automatique (`SET key val PX ms`, TTL = durée restante) si Redis est disponible ; sinon repli sur une `Map` mémoire locale non partagée entre instances (fallback dégradé, timer non partagé multi-instance) | ⬜ |
| Given je suis owner ou éditeur, when j'envoie `timer:stop` `{boardId}`, then le serveur supprime le timer (`redis.del` ou `Map.delete`) et diffuse `timer:stopped` (sans payload) à toute la room | ⬜ |
| Given un timer actif, when j'envoie `timer:extend` `{boardId, extraSeconds}`, then le nouveau `endsAt = max(endsAt actuel, now) + extraSeconds*1000` — la base de calcul est **`max(endsAt, now)`** de sorte qu'un timer déjà expiré redémarre à partir de l'instant présent et gagne réellement `extraSeconds` de temps utile (jamais un `endsAt` négatif/déjà expiré) | ⬜ |
| Given un timer expiré depuis 5 minutes (`endsAt` dans le passé selon l'horloge serveur), when je le prolonge de 60 secondes, then le nouveau timer se termine dans **exactement 60 secondes à partir de maintenant** (base = `now`, pas l'ancien `endsAt` périmé), et non pas à `−4min60s` | ⬜ |
| Given un participant rejoint un tableau (`board:join`) alors qu'un timer est actif, when le serveur rejoue l'état initial, then il émet `timer:started {endsAt, serverNow}` **à ce seul émetteur** afin qu'un arrivant tardif voie immédiatement le compte à rebours en cours avec la bonne échéance serveur | ⬜ |
| Error : given un `timer:extend` sur un tableau sans timer actif (`endsAt` null/inexistant), when le serveur le reçoit, then c'est un no-op silencieux (rien à prolonger), aucune diffusion, aucune erreur — cohérent avec la convention de refus silencieux du module temps réel | ⬜ |
| Error : given Redis injoignable au moment d'un `timer:start`, when le serveur persiste, then il retombe sur le fallback mémoire local sans lever d'erreur ni bloquer la diffusion `timer:started` (dégradation gracieuse : le minuteur reste fonctionnel sur l'instance courante) | ⬜ |
| Security : `boardId` et l'identité utilisateur/tenant sont résolus exclusivement depuis le SecurityContext (token opaque) et l'appartenance à la room — jamais depuis le body brut ; `endsAt` est calculé **serveur** à partir de `duration`, le client ne peut jamais imposer une échéance arbitraire (pas de `endsAt` fourni par le client accepté) | ⬜ |
| Security : `timer:start`/`timer:stop`/`timer:extend` sont gardés par `canWrite` (OWNER ou EDITOR) — un VIEWER qui émet l'un de ces événements est refusé silencieusement (aucune mutation, aucune diffusion, aucune erreur dédiée), cohérent avec §3.12 du spec de référence | ⬜ |
| A11y : le compte à rebours affiché côté canvas est exposé aux technologies d'assistance via `role="timer"` + `aria-live="polite"` (annonce des seuils, pas de chaque seconde), et les boutons démarrer/arrêter/prolonger portent des `aria-label` explicites indépendants de la couleur seule | ⬜ |
| Tests TI : `timer:start` (owner/editor → diffusion `timer:started` avec `endsAt` serveur + `serverNow`, viewer → refus silencieux) ; `duration<=0` → no-op ; `timer:extend` sur timer expiré → base = `now` (temps utile réellement ajouté) ; `timer:extend` sans timer → no-op ; persistance Redis + fallback mémoire ; rejeu `timer:started` sur `board:join` avec timer actif | ⬜ |
| Tests Vitest : correction de dérive d'horloge client (offset `serverNow − now`), rendu du compte à rebours, états boutons désactivés pour VIEWER, no-op UI sur `duration<=0` | ⬜ |

## Hors périmètre

- Minuteur récurrent / séquences de plusieurs timers enchaînés (Pomodoro multi-phases) — hors scope, un seul compte à rebours actif par tableau
- Sons / notifications système à l'expiration du timer — hors scope Socle, purement visuel + `aria-live`
- Historique des minuteurs passés (combien de fois, quelle durée) — non persisté au-delà du timer courant en Redis
- Undo/redo du minuteur — le module timer n'est **pas** couvert par l'historique undo/redo (§4.5 du spec, décision reproduite), action non annulable par Ctrl+Z

## Notes d'implémentation

- Backend `pivot-collaboratif-core` (traduction stack Node/Socket.io → Spring + STOMP + Redis) :
  - Handlers STOMP `timer:start` / `timer:stop` / `timer:extend` sur le canal `/topic/board/{boardId}`, gardés `canWrite` (OWNER+EDITOR) résolu depuis le SecurityContext + l'appartenance à la room WS (EN08.1)
  - `endsAt` calculé serveur (`Instant.now().toEpochMilli() + duration*1000`) ; diffusion `timer:started` porte `endsAt` **et** `serverNow` (`Instant.now().toEpochMilli()`) pour que le client corrige sa dérive d'horloge
  - Persistance Redis clé par board (ex. `board:timer:{boardId}`) avec `SET ... PX <ms restants>` (expiration native) ; fallback `Map`/`ConcurrentHashMap` en mémoire si Redis `status != ready` — timer alors non partagé entre instances (limite assumée du fallback)
  - `timer:extend` : `base = max(endsAtActuel, now)` puis `nouveau endsAt = base + extraSeconds*1000` ; requiert un timer existant (sinon no-op) ; ré-persistance Redis avec le nouveau TTL
  - `board:join` : si un timer est actif pour le board, ré-émettre `timer:started {endsAt, serverNow}` au seul socket qui rejoint (rejeu d'état initial, cf. §3.1)
  - Constantes exactes (§3.10 / §7) : durée en **secondes**, `endsAt`/`serverNow` en millisecondes epoch ; `duration<=0` → no-op
- Frontend `pivot-collaboratif-ui` : composant minuteur dans le header/canvas ; calcule `clockOffset = serverNow − Date.now()` à la réception de `timer:started` et affiche `endsAt − (Date.now() + clockOffset)` ; boutons start/stop/extend visibles seulement pour OWNER/EDITOR (VIEWER : compte à rebours en lecture seule)
- **Absorption US30.3.2 dans le Socle** : l'activité « Minuteur » précédemment cataloguée sous US30.3.2 (facilitation d'ateliers, hors Socle) est absorbée dans le Socle E08 au titre de la parité complète vs POC PouetPouet — décision mainteneur d'absorption intégrale du spec de référence
- i18n : clés `whiteboard.facilitation.timer.*` (fr.json / en.json)
- Source : `Détails tableau blanc backlog.md` §3.10 (contrat temps réel `timer:start`/`timer:stop`), §5.4 (Gherkin prolongation après expiration), §7 (constantes)

---
Item Type: US · Parent: F08.12 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.10, §5.4, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08 (activité Minuteur US30.3.2 absorbée)
Dépendances: EN08.4 (modèle Card typé), EN08.1 (isolation WS room, canal STOMP `/topic/board/{boardId}`, présence Redis) + Redis (persistance timer + fallback mémoire)
