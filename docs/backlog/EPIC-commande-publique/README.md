# E25 — Commande publique

> Module de capacité du **domaine Pilotage** (E18) — cf. [ADR-008 Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).

## Objectif

Commande publique : consultations et appels d'offres, suivi des candidats, analyse des offres (grille pondérée) et attribution des marchés.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage` partagé du domaine, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F25.1 — Commande publique**
  - US25.1.1 : Créer et gérer une consultation (appel d'offres)
  - US25.1.2 : Suivre les candidats et analyser les offres
  - US25.1.3 : Attribuer le marché et notifier les candidats

### Enablers
- Partagés au niveau du domaine Pilotage : **EN18.1** (schéma Flyway `pilotage` + entités JPA) · **EN18.2** (guard Angular `moduleId: 'pilotage'`)

## Modules impactés

`pilotage` (pivot-pilotage-core + pivot-pilotage-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses (association projet ↔ équipe)
- Dépend de : E18 Domaine Pilotage — enablers partagés EN18.1 (schéma `pilotage`) + EN18.2 (guard)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F25.1 — Commande publique** | |
| [US25.1.1 — Créer et gérer une consultation (appel d'offres)](FEATURES/commande-publique/us-creer-consultation.md) | ⬜ |
| [US25.1.2 — Suivre les candidats et analyser les offres](FEATURES/commande-publique/us-suivi-candidats.md) | ⬜ |
| [US25.1.3 — Attribuer le marché et notifier les candidats](FEATURES/commande-publique/us-attribution-notification.md) | ⬜ |
