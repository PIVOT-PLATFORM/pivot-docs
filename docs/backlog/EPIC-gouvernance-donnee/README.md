# E51 — Gouvernance de la donnée

## Objectif

Module-EPIC issu du benchmark « Organisations DSI dans les grands groupes » (section 3 —
Gouvernance de la donnée), modélisant comme **capacité produit PPM** ce qu'un client DSI doit
pouvoir faire pour gouverner ses données Groupe : constituer un **Data Catalog** (inventaire des
domaines/entités de données — client, tiers, sites, actifs… — avec propriétaire métier et source
de vérité déclarée), **signaler les référentiels dupliqués** entre systèmes (une même entité
portée par plusieurs SI métier, sans réconciliation technique automatisée), et suivre la
**qualité de la donnée** au niveau gouvernance (score déclaré + plan de remédiation).

**PIVOT reste une plateforme PPM, pas une plateforme data** : cet EPIC ne réimplémente ni Data
Catalog technique (Collibra/Alation), ni Master Data Management (MDM), ni pipeline ETL/API de
données Groupe, ni Data Mesh — ces outils/rôles du benchmark (Chief Data Officer Groupe compris)
sont **hors du périmètre d'implémentation technique** ici. E51 ne couvre que la **couche
gouvernance** : cataloguer, tracer la propriété/qualité/duplication des domaines de données, sans
exécuter la matching/réconciliation elle-même.

Le rôle **Chief Data Officer (CDO) Groupe** n'est pas redéfini ad hoc dans cet EPIC : il se
rattache au référentiel de rôles partagé produit par **[E49 — Organisation & gouvernance
DSI](../EPIC-organisation-gouvernance-dsi/README.md)**, enabler **EN49.2 — Modèle de rôles &
RACI** — le CDO y est un rôle générique instancié comme Data Owner/Data Steward selon le domaine
de données concerné.

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis un **nouveau document benchmark** « Organisations DSI dans les grands groupes »
(section 3 — Gouvernance de la donnée) — **distinct du CSV benchmark PPM** ayant servi de source
à E32–E40 ([E18 — Domaine Pilotage](../EPIC-pilotage/README.md)), et distinct également du
document benchmark « Organisations DSI » propre à E49 bien qu'il en partage la source documentaire
globale. Ce document n'est, à ce stade, pas mergé sur `main` ; les items ci-dessous sont
rationalisés directement dans ce README, comme pour les EPICs benchmark précédents.

## Dépendances
- Dépend de : **E18** Domaine Pilotage (ombrelle) · **E49** Organisation & gouvernance DSI (rôle
  CDO Groupe et Data Owner — **EN49.2** Modèle de rôles & RACI, ne pas redéfinir de rôle ad hoc
  ici) · **EN18.9** Modèle Application → Projet (si un domaine de données est rattaché à une
  Application/un Projet porteur au sein du domaine Pilotage)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F51.1 — Catalogue de données** | |
| [US51.1.1 — Inventaire des domaines de données](FEATURES/catalogue-donnees/us-inventaire-domaines-donnees.md) | ⬜ |
| [US51.1.2 — Détection de référentiels dupliqués](FEATURES/catalogue-donnees/us-detection-referentiels-dupliques.md) | ⬜ |
| **F51.2 — Qualité des données** | |
| [US51.2.1 — Suivi de la qualité des données](FEATURES/qualite-donnees/us-suivi-qualite-donnees.md) | ⬜ |
