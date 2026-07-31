# US12.1.1 — Créer une réunion avec agenda structuré

**En tant que** organisateur de réunion
**Je veux** créer une réunion avec un agenda structuré par points
**Afin de** préparer et partager l'ordre du jour à l'avance

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un utilisateur authentifié dont le module MeetOps est actif, when il envoie `POST /api/collaboratif/meetings` avec `{ title, scheduledAt, totalDurationMinutes, teamId?, agendaItems[] }`, then une réunion est créée en statut `DRAFT` et l'API répond `201 Created` avec l'entête `Location: /api/collaboratif/meetings/{id}` et le corps de la réunion créée (id, statut, agenda ordonné) | ✅ |
| Given une requête de création, when `agendaItems` est fourni, then chaque point est persisté avec `title` (obligatoire), `durationMinutes` (entier > 0), `type` ∈ `{INFO, DISCUSSION, DECISION}`, `facilitator` (optionnel) et `position` (ordre d'affichage, dérivé de l'ordre du tableau `agendaItems`, base 0) | ✅ |
| Given une réunion avec au moins un point d'agenda, when la somme des `durationMinutes` des points diffère de `totalDurationMinutes`, then la réunion est quand même créée (`201`) et la réponse porte un avertissement non bloquant `agendaDurationMismatch: { expectedMinutes, sumMinutes, deltaMinutes }` | ✅ |
| Given une requête de création, when `agendaItems` est absent ou vide, then la réunion est créée avec succès (`201`, agenda vide autorisé) et sans avertissement `agendaDurationMismatch` | ✅ |
| Given un `teamId` fourni, when l'équipe existe et appartient au tenant courant, then la réunion est rattachée à cette équipe ; `teamId` absent → réunion personnelle (non rattachée à une équipe) | ✅ |
| Error : given un corps invalide (`title` vide/blanc ou > 200 caractères, `scheduledAt` absent ou non ISO-8601, `totalDurationMinutes` ≤ 0 ou > 1440, un point avec `durationMinutes` ≤ 0 ou `type` hors énumération), when l'API est appelée, then elle répond `400 Bad Request` avec un corps `application/problem+json` listant les erreurs par champ, et rien n'est persisté (transaction atomique) | ✅ |
| Error : given un `teamId` inexistant ou appartenant à un autre tenant, when l'API est appelée, then elle répond `404 Not Found` (pas de fuite d'existence inter-tenant) et rien n'est persisté | ✅ |
| Security : le `tenantId` de la réunion est extrait du `TenantContext` côté serveur (jamais lu dans le corps ni les paramètres de requête) ; tout `tenantId`/`ownerId` présent dans la charge utile est ignoré ; `createdBy` est renseigné depuis le principal authentifié ; une requête non authentifiée → `401`, module MeetOps inactif pour le tenant → `403` | ✅ |
| Security : une lecture/écriture ne peut jamais viser une réunion, une équipe ou un point d'agenda d'un autre tenant — toutes les requêtes de persistance sont filtrées par le `tenantId` du `TenantContext` (isolation multi-tenant vérifiée par test) | ✅ |
| A11y : le formulaire de création (pivot-collaboratif-ui) est conforme WCAG 2.1 AA — chaque champ (titre, date/heure, durée totale, et par point : titre, durée, type, animateur) a un `<label>` associé, le sélecteur `type` et la liste des points sont navigables au clavier (y compris la réorganisation des points), les erreurs de validation sont reliées à leur champ via `aria-describedby`, et l'avertissement `agendaDurationMismatch` est annoncé par lecteur d'écran via une région `aria-live="polite"` (`role="status"`) | ✅ |

> **Modèle** : crée une ligne `meetings` (`id`, `tenant_id`, `team_id` nullable → `public.teams.id`, `title`, `scheduled_at`, `total_duration_minutes`, `status` défaut `DRAFT`, `created_by`, `created_at`, `updated_at`) et 0..N lignes `agenda_items` (`id`, `meeting_id`, `position`, `title`, `duration_minutes`, `type`, `facilitator`) — schéma Flyway `collaboratif`, cf. [EN12.1](pathname:///pivot-docs/backlog/EPIC-meetops/). L'énumération `type` est stockée en ASCII (`DECISION`, pas `DÉCISION`) ; le libellé accentué relève de l'i18n côté UI. L'avertissement `agendaDurationMismatch` est calculé à la volée, non persisté.

## Hors périmètre

- L'invitation des participants et le partage de l'ordre du jour → [US12.1.2](pathname:///pivot-docs/backlog/EPIC-meetops/)
- Le démarrage, le timer et le point courant temps réel (STOMP) → [US12.2.1](pathname:///pivot-docs/backlog/EPIC-meetops/)
- La pré-réservation depuis une plage roadmap et le calcul du meilleur créneau (statuts `PRE_RESERVED` / `CONFIRMED`) → [US12.4.1](pathname:///pivot-docs/backlog/EPIC-meetops/)
- La modification / suppression d'une réunion existante et de son agenda (cycle de vie MeetOps standard) — cette US ne couvre que la création
- La génération du compte-rendu → [US12.3.1](pathname:///pivot-docs/backlog/EPIC-meetops/)

## Notes d'implémentation

- **Repo cible** : backend `pivot-collaboratif-core`, frontend `pivot-collaboratif-ui` (cf. [E12](pathname:///pivot-docs/backlog/EPIC-meetops/)) ; pré-requis EN17 (pivot-core-starter + `@pivot/ui-core` publiés).
- **Statut initial** `DRAFT` : l'énumération `status` de `meetings` doit accueillir `DRAFT` (création manuelle) en plus des valeurs `PRE_RESERVED` / `CONFIRMED` déjà prévues par EN12.1 pour le flux roadmap (US12.4.1) et des valeurs d'animation (US12.2.1) — à valider avec l'Architect Agent pour ne pas dupliquer l'énumération entre US.
- **Validation** : Bean Validation côté `pivot-core` (contraintes `@NotBlank`, `@Positive`, `@Size`, énumération) ; le mismatch de durée est un avertissement métier (ni `400`, ni `422`), retourné dans le corps `201`.
- **Atomicité** : création réunion + points d'agenda dans une seule transaction ; échec de validation d'un point → aucun enregistrement (rollback complet).
- **Isolation tenant** : `tenant_id` résolu par le `TenantContext` (filtre serveur), jamais depuis l'entrée client — pattern déjà appliqué dans le domaine `collaboratif`. Pas de FK inter-modules ; corrélation d'équipe via `team_id` → `public.teams.id` (E15).
- **Temps réel hors scope** : la room STOMP `/topic/collaboratif/meeting/{meetingId}` (EN12.2) n'est **pas** émise à la création ; elle est utilisée par US12.2.1 (animation). Aucun événement bus n'est publié par cette US.
- **Traçabilité AC → test** : chaque critère mappe ≥ 1 test (`pivot-collaboratif-core` pour l'API/validation/isolation, `pivot-collaboratif-ui` pour l'A11y et le rendu de l'avertissement).

---
Item Type: US · Parent: F12.1 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: EN12.1 (schéma `collaboratif` — `meetings`, `agenda_items`) · EN12.2 (guard module meetops) · E15 (équipes transverses — `public.teams`) · EN17 (infra multi-repo)
