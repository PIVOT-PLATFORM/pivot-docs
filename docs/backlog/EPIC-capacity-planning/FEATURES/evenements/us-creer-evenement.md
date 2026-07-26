# US11.1.1 — Créer un événement de capacité

**En tant que** Scrum Master / Release Train Engineer
**Je veux** créer un événement de capacité (PI Planning, Sprint, Release, Custom)
**Afin de** planifier la capacité de l'équipe sur cet événement

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Premier item du lot
F11.1→F11.4 (ce sprint) ; le moteur de calcul complet (F11.6 — jours ouvrables/fériés par
localité, facteur de concentration, ajustement vélocité N-1/maturité) est **hors périmètre**,
livré en Sprint 21 — voir US11.1.2 §Architecture pour la formule simplifiée retenue ici.

**Architecture — pas de couplage avec `PiCycle` (E50 PI Planning, Gate 1 — décision PO/Architecte)** :
le type d'événement `PI_PLANNING` de ce module est un **concept de capacité indépendant** de
`fr.pivot.agilite.pi.PiCycle` (Program Increment SAFe, livré ce même sprint — `pivot-core#259`).
Aucun couplage de schéma entre les deux modules à ce stade, même principe que le découpage déjà
retenu entre `US50.1.1` et `US11.5.1` (cadence PI) — un `CapacityEvent` de type `PI_PLANNING` ne
référence pas de `PiCycle` et réciproquement. Une US de convergence pourra être proposée plus tard
si un besoin réel émerge, non traité ici.

## Critères d'acceptation

### Création (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un appelant membre de l'équipe `teamId`, when `POST /api/agilite/capacity/events` avec `{ type, name, teamId, startDate, endDate, parentEventId? }`, then 201 Created avec l'événement créé | ⬜ |
| Given `type` ∈ `{PI_PLANNING, SPRINT, RELEASE, CUSTOM}`, when la création est traitée, then le type est persisté tel quel — aucune valeur par défaut implicite | ⬜ |
| Given un événement de type `SPRINT`, `RELEASE` ou `CUSTOM` créé, when il est persisté, then ses membres sont **auto-alimentés** depuis l'effectif courant de l'équipe `teamId` (`TeamMembershipService#listMembers`), chacun avec `availabilityPercent: 100`, `excluded: false` (voir US11.2.1) | ⬜ |
| Given un événement de type `PI_PLANNING`, when il est créé, then **aucun membre n'est alimenté** — un PI Planning n'a pas de capacité propre, seulement une capacité agrégée depuis ses Sprints enfants (voir US11.3.1) | ⬜ |
| Given `parentEventId` fourni, when la création est traitée, then il doit référencer un événement `PI_PLANNING` accessible à l'appelant, sans parent lui-même (profondeur max 2 niveaux — voir US11.3.1 pour le détail) | ⬜ |

### Lecture / Modification / Suppression

| Critère | 🤖 Dev |
|---------|--------|
| Given le tenant de l'appelant, when `GET /api/agilite/capacity/events?teamId=&type=`, then 200 OK avec les événements accessibles (créateur ou membre de l'équipe `teamId`), filtrés si fournis, triés par `startDate` décroissant | ⬜ |
| Given un événement accessible, when `GET .../events/{id}`, then 200 OK avec l'événement, son parent (résumé) et ses enfants (résumés) le cas échéant | ⬜ |
| Given un événement accessible, when `PATCH .../events/{id}` avec `{ name?, startDate?, endDate? }`, then 200 OK avec l'événement mis à jour | ⬜ |
| Given un événement créé par l'appelant, when `DELETE .../events/{id}`, then 204 No Content — l'événement, ses membres, absences et entrées de burndown sont supprimés en cascade ; **refusé (409) si l'événement a des enfants** (supprimer d'abord les Sprints avant le PI) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `name` vide ou > 120 caractères, when création/modification, then 400 code `INVALID_NAME` | ⬜ |
| Error : given `startDate` postérieure ou égale à `endDate`, when création/modification, then 400 code `INVALID_DATE_RANGE` | ⬜ |
| Error : given `type` hors énumération, when création, then 400 code `INVALID_EVENT_TYPE` | ⬜ |
| Error : given un `teamId` inexistant ou d'un autre tenant, when création, then 404 | ⬜ |
| Error : given un `parentEventId` inexistant, d'un autre tenant, ou pas de type `PI_PLANNING`, when création, then 400 code `INVALID_PARENT_EVENT` | ⬜ |
| Error : given un `id` d'événement inexistant ou d'un autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal`, jamais du body/d'un paramètre | ⬜ |
| Security : given un appelant non membre de l'équipe `teamId`, when création/lecture/modification, then 404 (jamais 403 — n'expose pas l'existence de l'équipe ou de l'événement) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `GET/PATCH/DELETE .../events/{id}` | ⬜ |

## Hors périmètre

- **Resynchronisation automatique du roster** après création si l'effectif de l'équipe change —
  l'événement garde l'effectif figé au moment de sa création (voir US11.2.1), pas de synchronisation
  continue au socle.
- **Jours ouvrables/fériés par localité, facteur de concentration, ajustement vélocité/maturité**
  (F11.6) — Sprint 21.

## Notes d'implémentation

- **Backend** : nouveau module `fr.pivot.agilite.capacity` — entité `CapacityEvent` (`id`,
  `tenantId`, `teamId` FK `public.teams(id)`, `parentEventId` FK auto-référence nullable, `type`
  enum `CapacityEventType{PI_PLANNING,SPRINT,RELEASE,CUSTOM}`, `name`, `startDate`, `endDate`,
  `pointsPerDay` nullable (US11.1.2), `committedPoints`/`completedPoints` nullables (US11.4.1),
  `createdBy`, `createdAt`, `updatedAt`). Migration Flyway forward `V6__capacity_event.sql` (suit
  le précédent V2→V5 déjà établi ce sprint). `CapacityEventAccessService#resolveEventForCaller` —
  créateur ou membre de l'équipe liée (via `TeamMembershipService`), même pattern anti-énumération
  que `WheelService#resolveAccessibleWheel`. `CapacityEventService#create` alimente
  `CapacityEventMember` (US11.2.1) depuis `TeamMembershipService#listMembers` uniquement pour les
  types non-`PI_PLANNING`. `CapacityEventController`.
- **Frontend** : `projects/agilite-ui/src/lib/features/capacity/` — `capacity-event-list`,
  `capacity-event-form` (mêmes patterns que `standup-form`/`pi-cycle-form`), sélecteur de type
  avec icônes, sélecteur de `parentEventId` limité aux PI Planning accessibles de l'équipe. UX
  inspirée du POC de référence PouetPouet (`apps/web/src/app/(app)/capacity/page.tsx`,
  `apps/web/src/app/(app)/capacity/[id]/page.tsx`) adaptée aux tokens `@pivot/design-system` —
  **le socle de calcul du POC (`apps/web/src/lib/capacity.ts` : `fte`/`focusFactor`/
  `hoursPerDay`/`pointsPerPersonDay`, historique pondéré) n'est PAS repris ici**, il correspond au
  moteur complet F11.6 (Sprint 21) ; seule l'UX de listing/formulaire est reprise pour ce lot.

---
Item Type: US · Parent: F11.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: release-train-engineer
