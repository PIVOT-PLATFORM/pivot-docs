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
| [ADR-017](ADR-017-chiffrement-repos-differentie.md) | Chiffrement au repos différencié par classe de données | Proposé |
| [ADR-018](ADR-018-chiffrement-e2e-cles-tenant.md) | Chiffrement de bout en bout et gestion des clés par tenant (modules critiques) | Proposé |
| [ADR-019](ADR-019-dlp-applicatif-exfiltration-api.md) | DLP applicatif : prévention de l'exfiltration par les API | Proposé |
| [ADR-020](ADR-020-journaux-audit-immuables-non-repudiation.md) | Journaux d'audit immuables et non-répudiation | Proposé |
| [ADR-021](ADR-021-cycle-vie-donnees-retention-purge.md) | Cycle de vie des données : rétention, anonymisation et purge sécurisée | Proposé |
| [ADR-022](ADR-022-principal-authentification-minimal-partage.md) | Principal d'authentification minimal partagé (`pivot-core-starter`) | Proposé |

> **Numérotation ADR-017 à ADR-020** : à l'origine réservées textuellement par ADR-009
> §« ADR à produire » (modèle d'entités, stratégie de forks, bus d'événements, briques natives).
> Finalement attribuées à la place à la vague d'ADR Protection des données (pivot-docs#144,
> 2026-07-08) — les quatre sujets réservés par ADR-009 restent donc **sans numéro attribué à ce
> jour** ; leur prochaine attribution devra reprendre à la première valeur libre au moment de leur
> rédaction (vérifier `docs/adr/` + PR ouvertes avant d'assigner, pas de calcul a priori — un tel
> écart de numérotation s'est déjà produit deux fois sur ce fichier).
