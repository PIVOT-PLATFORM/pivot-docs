# E18 — Domaine Pilotage

## Objectif

**Pilotage n'est pas un module mais un domaine** : un ensemble de **modules de capacité** autonomes, partageant le repo `pivot-pilotage-core` (schéma `pilotage`), chacun activable indépendamment et **composable dans les cockpits (vues composées)** du domaine.

> **Décision structurante — [ADR-008 Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).**
> L'intégration entre modules passe par le **bus d'événements PIVOT** et des **deep-links** — jamais de FK inter-modules (cf. ADR-006).

**Modèle de données du domaine** — une **Application** possède **1..n Projet** (Projet = version d'application, ou autre unité), et **relie toutes les données de chaque Projet** (jalons, budget, risques, décisions…). Voir [EN18.9 — Modèle Application → Projet](ENABLERS/en-modele-application-projet.md).

## Modules du domaine

Chaque module de capacité est désormais **un EPIC dédié** :

| Module | EPIC | Repo / schéma |
|--------|------|---------------|
| Roadmap / Gantt | [E22](../EPIC-roadmap/README.md) | pivot-pilotage-core · `pilotage` |
| Portefeuille projets | [E23](../EPIC-portefeuille/README.md) | pivot-pilotage-core · `pilotage` |
| ADR projet | [E24](../EPIC-adr-projet/README.md) | pivot-pilotage-core · `pilotage` |
| Commande publique | [E25](../EPIC-commande-publique/README.md) | pivot-pilotage-core · `pilotage` |
| Budget & suivi financier | [E26](../EPIC-budget/README.md) | pivot-pilotage-core · `pilotage` |
| OKR | [E27](../EPIC-okr/README.md) | pivot-pilotage-core · `pilotage` |
| Cahiers de tests | [E13](../EPIC-cahiers-tests/README.md) | pivot-pilotage-core · `pilotage` |
| **Gestion des risques** | [E21](../EPIC-risk/README.md) | pivot-risk-core · `risk` |
| Demande & arbitrage *(benchmark)* | [E31](../EPIC-demande-arbitrage/README.md) | pivot-pilotage-core · `pilotage` |
| Ressources & temps *(benchmark)* | [E32](../EPIC-ressources-temps/README.md) | pivot-pilotage-core · `pilotage` |
| Collaboration & tâches *(benchmark)* | [E33](../EPIC-pilotage-taches/README.md) | pivot-pilotage-core · `pilotage` |
| IA & agents *(benchmark)* | [E34](../EPIC-pilotage-ia/README.md) | pivot-pilotage-core · `pilotage` |
| Gouvernance & sécurité *(benchmark)* | [E35](../EPIC-pilotage-gouvernance/README.md) | pivot-pilotage-core · `pilotage` |
| Intégration SI *(benchmark)* | [E36](../EPIC-pilotage-integration-si/README.md) | pivot-pilotage-core · `pilotage` |
| Licences & réversibilité *(benchmark)* | [E37](../EPIC-pilotage-licences/README.md) | pivot-pilotage-core · `pilotage` |
| Management de l'innovation — SMI | [E38](../EPIC-pilotage-innovation/README.md) | pivot-pilotage-core · `pilotage` |
| Chantiers SI *(benchmark)* | [E39](../EPIC-pilotage-chantiers/README.md) | pivot-pilotage-core · `pilotage` |
| **Profil & adaptation *(v2)*** | [E40](../EPIC-profil-adaptation/README.md) | pivot-pilotage-core · `pilotage` |

> La gestion des risques « légère » (ex-F18.7) est supprimée — entièrement remplacée par le module dédié **[E21](../EPIC-risk/README.md)**.
>
> Les modules *benchmark* (E31–E39) et les Features `F22.2` / `F23.2` / `F26.2` proviennent du CSV d'analyse concurrentielle PPM — voir [BENCHMARK.md](../BENCHMARK.md). Roadmap (E22), Portefeuille (E23) et Budget (E26) sont **étendus** par ces items.

### Couche adaptative v2 (`Profils_applicables`)

La **v2 adaptative** du backlog PPM introduit **[E40 — Profil & adaptation](../EPIC-profil-adaptation/README.md)** : le **profil d'organisation** (TPE / PME / Grand groupe / Privée sous droit public / Publique / État) pilote l'activation des modules, la classe de souveraineté et le niveau de rigueur. Chaque US du domaine porte désormais un champ **`Profils:`** indiquant les profils applicables. Changements v2 notables :

- **E31 Demande & arbitrage dissoute** : what-if / business cases → E23 ; demande / scoring / capacité à faire / tout-est-projet → *hors v2* (conservés, à confirmer).
- **PP-017b Interface ERP finance** (variante privée) ajouté à E26 Budget (US26.2.4).
- MoSCoW « conditionnel » selon le profil (ex. interface comptable publique, RGAA, on-premise).

## Cockpits (vues composées)

Un **cockpit** est une vue composée qui agrège les widgets/vues des modules pertinents (via bus PIVOT + deep-links). Les **compositions concrètes restent à définir après une étude UX réelle** — proposition de départ dans [ADR-008](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).

## Enablers partagés du domaine

Le schéma et le guard sont mutualisés par les modules `pilotage` (E22–E27, E13) :

- **EN18.1** — Schéma Flyway `pilotage` + entités JPA (**Application**, Project, Milestone, PortfolioView, Adr, Consultation, Candidate) — hiérarchie **Application 1..n Projet** (cf. EN18.9)
- **EN18.2** — Guard Angular module pilotage (moduleGuard `moduleId: 'pilotage'`)
- **EN18.9** — [Modèle Application → Projet](ENABLERS/en-modele-application-projet.md) : Application possède 1..n Projet, relie toutes les données de chaque Projet
- **EN18.3** — Cloud/SaaS et RGPD *(benchmark)*
- **EN18.4** — Localisation FR et RGAA *(benchmark)*
- **EN18.5** — Performance de consolidation *(benchmark)*
- **EN18.6** — Administration sans code *(benchmark)*
- **EN18.7** — Hébergement France/UE *(benchmark)*
- **EN18.8** — Option on-premise *(benchmark)*

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses (pour associer un projet à une équipe)

## Statut global

⬜ Backlog — domaine décomposé en modules (E22–E27 + E21 + E13). Gate 1 PO Agent par module au démarrage du sprint.

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers partagés** | |
| EN18.1 — Schéma Flyway `pilotage` + entités JPA | ⬜ |
| EN18.2 — Guard Angular module pilotage | ⬜ |
| [EN18.3 — Cloud/SaaS et RGPD](ENABLERS/en-cloud-saas-rgpd.md) | ⬜ |
| [EN18.4 — Localisation FR et RGAA](ENABLERS/en-localisation-fr-rgaa.md) | ⬜ |
| [EN18.5 — Performance de consolidation](ENABLERS/en-performance-consolidation.md) | ⬜ |
| [EN18.6 — Administration sans code](ENABLERS/en-administration-sans-code.md) | ⬜ |
| [EN18.7 — Hébergement France/UE](ENABLERS/en-hebergement-france-ue.md) | ⬜ |
| [EN18.8 — Option on-premise](ENABLERS/en-option-on-premise.md) | ⬜ |
| [EN18.9 — Modèle Application → Projet](ENABLERS/en-modele-application-projet.md) | ⬜ |
| **Modules (EPICs dédiés)** | |
| [E22 — Roadmap / Gantt](../EPIC-roadmap/README.md) | ⬜ |
| [E23 — Portefeuille projets](../EPIC-portefeuille/README.md) | ⬜ |
| [E24 — ADR projet](../EPIC-adr-projet/README.md) | ⬜ |
| [E25 — Commande publique](../EPIC-commande-publique/README.md) | ⬜ |
| [E26 — Budget & suivi financier](../EPIC-budget/README.md) | ⬜ |
| [E27 — OKR](../EPIC-okr/README.md) | ⬜ |
| [E21 — Gestion des risques](../EPIC-risk/README.md) | ⬜ |
| **Couche adaptative v2 (E40)** | |
| [E40 — Profil & adaptation](../EPIC-profil-adaptation/README.md) | ⬜ |
| **Modules benchmark PPM (E31–E39)** | |
| [E31 — Demande & arbitrage](../EPIC-demande-arbitrage/README.md) | ⬜ |
| [E32 — Ressources & temps](../EPIC-ressources-temps/README.md) | ⬜ |
| [E33 — Collaboration & tâches](../EPIC-pilotage-taches/README.md) | ⬜ |
| [E34 — IA & agents](../EPIC-pilotage-ia/README.md) | ⬜ |
| [E35 — Gouvernance & sécurité](../EPIC-pilotage-gouvernance/README.md) | ⬜ |
| [E36 — Intégration SI](../EPIC-pilotage-integration-si/README.md) | ⬜ |
| [E37 — Licences & réversibilité](../EPIC-pilotage-licences/README.md) | ⬜ |
| [E38 — Management de l'innovation (SMI)](../EPIC-pilotage-innovation/README.md) | ⬜ |
| [E39 — Chantiers SI](../EPIC-pilotage-chantiers/README.md) | ⬜ |
