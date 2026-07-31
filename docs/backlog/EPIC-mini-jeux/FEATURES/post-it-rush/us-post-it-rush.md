# US47.2.1 — Jouer à Post-it Rush

**En tant que** participant à une pause d'équipe
**Je veux** cliquer sur des post-its qui apparaissent et disparaissent avant expiration
**Afin de** m'amuser sur un mini-jeu de rapidité avec mon équipe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un participant dans une room Post-it Rush, when l'animateur démarre une manche, then le serveur diffuse `ROUND_STARTED` (`{ roundId, durationSeconds, startedAt }`, défaut `durationSeconds=90`) et chaque client affiche le décompte et l'aire de jeu — **le serveur fait autorité d'horloge**, le décompte client est purement visuel | ⬜ |
| Given une manche en cours, when le serveur planifie un post-it, then il diffuse `POSTIT_SPAWNED` (`{ postitId, x, y, colorKey, spawnedAt, lifespanMs }`, `lifespanMs` défaut aléatoire 1200–2500 ms) et, si le post-it n'est pas cliqué avant `lifespanMs`, diffuse `POSTIT_EXPIRED` (`{ postitId }`) — positions et timings générés côté serveur, jamais décidés par le client | ⬜ |
| Given un post-it actuellement vivant pour le participant P, when P le clique avant expiration, then le serveur enregistre le hit, attribue `basePoints` (défaut 10) × multiplicateur de combo courant, diffuse `POSTIT_CLAIMED` (`{ postitId, participantId }`) — le post-it disparaît pour tous — et renvoie le score mis à jour du participant | ⬜ |
| Given un participant avec une série de clics réussis consécutifs, when chaque clic réussi est validé, then le compteur de combo s'incrémente et le multiplicateur suit l'échelle documentée (×1 pour les hits 1–2, ×2 pour 3–5, ×3 pour 6+) ; when le participant rate (clic sur un post-it déjà pris/expiré, ou laisse un post-it expirer), then le combo repart à 0 et le multiplicateur à ×1 — multiplicateur calculé côté serveur | ⬜ |
| Given une manche en cours, when le score d'un participant change, then le serveur diffuse `LEADERBOARD_UPDATED` (`{ entries: [{ participantId, displayName, score, rank }] }`, tri score décroissant, départage par ordre d'atteinte du score) au plus toutes les 500 ms (throttle) et chaque client réaffiche le classement en direct avec la ligne du participant courant mise en évidence | ⬜ |
| Given un code de room valide, when un utilisateur ouvre l'URL de room et soumet le code (utilisateur PIVOT authentifié **ou** anonyme avec un nom d'affichage choisi), then le serveur l'admet, lui assigne un `participantId` stable pour la manche et diffuse `PARTICIPANT_JOINED` — un participant anonyme n'a jamais à se connecter | ⬜ |
| Given le timer de manche qui atteint 0, when la manche se termine, then le serveur diffuse `ROUND_ENDED` et expose le classement final via `GET .../results` (`{ standings: [{ rank, participantId, displayName, score, hits, bestCombo }] }`) affiché à tous les participants | ⬜ |
| Given un participant déconnecté en cours de manche, when il rejoint avec le même code dans la fenêtre de la manche, then le client réhydrate une fois via `GET .../state` (temps restant, post-its actuellement vivants, propre score/combo) puis reprend les diffusions — sans double comptage des clics antérieurs | ⬜ |
| Given une room au seuil doux documenté (défaut 50 joueurs actifs) et au seuil dur (défaut 200), when le nombre de participants dépasse le seuil doux, then le serveur dégrade progressivement (throttle leaderboard élargi, top-N tronqué, batch des diffusions) et, au seuil dur, place les nouveaux arrivants en état `SPECTATOR`/file d'attente avec un message explicite — **jamais** de blocage brutal ni de verrou temporisé (contre-modèle explicite : verrou quota 30 jours Mentimeter) | ⬜ |
| Error : given un post-it déjà expiré ou déjà pris par un autre participant, when un participant le clique, then le serveur rejette le hit `409 POSTIT_UNAVAILABLE` (aucun point, et le clic compte comme un raté qui casse le combo du cliqueur) ; un clic référençant un `postitId` inconnu ou une manche non en cours renvoie `404` / `409 ROUND_NOT_ACTIVE` | ⬜ |
| Error : given une tentative de join, when le code est inconnu/expiré then `404 ROOM_NOT_FOUND` ; when la room est au seuil dur then `409 ROOM_FULL` (repli spectateur proposé) ; when un nom d'affichage anonyme est vide, > 40 caractères, ou identique à un nom actif de la room then `400 INVALID_DISPLAY_NAME` | ⬜ |
| Security : le score est calculé **exclusivement côté serveur** — le client n'envoie que `{ postitId }` (jamais de score/points/combo) ; le serveur seul valide que le post-it était vivant dans sa fenêtre d'autorité, calcule points × multiplicateur et persiste le score ; tout champ de score fourni par le client est ignoré ; le calendrier de spawn n'est jamais pré-divulgué au client | ⬜ |
| Security : isolation de room et cloisonnement tenant — un participant de la room A ne reçoit via STOMP et REST que les événements/état de la room A (autorisation vérifiée depuis le grant de join / le token, tenant dérivé côté serveur jamais d'un paramètre client) ; une requête sur le `roomId` d'une autre room renvoie `403`/`404` sans fuite d'existence ; un rate-limit plafonne les soumissions de clic par participant (`429` au-delà d'un débit humain plausible) pour empêcher le farming automatisé de points | ⬜ |
| A11y (WCAG 2.1 AA) : chaque post-it vivant est un contrôle focusable et activable au clavier (Entrée/Espace) avec un nom accessible ; le décompte par seconde **n'est pas** annoncé au lecteur d'écran (anti-flooding), seuls le début de manche et « temps écoulé » le sont via une région live assertive visuellement masquée ; le leaderboard est `aria-live="polite"` ; l'identité/état d'un post-it ne repose jamais sur la couleur seule (`colorKey` + forme/libellé) et le retour hit/raté est non chromatique (icône/texte) ; `prefers-reduced-motion` atténue les animations d'apparition/disparition | ⬜ |

## Hors périmètre

- Rôle animateur/host distinct des joueurs comme entité de permissions dédiée (pattern Kahoot) — non tranché au niveau E47, le déclencheur de manche est ici un participant hôte simple ; à qualifier avec le mainteneur avant toute Feature dédiée.
- Persistance historique des parties et statistiques longue durée au-delà des KPI agrégés d'EN47.1 (`minijeux.*`).
- Personnalisation du contenu (couleurs/thèmes de post-its configurables par l'utilisateur) — l'aire de jeu utilise le jeu de `colorKey` du design system.
- Matchmaking public / rooms inter-tenants — les rooms restent cloisonnées par tenant.

## Notes d'implémentation

- **Repo cible** : backend `pivot-collaboratif-core` (schéma Flyway `collaboratif`), frontend `pivot-collaboratif-ui` — voir E47. Pré-requis EN17 (pivot-core-starter + `@pivot/ui-core` publiés).
- **Autorité serveur** : calquer le pattern de l'activité QUIZ (US19.3.1, spec figée `docs/specs/EPIC-module-session/us19-3-1-quiz.md`) — le serveur est la source de vérité du timing ; la fenêtre de validité d'un post-it est tranchée serveur, le décompte client est indicatif.
- **Temps réel** : un **seul** topic STOMP par room, différencié par le champ `type` de l'événement (convention module collaboratif, US19.2.2) — topic proposé `/topic/collaboratif/minijeu/{roomId}`. Événements : `ROUND_STARTED`, `POSTIT_SPAWNED`, `POSTIT_EXPIRED`, `POSTIT_CLAIMED`, `LEADERBOARD_UPDATED`, `PARTICIPANT_JOINED`, `ROUND_ENDED`.
- **Endpoints REST** (racine proposée `${collaboratifApiUrl}/minijeux/postit-rush/{roomId}`) : `POST .../start` (204), `POST .../click` corps `{ postitId }` (200 score, sinon `409`/`404`), `POST .../join` corps `{ code, displayName? }`, `GET .../state` (réhydratation), `GET .../results` (classement final). Cycle de room et join par code partageables avec les autres mini-jeux E47 (F47.1/F47.3) — factoriser si possible.
- **Entités/champs impliqués** : `PostitRushRoom` (`id`/`roomId`, `joinCode` 6 caractères, `tenantId`, `status`, `softCap`=50, `hardCap`=200), `PostitRushParticipant` (`participantId`, `roomId`, `displayName`, `userId?` nullable pour anonyme, `role` PLAYER/SPECTATOR, `score`, `currentCombo`, `bestCombo`, `hits`), `PostitRushRound` (`roundId`, `durationSeconds`=90, `startedAt`, `endedAt`), `PostitRushSpawn` (`postitId`, `roundId`, `x`, `y`, `colorKey`, `spawnedAt`, `lifespanMs`, `claimedBy?`, `expired`). Constantes de scoring : `basePoints`=10 ; échelle combo ×1 (1–2) / ×2 (3–5) / ×3 (6+).
- **KPI** : les parties/joueurs alimentent EN47.1 (`minijeux.games_played`, `minijeux.active_players`, `minijeux.completion_rate`, `minijeux.avg_engagement`) — émettre les événements de comptage correspondants.
- **Anti-triche** : rate-limit serveur sur `POST .../click` par `participantId` ; le spawn n'est jamais anticipé côté client ; aucun champ score/points accepté en entrée.

---
Item Type: US · Parent: F47.2 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Rôle: utilisateur-final
