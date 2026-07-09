# EN07.13 — Politique de versioning API publique & portail développeur

**Type d'enabler** : architecture · API

**Objectif technique** : Définir et outiller une politique de versioning des API exposées par
la plateforme (règles de compatibilité ascendante, cycle de dépréciation, schéma de version
dans l'URL ou les headers) et un point d'entrée documentaire unique (portail développeur ou
catalogue OpenAPI centralisé) permettant à un intégrateur tiers de découvrir et consommer les
API PIVOT sans connaître la découpe interne en modules/repos.

**Justification** : PIVOT documente déjà ses contrats API en interne (OpenAPI/Swagger par
module, annotations de sensibilité DLP sur les schémas — `ADR-019`) et gouverne strictement les
changements de contrat entre repos internes (`PivotModule`, hard block Gate 4). Mais rien
n'encadre aujourd'hui la stabilité d'une API vis-à-vis d'un consommateur **externe** : ni règle
de versioning publiée, ni politique de dépréciation, ni portail unique — seul `US30.12.1` (API
publique documentée) existe, et il est scopé au seul domaine collaboratif (canevas), pas à la
plateforme. Sans politique transverse, chaque module risque de publier sa propre convention de
versioning API, ou aucune — un pilier `API-first` incomplet dès la première intégration tierce
réelle.

**Critères de complétion** :
- [ ] Politique de versioning publiée (ex. `/api/v{n}/`, règle de compatibilité ascendante,
      durée de support d'une version dépréciée) — applicable à `pivot-core` et à tout module
      exposant une API destinée à des intégrateurs tiers
- [ ] Catalogue centralisé des schémas OpenAPI de tous les modules actifs, accessible depuis un
      point d'entrée unique (portail développeur ou agrégation Swagger UI multi-modules)
- [ ] Un changement d'API breaking sans montée de version majeure est détectable en CI (ex.
      diff de schéma OpenAPI entre releases, bloquant si breaking non annoncé)
- [ ] Documentation du processus de dépréciation (annonce, délai minimal, communication aux
      consommateurs) référencée depuis `US30.12.1` et tout futur Enabler d'API publique par
      module

**Dépendances** : `US30.12.1` (API publique documentée, domaine collaboratif — premier
consommateur réel de cette politique transverse), EN43.2 (API Gateway nord-sud — point de
passage naturel pour appliquer le versioning en entrée)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E07 · Type: architecture · Module: core · Phase: phase-3 · Size: L
Stage: Backlog · Priority: Medium
