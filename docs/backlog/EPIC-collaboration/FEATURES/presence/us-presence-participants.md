# US08.5.1 — Présence des participants sur le canvas

**En tant que** utilisateur connecté à un tableau
**Je veux** voir qui est en train d'éditer le tableau en même temps que moi
**Afin de** savoir avec qui je collabore en temps réel

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Panneau de présence affiché en haut du canvas : avatars (ou initiales) des participants connectés | ✅ |
| À chaque JOIN/LEAVE, message PARTICIPANTS_UPDATE émis sur /topic/whiteboard/{boardId}/presence avec liste complète des connectés | ✅ |
| Chaque participant a une couleur unique attribuée par le serveur au JOIN (parmi une palette de 12 couleurs distinctes) | ✅ |
| La couleur du participant est cohérente entre son curseur et son avatar dans le panneau de présence | ✅ |
| Limite d'affichage : les 5 premiers avatars sont visibles, le reste affiché en "+N" avec tooltip listant les noms | ✅ |
| Un utilisateur rejoignant un board non vide reçoit le PARTICIPANTS_UPDATE initial avec la liste courante | ✅ |
| Timeout de déconnexion silencieuse : participant sans heartbeat depuis 30s marqué comme déconnecté | ✅ |
| Viewer (role: viewer) apparaît dans la liste de présence avec label "Lecteur" | ✅ |
| Panneau de présence a aria-label="Participants en ligne" ; chaque avatar a aria-label="[displayName] — [rôle]" | ✅ |
| Overflow "+N" a aria-label="Et [N] autres participants : [liste des noms]" | ✅ |
| Labels "en ligne", "Lecteur", "Éditeur", tooltip noms internalisés dans whiteboard.presence.* (fr.json / en.json) | ✅ |
| Tests TI : JOIN émis → PARTICIPANTS_UPDATE contient le nouvel user ; LEAVE émis → PARTICIPANTS_UPDATE le retire | ✅ |
| Tests Vitest PresencePanelComponent (1 user, 5 users, overflow, déconnexion) | ✅ |
| Error : reconnexion réseau (<30s) → même userId retrouve sa présence sans doublon d'avatar ni nouveau JOIN dupliqué, couleur conservée | ✅ |
| Error : JOIN dupliqué du même userId (ex. multi-onglets) → un seul avatar affiché dans le panneau, dernière connexion active prioritaire | ✅ |
| Error : rupture WebSocket sans LEAVE propre (crash client) → timeout heartbeat 30s (cf. ci-dessus) retire le participant, jamais de présence fantôme persistante | ✅ |
| Security : le topic `/topic/whiteboard/{boardId}/presence` est isolé par room WS (EN08.1) — un utilisateur non membre du board ne peut pas s'y abonner (souscription STOMP refusée) | ✅ |
| Security : PARTICIPANTS_UPDATE n'expose que `userId`, `displayName`, `role`, `color` — jamais l'email ou d'autres données du profil utilisateur | ✅ |
| Security : isolation tenant — un participant d'un autre tenant ne peut ni apparaître dans, ni recevoir, le flux de présence d'un board qui ne lui appartient pas | ✅ |
| Tests TI : souscription au topic presence par un utilisateur non membre du board → refusée (aucun PARTICIPANTS_UPDATE reçu) | ✅ |

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

## Implémentation

- **Backend** (`pivot-collaboratif-core`, [PR #33](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/33),
  mergée) : résolution d'une collision de payload entre `WhiteboardPresenceRegistry` (EN08.1) et
  `CanvasActionService` (US08.3.1) qui diffusaient indépendamment deux formats incompatibles sur
  le même sous-topic `/presence` ; `WhiteboardPresenceRegistry` devient un pur tracker de liveness
  de session, `ParticipantsBroadcastService` extrait comme unique diffuseur `PARTICIPANTS_UPDATE`.
  Timeout de déconnexion silencieuse couvert par le heartbeat STOMP natif déjà configuré
  (`WebSocketConfig`, 25s serveur / 30s client, US08.3.1) plutôt que par une tâche `@Scheduled`
  dédiée — Spring ferme la session automatiquement, ce qui déclenche `SessionDisconnectEvent` →
  nettoyage déjà implémenté (pas de duplication d'un mécanisme existant, Gate 1 documenté sur la
  PR). Dédoublonnage JOIN multi-onglets par `ParticipantMetaStore.put` idempotent par `userId`.
  Nouveaux tests IT dédiés (`WhiteboardPresenceIT`) couvrant JOIN/LEAVE → PARTICIPANTS_UPDATE et
  crash sans LEAVE (dernière session active).
- **Frontend** (`pivot-collaboratif-ui`, [PR #34](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/34),
  issue [#22](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/issues/22)) :
  `PresencePanelComponent` — panneau d'avatars/initiales en haut à droite du canvas, limite 5 +
  overflow "+N" avec tooltip natif, label de rôle traduit (`Lecteur`/`Éditeur`/`Propriétaire`),
  couleur reprise telle quelle du payload serveur (jamais recalculée côté client, cohérente avec
  le curseur rendu par `WhiteboardPresenceComponent`/US08.3.2c). Réutilise l'`Observable`
  `WhiteboardSyncService.participantsUpdates$` déjà exposé depuis US08.3.2c pour le sous-topic
  `/topic/whiteboard/{boardId}/presence` — aucune souscription STOMP additionnelle. Nouvelles clés
  `whiteboard.presence.*` (fr.json/en.json), sans toucher à `cursorLabel` (US08.3.2c). 15 tests
  Vitest dédiés (1 participant, 5 participants — limite exacte, overflow 6/7 participants,
  déconnexion, rôle Lecteur, XSS, fallback initiales défensif, cleanup) — Gate 2 = 92/100 posté sur
  la PR, coverage `presence-panel.component.ts` 98.48 % lignes/statements.
- **Rattrapage traçabilité** : les cases à cocher de cette fiche (backend et frontend) n'avaient
  pas été mises à jour lors du merge de la PR backend #33 (même écart déjà rencontré et documenté
  sur US08.3.1/US08.3.2a, `sprint-5.md` §Rattrapage Gate 5 du 2026-07-07) — comblé ici sur les deux
  volets à l'occasion de cette PR de suivi.

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ✅
Dépendances: EN08.1 (isolation WS room), EN08.2 (guard Angular)
