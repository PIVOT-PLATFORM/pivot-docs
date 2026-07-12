# E46 — Feedback

## Objectif

Remontée de bugs et d'idées par les utilisateurs de la plateforme : kanban public (Analyse → Backlog → Implémentation → Parking → Fait), création et vote, modération réservée aux admins. Portée volontairement **transverse à toute la plateforme** (pas de notion d'équipe ou de board) — d'où son rattachement à `core` plutôt qu'à un domaine module ; les votes se rafraîchissent via le mécanisme de notification in-app existant (EN-NOTIF, Sprint 4), pas une room WebSocket dédiée comme les modules temps réel des domaines `collaboratif`/`agilite`.

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

### Enablers

- **EN46.1** — [Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md)

## Repères marché (benchmark POC)

Benchmark détaillé : `pivot-benchmarks/modules-poc-marche/` — cahiers Typeform, Slido, Canny, Frill, dossier
de synthèse (juillet 2026). Le périmètre socle actuel (kanban 5 colonnes + vote + modération, sans roadmap
publique ni changelog dédiés) est **confirmé cohérent** par comparaison à Frill, la référence de borne basse
du marché — pas un écart à combler en urgence. Raffinements à qualifier au Gate 1 :

- Fusion de deux tickets similaires par un admin, cumulant leurs votes respectifs — pattern Canny → US46.2.1
- Protection anti-abus dès le socle sur la soumission publique (rate-limit ou équivalent), pas réservée à une
  option payante comme chez Typeform → US46.1.1
- Compteur de votes visible et tri du kanban par popularité — pattern Slido → US46.1.1

Roadmap publique en lecture seule et notification de clôture de ticket (Frill, Canny) restent des extensions
non prioritaires, cohérentes avec la Priority Low déjà affectée à E46.

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
| **Enablers** | |
| [EN46.1 — Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md) | ⬜ |
| **F46.1 — Soumission et vote** | |
| [US46.1.1 — Soumettre et voter pour un ticket de feedback](FEATURES/soumission-vote/us-soumettre-voter-ticket.md) | ⬜ |
| **F46.2 — Gestion et modération** | |
| [US46.2.1 — Traiter et modérer les tickets de feedback](FEATURES/gestion-moderation/us-moderer-tickets.md) | ⬜ |

---
Item Type: Epic · Clé: E46 · Phase: phase-3 · Module: core
Stage: ⬜ · Priority: Low
