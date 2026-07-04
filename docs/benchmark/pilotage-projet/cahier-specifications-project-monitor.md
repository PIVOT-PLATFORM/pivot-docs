---
sidebar_position: 3
sidebar_label: "Cahier — Project Monitor"
---

# Cahier de spécifications — Plateforme de pilotage de portefeuille de projets (PPM)
## Basé sur l'analyse fonctionnelle de Project Monitor (Virage Group)

**Version :** 1.0 — **Date :** 4 juillet 2026 — **Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet
Analyse des fonctionnalités de Project Monitor, solution PPM française de référence du secteur public, puis cahier de spécifications fonctionnelles et techniques pour concevoir ou évaluer une plateforme équivalente.

### 1.2 Périmètre
Pilotage de portefeuille de projets pour organisations publiques et privées : gestion de la demande et arbitrage, planification multi-projets, ressources et capacité à faire, budgets pluriannuels, revues et comités, tableaux de bord, interfaçage au SI financier, souveraineté et conformité françaises.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| PPM | Project Portfolio Management : sélection, arbitrage et pilotage global des projets (« faire les bons projets ») |
| Gestion de la demande | Processus de recueil, qualification et arbitrage des demandes de projets avant lancement |
| Capacité à faire | Confrontation du plan de charge (demandes + projets) à la disponibilité réelle des ressources |
| PPI | Plan pluriannuel d'investissement : programmation budgétaire pluriannuelle des collectivités |
| Météo projet | Indicateur synthétique d'état (avancement, risques, alerte) remonté en portefeuille |
| Revue de projet / comité | Instance de pilotage : arbitrages, priorisation, décisions tracées |
| Datamart | Entrepôt de données de pilotage croisant PPM et données externes (finances, RH) |
| MOA / MOE | Maîtrise d'ouvrage / maîtrise d'œuvre |

---

## 2. Analyse de l'existant : Project Monitor

### 2.1 Positionnement
Project Monitor, édité depuis plus de 25 ans par Virage Group (éditeur français, Nantes, issu du conseil en pilotage de projets), est la solution PPM de référence des acteurs publics français : plus de 70 collectivités, départements et métropoles clients — dont deux tiers des régions et un conseil départemental sur trois — mais aussi ministères, hôpitaux (AP-HM, CHU de Toulouse, CHU de Besançon), agences techniques départementales, régies d'eau et grands comptes privés (Orange, Geodis, JC-Decaux). Environ 250 organisations clientes et 50 000 utilisateurs quotidiens. Son positionnement : l'alternative française « tout-en-un, simple et puissante » aux fichiers bureautiques éparpillés comme aux PPM complexes, avec un argument différenciant assumé — hébergement en France, conformité RGPD, souveraineté des données — complété depuis 2025-2026 par VIA, agent IA « souverain, fiable et transparent » qui analyse les données de pilotage et synthétise les échanges. L'éditeur revendique un ADN de conseil : plus de 300 implémentations accompagnées, un club utilisateurs annuel (PM Club) et une communauté active de PMO publics. Un produit frère, Strat Monitor, prolonge le pilotage vers les plans stratégiques (utilisé notamment par l'ensemble des ARS pour leurs contrats d'objectifs et de moyens).

### 2.2 Cartographie des fonctionnalités observées
**Gestion de la demande et arbitrage.** Recueil des demandes par typologies, qualification, priorisation alignée sur les objectifs ; validation de la capacité à faire avant lancement ; approche « tout est projet » (projets, maintenance, activités récurrentes) permettant une allocation complète des ressources.

**Planification multi-projets.** WBS, Gantt interactif et collaboratif, chemin critique, planification automatique, jalons clés, export Excel ; Kanban ; modèles de projets en bibliothèque ; anticipation des retards.

**Ressources et capacité.** Plan de charge des agents en temps réel ; confrontation charges planifiées / disponibilités ; répartition projets / maintenance / récurrent ; feuille de saisie des temps personnalisée par ressource ; identification des tensions et de la capacité disponible avant tout lancement.

**Budgets.** Suivi budgétaire par projet et par portefeuille (charges et investissement) ; enveloppes globales par entité ; budget prévisionnel mono ou pluriannuel (logique PPI) ; anticipation des dérives ; interfaçage avec les logiciels comptables publics (cas documenté : croisement Coriolis × PPM via le Datamart à l'Eurométropole de Strasbourg) ; gains documentés (Département de Haute-Savoie : consolidation comptable de 1 jour à 1 heure).

**Pilotage et comités.** Tableaux de bord détaillés ou synthétiques personnalisables ; vision 360° du portefeuille avec alertes sur les points de tension ; météo projet ; revues de projets structurées et interactives ; diaporama du portefeuille pour les instances ; comptes rendus actionnables ; consolidation en un clic (vs 3-4 mois de consolidation manuelle documentés chez un client).

**Collaboration.** Échanges entre DSI, directions et élus ; suivi de l'avancement par les métiers selon leurs droits ; animation MOA/MOE ; workflows d'automatisation des processus métier PPM (fonctionnalité présentée en masterclass au club utilisateurs).

**IA.** Agent VIA : analyse des données de pilotage, synthèse des échanges, mise en évidence des signaux importants pour la décision — positionné comme souverain et laissant le contrôle à l'utilisateur.

**Administration et intégration.** Administration fonctionnelle 100 % autonome sans code (ajout de champs aux formulaires projet, répercussion d'une réorganisation sur tout le portefeuille, bibliothèque de modèles, libellés) ; interfaces natives et standardisées avec le SI (comptabilité, BI) ; datamart de pilotage ; SaaS ou installation sur site (on-premise).

### 2.3 Points forts et limites
**Points forts :** ancrage secteur public français inégalé (références, compréhension des cycles budgétaires publics, interfaces finances publiques) ; souveraineté native (éditeur FR, hébergement FR, on-premise possible, IA souveraine) ; équilibre simplicité/puissance revendiqué et documenté par les témoignages ; autonomie d'administration sans code ; accompagnement conseil et communauté d'homologues (PM Club).
**Limites :** éditeur de taille modeste (dépendance à sa trajectoire, capacité R&D limitée face aux géants) ; rayonnement essentiellement francophone ; profondeur agile/produit et écosystème d'intégrations moins riches que les suites internationales ; IA naissante (VIA récent) ; pas de version gratuite (démonstration/devis).

---

## 3. Spécifications fonctionnelles
Priorisation MoSCoW (M/S/C).

### 3.1 Module Demande & arbitrage (DEM)

| ID | Exigence | Prio |
|---|---|---|
| EF-DEM-01 | Recueil des demandes de projets par formulaires typés et personnalisables, avec circuit de qualification. | M |
| EF-DEM-02 | Priorisation et scoring des demandes selon des critères configurables alignés sur les objectifs de l'organisation. | M |
| EF-DEM-03 | Validation de la capacité à faire avant lancement (confrontation charge/capacité). | M |
| EF-DEM-04 | Approche « tout est projet » : suivi unifié des projets, de la maintenance et des activités récurrentes. | S |

### 3.2 Module Planification (PLA)

| ID | Exigence | Prio |
|---|---|---|
| EF-PLA-01 | WBS et Gantt interactif multi-projets : dépendances, jalons, chemin critique, planification automatique. | M |
| EF-PLA-02 | Vues alternatives : Kanban, liste, jalons ; export Excel. | M |
| EF-PLA-03 | Bibliothèque de modèles de projets réutilisables et gouvernés. | M |
| EF-PLA-04 | Alerte sur dérive de planning (retards anticipés, jalons menacés). | S |

### 3.3 Module Ressources & temps (RES)

| ID | Exigence | Prio |
|---|---|---|
| EF-RES-01 | Plan de charge temps réel par ressource, service et compétence ; visualisation charge vs capacité. | M |
| EF-RES-02 | Saisie des temps personnalisée par ressource, connectée aux projets et activités. | M |
| EF-RES-03 | Répartition analytique projets / maintenance / récurrent. | S |
| EF-RES-04 | Détection des tensions (surcharge, sous-charge) et simulation d'affectations. | S |

### 3.4 Module Budgets (BUD)

| ID | Exigence | Prio |
|---|---|---|
| EF-BUD-01 | Budget par projet et par portefeuille : prévisionnel, engagé, réalisé ; charges et investissement. | M |
| EF-BUD-02 | Budgétisation pluriannuelle (logique PPI) et enveloppes par entité. | M |
| EF-BUD-03 | Interfaçage avec les logiciels de comptabilité publique et de BI (import des réalisations). | M |
| EF-BUD-04 | Alertes de dérive budgétaire et consolidation en un clic. | M |

### 3.5 Module Pilotage & comités (PIL)

| ID | Exigence | Prio |
|---|---|---|
| EF-PIL-01 | Tableaux de bord personnalisables (synthétiques et détaillés), vision 360° avec alertes. | M |
| EF-PIL-02 | Météo projet et indicateurs d'état normalisés remontés en portefeuille. | M |
| EF-PIL-03 | Revues de projets outillées : supports d'animation, diaporama du portefeuille, décisions et comptes rendus actionnables tracés. | M |
| EF-PIL-04 | Datamart de pilotage croisant données PPM et données externes (finances, RH). | S |
| EF-PIL-05 | Agent IA d'analyse : synthèses de pilotage, mise en évidence des signaux faibles, avec contrôle utilisateur et traitement souverain. | S |

### 3.6 Module Administration & intégration (ADM)

| ID | Exigence | Prio |
|---|---|---|
| EF-ADM-01 | Administration fonctionnelle autonome sans code : champs, formulaires, référentiels, organisation, modèles, libellés. | M |
| EF-ADM-02 | Droits d'accès fins par rôle et périmètre (élus, directions, MOA, MOE, métiers). | M |
| EF-ADM-03 | Interfaces natives standardisées (API) vers le SI ; workflows d'automatisation des processus PPM. | S |
| EF-ADM-04 | Déploiement SaaS hébergé en France ou installation sur site. | M |

## 4. Spécifications non fonctionnelles
- ENF-01 (M) : hébergement des données en France, conformité RGPD ; option on-premise.
- ENF-02 (M) : interface 100 % francophone ; accessibilité RGAA 4 (obligation secteur public).
- ENF-03 (M) : traçabilité des décisions et des modifications (auditabilité des arbitrages).
- ENF-04 (S) : disponibilité ≥ 99,5 % ; sauvegardes et PRA documentés.
- ENF-05 (S) : montée en charge : centaines de projets, milliers d'utilisateurs, consolidations instantanées.
- ENF-06 (S) : accompagnement : formation, conduite du changement, communauté d'utilisateurs.

## 5. Modèle économique (indicatif)
Licence par abonnement (SaaS) ou acquisition (on-premise), sur devis selon périmètre et nombre d'utilisateurs ; prestations d'accompagnement (implémentation ~300 références, formation, administration déléguée en option). Pas d'offre gratuite. Achat public : référencement via centrales d'achat et marchés. Vigilance : dimensionner l'accompagnement (l'éditeur lui-même conditionne la réussite à la démarche, pas au seul logiciel).

## 6. Lots

| Lot | Contenu |
|---|---|
| Lot 1 — Socle portefeuille | Demande/arbitrage, planification Gantt/Kanban, tableaux de bord, météo, droits |
| Lot 2 — Ressources & budgets | Charge/capacité, temps, budgets pluriannuels, interfaces comptables |
| Lot 3 — Gouvernance | Revues/comités outillés, diaporama, datamart, workflows PPM |
| Lot 4 — IA & extension | Agent IA souverain, analyses avancées, intégrations SI étendues |

## 7. Critères d'acceptation
1. Chaque « Must » couvert par un cas de test validé. 2. Cycle complet démontré : demande → arbitrage en comité (capacité + budget) → lancement → revue avec météo et compte rendu tracé. 3. Interface comptable publique opérationnelle (import des réalisations, rapprochement budget). 4. Consolidation du portefeuille (100+ projets) en moins d'une minute. 5. Audit RGAA et attestation d'hébergement France fournis.

## 8. Sources
Analyse du 4 juillet 2026 : viragegroup.com (fonctionnalités, secteurs collectivités/eau, cas clients Eurométropole de Strasbourg, Haute-Savoie, Ille-et-Vilaine, pourquoi Project Monitor), LinkedIn Virage Group, fiches logicielles tierces.
