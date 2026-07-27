# US12.4.1 — Pré-réservation depuis une plage & proposition du meilleur créneau

**En tant que** organisateur de réunion (à partir d'une plage posée sur la roadmap Pilotage, cf. [US22.8.6](pathname:///pivot-docs/backlog/EPIC-roadmap/))
**Je veux** que MeetOps reçoive une **pré-réservation** couvrant une période, calcule le **meilleur créneau** selon les disponibilités des participants, me le propose pour **validation**, puis envoie l'invitation
**Afin de** transformer une intention de planning (roadmap) en réunion réelle, au meilleur moment, sans ressaisie

> Format Given/When/Then — chaque critère mappe à au moins un test (pivot-core JUnit/Testcontainers ou pivot-ui Vitest/Playwright). Le producteur amont `roadmap.event.window.*` (EPIC-roadmap / US22.8.6) est **hors périmètre de ce sprint** : mocké/stubbé (endpoint interne de test ou publication directe sur le bus dans un TI) ; cette US ne consomme que le contrat d'événement.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| **Réception → PRE_RESERVED.** Given un tenant valide + événement `roadmap.event.window.created` `{event_ref, project_ref, titre, participants[], période [début,fin], durée}` bien formé, when MeetOps le consomme, then une réunion est créée en statut **`PRE_RESERVED`** (brouillon), rattachée au tenant, avec `booking_window`/`event_ref`/`project_ref` renseignés, **aucune invitation envoyée** | ✅ |
| **Idempotence réception.** Given une réunion `PRE_RESERVED` déjà créée pour un `event_ref`, when un second `window.created` de **même `event_ref`** est reçu (rejeu at-least-once), then aucune réunion en double (upsert par `(tenant_id, event_ref)`) | ✅ |
| **Meilleur créneau (classement).** Given une réunion `PRE_RESERVED` + disponibilités agrégées sur la période, when le moteur best-slot s'exécute, then il persiste **N créneaux classés** dans `proposed_slots` (colonne `rank`) selon (a) dispos participants, (b) heures ouvrées/weekends/jours fériés de la localité, (c) durée + tampon ; le meilleur rang est marqué proposé par défaut | ✅ |
| **Déterminisme.** Given deux créneaux à disponibilités strictement égales, when le moteur les classe, then l'ordre est **reproductible** (départage stable, ex. début croissant) — tests non-flaky | ✅ |
| **Disponibilités agrégées.** Given des créneaux occupés/libres issus des connecteurs calendrier/absences ([EN22.3](pathname:///pivot-docs/backlog/EPIC-roadmap/)), when le moteur calcule, then un participant **sans agenda connecté est considéré disponible** par défaut (paramétrable) | ✅ |
| **Validation humaine.** Given une réunion `PRE_RESERVED` avec créneaux proposés, when l'organisateur n'a pas encore validé, then la réunion **reste `PRE_RESERVED`** ; il peut retenir un autre créneau proposé ou ajuster manuellement (start/end) | ✅ |
| **Confirmation → CONFIRMED + bus.** Given une réunion `PRE_RESERVED` et un créneau retenu par l'organisateur, when il valide, then statut → **`CONFIRMED`**, l'invitation est envoyée aux participants et l'événement `meetops.booking.confirmed` `{event_ref, créneau}` est publié sur le bus | ✅ |
| **Cohérence window.updated/deleted.** Given un `roadmap.event.window.updated`/`deleted`, when la réunion est **non confirmée**, then elle est recalculée / annulée ; when elle est **déjà `CONFIRMED`**, then une **demande de reprogrammation** est émise (pas d'annulation silencieuse) | ✅ |
| **Temps réel.** Given un organisateur abonné à la room STOMP `/topic/collaboratif/meeting/{meetingId}`, when le statut de pré-réservation ou les créneaux proposés changent, then l'état est poussé sur cette room | ✅ |
| **A11y validation.** Given l'écran de validation du créneau (interface organisateur), when il est parcouru clavier + lecteur d'écran, then : liste des créneaux proposés navigable au clavier avec focus visible, le créneau recommandé annoncé (`aria-selected`/rôle radiogroup ou listbox), le bouton **Valider** atteignable et libellé explicitement, les changements temps réel annoncés via `aria-live` poli, contraste AA — conforme WCAG 2.1 AA | ✅ |
| **Sécurité — isolation tenant.** Given tout accès (consommation événement, REST, STOMP), when il est traité, then `tenantId` est extrait **exclusivement** du `TenantContext`/principal porteur (jamais du body/header/événement) ; un `event_ref` d'un autre tenant ne cible jamais une réunion cross-tenant → 404 | ✅ |
| **Sécurité — autorisation validation.** Given une réunion `PRE_RESERVED`, when un utilisateur **autre que l'organisateur** (même tenant) tente de valider/modifier, then **403** ; when il n'appartient pas au tenant, then **404** | ✅ |
| **Sécurité — autorisation room STOMP.** Given la room `/topic/collaboratif/meeting/{meetingId}`, when un utilisateur non autorisé (autre tenant, ou non organisateur/participant) tente de SUBSCRIBE, then l'abonnement est refusé (frame ERROR, sans déconnecter les autres) | ✅ |
| **RGPD — agrégat only.** Given les disponibilités consommées, when le moteur les utilise, then seul l'état **libre/occupé** est manipulé (aucun détail d'agenda ni motif d'absence stocké/loggué) ; corrélation par `event_ref`/`project_ref`, **aucune FK inter-modules** (ADR-006/008) | ✅ |
| **Error — événement malformé.** Given un `window.created` avec champ requis manquant/invalide (période vide, `fin < début`, `durée > période`, participants vide), when il est consommé, then aucune réunion n'est créée, l'erreur est loggée (structuré, sans PII) et l'événement est rejeté/mis en DLQ sans crash du consommateur | ✅ |
| **Error — aucun créneau sans conflit.** Given une période sans **aucun** créneau sans conflit, when le moteur s'exécute, then il propose le **moins mauvais** créneau et signale explicitement le conflit de disponibilité (flag/motif exposé à l'UI) | ✅ |
| **Error — validation d'un créneau invalide / double confirmation.** Given une validation ciblant un créneau **absent de `proposed_slots`** (ou une réunion **déjà `CONFIRMED`**), when elle est soumise, then **409/422** (conflit d'état) sans re-publication du bus ni double invitation (validation concurrente idempotente) | ✅ |
| **Tests.** `window.created` → `PRE_RESERVED` · classement (participant occupé → créneau déclassé) · déterminisme à dispos égales · validation → `CONFIRMED` + publication `meetops.booking.confirmed` · `window.deleted` sur pré-réservation non confirmée → annulation · reprogrammation sur réunion confirmée · TI cross-tenant (404) + non-organisateur (403) · A11y (pivot-ui) | ✅ |

> **Couverture Gate 2 — notes de transparence (Dev Agent).** L'implémentation backend/frontend couvre chaque AC ; deux zones de test restent volontairement plus légères et sont signalées pour Gate 3/4 : (1) le "temps réel" et l'"autorisation room STOMP" sont couverts par revue de code + tests unitaires de l'intercepteur, mais sans TI STOMP live bout-en-bout (mirroring `CollaboratifWebSocketConfigRelayIT`) ; (2) la reprogrammation sur `window.updated` (réunion déjà `CONFIRMED`) partage le même chemin de code que `window.deleted` (testé explicitement), mais n'a pas son propre TI dédié. Aucun blocage identifié, juste un follow-up de couverture recommandé.

> **Modèle** : étend `meetings` (statut `PRE_RESERVED` / `CONFIRMED`, `booking_window`, `event_ref`, `project_ref`) et ajoute `proposed_slots` (cf. EN12.1). Le **moteur de créneaux** (best-slot) est porté par MeetOps ; la roadmap (E22) n'émet que la plage et l'intention.

## Hors périmètre

- L'émission de la plage côté roadmap (création/édition, statut affiché) — portée par [US22.8.6](pathname:///pivot-docs/backlog/EPIC-roadmap/) (E22)
- Les connecteurs calendrier/absences eux-mêmes — portés par EN22.3, cette US n'en consomme que le résultat agrégé (implémentation livrée : `AvailabilityPort` + stub in-memory swappable)
- La replanification d'une réunion confirmée hors du flux roadmap (reprogrammation manuelle classique) — cycle de vie MeetOps standard

## Notes d'implémentation

- Pendant symétrique de US22.8.6 : les deux US forment le contrat de l'interface E22 ↔ E12 (`roadmap.event.window.*` / `meetops.booking.confirmed`) — toute évolution du schéma d'événements doit être répercutée des deux côtés
- Le moteur best-slot doit être déterministe à disponibilités égales (classement reproductible) pour que les tests de classement soient stables
- **Organisateur non porté par le contrat d'événement** (constat Dev Agent, Gate 2) : `roadmap.event.window.created` ne porte aucun champ organisateur explicite. Convention retenue et documentée dans le code (`BookingService`) : le premier élément de `participants[]` est traité comme organisateur, résolu au meilleur effort par e-mail dans le tenant. Point ouvert pour US22.8.6/EPIC-roadmap à trancher plus tard.
- pivot-core : migration `V20__meetops_booking.sql` (additive, ne touche jamais V1..V19), package `fr.pivot.collaboratif.meetops.{bestslot,availability,bus,booking}` en complément de `fr.pivot.collaboratif.meeting` (US12.1.1)
- pivot-ui : écran de validation sous `collaboratif-ui/src/lib/meeting/meeting-validation/`, route `meetops/:meetingId/validate` (même arbre `meeting.routes.ts` que US12.1.1)

---
Item Type: US · Parent: F12.4 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: Medium
Stage: 🤖 Dev (Gate 2 — PR draft ouverte, Gate 3/4 à faire)
Rôle: animateur-facilitateur
Dépendances: US22.8.6 (plage roadmap → MeetOps) · EN22.3 (disponibilité/calendriers) · EN12.1 (schéma `collaboratif`) · bus PIVOT (ADR-008) · US12.1.1 (entité `Meeting` de base, branche non encore mergée à date de ce Gate 2 — voir PR)
