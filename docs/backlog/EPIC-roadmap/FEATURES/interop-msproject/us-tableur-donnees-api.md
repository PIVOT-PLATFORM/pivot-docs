# US22.7.5 — Formats tableur & données (CSV, XLSX, JSON, API)

**En tant que** PMO
**Je veux** importer/exporter le planning en CSV, XLSX et JSON, et l'exposer/consommer via une API REST
**Afin de** échanger avec la bureautique, la BI et les intégrations sur mesure

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fichier CSV/XLSX avec mapping de colonnes, when je l'importe, then tâches/dates/durées/liens/ressources sont créés | ⬜ |
| Given un planning, when je l'exporte en JSON, then la structure complète (tâches, dépendances, calendriers, baselines) est sérialisée | ⬜ |
| Given l'API REST, when un système tiers l'appelle, then il peut lire/écrire le plan avec authentification | ⬜ |

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Rôle: officier-responsable-pmo
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
