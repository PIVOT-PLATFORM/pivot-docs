# EN49.3 — Catalogue des modèles de gouvernance SI

**Type d'enabler** : architecture (référentiel documentaire/comparatif — pas de réimplémentation
technique des modèles eux-mêmes)

**Objectif technique** : Exposer, comme **fiches comparables et sélectionnables**, les cinq
modèles d'organisation SI du benchmark « Organisations DSI dans les grands groupes » (section 1),
pour qu'un client puisse documenter, comparer et adopter le modèle correspondant à son
organisation — il ne s'agit pas de réimplémenter littéralement chacun de ces modèles (ex. les 4
types d'équipe de Team Topologies ne deviennent pas des entités métier PIVOT), mais de fournir un
outil de pilotage/documentation de gouvernance :

| Modèle | Principe | Outillage typique associé (référence, non implémenté ici) |
|--------|----------|-------------------------------------------------------------|
| **Gouvernance fédérée** (centrale / groupe / métier) | RACI par domaine entre DSI centrale, DSI Groupe et DSI métier | Cartographie applicative, CMDB Groupe |
| **Hub & Spoke** | Un hub central porte les capacités transverses (data, IA, cyber), détache des experts vers les métiers qui gardent la main sur leurs priorités | Plateforme de gestion des compétences/staffing, outils de collaboration transverse |
| **Platform + Marketplace interne** | La DSI Groupe expose des services (IAM, données, intégration, IA) en libre-service avec une tarification incitative plutôt qu'une gouvernance de contrainte | Catalogue de services / marketplace API, portail self-service, moteur FinOps/chargeback |
| **Team Topologies** | 4 types d'équipe (stream-aligned, platform, enabling, complicated-subsystem) alignés sur les flux de valeur plutôt que sur l'organigramme | Cartographie de flux de valeur, portail développeur interne (Backstage) |
| **Product Operating Model** | Financement par produits durables (équipe permanente, budget récurrent) plutôt que par projets ponctuels | Outillage de gestion produit (roadmapping, OKR), ALM Agile à l'échelle (Jira Align, Azure DevOps, SAFe) |

**Justification** : un client DSI a besoin de comparer ces modèles pour choisir/faire évoluer son
organisation, mais PIVOT n'a pas vocation à réimplémenter chacun de ces modèles comme fonctionnalité
propre (ex. Team Topologies) — c'est un outil de **documentation et d'aide à la décision**, pas
une automatisation de la structure organisationnelle décrite.

**Critères de complétion** :
- [ ] Entité `GovernanceModel` (schéma `pilotage`) : les 5 modèles ci-dessus en données de
      référence (nom, principe, avantages/limites, outillage typique associé)
- [ ] Rattachement d'un `GovernanceModel` adopté à l'organisation du client (EN49.1), avec
      justification et historique (un modèle est révisable dans le temps, cf. [US49.1.2](../FEATURES/pilotage-modeles-organisation/us-selection-modele-gouvernance.md))
- [ ] Les fiches modèle sont éditoriales (texte descriptif configurable), pas des entités métier
      dérivées (pas d'entité `Team Topologies Team` par exemple)
- [ ] Export/consultation du modèle adopté et de sa justification pour un comité de gouvernance

---
Item Type: Enabler · Parent: E49 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: Benchmark « Organisations DSI dans les grands groupes », section 1
Justification: Catalogue de référence nécessaire avant la sélection de modèle (US49.1.2)
Dépendances: EN49.1 (référentiel organisationnel)
