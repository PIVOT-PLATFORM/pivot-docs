---
sidebar_position: 5
sidebar_label: "Cahier — FigJam"
---

# Cahier de spécifications — Tableau blanc collaboratif intégré à une plateforme de design
## Basé sur l'analyse fonctionnelle de FigJam (Figma)

**Version :** 1.0
**Date :** 3 juillet 2026
**Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet du document

Ce document présente une analyse des fonctionnalités de FigJam, le tableau blanc collaboratif de la plateforme Figma, puis en déduit un cahier de spécifications fonctionnelles et techniques pour la conception d'une plateforme équivalente (ou pour cadrer le déploiement/l'évaluation d'un tel outil).

### 1.2 Périmètre

Le périmètre couvre le tableau blanc collaboratif en amont et en accompagnement du développement produit : idéation, diagrammes et flux utilisateurs, rituels d'équipe (stand-ups, rétrospectives, sprints), engagement ludique des participants, assistance par IA (génération, tri, synthèse), continuité avec les outils de design de la même plateforme, extensibilité (widgets, plugins, communauté), intégrations, administration et sécurité.

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Fichier/Board FigJam | Tableau blanc numérique, type de fichier au sein de la plateforme |
| Page | Sous-espace d'un fichier, séparant activités ou réunions récurrentes |
| Section | Conteneur regroupant et déplaçant des objets sur le tableau |
| Note (sticky) | Pense-bête virtuel, signé par défaut du nom de son auteur |
| Widget | Composant interactif ajouté au tableau (vote, planning poker…) |
| Plugin | Extension tierce ou communautaire enrichissant l'outil |
| Agent/Copilote IA | Assistant génératif opérant sur le contenu du tableau |
| Siège Collab | Licence légère donnant accès complet au tableau blanc sans les outils de design |

---

## 2. Analyse de l'existant : FigJam

### 2.1 Positionnement

FigJam est le tableau blanc collaboratif de Figma, la plateforme de référence du design produit (13 millions d'utilisateurs actifs mensuels, 95 % des entreprises du Fortune 500, introduite en bourse en juillet 2025). Contrairement à Miro (plateforme d'innovation autonome) ou Klaxoon (engagement d'atelier), FigJam se définit par son appartenance à un écosystème : il vit aux côtés de Figma Design, Dev Mode, Slides, Make, Sites et Buzz, les idées circulant d'un outil à l'autre. Son positionnement est double : un outil délibérément simple et inclusif — aucune connaissance des outils de design n'est requise, « tout le monde peut participer » — et le maillon amont du cycle produit pour les équipes design (exploration, alignement des parties prenantes, rituels agiles).

FigJam n'est pas vendu séparément : il est compris dans toutes les licences Figma, du plan Starter gratuit aux plans Enterprise. Depuis Config 2026 (conférence annuelle, juin 2026), l'agent Figma s'étend à FigJam pour générer et analyser tableaux et diagrammes par prompt.

### 2.2 Cartographie des fonctionnalités observées

**Socle canevas et objets.** Tableau blanc avec trois régions (canevas, barre d'outils du fichier, barre d'outils/objets) à la mise en page volontairement épurée ; notes (sticky notes) signées par défaut du nom de l'auteur (désactivable) ; formes redimensionnables avec contours pleins ou pointillés ; connecteurs qui s'alignent sur la grille (diagrammes, organigrammes, parcours et flux utilisateurs) ; dessin à main levée ; texte, images, GIF ; sections pour regrouper, contenir et déplacer des objets ; pages pour organiser plusieurs activités ou réunions récurrentes dans un même fichier ; regroupement par glisser-déposer.

**Collaboration temps réel et engagement ludique.** Édition simultanée avec curseurs expressifs ; tchat audio intégré et discussion en direct ; musique d'ambiance ; réactions par tampons (stamps), émoticônes et « high fives » en temps réel ; avatars Bitmoji personnalisés ; commentaires avec mentions pour le feedback asynchrone ; minuteur de réunion ; mode présentation ; vote ; accès invités. Cette dimension ludique (audio, musique, autocollants, curseurs expressifs) est considérée comme la plus aboutie du marché pour l'engagement.

**Rituels d'équipe et ateliers.** Modèles pour ateliers, diagrammes, cartes mentales, planification ; animation de sprints, stand-ups, rétrospectives et réunions agiles ; brise-glace et rituels ludiques pour groupes étendus ; centaines de modèles communautaires (notamment rétrospectives) ; planning poker via widgets communautaires ; guidage visuel de l'ordre du jour.

**Intelligence artificielle.** Génération par simple invite de templates de réunion, de plannings et de structures ; tri instantané des notes par thèmes en un clic ; synthèse des contributions en éléments d'action clairs (bloc de texte) ; crédits IA inclus jusque dans le plan gratuit (ordre de grandeur : 150/jour, 500/mois) ; depuis Config 2026, agent Figma dans FigJam : génération et analyse de tableaux et de diagrammes, agent enrichissable par connecteurs tiers, recherche web et pièces jointes, skills partageables et plugins générés par prompt.

**Continuité avec la plateforme de design.** Type de fichier natif de Figma : mêmes équipes, projets, brouillons, même login ; import de maquettes de design dans les diagrammes de parcours utilisateur pour montrer les flux aux parties prenantes ; circulation des idées de FigJam vers Figma Design et retour ; prototypage et développement produit dans le même environnement ; SSO/SCIM et posture de sécurité d'entreprise (SOC 2) hérités des plans Organization/Enterprise de la plateforme.

**Extensibilité et intégrations.** Widgets et plugins (bibliothèque communautaire très fournie) ; intégrations Asana, Jira et GitHub pour faire progresser les projets au-delà de la réflexion ; communauté Figma pour partager modèles, widgets et plugins.

**Plateformes.** Application web, applications desktop, application mobile/iPad (édition complète meilleure sur desktop).

**Modèle tarifaire.** FigJam inclus dans tous les plans Figma : Starter gratuit (2 éditeurs, 3 fichiers FigJam + 3 fichiers Figma, 3 pages par fichier, brouillons illimités, accès invités, crédits IA) ; plans payants Professional (~16 $/éditeur/mois en annuel), Organization, Enterprise (jusqu'à ~90 $/mois) ; types de sièges : Full (tout), Dev, et Collab (~3-5 $/utilisateur/mois) donnant un accès complet à FigJam et Slides sans l'édition design — permettant d'équiper toute l'organisation à faible coût.

### 2.3 Points forts et limites identifiés

**Points forts :** simplicité et inclusivité (utilisable immédiatement par les non-designers) ; engagement ludique inégalé (audio, musique, tampons, curseurs) ; IA de tri et de synthèse jugée réellement utile ; continuité native avec le design (import de maquettes, même plateforme, même login) ; siège Collab à très bas coût pour les parties prenantes ; sécurité d'entreprise héritée de Figma (SSO/SCIM, SOC 2) ; espace de travail moins encombré que les plateformes plus complexes.

**Limites relevées :** fonctionnalités jugées limitées par rapport aux plateformes complètes (pas de suivi des actions — l'IA produit un bloc de texte sans responsables ni report au sprint suivant —, pas de rituels récurrents structurés, pas de rapports inter-équipes) ; plan gratuit plafonné à 3 fichiers FigJam, mur payant rapide pour toute pratique récurrente ; anonymat limité (votes masquables mais pas les contributeurs) ; performances parfois lentes signalées ; paradigme « canevas libre » déroutant pour des usages très structurés ; catalogue d'intégrations restreint (Asana, Jira, GitHub) face aux 160+ de Miro ; édition mobile en retrait du desktop ; impossibilité d'acheter l'outil isolément (abonnement plateforme obligatoire).

Ces constats alimentent directement les exigences du présent cahier : la simplicité, l'engagement et la continuité design → développement sont les forces à répliquer ; le suivi des actions, l'anonymat, la performance et la largeur des intégrations sont les axes à dépasser.

---

## 3. Spécifications fonctionnelles

Chaque exigence est identifiée (EF-xx), priorisée selon la méthode MoSCoW (M = Must have, S = Should have, C = Could have) et rattachée à un module.

### 3.1 Module Canevas et objets (CNV)

| ID | Exigence | Priorité |
|---|---|---|
| EF-CNV-01 | Le système DOIT fournir un tableau blanc zoomable et navigable avec une interface volontairement épurée, prise en main sans formation par des non-designers. | M |
| EF-CNV-02 | Le système DOIT proposer : notes (avec attribution d'auteur par défaut, désactivable), formes, connecteurs magnétiques alignés sur la grille, texte, dessin à main levée, images et GIF. | M |
| EF-CNV-03 | Le système DOIT proposer des sections : conteneurs regroupant des objets, déplaçables d'un bloc. | M |
| EF-CNV-04 | Le système DOIT proposer des pages au sein d'un même fichier pour séparer activités et réunions récurrentes. | M |
| EF-CNV-05 | Le système DOIT permettre le regroupement des notes par glisser-déposer, la sélection multiple, l'alignement et le verrouillage. | M |
| EF-CNV-06 | Le système DEVRAIT permettre la création de diagrammes structurés : organigrammes, flux utilisateurs, cartes mentales avec création rapide au clavier. | S |

### 3.2 Module Collaboration et engagement (COL)

| ID | Exigence | Priorité |
|---|---|---|
| EF-COL-01 | Le système DOIT permettre l'édition simultanée en temps réel avec curseurs nommés et liste des présents. | M |
| EF-COL-02 | Le système DOIT proposer des réactions en temps réel : tampons, émoticônes, applaudissements, apposables sur les objets et le canevas. | M |
| EF-COL-03 | Le système DEVRAIT intégrer un tchat audio natif au tableau pour discuter sans outil de visioconférence séparé. | S |
| EF-COL-04 | Le système DOIT fournir des commentaires ancrés avec mentions (@) et notifications pour le feedback asynchrone. | M |
| EF-COL-05 | Le système POURRAIT proposer des éléments d'ambiance ludiques : musique partagée, avatars personnalisés, curseurs expressifs. | C |
| EF-COL-06 | Le système DOIT permettre l'accès invité (participation sans licence complète) avec droits contrôlés. | M |
| EF-COL-07 | Le système DEVRAIT permettre un mode de contribution anonyme (masquage des auteurs et des votes) activable par l'animateur — axe de dépassement de l'existant, où seuls les votes sont masquables. | S |

### 3.3 Module Rituels et facilitation (FAC)

| ID | Exigence | Priorité |
|---|---|---|
| EF-FAC-01 | Le système DOIT proposer un outil de vote sur les objets avec résultats agrégés et option de masquage pendant le vote. | M |
| EF-FAC-02 | Le système DOIT proposer un minuteur de réunion visible par tous. | M |
| EF-FAC-03 | Le système DOIT proposer un mode présentation guidant les participants à travers l'ordre du jour et les zones du tableau. | M |
| EF-FAC-04 | Le système DOIT fournir des modèles pour les rituels agiles : rétrospectives, stand-ups, planification de sprint, brise-glace. | M |
| EF-FAC-05 | Le système DEVRAIT permettre les rituels récurrents : duplication programmée d'un modèle, historique des occurrences dans les pages d'un même fichier. | S |
| EF-FAC-06 | Le système POURRAIT proposer le planning poker et d'autres activités d'estimation, nativement ou par widgets. | C |

### 3.4 Module Intelligence artificielle (IA)

| ID | Exigence | Priorité |
|---|---|---|
| EF-IA-01 | Le système DOIT générer par invite en langage naturel : structures de réunion, modèles, plannings et diagrammes directement sur le tableau. | M |
| EF-IA-02 | Le système DOIT trier les notes par thèmes en un clic (clustering) avec étiquetage automatique des groupes. | M |
| EF-IA-03 | Le système DOIT synthétiser une sélection de contributions en éléments d'action clairs. | M |
| EF-IA-04 | Le système DEVRAIT convertir les éléments d'action générés en tâches assignables (responsable, échéance) exportables vers un outil de gestion de projet — réponse directe à la limite constatée (bloc de texte sans responsables ni report). | S |
| EF-IA-05 | Le système DEVRAIT proposer un agent capable d'analyser le contenu du tableau (résumé de session, détection de doublons, questions ouvertes), enrichissable par connecteurs, recherche web et pièces jointes. | S |
| EF-IA-06 | Le système POURRAIT permettre la création par prompt d'outils personnalisés (plugins, skills) partageables dans l'organisation. | C |
| EF-IA-07 | Des quotas d'usage IA DOIVENT être définis par plan (y compris un volume inclus en gratuit) et affichés à l'utilisateur ; toute fonction IA DOIT être désactivable par un administrateur. | M |

### 3.5 Module Continuité avec le design (DSG)

| ID | Exigence | Priorité |
|---|---|---|
| EF-DSG-01 | Le tableau blanc DOIT être un type de fichier natif de la plateforme de design : mêmes équipes, projets, brouillons, permissions et authentification. | M |
| EF-DSG-02 | Le système DOIT permettre d'importer des maquettes de design sur le tableau (parcours utilisateurs, revues) avec lien vers le fichier source. | M |
| EF-DSG-03 | Le système DEVRAIT permettre la circulation bidirectionnelle des contenus entre tableau blanc et outil de design (copier des éléments d'un fichier à l'autre en conservant leur éditabilité). | S |
| EF-DSG-04 | Le système POURRAIT relier le tableau aux autres outils de la suite (présentations, prototypage) pour transformer les résultats d'atelier en livrables. | C |

### 3.6 Module Extensibilité et communauté (EXT)

| ID | Exigence | Priorité |
|---|---|---|
| EF-EXT-01 | Le système DOIT proposer des widgets interactifs insérables sur le tableau (vote, sondage, matrices, compteurs). | M |
| EF-EXT-02 | Le système DOIT proposer un mécanisme de plugins avec API documentée pour les développeurs tiers. | M |
| EF-EXT-03 | Le système DEVRAIT proposer une galerie communautaire de modèles, widgets et plugins, avec publication par les utilisateurs. | S |

### 3.7 Module Intégrations (INT)

| ID | Exigence | Priorité |
|---|---|---|
| EF-INT-01 | Le système DOIT s'intégrer aux outils de gestion de projet et de développement : Jira, Asana, GitHub (synchronisation des tickets/issues sur le tableau). | M |
| EF-INT-02 | Le système DEVRAIT s'intégrer aux outils de communication (Slack, Microsoft Teams) et de visioconférence pour le partage et les notifications. | S |
| EF-INT-03 | Le système DEVRAIT étendre progressivement son catalogue d'intégrations (stockage cloud, autres suites projet) — axe de dépassement face au retard constaté sur les leaders du marché. | S |

### 3.8 Module Gestion, partage et export (GST)

| ID | Exigence | Priorité |
|---|---|---|
| EF-GST-01 | Le système DOIT gérer la hiérarchie organisation > équipes > projets > fichiers, avec brouillons personnels. | M |
| EF-GST-02 | Le système DOIT gérer le partage par invitation et par lien avec portées contrôlées (privé, équipe, organisation, public) et rôles (éditeur, commentateur, lecteur). | M |
| EF-GST-03 | Le système DOIT permettre l'export du tableau : image (PNG/JPG), PDF ; et l'export des notes en texte/CSV. | M |
| EF-GST-04 | Le système DEVRAIT conserver un historique de versions avec restauration. | S |

---

## 4. Spécifications non fonctionnelles

### 4.1 Performance (ENF-PRF)

- ENF-PRF-01 (M) : propagation temps réel < 500 ms ; réactions et curseurs perçus comme instantanés.
- ENF-PRF-02 (M) : navigation fluide sur des tableaux de plusieurs milliers d'objets — point de vigilance directement issu des lenteurs signalées sur l'existant.
- ENF-PRF-03 (S) : chargement initial d'un fichier standard < 3 s.

### 4.2 Disponibilité et fiabilité (ENF-DIS)

- ENF-DIS-01 (M) : disponibilité ≥ 99,9 %, page de statut publique.
- ENF-DIS-02 (M) : enregistrement automatique continu, resynchronisation transparente après coupure réseau.

### 4.3 Sécurité et conformité (ENF-SEC)

- ENF-SEC-01 (M) : chiffrement en transit (TLS 1.2+) et au repos (AES-256).
- ENF-SEC-02 (M) : SSO (SAML 2.0/OIDC) et provisionnement SCIM hérités de la plateforme hôte (plans Organization/Enterprise).
- ENF-SEC-03 (M) : conformité RGPD ; certifications visées : SOC 2 Type II, ISO 27001.
- ENF-SEC-04 (S) : journaux d'audit, contrôles de partage externe et politiques de sécurité au niveau de l'organisation.

### 4.4 Compatibilité et accessibilité (ENF-CMP)

- ENF-CMP-01 (M) : application web compatible avec les dernières versions de Chrome, Edge, Firefox, Safari ; applications desktop.
- ENF-CMP-02 (S) : application mobile/tablette avec parité fonctionnelle sur la participation (contribution, vote, réactions), l'édition complète pouvant rester optimisée desktop.
- ENF-CMP-03 (S) : conformité accessibilité WCAG 2.1 AA.
- ENF-CMP-04 (S) : interface localisée a minima en français et en anglais.

### 4.5 Scalabilité et exploitation (ENF-SCA)

- ENF-SCA-01 (M) : architecture supportant des organisations de 10 000+ utilisateurs.
- ENF-SCA-02 (S) : plusieurs dizaines de participants simultanés par tableau sans dégradation.
- ENF-SCA-03 (S) : quotas (fichiers, crédits IA) visibles par l'utilisateur avec alertes avant plafond.

---

## 5. Modèle économique et licences (indicatif)

En cohérence avec le positionnement observé de FigJam :

- Le tableau blanc n'est pas vendu isolément : il est inclus dans tous les plans de la plateforme, du gratuit à l'Enterprise.
- Plan gratuit d'appel : nombre limité de fichiers (ordre de grandeur : 3), 2 éditeurs, accès invités, crédits IA inclus — conçu pour l'adoption virale et la validation de concepts.
- Plans payants par éditeur/mois (Professional ~16 $, Organization, Enterprise) avec trois types de sièges : Full (tout), Dev, et Collab à très bas coût (~3-5 $/utilisateur/mois) donnant l'accès complet au tableau blanc sans les outils de design — mécanisme clé pour équiper toutes les parties prenantes.
- Points de vigilance issus de l'analyse : le plafond de fichiers du plan gratuit bloque rapidement les pratiques récurrentes (rétrospectives) ; prévoir un palier intermédiaire ou un déplafonnement du nombre de tableaux à bas coût (à l'image du siège Collab).

---

## 6. Priorisation et trajectoire de mise en œuvre

| Lot | Contenu | Exigences couvertes |
|---|---|---|
| Lot 1 — MVP tableau | Canevas épuré, notes/formes/connecteurs, sections et pages, collaboration temps réel, commentaires, partage, export, modèles de base | EF-CNV-01→05, EF-COL-01/04/06, EF-GST-01→03, EF-FAC-04 |
| Lot 2 — Engagement & rituels | Réactions et tampons, vote, minuteur, présentation, tchat audio, anonymat, diagrammes et mind map | EF-COL-02/03/05/07, EF-FAC-01→03/05/06, EF-CNV-06, EF-GST-04 |
| Lot 3 — IA | Génération par invite, clustering des notes, synthèse en actions, actions assignables, quotas et gouvernance IA | EF-IA-01→04/07 |
| Lot 4 — Écosystème | Continuité design (fichier natif, import de maquettes), widgets/plugins/communauté, intégrations Jira/Asana/GitHub, agent avancé | EF-DSG-01→04, EF-EXT-01→03, EF-INT-01→03, EF-IA-05/06 |

---

## 7. Critères d'acceptation généraux

1. Chaque exigence « Must » est couverte par au moins un cas de test documenté et validé en recette.
2. Un test d'inclusivité est validé : un panel de non-designers réalise sans formation une rétrospective complète (contribution, vote, réactions) avec un taux de réussite ≥ 90 %.
3. Le scénario IA de bout en bout est démontré : génération d'un modèle par invite, tri automatique de 50+ notes par thèmes, synthèse en éléments d'action, export des actions.
4. Le scénario de continuité design est démontré : import d'une maquette dans un diagramme de parcours utilisateur avec lien actif vers le fichier source.
5. Les seuils de performance (§4.1) sont vérifiés sur un tableau de 5 000 objets avec 30 participants simultanés.

---

## 8. Annexe — Sources de l'analyse

Analyse réalisée le 3 juillet 2026 à partir de la documentation officielle Figma (site produit FigJam, guide FigJam du centre d'aide, notes de version et annonces Config 2026), d'analyses de marché francophones (Blog du Modérateur, Blog du Webdesign, Saask, Banani, Retrospective Tools) et d'avis utilisateurs (G2).
