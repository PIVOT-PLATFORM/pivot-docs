---
sidebar_position: 4
sidebar_label: "Backlog benchmark (marché)"
---

# Backlog benchmark — exigences issues de l'analyse concurrentielle

> **Source :** dossier d'analyse concurrentielle (benchmark marché) décliné en un backlog
> stratégique de **252 items** répartis sur **3 familles produit**. Ce document est la couche
> **rationalisation** : il relie chaque exigence du benchmark à sa concrétisation dans le
> backlog SAFe (`EPIC-*/FEATURES/*/us-*.md`), en distinguant **déjà couvert**, **à étendre** et
> **net-new**.

---

## 1. Provenance

Les items proviennent d'une comparaison structurée des acteurs de référence de chaque marché :

| Famille | Items | Acteurs benchmarkés | Home SAFe |
|---------|-------|---------------------|-----------|
| **Collaboration** (`BL-###`) | 98 | Miro · Klaxoon · FigJam · Microsoft Whiteboard | **E22 — Collaboration** (nouveau) + couverture par E08/E19/E20 |
| **Workflows** (`WF-###`) | 84 | n8n · Zapier · Power Automate · Activepieces · Gumloop · IFTTT | **E21 — Workflows & Automatisation** (nouveau) |
| **Pilotage** (`PP-###`) | 70 | Project Monitor · Sciforma · Microsoft Project/Planner | **E18 — Module Pilotage** (étendu) |

Chaque item conserve ses métadonnées d'origine dans le frontmatter de l'US générée :
`Source: BL-001 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 4/4` + `Justification`.

---

## 2. Grille de conversion CSV → SAFe

| Champ CSV | Champ backlog | Règle |
|-----------|---------------|-------|
| `Theme` | Famille / EPIC | Collaboration→E22 · Workflows→E21 · Pilotage→E18 |
| `Épique` | **Feature** (ou Enabler pour NFR) | 1 épique CSV = 1 Feature `F{epic}.{n}` |
| `Item` | **US** (titre) | 1 ligne CSV = 1 US `US{epic}.{feature}.{n}` |
| `Description` | Story + AC | Dérivés fidèlement ; AC à affiner au Gate 1 PO |
| `Priorité` P0/P1/P2/P3 | `Priority` | P0→Critical · P1→High · P2→Medium · P3→Low |
| `Complexité` S/M/L/XL | `Size` | reprise à l'identique |
| `MoSCoW` · `Lot` · `Origine` · `Justification` | frontmatter `Source:` | conservés pour traçabilité |
| `Theme` NFR / Chantiers SI | **Enabler** | épiques « Performance & NFR » → `EN{epic}.x` |

**Phase.** Les 3 familles sont des modules **`phase-3`** (verrou MVP actif, cf. `README §6`).
Tous les items benchmark naissent `Phase: phase-3 · Stage: Backlog`. Le `Lot cible` (1→4) est
conservé comme cadencement **intra-module**, distinct de la phase plateforme.

---

## 3. Rationalisation — Collaboration (BL) vs backlog existant

La famille Collaboration recoupe plusieurs modules déjà décrits. `E22` porte l'exigence
**benchmark complète** ; l'implémentation est répartie ainsi :

| Épique CSV (BL) | Feature E22 | Couverture existante | Statut |
|-----------------|-------------|----------------------|--------|
| E01 Canevas & objets | F22.1 | **E08** F08.3 Canvas WS, F08.4 Templates | 🟡 à étendre |
| E02 Collaboration temps réel | F22.2 | **E08** F08.5 Présence, EN08.1 WS room | 🟡 à étendre |
| E03 Facilitation & ateliers | F22.3 | **E19** Session (vote, timer), **E20** Rétro | 🟡 à étendre |
| E04 Modèles | F22.4 | **E08** F08.4 Templates | 🟡 à étendre |
| E05 Diagrammes & structuration | F22.5 | — | 🔴 net-new |
| E06 Intelligence artificielle | F22.6 | — | 🔴 net-new |
| E07 Continuum & intégrations | F22.7 | — | 🔴 net-new |
| E08 Partage & administration | F22.8 | **E08** F08.2 Partage & rôles | 🟡 à étendre |
| E09 Sécurité & gouvernance | F22.9 | **E01** Auth, **E06** Admin (transverse) | 🟡 à étendre |
| E10 Plateformes | F22.10 | — | 🔴 net-new |
| E11 Engagement | F22.11 | **E19** réactions | 🟡 à étendre |
| E12 Extensibilité | F22.12 | — | 🔴 net-new |
| E13 Performance & NFR | EN22.1 | NFR plateforme transverses | 🟡 à étendre |
| E14 Licences & modèle éco. | F22.13 | — | 🔴 net-new |
| E15 Innovation | F22.14 | — | 🔴 net-new |
| E16 Chantiers SI | F22.15 | gouvernance / conduite du changement | 🔴 net-new |

> La couverture par `E08 Whiteboard` est détaillée dans
> [`EPIC-whiteboard/README.md` §Couverture benchmark](EPIC-whiteboard/README.md).

---

## 4. Rationalisation — Pilotage (PP) vs E18 existant

`E18 — Module Pilotage` existe déjà (F18.1–7 : roadmap, portefeuille, ADR, commande publique).
Le benchmark PPM secteur public l'**étend fortement** (demande/arbitrage, capacité à faire,
budgets pluriannuels/PPI, comptabilité publique M57, subventions, AP/CP…).

| Épique CSV (PP) | Feature/Enabler E18 | Recoupe l'existant |
|-----------------|---------------------|--------------------|
| E01 Demande & arbitrage | F18.8 | — (net-new) |
| E02 Planification | F18.9 | **F18.1** Roadmap/Gantt |
| E03 Ressources & temps | F18.10 | — |
| E04 Budgets & finances | F18.11 | **F18.5** Budget |
| E05 Portefeuille & comités | F18.12 | **F18.2** Portefeuille |
| E06 Collaboration & tâches | F18.13 | — |
| E07 IA & agents | F18.14 | — |
| E08 Gouvernance & sécurité | F18.15 | **F18.3** ADR (traçabilité) |
| E09 Intégration SI | F18.16 | — |
| E10 Licences & réversibilité | F18.17 | — |
| E11 NFR | EN18.3 | — |
| E12 Innovation | F18.18 | **F18.4** Commande publique |
| E13 Chantiers SI | F18.19 | — |

---

## 5. Workflows (WF) — famille net-new

Aucun module d'automatisation n'existait. `E21 — Workflows & Automatisation` est **entièrement
nouveau** (module `automatisation`, repo cible `pivot-automatisation-core` / `-ui`). 15 épiques
CSV → F21.1–14 + EN21.1–6 (NFR). Détail : [`EPIC-workflows/README.md`](EPIC-workflows/README.md).

---

## 6. Verrou & implémentation

Tous les items benchmark restent **`Stage: Backlog · Phase: phase-3`** : aucun n'est éligible à
l'implémentation tant que le MVP n'est pas déclaré terminé (`README §6`). Ce backlog sert de
**vision cible gouvernée** et de base au Gate 1 PO Agent quand chaque module sera dégelé.

---

*Généré depuis le CSV benchmark — dernière mise à jour : 2026-07-04*
