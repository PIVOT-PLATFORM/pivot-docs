# Sprint 20 — Agilité — Capacity Planning (v1)

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E11 Capacity Planning (1er lot, F11.1→F11.4). **Sortie** : événements de
> capacité (création + vue calendrier), membres d'équipe et absences saisies manuellement,
> hiérarchie d'événements (Sprint sous PI), suivi de vélocité et burndown chart.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : E11 s'appuie sur E03 Système de modules + E17 Infrastructure multi-repo + E15
> Équipes transverses (livré S17, FK `public.teams`). Interface avec E22 Roadmap (`EN22.3`,
> calendriers/jours fériés par localité) — hors périmètre de ce lot, à traiter en dette si
> `EN22.3` n'est pas encore livré au moment de l'implémentation. Ce sprint couvre F11.1→F11.4
> (événements, membres/absences manuelles, hiérarchie, vélocité/burndown) ; le moteur de calcul de
> capacité (F11.5→F11.8 + enablers) est livré en S21.
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (7)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US11.1.1 | Créer un événement de capacité | M | High | ⬜ |
| US11.1.2 | Visualiser la capacité de l'équipe sur un calendrier | M | High | ⬜ |
| US11.2.1 | Gérer les membres de l'équipe et leur disponibilité | S | High | ⬜ |
| US11.2.2 | Saisir les absences et jours non disponibles | M | High | ⬜ |
| US11.3.1 | Créer une hiérarchie d'événements (Sprint sous PI Planning) | M | Medium | ⬜ |
| US11.4.1 | Saisir la vélocité réelle d'un sprint | S | High | ⬜ |
| US11.4.2 | Visualiser le burndown chart du sprint | M | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
