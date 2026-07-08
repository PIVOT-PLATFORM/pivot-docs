---
slug: /
sidebar_position: 0
sidebar_label: "Vue d'ensemble"
---

# Architecture Decision Records

| ADR | Titre | Statut |
|-----|-------|--------|
| [ADR-001](ADR-001-stack-technique.md) | Stack technique (Java/Spring Boot + Angular) | Accepté |
| [ADR-002](ADR-002-licence-agpl.md) | Licence AGPL-3.0 | Accepté |
| [ADR-003](ADR-003-systeme-modules.md) | Système de modules activables | Accepté |
| [ADR-004](ADR-004-oidc-multi-tenant.md) | OIDC Multi-tenant | Accepté |
| [ADR-005](ADR-005-opaque-tokens.md) | Opaque tokens (auth interne) | Accepté |
| [ADR-006](ADR-006-multi-repo-architecture.md) | Architecture multi-repo avec librairies partagées | Accepté |
| [ADR-007](ADR-007-design-system-angular-cdk.md) | Design system (Angular CDK + SCSS BEM) | Accepté |
| [ADR-008](ADR-008-domaines-modules-cockpits.md) | Domaines composables & cockpits | Proposé |
| [ADR-009](ADR-009-cadre-integration-open-source.md) | Cadre d'intégration open source | Proposé |
| [ADR-010](ADR-010-roadmap-gantt-modele-temporel.md) | Roadmap & Gantt : modèle temporel unique, parité MS Project en web | Proposé |
| [ADR-011](ADR-011-zero-trust-mtls-token-exchange.md) | Zero Trust : mTLS est-ouest, token exchange | Proposé |
| [ADR-012](ADR-012-plan-trafic-gateway-mesh-egress.md) | Plan de trafic : API Gateway + Service Mesh + Egress Gateway | Proposé |
| [ADR-013](ADR-013-autorisation-externalisee-policy-as-code.md) | Autorisation externalisée (policy-as-code) | Proposé |
| [ADR-014](ADR-014-secrets-credentials-externes-openbao.md) | Secrets & credentials externes (OpenBao, rotation) | Proposé |
| [ADR-015](ADR-015-zones-souverainete-segmentation.md) | Zones de souveraineté A/B/C & segmentation réseau | Proposé |
| [ADR-016](ADR-016-baseline-supply-chain-admission-modules.md) | Baseline supply-chain & gouvernance d'admission des modules | Proposé |
| [ADR-017](ADR-017-tiers-sensibilite-durcissement-modules.md) | Tiers de sensibilité cyber & durcissement gradué des modules | Proposé |

> **Numérotation ADR-018 à ADR-021** : réservées textuellement par ADR-009 §« ADR à produire » (modèle d'entités, stratégie de forks, bus d'événements, briques natives) — non encore rédigées. Renumérotées depuis ADR-011–014 pour laisser la place aux 6 ADR Sécurité (ADR-011–016), qui occupaient la première tranche disponible après ADR-010 ; puis décalées une seconde fois de 017–020 à 018–021 (2026-07-08) pour laisser la place à ADR-017 (tiers de sensibilité cyber), déclenchée par le benchmark ayant produit E49–E53.
