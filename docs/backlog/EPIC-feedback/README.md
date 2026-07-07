# E46 — Feedback

## Objectif

Remontée de bugs et d'idées par les utilisateurs de la plateforme : kanban public (Analyse → Backlog → Implémentation → Parking → Fait), création et vote en temps réel, modération réservée aux admins.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-core`** (module `core`)
- Frontend : **`pivot-ui`** (module `core`)

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre (phase-3)

### Features

- **F46.1 — Soumission et vote**
  - US46.1.1 : Soumettre et voter pour un ticket de feedback
- **F46.2 — Gestion et modération**
  - US46.2.1 : Traiter et modérer les tickets de feedback

## Modules impactés

`core` (pivot-core + pivot-ui)

## Dépendances

- Dépend de : E01 Auth & IAM (identification de l'auteur d'un ticket)
- Dépend de : E03 Système de modules (activation de la fonctionnalité)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F46.1 — Soumission et vote** | |
| [US46.1.1 — Soumettre et voter pour un ticket de feedback](FEATURES/soumission-vote/us-soumettre-voter-ticket.md) | ⬜ |
| **F46.2 — Gestion et modération** | |
| [US46.2.1 — Traiter et modérer les tickets de feedback](FEATURES/gestion-moderation/us-moderer-tickets.md) | ⬜ |

---
Item Type: Epic · Clé: E46 · Phase: phase-3 · Module: core
Stage: Backlog · Priority: Low
