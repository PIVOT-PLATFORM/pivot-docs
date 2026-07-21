# Sprint 18 — Agilité — Daily Standup + La Roue

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E10 Daily Standup + E14 La Roue. **Sortie** : daily standup et roue de
> tirage utilisables de bout en bout — sessions CRUD, animation temps réel (minuteur/rotation),
> statistiques, tirage pondéré anti-repeat, diffusion WebSocket du résultat.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : E10 et E14 s'appuient sur E03 Système de modules + E17 Infrastructure
> multi-repo (acquis, socle `agilite` déjà amorcé). Aucune dépendance croisée entre les deux
> domaines de ce sprint (`US10.2.3`, `US10.3.2`, `US14.1.2` restent hors fichier US écrit, non
> repris ici).
>
> **Statut** : 🔎 en cours (2026-07-22) — Gate 1 READINESS à 100 sur les 5 US E10 Daily Standup
> ([pivot-docs#296](https://github.com/PIVOT-PLATFORM/pivot-docs/pull/296)), backend `pivot-core`
> implémenté et en review ([core#255](https://github.com/PIVOT-PLATFORM/pivot-core/pull/255)) —
> frontend `pivot-ui` (UX inspirée de PouetPouet) et E14 La Roue restent à traiter.

## Items (10)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US10.1.1 | Créer une session de daily standup | M | High | 🔧 backend en review ([core#255](https://github.com/PIVOT-PLATFORM/pivot-core/pull/255)) — frontend à faire |
| US10.1.2 | Démarrer et terminer une session daily standup | S | High | 🔧 backend en review ([core#255](https://github.com/PIVOT-PLATFORM/pivot-core/pull/255)) — frontend à faire |
| US10.2.1 | Minuteur configurable et rotation participants (temps réel) | M | High | 🔧 backend en review ([core#255](https://github.com/PIVOT-PLATFORM/pivot-core/pull/255)) — frontend à faire |
| US10.2.2 | Contrôler l'animation manuellement (passer, réordonner, étendre) | S | Medium | 🔧 backend en review ([core#255](https://github.com/PIVOT-PLATFORM/pivot-core/pull/255)) — frontend à faire |
| US10.3.1 | Consulter les statistiques d'une session terminée | M | Medium | 🔧 backend en review ([core#255](https://github.com/PIVOT-PLATFORM/pivot-core/pull/255)) — frontend à faire |
| EN10.1 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |
| US14.1.1 | Créer et gérer une roue de tirage | M | High | ⬜ |
| US14.2.1 | Effectuer un tirage pondéré anti-repeat | M | High | ⬜ |
| US14.3.1 | Diffusion du résultat du tirage en temps réel (WebSocket) | M | High | ⬜ |
| EN14.1 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
