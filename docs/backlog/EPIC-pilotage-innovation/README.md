# E38 — Management de l'innovation (SMI)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](../EPIC-formation-onboarding/README.md) (US41.5.27).*

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

### Enablers
- **[EN38.1](ENABLERS/en-modele-smi-moteur.md)** — Modèle SMI & moteur (entonnoir, stage-gate, scoring, portefeuille, KPIs)

## Dépendances

- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E18 Domaine Pilotage
- Interface avec : **E22 Roadmap** / **E23 Portefeuille** (conversion innovation → projet), **E19 Session** (vote/idéation), **E21 Risque** (grilles de scoring) — via bus PIVOT + deep-links

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| [EN38.1 — Modèle SMI & moteur](ENABLERS/en-modele-smi-moteur.md) | ⬜ |
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
| [US38.8.3 — Hackathons & événements d'innovation](FEATURES/open-innovation/us-hackathons-evenements.md) | ⬜ |
| **F38.9 — KPIs, maturité & conformité ISO 56000** | |
| [US38.9.1 — KPIs & tableau de bord de l'innovation](FEATURES/kpis-maturite-iso/us-kpis-tableau-bord.md) | ⬜ |
| [US38.9.2 — Évaluation de maturité (ISO 56002/56004)](FEATURES/kpis-maturite-iso/us-maturite-iso-56002.md) | ⬜ |
| **F38.10 — Culture, participation & reconnaissance** | |
| [US38.10.1 — Engagement & participation](FEATURES/culture-reconnaissance/us-engagement-participation.md) | ⬜ |
| [US38.10.2 — Reconnaissance des contributeurs](FEATURES/culture-reconnaissance/us-reconnaissance-contributeurs.md) | ⬜ |
