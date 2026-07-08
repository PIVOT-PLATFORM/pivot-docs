# E52 — Gouvernance Citizen Development

## Objectif

Module-EPIC issu du benchmark « Organisations DSI dans les grands groupes » (sections 6 et 6bis —
Citizen Development), qui pose le **modèle générique de gouvernance du low-code/no-code métier**
applicable à **toutes les surfaces citizen dev de PIVOT** : [E29 — Workflows &
Automatisation](../EPIC-workflows/README.md), Pivot Forms (E42), le whiteboard/collaboration, et
tout futur constructeur no-code. L'enjeu du benchmark : encadrer le low-code/no-code métier sans
tuer l'agilité qu'il apporte, et éviter le shadow IT non maîtrisé, via une classification des
usages par niveau de risque (vert/orange/rouge), un cycle de vie applicatif outillé (propriétaire
identifié, revue d'usage, décommissionnement), et un Centre of Excellence transverse (gabarits,
formation, audit périodique).

**Ce EPIC généralise les briques de gouvernance citoyenne déjà amorcées dans E29 (Workflows) de
façon module-spécifique — E29 doit référencer ce modèle générique plutôt que le dupliquer ; ne pas
re-scoper cet EPIC comme un doublon d'E29.** Les US suivantes d'E29, scoping le sujet au seul
module Workflows, sont généralisées ici : US29.7.3 (contrôle des connecteurs et modèles),
US29.7.6 (inventaire et propriétaires de workflows) et US29.14.5 (CoE et gouvernance citoyenne).
E52 porte le registre, le cycle de vie, le CoE et les KPI **transverses à toutes les plateformes**
citizen dev de PIVOT ; E29 reste propriétaire de la déclinaison spécifique aux workflows
(credentials, connecteurs HTTP, environnements dev/test/prod) et vient s'enregistrer dans le
registre transverse d'E52 plutôt que de maintenir son propre inventaire isolé.

Les **rôles** de ce modèle (Citizen Developer, Sponsor métier/PO citoyen, CoE Citizen Dev, DSI
Groupe/Architecture, RSSI/Sécurité) ne sont **pas redéfinis ici** : ils s'appuient sur le
référentiel de rôles et la matrice RACI transverses d'[EN49.2 — Modèle de rôles &
RACI](../EPIC-organisation-gouvernance-dsi/ENABLERS/en-modele-roles-raci.md) ([E49 — Organisation
& gouvernance DSI](../EPIC-organisation-gouvernance-dsi/README.md)). Le rôle « Citizen Developer »
est déclaré comme extension du référentiel générique EN49.2 (mécanisme d'extensibilité prévu par
EN49.2) ; les rôles Sponsor métier, CoE, RSSI et Architecte/DSI Groupe réutilisent directement les
rôles génériques déjà définis par EN49.2, instanciés pour le domaine « Citizen Development » de la
matrice RACI.

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine

Généré depuis un **nouveau document benchmark** « Organisations DSI dans les grands groupes »
(section 6 — Citizen Development ; section 6bis — rôles, cycle de vie, gouvernance par les
risques, KPI, outils) — **distinct du CSV benchmark PPM** ayant servi de source à E32–E40
([E18 — Domaine Pilotage](../EPIC-pilotage/README.md)). Ce document n'est, à ce stade, pas mergé
sur `main` ; les items ci-dessous sont rationalisés directement dans ce README, comme pour les
EPICs benchmark précédents (E49, E50, E51, E53).

Ce EPIC **généralise des seeds de gouvernance citoyenne déjà présents dans E29**, scopés au seul
module Workflows, identifiés par lecture complète du dossier E29 :
- [US29.7.3 — Contrôle des connecteurs et
  modèles](../EPIC-workflows/FEATURES/gouvernance-securite/us-controle-connecteurs-modeles.md) —
  politiques DLP allowlist/blocage de connecteurs et modèles IA par équipe/environnement
- [US29.7.6 — Inventaire et
  propriétaires](../EPIC-workflows/FEATURES/gouvernance-securite/us-inventaire-proprietaires.md) —
  inventaire des workflows avec propriétaire obligatoire, dépendances, criticité, usage consolidé
- [US29.14.5 — CoE et gouvernance
  citoyenne](../EPIC-workflows/FEATURES/chantiers-si/us-coe-gouvernance-citoyenne.md) — centre
  d'excellence Workflows (propriétaires obligatoires, campagnes de conformité, flux orphelins,
  formation des makers)

Ces trois US restent en l'état dans E29 (non modifiées par cet EPIC) — elles constituent
l'implémentation module-spécifique du modèle générique porté ici par E52, auquel E29 doit désormais
se référer plutôt que redéfinir son propre modèle de risque/cycle de vie/CoE.

## Dépendances
- Dépend de : **E18 Domaine Pilotage** (ombrelle)
- Dépend de : **E49 Organisation & gouvernance DSI** — rôles Citizen Developer / Sponsor
  métier-PO citoyen / CoE Citizen Dev / DSI Groupe-Architecture / RSSI-Sécurité, portés par le
  référentiel [EN49.2 — Modèle de rôles &
  RACI](../EPIC-organisation-gouvernance-dsi/ENABLERS/en-modele-roles-raci.md) — ne pas redéfinir
  de rôles ad hoc dans E52
- Dépend de : **E29 Workflows & Automatisation** — généralise ses US de gouvernance citoyenne
  existantes : US29.7.3 (contrôle connecteurs/modèles), US29.7.6 (inventaire/propriétaires),
  US29.14.5 (CoE gouvernance citoyenne). E29 référence le modèle générique d'E52 plutôt que de le
  dupliquer.
- Dépend de : **E15 Équipes transverses** (rattachement du Sponsor métier / Citizen Developer à
  une équipe)
- Dépend de : **E01 Authentification & IAM** (identification du propriétaire applicatif)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F52.1 — Registre des applications citoyennes** | |
| [US52.1.1 — Registre des applications citoyennes](FEATURES/registre-applications-citoyennes/us-registre-applications.md) | ⬜ |
| **F52.2 — Cycle de vie applicatif** | |
| [US52.2.1 — Idéation & auto-évaluation du risque](FEATURES/cycle-de-vie/us-ideation-auto-evaluation-risque.md) | ⬜ |
| [US52.2.2 — Validation proportionnée à la mise en production](FEATURES/cycle-de-vie/us-validation-proportionnee-mise-en-prod.md) | ⬜ |
| [US52.2.3 — Revue périodique & décommissionnement](FEATURES/cycle-de-vie/us-revue-periodique-decommissionnement.md) | ⬜ |
| **F52.3 — Centre d'excellence** | |
| [US52.3.1 — Catalogue de gabarits CoE](FEATURES/coe-gouvernance/us-catalogue-gabarits-coe.md) | ⬜ |
| **F52.4 — Pilotage KPI** | |
| [US52.4.1 — Tableau de bord des KPI Citizen Dev](FEATURES/pilotage-kpi/us-tableau-bord-kpi-citizen-dev.md) | ⬜ |
