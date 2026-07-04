---
sidebar_position: 3
sidebar_label: "Cahier — MS Whiteboard"
---

# Cahier de spécifications — Plateforme de tableau blanc collaboratif
## Basé sur l'analyse fonctionnelle de Microsoft Whiteboard

**Version :** 1.0
**Date :** 3 juillet 2026
**Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet du document

Ce document présente une analyse des fonctionnalités de Microsoft Whiteboard, l'application de tableau blanc collaboratif intégrée à l'écosystème Microsoft 365, puis en déduit un cahier de spécifications fonctionnelles et techniques pour la conception d'une plateforme équivalente (ou pour cadrer le déploiement/l'évaluation d'un tel outil).

### 1.2 Périmètre

Le périmètre couvre le tableau blanc numérique en contexte de réunion et d'atelier : création à main levée (encrage), objets visuels, collaboration temps réel, intégration native à une suite bureautique et de communication (réunions, stockage, composants partagés), support des appareils tactiles et des salles de réunion équipées, administration et sécurité au niveau du locataire (tenant).

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Board (tableau blanc) | Espace de travail visuel partagé, basé sur un canevas |
| Canevas infini | Surface de travail sans limite de taille, zoomable et navigable |
| Encrage (inking) | Écriture et dessin à main levée au stylet, au doigt ou à la souris |
| Reconnaissance d'encre | Conversion automatique des tracés en formes, lignes ou tableaux |
| Composant partagé | Bloc de contenu synchronisé entre plusieurs applications (type Loop) |
| Locataire (tenant) | Instance d'organisation dans le cloud, gérée par un administrateur |
| Multitouch | Prise en charge simultanée de plusieurs points de contact tactiles |

---

## 2. Analyse de l'existant : Microsoft Whiteboard

### 2.1 Positionnement

Microsoft Whiteboard est un tableau blanc numérique gratuit à canevas infini, accessible à toute personne disposant d'un compte Microsoft (professionnel, éducation ou personnel). Contrairement à Miro, positionné en plateforme d'innovation autonome, Whiteboard se positionne comme une brique de l'écosystème Microsoft 365 : il est activé par défaut pour la plupart des locataires, intégré nativement aux réunions Teams, stocké dans OneDrive Entreprise et Azure, et optimisé pour les appareils Microsoft (Windows 11, Surface Hub, Salles Teams). Lancé comme canevas intégré à Windows et Teams, il a connu une refonte importante en 2023, puis un ralentissement des mises à jour, avant une nouvelle refonte majeure annoncée en 2026 axée sur une interface plus claire, de meilleurs outils de création et une collaboration temps réel plus fluide, en cohérence accrue avec Teams, OneDrive, Loop et Outlook.

### 2.2 Cartographie des fonctionnalités observées

**Socle canevas et encrage.** Canevas infini de forme libre, conçu pour le tactile, la saisie clavier et le stylet ; écriture et dessin à main levée avec encrage intelligent : conversion automatique des tracés en formes propres, en lignes et en tableaux éditables (ink-to-shape, ink-to-table) ; flèches à l'encre (simples et doubles) pour faciliter les diagrammes ; stylos à effets (encre arc-en-ciel, galaxie) ; support multitouch (plus de 20 points de contact) sur écrans interactifs, avec un confort d'écriture sans latence en application native Windows.

**Objets et contenus.** Pense-bêtes (sticky notes) et grilles de notes ; zones de texte ; bibliothèque de formes pour organigrammes et diagrammes ; images, GIF ; annotation par-dessus des photos ou des PDF ; liens cliquables avec aperçu du contenu, et lecture de vidéos en ligne directement sur le tableau ; verrouillage d'objets sur le canevas (et déverrouillage global) ; alignement d'objets avec lignes de guidage et magnétisme ; personnalisation de l'arrière-plan (couleurs, grilles, motifs) avec arrière-plan par défaut ; galerie de création centralisant l'accès aux objets.

**Collaboration temps réel.** Édition simultanée du canevas par tous les membres, quel que soit l'appareil ; avatars et visibilité de l'activité des collaborateurs en temps réel ; fonction « Suivre » permettant de faire suivre son point de vue aux participants pendant la navigation ; réactions (feedback léger et contextuel) ; notes dépliables sur les pense-bêtes (commentaires) ; collaboration inter-organisations en temps réel (grâce au stockage OneDrive Entreprise, sous réserve d'activation par l'administrateur) ; enregistrement automatique et continu dans le cloud, reprise transparente sur n'importe quel appareil.

**Intégration à l'écosystème Microsoft 365.** Intégration native aux réunions Teams : partage d'un tableau blanc à tous les participants en un clic depuis le bac de partage, préparation du tableau avant la réunion, réouverture de tableaux existants en réunion, poursuite du travail après la réunion via l'onglet dédié ; composants Loop synchronisés entre conversations, réunions, e-mails et documents ; insertion de sondages Microsoft Forms en tant que composants Loop, avec résultats visualisés en temps réel sur le canevas ; stockage dans OneDrive Entreprise (par défaut) et Azure ; administration centralisée depuis le centre d'administration Microsoft 365 ; authentification par compte Microsoft avec SSO.

**Modèles.** Plus de 40 modèles personnalisables : brainstorming, réunions, rétrospectives, planification de sprints/Kanban, analyse SWOT, planification de projets, résolution de problèmes, gestion d'incidents, activités pédagogiques ; possibilité d'enregistrer des modèles personnalisés.

**Plateformes et appareils.** Application web (navigateur), applications natives Windows 11, iOS et Android, intégration Teams ; optimisation pour Surface Hub et appareils Salles Microsoft Teams (tableau blanc tout-en-un de salle de réunion) ; usage en éducation (les étudiants repartent avec la version numérique du tableau).

**Export et restitution.** Export du tableau en image (PNG) et, selon les plateformes, vers PDF, Word ou PowerPoint ; partage par lien.

**Modèle économique.** Gratuit : inclus dans Microsoft 365 (activé par défaut, y compris l'offre Éducation A1) et accessible avec un compte Microsoft personnel, sans plan payant dédié.

### 2.3 Points forts et limites identifiés

**Points forts :** gratuité et absence de coût additionnel pour les organisations Microsoft 365 ; intégration Teams inégalée (ouverture dans l'appel sans changer d'application, participants déjà authentifiés) ; reconnaissance d'encre de premier plan ; simplicité et faible courbe d'apprentissage ; excellence sur écrans interactifs (Surface Hub, multitouch) ; SSO et gouvernance IT natives ; adapté au secteur éducatif (déjà licencié et approuvé par les DSI).

**Limites relevées :** fonctionnalités nettement plus restreintes que les leaders du marché (Miro, Mural, Concept Board) — bibliothèque de formes basique, seulement 3 polices, pas de suite d'animation d'ateliers avancée (vote structuré, minuteur) ni d'IA générative sur le canevas ; lenteurs de chargement et fiabilité perfectible, en particulier sur la version web ; friction importante dès qu'un participant externe n'a pas de compte Microsoft ; développement irrégulier (fonctionnalités supprimées au fil des versions, feuille de route peu lisible) ; organisation des tableaux limitée (tous les tableaux au même endroit, recherche difficile) ; qualité inégale des applications mobiles.

Ces constats alimentent directement les exigences du présent cahier : l'intégration à l'écosystème et la simplicité sont les forces à répliquer ; la richesse fonctionnelle, la performance web, l'accès invité et la gestion des tableaux sont les axes à dépasser.

---

## 3. Spécifications fonctionnelles

Chaque exigence est identifiée (EF-xx), priorisée selon la méthode MoSCoW (M = Must have, S = Should have, C = Could have) et rattachée à un module.

### 3.1 Module Canevas et encrage (CNV)

| ID | Exigence | Priorité |
|---|---|---|
| EF-CNV-01 | Le système DOIT fournir un canevas infini, zoomable et navigable, conçu en priorité pour le tactile et le stylet (touch-first) tout en restant pleinement utilisable au clavier/souris. | M |
| EF-CNV-02 | Le système DOIT offrir un encrage à main levée fluide (stylo, surligneur, gomme) avec une latence d'écriture imperceptible (< 50 ms) en application native. | M |
| EF-CNV-03 | Le système DOIT convertir automatiquement les tracés à main levée en formes propres et en lignes (reconnaissance d'encre), de manière désactivable. | M |
| EF-CNV-04 | Le système DEVRAIT convertir les tracés de grilles en tableaux éditables (ink-to-table) et les tracés de flèches en connecteurs (simples et doubles). | S |
| EF-CNV-05 | Le système DOIT supporter le multitouch (≥ 20 points de contact simultanés) pour l'usage à plusieurs sur écran interactif. | M |
| EF-CNV-06 | Le système DOIT permettre la personnalisation de l'arrière-plan (couleur, grille, motif), avec la possibilité de définir un arrière-plan par défaut. | M |
| EF-CNV-07 | Le système DEVRAIT proposer des stylos à effets créatifs (encres spéciales) et plusieurs styles de pointe. | C |
| EF-CNV-08 | Le système DOIT fournir : sélection multiple, copier/coller, verrouillage/déverrouillage (unitaire et global), alignement avec lignes de guidage et magnétisme. | M |

### 3.2 Module Objets et contenus (OBJ)

| ID | Exigence | Priorité |
|---|---|---|
| EF-OBJ-01 | Le système DOIT proposer : pense-bêtes, grilles de notes, zones de texte, formes géométriques et connecteurs. | M |
| EF-OBJ-02 | Le système DOIT permettre l'insertion d'images et de documents (PDF) avec annotation par-dessus. | M |
| EF-OBJ-03 | Le système DOIT permettre l'insertion de liens cliquables avec aperçu, y compris la lecture de vidéos en ligne directement sur le canevas. | S |
| EF-OBJ-04 | Le système DOIT offrir une bibliothèque de formes suffisante pour les organigrammes et diagrammes de flux courants — axe d'amélioration explicite par rapport à l'existant, jugé trop basique. | M |
| EF-OBJ-05 | Le système DEVRAIT proposer une « galerie de création » centralisant la découverte et l'insertion de tous les objets. | S |
| EF-OBJ-06 | Le système DEVRAIT offrir un choix typographique élargi (≥ 10 polices, dont une manuscrite) et le collage par clic droit sur toutes les plateformes. | S |

### 3.3 Module Collaboration temps réel (COL)

| ID | Exigence | Priorité |
|---|---|---|
| EF-COL-01 | Le système DOIT permettre l'édition simultanée du canevas par plusieurs utilisateurs sur tous les appareils, avec propagation en moins d'une seconde. | M |
| EF-COL-02 | Le système DOIT afficher les avatars des participants présents et rendre visible leur activité en temps réel. | M |
| EF-COL-03 | Le système DOIT proposer une fonction « Suivre » faisant suivre aux participants le point de vue de l'animateur pendant sa navigation. | M |
| EF-COL-04 | Le système DOIT proposer des réactions contextuelles (feedback léger) et des notes/commentaires dépliables attachés aux objets. | M |
| EF-COL-05 | Le système DOIT enregistrer automatiquement et en continu tout le contenu dans le cloud, avec reprise transparente depuis n'importe quel appareil. | M |
| EF-COL-06 | Le système DOIT permettre la collaboration temps réel avec des participants d'autres organisations, sous contrôle de l'administrateur. | M |
| EF-COL-07 | Le système DEVRAIT permettre un accès invité sans compte pour les participants externes, avec droits restreints — axe de dépassement de l'existant, où l'absence de compte Microsoft crée une friction notable. | S |
| EF-COL-08 | Le système DEVRAIT conserver un historique des versions du tableau avec restauration. | S |

### 3.4 Module Réunions et facilitation (REU)

| ID | Exigence | Priorité |
|---|---|---|
| EF-REU-01 | Le système DOIT s'intégrer nativement à la solution de visioconférence de l'écosystème (type Teams) : partage du tableau à tous les participants en un clic depuis la réunion, sans changement d'application ni installation. | M |
| EF-REU-02 | Le système DOIT permettre de préparer un tableau avant la réunion, d'ouvrir un tableau existant en réunion, et de poursuivre le travail après la réunion via un onglet persistant. | M |
| EF-REU-03 | Le système DOIT permettre l'insertion de sondages (type Forms) sur le canevas avec visualisation des résultats en temps réel. | S |
| EF-REU-04 | Le système DEVRAIT proposer des outils d'animation d'atelier : vote structuré sur les objets et minuteur partagé — fonctionnalités absentes de l'existant et attendues par les utilisateurs. | S |
| EF-REU-05 | Le système POURRAIT proposer un mode présentation séquentiel basé sur des zones du canevas. | C |

### 3.5 Module Intégration à l'écosystème (ECO)

| ID | Exigence | Priorité |
|---|---|---|
| EF-ECO-01 | Le contenu DOIT être stocké dans l'espace de stockage cloud de l'organisation (type OneDrive Entreprise), héritant de ses règles de gouvernance, de rétention et de partage. | M |
| EF-ECO-02 | Le système DEVRAIT supporter des composants de contenu synchronisés entre applications (type Loop) : un même bloc vivant dans le tableau, les conversations, les e-mails et les documents. | S |
| EF-ECO-03 | Le système DOIT être administrable depuis le centre d'administration du locataire : activation/désactivation, politiques de partage externe, paramètres par défaut. | M |
| EF-ECO-04 | Le système DOIT fonctionner avec les comptes de l'organisation (SSO natif) ainsi qu'avec des comptes personnels. | M |
| EF-ECO-05 | Le système POURRAIT exposer une API pour l'automatisation et les intégrations tierces. | C |

### 3.6 Module Modèles (TPL)

| ID | Exigence | Priorité |
|---|---|---|
| EF-TPL-01 | Le système DOIT fournir une bibliothèque d'au moins 40 modèles personnalisables : brainstorming, réunions, rétrospectives, Kanban/sprints, SWOT, planification de projet, résolution de problèmes, gestion d'incidents, activités pédagogiques. | M |
| EF-TPL-02 | Le système DOIT permettre l'enregistrement et la réutilisation de modèles personnalisés au sein de l'organisation. | M |
| EF-TPL-03 | Le système POURRAIT proposer des modèles dédiés à l'éducation (cours, exercices collaboratifs). | C |

### 3.7 Module Gestion des tableaux et export (GST)

| ID | Exigence | Priorité |
|---|---|---|
| EF-GST-01 | Le système DOIT offrir une page d'accueil organisant les tableaux : dossiers ou regroupements, recherche, tri, favoris — axe de dépassement explicite de l'existant, où tous les tableaux sont au même endroit. | M |
| EF-GST-02 | Le système DOIT permettre le partage par lien avec contrôle de portée (organisation, personnes désignées, externe) et révocation ; seul le propriétaire peut supprimer un tableau. | M |
| EF-GST-03 | Le système DOIT permettre l'export du tableau en image (PNG) et en PDF ; l'export vers les formats bureautiques (Word, PowerPoint) est souhaité. | M |
| EF-GST-04 | Le système DEVRAIT gérer des rôles par tableau : propriétaire, éditeur, lecteur. | S |

### 3.8 Module Appareils de salle et éducation (DEV)

| ID | Exigence | Priorité |
|---|---|---|
| EF-DEV-01 | Le système DOIT être pleinement utilisable sur écrans interactifs de salle de réunion (type Surface Hub / Salles Teams) : session démarrable depuis l'appareil, multitouch, écriture simultanée à plusieurs. | M |
| EF-DEV-02 | Le système DOIT fournir des applications natives Windows, iOS et Android en plus de la version web, avec parité fonctionnelle sur les fonctions essentielles. | M |
| EF-DEV-03 | Le système DEVRAIT couvrir les usages pédagogiques : tableau de classe partagé, remise de la version numérique aux étudiants, intégration aux outils de gestion scolaire. | S |

---

## 4. Spécifications non fonctionnelles

### 4.1 Performance (ENF-PRF)

- ENF-PRF-01 (M) : latence d'encrage < 50 ms en natif, < 100 ms sur le web ; propagation temps réel < 1 s.
- ENF-PRF-02 (M) : chargement initial d'un tableau standard < 3 s, y compris sur la version web — point de vigilance directement issu des lenteurs et de la fiabilité perfectible constatées sur l'existant.
- ENF-PRF-03 (S) : navigation fluide sur des tableaux contenant plusieurs milliers d'objets.

### 4.2 Disponibilité et fiabilité (ENF-DIS)

- ENF-DIS-01 (M) : disponibilité alignée sur le SLA de la suite hôte (≥ 99,9 %).
- ENF-DIS-02 (M) : enregistrement automatique continu, aucune perte de données en cas de coupure réseau (resynchronisation à la reconnexion).
- ENF-DIS-03 (M) : stabilité des fonctionnalités entre versions : toute suppression de fonctionnalité doit être annoncée avec préavis et feuille de route publique — réponse directe au développement jugé irrégulier de l'existant.

### 4.3 Sécurité et conformité (ENF-SEC)

- ENF-SEC-01 (M) : chiffrement en transit (TLS 1.2+) et au repos ; contenu stocké dans le périmètre cloud de l'organisation.
- ENF-SEC-02 (M) : authentification via l'annuaire de l'organisation (SSO, MFA héritée des politiques du locataire).
- ENF-SEC-03 (M) : contrôles d'administration centralisés : activation par locataire, politiques de partage externe et inter-organisations, localisation des données documentée.
- ENF-SEC-04 (M) : conformité RGPD ; héritage des certifications de la plateforme cloud hôte (ISO 27001, SOC 2).
- ENF-SEC-05 (S) : journalisation d'audit des accès et partages, intégrée aux outils d'audit du locataire.

### 4.4 Compatibilité et accessibilité (ENF-CMP)

- ENF-CMP-01 (M) : application web compatible avec les dernières versions de Edge, Chrome, Firefox, Safari.
- ENF-CMP-02 (M) : applications natives Windows 11, iOS, Android ; support des écrans interactifs et du stylet actif.
- ENF-CMP-03 (S) : conformité accessibilité WCAG 2.1 AA, avec déclaration d'accessibilité publiée.
- ENF-CMP-04 (S) : interface localisée a minima en français et en anglais.

### 4.5 Scalabilité et exploitation (ENF-SCA)

- ENF-SCA-01 (M) : activation à l'échelle de locataires de plusieurs dizaines de milliers d'utilisateurs sans déploiement dédié.
- ENF-SCA-02 (S) : plusieurs dizaines de participants simultanés par tableau (cas réunion d'entreprise élargie) sans dégradation.
- ENF-SCA-03 (S) : tableaux de bord d'usage pour l'administrateur (tableaux actifs, adoption).

---

## 5. Modèle économique et licences (indicatif)

En cohérence avec le positionnement observé de Microsoft Whiteboard :

- Outil inclus sans surcoût dans la suite bureautique/collaborative de l'organisation, activé par défaut au niveau du locataire.
- Accessible gratuitement aux comptes personnels et au secteur éducatif.
- Ce positionnement « gratuit et intégré » constitue l'avantage concurrentiel principal face aux plateformes spécialisées payantes (Miro, Mural) ; la contrepartie assumée est un périmètre fonctionnel plus resserré, centré sur la réunion et le brainstorming plutôt que sur la gestion de projet visuelle complète.

---

## 6. Priorisation et trajectoire de mise en œuvre

| Lot | Contenu | Exigences couvertes |
|---|---|---|
| Lot 1 — MVP réunion | Canevas et encrage intelligent, objets de base, collaboration temps réel, enregistrement automatique, intégration visioconférence, export PNG/PDF | EF-CNV-01→03/08, EF-OBJ-01/02, EF-COL-01/02/05, EF-REU-01/02, EF-GST-02/03 |
| Lot 2 — Facilitation | Suivre, réactions, sondages, modèles, arrière-plans, gestion des tableaux, accès inter-organisations | EF-COL-03/04/06, EF-REU-03, EF-TPL-01/02, EF-CNV-06, EF-GST-01 |
| Lot 3 — Écosystème & salles | Composants synchronisés (type Loop), administration locataire, Surface Hub/salles, applications natives | EF-ECO-01→04, EF-DEV-01→03 |
| Lot 4 — Dépassement | Accès invité sans compte, vote et minuteur, historique de versions, bibliothèque de formes étendue, mode présentation, API | EF-COL-07/08, EF-REU-04/05, EF-OBJ-04/06, EF-ECO-05 |

---

## 7. Critères d'acceptation généraux

1. Chaque exigence « Must » est couverte par au moins un cas de test documenté et validé en recette.
2. Les seuils de performance (§4.1) sont vérifiés sur la version web comme sur les applications natives, y compris sur écran interactif avec 4 personnes écrivant simultanément.
3. Un scénario de réunion réel est validé de bout en bout : préparation du tableau, partage en visioconférence à 20+ participants (dont au moins un externe), sondage en direct, reprise du tableau après la réunion.
4. La gouvernance est validée par la DSI : activation par locataire, restriction du partage externe, localisation des données et journalisation d'audit démontrées.

---

## 8. Annexe — Sources de l'analyse

Analyse réalisée le 3 juillet 2026 à partir de la documentation officielle Microsoft (site produit Microsoft Whiteboard, page « Nouveautés » du support Microsoft), des fiches applicatives (Google Play), d'analyses de marché (Jotboard, Freedom251, Écran-Interactif) et d'avis utilisateurs (Capterra, GetApp, Software Advice).
