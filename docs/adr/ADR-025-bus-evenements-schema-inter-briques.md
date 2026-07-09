# ADR-025 — Bus d'événements et schéma d'événements inter-briques

**Date :** 2026-07-09
**Statut :** Proposé
**Décideurs :** Architecte plateforme, Lead intégration
**Contexte technique :** organisation `PIVOT-PLATFORM` — bloquant E21/E29/E42/E43

---

## Contexte

ADR-009 §4 engage le contrat d'intégration à six capacités et sa capacité « Événements » :
« Émettre/consommer sur le bus (« tâche finie », « décision prise ») », avec la signature
`toEvents(hook: UpstreamWebhook): PivotEvent[]` / `onEvent?(evt: PivotEvent): Promise<void>`
— sans jamais définir ce qu'est concrètement un `PivotEvent`, ni ce qu'est « le bus ». L'enabler
`EN28.4 — Bus d'événements` (`EPIC-integration-open-source`) porte ce manque : bus interne,
schéma normalisé, événements **signés et idempotents** — statut ⬜ À faire. Cette ADR le tranche.

Quatre epics sont bloqués tant que cette décision n'existe pas :

| Epic | Ce qu'il attend concrètement du bus |
|---|---|
| **E21 — Gestion des risques** | F21.4 « Boucle vivante » : consomme `task.completed`, `budget.alert`, `sprint.closed` émis par d'autres domaines et émet `risk.raised`, `risk.threshold.exceeded`, `risk.mitigation.due` (EN21.3). F21.9/US21.9.1 corrèle un risque à son projet par un `project_ref` **logique**, jamais une FK inter-modules (ADR-006) — alimenté par la consommation de `project.created`/`project.archived`. Un `project_ref` inconnu ne doit jamais faire échouer ni rejeter le traitement (« projet non résolu »), ce qui suppose une consommation asynchrone et durable, pas un appel synchrone qui échouerait. |
| **E29 — Workflows & Automatisation** | F29.2 (déclencheurs : webhooks entrants, planification), F29.4 (rejeu des exécutions, gestion d'erreurs structurée) : c'est *le* consommateur générique multi-source de la plateforme — un workflow s'abonne à n'importe quel événement PIVOT (natif ou adaptateur) comme déclencheur. Sans schéma d'événement stable et versionné, aucun déclencheur no-code n'est constructible de façon fiable. |
| **E42 — Pivot Forms** | US42.5.4 (Critical) : chaque soumission publie `form.submitted` ; plusieurs consommateurs (Workflow, SMI F38.15) le reçoivent **indépendamment**, sans couplage à Forms ; une panne temporaire du bus ne doit **jamais** perdre l'événement (rejeu à rétablissement) ; le payload ne transporte pas le contenu complet d'une réponse si le formulaire est classifié sensible. Ceci exige : durabilité, at-least-once, et un principe de minimisation du payload. |
| **E43 — Sécurité & Zero Trust** | EN43.10 (résilience) dépend explicitement d'EN28.4 : le bus asynchrone est le mécanisme de découplage qui évite qu'une panne en cascade d'un module ne devienne un incident plateforme. EN43.8 (observabilité/SIEM) exige que « les événements du bus soient inclus dans la traçabilité distribuée ». Le modèle de menace d'E43 exige par ailleurs des événements **signés** (contrer la usurpation d'un module compromis) — direction déjà actée par le critère de complétion d'EN28.4. |

Infrastructure déjà en place (`EN07.3 — ActiveMQ persistence KahaDB`, Done) : un broker ActiveMQ
Classic unique (`pivot-core/docker/activemq/activemq.xml`), KahaDB persistant, isolé sur le
réseau `pivot-net-data` (jamais exposé), avec :
- Un connecteur STOMP (`:61613`) déjà relayé additivement dans chaque module-core
  (`enableStompBrokerRelay()`, scope `/topic/{domaine}.`) — but déjà documenté dans le code
  (`WebSocketConfig` de `pivot-collaboratif-core`) : « the cross-module-core domain event bus
  […] ; nothing publishes on it yet ». C'est le trou que cette ADR comble.
- Un connecteur OpenWire (`:61616`), non encore utilisé par aucun module-core.
- Une politique de Dead Letter Queue par domaine (`DLQ.pilotage`, `DLQ.agilite`,
  `DLQ.collaboratif`) sur des topics à hiérarchie par points (`pilotage.>`, etc. — la convention
  slash `/topic/x/y` ne matche pas les wildcards ActiveMQ, vérifié empiriquement par EN07.3).

Cette ADR ne réinvente donc pas un transport : elle décide comment l'**utiliser** pour du
pub/sub backend-à-backend, ce que EN07.3 n'a fait qu'amorcer côté plomberie WebSocket.

## Décision

### 1. Transport : réutiliser le broker ActiveMQ existant (EN07.3), sur un chemin différent de celui du relais WebSocket

**Deux usages distincts du même broker, jamais confondus :**

| Usage | Transport | Objectif | Statut |
|---|---|---|---|
| Diffusion navigateur temps réel (whiteboard, futurs widgets cockpit) | STOMP `:61613`, relayé via `enableStompBrokerRelay()` dans chaque module-core | Pousser un événement déjà publié vers un navigateur abonné (UI live) | Câblé par EN07.3, personne ne publie encore dessus |
| **Bus d'événements inter-briques (cette ADR)** | **JMS/OpenWire `:61616`**, `spring-boot-starter-activemq` (`ActiveMQConnectionFactory` + `JmsTemplate`/`@JmsListener`) | Publication/consommation backend-à-backend, découplée, durable | À implémenter (EN28.4) |

**Pourquoi ne pas réutiliser le relais STOMP existant pour le bus inter-briques :** ce relais est
une abstraction Spring conçue pour la diffusion vers des sessions WebSocket navigateur
(`SimpMessagingTemplate` ↔ session STOMP réelle) — l'utiliser pour un consommateur backend sans
navigateur détourne son modèle de programmation (pas d'ack-mode transacté idiomatique, pas de
redelivery/DLQ JMS natifs, pas de `@JmsListener`). Spring JMS (`JmsTemplate`/`@JmsListener`) est
le client idiomatique côté backend pour ce type de pub/sub — et il pointe vers le **même**
broker, la **même** persistance KahaDB, la **même** politique DLQ par domaine qu'EN07.3, sans
ouvrir de deuxième système de messagerie. Le relais WebSocket par domaine reste inchangé, pour son
usage original (diffusion navigateur future).

**Convention de nommage des destinations** — cohérente avec la hiérarchie par points déjà actée
par EN07.3 (`{domaine}.>`) :

```text
Topic publié   : {domaine}.events.{type}          ex. forms.events.form.submitted
                                                        risk.events.risk.raised
                                                        pilotage.events.project.created
```

Fan-out multi-consommateur **et** montée en charge horizontale du même module sans double
traitement : **Virtual Topics ActiveMQ** (idiome standard d'ActiveMQ Classic pour ce problème —
pas de souscriptions partagées JMS 2.0 sur cette version du broker). Chaque module consommateur
déclare sa propre file durable auto-provisionnée :

```text
File consommateur : Consumer.{moduleConsommateur}.{domaine}.events.{pattern}
                     ex. Consumer.risk.pilotage.events.project.>
                     ex. Consumer.workflows.forms.events.form.submitted
```

Chaque instance horizontale d'un même module partage la **même** file nommée (traitement une
seule fois par instance qui la consomme) ; deux modules différents obtiennent chacun leur **propre**
file, alimentée indépendamment par la même publication (US42.5.4 : « chaque consommateur le
reçoit indépendamment, pas de couplage »). La persistance KahaDB garantit qu'un consommateur
arrêté rattrape ses messages à la reconnexion (US42.5.4 : « panne temporaire du bus […] rejoué
dès rétablissement — pas de perte silencieuse »).

**Configuration broker à étendre (EN28.4, suite directe d'EN07.3) :** `activemq.xml` ne connaît
aujourd'hui que 3 domaines (`pilotage`, `agilite`, `collaboratif`) pour la politique de DLQ ;
le `policyEntry topic=">"` générique couvre les nouveaux domaines (`risk`, `automatisation`,
`forms`, `securite`) en attendant qu'une entrée dédiée soit ajoutée à l'instanciation de chaque
nouveau repo module — même geste qu'EN07.3, à reproduire brique par brique (cf. Conséquences).

### 2. Enveloppe `PivotEvent` — schéma normalisé

```typescript
export interface PivotEvent<T = unknown> {
  eventId: string;        // UUID v4 — clé de déduplication à la consommation (idempotence)
  type: string;           // "{domaine}.{entité}.{action}", ex. "forms.form.submitted", "risk.raised"
  version: number;        // version du schéma de CE `type` précis — démarre à 1
  occurredAt: string;     // ISO-8601 UTC — horodatage métier posé par le publieur
  tenantId: string;       // public.tenants.id (ADR-006) — obligatoire, tout événement est scopé tenant
  teamId?: string;        // public.teams.id — présent si l'événement est scopé équipe
  source: string;         // id du module natif ("forms", "risk"…) ou de l'adaptateur (PivotAdapter.id, ADR-009)
  correlationId: string;  // fédère tous les événements/commandes d'un même flux métier de bout en bout
  causationId?: string;   // eventId de l'événement/commande qui a directement causé celui-ci
  payload: T;             // spécifique au `type`+`version` — identifiants/contexte, jamais une copie
                          // intégrale d'un contenu classifié sensible (cf. US42.5.4 Security AC)
  signature: string;      // Ed25519, base64 — signé par la clé privée de `source`, cf. §4
}
```

Côté Java, `pivot-core-starter` expose le miroir exact — `fr.pivot.core.events.PivotEvent<T>`
(record), aux côtés de `fr.pivot.core.modules.PivotModule` déjà présent dans ce package. Aucun
module ne resignifie ce type : c'est un contrat partagé au même titre que `PivotModule`
(changement = hard block Gate 4, comme tout changement de contrat de `pivot-core-starter`,
ADR-006).

`correlationId` s'aligne sur (ou porte) l'identifiant de trace OpenTelemetry du flux qui a
déclenché la publication, quand il existe — condition posée par EN43.8 (« Événements du bus
inclus dans la traçabilité distribuée »).

### 3. Sémantique de livraison

- **At-least-once**, jamais exactly-once : la persistance KahaDB + la file durable par
  consommateur garantissent qu'aucun message publié n'est perdu, mais une redelivery après
  crash/reconnexion est possible. **Tout consommateur est idempotent** — dédoublonnage obligatoire
  sur `eventId` (table locale `processed_event_ids` ou équivalent), jamais une hypothèse de
  réception unique.
- **Ordre garanti uniquement par groupe de messages** (`JMSXGroupID`), jamais globalement. Le
  publieur pose `JMSXGroupID = tenantId` (ou `tenantId:project_ref` quand un ordre plus fin est
  nécessaire — ex. les événements `risk.*` corrélés à un même projet, F21.9). ActiveMQ garantit
  qu'un même groupe est toujours traité par la même instance consommatrice, dans l'ordre
  d'émission ; deux groupes différents n'ont **aucune** garantie d'ordre relatif.
- **Rejet** : un événement dont la signature ne vérifie pas, ou dont un champ obligatoire de
  l'enveloppe est absent, part directement en DLQ du domaine du `source` — jamais traité, jamais
  silencieusement ignoré (cohérent avec EN43.8/SIEM : ces rejets sont eux-mêmes journalisés et
  alertables).

### 4. Publication/consommation — modules natifs

```java
// Publication (ex. dans pivot-forms-core, EN42.1)
pivotEventPublisher.publish(
    PivotEvent.of("forms.form.submitted", tenantId, teamId, payload)
);
// → topic JMS "forms.events.form.submitted", JMSXGroupID = tenantId, signé par la clé privée "forms"

// Consommation (ex. dans pivot-risk-core, EN21.3)
@JmsListener(destination = "Consumer.risk.pilotage.events.project.>")
void onProjectEvent(PivotEvent<ProjectPayload> event) { ... }
```

`PivotEventPublisher`/`PivotEventListener` (wrappers `JmsTemplate`/`@JmsListener` fournis par
`pivot-core-starter`, package `fr.pivot.core.events`) portent la signature, l'horodatage,
l'`eventId`, et le posage du `JMSXGroupID` — un module ne construit jamais une enveloppe à la
main, pas plus qu'il n'implémente `PivotModule` à la main (même précédent architectural).

### 5. Pont adaptateur ↔ bus (ADR-009 §4)

**Un seul bus, pas deux.** Un adaptateur tiers (mode « Adaptateur », ADR-009 §3 — API/webhook
uniquement, jamais de liaison de code) tourne comme un **service PIVOT à part entière** sur
`pivot-net-data` (le broker n'est joignable que depuis ce réseau interne, jamais exposé — même
posture qu'EN07.3) : il reçoit le webhook brut de l'outil amont sur un endpoint HTTPS contrôlé par
PIVOT, puis :

- **Entrant (`toEvents`)** : `toEvents(hook: UpstreamWebhook): PivotEvent[]` **est** la frontière
  de traduction. Le payload brut de l'outil amont ne touche jamais le bus — l'adaptateur le
  convertit en un ou plusieurs `PivotEvent` conformes au catalogue (§6), signe avec **sa propre**
  clé privée (`source = id de l'adaptateur`, ex. `"adapter-openproject"`), puis publie exactement
  comme un module natif (`PivotEventPublisher`, même client JMS, même convention de nommage).
  **Règle de coexistence (ADR-009 §5) :** quand un adaptateur produit un événement fonctionnellement
  équivalent à un module natif (ex. adaptateur Formbricks vs `pivot-forms-core` natif, tous deux
  émettant l'équivalent de « formulaire soumis »), `toEvents()` **doit** produire le même `type` et
  la même forme de `payload` que le module natif correspondant, à `version` identique — un
  consommateur (Workflow, SMI) ne doit jamais avoir à distinguer la provenance native/adaptateur
  d'un événement pour le traiter.
- **Sortant (`onEvent`)** : l'adaptateur s'abonne comme tout consommateur (sa propre file durable
  `Consumer.{adapter-id}.{domaine}.events.{pattern}`), reçoit un `PivotEvent`, et `onEvent()` est
  la frontière de traduction inverse — appel API/webhook vers l'outil amont. Aucun outil amont ne
  se connecte jamais directement au broker.

### 6. Versionnement du schéma

- Chaque `type` porte son propre `version`, indépendant des autres types.
- Changement additif (nouveau champ optionnel de `payload`) : pas de bump de version.
- Changement cassant (champ renommé/supprimé, sémantique changée) : bump de version, ancien et
  nouveau `type`+`version` publiés en parallèle pendant une fenêtre de dépréciation documentée
  (2 sprints minimum) le temps que les consommateurs migrent.
- **Catalogue d'événements** : registre append-only dans `pivot-docs/docs/events/` (un fichier par
  `type`, forme du payload, version courante, modules émetteurs/consommateurs connus) — source de
  vérité, à l'image du modèle d'entités du catalogue (ADR-023). Ajout/changement d'un `type` =
  revue PR, même logique que tout changement de contrat partagé.

## Alternatives écartées

- **Kafka** : plus puissant sur le papier (partitions natives, rétention longue), mais introduit
  un deuxième système de messagerie à opérer alors qu'ActiveMQ est déjà déployé, persisté et
  DLQ-isolé par domaine (EN07.3) — coût d'exploitation et de compétence non justifié à l'échelle
  actuelle de la plateforme. À revisiter explicitement si le débit d'E29 (exécutions de workflow,
  IoT) dépasse la capacité du broker (cf. Points ouverts).
- **RabbitMQ** : mêmes raisons — second broker, aucune réutilisation de l'investissement EN07.3.
- **Redis Streams / pub-sub** : Redis est déjà déployé, mais uniquement provisionné comme cache
  TTL (statut module, 60 s) — le pub-sub Redis nu est fire-and-forget, non durable, et échouerait
  directement l'AC « pas de perte silencieuse d'événement » d'US42.5.4. Redis Streams apporterait
  une durabilité comparable mais dupliquerait un second modèle de rétention/DLQ à côté de celui
  déjà écrit pour KahaDB, sans bénéfice net.
- **Appels REST synchrones inter-modules** : déjà écarté implicitement par ADR-009 (« pas de
  liaison de code ») et par l'architecture de fault isolation (`platform-overview.md` : module KO
  → 503 isolé) — un appel synchrone entre modules romprait cette isolation et empêcherait
  précisément le découplage que réclame EN43.10.
- **Réutiliser `ApplicationEventPublisher` (Spring) à travers les JVMs** : techniquement impossible
  — c'est un mécanisme intra-process (déjà utilisé ainsi dans `pivot-core`, ex.
  `NotificationCreatedEvent`/`NotificationPushListener`, pour découpler la création d'une
  notification de son push STOMP navigateur **au sein d'une même JVM**) ; il ne franchit jamais
  une frontière de processus et ne peut donc pas servir de bus inter-modules.

## Conséquences

**Positif**
- Aucun nouveau système de messagerie : réutilisation directe de l'investissement EN07.3
  (broker, KahaDB, DLQ par domaine, réseau isolé `pivot-net-data`).
- Débloque immédiatement EN21.3 (risque), US42.5.4 (Critical, forms), et les déclencheurs
  génériques d'E29 sur un schéma d'événement stable.
- `PivotEvent` versionné + signé + idempotent répond terme à terme aux critères de complétion
  d'EN28.4 et à la dépendance explicite d'EN43.10/EN43.8.
- Un seul bus pour natif et adaptateurs — aucune divergence de modèle entre les deux, cohérent
  avec le principe de coexistence d'ADR-009 §5.

**Négatif**
- ActiveMQ Classic n'a pas de souscriptions partagées JMS 2.0 natives — le pattern Virtual Topic
  ajoute une convention de nommage à respecter manuellement (pas de vérification automatique
  qu'une file consommateur suit bien la convention `Consumer.{module}.{domaine}.events.{pattern}`).
- Chaque nouveau domaine (risk, automatisation, forms, securite) nécessite une extension manuelle
  d'`activemq.xml` (policyEntry DLQ dédiée) à son bootstrap — même geste qu'EN07.3, non encore
  automatisé dans les templates `pivot-xxx-core` (EN17.5).
- Aucune garantie d'ordre au-delà d'un même `JMSXGroupID` — un consommateur qui a besoin d'un
  ordre plus large que `tenantId`/`project_ref` doit le reconstruire lui-même.
- Distribution des clés de signature Ed25519 par module/adaptateur reste manuelle tant
  qu'OpenBao (EN43.6) n'est pas en place.

**Interdit**
- Publier un `PivotEvent` sans passer par `PivotEventPublisher` (pas d'enveloppe à la main, pas de
  publication directe sur le broker hors de la convention de nommage).
- Consommer sans déduplication par `eventId` — un consommateur non idempotent est un défaut, pas
  une variante acceptable.
- Un adaptateur qui publie directement le payload brut de l'outil amont sans passer par
  `toEvents()` — viole la frontière de traduction (ADR-009 §3, « pas de liaison de code » implique
  aussi « pas de fuite de format amont sur le bus interne »).
- Un nouveau module-core mis en production sans entrée DLQ dédiée dans `activemq.xml`.

## Points ouverts

- Outillage d'application du catalogue `pivot-docs/docs/events/` (lint CI vérifiant qu'un `type`
  utilisé dans le code correspond à une entrée déclarée) — non tranché ici.
- Gestion des clés Ed25519 : secret d'environnement par module en interim, migration vers OpenBao
  dès EN43.6 livré — mécanisme de rotation non détaillé.
- Chiffrement transport module ↔ broker (mTLS) dépend d'EN43.3 (service mesh, non construit) ;
  en attendant, l'isolation réseau `pivot-net-data` reste le seul contrôle, comme pour EN07.3.
- Capacité d'ActiveMQ Classic face au volume potentiel d'E29 (exécutions de workflow à grande
  échelle, déclencheurs IoT) non chiffrée — à revisiter si le broker devient un goulot
  d'étranglement mesuré.
- Automatisation de l'extension `activemq.xml` (DLQ + Virtual Topic par domaine) à l'instanciation
  d'un nouveau repo module — opportunité pour les templates EN17.5/EN17.6, non intégrée ici.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-09 | Décision initiale |
