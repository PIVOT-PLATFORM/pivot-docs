---
sidebar_position: 2
sidebar_label: "Cahier — Miro"
---

# Cahier de spécifications — Plateforme de collaboration visuelle
## Basé sur l'analyse fonctionnelle de Miro

**Version :** 1.0
**Date :** 3 juillet 2026
**Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet du document

Ce document présente une analyse des fonctionnalités de la plateforme Miro, référence du marché de la collaboration visuelle, puis en déduit un cahier de spécifications fonctionnelles et techniques pour la conception d'une plateforme équivalente (ou pour cadrer le déploiement/l'évaluation d'un tel outil).

### 1.2 Périmètre

Le périmètre couvre l'ensemble du cycle de collaboration visuelle : idéation, structuration, animation de réunions et d'ateliers, gestion de projet visuelle, assistance par IA, intégrations avec l'écosystème logiciel de l'entreprise, administration et sécurité.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Board (tableau) | Espace de travail visuel partagé, basé sur un canevas |
| Canevas infini | Surface de travail sans limite de taille, zoomable et navigable |
| Frame (cadre) | Zone délimitée du canevas servant de conteneur ou de diapositive |
| Widget/Objet | Élément placé sur le canevas (pense-bête, forme, texte, image…) |
| Template (modèle) | Structure de board préconstruite et réutilisable |
| Facilitation | Ensemble des outils d'animation de réunions et d'ateliers |

---

## 2. Analyse de l'existant : la plateforme Miro

### 2.1 Positionnement

Miro, fondée en 2011 sous le nom RealtimeBoard, était historiquement positionnée comme un tableau blanc collaboratif en ligne. La plateforme s'est repositionnée en 2025-2026 comme un « espace de travail d'innovation enrichi par l'IA » (AI Innovation Workspace), couvrant tout le cycle d'un projet, de la découverte à la livraison. Elle revendique plus de 25 millions d'utilisateurs et est adoptée par 95 % des entreprises du Fortune 100.

### 2.2 Cartographie des fonctionnalités observées

**Socle canevas et création.** Canevas infini multi-utilisateur ; outils de dessin (stylo, dessin à main levée) avec « dessin intelligent » convertissant automatiquement les tracés en formes, pense-bêtes et connecteurs ; pense-bêtes (sticky notes), formes, flèches, connecteurs, zones de texte, commentaires ; import de fichiers (images, PDF, feuilles de calcul) ; capture de pense-bêtes physiques (numérisation).

**Structuration et gestion de projet.** Au-delà du whiteboard : documents, tables, timelines et diapositives intégrés au canevas ; cartes mentales, diagrammes de flux, wireframes ; outils dédiés aux méthodes Agile/Scrum (planification de sprint, user story mapping, gestion de backlog, PI Planning multi-équipes).

**Collaboration temps réel et asynchrone.** Édition simultanée avec curseurs visibles de chaque participant (jusqu'à 200 collaborateurs simultanés sur un board) ; chat vidéo intégré, partage d'écran ; gestion de l'attention (« Suivre », « Amener tout le monde vers moi ») ; mode présentation interactif ; enregistrement audio/vidéo de visites guidées du board (Talktrack) pour la collaboration asynchrone ; vote, minuteur, mode privé pour les ateliers.

**Modèles et communauté.** Bibliothèque de plus de 250-300 modèles interactifs (mind map, Kanban, rétrospective, parcours client, Ice Breaker…) ; création de modèles personnalisés à l'image de marque de l'entreprise ; communauté de partage de modèles (Miroverse).

**Intelligence artificielle.** Miro Assist / IA intégrée : regroupement automatique des contributions par mot-clé ou sentiment, génération de diagrammes techniques à partir de texte ; workflows IA collaboratifs (Flows, Sidekicks) permettant à plusieurs personnes de travailler avec des agents IA sur un même board ; agrégation de résultats issus d'outils d'IA externes (Claude, NotebookLM) sur le canevas.

**Intégrations et extensibilité.** Marketplace de plus de 160 intégrations natives (250+ applications connectables) : communication (Slack, Microsoft Teams, Zoom, Google Meet), gestion de projet (Jira, Azure DevOps, Asana, Trello, ClickUp, Monday.com, Smartsheet, Notion), design (Sketch, Adobe XD, Figma), stockage (Google Drive, Dropbox, Box) ; intégrations avec les outils de code (Cursor, GitHub Copilot) pour transformer des spécifications visuelles en code ; plateforme développeur (API, SDK) pour créer ses propres intégrations.

**Plateformes et accès.** Application web (navigateur), applications desktop (Windows, macOS), applications mobiles (iOS, Android), support des écrans interactifs.

**Modèle tarifaire.** Plan gratuit permanent (3 boards éditables, utilisateurs illimités), plans payants Starter, Business et Enterprise, essai gratuit de 14 jours du plan Business.

### 2.3 Points forts et limites identifiés

**Points forts :** faible courbe d'apprentissage, collaboration temps réel fluide, richesse des modèles, profondeur des intégrations, capacité à gérer de très grands ateliers (PI Planning), facilitation asynchrone (enregistrements).

**Limites relevées par les utilisateurs :** coût croissant pour les grandes équipes et les modèles premium, ralentissements de navigation sur les boards très chargés, limite de caractères dans certaines zones de texte, import de données chiffrées perfectible.

Ces constats alimentent directement les exigences non fonctionnelles (performance, tarification) du présent cahier.

---

## 3. Spécifications fonctionnelles

Chaque exigence est identifiée (EF-xx), priorisée selon la méthode MoSCoW (M = Must have, S = Should have, C = Could have) et rattachée à un module.

### 3.1 Module Canevas (CNV)

| ID | Exigence | Priorité |
|---|---|---|
| EF-CNV-01 | Le système DOIT fournir un canevas infini, zoomable (molette, pincement) et navigable (panoramique), sans limite fonctionnelle de taille. | M |
| EF-CNV-02 | Le système DOIT permettre la création d'objets : pense-bêtes, formes géométriques, zones de texte, connecteurs/flèches, images, cadres (frames). | M |
| EF-CNV-03 | Le système DOIT proposer un outil de dessin à main levée (stylo, surligneur, gomme). | M |
| EF-CNV-04 | Le système DEVRAIT convertir automatiquement les tracés à main levée en formes, pense-bêtes ou connecteurs (dessin intelligent). | S |
| EF-CNV-05 | Le système DOIT permettre l'import de fichiers sur le canevas : images (PNG, JPG, SVG), PDF, documents bureautiques, feuilles de calcul. | M |
| EF-CNV-06 | Le système DEVRAIT permettre la numérisation de pense-bêtes physiques via l'appareil photo mobile, avec reconnaissance du texte. | S |
| EF-CNV-07 | Le système DOIT offrir des fonctions d'organisation : sélection multiple, groupement, alignement, distribution, verrouillage, calques de premier/arrière-plan. | M |
| EF-CNV-08 | Le système DEVRAIT fournir une mini-carte de navigation et une recherche d'objets sur le board. | S |

### 3.2 Module Structuration et diagrammes (STR)

| ID | Exigence | Priorité |
|---|---|---|
| EF-STR-01 | Le système DOIT proposer des outils de diagrammes : organigrammes, diagrammes de flux, avec bibliothèques de formes (UML, BPMN, réseaux…). | M |
| EF-STR-02 | Le système DOIT proposer un outil de carte mentale (mind map) avec création rapide de nœuds au clavier. | M |
| EF-STR-03 | Le système DEVRAIT intégrer des objets structurés au canevas : tables/bases de données légères, timelines, documents, diapositives. | S |
| EF-STR-04 | Le système DEVRAIT fournir des objets dédiés aux méthodes Agile : cartes de backlog, tableaux Kanban synchronisés, estimation, user story mapping. | S |
| EF-STR-05 | Le système POURRAIT proposer des outils de wireframing (bibliothèque de composants UI). | C |

### 3.3 Module Collaboration temps réel (COL)

| ID | Exigence | Priorité |
|---|---|---|
| EF-COL-01 | Le système DOIT permettre l'édition simultanée d'un board par plusieurs utilisateurs, avec propagation des modifications en moins d'une seconde. | M |
| EF-COL-02 | Le système DOIT afficher en temps réel les curseurs nommés des participants et la liste des personnes présentes. | M |
| EF-COL-03 | Le système DOIT supporter au minimum 100 collaborateurs simultanés par board (cible : 200) sans dégradation majeure. | M |
| EF-COL-04 | Le système DOIT fournir des commentaires ancrés aux objets, avec fils de discussion, mentions (@) et notifications. | M |
| EF-COL-05 | Le système DEVRAIT intégrer un chat vidéo/audio natif au board et le partage d'écran. | S |
| EF-COL-06 | Le système DOIT fournir des outils de gestion de l'attention : suivre un participant, ramener tous les participants sur une zone donnée. | M |
| EF-COL-07 | Le système DOIT conserver un historique des versions du board avec restauration. | M |

### 3.4 Module Facilitation d'ateliers (FAC)

| ID | Exigence | Priorité |
|---|---|---|
| EF-FAC-01 | Le système DOIT proposer un outil de vote (dot voting) sur les objets du board, avec résultats agrégés. | M |
| EF-FAC-02 | Le système DOIT proposer un minuteur visible par tous les participants. | M |
| EF-FAC-03 | Le système DEVRAIT proposer un « mode privé » masquant les contributions individuelles jusqu'à révélation par l'animateur. | S |
| EF-FAC-04 | Le système DOIT proposer un mode présentation basé sur les frames, avec navigation séquentielle, utilisable sans quitter l'outil. | M |
| EF-FAC-05 | Le système DEVRAIT permettre l'enregistrement de visites guidées audio/vidéo du board, consultables de façon asynchrone pendant que le spectateur interagit avec le board. | S |
| EF-FAC-06 | Le système POURRAIT inclure des applications interactives d'animation (brise-glace, quiz, réactions/émojis). | C |

### 3.5 Module Modèles (TPL)

| ID | Exigence | Priorité |
|---|---|---|
| EF-TPL-01 | Le système DOIT fournir une bibliothèque d'au moins 250 modèles couvrant : brainstorming, rétrospectives, Kanban, parcours client, design thinking, planification. | M |
| EF-TPL-02 | Le système DOIT permettre la création, l'enregistrement et le partage de modèles personnalisés (couleurs, logos, polices de l'entreprise). | M |
| EF-TPL-03 | Le système POURRAIT proposer une galerie communautaire de modèles partagés entre organisations. | C |

### 3.6 Module Intelligence artificielle (IA)

| ID | Exigence | Priorité |
|---|---|---|
| EF-IA-01 | Le système DEVRAIT regrouper automatiquement les contributions (pense-bêtes) par thème, mot-clé ou sentiment. | S |
| EF-IA-02 | Le système DEVRAIT générer des diagrammes, cartes mentales ou résumés à partir d'une consigne en langage naturel. | S |
| EF-IA-03 | Le système POURRAIT permettre des workflows IA collaboratifs : agents IA configurables opérant sur le board avec plusieurs utilisateurs. | C |
| EF-IA-04 | Le système POURRAIT agréger sur le canevas des résultats issus d'outils d'IA externes et réinjecter les décisions dans les livrables (roadmap, spécifications, prompts). | C |
| EF-IA-05 | Toute fonction IA DOIT être désactivable au niveau de l'organisation par un administrateur. | M |

### 3.7 Module Intégrations et extensibilité (INT)

| ID | Exigence | Priorité |
|---|---|---|
| EF-INT-01 | Le système DOIT s'intégrer aux outils de communication : Slack, Microsoft Teams, Zoom, Google Meet (a minima notifications et intégration en réunion). | M |
| EF-INT-02 | Le système DOIT s'intégrer aux outils de gestion de projet avec synchronisation bidirectionnelle des cartes/tickets : Jira, Azure DevOps, Asana, Trello (a minima). | M |
| EF-INT-03 | Le système DEVRAIT s'intégrer aux outils de stockage (Google Drive, Dropbox, Box, OneDrive) et de design (Figma, Sketch, Adobe XD). | S |
| EF-INT-04 | Le système DOIT exposer une API publique documentée (REST et/ou SDK) et un mécanisme d'applications tierces (marketplace). | M |
| EF-INT-05 | Le système POURRAIT s'intégrer aux assistants de code (GitHub Copilot, Cursor) pour exploiter les diagrammes et spécifications visuelles. | C |

### 3.8 Module Gestion des utilisateurs et des espaces (USR)

| ID | Exigence | Priorité |
|---|---|---|
| EF-USR-01 | Le système DOIT gérer une hiérarchie organisation > équipes > projets > boards. | M |
| EF-USR-02 | Le système DOIT gérer des rôles et permissions par board : propriétaire, éditeur, commentateur, lecteur ; et des rôles d'administration. | M |
| EF-USR-03 | Le système DOIT permettre le partage par invitation (e-mail) et par lien, avec contrôle de la portée (privé, équipe, organisation, public) et révocation de l'accès. | M |
| EF-USR-04 | Le système DEVRAIT permettre l'accès invité sans compte pour les participants externes à un atelier, avec droits restreints. | S |
| EF-USR-05 | Le système DOIT permettre l'export des boards : image (PNG/JPG), PDF, et format de sauvegarde réimportable. | M |

---

## 4. Spécifications non fonctionnelles

### 4.1 Performance (ENF-PRF)

- ENF-PRF-01 (M) : latence de propagation des modifications temps réel < 500 ms en conditions nominales.
- ENF-PRF-02 (M) : navigation fluide (≥ 30 fps) sur des boards contenant jusqu'à 10 000 objets — point de vigilance directement issu des limites constatées chez Miro sur les boards chargés.
- ENF-PRF-03 (S) : chargement initial d'un board standard < 3 s.

### 4.2 Disponibilité et fiabilité (ENF-DIS)

- ENF-DIS-01 (M) : disponibilité ≥ 99,9 % (SLA Enterprise), page de statut publique.
- ENF-DIS-02 (M) : sauvegarde automatique et continue, aucune perte de données en cas de déconnexion (reprise et resynchronisation).
- ENF-DIS-03 (S) : mode consultation hors ligne sur les applications desktop/mobiles.

### 4.3 Sécurité et conformité (ENF-SEC)

- ENF-SEC-01 (M) : chiffrement des données en transit (TLS 1.2+) et au repos (AES-256).
- ENF-SEC-02 (M) : SSO (SAML 2.0 / OIDC), provisionnement SCIM, authentification à deux facteurs.
- ENF-SEC-03 (M) : journalisation d'audit des actions d'administration et d'accès aux boards (offre Enterprise).
- ENF-SEC-04 (M) : conformité RGPD ; certifications visées : ISO 27001, SOC 2 Type II ; option de résidence des données (UE).
- ENF-SEC-05 (S) : politiques de classification des boards et prévention de fuite de données (restriction de partage externe, filigranes).

### 4.4 Compatibilité et accessibilité (ENF-CMP)

- ENF-CMP-01 (M) : application web compatible avec les dernières versions de Chrome, Edge, Firefox, Safari.
- ENF-CMP-02 (S) : applications natives Windows, macOS, iOS, Android ; support des écrans tactiles interactifs.
- ENF-CMP-03 (S) : conformité accessibilité WCAG 2.1 niveau AA (navigation clavier, lecteurs d'écran, contrastes).
- ENF-CMP-04 (S) : interface localisée a minima en français et en anglais.

### 4.5 Scalabilité et exploitation (ENF-SCA)

- ENF-SCA-01 (M) : architecture supportant des organisations de 10 000+ utilisateurs.
- ENF-SCA-02 (M) : jusqu'à 200 participants simultanés sur un même board (cas PI Planning multi-équipes).
- ENF-SCA-03 (S) : console d'administration avec tableaux de bord d'usage (boards actifs, licences, adoption).

---

## 5. Modèle économique et licences (indicatif)

En cohérence avec les pratiques du marché observées chez Miro :

- Un plan gratuit d'appel (nombre de boards limité, utilisateurs illimités) pour favoriser l'adoption virale.
- Des plans payants par utilisateur/mois (Starter, Business, Enterprise) débloquant : boards illimités, chat vidéo, contrôles de sécurité avancés (SSO), fonctions IA étendues.
- Point de vigilance : la maîtrise du coût pour les grandes équipes est une critique récurrente des utilisateurs de Miro ; prévoir des paliers dégressifs et des licences « occasionnelles » (lecteurs gratuits).

---

## 6. Priorisation et trajectoire de mise en œuvre

| Lot | Contenu | Exigences couvertes |
|---|---|---|
| Lot 1 — MVP | Canevas infini, objets de base, collaboration temps réel, commentaires, partage, export, modèles de base | EF-CNV-01→05/07, EF-COL-01/02/04/07, EF-USR-01→03/05, EF-TPL-01 |
| Lot 2 — Ateliers | Facilitation (vote, minuteur, présentation, attention), diagrammes et mind map, invités externes | EF-FAC-01→04, EF-COL-06, EF-STR-01/02, EF-USR-04 |
| Lot 3 — Entreprise | Intégrations majeures, API/marketplace, SSO/SCIM, audit, résidence des données | EF-INT-01→04, ENF-SEC-02→05 |
| Lot 4 — IA & asynchrone | Clustering IA, génération de diagrammes, enregistrements guidés, tables/timelines | EF-IA-01/02, EF-FAC-05, EF-STR-03/04 |

---

## 7. Critères d'acceptation généraux

1. Chaque exigence « Must » est couverte par au moins un cas de test documenté et validé en recette.
2. Les seuils de performance (§4.1) sont vérifiés par des tests de charge reproduisant 100 puis 200 collaborateurs simultanés.
3. Un atelier pilote réel (20+ participants, vote, minuteur, présentation) est conduit avec un taux de satisfaction ≥ 80 %.
4. Un audit de sécurité indépendant (pentest) est réalisé avant l'ouverture du plan Enterprise.

---

## 8. Annexe — Sources de l'analyse

Analyse réalisée le 3 juillet 2026 à partir de la documentation officielle Miro (site produit et centre d'aide), d'analyses de marché (Salesdorado, The Digital Project Manager, BDM) et d'avis utilisateurs (Capterra, GetApp).
