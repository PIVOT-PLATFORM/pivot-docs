# Sprint 32 — E21 Risques — IA gouvernée, restitutions, cockpit & méthode DIT

> **Créé le 2026-07-13** — plan de **complétion à 100 % des domaines Pilotage (E18) & Risques (E21)**,
> séquencé **S21→S40** (ordre de priorité : E18 base → E21 Risques → E22 Roadmap → E27 OKR → E38
> Innovation *en surplus*). Vue d'ensemble : [README §Complétion Pilotage & Risques](./README.md).
>
> **Phase** : phase-3 · E21. **Sortie** : l'IA gouvernée, les restitutions par rôle, l'intégration cockpit projet et la méthode DIT (héritage SANDRA).
>
> **Dépendances** : Dépend du scoring/cycle de vie (S18) et de la boucle vivante (S31). F21.9 (cockpit) dépend de E22/E23 (S17+) ; F21.10 (méthode DIT) dépend d'EN21.1 étendu (RiskFactor/FactorImpact).
>
> **Statut** : ⬜ planifié — non démarré. Items encore au stade backlog : **Gate 1 READINESS
> (PO Agent) à réaliser au démarrage du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité),
> même précédent que les sprints précédents.

## Items (13)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US21.7.1 | Suggestion de risques par IA | L | Medium | ⬜ |
| US21.7.2 | Détection de signaux faibles | L | Medium | ⬜ |
| US21.7.3 | Aide à la rédaction d'actions | M | Low | ⬜ |
| US21.7.4 | Gouvernance de l'IA de risque | M | Medium | ⬜ |
| US21.8.1 | Vue chef de projet | M | High | ⬜ |
| US21.8.2 | Vue sponsor / COMEX | M | Medium | ⬜ |
| US21.8.3 | Vue Scrum Master | S | Medium | ⬜ |
| US21.8.4 | Vue Contract Manager | M | Medium | ⬜ |
| US21.8.5 | Export et rapport de risques | S | Medium | ⬜ |
| US21.8.6 | Accessibilité RGAA des vues | M | High | ⬜ |
| US21.9.1 | Corréler un risque à son projet via le bus PIVOT | M | High | ⬜ |
| US21.9.2 | Ouvrir les risques depuis la fiche projet (onglet + deep-link) | M | High | ⬜ |
| US21.9.3 | Widget « Top risques » composable dans un cockpit | M | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S21→S40 garantissant **aucune US des
> domaines Pilotage/Risques non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit
> les dépendances ci-dessus.
>
> ⚠️ **Nuance (2026-07-21)** : cette garantie visait à l'origine tout le bloc S21→S40. Depuis
> l'extraction du domaine Pilotage de PIVOT (2026-07-20, ADR-030), elle ne s'applique plus qu'au
> périmètre **Risques (E21)** qui reste dans PIVOT — voir `README.md` §Domaine Pilotage extrait.
