# US02.2.1 — Changer son mot de passe

## Contexte

- **US** : `docs/backlog/EPIC-espace-compte/FEATURES/securite-compte/us-changer-password.md` (F02.2 — Sécurité du compte, EPIC-espace-compte E02)
- **PR** : `pivot-core` [#128](https://github.com/PIVOT-PLATFORM/pivot-core/pull/128) (`feat/us02-2-1-changer-mot-de-passe`) + `pivot-ui` [#70](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/70) (`feat/us02-2-1-changer-mot-de-passe`)
- **Fusionnées le** : `pivot-core` 2026-07-05 (merge commit `1e149d7`) · `pivot-ui` 2026-07-06 (merge commit `678c4f0`)
- **Dernier commit au moment du figeage** : `pivot-core` `03bb95d` · `pivot-ui` `d25a721`
- **Gate 2 self-évalué (auteur PR)** : `pivot-core` 96/100 · `pivot-ui` 100/100
- **Gate 4 MERGE_CONFIDENCE final** : `pivot-core` 99/100 (converti de 96 → 99 après correction du finding audit ci-dessous) · `pivot-ui` 93/100 (converti de 93 → 98 par un premier passage de convergence, puis **redescendu à 93/100** par une revue Gate 4 ultérieure qui a trouvé et corrigé un bug bloquant réel — voir Divergences)
- **Dépend de** : US01.2.4 (politique de robustesse du mot de passe), US01.5.1 (email transactionnel de confirmation, réutilisé via PR#107 sans attendre le Sprint 4)

---

## Spec fonctionnelle

### Backend — `POST /api/account/password` (`pivot-core`)

`AccountController` (nouveau) délègue à `AccountPasswordService.changePassword` :

- Vérifie le mot de passe actuel par `PasswordEncoder.matches` (BCrypt) ; incorrect → `401`.
- Nouveau mot de passe validé par la contrainte `@StrongPassword` existante (US01.2.4), réutilisée
  telle quelle sur `ChangePasswordRequest` — aucune logique de robustesse dupliquée.
- Succès : `TokenService.revokeAllForUser` révoque **toutes** les sessions actives, y compris le
  token courant, puis un nouveau token est immédiatement réémis (`TokenService.issue`) et retourné
  dans le corps `200` (`AuthResponse.accessToken`) + cookie de session — concilie "révocation
  totale" et "session courante préservée" par réémission plutôt que par exclusion.
- Rate limiting 5 tentatives / 15 min sur deux buckets Redis indépendants
  (`change-password:user:{id}` et `change-password:ip:{ip}`, `RateLimiterService` existant) → `429`
  avec header `Retry-After`.
- Le message d'erreur du `429` (rate limit) est **textuellement identique** à celui du `401` (mot
  de passe actuel incorrect) — anti-énumération au sens littéral de l'AC. Le code HTTP (401 vs 429)
  et la présence du header `Retry-After` uniquement sur le 429 restent, eux, distinguables — limite
  assumée et documentée (voir Divergences).
- Aucun champ `userId`/`accountId` accepté : `spring.jackson.deserialization.fail-on-unknown-properties: true`
  activé globalement dans `application.yml` (portée volontairement globale, pas scoping par
  endpoint — un `@JsonIgnoreProperties(ignoreUnknown = false)` par DTO ne suffit pas sous
  Jackson 3.x). Champ inattendu → `400` avant toute vérification de mot de passe.
- Identité extraite exclusivement du token porteur (`SecurityContextHolder`), jamais du body.
- Email de confirmation envoyé via `EmailService.sendPasswordChangedEmail` — méthode et template
  i18n déjà existants depuis PR#107, réutilisés sans modification (US01.5.1 non attendue).

### Frontend — page `/account/security` (`pivot-ui`)

`ChangePasswordComponent`, route lazy-loaded sous le shell authentifié (`authMatchGuard`),
`OnPush`/`inject()`/signals :

- Formulaire 3 champs (mot de passe actuel / nouveau / confirmation) — bouton "Enregistrer"
  désactivé tant que le formulaire est invalide ou une soumission est en cours.
- Réutilise `PasswordStrengthComponent` (US01.2.4) tel quel pour la robustesse du nouveau mot de
  passe, `aria-live="polite"` déjà porté par le composant.
- `401` et `429` affichent le **même message inline** sur le champ mot de passe actuel avec
  `role="alert"` (anti-énumération côté UI) ; toute autre erreur → bandeau générique.
- `AuthService.changePassword()` remplace le token en mémoire (`storeAuth()`) avec celui renvoyé
  par le backend — jamais persisté en `localStorage`/cookie côté JS — la session applicative
  continue sans re-login malgré la révocation totale côté serveur.
- Boutons afficher/masquer par champ avec `aria-label` adapté ; erreurs liées via
  `aria-describedby` vers `PasswordStrengthComponent`.
- Entrée "Sécurité" du menu utilisateur (navbar), auparavant désactivée, pointe désormais vers la
  nouvelle page.
- Textes sous `account.security.password.*` (`fr.json`/`en.json`).
- Spec E2E Playwright **non livrée** avec la PR initiale (justifiée par l'absence de
  `pivot-core#128` mergé au moment de la rédaction) — voir Divergences.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `pivot-core/src/main/java/fr/pivot/auth/controller/AccountController.java` | `POST /api/account/password` (nouveau) |
| `pivot-core/src/main/java/fr/pivot/auth/dto/ChangePasswordRequest.java` | `{currentPassword, newPassword}` |
| `pivot-core/src/main/java/fr/pivot/auth/service/AccountPasswordService.java` | Vérification mdp actuel, révocation + réémission token, rate limiting double bucket, email |
| `pivot-core/src/main/java/fr/pivot/auth/exception/InvalidCurrentPasswordException.java` | 401 mot de passe actuel incorrect |
| `pivot-core/src/main/java/fr/pivot/auth/exception/ChangePasswordRateLimitException.java` | 429, même message que le 401 |
| `pivot-core/src/main/java/fr/pivot/auth/service/AuditService.java` | Callback de journalisation passé de `afterCommit()` à `afterCompletion(status)` — corrige la perte de l'événement `CHANGE_PASSWORD_FAILED`/`LOGIN_FAILED` sur rollback (voir Divergences) |
| `pivot-core/src/main/java/fr/pivot/auth/service/RateLimiterService.java` | Nouvelles méthodes de bucket `change-password:user:*` / `change-password:ip:*` |
| `pivot-core/src/main/java/fr/pivot/auth/web/GlobalExceptionHandler.java` | Mapping 401/429/400 dédiés |
| `pivot-core/src/main/resources/application.yml` | `fail-on-unknown-properties: true` (global) |
| `pivot-core/src/test/java/fr/pivot/auth/{controller,service}/*` | 9 TU service, 4 TU contrôleur, 7 TI (Postgres + Redis Testcontainers), + régression `AuditServiceTest` |
| `pivot-ui/src/app/features/account/security/change-password/change-password.component.{ts,html,scss,spec.ts}` | Composant, template, styles, 23 tests Vitest |
| `pivot-ui/src/app/core/auth/service/auth.service.ts` | `changePassword()` → `POST /api/account/password`, remplace le token en mémoire au succès |
| `pivot-ui/src/app/core/auth/interceptor/token.interceptor.ts` | `/account/password` ajouté aux endpoints dont le `401` est une erreur métier (pas une expiration de session) — correctif Gate 4, voir Divergences |
| `pivot-ui/src/app/app.routes.ts` | Route `account/security` |
| `pivot-ui/src/app/core/layout/navbar/navbar.component.ts` | Entrée "Sécurité" activée |
| `pivot-ui/public/assets/i18n/{fr,en}.json` | Clés `account.security.password.*` |

### Endpoints / modèles

- `POST /api/account/password` — authentifié. Body `{currentPassword, newPassword}` (aucun autre
  champ toléré). `200 AuthResponse{accessToken, expiresAt, user}` (nouveau token) · `400` (champ
  inattendu ou mot de passe hors politique) · `401` (mot de passe actuel incorrect) · `429`
  (rate limit, `Retry-After`, même message que le 401).

---

## Divergences vs plan initial / trouvées en Gate 4

Le fichier backlog pré-rédigé annonçait cette implémentation sans anticiper les points suivants,
découverts pendant l'exécution réelle et les passages Gate 4 :

1. **Bug bloquant trouvé et corrigé avant merge (`pivot-ui`)** — `TokenInterceptor` traitait tout
   `401` hors `/auth/*` comme une expiration de session (`SessionExpiryService.onSessionExpired()` :
   purge du token, toast, redirection `/auth/login`). `/account/password` n'était pas exclu : un
   utilisateur qui se trompait sur son mot de passe **actuel** se retrouvait déconnecté de force
   au lieu de voir le message inline attendu par l'AC — cassant directement l'AC "401 → message
   inline, jamais de déconnexion". Les 23 tests de composant ne l'ont pas détecté (ils ne montent
   pas l'intercepteur réel). Corrigé (commit `b457485`) : `/account/password` ajouté à la liste des
   endpoints dont le 401 est une erreur métier, + test de régression dans
   `token.interceptor.spec.ts`. Le score Gate 4 final de `pivot-ui` (93/100) est donc **plus bas**
   que le score du passage de convergence intermédiaire (98/100) : la baisse reflète un vrai
   finding bloquant détecté après coup, pas une régression de qualité.
2. **Dette technique préexistante corrigée en marge de l'US (`pivot-core`)** — `AuditService.log()`
   enregistrait son callback via `TransactionSynchronization.afterCommit()`, qui ne se déclenche
   jamais sur un chemin en rollback : l'événement d'audit `CHANGE_PASSWORD_FAILED` n'était donc
   jamais persisté en cas d'échec. Bug partagé avec `SessionService.login`/`LOGIN_FAILED`, déjà
   présent sur `main` avant cette PR. Corrigé en même temps (passage à `afterCompletion(status)`),
   ce qui dépasse le périmètre strict de l'AC de cette US mais corrige un défaut réel touché par
   le même composant.
3. **Anti-énumération 401/429 : conforme au libellé littéral, pas au sens strict.** Le texte du
   message est identique entre le `401` et le `429`, comme l'exige l'AC, mais le code HTTP diffère
   et `Retry-After` n'est présent que sur le `429` — un attaquant peut donc distinguer les deux cas
   au niveau protocole. Analysé explicitement en Gate 4 comme une tension irréductible entre deux
   moitiés du même AC (message indistinguable **et** sémantique REST standard du rate limiting) :
   non tranchée unilatéralement par l'agent Dev, faute de décision PO explicite sur laquelle des
   deux exigences prime. AC coché ✅ ci-dessous au sens littéral (texte identique, testé), avec
   cette réserve documentée.
4. **Spec E2E Playwright différée, pas encore livrée.** Justifiée initialement par l'absence de
   `pivot-core#128` mergé (pas d'environnement réel pour exercer 401/429/200 contre le vrai
   contrat). Au moment du dernier passage Gate 4 sur `pivot-ui` (2026-07-05, veille du merge),
   `pivot-core#128` était déjà mergé sur `main` — la justification initiale n'était donc plus
   valide, mais la review a accepté le report en dernière instance comme action de suivi tracée
   (à livrer avant de passer l'US globale en `Stage: Done`), pas comme un gap silencieux. **Aucune
   spec E2E n'existe à ce jour pour `/account/security`.**
5. **Auto-évaluations Gate 2 des PR ≠ scores Gate 4 réels.** Le fichier backlog ne portait que les
   scores Gate 2 self-évalués par l'auteur au moment de la soumission (96/100 côté core, 100/100
   côté ui) — ce document fige les scores Gate 4 réels obtenus après review et corrections
   (99/100 et 93/100 respectivement), qui sont les scores de référence pour ce figeage.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.2.4 (Politique de robustesse mot de passe) | `@StrongPassword`/`PasswordPolicyService` réutilisés tels quels côté backend et frontend, aucune logique dupliquée. |
| US01.5.1 (Email sur action sensible) | `EmailService.sendPasswordChangedEmail` réutilise le système d'emails transactionnels i18n livré par PR#107, sans attendre le Sprint 4. |
| US02.2.3 (Sessions actives) | Même mécanisme `TokenService.revokeAllForUser` que celui utilisé ici pour la révocation totale + réémission. |
| US01.4.3a (Alerte connexion suspecte) | Partage le pattern de révocation totale de sessions (`revokeAllForUser`) déclenché par une action sensible sur le compte. |

## Hors périmètre (explicitement exclu)

- Spec E2E Playwright pour `/account/security` — reportée, action de suivi tracée avant
  `Stage: Done` de l'US globale (voir Divergences #4).
- Garantie d'anti-énumération 401/429 au niveau protocole (code HTTP + header) — seul le texte du
  message est garanti identique (voir Divergences #3).
- `Clock` injecté dans `AccountPasswordService` (utilise `Instant.now()` en dur) — dette
  d'architecture mineure notée en Gate 4, non corrigée, non bloquante.
