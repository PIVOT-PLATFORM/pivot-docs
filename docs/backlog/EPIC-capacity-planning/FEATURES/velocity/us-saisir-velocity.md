# US11.4.1 — Saisir la vélocité réelle d'un sprint

**En tant que** Scrum Master
**Je veux** saisir la vélocité réelle livrée à la fin de chaque sprint
**Afin de** alimenter le tracking de vélocité et affiner les estimations

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US11.1.1
(`committedPoints`/`completedPoints` déjà portés par `CapacityEvent`).

**Architecture — pas de bouclage Scrum Poker → vélocité au socle** : l'EPIC (`README.md`
§Dépendances) identifie la remontée automatique des points estimés depuis Scrum Poker (E09) vers
le calcul de vélocité comme un différenciant à terme — **non traité dans ce lot** : `committedPoints`
est saisi manuellement (aucun appel vers `fr.pivot.agilite.poker`), une convergence future pourra
le proposer séparément, cohérent avec le principe de non-couplage déjà appliqué entre modules ce
sprint (E50↔E11).

## Critères d'acceptation

### Saisie (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement `SPRINT` accessible, when `PATCH /api/agilite/capacity/events/{id}/velocity` avec `{ committedPoints?, completedPoints? }`, then 200 OK — les deux champs sont indépendamment modifiables (saisir `committedPoints` en début de sprint, `completedPoints` en fin, sans devoir refournir l'autre) | ⬜ |
| Given un événement dont le `type` n'est pas `SPRINT`, when la vélocité est soumise, then 400 (voir Cas d'erreur) — la vélocité ne se saisit qu'au niveau Sprint, jamais PI/Release/Custom | ⬜ |

### Historique et moyenne

| Critère | 🤖 Dev |
|---------|--------|
| Given une équipe, when `GET /api/agilite/capacity/teams/{teamId}/velocity-history?limit=`, then 200 OK avec les `N` derniers événements `SPRINT` de cette équipe ayant `completedPoints` renseigné (défaut `limit=10`), triés par `endDate` décroissant, chacun avec `committedPoints`/`completedPoints` | ⬜ |
| Given l'historique, when `count` derniers sprints sont demandés pour la moyenne (`GET .../velocity-history/average?count=&factor=`, défauts `count=3`, `factor=0.85`), then 200 OK avec `averageVelocity` (moyenne simple de `completedPoints` sur les `count` derniers sprints **avec** `completedPoints` renseigné) et `suggestedCapacity = averageVelocity × factor` | ⬜ |
| Given un sprint sans `completedPoints` renseigné dans les `count` derniers, when la moyenne est calculée, then il est **exclu** du calcul (pas compté comme 0) — la fenêtre s'élargit implicitement aux sprints suivants pour atteindre `count` valeurs si disponibles | ⬜ |
| Given aucun sprint avec `completedPoints` pour l'équipe, when la moyenne est demandée, then `averageVelocity: null`, `suggestedCapacity: null` (pas d'erreur, pas de valeur inventée) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `committedPoints`/`completedPoints` négatif, when saisie, then 400 code `INVALID_POINTS` | ⬜ |
| Error : given un événement non-`SPRINT`, when saisie de vélocité, then 400 code `INVALID_EVENT_TYPE_FOR_VELOCITY` | ⬜ |
| Error : given `count`/`limit`/`factor` hors bornes raisonnables (`count`/`limit` ∈ [1,50], `factor` ∈ [0,2]), when historique/moyenne, then 400 code `INVALID_QUERY_PARAM` | ⬜ |
| Error : given un `id` d'événement ou `teamId` inexistant/autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : given un appelant sans lien avec l'événement/l'équipe, when tout endpoint ci-dessus, then 404 (jamais 403) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `PATCH .../velocity` et `GET .../velocity-history` | ⬜ |

## Hors périmètre

- **Bouclage automatique Scrum Poker → vélocité** — voir §Architecture, non traité.
- **Fenêtre de moyenne élargie automatiquement si coefficient de variation > 25 %** (`US11.6.3`,
  moteur complet) — Sprint 21 ; ce lot utilise une moyenne simple sur `count` sprints.

## Notes d'implémentation

- **Backend** : pas de nouvelle entité — `committedPoints`/`completedPoints` déjà portés par
  `CapacityEvent` (US11.1.1). `CapacityVelocityService#updateVelocity/history/average` — la
  requête d'historique interroge directement `CapacityEventRepository` (pas de dénormalisation),
  même approche que `WheelDrawService#listDraws` pour le tri/troncature côté requête plutôt qu'en
  mémoire. `CapacityVelocityController` (ou méthodes de `CapacityEventController`).
- **Frontend** : section vélocité dans `capacity-event-detail` (saisie `committedPoints`/
  `completedPoints`) + composant `capacity-velocity-history` (liste + suggestion de capacité pour
  le prochain sprint). UX inspirée du POC de référence PouetPouet (`apps/web/src/lib/capacity.ts`
  §`summarizeHistory` pour l'idée de suggestion, **pas son algorithme pondéré par jours-personne**
  — ce lot utilise la moyenne simple décrite ci-dessus) adaptée aux tokens `@pivot/design-system`.

---
Item Type: US · Parent: F11.4 · Module: agilite · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: US11.1.2
