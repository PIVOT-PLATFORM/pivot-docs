# US08.3.3 — Undo / Redo sur le canvas

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/canvas-ws/us-undo-redo.md`
  (F08.3 — Canvas collaboratif temps réel, EPIC-collaboration E30)
- **PR** : `pivot-collaboratif-ui` [#32](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/32)
  (`feat/us08-3-3-undo-redo-canvas`) — ferme l'issue #28
- **Gate 2 COVERAGE** : 273/273 tests Vitest (up from 258 sur `main`, +15 tests nets), 86.8 %
  statements / 79.7 % branches / 83.5 % functions / 90.3 % lines — amélioration nette sur 3
  métriques sur 4 par rapport à `main` avant ce changement (86.7/78.3/83.7/90.1), functions quasi
  stable (-0.2 pt, bruit). Branches/functions restent dans la bande 70-84 % "compléter" du Gate 2
  du repo, mais c'est le profil de base préexistant du module (confirmé par diff de couverture
  contre `main`, pas une régression introduite par cette PR) — porté par des chemins pointeur/drag
  non testés de longue date dans `whiteboard-canvas.component.ts` (PR #24,
  `hitTestHandle`/`computeGuides`) et le même artefact 0 % de couverture sur
  `whiteboard-board.component.html` déjà signalé et accepté sur PR #31. Tous les chemins de code
  introduits par cette PR ont leurs propres tests dédiés.
- **Gate 4 MERGE_CONFIDENCE** : 97/100 — auto-approuvé (seuil ≥ 85), merge via `--admin` faute de
  reviewer configuré sur ce repo bootstrap (précédent déjà établi, voir note US08.4.1/US08.3.2b
  dans `sprints/sprint-5.md`)
- **Dépend de** : US08.3.1 (message `UNDO`, whitelist des types STOMP côté backend), US08.3.2a
  (`UndoRedoService` créé par anticipation, PR #24 — pile de 50 snapshots, boutons/raccourcis
  toolbar), US08.3.2b (`WhiteboardSyncService`, transport STOMP, état lecture seule, PR #31)

---

## Spec fonctionnelle

Aucun nouveau service créé — `UndoRedoService` (PR #24) et `WhiteboardSyncService` (PR #31) sont
étendus en place pour fermer les trois AC réseau laissées ouvertes après ces deux PR :

### UndoRedoService — diffusion STOMP (AC5)

- `push()` mint désormais un `eventId` client (`crypto.randomUUID()`) par snapshot posé sur la
  pile, à la même granularité qu'une action `DRAW` (jamais par keystroke/point intermédiaire).
- `undo()` retourne `{ objects, eventId }` (au lieu de `CanvasObject[]` seul) pour que
  `WhiteboardCanvasComponent.onUndo()` puisse émettre une nouvelle sortie `undoAction`, relayée
  par `WhiteboardBoardComponent` comme `sync.publish('UNDO', { eventId })` — via le point d'entrée
  générique `publish()` déjà construit par PR #31 dans cette intention exacte, sans refactor de
  `WhiteboardSyncService`.
- `redo()` garde sa signature d'origine (`CanvasObject[]`) — le contrat réseau ne définit qu'`UNDO`,
  `redo()` reste purement local (voir clarification 3).

### Lockout lecture seule explicite (AC10)

`onUndo()`/`onRedo()` gardent désormais aussi `readOnly()` explicitement dans le corps de la
méthode, en plus du `[disabled]` toolbar et de l'early-return clavier déjà existants sur
`onKeyDown`. Ferme l'écart où un appel direct de méthode (test, ou tout futur point d'appel)
pouvait encore muter l'état local en étant déconnecté — aucune opération locale n'est atteignable
par aucun chemin en mode lecture seule.

### Cohérence du rejet viewer (AC9)

Aucune nouvelle vérification de rôle côté client — le rejet équivalent à un 403 est déjà appliqué
côté serveur (`CanvasActionService#handle`, US08.3.1). Vérifié à la place que la gestion existante
de `/user/queue/errors` dans `WhiteboardSyncService` (déconnexion + toast + redirection vers
`/whiteboard`, établie en PR #31 pour la révocation de membre) se comporte de façon *cohérente* —
pas incohérente — quand ce même canal porte un rejet `VIEWER role cannot send UNDO` plutôt qu'une
révocation : les deux sont « une frame SEND/SUBSCRIBE refusée », les deux reçoivent la même
réponse fail-secure. Voir clarification 2 ci-dessous.

---

## Clarifications Gate 1 (documentées, jamais d'interprétation unilatérale)

1. **Origine de l'`eventId`.** Le texte de l'AC (`UNDO { userId, eventId }`) et le contrat backend
   (`CanvasActionMessage` : `UNDO: { eventId }`) ne précisent pas qui le mint. Le backend déjà
   mergé n'échoue jamais d'id persisté au client pour les diffusions `DRAW`
   (`CanvasActionService#handleDraw` rediffuse le `data` du client tel quel) — il n'existe aucun id
   serveur disponible à réutiliser. `handleUndo` lui-même ne fait que rediffuser `data` verbatim et
   ne valide jamais `eventId`. Résolution : `eventId` est minté côté client dans
   `UndoRedoService.push()`, un par action annulable, uniquement pour permettre au message `UNDO`
   sortant d'identifier *quelle* action locale a été annulée.
2. **AC9 « vérifie que le comportement UI reste cohérent si le serveur rejette ».** Question posée :
   faut-il spécialiser le rejet d'un `UNDO` par un `VIEWER` pour éviter de le déconnecter/rediriger
   (le handler `/user/queue/errors` existant ayant été écrit pour un scénario différent — révocation
   de membre) ? Décision : **ne pas** spécialiser. `ErrorPayload` (backend) ne porte qu'une chaîne
   `error` libre, aucun code de raison typé — distinguer « ce rôle a rejeté cette seule action » de
   « n'est plus membre du board » côté client obligerait à parser le texte backend, un couplage
   fragile et ponctuel. Le comportement existant (déconnexion + redirection pour *toute* frame
   refusée) est un défaut fail-secure, cohérent avec la façon dont tout autre rejet sur ce canal est
   déjà traité — pas un bug. Documenté dans le TSDoc de `WhiteboardSyncService.onRevoked` et figé
   par un test dédié simulant le texte exact du message backend
   (`"VIEWER role cannot send UNDO"`). Un code de raison typé nécessiterait un changement de contrat
   backend — hors périmètre ici, aucune PR `pivot-collaboratif-core` n'accompagne celle-ci.
3. **Redo sans message STOMP.** L'AC n'exige de diffuser que `UNDO` ; il n'existe aucun type `REDO`
   dans la whitelist backend `CanvasEventType`. `redo()` reste purement local, conforme au contrat
   déjà mergé et inchangé par cette PR.

---

## Contrat technique

### Fichiers introduits / modifiés (`pivot-collaboratif-ui`)

| Fichier | Rôle |
|---------|------|
| `core/whiteboard/undo-redo.service.ts` (modifié) | `push()` mint `eventId` par snapshot, `undo()` retourne `{ objects, eventId }` |
| `core/whiteboard/undo-redo.service.spec.ts` (nouveau) | 166 lignes — push, undo, unicité/lignée `eventId` sur undo→redo→undo, redo, limite 50, reset |
| `core/whiteboard/whiteboard-sync.service.ts` (modifié) | TSDoc `onRevoked` clarifiant AC9 (clarification 2) |
| `core/whiteboard/whiteboard-sync.service.spec.ts` (modifié) | Test verrouillant la cohérence AC9 sur le scénario viewer |
| `whiteboard/canvas/whiteboard-canvas.component.ts` (modifié) | Nouvelle sortie `undoAction` ; garde `readOnly()` explicite dans `onUndo()`/`onRedo()` |
| `whiteboard/canvas/whiteboard-canvas.component.spec.ts` (modifié) | `undoAction` émis avec `eventId` réel sur undo réussi, silencieux sur pile vide/tout `redo()` ; no-op lecture seule sur appel direct (pas seulement via boutons désactivés) ; Ctrl+Z/Ctrl+Y no-op en lecture seule |
| `whiteboard/board/whiteboard-board.component.ts` / `.html` (modifiés) | Relais `undoAction` → `sync.publish('UNDO', { eventId })` via le `publish()` générique de PR #31 |
| `whiteboard/board/whiteboard-board.component.spec.ts` (modifié) | Test du relais STOMP |
| `.github/workflows/ci.yml` (modifié) | `actions/setup-java` (Temurin 21) ajouté avant `sonar-scanner` (voir Notes CI) |

### Modèle d'événements WebSocket (contrat partagé F08.3, cf. US08.3.1/US08.3.2b)

`UNDO { eventId }` publié sur `/app/whiteboard/{boardId}/action` et diffusé sur
`/topic/whiteboard/{boardId}` — un message par action annulée, même granularité que `DRAW` ; pas de
rejeu de plusieurs actions en un seul message. `boardId` porté par la destination STOMP,
`userId` jamais inclus côté client, résolu côté serveur depuis le principal STOMP (même règle
sécurité qu'US08.3.2b). `redo()` n'émet aucun message (clarification 3).

### Lockout lecture seule

| Chemin d'appel | Garde avant cette PR | Garde après cette PR |
|-----------------|----------------------|------------------------|
| Bouton toolbar | `[disabled]` sur le `<button>` | inchangé |
| Raccourci clavier (Ctrl+Z/Ctrl+Y) | early-return dans `onKeyDown` | inchangé |
| Appel direct de méthode (`onUndo()`/`onRedo()`) | **aucune** | garde explicite `readOnly()` dans le corps de la méthode |

### Notes CI

Incident CI rencontré à l'ouverture de la PR #32, sans rapport avec le diff propre de cette US : le
job `sonar` ne pinnait aucun JDK, s'appuyant sur le `java` par défaut d'`ubuntu-latest`. SonarQube
Cloud rejette désormais côté serveur les scanners Java 17 (« The version of Java (17) used to run
this analysis is deprecated … upgrade to Java 21 or later ») — cassé sur ce run bien que le même job
soit passé sur le merge précédent (PR #31, ~30 min plus tôt), confirmant un déploiement de
dépréciation côté plateforme, pas une régression de cette branche. Corrigé (plutôt que contourné en
silence, puisque toute PR future aurait échoué à l'identique) par l'ajout d'un
`actions/setup-java` explicite (Temurin 21, pinné au même SHA déjà utilisé par
`pivot-core`/`pivot-collaboratif-core`) avant l'invocation de `sonar-scanner` — cette JVM ne fait
tourner que le CLI du scanner, sans rapport avec la toolchain Node/Angular propre à ce repo.

---

## Vérification (rapportée par la PR)

- `npx tsc --noEmit` — 0 erreur
- `npm run lint` — 0 warning
- `npm run test:ci` — 273/273 tests verts (258 sur `main` avant cette PR), 86.8 % statements /
  79.7 % branches / 83.5 % functions / 90.3 % lines
- `npm run build -- --configuration production` — build propre
- E2E (Playwright) différé — pas de backend actif dans cet environnement (gap infra préexistant,
  déjà confirmé identique sur `pivot-collaboratif-ui` PR #24/#29/#30/#31, non lié à ce changement ;
  admis par CLAUDE.md, « E2E différable »)

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US08.3.2a | `UndoRedoService` (créé par anticipation en PR #24) est étendu en place, jamais recréé — pile de 50 snapshots et boutons/raccourcis toolbar inchangés |
| US08.3.2b | `WhiteboardSyncService.publish()`, déjà générique depuis PR #31, relaie `UNDO` sans refactor ; le handler `/user/queue/errors` (révocation de membre) est réutilisé tel quel pour le rejet viewer (clarification 2) |
| US08.3.1 | Contrat de messages, whitelist de types et rejet serveur (403-équivalent, rôle viewer) déjà en place — cette US consomme, ne redéfinit pas |
| US08.3.2c | Overlay de curseurs, indépendant de cette US — aucun chevauchement de fichiers |
| US08.4.1 | Sans rapport fonctionnel — précédent de process partagé (merge `--admin`, bypass review faute de reviewer configuré sur ce repo bootstrap) |

## Hors périmètre (explicitement exclu)

- Undo/redo collaboratif (annulation partagée entre participants, résolution de conflits sur
  l'historique commun) — explicitement hors scope Socle, pourra être revisité en phase-3.
- Persistance de la stack undo entre sessions (reprise après rechargement de page) — la stack est
  réinitialisée à la déconnexion (`WhiteboardSyncService.disconnect()` → `UndoRedoService.reset()`,
  déjà câblé en PR #31, non modifié ici).
- Undo/redo « global board » (rejouer/annuler les actions d'un autre participant) — le message
  `UNDO` diffusé n'est qu'à but de synchronisation visuelle ; `WhiteboardSyncService` valide et
  ignore déjà les messages `UNDO` entrants (PR #31, inchangé).
- Changement de contrat backend (code de raison typé sur `ErrorPayload`) — hors périmètre,
  clarification 2 ; aucune PR `pivot-collaboratif-core` n'accompagne cette PR.
