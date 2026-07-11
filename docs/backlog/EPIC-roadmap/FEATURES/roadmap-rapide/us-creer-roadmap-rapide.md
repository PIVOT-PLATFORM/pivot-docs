# US22.3.1 — Créer une roadmap rapide

**En tant que** direction / PO
**Je veux** poser des initiatives sur des lanes (thème / équipe / objectif) sans créer de tâches, en quelques minutes
**Afin de** communiquer une direction vite, en réunion, sans granularité opérationnelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une roadmap vide, when j'ajoute une initiative sur une lane, then une barre est créée sans exiger de tâches ni de dates précises | ⬜ |
| Given une initiative, when je la déplace/redimensionne à la souris, then sa période (approximative) est mise à jour immédiatement | ⬜ |
| Error : given une initiative sans lane cible, when je tente de l'enregistrer, then l'action est rejetée et un message indique qu'une lane est requise | ⬜ |
| Security : seul un utilisateur ayant accès au projet/portefeuille concerné peut créer ou modifier une initiative sur sa roadmap | ⬜ |
| A11y : création et déplacement possibles au clavier (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La définition de l'échelle de temps (mois/trimestre/semestre) — couverte par US22.3.2.
- Les vues Now/Next/Later et les jalons stratégiques — couvertes respectivement par US22.3.3 et US22.3.4.
- Toute planification fine (tâches, WBS, dépendances typées) : hors altitude « roadmap rapide », relève du Gantt détaillé (F22.4).

## Notes d'implémentation

- L'initiative créée ici est une vue « macro » posée sur le même graphe temporel que le Gantt (EN22.1) — pas d'entité séparée ni de double saisie.
- Le déplacement/redimensionnement à la souris doit rester possible sans imposer de date au jour près (cf. échelle floue, US22.3.2).
- Fonctionnalité activée selon le profil d'organisation (TPE/PME en priorité, cf. README E22 §« Altitude pilotée par le profil »).

### Backend — contrat figé (pivot-pilotage-core, branche `feat/us22-3-1-roadmap-rapide-api`)

Gate 1 laissait le concept technique ouvert (pas de lane/endpoint/DTO pré-définis) — décisions
PO Agent + Architecte prises côté `pivot-pilotage-core` et consignées ici pour qu'un futur agent
frontend (`pivot-pilotage-ui`) puisse s'y brancher sans deviner.

**Concept de « lane » retenu.** Une lane est un regroupement **horizontal et plat** (thème /
équipe / objectif, au choix libre de l'utilisateur — aucune taxonomie figée, pas de champ
« kind ») de la roadmap macro, **orthogonal au temps**. Distincte de `pilotage.phase` (EN22.1a :
regroupement macro adossé à une tâche récapitulative racine, axe temps/WBS) — les deux
coexistent sans se substituer. Nouvelle petite table `pilotage.lane` (id, tenant_id, team_id,
project_id, name, position, created_at, updated_at ; `UNIQUE(project_id, name)`). Une
**initiative reste un `pilotage.task` existant** (package `schedule`) — `node_kind = LEAF`,
`shared_in_roadmap = true`, et une nouvelle colonne nullable `task.lane_id` (FK
`pilotage.lane(id)`) l'attache à sa lane. Aucune table « initiative » séparée, conformément à la
note ci-dessus. Le grain temporel (`temporal_precision`) par défaut d'une initiative créée sans
précision explicite est `QUARTER` (roadmap rapide = altitude macro ; US22.3.2 pourra envoyer une
valeur explicite sans changement de contrat).

**Endpoints REST** (préfixe nginx `/api/pilotage`, cf. `pivot-pilotage-core/CLAUDE.md`) :

| Méthode | Chemin | Body | Succès | Erreurs |
|---------|--------|------|--------|---------|
| `GET` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/lanes` | — | `200` `LaneResponse[]` (triées par position) | `404` (projet non visible) |
| `POST` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/lanes` | `CreateLaneRequest{name}` | `201` `LaneResponse` | `400` (name vide), `403` (non autorisé), `404`, `409` (label déjà utilisé sur ce projet) |
| `GET` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/initiatives` | — | `200` `InitiativeResponse[]` (triées par lane puis position) | `404` |
| `POST` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/initiatives` | `CreateInitiativeRequest{name, laneId, fuzzyPeriodStart?, fuzzyPeriodEnd?, temporalPrecision?}` | `201` `InitiativeResponse` | `400` (`LANE_REQUIRED` si `laneId` absent, `LANE_NOT_FOUND` si invalide/étranger, `INVALID_PERIOD` si une seule borne fournie ou fin < début), `403`, `404` |
| `PATCH` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/initiatives/{initiativeId}` | `UpdateInitiativePlacementRequest{laneId?, fuzzyPeriodStart?, fuzzyPeriodEnd?}` (tout optionnel — `null` = inchangé, jamais d'effacement) | `200` `InitiativeResponse` | `400` (`LANE_NOT_FOUND`, `INVALID_PERIOD`), `403`, `404` (projet ou initiative introuvable) |

`LaneResponse{id, name, position}` · `InitiativeResponse{id, laneId, name, fuzzyPeriodStart,
fuzzyPeriodEnd, temporalPrecision, revision}`. Les erreurs `400`/`409` portent un corps
`{code, message}` (ex. `{"code":"LANE_REQUIRED","message":"A lane is required to create an
initiative on project 42"}`) — l'AC erreur ("un message indique qu'une lane est requise") est
ainsi vérifiable côté frontend. Les `404` restent sans corps (non-disclosure cross-tenant,
cohérent avec `OrganizationProfileController`).

**`tenantId`/`teamId` en path, pas en body/header.** `pivot-core-starter` (`TenantContext`) n'est
pas encore publié (gap connu, `pivot-pilotage-core/TODO-SETUP.md` §5) — même contournement
temporaire que `OrganizationProfileController` (EN18.10 écart #3) : `tenantId`/`teamId` sont des
segments d'URL explicites, jamais extraits du corps de la requête. À migrer vers le contexte de
sécurité sans changement de service dès que le starter sera consommable.

**Sécurité.** Isolation tenant/équipe/projet : `GET`/écritures 404 si le triplet
`(tenantId, teamId, projectId)` ne résout à aucun projet visible (vérification unique, plus
stricte que la non-disclosure habituelle — ne distingue même pas tenant inconnu / équipe inconnue
/ projet cross-équipe). Écritures (créer une lane, créer une initiative, déplacer/redimensionner)
protégées par une politique dédiée `RoadmapEditPolicy`, câblée aujourd'hui en **fail-closed**
(`DenyAllRoadmapEditPolicy`, toujours `403`) — même posture que `OrganizationProfileOverridePolicy`
(EN18.10), le temps que `pivot-core-starter` publie l'appartenance projet/équipe. Les lectures ne
sont pas gate-ées par cette politique (l'AC ne restreint que create/modifier).

**A11y.** L'AC clavier (WCAG 2.1 AA) est un sujet frontend — aucun impact contrat backend au-delà
de garantir que chaque action (créer une lane, créer une initiative, déplacer/redimensionner) est
réalisable via un appel HTTP simple sans dépendance à un événement souris (déjà le cas : `POST`/
`PATCH` classiques, pas de WebSocket requis pour cette US).

---
Item Type: US · Parent: F22.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: macro:direction-pilotage, product-owner
Profils: Tous
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude par défaut EN18.10 (E40 adaptatif ultérieur)
Dépendances: EN22.1 (modèle temporel unique)
