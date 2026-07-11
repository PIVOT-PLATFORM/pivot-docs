# US09.2.3 — Reset et revote, validation de l'estimation finale

**En tant que** facilitateur d'une room de planning poker
**Je veux** pouvoir relancer un tour de vote sur un ticket déjà révélé et valider une estimation
finale sur ce ticket
**Afin de** corriger un vote erroné ou un désaccord avant de figer l'estimation retenue par
l'équipe

Prolonge US09.2.2 (révélation, calcul du consensus). Consomme la forme figée par US09.2.1/
US09.2.2 : `PokerTicket{id, roomId, title, status['VOTING'|'REVEALED'], createdAt, revealedAt}` et
`PokerVote{id, ticketId, participantKey, value, createdAt, updatedAt}`.

**Origine — écart ADR-026 §2 comblé.** La ligne du tableau ADR-026 §2 consacrée à US09.2.2
mentionnait « reset et revote possibles » et « estimation finale validée et sauvegardée sur le
ticket », explicitement laissés hors périmètre par le Gate 1 de US09.2.2 (voir sa section « Hors
périmètre » et son « Écart documenté »). Arbitrage mainteneur (2026-07-11) : ADR-026 reste
inchangé, cette US couvre les deux capacités manquantes pour clore le périmètre v1 du tableau
ADR-026 §2 consacré au planning poker.

**Décision Gate 1 — deux capacités indépendantes, un seul ticket peut les combiner dans n'importe
quel ordre.** Reset (retour à `VOTING` depuis `REVEALED`, votes précédents effacés) et
finalisation (persistance d'une estimation retenue) ne sont pas séquentiels l'un par rapport à
l'autre : un facilitateur peut finaliser directement après une première révélation (sans jamais
reset), ou reset plusieurs fois avant de finaliser. Un ticket déjà finalisé (`final_estimate` non
nul) ne peut plus être reset ni re-finalisé — la finalisation est un état terminal pour ce ticket
(voir AC erreur).

**Décision Gate 1 — le reset efface les votes, pas l'historique de qui a voté.** Reset supprime
les lignes `PokerVote` du ticket concerné (nouveau tour = ardoise vierge, cohérent avec le
comportement de vote masqué de US09.2.1 : un participant ne doit pas voir d'anciennes valeurs
pré-remplies après un reset) et repasse `status` à `VOTING`, `revealed_at` à `null`. Aucune table
d'audit séparée n'est ajoutée par cette US (hors périmètre, voir plus bas) — seul le nombre de
resets effectués est exposé (compteur en mémoire de l'événement, pas persisté en base), à des
fins d'affichage UI uniquement.

**Décision Gate 1 — la finalisation persiste une valeur choisie par le facilitateur, pas
automatiquement le consensus calculé.** `mean`/`median`/`majority` (US09.2.2) restent des valeurs
calculées et jamais persistées telles quelles. La finalisation est un choix explicite du
facilitateur parmi les valeurs de `PokerCardDeck.FIBONACCI_VALUES` (typiquement, mais pas
obligatoirement, une des valeurs suggérées par le consensus affiché) — l'API accepte n'importe
quelle valeur du deck, pas seulement `mean`/`median`/`majority` arrondis, pour couvrir le cas où
l'équipe s'accorde sur une valeur différente du calcul automatique après discussion.

## Critères d'acceptation

### Reset et revote (backend `pivot-agilite-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une room active du tenant de l'appelant, l'appelant facilitateur, et un ticket `REVEALED` (non finalisé) de cette room, when `POST /api/agilite/poker/rooms/{roomId}/tickets/{ticketId}/reset`, then 200 OK avec `{ id, roomId, title, status: "VOTING", createdAt, revealedAt: null }` — toutes les lignes `PokerVote` de ce ticket sont supprimées en base avant la réponse | ⬜ |
| Given le reset ci-dessus, when il a lieu, then un événement `TICKET_RESET` est broadcasté sur `/topic/agilite/poker/{roomId}` : `{ type: "TICKET_RESET", roomId, ticketId }` — tout participant abonné (facilitateur inclus) doit effacer localement son vote sélectionné précédent et repasser en état « en attente de vote », même traitement UI qu'un nouveau ticket créé (US09.2.1) | ⬜ |
| Given un ticket repassé en `VOTING` par reset, when un participant vote (`SEND /app/agilite/poker/{roomId}/vote`, US09.2.1), then le vote est accepté normalement — aucune restriction liée à l'historique du ticket (un ticket resetté N fois se comporte, pour le vote, identiquement à un ticket jamais révélé) | ⬜ |
| Given un ticket resetté puis revoté, when le facilitateur le révèle à nouveau (`POST .../reveal`, US09.2.2), then le calcul du consensus ne porte que sur les votes du tour courant (post-reset) — aucune trace des votes effacés par le reset n'entre dans `mean`/`median`/`majority`/`values` | ⬜ |

### Finalisation de l'estimation (backend `pivot-agilite-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une room active du tenant de l'appelant, l'appelant facilitateur, et un ticket `REVEALED` (non finalisé) de cette room, when `POST /api/agilite/poker/rooms/{roomId}/tickets/{ticketId}/finalize` avec `{ finalEstimate: string }` où `finalEstimate` ∈ `PokerCardDeck.FIBONACCI_VALUES` (`"?"` inclus), then 200 OK avec `{ id, roomId, title, status: "REVEALED", createdAt, revealedAt, finalEstimate }` — la colonne `final_estimate` du ticket est renseignée en base avant la réponse | ⬜ |
| Given la finalisation ci-dessus, when elle a lieu, then un événement `TICKET_FINALIZED` est broadcasté sur `/topic/agilite/poker/{roomId}` : `{ type: "TICKET_FINALIZED", roomId, ticketId, finalEstimate }` | ⬜ |
| Given un ticket déjà finalisé (`final_estimate` non nul), when `GET .../tickets/{ticketId}` (ou tout endpoint de lecture exposant le ticket), then `finalEstimate` est présent dans la réponse — un ticket finalisé reste consultable indéfiniment avec sa valeur retenue, aucune expiration | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `roomId` inexistant ou d'un autre tenant, when `POST .../reset` ou `POST .../finalize`, then 404 — même convention anti-énumération que le reste du module (`RoomNotFoundException`) | ⬜ |
| Error : given une room valide mais un `ticketId` inexistant ou d'une autre room, when `POST .../reset` ou `POST .../finalize`, then 404 avec `TicketNotFoundException` (US09.2.2, réutilisée telle quelle) | ⬜ |
| Error : given un ticket encore `VOTING` (jamais révélé), when `POST .../reset`, then 409 avec une nouvelle exception dédiée `TicketNotRevealedException`, code `TICKET_NOT_REVEALED` — le reset n'a de sens que sur un ticket déjà révélé, jamais sur un ticket en cours de vote | ⬜ |
| Error : given un ticket encore `VOTING`, when `POST .../finalize`, then 409 avec la même `TicketNotRevealedException` — impossible de finaliser une estimation avant révélation | ⬜ |
| Error : given un ticket déjà finalisé (`final_estimate` non nul), when `POST .../reset` **ou** `POST .../finalize` à nouveau, then 409 avec une nouvelle exception dédiée `TicketAlreadyFinalizedException`, code `TICKET_ALREADY_FINALIZED` — la finalisation est un état terminal, aucune des deux actions ne peut plus s'appliquer à ce ticket | ⬜ |
| Error : given `POST .../finalize` avec un `finalEstimate` absent du deck `PokerCardDeck.FIBONACCI_VALUES`, when la requête est traitée, then 400 avec un message explicite listant les valeurs acceptées — même rigueur de validation qu'un vote invalide (US09.2.1) | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given un appelant authentifié du même tenant mais **pas** facilitateur, when `POST .../reset` ou `POST .../finalize`, then 403 avec `TicketFacilitatorOnlyException`/`FACILITATOR_ONLY` (US09.2.1/US09.2.2, réutilisée telle quelle — aucune nouvelle exception facilitateur) | ⬜ |
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal`, jamais depuis le corps/un paramètre/un header custom — règle transversale du repo | ⬜ |
| Security : test TI obligatoire prouvant qu'un reset supprime effectivement les lignes `PokerVote` en base (avant : N votes présents ; après : 0 vote pour ce ticket) | ⬜ |
| Security : test TI obligatoire prouvant qu'un appelant non-facilitateur du même tenant reçoit 403 sur `POST .../reset` et sur `POST .../finalize`, et que l'état du ticket reste inchangé après chaque tentative rejetée | ⬜ |
| Security : test TI obligatoire prouvant qu'un ticket finalisé rejette un second `POST .../finalize` et un `POST .../reset` (409 dans les deux cas), état du ticket inchangé après chaque tentative rejetée | ⬜ |

### Frontend (`pivot-agilite-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given le facilitateur consultant un ticket `REVEALED` non finalisé, when le board de room s'affiche, then deux actions lui sont proposées : « Relancer un vote » (reset) et « Valider l'estimation finale » (finalize, avec un sélecteur pré-rempli sur la valeur `majority` du consensus si non `null`, sinon vide) — aucune des deux n'est proposée aux participants non-facilitateurs (même règle que le bouton de révélation, US09.2.2) | ⬜ |
| Given le facilitateur clique sur « Relancer un vote », when la requête aboutit (réponse REST **ou** événement `TICKET_RESET`), then l'UI repasse à l'état de vote initial : cartes de vote à nouveau cliquables, résumé de consensus/valeurs révélées effacé, compteur « X/Y ont voté » remis à zéro — identique à l'affichage d'un nouveau ticket tout juste créé | ⬜ |
| Given le facilitateur valide une estimation finale, when la requête aboutit (réponse REST **ou** événement `TICKET_FINALIZED`), then le ticket affiche un badge « Estimation finale : {valeur} », les actions « Relancer un vote »/« Valider l'estimation finale » disparaissent (ticket terminal), le formulaire « Créer un ticket » redevient disponible (même condition que US09.2.2 : plus de ticket `VOTING` actif) | ⬜ |
| Given une erreur (403/404/409/400) lors d'un reset ou d'une finalisation, when elle survient, then un message d'erreur non bloquant s'affiche (mêmes conventions i18n que le reste du module) et l'état affiché du ticket reste inchangé | ⬜ |

### A11y

| Critère | 🤖 Dev |
|---------|--------|
| A11y : « Relancer un vote » et « Valider l'estimation finale » sont des `<button>` natifs, navigables au clavier ; le sélecteur de valeur de finalisation est un élément de formulaire natif (`<select>` ou équivalent ARIA), jamais une simple liste cliquable sans sémantique de formulaire | ⬜ |
| A11y : le badge « Estimation finale » et la confirmation de reset sont annoncés dans la même région `aria-live="polite"` déjà utilisée pour le résumé de consensus (US09.2.2) | ⬜ |
| A11y : tous les nouveaux libellés (boutons, badge, sélecteur, erreurs) sont externalisés via Transloco (`fr.json`/`en.json`) — aucune chaîne littérale dans les templates | ⬜ |

## Hors périmètre

- **Historique des resets d'un ticket** (qui a resetté, quand, combien de fois de façon persistée/consultable) — seul un compteur en mémoire côté UI est affiché pendant la session, non persisté en base, non ajouté à cette US
- **Historique des estimations finales de la room/de l'équipe** (liste consultable de tous les tickets finalisés avec leur valeur) — hors périmètre, pourrait faire l'objet d'une US dédiée si le besoin émerge (ex. export vers le domaine Pilotage)
- **Modification d'une estimation finale déjà validée** (correction après coup sans repasser par reset+revote+finalize) — la finalisation reste un état terminal strict, aucun endpoint de correction directe n'est ajouté
- **Distribution/dispersion des votes** — toujours hors v1 (ADR-026 §2, US09.2.2 déjà)
- **Notification/rappel automatique si un ticket reste longtemps `REVEALED` sans finalisation** — hors périmètre

## Notes d'implémentation

- **Backend** : migration Flyway `agilite` — ajout colonne `agilite.poker_tickets.final_estimate VARCHAR` nullable (pas de nouvelle table). Nouvelles exceptions `TicketNotRevealedException`/`TicketAlreadyFinalizedException` (`GlobalExceptionHandler`). Extension `PokerTicketService`/`PokerTicketController` : deux nouveaux endpoints (`reset`, `finalize`) sur le même contrôleur que `reveal` (US09.2.2). Tests : extension `PokerTicketServiceTest`/`PokerTicketControllerIT` (Testcontainers) couvrant les deux nouveaux endpoints, tous les cas d'erreur ci-dessus, et la suppression effective des votes en base après reset.
  - **`pom.xml` : ne pas toucher** — hard block CLAUDE.md sur `pivot-core-starter`.
- **Frontend** : étend `RoomBoardComponent`/`TicketService`/`ticket.model.ts` — nouveaux `resetTicket(roomId, ticketId)`/`finalizeTicket(roomId, ticketId, finalEstimate)` sur `TicketService`, nouveaux types `TicketResetEvent`/`TicketFinalizedEvent` (`RoomTopicEvent` étendu), nouveaux signaux `finalEstimate`/`resetCount` (UI uniquement, non persisté) sur `RoomBoardComponent`.
- **Convention réutilisée** : anti-énumération 404, masquage d'identité, réutilisation stricte de `TicketFacilitatorOnlyException`/`TicketNotFoundException` (US09.2.1/US09.2.2) — aucune nouvelle exception facilitateur ou "not found", seulement les deux exceptions propres au nouveau comportement (`TicketNotRevealedException`, `TicketAlreadyFinalizedException`).

---
Item Type: US · Parent: F09.2 · Module: agilite · Repo: pivot-agilite-core/ui · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US09.2.2
