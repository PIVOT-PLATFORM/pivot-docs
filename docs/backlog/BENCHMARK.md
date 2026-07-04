---
sidebar_position: 4
sidebar_label: "Backlog benchmark (marché)"
---

# Backlog benchmark — exigences issues de l'analyse concurrentielle

> **Source :** dossier d'analyse concurrentielle (benchmark marché) décliné en un backlog
> stratégique de **252 items** sur **3 familles produit**. Ce document est la couche
> **rationalisation** : il relie chaque exigence à sa concrétisation dans le backlog SAFe
> (`EPIC-*/FEATURES/*/us-*.md`), en distinguant **déjà couvert**, **à étendre** et **net-new**.

---

## 1. Provenance & cartographie des EPIC

| Famille | Items | Acteurs benchmarkés | Home SAFe |
|---------|-------|---------------------|-----------|
| **Collaboration** (`BL-###`) | 98 | Miro · Klaxoon · FigJam · Microsoft Whiteboard | **E30 — Collaboration** (nouveau) + couverture par E08 |
| **Workflows** (`WF-###`) | 84 | n8n · Zapier · Power Automate · Activepieces · Gumloop · IFTTT | **E29 — Workflows & Automatisation** (nouveau) |
| **Pilotage** (`PP-###`) | 70 | Project Monitor · Sciforma · Microsoft Project/Planner | **Domaine Pilotage E18** — réparti (voir §4) |

Chaque item conserve ses métadonnées d'origine dans le frontmatter de l'US générée :
`Source: BL-001 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 4/4` + `Justification`.

> Cette numérotation (**E29/E30** + répartition pilotage **E31–E39**) résulte de l'unification
> des PR ouvertes : la taxonomie « Domaine Pilotage » de l'ADR-008 (E18 ombrelle, E21–E27) est
> la base ; les familles benchmark ont été renumérotées pour éviter toute collision d'ID.
> L'intégration open source « mycélium » est en **E28** (hors CSV benchmark, cf. ADR-009).

---

## 2. Grille de conversion CSV → SAFe

| Champ CSV | Champ backlog | Règle |
|-----------|---------------|-------|
| `Theme` | Famille / EPIC | Collaboration→E30 · Workflows→E29 · Pilotage→domaine E18 |
| `Épique` | **Feature** (ou Enabler pour NFR) | 1 épique CSV = 1 Feature `F{epic}.{n}` |
| `Item` | **US** | 1 ligne CSV = 1 US |
| `Description` | Story + AC | Dérivés fidèlement ; AC à affiner au Gate 1 PO |
| `Priorité` P0/P1/P2/P3 | `Priority` | P0→Critical · P1→High · P2→Medium · P3→Low |
| `Complexité` S/M/L/XL | `Size` | reprise à l'identique |
| `MoSCoW` · `Lot` · `Origine` · `Justification` | frontmatter `Source:` | conservés pour traçabilité |

**Phase.** Toutes les familles benchmark sont `Phase: phase-3 · Stage: Backlog` (vision cible
gouvernée). Le `Lot cible` (1→4) est conservé comme cadencement intra-module.

---

## 3. Rationalisation — Collaboration (BL) → E30

| Épique CSV (BL) | Feature E30 | Couverture existante | Statut |
|-----------------|-------------|----------------------|--------|
| E01 Canevas & objets | F30.1 | **E08** F08.3 Canvas WS, F08.4 Templates | 🟡 à étendre |
| E02 Collaboration temps réel | F30.2 | **E08** F08.5 Présence, EN08.1 WS room | 🟡 à étendre |
| E03 Facilitation & ateliers | F30.3 | **E19** Session, **E20** Rétro | 🟡 à étendre |
| E04 Modèles | F30.4 | **E08** F08.4 Templates | 🟡 à étendre |
| E05 Diagrammes & structuration | F30.5 | — | 🔴 net-new |
| E06 Intelligence artificielle | F30.6 | — | 🔴 net-new |
| E07 Continuum & intégrations | F30.7 | — | 🔴 net-new |
| E08 Partage & administration | F30.8 | **E08** F08.2 Partage & rôles | 🟡 à étendre |
| E09 Sécurité & gouvernance | F30.9 | **E01** Auth, **E06** Admin | 🟡 à étendre |
| E10 Plateformes | F30.10 | — | 🔴 net-new |
| E11 Engagement | F30.11 | **E19** réactions | 🟡 à étendre |
| E12 Extensibilité | F30.12 | — | 🔴 net-new |
| E13 Performance & NFR | EN30.1–12 | NFR plateforme transverses | 🟡 à étendre |
| E14 Licences & modèle éco. | F30.13 | — | 🔴 net-new |
| E15 Innovation | F30.14 | — | 🔴 net-new |
| E16 Chantiers SI | F30.15 | gouvernance / conduite du changement | 🔴 net-new |

> Couverture détaillée : [`EPIC-whiteboard/README.md` §Couverture benchmark](EPIC-whiteboard/README.md).

---

## 4. Rationalisation — Pilotage (PP) → Domaine E18 réparti

Le benchmark PPM secteur public est **distribué** dans le Domaine Pilotage (ADR-008) : fusion
dans les modules existants là où c'est pertinent, nouveaux modules-EPIC sinon.

| Épique CSV (PP) | Cible | Mode |
|-----------------|-------|------|
| E01 Demande & arbitrage | **E31** (nouveau) | net-new |
| E02 Planification | **E22 Roadmap** → F22.2 | fusion |
| E03 Ressources & temps | **E32** (nouveau) | net-new |
| E04 Budgets & finances | **E26 Budget** → F26.2 | fusion |
| E05 Portefeuille & comités | **E23 Portefeuille** → F23.2 | fusion |
| E06 Collaboration & tâches | **E33** (nouveau) | net-new |
| E07 IA & agents | **E34** (nouveau) | net-new |
| E08 Gouvernance & sécurité | **E35** (nouveau) | net-new |
| E09 Intégration SI | **E36** (nouveau) | net-new |
| E10 Licences & réversibilité | **E37** (nouveau) | net-new |
| E11 NFR | **EN18.3–8** (ombrelle) | enablers domaine |
| E12 Innovation | **E38** (nouveau) | net-new |
| E13 Chantiers SI | **E39** (nouveau) | net-new |

### Mise à jour v2 « adaptative » (backlog PPM)

La **v2** du backlog PPM ajoute une **couche d'adaptation par profil d'organisation** :

- **[E40 — Profil & adaptation](EPIC-profil-adaptation/README.md)** (nouveau, `PP-A01…A06`) : le profil (TPE / PME / Grand groupe / Privée sous droit public / Publique / État) pilote l'activation des modules, la **classe de souveraineté (A/B/C)** et le niveau de rigueur.
- **Dimension `Profils_applicables`** portée par **chaque US** du domaine Pilotage (champ `Profils:` en frontmatter) + MoSCoW « conditionnel » selon le profil.
- **PP-017b Interface ERP finance** (variante privée) → E26 Budget (US26.2.4).
- **E31 Demande & arbitrage dissoute** : what-if / business cases → E23 ; demande / scoring / capacité à faire / tout-est-projet → *hors v2* (conservés, annotés « à confirmer »).

---

## 5. Workflows (WF) → E29 (net-new)

Aucun module d'automatisation n'existait. `E29 — Workflows & Automatisation` est **entièrement
nouveau** (module `automatisation`, repo `pivot-automatisation-core` / `-ui`). 14 Features
(F29.1–14) + 6 enablers NFR (EN29.1–6). Détail : [`EPIC-workflows/README.md`](EPIC-workflows/README.md).

---

## 6. Verrou & implémentation

Tous les items benchmark restent **`Stage: Backlog · Phase: phase-3`** : vision cible gouvernée,
base du Gate 1 PO Agent au dégel de chaque module.

---

*Généré depuis le CSV benchmark, unifié avec la taxonomie Domaine Pilotage (ADR-008) — 2026-07-04*
