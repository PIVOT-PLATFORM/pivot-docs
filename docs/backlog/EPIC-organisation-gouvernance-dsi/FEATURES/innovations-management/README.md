# F49.2 — Innovations de management IT

**Description** : Outiller le suivi des innovations de management IT du benchmark (section 8) :
métriques InnerSource, conformité Architecture as Code — l'alignement OKR transverse DSI
Groupe/métier étant traité par extension d'[E27 — Module OKR](../../../EPIC-okr/README.md)
plutôt que redéveloppé ici.

**Bénéfice utilisateur** : la DSI dispose de tableaux de bord factuels sur l'adoption de ces
pratiques (réutilisation de code inter-équipes, conformité architecturale continue), sans avoir à
opérer elle-même les outils sources (plateforme Git, pipelines CI/CD).

**US rattachées** : [US49.2.1](us-inner-source-metriques.md), [US49.2.2](us-architecture-as-code-conformite.md)

**Critères de succès (feature-level)** :
- [ ] Un CoE peut consulter des métriques de réutilisation de code (InnerSource) entre équipes internes
- [ ] Un Architecte peut consulter un tableau de bord de conformité architecturale continue,
      alimenté par des contrôles CI/CD externes

**Hors périmètre** :
- [ ] L'implémentation des contrôles Policy as Code / Architecture as Code eux-mêmes (ils vivent
      dans les repos concernés — cette feature n'en fait que l'agrégation/visualisation)
- [ ] Le connecteur d'ingestion Git détaillé pour l'InnerSource (hors périmètre détaillé — voir
      hors périmètre de US49.2.1)
