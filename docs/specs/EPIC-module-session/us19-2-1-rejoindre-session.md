# US19.2.1 — Rejoindre une session via code court (authentifié ou anonyme)

## Contexte

- **US** : [`us-rejoindre-session.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/participation/us-rejoindre-session) · Parent `F19.2` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) (vue join + routes publiques) · fiabilisation heartbeat dans [#289](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/289)
- **Commit figé** : `8581c9d` (`… (#270)`), état de fiabilité au commit `afd5a52` (#289)
- **Portée du figeage** : vue de connexion **frontend** (`pivot-ui`, `session-join`) + routage public + contrat REST consommé. Producteur backend (`pivot-core`) hors périmètre — contrat figé **tel que consommé**.
- **Gate 4 au figeage** : convergence Autoloop, CI verte. Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

`session-join` — page **publique** (saisie code + nom d'affichage) permettant de rejoindre une
session, **avec ou sans compte PIVOT** :

1. **Rejoindre** — `POST /sessions/join { code, displayName }` → `JoinSessionResponse`
   (`participantId`, `token` invité scellé `null` si authentifié, `wsTopic`). Le même appel produit
   de façon transparente un participant authentifié (token porteur attaché par l'intercepteur du
   shell) ou un invité `ROLE_GUEST` selon l'état d'auth ambiant.
2. **Routage public** — les routes `join` et `:sessionId/play` sont montées **deux fois** : dans le
   sous-arbre authentifié **et**, non gardées, au niveau du fallback public (`sessionPublicRoutes`).
   Un invité n'a par construction ni compte ni token porteur ; ne les monter que sous l'arbre
   authentifié + `moduleGuard` les rendrait structurellement inaccessibles à l'appelant que l'US sert.
3. **Passage de relais** — à la réussite, la vue navigue vers le shell participant (US19.2.2) en lui
   transmettant `participantId`/`token` par l'état de navigation du Router ; la connexion STOMP et le
   heartbeat invité sont **détenus par le shell**, pas par `session-join` (ils survivent à la
   destruction de cette vue à la navigation).
4. **Présence invité** — `POST /sessions/{id}/participants/{pid}/heartbeat { token }` rafraîchit le TTL
   de présence. **Fiabilité (#289)** : un échec de heartbeat transitoire est absorbé par tick
   (`catchError`) — il ne coupe plus la session ; seule la destruction du composant déconnecte.

### Sécurité

| Propriété | Mécanisme |
|-----------|-----------|
| Auth optionnelle | Authentifié (bearer) ou `ROLE_GUEST` temporaire **lié à cette session uniquement** |
| Token invité | Scellé, transmis en header `X-Guest-Token` (jamais en query/body/URL) ; en mémoire, jamais persisté |
| Isolation tenant | Backend depuis le token/porteur invité |
| Code invalide / session `COMPLETED` | `404` — le client ne retry pas |

## Contrat technique final

| Verbe | Chemin | Rôle | Corps / réponse |
|-------|--------|------|-----------------|
| `POST` | `/sessions/join` | participant | `JoinSessionRequest { code, displayName }` → `JoinSessionResponse` · code invalide → `404` |
| `POST` | `/sessions/{id}/participants/{pid}/heartbeat` | invité | `{ token }` → `204` |

### `JoinSessionResponse`

```ts
{ participantId: string; token: string | null; wsTopic: string }
// token = null pour un join authentifié ; sessionId dérivé de wsTopic (sessionIdFromTopic)
```

Broadcast STOMP aux autres : `PARTICIPANT_JOINED { sessionId, participantCount }`.

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| `POST /sessions/join` (code, displayName) → token + room STOMP | ✅ | `JoinSessionResponse` |
| Participant authentifié : identité du token porteur | ✅ | |
| Participant anonyme : `ROLE_GUEST` lié à la session | ✅ | token invité scellé |
| Broadcast `PARTICIPANT_JOINED` | ✅ | |
| Code invalide / `COMPLETED` → `404` | ✅ | pas de retry |

**Précision d'implémentation** : la vue join ne détient ni la connexion STOMP ni le heartbeat — elle
les délègue au shell participant (US19.2.2) pour qu'ils survivent à la navigation.

## Gates

- **Gate 2** : `session-join` couvert en Vitest (join auth/anonyme, code invalide, erreur). E2E public : `session-public-join.spec.ts`. Suite verte.
- **Gate 4** : convergence Autoloop, CI verte, squash-merge `main`. Merge humain final en attente.
