# Sprint 32 — Raffinage E52 — Clarté domaines Agilité & Collaboration (4 axes)

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration) ; S32 = raffinage de clôture. Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E52 Clarification & raffinage des domaines. **Sortie** : les fiches de
> clarification à 4 axes (entités & CRUD · accès par profil · mécanisme d'accès · API externes —
> cf. [EPIC-clarification-domaines/README.md](../EPIC-clarification-domaines/README.md)) des 6
> domaines Agilité (E09 Scrum Poker, E10 Daily Standup, E11 Capacity Planning, E19 Session live,
> E20 Retrospective, E50 PI Planning) sont produites, la fiche Collaboration (US52.1.8, whiteboard,
> livrée en Vague 1/Sprint 21) est étendue aux features F30.6/F30.7/F30.12/F30.14/F30.15 livrées en
> Sprints 29-31, et la synthèse transverse Agilité & Collaboration (matrice d'accès plateforme
> consolidée, cartographie des flux externes, liste des écarts arbitrés) est publiée — F52.3 du
> programme E52.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.collaboratif.*`) + `pivot-ui` (ADR-030). (Pour S32 raffinage : livrables documentaires `docs/architecture/domaines/`, aucun code.)
>
> **Dépendances** : framework E52 (EN52.1 Template de fiche, EN52.2 Référentiel d'accès consolidé,
> EN52.3 Registre des API externes — Vague 1, Sprint 21) ; domaines Agilité (E09/E10/E11/E19/E20/E50)
> et Collaboration (E30) livrés en Sprints 17-31 — E52 ne documente que l'existant, ne modifie aucun
> contrat d'API.
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (8)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US52.3.1 | Fiche domaine : Scrum Poker (E09) — 4 axes | M | Medium | ⬜ |
| US52.3.2 | Fiche domaine : Daily Standup (E10) — 4 axes | M | Medium | ⬜ |
| US52.3.3 | Fiche domaine : Capacity Planning (E11) — 4 axes | M | Medium | ⬜ |
| US52.3.4 | Fiche domaine : Session live (E19) — 4 axes | M | Medium | ⬜ |
| US52.3.5 | Fiche domaine : Retrospective (E20) — 4 axes | M | Medium | ⬜ |
| US52.3.6 | Fiche domaine : PI Planning (E50) — 4 axes | M | Medium | ⬜ |
| US52.3.7 | Fiche domaine Collaboration : extension E30 (IA, Continuum & intégrations, Innovation, Chantiers SI, Extensibilité) — 4 axes | L | High | ⬜ |
| US52.3.8 | Synthèse transverse Agilité & Collaboration (matrice d'accès plateforme, cartographie des flux externes, écarts arbitrés) | L | High | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 (+ S32 raffinage) garantissant **aucune
> US/Enabler des domaines Agilité/Collaboration non planifiée** ; le groupe F30.13 Licences est
> explicitement hors scope (pas de modèle payant). Items regroupés par domaine. F52.3 n'a, à la date
> de création de ce sprint, que le statut de **stub** dans
> [EPIC-clarification-domaines/README.md](../EPIC-clarification-domaines/README.md) (aucun fichier
> `us-*.md` créé) — les identifiants `US52.3.1`–`US52.3.8` ci-dessus sont **proposés** en suivant la
> convention établie par F52.1 (une fiche par domaine, US52.1.1–US52.1.9) et devront être formalisés
> en fichiers backlog individuels au démarrage du sprint (Gate 1).
