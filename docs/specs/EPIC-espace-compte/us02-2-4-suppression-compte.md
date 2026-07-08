# US02.2.4 — Suppression de compte (RGPD Art. 17)

## Contexte

- **US** : `docs/backlog/EPIC-espace-compte/FEATURES/securite-compte/us-suppression-compte.md` (F02.2 — Sécurité du compte, EPIC-espace-compte E02)
- **PR backend** : `pivot-core` [#140](https://github.com/PIVOT-PLATFORM/pivot-core/pull/140) (`feat/us02-2-4-suppression-compte`)
- **PR frontend** : `pivot-ui` [#83](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/83) (`feat/us02-2-4-suppression-compte`)
- **PR correctif** : `pivot-ui` [#97](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/97) (`fix/account-deletion-banner-stale-expiry`) — trouvé en revue Gate 4 rétrospective de #83, déjà mergée avant la fin de la revue
- **Dernier commit au moment du figeage** :
  - `pivot-core` #140 : `7c7eaa7` (merge commit `8522c92`)
  - `pivot-ui` #83 : `b12355c` (merge commit `010c724`)
  - `pivot-ui` #97 : `dd40779` (merge commit `835b28c`)
- **Gate 2 COVERAGE** :
  - `pivot-core` #140 : 98/100 (auto-évalué) — 730/730 tests (44 nouveaux : 24 TU service + 9 TU contrôleur + 11 TI PostgreSQL+Redis réels)
  - `pivot-ui` #83 : 779/779 tests Vitest verts (777 pré-existants + 2 nouveaux à la revue)
  - `pivot-ui` #97 : 845/845 tests Vitest verts
- **Gate 4 MERGE_CONFIDENCE** :
  - `pivot-core` #140 : 94/100 — **BREAKING_POINT_2 (needs-human-review)**, hard block Gate 3 (modification `GoogleAuthService`/`OidcAuthService`/`SecurityConfig`, label `security`) — jamais mergé par l'agent, revue humaine (Expert OIDC/IAM + Security Agent + Expert RGPD) requise indépendamment du score
  - `pivot-ui` #83 : 100/100 — **needs-human-review maintenu** (dépendance à #140 non mergée au moment de la revue + action irréversible RGPD) malgré le score plein
  - `pivot-ui` #97 : 98/100 — **MERGE_DOCUMENTED (needs-human-review maintenu)**
- **Dépend de** : `pivot-core` US01.4.1 (primitives OTP `SessionService`/`DeviceVerifyToken`), US02.3.1 (`@EnableScheduling`), PR #107 (`EmailService`/Thymeleaf i18n) — toutes déjà mergées, réutilisées sans duplication.

---

## Spec fonctionnelle

### Déclenchement et confirmation

L'utilisateur initie la suppression depuis `/account` (page Angular `AccountSettingsComponent`). Un
dialog de confirmation en 2 étapes s'ouvre (`AccountDeletionDialogComponent`, `role="alertdialog"`,
`aria-modal="true"`, `aria-labelledby` sur le titre "Suppression définitive du compte", focus trap
actif dès l'ouverture, fermeture Échap avec retour de focus au bouton déclencheur) :

1. **Étape 1** — alerte irréversibilité + liste des données supprimées.
2. **Étape 2** — confirmation par mot de passe (comptes `auth_mode` local) **ou** par OTP à 6
   chiffres (comptes OIDC/Google sans mot de passe local, TTL 10 min). Le frontend appelle d'abord
   `GET /account/deletion/confirmation-method` pour déterminer la branche ; si `"OTP"`, `POST
   /account/deletion/otp` est déclenché automatiquement à l'entrée en étape 2 (bouton "renvoyer"
   manuel disponible).

Le bouton final est libellé "Supprimer définitivement mon compte" (jamais "Confirmer" générique),
couleur destructive (rouge). L'appel final `DELETE /account` envoie `{"currentPassword"}` ou
`{"otp"}` — **exactement un des deux**, jamais les deux. Réponse `200
{"effectiveDeletionDate": "<ISO-8601 Instant>"}`.

**Interprétation retenue pour un AC ambigu** : l'US ne précise le `403` que pour la branche OTP,
mais le texte général l'étend aux deux voies — le backend renvoie un **403 uniforme** (mot de passe
et OTP) pour toute confirmation manquante/invalide/expirée/tentatives épuisées sur `DELETE
/account`, plutôt que le `401` utilisé ailleurs (`AccountPasswordService`/`EmailChangeService`)
pour un mot de passe actuel incorrect. Choix documenté comme à valider par PO/Sécurité si une
distinction 401/403 était en fait voulue — non remis en cause depuis.

### Effets immédiats

Dès l'appel `DELETE /account` réussi (avant la fin du délai de grâce) :

- Toutes les sessions/tokens de l'utilisateur sont révoqués immédiatement (`TokenService#revokeAllForUser`).
- Le compte passe en statut `PENDING_DELETION` (`users.deleted_at` posé immédiatement — colonne
  présente depuis le schéma V1 mais jamais exploitée avant cette US), invisible aux lectures admin
  (`UserSpecifications.notDeleted()`) et bloquant toute connexion (401) via les résolutions
  `*AndDeletedAtIsNull` déjà en place dans `SessionService`/`GoogleAuthService`/`OidcAuthService`.
- Un email de confirmation avec la date effective de suppression est envoyé.
- Un audit event `AccountDeleted` est enregistré, complété par 3 événements de traçabilité du
  cycle de vie : `deletion_otp_sent`, `deletion_cancelled`, `anonymized`.

### Délai de grâce et annulation

Délai configurable (`AccountDeletionScheduler`, pattern `ExportCleanupScheduler`, `@EnableScheduling`
déjà déclaré). Pendant ce délai :

- Une bannière persistante (`AccountDeletionBannerComponent`) rappelle la date de suppression
  effective et propose "Annuler la suppression". Elle **s'auto-expire** sans appel réseau
  supplémentaire via un signal Angular (`AccountDeletionStateService`).
- L'email de confirmation contient un lien vers une page publique Angular (`/account/deletion/cancel?token=...`)
  qui lit `?token=` et **POST** ce token (jamais un lien GET auto-déclenché, anti-scan de bots
  email) vers `POST /account/deletion/cancel` — endpoint public (aucune session possible à ce stade,
  toutes révoquées). Jeton à usage unique, hashé SHA-256 en base. Réponses : `200` succès, `400`
  jeton inconnu/déjà utilisé, `410` compte déjà anonymisé (trop tard), `429` rate limit 10/h par IP.

### Anonymisation

Une fois le délai écoulé, `AccountDeletionScheduler` anonymise le compte : email remplacé par
`deleted-{uuid}@pivot.invalid`, prénom/nom mis à `null`, avatar supprimé, sessions déjà révoquées.
Les audit events restent rattachés au compte anonymisé (`fk_audit_user` en `ON DELETE RESTRICT`).
`anonymize()` est idempotent (no-op si déjà anonymisé ou compte inexistant) ; le lot planifié
continue après l'échec d'un compte individuel.

### Tous textes internationalisés

39 clés `account.deletion.*` ajoutées dans `fr.json`/`en.json`, vérifiées 1:1 avec les usages
template (`| transloco`) par script de contrôle croisé — aucune manquante ni orpheline.

---

## Contrat technique

### Fichiers introduits / modifiés

**`pivot-core` (PR #140)**

| Fichier | Rôle |
|---------|------|
| `account/controller/AccountDeletionController.java` | Endpoints `GET confirmation-method`, `POST otp`, `DELETE /account`, `POST cancel` |
| `account/service/AccountDeletionService.java` | Logique métier : confirmation, révocation, statut, anonymisation, idempotence |
| `account/scheduler/AccountDeletionScheduler.java` | Purge planifiée (anonymisation) des comptes dont le délai de grâce est écoulé |
| `account/entity/AccountDeletionRequest.java`, `AccountDeletionOtp.java` | Persistance de la demande de suppression et de l'OTP associé |
| `account/entity/DeletionConfirmationMethod.java` (+ `Converter`) | Enum PASSWORD/OTP |
| `db/migration/V9__account_deletion.sql` | Schéma des tables de suppression |
| `auth/service/GoogleAuthService.java`, `OidcAuthService.java`, `RegistrationService.java` | Garde anti-résurrection d'un compte `PENDING_DELETION` (voir divergence sécurité ci-dessous) |
| `auth/util/CryptoUtils.java` | `resolveOtpSecret` factorisé, partagé avec `SessionService` |
| `templates/email/account-deletion-{confirm,otp,cancelled}.html` | Gabarits email (Thymeleaf, PR #107) |

**`pivot-ui` (PR #83, complétée par #97)**

| Fichier | Rôle |
|---------|------|
| `features/account/deletion/account-deletion-dialog.component.ts` | Dialog 2 étapes, branchement PASSWORD/OTP, ARIA/focus trap |
| `features/account/deletion/account-deletion-banner.component.ts` | Bannière persistante auto-expirante |
| `features/account/deletion/account-deletion-state.service.ts` | Signal `pending` + (PR #97) signal `now` et `effect()` de réveil planifié, chaînage `MAX_TIMEOUT_MS` (plafond 32-bit `setTimeout`, ~24,8 j < délai de grâce 30 j de l'US) |
| `features/account/deletion/account-deletion-cancel.component.ts` | Page publique `/account/deletion/cancel`, POST explicite, jamais sur `ngOnInit()` |
| `features/account/deletion/account-deletion.service.ts` | Client HTTP des 4 endpoints du contrat backend |
| `features/account/deletion/testing/memory-local-storage.ts` | Helper de test mockant `localStorage` (limitation Vitest/BrowserTestingModule préexistante, même pattern que `ThemeService`/`NavbarComponent`) |
| `public/assets/i18n/{fr,en}.json` | 39 clés `account.deletion.*` |

### Endpoints / modèles / contrats techniques pertinents

| Endpoint | Auth | Body | Succès | Erreurs |
|---|---|---|---|---|
| `GET /account/deletion/confirmation-method` | Bearer | — | `200 {"method":"PASSWORD"\|"OTP"}` | `401` |
| `POST /account/deletion/otp` | Bearer | — | `202` | `400` compte avec mot de passe local · `401` · `409` suppression déjà en cours · `429` |
| `DELETE /account` | Bearer | `{"currentPassword"?}` ou `{"otp"?}` (exactement un) | `200 {"effectiveDeletionDate"}` | `401` · `403` confirmation manquante/invalide/expirée/tentatives épuisées (uniforme PASSWORD/OTP) · `409` |
| `POST /account/deletion/cancel` | Public | `{"token"}` | `200 {"message"}` | `400` jeton inconnu/déjà utilisé · `410` déjà anonymisé · `429` (10/h par IP) |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US02.2.1 (mot de passe), US02.2.2 (changement email) | `AccountDeletionService` réutilise `PasswordEncoder#matches` directement — ne dépend pas de `AccountPasswordService`, suit le pattern déjà établi par `EmailChangeService` |
| US01.4.1 (OTP nouvel appareil) | Primitives OTP réutilisées telles quelles (HMAC-SHA256, TTL, compteur de tentatives) ; flux `DELETE /account` en miroir exact de `POST /auth/login` → 202 MFA → `POST /auth/device/verify` |
| US02.3.1 (export RGPD, scheduling) | `AccountDeletionScheduler` suit le pattern `ExportCleanupScheduler` ; pas de second mécanisme `@EnableScheduling` |
| US02.2.5 (réactivation, v1-enterprise) | Explicitement hors périmètre de cette US (voir backlog) |
| US01.5.1 (email action sensible) | Email de suppression garde son CTA "Annuler la suppression" (lien à usage unique) comme remède "pas moi" plutôt que d'ajouter un second lien concurrent vers `/account/security?action=report-suspicious` — IP ajoutée à l'email pour satisfaire le contenu attendu |

## Hors périmètre (explicitement exclu)

- Réactivation d'un compte supprimé → US02.2.5 (v1-enterprise)
- Purge des `audit_events` un an après anonymisation — documentée comme TODO de suivi (proportionnalité jugée disproportionnée pour cette US seule ; à traiter par un enabler RGPD générique couvrant tous les types d'événements)
- Test d'intégration automatisé du correctif anti-résurrection Google/OIDC/inscription locale — vérification de token dépendante du réseau (IdP complet), hors périmètre des tests unitaires existants ; signalé pour revue Security Agent, non couvert automatiquement
- Lien depuis la navbar vers `/account` — scope produit volontairement laissé de côté par l'auteur frontend

---

## Divergences notables vs plan pré-écrit

- **Correctif sécurité hors AC explicite** : en implémentant le blocage de connexion
  `PENDING_DELETION`, découverte que `idx_users_tenant_email` n'est pas un index partiel — une
  ligne soft-supprimée garde son `(tenant_id, email)`, provoquant un `DataIntegrityViolationException`
  (500) au lieu d'un rejet propre lors d'une reconnexion Google/OIDC ou d'une réinscription locale
  pendant le délai de grâce. Corrigé dans `GoogleAuthService`/`OidcAuthService` (auteur) puis
  étendu à `RegistrationService` (trouvé et corrigé par le reviewer Gate 4, chemin le plus exposé
  car non authentifié). **Non couvert par un test automatisé de bout en bout** (dépendance réseau
  à un IdP) — label `security` posé, hard block Gate 3, revue humaine (Expert OIDC/IAM + Security
  Agent) requise avant tout merge, au-delà du score Gate 4 obtenu.
- **Bug réel trouvé en revue de #83, corrigé séparément (#97)** : `AccountDeletionStateService.pending`
  (`computed()`) ne se réévaluait pas à l'échéance du délai de grâce car `Date.now()` n'est pas un
  signal Angular tracké — la bannière persistante restait affichée indéfiniment après l'anonymisation
  réelle côté serveur sur un onglet resté ouvert. Corrigé par un signal `now` + `effect()` de réveil
  planifié (pattern repris de `ExportComponent.rateLimitedUntil`), avec chaînage nécessaire car le
  délai de grâce exemple de l'US (30 jours) dépasse le plafond 32 bits de `setTimeout` (~24,8 jours).
- **`pivot-ui` #83 mergée avant `pivot-core` #140 au moment de sa Gate 4** : la revue neutre a
  explicitement signalé cette dépendance non mergée comme hard block Gate 3 ("modification contrat
  module sans coordination pivot-core"). Le contrat était déclaré figé par l'auteur backend et s'est
  avéré effectivement stable — mais le needs-human-review a été maintenu à 100/100 pour cette raison,
  pas seulement pour l'irréversibilité RGPD.
- **Purge des audit events à 1 an** : présente dans le libellé de l'AC "politique RGPD précise" du
  backlog, mais explicitement **non implémentée** dans #140 — jugement de proportionnalité assumé
  et documenté par l'auteur, à traiter par un enabler dédié.
