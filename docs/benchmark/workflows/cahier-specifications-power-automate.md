---
sidebar_position: 4
sidebar_label: "Cahier — Power Automate"
---

# Cahier de spécifications — Plateforme d'automatisation d'entreprise (cloud + RPA)
## Basé sur l'analyse fonctionnelle de Microsoft Power Automate

**Version :** 1.0 — **Date :** 4 juillet 2026 — **Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet
Analyse des fonctionnalités de Microsoft Power Automate, plateforme d'hyperautomatisation de l'écosystème Microsoft, puis cahier de spécifications pour concevoir ou évaluer une plateforme équivalente.

### 1.2 Périmètre
Automatisation d'entreprise complète : flux cloud (API), flux bureau (RPA), approbations, intelligence documentaire, process mining, assistance et agents IA (Copilot), gouvernance de plateforme à l'échelle du locataire (DLP, environnements, licences), intégration à une suite bureautique et à une plateforme low-code.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Flux cloud (cloud flow) | Workflow API : déclencheur + actions via connecteurs |
| Flux de bureau (desktop flow) | RPA : automatisation de l'interface Windows (enregistreur, sélecteurs) |
| Agent flow | Flux intégrant du raisonnement IA (Copilot Studio), appelable par des agents |
| Connecteur | Intégration applicative ; standard (inclus M365) ou premium (licence) |
| DLP | Politiques de prévention de perte de données : classer/interdire des connecteurs |
| Environnement | Espace isolé (dev/test/prod) de la Power Platform, avec Dataverse |
| Process mining | Analyse des journaux systèmes pour cartographier et optimiser les processus |
| CoE | Centre d'excellence : gouvernance et animation de l'automatisation citoyenne |

---

## 2. Analyse de l'existant : Power Automate

### 2.1 Positionnement
Power Automate (ex-Microsoft Flow, 2016, renommé en 2019) est la plateforme d'automatisation de la Power Platform Microsoft, couvrant tout le spectre de l'hyperautomatisation : flux cloud low-code, RPA (desktop flows), process mining et intégration profonde avec Copilot et Copilot Studio. Elle s'adresse autant aux « makers citoyens » qu'aux développeurs professionnels, avec une promesse d'automatisation intelligente à l'échelle. Sa force structurelle est l'écosystème : déclenchement et action natifs dans Teams, SharePoint, OneDrive, Outlook, Dynamics 365, Dataverse, Power Apps, Power BI ; droits d'usage inclus dans les licences Microsoft 365 pour les connecteurs standard. La vague 2026 (release wave 1) accentue trois axes : RPA intelligente et auto-réparante (self-healing), fusion avec les agents (agent flows Copilot Studio, serveur MCP, appel de desktop flows par les agents), et process intelligence (mining orienté objets, studio moderne, intégration Microsoft Fabric).

### 2.2 Cartographie des fonctionnalités observées
**Flux cloud.** Déclencheurs/actions sur 1 000+ connecteurs (standard et premium) ; conditions, boucles, expressions, gestion d'erreurs (scopes, run-after) ; approbations natives (Teams, Outlook, mobile) ; applications mobiles (notifications, approbations, suivi des runs) ; modèles nombreux ; solutions et ALM (environnements, pipelines de déploiement).

**Copilot (IA de construction et d'exploitation).** Création de flux en langage naturel multi-tours ; réparation assistée des erreurs ; Copilot dans l'automation center (interrogation des runs, files, performances en langage naturel) ; natural-language-to-script ; enregistrement assisté (Record with Copilot) pour le RPA.

**RPA — desktop flows.** Automatisation d'applications Windows (enregistreur, sélecteurs), modes attended/unattended, machines et hosted machines, files de travail (work queues) ; nouveautés 2026 : agents d'assistance à la création et l'optimisation, vues organigramme, collaboration temps réel, contrôle de version renforcé, credentials centralisés, modèles de machines, self-healing (adaptation automatique quand les systèmes changent).

**Agent flows et IA d'exécution.** Agent flows construits en langage naturel ou en designer, embarquant du raisonnement (traitement d'exceptions intelligent, décisions contextuelles) ; ajout de flux comme outils d'agents Copilot Studio ; appel de desktop flows par les agents pour les tâches nécessitant une exécution pas à pas fiable ; AI Builder (traitement intelligent de documents : factures, formulaires) ; nœuds/actions IA dans les workflows ; serveur MCP et connecteur Power Platform (wave 2026).

**Process intelligence.** Process mining et task mining ; 2026 : mining orienté objets pour processus interconnectés, studio moderne (KPI personnalisés, layouts), intégration native Microsoft Fabric pour l'analytique d'entreprise.

**Gouvernance (différenciant structurel).** Politiques DLP (classification/blocage des connecteurs par environnement), environnements et Managed Environments, centre d'administration Power Platform (reporting consolidé licences/usage, inventaire des flux, dépendances, connexions), CoE toolkit, audit intégré au locataire M365 (Purview), données dans Dataverse au sein du tenant.

**Modèle économique.** Droits inclus dans Microsoft 365 (connecteurs standard) ; plan Premium ~15 $/utilisateur/mois (connecteurs premium, RPA attended) ; plan Process (~150 $/bot/mois, unattended) et hosted process ; pay-as-you-go ; capacité Copilot Studio en crédits pour les agent flows ; partage de licences Process via flow groups (2026).

### 2.3 Points forts et limites
**Points forts :** seul acteur couvrant cloud flows + RPA + process mining + agents dans une même plateforme ; intégration M365/Dynamics inégalée (déclencheurs natifs, approbations Teams) ; gouvernance d'entreprise la plus mature du marché (DLP, environnements, admin center, CoE) ; inclus partiellement dans les licences M365 (adoption sans friction) ; Copilot omniprésent.
**Limites :** complexité notoire du licensing (standard/premium/Process/crédits Copilot Studio — coûts difficiles à prévoir) ; enfermement dans l'écosystème Microsoft ; expressions et débogage réputés ardus ; throttling et limites de plateforme ; prolifération de flux citoyens sans gouvernance active (shadow IT interne) ; RPA historiquement fragile (adressé par le self-healing).

---

## 3. Spécifications fonctionnelles

### 3.1 Module Flux cloud (FLX)

| ID | Exigence | Prio |
|---|---|---|
| EF-FLX-01 | Flux déclencheur → actions avec conditions, boucles, expressions, gestion d'erreurs structurée (scopes, chemins d'échec). | M |
| EF-FLX-02 | Catalogue de 1 000+ connecteurs, distinguant standard/premium, avec connecteurs personnalisés (OpenAPI). | M |
| EF-FLX-03 | Approbations natives multi-canaux (messagerie d'équipe, e-mail, mobile) avec historique. | M |
| EF-FLX-04 | Applications mobiles : notifications, approbations, déclenchement et suivi des runs. | S |
| EF-FLX-05 | Déclencheurs natifs profonds dans la suite bureautique (fichiers, mails, listes, événements). | M |
| EF-FLX-06 | Solutions et ALM : environnements, pipelines de déploiement, dépendances. | M |

### 3.2 Module RPA (RPA)

| ID | Exigence | Prio |
|---|---|---|
| EF-RPA-01 | Automatisation d'interfaces desktop : enregistreur, sélecteurs robustes, attended et unattended. | S |
| EF-RPA-02 | Orchestration : machines, machines hébergées, files de travail, planification. | S |
| EF-RPA-03 | Auto-réparation (self-healing) des automatisations quand l'interface cible change. | C |
| EF-RPA-04 | Credentials centralisés, collaboration temps réel des créateurs, contrôle de version. | S |

### 3.3 Module IA & agents (IA)

| ID | Exigence | Prio |
|---|---|---|
| EF-IA-01 | Création et réparation de flux en langage naturel (copilote de construction). | S |
| EF-IA-02 | Étapes de raisonnement IA dans les flux (classification, extraction, routage, traitement d'exceptions avec escalade contextualisée). | S |
| EF-IA-03 | Traitement intelligent de documents (factures, formulaires) intégré aux flux. | S |
| EF-IA-04 | Flux exposés comme outils d'agents conversationnels ; agents appelant des flux (dont RPA) à l'exécution. | S |
| EF-IA-05 | Interrogation en langage naturel de l'exploitation (runs, files, erreurs). | C |
| EF-IA-06 | Gouvernance IA : activation par environnement, quotas/crédits visibles, localisation des traitements. | M |

### 3.4 Module Process intelligence (PMI)

| ID | Exigence | Prio |
|---|---|---|
| EF-PMI-01 | Process mining : ingestion de journaux, cartographie des processus, détection des goulots. | C |
| EF-PMI-02 | KPI personnalisés et restitution analytique intégrée au décisionnel de l'entreprise. | C |

### 3.5 Module Gouvernance de plateforme (GOV)

| ID | Exigence | Prio |
|---|---|---|
| EF-GOV-01 | Politiques DLP : classification business/non-business/bloqué des connecteurs, par environnement. | M |
| EF-GOV-02 | Environnements isolés avec politiques renforcées (Managed Environments). | M |
| EF-GOV-03 | Centre d'administration : inventaire des flux, dépendances, connexions, reporting licences/usage consolidé. | M |
| EF-GOV-04 | Kit CoE : détection des flux orphelins, campagnes de conformité, adoption. | S |
| EF-GOV-05 | Audit intégré au locataire (journal unifié), données hébergées dans le périmètre du tenant. | M |

## 4. Spécifications non fonctionnelles
- ENF-01 (M) : SLA ≥ 99,9 % ; limites de débit documentées et alertes de capacité.
- ENF-02 (M) : sécurité héritée du locataire : identités (Entra ID), MFA/accès conditionnel, chiffrement, résidence des données par géographie.
- ENF-03 (M) : conformité RGPD + certifications de la plateforme cloud (ISO 27001, SOC 2) ; auditabilité Purview.
- ENF-04 (S) : localisation FR complète de l'interface.
- ENF-05 (S) : montée en charge entreprise (dizaines de milliers de makers, millions de runs/jour).

## 5. Modèle économique (indicatif)
Droits inclus M365 (connecteurs standard) ; Premium ~15 $/util./mois ; Process ~150 $/bot ; pay-as-you-go ; crédits d'agents. Vigilance majeure : la complexité et l'imprévisibilité du licensing sont la première critique du marché — exiger simulation de coûts et reporting de consommation consolidé.

## 6. Lots

| Lot | Contenu |
|---|---|
| Lot 1 — Socle | Flux cloud, connecteurs, approbations, mobile, déclencheurs suite, logs |
| Lot 2 — Gouvernance | DLP, environnements, admin center, audit tenant, ALM/solutions |
| Lot 3 — IA | Copilote de construction, IA dans les flux, IDP, agent flows, gouvernance IA |
| Lot 4 — Hyperautomatisation | RPA (attended/unattended, self-healing), process mining, files de travail |

## 7. Critères d'acceptation
1. « Must » couverts par cas de test. 2. Un processus d'approbation métier (demande → validation Teams → écriture ERP) démontré sans code. 3. Politique DLP bloquant effectivement un connecteur grand public démontrée. 4. Reporting consolidé licences/usage validé par la DSI. 5. Un agent flow traitant une exception non prévue avec escalade contextualisée démontré.

## 8. Sources
Analyse du 4 juillet 2026 : Microsoft Learn (release wave 1 2026, Copilot in Power Automate, agent flows Copilot Studio), blog Microsoft Copilot (avril 2026), analyses (Smartbridge, Vaden, Sunflower Lab, Redmond Magazine).
