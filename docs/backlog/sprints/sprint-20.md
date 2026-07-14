# Sprint 20 — Satellites Pilotage à valeur

> ✅ **Verrou Socle levé (2026-07-10).** Enchaîne la v0 Pilotage (S9-S17) + risques (S18). Créé au
> re-tri du 2026-07-10 : remonte les **satellites Pilotage à forte valeur** (E24/E26/E27 + E23
> vague 2) depuis [`backlog-post-s12.md`](./backlog-post-s12.md), **avant** la queue idéation (E40
> profil adaptatif, EN18.3-8 habillage entreprise). Voir [README §Séquencement](./README.md#sprints-79-1720--plan-phase-3-conditionnel-au-jalon--socle-terminé-).

**Scope :** satellites du domaine Pilotage qui s'appuient sur la colonne vertébrale v0 (roadmap,
Gantt, portefeuille) sans requérir le profil adaptatif ni l'habillage entreprise.
**Sortie :** ADR projet + budget projet + OKR socle + portefeuille vague 2 opérationnels.

**Gate 1 READINESS passé (2026-07-11)** — **22/23 Ready**. Seul non-ready : **US26.2.3** → dépend de
**US26.2.2** (budgets pluriannuels PPI, en idéation). Implémentables sur le socle S9 mergé : **EN27.1a**
(fondation OKR) → b/c, cluster **E24** (US24.1.x), cluster **E26** (US26.1.x, US26.2.1), cluster
**E23** (US23.2.3/2.5, chaîne 6a→6b→6c). Dépendances externes : bus ADR-025/EN28.4 (EN27.1d volet
rappels, US27.6.2). Décisions consolidées → commentaire de la PR Gate 1.

> **Préparation PO Agent :** items encore au stade stub — **Gate 1 (AC Given/When/Then + erreur +
> sécurité) réalisé par l'agent d'implémentation de chaque item**, même précédent que Sprint 8.
> Les US marquées `→ idéation` dans les READMEs d'EPIC restent hors périmètre (`BACKLOG-IDEATION`).

## Vague 1 — ADR projet + OKR socle + Budget (aucune dépendance mutuelle)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US24.1.1 | Créer un ADR (Architecture Decision Record) projet | M | High | ⬜ |
| US24.1.2 | Consulter et rechercher les ADRs d'un projet | S | Medium | ⬜ |
| EN27.1a | Modèle OKR & persistance (schéma pilotage) *(ex-EN27.1 XL, décomposé 2026-07-10)* | M | Critical | ⬜ |
| EN27.1b | Moteur d'avancement, score & statut OKR | L | Critical | ⬜ |
| EN27.1c | Alignement OKR : arbre & garde-fou anti-cycle | M | Critical | ⬜ |
| EN27.1d | Connecteurs OKR : auto-update KR, rappels & deep-links | L | Critical | ⬜ |
| US27.1.1 | Créer un OKR (objectif + Key Results) | M | Critical | ⬜ |
| US27.1.2 | Suivre un Key Result | M | Critical | ⬜ |
| US27.1.3 | Types de KR (métrique/jalon/booléen, pondération) | M | High | ⬜ |
| US26.1.1 | Saisir le budget d'un projet | M | High | ⬜ |
| US26.1.2 | Suivre la consommation budgétaire en temps réel | M | High | ⬜ |

## Vague 2 — OKR alignement/cadence + Budget avancé + Portefeuille vague 2

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US27.1.4 | Engageant vs aspirationnel + garde-fous | S | High | ⬜ |
| US27.2.1 | Cycles (trimestriel/annuel) | M | High | ⬜ |
| US27.3.1 | Arbre d'alignement | M | High | ⬜ |
| US27.6.1 | Initiatives ↔ KR | M | High | ⬜ |
| US27.6.2 | Interfaces pilotage (roadmap E22 / portefeuille E23 / risques E21) | M | Medium | ⬜ |
| US26.2.1 | Coûts au niveau projet | M | High | ⬜ |
| US26.2.3 | Flux de trésorerie | M | Medium | ⬜ |
| US23.2.3 | Revues & comités de portefeuille | M | High | ⬜ |
| US23.2.5 | Programmes | M | High | ⬜ |
| US23.2.6a | Modèle de plan stratégique & contrats d'objectifs *(ex-US23.2.6 XL)* | M | Medium | ⬜ |
| US23.2.6b | Rattachement projet ↔ objectif stratégique | M | Medium | ⬜ |
| US23.2.6c | Vue de suivi d'alignement & statut « non aligné » | M | Medium | ⬜ |

> **Dépendances :** EN27.1a (modèle) précède EN27.1b/c/d et toutes les US27.x · US27.6.2 dépend de la v0 E22/E23/E21 (S9-S18).
> **Restent en queue idéation / post-S20** : E27 F27.4-10 (check-ins, scoring, gouvernance),
> E26 F26.2 vague 2 (US26.2.2/2.4/2.5/2.6 → idéation), E23 US23.2.7/23.2.8 (what-if & business
> cases), US23.2.9/23.2.10 (livrables & valeur publique → idéation).
