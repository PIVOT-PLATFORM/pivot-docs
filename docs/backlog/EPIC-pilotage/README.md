# E18 — Module Pilotage

## Objectif

Suite de pilotage de projets et de portefeuille : visualisation roadmap / Gantt, gestion multi-projets, Architecture Decision Records (ADR) par projet, et suivi de la commande publique (consultations, appels d'offres, attribution marchés).

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F18.1 — Roadmap / Gantt** — projets, jalons, dépendances, vue temporelle
  - US18.1.1 : Créer un projet sur la roadmap
  - US18.1.2 : Visualiser la roadmap en vue Gantt
  - US18.1.3 : Ajouter des jalons et dépendances entre projets
- **F18.2 — Portefeuille projets** — tableau de bord multi-projets, indicateurs RAG, export
  - US18.2.1 : Tableau de bord portefeuille (KPIs, indicateurs RAG Rouge/Amber/Vert)
  - US18.2.2 : Rapport d'avancement export JSON/CSV
- **F18.3 — ADR projet** — Architecture Decision Records par projet
  - US18.3.1 : Créer un ADR dans un projet (titre, contexte, décision, conséquences)
  - US18.3.2 : Lister et filtrer les ADR d'un projet (statut : proposed / accepted / deprecated)
- **F18.4 — Commande publique** — consultations, appels d'offres, attribution marchés
  - US18.4.1 : Créer et gérer une consultation (appel d'offres, marché négocié, accord cadre)
  - US18.4.2 : Suivre les candidats et analyser les offres (grille critères pondérés)
  - US18.4.3 : Attribuer le marché et générer le rapport d'attribution

#### Extension benchmark PPM (secteur public) — Features F18.8–F18.19

- **F18.8 — Demande & arbitrage** (E01) — gestion de la demande, scoring, capacité à faire, scénarios
  - US18.8.1 : Gestion de la demande
  - US18.8.2 : Scoring multicritère
  - US18.8.3 : Capacité à faire
  - US18.8.4 : Scénarios what-if
  - US18.8.5 : Business cases dynamiques
  - US18.8.6 : Approche 'tout est projet'
- **F18.9 — Planification** (E02) — Gantt, chemin critique, vues multiples, baselines
  - US18.9.1 : Gantt, dépendances, jalons
  - US18.9.2 : Chemin critique
  - US18.9.3 : Vues multiples
  - US18.9.4 : Modèles de projets
  - US18.9.5 : Baselines et historisation
  - US18.9.6 : Hybride cascade/agile
- **F18.10 — Ressources & temps** (E03) — affectations, saisie des temps, plan de charge
  - US18.10.1 : Ressources et affectations
  - US18.10.2 : Saisie des temps
  - US18.10.3 : Plan de charge temps réel
- **F18.11 — Budgets & finances** (E04) — coûts projet, budgets pluriannuels (PPI), trésorerie
  - US18.11.1 : Coûts au niveau projet
  - US18.11.2 : Budgets pluriannuels (PPI)
  - US18.11.3 : Flux de trésorerie
- **F18.12 — Portefeuille & comités** (E05) — vue consolidée, tableaux de bord, comités, plans stratégiques
  - US18.12.1 : Vue portefeuille consolidée
  - US18.12.2 : Tableaux de bord personnalisables
  - US18.12.3 : Revues et comités outillés
  - US18.12.4 : Météo et indicateurs normalisés
  - US18.12.5 : Gestion de programmes
  - US18.12.6 : Pilotage des plans stratégiques
- **F18.13 — Collaboration & tâches** (E06) — collaboration contextuelle, continuum tâches-projets
  - US18.13.1 : Collaboration contextuelle
  - US18.13.2 : Continuum tâches-projets
  - US18.13.3 : Modularité par maturité
- **F18.14 — IA & agents** (E07) — synthèse gouvernée, agent exécutant, IA souveraine
  - US18.14.1 : IA de synthèse gouvernée
  - US18.14.2 : Agent exécutant
  - US18.14.3 : Réunions vers tâches
  - US18.14.4 : IA souveraine
- **F18.15 — Gouvernance & sécurité** (E08) — droits, risques, traçabilité, SSO, classification, DLP
  - US18.15.1 : Droits par rôle et périmètre
  - US18.15.2 : Registre des risques
  - US18.15.3 : Traçabilité des décisions
  - US18.15.4 : SSO et audit
  - US18.15.5 : Classification des portefeuilles
  - US18.15.6 : Étiquettes et DLP sur tâches
- **F18.16 — Intégration SI** (E09) — comptabilité publique, API/datamart, suite collaborative, low-code
  - US18.16.1 : Interface comptabilité publique
  - US18.16.2 : API et interfaces standardisées
  - US18.16.3 : Intégration suite collaborative
  - US18.16.4 : Extensibilité low-code
  - US18.16.5 : Accompagnement et communauté
- **F18.17 — Licences & réversibilité** (E10) — réversibilité, pérennité, segmentation, offre d'entrée
  - US18.17.1 : Réversibilité contractuelle
  - US18.17.2 : Garanties de pérennité
  - US18.17.3 : Segmentation des licences
  - US18.17.4 : Offre d'entrée incluse
- **F18.18 — Innovation** (E12) — commande publique, subventions, AP/CP, transparence, archivage probant
  - US18.18.1 : Lien commande publique
  - US18.18.2 : Suivi des subventions
  - US18.18.3 : Simulation AP/CP
  - US18.18.4 : Livrables d'instance générés
  - US18.18.5 : Portail de transparence
  - US18.18.6 : Archivage probant
  - US18.18.7 : Indicateurs de valeur publique
  - US18.18.8 : Format d'échange ouvert
- **F18.19 — Chantiers SI** (E13) — décisions organisationnelles, clauses de consultation, livrables
  - US18.19.1 : Articulation des familles
  - US18.19.2 : Cadrage SI financier
  - US18.19.3 : Processus demande-arbitrage
  - US18.19.4 : Classification et hébergement
  - US18.19.5 : Clauses de pérennité
  - US18.19.6 : Conduite du changement
  - US18.19.7 : Gouvernance de l'IA de pilotage
  - US18.19.8 : TCO par population
  - US18.19.9 : Traçabilité réglementaire
  - US18.19.10 : Audit RGAA

### Enablers
- **EN18.1** — Schéma Flyway `pilotage` + entités JPA (Project, Milestone, PortfolioView, Adr, Consultation, Candidate)
- **EN18.2** — Guard Angular module pilotage (moduleGuard `moduleId: 'pilotage'`)
- **EN18.3** — Cloud/SaaS et RGPD (PP-011)
- **EN18.4** — Localisation FR et RGAA (PP-012)
- **EN18.5** — Performance de consolidation (PP-032)
- **EN18.6** — Administration sans code (PP-033)
- **EN18.7** — Hébergement France/UE (PP-035)
- **EN18.8** — Option on-premise (PP-046)

## Modules impactés

`pilotage` (pivot-pilotage-core + pivot-pilotage-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses (pour associer un projet à une équipe)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Extension benchmark PPM (secteur public)

Les 70 items préfixés `PP-` (Features **F18.8–F18.19** et Enablers **EN18.3–EN18.8**) proviennent d'un benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project). Ils étendent le module `pilotage` avec le cœur PPM attendu par les collectivités et organismes publics : demande & arbitrage, planification, ressources & temps, budgets pluriannuels (PPI, AP/CP), portefeuille & comités, gouvernance/traçabilité, intégration au SI financier public (M57…), réversibilité et chantiers d'organisation SI.

Ces items sont tous en **phase-3** (verrouillée jusqu'à « MVP terminé »). Les critères d'acceptation sont des **ébauches à affiner par le PO Agent au Gate 1** avant implémentation. Les items « Chantiers SI » (F18.19) sont des décisions/clauses/livrables organisationnels de la consultation plutôt que des fonctionnalités logicielles.

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| EN18.1 — Schéma Flyway `pilotage` + entités JPA | ⬜ |
| EN18.2 — Guard Angular module pilotage | ⬜ |
| **F18.1 — Roadmap / Gantt** | |
| [US18.1.1 — Créer un projet sur la roadmap](FEATURES/roadmap/us-creer-projet-roadmap.md) | ⬜ |
| [US18.1.2 — Vue Gantt](FEATURES/roadmap/us-vue-gantt.md) | ⬜ |
| [US18.1.3 — Jalons et dépendances](FEATURES/roadmap/us-jalons-dependances.md) | ⬜ |
| **F18.2 — Portefeuille projets** | |
| [US18.2.1 — Tableau de bord portefeuille (RAG)](FEATURES/portfolio/us-tableau-bord-portfolio.md) | ⬜ |
| [US18.2.2 — Rapport d'avancement export CSV](FEATURES/portfolio/us-rapport-avancement.md) | ⬜ |
| **F18.3 — ADR projet** | |
| [US18.3.1 — Créer un ADR projet](FEATURES/adr/us-creer-adr-projet.md) | ⬜ |
| [US18.3.2 — Consulter et rechercher les ADRs](FEATURES/adr/us-consulter-adrs.md) | ⬜ |
| **F18.4 — Commande publique** | |
| [US18.4.1 — Créer une consultation](FEATURES/commande-publique/us-creer-consultation.md) | ⬜ |
| [US18.4.2 — Suivi candidats + grille critères](FEATURES/commande-publique/us-suivi-candidats.md) | ⬜ |
| [US18.4.3 — Attribution marché + rapport](FEATURES/commande-publique/us-attribution-notification.md) | ⬜ |
| **F18.5 — Budget & suivi financier** | |
| [US18.5.1 — Saisir le budget projet](FEATURES/budget/us-saisir-budget.md) | ⬜ |
| [US18.5.2 — Suivi consommation budgétaire](FEATURES/budget/us-suivi-consommation.md) | ⬜ |
| **F18.6 — OKR** | |
| [US18.6.1 — Créer objectifs et Key Results](FEATURES/okr/us-creer-objectif.md) | ⬜ |
| [US18.6.2 — Suivre l'avancement des KR](FEATURES/okr/us-suivre-kr.md) | ⬜ |
| **F18.7 — Gestion des risques** | |
| [US18.7.1 — Registre des risques (matrice 5x5)](FEATURES/risques/us-registre-risques.md) | ⬜ |
| [US18.7.2 — Plan de mitigation + risque résiduel](FEATURES/risques/us-plan-mitigation.md) | ⬜ |
| **Enablers (extension PPM)** | |
| [EN18.3 — Cloud/SaaS et RGPD](ENABLERS/en-cloud-saas-rgpd.md) | ⬜ |
| [EN18.4 — Localisation FR et RGAA](ENABLERS/en-localisation-fr-rgaa.md) | ⬜ |
| [EN18.5 — Performance de consolidation](ENABLERS/en-performance-consolidation.md) | ⬜ |
| [EN18.6 — Administration sans code](ENABLERS/en-administration-sans-code.md) | ⬜ |
| [EN18.7 — Hébergement France/UE](ENABLERS/en-hebergement-france-ue.md) | ⬜ |
| [EN18.8 — Option on-premise](ENABLERS/en-option-on-premise.md) | ⬜ |
| **F18.8 — Demande & arbitrage** | |
| [US18.8.1 — Gestion de la demande](FEATURES/demande-arbitrage/us-gestion-demande.md) | ⬜ |
| [US18.8.2 — Scoring multicritère](FEATURES/demande-arbitrage/us-scoring-multicritere.md) | ⬜ |
| [US18.8.3 — Capacité à faire](FEATURES/demande-arbitrage/us-capacite-a-faire.md) | ⬜ |
| [US18.8.4 — Scénarios what-if](FEATURES/demande-arbitrage/us-scenarios-what-if.md) | ⬜ |
| [US18.8.5 — Business cases dynamiques](FEATURES/demande-arbitrage/us-business-cases-dynamiques.md) | ⬜ |
| [US18.8.6 — Approche 'tout est projet'](FEATURES/demande-arbitrage/us-tout-est-projet.md) | ⬜ |
| **F18.9 — Planification** | |
| [US18.9.1 — Gantt, dépendances, jalons](FEATURES/planification/us-gantt-dependances-jalons.md) | ⬜ |
| [US18.9.2 — Chemin critique](FEATURES/planification/us-chemin-critique.md) | ⬜ |
| [US18.9.3 — Vues multiples](FEATURES/planification/us-vues-multiples.md) | ⬜ |
| [US18.9.4 — Modèles de projets](FEATURES/planification/us-modeles-projets.md) | ⬜ |
| [US18.9.5 — Baselines et historisation](FEATURES/planification/us-baselines-historisation.md) | ⬜ |
| [US18.9.6 — Hybride cascade/agile](FEATURES/planification/us-hybride-cascade-agile.md) | ⬜ |
| **F18.10 — Ressources & temps** | |
| [US18.10.1 — Ressources et affectations](FEATURES/ressources-temps/us-ressources-affectations.md) | ⬜ |
| [US18.10.2 — Saisie des temps](FEATURES/ressources-temps/us-saisie-des-temps.md) | ⬜ |
| [US18.10.3 — Plan de charge temps réel](FEATURES/ressources-temps/us-plan-de-charge.md) | ⬜ |
| **F18.11 — Budgets & finances** | |
| [US18.11.1 — Coûts au niveau projet](FEATURES/budgets-finances/us-couts-projet.md) | ⬜ |
| [US18.11.2 — Budgets pluriannuels (PPI)](FEATURES/budgets-finances/us-budgets-pluriannuels-ppi.md) | ⬜ |
| [US18.11.3 — Flux de trésorerie](FEATURES/budgets-finances/us-flux-tresorerie.md) | ⬜ |
| **F18.12 — Portefeuille & comités** | |
| [US18.12.1 — Vue portefeuille consolidée](FEATURES/portefeuille-comites/us-vue-portefeuille-consolidee.md) | ⬜ |
| [US18.12.2 — Tableaux de bord personnalisables](FEATURES/portefeuille-comites/us-tableaux-bord-personnalisables.md) | ⬜ |
| [US18.12.3 — Revues et comités outillés](FEATURES/portefeuille-comites/us-revues-comites-outilles.md) | ⬜ |
| [US18.12.4 — Météo et indicateurs normalisés](FEATURES/portefeuille-comites/us-meteo-indicateurs-normalises.md) | ⬜ |
| [US18.12.5 — Gestion de programmes](FEATURES/portefeuille-comites/us-gestion-programmes.md) | ⬜ |
| [US18.12.6 — Pilotage des plans stratégiques](FEATURES/portefeuille-comites/us-plans-strategiques.md) | ⬜ |
| **F18.13 — Collaboration & tâches** | |
| [US18.13.1 — Collaboration contextuelle](FEATURES/collaboration-taches/us-collaboration-contextuelle.md) | ⬜ |
| [US18.13.2 — Continuum tâches-projets](FEATURES/collaboration-taches/us-continuum-taches-projets.md) | ⬜ |
| [US18.13.3 — Modularité par maturité](FEATURES/collaboration-taches/us-modularite-maturite.md) | ⬜ |
| **F18.14 — IA & agents** | |
| [US18.14.1 — IA de synthèse gouvernée](FEATURES/ia-agents/us-ia-synthese-gouvernee.md) | ⬜ |
| [US18.14.2 — Agent exécutant](FEATURES/ia-agents/us-agent-executant.md) | ⬜ |
| [US18.14.3 — Réunions vers tâches](FEATURES/ia-agents/us-reunions-vers-taches.md) | ⬜ |
| [US18.14.4 — IA souveraine](FEATURES/ia-agents/us-ia-souveraine.md) | ⬜ |
| **F18.15 — Gouvernance & sécurité** | |
| [US18.15.1 — Droits par rôle et périmètre](FEATURES/gouvernance-securite/us-droits-role-perimetre.md) | ⬜ |
| [US18.15.2 — Registre des risques](FEATURES/gouvernance-securite/us-registre-risques.md) | ⬜ |
| [US18.15.3 — Traçabilité des décisions](FEATURES/gouvernance-securite/us-tracabilite-decisions.md) | ⬜ |
| [US18.15.4 — SSO et audit](FEATURES/gouvernance-securite/us-sso-audit.md) | ⬜ |
| [US18.15.5 — Classification des portefeuilles](FEATURES/gouvernance-securite/us-classification-portefeuilles.md) | ⬜ |
| [US18.15.6 — Étiquettes et DLP sur tâches](FEATURES/gouvernance-securite/us-etiquettes-dlp-taches.md) | ⬜ |
| **F18.16 — Intégration SI** | |
| [US18.16.1 — Interface comptabilité publique](FEATURES/integration-si/us-interface-comptabilite-publique.md) | ⬜ |
| [US18.16.2 — API et interfaces standardisées](FEATURES/integration-si/us-api-interfaces-standardisees.md) | ⬜ |
| [US18.16.3 — Intégration suite collaborative](FEATURES/integration-si/us-integration-suite-collaborative.md) | ⬜ |
| [US18.16.4 — Extensibilité low-code](FEATURES/integration-si/us-extensibilite-low-code.md) | ⬜ |
| [US18.16.5 — Accompagnement et communauté](FEATURES/integration-si/us-accompagnement-communaute.md) | ⬜ |
| **F18.17 — Licences & réversibilité** | |
| [US18.17.1 — Réversibilité contractuelle](FEATURES/licences-reversibilite/us-reversibilite-contractuelle.md) | ⬜ |
| [US18.17.2 — Garanties de pérennité](FEATURES/licences-reversibilite/us-garanties-perennite.md) | ⬜ |
| [US18.17.3 — Segmentation des licences](FEATURES/licences-reversibilite/us-segmentation-licences.md) | ⬜ |
| [US18.17.4 — Offre d'entrée incluse](FEATURES/licences-reversibilite/us-offre-entree-incluse.md) | ⬜ |
| **F18.18 — Innovation** | |
| [US18.18.1 — Lien commande publique](FEATURES/innovation/us-lien-commande-publique.md) | ⬜ |
| [US18.18.2 — Suivi des subventions](FEATURES/innovation/us-suivi-subventions.md) | ⬜ |
| [US18.18.3 — Simulation AP/CP](FEATURES/innovation/us-simulation-ap-cp.md) | ⬜ |
| [US18.18.4 — Livrables d'instance générés](FEATURES/innovation/us-livrables-instance-generes.md) | ⬜ |
| [US18.18.5 — Portail de transparence](FEATURES/innovation/us-portail-transparence.md) | ⬜ |
| [US18.18.6 — Archivage probant](FEATURES/innovation/us-archivage-probant.md) | ⬜ |
| [US18.18.7 — Indicateurs de valeur publique](FEATURES/innovation/us-indicateurs-valeur-publique.md) | ⬜ |
| [US18.18.8 — Format d'échange ouvert](FEATURES/innovation/us-format-echange-ouvert.md) | ⬜ |
| **F18.19 — Chantiers SI** | |
| [US18.19.1 — Articulation des familles](FEATURES/chantiers-si/us-articulation-familles.md) | ⬜ |
| [US18.19.2 — Cadrage SI financier](FEATURES/chantiers-si/us-cadrage-si-financier.md) | ⬜ |
| [US18.19.3 — Processus demande-arbitrage](FEATURES/chantiers-si/us-processus-demande-arbitrage.md) | ⬜ |
| [US18.19.4 — Classification et hébergement](FEATURES/chantiers-si/us-classification-hebergement.md) | ⬜ |
| [US18.19.5 — Clauses de pérennité](FEATURES/chantiers-si/us-clauses-perennite.md) | ⬜ |
| [US18.19.6 — Conduite du changement](FEATURES/chantiers-si/us-conduite-changement.md) | ⬜ |
| [US18.19.7 — Gouvernance de l'IA de pilotage](FEATURES/chantiers-si/us-gouvernance-ia-pilotage.md) | ⬜ |
| [US18.19.8 — TCO par population](FEATURES/chantiers-si/us-tco-par-population.md) | ⬜ |
| [US18.19.9 — Traçabilité réglementaire](FEATURES/chantiers-si/us-tracabilite-reglementaire.md) | ⬜ |
| [US18.19.10 — Audit RGAA](FEATURES/chantiers-si/us-audit-rgaa.md) | ⬜ |
