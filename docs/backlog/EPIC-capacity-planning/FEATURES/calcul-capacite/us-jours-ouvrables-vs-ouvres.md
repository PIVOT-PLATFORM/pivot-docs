# US11.6.1 — Jours ouvrables vs jours ouvrés

**En tant que** Scrum Master
**Je veux** que la capacité distingue les jours **ouvrables** (calendrier) des jours **ouvrés** (réellement travaillés = hors weekends, jours fériés et absences)
**Afin de** ne jamais surestimer la capacité en comptant des jours non travaillés

**Gate 1 réalisé le 2026-07-22** — remplace la version outline précédente. Prolonge US11.1.2 (S20,
`CapacityCalculator.countWorkingDays` — weekends uniquement, explicitement provisoire).

**Architecture — liste de jours fériés interne, minimale, en remplacement d'`EN22.3` (Gate 1 —
décision mainteneur, 2026-07-22)** : `EN22.3` (calendriers/jours fériés par localité, E22 Roadmap)
n'est pas seulement non livré — **E22 Roadmap a été extrait définitivement vers le produit
Pilotage distinct** (`pivot-docs/docs/backlog/sprints/README.md`, recentrage 2026-07-21 : « Le
domaine Pilotage (E18/E22/E23/E24/E26/E27/E38/E13) est extrait vers un produit distinct »). Cette
dépendance ne sera donc **jamais** levée à l'intérieur de PIVOT tel qu'il est aujourd'hui planifié
— contrairement à la dépendance `US11.5.1` d'E50 (temporaire, juste décalée à S21), celle-ci est
permanente. Laisser `US11.6.1` bloquée indéfiniment reviendrait à abandonner silencieusement une
brique de base du module Agilité. **Décision retenue** : une liste de jours fériés **interne,
minimale, au niveau tenant** — `CapacityHoliday(tenantId, date, label)`, saisie manuelle par un
administrateur tenant, **pas** la vision complète d'`EN22.3` (pas de synchronisation multi-localité,
pas d'API calendrier externe, pas de calendrier par membre/pays). Les jours qui y figurent sont
exclus des jours ouvrés au même titre que les weekends.

**Simplification assumée — pas de calendrier par membre/localité** : le stub d'origine envisageait
un calendrier propre à chaque membre (« weekend non standard géré », localité individuelle) — hors
périmètre de cette version minimale : un seul jeu de jours fériés **par tenant**, weekends fixés
Samedi/Dimanche pour tous les membres (même convention que `CapacityCalculator` depuis S20).
Documenté explicitement comme une réduction de périmètre, pas un oubli — la richesse multi-localité
reste l'ambition propre d'`EN22.3`/E22 Roadmap, hors de portée de PIVOT à ce stade.

## Critères d'acceptation

### Jours fériés (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un appelant administrateur du tenant, when `POST /api/agilite/capacity/holidays` avec `{ date, label }`, then 201 Created — jour férié ajouté au tenant | ⬜ |
| Given le tenant de l'appelant, when `GET /api/agilite/capacity/holidays?from=&to=`, then 200 OK avec les jours fériés du tenant, filtrés par période si fournie, triés par `date` | ⬜ |
| Given un jour férié existant, when `DELETE /api/agilite/capacity/holidays/{id}`, then 204 No Content | ⬜ |
| Given une date déjà enregistrée comme jour férié pour ce tenant, when un second ajout est tenté sur la même date, then 400 code `DUPLICATE_HOLIDAY` | ⬜ |

### Calcul des jours ouvrés (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une période et les jours fériés du tenant, when les jours ouvrés se calculent, then weekends **et** jours fériés tenant tombant dans la période sont exclus des jours ouvrables | ⬜ |
| Given les jours ouvrables nets d'un membre, when on retire weekends + jours fériés + ses absences (US11.2.2), then on obtient ses **jours ouvrés nets** — remplace `CapacityCalculator.countWorkingDays` (S20, weekends seuls, `isProvisional: true`) | ⬜ |
| Given un événement sans jour férié tenant configuré, when le calcul s'exécute, then le résultat est identique au comportement S20 (weekends seuls) — aucune régression silencieuse pour les tenants n'ayant pas encore saisi de jours fériés | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `date` absente ou `label` vide/> 100 caractères, when ajout d'un jour férié, then 400 code `INVALID_HOLIDAY` | ⬜ |
| Error : given un appelant non administrateur du tenant, when ajout/suppression d'un jour férié, then 403 (opération de configuration tenant, pas une ressource d'équipe — seul cas de ce lot où 403 est le bon code, à la différence des ressources d'équipe qui restent en 404 anti-énumération) | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId` résolu exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : test TI obligatoire prouvant qu'un jour férié d'un tenant n'apparaît jamais dans le calcul d'un autre tenant | ⬜ |

## Hors périmètre

- **Calendriers multi-localité, synchronisation externe, jours fériés par pays importés
  automatiquement** — vision complète `EN22.3`/E22 Roadmap, définitivement hors de portée de
  PIVOT (produit distinct), voir §Architecture.
- **Calendrier de weekend non standard par membre/pays** — voir §Architecture, simplification
  assumée.

## Notes d'implémentation

- **Backend** : nouvelle entité `CapacityHoliday` (`id`, `tenantId`, `date`, `label`, contrainte
  unique `(tenantId, date)`) — migration `V6__capacity_event.sql` (même fichier que le reste du
  lot S21, additive à celui de S20) ou fichier suivant selon la taille du diff, à trancher en
  implémentation. `CapacityHolidayRepository`/`CapacityHolidayService`.
  `CapacityCalculator.countWorkingDays` (S20, pur, testé en isolation) est **étendu** — pas
  remplacé par une nouvelle classe — avec un paramètre `Set<LocalDate> holidays` (défaut vide =
  comportement S20 inchangé), retenant sa signature pure/sans BDD ; le point d'appel
  (`CapacityEventService`/futur moteur US11.6.5) charge les jours fériés du tenant une fois par
  requête et les passe en paramètre.
- **Frontend** : écran d'administration tenant `capacity-holidays` (liste + ajout + suppression),
  accessible aux seuls administrateurs tenant (même garde que les autres écrans d'admin tenant
  existants).

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: EN11.1
