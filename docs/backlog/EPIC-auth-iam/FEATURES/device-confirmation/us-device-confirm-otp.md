# US01.4.1 — Confirmation d'appareil par OTP

**En tant que** utilisateur se connectant depuis un nouvel appareil
**Je veux** recevoir un code OTP par email pour confirmer la connexion
**Afin de** protéger mon compte contre les accès non autorisés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Empreinte d'appareil inconnue détectée à la connexion → envoi OTP 6 chiffres | ✅ |
| Page `/auth/device-confirm` avec champ OTP et timer | ✅ |
| OTP correct (5 min TTL) → appareil enregistré, connexion finalisée | ✅ |
| OTP expiré → message d'erreur + bouton "Renvoyer le code" | ✅ |
| OTP incorrect → message d'erreur (max 5 tentatives) | ✅ |
| Appareil connu → pas d'OTP, connexion directe | ✅ |
| OTP généré côté backend : 6 chiffres, SecureRandom, SHA-256 BDD | ✅ |
| A11y : timer annoncé via `aria-live`, champ OTP avec label explicite | ✅ |
| Clés i18n dans l'espace `auth.deviceConfirm.*` (fr.json / en.json) — libellés, erreurs, timer, bouton renvoi | ⬜ |
| Rate limiting sur POST /api/auth/device-confirm/resend — au plus 3 renvois OTP par tentative de connexion | ⬜ |

## Notes d'implémentation
- Empreinte = hash de `userAgent + IP + Accept-Language` (non-persisté en clair)
- Table `device_confirmations` : `user_id`, `device_fingerprint_hash`, `trusted_at`
- Route Angular : `/auth/device-confirm`
- `DeviceConfirmComponent` avec countdown signal + renvoi OTP

---
Item Type: US · Parent: F01.4 · Module: auth · Phase: MVP · Size: M · Priority: High
Human Gate: human-validated · Stage: Done
