# US10.3.1 — Consulter les statistiques d'une session terminée

**En tant que** Scrum Master
**Je veux** consulter les statistiques des sessions daily passées
**Afin de** suivre la régularité et la durée des standups

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US10.1.2 (sessions
`DONE`, `startedAt`/`endedAt`, `speakingAt`/`doneSpeaking` par participant). Inspiré de l'endpoint
`GET /api/daily/stats` du POC de référence PouetPouet (`apps/api/src/modules/daily/daily.routes.ts`),
étendu avec le filtrage équipe/période exigé par l'AC PIVOT (le POC ne filtre que par utilisateur,
30 dernières sessions, sans bornes de date).

## Critères d'acceptation

### Lecture (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given l'équipe `teamId` de l'appelant, when `GET /api/agilite/standup/stats?teamId=&from=&to=`, then 200 OK avec la liste des sessions `DONE` de cette équipe dans la période, chacune avec `name`, `startedAt`, `durationSeconds` (= `endedAt - startedAt`), triée par `startedAt` décroissant | ⬜ |
| Given la même requête, when elle est traitée, then la réponse inclut aussi, par participant (agrégé sur la période) : `name`, `sessionCount` (nombre de sessions où il a parlé), `totalSpeakingSeconds` (somme des durées, `SKIPPED` = 0 par participant — voir US10.2.2) | ⬜ |
| Given `from`/`to` omis, when la requête est traitée, then la période par défaut est les **30 derniers jours** (cohérent avec le raccourci "30j" de l'AC) | ⬜ |
| Given `from`/`to` fournis (`ISO 8601` date), when la requête est traitée, then seules les sessions dont `startedAt` tombe dans `[from, to]` sont incluses | ⬜ |

### Rendu (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given les statistiques d'une équipe, when la vue s'affiche, then une liste des sessions passées (date, durée totale) et un graphique de la durée moyenne de parole par participant sont visibles | ⬜ |
| Given les raccourcis de période, when l'utilisateur les utilise, then trois options sont proposées : 7 jours / 30 jours / période personnalisée (deux sélecteurs de date) | ⬜ |
| Given aucune session terminée sur la période, when la vue s'affiche, then un état vide explicite est montré plutôt qu'un graphique cassé/vide silencieux | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `from` postérieur à `to`, when la requête est traitée, then 400 code `INVALID_DATE_RANGE` | ⬜ |
| Error : given un `teamId` inexistant ou d'un autre tenant, when la requête est traitée, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given un appelant non membre de l'équipe `teamId`, when la requête est traitée, then 404 (jamais 403) | ⬜ |
| Security : test TI obligatoire cross-tenant sur l'endpoint stats | ⬜ |
| Security : `tenantId`/`userId` résolus exclusivement du `RequestPrincipal` | ⬜ |

## Hors périmètre

- **US10.3.2** (taux de participation par membre/équipe, benchmark Geekbot) — hors fichier US
  écrit, non repris dans ce sprint.
- **Export** (CSV/PDF) des statistiques — non spécifié.

## Notes d'implémentation

- **Backend** : `StandupStatsService#getStats(teamId, from, to, tenantId)` — une requête
  agrégée (`@Query` JPQL groupant par participant `name`) plutôt qu'un chargement en mémoire de
  toutes les sessions, sur le modèle de `WheelDrawService#listDraws` pour la pagination/tri.
  `StandupStatsController` (`GET /standup/stats`), nouveau DTO `StandupStatsResponse{sessions,
  participants}`.
- **Frontend** : composant `standup-stats` — liste + graphique (librairie de graphique déjà
  utilisée ailleurs dans `pivot-ui` si présente, sinon SVG natif simple type barres, jamais de
  nouvelle dépendance lourde non validée ADR-007).

---
Item Type: US · Parent: F10.3 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: scrum-master
Dépendances: US10.1.2
