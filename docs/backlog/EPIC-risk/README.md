# E21 — Module Gestion des risques

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.10).*

## Objectif

Module de gestion des risques projet et portefeuille, **data-centric et gouverné** : profil de projet adaptatif, taxonomie universelle 12 familles, scoring multidimensionnel, cycle de vie & traitement (4 T), boucle vivante branchée sur le bus d'événements PIVOT, consolidation portefeuille, analyse quantitative (EMV, Monte Carlo) et packs de conformité (RGPD, AI Act, EBIOS RM, RGAA), IA gouvernée à validation humaine, restitutions par rôle.

> **Note** — Module de capacité du **domaine Pilotage** (E18), autonome et composable dans les cockpits du domaine — cf. [ADR-008 Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits). Il **remplace l'ex-feature `F18.7 — Gestion des risques`** (« risque léger »), désormais supprimée du domaine Pilotage. Le risque se corrèle à son projet par un `project_ref` via le bus PIVOT (**pas de FK inter-modules**, cf. ADR-006). L'entité `Risk` reste reliable à `Portfolio`, `Vendor`, `Contract`, `Decision`.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-risk-core`** (schéma Flyway `risk`, FK → `public.teams.id` ; corrélation projet par `project_ref` via bus PIVOT — pas de FK inter-modules, cf. ADR-006)
- Frontend : **`pivot-risk-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F21.1 — Profil & moteur adaptatif**
  - US21.1.1 : Questionnaire de cadrage
  - US21.1.2 : Bibliothèque de typologies
  - US21.1.3 : Taxonomie universelle 12 familles
  - US21.1.4 : Matrice de pondération des impacts
  - US21.1.5 : Bibliothèque de risques pré-suggérés
  - US21.1.6 : Entité Risk au catalogue
- **F21.2 — Scoring**
  - US21.2.1 : Score probabilité × gravité
  - US21.2.2 : Gravité multidimensionnelle
  - US21.2.3 : Seuils d'appétence
  - US21.2.4 : Matrice de risques visuelle
  - US21.2.5 : Mode AMDEC (détectabilité)
  - US21.2.6 : Exposition et vélocité
- **F21.3 — Cycle de vie & traitement**
  - US21.3.1 : Cycle de vie du risque
  - US21.3.2 : Stratégies de traitement (4 T)
  - US21.3.3 : Plan d'action
  - US21.3.4 : Plan de contingence
  - US21.3.5 : Revues de risques
- **F21.4 — Boucle vivante**
  - US21.4.1 : Consommation du bus PIVOT
  - US21.4.2 : Remontée des obstacles Scrum
  - US21.4.3 : Actions → tâches delivery
  - US21.4.4 : Événements de risque émis
  - US21.4.5 : Liens vers Vendor/Contract
- **F21.5 — Portefeuille & capitalisation**
  - US21.5.1 : Consolidation de portefeuille
  - US21.5.2 : Risques systémiques
  - US21.5.3 : Bibliothèque vivante (REX)
  - US21.5.4 : Suggestion par similarité
  - US21.5.5 : Tendance et historique
- **F21.6 — Quantitatif & conformité**
  - US21.6.1 : Valeur monétaire attendue (EMV)
  - US21.6.2 : Provision pour risques
  - US21.6.3 : Simulation Monte Carlo
  - US21.6.4 : Interface EBIOS RM
  - US21.6.5 : Pack RGPD
  - US21.6.6 : Pack AI Act
  - US21.6.7 : Pack RGAA & facture électronique
- **F21.7 — IA gouvernée**
  - US21.7.1 : Suggestion de risques par IA
  - US21.7.2 : Détection de signaux faibles
  - US21.7.3 : Aide à la rédaction d'actions
  - US21.7.4 : Gouvernance de l'IA de risque
- **F21.8 — Restitutions**
  - US21.8.1 : Vue chef de projet
  - US21.8.2 : Vue sponsor / COMEX
  - US21.8.3 : Vue Scrum Master
  - US21.8.4 : Vue Contract Manager
  - US21.8.5 : Export et rapport de risques
  - US21.8.6 : Accessibilité RGAA des vues
- **F21.9 — Intégration cockpit projet** — chaînon Pilotage ↔ Risque (bus + deep-links, cf. ADR-008)
  - US21.9.1 : Corréler un risque à son projet via le bus PIVOT (`project_ref`, sans FK)
  - US21.9.2 : Ouvrir les risques depuis la fiche projet (onglet + deep-link)
  - US21.9.3 : Widget « Top risques » composable dans un cockpit

### Enablers
- **EN21.1** — Schéma Flyway `risk` + entités JPA (Risk, RiskProfile, Typology, RiskFamily, ImpactWeight, Mitigation, RiskEvent, PortfolioRisk)
- **EN21.2** — Guard Angular module risk (moduleGuard `moduleId: 'risk'`)
- **EN21.3** — Adaptateur bus PIVOT : consommation (`task.completed`, `budget.alert`, `sprint.closed`) + émission (`risk.raised`, `risk.threshold.exceeded`, `risk.mitigation.due`)

## Modules impactés

`risk` (pivot-risk-core + pivot-risk-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : domaine Pilotage (E18) — projet corrélé par `project_ref` via bus (entité Project portée par E22 Roadmap ; entités Vendor/Contract pour les jonctions CLM)
- Dépend de : E15 Équipes transverses (rattachement d'un risque à une équipe)
- Consomme le **bus d'événements PIVOT** (boucle vivante F21.4, intégration cockpit F21.9)
- Cadré par [ADR-008 — Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| EN21.1 — Schéma Flyway `risk` + entités JPA | ⬜ |
| EN21.2 — Guard Angular module risk | ⬜ |
| EN21.3 — Adaptateur bus PIVOT (consumer/producer `risk.*`) | ⬜ |
| **F21.1 — Profil & moteur adaptatif** | |
| [US21.1.1 — Questionnaire de cadrage](FEATURES/profil-moteur/us-questionnaire-de-cadrage.md) | ⬜ |
| [US21.1.2 — Bibliothèque de typologies](FEATURES/profil-moteur/us-bibliotheque-de-typologies.md) | ⬜ |
| [US21.1.3 — Taxonomie universelle 12 familles](FEATURES/profil-moteur/us-taxonomie-universelle-12-familles.md) | ⬜ |
| [US21.1.4 — Matrice de pondération des impacts](FEATURES/profil-moteur/us-matrice-de-ponderation-des-impacts.md) | ⬜ |
| [US21.1.5 — Bibliothèque de risques pré-suggérés](FEATURES/profil-moteur/us-bibliotheque-de-risques-pre-suggeres.md) | ⬜ |
| [US21.1.6 — Entité Risk au catalogue](FEATURES/profil-moteur/us-entite-risk-au-catalogue.md) | ⬜ |
| **F21.2 — Scoring** | |
| [US21.2.1 — Score probabilité × gravité](FEATURES/scoring/us-score-probabilite-gravite.md) | ⬜ |
| [US21.2.2 — Gravité multidimensionnelle](FEATURES/scoring/us-gravite-multidimensionnelle.md) | ⬜ |
| [US21.2.3 — Seuils d'appétence](FEATURES/scoring/us-seuils-d-appetence.md) | ⬜ |
| [US21.2.4 — Matrice de risques visuelle](FEATURES/scoring/us-matrice-de-risques-visuelle.md) | ⬜ |
| [US21.2.5 — Mode AMDEC (détectabilité)](FEATURES/scoring/us-mode-amdec-detectabilite.md) | ⬜ |
| [US21.2.6 — Exposition et vélocité](FEATURES/scoring/us-exposition-et-velocite.md) | ⬜ |
| **F21.3 — Cycle de vie & traitement** | |
| [US21.3.1 — Cycle de vie du risque](FEATURES/cycle-vie/us-cycle-de-vie-du-risque.md) | ⬜ |
| [US21.3.2 — Stratégies de traitement (4 T)](FEATURES/cycle-vie/us-strategies-de-traitement-4-t.md) | ⬜ |
| [US21.3.3 — Plan d'action](FEATURES/cycle-vie/us-plan-d-action.md) | ⬜ |
| [US21.3.4 — Plan de contingence](FEATURES/cycle-vie/us-plan-de-contingence.md) | ⬜ |
| [US21.3.5 — Revues de risques](FEATURES/cycle-vie/us-revues-de-risques.md) | ⬜ |
| **F21.4 — Boucle vivante** | |
| [US21.4.1 — Consommation du bus PIVOT](FEATURES/boucle-vivante/us-consommation-du-bus-pivot.md) | ⬜ |
| [US21.4.2 — Remontée des obstacles Scrum](FEATURES/boucle-vivante/us-remontee-des-obstacles-scrum.md) | ⬜ |
| [US21.4.3 — Actions → tâches delivery](FEATURES/boucle-vivante/us-actions-taches-delivery.md) | ⬜ |
| [US21.4.4 — Événements de risque émis](FEATURES/boucle-vivante/us-evenements-de-risque-emis.md) | ⬜ |
| [US21.4.5 — Liens vers Vendor/Contract](FEATURES/boucle-vivante/us-liens-vers-vendor-contract.md) | ⬜ |
| **F21.5 — Portefeuille & capitalisation** | |
| [US21.5.1 — Consolidation de portefeuille](FEATURES/portefeuille/us-consolidation-de-portefeuille.md) | ⬜ |
| [US21.5.2 — Risques systémiques](FEATURES/portefeuille/us-risques-systemiques.md) | ⬜ |
| [US21.5.3 — Bibliothèque vivante (REX)](FEATURES/portefeuille/us-bibliotheque-vivante-rex.md) | ⬜ |
| [US21.5.4 — Suggestion par similarité](FEATURES/portefeuille/us-suggestion-par-similarite.md) | ⬜ |
| [US21.5.5 — Tendance et historique](FEATURES/portefeuille/us-tendance-et-historique.md) | ⬜ |
| **F21.6 — Quantitatif & conformité** | |
| [US21.6.1 — Valeur monétaire attendue (EMV)](FEATURES/quantitatif-conformite/us-valeur-monetaire-attendue-emv.md) | ⬜ |
| [US21.6.2 — Provision pour risques](FEATURES/quantitatif-conformite/us-provision-pour-risques.md) | ⬜ |
| [US21.6.3 — Simulation Monte Carlo](FEATURES/quantitatif-conformite/us-simulation-monte-carlo.md) | ⬜ |
| [US21.6.4 — Interface EBIOS RM](FEATURES/quantitatif-conformite/us-interface-ebios-rm.md) | ⬜ |
| [US21.6.5 — Pack RGPD](FEATURES/quantitatif-conformite/us-pack-rgpd.md) | ⬜ |
| [US21.6.6 — Pack AI Act](FEATURES/quantitatif-conformite/us-pack-ai-act.md) | ⬜ |
| [US21.6.7 — Pack RGAA & facture électronique](FEATURES/quantitatif-conformite/us-pack-rgaa-facture-electronique.md) | ⬜ |
| **F21.7 — IA gouvernée** | |
| [US21.7.1 — Suggestion de risques par IA](FEATURES/ia-gouvernee/us-suggestion-de-risques-par-ia.md) | ⬜ |
| [US21.7.2 — Détection de signaux faibles](FEATURES/ia-gouvernee/us-detection-de-signaux-faibles.md) | ⬜ |
| [US21.7.3 — Aide à la rédaction d'actions](FEATURES/ia-gouvernee/us-aide-a-la-redaction-d-actions.md) | ⬜ |
| [US21.7.4 — Gouvernance de l'IA de risque](FEATURES/ia-gouvernee/us-gouvernance-de-l-ia-de-risque.md) | ⬜ |
| **F21.8 — Restitutions** | |
| [US21.8.1 — Vue chef de projet](FEATURES/restitutions/us-vue-chef-de-projet.md) | ⬜ |
| [US21.8.2 — Vue sponsor / COMEX](FEATURES/restitutions/us-vue-sponsor-comex.md) | ⬜ |
| [US21.8.3 — Vue Scrum Master](FEATURES/restitutions/us-vue-scrum-master.md) | ⬜ |
| [US21.8.4 — Vue Contract Manager](FEATURES/restitutions/us-vue-contract-manager.md) | ⬜ |
| [US21.8.5 — Export et rapport de risques](FEATURES/restitutions/us-export-et-rapport-de-risques.md) | ⬜ |
| [US21.8.6 — Accessibilité RGAA des vues](FEATURES/restitutions/us-accessibilite-rgaa-des-vues.md) | ⬜ |
| **F21.9 — Intégration cockpit projet** | |
| [US21.9.1 — Corréler un risque à son projet via le bus](FEATURES/integration-cockpit/us-correlation-projet-bus.md) | ⬜ |
| [US21.9.2 — Onglet Risques dans la fiche projet](FEATURES/integration-cockpit/us-onglet-risques-fiche-projet.md) | ⬜ |
| [US21.9.3 — Widget Top risques composable](FEATURES/integration-cockpit/us-widget-top-risques.md) | ⬜ |
