---
sidebar_position: 4
sidebar_label: "Cahier — Sciforma"
---

# Cahier de spécifications — Plateforme PPM d'entreprise (gestion stratégique de portefeuilles)
## Basé sur l'analyse fonctionnelle de Sciforma

**Version :** 1.0 — **Date :** 4 juillet 2026 — **Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet
Analyse des fonctionnalités de Sciforma, plateforme PPM internationale de maturité élevée, largement implantée dans les organisations publiques et parapubliques françaises, puis cahier de spécifications pour concevoir ou évaluer une plateforme équivalente.

### 1.2 Périmètre
Gestion de portefeuilles de projets d'entreprise : idéation et gestion de la demande, sélection et arbitrage stratégique (scénarios), programmes, planification multi-méthodes (classique, agile, hybride), ressources et capacité, budgets et coûts, risques, temps passés, reporting décisionnel.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| SPM | Strategic Portfolio Management : alignement des portefeuilles sur la stratégie |
| Business case | Dossier de justification d'un projet : coûts, bénéfices, risques, alignement |
| Scénario what-if | Simulation d'hypothèses de portefeuille (ajout/report/abandon de projets) et de leurs impacts |
| Scoring | Notation multicritère des idées/demandes pour objectiver la sélection |
| Baseline | Référence de planning/budget figée pour mesurer les écarts |
| Hybride | Coexistence de projets en cascade (waterfall) et agiles dans un même portefeuille |
| PMO | Project Management Office : bureau des projets, garant des méthodes et du pilotage |

---

## 2. Analyse de l'existant : Sciforma

### 2.1 Positionnement
Sciforma est un éditeur PPM de plus de 30 ans d'existence, d'origine franco-américaine, revendiquant plus de 250 000 utilisateurs dans 22 pays, positionné sur l'équilibre « robustesse fonctionnelle / facilité d'utilisation » pour les PMO de maturités variées. Ses secteurs de prédilection incluent explicitement le secteur public, la santé, la finance et l'industrie ; en France, la solution est implantée dans de nombreuses organisations publiques et parapubliques. Reconnaissances : leader et médaille d'or du Data Quadrant SoftwareReviews (96 % de satisfaction déclarée), positionné au Magic Quadrant Gartner 2024 (avec KeyedIn). Fait structurant récent : **Sciforma a été acquis par Planview (décembre 2025)**, créant un « poids lourd mondial du Strategic Portfolio Management » et renforçant la présence européenne du groupe — avec les questions classiques post-acquisition (feuille de route produit, convergence d'offres type ProjectAdvantage, conditions commerciales) que tout acheteur public doit désormais instruire. La plateforme couvre PPM, SPM et gestion du travail collaboratif (CWM), en cloud, avec des modules préinstallés activables selon la maturité (« activez les modules dont vous avez besoin »).

### 2.2 Cartographie des fonctionnalités observées
**Idées et demandes.** Centre d'idées : recueil centralisé, classement par dossiers et critères, jeux de données personnalisés ; scoring multicritère avec votes indépendants des décideurs ; études de faisabilité (coûts, compétences, moyens) ; confrontation des idées avec les projets actifs ; conversion des idées approuvées en projets.

**Portefeuilles et programmes (cœur différenciant).** Vue d'ensemble de la santé et de l'avancement de tous les projets, y compris agiles ; définition des attributs et critères de décision ; **analyses de scénarios what-if multi-portefeuilles** visualisant l'impact sur charge, budget et trésorerie ; re-priorisation en temps réel avec répercussion automatique sur les indicateurs ; comparaison de versions d'un projet ; classement budgétaire ; répartition budgétaire pluriannuelle en un clic ; gestion descendante des programmes (création et synchronisation de projets depuis les programmes) ; business cases dynamiques ; visualisation risques/bénéfices ; travail collaboratif au niveau portefeuille (événements, actions, demandes d'évolution, risques, retours d'expérience, documents).

**Planification.** Gantt puissants : chemins de projet, dépendances, coûts, budgets, lots de travaux ; multi-méthodologies (cascade, agile, hybride) ; baselines et historisation/archivage ; modèles prêts à l'emploi ou transposition des méthodes internes.

**Ressources et temps.** Capacité et planification : module « capacité à faire » agrégeant les demandes des projets proposés et en cours face aux disponibilités par rôle ; visualisation des conflits et des sous-charges ; affectations optimisées ; suivi des temps intégré.

**Budgets et finances.** Gestion des budgets et coûts en temps réel ; affectation et suivi des ressources financières actuelles et futures ; flux de trésorerie ; comparaison des besoins par département et métier.

**Risques et gouvernance.** Gestion des risques et des problèmes ; automatisation des tâches ; centralisation des données ; reporting à la demande pour dirigeants et managers ; tableaux de bord de portefeuilles.

**Plateforme.** Cloud à déploiement rapide ; configuration flexible (profils : dirigeants, PMO, contrôleurs financiers, chefs de projets, équipes, gestionnaires de ressources, clients, fournisseurs, sous-traitants) ; modules évolutifs selon maturité PMO.

### 2.3 Points forts et limites
**Points forts :** profondeur d'arbitrage stratégique (scénarios what-if, scoring, business cases) parmi les meilleures du marché ; équilibre robustesse/ergonomie documenté par les évaluations utilisateurs ; multi-méthodes réellement hybride ; modularité selon maturité PMO ; expérience secteur public revendiquée ; gains mesurés annoncés (−10 % de projets en échec, +25 % de productivité).
**Limites :** incertitude post-acquisition Planview (roadmap, tarifs, pérennité de la marque) — point de vigilance contractuelle majeur ; éditeur désormais américain (siège Planview aux États-Unis) : la question de la localisation des données et du droit applicable doit être instruite ; estimation fine des critères de scoring longue à fiabiliser (donnée d'entrée du what-if) ; pas d'offre gratuite ; coût et durée d'implémentation d'un vrai PPM d'entreprise.

---

## 3. Spécifications fonctionnelles

### 3.1 Module Idées & demandes (IDE)

| ID | Exigence | Prio |
|---|---|---|
| EF-IDE-01 | Centre d'idées : recueil centralisé, classement, filtres par statut/type/critère. | M |
| EF-IDE-02 | Scoring multicritère personnalisable avec votes indépendants des décideurs. | M |
| EF-IDE-03 | Études de faisabilité : coûts, compétences, ressources ; confrontation avec les projets actifs. | S |
| EF-IDE-04 | Conversion des idées approuvées en projets/programmes en un clic, avec traçabilité. | M |

### 3.2 Module Portefeuilles & programmes (PTF)

| ID | Exigence | Prio |
|---|---|---|
| EF-PTF-01 | Vue d'ensemble temps réel de la santé des projets (y compris agiles), avec drill-down vers le détail. | M |
| EF-PTF-02 | Scénarios what-if multi-portefeuilles : simulation d'ajouts/reports/abandons et impacts charge/budget/trésorerie. | M |
| EF-PTF-03 | Re-priorisation en temps réel avec répercussion automatique sur tous les indicateurs. | M |
| EF-PTF-04 | Business cases dynamiques : coûts, bénéfices, risques, alignement stratégique ; comparaison de versions. | S |
| EF-PTF-05 | Gestion de programmes descendante : création et synchronisation de projets depuis un programme. | S |
| EF-PTF-06 | Objets collaboratifs de portefeuille : actions, risques, demandes d'évolution, retours d'expérience, documents. | S |

### 3.3 Module Planification multi-méthodes (PLA)

| ID | Exigence | Prio |
|---|---|---|
| EF-PLA-01 | Gantt avancé : dépendances, chemin critique, lots de travaux, coûts au planning. | M |
| EF-PLA-02 | Support natif cascade, agile et hybride dans un même portefeuille consolidé. | M |
| EF-PLA-03 | Baselines et historisation : références figées, mesure des écarts, archivage. | M |
| EF-PLA-04 | Modèles méthodologiques : bibliothèque fournie et transposition des méthodes internes. | S |

### 3.4 Module Ressources, temps & budgets (RTB)

| ID | Exigence | Prio |
|---|---|---|
| EF-RTB-01 | Capacité à faire : agrégation des demandes (projets proposés + en cours) face aux disponibilités par rôle. | M |
| EF-RTB-02 | Visualisation des conflits d'utilisation et des sous-charges ; optimisation des affectations. | M |
| EF-RTB-03 | Suivi des temps passés intégré aux projets. | M |
| EF-RTB-04 | Budgets et coûts temps réel, flux de trésorerie, répartition pluriannuelle par portefeuille. | M |

### 3.5 Module Gouvernance & reporting (GOV)

| ID | Exigence | Prio |
|---|---|---|
| EF-GOV-01 | Gestion des risques et problèmes aux niveaux projet, programme et portefeuille. | M |
| EF-GOV-02 | Tableaux de bord et reporting à la demande par profil (dirigeant, PMO, finance, équipe). | M |
| EF-GOV-03 | Configuration par profils (10+ rôles types, y compris clients/fournisseurs/sous-traitants) avec droits fins. | M |
| EF-GOV-04 | Modularité : activation progressive des modules selon la maturité de l'organisation. | S |
| EF-GOV-05 | Automatisation des tâches PPM répétitives (workflows, notifications, mises à jour). | S |

## 4. Spécifications non fonctionnelles
- ENF-01 (M) : cloud à déploiement rapide ; localisation des données documentée et contractualisée (résidence UE exigible).
- ENF-02 (M) : RGPD, certifications de sécurité (ISO 27001/SOC 2) ; réversibilité contractuelle (export complet).
- ENF-03 (M) : interface localisée FR ; accessibilité (RGAA/WCAG) pour les déploiements publics.
- ENF-04 (S) : performances de consolidation sur portefeuilles volumineux ; répercussion instantanée des re-priorisations.
- ENF-05 (S) : garanties de pérennité post-acquisition : feuille de route engagée, clause de protection tarifaire.

## 5. Modèle économique (indicatif)
Abonnement cloud par utilisateur/profil, sur devis ; modules activables ; positionnement prix documenté sous la moyenne de la catégorie PPM d'entreprise ; implémentation et paramétrage par l'éditeur ou des intégrateurs. Vigilance : instruire les effets de l'acquisition Planview (convergence d'offres, conditions de renouvellement) dans toute contractualisation, surtout en marché public pluriannuel.

## 6. Lots

| Lot | Contenu |
|---|---|
| Lot 1 — Socle projets | Planification Gantt multi-méthodes, risques, temps, tableaux de bord, profils |
| Lot 2 — Portefeuille | Idées/demandes, scoring, business cases, vue 360°, re-priorisation |
| Lot 3 — Arbitrage avancé | Scénarios what-if, capacité à faire, budgets pluriannuels/trésorerie, programmes |
| Lot 4 — Industrialisation | Automatisations, reporting avancé, intégrations SI, modularité de déploiement |

## 7. Critères d'acceptation
1. Chaque « Must » couvert par un cas de test. 2. Un cycle d'arbitrage complet démontré : 20 idées scorées → 3 scénarios what-if comparés (charge/budget/trésorerie) → décision tracée → projets lancés. 3. Portefeuille hybride (5 projets cascade + 5 agiles) consolidé dans une même vue de santé. 4. Re-priorisation répercutée sur tous les indicateurs en moins de 5 secondes. 5. Localisation des données et plan de réversibilité validés contractuellement.

## 8. Sources
Analyse du 4 juillet 2026 : sciforma.com/fr (produit, gestion de portefeuilles, pourquoi PPM, blog, SoftwareReviews), page d'acquisition Planview, chef-de-projet.fr, GetApp France 2026, Celge.
