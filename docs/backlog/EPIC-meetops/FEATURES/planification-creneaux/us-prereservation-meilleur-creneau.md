# US12.4.1 — Pré-réservation depuis une plage & proposition du meilleur créneau

**En tant que** organisateur de réunion (à partir d'une plage posée sur la roadmap Pilotage, cf. [US22.8.6](pathname:///pivot-docs/backlog/EPIC-roadmap/))
**Je veux** que MeetOps reçoive une **pré-réservation** couvrant une période, calcule le **meilleur créneau** selon les disponibilités des participants, me le propose pour **validation**, puis envoie l'invitation
**Afin de** transformer une intention de planning (roadmap) en réunion réelle, au meilleur moment, sans ressaisie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Réception : à réception de l'événement bus `roadmap.event.window.created` `{event_ref, project_ref, titre, participants, période [début, fin], durée}`, MeetOps crée une réunion en statut **`PRE_RESERVED`** (brouillon), sans envoyer d'invitation | ⬜ |
| Meilleur créneau : le moteur propose **N créneaux classés** dans la période selon (a) disponibilités des participants, (b) heures ouvrées, weekends & jours fériés de la localité, (c) durée demandée + tampon ; le meilleur est proposé par défaut | ⬜ |
| Disponibilités : les créneaux occupés/libres proviennent des connecteurs calendrier/absences ([EN22.3](pathname:///pivot-docs/backlog/EPIC-roadmap/)) ; un participant sans agenda connecté est **considéré disponible** par défaut (paramétrable) | ⬜ |
| Validation humaine : la réunion **reste `PRE_RESERVED`** tant que l'organisateur n'a pas validé ; il peut retenir un autre créneau proposé ou ajuster manuellement | ⬜ |
| Envoi : à la validation → statut **`CONFIRMED`**, l'invitation est envoyée aux participants et l'événement `meetops.booking.confirmed` `{event_ref, créneau}` est publié (la roadmap reflète alors la date retenue) | ⬜ |
| Cohérence : sur `roadmap.event.window.updated` / `deleted`, une pré-réservation **non confirmée** est recalculée / annulée ; une réunion **déjà confirmée** déclenche une **demande de reprogrammation** (pas d'annulation silencieuse) | ⬜ |
| Temps réel : le statut de pré-réservation et les créneaux proposés sont poussés à l'organisateur via la room STOMP `/topic/collaboratif/meeting/{meetingId}` | ⬜ |
| Sécurité / RGPD : `tenantId` extrait du `TenantContext` ; disponibilités consommées **en agrégat** (libre/occupé, sans détail d'agenda ni motif d'absence) ; corrélation par `event_ref` / `project_ref` — **aucune FK inter-modules** (ADR-006/008) | ⬜ |
| Error : période sans aucun créneau sans conflit → proposer le **moins mauvais** créneau et signaler explicitement le conflit de disponibilité | ⬜ |
| Tests : réception d'un `window.created` (création `PRE_RESERVED`) · classement des créneaux (participant occupé → créneau déclassé) · validation → `CONFIRMED` + publication bus · `window.deleted` sur pré-réservation non confirmée → annulation | ⬜ |

> **Modèle** : étend `meetings` (statut `PRE_RESERVED` / `CONFIRMED`, `booking_window`, `event_ref`, `project_ref`) et ajoute `proposed_slots` (cf. EN12.1). Le **moteur de créneaux** (best-slot) est porté par MeetOps ; la roadmap (E22) n'émet que la plage et l'intention.

---
Item Type: US · Parent: F12.4 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Dépendances: US22.8.6 (plage roadmap → MeetOps) · EN22.3 (disponibilité/calendriers) · EN12.1 (schéma `collaboratif`) · bus PIVOT (ADR-008)
