# US22.8.6 — Plage d'événement sur la roadmap → pré-réservation MeetOps

**En tant que** organisateur de l'événement
**Je veux** définir une plage sur la roadmap pour un événement (atelier, comité, kick-off) qui crée automatiquement une **pré-réservation** dans MeetOps, à valider, laquelle proposera le **meilleur créneau** dans la période
**Afin de** passer de l'intention de planning à une réunion réelle, au bon moment, sans ressaisie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une plage `[début, fin]` posée sur la roadmap pour un événement, when je la crée, then un événement MeetOps en statut **« pré-enregistrement / à valider »** est créé via le bus PIVOT, couvrant la période (deep-link roadmap ↔ MeetOps, **pas de FK** — ADR-006/008) | ⬜ |
| Given un pré-enregistrement non validé, when rien n'est confirmé, then **aucune invitation n'est envoyée** (reste brouillon, réversible) | ⬜ |
| Given la validation par l'organisateur, when elle a lieu, then MeetOps calcule le **meilleur créneau dans la période** (disponibilités des participants, calendriers & jours fériés/absences via [EN22.3](../../ENABLERS/en-connecteurs-calendrier-disponibilite.md)) et **envoie l'invitation** | ⬜ |
| Given une plage modifiée ou supprimée sur la roadmap, when le changement est émis, then le pré-enregistrement MeetOps est **mis à jour ou annulé** (cohérence bout-en-bout) | ⬜ |
| Given le créneau retenu, when la réunion est planifiée, then le jalon/plage de la roadmap reflète la date confirmée (aller-retour) | ⬜ |
| Security/Gouvernance : le cycle proposition → validation → envoi est tracé ; corrélation par `event_ref`/`project_ref` (aucune FK inter-modules) | ⬜ |

> **Répartition des responsabilités.** La roadmap (E22) **émet** la plage et l'intention ; le **module MeetOps (E12)** porte le pré-enregistrement, le calcul du meilleur créneau et l'envoi d'invitation. L'échange passe par le **bus d'événements PIVOT** (`roadmap.event.window.created` / `meetops.booking.confirmed`).

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Rôle: animateur-facilitateur
Profils: Tous
Justification: Interface E22 Roadmap ↔ E12 MeetOps (plage → pré-réservation → meilleur créneau), via bus PIVOT (ADR-006/008)
Dépendances: EN22.3 (disponibilité/calendriers) · bus PIVOT · E12 MeetOps
