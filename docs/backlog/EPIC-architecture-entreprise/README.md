# E50 — Architecture d'entreprise & urbanisation

## Objectif

Module-EPIC issu du benchmark « Organisations DSI dans les grands groupes » (section 2 —
Architecture et urbanisation du SI), modélisant comme **capacité produit PPM** ce qu'un client DSI
doit pouvoir faire pour gouverner l'architecture de son système d'information à l'échelle du
Groupe : tenir une **cartographie applicative** (inventaire des applications, détection des
doublons/redondances fonctionnelles), instruire les décisions d'un **comité d'architecture**
(conformité aux standards, dérogations), tenir un **registre des interfaces** exposées entre SI
métier autonomes, et **agréger/prioriser la dette technique** remontée par plusieurs
applications/équipes à l'échelle du SI Groupe.

**Distinction explicite avec [E36 — Intégration SI (pilotage)](../EPIC-pilotage-integration-si/README.md)** :
E36 couvre l'ouverture du **module pilotage lui-même** vers le reste du SI (ses propres API, son
extensibilité low-code, son intégration à la suite collaborative) — un besoin d'intégration
**interne au module**. E50 couvre la **capacité de gouvernance d'architecture d'entreprise du
client** : la cartographie de **toutes** ses applications (pas seulement celles du module
pilotage), son CMDB applicatif, son comité d'architecture, son registre d'interfaces inter-SI et
sa dette technique consolidée à l'échelle du Groupe. Les deux périmètres ne se recouvrent pas :
E36 = intégration d'un module ; E50 = gouvernance d'architecture du SI Groupe entier.

Le rattachement d'une application cartographiée à une **organisation** (unité organisationnelle du
client) dépend de [E49 — Organisation & gouvernance DSI](../EPIC-organisation-gouvernance-dsi/README.md)
(EN49.1 — Référentiel organisationnel). Le comité d'architecture (F50.2) s'appuie sur les rôles et
la matrice RACI définis par EN49.2 (rôles Architecte, DSI Groupe) plutôt que de redéfinir des
rôles ad hoc.

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis un **nouveau document benchmark** « Organisations DSI dans les grands groupes »
(section 2 — Architecture et urbanisation du SI) — **distinct du CSV benchmark PPM** ayant servi
de source à E32–E40 ([E18 — Domaine Pilotage](../EPIC-pilotage/README.md)), et distinct également
du document ayant servi de source à [E49 — Organisation & gouvernance DSI](../EPIC-organisation-gouvernance-dsi/README.md)
bien qu'il s'agisse du même document benchmark (sections différentes). Ce document n'est, à ce
stade, pas mergé sur `main` ; les items ci-dessous sont rationalisés directement dans ce README,
comme pour les EPICs benchmark précédents.

## Dépendances
- Dépend de : E18 Domaine Pilotage (ombrelle) · E49 Organisation & gouvernance DSI (rôles/RACI —
  Architecte, DSI Groupe — EN49.2 ; le comité d'architecture (F50.2) s'appuie sur le tableau de
  bord de conformité continue d'E49/F49.2 plutôt que de dupliquer ce contrôle) · EN18.9 (modèle
  Application → Projet, pour rattacher une application cartographiée à un Projet le cas échéant)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F50.1 — Cartographie applicative** | |
| [US50.1.1 — Inventaire des applications](FEATURES/cartographie-applicative/us-inventaire-applications.md) | ⬜ |
| [US50.1.2 — Détection de doublons](FEATURES/cartographie-applicative/us-detection-doublons.md) | ⬜ |
| **F50.2 — Comité d'architecture** | |
| [US50.2.1 — Workflow du comité d'architecture](FEATURES/comite-architecture/us-workflow-comite-architecture.md) | ⬜ |
| **F50.3 — Interopérabilité SI** | |
| [US50.3.1 — Registre des interfaces SI](FEATURES/interoperabilite/us-registre-interfaces-si.md) | ⬜ |
| **F50.4 — Dette technique** | |
| [US50.4.1 — Inventaire de la dette technique Groupe](FEATURES/dette-technique/us-inventaire-dette-technique-groupe.md) | ⬜ |
