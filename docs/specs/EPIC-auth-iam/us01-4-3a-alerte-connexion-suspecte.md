# US01.4.3a — Alerte connexion suspecte (appareil inconnu)

## Contexte

- **US** : [`us-alerte-connexion-suspecte.md`](pathname:///pivot-docs/backlog/EPIC-auth-iam/FEATURES/device-confirmation/us-alerte-connexion-suspecte) · Parent `F01.4` · Module `auth` · Phase Socle · Sprint 4
- **PR** : `pivot-core` [#151](https://github.com/PIVOT-PLATFORM/pivot-core/pull/151)
- **Commit figé** : `e2872b0` (`feat(auth): alerte connexion suspecte appareil inconnu (US01.4.3a)`), précédé de `1615673` (`feat(db): ajoute suspicious_login_tokens + flag TTL`)
- **Gate 4 au figeage** : 96/100 — `MERGE_DOCUMENTED` (détail complet dans le commentaire de review de la PR)

## Spec fonctionnelle

### Ce que fait la fonctionnalité

À chaque connexion réussie (email + mot de passe corrects), le backend vérifie si le fingerprint
d'appareil soumis est déjà connu (`trusted_devices`, table introduite par US01.4.1). Deux cas
distincts, qui ne se recouvrent jamais sur une même requête :

1. **Porte OTP bloquante (US01.4.1, préexistante)** — si le flag `MFA_NEW_DEVICE_OTP` est activé,
   ou si le compte est `ROLE_SUPER_ADMIN`, un appareil inconnu bloque la connexion : un code à 6
   chiffres est envoyé par email, la connexion ne se termine qu'après validation de ce code.
2. **Alerte passive (US01.4.3a, cette US)** — sur toute autre connexion (flag désactivé, compte
   non super-admin — la configuration par défaut de la quasi-totalité des tenants), un appareil
   inconnu **n'est jamais bloqué** : la connexion aboutit normalement, mais un email d'alerte est
   envoyé en plus, contenant l'appareil, la date/heure de connexion et un lien "Ce n'était pas
   moi". L'appareil est alors marqué de confiance (`trusted_devices`) afin que les connexions
   suivantes depuis ce même appareil ne redéclenchent pas l'alerte.

### Flux "Ce n'était pas moi"

Le lien de l'email pointe vers une page frontend (hors périmètre pivot-core — pivot-ui, non
implémentée dans cette US) qui doit demander le **mot de passe actuel** avant de soumettre
`POST /auth/suspicious-login/confirm { token, currentPassword }`. Le clic sur le lien seul (sans
mot de passe) ne déclenche aucune action côté backend — le token à usage unique ne fait
qu'identifier l'appareil visé, jamais une action de confiance en lui-même.

Sur confirmation réussie (mot de passe valide) :
- l'appareil visé (fingerprint du token) est retiré de `trusted_devices` ;
- **toutes** les sessions actives de l'utilisateur sont révoquées (déconnexion globale) ;
- l'événement d'audit `SuspiciousLoginNotMeConfirmed` est journalisé.

Un mot de passe invalide journalise `SuspiciousLoginNotMeFailed` et renvoie 401 sans consommer le
token (permet un nouvel essai tant que le token n'a pas expiré).

## Contrat technique final

### Endpoint

`POST /auth/suspicious-login/confirm` (public, non authentifié — cohérent avec `/auth/**`)

| Champ requête | Type | Contrainte |
|----------------|------|-----------|
| `token` | string | `@NotBlank` — token brut du lien email |
| `currentPassword` | string | `@NotBlank` |

Réponses : `200` (succès) · `400` (token invalide/expiré/déjà utilisé) · `401` (mot de passe
incorrect) · `429` (rate limit IP, 10 tentatives / heure — `suspicious-login-confirm:ip:{ip}`).

### Schéma BDD

Table `suspicious_login_tokens` (pliée dans `V1__schema_init.sql`) :

| Colonne | Type | Note |
|---------|------|------|
| `id` | `BIGSERIAL` | PK |
| `user_id` | `BIGINT` | FK `users(id)` ON DELETE CASCADE |
| `device_fingerprint` | `VARCHAR(64)` | appareil visé par le "Pas moi" |
| `device_name` | `VARCHAR(255)` | nullable |
| `ip_address` | `VARCHAR(45)` | nullable — IP de la connexion ayant déclenché l'alerte |
| `token_hash` | `VARCHAR(64)` | SHA-256 du token brut — jamais le raw token persisté |
| `expires_at` | `TIMESTAMPTZ` | TTL piloté par le flag `SUSPICIOUS_LOGIN_OTP_TTL_MINUTES` (défaut 60 min) |
| `used_at` | `TIMESTAMPTZ` | nullable — usage unique |
| `created_at` | `TIMESTAMPTZ` | |

Flag `SUSPICIOUS_LOGIN_OTP_TTL_MINUTES` (`feature_flags`, type `int`, défaut `60`).

### Événements d'audit (`AuditService`)

| Constante | Valeur | Déclenchement |
|-----------|--------|---------------|
| `SUSPICIOUS_LOGIN_DETECTED` | `auth.suspicious_login_detected` | à chaque détection d'appareil inconnu (que l'email parte ou non — throttlé indépendamment) |
| `SUSPICIOUS_LOGIN_NOT_ME_FAILED` | `auth.suspicious_login_not_me_failed` | mot de passe incorrect sur `/confirm` |
| `SUSPICIOUS_LOGIN_NOT_ME_CONFIRMED` | `auth.suspicious_login_not_me_confirmed` | confirmation réussie |

### Classes principales

- `SuspiciousLoginService` (nouveau) — `alertIfUnknownDevice(User, boolean deviceAlreadyTrusted, String fingerprint, String deviceName, String ip, String userAgent)` et `confirmNotMe(String rawToken, String currentPassword, String ip, String userAgent)`.
- `SessionService#login` — appelle `alertIfUnknownDevice` uniquement sur la branche où la porte OTP US01.4.1 ne s'est pas déclenchée ; appelle `trustedDeviceService.trust(...)` si l'appareil n'était pas déjà connu.
- `TrustedDeviceService#revoke(User, String fingerprint)` (nouveau) — supprime la confiance d'un appareil ciblé (no-op si absent).
- `EmailService#sendSuspiciousLoginAlertEmail` + template `suspicious-login.html`.

## Écarts vs ACs initiaux

Aucun écart fonctionnel. Un point a nécessité une clarification autonome (US ambiguë sur ce
point précis, tranchée par le Dev Agent en l'absence d'ambiguïté bloquante justifiant un aller-
retour PO) : l'AC ne précise pas explicitement si un appareil ayant déclenché l'alerte passive
doit ensuite être marqué de confiance. Décision retenue — **oui** (cohérent avec le comportement
usuel des fournisseurs équivalents : alerte une seule fois par appareil, pas à chaque connexion),
documentée dans le JavaDoc de `SessionService#login` et testée explicitement
(`SessionServiceTest#login_returnsSuccess_andSendsPassiveAlert_whenUntrustedDeviceAndMfaGateDisabled`).

Conséquence assumée : si `MFA_NEW_DEVICE_OTP` est activé *après* qu'un appareil a déjà reçu
l'alerte passive, cet appareil ne redéclenchera pas la porte OTP US01.4.1 (il est déjà dans
`trusted_devices`) — les deux mécanismes partagent volontairement la même table comme source de
vérité unique de "l'appareil est-il connu", conformément à la conception demandée.

## Gate 2 (coverage, par commit)

- `SuspiciousLoginServiceTest` (nouveau, 10 tests) — couvre `alertIfUnknownDevice` (connu/inconnu/rate-limité/métadonnées persistées) et `confirmNotMe` (tous les cas d'erreur + succès).
- `SessionServiceTest` — 2 tests étendus + 1 nouveau, couvrant explicitement la non-interférence entre la porte OTP US01.4.1 et l'alerte passive US01.4.3a.
- `TrustedDeviceServiceTest`, `EmailServiceTest`, `AuthControllerTest` — étendus pour les nouveaux comportements.
- CI `pivot-core` PR#151 : 616 tests unitaires + suite Testcontainers TU+TI complète — 100 % verts.
