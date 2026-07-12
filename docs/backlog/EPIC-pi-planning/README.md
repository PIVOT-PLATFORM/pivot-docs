# E50 — Module PI Planning

## Objectif

Organiser un **Program Increment SAFe** par **composition de modules existants**, plutôt qu'en réinventant chaque brique : cycle avec itérations générées automatiquement (IT1…ITn + itération IP), équipes du Train (saisie ou import), partage par rôle (RTE propriétaire, Scrum Masters éditeurs). **Program board** multi-équipes : tickets typés (Feature, Milestone, Risque, Objectif, Story, Enabler) placés par équipe × itération en glisser-déposer, ligne Train, colonne Non planifié, dépendances en flèches avec détection des boucles. Logistique et tâches de préparation intégrées en un clic depuis [E42 — Pivot Forms](pathname:///pivot-docs/backlog/EPIC-pivot-forms/) et [E49 — Module To-Do](pathname:///pivot-docs/backlog/EPIC-todo/).

> **Module de composition.** E50 n'est pas un silo : le calcul de capacité/vélocité par sprint et incrément reste porté par [E11 — Capacity Planning](pathname:///pivot-docs/backlog/EPIC-capacity-planning/) (cadence PI SAFe déjà modélisée, US11.5.1) — E50 ajoute la couche visuelle de planification cross-équipes (Program board) et l'orchestration du cycle, sans dupliquer le calcul de capacité.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-agilite-core`** (schéma Flyway `agilite`, FK → `public.teams.id`)
- Frontend : **`pivot-agilite-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre (phase-3)

### Features

- **F50.1 — Cycle PI et équipes du Train**
  - US50.1.1 : Créer un cycle PI avec itérations générées automatiquement et équipes du Train
- **F50.2 — Intégrations en un clic**
  - US50.2.1 : Rattacher un formulaire de logistique et un tableau de tâches de préparation au PI
- **F50.3 — Program Board**
  - US50.3.1 : Planifier le Program Board par équipe × itération
  - US50.3.2 : Gérer les dépendances entre tickets du Program Board

### Enablers

- **EN50.1** — [Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md)

## Hors périmètre (socle)

- **Temps réel Socket.io sur le Program board**, **ROAM des risques**, **confidence vote**, **duplication d'un PI**, **export PDF/image du board** — candidats v2 identifiés dans le POC, non livrés en socle (v0.31.0 reste en rafraîchissement manuel / sans ces extensions).

## Modules impactés

`agilite` (pivot-agilite-core + pivot-agilite-ui)

## Dépendances

- Dépend de : E01 Auth & IAM · E03 Système de modules · E17 Infrastructure multi-repo
- Dépend de : **E11 Capacity Planning** — cadence PI SAFe (US11.5.1), ce module n'en est pas une réimplémentation
- Interface avec : **E42 Pivot Forms** — formulaire de logistique rattaché en un clic
- Interface avec : **E49 Module To-Do** — tableau des tâches de préparation rattaché en un clic

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| [EN50.1 — Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md) | ⬜ |
| **F50.1 — Cycle PI et équipes du Train** | |
| [US50.1.1 — Créer un cycle PI avec itérations et équipes du Train](FEATURES/cycle-equipes-train/us-creer-cycle-pi.md) | ⬜ |
| **F50.2 — Intégrations en un clic** | |
| [US50.2.1 — Rattacher formulaire de logistique et tâches de préparation](FEATURES/integrations-1-clic/us-integrations-logistique-taches.md) | ⬜ |
| **F50.3 — Program Board** | |
| [US50.3.1 — Planifier le Program Board par équipe × itération](FEATURES/program-board/us-planifier-program-board.md) | ⬜ |
| [US50.3.2 — Gérer les dépendances entre tickets du Program Board](FEATURES/program-board/us-dependances-program-board.md) | ⬜ |

---
Item Type: Epic · Clé: E50 · Phase: phase-3 · Module: agilite
Stage: ⬜ · Priority: Medium
Source: PouetPouet (POC de référence, livré v0.31.0, plan `docs/specs/pi-planning-plan.md`) · audit de parité 2026-07-10
