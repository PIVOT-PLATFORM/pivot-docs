---
title: Événements — Pilotage
sidebar_position: 2
description: Contrats d'événements du domaine pilotage (projet, portefeuille, roadmap, jalon, tâche, budget, OKR, contrat) et cards alimentées.
---

Domaine `pilotage` — modules de capacité du domaine Pilotage
([ADR-008](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits)) : Portefeuille (E23),
Roadmap/Gantt (E22), Budget (E26), OKR (E27), Commande publique (E25). Ces événements sont la source
de la **corrélation risque ↔ projet** par `projectRef` logique (E21, jamais de FK — ADR-006).
Enveloppe commune : [README](README.md#enveloppe-pivotevent-rappel-adr-025-2).

## `pilotage.project.created` · v1

- **Payload** : `{ projectRef: string, name: string, portfolioRef?: string }`
- **Émis par** : `pivot-pilotage-core` (E23) · adaptateur PPM (OpenProject, ADR-009 — même `type`).
- **Consommé par** : `risk` (résout `projectRef`), cockpit (projection portefeuille).
- **Cards** : *Santé du portefeuille projets* (C1).
- **Note** : un `projectRef` inconnu chez un consommateur ne doit **jamais** faire échouer le
  traitement (ADR-025 — consommation asynchrone durable).

## `pilotage.project.archived` · v1

- **Payload** : `{ projectRef: string }`
- **Émis par** : `pivot-pilotage-core` (E23).
- **Consommé par** : `risk`, cockpit.
- **Cards** : *Santé du portefeuille projets* (C1).

## `pilotage.project.status_changed` · v1

- **Payload** : `{ projectRef: string, status: "green" | "amber" | "red" }`
- **Émis par** : `pivot-pilotage-core` (E23).
- **Consommé par** : `risk`, cockpit.
- **Cards** : *Santé du portefeuille projets* (C1) — feux RAG.

## `pilotage.portfolio.weather_changed` · v1

- **Payload** : `{ portfolioRef: string, weather: "sun" | "cloud" | "storm", indicators: string[] }`
- **Émis par** : `pivot-pilotage-core` (E23, US23.2.4 météo & indicateurs normalisés).
- **Consommé par** : cockpit (agrégat portefeuille, EN51.9).
- **Cards** : *Santé du portefeuille projets* (C1).

## `pilotage.milestone.reached` · v1

- **Payload** : `{ projectRef: string, milestoneRef: string, reachedAt: string }`
- **Émis par** : `pivot-pilotage-core` (E22).
- **Consommé par** : cockpit.
- **Cards** : *Roadmap* (C1).

## `pilotage.milestone.missed` · v1

- **Payload** : `{ projectRef: string, milestoneRef: string, dueAt: string }`
- **Émis par** : `pivot-pilotage-core` (E22).
- **Consommé par** : `risk` (déclenche potentiellement `risk.raised`), cockpit.
- **Cards** : *Roadmap* (C1) · *Santé du portefeuille projets* (C1).

## `pilotage.roadmap.published` · v1

- **Payload** : `{ roadmapRef: string, projectRef?: string }`
- **Émis par** : `pivot-pilotage-core` (E22).
- **Consommé par** : cockpit.
- **Cards** : *Roadmap* (C1) — bascule `empty` → `ready`.

## `pilotage.task.completed` · v1

- **Payload** : `{ projectRef: string, taskRef: string }`
- **Émis par** : `pivot-pilotage-core` (E22) · adaptateur delivery.
- **Consommé par** : `risk` (boucle vivante F21.4), cockpit.
- **Cards** : *Santé du portefeuille projets* (C1).

## `pilotage.budget.alert` · v1

- **Payload** : `{ projectRef: string, threshold: "80%" | "100%" | "overrun", currency: string }`
- **Émis par** : `pivot-pilotage-core` (E26).
- **Consommé par** : `risk`, cockpit.
- **Cards** : *Budget / coût SI* (C1, 🔴 masquée aux externes).
- **Note** : le **montant** n'est pas dans le payload (donnée sensible) — seulement le seuil franchi.

## `pilotage.okr.updated` · v1

- **Payload** : `{ okrRef: string, progress: number }`
- **Émis par** : `pivot-pilotage-core` (E27).
- **Consommé par** : cockpit.
- **Cards** : OKR (futur, C1).

## `pilotage.contract.due` · v1

- **Payload** : `{ contractRef: string, dueAt: string, vendorRef?: string }`
- **Émis par** : `pivot-pilotage-core` (E25, commande publique).
- **Consommé par** : `risk` (risque fournisseur/lock-in), cockpit.
- **Cards** : Achats (futur, C1).
