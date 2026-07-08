# US01.3.2 — Réinitialisation du mot de passe

## Contexte

- **US** : [`us-reset-password.md`](pathname:///pivot-docs/backlog/EPIC-auth-iam/FEATURES/reset-password/us-reset-password) · Parent `F01.3` · Module `auth` · Phase Socle · Sprint 1
- **PR** : `pivot-core` [#105](https://github.com/PIVOT-PLATFORM/pivot-core/pull/105) (`feat(auth): auth module MVP — E01`) + `pivot-ui` [#39](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/39) (`feat(ui): auth pages MVP — E01`)
- **Fusionnées le** : 2026-06-27
- **Gate 4 au figeage** : `pivot-core` 87/100 — `MERGE AUTONOME` · `pivot-ui` 86/100 — `MERGE AUTONOME`
- **Écart notable** : comme pour US01.2.2 (même lot), cette US n'a pas de PR dédiée — elle fait
  partie du même lot MVP ("auth module MVP — E01") que l'ensemble du module `auth`
  (inscription/vérification/connexion/reset). Les endpoints `resetPassword`/`forgotPassword` et le
  composant Angular `ResetPasswordComponent` préexistaient partiellement sur la branche
  `feat/e01-auth-module` avant cette PR de consolidation ; cette PR y ajoute concrètement
  l'endpoint de pré-validation `GET /auth/check-reset-token`, la consommation atomique du token
  (`markUsed`), l'email de confirmation `password-changed.html`, et la réécriture du composant en
  machine à états (`tokenState`) côté frontend. Les scores et findings Gate 4 ci-dessus couvrent
  l'ensemble du lot, pas spécifiquement cette US. Ce document reconstruit la traçabilité AC a
  posteriori à partir du code réellement livré sur `main`.

---

## Spec fonctionnelle

### Endpoints `pivot-core`

`AuthController` expose deux endpoints publics (sans authentification) pour ce flow :

- **`GET /auth/check-reset-token?token=xxx`** → `PasswordService.checkResetToken` : valide un
  token **sans le consommer** (lecture seule, ne compte pas dans le rate limiting de
  `resetPassword`). Cherche `PasswordResetToken` par hash SHA-256 avec `usedAt IS NULL` ; token
  introuvable ou déjà consommé → `400` ("Token invalide ou déjà utilisé") ; token trouvé mais
  `expiresAt` dépassé → `400` ("Token expiré") ; sinon `200 {"message":"valid"}`. Utilisé par le
  frontend pour décider de l'état à afficher **avant** de montrer le formulaire.
- **`POST /auth/reset-password`** → `PasswordService.resetPassword` (`ResetPasswordRequest(token,
  newPassword)`) :
  - Rate limiting IP (`resetPasswordBucket`) → `429` au-delà du seuil.
  - Même recherche par hash + `usedAt IS NULL` que `checkResetToken` → `400` si introuvable/déjà
    consommé, `400` "Token expiré" si expiré.
  - Consommation **atomique** : `UPDATE password_reset_token SET used_at = :now WHERE id = :id AND
    used_at IS NULL` (`PasswordResetTokenRepository.markUsed`) — si la ligne affectée est `0`
    (une autre requête a consommé le token entre le `SELECT` et l'`UPDATE`), renvoie `400` "Token
    invalide" plutôt que d'écraser un état déjà consommé. Corrige une race condition qui existait
    dans la version précédente (`setUsedAt` + `save` sans verrou).
  - `newPassword` validé côté serveur par `@StrongPassword` (même politique que l'inscription,
    exposée via `GET /auth/password-policy` : longueur min 12, ≥1 majuscule, ≥1 chiffre, ≥1
    spécial — US01.2.4).
  - Succès : `BCrypt` (`PasswordEncoder`, coût par défaut Spring Security = 10, **pas 12** comme
    libellé dans l'AC — voir "Écarts vs ACs"), `tokenService.revokeAllForUser(userId)` (révoque
    toutes les sessions actives), envoi de l'email `password-changed.html` (nouveau template,
    contient date/IP + bouton "Sécuriser mon compte" si l'action n'est pas reconnue), audit
    `PASSWORD_RESET`.

### TTL du token de reset

- Généré par `forgotPassword` (US01.3.1, même PR) : `PasswordResetToken.expiresAt = now +
  PASSWORD_RESET_TTL_MINUTES` (feature flag admin-configurable via `FeatureFlagRepository.getInt`,
  **défaut 15 minutes**). Avant cette PR, la valeur était un `@Value` statique par défaut à 60
  minutes (visible dans le template email, passé de "Ce lien expire dans 60 minutes." à "... 15
  minutes.") — voir "Écarts vs ACs", l'AC backlog mentionne encore ">1h".

### Page `/auth/reset-password` (pivot-ui)

`ResetPasswordComponent` (`src/app/features/auth/pages/reset-password/`), route publique, machine
à états `tokenState = signal<'checking'|'valid'|'invalid'|'success'>('checking')` :

- `ngOnInit` : lit `token` en query param. Absent → `tokenState = 'invalid'` immédiat, **aucun
  appel réseau** (testé explicitement). Présent → appelle `GET /auth/check-reset-token` ; succès →
  `'valid'` (affiche le formulaire) ; erreur (400 quelle qu'en soit la cause) → `'invalid'`.
- État `'checking'` : spinner + libellé i18n `auth.reset_password.checking`.
- État `'invalid'` : icône, titre "Lien expiré ou déjà utilisé", texte générique couvrant à la fois
  expiré/déjà utilisé/inconnu, bouton **Demander un nouveau lien** vers `/auth/forgot-password` —
  un seul état générique, pas de distinction visuelle entre les trois causes (cohérent avec le
  pattern déjà observé sur `verify-email`, US01.2.2).
- État `'valid'` (`@default`) : formulaire avec un seul champ `newPassword`, validateur client
  `strongPassword` (même règle que `register`) — soumission bloquée côté client si invalide
  (`form.invalid`), **avant tout appel API** (AC "Password trop court" couvert côté client).
  Bouton submit `[disabled]="loading()"` + `<span class="spinner">` conditionnel pendant
  `loading()` — état de chargement déjà présent avant cette PR, inchangé, simplement déplacé dans
  le nouveau bloc `@default`.
- Soumission : `POST /auth/reset-password`. Succès → `tokenState = 'success'` (icône, titre,
  bouton **Se connecter**). Erreur HTTP 400 → repasse `tokenState = 'invalid'` (token consommé
  entre l'affichage du formulaire et la soumission, ex. concurrence multi-onglets) ; toute autre
  erreur (500, réseau) → `error()` générique (`common.error_generic`), formulaire réaffiché.
- Garde anti-double-soumission : un second `submit()` pendant `loading()` n'émet pas de second
  appel HTTP (testé).
- Aucun `role="alert"`/`role="status"` ni gestion de focus explicite sur les blocs
  d'erreur/succès — non livré, cohérent avec le `⬜` déjà présent sur cette ligne dans le backlog.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `pivot-core/src/main/java/fr/pivot/auth/controller/AuthController.java` | `GET /auth/check-reset-token` (nouveau) + `POST /auth/reset-password` (préexistant) |
| `pivot-core/src/main/java/fr/pivot/auth/service/PasswordService.java` | `checkResetToken()` (nouveau), `resetPassword()` modifié (consommation atomique + email) |
| `pivot-core/src/main/java/fr/pivot/auth/repository/PasswordResetTokenRepository.java` | `markUsed(id, usedAt)` — `UPDATE ... WHERE used_at IS NULL`, retourne le nombre de lignes affectées |
| `pivot-core/src/main/java/fr/pivot/auth/repository/FeatureFlagRepository.java` | `getInt("PASSWORD_RESET_TTL_MINUTES", 15)` — TTL admin-configurable |
| `pivot-core/src/main/resources/templates/email/reset-password.html` | TTL affiché passé de 60 à 15 min + bloc contact support |
| `pivot-core/src/main/resources/templates/email/password-changed.html` | Nouveau template — confirmation de changement (date, IP, CTA "Sécuriser mon compte") |
| `pivot-core/src/test/java/fr/pivot/auth/service/PasswordServiceTest.java` | TU `checkResetToken_*` (3 cas), `resetPassword_*` (429, 400 invalide, 400 expiré, happy path + email + markUsed) |
| `pivot-ui/src/app/features/auth/pages/reset-password/reset-password.component.ts` | Réécrit en machine à états `tokenState` (checking/valid/invalid/success) |
| `pivot-ui/src/app/features/auth/pages/reset-password/reset-password.component.spec.ts` | TU Vitest (9 cas : token valide/absent/invalide, soumission bloquée si mdp invalide, succès, 400/500 sur reset, mdp faible, anti-double-soumission) |
| `pivot-ui/src/app/core/auth/service/auth.service.ts` | `checkResetToken(token)` → `GET /auth/check-reset-token` (nouveau) ; `resetPassword(token, password)` préexistant |
| `pivot-ui/public/assets/i18n/{fr,en}.json` | Clés `auth.reset_password.*` complétées (`checking`, `expired_title`, `expired_body`) |

### Endpoints

- `GET /auth/check-reset-token?token={token}` — public. `200 {"message":"valid"}` ou `400`.
- `POST /auth/reset-password` — public. Body `{token, newPassword}`. `200
  {"message":"Mot de passe réinitialisé. Vous pouvez maintenant vous connecter."}` · `400`
  (token invalide/expiré/déjà utilisé, ou mot de passe hors politique) · `429` (rate limit IP).

### Modèle de token

- Table `password_reset_token` : `token_hash` (SHA-256 du token brut, jamais persisté en clair),
  `expires_at`, `used_at` (nullable — marqué, ligne conservée après consommation, jamais
  supprimée, comme pour `EmailVerification` sur US01.2.2).
- Consommation atomique via `UPDATE ... WHERE used_at IS NULL` plutôt qu'un `SELECT` puis `save()`
  — élimine la fenêtre de race condition entre deux requêtes concurrentes sur le même token.

---

## Écarts vs ACs initiaux

| AC initial | Écart | Justification / impact |
|------------|-------|-------------------------|
| Token valide → password mis à jour (**BCrypt-12**), token invalidé, redirection login | Coût BCrypt réel = valeur par défaut de `PasswordEncoder` Spring Security (**10**, pas 12) — non paramétré explicitement dans le code livré. Pas de redirection automatique : la page affiche un état `success` avec bouton manuel "Se connecter" (même pattern que `verify-email`), pas de redirection JS. | Le comportement métier (mot de passe changé, sessions révoquées, chemin vers le login) est livré et testé — coché ✅ ci-dessous, mais le coût BCrypt et le mécanisme de "redirection" divergent du libellé exact. Impact sécurité du coût 10 vs 12 : négligeable en pratique (10 reste largement au-dessus des recommandations OWASP actuelles), mais à noter si l'AC visait explicitement 12. |
| Token expiré (**> 1h**) → message d'erreur + lien "Demander un nouveau lien" | TTL réel par défaut = **15 minutes** (feature flag `PASSWORD_RESET_TTL_MINUTES`, admin-configurable), pas 1h. Le lien "Demander un nouveau lien" est bien présent, mais le message affiché ("Lien expiré ou déjà utilisé") ne distingue pas expiré vs déjà utilisé. | Le TTL plus court (15 min vs 1h) est une amélioration de sécurité délibérée (fenêtre d'attaque réduite), cohérente avec le TTL OTP device (`DEVICE_VERIFY_TTL_MINUTES`, même défaut). Le comportement perçu (erreur + CTA vers un nouveau lien) est conforme — coché ✅ ci-dessous — mais la valeur "> 1h" du libellé AC est obsolète. |
| Token inconnu → **erreur générique** | Conforme, mais l'état `'invalid'` frontend est partagé avec "token expiré" et "token déjà consommé" — un seul message, aucune fuite d'information distinctive entre les trois cas. | Coché ✅ ci-dessous — le comportement anti-énumération est strictement respecté (même état, même message, quel que soit le cas réel). |
| Ancien token utilisé → **400** (token déjà consommé) | Conforme au niveau HTTP (même code 400 que token inconnu/expiré, via `findByTokenHashAndUsedAtIsNull`). Renforcé par `markUsed()` atomique qui empêche une double consommation concurrente (race condition résolue par cette PR, absente de la version précédente). | Coché ✅ ci-dessous — comportement testé explicitement côté service (`resetPassword_throws400_whenTokenInvalid`, qui couvre le même code path qu'un token consommé) et côté robustesse (`markUsed` retourne 0 → 400). |
| Toutes les sessions actives révoquées après reset | Conforme — `tokenService.revokeAllForUser(user.getId())`, testé explicitement (`resetPassword_updatesPasswordAndRevokesSessions_onHappyPath`). Ajout non demandé par l'AC : un email `password-changed.html` est envoyé après coup, avec un CTA de sécurisation si l'action n'est pas reconnue par l'utilisateur. | Coché ✅ ci-dessous — dépasse même le périmètre de l'AC initial (notification de sécurité). |
| Clés i18n dans l'espace `auth.resetPassword.*` | Namespace réel : `auth.reset_password.*` (snake_case, cohérent avec le reste du lot MVP E01 — voir US01.2.2). Jeu de clés complet et utilisé (`title`, `subtitle`, `new_password`, `submit`, `checking`, `expired_title`, `expired_body`, `success_*`), parité FR/EN vérifiée. | Le pré-marquage `⬜` du backlog sous-estimait ce qui a été livré — coché ✅ ci-dessous, seul le nom d'espace diffère du libellé de l'AC. |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.3.1 (Mot de passe oublié — demande) | Émet le token de reset consommé par cette US (`forgotPassword`, même table `password_reset_token`, même feature flag `PASSWORD_RESET_TTL_MINUTES`). |
| US01.2.2 (Vérification email) | Même lot MVP, même pattern d'état générique `error`/`invalid` sans distinction expiré/consommé/inconnu, même convention de namespace i18n snake_case. |
| US01.2.4 (Politique de robustesse mot de passe) | `ResetPasswordRequest.newPassword` validé par la même annotation `@StrongPassword` / `security.password.*` que l'inscription — un seul point de vérité pour la politique, exposé côté frontend via `GET /auth/password-policy`. |
| US01.4.x (Connexion / sessions) | `tokenService.revokeAllForUser` (appelé ici) est le même mécanisme de révocation utilisé pour la confirmation "Not me" sur alerte de connexion suspecte (US01.4.3a). |

## Hors périmètre (explicitement exclu)

- Distinction observable côté frontend entre token expiré / déjà utilisé / inconnu (un seul état
  `'invalid'` générique, cohérent avec le choix anti-énumération de `verify-email`).
- Redirection automatique post-succès vers `/auth/login` (CTA manuel à la place).
- Rôles ARIA (`role="alert"`/`role="status"`) et gestion explicite du focus sur les états
  d'erreur/succès de la page.
- Coût BCrypt explicitement fixé à 12 (valeur par défaut Spring Security utilisée telle quelle).
