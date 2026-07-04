# ADR-008 — Domaines composables & cockpits

**Date :** 2026-07-04
**Statut :** Proposé
**Décideurs :** Équipe PIVOT

---

## Contexte

Le « module Pilotage » (E18) a été conçu comme un bloc unique regroupant roadmap, portefeuille, ADR projet, commande publique, budget et OKR — plus, initialement, une gestion des risques « légère » (ex-F18.7).

Deux tensions ont émergé :

1. **La gestion des risques est devenue un domaine à part entière** (E21 — 8 axes, 40+ US : profil adaptatif, scoring multidimensionnel, traitement 4 T, boucle vivante sur le bus, portefeuille, quantitatif & conformité, IA gouvernée). La maintenir comme sous-feature de Pilotage créait un doublon (« risque léger » F18.7 vs module complet) et un parcours utilisateur ambigu : un chef de projet ne savait pas où gérer ses risques.

2. **Le parcours d'un utilisateur traverse plusieurs capacités.** Selon sa fonction, un utilisateur a besoin, au même endroit, de sa roadmap, de son budget, de ses OKR **et** de ses risques ; un PMO a besoin du portefeuille **et** de la consolidation des risques. Traiter « Pilotage » comme un module monolithique fige ces capacités ensemble et empêche de les recomposer selon les besoins.

La vision Pivot (suite data-centric, les applications sont des **vues** d'un graphe partagé, communiquant par bus d'événements et objets pivots) et l'ADR-006 (multi-repo par domaine, **jamais de FK inter-modules**) appellent une granularité plus fine que « un gros module Pilotage ».

---

## Décision

### 1. « Pilotage » est un domaine, pas un module

Le domaine **Pilotage** regroupe plusieurs **modules de capacité** autonomes, chacun activable indépendamment et porté par **son propre EPIC** :

| Module de capacité | EPIC | Schéma / repo |
|--------------------|------|---------------|
| Roadmap / Gantt | E22 (ex-F18.1) | `pilotage` — pivot-pilotage-core/ui |
| Portefeuille projets | E23 (ex-F18.2) | `pilotage` — pivot-pilotage-core/ui |
| ADR projet | E24 (ex-F18.3) | `pilotage` — pivot-pilotage-core/ui |
| Commande publique | E25 (ex-F18.4) | `pilotage` — pivot-pilotage-core/ui |
| Budget & suivi financier | E26 (ex-F18.5) | `pilotage` — pivot-pilotage-core/ui |
| OKR | E27 (ex-F18.6) | `pilotage` — pivot-pilotage-core/ui |
| Cahiers de tests | E13 | `pilotage` — pivot-pilotage-core/ui |
| **Gestion des risques** | **E21** (ex-F18.7) | `risk` — pivot-risk-core/ui |

**E18** devient l'**EPIC ombrelle du domaine** (page de landing + enablers partagés EN18.1/EN18.2), sans features propres. La **gestion des risques « légère » (F18.7) est supprimée** : entièrement remplacée par le module dédié **E21**.

### 2. Intégration inter-modules : bus + deep-links, jamais de FK

Conformément à l'ADR-006, **aucune FK inter-modules**. La corrélation entre un risque et son projet se fait par un **`project_ref`** (identifiant logique du projet) propagé via le **bus d'événements PIVOT**, et non par une FK `risk → pilotage.projects`.

- Le module Risque **s'abonne** aux événements projet (`project.created`, `task.completed`, `budget.alert`, `sprint.closed`).
- Le module Risque **émet** `risk.raised`, `risk.threshold.exceeded`, `risk.mitigation.due`.
- Les vues se relient par **deep-links** filtrés (`/risk?project={project_ref}`).

### 3. Cockpit = composition de modules

Un **cockpit** est une vue composée qui agrège les widgets et vues des modules pertinents. Il n'est pas « possédé » par un module : c'est une **composition** orchestrée par le shell (E16), alimentée par les modules via le bus et les deep-links.

Composition proposée — **rôles et périmètres à définir / valider après une étude UX réelle** :

| Rôle (hypothèse) | Cockpit (proposé) | Modules composés |
|------------------|-------------------|------------------|
| Chef de projet | Cockpit projet | Roadmap, Jalons, Budget, OKR, **Risques** (matrice + top + échéances) |
| PMO | Cockpit portefeuille | Portefeuille (RAG), **Risques** (heat map, systémiques), Capitalisation/REX |
| Sponsor / COMEX | Cockpit décision | **Risques** (top 5 + provision), OKR macro, tendance portefeuille |
| Contract Manager | Cockpit achats | Commande publique, **Risques** fournisseurs / contrat / lock-in |
| Scrum Master | Cockpit sprint | **Risques** du sprint, vélocité de risque, obstacles |
| DSI / Directeur de programme | Cockpit portefeuille étendu | Portefeuille, **Risques** systémiques, budget consolidé |

> ⚠️ Ce tableau est une **proposition de départ**. La liste des rôles, leurs cockpits et les widgets composés restent **à définir après une étude UX réelle**, dans une itération produit dédiée.

---

## Alternatives considérées

### Option A — Garder Pilotage monolithique avec une gestion des risques intégrée (rejeté)

**Inconvénient :** doublon « risque léger / risque complet », parcours utilisateur ambigu, impossible de recomposer les capacités selon les besoins. Fige des cycles de release hétérogènes ensemble.

### Option B — Risque comme simple feature de Pilotage (rejeté)

**Inconvénient :** l'ampleur du domaine risque (40+ US, packs de conformité, IA gouvernée, boucle vivante) déborde largement une feature ; sa réutilisation par d'autres rôles (PMO, sponsor, contract manager) impose un module autonome.

### Option C — Cockpits « en dur » codés dans chaque module (rejeté)

**Inconvénient :** chaque module ré-implémenterait la vue de chaque rôle → duplication et couplage. Le cockpit doit être une **composition** au niveau du shell, pas un artefact interne à un module.

---

## Conséquences

### Positives
- Parcours utilisateur cohérent : chaque cockpit agrège les bonnes capacités au bon endroit.
- Modules activables et à release indépendante (MCO par capacité).
- Risque réutilisable par tous les rôles sans le dupliquer.
- Aligné avec la vision data-centric : les cockpits sont des vues d'un graphe partagé.

### Contraintes
- La corrélation projet ↔ risque par `project_ref`/bus offre une **cohérence éventuelle**, pas d'intégrité référentielle SGBD — à gérer (événements manqués, `project_ref` orphelin).
- La composition des cockpits doit être portée par le shell (E16) → nouvelle responsabilité à cadrer.
- Décomposition en EPICs **actée** : un EPIC par module (E22–E27 + E21 + E13), E18 devient l'ombrelle du domaine. La séparation **physique en repos distincts** reste incrémentale (les modules `pilotage` partagent `pivot-pilotage-core` / schéma `pilotage` tant que la scission repo n'est pas actée).
- Rôles et cockpits **restent à définir après une étude UX réelle** — cet ADR pose le modèle, pas la liste finale.

### Liens
- Affine [ADR-003](pathname:///pivot-docs/adr/ADR-003-systeme-modules) (système de modules activables) et [ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture) (multi-repo par domaine, pas de FK inter-modules).
- Concrétisé côté backlog par la feature **F21.9 — Intégration cockpit projet** du module [E21](pathname:///pivot-docs/backlog/EPIC-risk/).
