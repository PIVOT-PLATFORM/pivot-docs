# US10.1.2 — Démarrer et terminer une session daily standup

**En tant que** animateur de la session
**Je veux** démarrer et terminer la session daily
**Afin de** contrôler le déroulement du standup

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US10.1.1 (création,
statut `PENDING`). Consomme la forme figée par US10.1.1 : `StandupSession{id, teamId, status,
currentIndex, startedAt, endedAt}` et `StandupParticipant{id, sessionId, order, status,
speakingAt, doneSpeaking}`.

**Animateur = tout membre de l'équipe liée à la session**, pas seulement son créateur (même
posture que la Roue — un standup se pilote en équipe, pas par un propriétaire unique). Voir
US10.1.1 §Architecture temps réel pour le choix de ne broadcaster qu'aux changements d'état
réels, jamais un tick serveur.

## Critères d'acceptation

### Démarrage (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `PENDING` de l'équipe de l'appelant avec au moins un participant, when `POST .../standup/sessions/{id}/start`, then 200 OK — `status → "RUNNING"`, `startedAt` = maintenant, le premier participant (`order = 0`) passe à `status: "SPEAKING"` avec `speakingAt` = maintenant, `currentIndex = 0` | ⬜ |
| Given le démarrage ci-dessus, when il a lieu, then un événement `SESSION_STARTED` (session complète, participants inclus) est broadcasté sur `/topic/agilite/standup/{sessionId}` | ⬜ |

### Rotation manuelle et fin

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `RUNNING` avec un participant `SPEAKING`, when `POST .../sessions/{id}/next`, then le participant courant passe à `status: "DONE"` avec `doneSpeaking` = maintenant ; s'il existe un participant à `order = currentIndex + 1`, il passe `SPEAKING`/`speakingAt` = maintenant et `currentIndex` est incrémenté — sinon la session passe `status: "DONE"`, `endedAt` = maintenant | ⬜ |
| Given la transition ci-dessus (participant suivant OU fin de session), when elle a lieu, then un événement `PARTICIPANT_CHANGED` (nouveau participant courant, `null` si plus personne) **ou** `SESSION_ENDED` (durée totale, nombre de participants) est broadcasté | ⬜ |
| Given une session `RUNNING`, when `POST .../sessions/{id}/end` (fin anticipée, hors dernier tour), then le participant `SPEAKING` en cours passe `DONE`/`doneSpeaking` = maintenant, `status session → "DONE"`, `endedAt` = maintenant, événement `SESSION_ENDED` broadcasté | ⬜ |
| Given une requête `POST .../next` concurrente en double (double-clic, deux onglets animateur), when la deuxième requête arrive après que la première a déjà fait avancer le participant courant, then elle est un no-op silencieux (409 ou 200 idempotent — voir Notes d'implémentation) plutôt qu'un double avancement qui sauterait un participant | ⬜ |

### Historique

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `DONE`, when `GET .../sessions/{id}`, then la réponse inclut `startedAt`/`endedAt` et, pour chaque participant, `speakingAt`/`doneSpeaking` — consultable indéfiniment (US10.3.1 s'appuie sur ces mêmes champs) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given une session déjà `RUNNING` ou `DONE`, when `POST .../start`, then 409 code `INVALID_SESSION_STATUS` | ⬜ |
| Error : given une session `PENDING` ou `DONE`, when `POST .../next` ou `POST .../end`, then 409 code `INVALID_SESSION_STATUS` | ⬜ |
| Error : given un `id` de session inexistant ou d'un autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given un appelant authentifié qui n'est pas membre de l'équipe de la session, when `start`/`next`/`end`, then 404 (jamais 403, jamais 200 — n'expose pas l'existence de la session) | ⬜ |
| Security : `tenantId`/`userId` résolus exclusivement du `RequestPrincipal` | ⬜ |
| Security : test TI obligatoire prouvant qu'un `next` en double (deux appels consécutifs rapides) n'avance le tour de parole qu'une seule fois | ⬜ |
| Security : test TI obligatoire cross-tenant sur les 3 endpoints (`start`/`next`/`end`) | ⬜ |

## Hors périmètre

- **Reprise d'une session interrompue** (crash, tous les onglets fermés) — l'état persisté en
  base suffit à reprendre l'affichage à la reconnexion (`GET .../sessions/{id}`), aucun mécanisme
  de reprise dédié.

## Notes d'implémentation

- **Backend** : `StandupSessionService#start/next/end`. Concurrence du double `next` : suivre le
  précédent `PokerTicketService`/retro — `UPDATE ... WHERE status = 'SPEAKING'` conditionnel
  (`updateStatusIfCurrentlySpeaking`, comme `WheelService`/`PokerVoteService` verrouillent déjà
  leurs transitions), 0 ligne affectée ⇒ no-op silencieux (200 avec l'état déjà avancé, pas
  d'erreur — le second appelant voit simplement le résultat du premier, jamais une exception
  utilisateur pour un double-clic bénin). `StandupDestinations`/`StandupChannelInterceptor` sur le
  modèle exact de `WheelDestinations`/`WheelChannelInterceptor` (US14.3.1) — **pas** de dépendance
  sur EN19.2 (WebSocket room isolation, EPIC-module-session) : cet enabler cible un domaine
  distinct (E19 Session live, Sprint 22+), non implémenté, non planifié à cette échéance ; chaque
  domaine `agilite.*` construit sa propre isolation par room légère (poker/roue/rétro/standup),
  précédent déjà établi trois fois. Le stub d'origine de cette US citait EN19.2 en dépendance par
  erreur de copier-coller depuis le gabarit E19 — corrigé ici (Gate 1, décision PO/Architecte).
- **Frontend** : `RoomBoardComponent`-like composant `standup-runner` : bouton "Démarrer",
  "Passer la parole →", "Terminer" — mêmes conventions signals/OnPush/Transloco que
  `RoomBoardComponent` (US09.2.x).

---
Item Type: US · Parent: F10.1 · Module: agilite · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US10.1.1
