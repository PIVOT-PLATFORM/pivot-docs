# E24 — ADR projet

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](../EPIC-formation-onboarding/README.md) (US41.5.13).*

> Module de capacité du **domaine Pilotage** (E18) — cf. [ADR-008 Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).

## Objectif

Architecture Decision Records par projet : création, statuts, recherche full-text et historique des décisions.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage` partagé du domaine, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F24.1 — ADR projet**
  - US24.1.1 : Créer un ADR (Architecture Decision Record) projet
  - US24.1.2 : Consulter et rechercher les ADRs d'un projet

### Enablers
- Partagés au niveau du domaine Pilotage : **EN18.1** (schéma Flyway `pilotage` + entités JPA) · **EN18.2** (guard Angular `moduleId: 'pilotage'`)

## Modules impactés

`pilotage` (pivot-pilotage-core + pivot-pilotage-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses (association projet ↔ équipe)
- Dépend de : E18 Domaine Pilotage — enablers partagés EN18.1 (schéma `pilotage`) + EN18.2 (guard)
- Dépend de : E22 Roadmap (entité Project)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F24.1 — ADR projet** | |
| [US24.1.1 — Créer un ADR (Architecture Decision Record) projet](FEATURES/adr/us-creer-adr-projet.md) | ⬜ |
| [US24.1.2 — Consulter et rechercher les ADRs d'un projet](FEATURES/adr/us-consulter-adrs.md) | ⬜ |
