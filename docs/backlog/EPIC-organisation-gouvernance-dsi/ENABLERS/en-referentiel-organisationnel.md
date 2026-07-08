# EN49.1 — Référentiel organisationnel

**Type d'enabler** : architecture (socle de données du domaine Pilotage — organisation)

**Objectif technique** : Poser le modèle de données de l'organisation d'un client DSI — une
**unité organisationnelle** (nom, type, unité parente) formant une hiérarchie arborescente
(DSI Groupe, DSI métier, DSI centrale, direction métier, département, équipe…), et le
**rattachement** d'une personne ou d'une équipe ([E15](../../EPIC-equipes/README.md)) à une unité
organisationnelle. Ce référentiel est la brique de base sur laquelle s'appuient [EN49.2](en-modele-roles-raci.md)
(rôle porté par une personne, situé dans une unité) et [EN49.3](en-catalogue-modeles-gouvernance.md)
(un modèle de gouvernance s'applique à une organisation décrite par ce référentiel).

**Justification** : sans référentiel organisationnel structuré, ni la matrice RACI (EN49.2) ni le
choix d'un modèle de gouvernance (EN49.3) ne peuvent être rattachés à une structure réelle — les
rôles et décisions resteraient déconnectés de l'organisation qu'ils gouvernent. Ce référentiel
évite également que chaque EPIC consommateur (E50/E51/E52/E53) réimplémente sa propre notion
d'unité organisationnelle.

**Critères de complétion** :
- [ ] Entité `OrgUnit` (schéma `pilotage`) : `nom`, `type` (ex. DSI Groupe, DSI métier, DSI
      centrale, direction métier, département, équipe), `parent_id` (auto-référence, hiérarchie)
- [ ] Contrainte d'intégrité : une `OrgUnit` a au plus un parent, pas de cycle dans la hiérarchie
- [ ] Rattachement d'une personne (utilisateur, E01) ou d'une équipe ([E15](../../EPIC-equipes/README.md))
      à une `OrgUnit`, avec historique des rattachements (date de début/fin)
- [ ] Vue de consolidation « organigramme » exposée aux modules consommateurs (E49 lui-même,
      E50–E53) sans FK inter-schéma directe — via le bus PIVOT / API (cf. ADR-006)
- [ ] Test Testcontainers validant l'absence de cycle et le rattachement personne/équipe

---
Item Type: Enabler · Parent: E49 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: Benchmark « Organisations DSI dans les grands groupes », section 1
Justification: Socle de données organisationnel requis avant EN49.2 (rôles/RACI) et EN49.3 (catalogue de modèles)
Dépendances: EN18.1 (schéma `pilotage`) · E15 Équipes transverses (modèle équipe de base)
