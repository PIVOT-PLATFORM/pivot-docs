# EN28.12 — Intendance upstream

**Type d'enabler** : gouvernance · processus

**Contexte** : Rôle d'« upstream steward » (ADR-009, Conséquences) : sans lui, « on reverse » reste un slogan. Il maintient les PR upstream vivantes, resynchronise les forks, dialogue avec les mainteneurs amont.

**Critères de complétion** :
- [ ] Rôle d'upstream steward attribué
- [ ] Tableau de bord suivant les PR en vol, le taux d'acceptation upstream et la dérive des forks
- [ ] Revue régulière (cadence à définir) du tableau de bord
- [ ] **Chaque adaptateur/module fournit un SBOM** et ses artefacts sont signés et vérifiés (approche SLSA) avant déploiement — distinct d'EN05.6/EN05.7 (SBOM/SLSA de PIVOT lui-même) : ici la cible est le parc d'outils adaptés, pas `pivot-core`/`pivot-ui`
- [ ] Le registre des modules (déclarés au catalogue EN28.2) recense propriétaire, version, criticité, dépendances et credentials — condition de la checklist d'admission (E43 EN43.13)

**Dépendances** : EN28.11 (ADR-012, stratégie de forks)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: gouvernance · Module: gouvernance · Phase: phase-3
Stage: Backlog · Priority: Medium
