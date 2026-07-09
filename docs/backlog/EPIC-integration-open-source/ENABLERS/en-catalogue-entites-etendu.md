# EN28.2 — Catalogue d'entités étendu

**Type d'enabler** : plateforme · catalogue

**Contexte** : Étendre le catalogue de services avec le modèle d'entités PIVOT (ADR-009 §4), pour que chaque adaptateur ou module natif puisse s'y déclarer.

**Critères de complétion** :
- [ ] Catalogue étendu avec les 9 entités : Project, Portfolio, Contract, Vendor, Team, Capacity, Decision, Requirement, Epic
- [ ] Chaque entité est déclarable via un fichier YAML versionné
- [ ] Les entités déclarées s'affichent au catalogue
- [ ] Le modèle est réconcilié avec le schéma `public.teams` déjà existant (ADR-006) — cf. EN28.10 (ADR-017)
- [ ] Chaque entité porte un attribut de classe de souveraineté A/B/C (cf. E43 — Sécurité & Zero Trust, EN43.11)

**Point ouvert (non tranché ici — cf. dossier de synthèse plateforme développeur §7.3, `pivot-benchmarks/plateforme-developpeur/dossier-synthese-plateforme-developpeur.md`, pivot-benchmarks#1)** : le vocabulaire standard d'un *software catalog* (`Component`, `API`, `Resource`, `System`, `Domain` — Backstage/Port/Cortex/OpsLevel) ne figure pas dans les 9 entités ci-dessus, alors que F28.10 (adaptateurs GitLab CE/Forgejo) présuppose déjà des entités `Component`/`Resource` dans ses critères d'acceptation. À trancher via EN28.10 (ADR-017) avant l'implémentation de F28.11 (scorecards/scaffolding/TechDocs), qui a besoin d'un type d'entité cible stable — cf. EN28.10 pour le détail des deux options non arbitrées.

**Dépendances** : EN28.1 (portail catalogue)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: plateforme · Module: socle · Phase: phase-3
Stage: ⬜ · Priority: Highest
