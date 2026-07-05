# EN27.1 — Modèle OKR & moteur (scoring, statut, alignement)

**Type d'enabler** : architecture

**Objectif technique** : Poser le modèle et le moteur OKR de l'état de l'art.

Entités (schéma `pilotage`) :

```text
Cycle (trimestriel | annuel, ouvert/gelé/clôturé)
Objective (qualitatif, type engageant|aspirationnel, owner : entreprise|équipe|individu)
   ├─< KeyResult (type métrique|jalon|booléen|%, baseline/actuel/cible, unité, poids)
   ├─< Alignment (Objective parent) — arbre sans cycle
   ├─< Initiative (lien vers projet/epic — le « comment »)
   └─< CheckIn (valeur, confiance, commentaire, horodaté)
```

**Moteur** : avancement KR (borné 0–100 %), **score 0.0–1.0** (KR + agrégation pondérée O),
**statut** (ON_TRACK/AT_RISK/OFF_TRACK/DONE via pace attendu), tendance & confiance,
grading de clôture, **cibles engageant 1.0 / aspirationnel ~0.7**.

Connecteurs : auto-update KR (BI/API/tableur), rappels de check-in (bus PIVOT → Slack/Teams),
deep-links pilotage (roadmap E22, portefeuille E23, risque E21) — **pas de FK inter-modules** (ADR-006/008).

**Gouvernance-by-design** : découplage rémunération, transparence par défaut, confidentialité RGPD des OKR individuels.

**Critères de complétion** :
- [ ] Modèle Cycle/Objective/KeyResult/Alignment/Initiative/CheckIn au schéma `pilotage`
- [ ] Moteur avancement/score/statut/confiance + agrégation pondérée + arbre d'alignement (anti-cycle)
- [ ] Cibles par type (engageant/aspirationnel) et sweet spot
- [ ] Connecteurs auto-update KR + rappels + deep-links pilotage
- [ ] Garde-fous bonnes pratiques (volume, anti-patterns) et confidentialité RGPD

---
Item Type: Enabler · Parent: E27 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: Tous
Justification: Fondation OKR (modèle + moteur scoring/alignement) — état de l'art Doerr/Google
Dépendances: EN18.1 (schéma pilotage) · bus PIVOT (ADR-008)
