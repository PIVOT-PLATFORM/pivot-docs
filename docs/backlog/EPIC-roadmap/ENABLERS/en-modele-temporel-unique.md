# EN22.1 — Modèle temporel unique & moteur d'ordonnancement

**Type d'enabler** : architecture (modèle de données + moteur)

**Objectif technique** : Poser **un seul graphe temporel** dont la roadmap rapide et le Gantt détaillé sont **deux vues** (pas deux stockages). Interdit la double saisie et la divergence (vision data-centric PIVOT, cf. ADR-010).

Entités (schéma `pilotage`, rattachées à `Projet` → `Application`, cf. EN18.9) :

```text
Projet ─< Phase ─< Tâche (récapitulative | feuille | jalon durée 0 | périodique)
                      │
                      ├─< Dépendance (type FS/SS/FF/SF, retard/avance)
                      ├─< Contrainte (ASAP/ALAP/MSO/MFO/SNET/FNLT…) + Deadline
                      ├─< Affectation (Ressource, unités, travail) ─ Coût
                      └─  Avancement (% réalisé, réel/restant, dates réelles)
Calendrier (projet | tâche | ressource : jours ouvrés, exceptions)
Baseline (0..10) : dates/durée/travail/coût figés
Jalon = objet **partagé** entre la vue roadmap (macro) et la vue Gantt (détail)
```

**Moteur d'ordonnancement** : calcule dates au plus tôt/tard, marges (libre/totale), **chemin critique**, en respectant dépendances, contraintes et calendriers ; planification **auto** (recalcul) ou **manuelle** (dates figées + signalement d'écart).

**Justification** : c'est la condition pour « faire aussi bien que MS Project, mais web » sans silo roadmap/Gantt ; **le jalon partagé** garantit la cohérence des deux vues.

**Critères de complétion** :
- [ ] Schéma `pilotage` : Phase, Tâche, Dépendance (typée + lag), Contrainte, Deadline, Calendrier, Affectation, Baseline
- [ ] Moteur d'ordonnancement (dates au plus tôt/tard, marges, chemin critique) — auto & manuel
- [ ] Jalon partagé roadmap ↔ Gantt (un seul objet, deux vues)
- [ ] Agrégation des tâches récapitulatives (dates/durée/travail/avancement/coût)

---
Item Type: Enabler · Parent: E22 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Critical
Stage: Backlog
Rôle: architecte-technique
Profils: Tous
Justification: Fondation « roadmap & Gantt = deux vues d'un modèle temporel unique » (ADR-010)
Dépendances: EN18.1 (schéma pilotage) · EN18.9 (Application→Projet)
