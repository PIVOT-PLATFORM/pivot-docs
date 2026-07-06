# EN04.1 — Logs structurés JSON + MDC

## Contexte

- **Enabler** : [`EN04.1`](pathname:///pivot-docs/backlog/EPIC-observabilite/ENABLERS/en-logs-structures) · Parent `E04` (Observabilité)
- **Repo** : `pivot-core`
- **PR** : [PIVOT-PLATFORM/pivot-core#156](https://github.com/PIVOT-PLATFORM/pivot-core/pull/156) (`feat/en04-1-logs-structures`)
- **Dernier commit au moment du figeage** : `d768815` (`fix(backend): sanitize caller-supplied X-Request-Id before MDC/response`)
- **Gate 2 (coverage)** : 100 % couverture instructions (JaCoCo) sur les 2 classes ajoutées (`RequestMdcFilter`, `StartupLogListener`)
- **Gate 4 (merge confidence)** : 100/100 — `MERGE_AUTONOMOUS` (voir commentaire PR)

## Spec fonctionnelle

### Sortie JSON

`logback-spring.xml` sélectionne l'encodeur console selon le profil Spring actif :

- Profil `test` : pattern texte lisible (défaut Spring Boot) — rien ne consomme ce flux en JSON,
  préserve la lisibilité des logs de test/CI.
- Tout autre profil (dont `dev`, utilisé par `compose.yml` en local, et tout futur profil `prod`) :
  `net.logstash.logback.encoder.LogstashEncoder` — une ligne JSON par événement, champ `service`
  ajouté (valeur de `spring.application.name`).

Aucune exception « dev local lisible » : aucune convention existante (`application-dev.yml`,
`application-local.yml`) ne le justifiait au moment de l'implémentation, et l'AC demande du JSON
« sur tous les backends » sans exception explicite.

### MDC par requête HTTP

`RequestMdcFilter` (`fr.pivot.config`, `OncePerRequestFilter`) est câblé dans `SecurityConfig` juste
après `TokenAuthenticationFilter` (`addFilterAfter`). Pour chaque requête :

1. **`requestId`** : repris du header entrant `X-Request-Id` s'il est présent et non vide, sinon un
   `UUID.randomUUID()` est généré. La valeur entrante est neutralisée (CR/LF supprimés — CWE-117 log
   forging) et tronquée à 128 caractères avant d'être utilisée. Posé en MDC puis échoit sur la
   réponse via le même header (exposé côté CORS, voir `SecurityConfig#corsConfigurationSource`).
2. **`tenantId` / `userId`** : lus depuis `SecurityContextHolder` — si
   `Authentication#getDetails()` est une instance de `User` (posée par `TokenAuthenticationFilter`),
   les clés primaires numériques (`public.users.id` / `public.tenants.id`) sont copiées en MDC.
   Absents pour une requête anonyme (ex. `/auth/login`) ou si `getDetails()` n'est pas un `User`
   (ex. futur chemin OIDC pur).
3. **Nettoyage** : `MDC.clear()` dans un bloc `finally` — couvre le succès, une exception non gérée
   et un abandon client, afin qu'aucune valeur ne fuite sur le thread d'un pool vers une requête
   suivante sans rapport.

### MDC STOMP/WebSocket — différé

Aucun handler `@MessageMapping` ni `ChannelInterceptor` STOMP n'existe dans `pivot-core` au moment
de cet Enabler (seule la dépendance `spring-boot-starter-websocket`, inutilisée, est présente). Le
même pattern (MDC posé/nettoyé autour du traitement, `requestId`/`userId` + `boardId`/`sessionId`)
sera appliqué via un `ChannelInterceptor` sur le canal STOMP entrant dès qu'un premier handler sera
introduit (typiquement EN08.1/whiteboard ou équivalent). **Écart vs AC initial** : ce critère de
l'Enabler reste non coché — rien à instrumenter aujourd'hui, voir « Écarts » ci-dessous.

### Log de démarrage

`StartupLogListener` écoute `ApplicationReadyEvent` (serveur déjà démarré, `local.server.port`
résolu) et logue `event=APPLICATION_STARTED version={} port={} profile={}` :

- `version` : `BuildProperties#getVersion()`, injecté via `ObjectProvider` (absent pendant la phase
  `test` de Maven, qui précède `prepare-package` où `build-info` génère le fichier — fallback
  `"unknown"`).
- `port` : `local.server.port`, sinon `server.port`, sinon `"unknown"`.
- `profile` : profils actifs joints par `,`, ou `"default"` si aucun.

### Aucune donnée personnelle

`userId` en MDC est l'id numérique `public.users.id`, jamais l'email/le nom/le token — cohérent avec
tous les logs structurés déjà présents dans ce repo (`TokenService`, `AuditService`,
`ModuleActivationService`, `ModuleController`…). Pas de hachage SHA-256 : il s'agit d'une clé de
substitution interne, pas d'une donnée personnelle au sens des exemples de l'AC (email, mot de
passe, token) — voir le commentaire Gate 4 pour le raisonnement complet.

## Contrat technique

| Élément | Détail |
|---|---|
| `RequestMdcFilter.REQUEST_ID_HEADER` | `"X-Request-Id"` — lu en entrée, posé en sortie |
| Clés MDC | `requestId` (toujours), `tenantId` / `userId` (si authentifié avec un `User`) |
| Ordre filtre | `TokenAuthenticationFilter` → `RequestMdcFilter` → suite de la chaîne Spring Security |
| En-tête CORS exposé | `X-Request-Id` ajouté à `corsConfigurationSource()` |
| Dépendance ajoutée | `net.logstash.logback:logstash-logback-encoder:9.0` (scope `runtime`) |
| Build | `spring-boot-maven-plugin` — exécution `build-info` ajoutée (génère `BuildProperties`) |
| Fichier config | `src/main/resources/logback-spring.xml` |

## Écarts vs ACs initiaux

- **MDC STOMP** (`requestId`/`userId`/`boardId`/`sessionId` sur les handlers WebSocket) : non
  implémenté — aucun handler STOMP n'existe dans ce repo à date. Documenté comme différé plutôt que
  simulé par un handler fictif. À reprendre dès l'introduction du premier handler STOMP.
- Aucun autre écart — les 7 autres critères de complétion sont implémentés et testés.

## Tests

- `RequestMdcFilterTest` (12 tests) : génération/reprise/neutralisation/troncature du `requestId`,
  écho sur la réponse, contenu MDC pendant l'exécution de la chaîne (`ListAppender` Logback) pour les
  cas authentifié+tenant / anonyme / détails non-`User` / utilisateur sans tenant, nettoyage MDC
  après la requête (succès et exception).
- `StartupLogListenerTest` (6 tests) : version/port/profil, y compris les cas `BuildProperties`
  absent et aucun profil actif.
