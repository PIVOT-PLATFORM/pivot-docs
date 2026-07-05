# E42 — Pivot Forms (formulaires & enquêtes)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.30).*

## Objectif

**Form-builder no-code souverain** de la suite PIVOT, **recentré sur l'intégration** : création visuelle, logique conditionnelle & scoring, diffusion & embed dans le portail, collecte & restitution, **API & événements** (`form.submitted` au bus), IA gouvernée, **gouvernance & RGPD**, **auto-hébergement**, accessibilité RGAA. Benchmark : Typeform, Jotform, Tally, Formbricks, Qualtrics, Google Forms. **32 US** issues du CSV `backlog_formulaires.csv` (version recentrée).

> **Brique transverse & gouvernée.** Forms est consommé par les autres modules — notamment le **SMI (E38, F38.15)** pour le dépôt d'idée et le module **Workflow (E29)** (une réponse → `form.submitted` → tâche/risque/contrat). **L'orchestration aval n'est pas dans Forms** : Forms émet l'événement, le bus et Workflow orchestrent. Formulaire = objet gouverné au catalogue (propriétaire, classification, rétention).

## Repo cible (architecture multi-repo)

- Backend : **`pivot-forms-core`** (schéma Flyway `forms`, FK → `public.teams.id`)
- Frontend : **`pivot-forms-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17** : pivot-core-starter + @pivot/ui-core publiés

## Phase

⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Périmètre

### Features
- **F42.1 — Éditeur & champs** (4 US)
- **F42.2 — Logique & personnalisation** (5 US)
- **F42.3 — Diffusion & canaux** (3 US)
- **F42.4 — Réponses & restitution** (3 US)
- **F42.5 — API & événements** (4 US)
- **F42.6 — IA** (2 US)
- **F42.7 — Gouvernance du formulaire** (4 US)
- **F42.8 — Souveraineté & déploiement** (2 US)
- **F42.9 — Collaboration & modèles** (3 US)
- **F42.10 — Accessibilité** (1 US)
- **F42.11 — Innovation** (1 US)

### Enablers
- **[EN42.1](ENABLERS/en-moteur-schema-formulaire.md)** — Moteur & schéma de formulaire (logique, scoring, thème, événements bus)
- **[EN42.2](ENABLERS/en-deploiement-souverain-forms.md)** — Déploiement souverain & sécurité (self-host/UE, SSO, RGPD)

## Hors périmètre

- **Orchestration aval** d'une soumission (créer une tâche, un risque, un contrat à partir d'une réponse) — reste portée par le module **Workflow (E29)** ou le consommateur de `form.submitted`, jamais par Forms lui-même
- **BI cross-formulaires / cross-modules** (tableaux de bord agrégeant plusieurs formulaires ou d'autres données PIVOT) — relève d'un outil BI dédié (cf. E28 Intégration open source, Metabase), pas de la restitution native de Forms qui reste mono-formulaire
- **Registre des traitements RGPD au niveau plateforme** (Art. 30) et **gestion des demandes d'accès/rectification/effacement** — Forms alimente ces processus via sa classification (US42.7.1) mais ne les remplace pas
- **Marketplace de modèles inter-organisations** — seuls les modèles internes à un même tenant sont couverts (US42.9.1)
- **Conformité RGAA de niveau AAA** — seul le niveau AA, réglementairement requis, est couvert (US42.10.1)

## Dépendances

- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E01 Auth & IAM (SSO)
- Interface avec : **E29 Workflows** (`form.submitted` → workflow/tâche), **E38 SMI** (dépôt d'idée F38.15), **E19 Session** (enquêtes) — via bus PIVOT + deep-links

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| [EN42.1 — Moteur & schéma de formulaire](ENABLERS/en-moteur-schema-formulaire.md) | ⬜ |
| [EN42.2 — Déploiement souverain & sécurité](ENABLERS/en-deploiement-souverain-forms.md) | ⬜ |
| **F42.1 — Éditeur & champs** | |
| [US42.1.1 — Éditeur no-code drag-and-drop](FEATURES/editeur-champs/us-editeur-no-code-drag-and-drop.md) | ⬜ |
| [US42.1.2 — Types de champs variés](FEATURES/editeur-champs/us-types-de-champs-varies.md) | ⬜ |
| [US42.1.3 — Validation des saisies](FEATURES/editeur-champs/us-validation-des-saisies.md) | ⬜ |
| [US42.1.4 — Multi-pages et sections](FEATURES/editeur-champs/us-multi-pages-et-sections.md) | ⬜ |
| **F42.2 — Logique & personnalisation** | |
| [US42.2.1 — Logique conditionnelle](FEATURES/logique-personnalisation/us-logique-conditionnelle.md) | ⬜ |
| [US42.2.2 — Calculs et scoring (quiz)](FEATURES/logique-personnalisation/us-calculs-et-scoring-quiz.md) | ⬜ |
| [US42.2.3 — Champs masqués et pré-remplissage](FEATURES/logique-personnalisation/us-champs-masques-et-pre-remplissage.md) | ⬜ |
| [US42.2.4 — Thème PIVOT](FEATURES/logique-personnalisation/us-theme-pivot.md) | ⬜ |
| [US42.2.5 — Multilingue](FEATURES/logique-personnalisation/us-multilingue.md) | ⬜ |
| **F42.3 — Diffusion & canaux** | |
| [US42.3.1 — Lien partageable](FEATURES/diffusion-canaux/us-lien-partageable.md) | ⬜ |
| [US42.3.2 — Intégration embarquée dans le portail](FEATURES/diffusion-canaux/us-integration-embarquee-dans-le-portail.md) | ⬜ |
| [US42.3.3 — Enquêtes in-app ciblées](FEATURES/diffusion-canaux/us-enquetes-in-app-ciblees.md) | ⬜ |
| **F42.4 — Réponses & restitution** | |
| [US42.4.1 — Collecte et tableau de réponses](FEATURES/reponses-restitution/us-collecte-et-tableau-de-reponses.md) | ⬜ |
| [US42.4.2 — Restitution visuelle](FEATURES/reponses-restitution/us-restitution-visuelle.md) | ⬜ |
| [US42.4.3 — Réponses partielles](FEATURES/reponses-restitution/us-reponses-partielles.md) | ⬜ |
| **F42.5 — API & événements** | |
| [US42.5.1 — Webhooks sortants](FEATURES/api-evenements/us-webhooks-sortants.md) | ⬜ |
| [US42.5.2 — API de formulaires et réponses](FEATURES/api-evenements/us-api-de-formulaires-et-reponses.md) | ⬜ |
| [US42.5.3 — Serveur MCP](FEATURES/api-evenements/us-serveur-mcp.md) | ⬜ |
| [US42.5.4 — Émission d'événement de soumission](FEATURES/api-evenements/us-emission-d-evenement-de-soumission.md) | ⬜ |
| **F42.6 — IA** | |
| [US42.6.1 — Génération de formulaire par IA](FEATURES/ia/us-generation-de-formulaire-par-ia.md) | ⬜ |
| [US42.6.2 — Synthèse des réponses par IA (gouvernée)](FEATURES/ia/us-synthese-des-reponses-par-ia-gouvernee.md) | ⬜ |
| **F42.7 — Gouvernance du formulaire** | |
| [US42.7.1 — Formulaire = entité gouvernée](FEATURES/gouvernance-formulaire/us-formulaire-entite-gouvernee.md) | ⬜ |
| [US42.7.2 — RGPD & consentement](FEATURES/gouvernance-formulaire/us-rgpd-consentement.md) | ⬜ |
| [US42.7.3 — Rétention et purge des réponses](FEATURES/gouvernance-formulaire/us-retention-et-purge-des-reponses.md) | ⬜ |
| [US42.7.4 — Anti-spam & intégrité](FEATURES/gouvernance-formulaire/us-anti-spam-integrite.md) | ⬜ |
| **F42.8 — Souveraineté & déploiement** | |
| [US42.8.1 — Auto-hébergement](FEATURES/souverainete-deploiement/us-auto-hebergement.md) | ⬜ |
| [US42.8.2 — Hébergement UE / RGPD](FEATURES/souverainete-deploiement/us-hebergement-ue-rgpd.md) | ⬜ |
| **F42.9 — Collaboration & modèles** | |
| [US42.9.1 — Bibliothèque de modèles](FEATURES/collaboration-modeles/us-bibliotheque-de-modeles.md) | ⬜ |
| [US42.9.2 — Collaboration d'équipe](FEATURES/collaboration-modeles/us-collaboration-d-equipe.md) | ⬜ |
| [US42.9.3 — Migration / import](FEATURES/collaboration-modeles/us-migration-import.md) | ⬜ |
| **F42.10 — Accessibilité** | |
| [US42.10.1 — Accessibilité RGAA 4](FEATURES/accessibilite/us-accessibilite-rgaa-4.md) | ⬜ |
| **F42.11 — Innovation** | |
| [US42.11.1 — Format d'échange ouvert](FEATURES/innovation/us-format-d-echange-ouvert.md) | ⬜ |
