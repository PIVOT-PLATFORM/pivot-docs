---
sidebar_position: 6
sidebar_label: "Cahier — ActivePieces"
---

# Cahier de spécifications — Plateforme d'automatisation open source no-code
## Basé sur l'analyse fonctionnelle d'Activepieces

**Version :** 1.0 — **Date :** 4 juillet 2026 — **Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet
Analyse des fonctionnalités d'Activepieces, plateforme d'automatisation open source « AI-first », puis cahier de spécifications pour concevoir ou évaluer une plateforme équivalente.

### 1.2 Périmètre
Automatisation no-code avec extensibilité développeur : flows, catalogue de « pieces », agents IA, exposition MCP aux assistants IA, données intégrées (Tables), humain dans la boucle (Todos), embarquement en marque blanche (OEM), auto-hébergement, gouvernance d'entreprise.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Flow | Workflow : déclencheur + actions, avec conditions, boucles et code |
| Piece | Intégration : paquet npm TypeScript typé, à la fois brique de flow et serveur MCP |
| MCP | Model Context Protocol : standard exposant des outils aux LLM (Claude, Cursor, Windsurf) |
| Todo | Étape « humain dans la boucle » : approbation, revue, action manuelle |
| Table | Datastore type feuille de calcul natif, lié aux flows et agents |
| CE / EE | Community Edition (MIT, self-host) / Enterprise Edition (licence commerciale) |
| Embed / OEM | Intégration du builder en marque blanche dans un SaaS tiers |

---

## 2. Analyse de l'existant : Activepieces

### 2.1 Positionnement
Activepieces (lancé en 2022, soutenu par Y Combinator, ~20 000 étoiles GitHub, 100 000+ installations actives) est l'alternative open source no-code à Zapier, Make et n8n. Sa Community Edition est sous licence MIT — le seul vrai open source permissif de la catégorie — auto-hébergeable gratuitement avec tâches illimitées. Son pari différenciant : l'« AI-first » par le protocole MCP — chaque piece contribuée devient automatiquement un serveur MCP utilisable par les LLM (Claude Desktop, Cursor, Windsurf), faisant d'Activepieces « le plus grand toolkit MCP open source » (280 à 470+ pieces, ~400-700 MCP annoncés, 60 % des pieces contribuées par la communauté). La plateforme réunit Agents + Flows + Tables + Todos + MCPs, en cloud ou self-host Docker, avec une offre d'embed OEM pour les éditeurs SaaS.

### 2.2 Cartographie des fonctionnalités observées
**Construction no-code.** Builder visuel glisser-déposer volontairement simple (« le canevas le plus simple de l'orchestration »), prise en main rapide pour les non-techniciens ; conditions, boucles, webhooks, HTTP générique ; étapes de code JS/TypeScript avec assistance IA (« ASK AI » : génération du code par langage naturel).

**Catalogue ouvert.** 280 à 470+ pieces, paquets npm TypeScript open source publiés sur npmjs, framework typé avec hot reloading pour développer ses propres pieces ; 60 % de contributions communautaires ; masquage d'intégrations par l'administrateur.

**MCP natif (différenciant).** Toutes les pieces exposées comme serveurs MCP : connexion des apps dans l'UI, URL de serveur MCP à ajouter dans Claude/Cursor/Windsurf, l'assistant IA lit les mails, gère le calendrier, agit dans le CRM ; flows exposés comme outils appelables par les agents externes (paramètres typés, réponses structurées) ; déclencheurs MCP.

**Agents IA et humain dans la boucle.** Agents connectés aux 400+ apps (agent builder v2) ; Todos : tâches d'approbation/revue assignées à des humains au milieu d'un flow ; pièces Delay/Approval natives.

**Données et fiabilité.** Tables : datastore natif type feuille de calcul lié aux flows/agents ; auto-retry, gestion d'erreurs, relances ; versioning des flows avec visualisation des différences type Git ; OpenTelemetry pour l'observabilité.

**Entreprise et embed.** SSO, RBAC personnalisé, journaux d'audit, environnements, permissions fines, API (plans supérieurs) ; SOC 2 Type II ; chiffrement des credentials, masquage des secrets dans les logs ; embed SDK marque blanche (provisionnement JWT, templates, masquage d'intégrations) ; self-host Docker, y compris déploiements air-gap (network-gapped).

**Modèle économique.** CE : MIT, self-host gratuit, tâches illimitées. Cloud : gratuit ~1 000 tâches/mois (10 flows actifs) ; Plus ~25 $/mois avec tâches illimitées (fair use) ; Standard/Ultimate (SSO, RBAC, audit) ; à partir de ~15 €/mois selon les distributeurs.

### 2.3 Points forts et limites
**Points forts :** vraie licence MIT (auditabilité, pas de lock-in) ; tâches illimitées (coût prévisible) ; MCP natif unique en son genre (pont vers tous les assistants IA) ; no-code réellement accessible aux non-techniciens ; Todos/human-in-the-loop natif ; embed OEM ; air-gap possible.
**Limites :** catalogue plus restreint que Zapier (8 000+) voire n8n ; self-host exigeant techniquement ; fonctionnalités entreprise clés payantes (SSO, audit) ; produit plus jeune, profondeur de certaines pieces variable ; monitoring encore basique.

---

## 3. Spécifications fonctionnelles

### 3.1 Module Builder no-code (BLD)

| ID | Exigence | Prio |
|---|---|---|
| EF-BLD-01 | Builder visuel glisser-déposer accessible sans compétence technique (prise en main < 1 h). | M |
| EF-BLD-02 | Conditions, boucles, branchements ; webhooks et HTTP générique. | M |
| EF-BLD-03 | Étapes de code (JS/TS) avec génération assistée par IA en langage naturel. | S |
| EF-BLD-04 | Versioning des flows avec diff visuel et retour arrière. | M |
| EF-BLD-05 | Modèles de flows réutilisables et partageables. | S |

### 3.2 Module Catalogue ouvert (CAT)

| ID | Exigence | Prio |
|---|---|---|
| EF-CAT-01 | Catalogue d'au moins 280 intégrations, code source ouvert et auditable. | M |
| EF-CAT-02 | Framework de création de connecteurs typé (TypeScript), avec hot reloading et publication communautaire. | M |
| EF-CAT-03 | Gouvernance du catalogue par l'administrateur : masquage/allowlist d'intégrations. | S |

### 3.3 Module MCP & agents (MCP)

| ID | Exigence | Prio |
|---|---|---|
| EF-MCP-01 | Exposition automatique de chaque intégration comme serveur MCP consommable par les assistants IA (Claude, Cursor…), avec authentification gérée par la plateforme. | M |
| EF-MCP-02 | Exposition de flows comme outils appelables par des agents externes (paramètres et réponses typés). | S |
| EF-MCP-03 | Agents IA internes connectés au catalogue, configurables sans code. | S |
| EF-MCP-04 | Contrôle administrateur des serveurs MCP exposés (périmètre, journalisation des appels). | M |

### 3.4 Module Humain dans la boucle & données (HIL)

| ID | Exigence | Prio |
|---|---|---|
| EF-HIL-01 | Étapes d'approbation/revue humaine (Todos) assignables, bloquant le flow jusqu'à décision. | M |
| EF-HIL-02 | Datastore natif type table, lisible/inscriptible par les flows et agents, avec interface d'édition. | S |
| EF-HIL-03 | Notifications des approbations (e-mail, messagerie) avec lien d'action. | S |

### 3.5 Module Exploitation, entreprise & embed (ADM)

| ID | Exigence | Prio |
|---|---|---|
| EF-ADM-01 | Auto-retry, gestion d'erreurs, relances ; journaux d'exécution détaillés ; observabilité (OpenTelemetry). | M |
| EF-ADM-02 | SSO, RBAC personnalisé, journaux d'audit, environnements, permissions fines. | M |
| EF-ADM-03 | Chiffrement des credentials, masquage des secrets dans les logs ; SOC 2 Type II visé. | M |
| EF-ADM-04 | Self-host Docker documenté, y compris air-gap ; localisation des données au choix de l'organisation. | M |
| EF-ADM-05 | SDK d'embed marque blanche (provisionnement JWT, personnalisation, masquage d'intégrations). | C |

## 4. Spécifications non fonctionnelles
- ENF-01 (M) : exécutions illimitées sans facturation à la tâche en self-host ; coût prévisible en cloud (fair use).
- ENF-02 (M) : RGPD ; données localisables ; en self-host, aucune sortie du périmètre réseau.
- ENF-03 (M) : licence du cœur réellement open source (MIT) — auditabilité et réversibilité.
- ENF-04 (S) : haute disponibilité, sauvegarde/restauration documentées.
- ENF-05 (S) : interface localisée (i18n communautaire), a minima EN + FR.

## 5. Modèle économique (indicatif)
CE MIT self-host gratuite illimitée ; cloud gratuit (~1 000 tâches/mois) ; Plus ~25 $/mois tâches illimitées ; plans entreprise (SSO, RBAC, audit, environnements) ; embed OEM sur devis. Vigilance : les fonctions de gouvernance indispensables en entreprise sont dans l'édition commerciale.

## 6. Lots

| Lot | Contenu |
|---|---|
| Lot 1 — Socle | Builder no-code, conditions/boucles, 280 pieces + HTTP/webhooks, logs, retries, versioning |
| Lot 2 — Humain & données | Todos/approbations, Tables, notifications, modèles |
| Lot 3 — Entreprise | SSO/RBAC/audit, environnements, self-host durci/air-gap, gouvernance catalogue |
| Lot 4 — IA & écosystème | MCP (pieces + flows exposés), agents, ASK AI, embed OEM |

## 7. Critères d'acceptation
1. « Must » couverts par cas de test. 2. Un non-technicien construit seul un flow à 5 étapes avec approbation humaine en < 1 h. 3. Un assistant IA externe (via MCP) exécute une action métier réelle avec journalisation complète. 4. Self-host air-gap démontré avec exécutions illimitées.

## 8. Sources
Analyse du 4 juillet 2026 : dépôt GitHub activepieces, activepieces.com (docs, MCP, pricing), analyses FR (IA-insights, Comparateur-IA, logiciels.pro, ciroapp), Better Stack, BrightCoding.
