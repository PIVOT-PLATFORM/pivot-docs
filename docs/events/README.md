---
title: Catalogue d'événements
sidebar_position: 0
description: Registre append-only des événements du bus inter-briques PIVOT (ADR-025) — un contrat par type, sa forme de payload, ses émetteurs/consommateurs et les cards de cockpit qu'il alimente.
---

Source de vérité des **contrats d'événements** du bus inter-briques, mandatée par
[ADR-025 §6](pathname:///pivot-docs/adr/ADR-025-bus-evenements-schema-inter-briques). Registre
**append-only** : ajouter/changer un `type` = revue PR, comme tout contrat partagé.

C'est aussi la **face « données » du parcours cockpit ↔ modules**
([cockpits-dsi-parcours.md §6](pathname:///pivot-docs/specs/EPIC-shell-ux/cockpits-dsi-parcours)) :
chaque card est une **projection** d'un ou plusieurs de ces événements.

## Enveloppe `PivotEvent` (rappel ADR-025 §2)

Tout événement porte la même enveloppe ; seul `payload` est spécifique au `type`.

```typescript
interface PivotEvent<T> {
  eventId: string;        // UUID v4 — clé d'idempotence
  type: string;           // "{domaine}.{entité}.{action}"
  version: number;        // version du schéma de CE type — démarre à 1
  occurredAt: string;     // ISO-8601 UTC
  tenantId: string;       // obligatoire — tout événement est scopé tenant
  teamId?: string;        // si scopé équipe
  source: string;         // module natif ("risk") ou adaptateur ("adapter-openproject")
  correlationId: string;  // fédère un flux métier de bout en bout
  causationId?: string;   // eventId de la cause directe
  payload: T;             // identifiants/contexte — jamais une copie d'un contenu sensible
  signature: string;      // Ed25519
}
```

Les sections par domaine ne décrivent donc que **`type` · `version` · `payload`**, plus les
émetteurs, consommateurs et cards.

## Conventions

- **Nommage** : `type = {domaine}.{entité}.{action}` ; topic JMS `{domaine}.events.{type}` ; file
  consommateur `Consumer.{module}.{domaine}.events.{pattern}`.
- **Payload minimisé** : des **références logiques** (`projectRef`, `teamRef`…), jamais une FK
  inter-modules ([ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture)) ni le contenu
  intégral d'une donnée classifiée sensible (ADR-025 §2, US42.5.4).
- **Livraison** : at-least-once, consommateurs **idempotents** (dédup sur `eventId`) ; ordre garanti
  seulement par `JMSXGroupID` (= `tenantId`, ou `tenantId:projectRef` si besoin).
- **Coexistence natif/adaptateur** (ADR-009 §5) : un adaptateur qui produit un événement équivalent à
  un module natif **doit** émettre le **même `type` et la même forme de `payload`** — un consommateur
  ne distingue jamais la provenance.
- **Versionnement** : additif = pas de bump ; cassant = bump + double publication sur 2 sprints min.

## Le chemin de la donnée : événement → projection → card

Une card **ne s'abonne pas** aux événements bruts dans le navigateur. Le chemin est :

```text
Module A  ──(JMS bus, PivotEvent)──▶  Module/consommateur maintient une PROJECTION
                                          │
Cockpit (REST) ◀── lit la projection ─────┘
     │
     └──(STOMP relais navigateur)──▶  rafraîchit la card en direct
```

- Le **bus JMS** (`:61616`) transporte l'événement backend-à-backend et alimente une **projection**
  (vue agrégée durable) côté module ou cockpit.
- La card lit cette **projection** en REST (valeur, tendance).
- Le **relais STOMP** (`:61613`, déjà câblé EN07.3) pousse un *nudge* au navigateur pour rafraîchir la
  card en direct — l'usage « futurs widgets cockpit » prévu par ADR-025 §1.

## Catalogue par domaine

| Domaine | Fichier | Modules |
| --- | --- | --- |
| Cœur / plateforme | [core.md](core.md) | activation modules, tenant, auth/IAM, santé |
| Pilotage | [pilotage.md](pilotage.md) | projet, roadmap, jalon, portefeuille, budget, OKR, tâche |
| Risques | [risk.md](risk.md) | cycle de vie du risque (E21) |
| Agilité | [agilite.md](agilite.md) | sprint, standup, poker, rétro, capacity |
| Collaboratif | [collaboratif.md](collaboratif.md) | whiteboard, session live, forms, quiz |
| Sécurité | [securite.md](securite.md) | scan, vulnérabilité, incident, posture, PCA/PRA |

**Consommateurs transverses** (pas de domaine propre) :

- **Workflows & Automatisation** (E29) — s'abonne à **n'importe quel** `type` comme déclencheur
  (F29.2) ; peut émettre `automatisation.workflow.completed`.
- **Cockpit / télémétrie** (EN51.6) — consomme les événements d'usage (`collaboratif.*`, `agilite.*`)
  pour alimenter les cards d'adoption.
- **SMI / pilotage de l'innovation** (E38) — consomme `forms.form.submitted` (F38.15), etc.

## Index maître

| `type` | v | Émis par | Consommé par | Cards alimentées |
| --- | :--: | --- | --- | --- |
| `core.module.activated` | 1 | core (E03) | cockpit, workflows | Activation des domaines |
| `core.module.deactivated` | 1 | core (E03) | cockpit, workflows | Activation des domaines |
| `core.tenant.created` | 1 | core (E06) | cockpit | — (gouvernance) |
| `core.tenant.deactivated` | 1 | core (E06) | cockpit, tous modules | — (gouvernance) |
| `core.health.changed` | 1 | core (E04) / adaptateurs | cockpit | Bandeau santé instance |
| `auth.session.started` | 1 | core (E01) | cockpit (projection) | Identités & sessions |
| `auth.session.revoked` | 1 | core (E01) | cockpit (projection) | Identités & sessions |
| `auth.user.role_changed` | 1 | core (E06) | cockpit, audit | Identités & sessions |
| `pilotage.project.created` | 1 | pilotage (E23) | risk, cockpit | Santé du portefeuille |
| `pilotage.project.archived` | 1 | pilotage (E23) | risk, cockpit | Santé du portefeuille |
| `pilotage.project.status_changed` | 1 | pilotage (E23) | risk, cockpit | Santé du portefeuille |
| `pilotage.portfolio.weather_changed` | 1 | pilotage (E23) | cockpit | Santé du portefeuille |
| `pilotage.milestone.reached` | 1 | pilotage (E22) | cockpit | Roadmap |
| `pilotage.milestone.missed` | 1 | pilotage (E22) | risk, cockpit | Roadmap · Santé du portefeuille |
| `pilotage.roadmap.published` | 1 | pilotage (E22) | cockpit | Roadmap |
| `pilotage.task.completed` | 1 | pilotage (E22) | risk, cockpit | Santé du portefeuille |
| `pilotage.budget.alert` | 1 | pilotage (E26) | risk, cockpit | Budget / coût SI |
| `pilotage.okr.updated` | 1 | pilotage (E27) | cockpit | (OKR, futur) |
| `pilotage.contract.due` | 1 | pilotage (E25) | risk, cockpit | (Achats, futur) |
| `risk.raised` | 1 | risk (E21) | cockpit, workflows | Risques projet & portefeuille |
| `risk.threshold.exceeded` | 1 | risk (E21) | cockpit, workflows | Risques projet & portefeuille |
| `risk.mitigation.due` | 1 | risk (E21) | cockpit | Risques projet & portefeuille |
| `risk.closed` | 1 | risk (E21) | cockpit | Risques projet & portefeuille |
| `agilite.sprint.closed` | 1 | agilité | risk, cockpit/télémétrie | Vélocité |
| `agilite.standup.completed` | 1 | agilité (E10) | cockpit/télémétrie | Régularité des standups |
| `agilite.capacity.updated` | 1 | agilité (E11) | cockpit | Capacity |
| `agilite.poker.session.closed` | 1 | agilité (E09) | cockpit/télémétrie | (Delivery) |
| `agilite.retro.closed` | 1 | agilité (E20) | cockpit/télémétrie | (Adoption) |
| `collaboratif.whiteboard.session.ended` | 1 | collaboratif (E30) | télémétrie (EN51.6) | Usage whiteboard / live / quiz |
| `collaboratif.session.live.ended` | 1 | collaboratif (E19) | télémétrie | Usage whiteboard / live / quiz |
| `collaboratif.quiz.completed` | 1 | collaboratif | télémétrie | Usage whiteboard / live / quiz |
| `forms.form.submitted` | 1 | forms (E42) / adaptateur | workflows, SMI, télémétrie | (Adoption forms) |
| `securite.scan.completed` | 1 | sécurité (E51.8/E05) | cockpit | Correctifs de sécurité en attente |
| `securite.vulnerability.detected` | 1 | sécurité (E43) | cockpit, workflows | Correctifs · Posture de sécurité |
| `securite.incident.raised` | 1 | sécurité (E43) | cockpit, workflows | Alertes SOC & réponse |
| `securite.posture.changed` | 1 | sécurité (E43) | cockpit | Posture de sécurité |
| `securite.pca.tested` | 1 | sécurité (E43) | cockpit | État PCA / PRA |
| `automatisation.workflow.completed` | 1 | workflows (E29) | cockpit, audit | (Automatisation) |
