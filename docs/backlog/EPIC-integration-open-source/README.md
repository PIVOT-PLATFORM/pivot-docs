# E28 — Intégration open source

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.17).*

## Objectif

Construire le socle qui permet à PIVOT d'intégrer des outils open source matures via adaptateurs, en complément des modules natifs. Voir [ADR-009](pathname:///pivot-docs/adr/ADR-009-cadre-integration-open-source) pour le cadre complet (quatre modes, critère adaptateur/natif, règle de licences, contrat à six capacités). **Chaque domaine fonctionnel peut accueillir plusieurs adaptateurs candidats — natif et/ou un ou plusieurs outils OSS — et c'est chaque instanciation qui choisit, dans son portail, quel(s) outil(s) activer** (ADR-009).

## Phase

⏸️ **phase-3** — dépend de l'acceptation d'ADR-009 (statut : Proposé) par les mainteneurs.

## Périmètre GitHub (phase-3)

### Enablers — socle

- **EN28.1** — [Portail catalogue](ENABLERS/en-portail-catalogue.md)
- **EN28.2** — [Catalogue d'entités étendu](ENABLERS/en-catalogue-entites-etendu.md)
- **EN28.3** — [Contrat d'intégration PivotAdapter](ENABLERS/en-contrat-pivotadapter.md)
- **EN28.4** — [Bus d'événements](ENABLERS/en-bus-evenements.md)
- **EN28.5** — [Design-system et thème pour adaptateurs](ENABLERS/en-design-system-adaptateurs.md)
- **EN28.6** — [Endpoint santé unifié](ENABLERS/en-endpoint-sante-unifie.md)
- **EN28.7** — [Critère de décision adaptateur vs natif](ENABLERS/en-critere-adaptateur-vs-natif.md)
- *(pas d'EN28.8 : l'ancienne veille Excalidraw est remplacée par un adaptateur réel, cf. F28.9)*

### Enablers — gouvernance

- **EN28.9** — [ADR-009 : règle de licences amont/aval](ENABLERS/en-adr-009-licences-amont-aval.md)
- **EN28.10** — [ADR-011 : modèle d'entités](ENABLERS/en-adr-011-modele-entites.md)
- **EN28.11** — [ADR-012 : stratégie de forks](ENABLERS/en-adr-012-strategie-forks.md)
- **EN28.12** — [Intendance upstream](ENABLERS/en-intendance-upstream.md)
- **EN28.13** — [Veille licences & versions](ENABLERS/en-veille-licences-versions.md)

### Features

- **F28.1 — Delivery agile**
  - [US28.1.1 — Adaptateur Plane, backlog & sprints](FEATURES/delivery-agile-plane/us-adaptateur-plane-backlog-sprints.md)
  - [US28.1.2 — SSO Plane](FEATURES/delivery-agile-plane/us-sso-plane.md)
  - [US28.1.3 — Événement tâche terminée](FEATURES/delivery-agile-plane/us-evenement-tache-terminee.md)
  - [US28.1.4 — Board agile embarqué](FEATURES/delivery-agile-plane/us-board-agile-embarque.md)
  - [US28.1.5 — Adaptateur Taiga (alternative)](FEATURES/delivery-agile-plane/us-adaptateur-taiga.md)
- **F28.2 — Collaboration visuelle et documentaire**
  - [US28.2.1 — Tableau blanc comme entité Document](FEATURES/collaboration-visuelle-documentaire/us-tableau-blanc-entite-document.md)
  - [US28.2.2 — Documents collaboratifs (Docs / La Suite numérique)](FEATURES/collaboration-visuelle-documentaire/us-documents-collaboratifs.md)
  - [US28.2.3 — Base de données no-code (Baserow)](FEATURES/collaboration-visuelle-documentaire/us-base-donnees-no-code.md)
  - [US28.2.4 — Base de connaissances (BookStack)](FEATURES/collaboration-visuelle-documentaire/us-base-connaissances-wiki.md)
  - [US28.2.5 — Adaptateur Nextcloud (alternative documents)](FEATURES/collaboration-visuelle-documentaire/us-adaptateur-nextcloud.md)
  - [US28.2.6 — Adaptateur NocoDB (alternative no-code)](FEATURES/collaboration-visuelle-documentaire/us-adaptateur-nocodb.md)
- **F28.3 — Workflows & automatisation**
  - [US28.3.1 — Adaptateur n8n](FEATURES/workflows-automatisation/us-adaptateur-n8n.md)
  - [US28.3.2 — SSO n8n](FEATURES/workflows-automatisation/us-sso-n8n.md)
  - [US28.3.3 — Événements d'exécution](FEATURES/workflows-automatisation/us-evenements-execution.md)
  - [US28.3.4 — Orchestration data (Kestra)](FEATURES/workflows-automatisation/us-orchestration-data-kestra.md)
  - [US28.3.5 — Adaptateur Activepieces (alternative)](FEATURES/workflows-automatisation/us-adaptateur-activepieces.md)
  - [US28.3.6 — Adaptateur Apache Airflow (alternative)](FEATURES/workflows-automatisation/us-adaptateur-airflow.md)
- **F28.4 — Mesure (BI & analytics)**
  - [US28.4.1 — Tableaux de bord Metabase](FEATURES/mesure-bi-analytics/us-tableaux-bord-metabase.md)
  - [US28.4.2 — Analytics d'usage Matomo](FEATURES/mesure-bi-analytics/us-analytics-usage-matomo.md)
  - [US28.4.3 — Adaptateur Apache Superset (alternative BI)](FEATURES/mesure-bi-analytics/us-adaptateur-superset.md)
  - [US28.4.4 — Lien Plausible (alternative analytics)](FEATURES/mesure-bi-analytics/us-lien-plausible.md)
- **F28.5 — Contrats & communication**
  - [US28.5.1 — Signature électronique (Documenso)](FEATURES/contrats-communication/us-signature-electronique-documenso.md)
  - [US28.5.2 — CLM natif](FEATURES/contrats-communication/us-clm-natif.md)
  - [US28.5.3 — Messagerie souveraine (Element/Matrix)](FEATURES/contrats-communication/us-messagerie-souveraine.md)
  - [US28.5.4 — Adaptateur Docuseal (alternative signature)](FEATURES/contrats-communication/us-adaptateur-docuseal.md)
  - [US28.5.5 — Lien Rocket.Chat (alternative messagerie)](FEATURES/contrats-communication/us-lien-rocket-chat.md)
- **F28.6 — Pilotage de portefeuille (PPM)** *(coexiste avec le natif — cf. principe ci-dessus)*
  - [US28.6.1 — Adaptateur OpenProject](FEATURES/pilotage-portefeuille/us-adaptateur-openproject.md)
  - [US28.6.2 — Adaptateur ProjeQtOr (alternative souveraine)](FEATURES/pilotage-portefeuille/us-adaptateur-projeqtor.md)
- **F28.7 — Rétrospectives** *(coexiste avec le natif E20)*
  - [US28.7.1 — Lien Scrumlr](FEATURES/retrospectives/us-lien-scrumlr.md)
- **F28.8 — Formulaires & sondages** *(coexiste avec le natif E19/E42)*
  - [US28.8.1 — Adaptateur Formbricks](FEATURES/formulaires-sondages/us-adaptateur-formbricks.md)
  - [US28.8.2 — Adaptateur LimeSurvey (alternative)](FEATURES/formulaires-sondages/us-adaptateur-limesurvey.md)
- **F28.9 — Whiteboard (adaptateur)** *(coexiste avec le natif E08)*
  - [US28.9.1 — Adaptateur Excalidraw (embed)](FEATURES/whiteboard-adaptateur/us-adaptateur-excalidraw.md)
  - [US28.9.2 — Adaptateur tldraw (embed, alternative)](FEATURES/whiteboard-adaptateur/us-adaptateur-tldraw.md)
- **F28.10 — SCM & CI/CD** *(domaine absent du backlog initial, ajouté lors de la revue PO — cf. ADR-009 §5)*
  - [US28.10.1 — Adaptateur GitLab CE](FEATURES/scm-cicd/us-adaptateur-gitlab-ce.md)
  - [US28.10.2 — Adaptateur Forgejo (alternative souveraine)](FEATURES/scm-cicd/us-adaptateur-forgejo.md)

## Principe : natif et OSS coexistent, l'instanciation choisit

Le critère adaptateur-vs-natif (ADR-009 §2) porte sur la décision de *construire* un adaptateur (faisabilité technique + coût), **pas** sur l'exclusion d'un adaptateur au seul motif qu'un module natif existe déjà pour le même besoin. F28.6 à F28.9 concrétisent ce principe : OpenProject/ProjeQtOr coexistent avec le Pilotage natif (E18), Scrumlr avec Rétrospective (E20), Formbricks/LimeSurvey avec Session/Pivot Forms (E19/E42), Excalidraw/tldraw avec le Whiteboard natif (E08). Aucune exclusion mutuelle : chaque instance active ce dont elle a besoin.

## Hors périmètre

Restent hors de cet EPIC, pour des raisons **distinctes** du principe ci-dessus (pas un doublon avec du natif, mais un choix d'un autre ordre) :

| Retiré | Raison |
|---|---|
| Fournisseur d'identité SSO (Keycloak, alternative Zitadel), modèle de rôles | Choix fondationnel d'IdP de toute la plateforme (ADR-004), pas un adaptateur de domaine métier — reste dans [E01 — Auth & IAM](../EPIC-auth-iam/README.md) |
| Gestion des secrets (OpenBao), distribution déployable (Coolify, alternative Dokku) | Choix d'infrastructure fondationnels, pas des adaptateurs métier — restent dans [E07 — Infrastructure & Déploiement](../EPIC-infrastructure/README.md) |
| Planning poker | Aucune alternative OSS mature identifiée (« vide côté OSS ») — reste [E09 — Module Scrum Poker](../EPIC-scrum-poker/README.md) natif |
| Wiki Outline (alternative à BookStack) | Licence BSL non-OSI — ne remplit pas le critère « open source » du cadre ADR-009 ; BookStack (Lien, MIT) reste la solution retenue pour ce domaine |

## Dépendances

- Dépend de : [ADR-009](pathname:///pivot-docs/adr/ADR-009-cadre-integration-open-source) (statut Proposé — ce backlog ne démarre pas avant acceptation)
- Dépend de : E03 Système de modules (EN03.1 PivotModule interface — un adaptateur s'active/désactive comme un module natif)
- Dépend de : E17 Infrastructure multi-repo (si les adaptateurs sont un jour extraits en repos dédiés)
- Interface avec : E08 Whiteboard, E09 Scrum Poker, E18 Pilotage, E19 Session, E20 Retrospective, E42 Pivot Forms (coexistence natif/OSS, F28.6–F28.9)
- Interface avec : [E43 — Sécurité & Zero Trust](pathname:///pivot-docs/backlog/EPIC-securite/) (checklist d'admission EN43.13 étend EN28.3 ; EN43.11 souveraineté consommée par EN28.2 ; EN43.8 observabilité durcit EN28.4 ; SBOM/artefacts signés enrichissent EN28.12)

## Statut global

⬜ Backlog — bloqué tant qu'ADR-009 n'est pas Accepté.

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers — socle** | |
| [EN28.1 — Portail catalogue](ENABLERS/en-portail-catalogue.md) | ⬜ |
| [EN28.2 — Catalogue d'entités étendu](ENABLERS/en-catalogue-entites-etendu.md) | ⬜ |
| [EN28.3 — Contrat PivotAdapter](ENABLERS/en-contrat-pivotadapter.md) | ⬜ |
| [EN28.4 — Bus d'événements](ENABLERS/en-bus-evenements.md) | ⬜ |
| [EN28.5 — Design-system adaptateurs](ENABLERS/en-design-system-adaptateurs.md) | ⬜ |
| [EN28.6 — Endpoint santé unifié](ENABLERS/en-endpoint-sante-unifie.md) | ⬜ |
| [EN28.7 — Critère adaptateur vs natif](ENABLERS/en-critere-adaptateur-vs-natif.md) | ⬜ |
| **Enablers — gouvernance** | |
| [EN28.9 — ADR-009 licences amont/aval](ENABLERS/en-adr-009-licences-amont-aval.md) | ⬜ |
| [EN28.10 — ADR-011 modèle d'entités](ENABLERS/en-adr-011-modele-entites.md) | ⬜ |
| [EN28.11 — ADR-012 stratégie de forks](ENABLERS/en-adr-012-strategie-forks.md) | ⬜ |
| [EN28.12 — Intendance upstream](ENABLERS/en-intendance-upstream.md) | ⬜ |
| [EN28.13 — Veille licences & versions](ENABLERS/en-veille-licences-versions.md) | ⬜ |
| **F28.1 — Delivery agile** | |
| [US28.1.1 — Adaptateur Plane backlog & sprints](FEATURES/delivery-agile-plane/us-adaptateur-plane-backlog-sprints.md) | ⬜ |
| [US28.1.2 — SSO Plane](FEATURES/delivery-agile-plane/us-sso-plane.md) | ⬜ |
| [US28.1.3 — Événement tâche terminée](FEATURES/delivery-agile-plane/us-evenement-tache-terminee.md) | ⬜ |
| [US28.1.4 — Board agile embarqué](FEATURES/delivery-agile-plane/us-board-agile-embarque.md) | ⬜ |
| [US28.1.5 — Adaptateur Taiga (alternative)](FEATURES/delivery-agile-plane/us-adaptateur-taiga.md) | ⬜ |
| **F28.2 — Collaboration visuelle et documentaire** | |
| [US28.2.1 — Tableau blanc comme entité Document](FEATURES/collaboration-visuelle-documentaire/us-tableau-blanc-entite-document.md) | ⬜ |
| [US28.2.2 — Documents collaboratifs](FEATURES/collaboration-visuelle-documentaire/us-documents-collaboratifs.md) | ⬜ |
| [US28.2.3 — Base de données no-code](FEATURES/collaboration-visuelle-documentaire/us-base-donnees-no-code.md) | ⬜ |
| [US28.2.4 — Base de connaissances wiki](FEATURES/collaboration-visuelle-documentaire/us-base-connaissances-wiki.md) | ⬜ |
| [US28.2.5 — Adaptateur Nextcloud (alternative)](FEATURES/collaboration-visuelle-documentaire/us-adaptateur-nextcloud.md) | ⬜ |
| [US28.2.6 — Adaptateur NocoDB (alternative)](FEATURES/collaboration-visuelle-documentaire/us-adaptateur-nocodb.md) | ⬜ |
| **F28.3 — Workflows & automatisation** | |
| [US28.3.1 — Adaptateur n8n](FEATURES/workflows-automatisation/us-adaptateur-n8n.md) | ⬜ |
| [US28.3.2 — SSO n8n](FEATURES/workflows-automatisation/us-sso-n8n.md) | ⬜ |
| [US28.3.3 — Événements d'exécution](FEATURES/workflows-automatisation/us-evenements-execution.md) | ⬜ |
| [US28.3.4 — Orchestration data Kestra](FEATURES/workflows-automatisation/us-orchestration-data-kestra.md) | ⬜ |
| [US28.3.5 — Adaptateur Activepieces (alternative)](FEATURES/workflows-automatisation/us-adaptateur-activepieces.md) | ⬜ |
| [US28.3.6 — Adaptateur Apache Airflow (alternative)](FEATURES/workflows-automatisation/us-adaptateur-airflow.md) | ⬜ |
| **F28.4 — Mesure (BI & analytics)** | |
| [US28.4.1 — Tableaux de bord Metabase](FEATURES/mesure-bi-analytics/us-tableaux-bord-metabase.md) | ⬜ |
| [US28.4.2 — Analytics d'usage Matomo](FEATURES/mesure-bi-analytics/us-analytics-usage-matomo.md) | ⬜ |
| [US28.4.3 — Adaptateur Apache Superset (alternative)](FEATURES/mesure-bi-analytics/us-adaptateur-superset.md) | ⬜ |
| [US28.4.4 — Lien Plausible (alternative)](FEATURES/mesure-bi-analytics/us-lien-plausible.md) | ⬜ |
| **F28.5 — Contrats & communication** | |
| [US28.5.1 — Signature électronique Documenso](FEATURES/contrats-communication/us-signature-electronique-documenso.md) | ⬜ |
| [US28.5.2 — CLM natif](FEATURES/contrats-communication/us-clm-natif.md) | ⬜ |
| [US28.5.3 — Messagerie souveraine](FEATURES/contrats-communication/us-messagerie-souveraine.md) | ⬜ |
| [US28.5.4 — Adaptateur Docuseal (alternative)](FEATURES/contrats-communication/us-adaptateur-docuseal.md) | ⬜ |
| [US28.5.5 — Lien Rocket.Chat (alternative)](FEATURES/contrats-communication/us-lien-rocket-chat.md) | ⬜ |
| **F28.6 — Pilotage de portefeuille (PPM)** | |
| [US28.6.1 — Adaptateur OpenProject](FEATURES/pilotage-portefeuille/us-adaptateur-openproject.md) | ⬜ |
| [US28.6.2 — Adaptateur ProjeQtOr (alternative)](FEATURES/pilotage-portefeuille/us-adaptateur-projeqtor.md) | ⬜ |
| **F28.7 — Rétrospectives** | |
| [US28.7.1 — Lien Scrumlr](FEATURES/retrospectives/us-lien-scrumlr.md) | ⬜ |
| **F28.8 — Formulaires & sondages** | |
| [US28.8.1 — Adaptateur Formbricks](FEATURES/formulaires-sondages/us-adaptateur-formbricks.md) | ⬜ |
| [US28.8.2 — Adaptateur LimeSurvey (alternative)](FEATURES/formulaires-sondages/us-adaptateur-limesurvey.md) | ⬜ |
| **F28.9 — Whiteboard (adaptateur)** | |
| [US28.9.1 — Adaptateur Excalidraw (embed)](FEATURES/whiteboard-adaptateur/us-adaptateur-excalidraw.md) | ⬜ |
| [US28.9.2 — Adaptateur tldraw (embed, alternative)](FEATURES/whiteboard-adaptateur/us-adaptateur-tldraw.md) | ⬜ |
| **F28.10 — SCM & CI/CD** | |
| [US28.10.1 — Adaptateur GitLab CE](FEATURES/scm-cicd/us-adaptateur-gitlab-ce.md) | ⬜ |
| [US28.10.2 — Adaptateur Forgejo (alternative)](FEATURES/scm-cicd/us-adaptateur-forgejo.md) | ⬜ |
