---
sidebar_position: 0
sidebar_label: "Vue produit"
---

# Produit — Technique transverse

> Fondations techniques communes à toute la plateforme : chaîne CI/CD et supply-chain,
> infrastructure de déploiement, observabilité, prérequis multi-repo. Aucune valeur
> utilisateur directe — uniquement des enablers au service des autres produits.

## EPICs rattachés

| Clé | EPIC | Phase | Statut |
|-----|------|-------|--------|
| E04 | [Observabilité](EPIC-observabilite/README.md) | MVP | ⬜ Sprint 4 |
| E05 | [CI/CD & Supply-chain](EPIC-cicd-supply-chain/README.md) | MVP | 🔄 EN05.1-12 ✅ |
| E07 | [Infrastructure & Déploiement](EPIC-infrastructure/README.md) | MVP | ⬜ Critical |
| E17 | [Infrastructure multi-repo](EPIC-infra-multi-repo/README.md) | phase-3 | ⬜ EN17.1-7 |

## Périmètre

- Workflows GitHub Actions, required checks, actions composites, scans sécurité (gitleaks, semgrep, ZAP)
- Docker Compose production, secret management, ActiveMQ, PgBouncer, deploy CI/CD
- Observabilité : logs structurés, métriques, health checks, alertes — sur tous les backends (`pivot-core` + `pivot-*-core`)
- Prérequis multi-repo : création autonome des repos modules (`pivot-collaboratif-*`, `pivot-agilite-*`, `pivot-pilotage-*`) sans dupliquer la logique socle
- TLS interne et scaling (v1-enterprise)

## Hors périmètre

Les fonctionnalités visibles des utilisateurs finaux — portées par les autres produits.
