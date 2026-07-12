---
title: Cockpits DSI — bijection profils ↔ cockpits
sidebar_position: 11
description: Table de correspondance exhaustive entre les ~200 profils DSI de la taxonomie et les 7 cockpits, dérivée de l'axe job-to-be-done (macro-rôle).
---

Cette page **matérialise** le principe de composition posé dans
[Cockpits DSI — conseils UX/UI](cockpits-dsi.md) : au lieu d'affirmer que « 5–7 archétypes
couvrent 100+ profils », elle **assigne chaque profil de la taxonomie à un cockpit et un seul**,
pour que la couverture soit vérifiable profil par profil.

## Ce qui est mis en bijection

- **Domaine de départ** — les **145 rôles** canoniques de
  [`docs/taxonomie/roles.json`](../../taxonomie/roles.json) (`perimetre` DSI / Métier / Externe),
  dont **129 en périmètre DSI**, et **plus de 300 intitulés distincts** une fois dépliées les
  appellations et alias — l'ordre de grandeur des « ~200 profils DSI ».
- **Domaine d'arrivée** — **7 cockpits**, définis par le **job-to-be-done dominant** (l'axe qui
  change réellement l'écran). Un profil a **un** macro-rôle → **un** JTBD → **un** cockpit :
  l'application est **totale** (tout profil est couvert) et **fonctionnelle** (un seul cockpit par profil).
- **Ce qui n'est PAS l'axe cockpit** — l'**archétype organisationnel** (grand groupe / public /
  éditeur / banque-assurance / industrie-santé / PME, cf. `roles.json > archetypes`) et la **taille**
  ne changent pas *quel* cockpit, mais **quelles cards y sont visibles** (couche de composition).

> La bijection est définie sur les **145 rôles** ; comme chaque appellation hérite du cockpit de son
> rôle, elle est **close sur l'ensemble des intitulés** sans mapping supplémentaire.

## Règle de dérivation (auditable)

`profil → macro-rôle (taxonomie) → cockpit`. Douze des treize macro-rôles tombent en bloc sur un
cockpit ; seul **`transverses-externes`** (émergents + prestataires externes) est réparti au rôle,
plus **3 exceptions** justifiées. La liste complète des règles est en fin de page (§ Traçabilité).

## Les 7 cockpits

| # | Cockpit | Job-to-be-done (règle des 3 s) | Couche / domaine dominant | Profils |
| --- | --- | --- | --- | ---: |
| C1 | **Gouvernance & Stratégie SI** | Est-ce que la trajectoire SI tient ? Arbitrer le portefeuille, le budget/ROI, les activations de domaines. | Transverse (ROI, adoption globale) + Pilotage | 29 |
| C2 | **Delivery & Agilité (Build)** | Est-ce qu'on livre ? Vélocité, régularité des standups, capacity, qualité de la construction. | Agilité | 26 |
| C3 | **Architecture, Urbanisation & Données** | Est-ce que le SI et sa donnée sont sous contrôle ? Cartographie, cohérence cible, gouvernance & qualité des données, IA/AI Act. | Transverse (urbanisation, gouvernance données) | 21 |
| C4 | **Exploitation & Services (Run)** | Est-ce que ça tourne ? Santé de l'instance, incidents, SLA, capacité, supervision, support. | Transverse (santé instance) + ITSM | 34 |
| C5 | **Sécurité & Continuité** | Est-ce qu'on est protégé ? Posture de sécurité, OIDC/IAM, alertes, correctifs en attente, PCA/PRA. | Transverse (Sécurité & OIDC — card obligatoire, jamais masquable) | 11 |
| C6 | **Conformité, Qualité & Risques** | Est-ce qu'on est en règle ? RGPD, RGAA, conformité AGPL, audits, normes, risques, numérique responsable. | Transverse (RGPD, RGAA, AGPL — cards obligatoires) | 12 |
| C7 | **Adoption, Métier & Changement** | Est-ce que c'est adopté ? Usage réel (whiteboard/live/quiz/formulaires), conduite du changement, formation, satisfaction. | Collaboratif + Transverse (adoption globale) | 12 |
| | | | **Total** | **145** |

![Bijection 145 profils DSI vers 7 cockpits](diagrams/cockpits-dsi-bijection.png)

> Source PlantUML : [`diagrams/cockpits-dsi-bijection.puml`](diagrams/cockpits-dsi-bijection.puml) — le PNG est généré en CI.

## Bijection détaillée — chaque profil, son cockpit

Périmètre : 🏛 DSI · 🧩 Métier · 🔗 Externe. Un profil marqué de plusieurs périmètres apparaît
sous son périmètre principal dans la taxonomie.

### C1 · Gouvernance & Stratégie SI — 29 profils

*JTBD : Est-ce que la trajectoire SI tient ? Arbitrer le portefeuille, le budget/ROI, les activations de domaines.*  
*Cards types : Roadmap d'adoption, santé du portefeuille projets, ROI vs SaaS, budget/coût, activation des domaines, staffing.*

| Profil | Appellations | Périmètre | Domaine taxonomie | Macro-rôle |
| --- | --- | --- | --- | --- |
| Chief Digital Officer | CDO (digital) | 🏛 🧩 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| DSI adjoint | Deputy CIO | 🏛 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| Directeur de la production / des opérations SI | Head of IT Operations | 🏛 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| Directeur de la relation métier | Head of Business Relationship | 🏛 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| Directeur de programme / portefeuille | Program Director, Head of PMO | 🏛 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| Directeur des systèmes d'information | DSI, CIO | 🏛 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| Directeur des études / du développement | Head of Delivery | 🏛 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| Directeur infrastructure | Head of Infrastructure | 🏛 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| Directeur technique | CTO | 🏛 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| Responsable de la stratégie SI | IT Strategy Lead | 🏛 | 1 · Direction & gouvernance SI | Direction & pilotage SI |
| Chef de projet | Project Manager, CP MOE | 🏛 | 2 · Gouvernance, PMO & pilotage | Gestion de projet & portefeuille |
| Chef de projet MOA | AMOA, Business Project Manager | 🏛 🧩 | 2 · Gouvernance, PMO & pilotage | Gestion de projet & portefeuille |
| Contrôleur de gestion SI | IT Controller, Cost Controller | 🏛 | 2 · Gouvernance, PMO & pilotage | Gestion de projet & portefeuille |
| Directeur de projet | Project Director | 🏛 | 2 · Gouvernance, PMO & pilotage | Gestion de projet & portefeuille |
| Gestionnaire de portefeuille | Portfolio Manager (PPM) | 🏛 | 2 · Gouvernance, PMO & pilotage | Gestion de projet & portefeuille |
| Officier / responsable PMO | Project Management Officer | 🏛 | 2 · Gouvernance, PMO & pilotage | Gestion de projet & portefeuille |
| Planificateur | Planning Manager, Planner | 🏛 | 2 · Gouvernance, PMO & pilotage | Gestion de projet & portefeuille |
| Responsable financier SI / FinOps | IT Finance Manager, FinOps | 🏛 | 2 · Gouvernance, PMO & pilotage | Gestion de projet & portefeuille |
| Responsable méthodes & qualité projet | Delivery Methods Lead | 🏛 | 2 · Gouvernance, PMO & pilotage | Gestion de projet & portefeuille |
| Acheteur informatique | IT Buyer, Category Manager | 🏛 | 11 · Achats, contrats & fournisseurs | Achats, contrats & fournisseurs |
| Contract Manager | Gestionnaire de contrats | 🏛 | 11 · Achats, contrats & fournisseurs | Achats, contrats & fournisseurs |
| Gestionnaire de la relation fournisseur | Vendor Manager | 🏛 | 11 · Achats, contrats & fournisseurs | Achats, contrats & fournisseurs |
| Gestionnaire des logiciels / licences | Software Asset Manager (SAM) | 🏛 | 11 · Achats, contrats & fournisseurs | Achats, contrats & fournisseurs |
| Responsable des marchés ⚙️ | Public Procurement Officer | 🏛 | 11 · Achats, contrats & fournisseurs | Achats, contrats & fournisseurs |
| Responsable sourcing / partenariats | Sourcing Manager | 🏛 | 11 · Achats, contrats & fournisseurs | Achats, contrats & fournisseurs |
| Responsable innovation ⚙️ | Innovation Manager | 🏛 🧩 | 13 · Transverses, émergents & innovation | Transverses & externes |
| Responsable staffing / ressources ⚙️ | Resource Manager | 🏛 | 13 · Transverses, émergents & innovation | Transverses & externes |
| Responsable transformation numérique ⚙️ | Digital Transformation Lead | 🏛 🧩 | 13 · Transverses, émergents & innovation | Transverses & externes |
| Consultant / cabinet conseil ⚙️ | Consultant | 🔗 | 14 · Externes intervenant dans la DSI | Transverses & externes |

### C2 · Delivery & Agilité (Build) — 26 profils

*JTBD : Est-ce qu'on livre ? Vélocité, régularité des standups, capacity, qualité de la construction.*  
*Cards types : Vélocité, régularité des standups, capacity, burn-down, qualité de code / tests, releases.*

| Profil | Appellations | Périmètre | Domaine taxonomie | Macro-rôle |
| --- | --- | --- | --- | --- |
| Business Analyst | BA, Analyste fonctionnel | 🏛 🧩 | 3 · Produit & agilité | Produit & agilité |
| Chercheur UX | UX Researcher | 🏛 | 3 · Produit & agilité | Produit & agilité |
| Coach agile | Agile Coach | 🏛 🔗 | 3 · Produit & agilité | Produit & agilité |
| Delivery Manager | Delivery Lead | 🏛 | 3 · Produit & agilité | Produit & agilité |
| Designer produit / UX-UI | Product Designer, UX/UI | 🏛 | 3 · Produit & agilité | Produit & agilité |
| Product Manager | PM | 🏛 🧩 | 3 · Produit & agilité | Produit & agilité |
| Product Owner | PO | 🏛 🧩 | 3 · Produit & agilité | Produit & agilité |
| Proxy Product Owner | Proxy PO | 🏛 | 3 · Produit & agilité | Produit & agilité |
| Release Train Engineer | RTE (SAFe) | 🏛 | 3 · Produit & agilité | Produit & agilité |
| Responsable de squad / tribu / chapitre | Squad/Tribe/Chapter Lead | 🏛 | 3 · Produit & agilité | Produit & agilité |
| Scrum Master | SM | 🏛 | 3 · Produit & agilité | Produit & agilité |
| Développeur | Software Engineer, dev front/back/full-stack | 🏛 🔗 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Développeur RPA | RPA Developer | 🏛 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Développeur citoyen (maker) | Maker, Citizen Developer | 🧩 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Développeur d'intégration / API | Integration Developer | 🏛 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Développeur embarqué / firmware | Embedded Engineer | 🏛 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Développeur low-code / no-code | Citizen Developer | 🏛 🧩 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Développeur mobile | Mobile Developer | 🏛 🔗 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Ingénieur performance | Performance Engineer | 🏛 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Ingénieur test / QA | QA Engineer, Testeur | 🏛 🔗 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Mainteneur du produit / open source | Mainteneur, Maintainer | 🏛 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Responsable des tests | QA Lead, Test Manager | 🏛 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Référent technique | Tech Lead, Lead Dev | 🏛 | 4 · Études, développement & ingénierie logicielle | Ingénierie & développement |
| Alternant / stagiaire / apprenti ⚙️ | Trainee, Intern | 🏛 | 13 · Transverses, émergents & innovation | Transverses & externes |
| Prestataire TRA ⚙️ | Tierce Recette Applicative | 🔗 | 14 · Externes intervenant dans la DSI | Transverses & externes |
| Prestataire de développement ⚙️ | ESN, SSII, Contractor | 🔗 | 14 · Externes intervenant dans la DSI | Transverses & externes |

### C3 · Architecture, Urbanisation & Données — 21 profils

*JTBD : Est-ce que le SI et sa donnée sont sous contrôle ? Cartographie, cohérence cible, gouvernance & qualité des données, IA/AI Act.*  
*Cards types : Cartographie applicative, dette d'urbanisation, catalogue & qualité des données, pipelines, conformité IA (AI Act).*

| Profil | Appellations | Périmètre | Domaine taxonomie | Macro-rôle |
| --- | --- | --- | --- | --- |
| Architecte applicatif | Application Architect | 🏛 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Architecte cloud | Cloud Architect | 🏛 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Architecte d'entreprise | Enterprise Architect | 🏛 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Architecte d'intégration | Integration Architect | 🏛 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Architecte données | Data Architect | 🏛 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Architecte fonctionnel | Functional Architect | 🏛 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Architecte solution | Solution Architect | 🏛 🔗 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Architecte sécurité | Security Architect | 🏛 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Architecte technique | Technical Architect | 🏛 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Urbaniste SI | IT Town Planner | 🏛 | 5 · Architecture & urbanisation | Architecture & urbanisation |
| Analyste de données | Data Analyst | 🏛 🧩 | 9 · Données & intelligence artificielle | Données & IA |
| Chief Data Officer | CDO (data) | 🏛 🧩 | 9 · Données & intelligence artificielle | Données & IA |
| Data scientist | Data Scientist | 🏛 🧩 | 9 · Données & intelligence artificielle | Données & IA |
| Développeur décisionnel | BI Developer | 🏛 | 9 · Données & intelligence artificielle | Données & IA |
| Ingénieur ML / MLOps | ML Engineer, MLOps | 🏛 | 9 · Données & intelligence artificielle | Données & IA |
| Ingénieur données | Data Engineer | 🏛 | 9 · Données & intelligence artificielle | Données & IA |
| Ingénieur qualité des données | Data Quality Engineer | 🏛 | 9 · Données & intelligence artificielle | Données & IA |
| Intendant de données | Data Steward | 🏛 🧩 | 9 · Données & intelligence artificielle | Données & IA |
| Propriétaire de données | Data Owner | 🧩 | 9 · Données & intelligence artificielle | Données & IA |
| Responsable gouvernance des données | Data Governance Manager | 🏛 | 9 · Données & intelligence artificielle | Données & IA |
| Responsable éthique de l'IA | AI Ethics / Responsible AI Lead | 🏛 🧩 | 9 · Données & intelligence artificielle | Données & IA |

### C4 · Exploitation & Services (Run) — 34 profils

*JTBD : Est-ce que ça tourne ? Santé de l'instance, incidents, SLA, capacité, supervision, support.*  
*Cards types : Bandeau santé instance, incidents en cours, SLA/dispo, capacité, files de support, changements en production.*

| Profil | Appellations | Périmètre | Domaine taxonomie | Macro-rôle |
| --- | --- | --- | --- | --- |
| Administrateur base de données | DBA | 🏛 🔗 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur / administrateur réseau | Network Engineer | 🏛 🔗 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur / administrateur système | Sysadmin, SysEng | 🏛 🔗 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur CI/CD | Build/Release Engineer | 🏛 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur DevOps | DevOps Engineer | 🏛 🔗 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur SRE | Site Reliability Engineer | 🏛 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur cloud | Cloud Engineer | 🏛 🔗 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur d'exploitation / pilote | IT Operator, Ops Pilot | 🏛 🔗 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur observabilité | Monitoring/Observability Eng. | 🏛 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur plateforme | Platform Engineer | 🏛 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur stockage / sauvegarde | Storage/Backup Engineer | 🏛 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Ingénieur télécom | Telecom Engineer | 🏛 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Technicien datacenter | Datacenter Technician | 🏛 🔗 | 6 · Infrastructure, production & exploitation | Infrastructure & exploitation |
| Administrateur de la plateforme / tenant | Admin, Platform Admin, Tenant Admin | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Expert support N3 | Support N3, expert applicatif | 🏛 🔗 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Gestionnaire d'incidents | Incident Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Gestionnaire de la connaissance | Knowledge Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Gestionnaire de parc / d'actifs | IT Asset Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Gestionnaire de problèmes | Problem Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Gestionnaire des changements | Change Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Gestionnaire des configurations | Configuration Manager (CMDB) | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Gestionnaire des demandes | Request Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Gestionnaire des mises en production | Release Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Gestionnaire des niveaux de service | Service Level Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Responsable disponibilité / capacité | Availability/Capacity Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Responsable du catalogue de services | Service Catalog Manager | 🏛 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Technicien de proximité | Onsite Support, VIP Support | 🏛 🔗 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Technicien poste de travail / déploiement | Desktop/Deployment Technician | 🏛 🔗 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Technicien support N1 | Service Desk, Helpdesk | 🏛 🔗 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Technicien support N2 | Support N2 | 🏛 🔗 | 7 · Support, service desk & services (ITSM) | Support & services (ITSM) |
| Hébergeur / fournisseur cloud ⚙️ | Cloud/Hosting Provider | 🔗 | 14 · Externes intervenant dans la DSI | Transverses & externes |
| Infogérant / MSP ⚙️ | Managed Service Provider | 🔗 | 14 · Externes intervenant dans la DSI | Transverses & externes |
| Prestataire TMA ⚙️ | Tierce Maintenance Applicative | 🔗 | 14 · Externes intervenant dans la DSI | Transverses & externes |
| Éditeur logiciel ⚙️ | Software Vendor | 🔗 | 14 · Externes intervenant dans la DSI | Transverses & externes |

### C5 · Sécurité & Continuité — 11 profils

*JTBD : Est-ce qu'on est protégé ? Posture de sécurité, OIDC/IAM, alertes, correctifs en attente, PCA/PRA.*  
*Cards types : Posture sécurité, OIDC/IAM, correctifs de sécurité en attente, alertes SOC, état PCA/PRA, risques SSI.*

| Profil | Appellations | Périmètre | Domaine taxonomie | Macro-rôle |
| --- | --- | --- | --- | --- |
| Analyste SOC | SOC Analyst | 🏛 🔗 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Analyste de la menace | Threat Intelligence Analyst | 🏛 🔗 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Analyste réponse à incident | CSIRT/CERT, Forensic Analyst | 🏛 🔗 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Correspondant sécurité | Security Champion | 🏛 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Gestionnaire des risques SSI | Security Risk Manager | 🏛 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Ingénieur IAM | Identity & Access Engineer | 🏛 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Ingénieur sécurité | Security Engineer | 🏛 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Responsable conformité sécurité | Security Compliance Officer | 🏛 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Responsable continuité / reprise | PCA/PRA Manager, BCP/DRP | 🏛 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Responsable de la sécurité SI | RSSI, CISO | 🏛 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |
| Testeur d'intrusion | Pentester, Ethical Hacker | 🏛 🔗 | 8 · Cybersécurité & continuité | Cybersécurité & continuité |

### C6 · Conformité, Qualité & Risques — 12 profils

*JTBD : Est-ce qu'on est en règle ? RGPD, RGAA, conformité AGPL, audits, normes, risques, numérique responsable.*  
*Cards types : Conformité RGPD, RGAA/WCAG 2.1 AA, conformité licence AGPL, journal d'audit, risques SI, empreinte numérique responsable.*

| Profil | Appellations | Périmètre | Domaine taxonomie | Macro-rôle |
| --- | --- | --- | --- | --- |
| Juriste SI ⚙️ | IT Legal Counsel | 🏛 🔗 | 11 · Achats, contrats & fournisseurs | Achats, contrats & fournisseurs |
| Auditeur SI | IT Auditor | 🏛 🔗 | 12 · Qualité, conformité, audit & risques | Qualité, conformité & audit |
| Délégué à la protection des données | DPO | 🏛 🧩 | 12 · Qualité, conformité, audit & risques | Qualité, conformité & audit |
| Gestionnaire des risques SI | IT Risk Manager | 🏛 | 12 · Qualité, conformité, audit & risques | Qualité, conformité & audit |
| Responsable accessibilité numérique | Accessibility Lead (RGAA) | 🏛 | 12 · Qualité, conformité, audit & risques | Qualité, conformité & audit |
| Responsable amélioration continue | Continuous Improvement Manager | 🏛 | 12 · Qualité, conformité, audit & risques | Qualité, conformité & audit |
| Responsable conformité | Compliance Officer | 🏛 | 12 · Qualité, conformité, audit & risques | Qualité, conformité & audit |
| Responsable qualité SI | IT Quality Manager | 🏛 | 12 · Qualité, conformité, audit & risques | Qualité, conformité & audit |
| Responsable référentiels & normes | Frameworks Lead (ITIL/COBIT/ISO) | 🏛 | 12 · Qualité, conformité, audit & risques | Qualité, conformité & audit |
| Responsable numérique responsable ⚙️ | Green IT / Sustainable IT Lead | 🏛 | 13 · Transverses, émergents & innovation | Transverses & externes |
| Auditeur externe ⚙️ | External Auditor | 🔗 | 14 · Externes intervenant dans la DSI | Transverses & externes |
| Régulateur / organisme de certification ⚙️ | Regulator, Certification Body | 🔗 | 14 · Externes intervenant dans la DSI | Transverses & externes |

### C7 · Adoption, Métier & Changement — 12 profils

*JTBD : Est-ce que c'est adopté ? Usage réel (whiteboard/live/quiz/formulaires), conduite du changement, formation, satisfaction.*  
*Cards types : Usage whiteboard / sessions live / quiz / formulaires, adoption par direction métier, conduite du changement, formation, satisfaction.*

| Profil | Appellations | Périmètre | Domaine taxonomie | Macro-rôle |
| --- | --- | --- | --- | --- |
| Animateur / facilitateur d'atelier | Facilitateur, Animateur | 🏛 🧩 | 10 · Relation métier, MOA & conduite du changement | Relation métier & changement |
| Assistance à maîtrise d'ouvrage | AMOA | 🏛 🔗 | 10 · Relation métier, MOA & conduite du changement | Relation métier & changement |
| Formateur / ingénieur pédagogique | Trainer, Instructional Designer | 🏛 🔗 | 10 · Relation métier, MOA & conduite du changement | Relation métier & changement |
| Maîtrise d'ouvrage | MOA, Product Owner métier | 🧩 | 10 · Relation métier, MOA & conduite du changement | Relation métier & changement |
| Responsable conduite du changement | Change Management Lead | 🏛 🧩 | 10 · Relation métier, MOA & conduite du changement | Relation métier & changement |
| Responsable de la relation métier | Business Relationship Manager | 🏛 | 10 · Relation métier, MOA & conduite du changement | Relation métier & changement |
| Rédacteur technique | Technical Writer | 🏛 🔗 | 10 · Relation métier, MOA & conduite du changement | Relation métier & changement |
| Utilisateur clé / référent métier | Key User, Power User | 🧩 | 10 · Relation métier, MOA & conduite du changement | Relation métier & changement |
| Utilisateur final / bénéficiaire | End User | 🧩 | 10 · Relation métier, MOA & conduite du changement | Relation métier & changement |
| Développeur citoyen ⚙️ | Citizen Developer | 🧩 | 13 · Transverses, émergents & innovation | Transverses & externes |
| Responsable digital workplace ⚙️ | Digital Workplace Manager | 🏛 | 13 · Transverses, émergents & innovation | Transverses & externes |
| Utilisateur final / bénéficiaire ⚙️ | End User | 🧩 | 14 · Externes intervenant dans la DSI | Transverses & externes |

## Traçabilité — règles d'assignation

### Macro-rôles assignés en bloc (12/13)

| Macro-rôle (taxonomie) | → Cockpit |
| --- | --- |
| Direction & pilotage SI | Gouvernance & Stratégie SI |
| Gestion de projet & portefeuille | Gouvernance & Stratégie SI |
| Produit & agilité | Delivery & Agilité (Build) |
| Ingénierie & développement | Delivery & Agilité (Build) |
| Architecture & urbanisation | Architecture, Urbanisation & Données |
| Infrastructure & exploitation | Exploitation & Services (Run) |
| Support & services (ITSM) | Exploitation & Services (Run) |
| Cybersécurité & continuité | Sécurité & Continuité |
| Données & IA | Architecture, Urbanisation & Données |
| Relation métier & changement | Adoption, Métier & Changement |
| Achats, contrats & fournisseurs | Gouvernance & Stratégie SI |
| Qualité, conformité & audit | Conformité, Qualité & Risques |
| Transverses & externes | *réparti au rôle (voir exceptions)* |

### Exceptions au rôle (⚙️)

Chaque exception surclasse le défaut du macro-rôle parce que le **JTBD réel** du profil diffère
de sa famille d'origine (typiquement : externes et profils émergents du domaine 13–14).

| Profil | Macro-rôle d'origine | → Cockpit | Raison |
| --- | --- | --- | --- |
| Juriste SI | Achats, contrats & fournisseurs | Conformité, Qualité & Risques | Sécurisation juridique AGPL/RGPD/contrats → contrôle de conformité. |
| Responsable des marchés | Achats, contrats & fournisseurs | Gouvernance & Stratégie SI | Marchés publics = achat/gouvernance économique. |
| Responsable innovation | Transverses & externes | Gouvernance & Stratégie SI | Exploration cadrée par la stratégie SI. |
| Responsable transformation numérique | Transverses & externes | Gouvernance & Stratégie SI | Pilotage stratégique de la mutation SI. |
| Responsable numérique responsable | Transverses & externes | Conformité, Qualité & Risques | Reporting empreinte / RSE = conformité. |
| Responsable digital workplace | Transverses & externes | Adoption, Métier & Changement | Environnement de travail numérique = adoption/usage. |
| Responsable staffing / ressources | Transverses & externes | Gouvernance & Stratégie SI | Affectation des compétences = gouvernance du portefeuille. |
| Développeur citoyen | Transverses & externes | Adoption, Métier & Changement | Maker métier gouverné, vu côté adoption métier. |
| Alternant / stagiaire / apprenti | Transverses & externes | Delivery & Agilité (Build) | Contribue majoritairement au build. |
| Consultant / cabinet conseil | Transverses & externes | Gouvernance & Stratégie SI | Renfort conseil/stratégie. |
| Prestataire de développement | Transverses & externes | Delivery & Agilité (Build) | Réalise le développement. |
| Prestataire TMA | Transverses & externes | Exploitation & Services (Run) | Maintien en conditions opérationnelles = run. |
| Prestataire TRA | Transverses & externes | Delivery & Agilité (Build) | Recette / QA = build. |
| Infogérant / MSP | Transverses & externes | Exploitation & Services (Run) | Exploite le SI = run. |
| Éditeur logiciel | Transverses & externes | Exploitation & Services (Run) | Support éditeur N3 = run. |
| Hébergeur / fournisseur cloud | Transverses & externes | Exploitation & Services (Run) | Héberge l'infrastructure = run. |
| Auditeur externe | Transverses & externes | Conformité, Qualité & Risques | Contrôle indépendant = conformité. |
| Régulateur / organisme de certification | Transverses & externes | Conformité, Qualité & Risques | Contrôle réglementaire = conformité. |
| Utilisateur final / bénéficiaire | Transverses & externes | Adoption, Métier & Changement | Bénéficiaire des services = adoption. |

### Vérification de couverture

- **145 rôles** de la taxonomie, **145 assignés**, **0 non couvert**.
- Chaque rôle est assigné à **exactement un** cockpit (application fonctionnelle).
- Répartition : C1 29 · C2 26 · C3 21 · C4 34 · C5 11 · C6 12 · C7 12.
- Contrôle reproductible : ce tableau est **généré** depuis `docs/taxonomie/roles.json` ;
  toute évolution de la taxonomie se répercute par régénération, pas par édition manuelle.

## Accès interne / externe — moindre privilège & protection des données

La bijection dit **quel** cockpit sert un profil ; elle ne dit pas **combien** de ce cockpit une
identité a le droit de voir. Un même rôle (ex. *Ingénieur DevOps*, `DSI/Externe`) peut être tenu par
un collaborateur DSI ou par un prestataire : le cockpit fonctionnel est le même, mais **ce qui doit
être exposé ne l'est pas**. On ajoute donc au moteur de composition une entrée `périmètre de
l'identité` (interne / externe) et une entrée `sensibilité de la card`.

> **Ce qu'est un « externe » et ce qu'il voit** est fixé par
> [ADR-028](pathname:///pivot-docs/adr/ADR-028-acces-identites-externes) : une identité externe a un
> **compte** (OIDC, via un **fragment externe** dédié), une **organisation d'origine** distincte et un
> **engagement** borné (projets + durée) ; son accès aux projets et au transverse est scopé **côté
> serveur**, avec le principe directeur de **minimisation de la fuite de données et de patrimoine**.

![Filtre d'accès interne / externe](diagrams/cockpits-dsi-acces-externe.png)

> Source PlantUML : [`diagrams/cockpits-dsi-acces-externe.puml`](diagrams/cockpits-dsi-acces-externe.puml) — le PNG est généré en CI.

### Trois classes d'identité

| Classe | Périmètre taxonomie | Cockpit | Règle de données |
| --- | --- | --- | --- |
| **Interne** | 🏛 DSI | Complet selon RBAC | Cards transverses obligatoires (sécurité, RGPD, RGAA, AGPL) **toujours visibles, jamais masquables**. |
| **Interne externalisé** | 🏛🔗 (rôle DSI tenu par un externe) | Même cockpit fonctionnel | Restreint au périmètre de la mission ; données personnelles/sensibles hors périmètre masquées. |
| **Externe pur** | 🔗 Externe | Cockpit scopé à l'engagement | Lecture seule par défaut, données sensibles agrégées/masquées, accès time-boxé et tracé. |

### Cinq garde-fous appliqués aux identités externes

1. **Scoping par engagement** — un externe ne voit que le(s) tenant(s), domaine(s) ou projet(s) de son
   contrat. Un *Prestataire TMA* voit le Run de **ses** applications, pas tout le SI ; un
   *Prestataire de développement* voit **son** périmètre de delivery, pas le portefeuille complet.
2. **Masquage par sensibilité** — les cards à données personnelles (RGPD nominatif), secrets, posture
   de sécurité détaillée et journaux d'audit complets sont **masquées ou agrégées**. C'est
   l'**inversion de la règle interne** : ce qui est « obligatoire, jamais masquable » pour la DSI
   devient « masqué par défaut » pour une identité externe.
3. **Lecture seule par défaut** — la capacité d'action (activer un domaine, inviter, désactiver) reste
   **réservée à l'interne**. Un externe peut consulter et proposer, jamais exécuter une action de
   gouvernance.
4. **Time-box & révocation** — l'accès est lié à la durée du contrat, expire automatiquement et se
   révoque d'un geste en fin de mission.
5. **Traçabilité renforcée** — toute consultation par une identité externe est journalisée (qui, quoi,
   quand), cohérent avec la card *journal d'audit*.

### L'externe n'est pas monolithique

Le scoping est **fonctionnel**, pas un blanc-seing binaire : certains externes ont légitimement besoin
de cards que d'autres n'auront jamais.

| Profil externe | Cockpit | Ce qu'il voit | Ce qui reste masqué |
| --- | --- | --- | --- |
| Auditeur externe · Régulateur | C6 Conformité | Dossier de preuve de conformité, en **lecture seule**, scopé à la période auditée | Données personnelles au-delà du strict nécessaire, opérations hors audit |
| Éditeur logiciel (support N3) | C4 Run | Incidents techniques de **son** produit | Données métier, autres applications |
| Infogérant / MSP | C4 Run | Run de **son** périmètre d'exploitation contractuel | Données applicatives métier |
| Prestataire de développement · TRA | C2 Delivery | Delivery / recette de **son** lot | Portefeuille, budget, sécurité |
| Consultant / cabinet conseil | C1 Gouvernance | Vues agrégées de sa mission de conseil | Données nominatives, secrets, détail sécurité |

## Catalogue de cards & matrice de sensibilité

Décline le point **à valider n°3** : le **catalogue canonique** (40 cards — l'ordre de
grandeur des « ~30 cards » de [cockpits-dsi.md](cockpits-dsi.md)) et, pour chacune, sa **visibilité
par classe d'identité**. C'est le **contrat du catalogue** à figer en Gate 4 : une card ne peut être
posée sur un cockpit que si sa ligne ici est renseignée.

**Niveau de sensibilité** — 🟢 Standard · 🟡 Restreint · 🔴 Sensible  
(répartition : 🟢 13 · 🟡 18 · 🔴 9)

**Couche transverse** — les cards marquées **T** (7) forment la couche transverse
**toujours présente** : elles apparaissent sur **tous** les cockpits (pas seulement le leur) et sont
**non masquables en interne** (posture sécurité, RGPD, RGAA, AGPL, adoption globale, ROI, santé).

**Visibilité** — ● complet (selon RBAC) · ◑ complet mais **limité au scope de l'engagement** ·
◐ **agrégé / anonymisé** (ni détail nominatif, ni détail sécurité) · ○ **masqué par défaut**

> Colonnes : **🏛 Interne** (collaborateur DSI) · **🏛🔗 Externalisé** (rôle DSI tenu par un externe) ·
> **🔗 Externe pur** (prestataire / éditeur / auditeur). La colonne Externe pur est la **politique par
> défaut** ; le *type d'engagement* peut l'élever sur les cards de son périmètre (cf. § « L'externe
> n'est pas monolithique ») — un infogérant passe ◐→◑/● sur les cards Run de son scope, jamais sur les 🔴.
> Le cadre juridique/technique de l'accès externe (identité, périmètre) est fixé par
> [ADR-028](pathname:///pivot-docs/adr/ADR-028-acces-identites-externes).

### Transverse (couche toujours présente)

| Card | Sensibilité | 🏛 Interne | 🏛🔗 Externalisé | 🔗 Externe pur | Motif |
| --- | :---: | :---: | :---: | :---: | --- |
| Bandeau santé instance · **T** | 🟢 | ● | ◑ | ◐ | État global ; agrégé pour l'externe (pas de détail infra hors scope). |
| Adoption globale · **T** | 🟡 | ● | ◑ | ◐ | Taux d'usage agrégé ; pas de détail par utilisateur. |

### C1 · Pilotage / Gouvernance

| Card | Sensibilité | 🏛 Interne | 🏛🔗 Externalisé | 🔗 Externe pur | Motif |
| --- | :---: | :---: | :---: | :---: | --- |
| ROI vs SaaS · **T** | 🔴 | ● | ○ | ○ | Donnée financière/stratégique : masquée à tout externe. |
| Roadmap d'adoption | 🟡 | ● | ◑ | ◐ | Trajectoire ; visible agrégée si dans le scope de mission. |
| Santé du portefeuille projets | 🟡 | ● | ◑ | ◐ | Externe : limité à SON projet, sinon masqué. |
| Budget / coût SI | 🔴 | ● | ○ | ○ | Données financières : jamais exposées à un externe. |
| Activation des domaines | 🟡 | ● | ○ | ○ | Action de gouvernance : lecture interne, jamais actionnable externe (minimisation de fuite). |
| Staffing / capacité RH | 🔴 | ● | ○ | ○ | Données RH nominatives : masquées. |
| Risques projet & portefeuille | 🟡 | ● | ◑ | ◐ | Risques **projet/portefeuille** — module `pivot-pilotage` (E21). Distinct des Risques SSI (C5). |

### C2 · Agilité

| Card | Sensibilité | 🏛 Interne | 🏛🔗 Externalisé | 🔗 Externe pur | Motif |
| --- | :---: | :---: | :---: | :---: | --- |
| Vélocité | 🟢 | ● | ◑ | ◑ | Agrégat **équipe** (100% Équipe, jamais individuel) — cohérence RGPD PIVOT. Externe : SA squad. |
| Régularité des standups | 🟢 | ● | ◑ | ◑ | Agrégat **équipe** (jamais individuel) — cohérence RGPD PIVOT. Externe : son équipe de mission. |
| Capacity | 🟢 | ● | ◑ | ◑ | Agrégat **équipe** (jamais individuel) — cohérence RGPD PIVOT. Externe : son équipe. |
| Qualité de code / couverture tests | 🟢 | ● | ◑ | ◑ | Prestataire dev : sur SON périmètre de code. |
| Releases / mises en production | 🟡 | ● | ◑ | ◐ | Historique de livraison, scopé à la mission. |

### C3 · Architecture & Données

| Card | Sensibilité | 🏛 Interne | 🏛🔗 Externalisé | 🔗 Externe pur | Motif |
| --- | :---: | :---: | :---: | :---: | --- |
| Cartographie applicative | 🟡 | ● | ◑ | ◐ | Révèle la structure du SI (patrimoine) : agrégée/scopée pour l'externe. |
| Dette d'urbanisation | 🟡 | ● | ◑ | ◐ | Vue technique ; scope de mission. |
| Catalogue & qualité des données | 🟡 | ● | ◑ | ◐ | Métadonnées ; **contenu des données 🔴 jamais exposé**. |
| Pipelines de données | 🟡 | ● | ◑ | ◐ | Peut contenir de la donnée métier : agrégé/scopé. |
| Conformité IA / AI Act | 🟢 | ● | ◑ | ◐ | Statut de conformité des features IA de PIVOT (module **Assistant IA E48**) — intégration **interne**, pas d'API tierce. |

### C4 · Exploitation (Run)

| Card | Sensibilité | 🏛 Interne | 🏛🔗 Externalisé | 🔗 Externe pur | Motif |
| --- | :---: | :---: | :---: | :---: | --- |
| Incidents en cours | 🟡 | ● | ◑ | ◑ | Via **connecteur ITSM du tenant** (EN51.10) — agrégats API ou lien profond. Infogérant/éditeur : SON périmètre. |
| SLA / disponibilité | 🟢 | ● | ◑ | ◑ | Externe run : sur SON périmètre contractuel (source actuator ou ITSM). |
| Capacité / dimensionnement | 🟢 | ● | ◑ | ◑ | Métriques techniques, scopées. |
| Files de support | 🟡 | ● | ◑ | ◐ | Via **connecteur ITSM du tenant** (ServiceNow…, EN51.10) : agrégats API ou lien profond (href). **Contenu des tickets 🔴 reste dans l'ITSM** — aucune PII ticket dans PIVOT. |
| Changements en production | 🟡 | ● | ◑ | ◑ | Scope d'exploitation contractuel (source ITSM/CI, EN51.10). |

### C5 · Sécurité & Continuité

| Card | Sensibilité | 🏛 Interne | 🏛🔗 Externalisé | 🔗 Externe pur | Motif |
| --- | :---: | :---: | :---: | :---: | --- |
| Posture de sécurité · **T** | 🔴 | ● | ○ | ○ | Révèle la surface d'attaque : jamais exposée à un externe. |
| OIDC / IAM | 🔴 | ● | ○ | ○ | Identités & habilitations : masqué hors DSI. |
| Correctifs de sécurité en attente | 🔴 | ● | ○ | ○ | Expose des vulnérabilités non corrigées. |
| Alertes SOC & réponse à incident | 🔴 | ● | ◐ | ○ | Analyste SOC externalisé : agrégé, sans détail nominatif. |
| État PCA / PRA | 🟡 | ● | ◑ | ◐ | Statut de continuité ; détail des plans réservé interne. |
| Risques SSI | 🔴 | ● | ◐ | ○ | Risques **sécurité** — distinct des Risques projet (C1/E21). Masqué à l'externe pur. |

### C6 · Conformité, Qualité & Risques

| Card | Sensibilité | 🏛 Interne | 🏛🔗 Externalisé | 🔗 Externe pur | Motif |
| --- | :---: | :---: | :---: | :---: | --- |
| Conformité RGPD · **T** | 🟡 | ● | ◑ | ◐ | Statut agrégé visible ; **détail nominatif 🔴 masqué**. |
| Accessibilité RGAA / WCAG · **T** | 🟢 | ● | ◑ | ◐ | Peu sensible ; un auditeur RGAA externe y a accès en lecture seule. |
| Conformité licence AGPL · **T** | 🟢 | ● | ◑ | ◐ | Obligation de licence ; non sensible. |
| Journal d'audit | 🔴 | ● | ◐ | ○ | Traçabilité complète : masqué (sauf auditeur, RO scopé — voir plus haut). |
| Empreinte numérique responsable | 🟢 | ● | ◑ | ◐ | Reporting RSE ; non sensible. |

### C7 · Collaboratif / Adoption

| Card | Sensibilité | 🏛 Interne | 🏛🔗 Externalisé | 🔗 Externe pur | Motif |
| --- | :---: | :---: | :---: | :---: | --- |
| Usage whiteboard / live / quiz | 🟡 | ● | ◐ | ◐ | Contenus produits par les utilisateurs : agrégés, jamais nominatifs. |
| Adoption par direction métier | 🟡 | ● | ◐ | ◐ | Taux d'usage agrégés. |
| Conduite du changement | 🟢 | ● | ◑ | ◐ | Plan d'accompagnement ; non sensible. |
| Formation | 🟢 | ● | ◑ | ◐ | Catalogue et complétion agrégée. |
| Satisfaction (NPS) | 🟡 | ● | ◐ | ◐ | Score agrégé ; **verbatims nominatifs 🔴 masqués**. |

### Règle de cohérence (invariant du contrat)

- **Principe directeur — minimiser la fuite de données et de patrimoine.** En cas de doute, la card
  est **plus restrictive** : ex. *Activation des domaines* reste ○ pour tout externe, même en lecture.
- **Externe pur** : les **9 cards 🔴** sont **○ (masquées)** — 9/9, aucune fuite.
- **Externalisé** : 3 des 9 cards 🔴 (Alertes SOC & réponse à incident, Risques SSI, Journal d'audit) sont **◐ (agrégé)** car un rôle sécurité/audit externalisé en a besoin ; les autres restent **○**.
- **Règle 🟢 → Externe pur** : une card 🟢 **opérationnelle dans le scope** de l'engagement est **◑**
  (SLA, Capacité, Vélocité, Qualité de code) ; une card 🟢 **globale/gouvernance** est **◐** (santé
  instance, RGAA, AGPL, empreinte…). Distinction fixée par [ADR-028](pathname:///pivot-docs/adr/ADR-028-acces-identites-externes).
- **Aucune card n'est actionnable par un externe** : les actions de gouvernance (activation, invitation, désactivation) restent 🏛 uniquement.
- **Les cards de la couche transverse (T)** sont **● non masquables en interne** et suivent la politique externe ci-dessus — l'inversion documentée plus haut.
- **Cards support/ITSM** (Files de support, Incidents, Changements) : la donnée métier (tickets, PII) **reste dans l'ITSM du tenant** ; PIVOT n'affiche que des agrégats API ou un lien profond (EN51.10).
- Cette matrice est la **source de vérité** ; un composant `pivot-design-system` implémentant une card doit déclarer sa `sensibilité` et respecter la visibilité par classe d'identité.

## Points à valider (arbitrages produit)

Trois choix de regroupement méritent une validation explicite avant figeage :

1. **Données & IA fusionnées avec Architecture** (C3) plutôt qu'un 8ᵉ cockpit dédié — cohérent tant
   que la gouvernance de la donnée reste une préoccupation de conception/urbanisation ; à isoler si
   le CDO devient un utilisateur de premier plan.
2. **Coût / FinOps rangé dans Gouvernance** (C1) comme cluster de cards (ROI, budget) plutôt que
   comme cockpit « Coût » autonome — le volume de profils (contrôleur de gestion, FinOps) ne
   justifie pas un écran séparé.
3. **Profils Externe (🔗) et Métier (🧩)** : ils reçoivent un cockpit par cohérence de la taxonomie,
   mais l'exposition réelle est bornée par le filtre d'accès (voir *Accès interne / externe*) —
   scoping, masquage des données sensibles, lecture seule, time-box. À valider : la liste des cards
   marquées « sensibles » (donc masquées aux externes) et la politique par défaut par type de
   prestataire. C'est un réglage de la **couche gouvernance**, pas de la bijection.
