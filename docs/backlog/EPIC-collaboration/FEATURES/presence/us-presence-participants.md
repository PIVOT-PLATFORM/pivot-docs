# US08.5.1 — Présence des participants sur le canvas

**En tant que** utilisateur connecté à un tableau
**Je veux** voir qui est en train d'éditer le tableau en même temps que moi
**Afin de** savoir avec qui je collabore en temps réel

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Panneau de présence affiché en haut du canvas : avatars (ou initiales) des participants connectés | ⬜ frontend, ui#22 |
| À chaque JOIN/LEAVE, message PARTICIPANTS_UPDATE émis sur /topic/whiteboard/{boardId}/presence avec liste complète des connectés | ✅ core#33 |
| Chaque participant a une couleur unique attribuée par le serveur au JOIN (parmi une palette de 12 couleurs distinctes) | ✅ core#33 (ColorPaletteService, déjà mergé en US08.3.1, conservé tel quel) |
| La couleur du participant est cohérente entre son curseur et son avatar dans le panneau de présence | ⬜ frontend, ui#22 |
| Limite d'affichage : les 5 premiers avatars sont visibles, le reste affiché en "+N" avec tooltip listant les noms | ⬜ frontend, ui#22 |
| Un utilisateur rejoignant un board non vide reçoit le PARTICIPANTS_UPDATE initial avec la liste courante | ✅ core#33 |
| Timeout de déconnexion silencieuse : participant sans heartbeat depuis 30s marqué comme déconnecté | ✅ core#33 (heartbeat STOMP natif déjà configuré, WebSocketConfig/US08.3.1 — pas de nouvelle tâche planifiée, voir Notes d'implémentation) |
| Viewer (role: viewer) apparaît dans la liste de présence avec label "Lecteur" | ⬜ frontend, ui#22 (rôle déjà transmis par le backend, libellé/label à la charge du composant Angular) |
| Panneau de présence a aria-label="Participants en ligne" ; chaque avatar a aria-label="[displayName] — [rôle]" | ⬜ frontend, ui#22 |
| Overflow "+N" a aria-label="Et [N] autres participants : [liste des noms]" | ⬜ frontend, ui#22 |
| Labels "en ligne", "Lecteur", "Éditeur", tooltip noms internalisés dans whiteboard.presence.* (fr.json / en.json) | ⬜ frontend, ui#22 |
| Tests TI : JOIN émis → PARTICIPANTS_UPDATE contient le nouvel user ; LEAVE émis → PARTICIPANTS_UPDATE le retire | ✅ core#33 (WhiteboardCanvasIT, déjà mergé en US08.3.1) |
| Tests Vitest PresencePanelComponent (1 user, 5 users, overflow, déconnexion) | ⬜ frontend, ui#22 |
| Error : reconnexion réseau (<30s) → même userId retrouve sa présence sans doublon d'avatar ni nouveau JOIN dupliqué, couleur conservée | ✅ core#33 (couleur déterministe par userId + ParticipantMetaStore.put idempotent — testé, WhiteboardPresenceIT) |
| Error : JOIN dupliqué du même userId (ex. multi-onglets) → un seul avatar affiché dans le panneau, dernière connexion active prioritaire | ✅ core#33 (testé, WhiteboardPresenceIT) |
| Error : rupture WebSocket sans LEAVE propre (crash client) → timeout heartbeat 30s (cf. ci-dessus) retire le participant, jamais de présence fantôme persistante | ✅ core#33 (résolution de la collision #32 — nettoyage uniquement sur la dernière session active ; testé multi-onglets + crash, WhiteboardPresenceIT) |
| Security : le topic `/topic/whiteboard/{boardId}/presence` est isolé par room WS (EN08.1) — un utilisateur non membre du board ne peut pas s'y abonner (souscription STOMP refusée) | ✅ core#33 (WhiteboardChannelInterceptor, déjà mergé en EN08.1, non modifié — testé) |
| Security : PARTICIPANTS_UPDATE n'expose que `userId`, `displayName`, `role`, `color` — jamais l'email ou d'autres données du profil utilisateur | ✅ core#33 (testé au niveau contrat de payload, WhiteboardPresenceIT) |
| Security : isolation tenant — un participant d'un autre tenant ne peut ni apparaître dans, ni recevoir, le flux de présence d'un board qui ne lui appartient pas | ✅ core#33 (héritée de WhiteboardChannelInterceptor/ParticipantMetaStore, déjà mergées) |
| Tests TI : souscription au topic presence par un utilisateur non membre du board → refusée (aucun PARTICIPANTS_UPDATE reçu) | ✅ core#33 (WhiteboardPresenceIT) |

## Hors périmètre

- Rendu des curseurs de dessin en temps réel sur le canvas (position x/y, déplacement pendant l'édition) : relève de **US08.3.2c**, qui consomme le backend de présence défini ici (voir sa section `Dépendances: US08.5.1`).
- **Panneau de présence (liste des participants) : porté exclusivement par cette US** (`PresencePanelComponent`, avatars en haut du canvas, `aria-label="Participants en ligne"`, overflow "+N"). US08.3.2c ne rend que l'overlay de curseurs sur le canvas — pas de panneau participants dupliqué de son côté (chevauchement identifié et tranché au Gate 1 du 2026-07-07).
- Audio/vidéo natif au board (US30.2.6, phase-3).
- Statistiques/historique de présence (EN30.11, phase-3).
- Montée en charge > 200 participants simultanés (US30.2.7, phase-3) — le panneau de présence ici cible les charges Socle usuelles.

## Notes d'implémentation

- Topic STOMP : `/topic/whiteboard/{boardId}/presence`, message `PARTICIPANTS_UPDATE` (liste complète des connectés à chaque JOIN/LEAVE et à la connexion initiale).
- Isolation de la room WS par board : dépend de **EN08.1** (isolation WebSocket room par board) — le refus de souscription pour un non-membre est un effet direct de cet enabler.
- Attribution de couleur : côté serveur au JOIN, choisie dans une palette fixe de 12 couleurs, allouée par `boardId` (libérée au LEAVE définitif, pas au timeout de 30s pour éviter un changement de couleur lors d'une reconnexion rapide).
- Heartbeat : ping client périodique (< 30s) ; tâche serveur planifiée marquant "déconnecté" après 30s sans heartbeat reçu.
- Composant Angular : `PresencePanelComponent` (dépend du guard **EN08.2**).
- Parent fonctionnel : F08.3 Canvas collaboratif temps réel.

### Rattrapage backend (2026-07-08, `pivot-collaboratif-core`#33)

Volet backend implémenté et mergé — PR [#33](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/33)
(Gate 4 MERGE_CONFIDENCE = 95/100, merge documenté via `--admin`) — reprend et termine l'analyse déjà écrite par
@tellebma sur `pivot-collaboratif-core`#32 (issue bloquante identifiée en Gate 1 : collision
entre deux mécanismes de présence concurrents, `WhiteboardPresenceRegistry`/EN08.1 diffusant
un `PresencePayload` et `CanvasActionService`/US08.3.1 diffusant un `ParticipantsUpdatePayload`
sur le même topic). Résolution : `WhiteboardPresenceRegistry` devient un pur tracker de
liveness de session (plus de diffusion propre), la présence reste pilotée exclusivement par
JOIN/LEAVE applicatif, et une déconnexion sans LEAVE ne nettoie la présence que si c'était la
dernière session active de l'utilisateur sur ce board (corrige le bug multi-onglets).
Clarification Gate 1 : le "timeout de déconnexion silencieuse 30s" de cette US est satisfait
par le heartbeat STOMP natif déjà configuré (`WebSocketConfig`, US08.3.1 : 25s serveur / 30s
client) — pas de nouvelle tâche `@Scheduled`, réutilisation d'un mécanisme déjà en place.
`PresencePayload` supprimé, `ParticipantsBroadcastService` extrait comme diffuseur unique.

**Reste à faire** (volet frontend, hors scope de ce rattrapage) : `PresencePanelComponent`
Angular (`pivot-collaboratif-ui`#22) — affichage panneau, limite 5+N, a11y, i18n, tests Vitest.
US08.3.2c (curseurs de présence) ne dépend que du **backend** de cette US (couleur
déterministe, liste des participants — voir sa propre section `Dépendances`) : **débloquée
par ce merge**, n'attend pas `PresencePanelComponent`.

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: In progress
Dépendances: EN08.1 (isolation WS room), EN08.2 (guard Angular)
