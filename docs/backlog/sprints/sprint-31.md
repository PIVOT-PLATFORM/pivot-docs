# Sprint 31 — Collaboration — E30 Extensibilité + Enablers transverses

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration) ; S32 = raffinage de clôture. Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E30 Collaboration. **Sortie** : l'écosystème d'extensibilité du board (API
> publique documentée, marketplace d'intégrations, widgets communautaires) et l'ensemble des
> enablers transverses non-fonctionnels (latence temps réel, disponibilité, résilience réseau,
> localisation, fluidité, chargement initial, montée en charge, latence d'encrage, accessibilité
> WCAG, stabilité fonctionnelle, statistiques d'usage, mode dégradé, import Klaxoon, exposition
> KPI) sont complets — clôture du volet code du domaine Collaboration.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.collaboratif.*`) + `pivot-ui` (ADR-030). (Pour S32 raffinage : livrables documentaires `docs/architecture/domaines/`, aucun code.)
>
> **Dépendances** : s'appuie sur l'ensemble des sprints E30 précédents (Sprints 17-30) — l'API
> publique et le marketplace exposent des capacités déjà livrées ; les enablers transverses
> consolident la qualité de service du domaine avant la clôture code et le raffinage S32.
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (17)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US30.12.1 | API publique documentée | L | High | ⬜ |
| US30.12.2 | Marketplace d'intégrations | XL | Medium | ⬜ |
| US30.12.3 | Widgets communautaires | L | Medium | ⬜ |
| EN30.1 | Latence temps réel < 500 ms | L | Critical | ⬜ |
| EN30.2 | Disponibilité 99,9 % | L | Critical | ⬜ |
| EN30.3 | Résilience réseau | L | Critical | ⬜ |
| EN30.4 | Localisation FR/EN | S | Critical | ⬜ |
| EN30.5 | Fluidité sur boards chargés | XL | High | ⬜ |
| EN30.6 | Chargement initial < 3 s | L | High | ⬜ |
| EN30.7 | Montée en charge d'atelier | L | High | ⬜ |
| EN30.8 | Latence d'encrage < 50 ms | L | High | ⬜ |
| EN30.9 | Accessibilité WCAG 2.1 AA | L | High | ⬜ |
| EN30.10 | Stabilité fonctionnelle | S | High | ⬜ |
| EN30.11 | Statistiques d'usage | M | High | ⬜ |
| EN30.12 | Mode dégradé consultation | M | Medium | ⬜ |
| EN30.13 | Import de tableaux Klaxoon (.klx) | M | Medium | ⬜ |
| EN30.14 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 (+ S32 raffinage) garantissant **aucune
> US/Enabler des domaines Agilité/Collaboration non planifiée** ; le groupe F30.13 Licences est
> explicitement hors scope (pas de modèle payant). Items regroupés par feature. Les enablers
> `EN08.x` (socle whiteboard : auth cross-service, guard Angular, modèle Card typé, test de contrat
> wire, isolation WebSocket room) sont hors périmètre — déjà couverts par les Sprints 10-16.
