# E12 — Module MeetOps (Collaboration)

## Objectif

Gestion des réunions : préparation d'agenda, animation en temps réel, compte-rendus structurés et suivi des décisions / actions issues des réunions.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-collaboratif-core`** (schéma Flyway `collaboratif`, FK → `public.teams.id`)
- Frontend : **`pivot-collaboratif-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre (phase-3)

### Features
- **F12.1 — Préparation de réunion** — agenda, participants, durée par point
  - US12.1.1 : Créer une réunion avec agenda structuré
  - US12.1.2 : Inviter des participants et partager l'ordre du jour
- **F12.2 — Animation en temps réel**
  - US12.2.1 : Animer la réunion (timer par point agenda, point courant partagé via STOMP)
  - US12.2.2 : Saisir les décisions et actions pendant la réunion
- **F12.3 — Compte-rendu**
  - US12.3.1 : Générer et partager le compte-rendu post-réunion
  - US12.3.2 : Suivre les actions issues des réunions passées

### Enablers
- **EN12.1** — Schéma Flyway `collaboratif` — tables `meetings`, `agenda_items`, `meeting_decisions`, `meeting_actions`
- **EN12.2** — Guard Angular module meetops + STOMP room `/topic/collaboratif/meeting/{meetingId}`

## Modules impactés

`collaboratif` (pivot-collaboratif-core + pivot-collaboratif-ui)

## Dépendances

- Dépend de : E03 Système de modules
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

Item Type: Epic · Clé: E12 · Phase: phase-3 · Module: collaboratif
Stage: Backlog · Priority: Medium
