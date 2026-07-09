# EN07.12 — Bascule infrastructure MVP → cible cloud managée/orchestrée

**Type d'enabler** : architecture · infrastructure

**Objectif technique** : Évaluer et documenter (ADR) la trajectoire de bascule depuis le
déploiement MVP actuel — une VM Compute Engine unique, stack Docker Compose stateful
(EN07.6, `pivot-infra`) — vers une cible cloud-native réellement élastique : base de données et
cache managés (ex. Cloud SQL, Memorystore) + compute orchestré/serverless (ex. GKE, Cloud Run)
permettant un scaling horizontal piloté par la charge, pas seulement configuré à l'avance.

**Justification** : `pivot-infra/README.md` acte explicitement que la cible managée est
« a separate, bigger decision — out of scope for an MVP test » et EN07.6 documente lui-même
cette VM unique comme « pas encore la cible prod finale (pas de HA, pas de disque persistant
séparé, cert auto-signé) ». `platform-overview.md` documente déjà le design applicatif pour le
scaling horizontal (pools nginx par module, état partagé via Redis, migrations Flyway avec
verrou consultatif) et EN07.10 (v1-enterprise) prévoit *N instances de `pivot-core`
configurées*, mais rien ne couvre aujourd'hui la bascule de l'hôte lui-même vers une
infrastructure orchestrée/managée. Sans cet Enabler, l'élasticité horizontale reste un design
applicatif non éprouvé sur une infra qui ne peut pas la démontrer — un des piliers cloud-native
de la cible d'architecture (`Cloud-native`, cf. audit-architecture) reste seulement partiel.

**Critères de complétion** :
- [ ] ADR proposant une cible cloud managée/orchestrée (options évaluées : GKE vs Cloud Run vs
      autre, avec critères de choix explicites — coût, complexité opérationnelle pour une
      équipe réduite, portabilité hors GCP compte tenu de la posture anti-lock-in AGPL du
      projet)
- [ ] Migration PostgreSQL/Redis vers des services managés équivalents (Cloud SQL,
      Memorystore ou alternatives), avec plan de migration des données sans interruption
- [ ] Preuve de scaling horizontal réel : au moins 2 instances `pivot-core` actives
      simultanément derrière l'équilibrage de charge cible, avec bascule de charge observée
- [ ] Health checks et readiness/liveness probes compatibles avec l'orchestrateur cible
      (au-delà des endpoints Actuator déjà exposés, cf. EN04.2)
- [ ] Plan de bascule documenté (étapes, rollback, fenêtre de maintenance ou zero-downtime)
- [ ] Coût cible estimé et comparé au coût MVP actuel (~30 $/mois documenté dans
      `pivot-infra/README.md`)

**Dépendances** : EN07.6 (Hébergement GCP en IaC — baseline MVP dont cet Enabler prend le
relais), EN07.1 (Docker Compose production complet), EN07.10 (Scaling N instances pivot-core —
précédent applicatif direct, à réconcilier avec la cible orchestrée)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E07 · Type: architecture · Module: core · Phase: phase-3 · Size: XL
Stage: Backlog · Priority: Medium
