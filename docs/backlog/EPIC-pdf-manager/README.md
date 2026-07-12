# E45 — PDF Manager (Mes PDF)

## Objectif

Bibliothèque documentaire centrée PDF : collections, upload, recherche, visualiseur in-browser, annotations, versioning, partage, et manipulation de documents (fusion, découpe, rotation, filigrane, compression). Sert de hub de **consultation et d'organisation** pour les documents PDF utilisés par d'autres modules (MeetOps, Cahiers de tests) — chaque module y importe/exporte des documents, sans que E45 ne devienne le stockage exclusif de ces modules.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pdf-core`** (à créer — schéma Flyway `pdf`, FK → `public.teams.id`)
- Frontend : **`pivot-pdf-ui`** (à créer — consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre (phase-3)

### Features

- **F45.1 — Bibliothèque documentaire**
  - US45.1.1 : Organiser sa bibliothèque de documents PDF (collections, upload, recherche, tags)
- **F45.2 — Visualisation et annotation**
  - US45.2.1 : Consulter et annoter un document PDF
- **F45.3 — Manipulation PDF**
  - US45.3.1 : Fusionner, découper, réorganiser et transformer des documents PDF
- **F45.4 — Partage et versioning**
  - US45.4.1 : Partager un document et suivre ses versions

### Enablers

- **EN45.1** — Stockage objet (GCS/S3) et quotas de stockage par utilisateur
- **EN45.2** — [Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md)

## Hors périmètre

- **Stockage du document source/final/audit trail de SignDoc** — [E44](pathname:///pivot-docs/backlog/EPIC-signdoc/) conserve son propre stockage dédié (EN44.1) pour garantir l'immuabilité probatoire après signature ; E45 n'est qu'une source d'import optionnelle en amont.
- **OCR / recherche plein texte dans le contenu**, **champs personnalisés par collection**, **comparaison visuelle de versions** — reportés v2.

## Repères marché (benchmark POC)

Benchmark détaillé : `pivot-benchmarks/modules-poc-marche/` — cahiers Adobe Acrobat, Smallpdf, PDF.co,
Apryse, dossier de synthèse (juillet 2026). **Aucun écart de socle** sur F45.1-F45.4. Raffinement à
qualifier au Gate 1 : rédaction/masquage définitif et non réversible d'informations sensibles, absent des
AC stub actuelles → US45.3.1 (la compression avec aperçu du gain et le filigrane y sont déjà couverts).

Deux **décisions d'architecture** soulevées par les cahiers PDF.co et Apryse conditionnent EN45.1 et
doivent être tranchées par l'Architecte Modules avant le début de F45.2/F45.3 — pas un raffinement de
backlog, un point de suivi :

- Composant de rendu/annotation PDF pour `pivot-pdf-ui` : bibliothèque open source (ex. PDF.js) personnalisée
  au design system (ADR-007) vs SDK commercial type Apryse (licence propriétaire à vérifier contre l'AGPL de
  PIVOT, ADR-002, avant tout engagement — coût d'entrée ~1 500 $)
- Traitement PDF backend (fusion, compression, OCR) : internalisation dans `pivot-pdf-core` vs délégation à
  un service API tiers façon PDF.co (coût variable proportionnel à l'usage vs effort de développement fixe)

## Modules impactés

`pdf` (pivot-pdf-core + pivot-pdf-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo
- Interface avec : **E44 SignDoc** — document source à signer, archivage du document signé (via bus PIVOT, pas de FK inter-modules — ADR-006/008)
- Interface avec : **E12 MeetOps**, **E13 Cahiers de tests** — pièces jointes documentaires

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| EN45.1 — Stockage objet et quotas | ⬜ |
| [EN45.2 — Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md) | ⬜ |
| **F45.1 — Bibliothèque documentaire** | |
| [US45.1.1 — Organiser sa bibliothèque de documents PDF](FEATURES/bibliotheque/us-organiser-bibliotheque.md) | ⬜ |
| **F45.2 — Visualisation et annotation** | |
| [US45.2.1 — Consulter et annoter un document PDF](FEATURES/visualisation-annotation/us-visualiser-annoter.md) | ⬜ |
| **F45.3 — Manipulation PDF** | |
| [US45.3.1 — Fusionner, découper et transformer des documents PDF](FEATURES/manipulation/us-manipuler-documents.md) | ⬜ |
| **F45.4 — Partage et versioning** | |
| [US45.4.1 — Partager un document et suivre ses versions](FEATURES/partage-versioning/us-partager-versionner.md) | ⬜ |

---
Item Type: Epic · Clé: E45 · Phase: phase-3 · Module: pdf
Stage: ⬜ · Priority: Medium
