# US06.1.4 — Admin désactive un compte utilisateur

## Contexte

- **US** : `docs/backlog/EPIC-administration/FEATURES/gestion-utilisateurs/us-desactiver-compte.md` (F06.1 — Gestion des utilisateurs, EPIC-administration)
- **PR** : `pivot-core` [#142](https://github.com/PIVOT-PLATFORM/pivot-core/pull/142) (`feat/us06-1-4-5-desactiver-reactiver-compte`) · `pivot-ui` [#85](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/85) (`feat/us06-1-4-5-desactiver-reactiver-compte`)
- **Dernier commit au moment du figeage** : `pivot-core` `4bdacdd` (merge commit `351cc61`) · `pivot-ui` `af32ab2` (merge commit `7fc919b`)
- **Gate 2 COVERAGE** : `pivot-core` 98/100 (743 tests `mvn verify`, 0 échec) · `pivot-ui` 93/100 en auto-évaluation initiale, **787/787 tests Vitest verts** et couverture `admin/users` 99.57 % stmt / 96.55 % branches / 100 % functions après le rebase effectué en Gate 4
- **Gate 4 MERGE_CONFIDENCE** : `pivot-core` 100/100 — auto-approuvé (seuil ≥ 85), 1 correction appliquée en review (test RBAC `ROLE_USER` manquant, ajouté) · `pivot-ui` 100/100 — auto-approuvé, 1 correction appliquée en review (spec Playwright `e2e/admin/admin-users-status.spec.ts` manquante, ajoutée)
- **Périmètre partagé** : ces deux PR livrent **conjointement** US06.1.4 (désactivation) et US06.1.5 (réactivation) — un seul endpoint `PATCH /api/admin/users/{userId}/status`, une seule implémentation pour les deux directions. Cette fiche couvre uniquement le volet désactivation ; le volet réactivation (US06.1.5) n'a pas encore de fiche Gate 5 figée à la date de rédaction.
- **Dépend de** : US06.1.2 (liste utilisateurs, `pivot-ui` #82) et US06.1.3 (modification de rôle, `pivot-core` #141 / `pivot-ui` #84) — les deux PR de cette US étaient stackées dessus et ont été rebasées sur `main` avant merge, dans l'ordre US06.1.2 → US06.1.3 → US06.1.4/US06.1.5.

---

## Spec fonctionnelle

### Backend — `PATCH /api/admin/users/{userId}/status`

Désactive (ou réactive, US06.1.5) le compte d'un utilisateur du tenant de l'administrateur
authentifié, via un endpoint unique distinguant la direction par le champ `status`.

- **Rôle requis** : `ROLE_ADMIN` (`@PreAuthorize`), vérifié par test d'intégration contre le vrai
  proxy Spring Method Security (`ROLE_USER` → `403`, test ajouté pendant la Gate 4 review).
- **Enum stricte** (`AssignableStatus`) : seules `"ACTIVE"` et `"INACTIVE"` sont acceptées ; toute
  autre valeur (y compris `"BLOCKED"`, un état backend distinct non pilotable par cet endpoint) →
  `400`.
- **Auto-désactivation interdite** : un admin ciblant son propre compte avec `"INACTIVE"` reçoit
  `403 SELF_STATUS_CHANGE_FORBIDDEN` (`SelfStatusChangeForbiddenException`). Cette garde est
  **asymétrique par construction** : se cibler soi-même avec `"ACTIVE"` (US06.1.5) est autorisé.
- **Isolation tenant** : `userId` appartenant à un autre tenant ou inexistant → `404` (jamais
  `403`, jamais distingué entre les deux cas) — vérifié par test d'intégration cross-tenant dédié.
- **Révocation immédiate des tokens** : `TokenService#revokeAllForUser`, même mécanisme que
  US06.1.3.
- **Vérification par requête indépendante de la révocation** : `TokenService#validate` relit
  désormais `user.isActive()` en base à chaque requête authentifiée (nouveau check
  `isUserDeactivated`, symétrique de la vérification `tenant_invalidation_timestamp` existante de
  US06.2.2) — un compte re-désactivé reste bloqué même si la révocation explicite était omise ou
  retardée. Testé en désactivant un compte **directement en base sans passer par l'endpoint**
  (`ac0614Http06`), pour isoler cette garantie de la révocation explicite.
- **Audit** : `UserDeactivated` enregistré via `AuditService` à chaque désactivation réussie.

### Frontend — écran `/admin/users`, action "Désactiver"

- Bouton "Désactiver" (`btn-danger`) affiché uniquement sur les lignes `ACTIVE` (mutuellement
  exclusif avec le bouton "Réactiver" affiché sur les lignes `INACTIVE` ; aucun bouton sur les
  lignes `BLOCKED` — décision Step 0 documentée, ce statut n'est pas piloté par cet endpoint).
- Clic → ouvre `ConfirmDialogComponent` avant tout appel API (jamais de mutation directe),
  `role="alertdialog"`, `aria-modal="true"`, focus trap, message exact : "L'utilisateur sera
  déconnecté immédiatement de toutes ses sessions."
- Confirmation → `AdminUsersService.changeStatus()` en mutation optimiste (même convention que
  `changeRole()` de US06.1.3 et `AdminModuleService` de US03.1) : le badge de statut de la ligne
  change immédiatement, réconcilié avec la réponse serveur, rollback à la valeur précédente au
  moindre échec.
- Succès → toast "Compte désactivé" + badge de statut mis à jour en temps réel (signal `users()`
  partagé avec le reste du tableau).
- Échec → toast d'erreur classifié (générique / auto-désactivation / statut invalide /
  introuvable) + rollback optimiste côté service.
- `aria-label="Désactiver le compte de [nom]"` par ligne, pour éviter des boutons identiques dans
  le tableau (DOM répétitif).
- Textes (bouton, dialog, toasts) internalisés sous `admin.users.status.*` (`fr.json` / `en.json`,
  parité vérifiée programmatiquement lors de la Gate 4 review).

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `pivot-core/src/main/java/fr/pivot/auth/controller/AdminUserController.java` | Endpoint `PATCH /api/admin/users/{userId}/status`, délègue entièrement à `AdminUserService` |
| `pivot-core/src/main/java/fr/pivot/auth/dto/AssignableStatus.java` | Enum stricte `ACTIVE`/`INACTIVE` exposée dans le DTO de requête |
| `pivot-core/src/main/java/fr/pivot/auth/dto/UpdateUserStatusRequest.java` | Corps de requête `{ status }` |
| `pivot-core/src/main/java/fr/pivot/auth/exception/SelfStatusChangeForbiddenException.java` | Exception métier typée, garde d'auto-désactivation |
| `pivot-core/src/main/java/fr/pivot/auth/service/AdminUserService.java` | `updateStatus()` — logique métier des deux directions, `@Transactional` |
| `pivot-core/src/main/java/fr/pivot/auth/service/AuditService.java` | Ajout des événements `UserDeactivated` / `UserReactivated` |
| `pivot-core/src/main/java/fr/pivot/auth/service/EmailService.java` | `sendAccountReactivatedEmail` (US06.1.5, hors périmètre désactivation) |
| `pivot-core/src/main/java/fr/pivot/auth/service/TokenService.java` | `validate()` étendu avec `isUserDeactivated()` — relecture DB par requête |
| `pivot-core/src/test/java/fr/pivot/auth/controller/AdminUserControllerTest.java` / `AdminUserIntegrationTest.java` | TU/TI endpoint : RBAC, enum, auto-désactivation, cross-tenant |
| `pivot-core/src/test/java/fr/pivot/auth/service/AdminUserServiceTest.java` / `TokenServiceTest.java` | TU service et `TokenService#validate` (rejet post-désactivation, avec et sans révocation explicite) |
| `pivot-ui/src/app/features/admin/users/admin-user.model.ts` | `AdminUserToggleableStatus`, `AdminUserStatusChangeErrorKind` |
| `pivot-ui/src/app/features/admin/users/admin-users.service.ts` | `changeStatus()` — mutation optimiste, réconciliation, rollback, classification d'erreur |
| `pivot-ui/src/app/features/admin/users/admin-users.component.{ts,html,scss}` | Bouton statut par ligne, intégration `ConfirmDialogComponent`, toasts, badge temps réel |
| `pivot-ui/public/assets/i18n/{fr,en}.json` | Clés `admin.users.status.*` |
| `pivot-ui/e2e/admin/admin-users-status.spec.ts` | Spec Playwright (ajoutée en Gate 4 review) — cycle désactivation → réactivation + rollback sur 403 |

### Endpoints / modèles / contrats techniques pertinents

| Méthode | Route | Rôle requis | Réponse |
|---|---|---|---|
| `PATCH` | `/api/admin/users/{userId}/status` | `ROLE_ADMIN` | `200` `AdminUserDto` mis à jour · `400` (enum invalide) · `403 SELF_STATUS_CHANGE_FORBIDDEN` (auto-désactivation) ou `403` RBAC · `404 USER_NOT_FOUND` (cross-tenant ou inexistant, non distingués) |

**Écart assumé avec le texte de l'AC** : le backend n'a aucun `AuthenticationEntryPoint`
personnalisé — tout token absent, invalide, expiré, révoqué ou appartenant à un compte désactivé
retourne **`403`**, jamais `401`, sur l'ensemble de l'API. Le texte de l'AC dit littéralement
"401" — implémenté et testé en `403`, conformément à la convention déjà établie par US06.1.3
(même déviation, même justification). Le frontend traite ce `403` comme les autres 403 d'auth
déjà gérés côté Angular (déconnexion + redirection login), pas de distinction possible entre
"token invalide" et "compte désactivé" côté client.

Aucune migration de schéma nouvelle pour ce chemin — réutilise la colonne `status` de `users`
(pré-existante).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US06.1.5 (Admin réactive un compte) | Même PR (`pivot-core` #142, `pivot-ui` #85), même endpoint, même service/composant — chemin symétrique `INACTIVE`/`ACTIVE`. Pas encore de fiche Gate 5 propre à la date de rédaction. |
| US06.1.3 (Admin modifie le rôle) | Base de branche (stack) des deux PR de cette US — même pattern de révocation de token, même déviation `403` documentée. |
| US06.1.2 (Liste des utilisateurs) | Fournit le tableau et la ligne sur laquelle le bouton "Désactiver" est ajouté. |
| US06.2.2 (Invalidation tenant) | `TokenService#validate` déjà doté d'une vérification `tenant_invalidation_timestamp` — le nouveau check `isUserDeactivated` en est la contrepartie symétrique au niveau utilisateur. |

## Hors périmètre (explicitement exclu)

- **Volet réactivation (US06.1.5)** — implémenté dans les mêmes PR mais non détaillé dans cette
  fiche ; voir fiche Gate 5 dédiée si figée séparément.
- **Distinction du code d'erreur `403` entre "auto-désactivation" et "token invalide/révoqué"
  côté frontend** — le frontend pivot-ui a été développé avant l'existence de la PR backend, sur
  la base d'un contrat supposé ; les deux cas tombent sur le même toast générique classifié
  `self-deactivation`/générique selon le contexte, non affiné après coup.
- **Verrou pessimiste sur la réactivation concurrente** — signalé comme point non bloquant en
  Gate 4 core (deux `PATCH` simultanés sur un compte `INACTIVE` peuvent chacun lire l'état
  antérieur avant le `save()` de l'autre), hors périmètre AC, risque jugé mineur (email en
  double, rarissime).
- **Comptes `BLOCKED`** — état backend distinct (verrouillage après échecs de connexion), non
  pilotable par cet endpoint ; aucun bouton de statut n'est affiché sur ces lignes côté UI,
  décision Step 0 non explicitement couverte par l'AC.
