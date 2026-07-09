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
| Error : given un fichier CSV/XLSX corrompu, un encodage non supporté, des colonnes obligatoires manquantes ou un mapping incohérent (ex. date invalide, référence de tâche inexistante), when je tente l'import, then l'import est rejeté (ou partiellement accepté avec un rapport ligne par ligne des erreurs) sans corrompre le planning existant | ⬜ |
| Security : l'API REST exige une authentification (token) et applique les permissions du rôle appelant (lecture/écriture selon les droits sur le Projet) ; les imports CSV/XLSX sont limités en taille et validés avant traitement | ⬜ |
| A11y : l'écran de mapping de colonnes (association colonne fichier ↔ champ PIVOT) est intégralement pilotable au clavier et les erreurs de mapping sont annoncées aux lecteurs d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- Synchronisation temps réel/continue via l'API (l'API expose lecture/écriture à la demande, pas un flux d'événements — voir bus PIVOT pour ça)
- Import/export de formats tableur autres que CSV/XLSX (ex. ODS) — non couverts par cette US
- Documentation interactive de l'API (Swagger/OpenAPI) : à traiter comme un livrable technique de l'implémentation, pas un critère d'acceptation fonctionnel de cette US

## Notes d'implémentation
- Le mapping de colonnes CSV/XLSX doit être configurable par l'utilisateur à l'import (pas un mapping figé par nom de colonne), pour s'adapter aux exports variés des tableurs existants
- L'export JSON réutilise si possible la même structure que le format ouvert PIVOT (US22.7.3) pour éviter deux sérialisations JSON différentes du même modèle temporel unique EN22.1
- L'API REST doit respecter le même modèle de permissions que l'UI (pas de contournement des droits Projet via l'API)

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
