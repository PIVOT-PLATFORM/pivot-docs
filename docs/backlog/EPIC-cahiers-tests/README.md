# E13 — Module Cahiers de Tests (Pilotage qualité)

## Objectif

Gestion des tests manuels et de recette : création de cas de test, organisation en campagnes, exécution guidée, traçabilité des résultats et reporting qualité par projet.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation
- **Positionnement :** sous-module de pilotage qualité projet (lié aux projets E18)

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre (phase-3)

### Features
- **F13.1 — Cas de tests**
  - US13.1.1 : Créer et gérer des cas de test (titre, préconditions, étapes, résultat attendu)
  - US13.1.2 : Organiser les cas de test en suites (dossiers hiérarchiques)
- **F13.2 — Campagnes de recette**
  - US13.2.1 : Créer une campagne de test (sélection de cas, assignation testeurs, deadline)
  - US13.2.2 : Exécuter une campagne (guided mode : étape par étape, résultat PASS/FAIL/BLOCKED)
- **F13.3 — Reporting qualité**
  - US13.3.1 : Tableau de bord campagne (taux de succès, cas bloquants, progression)

### Enablers
- **EN13.1** — Schéma Flyway `pilotage` — tables `test_cases`, `test_suites`, `test_campaigns`, `test_executions`
- **EN13.2** — Guard Angular module cahiers-tests (moduleGuard `moduleId: 'cahiers-tests'`)

## Modules impactés

`pilotage` (pivot-pilotage-core + pivot-pilotage-ui)

## Dépendances

- Dépend de : E03 Système de modules
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Lien optionnel : E18 Pilotage projets (associer une campagne à un projet)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

Item Type: Epic · Clé: E13 · Phase: phase-3 · Module: pilotage
Stage: Backlog · Priority: Medium
