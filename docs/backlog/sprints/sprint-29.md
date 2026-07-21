# Sprint 29 — Collaboration — E30 IA + Continuum & intégrations

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration) ; S32 = raffinage de clôture. Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E30 Collaboration. **Sortie** : les capacités IA du board (clustering,
> génération par invite, synthèse en actions, gouvernance de l'IA, outils générés par prompt,
> agents IA collaboratifs, génération de compte-rendu) et les intégrations du continuum d'outils
> (visioconférence 1-clic, synchronisation gestion de projet, contenus synchronisés inter-apps,
> intégration outils de code) sont livrées.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.collaboratif.*`) + `pivot-ui` (ADR-030). (Pour S32 raffinage : livrables documentaires `docs/architecture/domaines/`, aucun code.)
>
> **Dépendances** : s'appuie sur le noyau whiteboard Socle F08.x/EN08.x (Sprints 10-16) et sur la
> sécurité & gouvernance E30 (Sprint 28) — cadre requis avant d'ouvrir l'exécution d'agents IA et
> les échanges de contenu inter-apps.
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (11)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US30.6.1 | IA : clustering des contributions | L | High | ⬜ |
| US30.6.2 | IA : génération par invite | L | High | ⬜ |
| US30.6.3 | IA : synthèse en actions | M | High | ⬜ |
| US30.6.4 | Gouvernance de l'IA | M | High | ⬜ |
| US30.6.5 | Outils générés par prompt | XL | Medium | ⬜ |
| US30.6.6 | Agents IA collaboratifs | XL | Medium | ⬜ |
| US30.6.7 | IA : génération de compte-rendu d'atelier | M | Medium | ⬜ |
| US30.7.1 | Intégration visioconférence 1-clic | L | High | ⬜ |
| US30.7.2 | Synchronisation gestion de projet | XL | High | ⬜ |
| US30.7.3 | Contenus synchronisés inter-apps | XL | High | ⬜ |
| US30.7.4 | Intégration outils de code | L | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 (+ S32 raffinage) garantissant **aucune
> US/Enabler des domaines Agilité/Collaboration non planifiée** ; le groupe F30.13 Licences est
> explicitement hors scope (pas de modèle payant). Items regroupés par feature.
