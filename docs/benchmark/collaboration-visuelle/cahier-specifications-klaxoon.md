---
sidebar_position: 4
sidebar_label: "Cahier — Klaxoon"
---

# Cahier de spécifications — Plateforme d'ateliers collaboratifs et d'engagement d'équipe
## Basé sur l'analyse fonctionnelle de Klaxoon

**Version :** 1.0
**Date :** 3 juillet 2026
**Statut :** Document de travail

---

## 1. Introduction

### 1.1 Objet du document

Ce document présente une analyse des fonctionnalités de la plateforme Klaxoon (société française rachetée par Wrike), spécialiste de la collaboration visuelle et de l'engagement des participants en réunion et en atelier, puis en déduit un cahier de spécifications fonctionnelles et techniques pour la conception d'une plateforme équivalente (ou pour cadrer le déploiement/l'évaluation d'un tel outil).

### 1.2 Périmètre

Le périmètre couvre le cycle complet d'un atelier collaboratif : préparation, animation (présentiel, hybride, distanciel), participation active et exploitation des résultats. Il inclut le tableau blanc infini, la suite d'outils d'interaction (quiz, sondages, questions, parcours gamifiés), la facilitation de réunions, l'accès sans compte des participants, l'assistance par IA, la connexion à une plateforme de gestion du travail, les intégrations, la sécurité et le déploiement d'entreprise (y compris hors ligne via boîtier dédié).

### 1.3 Définitions

| Terme | Définition |
|---|---|
| Board (tableau) | Tableau blanc infini où les participants déposent et structurent des idées |
| Activité | Unité de collaboration : Board, Quiz, Sondage, Mémo, Aventure, etc. |
| Session | Conteneur séquençant plusieurs activités en un déroulé d'atelier |
| Aventure | Parcours gamifié (type jeu de piste) validant des acquis par étapes |
| Accès invité (type « Go ») | Participation via lien ou code de session, sans création de compte |
| Participant unique | Métrique de licence : personne distincte ayant rejoint une activité |
| Boîtier hors ligne (type « Box ») | Équipement matériel créant un réseau Wi-Fi local fermé pour collaborer sans Internet |

---

## 2. Analyse de l'existant : la plateforme Klaxoon

### 2.1 Positionnement

Klaxoon, société fondée à Rennes (France), se distingue des tableaux blancs classiques par une approche centrée sur l'interaction humaine et l'intelligence collective plutôt que sur la gestion de tâches : l'outil vise à combattre la passivité des participants (la « Zoom fatigue ») par une gamification poussée et des modules interactifs qui font agir chacun sur le contenu, en présentiel, hybride ou distanciel. La plateforme tout-en-un combine un tableau blanc infini et huit outils de collaboration visuelle (Board, Memo, Session, Adventure, Network, Quiz, Survey, Question, Mission).

Klaxoon a été acquise par Wrike (plateforme de gestion intelligente du travail, groupe STG) : acquisition annoncée en décembre 2024 et finalisée début 2025. Depuis, une intégration native bidirectionnelle relie l'idéation visuelle dans Klaxoon aux workflows structurés dans Wrike (« Wrike Whiteboard » est motorisé par Klaxoon), positionnant l'ensemble comme un continuum idéation → planification → exécution.

### 2.2 Cartographie des fonctionnalités observées

**Board (tableau blanc infini).** Cœur de la plateforme : dépôt d'idées (pense-bêtes), organisation et regroupement de contenus, structuration d'un raisonnement collectif ; dimensions visuelles (couleurs, catégories), diagrammes et mind mapping ; modèles prêts à l'emploi (idéation, rétrospective, plan d'action, gestion de projet) ; collaboration en temps réel ; conçu pour transformer des idées brutes en décisions exploitables.

**Suite d'outils d'interaction.** Quiz (validation d'acquis, formation), Sondages/Survey (recueil d'opinions), Question (interpellation instantanée de l'audience), Memo (partage de connaissances et micro-contenus, exploitables en asynchrone), Network (fil d'échanges d'équipe), Mission ; ces outils s'utilisent seuls ou s'imbriquent dans une Aventure, un Mémo ou une Session.

**Session et Aventure (séquençage et gamification).** La Session agit comme un conteneur temporel : elle agence plusieurs activités (un Board, puis un Quiz, puis un Sondage) dans une séquence logique et structure le déroulé de la réunion ou de la formation. Le mode Aventure propose un parcours ludique de type jeu de piste numérique, idéal en formation pour valider des acquis étape par étape via des challenges successifs.

**Participation sans friction.** Accès de type « Go » : un lien ou un code de session suffit pour rejoindre l'atelier, sans création de compte — idéal pour les participants ponctuels, en déplacement ou externes ; réduction majeure des frictions à l'entrée.

**Intelligence artificielle.** IA intégrée assistant la préparation et l'exploitation des ateliers (aide à la structuration, lisibilité des résultats, gain de temps) ; combinée depuis l'acquisition à la solution Work Intelligence de Wrike pour des workflows pilotés par l'IA de bout en bout.

**Intégration à la gestion du travail (Wrike).** Conversion en quelques clics d'idées/pense-bêtes sélectionnés en tâches Wrike ; import d'éléments Wrike sur un Board (priorisation, mind mapping, planification collaborative) ; rattachement de Boards aux éléments Wrike ; synchronisation instantanée bidirectionnelle des mises à jour ; disponible pour les utilisateurs payants des deux plateformes.

**Intégrations tierces.** Visioconférence : Google Meet, Microsoft Teams (intégration certifiée : ouverture d'un Board dans une conversation ou une réunion Teams sans changer de fenêtre ni se réauthentifier), Zoom ; écosystèmes : Google Workspace, Jira (marketplace Atlassian) ; export des données et duplication de modèles (plans payants).

**Déploiement matériel et hors ligne.** Boîtier « Klaxoon Box » (exclusivité du marché) : réseau Wi-Fi local fermé permettant aux participants de collaborer sans qu'aucune donnée ne transite par le web public — confidentialité totale, usage en sites sensibles ou sans connexion.

**Sécurité et administration (offre Entreprise).** SSO d'entreprise, rattachement des utilisateurs par reconnaissance de domaine, journaux d'audit, classification des données, gestion des services tiers, contrôle des accès et du partage des activités, analyses et statistiques d'utilisation, hébergement personnalisable (SaaS, air-gap), support dédié avec Customer Success Manager.

**Modèle tarifaire.** Free : accès à toutes les activités, jusqu'à 5 participants par activité, plafond de 50 participants uniques cumulés par mois, 500 Mo de stockage, pas d'export de données ; Starter (~24,90 €/utilisateur/mois) : pour consultants, formateurs et petites équipes, intégrations (Teams, Google Workspace, Jira), export et duplication de modèles, 10 Go ; Entreprise (sur devis) : utilisateurs et participants illimités, sécurité avancée, analytics, hébergement personnalisable. Rôles : propriétaires (délégation par co-auteurs), administrateurs, utilisateurs réguliers, participants Free à droits limités.

### 2.3 Points forts et limites identifiés

**Points forts :** engagement des participants inégalé (gamification, quiz, votes, Aventures) là où les concurrents restent des canevas passifs ; séquençage d'ateliers (Session) unique pour formateurs et animateurs ; accès participant sans compte extrêmement fluide ; continuum idéation → exécution grâce à l'intégration native Wrike ; boîtier hors ligne sans équivalent sur le marché ; solution française avec hébergement personnalisable (atout souveraineté/conformité).

**Limites relevées :** modèle de licence à « participants uniques » source de confusion et de blocages en pleine réunion (plafond de 50 participants cumulés en Free, quota vite atteint) ; version gratuite inadaptée à un usage professionnel formel (pas d'export, traçabilité impossible) ; distinction Board/Session déroutante pour les nouveaux utilisateurs (courbe d'apprentissage de la logique d'activités) ; écosystème d'intégrations plus restreint que Miro (160+) ; profondeur « diagrammes techniques » et bibliothèques de formes en retrait des spécialistes ; dépendance stratégique à la feuille de route Wrike depuis l'acquisition.

Ces constats alimentent directement les exigences du présent cahier : l'engagement, le séquençage et l'accès sans compte sont les forces à répliquer ; la clarté du modèle conceptuel, la transparence des quotas et la largeur des intégrations sont les axes à dépasser.

---

## 3. Spécifications fonctionnelles

Chaque exigence est identifiée (EF-xx), priorisée selon la méthode MoSCoW (M = Must have, S = Should have, C = Could have) et rattachée à un module.

### 3.1 Module Board — tableau blanc infini (BRD)

| ID | Exigence | Priorité |
|---|---|---|
| EF-BRD-01 | Le système DOIT fournir un tableau blanc infini, zoomable et navigable, permettant le dépôt d'idées (pense-bêtes), de textes, de formes, de connecteurs, d'images et de fichiers. | M |
| EF-BRD-02 | Le système DOIT permettre l'organisation collective des contributions : regroupement, catégorisation (couleurs, étiquettes, dimensions), zones et colonnes. | M |
| EF-BRD-03 | Le système DOIT proposer des outils de diagrammes et de mind mapping. | M |
| EF-BRD-04 | Le système DOIT permettre la collaboration en temps réel avec visibilité des contributions de chacun. | M |
| EF-BRD-05 | Le système DEVRAIT permettre le dessin à main levée et l'annotation des contenus. | S |
| EF-BRD-06 | Le système DOIT permettre d'exploiter les résultats : tri des idées, marquage des décisions, transformation en plan d'action. | M |

### 3.2 Module Outils d'interaction (INT)

| ID | Exigence | Priorité |
|---|---|---|
| EF-INT-01 | Le système DOIT proposer un outil de Quiz : questions à choix multiples, correction automatique, scores, restitution des résultats — utilisable en direct ou en asynchrone. | M |
| EF-INT-02 | Le système DOIT proposer un outil de Sondage : recueil structuré d'opinions avec visualisation agrégée des réponses en temps réel. | M |
| EF-INT-03 | Le système DOIT proposer un outil de Question instantanée : interpellation de l'audience avec affichage immédiat des réponses (nuage de mots, liste, notes). | M |
| EF-INT-04 | Le système DOIT proposer un vote sur les contributions d'un Board (dot voting, likes) avec résultats agrégés. | M |
| EF-INT-05 | Le système DEVRAIT proposer un outil de type Mémo : capsule de contenu (texte, média, quiz intégré) consultable en asynchrone pour le partage de connaissances. | S |
| EF-INT-06 | Le système POURRAIT proposer un fil d'échanges d'équipe (type Network) rattaché aux activités. | C |
| EF-INT-07 | Les outils d'interaction DOIVENT pouvoir être utilisés seuls ou imbriqués dans une activité conteneur (Session, Aventure, Mémo). | M |

### 3.3 Module Séquençage et gamification (SEQ)

| ID | Exigence | Priorité |
|---|---|---|
| EF-SEQ-01 | Le système DOIT proposer un conteneur de type Session : agencement de plusieurs activités (Board, Quiz, Sondage…) en une séquence logique constituant le déroulé d'un atelier ou d'une formation. | M |
| EF-SEQ-02 | L'animateur DOIT pouvoir piloter la progression de la Session en direct : ouvrir/fermer les étapes, synchroniser les participants sur l'activité en cours. | M |
| EF-SEQ-03 | Le système DEVRAIT proposer un parcours gamifié de type Aventure : étapes successives à débloquer par des challenges, avec validation des acquis — orienté formation. | S |
| EF-SEQ-04 | Le système DEVRAIT fournir des mécaniques d'engagement : scores, classements, badges, réactions, minuteur partagé. | S |
| EF-SEQ-05 | Le modèle conceptuel (activité vs conteneur) DOIT être rendu explicite dans l'interface (assistants de création, nommage clair) — réponse directe à la confusion Board/Session constatée chez les nouveaux utilisateurs de l'existant. | M |

### 3.4 Module Participation et accès (ACC)

| ID | Exigence | Priorité |
|---|---|---|
| EF-ACC-01 | Le système DOIT permettre de rejoindre toute activité via un simple lien ou un code de session, sans création de compte, depuis un navigateur ou un mobile. | M |
| EF-ACC-02 | Les participants sans compte DOIVENT pouvoir contribuer pleinement (idées, votes, réponses) avec des droits limités à la participation. | M |
| EF-ACC-03 | Le système DEVRAIT permettre à l'animateur de contrôler l'anonymat des contributions (nominatif, pseudonyme, anonyme). | S |
| EF-ACC-04 | Le système DOIT afficher clairement et en amont les quotas de participants de la licence, avec alerte avant d'atteindre le plafond — réponse directe aux blocages en pleine réunion constatés sur l'existant. | M |

### 3.5 Module Préparation et modèles (TPL)

| ID | Exigence | Priorité |
|---|---|---|
| EF-TPL-01 | Le système DOIT fournir une bibliothèque de modèles prêts à l'emploi : idéation, rétrospective, plan d'action, gestion de projet, brise-glace, formation. | M |
| EF-TPL-02 | Le système DOIT permettre de préparer une activité en amont (contenus, consignes, séquence) puis de la dupliquer et de la réutiliser. | M |
| EF-TPL-03 | Le système DEVRAIT permettre le partage de modèles personnalisés au sein de l'organisation. | S |

### 3.6 Module Intelligence artificielle (IA)

| ID | Exigence | Priorité |
|---|---|---|
| EF-IA-01 | Le système DEVRAIT assister la préparation d'atelier : génération de trames de Board, de questions de quiz et de séquences à partir d'un objectif exprimé en langage naturel. | S |
| EF-IA-02 | Le système DEVRAIT assister l'exploitation des résultats : regroupement automatique des idées, synthèses, mise en lisibilité des contributions. | S |
| EF-IA-03 | Le système POURRAIT relier l'IA d'atelier à l'IA de la plateforme de gestion du travail pour des workflows pilotés de bout en bout (idéation → tâches). | C |
| EF-IA-04 | Toute fonction IA DOIT être désactivable au niveau de l'organisation par un administrateur. | M |

### 3.7 Module Continuum vers l'exécution (EXE)

| ID | Exigence | Priorité |
|---|---|---|
| EF-EXE-01 | Le système DOIT permettre de convertir une sélection d'idées/pense-bêtes en tâches d'un outil de gestion du travail (type Wrike) en quelques clics. | M |
| EF-EXE-02 | Le système DEVRAIT permettre d'importer des éléments de l'outil de gestion du travail sur un Board (priorisation, planification collaborative) avec synchronisation bidirectionnelle instantanée des mises à jour. | S |
| EF-EXE-03 | Le système DEVRAIT permettre de rattacher un Board à un élément de travail (tâche, projet) et d'y accéder depuis celui-ci. | S |
| EF-EXE-04 | Le système DOIT permettre l'export des résultats d'activités (comptes-rendus, PDF, tableur) pour la traçabilité — fonctionnalité à inclure dès les plans professionnels d'entrée de gamme. | M |

### 3.8 Module Intégrations (ECO)

| ID | Exigence | Priorité |
|---|---|---|
| EF-ECO-01 | Le système DOIT s'intégrer aux solutions de visioconférence (Microsoft Teams, Google Meet, Zoom) : ouverture d'une activité dans la réunion ou la conversation sans changement de fenêtre ni réauthentification. | M |
| EF-ECO-02 | Le système DEVRAIT s'intégrer aux écosystèmes bureautiques et projet : Google Workspace, Jira. | S |
| EF-ECO-03 | Le système DEVRAIT exposer une API publique et étendre progressivement le catalogue d'intégrations — axe de dépassement face au retard constaté sur les leaders du marché. | S |

### 3.9 Module Administration, sécurité et déploiement (ADM)

| ID | Exigence | Priorité |
|---|---|---|
| EF-ADM-01 | Le système DOIT gérer des rôles : administrateur, propriétaire d'activité (avec délégation à des co-auteurs), utilisateur régulier, participant à droits limités. | M |
| EF-ADM-02 | Le système DOIT offrir : SSO d'entreprise, rattachement des utilisateurs par reconnaissance de domaine, contrôle des accès et du partage des activités, gestion des services tiers. | M |
| EF-ADM-03 | Le système DOIT fournir des journaux d'audit et une classification des données (offre Entreprise). | M |
| EF-ADM-04 | Le système DEVRAIT fournir des analyses d'usage (activités, participation, engagement) aux administrateurs et aux animateurs. | S |
| EF-ADM-05 | Le système DEVRAIT proposer des options d'hébergement personnalisables : SaaS, hébergement dédié, déploiement air-gap. | S |
| EF-ADM-06 | Le système POURRAIT proposer un mode hors ligne via boîtier matériel créant un réseau local fermé (aucune donnée sur le web public) pour les sites sensibles ou non connectés. | C |

---

## 4. Spécifications non fonctionnelles

### 4.1 Performance (ENF-PRF)

- ENF-PRF-01 (M) : propagation temps réel des contributions et des résultats de votes/quiz < 1 s.
- ENF-PRF-02 (M) : montée en charge instantanée à l'ouverture d'une activité : 100+ participants rejoignant en moins d'une minute (cas plénière) sans dégradation.
- ENF-PRF-03 (S) : rejoindre une activité via lien/code en moins de 10 s sur mobile, sans installation.

### 4.2 Disponibilité et fiabilité (ENF-DIS)

- ENF-DIS-01 (M) : disponibilité ≥ 99,9 % ; les créneaux de maintenance ne doivent pas intervenir aux heures ouvrées européennes (usage atelier en direct critique).
- ENF-DIS-02 (M) : enregistrement automatique et continu ; reconnexion transparente des participants en cas de coupure réseau.
- ENF-DIS-03 (S) : mode dégradé consultation si le temps réel est indisponible.

### 4.3 Sécurité et conformité (ENF-SEC)

- ENF-SEC-01 (M) : chiffrement en transit (TLS 1.2+) et au repos (AES-256).
- ENF-SEC-02 (M) : SSO (SAML 2.0/OIDC), MFA ; isolation stricte des contributions des participants sans compte.
- ENF-SEC-03 (M) : conformité RGPD ; hébergement des données en Union européenne proposé par défaut (atout souveraineté) ; certifications visées : ISO 27001, SOC 2.
- ENF-SEC-04 (S) : option de déploiement totalement déconnecté (air-gap/boîtier local) pour les environnements à haute confidentialité.
- ENF-SEC-05 (M) : journalisation d'audit des actions d'administration, d'accès et de partage.

### 4.4 Compatibilité et accessibilité (ENF-CMP)

- ENF-CMP-01 (M) : application web compatible avec les dernières versions de Chrome, Edge, Firefox, Safari ; expérience participant pleinement fonctionnelle sur mobile (navigateur et applications iOS/Android).
- ENF-CMP-02 (S) : usage en présentiel sur écran interactif / vidéoprojecteur (affichage animateur distinct de la vue participant).
- ENF-CMP-03 (S) : conformité accessibilité WCAG 2.1 AA.
- ENF-CMP-04 (M) : interface localisée a minima en français et en anglais.

### 4.5 Scalabilité et exploitation (ENF-SCA)

- ENF-SCA-01 (M) : architecture supportant des organisations de 10 000+ utilisateurs et des activités à plusieurs centaines de participants simultanés.
- ENF-SCA-02 (M) : quotas de licence visibles et prévisibles (tableau de bord de consommation des participants uniques) — réponse directe à l'opacité du modèle constatée sur l'existant.
- ENF-SCA-03 (S) : console d'administration avec statistiques d'usage et d'engagement.

---

## 5. Modèle économique et licences (indicatif)

En cohérence avec les pratiques observées chez Klaxoon :

- Plan Free : toutes les activités accessibles, mais audience plafonnée (ordre de grandeur : 5 participants par activité, 50 participants uniques cumulés/mois) et stockage limité (500 Mo) — conçu comme bac à essai.
- Plan Starter (~25 €/utilisateur/mois) : consultants, formateurs, petites équipes ; intégrations (Teams, Google Workspace, Jira), export des données, duplication de modèles, 10 Go.
- Plan Entreprise (sur devis) : utilisateurs et participants illimités, sécurité avancée (SSO, audit, classification), analytics, hébergement personnalisable, support dédié (CSM).
- Points de vigilance issus de l'analyse : la métrique « participants uniques » doit être transparente et outillée (alertes, tableau de bord) pour éviter les blocages en séance ; l'export des résultats devrait être disponible dès le premier plan payant, la traçabilité étant une exigence professionnelle de base.

---

## 6. Priorisation et trajectoire de mise en œuvre

| Lot | Contenu | Exigences couvertes |
|---|---|---|
| Lot 1 — MVP atelier | Board temps réel, vote, quiz, sondage, question instantanée, accès sans compte par lien/code, modèles de base, export des résultats | EF-BRD-01→04/06, EF-INT-01→04, EF-ACC-01/02/04, EF-TPL-01/02, EF-EXE-04 |
| Lot 2 — Animation & gamification | Session (séquençage piloté), Aventure, mécaniques d'engagement, anonymat contrôlé, Mémo asynchrone | EF-SEQ-01→05, EF-INT-05/07, EF-ACC-03, EF-TPL-03 |
| Lot 3 — Entreprise & continuum | SSO/audit/classification, intégrations visioconférence, conversion idées → tâches et synchronisation bidirectionnelle, analytics | EF-ADM-01→04, EF-ECO-01/02, EF-EXE-01→03 |
| Lot 4 — IA & souveraineté | Assistance IA (préparation et synthèse), API publique, hébergement personnalisable, mode hors ligne (boîtier local) | EF-IA-01→03, EF-ECO-03, EF-ADM-05/06 |

---

## 7. Critères d'acceptation généraux

1. Chaque exigence « Must » est couverte par au moins un cas de test documenté et validé en recette.
2. Un atelier réel de bout en bout est validé : préparation d'une Session (Board + Quiz + Sondage), animation en direct avec 50+ participants dont la majorité rejoint sans compte via code, vote, synthèse et export du compte-rendu.
3. Les seuils de performance (§4.1) sont vérifiés par un test de charge simulant l'arrivée de 100 participants en moins d'une minute.
4. Le scénario « continuum » est démontré : conversion d'idées sélectionnées en tâches dans l'outil de gestion du travail, avec synchronisation bidirectionnelle vérifiée.
5. La gouvernance Entreprise est validée par la DSI : SSO, reconnaissance de domaine, journaux d'audit, tableau de bord des quotas de participants.

---

## 8. Annexe — Sources de l'analyse

Analyse réalisée le 3 juillet 2026 à partir de la documentation officielle Klaxoon/Wrike (site produit, centre d'aide Wrike, communiqués d'acquisition et d'intégration), des fiches de certification (Microsoft 365 App Certification, Atlassian Marketplace), d'analyses de marché francophones (KB Gestion de Projets, Astucial) et d'avis utilisateurs (Gartner Peer Insights, G2).
