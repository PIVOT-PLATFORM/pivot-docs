---
sidebar_position: 3
sidebar_label: "Cahier — Zapier"
---

# Cahier de spécifications — Plateforme d'orchestration no-code et IA
## Basé sur l'analyse fonctionnelle de Zapier

**Version :** 1.0 — **Date :** 4 juillet 2026 — **Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet
Analyse des fonctionnalités de Zapier, leader historique de l'automatisation no-code devenu « plateforme d'orchestration IA », puis cahier de spécifications pour concevoir ou évaluer une plateforme équivalente.

### 1.2 Périmètre
Automatisation grand catalogue pour utilisateurs métier : workflows (Zaps), données (Tables), interfaces (formulaires/apps), chatbots, agents IA, cartographie des processus (Canvas), copilote de construction, exposition MCP, gouvernance d'équipe et d'entreprise.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Zap | Workflow : un déclencheur + une ou plusieurs actions |
| Tâche (task) | Unité de facturation : chaque action exécutée |
| Paths / Filters | Branches conditionnelles / conditions d'arrêt d'un Zap |
| Tables | Base de données native, déclencheurs/actions gratuits |
| Interfaces | Formulaires, pages et mini-apps no-code déclenchant des Zaps |
| Canvas | Outil de diagramme IA cartographiant Zaps, Tables, Interfaces, Agents |
| Agent | Assistant IA autonome : mission, outils (9 000+ apps), mémoire, garde-fous |
| Copilot | Assistant IA de construction cross-produits en langage naturel |

---

## 2. Analyse de l'existant : Zapier

### 2.1 Positionnement
Zapier (2011) est le pionnier et leader du no-code d'automatisation, repositionné en « plateforme d'orchestration de l'IA la plus connectée » : elle relie applications, agents et données sans code. Sa force historique et toujours décisive : le catalogue — plus de 8 000 applications connectées (jusqu'à 9 000 revendiquées pour les agents), le plus large du marché, loin devant tous les concurrents. La plateforme a évolué d'un outil de Zaps vers une suite : Tables, Interfaces, Chatbots, Canvas, Functions, Agents, unifiés par Copilot (construction en langage naturel) et exposés aux LLM externes via un serveur MCP. Cible : utilisateurs métier et TPE/PME/équipes qui veulent automatiser vite sans compétence technique, et désormais les entreprises (gouvernance renforcée 2025-2026 : admin center, audit log enrichi, contrôles IA).

### 2.2 Cartographie des fonctionnalités observées
**Zaps.** Déclencheur → actions multi-étapes ; Paths (branches), Filters, Formatter (transformation de données), délais, planification, webhooks, étapes de code et Functions ; sub-Zaps ; gestion d'erreurs et replay ; historique des tâches ; human-in-the-loop (validation humaine dans un Zap).

**Catalogue.** 8 000+ applications ; profondeur d'intégration élevée (nombreux triggers/actions par app) ; custom actions sur 2 500+ apps ; templates très nombreux.

**Suite de produits.** Tables : base de données native, triggers/actions/recherches non facturés ; Interfaces : formulaires, pages web, mini-apps ; Chatbots (désactivables par l'admin) ; Canvas : diagramme assisté par IA cartographiant processus et actifs (Zaps, Tables, Interfaces, Agents), avec génération automatique de la carte, mapping des champs sur le canevas, métriques d'activité et estimation du temps gagné ; Functions (code).

**IA.** Copilot : construction de systèmes cross-produits par conversation ; Agents : missions autonomes à travers les apps, mémoire (historique, préférences, contexte long terme), garde-fous (AI Guardrails), Bring Your Own Model, versions d'agents publiables, bibliothèque de templates d'agents ; AI by Zapier (étapes IA dans les Zaps) ; serveur MCP exposant des milliers d'actions aux modèles externes, avec partage des outils MCP.

**Gouvernance.** SSO/SAML, rôles et permissions, admin center, journaux d'audit (y compris changements de plan pour la conformité financière), dossiers avec onglet Documentation, contrôle du partage d'apps (Enterprise), désactivation des Chatbots à l'échelle de l'organisation, gestion des credentials des agents.

**Modèle économique.** Free 100 tâches/mois ; Professional ~19,99 $/mois ; Team ~69 $/mois ; Enterprise sur devis (pools annuels de tâches) ; facturation à la tâche ; Tables/Interfaces/MCP désormais inclus dans les plans ; essai 14 jours.

### 2.3 Points forts et limites
**Points forts :** catalogue inégalé (la probabilité que l'outil soit déjà couvert est maximale) ; accessibilité totale aux non-techniciens (un flux utile en quelques minutes) ; suite complète données+interfaces+agents ; Canvas unique pour documenter et cartographier ; MCP et agents matures avec gouvernance (guardrails, BYOM, versions).
**Limites :** coût à la tâche explosif à volume élevé (bien plus cher qu'un n8n self-host à travail égal) ; pas d'auto-hébergement, données aux États-Unis (Cloud Act — point dur pour un SI français) ; logique complexe (boucles, transformations lourdes) contrainte par la conception ; dépendance à un SaaS fermé.

---

## 3. Spécifications fonctionnelles

### 3.1 Module Workflows (ZAP)

| ID | Exigence | Prio |
|---|---|---|
| EF-ZAP-01 | Workflows déclencheur → actions multi-étapes, construits sans code, opérationnels en minutes. | M |
| EF-ZAP-02 | Branches (Paths), filtres, transformation de données (Formatter), délais, planification. | M |
| EF-ZAP-03 | Webhooks entrants/sortants et étapes de code pour les cas avancés. | M |
| EF-ZAP-04 | Sous-workflows réutilisables ; gestion d'erreurs avec alertes et rejeu des runs en échec. | M |
| EF-ZAP-05 | Étape de validation humaine (human-in-the-loop) insérable dans un workflow. | S |

### 3.2 Module Catalogue (CAT)

| ID | Exigence | Prio |
|---|---|---|
| EF-CAT-01 | Catalogue de milliers d'applications (cible : le plus large possible), avec profondeur (10+ triggers/actions sur les apps majeures). | M |
| EF-CAT-02 | Actions personnalisées sur les apps existantes et connecteurs personnalisés. | S |
| EF-CAT-03 | Bibliothèque de modèles de workflows par cas d'usage. | M |

### 3.3 Module Suite données & interfaces (SUI)

| ID | Exigence | Prio |
|---|---|---|
| EF-SUI-01 | Base de données native (tables) avec triggers/actions/recherches non facturés. | S |
| EF-SUI-02 | Constructeur de formulaires, pages et mini-apps déclenchant les workflows. | S |
| EF-SUI-03 | Cartographie visuelle des processus et des actifs (type Canvas), générée et optimisée par IA, avec métriques d'activité et documentation attachée. | S |
| EF-SUI-04 | Chatbots connectés aux workflows, désactivables par l'administrateur. | C |

### 3.4 Module IA & agents (IA)

| ID | Exigence | Prio |
|---|---|---|
| EF-IA-01 | Copilote de construction en langage naturel, cross-produits (workflow, table, interface, agent). | S |
| EF-IA-02 | Agents autonomes : mission, accès outillé au catalogue, mémoire persistante, templates. | S |
| EF-IA-03 | Garde-fous d'agents (guardrails), choix du modèle (BYOM), versions publiables d'agents. | M |
| EF-IA-04 | Serveur MCP exposant les actions du catalogue aux assistants IA externes, avec partage contrôlé. | S |
| EF-IA-05 | Étapes IA dans les workflows (classification, résumé, extraction, routage). | S |

### 3.5 Module Gouvernance (GOV)

| ID | Exigence | Prio |
|---|---|---|
| EF-GOV-01 | SSO/SAML, rôles et permissions, centre d'administration. | M |
| EF-GOV-02 | Journaux d'audit complets (actions, partages, changements de plan). | M |
| EF-GOV-03 | Contrôle des apps autorisées (allowlist) et désactivation de fonctions IA à l'échelle de l'organisation. | M |
| EF-GOV-04 | Organisation des actifs (dossiers, documentation intégrée, propriétaires, transfert de propriété). | S |

## 4. Spécifications non fonctionnelles
- ENF-01 (M) : disponibilité ≥ 99,9 % ; latence de déclenchement faible (webhooks temps réel, polling < 2 min sur plans payants).
- ENF-02 (M) : chiffrement transit/repos ; SOC 2 ; RGPD avec DPA.
- ENF-03 (M) : transparence sur la localisation des données et les sous-traitants (point critique : hébergement US par défaut).
- ENF-04 (S) : prévisibilité budgétaire : compteurs de tâches, alertes de dépassement, pools annuels.
- ENF-05 (S) : interface localisée FR.

## 5. Modèle économique (indicatif)
Free 100 tâches/mois ; Professional ~20 $/mois ; Team ~69 $/mois ; Enterprise (pool annuel). Facturation à la tâche : simple à comprendre, dangereuse à volume — vigilance n°1. Tables/Interfaces/MCP inclus sans consommer de tâches : levier de valeur.

## 6. Lots

| Lot | Contenu |
|---|---|
| Lot 1 — Socle | Zaps multi-étapes, catalogue, filtres/branches/formatter, webhooks, erreurs/rejeu, modèles |
| Lot 2 — Suite | Tables, Interfaces, human-in-the-loop, dossiers/documentation |
| Lot 3 — Entreprise | SSO, audit, admin center, allowlist d'apps, contrôles IA |
| Lot 4 — IA | Copilot, Agents (guardrails, BYOM, versions), MCP, Canvas IA, étapes IA |

## 7. Critères d'acceptation
1. « Must » couverts. 2. Un utilisateur métier construit seul un Zap 4 étapes (formulaire → CRM → messagerie → tableur) en < 30 min. 3. Un agent avec garde-fous démontré sur un cas réel avec journal d'audit. 4. Simulation budgétaire à 12 mois validée (volume ×5 sans explosion incontrôlée).

## 8. Sources
Analyse du 4 juillet 2026 : zapier.com (guides produits, Canvas, mises à jour février 2026, aide), tests FR (Cocowork juin 2026, Hackceleration), Sacesta (agents 2026), SalesHive.
