# EN18.12 — Retirer les jalons ABC/BC de la création

**Type d'enabler** : dette

**Objectif technique** : retirer les jalons ABC et BC des options proposées à la création d'une activité, tout en conservant ceux déjà créés sur les activités existantes.

**Justification** : les jalons ABC/BC ne sont plus pertinents pour les nouvelles activités mais doivent rester visibles et exploitables sur l'historique existant pour ne pas altérer les données passées.

**Critères de complétion** :
- [ ] Les jalons ABC et BC ne sont plus proposés dans le parcours de création d'une activité.
- [ ] Les jalons ABC/BC déjà créés sur des activités existantes restent affichés et exploitables.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given la création d'une nouvelle activité, when je choisis un type de jalon, then ABC et BC ne figurent plus dans les choix disponibles.
- [ ] Error case: given une activité existante portant un jalon ABC ou BC, when je l'ouvre, then le jalon reste affiché et modifiable sans erreur.
- [ ] Security: la modification n'impacte pas les habilitations existantes et ne supprime aucune donnée de jalon historisée.

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — EN-309
Dépendances: —
