# EN28.7 — Critère de décision adaptateur vs natif

**Type d'enabler** : gouvernance · processus

**Contexte** : ADR-009 §2 fixe la règle : un adaptateur est construit quand (a) c'est techniquement possible via le contrat PivotAdapter et (b) c'est moins coûteux qu'un redéveloppement natif complet ; sinon la brique reste ou devient native. Le mix natif + adaptateurs est le modèle cible, pas une étape transitoire vers le tout-adaptateur.

**Critères de complétion** :
- [ ] La règle est documentée et diffusée à l'équipe (ADR-009 §2)
- [ ] Le comité d'architecture applique la règle pour arbitrer chaque nouvelle brique candidate
- [ ] Un registre des arbitrages rendus (domaine → adaptateur ou natif, et pourquoi) est tenu à jour

**Dépendances** : EN28.3 (contrat PivotAdapter)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: gouvernance · Module: gouvernance · Phase: phase-3
Stage: Backlog · Priority: Highest
Rôle: macro:qualite-conformite-audit
