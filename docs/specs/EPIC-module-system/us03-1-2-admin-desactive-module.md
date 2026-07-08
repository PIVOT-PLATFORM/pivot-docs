# US03.1.2 — Admin désactive un module pour son tenant

## Contexte

- **US** : `docs/backlog/EPIC-module-system/FEATURES/activation-admin/us-admin-desactive-module.md` (F03.1 — Activation admin, EPIC-module-system E03)
- **PR** : `pivot-core` [#122](https://github.com/PIVOT-PLATFORM/pivot-core/pull/122) (`feat/us03-1-admin-module-activation`) · `pivot-ui` [#66](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/66) (`feat/us03-1-admin-module-activation`)
- **Dernier commit au moment du figeage** : `pivot-core` `3c68345` · `pivot-ui` `bb15b2d`
- **Gate 2 COVERAGE** : `pivot-core` 95.6 % (SonarCloud, new code) — 294 tests (`mvn verify`), 0 failure, 0 error · `pivot-ui` 90.9 % stmt (269/269 tests Vitest), 97.7 % coverage SonarCloud new code
- **Gate 4 MERGE_CONFIDENCE** : `pivot-core` 98/100 — auto-approuvé (seuil ≥ 85) · `pivot-ui` 92/100 — auto-approuvé (seuil ≥ 85)
- **Dépend de** : EN03.1 (module registry, mergée avant cette PR) · EN03.2 (`pivot-core` #123 — `GET /api/modules/{id}/status`, mergée le 2026-07-03 après cette PR) · EN03.3 (`pivot-core` #121 — cache Redis TTL 60s, mergée le 2026-07-03 avant EN03.2)
- **Périmètre partagé** : ces deux PR livrent conjointement US03.1.1 (activation), US03.1.2 (désactivation) et US03.2.1 (liste des modules côté UI) — seul le volet désactivation est couvert par cette fiche.

---

## Spec fonctionnelle

### Backend — `DELETE /api/admin/modules/{id}/activate`

Désactive un module PIVOT pour le tenant de l'administrateur authentifié. Le `tenantId` est
résolu exclusivement depuis l'entité `User` posée par `TokenAuthenticationFilter` dans les
détails d'authentification — jamais depuis le corps, un paramètre ou un en-tête de la requête.

- **Idempotent** : rappeler l'endpoint sur un module déjà inactif renvoie `200
  {"id", "enabled": false}` sans erreur, à la différence de `activate()` qui renvoie `409` sur un
  module déjà actif.
- **403 `MODULE_NOT_IN_PLAN`** si le module n'est pas enregistré dans le `ModuleRegistry` — pas de
  système plan/entitlement réel, "hors registre" est traité comme équivalent à "hors plan du
  tenant" (simplification documentée dans le Javadoc de `ModuleNotInPlanException`).
- **RBAC** porté par `AdminModuleActivationService` (`@PreAuthorize("hasRole('ADMIN')")`),
  vérifié par test d'intégration contre le vrai proxy Spring Method Security (pas un mock) —
  `ROLE_USER` → `AccessDeniedException` → 403.
- **Isolation tenant** : la désactivation du tenant A n'affecte jamais le tenant B — vérifié par
  TI dédié.
- **Audit** : chaque désactivation réussie déclenche `AuditService.log(...)` avec l'événement
  `module.deactivated`, en complément (pas en remplacement) de l'`ApplicationEventPublisher` déjà
  publié par `ModuleActivationService`.
- **Anti log-forging** : l'identifiant de module (`{id}`, donnée utilisateur) est assaini
  (`sanitizeForLog()`, neutralise CR/LF) avant tout log — correctif appliqué en cours de PR suite
  à une alerte SonarCloud CWE-117 (Security Rating), même mécanisme que sur `activate()` et sur
  EN03.2/`ModuleController`.

### Frontend — écran `/admin/modules`, action "Désactiver"

- Le bouton toggle d'une carte module active ouvre un `ConfirmDialogComponent`
  (`role="alertdialog"`, `aria-modal`, focus-trap manuel, Escape ferme, focus restauré sur le
  déclencheur à la fermeture) avec le message "Les utilisateurs connectés seront bloqués.
  Confirmer ?". **Annuler ne déclenche aucun appel API.**
- Confirmer déclenche `AdminModuleService.deactivate()` (`DELETE
  /api/admin/modules/{id}/activate`) en mutation optimiste : la carte passe à "Inactif"
  immédiatement, rollback + toast d'erreur générique en cas d'échec réseau/serveur.
- Succès → toast "Module [nom] désactivé" (`ToastService`, `role="status"`/`aria-live="polite"`)
  et badge de statut texte mis à jour ("Inactif", jamais couleur seule).
- Le toggle est désactivé pendant que sa propre requête est en vol, sans affecter les autres
  cartes (`isInFlight(id)` par module).

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `pivot-core/src/main/java/fr/pivot/modules/api/AdminModuleActivationService.java` | Service RBAC (`activate`/`deactivate`), TOCTOU non-atomique documenté et accepté (flux admin faible concurrence) |
| `pivot-core/src/main/java/fr/pivot/modules/api/AdminModuleController.java` | Contrôleur REST `GET/POST/DELETE /api/admin/modules...`, résolution tenant depuis le token, `sanitizeForLog()` |
| `pivot-core/src/main/java/fr/pivot/modules/api/AdminModuleDto.java` | DTO exposé (jamais l'entité JPA `ModuleActivation`) — `description` toujours vide (`PivotModule` n'expose pas ce champ, limitation documentée) |
| `pivot-core/src/main/java/fr/pivot/modules/api/ModuleAlreadyActiveException.java` / `ModuleNotInPlanException.java` | Exceptions métier typées, gérées par handler local |
| `pivot-core/src/main/java/fr/pivot/auth/service/AuditService.java` | Ajout des constantes `module.activated` / `module.deactivated` |
| `pivot-core/src/test/java/fr/pivot/modules/api/*` | `AdminModuleActivationServiceTest`, `AdminModuleControllerTest`, `AdminModuleActivationIntegrationTest` (RBAC réel, 409/403, idempotence, isolation tenant) |
| `pivot-ui/src/app/features/admin/modules/admin-module.service.ts` | Signals liste modules + mutation optimiste `activate()`/`deactivate()`, classification erreur 403 |
| `pivot-ui/src/app/features/admin/modules/admin-modules.component.{ts,html,scss}` | Grille de cartes module, badge texte, toggle, skeleton/empty/error state |
| `pivot-ui/src/app/core/auth/guard/admin.guard.ts` | Premier guard basé sur un rôle dans pivot-ui — redirige les non-admins vers `/home` |
| `pivot-ui/src/app/shared/confirm-dialog/confirm-dialog.component.ts` | Dialog de confirmation générique (pas de `@angular/cdk` disponible) — utilisé pour la désactivation |
| `pivot-ui/src/app/shared/toast/toast.service.ts` / `toast.component.*` | Service toast générique (pas de design-system encore disponible) |
| `pivot-ui/src/app/app.routes.ts` | Route `/admin/modules`, lazy-loaded, gardée par `adminGuard` |

### Endpoints / modèles / contrats techniques pertinents

| Méthode | Route | Rôle requis | Réponse |
|---|---|---|---|
| `DELETE` | `/api/admin/modules/{id}/activate` | `ROLE_ADMIN` | `200 {"id", "enabled": false}` (idempotent) · `401` (auth invalide/tenant absent) · `403 {"error":"MODULE_NOT_IN_PLAN"}` (module non enregistré) |

`tenantId` résolu exclusivement depuis `User.getTenant().getId()` posé par
`TokenAuthenticationFilter` — jamais body/paramètre/en-tête (revue de code + tests dédiés).

Aucune migration de schéma nouvelle pour ce chemin — réutilise la table `module_activations`
créée par EN03.1.

---

## Cohérence avec les US adjacentes

| US / Enabler | Relation |
|----|----------|
| US03.1.1 (Admin active un module) | Même PR (`pivot-core` #122, `pivot-ui` #66), même service/composants — chemin symétrique `activate()`/`deactivate()` |
| US03.2.1 (UI liste modules avec statut) | Même PR `pivot-ui` #66 — la grille de cartes et le guard `adminGuard` sont un prérequis d'affichage pour déclencher la désactivation |
| EN03.2 (`pivot-core` #123 — `GET /api/modules/{id}/status`) | Mergée après #122/#66 ; répond `Cache-Control: no-store`, ne passe pas par le cache Redis — lève le blocage documenté dans la PR `pivot-ui` #66 sans changement de code côté guard (déjà écrit pour traiter tout ce qui n'est pas `200/enabled:true` comme refusé), mais aucun test E2E dédié ne vérifie encore ce chemin de bout en bout |
| EN03.3 (`pivot-core` #121 — cache Redis TTL 60s) | Mergée le même jour ; le cache existe mais n'est pas raccordé au chemin de lecture de statut réellement emprunté par le guard Angular (`GET /api/modules/{id}/status` répond en `no-store`) — garantie "< TTL cache" non vérifiable tant que ce raccordement n'est pas fait |
| US03.3.2 (SUPER_ADMIN override) | US postérieure (`pivot-core` #159) — introduit `module_overrides`, une table distincte, sans jamais réutiliser ni modifier `module_activations` écrit par cette US |

## Hors périmètre (explicitement exclu)

- **Filtre Spring Security générique sur `/api/{module}/*`** vérifiant le statut en BDD/Redis à
  chaque requête sur des endpoints métier — aucun module métier n'existe encore pour l'exercer ;
  décision d'architecture différée à la construction du premier module collaboratif.
- **Terminaison des connexions WebSocket STOMP < 5s après désactivation** — N/A, aucun module
  utilisant WebSocket n'existe encore dans la plateforme.
- **Toast "Module désactivé par l'administrateur" pour un utilisateur actif à la prochaine
  requête** — nécessiterait un mécanisme différent d'un intercepteur 403 classique (le contrat
  `GET /api/modules/{id}/status` ne renvoie jamais 403, seulement 200/404 par choix d'EN03.2) ;
  décision d'architecture ouverte, non traitée par cette US ni par EN03.2.
- **Tests E2E Playwright** — environnement E2E indisponible lors de l'implémentation (`pivot-core`
  et `pivot-ui`), différés en suivi sur les deux PR.
- **Interface Angular de gestion des overrides SUPER_ADMIN** — hors périmètre, traité par
  US03.3.2 (postérieure).
