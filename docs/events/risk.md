---
title: Événements — Risques
sidebar_position: 3
description: Contrats d'événements du domaine risk (E21) — cycle de vie du risque, corrélation projet, et cards alimentées.
---

Domaine `risk` — module [E21 — Gestion des risques](pathname:///pivot-docs/backlog/EPIC-risk/), repo
`pivot-risk-core`. C'est l'exemple canonique de la **boucle vivante** d'ADR-025 : il **consomme** des
événements d'autres domaines et **émet** les siens, corrélés à un projet par `projectRef` logique
(jamais de FK — ADR-006). Enveloppe commune : [README](README.md#enveloppe-pivotevent-rappel-adr-025-2).

## Consommés (entrées de la boucle vivante)

| `type` consommé | D'où | Effet |
| --- | --- | --- |
| `pilotage.project.created` / `.archived` | pilotage | résout / clôt le `projectRef` d'un risque |
| `pilotage.milestone.missed` | pilotage | peut déclencher un `risk.raised` (retard) |
| `pilotage.task.completed` | pilotage | met à jour l'exposition d'un risque |
| `pilotage.budget.alert` | pilotage | peut déclencher `risk.threshold.exceeded` |
| `agilite.sprint.closed` | agilité | vélocité de risque, obstacles du sprint |

> `JMSXGroupID = tenantId:projectRef` pour ces flux, afin de garantir l'ordre des événements d'un
> même projet (ADR-025 §3).

## `risk.raised` · v1

- **Payload** : `{ riskRef: string, projectRef?: string, category: "project" | "security" | "vendor" | "compliance", severity: "low" | "medium" | "high" | "critical" }`
- **Émis par** : `pivot-risk-core` (E21).
- **Consommé par** : cockpit, workflows (déclencheur de mitigation).
- **Cards** : *Risques projet & portefeuille* (C1) si `category != security` ; *Risques SSI* (C5) si
  `category = security`. C'est le champ `category` qui aiguille la card (cf. séparation F6 des risques).

## `risk.threshold.exceeded` · v1

- **Payload** : `{ riskRef: string, projectRef?: string, metric: string }`
- **Émis par** : `pivot-risk-core` (E21).
- **Consommé par** : cockpit (remonte au bandeau d'alerte), workflows.
- **Cards** : *Risques projet & portefeuille* (C1) / *Risques SSI* (C5) selon la catégorie du risque.

## `risk.mitigation.due` · v1

- **Payload** : `{ riskRef: string, mitigationRef: string, dueAt: string }`
- **Émis par** : `pivot-risk-core` (E21).
- **Consommé par** : cockpit, workflows (rappel/escalade).
- **Cards** : *Risques projet & portefeuille* (C1).

## `risk.closed` · v1

- **Payload** : `{ riskRef: string, outcome: "mitigated" | "accepted" | "materialized" }`
- **Émis par** : `pivot-risk-core` (E21).
- **Consommé par** : cockpit.
- **Cards** : *Risques projet & portefeuille* (C1) / *Risques SSI* (C5).
