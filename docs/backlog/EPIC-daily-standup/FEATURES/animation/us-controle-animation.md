# US10.2.2 — Contrôler l'animation manuellement (passer, réordonner, étendre)

**En tant que** animateur du standup
**Je veux** pouvoir passer un participant, étendre son temps ou modifier l'ordre à la volée
**Afin de** adapter le déroulement aux imprévus (absent, discussion plus longue, etc.)

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US10.1.2/US10.2.1.
Trois capacités indépendantes, chacune combinable avec les autres à tout moment pendant `RUNNING`.

## Critères d'acceptation

### Passer un participant (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `RUNNING` avec un participant `SPEAKING`, when `POST .../sessions/{id}/skip`, then le participant courant passe à `status: "SKIPPED"` (et non `"DONE"`) avec `doneSpeaking` = maintenant, puis la même rotation que `next` (US10.1.2) s'applique (participant suivant `SPEAKING`, ou fin de session) | ⬜ |
| Given le skip ci-dessus, when il a lieu, then un événement `PARTICIPANT_SKIPPED` (au lieu de `PARTICIPANT_CHANGED`) est broadcasté, avec le même contenu (nouveau participant courant, ou fin de session) | ⬜ |

### Étendre le temps (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `RUNNING` avec un participant `SPEAKING`, when `POST .../sessions/{id}/extend` avec `{ seconds: 30 \| 60 }`, then `StandupParticipant.extraSeconds` du participant courant est incrémenté de la valeur reçue (cumulable — plusieurs extensions s'additionnent) | ⬜ |
| Given l'extension ci-dessus, when elle a lieu, then un événement `TIMER_EXTENDED` (`participantId`, nouveau `extraSeconds` total) est broadcasté — chaque client recalcule son minuteur visuel (US10.2.1) avec la nouvelle base `timePerPersonSeconds + extraSeconds` | ⬜ |
| Given le scheduler d'expiration automatique (US10.2.1), when il évalue si le temps du participant courant est dépassé, then il utilise `speakingAt + timePerPersonSeconds + extraSeconds`, jamais `timePerPersonSeconds` seul — une extension repousse effectivement le passage automatique | ⬜ |

### Réordonner les participants à venir (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `RUNNING`, when `PUT .../sessions/{id}/participants/reorder` avec la liste ordonnée des ids des participants encore `WAITING`, then leur `order` est réécrit selon cette liste (les participants déjà `SPEAKING`/`DONE`/`SKIPPED` ne bougent pas — seule la suite de la file est réordonnable) | ⬜ |
| Given le réordonnancement ci-dessus, when il a lieu, then un événement `PARTICIPANTS_REORDERED` (nouvel ordre complet) est broadcasté | ⬜ |
| Error : given une liste qui ne contient pas exactement l'ensemble des participants actuellement `WAITING` (id manquant, en trop, ou déjà non-`WAITING`), when réordonnancement, then 400 code `INVALID_REORDER` — rejeté explicitement plutôt qu'appliqué partiellement | ⬜ |

### Visibilité (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un participant non-animateur (n'ayant pas les droits de pilotage), when il consulte la session, then il voit les changements d'état (participant courant, minuteur, ordre) mais **aucun bouton** de contrôle (passer/étendre/réordonner) — mêmes conventions que `RoomBoardComponent#isFacilitator` (US09.2.x) | ⬜ |

### Statistiques (lien avec US10.3.1)

| Critère | 🤖 Dev |
|---------|--------|
| Given un participant `SKIPPED`, when les statistiques de la session sont calculées (US10.3.1), then sa durée de parole est comptabilisée à **0**, jamais dérivée de `doneSpeaking - speakingAt` (qui serait non nul puisque les deux timestamps sont posés au moment du skip) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `seconds` absent de `{ 30, 60 }`, when extension, then 400 code `INVALID_EXTEND_SECONDS` | ⬜ |
| Error : given une session non `RUNNING` ou sans participant `SPEAKING`, when skip/extend, then 409 code `INVALID_SESSION_STATUS` | ⬜ |
| Error : given un `id` de session inexistant/autre tenant, when skip/extend/reorder, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given un appelant non membre de l'équipe de la session, when skip/extend/reorder, then 404 | ⬜ |
| Security : test TI obligatoire prouvant qu'une extension recalcule bien la fenêtre d'expiration du scheduler (US10.2.1) — un participant étendu de 60s ne passe pas automatiquement avant `speakingAt + timePerPersonSeconds + 60` | ⬜ |

## Notes d'implémentation

- **Backend** : `StandupSessionController` étendu (`/skip`, `/extend`,
  `/participants/reorder`), `StandupSessionService#skip/extend/reorder`. `skip` réutilise en
  interne la même transition que `next` (US10.1.2) avec le statut terminal paramétré
  (`SKIPPED` vs `DONE`) plutôt qu'une duplication de la logique de rotation.
- **Frontend** : boutons "Passer →" / "+30s" / "+60s" visibles uniquement pour l'animateur,
  liste réordonnable via Angular CDK `DragDropModule` (déjà une dépendance du design system,
  ADR-007 — pas de nouvelle lib tierce) sur la portion `WAITING` de la liste des participants.

---
Item Type: US · Parent: F10.2 · Module: agilite · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US10.1.2
