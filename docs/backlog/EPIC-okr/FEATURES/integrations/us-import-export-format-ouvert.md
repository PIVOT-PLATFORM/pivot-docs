# US27.8.2 — Import / export & format ouvert

**En tant que** responsable pilotage
**Je veux** importer/exporter les OKR (CSV, XLSX, JSON) et disposer d'un **format ouvert** documenté (réversibilité)
**Afin de** éviter le lock-in et échanger avec la BI

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des OKR, when je les exporte, then objectifs, KR, alignements, check-ins et scores sont sérialisés (JSON documenté) | ⬜ |
| Given un import CSV/XLSX avec mapping, when je l'exécute, then les OKR sont créés/mis à jour | ⬜ |
| Error : given un fichier d'import invalide (colonnes manquantes, valeurs hors format, cible incohérente), when l'import est lancé, then il est rejeté avec un rapport d'erreurs ligne par ligne, sans création partielle silencieuse | ⬜ |
| Security : l'export ne contient que les OKR visibles pour le rôle du demandeur (OKR confidentiels exclus) ; l'import ne permet pas d'écraser des OKR hors du périmètre d'habilitation de l'utilisateur | ⬜ |

## Hors périmètre
- La synchronisation continue/automatique avec une source externe (BI, API, webhook) — couverte par US27.8.1
- La définition d'un connecteur bidirectionnel temps réel — cette US couvre l'import/export ponctuel par fichier
- La conversion vers des formats propriétaires d'outils tiers (Quantive, Workboard, etc.) — le format ouvert documenté (JSON) est la seule garantie de réversibilité demandée

## Notes d'implémentation
- Le format d'export JSON doit être documenté publiquement (schéma versionné) pour garantir la réversibilité et éviter le lock-in, conformément à l'objectif de la story
- L'import CSV/XLSX nécessite une étape de mapping colonnes → champs OKR (Objective/KeyResult/Alignment/CheckIn du modèle EN27.1) avant exécution
- Le rapport d'erreurs d'import doit permettre de corriger et resoumettre sans dupliquer les OKR déjà importés avec succès (idempotence par identifiant externe)

---
Item Type: US · Parent: F27.8 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
