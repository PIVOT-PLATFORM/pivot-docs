# US14.1.1 — Créer et gérer une roue de tirage

**En tant que** animateur
**Je veux** créer une roue de tirage avec une liste de participants ou éléments
**Afin de** animer des tirages aléatoires lors d'événements d'équipe

Différenciateur structurel (benchmark Wheel of Names, voir EPIC README) : les entrées d'une roue
peuvent référencer nativement un membre de l'équipe (`public.teams`/`public.team_members`,
ADR-006) au lieu d'être toujours ressaisies manuellement — seule limite réelle de la référence du
marché. Une entrée « libre » (nom ad hoc, sans compte PIVOT) reste possible en complément.

## Critères d'acceptation

### CRUD roue et entrées (backend `pivot-agilite-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un utilisateur authentifié membre d'une équipe de son tenant, when il envoie `POST /api/agilite/wheels` avec `{ teamId, name, entries: [...] }` (`entries` ayant au moins 1 élément valide), then l'API répond 201 avec la roue créée (`id`, `name`, `teamId`, `tenantId`, `entries`, `lastDrawnEntryId: null`, `createdAt`, `updatedAt`) | ⬜ |
| Given une entrée de type `team_member` (`teamMemberId` fourni), when la roue est créée ou mise à jour, then le `label` affiché est résolu côté serveur depuis `public.users` (prénom + nom si les deux sont renseignés, sinon email) — jamais accepté tel quel depuis le corps de la requête | ⬜ |
| Given une entrée de type `free_text` (`label` fourni), when la roue est créée ou mise à jour, then le `label` brut fourni par le client est conservé (trim, 1 à 150 caractères) | ⬜ |
| Given une entrée sans champ `weight`, when la roue est créée ou mise à jour, then son poids par défaut est `1` (poids égal entre toutes les entrées non précisées) | ⬜ |
| Given une entrée avec un `weight` explicite entre 1 et 10, when la roue est créée ou mise à jour, then ce poids est conservé tel quel (consommé par le tirage pondéré US14.2.1) | ⬜ |
| Given un utilisateur membre d'une ou plusieurs équipes, when il appelle `GET /api/agilite/wheels?teamId={id}`, then la réponse liste uniquement les roues de cette équipe, sans pagination (volume attendu faible par équipe — voir Hors périmètre) | ⬜ |
| Given l'identifiant d'une roue existante et accessible à l'appelant, when `GET /api/agilite/wheels/{wheelId}`, then la réponse 200 contient la roue complète avec ses entrées et `lastDrawnEntryId` (`null` tant qu'aucun tirage n'a eu lieu — champ consommé par US14.2.1/US14.3.1) | ⬜ |
| Given une roue existante, when `PUT /api/agilite/wheels/{wheelId}` avec un nouveau `name` et/ou une nouvelle liste `entries`, then la liste d'entrées est intégralement remplacée (ajouts, retraits, changements de poids) et la réponse 200 reflète l'état final ; `teamId` n'est pas modifiable après création | ⬜ |
| Given une roue existante, when `DELETE /api/agilite/wheels/{wheelId}`, then la roue et toutes ses entrées sont supprimées (204 No Content, suppression en cascade côté BDD) | ⬜ |
| Given un `teamId` de l'équipe de l'appelant, when `GET /api/agilite/teams/{teamId}/members`, then la réponse 200 liste les membres de l'équipe (`id` = `team_members.id`, `userId`, `displayName` résolu comme ci-dessus) — alimente le sélecteur de membres côté Angular, sans ressaisie manuelle | ⬜ |
| Given un utilisateur authentifié, when `GET /api/agilite/teams`, then la réponse 200 liste les équipes dont il est membre (`id`, `name`) — nécessaire pour choisir un `teamId` côté Angular, `pivot-core` n'exposant pas encore cette liste (gap EN17.3/`@pivot/ui-core` non consommé, voir Notes d'implémentation) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `name` vide ou de plus de 100 caractères, when création ou mise à jour, then 400 `{ code: "INVALID_NAME" }` | ⬜ |
| Error : given une liste `entries` vide (`[]`) à la création ou à la mise à jour, when `POST`/`PUT` est appelé, then 400 `{ code: "EMPTY_ENTRIES" }` — une roue doit toujours contenir au moins 1 entrée | ⬜ |
| Error : given deux entrées référençant le même `teamMemberId` dans la même roue, when création ou mise à jour, then 400 `{ code: "DUPLICATE_ENTRY" }` | ⬜ |
| Error : given deux entrées `free_text` de même `label` (comparaison insensible à la casse et aux espaces de début/fin), when création ou mise à jour, then 400 `{ code: "DUPLICATE_ENTRY" }` | ⬜ |
| Error : given un `teamMemberId` qui n'appartient pas à l'équipe `teamId` de la roue (autre équipe, ou membre entre-temps retiré de l'équipe), when création ou mise à jour, then 400 `{ code: "INVALID_ENTRY_TEAM_MEMBER" }` | ⬜ |
| Error : given un `weight` hors de l'intervalle 1–10, when création ou mise à jour, then 400 `{ code: "INVALID_WEIGHT" }` | ⬜ |
| Error : given un `teamId` inexistant ou n'appartenant pas au tenant courant, when `POST /wheels`, `GET /wheels?teamId=` ou `GET /teams/{teamId}/members`, then 404 (jamais 403 — pas de confirmation d'existence cross-tenant) | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId` est résolu exclusivement depuis le principal authentifié (`Authorization: Bearer`, via `fr.pivot.core.auth.AuthenticatedPrincipalResolver`) — jamais accepté depuis le corps, un query param ou un header custom ; requête sans token valide → 401 générique (sans fuite de la cause) | ⬜ |
| Security : l'appartenance de l'appelant à l'équipe `teamId` (`public.team_members`) est vérifiée avant toute opération (create/list/get/update/delete/liste des membres) — équipe d'un autre tenant ou appelant non membre → 404, jamais 403 (pas de fuite d'existence cross-tenant/cross-équipe) | ⬜ |
| Security : `{wheelId}` dans le path est systématiquement vérifié comme appartenant au tenant **et** à l'équipe de l'appelant avant tout traitement (`GET`/`PUT`/`DELETE`) → 404 sinon | ⬜ |
| Security : test TI cross-tenant obligatoire sur chaque endpoint (`create`, `list`, `get`, `update`, `delete`, `teams/{teamId}/members`) | ⬜ |

### Frontend (`pivot-agilite-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given la page « Mes roues », when elle se charge, then la liste des équipes de l'utilisateur (`GET /api/agilite/teams`) est utilisée pour choisir l'équipe active (pas de sélecteur d'équipe partagé avec le shell tant que `@pivot/ui-core`/EN17.3 n'est pas consommé) | ⬜ |
| Given la page « Mes roues » et une équipe active choisie, when l'utilisateur clique sur « Créer une roue », then un formulaire s'affiche : nom, sélecteur de membres de l'équipe (alimenté par `GET /api/agilite/teams/{teamId}/members`), option « ajouter un nom libre », poids ajustable par entrée (1 à 10, défaut 1) | ⬜ |
| Given une entrée ajoutée (membre ou libre) dans le formulaire, when l'utilisateur clique sur « Retirer », then l'entrée disparaît de la liste avant tout appel réseau (état local, signal Angular) | ⬜ |
| Given un formulaire de roue avec 0 entrée, when l'utilisateur tente d'enregistrer, then le bouton « Enregistrer » est désactivé ou un message d'erreur inline s'affiche — aucun appel `POST`/`PUT` avec une liste `entries` vide | ⬜ |
| Given une sauvegarde réussie (201 ou 200), when la réponse revient, then un toast de confirmation (`role="status"`) s'affiche et la liste des roues est rafraîchie | ⬜ |
| Given une erreur réseau ou 5xx, when la requête échoue, then un toast d'erreur (`role="alert"`) s'affiche avec possibilité de réessayer | ⬜ |

### A11y

| Critère | 🤖 Dev |
|---------|--------|
| A11y : formulaire de création/édition de roue entièrement navigable au clavier (ordre de tabulation logique, focus visible) | ⬜ |
| A11y : sélecteur de membres et champs de poids annoncés au lecteur d'écran (label associé via `for`/`aria-labelledby`, erreurs de validation via `aria-describedby` + `aria-invalid="true"`) | ⬜ |
| A11y : suppression d'une roue confirmée avant action destructive (`role="alertdialog"` ou équivalent), focus restitué au déclencheur après fermeture | ⬜ |
| A11y : tous les libellés (formulaire, boutons, messages) externalisés via Transloco (`fr.json`/`en.json`) — aucune chaîne littérale dans les templates | ⬜ |

## Hors périmètre

- Algorithme de tirage pondéré et endpoint `spin` — couvert par US14.2.1
- Diffusion temps réel du résultat (WebSocket/STOMP) — couverte par US14.3.1
- Table d'historique des tirages (derniers N tirages) — laissée à US14.2.1 ; cette US ne pose que
  le marqueur ponctuel `lastDrawnEntryId` sur la roue (voir Notes d'implémentation), pas
  d'historique complet
- Synchronisation automatique avec l'effectif d'équipe : si un membre quitte `team_members` après
  avoir été ajouté à une roue, son entrée n'est pas retirée automatiquement (`team_member_id`
  passe à `NULL` en base, le `label` figé au moment de l'ajout reste affiché) — pas de job de
  nettoyage dans cette US
- Rôles/partage différenciés sur une roue (owner/editor/viewer à la manière du whiteboard,
  US08.x) — dans cette US, tout membre de l'équipe peut créer/lister/modifier/supprimer toute
  roue de son équipe, sans notion de propriétaire exclusif
- Pagination de la liste des roues par équipe — volume attendu trop faible pour la justifier ici
- Endpoint de synchronisation ou d'import « en masse » dédié depuis l'effectif d'équipe — couvert
  nativement en incluant plusieurs entrées `team_member` dans le même payload de création/mise à
  jour ; pas de bouton « importer tous les membres » séparé dans cette US
- Gestion des équipes elles-mêmes (création/membres) — hors périmètre, propriété de `pivot-core`
  (`public.teams`/`public.team_members`), consommée en lecture seule ici
- Sélecteur d'équipe global partagé entre modules (« équipe active » au niveau du shell) — hors
  périmètre tant que `@pivot/ui-core`/`TeamService` (EN17.3) n'est pas consommable ; `GET
  /api/agilite/teams` reste local à ce module pour cette US

## Notes d'implémentation

- **Backend** `pivot-agilite-core` (schéma Flyway `agilite`) : `WheelController`/`WheelService`/
  `WheelRepository` sous `fr.pivot.agilite.wheel`, `TeamMembershipController` (ou équivalent) sous
  `fr.pivot.agilite.team` pour `GET /api/agilite/teams` (équipes de l'appelant) et `GET
  /api/agilite/teams/{teamId}/members` — les deux en lecture seule sur `public.teams`/
  `public.team_members`, aucune écriture (propriété `pivot-core`)
- **Modèle de données** (schéma `agilite`) :
  - `wheel` : `id UUID`, `tenant_id BIGINT` (FK cross-schéma → `public.tenants.id`), `team_id BIGINT`
    (FK cross-schéma → `public.teams.id`), `name VARCHAR(100)`, `last_drawn_entry_id UUID`
    (nullable, FK → `wheel_entry.id` `ON DELETE SET NULL` — marqueur anti-repeat mis à jour par
    US14.2.1 après chaque tirage), `created_by BIGINT`, `created_at`/`updated_at`
  - `wheel_entry` : `id UUID`, `wheel_id UUID` (FK → `wheel.id` `ON DELETE CASCADE`),
    `entry_type VARCHAR(20)` (`TEAM_MEMBER`/`FREE_TEXT`), `team_member_id BIGINT` (nullable, FK
    cross-schéma → `public.team_members.id` `ON DELETE SET NULL`), `label VARCHAR(150)` (snapshot
    résolu serveur pour `TEAM_MEMBER`, saisie brute pour `FREE_TEXT`), `weight SMALLINT NOT NULL
    DEFAULT 1` (`CHECK weight BETWEEN 1 AND 10`), `created_at`/`updated_at` ; index unique partiel
    sur `(wheel_id, team_member_id)` où `team_member_id IS NOT NULL`, et sur
    `(wheel_id, lower(label))` où `entry_type = 'FREE_TEXT'`
  - FK cross-schéma vers `public.tenants`/`public.teams`/`public.team_members` conformes à
    ADR-006 (autorisées uniquement vers `public`, jamais vers un autre schéma module)
- **Auth** : ce module n'a pas encore de `SecurityConfig`/résolution de principal — à brancher
  dans cette US en miroir d'EN08.3 (`pivot-collaboratif-core`) : dépendance
  `fr.pivot:pivot-core-starter` (publiée depuis 0.27.1, épinglée explicitement), entités
  read-only `PlatformAccessToken`/`PlatformUser`/`PlatformTenant` (+ `PlatformTeam`/
  `PlatformTeamMember` pour la résolution des membres), `TokenValidationService implements
  AuthenticatedPrincipalResolver`, `RequestPrincipal(userId, tenantId)` +
  `RequestPrincipalResolver`, et un `SecurityConfig` permit-all explicite (le starter tire
  transitivement `spring-boot-starter-security`, qui sans filtre explicite bloque tout par HTTP
  Basic — voir `pivot-collaboratif-core/.../config/SecurityConfig.java`)
- **Frontend** `pivot-agilite-ui` : feature `wheels/` (lazy-loaded), composants de liste et de
  formulaire de roue, service HTTP consommant `/api/agilite/wheels` et
  `/api/agilite/teams/{teamId}/members`
- **Convention transverse d'accès** (réutilisable par US14.2.1/US14.3.1) : accès à une roue d'un
  autre tenant/équipe ou dont l'appelant n'est pas membre de l'équipe → 404 (anti-énumération/IDOR),
  cohérent avec la convention déjà posée par US08.1.1 (`pivot-collaboratif-core`)

---
Item Type: US · Parent: F14.1 · Module: agilite · Repo: pivot-agilite-core/ui · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
