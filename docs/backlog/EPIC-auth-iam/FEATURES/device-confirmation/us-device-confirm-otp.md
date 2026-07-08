# US01.4.1 — Confirmation d'appareil par OTP

**En tant que** utilisateur se connectant depuis un nouvel appareil
**Je veux** recevoir un code OTP par email pour confirmer la connexion
**Afin de** protéger mon compte contre les accès non autorisés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Empreinte d'appareil inconnue détectée à la connexion → envoi OTP 6 chiffres | ✅ |
| Page `/auth/device-confirm` avec champ OTP et timer | 🟡 page + champ OTP livrés et testés ; timer/décompte entièrement absent du composant réel — voir spec Gate 5 |
| OTP correct (5 min TTL) → appareil enregistré, connexion finalisée | 🟡 mécanisme livré et testé (OTP correct → device de confiance → session émise) ; TTL par défaut seedée à 15 min, pas 5 min — voir spec Gate 5 |
| OTP expiré → message d'erreur + bouton "Renvoyer le code" | 🟡 message d'erreur générique existe (pas de distinction "expiré" vs "aucune tentative") ; aucun bouton de renvoi, aucun endpoint resend — voir spec Gate 5 |
| OTP incorrect → message d'erreur (max 5 tentatives) | ✅ (hard cap 5 tentatives codé et actif ; incrément testé unitairement, le franchissement exact du seuil ne l'est pas explicitement) |
| Appareil connu → pas d'OTP, connexion directe | ✅ |
| OTP généré côté backend : 6 chiffres, SecureRandom, SHA-256 BDD | 🟡 6 chiffres/SecureRandom confirmés ; hash réel = HMAC-SHA256 keyé, pas SHA-256 simple — voir spec Gate 5 |
| A11y : timer annoncé via `aria-live`, champ OTP avec label explicite | 🟡 label explicite confirmé ; timer et `aria-live` absents (pas de timer livré) — voir spec Gate 5 |
| Clés i18n dans l'espace `auth.deviceConfirm.*` (fr.json / en.json) — libellés, erreurs, timer, bouton renvoi | 🟡 clés livrées sous `auth.device_confirm.*` (snake_case, pas camelCase) ; pas de clés timer/renvoi (fonctionnalités absentes) — voir spec Gate 5 |
| Rate limiting sur POST /api/auth/device-confirm/resend — au plus 3 renvois OTP par tentative de connexion | ⬜ aucun endpoint de renvoi n'existe |

## Notes d'implémentation
- Empreinte = calculée **côté client** (Angular `DeviceService`) à partir de
  `userAgent | language | résolution écran | hardwareConcurrency`, encodée en base64 — pas un hash
  backend de `userAgent + IP + Accept-Language` comme anticipé initialement (voir spec Gate 5)
- Tables réelles : `device_verify_tokens` (`user_id`, `device_fingerprint`, `otp_hash`, `attempts`,
  `expires_at`, `confirmed_at`) pour l'OTP pending, et `trusted_devices` (`user_id`,
  `device_fingerprint`, `expires_at`, ...) pour la confiance confirmée — pas une table unique
  `device_confirmations` comme anticipé
- Route Angular : `/auth/device-confirm`
- `DeviceConfirmComponent` livré **sans** countdown signal ni renvoi OTP (divergence vs plan initial)

---
Item Type: US · Parent: F01.4 · Module: auth · Phase: Socle · Size: M · Priority: High
Stage: Done
Gate 5 : `pivot-core` PR [#105](https://github.com/PIVOT-PLATFORM/pivot-core/pull/105) (Gate 4 = 87/100) + `pivot-ui` PR [#11](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/11) (Gate 4 = 82/100), spec figée `docs/specs/EPIC-auth-iam/us01-4-1-confirmation-appareil-otp.md` (rétroactif, 2026-07-08)
