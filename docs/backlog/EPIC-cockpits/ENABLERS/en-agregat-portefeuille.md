# EN51.9 — Agrégat portefeuille cross-projet

**Type d'enabler** : pilotage / API

**Objectif technique** : Exposer un **agrégat consolidé multi-projets** du domaine Pilotage (santé,
météo/indicateurs normalisés, avancement) au-dessus des endpoints existants, qui sont aujourd'hui
scopés `tenant/team/project`.

**Justification** : Le pilotage a livré (Sprints 9-10) roadmap, Gantt/WBS, portefeuille projet et
**météo/indicateurs normalisés** — mais **par projet**. La card « Santé du portefeuille projets »
(C1) a besoin d'une vue **cross-projet** ; il manque l'agrégation, pas la donnée.

**Critères de complétion** :
- [ ] Endpoint d'agrégation portefeuille (par tenant) : liste des projets + météo + avancement
      consolidé + indicateurs normalisés.
- [ ] Réutilise les briques `project/` et `weather/` existantes de `pivot-pilotage-core` (pas de
      recalcul divergent).
- [ ] Pagination / filtres (statut, direction métier).
- [ ] Donnée 🟡 (Restreint) : agrégée pour les externes selon la matrice.
- [ ] Contrat consommé par la card Santé du portefeuille (F51.2).

## Notes

- Se greffe **au-dessus** du pilotage : n'attend pas les modules Budget/Risques/OKR (Sprints 11/13),
  qui alimenteront des cards distinctes plus tard.

---
Item Type: Enabler · Parent: E51 · Type: pilotage · Module: pilotage · Phase: phase-3
Stage: ⬜ · Priority: Medium
Dépendances: E22/E23 (pilotage roadmap/portefeuille livrés), EN51.2
