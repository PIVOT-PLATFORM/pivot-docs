---
sidebar_position: 7
sidebar_label: "Cahier — Gumloop"
---

# Cahier de spécifications — Plateforme d'automatisation IA-native (agents et pipelines IA)
## Basé sur l'analyse fonctionnelle de Gumloop

**Version :** 1.0 — **Date :** 4 juillet 2026 — **Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet
Analyse des fonctionnalités de Gumloop, plateforme d'automatisation « AI-native » de nouvelle génération, puis cahier de spécifications pour concevoir ou évaluer une plateforme équivalente.

### 1.2 Périmètre
Automatisation de tâches nécessitant du raisonnement : pipelines IA visuels (extraction, résumé, classification, routage), scraping et traitement documentaire, traitement par lots, agents proactifs dans les messageries, gouvernance de l'usage IA (modèles, budgets, audit), déploiement en cloud privé.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Flow | Pipeline visuel de nœuds : déclencheurs, logique, intégrations, actions IA |
| Nœud IA | Étape appelant un LLM : extraire, résumer, classifier, décider, générer |
| Batch | Exécution d'un flow sur une liste (fichiers, URL, enregistrements) |
| Agent proactif | Agent déployé dans Slack/Teams/e-mail, interpellé comme un collègue (@) |
| Crédit | Unité de facturation à l'usage (étapes, appels IA) |
| Gumstack | Couche de gouvernance : traçage des appels d'outils et de l'activité IA |
| ZDR | Zero Data Retention : aucune conservation des données par les fournisseurs de modèles |

---

## 2. Analyse de l'existant : Gumloop

### 2.1 Positionnement
Gumloop (ex-AgentHub, fondé en 2023 à Vancouver, Y Combinator, seed 3,1 M$ 2024, série A 17 M$ janvier 2025, série B 50 M$ menée par Benchmark en mars 2026, ~70 M$ levés ; clients : Shopify, Ramp, Instacart, Gusto, Opendoor) incarne la génération « AI-native » de l'automatisation. Là où les plateformes classiques connectent des applications, Gumloop automatise des tâches qui exigeaient du raisonnement humain : « si Zapier était une calculatrice, nous serions WolframAlpha ». Son insight fondateur, né de l'échec des agents autonomes type Auto-GPT : minimiser l'IA, la réserver au cœur de raisonnement du workflow, et garder le reste déterministe — fiabilité et coût maîtrisés. Le positionnement a mûri d'« outil d'automatisation » à « plateforme d'agents IA » : « comprendre une tâche doit être le seul prérequis pour l'automatiser ». En une phrase : « comme si Zapier et ChatGPT avaient un enfant ».

### 2.2 Cartographie des fonctionnalités observées
**Canvas et pipelines IA.** Éditeur visuel node-based drag-and-drop ; chaque nœud = opération discrète (fetch URL, extraire texte d'un PDF, prompt LLM, parser JSON, envoyer un e-mail) ; nœuds LLM natifs multi-modèles (GPT, Claude, Gemini, modèles personnalisés) : extraction de données non structurées, résumé, classification (tickets, commentaires), scoring de leads, génération de contenu, décisions et routage par IA ; sub-flows.

**Données et web.** Scraping web et extraction structurée depuis toute URL ; automatisation de navigateur ; traitement documentaire (PDF, CSV, tableurs) ; traitement par lots sur listes de fichiers/URL/enregistrements (enrichissement, milliers de documents) ; lecture/écriture en bases de données ; parsing/formatage de webhooks entrants ; extension Chrome (capture depuis le navigateur, déclenchement).

**Déclencheurs et intégrations.** Webhooks, planification, formulaires, appels API ; ~130 intégrations métier (Salesforce, Apollo, Gmail, Zendesk, Slack, tableurs) — catalogue volontairement resserré, complété par webhooks/API.

**Agents proactifs.** Agents déployés dans Slack, Microsoft Teams ou l'e-mail, interpellés comme des collègues (@Gumloop) : brief automatique avant chaque réunion avec le contexte de tous les outils, analyse d'enregistrements d'appels (objections, coaching, veille concurrentielle), surveillance et actions contextuelles.

**Gouvernance IA (différenciant).** Gumstack : source de vérité de toute l'activité IA — traçage de chaque appel d'outil via une couche unique de logging/analytics, journaux d'audit détaillés des flux de données ; contrôle des modèles IA autorisés par équipe ; garde-fous et politiques de dépense ; suivi temps réel des crédits à l'échelle de l'organisation ; budgets et quotas ; rôles réutilisables, credentials et secrets partagés à portée limitée (scoped access).

**Sécurité et déploiement.** Jamais d'entraînement de modèles sur les données clients ; accords ZDR et DPA avec les fournisseurs tiers ; SOC 2 Type II, RGPD ; exécution sur l'infrastructure Gumloop ou dans le VPC du client (« deploy in your own cloud »).

**Exploitation et modèle économique.** Logs d'exécution, tests en bac à sable, visibilité pas à pas ; bibliothèque communautaire de workflows (parcourir, copier, remixer) ; tarification aux crédits : Free ~2 000 crédits + 1 flow déclenché ; Solo ~37 $/mois (10 000 crédits) ; Pro ~97 $/mois ; Enterprise sur devis.

### 2.3 Points forts et limites
**Points forts :** la référence des pipelines IA no-code (extraction/classification/génération que les outils classiques ne savent pas faire) ; philosophie de fiabilité (IA seulement au cœur de raisonnement) ; agents proactifs dans les messageries ; gouvernance IA d'entreprise précoce et complète (Gumstack, ZDR, VPC, budgets) ; traction entreprise forte.
**Limites :** catalogue d'intégrations restreint (~130) face aux généralistes ; coûts aux crédits qui s'envolent (nœuds IA + batch : un flow mal optimisé brûle les crédits) ; courbe d'apprentissage réelle ; tuning permanent des prompts pour éviter les sorties incohérentes ; monitoring/analytique de coûts encore basiques ; société jeune (dépendance à sa trajectoire).

---

## 3. Spécifications fonctionnelles

### 3.1 Module Pipelines IA (PIP)

| ID | Exigence | Prio |
|---|---|---|
| EF-PIP-01 | Canevas visuel node-based : déclencheurs, logique, intégrations et actions IA librement combinables. | M |
| EF-PIP-02 | Nœuds IA multi-modèles : extraction structurée, résumé, classification, scoring, génération, décision/routage. | M |
| EF-PIP-03 | Choix du modèle par nœud (fournisseurs multiples, modèles personnalisés/BYOM). | M |
| EF-PIP-04 | Sub-flows réutilisables ; parsing/formatage de données (JSON, texte). | S |
| EF-PIP-05 | Traitement par lots sur listes (fichiers, URL, enregistrements) avec parallélisation. | M |

### 3.2 Module Données & web (WEB)

| ID | Exigence | Prio |
|---|---|---|
| EF-WEB-01 | Scraping et extraction structurée depuis toute URL ; automatisation de navigateur. | S |
| EF-WEB-02 | Traitement documentaire : PDF, CSV, tableurs (extraction de texte et de données). | M |
| EF-WEB-03 | Lecture/écriture en bases de données ; webhooks entrants parsés et formatés. | M |
| EF-WEB-04 | Extension navigateur : capture de données et déclenchement de flows depuis le web. | C |

### 3.3 Module Agents proactifs (AGT)

| ID | Exigence | Prio |
|---|---|---|
| EF-AGT-01 | Agents déployables dans les messageries d'équipe et l'e-mail, interpellables par mention. | S |
| EF-AGT-02 | Agents de surveillance : monitoring de canaux/sources et actions contextuelles. | S |
| EF-AGT-03 | Cas packagés : brief de réunion multi-outils, analyse d'appels commerciaux. | C |

### 3.4 Module Gouvernance IA (GOV)

| ID | Exigence | Prio |
|---|---|---|
| EF-GOV-01 | Couche unique de traçabilité de tous les appels d'outils et de modèles (qui, quoi, quelles données), avec journaux d'audit. | M |
| EF-GOV-02 | Contrôle des modèles autorisés par équipe ; garde-fous et politiques de dépense. | M |
| EF-GOV-03 | Suivi temps réel des crédits, budgets et quotas avec alertes avant plafond. | M |
| EF-GOV-04 | Credentials et secrets partagés à portée limitée ; rôles réutilisables. | M |
| EF-GOV-05 | Engagements contractuels : aucune utilisation des données pour l'entraînement, ZDR avec les fournisseurs de modèles. | M |

### 3.5 Module Exploitation & déploiement (EXP)

| ID | Exigence | Prio |
|---|---|---|
| EF-EXP-01 | Logs d'exécution pas à pas, bac à sable de test avant mise en production. | M |
| EF-EXP-02 | Déploiement dans le cloud privé du client (VPC) en option. | S |
| EF-EXP-03 | Bibliothèque communautaire de workflows (copier, remixer). | S |
| EF-EXP-04 | Analytique de coûts et prévision de consommation par flow. | S |

## 4. Spécifications non fonctionnelles
- ENF-01 (M) : SOC 2 Type II, RGPD, DPA ; chiffrement transit/repos.
- ENF-02 (M) : fiabilité des pipelines IA : sorties structurées validées (schémas), taux d'erreur mesuré par nœud IA.
- ENF-03 (M) : prévisibilité des coûts : estimation de crédits avant exécution d'un batch.
- ENF-04 (S) : montée en charge sur batchs massifs (milliers de documents) avec parallélisation contrôlée.
- ENF-05 (S) : interface localisée FR souhaitée (produit anglophone).

## 5. Modèle économique (indicatif)
Crédits : Free ~2 000 ; Solo ~37 $/mois ; Pro ~97 $/mois ; Enterprise (VPC, gouvernance avancée). Vigilance n°1 : l'explosion des crédits sur les nœuds IA et les batchs — exiger simulation, budgets et alertes (couverts par EF-GOV-03/ENF-03).

## 6. Lots

| Lot | Contenu |
|---|---|
| Lot 1 — Socle IA | Canevas, nœuds IA multi-modèles, documents, webhooks, logs/bac à sable |
| Lot 2 — Échelle | Batchs, sub-flows, scraping/navigateur, bases de données |
| Lot 3 — Gouvernance | Gumstack (traçabilité), modèles autorisés, budgets/quotas, secrets scoped, ZDR |
| Lot 4 — Agents & déploiement | Agents proactifs messageries, extension navigateur, VPC, analytique de coûts |

## 7. Critères d'acceptation
1. « Must » couverts. 2. Pipeline documentaire (100 PDF → extraction structurée → base de données) démontré avec taux d'exactitude mesuré ≥ 95 %. 3. Traçabilité Gumstack : chaque appel de modèle retrouvé en audit avec ses données. 4. Blocage effectif d'un modèle non autorisé et d'un dépassement de budget démontrés.

## 8. Sources
Analyse du 4 juillet 2026 : gumloop.com, Y Combinator (fiche et levées, série B mars 2026), revues 2026 (Lindy, Automation Atlas, Marketer Milk, AIFBA, aitoolscoop), TechCrunch.
