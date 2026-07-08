# US01.2.4 — Politique de robustesse du mot de passe

## Contexte

- **US** : `docs/backlog/EPIC-auth-iam/FEATURES/inscription-verification/us-politique-password.md`
  (F01.2 — Inscription/vérification, EPIC-auth-iam E01)
- **PR** : `pivot-core` [#120](https://github.com/PIVOT-PLATFORM/pivot-core/pull/120)
  (`feat/us01-2-4-politique-password`, `@StrongPassword` + endpoint policy) +
  `pivot-ui` [#65](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/65)
  (`feat/us01-2-4-politique-password`, `PasswordStrengthComponent`)
- **Fusionnées le** : 2026-07-03 (`pivot-core` 18:26 UTC, `pivot-ui` 21:40 UTC)
- **Gate 4 au figeage** : `pivot-core` 100/100 — `MERGE_AUTONOMOUS` · `pivot-ui` 98/100 —
  `MERGE_AUTONOMOUS` (-2 : budget SCSS d'un composant dépassé pendant le développement, corrigé
  avant review ; timeout du job Stryker CI porté de 30 à 45 min dans le même lot, job non
  bloquant par design)
- **Dépend de** : US01.2.1 (inscription — remplace la contrainte serveur `@Size(min=8)` de cette
  US par `@StrongPassword`) et US01.3.2 (réinitialisation — même contrainte appliquée à
  `ResetPasswordRequest.newPassword`)

---

## Spec fonctionnelle

### Validation backend — `@StrongPassword` (pivot-core)

Contrainte Bean Validation appliquée sur `RegisterRequest.password` et
`ResetPasswordRequest.newPassword` :

- Politique par défaut : 12 caractères minimum, 1 majuscule, 1 chiffre, 1 caractère spécial —
  liée à `security.password.*` (`PasswordPolicyProperties`, `@ConfigurationProperties`,
  4 champs exhaustifs : `min-length`, `min-uppercase`, `min-digits`, `min-special`, aucun
  paramètre implicite). Surchargeable par variables d'environnement
  (`SECURITY_PASSWORD_MIN_LENGTH` etc.).
- Classification Unicode : majuscule = `Character.isUpperCase(int)` (ex. `É` compte), chiffre =
  `Character.isDigit(int)` (ex. chiffres arabo-indiens comptent), spécial = tout code point qui
  n'est ni lettre ni chiffre (`!Character.isLetterOrDigit`, emoji et ponctuation inclus).
  Longueur mesurée en unités UTF-16 (`String.length()`), cohérente avec le `String.length` JS
  côté frontend.
- `null` est valide côté validateur — `@NotBlank` porte cette règle séparément.
- Nouvel endpoint public `GET /auth/password-policy` (`/api/auth/password-policy` avec le
  context-path applicatif) — sans authentification par design (la politique n'est pas une
  donnée sensible, doit être lisible avant connexion sur la page d'inscription) — renvoie
  `{minLength, minUppercase, minDigits, minSpecial}` (`PasswordPolicyDto`), miroir exact de
  `PasswordPolicyProperties`.

### `PasswordStrengthComponent` (pivot-ui)

Composant standalone partagé (`shared/components/password-strength/`), `OnPush`, Signals,
intégré sous le champ mot de passe des pages **Inscription** et **Réinitialisation** :

- `PasswordPolicyService` (`core/auth/service/`) charge la politique **une seule fois**
  (`load()` idempotent, un seul appel HTTP quel que soit le nombre d'invocations/composants
  consommateurs) — aucun appel API à la frappe. En cas d'échec réseau, fallback silencieux sur
  `DEFAULT_PASSWORD_POLICY` (valeurs identiques aux défauts backend) — le backend reste
  l'autorité : un mot de passe non conforme est de toute façon rejeté en 400 côté serveur.
  Classification Unicode alignée sur le backend (`\p{Lu}` / `\p{Nd}` / ni lettre ni chiffre).
- Niveau de force — règle codée dans `PasswordPolicyService.strengthLevel()`, **non explicitée
  telle quelle dans l'AC initial** : `null` si champ vide · `weak` si au moins un critère de la
  politique n'est pas satisfait · `medium` si la politique est satisfaite · `strong` si la
  politique est satisfaite **et** la longueur ≥ `minLength + 4`. Affiché en texte visible
  ("Faible"/"Moyen"/"Fort", clé `auth.password.strength.<lvl>`) — jamais uniquement par couleur.
- Checklist des 4 critères (`criteriaView()`), cochée en temps réel, `role="listitem"` par
  critère, icône ✓/✗ (`aria-hidden`) + texte SR-only (`auth.password.strength.criteria_met` /
  `criteria_not_met`), libellés paramétrés par le `count` réel de la politique
  (`auth.password.strength.criteria.{min_length,uppercase,digit,special}`).
- Accessibilité : zone de niveau (`{idPrefix}-meter`) en `aria-live="polite"` /
  `aria-atomic="true"` ; checklist (`{idPrefix}-criteria`) en `<ul role="list">`. Le champ
  mot de passe parent référence les deux via `aria-describedby` (ex.
  `register-password-meter register-password-criteria`).
- `PasswordPolicyService.validator()` — `ValidatorFn` réactif appliqué au(x) champ(s) mot de
  passe ; ré-évalué via un `effect()` sur le signal de politique si celle-ci arrive après une
  saisie (`updateValueAndValidity({ emitEvent: false })`).
- Libellés internationalisés sous `auth.password.strength.*` (fr.json/en.json) — espace de noms
  **partagé** entre Inscription et Réinitialisation (avant cette PR, les clés étaient dupliquées
  sous `auth.register.password.*`/`auth.register.strength.*` avec 5 niveaux
  very_weak→very_strong ; réduites à 3 niveaux faible/moyen/fort par cette US, conformément à
  l'AC).

### Formulaire d'inscription — champ de confirmation (pivot-ui)

- Ajout du champ `confirmPassword` (absent jusqu'ici — cf. écart documenté dans le spec figé
  US01.2.1, "Champ de confirmation du mot de passe absent"). Validateur de groupe
  `passwordsMatch` sur le `FormGroup` (pas sur le champ) : erreur `passwordMismatch` portée par
  le groupe.
- `showMismatchError()` — n'affiche l'erreur (`role="alert"`, `id="confirm-password-error"`,
  référencé par `aria-describedby` du champ Confirmer) que si `confirmPassword` a été touché
  (blur), jamais à chaque frappe.
- Bouton de soumission : `[disabled]="form.invalid || loading()"` — bloqué tant que
  `password`/`confirmPassword` sont invalides (requis, politique non satisfaite, ou mismatch).
  Le formulaire de réinitialisation applique la même garde (`form.invalid || loading()`) sur son
  unique champ `newPassword`, bien que l'AC ne mentionne explicitement que le formulaire
  d'inscription.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `pivot-core/src/main/java/fr/pivot/auth/validation/StrongPassword.java` | annotation `@Constraint`, cible champ/paramètre/composant record |
| `pivot-core/src/main/java/fr/pivot/auth/validation/PasswordValidator.java` | `ConstraintValidator<StrongPassword, String>`, classification Unicode |
| `pivot-core/src/main/java/fr/pivot/auth/validation/PasswordPolicyProperties.java` | `@ConfigurationProperties("security.password")`, record 4 champs avec `@DefaultValue` |
| `pivot-core/src/main/java/fr/pivot/auth/dto/PasswordPolicyDto.java` | DTO public exposé par l'endpoint policy |
| `pivot-core/src/main/java/fr/pivot/auth/dto/RegisterRequest.java` | `password` : `@Size(min=8)` → `@Size(max=128) @StrongPassword` |
| `pivot-core/src/main/java/fr/pivot/auth/dto/ResetPasswordRequest.java` | `newPassword` : idem `RegisterRequest.password` |
| `pivot-core/src/main/java/fr/pivot/auth/controller/AuthController.java` | `GET /auth/password-policy` (nouveau), injection `PasswordPolicyProperties` |
| `pivot-core/src/main/java/fr/pivot/PivotBackendApplication.java` | `@ConfigurationPropertiesScan("fr.pivot")` (nouveau, requis pour lier `PasswordPolicyProperties`) |
| `pivot-core/src/main/resources/application.yml` / `application-test.yml` | section `security.password.*`, défauts 12/1/1/1, surchargeables par env var |
| `pivot-core/src/test/java/fr/pivot/auth/validation/PasswordValidatorTest.java` | TU limites 11/12/13, critères isolés, Unicode, politique stricte configurable (`ac0124_01_*`, `ac0124_02_*`) |
| `pivot-core/src/test/java/fr/pivot/auth/controller/PasswordPolicyIntegrationTest.java` | TI Testcontainers — endpoint policy + rejets 400 inscription/reset (`ac0124_01_*`, `ac0124_03_*`) |
| `pivot-core/src/test/java/fr/pivot/auth/controller/AuthControllerTest.java` | TU `passwordPolicy_returnsConfiguredRules` |
| `pivot-ui/src/app/core/auth/service/password-policy.service.ts` | `PasswordPolicyService` — `load()`, `evaluate()`, `isCompliant()`, `strengthLevel()`, `validator()`, `DEFAULT_PASSWORD_POLICY` |
| `pivot-ui/src/app/shared/components/password-strength/password-strength.component.{ts,html,scss}` | `PasswordStrengthComponent` standalone partagé (inscription + réinitialisation) |
| `pivot-ui/src/app/features/auth/pages/register/register.component.ts` | champ `confirmPassword`, validateur de groupe `passwordsMatch`, `showMismatchError()`, suppression de l'ancien `strongPassword`/`passwordStrength()` inline |
| `pivot-ui/src/app/features/auth/pages/reset-password/reset-password.component.ts` | intégration `PasswordPolicyService`/`PasswordStrengthComponent`, suppression de l'ancien `strongPassword` inline |
| `pivot-ui/public/assets/i18n/{fr,en}.json` | nouvel espace `auth.password.strength.*` (3 niveaux), `auth.register.confirm_password`, `auth.register.password_mismatch` ; suppression des clés `auth.register.password.{min_length,need_*}` et `auth.register.strength.{very_weak,very_strong}` |
| `pivot-ui/e2e/auth/register.spec.ts` | helper E2E renseigne désormais `#confirmPassword` |
| `pivot-ui/.github/workflows/pr-checks.yml` | timeout du job Stryker (job-level) 30 → 45 min — correctif CI incidental groupé dans cette PR, scopé à la valeur du timeout uniquement |

### Endpoint

`GET /api/auth/password-policy` — public, sans authentification. Réponse `200` :
`{minLength, minUppercase, minDigits, minSpecial}` (entiers, valeurs = `security.password.*`).

### Politique par défaut

| Paramètre | Défaut | Variable d'environnement |
|-----------|--------|---------------------------|
| `minLength` | 12 | `SECURITY_PASSWORD_MIN_LENGTH` |
| `minUppercase` | 1 | `SECURITY_PASSWORD_MIN_UPPERCASE` |
| `minDigits` | 1 | `SECURITY_PASSWORD_MIN_DIGITS` |
| `minSpecial` | 1 | `SECURITY_PASSWORD_MIN_SPECIAL` |

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.2.1 (inscription) | Remplace la contrainte serveur `@Size(min=8)` documentée comme provisoire dans le spec figé de cette US par `@StrongPassword`. Ajoute également le champ `confirmPassword` dont l'absence était explicitement documentée comme écart dans ce même spec — écart désormais résolu par cette US. |
| US01.3.2 (reset password) | `ResetPasswordRequest.newPassword` et `ResetPasswordComponent` reçoivent la même contrainte `@StrongPassword` / le même `PasswordStrengthComponent` que l'inscription — politique strictement partagée, aucune divergence entre les deux flux. |
| US01.5.1 (email action sensible) | Aucun impact — cette US ne touche pas les templates email, uniquement la validation du mot de passe et son affichage en formulaire. |

## Hors périmètre (explicitement exclu)

- Politique de robustesse spécifique par tenant/rôle (une seule politique globale
  `security.password.*` pour toute l'instance).
- Vérification contre une liste de mots de passe compromis (type HaveIBeenPwned) — non demandée
  par l'AC, non implémentée.
- Historique des mots de passe (interdiction de réutiliser un ancien mot de passe) — hors
  périmètre de cette US.
- Le correctif de timeout CI (`pr-checks.yml`, job Stryker) est un ajustement d'infrastructure
  incidental à cette PR, sans rapport fonctionnel avec la politique de mot de passe — mentionné
  ici uniquement pour traçabilité du contenu réel de la PR `pivot-ui#65`.

---

## Statut

Figé le 2026-07-08 (rétroactif — implémentations mergées le 2026-07-03).
