# US16.1.3 — Badge notifications dans la navigation

## Contexte

- **US** : `docs/backlog/EPIC-shell-ux/FEATURES/navigation/us-badge-notifications.md` (F16.1 —
  Navigation, E16 — Shell UX)
- **PR** : `pivot-ui` [#103](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/103)
  (`feat/us16-1-3-badge-notifications`)
- **Dernier commit au moment du figeage** : `6d777f96` — `fix(a11y): aria-atomic="true" sur la
  région aria-live du badge (US16.1.3)`
- **Gate 2 COVERAGE** : coverage globale du repo 93.9 % stmts / 93.2 % branches / 95.7 % lignes ;
  `notification.service.ts` 100 %/100 %/100 % (10/10 AC couverts par les tests Vitest)
- **Gate 4 MERGE_CONFIDENCE** : 100/100 (Autoloop, 1 itération — un correctif mineur `aria-atomic`
  appliqué en auto-review avant publication du commentaire de revue)

## Spec fonctionnelle

Le bouton cloche de `NavbarComponent` (déjà présent avant cette US comme placeholder statique,
`aria-disabled="true"`) affiche désormais un badge numérique reflétant le nombre réel de
notifications non lues de l'utilisateur authentifié, mis à jour toutes les 30 secondes.

Comportement observable :

- **Chargement initial** : dès le montage de la navbar (shell authentifiée), un premier
  `GET /api/notifications/unread-count` est déclenché. Le badge apparaît dès la réponse si le
  compteur est `> 0`.
- **Polling** : toutes les 30 secondes ensuite, un nouveau `GET` rafraîchit le compteur. Le
  premier tick de polling n'est pas immédiat (la mise à jour initiale est portée par l'appel
  décrit ci-dessus, pas par le polling) — même pattern que `ExportService.pollStatus()`.
- **Badge masqué** : si le compteur vaut `0`, ou si le dernier `GET` a échoué après épuisement des
  tentatives (voir plus bas) — dans ce dernier cas, même si un compteur positif était connu avant
  l'échec.
- **Plafond d'affichage** : au-delà de 99, le badge affiche `"99+"`. L'`aria-label` du bouton et la
  région `aria-live` annoncent toujours le nombre exact (ex. `"127 notifications non lues"`),
  jamais la valeur plafonnée.
- **Erreur réseau** : un `GET` en échec est réessayé automatiquement avec un délai croissant (1 s
  puis 2 s — backoff exponentiel, base 1 s, facteur 2), pour un total de **3 tentatives** (1
  initiale + 2 réessais). Si les 3 échouent, le badge est masqué jusqu'au prochain tick de polling
  réussi (aucune tentative supplémentaire n'est faite avant les 30 s suivantes).
- **Accessibilité** : le bouton porte un `aria-label` dynamique et internationalisé
  (`"{{ count }} notifications non lues"` / `"{{ count }} unread notifications"`, ou
  `"Notifications"` générique quand le badge est masqué). Une région distincte
  (`<output class="sr-only" aria-live="polite" aria-atomic="true">`), placée en dehors du bouton,
  porte le même texte et déclenche l'annonce lecteur d'écran à chaque changement réel de valeur —
  le badge visuel lui-même reste `aria-hidden="true"` et ne porte jamais `aria-live` (évite les
  annonces répétées à chaque cycle de détection de changement Angular).
- **Portée** : seul le compteur est affiché. Le bouton reste `aria-disabled="true"` ("bientôt
  disponible") — la liste détaillée des notifications (dropdown, page dédiée) est hors périmètre
  de cette US.

## Contrat technique

### Fichiers introduits / modifiés (`pivot-ui`)

| Fichier | Rôle |
|---|---|
| `src/app/core/notifications/notification.model.ts` (nouveau) | `UnreadCountResponse { count: number }` — miroir de `fr.pivot.notification.dto.UnreadCountResponse` (pivot-core) |
| `src/app/core/notifications/notification.service.ts` (nouveau) | `fetchUnreadCount()` (GET + retry backoff), `poll()` (`interval(30_000)` + `switchMap`), signals `unreadCount`/`hasError` |
| `src/app/core/notifications/notification.service.spec.ts` (nouveau) | Tests service — voir § Tests |
| `src/app/core/layout/navbar/navbar.component.ts` | Câblage du badge existant sur `NotificationService` : `notifCount`, `notifBadgeText`, `notifAriaLabel`, constructeur (fetch initial + polling `takeUntilDestroyed`) |
| `src/app/core/layout/navbar/navbar.component.spec.ts` | Tests étendus — badge, "99+", aria-live, erreur, polling |
| `public/assets/i18n/fr.json` / `en.json` | Clé `nav.notif_count` reformulée : `"{{ count }} notifications non lues"` / `"{{ count }} unread notifications"` |

### Contrat HTTP consommé (`pivot-core`, Enabler EN-NOTIF)

Confirmé par lecture directe du diff `pivot-core` PR
[#160](https://github.com/PIVOT-PLATFORM/pivot-core/pull/160) (`feat/en-notif-infrastructure`) —
voir aussi la spec Gate 5 de cet Enabler une fois figée côté `pivot-core`.

```text
GET /api/notifications/unread-count
→ 200 { "count": <long> }   (UnreadCountResponse)
→ 401 si le contexte d'authentification est invalide
```

`count` résolu exclusivement depuis le token porteur (`userId`/`tenantId` jamais envoyés par le
client — voir isolation tenant, `pivot-ui/CLAUDE.md`).

### Mécanisme de réessai (`NotificationService.fetchUnreadCount`)

RxJS `retry({ count: 2, delay: (err, n) => timer(1000 * 2 ** (n - 1)) })` — délais 1 s puis 2 s,
3 tentatives HTTP totales. `catchError` final : ne rejette jamais l'abonné, positionne
`hasError = true`, résout `0`. Un appel ultérieur réussi remet `hasError = false`.

### Choix architecture — polling plutôt que WebSocket STOMP

`pivot-core` (EN-NOTIF) expose un canal push STOMP
(`/user/{userId}/queue/notifications`, `NotificationWebSocketConfig` +
`StompAuthChannelInterceptor`, authentification par frame `CONNECT` — la poignée de main HTTP du
WebSocket elle-même est `permitAll()`, incapable de porter un en-tête `Authorization`). Ce canal
n'est **pas consommé côté `pivot-ui`** : `pivot-ui/CLAUDE.md` réserve le client STOMP
(`@stomp/rx-stomp`) aux repos modules (ex. `pivot-collaboratif-ui`), jamais au shell `pivot-ui` —
vérifié à l'implémentation : aucune trace de STOMP dans `pivot-ui` (`package.json`, `src/`). Le
polling 30 s est de toute façon documenté comme filet de sécurité par l'AC EN-NOTIF elle-même — un
choix cohérent avec l'architecture actuelle, pas un contournement. Le canal STOMP reste disponible
pour un futur repo module de notifications qui en aurait l'usage.

## Écarts vs AC initiaux

Aucun écart de fond. Une clarification, documentée dans le fichier US (§ Notes d'implémentation)
plutôt que devinée silencieusement :

- AC "réessai automatique avec backoff exponentiel (max 3 tentatives)" interprété comme **3
  tentatives HTTP totales** (1 initiale + 2 réessais), pas 3 réessais en plus du premier appel.

## Point de coordination ouvert (non résolu au moment du figeage)

`pivot-core` PR [#160](https://github.com/PIVOT-PLATFORM/pivot-core/pull/160) (EN-NOTIF,
`feat/en-notif-infrastructure`) est Gate 4 = 100/100, CI verte, mais **non fusionnée sur `main`**
au moment du figeage de cette spec. Aucun conflit de fichier (repos distincts), mais dépendance
**fonctionnelle** : le badge décrit ci-dessus ne retournera de vraies données qu'une fois #160
fusionnée côté `pivot-core` — jusque-là, un environnement d'intégration réelle verrait
systématiquement `404`/absence de route côté backend. Les tests `pivot-ui` (Vitest) simulent le
contrat HTTP tel que confirmé par le diff de #160, indépendamment de cet état. Ne remet pas en
cause le contrat figé ci-dessus côté `pivot-ui` : seule la fusion de #160 reste à effectuer côté
`pivot-core`.

## Tests

`notification.service.spec.ts` (`fr.pivot.notifications`, `pivot-ui`) :

| Test | Comportement vérifié |
|---|---|
| `issues a GET to /notifications/unread-count` | Méthode et URL exactes |
| `never sends userId/tenantId` | 0 query param, body `null` (isolation tenant) |
| `updates unreadCount from the response body on success` | Mapping `count` → signal |
| `clears a previous hasError on a subsequent success` | Récupération après échec total |
| `never errors the subscriber — resolves 0 and sets hasError after exhausting retries` | Contrat "ne rejette jamais" |
| `attempts exactly 3 total requests before giving up` | Plafond de tentatives |
| `does not retry before the exponential backoff delay elapses (1s then 2s)` | Délais exacts (`vi.useFakeTimers`) |
| `recovers if a retry succeeds before the attempt cap is reached` | Réessai réussi en cours de séquence |
| `keeps the last known unreadCount when all retries are exhausted` | Non-écrasement de la dernière valeur connue |
| `also retries on a network failure (status 0)` | Pas seulement les statuts HTTP d'erreur |
| `poll()` — 3 tests | Premier tick non immédiat, ticks réguliers, résilience aux erreurs intra-poll |

`navbar.component.spec.ts` (étendu, `pivot-ui`) — 10 tests dédiés au badge (affichage/masquage,
"99+", aria-label exact, aria-hidden + absence d'aria-live sur le badge, région aria-live dédiée,
masquage sur erreur totale, récupération, polling avec fixture locale sous fake timers, arrêt du
polling à la destruction via `takeUntilDestroyed`).

E2E Playwright différé — environnement indisponible dans ce bac à sable (règle déjà établie ce
sprint, voir `pivot-ui/CLAUDE.md`) ; couverture Vitest complète en remplacement.
