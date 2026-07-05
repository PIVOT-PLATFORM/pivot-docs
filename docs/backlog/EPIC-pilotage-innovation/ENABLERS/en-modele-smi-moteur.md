# EN38.1 — Modèle SMI & moteur (entonnoir, stage-gate, scoring)

**Type d'enabler** : architecture

**Objectif technique** : Poser le modèle et le moteur d'un **Système de Management de l'Innovation** aligné **ISO 56002** (schéma `pilotage`) :

```text
AxeStrategique ─< Campaign ─< Idea ─< Concept ─< Experiment (POC/MVP)
                                          │
                                          ├─ Evaluation (grille multicritère, score)
                                          ├─ Gate (go|kill|hold|pivot, tracé)
                                          └─ InnovationItem → InnovationProject (lien E22/E23)
InnovationPortfolio (horizons H1/H2/H3, type incrémental|adjacent|radical, allocation)
IP (brevet, savoir-faire) · Partner/AppelAProjets (open innovation)
```

**Moteur** : entonnoir (funnel & taux de conversion par étape), **stage-gate**, **scoring
multicritère pondéré**, portefeuille par horizon, **KPIs** (ISO 56008) et **maturité** (ISO 56004).

**Intégration** : conversion innovation → **projet** du portefeuille (E23) / roadmap (E22) via
**bus PIVOT + deep-links** (pas de FK inter-modules — ADR-006/008) ; réutilise le vote (E19), la
rétro (E20) et les grilles de scoring (module Risque E21) là où pertinent.

**Gouvernance & éthique** : décisions de gate tracées/opposables ; gamification non punitive ;
RGPD (données de participation agrégées).

**Critères de complétion** :
- [ ] Modèle SMI (Axe, Campaign, Idea, Concept, Experiment, Evaluation, Gate, Portfolio, IP)
- [ ] Moteur entonnoir + stage-gate + scoring multicritère pondéré
- [ ] Portefeuille par horizon (H1/H2/H3) + allocation de ressources
- [ ] KPIs (ISO 56008) & auto-évaluation de maturité (ISO 56004)
- [ ] Conversion innovation → projet (E22/E23) via bus + deep-links

---
Item Type: Enabler · Parent: E38 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Fondation d'un SMI aligné ISO 56002 (modèle + moteur entonnoir/stage-gate/scoring)
Dépendances: EN18.1 (schéma pilotage) · bus PIVOT (ADR-008) · E22 · E23
