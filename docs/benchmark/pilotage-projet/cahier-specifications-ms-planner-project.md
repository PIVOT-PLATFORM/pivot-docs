---
sidebar_position: 2
sidebar_label: "Cahier — MS Planner / Project"
---

# Cahier de spécifications — Gestion de projets et de tâches intégrée à une suite collaborative
## Basé sur l'analyse fonctionnelle de Microsoft Planner / Project (plans 1, 3, 5)

**Version :** 1.0 — **Date :** 4 juillet 2026 — **Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet
Analyse des fonctionnalités du nouveau Microsoft Planner (qui unifie To Do, Planner et Project for the web) et de l'offre Project associée, puis cahier de spécifications pour concevoir ou évaluer une solution équivalente de gestion du travail intégrée à une suite collaborative.

### 1.2 Périmètre
Gestion de tâches et de projets du quotidien à l'avancé : plans d'équipe, planification premium (Gantt, dépendances, baselines, chemin critique), portefeuilles consolidés, agent IA de gestion de projet, intégration native à la messagerie/visioconférence/documents, extensibilité low-code, sécurité et conformité du locataire.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Plan basique / premium | Plan de tâches simple (inclus M365) / plan avec fonctions avancées (licence Plan 1/3/5) |
| Portfolios | Vue consolidée multi-projets (remplaçant Roadmap) : phases, jalons, dates clés |
| Baseline | Référence de planning figée pour mesurer les écarts |
| Project Manager agent | Agent IA : crée des plans, génère et exécute des tâches, produit les rapports d'état |
| Copilot | Assistant IA de la suite (licence dédiée) intégré au Planner |
| Sensitivity labels / DLP | Étiquettes de confidentialité et prévention de perte de données appliquées aux tâches |
| GCC High | Cloud gouvernemental à exigences renforcées (États-Unis) |

---

## 2. Analyse de l'existant : Microsoft Planner / Project

### 2.1 Positionnement
Microsoft a consolidé en 2025-2026 toute sa gestion du travail dans un Planner unifié : To Do (tâches individuelles), Planner (tâches d'équipe) et Project for the web (projets) ne font plus qu'une application, dans le web et dans Teams. Project for the web et les apps Project/Roadmap de Teams ont été retirés en août 2025 ; **Project Online sera désactivé le 30 septembre 2026** (blocage des nouveaux sites PWA dès avril 2026) — une échéance de migration critique pour les organisations équipées, nombreuses dans le secteur public. Le positionnement assumé : non pas égaler la profondeur des PPM spécialisés (Microsoft le revendique — Planner reste un « outil de tâches d'équipe »), mais gagner par l'intégration, la commodité et le licensing groupé : natif dans Teams, connecté à Outlook, SharePoint et Loop, inclus pour sa version basique dans les licences Microsoft 365, avec l'IA (Copilot et l'agent Project Manager) comme moteur de montée en gamme. La vague janvier-février 2026 accentue ce cap : task chat conversationnel type Teams, modèles personnalisés, agent Project Manager étendu à tous les plans pour les licenciés Copilot, agent de canal Teams (création/mise à jour de tâches, rapports d'état, plans à rebours), Facilitator (décisions de réunion converties en tâches), et étiquettes de confidentialité avec actions DLP sur les tâches (blocage copie/export/impression) — un marqueur d'entreprise rare dans la gestion de tâches.

### 2.2 Cartographie des fonctionnalités observées
**Plans basiques (inclus M365).** Tableaux de tâches (compartiments, étiquettes, checklist, pièces jointes, affectations), vues grille/tableau/calendrier, modèles prédéfinis et modèles personnalisés (2026), task chat (mentions ciblées, texte riche, fils) remplaçant les commentaires, notifications, applications web/Teams/mobile ; « ma journée » et tâches individuelles unifiées ; tâches d'équipe depuis les e-mails marqués et les réunions.

**Plans premium (Plan 1 / Plan 3 / Plan 5).** Objectifs (goals), sprints agiles, champs personnalisés, historique des tâches, dépendances avancées avec avance/retard (lead-lag), chemin critique, baselines, gestion des charges et des coûts, allocation de ressources, vues Gantt/chronologie ; **Portfolios** : vue consolidée multi-projets avec phases, jalons et dates clés ; Plan 3 inclut le client de bureau Project (5 installations) ; Plan 5 ajoute la gestion de portefeuille et de ressources de niveau entreprise.

**IA (sous licence Copilot).** Copilot dans Planner : génération de plans/tâches/objectifs en langage naturel, décomposition du travail, analyse d'avancement/risques/affectations ; **Project Manager agent** : membre d'équipe IA à part entière (visible dans la vue Personnes), crée le plan, exécute des tâches qui lui sont assignées, synthétise les rapports d'état, relance les mises à jour, tire les décisions des transcriptions de réunions Teams, génère des plans à rebours (workback) ; agent de canal Teams ; rapports d'état collaboratifs via Loop.

**Intégration à la suite.** Natif dans Teams (onglets, réunions, Facilitator), Outlook (e-mails marqués), SharePoint/M365 ; extensibilité low-code/no-code via la Power Platform (Dataverse, Power Automate pour les workflows, Power BI pour le reporting avancé) ; visualisations temps réel.

**Sécurité & conformité.** Sécurité du locataire M365 (Entra ID, accès conditionnel, audit) ; étiquettes de confidentialité sur les tâches avec DLP (2026) ; disponibilité en cloud gouvernemental (GCC/GCC High) ; centre de confidentialité documenté.

**Points d'attention 2026.** Retraits : flux iCalendar, composants Loop Planner, onglet Whiteboard et conversion des post-its, intégration Viva Goals — impacts d'intégration à inventorier ; migration Project Online obligatoire avant le 30 septembre 2026.

**Modèle économique.** Basique inclus dans M365 (E3/E5, Business) ; Plan 1 ~10 $/util./mois ; Planner & Project Plan 3 ~30 $/util./mois ; Plan 5 ~55 $/util./mois ; IA conditionnée à la licence Microsoft 365 Copilot (~30 $/util./mois) ; essai un mois.

### 2.3 Points forts et limites
**Points forts :** intégration inégalée au flux de travail quotidien (Teams, Outlook, réunions → tâches) ; coût d'entrée nul pour la version basique (activation par défaut) ; agent IA de gestion de projet le plus abouti de la catégorie généraliste (exécution de tâches, rapports, workback) ; sécurité/conformité du tenant appliquée jusqu'aux tâches (labels + DLP) ; continuum tâche individuelle → projet premium → extension Power Platform.
**Limites :** pas un PPM : pas d'arbitrage de portefeuille (scénarios, scoring, capacité à faire organisationnelle), pas de budgets pluriannuels natifs, feuilles de temps absentes (renvoi vers Power Platform/partenaires) ; fonctions clés conditionnées à l'empilement de licences (premium + Copilot) ; retraits réguliers de fonctionnalités (iCal, Loop, Whiteboard) imposant une veille ; migration Project Online sous contrainte de temps ; enfermement dans l'écosystème Microsoft ; cloud américain (résidence UE paramétrable mais éditeur soumis au droit US).

---

## 3. Spécifications fonctionnelles

### 3.1 Module Tâches d'équipe (TSK)

| ID | Exigence | Prio |
|---|---|---|
| EF-TSK-01 | Plans de tâches : compartiments, étiquettes, checklists, pièces jointes, affectations multiples, échéances. | M |
| EF-TSK-02 | Vues multiples : tableau, grille, calendrier, chronologie ; filtres et regroupements. | M |
| EF-TSK-03 | Discussion par tâche (mentions ciblées, texte riche, fils) avec notifications aux seules personnes concernées. | M |
| EF-TSK-04 | Unification tâches individuelles / tâches d'équipe / tâches issues des e-mails et réunions. | S |
| EF-TSK-05 | Modèles de plans prédéfinis et personnalisés gouvernés par l'organisation. | M |

### 3.2 Module Projets premium (PRJ)

| ID | Exigence | Prio |
|---|---|---|
| EF-PRJ-01 | Gantt/chronologie : dépendances avancées avec avance/retard, chemin critique. | M |
| EF-PRJ-02 | Baselines et historique des tâches (mesure des écarts, traçabilité des changements). | M |
| EF-PRJ-03 | Sprints agiles, objectifs (goals) rattachés aux tâches, champs personnalisés. | S |
| EF-PRJ-04 | Charges, coûts et allocation de ressources au niveau projet. | S |
| EF-PRJ-05 | Portefeuilles : vue consolidée multi-projets avec phases, jalons et dates clés configurables. | S |

### 3.3 Module IA & agent (IA)

| ID | Exigence | Prio |
|---|---|---|
| EF-IA-01 | Copilote : génération de plans/tâches/objectifs en langage naturel, décomposition, analyse d'avancement et de risques. | S |
| EF-IA-02 | Agent gestionnaire de projet : membre d'équipe IA assignable, exécution de tâches standard, rapports d'état, relances, plans à rebours. | S |
| EF-IA-03 | Capture des décisions de réunion (transcriptions) et conversion en tâches synchronisées. | S |
| EF-IA-04 | Agent de canal dans la messagerie d'équipe : création/mise à jour de tâches, questions/réponses sur le plan, rapports. | C |
| EF-IA-05 | IA conditionnée aux licences et gouvernée par l'administrateur (activation, audit des actions de l'agent). | M |

### 3.4 Module Intégration à la suite (INT)

| ID | Exigence | Prio |
|---|---|---|
| EF-INT-01 | Intégration native à la messagerie d'équipe : onglets, réunions, notifications, création de tâches en contexte. | M |
| EF-INT-02 | Intégration e-mail et calendrier (tâches depuis les e-mails, échéances visibles). | M |
| EF-INT-03 | Extensibilité low-code : workflows d'automatisation, base de données de plateforme, reporting décisionnel (BI). | S |
| EF-INT-04 | API et gestion des retraits : inventaire des intégrations, préavis, chemins de remplacement documentés. | M |

### 3.5 Module Sécurité & conformité (SEC)

| ID | Exigence | Prio |
|---|---|---|
| EF-SEC-01 | Sécurité du locataire : identité unique (SSO), accès conditionnel, MFA, audit unifié. | M |
| EF-SEC-02 | Étiquettes de confidentialité sur les tâches avec actions DLP (blocage copie/export/impression), suivant la tâche dans tous les clients. | S |
| EF-SEC-03 | Résidence des données paramétrable par géographie ; option cloud à exigences gouvernementales renforcées. | M |
| EF-SEC-04 | Migration outillée depuis les solutions retirées (type Project Online), sans perte de données, avant échéance. | M |

## 4. Spécifications non fonctionnelles
- ENF-01 (M) : disponibilité conforme au SLA de la suite (≥ 99,9 %) ; clients web, Teams, mobiles.
- ENF-02 (M) : RGPD ; localisation UE documentée ; analyse du droit applicable (éditeur extraterritorial) pour les données sensibles.
- ENF-03 (M) : localisation FR complète ; accessibilité conforme (RGAA/WCAG) — exigible pour le secteur public.
- ENF-04 (S) : adoption : prise en main sans formation pour les plans basiques ; parcours de montée en gamme progressif.
- ENF-05 (S) : transparence du licensing : simulation du coût complet (basique + premium + IA) avant déploiement.

## 5. Modèle économique (indicatif)
Basique inclus M365 ; Plan 1 ~10 $ ; Plan 3 ~30 $ (inclut client Project de bureau) ; Plan 5 ~55 $ ; IA via licence Copilot (~30 $) en sus. Vigilance : l'empilement basique→premium→Copilot rend le coût complet par utilisateur significatif ; ne licencier premium/IA que les rôles qui en ont l'usage ; anticiper la fin de Project Online (30/09/2026) dans les renouvellements.

## 6. Lots

| Lot | Contenu |
|---|---|
| Lot 1 — Socle tâches | Plans basiques, vues, task chat, modèles, mobile, intégration messagerie |
| Lot 2 — Projets | Gantt/dépendances/chemin critique, baselines, sprints, portefeuilles |
| Lot 3 — Gouvernance | Labels/DLP sur tâches, audit, résidence des données, migration Project Online |
| Lot 4 — IA & extension | Copilot, agent Project Manager, Facilitator, Power Platform/BI |

## 7. Critères d'acceptation
1. Chaque « Must » couvert par un cas de test. 2. Cycle démontré : réunion Teams → décisions converties en tâches → plan premium avec baseline → rapport d'état généré par l'agent. 3. Étiquette de confidentialité bloquant effectivement l'export d'une tâche sensible. 4. Migration d'un site Project Online de test sans perte avant l'échéance. 5. Simulation de coût complet par population d'utilisateurs validée par la DSI.

## 8. Sources
Analyse du 4 juillet 2026 : Microsoft (Community Hub — transition Planner et retraite Project for the web, retraite Project Online ; pages produit et licences Planner/Project Plan 3 ; microsoft.com/fr-fr), Sourcepass MCOE et Windows Forum (vague janvier-février 2026), UC Today (janvier 2026), The Project Group.
