---
title: Événements — Agilité
sidebar_position: 4
description: Contrats d'événements du domaine agilite (sprint, standup, capacity, poker, rétro) — agrégats équipe, cohérence RGPD, et cards alimentées.
---

Domaine `agilite` — modules Scrum Poker (E09), Daily Standup (E10), Capacity (E11), Rétrospective
(E20), Session (E19), PI Planning (E50). Repos `pivot-agilite-core/ui`. Enveloppe commune :
[README](README.md#enveloppe-pivotevent-rappel-adr-025-2).

> **Cohérence RGPD (100% Équipe)** : les payloads agilité ne portent que des **agrégats d'équipe**
> (`teamRef`), **jamais** de métrique individuelle nominative — aligné sur la classification des cards
> C2 (cf. [catalogue § C2](pathname:///pivot-docs/specs/EPIC-shell-ux/cockpits-dsi-bijection)).
> `teamId` est renseigné dans l'enveloppe ; `JMSXGroupID = tenantId`.

## `agilite.sprint.closed` · v1

- **Payload** : `{ teamRef: string, sprintRef: string, velocity: number, plannedPoints: number, donePoints: number }`
- **Émis par** : module agilité (delivery/sprint).
- **Consommé par** : `risk` (vélocité de risque, obstacles), cockpit/télémétrie (EN51.6).
- **Cards** : *Vélocité* (C2) — **agrégat équipe**.

## `agilite.standup.completed` · v1

- **Payload** : `{ teamRef: string, date: string, participationRate: number }`
- **Émis par** : Daily Standup (E10).
- **Consommé par** : cockpit/télémétrie.
- **Cards** : *Régularité des standups* (C2) — **taux d'équipe**, jamais par personne.

## `agilite.capacity.updated` · v1

- **Payload** : `{ teamRef: string, sprintRef: string, capacityPoints: number }`
- **Émis par** : Capacity (E11).
- **Consommé par** : cockpit.
- **Cards** : *Capacity* (C2) — capacité **d'équipe** agrégée.

## `agilite.poker.session.closed` · v1

- **Payload** : `{ teamRef: string, sessionRef: string, ticketCount: number, consensusRate: number }`
- **Émis par** : Scrum Poker (E09).
- **Consommé par** : cockpit/télémétrie (adoption/usage).
- **Cards** : Delivery / adoption agilité (C2/C7).

## `agilite.retro.closed` · v1

- **Payload** : `{ teamRef: string, retroRef: string, actionCount: number }`
- **Émis par** : Rétrospective (E20).
- **Consommé par** : cockpit/télémétrie.
- **Cards** : Adoption / conduite du changement (C7).
