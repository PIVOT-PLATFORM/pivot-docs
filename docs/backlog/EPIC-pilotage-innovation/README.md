# E38 — Management de l'innovation (SMI)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.27).*

## Objectif

Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — **Système de Management de l'Innovation (SMI)** aligné **ISO 56002 / famille ISO 56000** : de la **stratégie** d'innovation à l'**idéation**, l'**entonnoir & stage-gate**, l'**évaluation**, le **portefeuille d'innovation** (horizons H1/H2/H3), l'**expérimentation**, la **propriété intellectuelle**, l'**open innovation**, les **KPIs & la maturité**, et la **culture**. Comparables outils : Qmarkets, Brightidea, HYPE, Itonics, Wazoku, Sopheon.

> **Recentrage.** Les 8 items « secteur public » historiquement rangés ici (lien commande publique, subventions, AP/CP, transparence, archivage probant, valeur publique, livrables d'instance, format ouvert) ont été **redistribués** vers E25 (commande publique), E26 (budget), E23 (portefeuille), E35 (gouvernance) et E37 (licences/réversibilité). E38 est désormais un **SMI pur**.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ · AC à affiner au Gate 1 PO Agent

## Périmètre

### Features
- **F38.1 — Stratégie & politique d'innovation** (ISO 56002 §5)
- **F38.2 — Idéation & campagnes** (capture, défis, crowdsourcing)
- **F38.3 — Entonnoir & stage-gate** (idea → concept → POC → projet → scale ; go/kill/hold/pivot)
- **F38.4 — Évaluation & sélection** (scoring multicritère, business case léger)
- **F38.5 — Portefeuille d'innovation** (horizons H1/H2/H3, allocation)
- **F38.6 — Expérimentation & apprentissage** (POC/MVP, innovation accounting)
- **F38.7 — Propriété intellectuelle & valorisation**
- **F38.8 — Open innovation & écosystème** (partenaires, veille, hackathons)
- **F38.9 — KPIs, maturité & conformité ISO 56000** (ISO 56004/56008)
- **F38.10 — Culture, participation & reconnaissance**

#### Fonctionnalités innovantes
- **F38.11 — Innovation augmentée par l'IA** (gouvernée) : assistant d'idéation · **ponts entre idées ressemblantes** (clustering sémantique) · évaluation assistée · **fail-fast assisté** · matchmaking IA · gouvernance IA (humain dans la boucle, non-entraînement, AI Act)
- **F38.12 — Communautés & profils d'innovateurs** : communautés · profils (compétences/intérêts) · constitution d'équipes · mentorat
- **F38.13 — Corporate venturing & intrapreneuriat** : studio/incubateur interne · **venture board & financement par paliers** · spin-off/spin-in · **lien écosystème start-up & CVC**
- **F38.14 — Intelligence collective avancée** : **marché de prédiction d'idées** · **graphe d'innovation & moteur de sérendipité** · combinaison d'idées · valorisation par options réelles & momentum
- **F38.15 — Événements, parcours & formulaires d'innovation** : **événements internes** (hackathons, ateliers, demo days, awards) · **parcours d'innovation orchestré par Pivot Workflow (E29)** · **challenges & dépôt d'idée par formulaire (Forms)** · schéma d'idée extensible

> **Note.** Le module **[E42 — Pivot Forms](pathname:///pivot-docs/backlog/EPIC-pivot-forms/)** fournit le form-builder ; F38.15 le consomme pour le **dépôt d'idée** (`form.submitted` → idée). Le **parcours** d'innovation s'appuie sur **Workflow (E29)**, l'animation d'événements sur **Session (E19)** / **MeetOps (E12)**.

### Enablers
- **[EN38.1](ENABLERS/en-modele-smi-moteur.md)** — Modèle SMI & moteur (entonnoir, stage-gate, scoring, portefeuille, KPIs)
- **[EN38.2](ENABLERS/en-moteur-ia-graphe.md)** — Moteur IA & graphe d'innovation **gouverné** (embeddings/similarité, LLM, graphe, sérendipité, prédiction)

## Dépendances

- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E18 Domaine Pilotage
- Interface avec : **E22 Roadmap** / **E23 Portefeuille** (conversion innovation → projet), **E29 Workflows** (parcours d'innovation orchestré, F38.15), **E42 Pivot Forms** (dépôt d'idée, F38.15), **E19 Session** (vote/idéation, événements), **E12 MeetOps** (logistique événements), **E21 Risque** (grilles de scoring) — via bus PIVOT + deep-links

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| [EN38.1 — Modèle SMI & moteur](ENABLERS/en-modele-smi-moteur.md) | ⬜ |
| [EN38.2 — Moteur IA & graphe d'innovation (gouverné)](ENABLERS/en-moteur-ia-graphe.md) | ⬜ |
| **F38.1 — Stratégie & politique d'innovation** | |
| [US38.1.1 — Politique & ambition d'innovation](FEATURES/strategie-innovation/us-politique-ambition.md) | ⬜ |
| [US38.1.2 — Gouvernance de l'innovation](FEATURES/strategie-innovation/us-gouvernance-innovation.md) | ⬜ |
| **F38.2 — Idéation & campagnes** | |
| [US38.2.1 — Capturer & enrichir des idées](FEATURES/ideation-campagnes/us-capturer-idees.md) | ⬜ |
| [US38.2.2 — Campagnes / défis d'innovation](FEATURES/ideation-campagnes/us-campagnes-defis.md) | ⬜ |
| [US38.2.3 — Crowdsourcing & vote communautaire](FEATURES/ideation-campagnes/us-crowdsourcing-vote.md) | ⬜ |
| **F38.3 — Entonnoir & stage-gate** | |
| [US38.3.1 — Pipeline d'innovation (idea → scale)](FEATURES/entonnoir-stage-gate/us-pipeline-innovation.md) | ⬜ |
| [US38.3.2 — Jalons de décision (stage-gate)](FEATURES/entonnoir-stage-gate/us-stage-gate.md) | ⬜ |
| [US38.3.3 — Passage d'une innovation en projet](FEATURES/entonnoir-stage-gate/us-passage-en-projet.md) | ⬜ |
| **F38.4 — Évaluation & sélection** | |
| [US38.4.1 — Scoring multicritère & grilles d'évaluation](FEATURES/evaluation-selection/us-scoring-multicritere.md) | ⬜ |
| [US38.4.2 — Business case léger (valeur / effort / risque)](FEATURES/evaluation-selection/us-business-case-leger.md) | ⬜ |
| **F38.5 — Portefeuille d'innovation** | |
| [US38.5.1 — Portefeuille d'innovation (horizons H1/H2/H3)](FEATURES/portefeuille-innovation/us-vue-portefeuille-horizons.md) | ⬜ |
| [US38.5.2 — Équilibre & allocation de ressources](FEATURES/portefeuille-innovation/us-allocation-ressources.md) | ⬜ |
| **F38.6 — Expérimentation & apprentissage** | |
| [US38.6.1 — POC / MVP & expérimentations](FEATURES/experimentation-apprentissage/us-poc-mvp.md) | ⬜ |
| [US38.6.2 — Innovation accounting & apprentissages](FEATURES/experimentation-apprentissage/us-innovation-accounting.md) | ⬜ |
| **F38.7 — Propriété intellectuelle & valorisation** | |
| [US38.7.1 — Propriété intellectuelle (brevets, savoir-faire)](FEATURES/pi-valorisation/us-propriete-intellectuelle.md) | ⬜ |
| [US38.7.2 — Valorisation & transfert](FEATURES/pi-valorisation/us-valorisation-transfert.md) | ⬜ |
| **F38.8 — Open innovation & écosystème** | |
| [US38.8.1 — Partenaires, startups & appels à projets](FEATURES/open-innovation/us-partenaires-appels-projets.md) | ⬜ |
| [US38.8.2 — Veille & scouting technologique](FEATURES/open-innovation/us-veille-scouting.md) | ⬜ |
| [US38.8.3 — Hackathons & challenges avec l'écosystème externe](FEATURES/open-innovation/us-hackathons-evenements.md) | ⬜ |
| **F38.9 — KPIs, maturité & conformité ISO 56000** | |
| [US38.9.1 — KPIs & tableau de bord de l'innovation](FEATURES/kpis-maturite-iso/us-kpis-tableau-bord.md) | ⬜ |
| [US38.9.2 — Évaluation de maturité (ISO 56002/56004)](FEATURES/kpis-maturite-iso/us-maturite-iso-56002.md) | ⬜ |
| **F38.10 — Culture, participation & reconnaissance** | |
| [US38.10.1 — Engagement & participation](FEATURES/culture-reconnaissance/us-engagement-participation.md) | ⬜ |
| [US38.10.2 — Reconnaissance des contributeurs](FEATURES/culture-reconnaissance/us-reconnaissance-contributeurs.md) | ⬜ |
| **F38.11 — Innovation augmentée par l'IA** | |
| [US38.11.1 — Assistant IA d'idéation](FEATURES/ia-augmentee/us-assistant-ia-ideation.md) | ⬜ |
| [US38.11.2 — Ponts entre idées ressemblantes (clustering sémantique)](FEATURES/ia-augmentee/us-ponts-idees-ressemblantes.md) | ⬜ |
| [US38.11.3 — Évaluation & pré-tri assistés par IA](FEATURES/ia-augmentee/us-evaluation-assistee-ia.md) | ⬜ |
| [US38.11.4 — Fail-fast assisté](FEATURES/ia-augmentee/us-fail-fast-assiste.md) | ⬜ |
| [US38.11.5 — Matchmaking IA (experts, mentors, financeurs)](FEATURES/ia-augmentee/us-matchmaking-ia.md) | ⬜ |
| [US38.11.6 — Gouvernance de l'IA d'innovation](FEATURES/ia-augmentee/us-gouvernance-ia-innovation.md) | ⬜ |
| **F38.12 — Communautés & profils d'innovateurs** | |
| [US38.12.1 — Communautés d'innovation](FEATURES/communautes-innovateurs/us-communautes-innovation.md) | ⬜ |
| [US38.12.2 — Profils d'innovateurs (compétences & intérêts)](FEATURES/communautes-innovateurs/us-profils-innovateurs.md) | ⬜ |
| [US38.12.3 — Constitution d'équipes par compétences](FEATURES/communautes-innovateurs/us-matchmaking-equipes.md) | ⬜ |
| [US38.12.4 — Mentorat & coaching](FEATURES/communautes-innovateurs/us-mentorat-coaching.md) | ⬜ |
| **F38.13 — Corporate venturing & intrapreneuriat** | |
| [US38.13.1 — Studio / incubateur interne](FEATURES/corporate-venturing/us-studio-incubateur-interne.md) | ⬜ |
| [US38.13.2 — Venture board & financement par paliers](FEATURES/corporate-venturing/us-venture-board-financement.md) | ⬜ |
| [US38.13.3 — Spin-off / spin-in & essaimage](FEATURES/corporate-venturing/us-spinoff-spinin-essaimage.md) | ⬜ |
| [US38.13.4 — Lien écosystème start-up & CVC](FEATURES/corporate-venturing/us-ecosysteme-startup-cvc.md) | ⬜ |
| **F38.14 — Intelligence collective avancée** | |
| [US38.14.1 — Marché de prédiction d'idées](FEATURES/intelligence-collective/us-marche-prediction-idees.md) | ⬜ |
| [US38.14.2 — Graphe d'innovation & moteur de sérendipité](FEATURES/intelligence-collective/us-graphe-innovation-serendipite.md) | ⬜ |
| [US38.14.3 — Combinaison & recombinaison d'idées](FEATURES/intelligence-collective/us-combinaison-idees.md) | ⬜ |
| [US38.14.4 — Valorisation par options réelles & momentum](FEATURES/intelligence-collective/us-options-reelles-momentum.md) | ⬜ |
| **F38.15 — Événements, parcours & formulaires d'innovation** | |
| [US38.15.1 — Organisation d'événements internes d'innovation](FEATURES/evenements-parcours-forms/us-evenements-innovation.md) | ⬜ |
| [US38.15.2 — Parcours d'innovation orchestré (Pivot Workflow, E29)](FEATURES/evenements-parcours-forms/us-parcours-innovation-workflow.md) | ⬜ |
| [US38.15.3 — Challenges & dépôt d'idée par formulaire (Forms)](FEATURES/evenements-parcours-forms/us-challenges-depot-idee-forms.md) | ⬜ |
| [US38.15.4 — Schéma d'idée extensible (champs personnalisés)](FEATURES/evenements-parcours-forms/us-schema-idee-extensible.md) | ⬜ |
