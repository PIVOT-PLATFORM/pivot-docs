# US22.3.4 — Jalons stratégiques

**En tant que** direction
**Je veux** poser des jalons stratégiques (go/no-go, livraisons clés) partagés avec la vue Gantt
**Afin de** matérialiser les points de décision sur la roadmap

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une roadmap, when j'ajoute un jalon, then il est visible sur la roadmap ET sur le Gantt (même objet, cf. EN22.1) | ⬜ |
| Given un jalon, when sa date change côté Gantt, then la roadmap reflète le changement | ⬜ |
| Error : given un jalon sans date ou avec une date hors des bornes du projet, when je tente de l'enregistrer, then l'action est rejetée avec un message explicite | ⬜ |
| Security : seul un utilisateur habilité à éditer le projet (ex. direction, PO) peut créer/déplacer un jalon stratégique ; les autres rôles du domaine `pilotage` en ont une vue lecture seule | ⬜ |
| A11y : les jalons sont identifiables sur la roadmap sans dépendre uniquement de la couleur (icône/label) et accessibles au clavier (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La gestion des dépendances entre jalons/projets (flèches, cycles) — couverte par US22.1.3.
- La création de jalons périodiques ou récurrents — couverte par US22.4.6 (Gantt détaillé).
- Le calcul d'impact d'un déplacement de jalon sur le planning (chemin critique) — couvert par F22.2/F22.4.

## Notes d'implémentation

- Le jalon est l'objet partagé entre roadmap rapide et Gantt détaillé (EN22.1) : un seul enregistrement, deux rendus (barre roadmap vs. losange Gantt) — aucune duplication ni synchronisation manuelle.
- La propagation bidirectionnelle (Gantt ↔ roadmap) doit passer par la même source de vérité pour éviter tout état incohérent entre les deux vues.

### Backend — contrat figé (pivot-pilotage-core, branche `feat/us22-3-4-jalons-strategiques-api`)

Étend la base de routes établie par US22.3.1 (lanes + initiatives, `pivot-pilotage-core#32`) —
mêmes conventions de contrôleur, service, DTO, gestion d'erreur. Un jalon reste un
`pilotage.task` existant (package `schedule`, EN22.1a) — `node_kind = MILESTONE`,
`shared_in_roadmap = true`, `duration_minutes = 0` — jamais une entité séparée.

**Endpoints REST** (préfixe nginx `/api/pilotage`) :

| Méthode | Chemin | Body | Succès | Erreurs |
|---------|--------|------|--------|---------|
| `GET` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/milestones` | — | `200` `MilestoneResponse[]` (triés par date, non datés en dernier) | `404` (projet non visible) |
| `POST` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/milestones` | `CreateMilestoneRequest{name, date, laneId?}` | `201` `MilestoneResponse` | `400` (`MILESTONE_DATE_REQUIRED` si date absente, `MILESTONE_DATE_OUT_OF_BOUNDS` si hors bornes, `LANE_NOT_FOUND` si `laneId` fourni mais invalide), `403`, `404` |
| `PATCH` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/milestones/{milestoneId}` | `UpdateMilestoneRequest{date?, laneId?}` (tout optionnel — `null` = inchangé) | `200` `MilestoneResponse` | `400` (`MILESTONE_DATE_OUT_OF_BOUNDS`, `LANE_NOT_FOUND`), `403`, `404` (projet ou jalon introuvable) |

`MilestoneResponse{id, laneId, name, date, temporalPrecision, revision}` — **un seul champ
`date`** (jamais de période, contrairement à `InitiativeResponse`). `laneId` est **optionnel**
(contrairement à une initiative) : un jalon stratégique est souvent un marqueur transverse au
projet (« go/no-go », revue de comité) sans lane naturelle, mais peut aussi être épinglé à une
lane au choix de l'utilisateur.

**Même objet, aucune transformation pour un futur consommateur Gantt.** `date` est écrite à la
fois sur les bornes floues (`fuzzy_period_start = fuzzy_period_end = date`, lues par la vue
roadmap comme pour une initiative) et sur les bornes précises (`start_date = finish_date = date`
à minuit UTC, lues directement par un futur consommateur Gantt) de la **même ligne** `task` —
`temporal_precision = DAY`. L'AC « visible sur la roadmap ET sur le Gantt » est ainsi vérifiable
sans transformation de service à la lecture, quelle que soit la vue qui consomme la donnée.

**Décision PO Agent — « bornes du projet » (AC erreur).** `pilotage.project` ne porte **aucune
colonne de bornes explicite** (vérifié : seule `status_date`, une ancre de fraîcheur EN22.1a,
existe — pas de `start_date`/`end_date` projet). Plutôt que d'inventer une colonne (changement de
schéma hors périmètre de cette US, et risque de conflit avec les migrations des US parallèles),
les bornes sont **dérivées** de l'empreinte temporelle déjà existante du projet : l'enveloppe
(date effective la plus tôt / la plus tard, toutes tâches confondues, lecture fuzzy puis
fallback precise) de chaque autre `task` déjà planifiée sur le projet. Un projet sans autre
donnée datée n'impose aucune borne (seule la présence de la date est vérifiée) — un premier
jalon sur un projet neuf n'est donc jamais rejeté à tort. Décision documentée, ouverte à révision
du mainteneur si un autre contrat était souhaité (ex. bornes projet explicites dans un futur
enabler).

**Propagation du changement de date (2ᵉ AC).** `PATCH .../milestones/{id}` est l'unique chemin
d'écriture de la date ; roadmap et Gantt lisent la même ligne, donc aucune étape de propagation
séparée n'est nécessaire pour que la roadmap reflète un changement fait « côté Gantt » — le
jour où un endpoint Gantt dédié existera, il passera par ce même service. Le bus d'événements
`pilotage.plan.v1` (EN22.1c, `PlanEventType.MILESTONE_MOVED`, déjà livré) est **volontairement
pas encore câblé** ici : sa clé d'idempotence est une `revision` **par projet**, jamais encore
alimentée en production dans ce module (seule une revision par tâche existe aujourd'hui) — le
câbler avec le mauvais compteur casserait silencieusement l'idempotence pour de futurs
consommateurs (E23/E24). Gap documenté comme suivi (enabler futur), sans impact sur l'AC actuelle.

**Sécurité.** Réutilise `RoadmapEditPolicy` (fail-closed, `DenyAllRoadmapEditPolicy`) sur les deux
endpoints d'écriture — aucun nouveau mécanisme de rôle. Isolation tenant/équipe/projet identique
aux endpoints initiatives (404 non-disclosure).

**A11y.** Icône/label non-couleur et navigation clavier (WCAG 2.1 AA) : sujet frontend, hors
périmètre de ce contrat backend — délégué à **pivot-pilotage-ui**. Le contrat expose un endpoint
dédié (`/milestones`, distinct de `/initiatives`) qui donne au frontend un signal non-couleur
structurel (type de ressource) pour construire cette identification.

---
Item Type: US · Parent: F22.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: macro:direction-pilotage
Profils: Tous
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude par défaut EN18.10 (E40 adaptatif ultérieur)
Dépendances: EN22.1 (modèle temporel unique)
