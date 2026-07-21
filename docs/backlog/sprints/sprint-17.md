# Sprint 17 — Agilité — Scrum Poker (finition) + Référentiel Équipes

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E09 Scrum Poker + E15 Équipes. **Sortie** : planning poker finalisé et
> recetté (rooms, vote temps réel, participation anonyme, KPI) + référentiel Équipes (KPI) posé
> comme fondation cross-modules pour Capacity Planning et Rétrospective.
>
> **Note E09** : le socle Scrum Poker a déjà du code mergé récemment (parité planning poker —
> `pivot-core` #239/#240/#241, `pivot-ui` #234/#235/#236). Ce sprint est donc pour l'essentiel de
> la **finition + recette** plutôt que du net-new (`US09.1.3` jeu de cartes paramétrable et
> `EN09.1` isolation WebSocket restent hors fichier US écrit, non repris ici). Items listés
> ci-dessous quand même `⬜` — `Stage` non recetté par le mainteneur.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : E09 s'appuie sur E03 Système de modules + E17 Infrastructure multi-repo
> (acquis, socle `agilite` déjà amorcé depuis Sprint 8). E15 dépend d'E03 uniquement. E15
> (référentiel Équipes) livré ici lève un pré-requis pour E20 Rétrospective (S19) et E11 Capacity
> Planning (S20-S21), qui en dépendent tous deux.
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (8)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US09.1.1 | Créer une room de planning poker | M | High | ⬜ |
| US09.1.2 | Rejoindre une room de planning poker via code | S | High | ⬜ |
| US09.2.1 | Voter sur un ticket en temps réel | M | High | ⬜ |
| US09.2.2 | Révéler les votes et calculer le consensus | S | High | ⬜ |
| US09.2.3 | Reset et revote, validation de l'estimation finale | S | High | ⬜ |
| US09.3.1 | Participer anonymement à une room (sans compte) | M | Medium | ⬜ |
| EN09.2 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |
| EN15.7 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
