# EN28.2 — Catalogue d'entités étendu

**Type d'enabler** : plateforme · catalogue

**Contexte** : Étendre le catalogue Backstage avec le modèle d'entités PIVOT (ADR-009 §4), pour que chaque adaptateur ou module natif puisse s'y déclarer.

**Critères de complétion** :
- [ ] Catalogue étendu avec les 9 entités : Project, Portfolio, Contract, Vendor, Team, Capacity, Decision, Requirement, Epic
- [ ] Chaque entité est déclarable via un fichier YAML versionné
- [ ] Les entités déclarées s'affichent au catalogue
- [ ] Le modèle est réconcilié avec le schéma `public.teams` déjà existant (ADR-006) — cf. EN28.10 (ADR-011)

**Dépendances** : EN28.1 (portail Backstage)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: plateforme · Module: mycelium · Phase: phase-3
Stage: Backlog · Priority: Highest
Rôle: ingenieur-plateforme
