# ADR-010 — Roadmap & Gantt : un modèle temporel unique, parité MS Project en web

**Date :** 2026-07-05
**Statut :** Proposé
**Décideurs :** Équipe PIVOT

---

## Contexte

Le module [E22](pathname:///pivot-docs/backlog/EPIC-roadmap/) doit répondre à deux besoins qu'on confond souvent :

1. **Roadmap rapide** — poser en quelques minutes une direction (initiatives, jalons, périodes floues) pour aligner et communiquer.
2. **Planification Gantt** — ordonnancer des tâches interdépendantes avec la rigueur d'un **MS Project** (WBS, dépendances typées, contraintes, calendriers, chemin critique, baselines, ressources, nivellement).

Deux pièges symétriques : imposer la granularité tâche en bas de spectre (sur-ingénierie → abandon), ou rester en roadmap floue en haut de spectre (perte de pilotage réel). Ambition produit affirmée : **« faire aussi bien que MS Project, mais en mode web ».**

## Décision

### 1. Roadmap et Gantt sont **deux vues d'un modèle temporel unique**

Il n'y a **pas** deux stockages (une base roadmap + une base Gantt) : un seul graphe `Projet → Phase → Tâche → Jalon → Dépendance` (enabler [EN22.1](pathname:///pivot-docs/backlog/EPIC-roadmap/)). La **roadmap** est la vue macro (agrégation initiatives + jalons, temps flou) ; le **Gantt** est la vue détail (tâches + dépendances, temps précis). Le **jalon est l'objet partagé** garantissant la cohérence. → aucune double saisie, aucune divergence. Cohérent avec la vision data-centric (les applications sont des **vues** d'un graphe partagé) et avec [EN18.9](pathname:///pivot-docs/backlog/EPIC-pilotage/) (Application → Projet).

### 2. L'**altitude** est pilotée par le **profil** (E40)

Le curseur roadmap↔Gantt est indexé sur le profil d'organisation ([E40](pathname:///pivot-docs/backlog/EPIC-profil-adaptation/), PP-A02) : TPE/PME → roadmap rapide par défaut, moteur d'ordonnancement et baselines masqués ; Grand groupe/Publique/État → Gantt complet, ressources, nivellement, baselines.

### 3. **Parité MS Project**, mais **web-native**

Le périmètre fonctionnel vise la parité MS Project (WBS, dépendances FS/SS/FF/SF + lag/lead, contraintes, calendriers, planification auto/manuelle, chemin critique/marges, fractionnement, suivi, baselines multiples, ressources & nivellement, vues multiples, import/export `.mpp`/`.xml` MSPDI). La faisabilité **web** est un enabler non négociable ([EN22.2](pathname:///pivot-docs/backlog/EPIC-roadmap/)) : rendu virtualisé (10 000+ tâches ≥ 30 fps), recalcul incrémental du chemin critique, co-édition temps réel.

## Alternatives considérées

- **Deux modules séparés (roadmap ≠ Gantt)** — rejeté : double stockage, double saisie, divergence, rupture à la montée en gamme.
- **Uniquement un Gantt (à la MS Project)** — rejeté : sur-ingénierie pour TPE/PME, adoption en berne.
- **Uniquement une roadmap légère** — rejeté : insuffisant pour Grand groupe / secteur public (chemin critique, baselines, compta, ressources).

## Conséquences

### Positives
- Une seule source de vérité temporelle ; montée en gamme **sans rupture** (roadmap → Gantt).
- Interopérabilité MS Project → condition d'adoption (reprise de l'existant, anti lock-in).
- Adaptation au contexte via le profil (ni sur- ni sous-équipement).

### Contraintes
- Le **moteur d'ordonnancement** (dates au plus tôt/tard, marges, chemin critique, auto/manuel) est un composant à part entière — complexité réelle (EN22.1).
- La **performance web** sur grands plannings est critique (EN22.2) — à valider tôt (spike).
- Garde-fou anti « **Gantt qui ment** » : signaler la fraîcheur et l'écart baseline ; ne pas imposer le Gantt hors profil qui le justifie.

### Liens
- Concrétisé par [E22](pathname:///pivot-docs/backlog/EPIC-roadmap/) (F22.1–F22.7, EN22.1/EN22.2).
- Affine [ADR-008](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits) (domaine Pilotage) ; s'appuie sur [ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture) (pas de FK inter-modules).
