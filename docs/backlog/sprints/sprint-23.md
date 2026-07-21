# Sprint 23 — Collaboration — MeetOps + Mini-jeux

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E12 · E47. **Sortie** : MeetOps complet — préparation, animation,
> compte-rendu et pré-réservation de réunion depuis la roadmap — ainsi que les trois mini-jeux
> collaboratifs (Bingo des réunions, Post-it Rush, Trivia Agile).
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.collaboratif.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : socle `collaboratif` (STOMP temps réel, isolation multi-tenant) livré lors
> des sprints précédents du domaine Collaboration ; US12.4.1 dépend en amont de l'événement bus
> `roadmap.event.window.created` (EPIC-roadmap, hors périmètre de ce sprint).
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (9)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US12.1.1 | Créer une réunion avec agenda structuré | M | Medium | ⬜ |
| US12.2.1 | Animer la réunion en temps réel (point courant + timer) | L | Medium | ⬜ |
| US12.3.1 | Générer et partager le compte-rendu de réunion | M | Medium | ⬜ |
| US12.4.1 | Pré-réservation depuis une plage & proposition du meilleur créneau | L | Medium | ⬜ |
| EN12.3 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |
| US47.1.1 | Jouer au Bingo des réunions à plusieurs | M | Low | ⬜ |
| US47.2.1 | Jouer à Post-it Rush | M | Low | ⬜ |
| US47.3.1 | Jouer à Trivia Agile à plusieurs | M | Low | ⬜ |
| EN47.1 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
