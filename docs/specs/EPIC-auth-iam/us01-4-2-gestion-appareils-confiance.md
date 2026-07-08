# US01.4.2 — Gestion des appareils de confiance

## Contexte

- **US** : `docs/backlog/EPIC-auth-iam/FEATURES/device-confirmation/us-appareils-confiance.md` (F01.4 — Confirmation d'appareil, EPIC-auth-iam)
- **PR** : `pivot-core` [#152](https://github.com/PIVOT-PLATFORM/pivot-core/pull/152) (`feat/us01-4-2-appareils-confiance`) · `pivot-ui` [#100](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/100) (`feat/us01-4-2-appareils-confiance`)
- **Fusion** : `pivot-core` #152 mergée le 2026-07-06T18:51:56Z · `pivot-ui` #100 mergée le 2026-07-06T19:59:46Z
- **Gate 4 `pivot-core` #152** : 100/100 — `MERGE_AUTONOMOUS`
- **Gate 4 `pivot-ui` #100** : 93/100 — `MERGE_AUTONOMOUS` (seule perte de points : spec Playwright différée, cf. précédent US02.2.3)
- **Dépend de** : US01.4.1 (confirmation d'appareil par OTP) — réutilise l'entité `TrustedDevice` / table `trusted_devices` introduite là, en lecture/suppression uniquement

---

## Spec fonctionnelle

### Backend (`pivot-core`)

- `GET /api/auth/devices` — liste les appareils de confiance de l'utilisateur courant (résolu
  côté serveur via `SecurityContextHolder`, jamais depuis un paramètre client), triés par
  `last_seen_at` décroissant. Chaque entrée expose nom, IP (capturée à la confiance, jamais mise à
  jour ensuite — même sémantique que `SessionDto.ip`), date de confiance, dernière activité,
  `isCurrent: boolean`.
- `isCurrent` résolu via le même mécanisme que les sessions actives (US02.2.3) : id de
  l'`AccessToken` de la requête courante (`TokenAuthenticationFilter.CURRENT_TOKEN_ID_ATTRIBUTE`,
  exposé par `CurrentSessionResolver`), comparé au `deviceFingerprint` de chaque appareil de
  confiance — pas de header/cookie dédié au fingerprint hors login.
- `DELETE /api/auth/devices/{deviceId}` — révoque un appareil. Ownership vérifié en premier
  (`findByIdAndUserId`) → `404` si l'appareil n'appartient pas à l'utilisateur courant (aucune
  fuite d'existence cross-user), `403` si c'est l'appareil courant — garde appliquée **au niveau
  service**, pas seulement côté UI.
- `deviceName` HTML-strippé et tronqué (`HtmlStripper.stripAndTruncate`,
  `DEVICE_NAME_MAX_LENGTH`) en sortie — défense en profondeur contre XSS stocké.
- Après suppression réussie, `TrustedDeviceService.revokeDevice` publie un événement de domaine
  `fr.pivot.auth.event.TrustedDeviceRevokedEvent` (`ApplicationEventPublisher`) — voir divergence
  notification email ci-dessous.

### Frontend (`pivot-ui`)

- Écran `/account/security/devices` (`TrustedDevicesListComponent`, lazy-loaded, `OnPush`,
  signals) — structurellement calqué sur l'écran sessions actives (US02.2.3), sans action groupée
  "révoquer tout" (aucun endpoint équivalent côté devices).
- Tableau : libellé appareil, IP, date de confiance, dernière activité ; appareil courant mis en
  évidence par un badge, sans bouton "Révoquer" (défense en profondeur — l'autorité reste le `403`
  serveur).
- Révocation : dialog de confirmation (`role="dialog"`, `aria-modal`, `aria-labelledby`) puis
  suppression optimiste avec rollback + toast d'erreur en cas d'échec API.
- États : chargement (skeleton `aria-hidden` + annonce `sr-only`), erreur (`role="alert"` +
  bouton retry), fallback i18n `"Appareil inconnu"` si `device` est `null`.
- `device` rendu uniquement par interpolation Angular (`{{ }}`), jamais `[innerHTML]` — testé
  explicitement contre un payload XSS.
- Refactor connexe non fonctionnel : extraction de `src/app/shared/utils/date-format.util.ts` à
  partir de `session-date.util.ts` (même format `Intl.DateTimeFormat` UTC forcé) pour éviter la
  duplication entre les deux écrans — signature publique et tests de `session-date.util.ts`
  inchangés.

### Divergences vs conception initiale

- **Notification email (AC "🔄 partiel" dans le backlog)** : `US01.5.1`
  (`SecurityNotificationService`) n'existait pas encore sur `origin/main` au moment du merge de
  `core#152` (développée en parallèle sur une branche sœur). Le mécanisme livré est un
  **fallback événementiel** : `TrustedDeviceRevokedEvent` publié après suppression,
  **aucun listener branché**. Ce n'est pas un raccourci silencieux — documenté explicitement dans
  la PR et dans le backlog. Cette US ne peut pas repasser à `Stage: Done` avant que ce listener
  soit câblé et vérifié (ou qu'un PO accepte explicitement l'événement seul comme définition de
  "notification déclenchée").
- **Points d'appel de `trust(...)` étendus** : le changement de signature de
  `TrustedDeviceService.trust(...)` (ajout de la capture IP) a nécessité la mise à jour de 3 call
  sites, dont 2 non anticipés dans la conception initiale (`OidcAuthService`, `GoogleAuthService`)
  — nécessaires pour que le build compile et pour une sémantique IP cohérente sur les 3 flux de
  confiance (password+OTP, OIDC, Google).
- **Refactor `CurrentSessionResolver`** : extrait pendant l'autoloop suite à un finding
  SonarCloud (`new_duplicated_lines_density` 4.0% > seuil 3%, dû à la duplication verbatim des
  helpers `currentUser()`/`resolveCurrentTokenId()` entre `SessionController` et
  `DeviceController`) — composition, comportement inchangé, suit le précédent `CookieHelper` déjà
  présent dans le repo.
- **Spec Playwright différée côté `pivot-ui`** : décision documentée, alignée sur le précédent
  US02.2.3 (sessions actives) livré sans e2e dédié — coverage Vitest complète en remplacement (99
  tests combinés service + composant).

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `pivot-core: controller/DeviceController.java` | `GET /api/auth/devices`, `DELETE /api/auth/devices/{deviceId}` — thin, délègue à `TrustedDeviceService` |
| `pivot-core: service/TrustedDeviceService.java` | Logique métier : liste, résolution `isCurrent`, révocation, gardes 403/404, publication événement |
| `pivot-core: repository/TrustedDeviceRepository.java` | `findByUserIdOrderByLastSeenAtDesc`, `findByIdAndUserId` |
| `pivot-core: dto/TrustedDeviceDto.java` | DTO exposé (jamais l'entité JPA) |
| `pivot-core: entity/TrustedDevice.java` | Ajout du mapping `ip_address` (colonne déjà présente en base, non mappée avant cette PR) |
| `pivot-core: event/TrustedDeviceRevokedEvent.java` | Événement de domaine publié après révocation — point d'intégration US01.5.1 |
| `pivot-core: config/CurrentSessionResolver.java` | Résolution partagée session/device courant (extrait de `SessionController` pendant l'autoloop) |
| `pivot-core: service/{SessionService,OidcAuthService,GoogleAuthService}.java` | Mise à jour des call sites de `trust(...)` (signature étendue avec IP) |
| `pivot-core: controller/SessionController.java` | Adapté pour consommer `CurrentSessionResolver` (déduplication) |
| `pivot-ui: features/account/security/trusted-devices/trusted-device.model.ts` | `TrustedDeviceDto` |
| `pivot-ui: features/account/security/trusted-devices/trusted-device.service.ts` | `TrustedDevicesService` — `loadDevices()`, `revoke()` (optimiste + rollback) |
| `pivot-ui: features/account/security/trusted-devices/trusted-devices-list.component.{ts,html,scss}` | Écran liste/révocation |
| `pivot-ui: features/account/security/trusted-devices/trusted-device-date.util.ts` | Formatage date, délègue à `shared/utils/date-format.util.ts` |
| `pivot-ui: shared/utils/date-format.util.ts` | Helper de formatage extrait (partagé avec `session-date.util.ts`) |
| `pivot-ui: app.routes.ts` | Route `account/security/devices`, lazy-loaded |
| `pivot-ui: public/assets/i18n/{fr,en}.json` | Clés `account.devices.{list,confirm,toast}` |

### Endpoints

`GET /api/auth/devices` (authentifié) → `200`, liste `TrustedDeviceDto[]` (`id`, `deviceName`,
`ipAddress`, `trustedAt`, `lastSeenAt`, `isCurrent`), triée par `lastSeenAt` décroissant · `403` si
pas de bearer token.

`DELETE /api/auth/devices/{deviceId}` (authentifié) → `204` succès · `403` si `deviceId`
correspond à l'appareil courant · `404` si l'appareil n'existe pas ou n'appartient pas à
l'utilisateur courant (pas de distinction de message entre les deux cas — anti-IDOR).

### Schéma BDD

Réutilise `trusted_devices` (introduite par US01.4.1, `V1__schema_init.sql`) — aucune migration
Flyway nouvelle. Seul changement : mapping JPA de la colonne `ip_address`, déjà présente en base
mais jusqu'ici non exposée par l'entité.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.4.1 — Confirmation d'appareil par OTP | Source de la table `trusted_devices` et de `TrustedDeviceService.trust(...)` — cette US ne fait que lire/révoquer, aucune nouvelle logique d'octroi de confiance |
| US02.2.3 — Sessions actives | Précédent structurel direct (résolution "élément courant", écran liste + révocation, décision de différer Playwright) réutilisé côté backend (`CurrentSessionResolver`) et frontend (mise en page, tests) |
| US01.5.1 — Notification email action sensible | Point d'intégration ouvert : `TrustedDeviceRevokedEvent` publié mais sans listener branché au moment du merge — à raccorder par qui termine US01.5.1 |

## Hors périmètre (explicitement exclu)

- Listener consommant `TrustedDeviceRevokedEvent` pour déclencher l'email de notification (US01.5.1 non encore mergée au moment de cette PR)
- Action groupée "révoquer tous les appareils" — aucun endpoint équivalent aux sessions actives
- Spec Playwright dédiée à l'écran `trusted-devices-list` — différée, coverage Vitest seule en remplacement
- Vérification serveur de cohérence IP/UA du fingerprint au moment de la confiance (hors scope, propriété de US01.4.1)
