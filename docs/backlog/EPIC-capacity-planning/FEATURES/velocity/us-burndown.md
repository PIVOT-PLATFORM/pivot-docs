# US11.4.2 — Visualiser le burndown chart du sprint

**En tant que** Scrum Master
**Je veux** voir le burndown chart du sprint en cours
**Afin de** détecter les dérives de livraison au plus tôt

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US11.4.1
(`committedPoints` = point de départ de la courbe idéale).

**Aucune référence POC directe** : le module `capacity` de PouetPouet (`apps/api/src/modules/
capacity/`) ne porte pas de burndown — conçu directement à partir de l'AC du stub et des
conventions SAFe/Scrum standard (courbe idéale linéaire, saisie quotidienne des points restants).

## Critères d'acceptation

### Saisie quotidienne (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement `SPRINT` accessible avec `committedPoints` renseigné, when `PUT /api/agilite/capacity/events/{id}/burndown/{date}` avec `{ pointsRemaining }`, then 200 OK (upsert idempotent — une seule entrée par `date`, un second appel sur la même date **remplace** la valeur, ne duplique pas) | ⬜ |
| Given `date`, when elle est fournie, then elle doit tomber dans la période `[startDate, endDate]` de l'événement | ⬜ |

### Lecture (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement `SPRINT` avec `committedPoints` renseigné, when `GET .../events/{id}/burndown`, then 200 OK avec `{ ideal: [{date, pointsRemaining}...], actual: [{date, pointsRemaining}...], atRisk: boolean, stale: boolean }` | ⬜ |
| Given la courbe idéale, when elle est calculée, then elle décrémente **linéairement** de `committedPoints` (à `startDate`) vers `0` (à `endDate`), un point par jour ouvré (weekends exclus, même convention que US11.1.2) | ⬜ |
| Given `committedPoints` non renseigné, when le burndown est demandé, then 200 OK avec `ideal: []` (pas d'erreur — la courbe réelle seule reste consultable, mais sans référence idéale tant que l'engagement n'est pas saisi) | ⬜ |
| Given la courbe réelle, when la dernière entrée saisie est **au-dessus** de la valeur idéale correspondante à la même date pendant **2 jours consécutifs** ou plus, then `atRisk: true` | ⬜ |
| Given aucune entrée saisie depuis **3 jours calendaires** ou plus (par rapport à `today`) alors que l'événement est en cours (`today` ∈ `[startDate, endDate]`), then `stale: true` | ⬜ |

### Rendu (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un burndown, when il s'affiche, then un graphique ligne idéale + ligne réelle est visible (tracés `<svg>` — pas de librairie tierce, ADR-007), avec légende textuelle distinguant les deux lignes (jamais la seule couleur) | ⬜ |
| Given `atRisk: true`, when le graphique s'affiche, then un indicateur visuel "à risque" est mis en avant (texte + icône, pas seulement une couleur de ligne) | ⬜ |
| Given `stale: true`, when le graphique s'affiche, then un avertissement explicite "aucune mise à jour depuis N jours" est visible | ⬜ |
| Given aucune entrée saisie, when le graphique s'affiche, then un état vide explicite invite à la première saisie plutôt qu'un graphique vide silencieux | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `pointsRemaining` négatif, when saisie, then 400 code `INVALID_POINTS_REMAINING` | ⬜ |
| Error : given `date` hors de la période de l'événement, when saisie, then 400 code `DATE_OUTSIDE_EVENT` | ⬜ |
| Error : given un événement non-`SPRINT`, when saisie/lecture burndown, then 400 code `INVALID_EVENT_TYPE_FOR_BURNDOWN` | ⬜ |
| Error : given un `id` d'événement inexistant/autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : given un appelant sans lien avec l'événement, when saisie/lecture, then 404 (jamais 403) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `PUT .../burndown/{date}` et `GET .../burndown` | ⬜ |

## Hors périmètre

- **Intégration automatique** (récupération des points restants depuis un outil externe) — saisie
  manuelle uniquement pour ce lot, voir stub d'origine « saisie manuelle ou via intégration » —
  seule la saisie manuelle est retenue.
- **Burndown au niveau PI** (agrégation multi-sprints) — ce lot reste au niveau Sprint individuel.

## Notes d'implémentation

- **Backend** : nouvelle entité `CapacityBurndownEntry` (`id`, `eventId` FK `ON DELETE CASCADE`,
  `date`, `pointsRemaining`, contrainte unique `(eventId, date)` pour l'upsert idempotent) — même
  fichier de migration que le reste du module ou suivant, à trancher en implémentation.
  `CapacityBurndownService#upsertEntry/getBurndown` — génération de la courbe idéale en fonction
  pure testable en isolation (même approche que `CapacityCalculator`/`PiIterationGenerator`),
  détection `atRisk`/`stale` également pure (horloge injectable pour `stale`, même précédent que
  `RetroPhaseScheduler`/`StandupTimerScheduler` — jamais `Instant.now()` en dur dans la logique
  testée). `CapacityBurndownController`.
- **Frontend** : composant `capacity-burndown-chart` — `<svg>` avec deux `<polyline>` (idéale/
  réelle), même approche de tracé SVG que `pi-dependency-layer` (US50.3.2, calque overlay
  réimplémenté avec Angular signals) pour la cohérence de style de code, formulaire de saisie
  quotidienne (`<input type="date">` + `<input type="number">`).

---
Item Type: US · Parent: F11.4 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: scrum-master
Dépendances: US11.4.1
