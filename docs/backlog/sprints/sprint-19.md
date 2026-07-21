# Sprint 19 — Agilité — Rétrospective + PI Planning

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E20 Rétrospective + E50 PI Planning. **Sortie** : rétrospective d'équipe
> complète (formats prédéfinis/custom, animation temps réel par phases, plan d'action suivi
> inter-session) et cycle PI Planning SAFe (itérations, équipes du Train, Program Board
> multi-équipes avec dépendances) livrés.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : E20 s'appuie sur E03 Système de modules + E17 Infrastructure multi-repo
> (EN17.1/EN17.3/EN17.5/EN17.6) + E15 Équipes transverses (livré S17). E50 s'appuie sur E01 Auth &
> IAM + E03 + E17, et sur **E11 Capacity Planning** (cadence PI SAFe, `US11.5.1`) pour la
> génération d'itérations du cycle PI — mais `US11.5.1` n'est livré qu'en **S21** (second lot
> Capacity Planning, après ce sprint). Couplage à trancher explicitement au Gate 1 de `US50.1.1` :
> soit une cadence par défaut découplée de `US11.5.1` en attendant S21, soit séquencer
> l'implémentation de `US50.1.1` après S21. `US20.1.2` (US mère XL) a été décomposée en
> `US20.1.2a/b/c` (Gate 1 PO Agent, 2026-07-10) — le fichier `US20.1.2` original n'est pas
> implémenté, seules les trois sous-US le sont.
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (13)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US20.1.1 | Créer une session de rétrospective | M | High | ⬜ |
| US20.1.2a | Contribution & révélation des cards | M | High | ⬜ |
| US20.1.2b | Phase Vote (dot-voting) | M | High | ⬜ |
| US20.1.2c | Phase Action (transition en session) | S | High | ⬜ |
| US20.2.1 | Formats de rétrospective prédéfinis et format custom | M | Medium | ⬜ |
| US20.3.1 | Créer et assigner des actions issues de la rétrospective | M | High | ⬜ |
| US20.3.2 | Revoir les actions de la rétro précédente au démarrage | S | Medium | ⬜ |
| EN20.3 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |
| US50.1.1 | Créer un cycle PI avec itérations et équipes du Train | L | Medium | ⬜ |
| US50.2.1 | Rattacher formulaire de logistique et tâches de préparation | M | Medium | ⬜ |
| US50.3.1 | Planifier le Program Board par équipe × itération | L | Medium | ⬜ |
| US50.3.2 | Gérer les dépendances entre tickets du Program Board | M | Medium | ⬜ |
| EN50.1 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
