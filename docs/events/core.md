---
title: Événements — Cœur / plateforme
sidebar_position: 1
description: Contrats d'événements du domaine core (activation des modules, tenants, auth/IAM, santé) et cards alimentées.
---

Domaine `core` — plateforme, [E03](pathname:///pivot-docs/backlog/EPIC-module-system/) (modules),
[E06](pathname:///pivot-docs/backlog/EPIC-administration/) (administration),
[E01](pathname:///pivot-docs/backlog/EPIC-auth-iam/) (auth/IAM),
[E04](pathname:///pivot-docs/backlog/EPIC-observabilite/) (observabilité). Enveloppe commune :
[README](README.md#enveloppe-pivotevent-rappel-adr-025-2).

> **Audit** : la card *Journal d'audit* n'est **pas** alimentée par le bus mais par un endpoint de
> lecture de `audit_events` (EN51.7) — l'audit est une donnée en base, pas un flux d'événements.
> **Notifications** : `NotificationCreatedEvent` est **intra-JVM** (Spring `ApplicationEventPublisher`,
> pousse le STOMP navigateur), pas un événement de bus inter-briques (ADR-025, alternatives écartées).

## `core.module.activated` · v1

- **Payload** : `{ moduleId: string, activatedByRef: string }`
- **Émis par** : `pivot-core` (E03) quand un admin active un module pour le tenant.
- **Consommé par** : cockpit (recompose la grille + les cards), workflows (déclencheur).
- **Cards** : *Activation des domaines* (C1) — bascule une card `module-wip` → `ready`.

## `core.module.deactivated` · v1

- **Payload** : `{ moduleId: string, deactivatedByRef: string }`
- **Émis par** : `pivot-core` (E03).
- **Consommé par** : cockpit (repasse les cards du module en `module-wip`), workflows.
- **Cards** : *Activation des domaines* (C1).

## `core.tenant.created` · v1

- **Payload** : `{ tenantRef: string, planRef?: string }`
- **Émis par** : `pivot-core` (E06, superadmin).
- **Consommé par** : cockpit ; modules qui provisionnent un schéma par tenant.
- **Cards** : — (gouvernance superadmin).

## `core.tenant.deactivated` · v1

- **Payload** : `{ tenantRef: string, reason?: string }`
- **Émis par** : `pivot-core` (E06).
- **Consommé par** : **tous les modules** (gel du périmètre tenant), cockpit.
- **Cards** : — (gouvernance).

## `core.health.changed` · v1

- **Payload** : `{ moduleId: string, status: "up" | "degraded" | "down", version: string }`
- **Émis par** : `pivot-core` (E04) et chaque adaptateur (capacité *Santé*, ADR-009 §4) sur
  changement d'état — pas un battement périodique, seulement les transitions.
- **Consommé par** : cockpit (bandeau de statut).
- **Cards** : *Bandeau santé instance* (Transverse) — l'état « OK » comme l'état « alerte ».

## `auth.session.started` · v1

- **Payload** : `{ sessionRef: string, provider: "password" | "google" | "oidc", userRef: string }`
- **Émis par** : `pivot-core` (E01) à l'ouverture de session.
- **Consommé par** : cockpit (met à jour une **projection** « sessions actives » — la card ne compte
  pas les événements bruts).
- **Cards** : *Identités & sessions* (C5, 🔴 masquée aux externes).

## `auth.session.revoked` · v1

- **Payload** : `{ sessionRef: string, userRef: string, reason: "logout" | "expired" | "admin" }`
- **Émis par** : `pivot-core` (E01).
- **Consommé par** : cockpit (projection sessions actives).
- **Cards** : *Identités & sessions* (C5).

## `auth.user.role_changed` · v1

- **Payload** : `{ userRef: string, oldRole: string, newRole: string, byRef: string }`
- **Émis par** : `pivot-core` (E06).
- **Consommé par** : cockpit (projection IAM), workflows.
- **Cards** : *Identités & sessions* (C5) · trace aussi écrite en `audit_events` (lue via EN51.7).
