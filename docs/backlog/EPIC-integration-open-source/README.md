# E28 — Intégration open source (mycélium)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](../EPIC-formation-onboarding/README.md) (US41.5.17).*

## Objectif

Construire le socle qui permet à PIVOT d'intégrer des outils open source matures via adaptateurs, en complément — pas en remplacement — des modules natifs. Voir [ADR-009](pathname:///pivot-docs/adr/ADR-009-cadre-integration-open-source) pour le cadre complet (quatre modes, critère adaptateur/natif, règle de licences, contrat à six capacités).

## Phase

⏸️ **phase-3** — dépend de l'acceptation d'ADR-009 (statut : Proposé) par les mainteneurs.

## Périmètre GitHub (phase-3)

### Enablers — socle

- **EN28.1** — [Portail Backstage](ENABLERS/en-portail-backstage.md)
- **EN28.2** — [Catalogue d'entités étendu](ENABLERS/en-catalogue-entites-etendu.md)
- **EN28.3** — [Contrat d'intégration PivotAdapter](ENABLERS/en-contrat-pivotadapter.md)
- **EN28.4** — [Bus d'événements](ENABLERS/en-bus-evenements.md)
- **EN28.5** — [Design-system et thème pour adaptateurs](ENABLERS/en-design-system-adaptateurs.md)
- **EN28.6** — [Endpoint santé unifié](ENABLERS/en-endpoint-sante-unifie.md)
- **EN28.7** — [Critère de décision adaptateur vs natif](ENABLERS/en-critere-adaptateur-vs-natif.md)
- **EN28.8** — [Veille Excalidraw](ENABLERS/en-veille-excalidraw.md)

### Enablers — gouvernance

- **EN28.9** — [ADR-009 : règle de licences amont/aval](ENABLERS/en-adr-009-licences-amont-aval.md)
- **EN28.10** — [ADR-011 : modèle d'entités](ENABLERS/en-adr-011-modele-entites.md)
- **EN28.11** — [ADR-012 : stratégie de forks](ENABLERS/en-adr-012-strategie-forks.md)
- **EN28.12** — [Intendance upstream](ENABLERS/en-intendance-upstream.md)
- **EN28.13** — [Veille licences & versions](ENABLERS/en-veille-licences-versions.md)

### Features

- **F28.1 — Delivery agile (adaptateur Plane)**
  - [US28.1.1 — Adaptateur Plane, backlog & sprints](FEATURES/delivery-agile-plane/us-adaptateur-plane-backlog-sprints.md)
  - [US28.1.2 — SSO Plane](FEATURES/delivery-agile-plane/us-sso-plane.md)
  - [US28.1.3 — Événement tâche terminée](FEATURES/delivery-agile-plane/us-evenement-tache-terminee.md)
  - [US28.1.4 — Board agile embarqué](FEATURES/delivery-agile-plane/us-board-agile-embarque.md)
- **F28.2 — Collaboration visuelle et documentaire**
  - [US28.2.1 — Tableau blanc comme entité Document](FEATURES/collaboration-visuelle-documentaire/us-tableau-blanc-entite-document.md)
  - [US28.2.2 — Documents collaboratifs (Docs / La Suite numérique)](FEATURES/collaboration-visuelle-documentaire/us-documents-collaboratifs.md)
  - [US28.2.3 — Base de données no-code (Baserow)](FEATURES/collaboration-visuelle-documentaire/us-base-donnees-no-code.md)
  - [US28.2.4 — Base de connaissances (BookStack)](FEATURES/collaboration-visuelle-documentaire/us-base-connaissances-wiki.md)
- **F28.3 — Workflows & automatisation**
  - [US28.3.1 — Adaptateur n8n](FEATURES/workflows-automatisation/us-adaptateur-n8n.md)
  - [US28.3.2 — SSO n8n](FEATURES/workflows-automatisation/us-sso-n8n.md)
  - [US28.3.3 — Événements d'exécution](FEATURES/workflows-automatisation/us-evenements-execution.md)
  - [US28.3.4 — Orchestration data (Kestra)](FEATURES/workflows-automatisation/us-orchestration-data-kestra.md)
- **F28.4 — Mesure (BI & analytics)**
  - [US28.4.1 — Tableaux de bord Metabase](FEATURES/mesure-bi-analytics/us-tableaux-bord-metabase.md)
  - [US28.4.2 — Analytics d'usage Matomo](FEATURES/mesure-bi-analytics/us-analytics-usage-matomo.md)
- **F28.5 — Contrats & communication**
  - [US28.5.1 — Signature électronique (Documenso)](FEATURES/contrats-communication/us-signature-electronique-documenso.md)
  - [US28.5.2 — CLM natif](FEATURES/contrats-communication/us-clm-natif.md)
  - [US28.5.3 — Messagerie souveraine (Element/Matrix)](FEATURES/contrats-communication/us-messagerie-souveraine.md)

## Hors périmètre — déjà couvert par d'autres EPIC

Le brouillon initial (`backlog_integration_pivot.csv`) proposait aussi les items ci-dessous. Ils ont été retirés de cet EPIC parce qu'un autre EPIC couvre déjà le même besoin — créer un doublon aurait dupliqué la source de vérité :

| Retiré | Couvert par |
|---|---|
| Fournisseur d'identité SSO (Keycloak), modèle de rôles | [E01 — Auth & IAM](../EPIC-auth-iam/README.md) |
| Gestion des secrets (OpenBao), distribution déployable (Coolify) | [E07 — Infrastructure & Déploiement](../EPIC-infrastructure/README.md) |
| Adaptateur OpenProject (pilotage de portefeuille, PPM, Gantt) | [E18 — Module Pilotage](../EPIC-pilotage/README.md) (natif, F18.1 Roadmap/Gantt, F18.2 Portefeuille) |
| Whiteboard Excalidraw embarqué | [E08 — Module Whiteboard](../EPIC-whiteboard/README.md) (natif — cf. [ADR-009 §5](pathname:///pivot-docs/adr/ADR-009-cadre-integration-open-source)) |
| Formulaires / quiz / sondages (Formbricks) | [E19 — Module Session](../EPIC-module-session/README.md) (natif : QUIZ, POLL, WORDCLOUD, BRAINSTORM, QA) |
| Rétrospectives (Scrumlr) | [E20 — Module Retrospective](../EPIC-retrospective/README.md) (natif) |
| Planning poker natif | [E09 — Module Scrum Poker](../EPIC-scrum-poker/README.md) (natif — confirmé aligné, aucun changement) |

**Point d'attention non tranché** (cf. [ADR-009 « Points ouverts »](pathname:///pivot-docs/adr/ADR-009-cadre-integration-open-source#points-ouverts)) : l'exclusion d'OpenProject et de Formbricks suit la même logique que le whiteboard (préférer le natif déjà planifié) mais n'a pas reçu d'arbitrage explicite du mainteneur — à confirmer avant de considérer ces deux domaines définitivement clos.

## Dépendances

- Dépend de : [ADR-009](pathname:///pivot-docs/adr/ADR-009-cadre-integration-open-source) (statut Proposé — ce backlog ne démarre pas avant acceptation)
- Dépend de : E03 Système de modules (EN03.1 PivotModule interface — un adaptateur s'active/désactive comme un module natif)
- Dépend de : E17 Infrastructure multi-repo (si les adaptateurs sont un jour extraits en repos dédiés)

## Statut global

⬜ Backlog — bloqué tant qu'ADR-009 n'est pas Accepté.

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers — socle** | |
| [EN28.1 — Portail Backstage](ENABLERS/en-portail-backstage.md) | ⬜ |
| [EN28.2 — Catalogue d'entités étendu](ENABLERS/en-catalogue-entites-etendu.md) | ⬜ |
| [EN28.3 — Contrat PivotAdapter](ENABLERS/en-contrat-pivotadapter.md) | ⬜ |
| [EN28.4 — Bus d'événements](ENABLERS/en-bus-evenements.md) | ⬜ |
| [EN28.5 — Design-system adaptateurs](ENABLERS/en-design-system-adaptateurs.md) | ⬜ |
| [EN28.6 — Endpoint santé unifié](ENABLERS/en-endpoint-sante-unifie.md) | ⬜ |
| [EN28.7 — Critère adaptateur vs natif](ENABLERS/en-critere-adaptateur-vs-natif.md) | ⬜ |
| [EN28.8 — Veille Excalidraw](ENABLERS/en-veille-excalidraw.md) | ⬜ |
| **Enablers — gouvernance** | |
| [EN28.9 — ADR-009 licences amont/aval](ENABLERS/en-adr-009-licences-amont-aval.md) | ⬜ |
| [EN28.10 — ADR-011 modèle d'entités](ENABLERS/en-adr-011-modele-entites.md) | ⬜ |
| [EN28.11 — ADR-012 stratégie de forks](ENABLERS/en-adr-012-strategie-forks.md) | ⬜ |
| [EN28.12 — Intendance upstream](ENABLERS/en-intendance-upstream.md) | ⬜ |
| [EN28.13 — Veille licences & versions](ENABLERS/en-veille-licences-versions.md) | ⬜ |
| **F28.1 — Delivery agile (Plane)** | |
| [US28.1.1 — Adaptateur Plane backlog & sprints](FEATURES/delivery-agile-plane/us-adaptateur-plane-backlog-sprints.md) | ⬜ |
| [US28.1.2 — SSO Plane](FEATURES/delivery-agile-plane/us-sso-plane.md) | ⬜ |
| [US28.1.3 — Événement tâche terminée](FEATURES/delivery-agile-plane/us-evenement-tache-terminee.md) | ⬜ |
| [US28.1.4 — Board agile embarqué](FEATURES/delivery-agile-plane/us-board-agile-embarque.md) | ⬜ |
| **F28.2 — Collaboration visuelle et documentaire** | |
| [US28.2.1 — Tableau blanc comme entité Document](FEATURES/collaboration-visuelle-documentaire/us-tableau-blanc-entite-document.md) | ⬜ |
| [US28.2.2 — Documents collaboratifs](FEATURES/collaboration-visuelle-documentaire/us-documents-collaboratifs.md) | ⬜ |
| [US28.2.3 — Base de données no-code](FEATURES/collaboration-visuelle-documentaire/us-base-donnees-no-code.md) | ⬜ |
| [US28.2.4 — Base de connaissances wiki](FEATURES/collaboration-visuelle-documentaire/us-base-connaissances-wiki.md) | ⬜ |
| **F28.3 — Workflows & automatisation** | |
| [US28.3.1 — Adaptateur n8n](FEATURES/workflows-automatisation/us-adaptateur-n8n.md) | ⬜ |
| [US28.3.2 — SSO n8n](FEATURES/workflows-automatisation/us-sso-n8n.md) | ⬜ |
| [US28.3.3 — Événements d'exécution](FEATURES/workflows-automatisation/us-evenements-execution.md) | ⬜ |
| [US28.3.4 — Orchestration data Kestra](FEATURES/workflows-automatisation/us-orchestration-data-kestra.md) | ⬜ |
| **F28.4 — Mesure (BI & analytics)** | |
| [US28.4.1 — Tableaux de bord Metabase](FEATURES/mesure-bi-analytics/us-tableaux-bord-metabase.md) | ⬜ |
| [US28.4.2 — Analytics d'usage Matomo](FEATURES/mesure-bi-analytics/us-analytics-usage-matomo.md) | ⬜ |
| **F28.5 — Contrats & communication** | |
| [US28.5.1 — Signature électronique Documenso](FEATURES/contrats-communication/us-signature-electronique-documenso.md) | ⬜ |
| [US28.5.2 — CLM natif](FEATURES/contrats-communication/us-clm-natif.md) | ⬜ |
| [US28.5.3 — Messagerie souveraine](FEATURES/contrats-communication/us-messagerie-souveraine.md) | ⬜ |
