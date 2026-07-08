# US06.1.1 — Admin liste utilisateurs de son tenant (backend)

## Contexte

- **US** : `docs/backlog/EPIC-administration/FEATURES/gestion-utilisateurs/us-liste-utilisateurs-backend.md` (F06.1 — Gestion utilisateurs tenant, EPIC-administration E06)
- **PR** : `pivot-core` [#127](https://github.com/PIVOT-PLATFORM/pivot-core/pull/127) (`feat/us06-1-1-liste-utilisateurs-backend`)
- **Dernier commit au moment du figeage** : `444e6a2`
- **Gate 2 COVERAGE** : 92/100 self-évalué en PR · 97.2% coverage on new code (SonarCloud)
- **Gate 4 MERGE_CONFIDENCE** : 100/100 (2e passage de convergence, `MERGE_AUTONOMOUS`) — 1er passage 96/100, deux findings 🔵 non-bloquants traités intégralement
- **Dépend de** : E01 Auth & IAM (rôles `ROLE_ADMIN`/`ROLE_SUPER_ADMIN`), pattern d'extraction tenant déjà établi par `AdminModuleController` (US03.1.1/US03.1.2, mergé)
- **Consommé par** : US06.1.2 (Angular) — le contrat API ci-dessous est celui à respecter côté frontend

---

## Spec fonctionnelle

### `GET /api/admin/users`

Retourne la liste paginée des utilisateurs du tenant courant, réservée aux appelants `ROLE_ADMIN`.
Le `tenantId` n'est **jamais** accepté en paramètre (query/body/header) : il est résolu exclusivement
depuis `SecurityContextHolder` → `User.getTenant()`, l'entité `User` posée en contexte par
`TokenAuthenticationFilter` sur le token porteur — schéma rigoureusement identique à celui de
`AdminModuleController`.

**Paramètres de requête :**

- `page` (int, 0-indexed, défaut `0`) — valeur négative ramenée à `0`
- `size` (int, défaut `20`) — clampé silencieusement à `100` si supérieur, ramené à `20` si `<= 0`
  (jamais de `400` sur `size` hors bornes)
- `role` (string, optionnel) — égalité stricte, validée contre un référentiel fermé de 4 rôles
  plateforme (`ROLE_SUPER_ADMIN`, `ROLE_ADMIN`, `ROLE_USER`, `ROLE_GUEST`) ; valeur inconnue →
  `400 INVALID_FILTER` (comportement ajouté lors de la convergence Gate 4, symétrique de `status`)
- `status` (string, optionnel) — une valeur parmi `ACTIVE` / `INACTIVE` / `BLOCKED` (insensible à
  la casse) ; toute autre valeur → `400 Bad Request` `{ "error": "INVALID_FILTER", "field": "status", "message": "..." }`
- `search` (string, optionnel) — sous-chaîne insensible à la casse, matchée sur `email` OU
  `firstName` OU `lastName`

**Comportements notables :**

- Tri par défaut non paramétrable : `createdAt DESC, id ASC` (le plus récent en premier, id en
  tie-break déterministe). Aucun paramètre `sort` exposé dans cette US.
- Comptes soft-deleted (`deleted_at IS NOT NULL`, RGPD Art. 17) toujours exclus de la liste, sans
  paramètre pour les inclure.
- Isolation cross-tenant garantie : `UserSpecifications.forTenant` toujours combiné en premier
  dans la spec JPA — un admin du tenant A ne voit jamais un utilisateur du tenant B, et
  réciproquement (testé explicitement, `ac0611Sec02`).
- `status` est un champ **dérivé**, pas une colonne unique : `User` porte deux booléens
  indépendants (`is_active`, `is_blocked`), combinés en un statut synthétique `UserStatus`
  (`BLOCKED` prioritaire sur `INACTIVE`).

**Codes de réponse :** `200` succès · `401` contexte d'authentification invalide (`resolveAdmin()`
retourne `null`) · `403` rôle appelant ≠ `ROLE_ADMIN` (`AccessDeniedException` Spring Security,
comportement par défaut) · `400` `status` ou `role` invalide.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Rôle |
|---------|------|
| `AdminUserController.java` | Endpoint `GET /api/admin/users`, résolution admin/tenant depuis le contexte de sécurité, délégation intégrale au service |
| `AdminUserService.java` | Pagination (clamp page/size), parsing `status`, validation `role` contre référentiel fermé (`KNOWN_ROLES`), orchestration `UserSpecifications` |
| `AdminUserDto.java` (record) | DTO exposé en API — jamais l'entité `User` |
| `UserStatus.java` | Enum synthétique `ACTIVE`/`INACTIVE`/`BLOCKED`, dérivé de `is_active`/`is_blocked` |
| `InvalidUserFilterException.java` | Exception dédiée → `400 INVALID_FILTER` (gérée localement au contrôleur) |
| `UserSpecifications.java` | Specs JPA Criteria : `forTenant`, `withRole`, `withStatus`, `matchingSearch`, exclusion soft-deleted |
| `UserRepository.java` | Extension pour support `JpaSpecificationExecutor` |
| `AdminUserControllerTest.java` / `AdminUserServiceTest.java` | Tests unitaires (délégation, RBAC, filtres, erreurs 400/401) |
| `AdminUserIntegrationTest.java` | Tests TI Testcontainers PostgreSQL — appels directs des beans Spring (`@Autowired`), pas de round-trip HTTP `MockMvc` |

### Endpoints / modèles / contrats techniques pertinents

```text
GET /api/admin/users?page=0&size=20&role=ROLE_USER&status=ACTIVE&search=alice
Authorization: Bearer <token ROLE_ADMIN>
```

Réponse `200` — forme **Spring Data `Page` standard** (sérialisation par défaut de `PageImpl`,
pas de DTO enveloppe custom) :

```json
{
  "content": [
    {
      "id": 42,
      "email": "alice@tenant.test",
      "firstName": "Alice",
      "lastName": "Martin",
      "role": "ROLE_USER",
      "status": "ACTIVE",
      "createdAt": "2026-07-01T10:15:30Z"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "number": 0,
  "size": 20,
  "numberOfElements": 1,
  "first": true,
  "last": true,
  "empty": false
}
```

`AdminUserDto` (`fr.pivot.auth.dto.AdminUserDto`, record) :

| Champ | Type | Note |
|---|---|---|
| `id` | `Long` | |
| `email` | `String` | |
| `firstName` | `String` | peut être `null` |
| `lastName` | `String` | peut être `null` |
| `role` | `String` | valeur brute colonne `role` (ex. `ROLE_ADMIN`) |
| `status` | `String` (enum `UserStatus`) | `ACTIVE` \| `INACTIVE` \| `BLOCKED` |
| `createdAt` | `Instant` (ISO-8601) | |

**Package** : `fr.pivot.auth.{controller,service,dto,exception}` (et non `fr.pivot.modules.api`
où vit `AdminModuleController`) — choix documenté en PR : cette fonctionnalité porte sur
`User`/tenant, pas sur le système de modules.

### Écarts vs libellé littéral de l'US (divergences réelles constatées)

1. **`status` dérivé, pas une colonne** — non explicite dans l'AC brut, introduit pour respecter
   le libellé « Champs : ... status ... » malgré l'absence de colonne `status` en base.
2. **`role` invalide → `400`, ajouté après le 1er passage Gate 4** — le comportement livré au 1er
   merge (96/100) acceptait silencieusement n'importe quelle chaîne pour `role` (page vide si
   inconnu), asymétrique avec `status`. Corrigé lors de la convergence (commit `d1360c9`) : `role`
   est désormais validé contre un référentiel fermé de 4 rôles plateforme, symétrique de `status`.
   **US06.1.2 doit s'attendre à un `400 INVALID_FILTER` sur `role` inconnu**, pas seulement sur
   `status`.
3. **`size` hors bornes clampé, jamais rejeté** — asymétrie intentionnelle avec `status`/`role`
   (rejetés en `400`) : à gérer côté FE (jamais de `400` attendu sur `page`/`size`).
4. **Tests TI par appel direct des beans Spring**, pas de round-trip HTTP `MockMvc` — suit un
   pattern déjà en place (`AdminModuleActivationIntegrationTest`), pas une nouveauté de cette PR ;
   pas de couverture dédiée de la forme JSON exacte au niveau HTTP réel (signalé comme gap mineur
   dans l'auto-évaluation Gate 2, -2 points, non traité comme un blocage Gate 4).
5. **Spec Playwright E2E différée** — US backend-only, couverte côté E2E par US06.1.2 (Angular).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US06.1.2 (Angular, liste utilisateurs frontend) | Consomme ce contrat API tel quel — doit utiliser les 3 valeurs exactes de `UserStatus`, gérer le `400 INVALID_FILTER` sur `status` **et** `role`, ne jamais s'attendre à un `400` sur `page`/`size` |
| US03.1.1 / US03.1.2 (`AdminModuleController`, mergé) | Pattern de résolution tenant (`SecurityContextHolder` → `User.getTenant()`) et de gestion d'exception locale au contrôleur repris à l'identique |

## Hors périmètre (explicitement exclu)

- Tri personnalisable (paramètre `sort`) — non demandé par l'AC.
- Endpoint testé en TI via `MockMvc`/round-trip HTTP réel — suit le pattern existant du repo (appel
  direct des beans Spring).
- Inclusion des comptes soft-deleted (aucun paramètre pour les faire apparaître).
- Modification de `docs/backlog/**` dans le périmètre de la PR core (fait exprès, backlog géré
  séparément dans `pivot-docs`).
