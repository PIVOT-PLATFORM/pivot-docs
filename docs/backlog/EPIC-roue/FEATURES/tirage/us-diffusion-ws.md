# US14.3.1 — Diffusion du résultat du tirage en temps réel (WebSocket)

**En tant que** participant à une session avec La Roue
**Je veux** voir le résultat du tirage s'afficher en temps réel sur mon écran
**Afin de** suivre l'animation du tirage collectivement, sans avoir à recharger la page ou
interroger l'API en boucle (polling)

Prolonge US14.2.1 (tirage pondéré anti-repeat déjà en place, `POST /wheels/{wheelId}/spin`
retourne `{ wheelId, entryId, label, drawnAt, antiRepeatMode }`, `GET /wheels/{wheelId}/draws`
pour l'historique). Ne couvre que la diffusion temps réel du résultat déjà calculé — le calcul du
tirage lui-même (algorithme pondéré, anti-repeat, persistance) est hors périmètre, entièrement
couvert par US14.2.1.

## Critères d'acceptation

### Diffusion WebSocket (backend `pivot-agilite-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un tirage réussi via `POST /wheels/{wheelId}/spin` (US14.2.1), when le tirage est durablement persisté (voir AC "Timing de diffusion" ci-dessous), then le résultat est diffusé en STOMP sur le topic `/topic/agilite/wheels/{wheelId}` | ⬜ |
| Given le message diffusé, when il est construit, then son payload est exactement la forme `WheelSpinResponse` déjà définie par US14.2.1 — `{ wheelId, entryId, label, drawnAt, antiRepeatMode }` (JSON), sans champ supplémentaire, sans enveloppe/discriminant `type` (voir Notes d'implémentation — un seul type d'événement sur ce topic, contrairement au topic retro qui en porte plusieurs) | ⬜ |
| Given un tirage sur une roue dont **aucun** client n'est actuellement abonné au topic, when la diffusion est déclenchée, then aucune erreur n'est levée et la requête `POST /spin` répond normalement (`SimpMessagingTemplate#convertAndSend` vers un topic sans abonné est un no-op silencieux — comportement Spring documenté, déjà implicite dans `RetroPhaseService`/`RetroCardService`) | ⬜ |
| Given plusieurs clients actuellement abonnés au topic `/topic/agilite/wheels/{wheelId}` (plusieurs participants regardant la même roue), when un tirage est diffusé, then **chacun** des clients abonnés reçoit le même message (sémantique broadcast standard d'un topic STOMP, aucune logique applicative supplémentaire requise) | ⬜ |
| Given l'appelant qui a lui-même déclenché le tirage (`POST /spin`) est *également* abonné au topic de cette roue au moment de la diffusion, when la diffusion a lieu, then il reçoit aussi le message diffusé, en plus de la réponse HTTP 201 — ce doublon est attendu et sans effet de bord (voir AC frontend "Dédoublonnage de l'historique" ci-dessous, pas de logique serveur pour l'éviter) | ⬜ |

### Timing de diffusion — durabilité avant broadcast

| Critère | 🤖 Dev |
|---------|--------|
| Given la transaction Spring qui persiste le tirage (`WheelDrawService#spin`, `@Transactional`), when la diffusion STOMP est déclenchée, then elle n'a lieu **qu'après confirmation du commit** de cette transaction (`TransactionSynchronizationManager#registerSynchronization` + callback `afterCommit`), jamais de façon synchrone avant le commit — voir Notes d'implémentation pour la justification (diverge délibérément du pattern `RetroPhaseService`/`RetroCardService` qui diffusent de façon synchrone avant commit) | ⬜ |
| Given un rollback de la transaction de tirage après l'appel à `wheelDrawRepository.save(...)` mais avant le commit effectif (scénario défensif — aucun chemin actuel ne provoque un tel rollback après ce point, mais la garantie doit tenir structurellement), when le rollback survient, then **aucun** message n'est diffusé sur le topic — un tirage non durablement persisté ne doit jamais apparaître côté audience live | ⬜ |

### Sécurité — abonnement WebSocket

| Critère | 🤖 Dev |
|---------|--------|
| Security : seul un membre authentifié de l'équipe propriétaire de la roue peut s'abonner à `/topic/agilite/wheels/{wheelId}` — abonnement (frame STOMP `SUBSCRIBE`) intercepté par un nouveau `WheelChannelInterceptor` (package `fr.pivot.agilite.wheel.ws`, adapte le pattern EN09.1/`PokerChannelInterceptor` — voir Notes d'implémentation pour pourquoi le mécanisme d'autorisation diffère du grant à jeton opaque de poker/retro) | ⬜ |
| Security : l'identité du souscripteur (`userId`/`tenantId`) est résolue **exclusivement** depuis un token porteur présenté sur l'en-tête natif STOMP `Authorization` (valeur `Bearer <token>`, même convention que les endpoints REST), validé via le même bean `AuthenticatedPrincipalResolver`/`TokenValidationService` que `RequestPrincipalResolver` (REST) — jamais un `teamId`/`tenantId`/`userId` fourni tel quel par le client (header custom, query STOMP, ou corps de frame) | ⬜ |
| Security : l'appartenance à l'équipe propriétaire de la roue est vérifiée en réutilisant **la même autorité** que les endpoints REST (`WheelService`, nouvelle méthode `isAccessibleTo(wheelId, callerUserId, tenantId)` exposant, sans lever d'exception, exactement la même résolution existence+tenant+appartenance-équipe que `WheelService#resolveAccessibleWheel`/`WheelDrawService#resolveAccessibleWheel`) — aucune logique d'autorisation dupliquée ou divergente entre REST et WebSocket pour cette même roue | ⬜ |
| Security : toute condition de refus (en-tête `Authorization` absent, token malformé/inconnu/expiré/révoqué, `wheelId` non parseable en UUID, roue inexistante, roue d'un autre tenant, appelant non-membre de l'équipe propriétaire) est traitée de façon **indifférenciée** — la frame `SUBSCRIBE` est silencieusement rejetée (jamais d'abonnement établi), une notification d'erreur générique est envoyée sur `/user/queue/errors` du souscripteur, et la connexion WebSocket **n'est pas fermée** (les autres abonnements actifs de la même session restent valides) — même convention anti-énumération que les 404 REST d'US14.1.1/US14.2.1, adaptée au contexte WS (pas de code HTTP, message générique uniforme) | ⬜ |
| Security : test TI obligatoire prouvant qu'un utilisateur authentifié qui **n'est pas membre** de l'équipe propriétaire de la roue (même tenant, équipe différente) voit sa tentative d'abonnement rejetée — mirroring direct du précédent EN09.1 (`PokerRoomIsolationIT`) | ⬜ |
| Security : test TI obligatoire prouvant qu'un utilisateur authentifié d'un **tenant différent** voit sa tentative d'abonnement rejetée (même garantie qu'US14.1.1/US14.2.1 côté REST, étendue au WS) | ⬜ |
| Security : test TI obligatoire prouvant qu'un utilisateur authentifié **membre** de l'équipe propriétaire de la roue s'abonne avec succès et reçoit la diffusion d'un tirage réel déclenché via `POST /spin` | ⬜ |
| Aucun rate-limiting ni autorisation de frame `SEND` n'est implémenté sur ce topic — **décision Gate 1 documentée**, pas un oubli : contrairement au planning poker (votes) et à la rétrospective (soumission de cartes), aucune destination applicative cliente-vers-serveur (`/app/agilite/wheels/...`) n'existe pour cette US — la diffusion est exclusivement un push serveur-vers-clients déclenché par `POST /spin` (REST, déjà rate-limité par les protections HTTP standard) ; il n'y a donc rien à limiter côté frame `SEND` sur ce topic | ⬜ |

### Erreurs

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un segment `{wheelId}` de la destination `SUBSCRIBE` qui n'est pas un UUID valide, when la frame est traitée, then l'abonnement est rejeté silencieusement (même traitement indifférencié que les autres refus — voir AC sécurité), sans exception non gérée qui remonterait au niveau transport | ⬜ |
| Error : given une frame `SUBSCRIBE` vers un topic hors du préfixe `/topic/agilite/wheels/` (tout autre trafic WebSocket du module — poker, retro, infrastructure STOMP), when `WheelChannelInterceptor` l'intercepte, then la frame est transmise inchangée sans aucun traitement (l'interceptor n'agit que sur son propre préfixe de destination, comme `PokerChannelInterceptor`/`RetroChannelInterceptor`) | ⬜ |

### Frontend (`pivot-agilite-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given la page de détail d'une roue (`WheelDetailComponent`, US14.2.1) affichée, when le composant s'initialise, then il ouvre une connexion STOMP vers `/ws/agilite` et s'abonne à `/topic/agilite/wheels/{wheelId}` de la roue affichée, en présentant le token porteur disponible sur l'en-tête natif `Authorization` de la frame `SUBSCRIBE` (voir Notes d'implémentation — limite documentée EN17.3 : ce repo n'a aujourd'hui aucun token disponible à transmettre, exactement comme `WheelApiService` pour ses appels REST ; le mécanisme est câblé, la valeur réelle suivra EN17.3) | ⬜ |
| Given un message reçu sur le topic de la roue affichée, when il est traité, then le nom (`label`) de l'entrée tirée s'affiche dans la même zone `aria-live="polite"` déjà utilisée par US14.2.1 pour le résultat d'un tirage déclenché localement (réutilisation du même signal `lastResultLabel`/de la même région, pas une seconde zone de résultat) | ⬜ |
| Given un message reçu sur le topic, when il est traité, then l'entrée correspondante est ajoutée en tête de la liste d'historique affichée (`draws`), construite directement depuis les champs du message (`entryId`, `label`, `drawnAt`) sans nouvel appel `GET /draws` — sauf si elle y figure déjà (voir AC dédoublonnage ci-dessous) | ⬜ |
| Given l'utilisateur qui vient de déclencher lui-même le tirage (réponse HTTP 201 déjà traitée par `spin()`, qui rafraîchit `draws` via `GET /draws`) et qui reçoit *également* la diffusion WebSocket de ce même tirage (AC backend "doublon attendu"), when le message WebSocket est traité, then aucune entrée dupliquée n'apparaît dans la liste affichée — dédoublonnage par paire `(entryId, drawnAt)` avant ajout en tête de liste (un rafraîchissement HTTP complet de `draws` remplace de toute façon intégralement la liste locale, donc ce cas s'auto-corrige même sans le dédoublonnage explicite, qui reste ajouté par robustesse contre un effet de bord transitoire visible) | ⬜ |
| Given une perte de connexion WebSocket (réseau, redémarrage backend), when la connexion est rétablie automatiquement (reconnexion intégrée du client `@stomp/rx-stomp` déjà utilisé par `RoomWsService`/`RetroSessionWsService`, aucun nouveau mécanisme à écrire), then l'abonnement au topic de la roue affichée est automatiquement rétabli (comportement natif de `RxStomp#watch` : les observables actifs se ré-abonnent après reconnexion) sans action utilisateur ni rechargement de page | ⬜ |
| Given le composant quitté (navigation hors de la page de détail), when il est détruit, then la connexion STOMP et son abonnement sont fermés proprement (pas de fuite de connexion, mirroring `RoomWsService#disconnect`/`RetroSessionWsService#disconnect`) | ⬜ |

### A11y

| Critère | 🤖 Dev |
|---------|--------|
| A11y : la zone de résultat (`aria-live="polite"`, déjà posée par US14.2.1) annonce indifféremment un résultat déclenché localement ou reçu par diffusion WebSocket — un participant qui n'a pas cliqué lui-même sur « Lancer le tirage » entend/lit quand même l'annonce du résultat | ⬜ |

## Hors périmètre

- Animation de rotation de la roue (rotation CSS avant affichage du résultat, durée configurable
  3–5 s, présente dans le stub initial de cette US) — **retiré du périmètre à Gate 1** : la tâche
  motrice de cette US se limite explicitement à la diffusion temps réel du résultat déjà calculé
  et à son affichage dans la zone existante, pas à une animation visuelle de la roue elle-même ;
  peut faire l'objet d'une US UX dédiée ultérieure si le produit le juge nécessaire, non tracée
  aujourd'hui
- Jeton d'accès opaque à la poker/retro (`RoomAccessGrantService`/`RetroAccessGrantService`) pour
  autoriser l'abonnement — **décision Gate 1** : une roue est scopée à une équipe permanente
  (comme ses endpoints REST existants), pas une session ad hoc rejointe par code d'invitation ;
  l'autorisation réutilise directement le token porteur + la vérification d'appartenance
  d'équipe déjà en place, sans jeton intermédiaire à émettre/stocker
- Frame `SEND`/destination applicative cliente-vers-serveur, rate-limiting associé — aucune
  action cliente n'existe sur ce topic (voir AC sécurité dédiée)
- Discriminant `type` dans le payload diffusé — un seul type d'événement sur ce topic ; à
  ajouter rétroactivement si une US future introduit un second type d'événement sur ce même topic (non nécessaire
  aujourd'hui, YAGNI)
- Réconciliation complète du token d'authentification frontend (`@pivot/ui-core`, EN17.3) — gap
  déjà documenté et accepté transversalement à tout `pivot-agilite-ui` (`WheelApiService`,
  `RoomWsService`, `RetroSessionWsService` n'attachent aujourd'hui aucun token réel) ; cette US
  câble le mécanisme (paramètre de token explicite) sans introduire de nouvelle dette au-delà de
  celle déjà existante
- Historique des tirages diffusé rétroactivement à un client qui s'abonne après coup (replay) —
  `GET /draws` (US14.2.1) reste le seul moyen de récupérer l'historique déjà existant au moment de
  l'abonnement ; le topic ne diffuse que les tirages qui ont lieu *pendant* que le client est
  abonné

## Notes d'implémentation

- **Backend** `pivot-agilite-core` :
  - Nouveau package `fr.pivot.agilite.wheel.ws` :
    - `WheelDestinations` — source unique de la destination STOMP (`TOPIC_WHEEL_PREFIX =
      "/topic/agilite/wheels/"`, méthode `wheelTopic(UUID)`, `extractWheelId(String, String)`) —
      mirroring direct de `PokerRoomDestinations`/`RetroSessionDestinations`.
    - `WheelChannelInterceptor implements ChannelInterceptor` — n'intercepte que la commande
      `SUBSCRIBE` vers `TOPIC_WHEEL_PREFIX` (aucune autre commande à traiter, voir AC "aucun
      rate-limiting/SEND"). Dépendances : `AuthenticatedPrincipalResolver` (bean du starter,
      implémenté par `TokenValidationService` — le **même** bean que `RequestPrincipalResolver`
      consomme côté REST, pas une nouvelle validation dupliquée) et `WheelService` (nouvelle
      méthode `isAccessibleTo`). Extrait le token du header natif `Authorization` avec le même
      préfixe `Bearer` (suivi d'un espace) que le REST (parsing local à la classe, mirroring délibérément dupliqué
      de `RequestPrincipalResolver#extractBearerToken` — même convention de petite duplication
      déjà établie par `PokerChannelInterceptor`/`RetroChannelInterceptor`, chacune définissant
      son propre header/constantes plutôt qu'une abstraction cross-domaine prématurée).
  - `WheelService` (US14.1.1) : nouvelle méthode publique `isAccessibleTo(UUID wheelId, Long
    callerUserId, Long tenantId): boolean` — réutilise exactement la même résolution
    existence+tenant+appartenance-équipe que la méthode privée existante
    `resolveAccessibleWheel`, sans lever d'exception (retourne un booléen), pour l'appel depuis
    l'interceptor WebSocket qui doit silencieusement refuser plutôt que lever une exception
    HTTP. Contrairement à la duplication assumée entre `WheelService` et `WheelDrawService` (PR
    séparées, US14.2.1), aucune contrainte de PR ne bloque un appel direct ici — pas de
    duplication supplémentaire introduite.
  - `WheelDrawService#spin` (US14.2.1) : nouvelle dépendance `SimpMessagingTemplate` (même bean
    que `RetroCardService`/`RetroPhaseService`, injection directe au constructeur, **pas**
    `@Lazy` — cette classe n'est pas elle-même un `ChannelInterceptor` enregistré pendant la
    phase de configuration du broker, contrairement à `WheelChannelInterceptor`). Après les deux
    appels `save(...)` déjà existants, diffusion planifiée via
    `TransactionSynchronizationManager.registerSynchronization(...)` avec un callback
    `afterCommit()` qui appelle `messagingTemplate.convertAndSend(WheelDestinations.wheelTopic(...),
    response)` — **diffusion différée après commit, décision délibérée** : contrairement à
    `RetroPhaseService#transitionTo`/`RetroCardService#submit` qui diffusent de façon synchrone
    juste après `save(...)` (avant le commit effectif de la transaction Spring), un tirage de
    roue est le résultat unique et non reproductible de toute la fonctionnalité — si la
    transaction venait à échouer après l'appel de diffusion mais avant le commit (fenêtre de
    risque réelle bien que restreinte : un flush JPA différé peut échouer à la validation d'une
    contrainte au commit), une audience en direct aurait déjà vu un gagnant qui n'a in fine
    jamais existé en base, sans aucun moyen de corriger cette impression a posteriori — un
    changement de phase retro erroné rejoué serait comparativement inoffensif et rare. Si
    `TransactionSynchronizationManager.isSynchronizationActive()` est faux (méthode invoquée hors
    d'un contexte transactionnel Spring réel — cas des tests unitaires Mockito purs comme
    `WheelDrawServiceTest`, qui n'ouvrent aucune transaction), repli défensif : diffusion
    immédiate, pour ne pas rendre ce comportement invisible/impossible à tester sans contexte
    Spring complet.
  - `WebSocketConfig` : ajoute `/topic/agilite/wheels` à `ROOM_BROKER_PREFIXES` (même
    `SimpleBroker` in-process que poker/retro — pub/sub éphémère mono-instance, pas besoin du bus
    durable EN07.3, disjoint des préfixes existants par construction) ; enregistre
    `WheelChannelInterceptor` aux côtés de `PokerChannelInterceptor`/`RetroChannelInterceptor`
    dans `configureClientInboundChannel`.
  - Tests : `WheelDestinationsTest` (TU), `WheelChannelInterceptorTest` (TU, mocks), et un TI
    dédié (`WheelWsIsolationIT`, mirroring `PokerRoomIsolationIT`) qui déclenche un **vrai**
    `POST /spin` via MockMvc pendant qu'un client STOMP réel est abonné, et vérifie la réception
    du broadcast avec le contrat exact — plus les scénarios de refus (non-membre, cross-tenant,
    token absent/invalide) sans fermeture de session.
- **Frontend** `pivot-agilite-ui` :
  - Nouveau `WheelWsService` (mirroring `RoomWsService`/`RetroSessionWsService` — même
    `StompClient`/`STOMP_CLIENT_FACTORY` dupliqués localement par convention déjà établie dans ce
    repo, pas d'abstraction cross-feature). `connect(topic: string, authToken: string | null)` —
    présente `authToken` sur l'en-tête natif `Authorization` (valeur `` `Bearer ${authToken}` ``
    si non nul) de la frame `SUBSCRIBE`, jamais sur `CONNECT`. Expose `messages$` (corps bruts,
    parsing délégué au composant, même choix que `RoomWsService`).
  - `WheelDetailComponent` (US14.2.1) : `ngOnInit` appelle `wheelWsService.connect(...)`,
    `ngOnDestroy` appelle `disconnect()` (implémente `OnDestroy`, absent aujourd'hui du composant
    — à ajouter). Le handler de message parse le JSON, met à jour `lastResultLabel` et ajoute en tête de
    `draws` (avec dédoublonnage `(entryId, drawnAt)` — voir AC dédié).
  - **Gap EN17.3 assumé** : comme `WheelApiService`, aucune source de token réelle n'existe
    encore dans ce repo (`@pivot/ui-core` non consommé) — `authToken` est câblé comme paramètre
    explicite mais vaut `null` en pratique tant qu'EN17.3 n'est pas livré ; la connexion WS
    échouera alors son autorisation exactement comme les appels REST échouent aujourd'hui sans
    `Authorization` (même gap documenté, pas un défaut introduit par cette US). Notion
    supplémentaire par rapport à l'auth REST : un intercepteur HTTP Angular (`AuthInterceptor`,
    futur EN17.3) ne peut structurellement pas intercepter des frames STOMP sur une connexion
    WebSocket — `@pivot/ui-core` devra donc, le moment venu, exposer un accesseur de token brut
    utilisable par ce service, pas uniquement un `HttpInterceptor` HTTP.

## Calcul Gate 1 (PO Agent)

| Check | Points | Justification |
|-------|--------|----------------|
| AC testables | 40/40 | Chaque AC est un Given/When/Then observable, mappé à un test précis (TU `WheelDestinationsTest`/`WheelChannelInterceptorTest`, TI `WheelWsIsolationIT`, Vitest `WheelWsService`/`WheelDetailComponent`) |
| Dépendances résolues | 20/20 | US14.2.1 mergée (`pivot-agilite-core#36`, `pivot-agilite-ui#31`) — `WheelSpinResponse`, `WheelDrawService`, page de détail de roue tous disponibles |
| Impact contrat de module | 15/15 | Aucun changement de contrat `PivotModule`/dépendance `pivot-core-starter` — additive uniquement (nouveau topic, nouvel intercepteur) |
| AC sécurité ≥ 1 | 15/15 | Groupe sécurité dédié (8 AC) : authentification bearer sur SUBSCRIBE, autorisation par appartenance d'équipe réutilisée, refus indifférencié, 3 TI obligatoires (non-membre, cross-tenant, membre valide) |
| Pas de cycle | 10/10 | US14.3.1 dépend uniquement d'US14.2.1 (déjà mergée) ; aucune US ne dépend d'US14.3.1 en aval de la vague 3 |
| **Total** | **100/100** | **Ready — implémentation autorisée** |

---
Item Type: US · Parent: F14.3 · Module: agilite · Repo: pivot-agilite-core/ui · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: US14.2.1
