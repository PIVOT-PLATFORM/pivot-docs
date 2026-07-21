# Sprint 22 — Collaboration — Module Session (QUIZ/POLL/WORDCLOUD/BRAINSTORM/QA/VOTE)

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E19. **Sortie** : le module Session live complet — création, animation
> et clôture d'une session, participation temps réel (authentifiée ou anonyme), six types
> d'activités interactives (QUIZ/POLL/WORDCLOUD/BRAINSTORM/QA/VOTE) et restitution/export des
> résultats.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.collaboratif.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : socle `collaboratif` (STOMP temps réel, isolation multi-tenant) livré lors
> des sprints précédents du domaine Collaboration.
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (13)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US19.1.1 | Créer une session live | M | Critical | ⬜ |
| US19.1.2 | Démarrer, mettre en pause et terminer une session live | M | Critical | ⬜ |
| US19.2.1 | Rejoindre une session via code court (authentifié ou anonyme) | M | Critical | ⬜ |
| US19.2.2 | Vue participant en temps réel (affichage adapté au type d'activité) | XL | Critical | ⬜ |
| US19.3.1 | Activité QUIZ — quiz interactif réseau multijoueur | L | High | ⬜ |
| US19.3.2 | Activité POLL — sondage instantané avec résultats temps réel | M | High | ⬜ |
| US19.3.3 | Activité WORDCLOUD — nuage de mots collaboratif | M | High | ⬜ |
| US19.3.4 | Activité BRAINSTORM — post-its virtuels collaboratifs | M | High | ⬜ |
| US19.3.5 | Activité Q&A — questions des participants avec upvotes | M | High | ⬜ |
| US19.3.6 | Activité VOTE — prise de décision structurée (Fist-to-Five / pondéré) | L | High | ⬜ |
| US19.4.1 | Afficher les résultats de la session en temps réel (vue animateur) | L | High | ⬜ |
| US19.4.2 | Exporter les résultats d'une session terminée | M | Medium | ⬜ |
| EN19.4 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
