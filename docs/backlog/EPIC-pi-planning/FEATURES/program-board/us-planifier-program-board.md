# US50.3.1 — Planifier le Program Board par équipe × itération

**En tant que** RTE ou Scrum Master
**Je veux** placer des tickets typés (Feature, Milestone, Risque, Objectif, Story, Enabler) sur une matrice équipes × itérations par glisser-déposer
**Afin de** visualiser et ajuster collectivement le plan du Train sur tout le PI

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US50.1.1
(cycle, itérations, équipes du Train). Accès : voir US50.1.1 §Architecture — modèle d'accès Train
(créateur ou membre d'une équipe du Train importée), aucune notion de rôle RTE/Scrum Master
distincte au niveau plateforme.

**Architecture — pas de temps réel WebSocket au socle (Gate 1 — décision PO/Architecte)** :
l'EPIC `E50` (`README.md` §Hors périmètre socle) exclut explicitement "Temps réel Socket.io sur le
Program board" du socle (candidat v2). Confirmé au Gate 1 : le Program Board expose une **API REST
classique** (`GET .../board` payload unique, `PATCH .../tickets/{id}` pour déplacer/réordonner) —
le frontend fait un **rafraîchissement manuel/au focus** (pas de polling automatique au socle,
pas de `{Domain}Destinations`/`{Domain}ChannelInterceptor` comme Wheel/Poker/Rétro/Standup) et des
**mises à jour optimistes locales** après chaque action. Cohérent avec l'usage réel (chaque équipe
édite surtout sa propre ligne, faible contention) et avec le POC de référence qui adopte la même
position pour sa v1.

## Critères d'acceptation

### Lecture du board (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un cycle accessible à l'appelant, when `GET /api/agilite/pi/cycles/{id}/board`, then 200 OK avec un payload unique : itérations (triées par `number`), équipes du Train (triées par `order`), tickets (triés par `order` au sein de chaque cellule équipe×itération) et dépendances (US50.3.2) | ⬜ |

### Tickets (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un cycle accessible, when `POST .../cycles/{id}/tickets` avec `{ type, title, description?, teamId?, iterationId? }`, then 201 Created — `type` ∈ `{FEATURE, MILESTONE, RISK, OBJECTIVE, STORY, ENABLER}`, `order` = dernier de la cellule cible + 1 ; `teamId: null` place le ticket sur la **ligne Train** (dédiée, pas une équipe), `iterationId: null` le place en colonne **"Non planifié"** | ⬜ |
| Given un ticket existant du cycle, when `PATCH .../cycles/{id}/tickets/{ticketId}` avec `{ type?, title?, description?, teamId?, iterationId?, order? }`, then 200 OK — c'est **ce même endpoint** qui gère le déplacement glisser-déposer (nouveaux `teamId`/`iterationId`/`order`), pas d'endpoint `/move` séparé | ⬜ |
| Given un ticket du cycle, when `DELETE .../cycles/{id}/tickets/{ticketId}`, then 204 No Content, les dépendances impliquant ce ticket sont supprimées en cascade (US50.3.2) | ⬜ |
| Given `teamId`/`iterationId` fournis à la création ou au déplacement, when ils sont traités, then chacun doit appartenir **au même cycle** que le ticket — jamais de cellule d'un autre cycle | ⬜ |

### Rendu (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given le board d'un cycle, when il s'affiche, then une matrice équipes (lignes) × itérations (colonnes) est visible : colonne "Non planifié" en premier, puis les itérations dans l'ordre (`IT1`…`ITn`, "IP Sprint" en dernier) ; **ligne Train** en premier (fond visuellement distinct), puis les équipes du Train dans leur `order` (pastille de couleur) | ⬜ |
| Given un ticket, when il est affiché, then son type est visuellement distingué (couleur/badge par type, jamais la couleur seule — icône ou libellé associé pour l'accessibilité daltonienne) | ⬜ |
| Given un ticket, when l'utilisateur le glisse-dépose d'une cellule à une autre, then le déplacement est appliqué en **mise à jour optimiste** (affiché immédiatement) puis confirmé par `PATCH .../tickets/{id}` — en cas d'échec réseau, le ticket revient à sa position d'origine avec un message d'erreur | ⬜ |
| Given un ticket, when l'utilisateur clique dessus, then une vue détail (modale ou panneau) permet d'éditer titre/description/type et de le déplacer sans glisser-déposer (accessibilité clavier) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `title` vide ou > 300 caractères, when création/modification, then 400 code `INVALID_TITLE` | ⬜ |
| Error : given `type` hors de l'énumération, when création/modification, then 400 code `INVALID_TICKET_TYPE` | ⬜ |
| Error : given un `teamId`/`iterationId` inexistant ou d'un autre cycle, when création/modification, then 400 code `INVALID_CELL` | ⬜ |
| Error : given un `id` de cycle ou de ticket inexistant/autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : given un appelant sans lien avec le cycle (voir US50.1.1 §Architecture), when tout endpoint tickets/board, then 404 (jamais 403) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `GET .../board` et sur les 3 endpoints tickets | ⬜ |

### A11y (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : chaque cellule de la matrice est une zone de dépôt identifiée (`aria-label` équipe/itération), déplacement possible au clavier via la vue détail du ticket (pas uniquement glisser-déposer souris) | ⬜ |
| A11y : tous les libellés (types de ticket, noms de colonnes/lignes) externalisés via Transloco | ⬜ |

## Hors périmètre

- **Temps réel Socket.io** — voir §Architecture ci-dessus, candidat v2 (EPIC README).
- **Duplication d'un PI, export PDF/image du board** — candidats v2 identifiés dans le POC, non
  livrés en socle.
- **ROAM des risques, confidence vote** — hors périmètre socle (EPIC README).

## Notes d'implémentation

- **Backend** : nouvelle entité `PiTicket` (`id`, `cycleId` FK `ON DELETE CASCADE`, `type` enum
  `PiTicketType{FEATURE,MILESTONE,RISK,OBJECTIVE,STORY,ENABLER}`, `title`, `description` nullable,
  `teamId` nullable FK `pi_cycle_team(id) ON DELETE SET NULL` (`null` = ligne Train),
  `iterationId` nullable FK `pi_iteration(id) ON DELETE SET NULL` (`null` = Non planifié), `order`)
  — migration continue de `V5__pi_cycle.sql` (US50.1.1) ou `V6__pi_board.sql` séparée selon la
  taille, à trancher en implémentation. `PiTicketService#create/update/delete`, validation de
  cellule (`teamId`/`iterationId` appartiennent au cycle) réutilisant `PiCycleAccessService`
  (US50.1.1). `PiBoardController#getBoard` (payload agrégé unique, une seule requête —
  `@EntityGraph`/fetch join plutôt que N+1), `PiTicketController`.
- **Frontend** : composant `pi-program-board` — grille CSS (colonne équipes sticky-left, header
  sticky-top), badge par type de ticket, glisser-déposer HTML5 natif ou Angular CDK
  `DragDropModule` (déjà une dépendance du design system, ADR-007 — cohérent avec le choix déjà
  fait pour le réordonnancement Standup US10.2.2), mise à jour optimiste avec rollback en cas
  d'échec. UX inspirée du POC de référence PouetPouet (`apps/web/src/components/pi/program-board.tsx`,
  `pi-ticket-card.tsx`, `ticket-modal.tsx`) adaptée aux tokens `@pivot/design-system`.

---
Item Type: US · Parent: F50.3 · Module: agilite · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: release-train-engineer, scrum-master
Source: PouetPouet v0.31.0 (PR5 #247 données/API, PR6 #248 UI)
Dépendances: US50.1.1
