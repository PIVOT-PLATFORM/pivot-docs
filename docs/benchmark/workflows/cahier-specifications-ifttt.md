---
sidebar_position: 5
sidebar_label: "Cahier — IFTTT"
---

# Cahier de spécifications — Plateforme d'automatisation grand public et objets connectés
## Basé sur l'analyse fonctionnelle d'IFTTT

**Version :** 1.0 — **Date :** 4 juillet 2026 — **Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet
Analyse des fonctionnalités d'IFTTT (If This Then That), pionnier de l'automatisation grand public, puis cahier de spécifications pour concevoir ou évaluer une plateforme équivalente.

### 1.2 Périmètre
Automatisation simple orientée particuliers, créateurs et TPE : applets déclencheur → action(s), maison connectée et IoT, mobile (localisation, notifications, widgets), partage communautaire d'applets, offre d'embarquement B2B (Connect).

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Applet | Automatisation : un déclencheur (« if this ») + une ou plusieurs actions (« then that ») |
| Service | Application ou appareil connecté au catalogue (1 000+) |
| Trigger / Action / Query | Événement déclencheur / action exécutée / requête de données complémentaires |
| Ingredient | Donnée unitaire du déclencheur, injectable dans les champs d'action |
| Filter code | Code JavaScript conditionnel dans une applet (plans payants) |
| Polling | Vérification périodique des déclencheurs non temps réel (1 à 15 min) |

---

## 2. Analyse de l'existant : IFTTT

### 2.1 Positionnement
IFTTT (2011) a inventé le modèle trigger-action grand public. La plateforme revendique plus de 30 millions d'utilisateurs — créateurs, passionnés de maison connectée, petites entreprises — et connecte plus de 1 000 services, avec une force singulière : la domotique et l'IoT (éclairage, garage, alarmes, capteurs, assistants vocaux), complétée par les réseaux sociaux, la productivité personnelle et, depuis 2025-2026, des services IA (Claude, Gemini, ElevenLabs…). C'est l'outil d'automatisation le moins cher du marché (Pro ~3 $/mois) et le plus simple : « pick your trigger and action ». Il n'a en revanche aucune ambition d'entreprise : pas de branches, pas de gouvernance, pas d'équipes — les utilisateurs professionnels le dépassent vite et migrent vers Make/Zapier. L'offre B2B se limite à IFTTT Connect (embarquement des intégrations dans des produits tiers).

### 2.2 Cartographie des fonctionnalités observées
**Applets.** Modèle « si ceci alors cela » : un déclencheur, une ou plusieurs actions (multi-actions en Pro) ; ingredients injectés dans les champs ; queries (Pro+) pour enrichir avec des données complémentaires ; filter code JavaScript pour la logique conditionnelle simple ; exécutions planifiées à intervalle régulier.

**Catalogue.** 1 000+ services, très fort sur la maison connectée et l'IoT (scènes, capteurs, garage, alarmes — y compris cas ludiques comme les alertes de raid de jeux vidéo), assistants vocaux, mobile (Shortcuts iOS/Siri, Android), réseaux sociaux, météo, RSS ; profondeur d'intégration volontairement faible (souvent 1 à 3 triggers/actions par service) ; ajout continu de services (30+ par mois, dont IA).

**Mobile.** Applications iOS/Android complètes : déclencheurs de localisation, notifications riches, widgets, intégration Shortcuts/Siri.

**Communauté.** Applets publiées et partagées en un clic ; bibliothèques thématiques éditorialisées (top applets, collections) ; création d'applets par les marques.

**Modèle économique.** Free : 2 applets actives (très restrictif — « un essai, pas un plan ») ; Pro ~2,49-3,49 $/mois : 20 applets, multi-actions, filter code, polling accéléré ; Pro+ ~8,49-14,99 $/mois : applets illimitées, multi-comptes par service, queries, outils développeur, support prioritaire ; IFTTT Connect (B2B, sur devis).

### 2.3 Points forts et limites
**Points forts :** simplicité absolue (la plus faible barrière d'entrée du marché) ; prix plancher ; couverture domotique/IoT inégalée par les outils pro ; mobile et localisation excellents ; partage communautaire en un clic.
**Limites :** modèle strictement linéaire — pas de branches, boucles, ni transformation de données ; délais de polling (1-15 min) inadaptés au temps réel ; profondeur d'intégration faible ; free devenu quasi inutilisable (2 applets) ; aucune fonction d'équipe, de gouvernance ou d'audit — hors périmètre entreprise ; intégrations parfois non maintenues (resynchronisations manuelles).

---

## 3. Spécifications fonctionnelles

### 3.1 Module Applets (APL)

| ID | Exigence | Prio |
|---|---|---|
| EF-APL-01 | Création d'une automatisation en < 2 minutes : choisir un déclencheur, choisir une action, activer. | M |
| EF-APL-02 | Multi-actions séquentielles sur un même déclencheur. | M |
| EF-APL-03 | Injection des données du déclencheur (ingredients) dans les champs d'action. | M |
| EF-APL-04 | Requêtes de données complémentaires (queries) pour enrichir l'action. | S |
| EF-APL-05 | Logique conditionnelle légère par code de filtre (JavaScript). | S |
| EF-APL-06 | Exécutions planifiées sans déclencheur externe. | S |

### 3.2 Module Catalogue & IoT (IOT)

| ID | Exigence | Prio |
|---|---|---|
| EF-IOT-01 | Catalogue de 1 000+ services incluant les écosystèmes domotiques majeurs (éclairage, capteurs, alarmes, assistants vocaux). | M |
| EF-IOT-02 | Déclencheurs et actions sur appareils physiques (scènes, états, commandes vocales). | M |
| EF-IOT-03 | Services IA (LLM, synthèse vocale) utilisables comme actions. | S |
| EF-IOT-04 | Webhooks entrants/sortants pour les services non catalogués. | S |

### 3.3 Module Mobile (MOB)

| ID | Exigence | Prio |
|---|---|---|
| EF-MOB-01 | Applications iOS/Android : déclencheurs de localisation, notifications, widgets. | M |
| EF-MOB-02 | Intégration aux raccourcis systèmes (Siri/Shortcuts, équivalent Android). | S |

### 3.4 Module Communauté & B2B (COM)

| ID | Exigence | Prio |
|---|---|---|
| EF-COM-01 | Publication et activation en un clic d'applets communautaires ; collections éditorialisées. | M |
| EF-COM-02 | Programme marques/développeurs : publication de services et d'applets officiels. | S |
| EF-COM-03 | Offre d'embarquement B2B des intégrations dans des produits tiers (type Connect). | C |

## 4. Spécifications non fonctionnelles
- ENF-01 (M) : déclenchement webhook temps réel ; polling ≤ 5 min sur plans payants (le délai de 15 min est la première frustration documentée).
- ENF-02 (M) : simplicité mesurée : un débutant active sa première applet sans aide en < 5 min.
- ENF-03 (M) : RGPD, transparence sur les données d'appareils domestiques (localisation, capteurs) — données sensibles de vie privée.
- ENF-04 (S) : fiabilité des intégrations : détection des services cassés et reconnexion guidée.
- ENF-05 (S) : interface localisée FR.

## 5. Modèle économique (indicatif)
Free 2 applets (produit d'appel minimal) ; Pro ~3 $/mois ; Pro+ ~9-15 $/mois (illimité). Le prix plancher est l'argument ; vigilance : un free trop restrictif détruit l'entonnoir (leçon documentée), et au-delà de l'usage personnel, le rapport valeur/prix bascule vers Make/Zapier.

## 6. Lots

| Lot | Contenu |
|---|---|
| Lot 1 — Socle | Applets trigger→action, catalogue, mobile, communauté |
| Lot 2 — Enrichissement | Multi-actions, ingredients/queries, filter code, planification |
| Lot 3 — IoT & IA | Profondeur domotique, services IA, webhooks |
| Lot 4 — B2B | Programme marques, offre d'embarquement |

## 7. Critères d'acceptation
1. « Must » couverts. 2. Panel grand public : première applet activée sans aide en < 5 min (taux ≥ 90 %). 3. Scénario domotique (localisation → scène lumineuse + notification) démontré. 4. Latence webhook < 5 s démontrée.

## 8. Sources
Analyse du 4 juillet 2026 : ifttt.com (guides, top applets 2026, nouveautés juin 2026, collections iOS), Automation Atlas et Miniloop (pricing 2026), G2 (avis), Easyweb, The Digital Project Manager.
