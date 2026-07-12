---
title: Événements — Sécurité
sidebar_position: 6
description: Contrats d'événements du domaine securite (scan, vulnérabilité, incident, posture, PCA/PRA) — cards sécurité 🔴, masquées aux externes.
---

Domaine `securite` — [E43 — Sécurité & Zero Trust](pathname:///pivot-docs/backlog/EPIC-securite/) +
l'intégration code-scanning (EN51.8) au-dessus des scans CI existants (E05). Enveloppe commune :
[README](README.md#enveloppe-pivotevent-rappel-adr-025-2).

> **Sensibilité 🔴** : les cards alimentées ici sont **masquées à l'externe pur** et seulement
> **agrégées** pour un rôle sécurité externalisé ([ADR-028](pathname:///pivot-docs/adr/ADR-028-acces-identites-externes)).
> Les payloads ne portent pas de détail exploitable au-delà du nécessaire (pas de chemin, pas de PoC).

## `securite.scan.completed` · v1

- **Payload** : `{ repoRef: string, criticalCount: number, highCount: number, mediumCount: number }`
- **Émis par** : intégration code-scanning (EN51.8) après un scan CI (Trivy/CodeQL/Dependabot, E05).
- **Consommé par** : cockpit.
- **Cards** : *Correctifs de sécurité en attente* (C5, 🔴).

## `securite.vulnerability.detected` · v1

- **Payload** : `{ repoRef: string, severity: "high" | "critical", advisoryRef: string }`
- **Émis par** : sécurité (E43) / code-scanning (EN51.8).
- **Consommé par** : cockpit (remonte au bandeau), workflows (ticket/escalade).
- **Cards** : *Correctifs de sécurité en attente* · *Posture de sécurité* (C5, 🔴).

## `securite.incident.raised` · v1

- **Payload** : `{ incidentRef: string, severity: "low" | "medium" | "high" | "critical" }`
- **Émis par** : sécurité (E43, SOC).
- **Consommé par** : cockpit (bandeau d'alerte), workflows.
- **Cards** : *Alertes SOC & réponse à incident* (C5, 🔴 — ◐ agrégé pour un SOC externalisé).

## `securite.posture.changed` · v1

- **Payload** : `{ tenantRef: string, score: number, trend: "up" | "down" | "flat" }`
- **Émis par** : sécurité (E43).
- **Consommé par** : cockpit.
- **Cards** : *Posture de sécurité* (Transverse T · C5, 🔴).

## `securite.pca.tested` · v1

- **Payload** : `{ planRef: string, result: "pass" | "partial" | "fail", testedAt: string }`
- **Émis par** : sécurité (E43, continuité).
- **Consommé par** : cockpit.
- **Cards** : *État PCA / PRA* (C5, 🟡).
