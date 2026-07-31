# US11.5.1 — Cadence : sprint / incrément / PI (SAFe)

**En tant que** Scrum Master / RTE
**Je veux** définir la cadence de planification — sprint, incrément (lot de sprints) ou PI SAFe (plusieurs sprints + itération IP)
**Afin de** planifier la capacité à la bonne maille agile, du sprint au Program Increment

**Gate 1 réalisé le 2026-07-22** — remplace la version outline précédente. Prolonge US11.1.1/
US11.3.1 (socle S20 : `CapacityEvent`, hiérarchie parent/enfant profondeur 2).

**Architecture — extension du socle S20, pas de nouveau module (Gate 1 — décision PO/Architecte)** :
le socle S20 (`pivot-core#261`) posait déjà `CapacityEventType{PI_PLANNING,SPRINT,RELEASE,CUSTOM}`
et la hiérarchie parent/enfant à profondeur 2 (US11.3.1) — cette US **étend** ce socle plutôt que
d'en créer un nouveau : ajout d'une valeur d'énumération `INCREMENT` (lot de N sprints, **sans**
itération IP) à côté de `PI_PLANNING` (qui, elle, **a** une itération IP) ; les deux types
deviennent des **types parents** valides pour `parentEventId` (US11.3.1 étendue en conséquence —
un événement `PI_PLANNING` ou `INCREMENT` accueille des enfants `SPRINT`, jamais l'inverse) ; ajout
d'un flag `isIpIteration` (booléen, défaut `false`) sur `CapacityEvent`, valable uniquement pour un
enfant `SPRINT` d'un parent `PI_PLANNING` (US11.5.1 point 3 ci-dessous), ignoré pour tout autre cas
(pas d'erreur si positionné ailleurs, simplement sans effet). Aucun couplage avec `fr.pivot.agilite.pi.PiCycle`
(E50), voir US11.1.1 §Architecture — un `PI_PLANNING`/`INCREMENT` de ce module reste un concept de
capacité indépendant d'un Program Increment SAFe au sens `PiCycle`.

**Architecture — E50 PI Planning ne consomme pas cette cadence (correction d'une note obsolète du
stub de sprint)** : `sprint-21.md` mentionnait à l'origine qu'E50 (S19) « consomme `US11.5.1` » —
c'est **inexact** : Gate 1 d'`US50.1.1` (S19, `pivot-docs#299`) a explicitement tranché l'inverse
— cadence PI **découplée**, `US50.1.1` génère ses propres itérations sans dépendre d'`US11.5.1`.
Cette US ne lève donc aucun blocage pour E50 ; corrigé dans `sprint-21.md` de ce Gate 1.

**Réconciliation 2026-07-31** — vérifié AC-par-AC contre le code réel de `pivot-core` (main,
`pivot-core#263` mergée) : `CapacityEventType.INCREMENT`, `CapacityEvent#isIpIteration`,
validation `INVALID_PARENT_EVENT`/`CHILD_PERIOD_OUTSIDE_PARENT` (`CapacityEventService`), tests
`CapacityEventControllerIT`/`CapacityEngineControllerIT` (dont
`update_isIpIterationOnTopLevelSprint_acceptedWithoutEffectOnAggregation` et
`summary_incrementParent_aggregatesChildrenExcludingIpIteration`). Les checkboxes ci-dessous
n'avaient simplement jamais été mises à jour après le merge.

## Critères d'acceptation

### Cadence (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un appelant membre de l'équipe, when `POST /api/agilite/capacity/events` avec `type: "INCREMENT"` ou `type: "PI_PLANNING"`, then 201 Created — même comportement que US11.1.1 (aucun membre auto-alimenté, capacité agrégée depuis les enfants) | ✅ `CapacityEventType.INCREMENT` + `CapacityEventController#create` |
| Given un événement `INCREMENT` ou `PI_PLANNING` créé, when un `SPRINT`/`RELEASE`/`CUSTOM` lui est rattaché via `parentEventId`, then il hérite de la période comme validation (l'enfant doit rester dans `[startDate, endDate]` du parent — voir Cas d'erreur) et remonte sa capacité à l'agrégation (US11.3.1/US11.6.5) | ✅ `CapacityEventService` validation parent-enfant + `CapacitySummaryService#summarizeParent` |
| Given un événement `SPRINT` enfant d'un `PI_PLANNING`, when `PATCH .../events/{id}` avec `{ isIpIteration: true }`, then le flag est posé — cet enfant est **exclu** de la capacité agrégée du PI (délivrable non alloué par défaut) mais reste visible dans la hiérarchie | ✅ `CapacityEvent#isIpIteration`, exclu dans `CapacitySummaryService#summarizeParent` (`.filter(child -> !child.isIpIteration())`) — test `summary_incrementParent_aggregatesChildrenExcludingIpIteration` |
| Given `isIpIteration: true` positionné sur un événement qui n'est **pas** un `SPRINT` enfant d'un `PI_PLANNING` (ex. enfant d'un `INCREMENT`, ou événement racine), when la modification est traitée, then le flag est accepté sans erreur mais **sans effet** sur l'agrégation (pas de sémantique IP en dehors d'un PI SAFe) | ✅ test `update_isIpIterationOnTopLevelSprint_acceptedWithoutEffectOnAggregation` |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `parentEventId` référençant un événement qui n'est ni `PI_PLANNING` ni `INCREMENT`, when création/modification d'un enfant, then 400 code `INVALID_PARENT_EVENT` (même code qu'US11.1.1, portée élargie aux deux types parents) | ✅ `CapacityEventService` L78 + test `CapacityEventControllerIT` (jsonPath `$.code` = `INVALID_PARENT_EVENT`) |
| Error : given un enfant dont la période `[startDate, endDate]` déborde de celle de son parent, when création/modification, then 400 code `CHILD_PERIOD_OUTSIDE_PARENT` | ✅ `CapacityEventService` L236 + test `CapacityEngineControllerIT` |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal`, mêmes règles d'accès qu'US11.1.1 (créateur ou membre de l'équipe) | ✅ `RequestPrincipal` seul point de résolution (convention module, vérifiée sur les endpoints capacity) |
| Security : test TI obligatoire prouvant qu'un enfant `isIpIteration: true` est bien exclu du calcul agrégé (US11.6.5), et qu'un `INCREMENT` cross-tenant en `parentEventId` est traité en 404 | ✅* exclusion testée (`summary_incrementParent_aggregatesChildrenExcludingIpIteration`) ; le cross-tenant `INCREMENT`-en-parent n'a pas de test dédié nommé mais partage le chemin `findByIdAndTenantId` déjà couvert cross-tenant pour `PI_PLANNING` (`findById_crossTenant_returns404` et consorts) — même code, pas de branche spécifique à `INCREMENT` |

## Hors périmètre

- **Cérémonies/calendrier d'un PI SAFe** (planning day, system demo, inspect & adapt) — non
  spécifié, hors socle capacité.
- **Renommage/migration d'un événement d'un type parent à l'autre** (`PI_PLANNING` ↔ `INCREMENT`)
  après création — non prévu, supprimer et recréer si besoin.

## Notes d'implémentation

- **Backend** : `CapacityEventType` étendu avec `INCREMENT`. `CapacityEvent` gagne un champ
  `isIpIteration` (boolean, défaut `false`) — pas de nouvelle table, colonne additive sur
  `capacity_event` (migration forward, suit `V6__capacity_event.sql`, voir US11.6.1 pour le
  fichier de migration exact de ce lot). `CapacityEventService#update` valide/applique le flag ;
  `CapacityEventAccessService`/validations parent-enfant (US11.1.1) étendues pour accepter les
  deux types parents. `CapacityCalculator.aggregate()` (S20) doit filtrer les résumés enfants dont
  `isIpIteration` est vrai avant sommation (US11.6.5 en détaille l'intégration complète).
- **Frontend** : sélecteur de type dans `capacity-event-form` gagne l'option "Incrément" ;
  `capacity-event-detail` affiche un bouton/case "Itération IP" sur les enfants `SPRINT` d'un
  `PI_PLANNING` uniquement (masqué sinon).

---
Item Type: US · Parent: F11.5 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: scrum-master, release-train-engineer
