# E49 — Module To-Do

## Objectif

Gestion de tâches personnelles ou partagées : listes avec priorité et échéance, suivi par statut (à faire / en cours / bloqué / fait / annulé), vue kanban, assignation multiple, mise en favori, et tableau de bord consolidant plusieurs listes en une vue avec rapports. Module générique et transverse, réutilisé par d'autres modules PIVOT via une intégration en un clic — notamment [E50 — PI Planning](pathname:///pivot-docs/backlog/EPIC-pi-planning/) qui y rattache son tableau des tâches de préparation.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-todo-core`** (schéma Flyway `todo`, FK → `public.teams.id`)
- Frontend : **`pivot-todo-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre (phase-3)

### Features

- **F49.1 — Listes de tâches**
  - US49.1.1 : Gérer ses listes de tâches personnelles ou partagées
- **F49.2 — Statuts et suivi**
  - US49.2.1 : Suivre l'avancement des tâches (statuts étendus, kanban, assignation multiple)
- **F49.3 — Tableau de bord consolidé**
  - US49.3.1 : Consolider plusieurs listes de tâches en un tableau de bord avec rapports

### Enablers

- **EN49.1** — [Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md)

## Repères marché (source POC)

Livré dans le POC PouetPouet en v0.30.0 (socle + dashboard) puis v0.31.0 (statuts En cours/Bloqué, vue
kanban, assignation multiple — ajoutés pour les besoins du module PI Planning). Le tableau de bord
consolidé reprend le même pattern d'accès transitif que Portefeuille→Roadmap (E23→E22) : un rôle sur le
dashboard donne un accès lecture aux listes rattachées sans partage individuel de chacune.

## Modules impactés

`todo` (pivot-todo-core + pivot-todo-ui)

## Dépendances

- Dépend de : E01 Auth & IAM · E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo
- Interface avec : **E50 PI Planning** — tableau des tâches de préparation rattaché en un clic à un PI

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F49.1 — Listes de tâches** | |
| [US49.1.1 — Gérer ses listes de tâches personnelles ou partagées](FEATURES/listes-taches/us-gerer-listes-taches.md) | ⬜ |
| **F49.2 — Statuts et suivi** | |
| [US49.2.1 — Suivre l'avancement des tâches](FEATURES/statuts-suivi/us-suivre-avancement-taches.md) | ⬜ |
| **F49.3 — Tableau de bord consolidé** | |
| [US49.3.1 — Consolider plusieurs listes en un tableau de bord](FEATURES/dashboard-consolide/us-dashboard-consolide.md) | ⬜ |
| **Enablers** | |
| [EN49.1 — Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md) | ⬜ |

---
Item Type: Epic · Clé: E49 · Phase: phase-3 · Module: todo
Stage: ⬜ · Priority: Medium
Source: PouetPouet (POC de référence, livré v0.30.0 + v0.31.0) · audit de parité 2026-07-10
