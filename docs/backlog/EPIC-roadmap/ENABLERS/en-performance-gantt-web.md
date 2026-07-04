# EN22.2 — Performance & collaboration web du Gantt

**Type d'enabler** : performance · frontend

**Objectif technique** : Rendre le Gantt **fluide dans le navigateur** au niveau d'un client lourd : rendu **virtualisé** (seules les barres visibles sont dessinées), **recalcul incrémental** du chemin critique et de l'ordonnancement, **co-édition temps réel** et undo/redo.

**Justification** : la parité MS Project en web ne tient que si la performance suit sur de grands plannings (cf. PP-032 : 100+ projets < 1 min ; NFR « 30 fps sur 10 000 objets »).

**Critères de complétion** :
- [ ] Rendu virtualisé du Gantt : ≥ 30 fps et interactions fluides sur **10 000+ tâches**
- [ ] Recalcul **incrémental** (seules les tâches impactées) après une modification
- [ ] Co-édition temps réel (présence, verrous optimistes) + **undo/redo**
- [ ] Chargement initial d'un projet standard < 3 s (web)

---
Item Type: Enabler · Parent: E22 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: Grand groupe, Publique, État
Justification: Parité MS Project en web sur de grands plannings (NFR PP-032)
Dépendances: EN22.1 (modèle temporel unique)
