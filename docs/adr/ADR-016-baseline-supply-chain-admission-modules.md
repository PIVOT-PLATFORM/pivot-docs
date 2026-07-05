# ADR-016 — Baseline supply-chain & gouvernance d'admission des modules

**Date :** 2026-07-05
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI, Lead intégration
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

Un portail qui intègre beaucoup d'open source (ADR-009) hérite d'un risque de chaîne d'approvisionnement. E05 (CI/CD & Supply-chain) couvre déjà SBOM/SLSA/SAST/SCA pour `pivot-core`/`pivot-ui`, mais **pas** pour les modules et adaptateurs tiers intégrés (Plane, n8n, Metabase, OpenProject…) — un angle mort identifié lors de la revue du blueprint sécurité.

## Décision

1. **Supply-chain des adaptateurs**, distincte d'E05 : SBOM par adaptateur, scan continu des dépendances (Renovate/Dependabot), artefacts signés et vérification de provenance (approche SLSA) avant tout déploiement.
2. **Registre des modules** (« CMDB de l'automatisation ») recensant propriétaire, version, criticité, dépendances et credentials de chaque module/adaptateur — sans lui, on ne sait pas ce qu'on expose.
3. **Checklist d'admission à neuf points**, qui étend le contrat d'intégration à six capacités (ADR-009 §4) d'un socle de sécurité : identité, secrets, autorisation, chiffrement, santé & observabilité, événements, souveraineté, résilience, supply chain. Un module qui ne coche pas ces cases reste en **mode Lien** (isolé, sans accès aux données sensibles) jusqu'à mise en conformité.
4. Gouvernance des forks déjà posée (ADR-009 §1, §6) : aucun amont non audité en production.

## Conséquences

- **Positif :** un adaptateur ne peut pas accéder à des données sensibles sans avoir satisfait une baseline de sécurité vérifiable ; comble l'angle mort supply-chain identifié entre E05 (PIVOT lui-même) et E28 (modules tiers).
- **Négatif :** ralentit l'admission d'un nouvel adaptateur tant que la checklist n'est pas satisfaite ; nécessite un outillage de scan dédié au parc d'adaptateurs (au-delà de celui déjà en place pour `pivot-core`/`pivot-ui`).
- **Interdit :** un module manipulant des données sensibles sans satisfaire la checklist à neuf points.

## Alternatives écartées

- Faire confiance par défaut à un adaptateur open source mature : contredit le principe « assume breach » — la maturité d'un projet amont ne garantit rien sur la sécurité de l'intégration spécifique à PIVOT.
- Étendre directement E05 aux modules tiers plutôt qu'une gouvernance dédiée : E05 est scopé aux repos PIVOT propres (CI/CD de `pivot-core`/`pivot-ui`) ; le parc d'adaptateurs tiers a un cycle de vie et des mainteneurs différents, nécessitant un outillage et une cadence de veille propres (EN28.12/EN28.13).

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-05 | Décision initiale |
