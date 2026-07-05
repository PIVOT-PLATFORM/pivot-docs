---
sidebar_label: "Taxonomie des rôles"
sidebar_position: 5
---

# Taxonomie des intervenants d'une DSI

> **Source de vérité machine-lisible :** `roles.json` (dans ce dossier) — chaque US/EN est destinée à porter
> à terme un champ `Rôle:` résolvant vers un rôle, un `macro:<macro-rôle>` ou un `groupe:<groupe>` déclaré ici.
> Ce document est la version **humaine**.

**Liste exhaustive et agnostique des types d'utilisateurs — pour le modèle de rôles PIVOT**
Version 1.0 · Juillet 2026 · alimente `pivot-core` (catalogue) et la story PVT-003 (rôles & macro-rôles)

> Cette taxonomie se veut **agnostique** : indépendante de la taille, du secteur, de la localisation et du modèle d'organisation de la DSI. Toutes les DSI n'activent pas tous ces rôles — un même rôle peut être porté par une personne, une équipe, ou externalisé. Les appellations varient (FR/EN, ITIL/agile/SAFe) ; les synonymes courants sont indiqués. On inclut aussi les **externes et le métier** dès lors qu'ils *interviennent* dans la DSI.

---

## 0. Comment lire cette taxonomie

Cinq paradigmes d'organisation coexistent et engendrent les variantes de rôles. Une DSI réelle en combine plusieurs :

- **Production / services (ITIL)** — exploitation, support, gestion des services et des processus.
- **Projet (MOA/MOE)** — études, maîtrise d'ouvrage, maîtrise d'œuvre, bureau des projets.
- **Produit / agile (Scrum, SAFe, modèle Spotify)** — squads, tribus, Product Owners, coaches.
- **DevOps / plateforme** — « you build it, you run it », SRE, ingénierie de plateforme.
- **Architecture / urbanisation (TOGAF)** — architecture d'entreprise, urbanisme SI.

La colonne *Périmètre* distingue **DSI** (personnel de la direction SI), **Métier** (hors DSI mais intervenant), **Externe** (prestataire, éditeur, régulateur).

---

## 1. Direction & gouvernance SI

Pilotage stratégique, arbitrages, représentation au comité exécutif.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Directeur des systèmes d'information | DSI, CIO | Dirige la fonction SI et son alignement stratégique | DSI |
| DSI adjoint | Deputy CIO | Seconde le DSI, pilote une partie du périmètre | DSI |
| Directeur technique | CTO | Porte la vision et les choix technologiques | DSI |
| Chief Digital Officer | CDO (digital) | Pilote la transformation numérique de l'entreprise | DSI/Métier |
| Directeur de la production / des opérations SI | Head of IT Operations | Garantit le fonctionnement des services en exploitation | DSI |
| Directeur des études / du développement | Head of Delivery | Pilote la construction des applications | DSI |
| Directeur infrastructure | Head of Infrastructure | Pilote socles techniques, réseau, datacenter, cloud | DSI |
| Directeur de programme / portefeuille | Program Director, Head of PMO | Pilote un ensemble de projets liés à un objectif | DSI |
| Directeur de la relation métier | Head of Business Relationship | Anime le lien entre DSI et directions métier | DSI |
| Responsable de la stratégie SI | IT Strategy Lead | Définit le schéma directeur et la trajectoire SI | DSI |

---

## 2. Gouvernance, PMO & pilotage

Cadence, méthode, finances et consolidation du portefeuille.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Directeur de projet | Project Director | Porte la responsabilité d'un projet majeur | DSI |
| Chef de projet | Project Manager, CP MOE | Planifie et pilote un projet au quotidien | DSI |
| Chef de projet MOA | AMOA, Business Project Manager | Porte le besoin métier et la recette | DSI/Métier |
| Officier / responsable PMO | Project Management Officer | Outille, normalise et consolide les projets | DSI |
| Gestionnaire de portefeuille | Portfolio Manager (PPM) | Arbitre et priorise l'ensemble des projets | DSI |
| Planificateur | Planning Manager, Planner | Construit et maintient les plannings | DSI |
| Contrôleur de gestion SI | IT Controller, Cost Controller | Suit budgets, coûts et refacturation | DSI |
| Responsable financier SI / FinOps | IT Finance Manager, FinOps | Optimise les coûts (cloud à l'usage inclus) | DSI |
| Responsable méthodes & qualité projet | Delivery Methods Lead | Garantit méthode et qualité de gestion de projet | DSI |

---

## 3. Produit & agilité

Découverte du besoin, priorisation de la valeur, animation des équipes agiles.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Product Owner | PO | Porte le backlog et la valeur d'un produit | DSI/Métier |
| Product Manager | PM | Porte la vision et la stratégie produit | DSI/Métier |
| Proxy Product Owner | Proxy PO | Relaie le PO au plus près de l'équipe | DSI |
| Scrum Master | SM | Facilite l'équipe agile et lève les obstacles | DSI |
| Coach agile | Agile Coach | Accompagne la montée en maturité agile | DSI/Externe |
| Release Train Engineer | RTE (SAFe) | Coordonne un train de livraison multi-équipes | DSI |
| Delivery Manager | Delivery Lead | Garantit la livraison de bout en bout | DSI |
| Responsable de squad / tribu / chapitre | Squad/Tribe/Chapter Lead | Anime une unité du modèle produit | DSI |
| Business Analyst | BA, Analyste fonctionnel | Formalise et modélise les exigences métier | DSI/Métier |
| Designer produit / UX-UI | Product Designer, UX/UI | Conçoit l'expérience et les interfaces | DSI |
| Chercheur UX | UX Researcher | Étudie les usages et besoins utilisateurs | DSI |

---

## 4. Études, développement & ingénierie logicielle

Conception et fabrication des applications.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Référent technique | Tech Lead, Lead Dev | Guide techniquement l'équipe de développement | DSI |
| Développeur | Software Engineer, dev front/back/full-stack | Conçoit et code les applications | DSI/Externe |
| Développeur mobile | Mobile Developer | Développe les applications mobiles | DSI/Externe |
| Développeur embarqué / firmware | Embedded Engineer | Développe le logiciel bas niveau / matériel | DSI |
| Développeur d'intégration / API | Integration Developer | Conçoit les interfaces et échanges inter-applicatifs | DSI |
| Développeur RPA | RPA Developer | Automatise des tâches par robots logiciels | DSI |
| Développeur low-code / no-code | Citizen Developer | Construit des applications sans code | DSI/Métier |
| Ingénieur test / QA | QA Engineer, Testeur | Vérifie la qualité, manuelle et automatisée | DSI/Externe |
| Responsable des tests | QA Lead, Test Manager | Pilote la stratégie et la recette | DSI |
| Ingénieur performance | Performance Engineer | Teste la charge et la tenue en montée | DSI |

---

## 5. Architecture & urbanisation

Cohérence, cible et trajectoire technique et fonctionnelle du SI.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Architecte d'entreprise | Enterprise Architect | Aligne SI et stratégie sur toutes les couches | DSI |
| Urbaniste SI | IT Town Planner | Cartographie et cadre l'évolution du SI | DSI |
| Architecte fonctionnel | Functional Architect | Structure les fonctions et processus cibles | DSI |
| Architecte applicatif | Application Architect | Conçoit la structure des applications | DSI |
| Architecte technique | Technical Architect | Définit les choix techniques d'une solution | DSI |
| Architecte solution | Solution Architect | Conçoit la solution d'un projet donné | DSI/Externe |
| Architecte cloud | Cloud Architect | Conçoit les architectures cloud | DSI |
| Architecte données | Data Architect | Conçoit les modèles et flux de données | DSI |
| Architecte sécurité | Security Architect | Intègre la sécurité dès la conception | DSI |
| Architecte d'intégration | Integration Architect | Conçoit les échanges et l'interopérabilité | DSI |

---

## 6. Infrastructure, production & exploitation

Socles techniques, disponibilité, automatisation de l'exploitation.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Ingénieur / administrateur système | Sysadmin, SysEng | Administre serveurs et systèmes d'exploitation | DSI/Externe |
| Ingénieur / administrateur réseau | Network Engineer | Administre réseaux et connectivité | DSI/Externe |
| Ingénieur télécom | Telecom Engineer | Gère la téléphonie et les liens opérateurs | DSI |
| Administrateur base de données | DBA | Administre et optimise les bases de données | DSI/Externe |
| Ingénieur stockage / sauvegarde | Storage/Backup Engineer | Gère stockage, sauvegarde et restauration | DSI |
| Ingénieur cloud | Cloud Engineer | Déploie et exploite les ressources cloud | DSI/Externe |
| Ingénieur DevOps | DevOps Engineer | Automatise build, déploiement et exploitation | DSI/Externe |
| Ingénieur SRE | Site Reliability Engineer | Garantit fiabilité et résilience des services | DSI |
| Ingénieur plateforme | Platform Engineer | Construit la plateforme interne pour les devs | DSI |
| Ingénieur CI/CD | Build/Release Engineer | Outille l'intégration et la livraison continues | DSI |
| Ingénieur observabilité | Monitoring/Observability Eng. | Instrumente supervision, logs et métriques | DSI |
| Ingénieur d'exploitation / pilote | IT Operator, Ops Pilot | Surveille et pilote la production au quotidien | DSI/Externe |
| Technicien datacenter | Datacenter Technician | Intervient sur le matériel physique | DSI/Externe |

---

## 7. Support, service desk & services (ITSM)

Assistance aux utilisateurs et gestion des processus de service.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Technicien support N1 | Service Desk, Helpdesk | Traite les demandes et incidents de premier niveau | DSI/Externe |
| Technicien support N2 | Support N2 | Traite les incidents nécessitant une expertise | DSI/Externe |
| Expert support N3 | Support N3, expert applicatif | Résout les incidents complexes / éditeurs | DSI/Externe |
| Technicien de proximité | Onsite Support, VIP Support | Assiste physiquement les utilisateurs | DSI/Externe |
| Gestionnaire d'incidents | Incident Manager | Pilote la résolution et la communication d'incident | DSI |
| Gestionnaire de problèmes | Problem Manager | Traite les causes racines récurrentes | DSI |
| Gestionnaire des changements | Change Manager | Encadre les changements en production | DSI |
| Gestionnaire des mises en production | Release Manager | Orchestre les livraisons en production | DSI |
| Gestionnaire des configurations | Configuration Manager (CMDB) | Maintient le référentiel des actifs et liens | DSI |
| Gestionnaire des niveaux de service | Service Level Manager | Négocie et suit les SLA | DSI |
| Responsable disponibilité / capacité | Availability/Capacity Manager | Garantit disponibilité et dimensionnement | DSI |
| Responsable du catalogue de services | Service Catalog Manager | Définit et publie l'offre de services SI | DSI |
| Gestionnaire des demandes | Request Manager | Traite les demandes de service standard | DSI |
| Gestionnaire de la connaissance | Knowledge Manager | Capitalise et diffuse la base de connaissances | DSI |
| Gestionnaire de parc / d'actifs | IT Asset Manager | Gère le cycle de vie du matériel et des licences | DSI |
| Technicien poste de travail / déploiement | Desktop/Deployment Technician | Prépare et déploie les postes et masters | DSI/Externe |

---

## 8. Cybersécurité & continuité

Protection, détection, réponse, résilience.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Responsable de la sécurité SI | RSSI, CISO | Définit et pilote la stratégie de sécurité | DSI |
| Analyste SOC | SOC Analyst | Surveille et qualifie les alertes de sécurité | DSI/Externe |
| Ingénieur sécurité | Security Engineer | Déploie et exploite les dispositifs de sécurité | DSI |
| Testeur d'intrusion | Pentester, Ethical Hacker | Éprouve la sécurité par des tests offensifs | DSI/Externe |
| Analyste de la menace | Threat Intelligence Analyst | Analyse le paysage des menaces | DSI/Externe |
| Ingénieur IAM | Identity & Access Engineer | Gère identités, accès et habilitations | DSI |
| Analyste réponse à incident | CSIRT/CERT, Forensic Analyst | Investigue et traite les incidents de sécurité | DSI/Externe |
| Gestionnaire des risques SSI | Security Risk Manager | Évalue et traite les risques de sécurité | DSI |
| Responsable continuité / reprise | PCA/PRA Manager, BCP/DRP | Prépare la continuité et la reprise d'activité | DSI |
| Correspondant sécurité | Security Champion | Relaie la sécurité dans les équipes | DSI |
| Responsable conformité sécurité | Security Compliance Officer | Vérifie l'adhérence aux référentiels (ISO, ANSSI) | DSI |

---

## 9. Données & intelligence artificielle

Valorisation, gouvernance et industrialisation de la donnée et des modèles.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Chief Data Officer | CDO (data) | Dirige la stratégie et la gouvernance des données | DSI/Métier |
| Ingénieur données | Data Engineer | Construit les pipelines et entrepôts de données | DSI |
| Analyste de données | Data Analyst | Analyse et restitue la donnée pour la décision | DSI/Métier |
| Data scientist | Data Scientist | Modélise et prédit à partir des données | DSI/Métier |
| Ingénieur ML / MLOps | ML Engineer, MLOps | Industrialise et exploite les modèles d'IA | DSI |
| Développeur décisionnel | BI Developer | Développe rapports et tableaux de bord | DSI |
| Intendant de données | Data Steward | Garantit qualité et définition des données | DSI/Métier |
| Propriétaire de données | Data Owner | Répond de la donnée d'un domaine | Métier |
| Responsable gouvernance des données | Data Governance Manager | Cadre politiques, catalogue et qualité | DSI |
| Ingénieur qualité des données | Data Quality Engineer | Mesure et améliore la qualité des données | DSI |
| Responsable éthique de l'IA | AI Ethics / Responsible AI Lead | Encadre conformité et éthique de l'IA (AI Act) | DSI/Métier |

---

## 10. Relation métier, MOA & conduite du changement

Interface avec les métiers, appropriation et adoption.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Responsable de la relation métier | Business Relationship Manager | Fait le pont entre DSI et une direction métier | DSI |
| Assistance à maîtrise d'ouvrage | AMOA | Aide le métier à exprimer et cadrer le besoin | DSI/Externe |
| Maîtrise d'ouvrage | MOA, Product Owner métier | Porte le besoin et valide la solution | Métier |
| Utilisateur clé / référent métier | Key User, Power User | Relaie et teste au sein du métier | Métier |
| Responsable conduite du changement | Change Management Lead | Prépare l'adoption et accompagne les usages | DSI/Métier |
| Formateur / ingénieur pédagogique | Trainer, Instructional Designer | Conçoit et anime la formation aux outils | DSI/Externe |
| Rédacteur technique | Technical Writer | Produit la documentation utilisateur et technique | DSI/Externe |

---

## 11. Achats, contrats & fournisseurs

Sourcing, négociation, pilotage des tiers et des licences.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Acheteur informatique | IT Buyer, Category Manager | Achète biens et services informatiques | DSI |
| Contract Manager | Gestionnaire de contrats | Pilote le cycle de vie des contrats | DSI |
| Gestionnaire de la relation fournisseur | Vendor Manager | Pilote la performance des fournisseurs | DSI |
| Responsable sourcing / partenariats | Sourcing Manager | Sélectionne et développe les partenaires | DSI |
| Gestionnaire des logiciels / licences | Software Asset Manager (SAM) | Optimise et met en conformité les licences | DSI |
| Juriste SI | IT Legal Counsel | Sécurise juridiquement contrats et usages | DSI/Externe |
| Responsable des marchés | Public Procurement Officer | Conduit les marchés publics (secteur public) | DSI |

---

## 12. Qualité, conformité, audit & risques

Maîtrise, contrôle et amélioration continue.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Responsable qualité SI | IT Quality Manager | Anime la démarche qualité de la DSI | DSI |
| Auditeur SI | IT Auditor | Contrôle conformité et maîtrise du SI | DSI/Externe |
| Responsable conformité | Compliance Officer | Assure l'adhérence aux obligations réglementaires | DSI |
| Délégué à la protection des données | DPO | Veille au respect du RGPD et des données personnelles | DSI/Métier |
| Gestionnaire des risques SI | IT Risk Manager | Identifie et traite les risques du SI | DSI |
| Responsable référentiels & normes | Frameworks Lead (ITIL/COBIT/ISO) | Maintient méthodes et référentiels | DSI |
| Responsable accessibilité numérique | Accessibility Lead (RGAA) | Garantit l'accessibilité des services numériques | DSI |
| Responsable amélioration continue | Continuous Improvement Manager | Pilote l'optimisation des processus | DSI |

---

## 13. Transverses, émergents & innovation

Rôles hybrides, nouveaux métiers, initiatives transverses.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Responsable innovation | Innovation Manager | Anime l'exploration et l'expérimentation | DSI/Métier |
| Responsable transformation numérique | Digital Transformation Lead | Pilote la mutation numérique de l'organisation | DSI/Métier |
| Responsable numérique responsable | Green IT / Sustainable IT Lead | Réduit l'empreinte environnementale du SI | DSI |
| Responsable digital workplace | Digital Workplace Manager | Pilote l'environnement de travail numérique | DSI |
| Responsable staffing / ressources | Resource Manager | Affecte les compétences aux projets | DSI |
| Développeur citoyen | Citizen Developer | Métier qui automatise en low-code sous gouvernance | Métier |
| Alternant / stagiaire / apprenti | Trainee, Intern | Contribue en formation | DSI |

---

## 14. Externes intervenant dans la DSI

Tiers qui agissent sur le SI sans appartenir à la DSI.

| Rôle | Appellations courantes | Mission en une ligne | Périmètre |
|---|---|---|---|
| Consultant / cabinet conseil | Consultant | Apporte expertise et renfort ponctuel | Externe |
| Prestataire de développement | ESN, SSII, Contractor | Réalise tout ou partie du développement | Externe |
| Prestataire TMA | Tierce Maintenance Applicative | Maintient les applications en conditions op. | Externe |
| Prestataire TRA | Tierce Recette Applicative | Réalise la recette pour le compte du client | Externe |
| Infogérant / MSP | Managed Service Provider | Exploite tout ou partie du SI | Externe |
| Éditeur logiciel | Software Vendor | Fournit et supporte un produit (support N3) | Externe |
| Hébergeur / fournisseur cloud | Cloud/Hosting Provider | Héberge les infrastructures et services | Externe |
| Auditeur externe | External Auditor | Certifie ou contrôle indépendamment | Externe |
| Régulateur / organisme de certification | Regulator, Certification Body | Contrôle la conformité réglementaire | Externe |
| Utilisateur final / bénéficiaire | End User | Utilise les services fournis par la DSI | Métier |

---

## 15. Variation selon l'archétype de DSI

Aucune DSI n'active tous les rôles ; le contexte en détermine la présence et le poids.

| Archétype de DSI | Rôles typiquement renforcés |
|---|---|
| Grand groupe privé | EA/urbanistes, PMO, BRM, FinOps, gestion fournisseurs, tous les process ITIL |
| Secteur public / adjudicateur | Responsable des marchés, DPO, accessibilité RGAA, AMOA, conformité |
| Éditeur logiciel / tech | PO/PM, SRE, Platform Engineers, DevOps, coaches agiles, modèle produit |
| Banque / assurance (régulé) | RSSI, conformité, risk managers, audit, PCA/PRA, IAM |
| Industrie / santé | Sécurité OT, embarqué, continuité, souveraineté des données sensibles |
| PME / scale-up | Rôles cumulés (profils « couteau suisse »), forte externalisation |

Deux tendances transverses : la **fusion des rôles** dans les petites structures (une personne porte plusieurs cases) et la **spécialisation croissante** dans les grandes (chaque case devient une équipe). La taxonomie reste la même ; c'est sa granularité de mise en œuvre qui varie.

---

## 16. Repli vers les macro-rôles PIVOT

Cent-cinquante rôles ne peuvent pas être cent-cinquante vues. Pour le RBAC et les vues du portail (story PVT-003), ils se replient sur **treize macro-rôles**, chacun regroupant les rôles aux besoins d'information voisins :

| # | Macro-rôle PIVOT | Regroupe (domaines §) |
|---|---|---|
| 1 | Direction & pilotage SI | §1 |
| 2 | Gestion de projet & portefeuille | §2 |
| 3 | Produit & agilité | §3 |
| 4 | Ingénierie & développement | §4 |
| 5 | Architecture & urbanisation | §5 |
| 6 | Infrastructure & exploitation | §6 |
| 7 | Support & services (ITSM) | §7 |
| 8 | Cybersécurité & continuité | §8 |
| 9 | Données & IA | §9 |
| 10 | Relation métier & changement | §10 |
| 11 | Achats, contrats & fournisseurs | §11 |
| 12 | Qualité, conformité & audit | §12 |
| 13 | Transverses & externes | §13, §14 |

Le rôle fin reste porté par l'attribut de l'utilisateur (issu du groupe SSO) ; le macro-rôle détermine la **vue par défaut** et le socle de droits. Un même utilisateur peut porter plusieurs macro-rôles (un Tech Lead qui est aussi Security Champion), le portail composant alors ses vues — conformément au principe déjà retenu : le rôle est une dimension de première classe, pas une permission ajoutée après coup.

### Vue d'ensemble — macro-rôles & domaines

![Taxonomie des rôles PIVOT — macro-rôles et domaines](diagrams/taxonomie-macro-roles.png)

> Source PlantUML : [`diagrams/taxonomie-macro-roles.puml`](diagrams/taxonomie-macro-roles.puml) — le PNG est généré en CI.

---

## 17. Acteurs produit PIVOT (hors référentiel DSI)

La taxonomie ci-dessus décrit les **intervenants d'une DSI**. Le produit PIVOT a aussi des acteurs
propres qui ne sont pas des rôles DSI ; ils complètent le référentiel pour couvrir 100 % des US/EN :

| Rôle | Appellations | Mission | Périmètre |
|---|---|---|---|
| Utilisateur final / bénéficiaire | End User | Utilise les services fournis par la plateforme | Métier |
| Administrateur de la plateforme / tenant | Platform/Tenant Admin | Administre plateforme et tenants (modules, utilisateurs) | DSI |
| Animateur / facilitateur d'atelier | Workshop Facilitator | Anime ateliers collaboratifs et sessions live | DSI/Métier |
| Développeur citoyen (maker) | Citizen Developer | Construit apps/automatisations en low-code gouverné | Métier |
| Mainteneur du produit / open source | Product Maintainer | Maintient le produit, arbitre les contributions | DSI |

---

## 18. Correspondance acteur → rôle (backfill des US/EN)

Table dérivée du tag `Rôle:` appliqué aux US existants (« En tant que … » → rôle taxonomie).
**À relire** : certaines correspondances sont approximatives (acteurs composés, génériques).

| Rôle taxonomie | Exemples d'acteurs US mappés |
|---|---|
| `acheteur-informatique` | acheteur, dsi/acheteur, responsable achats, responsable achats / pilotage |
| `administrateur-plateforme` | admin tenant, administrateur, administrateur du tenant, super_admin |
| `animateur-facilitateur` | animateur, animateur de la session, animateur de réunion, animateur du standup |
| `architecte-d-entreprise` | dsi/architecte |
| `business-analyst` | ba |
| `chef-de-projet` | architecte / chef de projet, chef de projet, chef de projet public, chef de projet, dev |
| `citizen-developer` | maker |
| `contract-manager` | chef de projet, contract manager, contract manager |
| `controleur-de-gestion-si` | contrôleur de gestion |
| `delegue-a-la-protection-des-donnees` | dpo, archi, dpo, chef de projet, dpo, data |
| `developpeur` | dev, développeur, développeur / membre d'équipe, développeur ou ops |
| `directeur-de-programme-portefeuille` | directeur de programme / dsi |
| `directeur-des-systemes-d-information` | dsi, dsi ou manager |
| `groupe:gouvernance-si` | dsi/rssi/pmo, pmo, rssi |
| `groupe:instances-decision` | pmo, sponsor, sponsor, sponsor, pmo |
| `ingenieur-d-exploitation-pilote` | opérateur |
| `ingenieur-donnees` | développeur ou data engineer |
| `ingenieur-test-qa` | testeur, testeur / responsable qualité |
| `macro:direction-pilotage` | direction, décideur |
| `macro:donnees-ia` | dev, data |
| `macro:ingenierie-developpement` | membre d'équipe, membre de l'équipe projet, équipe |
| `mainteneur-produit` | mainteneur |
| `officier-responsable-pmo` | chef de projet / responsable pilotage, chef de projet, pmo, dev, pmo, dsi/pmo |
| `product-owner` | ba ou po, développeur, po ou dsi |
| `release-train-engineer` | release train engineer, scrum master / release train engineer |
| `responsable-de-la-securite-si` | rssi, équipe sécurité |
| `responsable-financier-si-finops` | chef de projet / responsable financier, sponsor, daf |
| `scrum-master` | po, scrum master ou développeur, scrum master, scrum master / animateur, scrum master / facilitateur |
| `utilisateur-final` | contributeur terrain, invité externe sans compte pivot, module gestion des risques, owner d'un tableau |
