# E29 — Workflows & Automatisation

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.18).*

## Objectif

Plateforme d'automatisation no-code / low-code : construction visuelle de workflows multi-étapes (déclencheur → actions), catalogue de connecteurs, étapes IA et agents outillés, gouvernance et souveraineté. Le périmètre est issu d'un benchmark comparatif face à **n8n, Zapier, Power Automate, Activepieces, Gumloop et IFTTT**. L'ambition : offrir la profondeur des acteurs pro tout en garantissant souveraineté, réversibilité et gouvernance de l'IA.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-automatisation-core`** (schéma Flyway `automatisation`)
- Frontend : **`pivot-automatisation-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Origine

Généré depuis le CSV de benchmark (84 items `WF-###` couvrant les 6 cahiers n8n / Zapier / Power Automate / Activepieces / Gumloop / IFTTT). Les critères d'acceptation sont indicatifs et **à affiner au Gate 1 PO Agent** au démarrage du sprint.

## Périmètre

- **Enablers (E13 NFR)** — exigences non fonctionnelles socle
  - EN29.1 : Chiffrement & RGPD
  - EN29.2 : Disponibilité 99,9 %
  - EN29.3 : Latence et fraîcheur
  - EN29.4 : Montée en charge
  - EN29.5 : Localisation FR
  - EN29.6 : Estimation avant batch
- **F29.1 — Éditeur & logique** — US29.1.1, US29.1.2, US29.1.3, US29.1.4, US29.1.5, US29.1.6, US29.1.7
  - US29.1.1 : Modèle déclencheur → actions
  - US29.1.2 : Constructeur visuel no-code
  - US29.1.3 : Bibliothèque de modèles
  - US29.1.4 : Logique avancée
  - US29.1.5 : Étapes de code
  - US29.1.6 : Sub-workflows
  - US29.1.7 : Versioning des workflows
- **F29.2 — Déclencheurs & connectivité** — US29.2.1, US29.2.2, US29.2.3, US29.2.4, US29.2.5
  - US29.2.1 : Webhooks entrants
  - US29.2.2 : Planification
  - US29.2.3 : Connecteur HTTP générique
  - US29.2.4 : Scraping et navigateur
  - US29.2.5 : IoT et domotique
- **F29.3 — Catalogue** — US29.3.1, US29.3.2
  - US29.3.1 : Catalogue d'intégrations
  - US29.3.2 : Très grand catalogue
- **F29.4 — Fiabilité & exploitation** — US29.4.1, US29.4.2, US29.4.3, US29.4.4
  - US29.4.1 : Journal des exécutions
  - US29.4.2 : Gestion d'erreurs structurée
  - US29.4.3 : Rejeu des exécutions
  - US29.4.4 : Bac à sable de test
- **F29.5 — IA & agents** — US29.5.1, US29.5.2, US29.5.3, US29.5.4, US29.5.5, US29.5.6, US29.5.7, US29.5.8, US29.5.9, US29.5.10, US29.5.11, US29.5.12
  - US29.5.1 : Étapes IA de base
  - US29.5.2 : Agents IA outillés
  - US29.5.3 : Garde-fous d'agents
  - US29.5.4 : Copilote de construction
  - US29.5.5 : Traçabilité des appels de modèles
  - US29.5.6 : Garanties de données IA
  - US29.5.7 : Validation des sorties IA
  - US29.5.8 : BYOM et versions d'agents
  - US29.5.9 : Multi-agents
  - US29.5.10 : Briques RAG
  - US29.5.11 : Pipelines IA documentaires
  - US29.5.12 : Agents proactifs en messagerie
- **F29.6 — Humain dans la boucle** — US29.6.1, US29.6.2
  - US29.6.1 : Approbations humaines
  - US29.6.2 : Base de données native
- **F29.7 — Gouvernance & sécurité** — US29.7.1, US29.7.2, US29.7.3, US29.7.4, US29.7.5, US29.7.6, US29.7.7, US29.7.8
  - US29.7.1 : Credentials centralisés
  - US29.7.2 : SSO, rôles, audit
  - US29.7.3 : Contrôle des connecteurs et modèles
  - US29.7.4 : Environnements dev/test/prod
  - US29.7.5 : Coffre-fort de secrets renforcé
  - US29.7.6 : Inventaire et propriétaires
  - US29.7.7 : Réversibilité
  - US29.7.8 : Analytique IA unifiée
- **F29.8 — Souveraineté & déploiement** — US29.8.1, US29.8.2, US29.8.3, US29.8.4
  - US29.8.1 : Auto-hébergement complet
  - US29.8.2 : Exécutions illimitées self-host
  - US29.8.3 : Licence open source du cœur
  - US29.8.4 : Déploiement VPC
- **F29.9 — Suite & expérience** — US29.9.1, US29.9.2, US29.9.3, US29.9.4
  - US29.9.1 : Applications mobiles
  - US29.9.2 : Interfaces no-code
  - US29.9.3 : Cartographie des processus
  - US29.9.4 : Chatbots connectés
- **F29.10 — RPA & process intelligence** — US29.10.1, US29.10.2, US29.10.3
  - US29.10.1 : RPA desktop
  - US29.10.2 : RPA auto-réparante
  - US29.10.3 : Process mining
- **F29.11 — Extensibilité & écosystème** — US29.11.1, US29.11.2, US29.11.3, US29.11.4, US29.11.5
  - US29.11.1 : Serveur MCP
  - US29.11.2 : Connecteurs communautaires typés
  - US29.11.3 : Workflows exposés en API
  - US29.11.4 : Partage communautaire
  - US29.11.5 : Embed OEM marque blanche
- **F29.12 — Licences & modèle éco.** — US29.12.1, US29.12.2, US29.12.3
  - US29.12.1 : Offre gratuite d'appel
  - US29.12.2 : Compteurs et alertes budget
  - US29.12.3 : Droits inclus dans la suite
- **F29.13 — Innovation** — US29.13.1, US29.13.2, US29.13.3, US29.13.4, US29.13.5, US29.13.6, US29.13.7, US29.13.8
  - US29.13.1 : Simulateur de coût total
  - US29.13.2 : Registre inter-plateformes
  - US29.13.3 : Format d'échange ouvert
  - US29.13.4 : Recette automatisée
  - US29.13.5 : Explicabilité opposable
  - US29.13.6 : Mode dégradé organisé
  - US29.13.7 : Pile souveraine certifiée
  - US29.13.8 : Packs conformité France
- **F29.14 — Chantiers SI** — US29.14.1, US29.14.2, US29.14.3, US29.14.4, US29.14.5, US29.14.6, US29.14.7, US29.14.8, US29.14.9, US29.14.10, US29.14.11
  - US29.14.1 : Segmentation par profil d'usage
  - US29.14.2 : Projection des volumes
  - US29.14.3 : Classification souveraineté
  - US29.14.4 : Stratégie socle + exception
  - US29.14.5 : CoE et gouvernance citoyenne
  - US29.14.6 : Principe 'IA minimale'
  - US29.14.7 : Exploitation de production
  - US29.14.8 : Contractualisation IA & sortie
  - US29.14.9 : Audit de sécurité credentials
  - US29.14.10 : Conformité AI Act
  - US29.14.11 : Accessibilité RGAA

## Dépendances

- Dépend de : **E03 Système de modules** (interface PivotModule)
- Dépend de : **E17 Infrastructure multi-repo** (pivot-core-starter + @pivot/ui-core)

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| [EN29.1 — Chiffrement & RGPD](ENABLERS/en-chiffrement-rgpd.md) | ⬜ |
| [EN29.2 — Disponibilité 99,9 %](ENABLERS/en-disponibilite-99-9.md) | ⬜ |
| [EN29.3 — Latence et fraîcheur](ENABLERS/en-latence-fraicheur.md) | ⬜ |
| [EN29.4 — Montée en charge](ENABLERS/en-montee-en-charge.md) | ⬜ |
| [EN29.5 — Localisation FR](ENABLERS/en-localisation-fr.md) | ⬜ |
| [EN29.6 — Estimation avant batch](ENABLERS/en-estimation-avant-batch.md) | ⬜ |
| **F29.1 — Éditeur & logique** | |
| [US29.1.1 — Modèle déclencheur → actions](FEATURES/editeur-logique/us-modele-declencheur-actions.md) | ⬜ |
| [US29.1.2 — Constructeur visuel no-code](FEATURES/editeur-logique/us-constructeur-visuel-nocode.md) | ⬜ |
| [US29.1.3 — Bibliothèque de modèles](FEATURES/editeur-logique/us-bibliotheque-modeles.md) | ⬜ |
| [US29.1.4 — Logique avancée](FEATURES/editeur-logique/us-logique-avancee.md) | ⬜ |
| [US29.1.5 — Étapes de code](FEATURES/editeur-logique/us-etapes-de-code.md) | ⬜ |
| [US29.1.6 — Sub-workflows](FEATURES/editeur-logique/us-sub-workflows.md) | ⬜ |
| [US29.1.7 — Versioning des workflows](FEATURES/editeur-logique/us-versioning-workflows.md) | ⬜ |
| **F29.2 — Déclencheurs & connectivité** | |
| [US29.2.1 — Webhooks entrants](FEATURES/declencheurs-connectivite/us-webhooks-entrants.md) | ⬜ |
| [US29.2.2 — Planification](FEATURES/declencheurs-connectivite/us-planification.md) | ⬜ |
| [US29.2.3 — Connecteur HTTP générique](FEATURES/declencheurs-connectivite/us-connecteur-http-generique.md) | ⬜ |
| [US29.2.4 — Scraping et navigateur](FEATURES/declencheurs-connectivite/us-scraping-navigateur.md) | ⬜ |
| [US29.2.5 — IoT et domotique](FEATURES/declencheurs-connectivite/us-iot-domotique.md) | ⬜ |
| **F29.3 — Catalogue** | |
| [US29.3.1 — Catalogue d'intégrations](FEATURES/catalogue/us-catalogue-integrations.md) | ⬜ |
| [US29.3.2 — Très grand catalogue](FEATURES/catalogue/us-tres-grand-catalogue.md) | ⬜ |
| **F29.4 — Fiabilité & exploitation** | |
| [US29.4.1 — Journal des exécutions](FEATURES/fiabilite-exploitation/us-journal-executions.md) | ⬜ |
| [US29.4.2 — Gestion d'erreurs structurée](FEATURES/fiabilite-exploitation/us-gestion-erreurs-structuree.md) | ⬜ |
| [US29.4.3 — Rejeu des exécutions](FEATURES/fiabilite-exploitation/us-rejeu-executions.md) | ⬜ |
| [US29.4.4 — Bac à sable de test](FEATURES/fiabilite-exploitation/us-bac-a-sable-test.md) | ⬜ |
| **F29.5 — IA & agents** | |
| [US29.5.1 — Étapes IA de base](FEATURES/ia-agents/us-etapes-ia-base.md) | ⬜ |
| [US29.5.2 — Agents IA outillés](FEATURES/ia-agents/us-agents-ia-outilles.md) | ⬜ |
| [US29.5.3 — Garde-fous d'agents](FEATURES/ia-agents/us-garde-fous-agents.md) | ⬜ |
| [US29.5.4 — Copilote de construction](FEATURES/ia-agents/us-copilote-construction.md) | ⬜ |
| [US29.5.5 — Traçabilité des appels de modèles](FEATURES/ia-agents/us-tracabilite-appels-modeles.md) | ⬜ |
| [US29.5.6 — Garanties de données IA](FEATURES/ia-agents/us-garanties-donnees-ia.md) | ⬜ |
| [US29.5.7 — Validation des sorties IA](FEATURES/ia-agents/us-validation-sorties-ia.md) | ⬜ |
| [US29.5.8 — BYOM et versions d'agents](FEATURES/ia-agents/us-byom-versions-agents.md) | ⬜ |
| [US29.5.9 — Multi-agents](FEATURES/ia-agents/us-multi-agents.md) | ⬜ |
| [US29.5.10 — Briques RAG](FEATURES/ia-agents/us-briques-rag.md) | ⬜ |
| [US29.5.11 — Pipelines IA documentaires](FEATURES/ia-agents/us-pipelines-ia-documentaires.md) | ⬜ |
| [US29.5.12 — Agents proactifs en messagerie](FEATURES/ia-agents/us-agents-proactifs-messagerie.md) | ⬜ |
| **F29.6 — Humain dans la boucle** | |
| [US29.6.1 — Approbations humaines](FEATURES/humain-boucle/us-approbations-humaines.md) | ⬜ |
| [US29.6.2 — Base de données native](FEATURES/humain-boucle/us-base-donnees-native.md) | ⬜ |
| **F29.7 — Gouvernance & sécurité** | |
| [US29.7.1 — Credentials centralisés](FEATURES/gouvernance-securite/us-credentials-centralises.md) | ⬜ |
| [US29.7.2 — SSO, rôles, audit](FEATURES/gouvernance-securite/us-sso-roles-audit.md) | ⬜ |
| [US29.7.3 — Contrôle des connecteurs et modèles](FEATURES/gouvernance-securite/us-controle-connecteurs-modeles.md) | ⬜ |
| [US29.7.4 — Environnements dev/test/prod](FEATURES/gouvernance-securite/us-environnements-dev-test-prod.md) | ⬜ |
| [US29.7.5 — Coffre-fort de secrets renforcé](FEATURES/gouvernance-securite/us-coffre-fort-secrets-renforce.md) | ⬜ |
| [US29.7.6 — Inventaire et propriétaires](FEATURES/gouvernance-securite/us-inventaire-proprietaires.md) | ⬜ |
| [US29.7.7 — Réversibilité](FEATURES/gouvernance-securite/us-reversibilite.md) | ⬜ |
| [US29.7.8 — Analytique IA unifiée](FEATURES/gouvernance-securite/us-analytique-ia-unifiee.md) | ⬜ |
| **F29.8 — Souveraineté & déploiement** | |
| [US29.8.1 — Auto-hébergement complet](FEATURES/souverainete-deploiement/us-auto-hebergement-complet.md) | ⬜ |
| [US29.8.2 — Exécutions illimitées self-host](FEATURES/souverainete-deploiement/us-executions-illimitees-selfhost.md) | ⬜ |
| [US29.8.3 — Licence open source du cœur](FEATURES/souverainete-deploiement/us-licence-open-source-coeur.md) | ⬜ |
| [US29.8.4 — Déploiement VPC](FEATURES/souverainete-deploiement/us-deploiement-vpc.md) | ⬜ |
| **F29.9 — Suite & expérience** | |
| [US29.9.1 — Applications mobiles](FEATURES/suite-experience/us-applications-mobiles.md) | ⬜ |
| [US29.9.2 — Interfaces no-code](FEATURES/suite-experience/us-interfaces-nocode.md) | ⬜ |
| [US29.9.3 — Cartographie des processus](FEATURES/suite-experience/us-cartographie-processus.md) | ⬜ |
| [US29.9.4 — Chatbots connectés](FEATURES/suite-experience/us-chatbots-connectes.md) | ⬜ |
| **F29.10 — RPA & process intelligence** | |
| [US29.10.1 — RPA desktop](FEATURES/rpa-process/us-rpa-desktop.md) | ⬜ |
| [US29.10.2 — RPA auto-réparante](FEATURES/rpa-process/us-rpa-auto-reparante.md) | ⬜ |
| [US29.10.3 — Process mining](FEATURES/rpa-process/us-process-mining.md) | ⬜ |
| **F29.11 — Extensibilité & écosystème** | |
| [US29.11.1 — Serveur MCP](FEATURES/extensibilite-ecosysteme/us-serveur-mcp.md) | ⬜ |
| [US29.11.2 — Connecteurs communautaires typés](FEATURES/extensibilite-ecosysteme/us-connecteurs-communautaires-types.md) | ⬜ |
| [US29.11.3 — Workflows exposés en API](FEATURES/extensibilite-ecosysteme/us-workflows-exposes-api.md) | ⬜ |
| [US29.11.4 — Partage communautaire](FEATURES/extensibilite-ecosysteme/us-partage-communautaire.md) | ⬜ |
| [US29.11.5 — Embed OEM marque blanche](FEATURES/extensibilite-ecosysteme/us-embed-oem-marque-blanche.md) | ⬜ |
| **F29.12 — Licences & modèle éco.** | |
| [US29.12.1 — Offre gratuite d'appel](FEATURES/licences-eco/us-offre-gratuite-appel.md) | ⬜ |
| [US29.12.2 — Compteurs et alertes budget](FEATURES/licences-eco/us-compteurs-alertes-budget.md) | ⬜ |
| [US29.12.3 — Droits inclus dans la suite](FEATURES/licences-eco/us-droits-inclus-suite.md) | ⬜ |
| **F29.13 — Innovation** | |
| [US29.13.1 — Simulateur de coût total](FEATURES/innovation/us-simulateur-cout-total.md) | ⬜ |
| [US29.13.2 — Registre inter-plateformes](FEATURES/innovation/us-registre-inter-plateformes.md) | ⬜ |
| [US29.13.3 — Format d'échange ouvert](FEATURES/innovation/us-format-echange-ouvert.md) | ⬜ |
| [US29.13.4 — Recette automatisée](FEATURES/innovation/us-recette-automatisee.md) | ⬜ |
| [US29.13.5 — Explicabilité opposable](FEATURES/innovation/us-explicabilite-opposable.md) | ⬜ |
| [US29.13.6 — Mode dégradé organisé](FEATURES/innovation/us-mode-degrade-organise.md) | ⬜ |
| [US29.13.7 — Pile souveraine certifiée](FEATURES/innovation/us-pile-souveraine-certifiee.md) | ⬜ |
| [US29.13.8 — Packs conformité France](FEATURES/innovation/us-packs-conformite-france.md) | ⬜ |
| **F29.14 — Chantiers SI** | |
| [US29.14.1 — Segmentation par profil d'usage](FEATURES/chantiers-si/us-segmentation-par-profil.md) | ⬜ |
| [US29.14.2 — Projection des volumes](FEATURES/chantiers-si/us-projection-volumes.md) | ⬜ |
| [US29.14.3 — Classification souveraineté](FEATURES/chantiers-si/us-classification-souverainete.md) | ⬜ |
| [US29.14.4 — Stratégie socle + exception](FEATURES/chantiers-si/us-strategie-socle-exception.md) | ⬜ |
| [US29.14.5 — CoE et gouvernance citoyenne](FEATURES/chantiers-si/us-coe-gouvernance-citoyenne.md) | ⬜ |
| [US29.14.6 — Principe 'IA minimale'](FEATURES/chantiers-si/us-principe-ia-minimale.md) | ⬜ |
| [US29.14.7 — Exploitation de production](FEATURES/chantiers-si/us-exploitation-production.md) | ⬜ |
| [US29.14.8 — Contractualisation IA & sortie](FEATURES/chantiers-si/us-contractualisation-ia-sortie.md) | ⬜ |
| [US29.14.9 — Audit de sécurité credentials](FEATURES/chantiers-si/us-audit-securite-credentials.md) | ⬜ |
| [US29.14.10 — Conformité AI Act](FEATURES/chantiers-si/us-conformite-ai-act.md) | ⬜ |
| [US29.14.11 — Accessibilité RGAA](FEATURES/chantiers-si/us-accessibilite-rgaa.md) | ⬜ |
