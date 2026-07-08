# US01.4.1 — Confirmation d'appareil inconnu par OTP

## Contexte

- **US** : `docs/backlog/EPIC-auth-iam/FEATURES/device-confirmation/us-device-confirm-otp.md` (F01.4, EPIC-auth-iam)
- **PR** : `pivot-core` [#105](https://github.com/PIVOT-PLATFORM/pivot-core/pull/105) `feat(auth): auth module MVP — E01` (merge commit `fc82e9b`) · `pivot-ui` [#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11) `Feature/auth` (merge commit `573bd6c`)
- **Gate 4 `pivot-core` #105** : 87/100 — merge autonome (review portait sur le module auth MVP dans son ensemble, pas d'AC-par-AC dédié à cette US)
- **Gate 4 `pivot-ui` #11** : 82/100 — merge documenté (après correctifs security headers `nginx.conf`)
- **Dépend de** : rien en amont ; `TrustedDevice`/`device_verify_tokens` introduits ici sont ensuite réutilisés par US01.4.2 (gestion appareils de confiance) et US01.4.3a (alerte connexion suspecte)

> **Note sur les PR** : les hints fournis (`core#105`, `ui#39`) pointaient partiellement à côté.
> `core#105` est correct mais couvre tout le module auth MVP (E01), pas seulement cette US.
> `ui#39` (`feat(ui): auth pages MVP — E01`) ne contient **aucun** fichier `device-confirm` — la
> page réelle a été livrée dans `ui#11` (`Feature/auth`, mergée le même jour, PR socle du repo).

---

## Spec fonctionnelle

### Flux réel livré

1. `POST /auth/login` — si `MFA_NEW_DEVICE_OTP` est activé (ou compte `ROLE_SUPER_ADMIN`) et que le
   fingerprint soumis n'est pas dans `trusted_devices`, le backend génère un OTP à 6 chiffres,
   l'envoie par email (`EmailService#sendDeviceVerifyEmail`, template `device-confirm.html`) et
   répond `202 Accepted` avec le header `X-Device-Verification-Required: true` — le champ
   `pendingDeviceFingerprint` du résultat est renvoyé au frontend via `LoginResult`.
2. Le frontend (`LoginComponent`, hors périmètre de cette spec) redirige vers
   `/auth/device-confirm?fingerprint=...&rememberMe=...`.
3. `DeviceConfirmComponent` affiche un champ OTP à 6 chiffres (`autocomplete="one-time-code"`,
   pattern `\d{6}`) et soumet `POST /auth/device/verify { deviceFingerprint, otp, deviceName,
   rememberMe }` via `AuthService.verifyDeviceOtp(...)`.
4. Le backend (`SessionService#verifyDeviceOtp`) retrouve le token pending (non confirmé, non
   expiré) par fingerprint, vérifie le rate limit (5 tentatives / 15 min, bucket par utilisateur),
   compare le HMAC-SHA256 de l'OTP soumis à celui stocké, incrémente `attempts` si faux. Si
   `attempts >= 5` sur ce token précis, la vérification est bloquée (`429`) même si la fenêtre
   Redis a été réinitialisée (garde-fou en profondeur, indépendant du rate limiter).
5. OTP correct → le device est marqué de confiance (`TrustedDeviceService#trust`, table
   `trusted_devices`), un token de session opaque est émis, la connexion aboutit.
6. Connexion suivante depuis le même fingerprint → `TrustedDeviceService#isTrusted` renvoie `true`,
   aucun OTP n'est redemandé (TTL glissant `DEVICE_TTL_DAYS`, défaut 90 jours).

### Empreinte d'appareil — divergence par rapport aux notes d'implémentation prévues

Les notes d'implémentation de l'US anticipaient une empreinte **calculée côté backend** (hash de
`userAgent + IP + Accept-Language`). Ce n'est pas ce qui a été livré : `DeviceService.getDeviceFingerprint()`
(Angular, `pivot-ui`) calcule le fingerprint **côté client** à partir de
`navigator.userAgent | navigator.language | screen.width x screen.height | navigator.hardwareConcurrency`,
encodé en base64 et tronqué à 64 caractères, puis envoyé tel quel au backend qui le traite comme
une chaîne opaque (pas de recalcul serveur, pas d'IP dans le calcul). Conséquence assumée par
l'implémentation réelle : le fingerprint est entièrement déterminé par le client — un attaquant
qui rejoue les mêmes valeurs `navigator.*` obtient le même fingerprint qu'un appareil légitime.
Aucune vérification serveur de cohérence IP/UA n'est faite au moment du login pour renforcer ce
fingerprint déclaratif.

---

## Contrat technique

### Fichiers introduits / modifiés (principaux)

| Fichier | Rôle |
|---------|------|
| `pivot-core: SessionService.java` | `login()` déclenche l'OTP si device inconnu ; `verifyDeviceOtp()` valide le code, gère rate-limit + hard cap tentatives |
| `pivot-core: TrustedDeviceService.java` | `isTrusted()` / `trust()` — table `trusted_devices`, TTL glissant |
| `pivot-core: AuthController.java` | `POST /auth/device/verify` |
| `pivot-core: dto/DeviceOtpRequest.java` | `{ deviceFingerprint, otp (regex \d{6}), deviceName, rememberMe }` |
| `pivot-core: entity/DeviceVerifyToken.java` + `repository/DeviceVerifyTokenRepository.java` | table `device_verify_tokens` — token pending par fingerprint |
| `pivot-core: V1__schema_init.sql` | tables `device_verify_tokens` et `trusted_devices` + flags `DEVICE_VERIFY_TTL_MINUTES` (défaut 15), `DEVICE_TTL_DAYS` (défaut 90) |
| `pivot-core: templates/email/device-confirm.html` | email transactionnel contenant l'OTP |
| `pivot-ui: features/auth/pages/device-confirm/device-confirm.component.ts` | page `/auth/device-confirm` — champ OTP, soumission, gestion erreurs |
| `pivot-ui: core/auth/service/device.service.ts` | calcul du fingerprint et du libellé d'appareil **côté client** |
| `pivot-ui: core/auth/service/auth.service.ts` | `verifyDeviceOtp()` — appel HTTP |
| `pivot-ui: public/assets/i18n/{fr,en}.json` | espace `auth.device_confirm.*` |
| `pivot-ui: e2e/auth/device-confirm.spec.ts` | E2E Playwright du flux |

### Endpoint

`POST /auth/device/verify` (public, non authentifié)

| Champ requête | Type | Contrainte |
|---------------|------|------------|
| `deviceFingerprint` | string | `@NotBlank` |
| `otp` | string | `@NotBlank @Pattern(\d{6})` |
| `deviceName` | string | optionnel |
| `rememberMe` | boolean | — |

Réponses : `200` (succès, `AuthResponse`) · `400` (aucun token pending pour ce fingerprint — couvre
aussi bien l'absence totale de tentative que l'expiration, même message générique
`"Session de vérification introuvable"`) · `401` (OTP incorrect) · `429` (rate limit 5/15 min, ou
hard cap 5 tentatives sur le token).

### Schéma BDD

`device_verify_tokens` : `id, user_id, device_fingerprint, device_name, otp_hash (HMAC-SHA256, pas
SHA-256 simple), attempts, expires_at, confirmed_at, created_at`.
`trusted_devices` (table distincte, pas `device_confirmations` comme anticipé dans les notes
d'implémentation) : `id, user_id, device_fingerprint, device_name, ip_address, confirmed_at,
last_seen_at, expires_at, created_at` — contrainte unique `(user_id, device_fingerprint)`.

### OTP — génération et vérification

- 6 chiffres, `SecureRandom.nextInt(1_000_000)` formaté `%06d` (padding zéro conservé) — conforme à l'AC.
- Hash stocké : **HMAC-SHA256** avec clé `pivot.auth.otp-secret` (`CryptoUtils.hmacSha256`), et non
  un simple SHA-256 comme littéralement décrit dans l'AC et les notes d'implémentation — mécanisme
  plus robuste (résiste à une attaque par précalcul/rainbow table sur les 10^6 valeurs possibles
  d'un simple SHA-256 non salé), mais différent de ce qui était spécifié. Sans variable d'env
  `PIVOT_AUTH_OTP_SECRET` définie, une clé éphémère est générée au démarrage (OTP en cours
  invalidés après un redémarrage — acceptable en dev, à fixer en prod).
- TTL : flag `DEVICE_VERIFY_TTL_MINUTES`, **seedé à 15 minutes par défaut**, pas 5 minutes comme
  spécifié dans l'AC (le flag est configurable en base, donc un opérateur peut le repasser à 5,
  mais la valeur livrée par défaut diverge du libellé de l'AC).
- Tentatives : `attempts` incrémenté à chaque échec, hard cap `DEVICE_OTP_MAX_ATTEMPTS = 5` sur le
  token (indépendant de la fenêtre glissante du rate limiter Redis) → conforme à l'AC "max 5
  tentatives", mais sans test unitaire dédié franchissant explicitement ce seuil (seul le premier
  échec incrémentant `attempts` à 1 est testé dans `SessionServiceTest`).

### Ce qui n'a pas été livré malgré les cases cochées dans le backlog d'origine

- **Timer / countdown** : entièrement absent du composant réel (`DeviceConfirmComponent` ne
  contient ni signal countdown, ni `aria-live`, ni décompte visuel). Les notes d'implémentation
  du backlog ("`DeviceConfirmComponent` avec countdown signal + renvoi OTP") anticipaient cette
  fonctionnalité — elle n'a pas été construite.
- **Bouton "Renvoyer le code"** : absent du template. Aucun endpoint de renvoi n'existe côté
  backend (`AuthController` n'expose que `/auth/login`, `/auth/device/verify`, pas de
  `/auth/device-confirm/resend` ni `/api/auth/device-confirm/resend`) — cohérent avec l'AC de
  rate limiting sur cet endpoint, qui reste à juste titre non cochée.
- **Message d'erreur "OTP expiré" distinct** : le backend ne distingue pas "token expiré" de
  "aucune tentative en cours" — même statut `400` et même message générique dans les deux cas.
  Côté frontend, seules deux variantes de message existent (`error_rate_limit` sur 429,
  `error_invalid` pour tout le reste, y compris 400) — pas de message spécifique "code expiré".

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.4.2 — Gestion des appareils de confiance | Consomme directement la table `trusted_devices` introduite ici |
| US01.4.3a — Alerte connexion suspecte | Réutilise `trusted_devices` comme source de vérité "appareil connu", partagée avec la porte OTP bloquante de cette US (les deux mécanismes ne se déclenchent jamais sur la même requête) |

## Hors périmètre (explicitement exclu)

- Renvoi d'OTP (bouton + endpoint + rate limiting dédié) — non livré, AC restée non cochée
- Timer / décompte visuel de l'OTP côté UI — non livré malgré la mention dans les notes d'implémentation
- Distinction fonctionnelle entre "OTP expiré" et "aucune tentative pending" côté message d'erreur
- Vérification serveur de cohérence du fingerprint (IP/UA au moment du login vs valeurs déclarées par le client)
