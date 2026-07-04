---
sidebar_position: 2
sidebar_label: "Cahier — n8n"
---

# Cahier de spécifications — Plateforme d'automatisation de workflows
## Basé sur l'analyse fonctionnelle de n8n

**Version :** 1.0 — **Date :** 4 juillet 2026 — **Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet
Analyse des fonctionnalités de n8n, plateforme d'automatisation open source de référence, puis cahier de spécifications fonctionnelles et techniques pour concevoir ou évaluer une plateforme équivalente.

### 1.2 Périmètre
Automatisation de workflows techniques et métier : éditeur visuel de nœuds, déclencheurs et actions, logique avancée (conditions, boucles, code), intégrations et API, orchestration d'agents IA, exploitation (erreurs, montée en charge), auto-hébergement et souveraineté, administration d'entreprise.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Workflow | Enchaînement de nœuds exécuté à partir d'un déclencheur |
| Nœud (node) | Brique unitaire : déclencheur, action applicative, transformation, code, IA |
| Déclencheur (trigger) | Événement lançant le workflow : webhook, planification (cron), événement applicatif |
| Exécution (run) | Instance d'un workflow, avec ses données et son journal |
| Agent IA | Nœud recevant un objectif et décidant des outils à appeler (LLM + mémoire + outils) |
| Self-hosted | Déploiement sur l'infrastructure de l'organisation (Docker/Kubernetes) |
| Fair-code | Licence source disponible avec restrictions d'usage commercial (Sustainable Use License) |

---

## 2. Analyse de l'existant : n8n

### 2.1 Positionnement
n8n (« nodemation », lancé en 2019, société allemande) est la plateforme d'automatisation open source (fair-code) de référence : environ 175 000 étoiles GitHub (contre 50 000 dix-huit mois plus tôt), des centaines de milliers d'utilisateurs, et une adoption massive par les agences et équipes techniques (chez certains intégrateurs, de 5 % de la stack en 2023 à 35 % en 2026). Son positionnement : combiner la flexibilité du code avec la vitesse du no-code, pour les équipes techniques. La version 2.0 et le support natif des agents IA en ont fait en 2026 une « plateforme d'orchestration d'IA » à part entière, considérée comme 18 à 24 mois en avance sur Zapier en matière d'IA. Auto-hébergeable gratuitement, n8n est aussi l'option de souveraineté par excellence pour les PME et ETI européennes (données sur serveur propre, RGPD natif, hébergeurs FR type OVH/Scaleway).

### 2.2 Cartographie des fonctionnalités observées
**Construction de workflows.** Éditeur visuel drag-and-drop à base de nœuds ; itération rapide (sorties affichées instantanément à côté des paramètres, exécution pas à pas) ; branchements conditionnels, fusion (merge), traitement par lots (split in batches), boucles ; expressions JavaScript pour manipuler les données dans chaque champ ; nœuds de code JavaScript et Python complets ; sub-workflows appelables.

**Déclencheurs et connectivité.** Webhooks illimités, planification cron, événements applicatifs temps réel, déclenchement manuel ou par appel API ; 400 à 1 100+ intégrations natives selon les décomptes (Google Workspace, Slack, HubSpot, Notion, PostgreSQL, Stripe, Shopify…) ; nœud HTTP Request générique couvrant toute API ; exposition de workflows comme endpoints API (n8n devient une « mini-API »).

**IA native.** Nœuds LLM natifs (OpenAI, Claude, Gemini, Mistral, DeepSeek) ; agents IA avec mémoire, outils et raisonnement ; architectures multi-agents en production ; AI Transform Node (transformation de données par prompt) ; text-to-workflow (AI Workflow Builder : description en français → workflow généré) ; briques RAG (bases vectorielles, embeddings).

**Fiabilité et exploitation.** Error workflows déclenchés automatiquement en cas d'échec ; retries ; journaux d'exécution détaillés avec données à chaque étape ; gestion fine et chiffrée des credentials ; queue mode pour la montée en charge ; versioning des workflows.

**Entreprise.** SSO, RBAC, journaux d'audit, environnements, contrôle de version Git, support dédié (plans payants/Enterprise) ; plus de 1 700 modèles communautaires ; communauté très active (forums, Discord, communauté francophone en forte croissance).

**Déploiement et modèle économique.** Self-hosted gratuit et illimité (licence fair-code, usage commercial autorisé) via Docker/Kubernetes ; cloud géré à partir de ~20-24 €/mois avec exécutions illimitées ; plans jusqu'à ~800 €/mois ; coût self-host typique PME : 50 à 500 €/mois d'infrastructure et d'exploitation.

### 2.3 Points forts et limites
**Points forts :** flexibilité inégalée (visuel + code dans le même workflow), IA native la plus avancée de la catégorie (agents, multi-agents, text-to-workflow), coût maîtrisé à volume élevé (pas de facturation à la tâche en self-host), souveraineté totale des données en auto-hébergement (argument décisif secteurs régulés), communauté et modèles très riches.
**Limites :** courbe d'apprentissage technique (inadapté à une équipe sans aucune ressource technique ni budget d'accompagnement) ; exploitation self-host à la charge de l'organisation (sauvegardes, mises à jour, sécurité) ; quelques connecteurs de niche absents face au catalogue Zapier (compensés par HTTP Request) ; licence fair-code ≠ open source OSI (restrictions de revente).

---

## 3. Spécifications fonctionnelles
Priorisation MoSCoW (M/S/C).

### 3.1 Module Éditeur de workflows (EDT)

| ID | Exigence | Prio |
|---|---|---|
| EF-EDT-01 | Éditeur visuel de nœuds drag-and-drop, avec exécution pas à pas et affichage instantané des données de sortie de chaque nœud. | M |
| EF-EDT-02 | Logique avancée : branchements conditionnels, fusion de branches, boucles, traitement par lots. | M |
| EF-EDT-03 | Expressions dynamiques dans tout champ (accès aux données des nœuds précédents). | M |
| EF-EDT-04 | Nœuds de code JavaScript et Python complets, mixables avec les nœuds natifs. | M |
| EF-EDT-05 | Sub-workflows réutilisables et appelables entre workflows. | S |
| EF-EDT-06 | Génération de workflow par description en langage naturel (text-to-workflow), avec révision humaine avant activation. | S |

### 3.2 Module Déclencheurs & connectivité (CON)

| ID | Exigence | Prio |
|---|---|---|
| EF-CON-01 | Déclencheurs : webhooks illimités, planification cron, événements applicatifs, manuel, appel API. | M |
| EF-CON-02 | Catalogue d'au moins 400 intégrations natives couvrant les SaaS majeurs et les bases de données. | M |
| EF-CON-03 | Nœud HTTP générique (toute API REST, authentifications standard) et nœuds webhooks sortants. | M |
| EF-CON-04 | Exposition d'un workflow comme endpoint API sécurisé. | S |
| EF-CON-05 | Création de connecteurs personnalisés par la communauté ou l'organisation. | S |

### 3.3 Module IA & agents (IA)

| ID | Exigence | Prio |
|---|---|---|
| EF-IA-01 | Nœuds LLM multi-fournisseurs (choix du modèle par étape, y compris modèles européens/locaux). | M |
| EF-IA-02 | Agents IA : objectif, prompt, outils (nœuds/API), mémoire, garde-fous ; insérables dans un workflow. | M |
| EF-IA-03 | Orchestration multi-agents (agents appelant des sub-workflows/autres agents). | S |
| EF-IA-04 | Briques RAG : embeddings, bases vectorielles, chargement de documents. | S |
| EF-IA-05 | Transformation de données par prompt (AI Transform) avec validation du résultat. | C |
| EF-IA-06 | Toute fonction IA désactivable par l'administrateur ; traçabilité des appels de modèles. | M |

### 3.4 Module Fiabilité & exploitation (EXP)

| ID | Exigence | Prio |
|---|---|---|
| EF-EXP-01 | Journal d'exécution complet par run : données d'entrée/sortie de chaque nœud, durée, statut. | M |
| EF-EXP-02 | Error workflows (workflow de rattrapage déclenché sur échec), retries paramétrables, alertes. | M |
| EF-EXP-03 | Rejeu (replay) d'exécutions en erreur sans perte de données. | S |
| EF-EXP-04 | Gestion centralisée et chiffrée des credentials, jamais exposés dans les logs. | M |
| EF-EXP-05 | Mode file d'attente (workers) pour la montée en charge horizontale. | S |

### 3.5 Module Gouvernance & entreprise (ADM)

| ID | Exigence | Prio |
|---|---|---|
| EF-ADM-01 | SSO (SAML/OIDC), RBAC par projet/workflow, journaux d'audit. | M |
| EF-ADM-02 | Environnements (dev/test/prod) et contrôle de version Git des workflows. | S |
| EF-ADM-03 | Bibliothèque de modèles (1 000+ communautaires + modèles internes gouvernés). | S |
| EF-ADM-04 | Self-hosting documenté (Docker/Kubernetes), y compris déploiement souverain (hébergeur FR/UE) et air-gap. | M |

## 4. Spécifications non fonctionnelles
- ENF-01 (M) : latence de déclenchement webhook < 1 s ; exécutions parallèles massives sans facturation à la tâche en self-host.
- ENF-02 (M) : aucune perte d'exécution en cas de redémarrage (persistance de la file).
- ENF-03 (M) : chiffrement des credentials au repos, secrets jamais en clair dans les journaux ; TLS 1.2+.
- ENF-04 (M) : RGPD ; en self-host, aucune donnée ne quitte l'infrastructure de l'organisation.
- ENF-05 (S) : haute disponibilité (multi-instances), sauvegarde/restauration documentées.
- ENF-06 (S) : documentation et interface en anglais, localisation FR souhaitée ; communauté active.

## 5. Modèle économique (indicatif)
Self-hosted gratuit illimité (fair-code) ; cloud managé dès ~20-24 €/mois (exécutions illimitées, facturation au workflow actif) ; Enterprise (SSO, RBAC avancé, environnements, support). Points de vigilance : coût réel du self-host = exploitation (compétences, temps) ; licence fair-code interdit la revente en SaaS concurrent.

## 6. Lots

| Lot | Contenu |
|---|---|
| Lot 1 — Socle | Éditeur visuel, déclencheurs, 400 intégrations + HTTP, logs, credentials, self-host Docker |
| Lot 2 — Robustesse | Error workflows, retries/replay, queue mode, sub-workflows, API exposée |
| Lot 3 — Entreprise | SSO/RBAC/audit, environnements, Git, modèles internes, déploiement souverain |
| Lot 4 — IA | Nœuds LLM, agents et multi-agents, RAG, text-to-workflow, gouvernance IA |

## 7. Critères d'acceptation
1. Chaque « Must » couvert par un cas de test validé. 2. Un workflow mixte (webhook → transformation code → 3 SaaS → gestion d'erreur avec rejeu) démontré de bout en bout. 3. Un agent IA outillé (lecture mail, création d'enregistrement CRM) démontré avec traçabilité complète des appels. 4. Déploiement self-host chez un hébergeur français validé avec test de restauration.

## 8. Sources
Analyse du 4 juillet 2026 : site officiel n8n.io, guides et tests francophones (Hyperstack, Les Créavores, Tech Insider, Hackceleration, nocodelowcode.fr), analyses PME France (brand-advocacy.fr, GoldWizard), documentation communautaire.
