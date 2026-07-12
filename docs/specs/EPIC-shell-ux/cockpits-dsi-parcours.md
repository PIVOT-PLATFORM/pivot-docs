---
title: Cockpits DSI — affichage des cards & parcours utilisateurs
sidebar_position: 12
description: Comment une card s'affiche (anatomie, six états, rendu par classe d'identité, densité, règle des 3 s) et le parcours utilisateur de chacun des 7 cockpits.
---

Complète la [bijection](cockpits-dsi-bijection.md) et les [conseils UX/UI](cockpits-dsi.md) par le
**rendu concret** : *comment* une card s'affiche, et *quel parcours* suit l'utilisateur de chacun des
7 cockpits. Sert de cadrage aux enablers
[EN51.1](pathname:///pivot-docs/backlog/EPIC-cockpits/) (composant Card & états),
EN51.2 (moteur de composition) et EN51.4 (shell / hôte).

## 1. Anatomie d'une card

Une card est un bloc autonome, scannable en une lecture. Cinq zones, toujours dans le même ordre :

```text
┌──────────────────────────────────────────────┐
│ TITRE                              🟢🟡🔴     │  ← titre + pastille de sensibilité
│                                                │
│   1 240        ▲ +12 %                         │  ← valeur principale + tendance
│   sessions actives     vs 30 j                 │
│                                                │
│   ▁▂▄▆█▆▄  (sparkline optionnelle)             │  ← mini-visualisation
│ ─────────────────────────────────────────────  │
│ Voir le détail →                    [état]     │  ← action contextuelle + badge d'état
└──────────────────────────────────────────────┘
```

| Zone | Rôle |
| --- | --- |
| **Titre** | Ce que mesure la card, en langage métier. |
| **Pastille sensibilité** | 🟢 Standard · 🟡 Restreint · 🔴 Sensible — visible au survol/focus, pilote le rendu externe. |
| **Valeur principale** | Le KPI, en chiffres tabulaires, lisible à 2 m. |
| **Tendance** | ▲/▼ + variation sur une période, couleur sémantique (≠ accent). |
| **Action contextuelle** | Un seul verbe : *Voir le détail*, *Ouvrir dans l'ITSM*, *Activer*… Action destructrice → confirmation. |
| **Badge d'état** | L'état d'affichage courant (§2). |

## 2. Les six états d'affichage

Toute card gère ces six états — c'est ce qui permet à un cockpit d'être composable **même quand les
modules sont WIP** (cf. EN51.1).

| État | Quand | Ce qui s'affiche |
| --- | --- | --- |
| `loading` | Chargement en cours | Squelette (skeleton), `aria-busy`. |
| `ready` | Donnée disponible | Valeur + tendance + action. |
| `empty` | Source prête mais vide (1er lancement) | Message d'amorçage actionnable (« Aucune roadmap — en créer une »). |
| `error` | Échec après réessais | Message + bouton *Réessayer* ; **jamais** de valeur périmée ni de faux « OK ». |
| `no-permission` | Rôle non autorisé | Card grisée/verrouillée ou retirée selon le rôle (RBAC). |
| **`module-wip`** | Module porteur non livré/activé | Placeholder « Bientôt » non-cliquable (`aria-disabled`) — informatif, non-bloquant. |

```text
 ready              empty              error              module-wip
┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
│ Vélocité   │    │ Roadmap    │    │ SLA        │    │ Budget SI  │
│  42 pts ▲  │    │            │    │    ⚠       │    │   ⏳       │
│ ▁▂▄▆█      │    │ Aucune —   │    │ Erreur     │    │ Bientôt    │
│ Détail →   │    │ + Créer    │    │ Réessayer  │    │ (module    │
│            │    │            │    │            │    │  WIP)      │
└────────────┘    └────────────┘    └────────────┘    └────────────┘
```

## 3. Rendu selon la classe d'identité

La même card ne s'affiche pas pareil selon **qui** regarde (cf.
[matrice de sensibilité](cockpits-dsi-bijection.md#catalogue-de-cards--matrice-de-sensibilité) et
[ADR-028](pathname:///pivot-docs/adr/ADR-028-acces-identites-externes)). Le moteur (EN51.2) + le
filtre (EN51.5) choisissent un **mode de rendu** :

| Mode | Symbole | Rendu visuel |
| --- | :---: | --- |
| Complet | ● | Card normale, valeur + drill-down + action (selon RBAC). |
| Scope engagement | ◑ | Card normale **+ badge « Scope : \<projet\> »** ; ne montre que le périmètre du contrat. |
| Agrégé | ◐ | Valeur **agrégée/anonymisée** uniquement, pas de drill-down nominatif, pas de détail sécurité. |
| Masqué | ○ | Card **verrouillée** : icône cadenas + « Masqué — donnée sensible », aucune valeur transmise. |

**Exemple — la même card `ROI vs SaaS` (🔴)** :

```text
🏛 Interne (●)            🏛🔗 Externalisé (○)      🔗 Externe pur (○)
┌────────────┐          ┌────────────┐          ┌────────────┐
│ ROI vs SaaS│          │ ROI vs SaaS│          │ ROI vs SaaS│
│  + 380 k€  │          │    🔒       │          │    🔒       │
│ ▲ +8 %     │          │ Masqué —   │          │ Masqué —   │
│ Détail →   │          │ sensible   │          │ sensible   │
└────────────┘          └────────────┘          └────────────┘
```

**Exemple — `Vélocité` (🟢, opérationnelle)** : interne ● complet, externe ◑ limité à sa squad — jamais
d'individuel (agrégat équipe, cohérence RGPD). **`Files de support` (🟡)** : externe ◐ agrégé (volumes,
SLA), le **contenu des tickets reste dans l'ITSM** du tenant (EN51.10).

## 4. Densité & disposition — la règle des 3 secondes

Le cockpit répond d'abord à **« est-ce que tout va bien ? »**, avant tout détail. Trois strates de
haut en bas :

```text
┌─ COCKPIT ─────────────────────────────────────────────  [confortable | compact] ┐
│                                                                                   │
│  ▟ BANDEAU DE STATUT — santé instance · incidents · alertes conformité · sécu    │  ← 3 s : ça va ?
│    ● Instance OK      ▲ 0 incident      ⚠ 2 correctifs sécu en attente            │
│                                                                                   │
│  KPI CLÉS (grille de cards)                                                        │  ← les cards
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                             │    du cockpit
│  │ card A   │ │ card B   │ │ card C   │ │ card D   │                             │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                             │
│                                                                                   │
│  DRILL-DOWN (tableaux, listes détaillées, liens profonds)                         │  ← le détail
│  ▸ … à la demande                                                                 │
└───────────────────────────────────────────────────────────────────────────────── ┘
```

- **Bandeau de statut** : l'état « OK » doit être **aussi lisible** que l'état « alerte » (pas
  seulement un rouge qui saute aux yeux) — l'absence d'alarme est une information.
- **Densité** : *confortable* (par défaut) ou *compact* (plus de cards à l'écran, pour les profils qui
  aiment la donnée dense) — réglage utilisateur, persisté.
- **Personnalisation encadrée** : épingler / masquer / réordonner, **sans jamais** masquer une card de
  la couche transverse obligatoire (posture sécu, RGPD, RGAA, AGPL).

## 5. Parcours des 7 cockpits

Chaque cockpit est le **défaut** d'un archétype (assigné à l'onboarding ou inféré du tenant, cf.
bijection), sur profil d'organisation par défaut (EN18.10). Trame commune : **Qui → Déclencheur →
En 3 s → Cards → Drill-down → Action → Vue externe**.

### C1 · Gouvernance & Stratégie SI

- **Qui** : DSI, directeur de programme/portefeuille, responsable stratégie SI.
- **Déclencheur** : connexion — cockpit par défaut de l'archétype gouvernance.
- **En 3 s** : bandeau santé instance + alertes conformité ; « la trajectoire tient-elle ? ».
- **Cards** : Santé du portefeuille projets 🟡 · Roadmap d'adoption 🟡 · ROI vs SaaS 🔴 · Activation des
  domaines 🟡.
- **Drill-down** : budget/coût 🔴, staffing 🔴, détail portefeuille projet par projet.
- **Action** : **Activer un domaine** (confirmation explicite) — seule action de gouvernance courante.
- **Vue externe** (consultant) : ROI/budget/staffing 🔒 masqués ; roadmap/portefeuille ◐ agrégés au
  périmètre de mission.

### C2 · Delivery & Agilité

- **Qui** : Delivery Manager, Release Train Engineer, Scrum Master.
- **Déclencheur** : suivi de cadence d'une release/train.
- **En 3 s** : « est-ce qu'on livre ? » — santé de la cadence.
- **Cards** : Vélocité 🟢 · Régularité des standups 🟢 · Capacity 🟢 · Qualité de code / couverture 🟢
  — toutes **agrégat équipe**, jamais individuel (cohérence RGPD).
- **Drill-down** : releases / mises en production 🟡, historique par squad.
- **Action** : essentiellement consultation ; pas d'action destructrice.
- **Vue externe** (prestataire dev) : ◑ limité à **sa** squad / son lot de code.

### C3 · Architecture, Urbanisation & Données

- **Qui** : architecte d'entreprise, urbaniste SI, Chief Data Officer.
- **Déclencheur** : revue d'urbanisation / cohérence cible.
- **En 3 s** : « le SI et sa donnée sont-ils sous contrôle ? ».
- **Cards** : Cartographie applicative 🟡 · Dette d'urbanisation 🟡 · Catalogue & qualité des données
  🟡 · Conformité IA / AI Act 🟢.
- **Drill-down** : pipelines de données 🟡, contenu des données 🔴 **jamais** exposé.
- **Action** : consultation + navigation vers le module concerné.
- **Vue externe** : cartographie ◐ agrégée / scopée — le **patrimoine SI** n'est pas révélé hors mission.

### C4 · Exploitation & Services (Run)

- **Qui** : directeur de production, SRE, responsable support.
- **Déclencheur** : astreinte / supervision quotidienne.
- **En 3 s** : bandeau **santé instance** 🟢 + incidents en cours 🟡 — « ça tourne ? ».
- **Cards** : SLA / disponibilité 🟢 · Capacité / dimensionnement 🟢 · Files de support 🟡 · Changements
  en production 🟡.
- **Drill-down** : incidents et files **via le connecteur ITSM du tenant** (EN51.10) — agrégats ou lien
  profond.
- **Action** : **Ouvrir dans l'ITSM** (lien profond) ; le contenu des tickets reste dans l'ITSM.
- **Vue externe** (infogérant) : ◑ sur **son** périmètre d'exploitation contractuel ; données métier
  masquées.

### C5 · Sécurité & Continuité

- **Qui** : RSSI, analyste SOC, ingénieur sécurité.
- **Déclencheur** : revue de posture / alerte.
- **En 3 s** : bandeau **posture de sécurité** 🔴 + correctifs en attente 🔴 — « sommes-nous protégés ? ».
- **Cards** : Alertes SOC & réponse 🔴 · Risques SSI 🔴 · OIDC / IAM 🔴 · État PCA / PRA 🟡.
- **Drill-down** : détail des correctifs (source code-scanning, EN51.8), registre des risques SSI.
- **Action** : **Prioriser un correctif** ; jamais exécuté par un externe.
- **Vue externe** : tout 🔴 **masqué** ; un analyste SOC **externalisé** obtient un ◐ agrégé sans détail
  nominatif ; l'externe **pur** ne voit rien de la posture.

### C6 · Conformité, Qualité & Risques

- **Qui** : DPO, responsable conformité, auditeur (interne ou externe).
- **Déclencheur** : audit, échéance réglementaire, contrôle.
- **En 3 s** : « sommes-nous en règle ? » — RGPD, RGAA, AGPL.
- **Cards** : Conformité RGPD 🟡 · Accessibilité RGAA / WCAG 🟢 · Conformité licence AGPL 🟢 · Journal
  d'audit 🔴.
- **Drill-down** : dossier de preuve, journal d'audit filtré (EN51.7), export.
- **Action** : **Exporter le dossier de preuve**.
- **Vue externe** (auditeur / régulateur) : cas particulier — **lecture seule** du dossier de preuve,
  **scopé à la période auditée**, minimisation des données personnelles.

### C7 · Adoption, Métier & Changement

- **Qui** : responsable relation métier, responsable conduite du changement, formateur.
- **Déclencheur** : pilotage de l'adoption après déploiement.
- **En 3 s** : « est-ce adopté ? » — adoption globale 🟡.
- **Cards** : Usage whiteboard / live / quiz 🟡 · Adoption par direction métier 🟡 · Satisfaction (NPS)
  🟡 · Conduite du changement 🟢.
- **Drill-down** : formation (catalogue, complétion), usage par module (télémétrie EN51.6).
- **Action** : **Lancer une formation** / relancer une campagne d'adoption.
- **Vue externe** : ◐ agrégé, jamais de nominatif (usage anonymisé) ; verbatims NPS 🔴 masqués.

## 6. Parcours global — du cockpit aux modules

Une card **n'est pas** le module : le cockpit **supervise**, le module **fait le travail**. Le lien
entre les deux est déjà cadré par [ADR-008](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits)
(*« un cockpit est une composition de modules, orchestrée par le shell, alimentée par les modules via
le bus et les deep-links »*) et [ADR-009](pathname:///pivot-docs/adr/ADR-009-cadre-integration-open-source)
(cadre d'intégration). Deux sens de circulation :

- **Données — module → cockpit** : le module alimente la card via le **bus d'événements**
  ([ADR-025](pathname:///pivot-docs/adr/ADR-025-bus-evenements-schema-inter-briques)) et son **statut
  de santé**. La card est une **projection** ; **jamais de FK inter-modules**
  ([ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture)). Le contrat de chaque
  événement (payload, émetteurs, consommateurs, cards) est détaillé dans le
  [catalogue d'événements](pathname:///pivot-docs/events/).
- **Navigation — cockpit → module** : l'action/drill-down d'une card est un **deep-link** qui ouvre le
  module sur le bon contexte (`?project={ref}`), en propageant l'identité (SSO).

### Le cockpit ne connaît pas la nature du module

Qu'un module soit développé par PIVOT, intégré depuis l'open source, ou externe au tenant, il se
branche au cockpit par le **même contrat à six capacités** (ADR-009 §4) : **Identité** (SSO) ·
**Entités** (catalogue) · **Événements** (bus → *donnée de la card*) · **Santé** (→ *bandeau*) ·
**Liens profonds** (→ *drill-down*) · **Thème** (tokens). La card est donc **agnostique au mode
d'intégration** :

| Type de module | La card est alimentée par | Le drill-down / l'action ouvre… | Exemples |
| --- | --- | --- | --- |
| **Natif PIVOT** (`pivot-*-core/ui`) | événements du module sur le bus | une **route Angular interne**, dans le même shell | Roadmap (E22), Whiteboard, Planning poker |
| **Adaptateur OSS** (ADR-009) | `adapter.toEvents()` / `adapter.health()` | un **deep-link** (embarqué ou SSO) via `adapter.deepLink()` | OpenProject (PPM), Plane (agile), Formbricks |
| **Lien (SSO + widget statut)** | `health()` — un simple widget de statut | **SSO + lien profond** vers l'outil tel quel | Keycloak, BookStack |
| **Externe / ITSM du tenant** (EN51.10) | **API agrégats** du tenant | un **`href` profond** vers l'ITSM (ServiceNow…) | Files de support, incidents |

![Parcours cockpit vers modules](diagrams/cockpits-dsi-parcours-modules.png)

> Source PlantUML : [`diagrams/cockpits-dsi-parcours-modules.puml`](diagrams/cockpits-dsi-parcours-modules.puml) — le PNG est généré en CI.

### Aller-retour & continuité

- **L'identité voyage avec le deep-link** : la classe d'identité (interne/externe,
  [ADR-028](pathname:///pivot-docs/adr/ADR-028-acces-identites-externes)) est portée par le SSO, donc
  un externe retrouve **dans le module** les mêmes restrictions (scoping, masquage) que sur la card —
  la sécurité n'est pas seulement au niveau de la card.
- **Activation (E03)** : module désactivé ou WIP → card en état `module-wip`, aucune navigation ;
  module activé → card *live* + deep-link ouvert. C'est le même interrupteur qui compose le cockpit.
- **Cohérence visuelle** : tout module (natif ou intégré) respecte les tokens du design-system → la
  transition cockpit → module ne casse pas le fil.
- **Recomposition** : une card peut agréger **plusieurs** modules (ex. *Santé du portefeuille* =
  pilotage + risques) et un module alimente **plusieurs** cockpits — la composition est orchestrée par
  le shell (EN51.2), jamais possédée par un module (ADR-008 §3).

## 7. Ce que ce cadrage fige (et ce qui reste à affiner)

- **Figé** : l'anatomie, les 6 états, les 4 modes de rendu par identité, la règle des 3 s — ce sont
  les contrats des enablers EN51.1/51.2/51.4/51.5.
- **À affiner card par card** (travail en cours) : le KPI exact et la tendance de chaque card, la
  sparkline pertinente, le libellé métier définitif, et l'action contextuelle précise — à valider au
  fil de la construction, en cohérence avec le [catalogue](cockpits-dsi-bijection.md).
