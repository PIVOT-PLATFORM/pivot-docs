# US50.1.1 — Créer un cycle PI avec itérations et équipes du Train

**En tant que** RTE (Release Train Engineer)
**Je veux** créer un cycle de Program Increment avec ses itérations générées automatiquement et les équipes du Train
**Afin de** poser le cadre d'un PI SAFe sans ressaisir manuellement chaque itération

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent.

**Architecture — cadence PI découplée de Capacity Planning (Gate 1 — décision PO/Architecte)** :
le stub d'origine posait `US50.1.1` en dépendance directe d'`US11.5.1` (cadence PI SAFe modélisée
côté Capacity Planning) — mais `US11.5.1` n'est livré qu'en **Sprint 21** (second lot Capacity
Planning), après ce sprint. Bloquer tout `E50` jusque-là romprait la séquence S17→S31. **Décision
retenue** : `POST /api/agilite/pi/cycles` génère lui-même ses itérations à la création
(`startDate`, `iterationCount` [1-12], `iterationWeeks` [1-6], calcul pur — voir Notes
d'implémentation, calqué sur `generateIterations` du POC de référence PouetPouet
`apps/api/src/modules/pi/pi.routes.ts`), **sans lire ni écrire la moindre donnée Capacity
Planning**. Aucun couplage de schéma ni d'API entre les deux modules à ce stade — `US50.1.1` n'a
donc **plus de dépendance dure sur `US11.5.1`**. Quand Capacity Planning livrera sa propre cadence
PI (S21), une US de convergence distincte pourra proposer de pré-remplir `iterationCount`/
`iterationWeeks` depuis cette cadence — non traité ici, non régressif (le cycle reste modifiable
indépendamment).

**Architecture — modèle d'accès Train (Gate 1 — décision PO/Architecte)** : le stub citait un
partage par rôle façon SAFe strict (RTE propriétaire, Scrum Masters éditeurs), calqué sur le
système de partage générique du POC de référence (`ModuleShare`, invitations nommées par
ressource) — **PIVOT n'a pas cet équivalent** (aucun mécanisme de partage générique par
ressource dans `fr.pivot.agilite.*`, contrairement au POC). Un cycle PI rassemble par nature
**plusieurs équipes** (pas une seule, contrairement à la Roue/au Standup) : convention retenue,
cohérente avec le principe déjà appliqué à Rétro/Standup/Roue (« tout membre = animateur/gestion
possible, pas de rôle dédié ») — le **créateur** (`createdBy`) et **tout utilisateur membre d'au
moins une des équipes du Train actuellement importées depuis `public.teams`** (via
`TeamMembershipService`) peuvent consulter et gérer le cycle (équipes, itérations). Les équipes du
Train ajoutées en **saisie manuelle** (nom libre, pas de `sourceTeamId` — partenaires externes non
modélisés dans PIVOT) ne donnent accès à personne par adhésion : seul le créateur les gère. Pas de
notion de rôle RTE/Scrum Master distincte au niveau plateforme — cohérent avec le schéma de rôles
existant (`docs/backlog/README.md`), qui n'a pas de rôle SAFe dédié.

## Critères d'acceptation

### Création (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un appelant authentifié, when `POST /api/agilite/pi/cycles` avec `{ name, artName?, startDate, iterationCount?, iterationWeeks? }`, then 201 Created avec le cycle créé (`status: "PREPARATION"`, `createdBy` = appelant) et ses itérations générées : `iterationCount` itérations `IT1`…`ITn` consécutives de `iterationWeeks` semaines, puis une itération finale `"IP Sprint"` (numéro `n+1`, même durée) | ⬜ |
| Given `iterationCount`/`iterationWeeks` omis, when création, then les valeurs par défaut **5** et **2** sont appliquées (mêmes défauts que le POC de référence) | ⬜ |
| Given l'itération générée, when elle est persistée, then `endDate` du cycle = `endDate` de la dernière itération (l'IP Sprint), `startDate` du cycle = `startDate` fournie | ⬜ |

### Équipes du Train (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un cycle existant accessible à l'appelant (créateur ou membre d'une équipe du Train déjà liée), when `POST .../cycles/{id}/teams` avec `{ name, color? }`, then 201 Created — équipe du Train ajoutée en saisie manuelle (`sourceTeamId: null`), `order` = dernier + 1 | ⬜ |
| Given une ou plusieurs équipes PIVOT (`public.teams`) dont l'appelant est membre, when `POST .../cycles/{id}/teams/import` avec `{ teamIds: [...] }` (1 à 30), then 201 Created — chaque équipe importée devient une équipe du Train **snapshot** (`name`/`color` copiés, `sourceTeamId` renseigné) ; une équipe déjà importée (même `sourceTeamId`) est silencieusement ignorée (pas de doublon), le nombre réellement importé est retourné | ⬜ |
| Given une équipe du Train liée par `sourceTeamId`, when l'équipe PIVOT source est supprimée ultérieurement, then l'équipe du Train reste intacte dans le cycle (`sourceTeamId` passe à `null`, `name`/`color` déjà dénormalisés ne changent pas) — un cycle PI historique ne casse jamais | ⬜ |
| Given une équipe du Train du cycle, when `PATCH .../cycles/{id}/teams/{teamId}` avec `{ name?, color?, order? }`, then 200 OK avec l'équipe mise à jour | ⬜ |
| Given une équipe du Train du cycle sans ticket associé ou avec tickets, when `DELETE .../cycles/{id}/teams/{teamId}`, then 204 No Content — les tickets de cette équipe repassent en colonne "Non planifié" côté équipe (`teamId → null`, jamais supprimés), voir US50.3.1 | ⬜ |

### Lecture / Modification / Suppression

| Critère | 🤖 Dev |
|---------|--------|
| Given un cycle accessible à l'appelant, when `GET .../cycles/{id}`, then 200 OK avec le cycle, ses itérations (triées par `number`) et ses équipes du Train (triées par `order`) | ⬜ |
| Given le tenant de l'appelant, when `GET /api/agilite/pi/cycles`, then 200 OK avec les cycles accessibles (créés par l'appelant ou dont il est membre d'au moins une équipe du Train importée), triés par `startDate` décroissant, chacun avec le compte d'itérations/équipes | ⬜ |
| Given un cycle accessible, when `PATCH .../cycles/{id}` avec `{ name?, artName?, status?, eventDay1?, eventDay2?, eventLocation? }`, then 200 OK avec le cycle mis à jour ; `status` transite librement entre `PREPARATION`/`ACTIVE`/`CLOSED` (pas de machine à états stricte au socle) | ⬜ |
| Given une itération du cycle, when `PATCH .../cycles/{id}/iterations/{iterationId}` avec `{ label?, startDate?, endDate? }`, then 200 OK — permet d'ajuster une itération après génération (ex. IP Sprint décalée) | ⬜ |
| Given un cycle créé par l'appelant, when `DELETE .../cycles/{id}`, then 204 No Content, le cycle et ses itérations/équipes/tickets/dépendances sont supprimés en cascade | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `name` vide ou > 120 caractères, when création/modification, then 400 code `INVALID_NAME` | ⬜ |
| Error : given `iterationCount` hors bornes [1, 12] ou `iterationWeeks` hors bornes [1, 6], when création, then 400 code `INVALID_ITERATION_PARAMS` | ⬜ |
| Error : given `startDate`/`endDate` d'une itération où le début est postérieur à la fin, when modification d'itération, then 400 code `INVALID_DATE_RANGE` | ⬜ |
| Error : given un `teamId` fourni à l'import qui n'existe pas ou dont l'appelant n'est pas membre, when import, then l'import de **cette** équipe est silencieusement ignoré (comme les doublons) — jamais d'erreur bloquant les autres équipes valides de la même requête, mais si **aucune** équipe de la liste n'est finalement importable, 400 code `NO_IMPORTABLE_TEAM` | ⬜ |
| Error : given un `id` de cycle inexistant ou d'un autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |
| Error : given un appelant ni créateur ni membre d'une équipe du Train du cycle, when modification (teams/iterations/cycle), then 404 (jamais 403) | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal`, jamais du body/d'un paramètre | ⬜ |
| Security : given un appelant authentifié sans lien avec le cycle (ni créateur, ni membre d'une équipe du Train importée), when lecture/modification/suppression, then 404 — n'expose pas l'existence du cycle | ⬜ |
| Security : given un `teamId` à importer d'un autre tenant, when import, then traité comme "non trouvé" (ignoré silencieusement, jamais de fuite cross-tenant du nom de l'équipe) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `GET/PATCH/DELETE .../cycles/{id}` et sur l'import d'équipe cross-tenant | ⬜ |

### A11y (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : formulaire de création — champs `<label>` associés, erreurs `role="alert"`, focus posé sur le premier champ invalide à la soumission échouée | ⬜ |
| A11y : sélecteur d'équipes à importer — checklist native (`<input type="checkbox">` par équipe), jamais une liste cliquable sans sémantique de formulaire (même convention que le sélecteur de participants Standup, US10.1.1) | ⬜ |
| A11y : tous les libellés externalisés via Transloco (`fr.json`/`en.json`) | ⬜ |

## Hors périmètre

- **Partage nominatif par ressource** (façon `ModuleShare` du POC — inviter un utilisateur
  spécifique en éditeur d'un cycle précis) — PIVOT n'a pas ce mécanisme générique ; l'accès reste
  dérivé de l'appartenance aux équipes du Train (voir §Architecture ci-dessus).
- **Intégration Forms/To-Do en un clic** (`US50.2.1`) — hors sprint, bloquée sur `E42`/`E49` non
  planifiés (voir `sprint-19.md` §État réel).
- **Pré-remplissage de la cadence depuis Capacity Planning** (`US11.5.1`, livré S21) — voir
  §Architecture, US de convergence séparée à écrire après S21.
- **Duplication d'un PI** — candidat v2 identifié dans le POC, non repris en socle.

## Notes d'implémentation

- **Backend** : nouveau module `fr.pivot.agilite.pi` — entités `PiCycle` (`id`, `tenantId`, `name`,
  `artName` nullable, `status` enum `PiCycleStatus{PREPARATION,ACTIVE,CLOSED}`, `startDate`,
  `endDate`, `eventDay1`/`eventDay2`/`eventLocation` nullable — champs réservés pour `US50.2.1`,
  posés dès le socle pour éviter une migration additive ultérieure, `createdBy`, `createdAt`,
  `updatedAt`), `PiIteration` (`id`, `cycleId` FK `ON DELETE CASCADE`, `number`, `label`,
  `startDate`, `endDate`), `PiCycleTeam` (`id`, `cycleId` FK `ON DELETE CASCADE`, `name`, `color`,
  `order`, `sourceTeamId` nullable FK `public.teams(id) ON DELETE SET NULL` — snapshot dénormalisé,
  même précédent que `StandupParticipant.name`/`WheelEntry`). Migration Flyway forward
  `V5__pi_cycle.sql` (suit le précédent V2/V3/V4 déjà établi ce sprint pour poker/standup — base
  recette déjà migrée, `V1` jamais rejoué). Génération d'itérations : fonction pure
  `PiIterationGenerator#generate(startDate, count, weeks)` (testée unitairement en isolation,
  même approche que `WeightedEntrySelector`/`JoinCodeGenerator`), calquée sur `generateIterations`
  du POC PouetPouet (`apps/api/src/modules/pi/pi.routes.ts`). Résolution d'accès :
  `PiCycleAccessService#resolveCycleForCaller` — créateur OU membre d'au moins une
  `PiCycleTeam.sourceTeamId` via `TeamMembershipService`, 404 anti-énumération (même convention
  que `WheelService#resolveAccessibleWheel`). `PiCycleController`, `PiCycleTeamController` (ou
  méthodes du même contrôleur — à trancher en implémentation selon la taille du fichier).
- **Frontend** : `projects/agilite-ui/src/lib/features/pi-planning/` — `pi-cycle-list`,
  `pi-cycle-form` (création, mêmes patterns que `standup-form`), `pi-cycle-detail` (itérations,
  équipes du Train, import depuis `TeamMembershipService#listMyTeams`). UX inspirée du POC de
  référence PouetPouet (`apps/web/src/app/(app)/pi/page.tsx`, `pi/[id]/page.tsx`) adaptée aux
  tokens `@pivot/design-system`.

---
Item Type: US · Parent: F50.1 · Module: agilite · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: release-train-engineer
Source: PouetPouet v0.31.0 (PR4 #245)
