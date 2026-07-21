# E18 — Domaine Pilotage

> **Refonte 2026-07-13.** Cet EPIC portait uniquement le **socle technique** du domaine Pilotage
> (enablers EN18.1/2/9/10/11). Il héberge désormais aussi le **cœur fonctionnel** issu de l'outil
> interne **OPPA** (*Outil de Pilotage Produits & Activités*) : gestion des activités, budget &
> photos financières, jalons, risques, portefeuilles, référentiels et administration. Le module
> **Achats / Contrats** (demandes d'achats & contrats, application WRAP/OPDN) est traité à part dans
> [E25 — Achats & Contrats](../EPIC-achats-contrats/README.md).

## Objectif

Couvrir le pilotage des **produits & activités** de la Division Numérique : cycle de vie d'une
activité (Build / Run / Groupement / Transverse), informations générales et structurelles
(Élaboration PMT), budget pluriannuel (PDS, PMT, photos financières, lignes budgétaires
CAPEX/APCO/OPEX × MO/HMO), jalons du cycle (Revue DivNum, Jalons A–E, CEN, J6 MEP, J7 MES),
risques & parades, portefeuilles d'activités (13 filtres), recherche, référentiels (objets de
gestion OI/EOTP, produits, contrats) et administration/habilitations.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage` partagé du domaine, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration « Socle terminé » par le mainteneur (comme les
autres modules du domaine). Les enablers de socle EN18.1/2/9/10/11 restent rattachés au
Sprint 9 (socle technique Pilotage — extrait, voir `PILOTAGE-HANDOFF.md`).

## Origine

Périmètre fonctionnel importé de deux sources internes EDF, croisées le 2026-07-13 :

- **Backlog OPPA** (reconstitution à partir des notes de version OPPA v1.0.0 → v2.1.0) — Epics 1 à 11,
  portés en US `US18.1.x`…`US18.11.x` + enablers `EN18.12`…`EN18.19`.
- **SPEC_OPDN** (spécification fonctionnelle Word, écrans Portefeuilles / Activités / Budget /
  Jalons) — une US par bloc de spécification, portées en `US18.12.x`…`US18.19.x`.

Chaque US porte sa provenance dans le champ `Source:` (`Backlog OPPA …` ou `SPEC_OPDN …`). Les
critères d'acceptation restent **à affiner au Gate 1 PO Agent** avant tout démarrage de sprint
(règles de gestion reprises fidèlement de la source, mais AC Given/When/Then à challenger). Le
recouvrement volontaire entre la Partie A (backlog agile) et la Partie B (spec détaillée) est
conservé : les deux vues coexistent sous leur Feature respective.

> **Matrice de rôles Élaboration PMT** (P = Prescripteur · V = Vérificateur/Valideur · CM = Contract
> Manager · A = Administrateur) : voir la spécification source SPEC_OPDN §B.13bis. Les obligations
> par champ (obligatoire/facultatif, mono/multi) sont reprises dans chaque US `US18.17.x`.

## Périmètre GitHub (phase-3)

### F18.1 — Gestion des activités
- US18.1.1 : Renseigner les informations générales d'une activité
- US18.1.2 : Renseigner les informations structurelles d'une activité
- US18.1.3 : Contrôler la validité du nom d'activité
- US18.1.4 : Consulter la dernière modification d'une activité
- US18.1.5 : Identifier rapidement une activité par son trigramme
- US18.1.6 : Visualiser les activités liées Parents / Enfants

### F18.2 — Gestion budgétaire
- US18.2.1 : Créer une ligne budgétaire
- US18.2.2 : Modifier une ligne budgétaire
- US18.2.3 : Dupliquer une ligne budgétaire
- US18.2.4 : Supprimer une ligne budgétaire
- US18.2.5 : Classer et filtrer les données budgétaires
- US18.2.6 : Naviguer entre les années
- US18.2.7 : Distinguer numéro et libellé de contrat
- US18.2.8 : Consulter la dernière modification budgétaire

### F18.3 — Gestion des jalons
- US18.3.1 : Piloter les jalons du cycle (J4–J7, PMPG)
- US18.3.2 : Valider un jalon avec date de passage obligatoire
- US18.3.3 : Gérer le jalon CEN
- US18.3.4 : Gérer le jalon J7 « Mise en Service (MES) »
- US18.3.5 : Gérer le jalon J6 « Mise en Production (MEP) »
- US18.3.6 : Filtrer / isoler un jalon dans la vue planning
- US18.3.7 : Réinitialiser les champs de jalon (vue planning)
- US18.3.8 : Accéder aux revues de sécurisation (Jalons B, C, D)

### F18.4 — Gestion des risques
- US18.4.1 : Gérer les principaux risques et parades

### F18.5 — Gestion de portefeuille
- US18.5.1 : Suivre un portefeuille d'activités
- US18.5.2 : Fiabiliser les noms de portefeuille
- US18.5.3 : Améliorer la lisibilité de la liste des activités

### F18.6 — Recherche & navigation
- US18.6.1 : Rechercher activités et portefeuilles
- US18.6.2 : Filtrer par produit associé
- US18.6.3 : Sécuriser la navigation

### F18.7 — Référentiels & objets de gestion
- US18.7.1 : Mettre à jour les objets de gestion (OI, EOTP)
- US18.7.2 : Mettre à jour les produits
- US18.7.3 : Gérer les référentiels métiers

### F18.8 — Administration & habilitations
- US18.8.1 : Accéder au menu d'administration

### F18.9 — Reporting & photos financières
- US18.9.1 : Consulter les photos financières
- US18.9.2 : Accéder aux rapports Power BI
- US18.9.3 : Suivre le financier de l'activité

### F18.10 — Intégrations & liens externes
- US18.10.1 : Accéder à l'application de suivi des modifications (logs)
- US18.10.2 : Accéder aux guides & support
- US18.10.3 : Disposer de liens utiles intégrés

### F18.11 — Ergonomie & qualité transverse
- US18.11.1 : Bénéficier de bulles d'aide harmonisées
- US18.11.2 : Être protégé contre la perte de saisie
- US18.11.3 : Réinitialiser rapidement les champs de saisie

### F18.12 — Portefeuilles d'activités — liste & gestion
- US18.12.1 : Affichage de la liste des portefeuilles
- US18.12.2 : Modification d'un portefeuille existant
- US18.12.3 : Suppression d'un portefeuille existant
- US18.12.4 : Sélection et affichage d'un portefeuille
- US18.12.5 : Recherche d'une activité dans un portefeuille
- US18.12.6 : Création d'un nouveau portefeuille

### F18.13 — Portefeuilles — filtres & création
- US18.13.1 : Utiliser les filtres pour créer un portefeuille
- US18.13.2 : Réinitialisation des filtres
- US18.13.3 : Enregistrement d'un nouveau portefeuille
- US18.13.4 : Bouton Annuler

### F18.14 — Recherche d'activités
- US18.14.1 : Affichage de la liste des activités
- US18.14.2 : Recherche d'une activité
- US18.14.3 : Réactualisation de la liste
- US18.14.4 : Affichage des activités archivées

### F18.15 — Création d'une activité
- US18.15.1 : Débuter la création d'une nouvelle activité
- US18.15.2 : Règle de nommage à la création d'une activité
- US18.15.3 : Historique des modifications (logs) des informations générales et structurelles
- US18.15.4 : Affichage du dernier porteur de modification
- US18.15.5 : Afficher le créateur de l'activité
- US18.15.6 : Header de l'activité
- US18.15.7 : Affichage d'une activité
- US18.15.8 : Suppression d'une activité
- US18.15.9 : Dupliquer une activité
- US18.15.10 : Message d'avertissement au changement d'écran/onglet sans enregistrement

### F18.16 — Activité — Informations générales
- US18.16.1 : Nom de l'activité
- US18.16.2 : Statut de l'activité
- US18.16.3 : Météo du projet
- US18.16.4 : Description de l'activité
- US18.16.5 : Derniers faits marquants
- US18.16.6 : Projet à enjeux
- US18.16.7 : Gains estimés (k€)
- US18.16.8 : Typologie Gains
- US18.16.9 : Commentaires Gains
- US18.16.10 : Enregistrer informations générales

### F18.17 — Activité — Élaboration PMT (informations structurelles)
- US18.17.1 : Plan Moyen Terme (PMT)
- US18.17.2 : Plan de production de l'année
- US18.17.3 : Priorisation
- US18.17.4 : Macro Processus Métier concerné
- US18.17.5 : Présence schéma directeur
- US18.17.6 : Commentaires schéma directeur
- US18.17.7 : Pilote d'activité
- US18.17.8 : Produits associés
- US18.17.9 : Propriétaire
- US18.17.10 : Département / Programme / Mission
- US18.17.11 : Pôle / Usine
- US18.17.12 : Domaine métier
- US18.17.13 : Sous-domaine métier
- US18.17.14 : Sous-domaine métier (niveau 2)
- US18.17.15 : Capacité métier
- US18.17.16 : Sous-capacité métier
- US18.17.17 : Typologie principale de l'activité
- US18.17.18 : Zone Activités liées
- US18.17.19 : Enregistrer informations structurelles

### F18.18 — Activité — écran Budget
- US18.18.1 : Affichage de l'écran Budget
- US18.18.2 : Affichage de l'onglet PDS Pluriannuel
- US18.18.3 : Affichage de l'onglet Élaboration PMT
- US18.18.4 : Tableau budgétaire (colonnes)
- US18.18.5 : Affichage de l'onglet Photo financière
- US18.18.6 : Liste déroulante de sélection des photos financières
- US18.18.7 : Bouton de mise à jour des données des tableaux
- US18.18.8 : Bouton Synthèse (afficher/rétracter toutes les lignes)
- US18.18.9 : Barre de recherche
- US18.18.10 : Dupliquer une ligne budgétaire
- US18.18.11 : Modifier une ligne budgétaire (onglet PDS Pluriannuel)
- US18.18.12 : Modifier une ligne budgétaire (onglets Élaboration PMT / Photos financières)
- US18.18.13 : Supprimer une ligne budgétaire
- US18.18.14 : Enregistrer (onglets PDS Pluriannuel et Élaboration PMT)
- US18.18.15 : Bouton « + Ligne budgétaire » — création d'une nouvelle ligne
- US18.18.16 : Enregistrer — onglet Photo financière
- US18.18.17 : Historique des modifications (logs) — Budget
- US18.18.18 : Historique des modifications — onglets PDS / ELAB_PMT
- US18.18.19 : Comparaison des photos financières

### F18.19 — Activité — écran Jalons
- US18.19.1 : Création de l'écran Jalon
- US18.19.2 : Affichage et tri des jalons
- US18.19.3 : Structure du bloc Jalon A
- US18.19.4 : Structure du bloc Jalon B / C / D / ABC / BC
- US18.19.5 : Structure des blocs jalons à date simple
- US18.19.6 : Structure du bloc Jalon CEN
- US18.19.7 : Structure du bloc J7 - Mise en Service (MES)
- US18.19.8 : Structure du bloc J6 - Mise en Production (MEP)
- US18.19.9 : Créer un jalon
- US18.19.10 : Valider un jalon A / B / C / D
- US18.19.11 : Modifier un jalon à la volée
- US18.19.12 : Supprimer un jalon
- US18.19.13 : Modifier un jalon grisé
- US18.19.14 : Workflow des jalons
- US18.19.15 : Affichage des jalons (grisés)
- US18.19.16 : Enregistrer l'écran Jalon
- US18.19.17 : Historique des modifications (logs) — Jalons

### E18 — Enablers (socle technique du domaine)
- EN18.1 : Schéma Flyway `pilotage` + entités JPA
- EN18.2 : Guard Angular module pilotage
- EN18.9 : Modèle Application → Projet
- EN18.10 : Profil d'organisation par défaut (couture / seam)
- EN18.11 : Exposer les KPI du domaine (producteur KpiRef)
- EN18.12 : Retirer les jalons ABC/BC de la création
- EN18.13 : Renommage du champ « Bénéficiaire (MOA) »
- EN18.14 : Gestion des habilitations par groupe AD
- EN18.15 : Corriger les données « fantômes »
- EN18.16 : Anonymiser les environnements hors production
- EN18.17 : Optimiser le lancement de l'application
- EN18.18 : Performance, stabilité et sécurité (NFR transverse)
- EN18.19 : Canaux de retours utilisateurs

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F18.1 — Gestion des activités** | |
| [US18.1.1 — Renseigner les informations générales d'une activité](FEATURES/gestion-activites/us-informations-generales-activite.md) | ⬜ |
| [US18.1.2 — Renseigner les informations structurelles d'une activité](FEATURES/gestion-activites/us-informations-structurelles-activite.md) | ⬜ |
| [US18.1.3 — Contrôler la validité du nom d'activité](FEATURES/gestion-activites/us-controle-nom-activite.md) | ⬜ |
| [US18.1.4 — Consulter la dernière modification d'une activité](FEATURES/gestion-activites/us-consulter-derniere-modification-activite.md) | ⬜ |
| [US18.1.5 — Identifier rapidement une activité par son trigramme](FEATURES/gestion-activites/us-trigramme-activite.md) | ⬜ |
| [US18.1.6 — Visualiser les activités liées Parents / Enfants](FEATURES/gestion-activites/us-activites-liees-parents-enfants.md) | ⬜ |
| **F18.2 — Gestion budgétaire** | |
| [US18.2.1 — Créer une ligne budgétaire](FEATURES/gestion-budgetaire/us-creer-ligne-budgetaire.md) | ⬜ |
| [US18.2.2 — Modifier une ligne budgétaire](FEATURES/gestion-budgetaire/us-modifier-ligne-budgetaire.md) | ⬜ |
| [US18.2.3 — Dupliquer une ligne budgétaire](FEATURES/gestion-budgetaire/us-dupliquer-ligne-budgetaire.md) | ⬜ |
| [US18.2.4 — Supprimer une ligne budgétaire](FEATURES/gestion-budgetaire/us-supprimer-ligne-budgetaire.md) | ⬜ |
| [US18.2.5 — Classer et filtrer les données budgétaires](FEATURES/gestion-budgetaire/us-classer-filtrer-donnees-budgetaires.md) | ⬜ |
| [US18.2.6 — Naviguer entre les années](FEATURES/gestion-budgetaire/us-naviguer-entre-annees.md) | ⬜ |
| [US18.2.7 — Distinguer numéro et libellé de contrat](FEATURES/gestion-budgetaire/us-numero-libelle-contrat.md) | ⬜ |
| [US18.2.8 — Consulter la dernière modification budgétaire](FEATURES/gestion-budgetaire/us-consulter-derniere-modification-budgetaire.md) | ⬜ |
| **F18.3 — Gestion des jalons** | |
| [US18.3.1 — Piloter les jalons du cycle (J4–J7, PMPG)](FEATURES/gestion-jalons/us-piloter-jalons-cycle.md) | ⬜ |
| [US18.3.2 — Valider un jalon avec date de passage obligatoire](FEATURES/gestion-jalons/us-valider-jalon-date-passage.md) | ⬜ |
| [US18.3.3 — Gérer le jalon CEN](FEATURES/gestion-jalons/us-gerer-jalon-cen.md) | ⬜ |
| [US18.3.4 — Gérer le jalon J7 « Mise en Service (MES) »](FEATURES/gestion-jalons/us-gerer-jalon-j7-mes.md) | ⬜ |
| [US18.3.5 — Gérer le jalon J6 « Mise en Production (MEP) »](FEATURES/gestion-jalons/us-gerer-jalon-j6-mep.md) | ⬜ |
| [US18.3.6 — Filtrer / isoler un jalon dans la vue planning](FEATURES/gestion-jalons/us-filtrer-isoler-jalon-planning.md) | ⬜ |
| [US18.3.7 — Réinitialiser les champs de jalon (vue planning)](FEATURES/gestion-jalons/us-reinitialiser-champs-jalon.md) | ⬜ |
| [US18.3.8 — Accéder aux revues de sécurisation (Jalons B, C, D)](FEATURES/gestion-jalons/us-acceder-revues-securisation.md) | ⬜ |
| **F18.4 — Gestion des risques** | |
| [US18.4.1 — Gérer les principaux risques et parades](FEATURES/gestion-risques/us-gerer-risques-parades.md) | ⬜ |
| **F18.5 — Gestion de portefeuille** | |
| [US18.5.1 — Suivre un portefeuille d'activités](FEATURES/gestion-portefeuille/us-suivre-portefeuille-activites.md) | ⬜ |
| [US18.5.2 — Fiabiliser les noms de portefeuille](FEATURES/gestion-portefeuille/us-fiabiliser-noms-portefeuille.md) | ⬜ |
| [US18.5.3 — Améliorer la lisibilité de la liste des activités](FEATURES/gestion-portefeuille/us-lisibilite-liste-activites.md) | ⬜ |
| **F18.6 — Recherche & navigation** | |
| [US18.6.1 — Rechercher activités et portefeuilles](FEATURES/recherche-navigation/us-rechercher-activites-portefeuilles.md) | ⬜ |
| [US18.6.2 — Filtrer par produit associé](FEATURES/recherche-navigation/us-filtrer-par-produit-associe.md) | ⬜ |
| [US18.6.3 — Sécuriser la navigation](FEATURES/recherche-navigation/us-securiser-navigation.md) | ⬜ |
| **F18.7 — Référentiels & objets de gestion** | |
| [US18.7.1 — Mettre à jour les objets de gestion (OI, EOTP)](FEATURES/referentiels-objets-gestion/us-mettre-a-jour-objets-gestion.md) | ⬜ |
| [US18.7.2 — Mettre à jour les produits](FEATURES/referentiels-objets-gestion/us-mettre-a-jour-produits.md) | ⬜ |
| [US18.7.3 — Gérer les référentiels métiers](FEATURES/referentiels-objets-gestion/us-gerer-referentiels-metiers.md) | ⬜ |
| **F18.8 — Administration & habilitations** | |
| [US18.8.1 — Accéder au menu d'administration](FEATURES/administration-habilitations/us-acceder-menu-administration.md) | ⬜ |
| **F18.9 — Reporting & photos financières** | |
| [US18.9.1 — Consulter les photos financières](FEATURES/reporting-photos-financieres/us-consulter-photos-financieres.md) | ⬜ |
| [US18.9.2 — Accéder aux rapports Power BI](FEATURES/reporting-photos-financieres/us-acceder-rapports-power-bi.md) | ⬜ |
| [US18.9.3 — Suivre le financier de l'activité](FEATURES/reporting-photos-financieres/us-suivre-financier-activite.md) | ⬜ |
| **F18.10 — Intégrations & liens externes** | |
| [US18.10.1 — Accéder à l'application de suivi des modifications (logs)](FEATURES/integrations-liens-externes/us-acceder-application-suivi-modifications.md) | ⬜ |
| [US18.10.2 — Accéder aux guides & support](FEATURES/integrations-liens-externes/us-acceder-guides-support.md) | ⬜ |
| [US18.10.3 — Disposer de liens utiles intégrés](FEATURES/integrations-liens-externes/us-disposer-liens-utiles-integres.md) | ⬜ |
| **F18.11 — Ergonomie & qualité transverse** | |
| [US18.11.1 — Bénéficier de bulles d'aide harmonisées](FEATURES/ergonomie-qualite-transverse/us-bulles-aide-harmonisees.md) | ⬜ |
| [US18.11.2 — Être protégé contre la perte de saisie](FEATURES/ergonomie-qualite-transverse/us-protection-perte-saisie.md) | ⬜ |
| [US18.11.3 — Réinitialiser rapidement les champs de saisie](FEATURES/ergonomie-qualite-transverse/us-reinitialiser-champs-saisie.md) | ⬜ |
| **F18.12 — Portefeuilles d'activités — liste & gestion** | |
| [US18.12.1 — Affichage de la liste des portefeuilles](FEATURES/portefeuilles-liste-gestion/us-affichage-liste-portefeuilles.md) | ⬜ |
| [US18.12.2 — Modification d'un portefeuille existant](FEATURES/portefeuilles-liste-gestion/us-modification-portefeuille-existant.md) | ⬜ |
| [US18.12.3 — Suppression d'un portefeuille existant](FEATURES/portefeuilles-liste-gestion/us-suppression-portefeuille-existant.md) | ⬜ |
| [US18.12.4 — Sélection et affichage d'un portefeuille](FEATURES/portefeuilles-liste-gestion/us-selection-affichage-portefeuille.md) | ⬜ |
| [US18.12.5 — Recherche d'une activité dans un portefeuille](FEATURES/portefeuilles-liste-gestion/us-recherche-activite-dans-portefeuille.md) | ⬜ |
| [US18.12.6 — Création d'un nouveau portefeuille](FEATURES/portefeuilles-liste-gestion/us-creation-nouveau-portefeuille.md) | ⬜ |
| **F18.13 — Portefeuilles — filtres & création** | |
| [US18.13.1 — Utiliser les filtres pour créer un portefeuille](FEATURES/portefeuilles-filtres-creation/us-utiliser-filtres-creer-portefeuille.md) | ⬜ |
| [US18.13.2 — Réinitialisation des filtres](FEATURES/portefeuilles-filtres-creation/us-reinitialisation-filtres.md) | ⬜ |
| [US18.13.3 — Enregistrement d'un nouveau portefeuille](FEATURES/portefeuilles-filtres-creation/us-enregistrement-nouveau-portefeuille.md) | ⬜ |
| [US18.13.4 — Bouton Annuler](FEATURES/portefeuilles-filtres-creation/us-bouton-annuler-creation.md) | ⬜ |
| **F18.14 — Recherche d'activités** | |
| [US18.14.1 — Affichage de la liste des activités](FEATURES/recherche-activites/us-affichage-liste-activites.md) | ⬜ |
| [US18.14.2 — Recherche d'une activité](FEATURES/recherche-activites/us-recherche-activite.md) | ⬜ |
| [US18.14.3 — Réactualisation de la liste](FEATURES/recherche-activites/us-reactualisation-liste.md) | ⬜ |
| [US18.14.4 — Affichage des activités archivées](FEATURES/recherche-activites/us-affichage-activites-archivees.md) | ⬜ |
| **F18.15 — Création d'une activité** | |
| [US18.15.1 — Débuter la création d'une nouvelle activité](FEATURES/creation-activite/us-debuter-creation-activite.md) | ⬜ |
| [US18.15.2 — Règle de nommage à la création d'une activité](FEATURES/creation-activite/us-regle-nommage-activite.md) | ⬜ |
| [US18.15.3 — Historique des modifications (logs) des informations générales et structurelles](FEATURES/creation-activite/us-historique-modifications-logs.md) | ⬜ |
| [US18.15.4 — Affichage du dernier porteur de modification](FEATURES/creation-activite/us-affichage-dernier-porteur-modification.md) | ⬜ |
| [US18.15.5 — Afficher le créateur de l'activité](FEATURES/creation-activite/us-afficher-createur-activite.md) | ⬜ |
| [US18.15.6 — Header de l'activité](FEATURES/creation-activite/us-header-activite.md) | ⬜ |
| [US18.15.7 — Affichage d'une activité](FEATURES/creation-activite/us-affichage-activite.md) | ⬜ |
| [US18.15.8 — Suppression d'une activité](FEATURES/creation-activite/us-suppression-activite.md) | ⬜ |
| [US18.15.9 — Dupliquer une activité](FEATURES/creation-activite/us-dupliquer-activite.md) | ⬜ |
| [US18.15.10 — Message d'avertissement au changement d'écran/onglet sans enregistrement](FEATURES/creation-activite/us-avertissement-changement-ecran-sans-enregistrement.md) | ⬜ |
| **F18.16 — Activité — Informations générales** | |
| [US18.16.1 — Nom de l'activité](FEATURES/activite-informations-generales/us-nom-activite.md) | ⬜ |
| [US18.16.2 — Statut de l'activité](FEATURES/activite-informations-generales/us-statut-activite.md) | ⬜ |
| [US18.16.3 — Météo du projet](FEATURES/activite-informations-generales/us-meteo-projet.md) | ⬜ |
| [US18.16.4 — Description de l'activité](FEATURES/activite-informations-generales/us-description-activite.md) | ⬜ |
| [US18.16.5 — Derniers faits marquants](FEATURES/activite-informations-generales/us-derniers-faits-marquants.md) | ⬜ |
| [US18.16.6 — Projet à enjeux](FEATURES/activite-informations-generales/us-projet-a-enjeux.md) | ⬜ |
| [US18.16.7 — Gains estimés (k€)](FEATURES/activite-informations-generales/us-gains-estimes.md) | ⬜ |
| [US18.16.8 — Typologie Gains](FEATURES/activite-informations-generales/us-typologie-gains.md) | ⬜ |
| [US18.16.9 — Commentaires Gains](FEATURES/activite-informations-generales/us-commentaires-gains.md) | ⬜ |
| [US18.16.10 — Enregistrer informations générales](FEATURES/activite-informations-generales/us-enregistrer-informations-generales.md) | ⬜ |
| **F18.17 — Activité — Élaboration PMT (informations structurelles)** | |
| [US18.17.1 — Plan Moyen Terme (PMT)](FEATURES/activite-elaboration-pmt/us-plan-moyen-terme-pmt.md) | ⬜ |
| [US18.17.2 — Plan de production de l'année](FEATURES/activite-elaboration-pmt/us-plan-de-production-de-l-annee.md) | ⬜ |
| [US18.17.3 — Priorisation](FEATURES/activite-elaboration-pmt/us-priorisation.md) | ⬜ |
| [US18.17.4 — Macro Processus Métier concerné](FEATURES/activite-elaboration-pmt/us-macro-processus-metier-concerne.md) | ⬜ |
| [US18.17.5 — Présence schéma directeur](FEATURES/activite-elaboration-pmt/us-presence-schema-directeur.md) | ⬜ |
| [US18.17.6 — Commentaires schéma directeur](FEATURES/activite-elaboration-pmt/us-commentaires-schema-directeur.md) | ⬜ |
| [US18.17.7 — Pilote d'activité](FEATURES/activite-elaboration-pmt/us-pilote-d-activite.md) | ⬜ |
| [US18.17.8 — Produits associés](FEATURES/activite-elaboration-pmt/us-produits-associes.md) | ⬜ |
| [US18.17.9 — Propriétaire](FEATURES/activite-elaboration-pmt/us-proprietaire.md) | ⬜ |
| [US18.17.10 — Département / Programme / Mission](FEATURES/activite-elaboration-pmt/us-departement-programme-mission.md) | ⬜ |
| [US18.17.11 — Pôle / Usine](FEATURES/activite-elaboration-pmt/us-pole-usine.md) | ⬜ |
| [US18.17.12 — Domaine métier](FEATURES/activite-elaboration-pmt/us-domaine-metier.md) | ⬜ |
| [US18.17.13 — Sous-domaine métier](FEATURES/activite-elaboration-pmt/us-sous-domaine-metier.md) | ⬜ |
| [US18.17.14 — Sous-domaine métier (niveau 2)](FEATURES/activite-elaboration-pmt/us-sous-domaine-metier-niveau-2.md) | ⬜ |
| [US18.17.15 — Capacité métier](FEATURES/activite-elaboration-pmt/us-capacite-metier.md) | ⬜ |
| [US18.17.16 — Sous-capacité métier](FEATURES/activite-elaboration-pmt/us-sous-capacite-metier.md) | ⬜ |
| [US18.17.17 — Typologie principale de l'activité](FEATURES/activite-elaboration-pmt/us-typologie-principale-de-l-activite.md) | ⬜ |
| [US18.17.18 — Zone Activités liées](FEATURES/activite-elaboration-pmt/us-zone-activites-liees.md) | ⬜ |
| [US18.17.19 — Enregistrer informations structurelles](FEATURES/activite-elaboration-pmt/us-enregistrer-informations-structurelles.md) | ⬜ |
| **F18.18 — Activité — écran Budget** | |
| [US18.18.1 — Affichage de l'écran Budget](FEATURES/activite-ecran-budget/us-affichage-ecran-budget.md) | ⬜ |
| [US18.18.2 — Affichage de l'onglet PDS Pluriannuel](FEATURES/activite-ecran-budget/us-affichage-onglet-pds-pluriannuel.md) | ⬜ |
| [US18.18.3 — Affichage de l'onglet Élaboration PMT](FEATURES/activite-ecran-budget/us-affichage-onglet-elaboration-pmt.md) | ⬜ |
| [US18.18.4 — Tableau budgétaire (colonnes)](FEATURES/activite-ecran-budget/us-tableau-budgetaire-colonnes.md) | ⬜ |
| [US18.18.5 — Affichage de l'onglet Photo financière](FEATURES/activite-ecran-budget/us-affichage-onglet-photo-financiere.md) | ⬜ |
| [US18.18.6 — Liste déroulante de sélection des photos financières](FEATURES/activite-ecran-budget/us-liste-deroulante-selection-photos.md) | ⬜ |
| [US18.18.7 — Bouton de mise à jour des données des tableaux](FEATURES/activite-ecran-budget/us-bouton-mise-a-jour-donnees.md) | ⬜ |
| [US18.18.8 — Bouton Synthèse (afficher/rétracter toutes les lignes)](FEATURES/activite-ecran-budget/us-bouton-synthese.md) | ⬜ |
| [US18.18.9 — Barre de recherche](FEATURES/activite-ecran-budget/us-barre-de-recherche.md) | ⬜ |
| [US18.18.10 — Dupliquer une ligne budgétaire](FEATURES/activite-ecran-budget/us-dupliquer-ligne-budgetaire.md) | ⬜ |
| [US18.18.11 — Modifier une ligne budgétaire (onglet PDS Pluriannuel)](FEATURES/activite-ecran-budget/us-modifier-ligne-onglet-pds.md) | ⬜ |
| [US18.18.12 — Modifier une ligne budgétaire (onglets Élaboration PMT / Photos financières)](FEATURES/activite-ecran-budget/us-modifier-ligne-onglets-pmt-photos.md) | ⬜ |
| [US18.18.13 — Supprimer une ligne budgétaire](FEATURES/activite-ecran-budget/us-supprimer-ligne-budgetaire.md) | ⬜ |
| [US18.18.14 — Enregistrer (onglets PDS Pluriannuel et Élaboration PMT)](FEATURES/activite-ecran-budget/us-enregistrer-pds-elaboration-pmt.md) | ⬜ |
| [US18.18.15 — Bouton « + Ligne budgétaire » — création d'une nouvelle ligne](FEATURES/activite-ecran-budget/us-creation-nouvelle-ligne-budgetaire.md) | ⬜ |
| [US18.18.16 — Enregistrer — onglet Photo financière](FEATURES/activite-ecran-budget/us-enregistrer-onglet-photo-financiere.md) | ⬜ |
| [US18.18.17 — Historique des modifications (logs) — Budget](FEATURES/activite-ecran-budget/us-historique-modifications-logs-budget.md) | ⬜ |
| [US18.18.18 — Historique des modifications — onglets PDS / ELAB_PMT](FEATURES/activite-ecran-budget/us-historique-modifications-pds-elab-pmt.md) | ⬜ |
| [US18.18.19 — Comparaison des photos financières](FEATURES/activite-ecran-budget/us-comparaison-photos-financieres.md) | ⬜ |
| **F18.19 — Activité — écran Jalons** | |
| [US18.19.1 — Création de l'écran Jalon](FEATURES/activite-ecran-jalons/us-creation-ecran-jalon.md) | ⬜ |
| [US18.19.2 — Affichage et tri des jalons](FEATURES/activite-ecran-jalons/us-affichage-tri-jalons.md) | ⬜ |
| [US18.19.3 — Structure du bloc Jalon A](FEATURES/activite-ecran-jalons/us-structure-bloc-jalon-a.md) | ⬜ |
| [US18.19.4 — Structure du bloc Jalon B / C / D / ABC / BC](FEATURES/activite-ecran-jalons/us-structure-bloc-jalon-b-c-d.md) | ⬜ |
| [US18.19.5 — Structure des blocs jalons à date simple](FEATURES/activite-ecran-jalons/us-structure-bloc-jalon-date-simple.md) | ⬜ |
| [US18.19.6 — Structure du bloc Jalon CEN](FEATURES/activite-ecran-jalons/us-structure-bloc-jalon-cen.md) | ⬜ |
| [US18.19.7 — Structure du bloc J7 - Mise en Service (MES)](FEATURES/activite-ecran-jalons/us-structure-bloc-j7-mes.md) | ⬜ |
| [US18.19.8 — Structure du bloc J6 - Mise en Production (MEP)](FEATURES/activite-ecran-jalons/us-structure-bloc-j6-mep.md) | ⬜ |
| [US18.19.9 — Créer un jalon](FEATURES/activite-ecran-jalons/us-creer-un-jalon.md) | ⬜ |
| [US18.19.10 — Valider un jalon A / B / C / D](FEATURES/activite-ecran-jalons/us-valider-jalon-abcd.md) | ⬜ |
| [US18.19.11 — Modifier un jalon à la volée](FEATURES/activite-ecran-jalons/us-modifier-jalon-a-la-volee.md) | ⬜ |
| [US18.19.12 — Supprimer un jalon](FEATURES/activite-ecran-jalons/us-supprimer-un-jalon.md) | ⬜ |
| [US18.19.13 — Modifier un jalon grisé](FEATURES/activite-ecran-jalons/us-modifier-jalon-grise.md) | ⬜ |
| [US18.19.14 — Workflow des jalons](FEATURES/activite-ecran-jalons/us-workflow-des-jalons.md) | ⬜ |
| [US18.19.15 — Affichage des jalons (grisés)](FEATURES/activite-ecran-jalons/us-affichage-jalons-grises.md) | ⬜ |
| [US18.19.16 — Enregistrer l'écran Jalon](FEATURES/activite-ecran-jalons/us-enregistrer-ecran-jalon.md) | ⬜ |
| [US18.19.17 — Historique des modifications (logs) — Jalons](FEATURES/activite-ecran-jalons/us-historique-modifications-jalons.md) | ⬜ |
| **E18 — Enablers (socle technique du domaine)** | |
| [EN18.1 — Schéma Flyway `pilotage` + entités JPA](ENABLERS/en-schema-flyway-pilotage.md) | ⬜ |
| [EN18.2 — Guard Angular module pilotage](ENABLERS/en-guard-angular-pilotage.md) | ⬜ |
| [EN18.9 — Modèle Application → Projet](ENABLERS/en-modele-application-projet.md) | ⬜ |
| [EN18.10 — Profil d'organisation par défaut (couture / seam)](ENABLERS/en-profil-organisation-defaut.md) | ⬜ |
| [EN18.11 — Exposer les KPI du domaine (producteur KpiRef)](ENABLERS/en-exposer-kpi.md) | ⬜ |
| [EN18.12 — Retirer les jalons ABC/BC de la création](ENABLERS/en-retirer-jalons-abc-bc-creation.md) | ⬜ |
| [EN18.13 — Renommage du champ « Bénéficiaire (MOA) »](ENABLERS/en-renommage-champ-beneficiaire-moa.md) | ⬜ |
| [EN18.14 — Gestion des habilitations par groupe AD](ENABLERS/en-habilitations-groupe-ad.md) | ⬜ |
| [EN18.15 — Corriger les données « fantômes »](ENABLERS/en-corriger-donnees-fantomes.md) | ⬜ |
| [EN18.16 — Anonymiser les environnements hors production](ENABLERS/en-anonymiser-environnements-hors-production.md) | ⬜ |
| [EN18.17 — Optimiser le lancement de l'application](ENABLERS/en-optimiser-lancement-application.md) | ⬜ |
| [EN18.18 — Performance, stabilité et sécurité (NFR transverse)](ENABLERS/en-performance-stabilite-securite.md) | ⬜ |
| [EN18.19 — Canaux de retours utilisateurs](ENABLERS/en-canaux-retours-utilisateurs.md) | ⬜ |

## Dépendances

- Dépend de : **E17** Infrastructure multi-repo (pré-requis pivot-core-starter + @pivot/ui-core)
- Socle données : **EN18.1** (schéma Flyway `pilotage` + entités JPA) · **EN18.9** (modèle
  Application → Projet) précèdent toute Feature fonctionnelle.
- Module connexe : **E25** Achats & Contrats (même domaine `pilotage`, écrans WRAP/OPDN).
- Interfaces domaine : E22 Roadmap (jalons/planning), E23 Portefeuille, E26 Budget, E21 Risques —
  via bus PIVOT + deep-links (ADR-006/008). Le recouvrement fonctionnel avec ces modules est
  documenté ; l'arbitrage fusion/interface sera tranché au Gate 1.

## Statut global

⬜ Backlog — périmètre fonctionnel OPPA/OPDN importé le 2026-07-13, Gate 1 PO Agent à effectuer au
démarrage du sprint. Enablers de socle EN18.1/2/9/10/11 : Sprint 9 (Gate 1 passé).
