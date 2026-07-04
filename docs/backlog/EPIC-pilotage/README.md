# E18 — Domaine Pilotage

## Objectif

**Pilotage n'est pas un module mais un domaine** : un ensemble de **modules de capacité** autonomes, partageant le repo `pivot-pilotage-core` (schéma `pilotage`), chacun activable indépendamment et **composable dans les cockpits des personas** concernés.

> **Décision structurante — [ADR-008 Domaines composables & cockpits par persona](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).**
> L'intégration entre modules passe par le **bus d'événements PIVOT** et des **deep-links** — jamais de FK inter-modules (cf. ADR-006).

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

> La gestion des risques « légère » (ex-F18.7) est supprimée — entièrement remplacée par le module dédié **[E21](../EPIC-risk/README.md)**.

## Cockpits par persona

Un **cockpit** est une vue composée, propre à un persona, qui agrège les widgets/vues des modules pertinents (via bus PIVOT + deep-links). Personas et compositions **à définir** — proposition de départ dans [ADR-008](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).

## Enablers partagés du domaine

Le schéma et le guard sont mutualisés par les modules `pilotage` (E22–E27, E13) :

- **EN18.1** — Schéma Flyway `pilotage` + entités JPA (Project, Milestone, PortfolioView, Adr, Consultation, Candidate)
- **EN18.2** — Guard Angular module pilotage (moduleGuard `moduleId: 'pilotage'`)

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
| **Modules (EPICs dédiés)** | |
| [E22 — Roadmap / Gantt](../EPIC-roadmap/README.md) | ⬜ |
| [E23 — Portefeuille projets](../EPIC-portefeuille/README.md) | ⬜ |
| [E24 — ADR projet](../EPIC-adr-projet/README.md) | ⬜ |
| [E25 — Commande publique](../EPIC-commande-publique/README.md) | ⬜ |
| [E26 — Budget & suivi financier](../EPIC-budget/README.md) | ⬜ |
| [E27 — OKR](../EPIC-okr/README.md) | ⬜ |
| [E21 — Gestion des risques](../EPIC-risk/README.md) | ⬜ |
