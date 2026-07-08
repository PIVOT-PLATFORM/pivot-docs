# E49 — Organisation & gouvernance DSI

## Objectif

Module-EPIC issu du benchmark « Organisations DSI dans les grands groupes », modélisant comme
**capacité produit PPM** ce qu'un client DSI doit pouvoir faire pour organiser et gouverner sa
fonction SI : documenter son **référentiel organisationnel** (unités, hiérarchie, rattachements),
définir des **rôles génériques et une matrice RACI par domaine/décision**, et comparer/adopter un
**modèle de gouvernance SI** parmi les cinq du benchmark (gouvernance fédérée, Hub & Spoke,
Platform + Marketplace interne, Team Topologies, Product Operating Model). Il couvre également le
suivi des **innovations de management** du même benchmark (InnerSource, OKR transverses DSI
Groupe/métier, Architecture as Code, Agile at scale/SAFe). **E49 est l'enabler partagé transverse**
consommé par les autres EPICs issus de ce même benchmark : [E50 — Architecture d'entreprise &
urbanisation](../EPIC-architecture-entreprise/README.md), [E51 — Gouvernance de la
donnée](../EPIC-gouvernance-donnee/README.md), [E52 — Gouvernance Citizen
Development](../EPIC-citizen-development/README.md), [E53 — Cybersécurité & conformité
SI](../EPIC-cyber-conformite-si/README.md). **Les rôles et la matrice RACI définis ici (EN49.2)
sont réutilisés par E50/E51/E52/E53 — ne pas redéfinir de rôles ad hoc dans ces EPICs.**

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis un **nouveau document benchmark** « Organisations DSI dans les grands groupes »
(section 1 — modèles d'organisation SI ; section 8 — innovations de management) — **distinct du
CSV benchmark PPM** ayant servi de source à E32–E40 ([E18 — Domaine Pilotage](../EPIC-pilotage/README.md)).
Ce document n'est, à ce stade, pas mergé sur `main` ; les items ci-dessous sont rationalisés
directement dans ce README, comme pour les EPICs benchmark précédents.

## Dépendances
- Dépend de : E18 Domaine Pilotage (ombrelle) · E15 Équipes transverses (modèle équipe de base,
  rattachement des personnes/équipes à une unité organisationnelle) · E01 Authentification & IAM
  (utilisateurs porteurs des rôles)
- OKR transverses (section 8) : réutilise [E27 — Module OKR](../EPIC-okr/README.md) pour le
  modèle de données OKR et son alignement multi-niveaux déjà prévu (F27.3) — ne pas dupliquer, se
  contenter d'étendre l'alignement pour la lecture croisée DSI Groupe / DSI métier

## Enablers partagés

Référentiels mutualisés, **contrat consommé par E50/E51/E52/E53** :

- [**EN49.1** — Référentiel organisationnel](ENABLERS/en-referentiel-organisationnel.md) (unités
  org, hiérarchie, rattachements personne/équipe)
- [**EN49.2** — Modèle de rôles & RACI](ENABLERS/en-modele-roles-raci.md) (rôles génériques +
  matrice RACI par domaine/décision — **le contrat consommé par E50/E51/E52/E53**)
- [**EN49.3** — Catalogue des modèles de gouvernance SI](ENABLERS/en-catalogue-modeles-gouvernance.md)
  (les 5 modèles de la section 1, comparables/adoptables par un client)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers partagés** | |
| [EN49.1 — Référentiel organisationnel](ENABLERS/en-referentiel-organisationnel.md) | ⬜ |
| [EN49.2 — Modèle de rôles & RACI](ENABLERS/en-modele-roles-raci.md) | ⬜ |
| [EN49.3 — Catalogue des modèles de gouvernance SI](ENABLERS/en-catalogue-modeles-gouvernance.md) | ⬜ |
| **F49.1 — Pilotage des modèles d'organisation** | |
| [US49.1.1 — Cartographie de l'organisation](FEATURES/pilotage-modeles-organisation/us-cartographie-organisation.md) | ⬜ |
| [US49.1.2 — Sélection d'un modèle de gouvernance](FEATURES/pilotage-modeles-organisation/us-selection-modele-gouvernance.md) | ⬜ |
| **F49.2 — Innovations de management IT** | |
| [US49.2.1 — Métriques InnerSource](FEATURES/innovations-management/us-inner-source-metriques.md) | ⬜ |
| [US49.2.2 — Conformité Architecture as Code](FEATURES/innovations-management/us-architecture-as-code-conformite.md) | ⬜ |
