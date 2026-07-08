# US08.5.1 — Présence des participants sur le canvas

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/presence/us-presence-participants.md`
  (F08.3 — Canvas collaboratif temps réel, EPIC-collaboration E30)
- **Backend** : `pivot-collaboratif-core`
  [PR #33](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/33) (mergée) — Closes
  [#29](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/issues/29) et
  [#32](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/issues/32)
- **Frontend** : `pivot-collaboratif-ui`
  [issue #22](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/issues/22) ·
  [PR #34](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/34)
  (`feat/us08-5-1-presence-panel-frontend`)
- **Gate 2 COVERAGE (frontend)** : 92/100 — coverage globale du repo 87.63 % statements /
  90.78 % lignes ; fichier de cette US : `presence-panel.component.ts` 98.48 % lignes /
  98.48 % statements
- **Gate 3 QUALITY (frontend)** : 96/100 — 14/15 checks CI verts ; `E2E - Playwright` rouge sur
  le gap infra GHCR préexistant déjà documenté sur `pivot-collaboratif-ui`#29/#30/#31/#32/#33
  (image `ghcr.io/pivot-platform/pivot-collaboratif-core` introuvable sur le runner), non lié au
  code de cette PR
- **Dépend de** : EN08.1 (isolation WS room, mergée), EN08.2 (guard Angular whiteboard, mergée),
  US08.3.1 (contrat WS de base, mergée), US08.3.2b (`WhiteboardSyncService`, client STOMP,
  `pivot-collaboratif-ui`#31, mergée), US08.3.2c (`participantsUpdates$` exposé sur
  `WhiteboardSyncService`, `pivot-collaboratif-ui`#33, mergée)
- **Périmètre de cette spec** : les deux volets de l'US — backend (résolution de collision de
  payload sur le sous-topic `/presence`) et frontend (`PresencePanelComponent`, le panneau/liste
  des participants). L'overlay de curseurs SVG reste hors périmètre — voir la spec dédiée
  `docs/specs/EPIC-collaboration/us08-3-2c-presence-curseurs.md`.

---

## Spec fonctionnelle

### Backend — résolution de la collision de payload (PR #33)

Avant cette PR, `WhiteboardPresenceRegistry` (EN08.1, tracker de liveness WS) et
`CanvasActionService` (US08.3.1, gestion applicative JOIN/LEAVE) diffusaient chacun,
indépendamment, un format de payload différent sur le même sous-topic dédié
`/topic/whiteboard/{boardId}/presence` — un conflit non détecté jusqu'à l'implémentation de
US08.3.2c (overlay de curseurs, premier consommateur réel du flux). Le modèle "une session WS par
utilisateur" avant correction faisait par ailleurs disparaître toute la présence d'un utilisateur
dès qu'un seul de ses onglets crashait (scénario multi-onglets).

Résolution :

- `WhiteboardPresenceRegistry` redevient un pur tracker de liveness de session (SET par
  utilisateur/board des sessions WS actives) — n'écrit plus dans `ParticipantMetaStore`, ne
  diffuse plus rien lui-même.
- La présence applicative reste pilotée exclusivement par les messages JOIN/LEAVE
  (`CanvasActionService`), qui enregistrent/désenregistrent désormais aussi la session dans le
  registre de liveness.
- Une déconnexion WebSocket sans `LEAVE` préalable ne nettoie la présence et ne diffuse
  `PARTICIPANTS_UPDATE` que si la session fermée était la **dernière** session active de
  l'utilisateur sur ce board — corrige le bug multi-onglets (AC "JOIN dupliqué du même userId").
- `PresencePayload` (ancien type de payload, mort) supprimé. `ParticipantsBroadcastService`
  extrait comme unique diffuseur `PARTICIPANTS_UPDATE`, appelé depuis les deux points d'entrée
  (JOIN/LEAVE applicatif et fermeture de la dernière session).

### Backend — timeout de déconnexion silencieuse (Gate 1 clarification, PR #33)

L'AC "timeout de déconnexion silencieuse : participant sans heartbeat depuis 30s marqué comme
déconnecté... tâche planifiée serveur" (formulation du fichier backlog initial) est satisfaite
par le heartbeat STOMP natif déjà configuré dans `WebSocketConfig` (25s serveur / 30s client,
US08.3.1) plutôt que par une nouvelle tâche `@Scheduled` dédiée : Spring ferme automatiquement la
session si le heartbeat n'est pas honoré, ce qui déclenche `SessionDisconnectEvent` → le nettoyage
de présence déjà implémenté ci-dessus se charge du reste. Décision documentée sur la PR plutôt que
duplication d'un mécanisme déjà existant.

### Backend — couleur, isolation, sécurité (déjà mergées avant cette PR, non dupliquées)

- Couleur déterministe par participant : `ColorPaletteService`, palette fixe de 12 couleurs,
  allouée par `boardId` au `JOIN`, libérée uniquement au `LEAVE` définitif (jamais au timeout de
  30s, pour éviter un changement de couleur visible lors d'une reconnexion rapide) — mergé en
  amont de cette US, réutilisé tel quel.
- Isolation topic/tenant : `WhiteboardChannelInterceptor` (EN08.1) — le préfixe de destination
  `/topic/whiteboard/` couvre déjà le suffixe `/presence`, un utilisateur non membre du board ne
  peut pas s'y abonner (souscription STOMP refusée).
- `ParticipantsUpdatePayload`/`ParticipantInfo` n'exposent que `userId`, `displayName`,
  `avatarUrl`, `color`, `role` — jamais l'email ni d'autre donnée de profil.

### Frontend — `PresencePanelComponent` (PR #34)

Panneau listant les participants connectés, rendu par `WhiteboardBoardComponent` en overlay
top-right au-dessus du canvas (sibling de `<app-whiteboard-canvas>`, positionné en absolu sous la
toolbar) — **pas** projeté dans le slot `<ng-content>` de `wb-canvas-area` : ce slot est
documenté `pointer-events: none`/décoratif pour `WhiteboardPresenceComponent` (overlay de
curseurs, US08.3.2c), alors que le panneau de présence a besoin d'une affordance interactive
réelle (tooltip natif au survol du badge "+N").

Consomme directement `WhiteboardSyncService.participantsUpdates$` — le même `Observable`
`Subject<ParticipantInfo[]>` déjà exposé depuis US08.3.2c pour le sous-topic dédié
`/topic/whiteboard/{boardId}/presence` (payload brut `{ participants: [...] }`, sans enveloppe
`type`/`boardId`/`userId`, voir `docs/specs/EPIC-collaboration/us08-3-2c-presence-curseurs.md`,
section "Découverte Gate 1 en implémentation — contrat à deux topics", pour le détail du contrat). Aucune souscription STOMP additionnelle — RxJS
multicaste déjà l'unique `Subject` à tous ses abonnés (`WhiteboardPresenceComponent` et
`PresencePanelComponent` en parallèle, sans couplage direct entre les deux).

- **Avatars/initiales** : jusqu'à 5 premiers participants affichés (avatar image si `avatarUrl`,
  sinon initiales dérivées de `displayName` — deux lettres uppercase, premier+dernier mot ou deux
  premières lettres si un seul mot). Couleur de fond reprise telle quelle de
  `ParticipantInfo.color` — jamais recalculée côté client, garantissant la cohérence visuelle avec
  le curseur du même participant rendu par `WhiteboardPresenceComponent`.
- **Overflow "+N"** : au-delà de 5 participants, badge unique avec le compte restant, `title`
  natif listant les noms (séparés par virgule) pour le survol souris, et `aria-label` traduit
  incluant la même liste pour les lecteurs d'écran.
- **Rôle** : traduit via un nouveau namespace `whiteboard.presence.role.*`
  (`owner`/`editor`/`viewer`, minuscule après `.toLowerCase()` sur la valeur brute du wire
  contract qui est en majuscules `OWNER`/`EDITOR`/`VIEWER`) — distinct de
  `whiteboard.board.list.role.*` (US08.1.3), qui répond à un contrat REST différent, en minuscules
  nativement (`Board['role']`). Les deux namespaces ne sont pas fusionnés : conventions de casse
  différentes selon la source (wire contract WS vs REST), risque de confusion trop élevé pour un
  gain de duplication marginal.
- **Sécurité** : `displayName` rendu uniquement par interpolation Angular (`{{ }}`), jamais
  `[innerHTML]` — testé explicitement (absence de balise injectée dans le DOM rendu pour un
  `displayName` contenant du markup).

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-collaboratif-core`, PR #33)

| Fichier | Rôle |
|---------|------|
| `WhiteboardPresenceRegistry` (modifié) | Redevient un pur tracker de liveness de session — n'écrit plus dans `ParticipantMetaStore`, ne diffuse plus |
| `ParticipantsBroadcastService` (nouveau, extrait) | Unique diffuseur `PARTICIPANTS_UPDATE`, appelé par `CanvasActionService` (JOIN/LEAVE) et par le nettoyage de dernière session |
| `CanvasActionService` (modifié) | Enregistre/désenregistre aussi la session dans le registre de liveness au JOIN/LEAVE applicatif |
| `PresencePayload` (supprimé) | Ancien type de payload, mort après extraction de `ParticipantsBroadcastService` |
| `WhiteboardPresenceIT` (nouveau, TI) | JOIN/LEAVE → PARTICIPANTS_UPDATE ; crash sans LEAVE (dernière session active) |

### Fichiers introduits / modifiés (`pivot-collaboratif-ui`, PR #34)

| Fichier | Rôle |
|---------|------|
| `whiteboard/presence/presence-panel.component.ts` (nouveau) | Panneau de présence — avatars/initiales, overflow "+N", labels de rôle traduits |
| `whiteboard/presence/presence-panel.component.html` (nouveau) | Template — `role="group"` + `aria-label` panneau, `role="img"` + `aria-label`/`title` par avatar |
| `whiteboard/presence/presence-panel.component.scss` (nouveau) | Pastille d'avatars empilés, badge overflow |
| `whiteboard/presence/presence-panel.component.spec.ts` (nouveau, TU) | 15 tests — 1/5/6-7 participants, overflow, déconnexion, rôle Lecteur, couleur serveur, XSS, fallback initiales, cleanup |
| `whiteboard/board/whiteboard-board.component.ts`/`.html`/`.scss`/`.spec.ts` (modifiés) | Câblage `<app-presence-panel>` en overlay top-right, sibling de `<app-whiteboard-canvas>` |
| `public/assets/i18n/fr.json`/`en.json` (modifiés) | `whiteboard.presence.{panelAriaLabel,avatarAriaLabel,overflowBadge,overflowAriaLabel,online,role.{owner,editor,viewer}}` — `cursorLabel` (US08.3.2c) non touché |

### Topics STOMP consommés (contrat fixé par US08.3.1/US08.5.1 backend, non modifié côté frontend)

| Topic | Contenu | Forme du payload |
|-------|---------|-------------------|
| `/topic/whiteboard/{boardId}/presence` | `PARTICIPANTS_UPDATE` | `ParticipantsUpdatePayload` (brut, sans enveloppe) — voir `WhiteboardSyncService` |

### API `WhiteboardSyncService` consommée (introduite par US08.3.2c, non modifiée ici)

| Membre | Rôle |
|--------|------|
| `participantsUpdates$: Subject<ParticipantInfo[]>` | Émet la liste validée à chaque `PARTICIPANTS_UPDATE` — seul membre consommé par `PresencePanelComponent` |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| EN08.1 | Isolation topic/tenant (`WhiteboardChannelInterceptor`) réutilisée telle quelle côté backend ; `WhiteboardPresenceRegistry` (liveness de session) redevenu un composant interne sans diffusion propre |
| US08.3.1 | Heartbeat STOMP (`WebSocketConfig`) réutilisé tel quel pour le timeout de déconnexion silencieuse — aucune tâche planifiée dupliquée |
| US08.3.2b | `WhiteboardSyncService` (client STOMP) non modifié par cette US côté frontend |
| US08.3.2c | Introduit `participantsUpdates$` (consommé ici sans modification) et `WhiteboardPresenceComponent` (overlay de curseurs, complémentaire — jamais dupliqué) ; découverte du contrat à deux topics documentée dans sa propre spec, réutilisée telle quelle ici |
| US30.2.2 (Présence et curseurs nommés, backlog `phase-3`) | Item de backlog distinct, non affecté par cette US — vérifié absence de chevauchement |

## Hors périmètre (explicitement exclu)

- Overlay de curseurs SVG sur le canvas (position x/y, throttle, timeout d'inactivité) — porté
  exclusivement par US08.3.2c/`WhiteboardPresenceComponent`, déjà mergé, non modifié par cette US.
- Audio/vidéo natif au board (US30.2.6, phase-3).
- Statistiques/historique de présence (EN30.11, phase-3).
- Montée en charge > 200 participants simultanés (US30.2.7, phase-3) — le panneau de présence ici
  cible les charges Socle usuelles (limite d'affichage 5 + overflow, pas de virtualisation de
  liste).
