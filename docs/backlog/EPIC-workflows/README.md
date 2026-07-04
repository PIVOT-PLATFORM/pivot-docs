# E21 — Workflows & Automatisation

## Objectif

Plateforme d'automatisation no-code / low-code : construction visuelle de workflows multi-étapes (déclencheur → actions), catalogue de connecteurs, étapes IA et agents outillés, gouvernance et souveraineté. Le périmètre est issu d'un benchmark comparatif face à **n8n, Zapier, Power Automate, Activepieces, Gumloop et IFTTT**. L'ambition : offrir la profondeur des acteurs pro tout en garantissant souveraineté, réversibilité et gouvernance de l'IA.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-automatisation-core`** (schéma Flyway `automatisation`)
- Frontend : **`pivot-automatisation-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Origine

Généré depuis le CSV de benchmark (84 items `WF-###` couvrant les 6 cahiers n8n / Zapier / Power Automate / Activepieces / Gumloop / IFTTT). Les critères d'acceptation sont indicatifs et **à affiner au Gate 1 PO Agent** au démarrage du sprint.

## Périmètre

- **Enablers (E13 NFR)** — exigences non fonctionnelles socle
  - EN21.1 : Chiffrement & RGPD
  - EN21.2 : Disponibilité 99,9 %
  - EN21.3 : Latence et fraîcheur
  - EN21.4 : Montée en charge
  - EN21.5 : Localisation FR
  - EN21.6 : Estimation avant batch
- **F21.1 — Éditeur & logique** — US21.1.1, US21.1.2, US21.1.3, US21.1.4, US21.1.5, US21.1.6, US21.1.7
  - US21.1.1 : Modèle déclencheur → actions
  - US21.1.2 : Constructeur visuel no-code
  - US21.1.3 : Bibliothèque de modèles
  - US21.1.4 : Logique avancée
  - US21.1.5 : Étapes de code
  - US21.1.6 : Sub-workflows
  - US21.1.7 : Versioning des workflows
- **F21.2 — Déclencheurs & connectivité** — US21.2.1, US21.2.2, US21.2.3, US21.2.4, US21.2.5
  - US21.2.1 : Webhooks entrants
  - US21.2.2 : Planification
  - US21.2.3 : Connecteur HTTP générique
  - US21.2.4 : Scraping et navigateur
  - US21.2.5 : IoT et domotique
- **F21.3 — Catalogue** — US21.3.1, US21.3.2
  - US21.3.1 : Catalogue d'intégrations
  - US21.3.2 : Très grand catalogue
- **F21.4 — Fiabilité & exploitation** — US21.4.1, US21.4.2, US21.4.3, US21.4.4
  - US21.4.1 : Journal des exécutions
  - US21.4.2 : Gestion d'erreurs structurée
  - US21.4.3 : Rejeu des exécutions
  - US21.4.4 : Bac à sable de test
- **F21.5 — IA & agents** — US21.5.1, US21.5.2, US21.5.3, US21.5.4, US21.5.5, US21.5.6, US21.5.7, US21.5.8, US21.5.9, US21.5.10, US21.5.11, US21.5.12
  - US21.5.1 : Étapes IA de base
  - US21.5.2 : Agents IA outillés
  - US21.5.3 : Garde-fous d'agents
  - US21.5.4 : Copilote de construction
  - US21.5.5 : Traçabilité des appels de modèles
  - US21.5.6 : Garanties de données IA
  - US21.5.7 : Validation des sorties IA
  - US21.5.8 : BYOM et versions d'agents
  - US21.5.9 : Multi-agents
  - US21.5.10 : Briques RAG
  - US21.5.11 : Pipelines IA documentaires
  - US21.5.12 : Agents proactifs en messagerie
- **F21.6 — Humain dans la boucle** — US21.6.1, US21.6.2
  - US21.6.1 : Approbations humaines
  - US21.6.2 : Base de données native
- **F21.7 — Gouvernance & sécurité** — US21.7.1, US21.7.2, US21.7.3, US21.7.4, US21.7.5, US21.7.6, US21.7.7, US21.7.8
  - US21.7.1 : Credentials centralisés
  - US21.7.2 : SSO, rôles, audit
  - US21.7.3 : Contrôle des connecteurs et modèles
  - US21.7.4 : Environnements dev/test/prod
  - US21.7.5 : Coffre-fort de secrets renforcé
  - US21.7.6 : Inventaire et propriétaires
  - US21.7.7 : Réversibilité
  - US21.7.8 : Analytique IA unifiée
- **F21.8 — Souveraineté & déploiement** — US21.8.1, US21.8.2, US21.8.3, US21.8.4
  - US21.8.1 : Auto-hébergement complet
  - US21.8.2 : Exécutions illimitées self-host
  - US21.8.3 : Licence open source du cœur
  - US21.8.4 : Déploiement VPC
- **F21.9 — Suite & expérience** — US21.9.1, US21.9.2, US21.9.3, US21.9.4
  - US21.9.1 : Applications mobiles
  - US21.9.2 : Interfaces no-code
  - US21.9.3 : Cartographie des processus
  - US21.9.4 : Chatbots connectés
- **F21.10 — RPA & process intelligence** — US21.10.1, US21.10.2, US21.10.3
  - US21.10.1 : RPA desktop
  - US21.10.2 : RPA auto-réparante
  - US21.10.3 : Process mining
- **F21.11 — Extensibilité & écosystème** — US21.11.1, US21.11.2, US21.11.3, US21.11.4, US21.11.5
  - US21.11.1 : Serveur MCP
  - US21.11.2 : Connecteurs communautaires typés
  - US21.11.3 : Workflows exposés en API
  - US21.11.4 : Partage communautaire
  - US21.11.5 : Embed OEM marque blanche
- **F21.12 — Licences & modèle éco.** — US21.12.1, US21.12.2, US21.12.3
  - US21.12.1 : Offre gratuite d'appel
  - US21.12.2 : Compteurs et alertes budget
  - US21.12.3 : Droits inclus dans la suite
- **F21.13 — Innovation** — US21.13.1, US21.13.2, US21.13.3, US21.13.4, US21.13.5, US21.13.6, US21.13.7, US21.13.8
  - US21.13.1 : Simulateur de coût total
  - US21.13.2 : Registre inter-plateformes
  - US21.13.3 : Format d'échange ouvert
  - US21.13.4 : Recette automatisée
  - US21.13.5 : Explicabilité opposable
  - US21.13.6 : Mode dégradé organisé
  - US21.13.7 : Pile souveraine certifiée
  - US21.13.8 : Packs conformité France
- **F21.14 — Chantiers SI** — US21.14.1, US21.14.2, US21.14.3, US21.14.4, US21.14.5, US21.14.6, US21.14.7, US21.14.8, US21.14.9, US21.14.10, US21.14.11
  - US21.14.1 : Segmentation par persona
  - US21.14.2 : Projection des volumes
  - US21.14.3 : Classification souveraineté
  - US21.14.4 : Stratégie socle + exception
  - US21.14.5 : CoE et gouvernance citoyenne
  - US21.14.6 : Principe 'IA minimale'
  - US21.14.7 : Exploitation de production
  - US21.14.8 : Contractualisation IA & sortie
  - US21.14.9 : Audit de sécurité credentials
  - US21.14.10 : Conformité AI Act
  - US21.14.11 : Accessibilité RGAA

## Dépendances

- Dépend de : **E03 Système de modules** (interface PivotModule)
- Dépend de : **E17 Infrastructure multi-repo** (pivot-core-starter + @pivot/ui-core)

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| [EN21.1 — Chiffrement & RGPD](ENABLERS/en-chiffrement-rgpd.md) | ⬜ |
| [EN21.2 — Disponibilité 99,9 %](ENABLERS/en-disponibilite-99-9.md) | ⬜ |
| [EN21.3 — Latence et fraîcheur](ENABLERS/en-latence-fraicheur.md) | ⬜ |
| [EN21.4 — Montée en charge](ENABLERS/en-montee-en-charge.md) | ⬜ |
| [EN21.5 — Localisation FR](ENABLERS/en-localisation-fr.md) | ⬜ |
| [EN21.6 — Estimation avant batch](ENABLERS/en-estimation-avant-batch.md) | ⬜ |
| **F21.1 — Éditeur & logique** | |
| [US21.1.1 — Modèle déclencheur → actions](FEATURES/editeur-logique/us-modele-declencheur-actions.md) | ⬜ |
| [US21.1.2 — Constructeur visuel no-code](FEATURES/editeur-logique/us-constructeur-visuel-nocode.md) | ⬜ |
| [US21.1.3 — Bibliothèque de modèles](FEATURES/editeur-logique/us-bibliotheque-modeles.md) | ⬜ |
| [US21.1.4 — Logique avancée](FEATURES/editeur-logique/us-logique-avancee.md) | ⬜ |
| [US21.1.5 — Étapes de code](FEATURES/editeur-logique/us-etapes-de-code.md) | ⬜ |
| [US21.1.6 — Sub-workflows](FEATURES/editeur-logique/us-sub-workflows.md) | ⬜ |
| [US21.1.7 — Versioning des workflows](FEATURES/editeur-logique/us-versioning-workflows.md) | ⬜ |
| **F21.2 — Déclencheurs & connectivité** | |
| [US21.2.1 — Webhooks entrants](FEATURES/declencheurs-connectivite/us-webhooks-entrants.md) | ⬜ |
| [US21.2.2 — Planification](FEATURES/declencheurs-connectivite/us-planification.md) | ⬜ |
| [US21.2.3 — Connecteur HTTP générique](FEATURES/declencheurs-connectivite/us-connecteur-http-generique.md) | ⬜ |
| [US21.2.4 — Scraping et navigateur](FEATURES/declencheurs-connectivite/us-scraping-navigateur.md) | ⬜ |
| [US21.2.5 — IoT et domotique](FEATURES/declencheurs-connectivite/us-iot-domotique.md) | ⬜ |
| **F21.3 — Catalogue** | |
| [US21.3.1 — Catalogue d'intégrations](FEATURES/catalogue/us-catalogue-integrations.md) | ⬜ |
| [US21.3.2 — Très grand catalogue](FEATURES/catalogue/us-tres-grand-catalogue.md) | ⬜ |
| **F21.4 — Fiabilité & exploitation** | |
| [US21.4.1 — Journal des exécutions](FEATURES/fiabilite-exploitation/us-journal-executions.md) | ⬜ |
| [US21.4.2 — Gestion d'erreurs structurée](FEATURES/fiabilite-exploitation/us-gestion-erreurs-structuree.md) | ⬜ |
| [US21.4.3 — Rejeu des exécutions](FEATURES/fiabilite-exploitation/us-rejeu-executions.md) | ⬜ |
| [US21.4.4 — Bac à sable de test](FEATURES/fiabilite-exploitation/us-bac-a-sable-test.md) | ⬜ |
| **F21.5 — IA & agents** | |
| [US21.5.1 — Étapes IA de base](FEATURES/ia-agents/us-etapes-ia-base.md) | ⬜ |
| [US21.5.2 — Agents IA outillés](FEATURES/ia-agents/us-agents-ia-outilles.md) | ⬜ |
| [US21.5.3 — Garde-fous d'agents](FEATURES/ia-agents/us-garde-fous-agents.md) | ⬜ |
| [US21.5.4 — Copilote de construction](FEATURES/ia-agents/us-copilote-construction.md) | ⬜ |
| [US21.5.5 — Traçabilité des appels de modèles](FEATURES/ia-agents/us-tracabilite-appels-modeles.md) | ⬜ |
| [US21.5.6 — Garanties de données IA](FEATURES/ia-agents/us-garanties-donnees-ia.md) | ⬜ |
| [US21.5.7 — Validation des sorties IA](FEATURES/ia-agents/us-validation-sorties-ia.md) | ⬜ |
| [US21.5.8 — BYOM et versions d'agents](FEATURES/ia-agents/us-byom-versions-agents.md) | ⬜ |
| [US21.5.9 — Multi-agents](FEATURES/ia-agents/us-multi-agents.md) | ⬜ |
| [US21.5.10 — Briques RAG](FEATURES/ia-agents/us-briques-rag.md) | ⬜ |
| [US21.5.11 — Pipelines IA documentaires](FEATURES/ia-agents/us-pipelines-ia-documentaires.md) | ⬜ |
| [US21.5.12 — Agents proactifs en messagerie](FEATURES/ia-agents/us-agents-proactifs-messagerie.md) | ⬜ |
| **F21.6 — Humain dans la boucle** | |
| [US21.6.1 — Approbations humaines](FEATURES/humain-boucle/us-approbations-humaines.md) | ⬜ |
| [US21.6.2 — Base de données native](FEATURES/humain-boucle/us-base-donnees-native.md) | ⬜ |
| **F21.7 — Gouvernance & sécurité** | |
| [US21.7.1 — Credentials centralisés](FEATURES/gouvernance-securite/us-credentials-centralises.md) | ⬜ |
| [US21.7.2 — SSO, rôles, audit](FEATURES/gouvernance-securite/us-sso-roles-audit.md) | ⬜ |
| [US21.7.3 — Contrôle des connecteurs et modèles](FEATURES/gouvernance-securite/us-controle-connecteurs-modeles.md) | ⬜ |
| [US21.7.4 — Environnements dev/test/prod](FEATURES/gouvernance-securite/us-environnements-dev-test-prod.md) | ⬜ |
| [US21.7.5 — Coffre-fort de secrets renforcé](FEATURES/gouvernance-securite/us-coffre-fort-secrets-renforce.md) | ⬜ |
| [US21.7.6 — Inventaire et propriétaires](FEATURES/gouvernance-securite/us-inventaire-proprietaires.md) | ⬜ |
| [US21.7.7 — Réversibilité](FEATURES/gouvernance-securite/us-reversibilite.md) | ⬜ |
| [US21.7.8 — Analytique IA unifiée](FEATURES/gouvernance-securite/us-analytique-ia-unifiee.md) | ⬜ |
| **F21.8 — Souveraineté & déploiement** | |
| [US21.8.1 — Auto-hébergement complet](FEATURES/souverainete-deploiement/us-auto-hebergement-complet.md) | ⬜ |
| [US21.8.2 — Exécutions illimitées self-host](FEATURES/souverainete-deploiement/us-executions-illimitees-selfhost.md) | ⬜ |
| [US21.8.3 — Licence open source du cœur](FEATURES/souverainete-deploiement/us-licence-open-source-coeur.md) | ⬜ |
| [US21.8.4 — Déploiement VPC](FEATURES/souverainete-deploiement/us-deploiement-vpc.md) | ⬜ |
| **F21.9 — Suite & expérience** | |
| [US21.9.1 — Applications mobiles](FEATURES/suite-experience/us-applications-mobiles.md) | ⬜ |
| [US21.9.2 — Interfaces no-code](FEATURES/suite-experience/us-interfaces-nocode.md) | ⬜ |
| [US21.9.3 — Cartographie des processus](FEATURES/suite-experience/us-cartographie-processus.md) | ⬜ |
| [US21.9.4 — Chatbots connectés](FEATURES/suite-experience/us-chatbots-connectes.md) | ⬜ |
| **F21.10 — RPA & process intelligence** | |
| [US21.10.1 — RPA desktop](FEATURES/rpa-process/us-rpa-desktop.md) | ⬜ |
| [US21.10.2 — RPA auto-réparante](FEATURES/rpa-process/us-rpa-auto-reparante.md) | ⬜ |
| [US21.10.3 — Process mining](FEATURES/rpa-process/us-process-mining.md) | ⬜ |
| **F21.11 — Extensibilité & écosystème** | |
| [US21.11.1 — Serveur MCP](FEATURES/extensibilite-ecosysteme/us-serveur-mcp.md) | ⬜ |
| [US21.11.2 — Connecteurs communautaires typés](FEATURES/extensibilite-ecosysteme/us-connecteurs-communautaires-types.md) | ⬜ |
| [US21.11.3 — Workflows exposés en API](FEATURES/extensibilite-ecosysteme/us-workflows-exposes-api.md) | ⬜ |
| [US21.11.4 — Partage communautaire](FEATURES/extensibilite-ecosysteme/us-partage-communautaire.md) | ⬜ |
| [US21.11.5 — Embed OEM marque blanche](FEATURES/extensibilite-ecosysteme/us-embed-oem-marque-blanche.md) | ⬜ |
| **F21.12 — Licences & modèle éco.** | |
| [US21.12.1 — Offre gratuite d'appel](FEATURES/licences-eco/us-offre-gratuite-appel.md) | ⬜ |
| [US21.12.2 — Compteurs et alertes budget](FEATURES/licences-eco/us-compteurs-alertes-budget.md) | ⬜ |
| [US21.12.3 — Droits inclus dans la suite](FEATURES/licences-eco/us-droits-inclus-suite.md) | ⬜ |
| **F21.13 — Innovation** | |
| [US21.13.1 — Simulateur de coût total](FEATURES/innovation/us-simulateur-cout-total.md) | ⬜ |
| [US21.13.2 — Registre inter-plateformes](FEATURES/innovation/us-registre-inter-plateformes.md) | ⬜ |
| [US21.13.3 — Format d'échange ouvert](FEATURES/innovation/us-format-echange-ouvert.md) | ⬜ |
| [US21.13.4 — Recette automatisée](FEATURES/innovation/us-recette-automatisee.md) | ⬜ |
| [US21.13.5 — Explicabilité opposable](FEATURES/innovation/us-explicabilite-opposable.md) | ⬜ |
| [US21.13.6 — Mode dégradé organisé](FEATURES/innovation/us-mode-degrade-organise.md) | ⬜ |
| [US21.13.7 — Pile souveraine certifiée](FEATURES/innovation/us-pile-souveraine-certifiee.md) | ⬜ |
| [US21.13.8 — Packs conformité France](FEATURES/innovation/us-packs-conformite-france.md) | ⬜ |
| **F21.14 — Chantiers SI** | |
| [US21.14.1 — Segmentation par persona](FEATURES/chantiers-si/us-segmentation-par-persona.md) | ⬜ |
| [US21.14.2 — Projection des volumes](FEATURES/chantiers-si/us-projection-volumes.md) | ⬜ |
| [US21.14.3 — Classification souveraineté](FEATURES/chantiers-si/us-classification-souverainete.md) | ⬜ |
| [US21.14.4 — Stratégie socle + exception](FEATURES/chantiers-si/us-strategie-socle-exception.md) | ⬜ |
| [US21.14.5 — CoE et gouvernance citoyenne](FEATURES/chantiers-si/us-coe-gouvernance-citoyenne.md) | ⬜ |
| [US21.14.6 — Principe 'IA minimale'](FEATURES/chantiers-si/us-principe-ia-minimale.md) | ⬜ |
| [US21.14.7 — Exploitation de production](FEATURES/chantiers-si/us-exploitation-production.md) | ⬜ |
| [US21.14.8 — Contractualisation IA & sortie](FEATURES/chantiers-si/us-contractualisation-ia-sortie.md) | ⬜ |
| [US21.14.9 — Audit de sécurité credentials](FEATURES/chantiers-si/us-audit-securite-credentials.md) | ⬜ |
| [US21.14.10 — Conformité AI Act](FEATURES/chantiers-si/us-conformite-ai-act.md) | ⬜ |
| [US21.14.11 — Accessibilité RGAA](FEATURES/chantiers-si/us-accessibilite-rgaa.md) | ⬜ |
