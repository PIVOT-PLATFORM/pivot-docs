# EN18.15 — Corriger les données « fantômes »

**Type d'enabler** : dette

**Objectif technique** : identifier et corriger les données résiduelles (« fantômes ») subsistant après des modifications successives de lignes budgétaires, afin de rétablir la cohérence des budgets.

**Justification** : des modifications successives de lignes budgétaires laissent des enregistrements résiduels qui faussent les totaux et le suivi financier ; ces données doivent être nettoyées et la cause corrigée pour éviter leur réapparition.

**Critères de complétion** :
- [ ] Les données résiduelles issues des modifications de lignes budgétaires sont identifiées.
- [ ] Les données fantômes existantes sont corrigées / purgées sans impacter les lignes valides.
- [ ] La cause de génération des résidus est corrigée pour prévenir toute nouvelle occurrence.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un budget ayant subi des modifications successives de lignes, when je consulte ses lignes budgétaires, then seules les lignes valides subsistent et les totaux sont cohérents.
- [ ] Error case: given une modification successive d'une ligne budgétaire, when je l'enregistre, then aucune donnée résiduelle n'est laissée derrière la ligne mise à jour.
- [ ] Security: la correction ne supprime aucune donnée budgétaire valide et reste traçable.

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — EN-1104
Dépendances: —
