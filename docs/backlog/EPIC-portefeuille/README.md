# E23 — Portefeuille projets

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.12).*

> Module de capacité du **domaine Pilotage** (E18) — cf. [ADR-008 Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).

## Objectif

Portefeuille projets : tableau de bord consolidé multi-projets (indicateurs RAG) et rapports d'avancement.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage` partagé du domaine, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F23.1 — Portefeuille projets**
  - US23.1.1 : Tableau de bord portefeuille projets
  - US23.1.2 : Générer un rapport d'avancement du portefeuille
- **F23.2 — Portefeuille & comités (benchmark PPM)** — issu du CSV benchmark, rationalisé dans le README d'[E18 — Domaine Pilotage](../BACKLOG-IDEATION/EPIC-pilotage/README.md) (le document source `BENCHMARK.md` n'a jamais été mergé sur `main`, ex-PR #38)
  - US23.2.1 : Vue portefeuille consolidée
  - US23.2.2 : Tableaux de bord personnalisables
  - US23.2.3 : Revues et comités outillés
  - US23.2.4 : Météo et indicateurs normalisés
  - US23.2.5 : Gestion de programmes
  - US23.2.6 : Pilotage des plans stratégiques
  - US23.2.7 : Scénarios what-if *(déplacé depuis E31 en v2)*
  - US23.2.8 : Business cases dynamiques *(déplacé depuis E31 en v2)*
  - *(US23.2.9 Livrables d'instance générés → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-portefeuille/FEATURES/portefeuille-comites/us-livrables-instance-generes.md) 2026-07-09 — secteur public uniquement)*
  - *(US23.2.10 Indicateurs de valeur publique → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-portefeuille/FEATURES/portefeuille-comites/us-indicateurs-valeur-publique.md) 2026-07-09 — secteur public uniquement)*

### Enablers
- Partagés au niveau du domaine Pilotage : **EN18.1** (schéma Flyway `pilotage` + entités JPA) · **EN18.2** (guard Angular `moduleId: 'pilotage'`)
- **EN23.1** — [Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md)

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
| **F23.1 — Portefeuille projets** | |
| [US23.1.1 — Tableau de bord portefeuille projets](FEATURES/portfolio/us-tableau-bord-portfolio.md) | ⬜ |
| [US23.1.2 — Générer un rapport d'avancement du portefeuille](FEATURES/portfolio/us-rapport-avancement.md) | ⬜ |
| **F23.2 — Portefeuille & comités (benchmark PPM)** | |
| [US23.2.1 — Vue portefeuille consolidée](FEATURES/portefeuille-comites/us-vue-portefeuille-consolidee.md) | ⬜ |
| [US23.2.2 — Tableaux de bord personnalisables](FEATURES/portefeuille-comites/us-tableaux-bord-personnalisables.md) | ⬜ |
| [US23.2.3 — Revues et comités outillés](FEATURES/portefeuille-comites/us-revues-comites-outilles.md) | ⬜ |
| [US23.2.4 — Météo et indicateurs normalisés](FEATURES/portefeuille-comites/us-meteo-indicateurs-normalises.md) | ⬜ |
| [US23.2.5 — Gestion de programmes](FEATURES/portefeuille-comites/us-gestion-programmes.md) | ⬜ |
| [US23.2.6 — Pilotage des plans stratégiques](FEATURES/portefeuille-comites/us-plans-strategiques.md) | ⬜ |
| [US23.2.7 — Scénarios what-if](FEATURES/portefeuille-comites/us-scenarios-what-if.md) | ⬜ |
| [US23.2.8 — Business cases dynamiques](FEATURES/portefeuille-comites/us-business-cases-dynamiques.md) | ⬜ |
| *(US23.2.9 — Livrables d'instance générés → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-portefeuille/FEATURES/portefeuille-comites/us-livrables-instance-generes.md))* | — |
| *(US23.2.10 — Indicateurs de valeur publique → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-portefeuille/FEATURES/portefeuille-comites/us-indicateurs-valeur-publique.md))* | — |
| [EN23.1 — Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md) | ⬜ |
