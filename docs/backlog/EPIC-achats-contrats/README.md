# E25 — Achats & Contrats (Commande publique)

> **Nouvel EPIC (2026-07-13).** Importe le module **Demandes d'achats (DA)** et **Contrats** de
> l'application interne **WRAP / OPDN** (spécification SPEC_OPDN). Rattaché au **domaine Pilotage**
> (schéma `pilotage`), mais isolé dans son propre EPIC car il relève d'un métier distinct
> (achats / commande publique) avec son propre workflow de validation et son modèle de rôles
> P / V / CM / A.

## Objectif

Outiller le cycle complet d'une **demande d'achat** (création en brouillon → workflow de validation
multi-étapes → validation dans PGI/MyPGI) et la **gestion des contrats** (référentiel fournisseurs,
Contract Managers, contrôle CM, segments d'achat), avec une administration de la hiérarchie
**Direction / Division / Unité** et des habilitations dérivées de l'AD Microsoft.

## Rôles

| Code | Rôle métier | Token taxonomie |
|------|-------------|-----------------|
| **P** | Prescripteur (crée les DA) | `acheteur-informatique` |
| **V** | Vérificateur / Valideur | `responsable-des-marches` |
| **CM** | Contract Manager | `contract-manager` |
| **A** | Administrateur | `administrateur-plateforme` |

La matrice d'accès P/V/CM/A de chaque écran (SPEC_OPDN) est reprise dans le critère
`Security/Gouvernance` de chaque US.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage` partagé du domaine, entités DA /
  Contrat / Fournisseur / Workflow / Rôles / Structure)
- Frontend : **`pivot-pilotage-ui`** (module `achats-contrats`, consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration « Socle terminé » par le mainteneur.

## Origine

Importé de **SPEC_OPDN** (spécification fonctionnelle Word, EDF — module DA/Contrats de
l'application WRAP/OPDN). Une **US par bloc de spécification** (écrans B.1 à B.7). Chaque US porte
sa section source dans le champ `Source:`. Critères d'acceptation **à affiner au Gate 1 PO Agent**
(règles de gestion, messages exacts et matrices de rôles repris fidèlement de la source).

> **Intégrations clés** (portées par les enablers EN25.x) : PGI / MyPGI (consultation & validation
> par mandant, 3e chiffre du n° de DA), export CSV des contrats, notifications e-mail (unitaire,
> récapitulatif 17h, validation finale), habilitations par rattachement AD.

## Périmètre GitHub (phase-3)

### F25.1 — Navigation générale & accès
- US25.1.1 : Accès à l'application
- US25.1.2 : Page d'accueil par défaut
- US25.1.3 : Bouton roue crantée (accès au profil)
- US25.1.4 : Onglet « Demandes d'achats »
- US25.1.5 : Onglet « Contrats »
- US25.1.6 : Onglet « Administration »
- US25.1.7 : Onglet « Power BI »
- US25.1.8 : Visualisation de Flash Info
- US25.1.9 : Mentions légales et numéro de version

### F25.2 — Profil utilisateur & rattachement
- US25.2.1 : Consulter son rattachement Direction/division/unité
- US25.2.2 : Définir son organisation
- US25.2.3 : Recevoir un mail récapitulatif par jour
- US25.2.4 : Recevoir des mails de notifications en tant que suppléant
- US25.2.5 : Recevoir des mails de validation finale en tant que prescripteur

### F25.3 — Demandes d'achats — écran d'accueil
- US25.3.1 : Création d'une demande d'achat
- US25.3.2 : Enregistrement d'une demande d'achat
- US25.3.3 : Suppression d'une demande d'achat
- US25.3.4 : Modification d'une demande d'achat
- US25.3.5 : Validation d'une demande d'achat
- US25.3.6 : Refus de la demande d'achat
- US25.3.7 : Onglet « Mes demandes »
- US25.3.8 : Onglet « Demandes à valider »
- US25.3.9 : Onglet « Demandes à valider - suppléant »
- US25.3.10 : Onglet « Historique de mes actions »
- US25.3.11 : Onglet « Toutes les demandes »
- US25.3.12 : Barre de recherche
- US25.3.13 : Rafraîchissement des informations
- US25.3.14 : Filtrage des données
- US25.3.15 : Statut « Brouillon »
- US25.3.16 : Statut « En cours »
- US25.3.17 : Import de demandes d'achats

### F25.4 — Demandes d'achats — écran de la demande
- US25.4.1 : Entrer le numéro de la DA
- US25.4.2 : Consulter dans MyPGI
- US25.4.3 : Unité
- US25.4.4 : Organisation
- US25.4.5 : Type d'achats
- US25.4.6 : Finalité métier
- US25.4.7 : Résumé de la demande
- US25.4.8 : Début de prestation
- US25.4.9 : Fin de prestation
- US25.4.10 : Montant de la demande (€)
- US25.4.11 : Avenant contrat/commande
- US25.4.12 : Montant total avenant compris (€)
- US25.4.13 : Contrat
- US25.4.14 : Acte de sous-traitance
- US25.4.15 : Projet
- US25.4.16 : Lien vers pièces-jointes
- US25.4.17 : Commentaires
- US25.4.18 : Modifier/supprimer une DA au statut « Traitée » (action administrateur)
- US25.4.19 : Historique
- US25.4.20 : Prévisualisation du Workflow
- US25.4.21 : Enregistrer
- US25.4.22 : Lancer le workflow
- US25.4.23 : Modifier (DA en cours de workflow)
- US25.4.24 : Approuver
- US25.4.25 : Bouton « Valider dans My PGI »
- US25.4.26 : Refuser

### F25.5 — Contrats — écran d'accueil
- US25.5.1 : Création d'un contrat
- US25.5.2 : Enregistrement d'un contrat
- US25.5.3 : Suppression d'un contrat
- US25.5.4 : Modification d'un contrat
- US25.5.5 : Visualisation d'un contrat
- US25.5.6 : Barre de recherche
- US25.5.7 : Rafraîchissement des informations
- US25.5.8 : Filtrage des données
- US25.5.9 : Export des données
- US25.5.10 : Statut « Actif »/« Inactif »
- US25.5.11 : Coches pour la sélection multiple de contrats
- US25.5.12 : Modification des contrats en masse

### F25.6 — Contrats — écran des contrats
- US25.6.1 : Texte de dernière modification
- US25.6.2 : Numéro de contrat
- US25.6.3 : Fournisseur
- US25.6.4 : Libellé
- US25.6.5 : Direction
- US25.6.6 : Division
- US25.6.7 : Unité
- US25.6.8 : Contrat actif
- US25.6.9 : Contrôle CM
- US25.6.10 : Segment d'achat
- US25.6.11 : Type de contrat
- US25.6.12 : Résumé du contrat
- US25.6.13 : Date de début
- US25.6.14 : Date de fin validité PGI
- US25.6.15 : Informations complémentaires
- US25.6.16 : Liens
- US25.6.17 : Affectation des rôles

### F25.7 — Administration (Direction/Division/Unité)
- US25.7.1 : Onglet « Direction »
- US25.7.2 : Onglet « Division »
- US25.7.3 : Onglet « Unité »

### E25 — Enablers (socle technique du module)
- EN25.1 : Schéma de données Achats/Contrats
- EN25.2 : Guard Angular du module achats-contrats
- EN25.3 : Habilitations par rattachement AD & rôles workflow
- EN25.4 : Intégration PGI / MyPGI
- EN25.5 : Notifications e-mail

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F25.1 — Navigation générale & accès** | |
| [US25.1.1 — Accès à l'application](FEATURES/navigation-acces/us-acces-a-l-application.md) | ⬜ |
| [US25.1.2 — Page d'accueil par défaut](FEATURES/navigation-acces/us-page-d-accueil-par-defaut.md) | ⬜ |
| [US25.1.3 — Bouton roue crantée (accès au profil)](FEATURES/navigation-acces/us-bouton-roue-crantee-profil.md) | ⬜ |
| [US25.1.4 — Onglet « Demandes d'achats »](FEATURES/navigation-acces/us-onglet-demandes-d-achats.md) | ⬜ |
| [US25.1.5 — Onglet « Contrats »](FEATURES/navigation-acces/us-onglet-contrats.md) | ⬜ |
| [US25.1.6 — Onglet « Administration »](FEATURES/navigation-acces/us-onglet-administration.md) | ⬜ |
| [US25.1.7 — Onglet « Power BI »](FEATURES/navigation-acces/us-onglet-power-bi.md) | ⬜ |
| [US25.1.8 — Visualisation de Flash Info](FEATURES/navigation-acces/us-visualisation-de-flash-info.md) | ⬜ |
| [US25.1.9 — Mentions légales et numéro de version](FEATURES/navigation-acces/us-mentions-legales-et-numero-de-version.md) | ⬜ |
| **F25.2 — Profil utilisateur & rattachement** | |
| [US25.2.1 — Consulter son rattachement Direction/division/unité](FEATURES/profil-rattachement/us-consulter-son-rattachement.md) | ⬜ |
| [US25.2.2 — Définir son organisation](FEATURES/profil-rattachement/us-definir-son-organisation.md) | ⬜ |
| [US25.2.3 — Recevoir un mail récapitulatif par jour](FEATURES/profil-rattachement/us-recevoir-un-mail-recapitulatif-par-jour.md) | ⬜ |
| [US25.2.4 — Recevoir des mails de notifications en tant que suppléant](FEATURES/profil-rattachement/us-recevoir-des-mails-de-notifications-suppleant.md) | ⬜ |
| [US25.2.5 — Recevoir des mails de validation finale en tant que prescripteur](FEATURES/profil-rattachement/us-recevoir-des-mails-de-validation-finale-prescripteur.md) | ⬜ |
| **F25.3 — Demandes d'achats — écran d'accueil** | |
| [US25.3.1 — Création d'une demande d'achat](FEATURES/da-ecran-accueil/us-creation-d-une-da.md) | ⬜ |
| [US25.3.2 — Enregistrement d'une demande d'achat](FEATURES/da-ecran-accueil/us-enregistrement-d-une-da.md) | ⬜ |
| [US25.3.3 — Suppression d'une demande d'achat](FEATURES/da-ecran-accueil/us-suppression-d-une-da.md) | ⬜ |
| [US25.3.4 — Modification d'une demande d'achat](FEATURES/da-ecran-accueil/us-modification-d-une-da.md) | ⬜ |
| [US25.3.5 — Validation d'une demande d'achat](FEATURES/da-ecran-accueil/us-validation-d-une-da.md) | ⬜ |
| [US25.3.6 — Refus de la demande d'achat](FEATURES/da-ecran-accueil/us-refus-de-la-da.md) | ⬜ |
| [US25.3.7 — Onglet « Mes demandes »](FEATURES/da-ecran-accueil/us-onglet-mes-demandes.md) | ⬜ |
| [US25.3.8 — Onglet « Demandes à valider »](FEATURES/da-ecran-accueil/us-onglet-demandes-a-valider.md) | ⬜ |
| [US25.3.9 — Onglet « Demandes à valider - suppléant »](FEATURES/da-ecran-accueil/us-onglet-demandes-a-valider-suppleant.md) | ⬜ |
| [US25.3.10 — Onglet « Historique de mes actions »](FEATURES/da-ecran-accueil/us-onglet-historique-de-mes-actions.md) | ⬜ |
| [US25.3.11 — Onglet « Toutes les demandes »](FEATURES/da-ecran-accueil/us-onglet-toutes-les-demandes.md) | ⬜ |
| [US25.3.12 — Barre de recherche](FEATURES/da-ecran-accueil/us-barre-de-recherche.md) | ⬜ |
| [US25.3.13 — Rafraîchissement des informations](FEATURES/da-ecran-accueil/us-rafraichissement-des-informations.md) | ⬜ |
| [US25.3.14 — Filtrage des données](FEATURES/da-ecran-accueil/us-filtrage-des-donnees.md) | ⬜ |
| [US25.3.15 — Statut « Brouillon »](FEATURES/da-ecran-accueil/us-statut-brouillon.md) | ⬜ |
| [US25.3.16 — Statut « En cours »](FEATURES/da-ecran-accueil/us-statut-en-cours.md) | ⬜ |
| [US25.3.17 — Import de demandes d'achats](FEATURES/da-ecran-accueil/us-import-de-demandes-d-achats.md) | ⬜ |
| **F25.4 — Demandes d'achats — écran de la demande** | |
| [US25.4.1 — Entrer le numéro de la DA](FEATURES/da-ecran-demande/us-numero-de-la-da.md) | ⬜ |
| [US25.4.2 — Consulter dans MyPGI](FEATURES/da-ecran-demande/us-consulter-dans-mypgi.md) | ⬜ |
| [US25.4.3 — Unité](FEATURES/da-ecran-demande/us-unite.md) | ⬜ |
| [US25.4.4 — Organisation](FEATURES/da-ecran-demande/us-organisation.md) | ⬜ |
| [US25.4.5 — Type d'achats](FEATURES/da-ecran-demande/us-type-d-achats.md) | ⬜ |
| [US25.4.6 — Finalité métier](FEATURES/da-ecran-demande/us-finalite-metier.md) | ⬜ |
| [US25.4.7 — Résumé de la demande](FEATURES/da-ecran-demande/us-resume-de-la-demande.md) | ⬜ |
| [US25.4.8 — Début de prestation](FEATURES/da-ecran-demande/us-debut-de-prestation.md) | ⬜ |
| [US25.4.9 — Fin de prestation](FEATURES/da-ecran-demande/us-fin-de-prestation.md) | ⬜ |
| [US25.4.10 — Montant de la demande (€)](FEATURES/da-ecran-demande/us-montant-de-la-demande.md) | ⬜ |
| [US25.4.11 — Avenant contrat/commande](FEATURES/da-ecran-demande/us-avenant-contrat-commande.md) | ⬜ |
| [US25.4.12 — Montant total avenant compris (€)](FEATURES/da-ecran-demande/us-montant-total-avenant-compris.md) | ⬜ |
| [US25.4.13 — Contrat](FEATURES/da-ecran-demande/us-contrat.md) | ⬜ |
| [US25.4.14 — Acte de sous-traitance](FEATURES/da-ecran-demande/us-acte-de-sous-traitance.md) | ⬜ |
| [US25.4.15 — Projet](FEATURES/da-ecran-demande/us-projet.md) | ⬜ |
| [US25.4.16 — Lien vers pièces-jointes](FEATURES/da-ecran-demande/us-lien-vers-pieces-jointes.md) | ⬜ |
| [US25.4.17 — Commentaires](FEATURES/da-ecran-demande/us-commentaires.md) | ⬜ |
| [US25.4.18 — Modifier/supprimer une DA au statut « Traitée » (action administrateur)](FEATURES/da-ecran-demande/us-modifier-supprimer-da-traitee.md) | ⬜ |
| [US25.4.19 — Historique](FEATURES/da-ecran-demande/us-historique.md) | ⬜ |
| [US25.4.20 — Prévisualisation du Workflow](FEATURES/da-ecran-demande/us-previsualisation-du-workflow.md) | ⬜ |
| [US25.4.21 — Enregistrer](FEATURES/da-ecran-demande/us-enregistrer.md) | ⬜ |
| [US25.4.22 — Lancer le workflow](FEATURES/da-ecran-demande/us-lancer-le-workflow.md) | ⬜ |
| [US25.4.23 — Modifier (DA en cours de workflow)](FEATURES/da-ecran-demande/us-modifier-da-en-cours.md) | ⬜ |
| [US25.4.24 — Approuver](FEATURES/da-ecran-demande/us-approuver.md) | ⬜ |
| [US25.4.25 — Bouton « Valider dans My PGI »](FEATURES/da-ecran-demande/us-valider-dans-my-pgi.md) | ⬜ |
| [US25.4.26 — Refuser](FEATURES/da-ecran-demande/us-refuser.md) | ⬜ |
| **F25.5 — Contrats — écran d'accueil** | |
| [US25.5.1 — Création d'un contrat](FEATURES/contrats-ecran-accueil/us-creation-d-un-contrat.md) | ⬜ |
| [US25.5.2 — Enregistrement d'un contrat](FEATURES/contrats-ecran-accueil/us-enregistrement-d-un-contrat.md) | ⬜ |
| [US25.5.3 — Suppression d'un contrat](FEATURES/contrats-ecran-accueil/us-suppression-d-un-contrat.md) | ⬜ |
| [US25.5.4 — Modification d'un contrat](FEATURES/contrats-ecran-accueil/us-modification-d-un-contrat.md) | ⬜ |
| [US25.5.5 — Visualisation d'un contrat](FEATURES/contrats-ecran-accueil/us-visualisation-d-un-contrat.md) | ⬜ |
| [US25.5.6 — Barre de recherche](FEATURES/contrats-ecran-accueil/us-barre-de-recherche.md) | ⬜ |
| [US25.5.7 — Rafraîchissement des informations](FEATURES/contrats-ecran-accueil/us-rafraichissement-des-informations.md) | ⬜ |
| [US25.5.8 — Filtrage des données](FEATURES/contrats-ecran-accueil/us-filtrage-des-donnees.md) | ⬜ |
| [US25.5.9 — Export des données](FEATURES/contrats-ecran-accueil/us-export-des-donnees.md) | ⬜ |
| [US25.5.10 — Statut « Actif »/« Inactif »](FEATURES/contrats-ecran-accueil/us-statut-actif-inactif.md) | ⬜ |
| [US25.5.11 — Coches pour la sélection multiple de contrats](FEATURES/contrats-ecran-accueil/us-coches-selection-multiple-de-contrats.md) | ⬜ |
| [US25.5.12 — Modification des contrats en masse](FEATURES/contrats-ecran-accueil/us-modification-des-contrats-en-masse.md) | ⬜ |
| **F25.6 — Contrats — écran des contrats** | |
| [US25.6.1 — Texte de dernière modification](FEATURES/contrats-ecran-contrats/us-texte-derniere-modification.md) | ⬜ |
| [US25.6.2 — Numéro de contrat](FEATURES/contrats-ecran-contrats/us-numero-de-contrat.md) | ⬜ |
| [US25.6.3 — Fournisseur](FEATURES/contrats-ecran-contrats/us-fournisseur.md) | ⬜ |
| [US25.6.4 — Libellé](FEATURES/contrats-ecran-contrats/us-libelle.md) | ⬜ |
| [US25.6.5 — Direction](FEATURES/contrats-ecran-contrats/us-direction.md) | ⬜ |
| [US25.6.6 — Division](FEATURES/contrats-ecran-contrats/us-division.md) | ⬜ |
| [US25.6.7 — Unité](FEATURES/contrats-ecran-contrats/us-unite.md) | ⬜ |
| [US25.6.8 — Contrat actif](FEATURES/contrats-ecran-contrats/us-contrat-actif.md) | ⬜ |
| [US25.6.9 — Contrôle CM](FEATURES/contrats-ecran-contrats/us-controle-cm.md) | ⬜ |
| [US25.6.10 — Segment d'achat](FEATURES/contrats-ecran-contrats/us-segment-d-achat.md) | ⬜ |
| [US25.6.11 — Type de contrat](FEATURES/contrats-ecran-contrats/us-type-de-contrat.md) | ⬜ |
| [US25.6.12 — Résumé du contrat](FEATURES/contrats-ecran-contrats/us-resume-du-contrat.md) | ⬜ |
| [US25.6.13 — Date de début](FEATURES/contrats-ecran-contrats/us-date-de-debut.md) | ⬜ |
| [US25.6.14 — Date de fin validité PGI](FEATURES/contrats-ecran-contrats/us-date-de-fin-validite-pgi.md) | ⬜ |
| [US25.6.15 — Informations complémentaires](FEATURES/contrats-ecran-contrats/us-informations-complementaires.md) | ⬜ |
| [US25.6.16 — Liens](FEATURES/contrats-ecran-contrats/us-liens.md) | ⬜ |
| [US25.6.17 — Affectation des rôles](FEATURES/contrats-ecran-contrats/us-affectation-des-roles.md) | ⬜ |
| **F25.7 — Administration (Direction/Division/Unité)** | |
| [US25.7.1 — Onglet « Direction »](FEATURES/administration/us-onglet-direction.md) | ⬜ |
| [US25.7.2 — Onglet « Division »](FEATURES/administration/us-onglet-division.md) | ⬜ |
| [US25.7.3 — Onglet « Unité »](FEATURES/administration/us-onglet-unite.md) | ⬜ |
| **E25 — Enablers (socle technique du module)** | |
| [EN25.1 — Schéma de données Achats/Contrats](ENABLERS/en-schema-de-donnees-achats-contrats.md) | ⬜ |
| [EN25.2 — Guard Angular du module achats-contrats](ENABLERS/en-guard-angular-module-achats-contrats.md) | ⬜ |
| [EN25.3 — Habilitations par rattachement AD & rôles workflow](ENABLERS/en-habilitations-par-rattachement-ad-et-roles-workflow.md) | ⬜ |
| [EN25.4 — Intégration PGI / MyPGI](ENABLERS/en-integration-pgi-mypgi.md) | ⬜ |
| [EN25.5 — Notifications e-mail](ENABLERS/en-notifications-e-mail.md) | ⬜ |

## Dépendances

- Dépend de : **E17** Infrastructure multi-repo · **E18** Domaine Pilotage (schéma `pilotage`,
  socle EN18.1/EN18.9).
- Enablers propres : **EN25.1** schéma de données Achats/Contrats · **EN25.2** guard Angular ·
  **EN25.3** habilitations AD & rôles workflow · **EN25.4** intégration PGI/MyPGI · **EN25.5**
  notifications e-mail.
- Réutilise le pattern d'authentification LDAP/AD externe (cf. E38 §F38.16, « pattern LDAP externe
  réutilisé »).

## Statut global

⬜ Backlog — module DA/Contrats (SPEC_OPDN) importé le 2026-07-13, Gate 1 PO Agent à effectuer au
démarrage du sprint.
