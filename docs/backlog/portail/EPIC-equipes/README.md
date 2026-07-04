# E15 — Équipes transverses (cross-modules)

## Phase
⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Objectif
Modèle d'équipes partagé entre modules : CRUD équipes (couleur, membres), association équipe aux modules.

## Repo cible (architecture multi-repo)
- Backend : **`pivot-core`** — entités `Team`, `TeamMember` dans schéma `public` (partagé par tous les modules)
- Frontend : **`pivot-ui`** — gestion équipes dans `features/admin/`
- **Règle absolue :** `teams` et `team_members` ne peuvent PAS vivre dans un repo module — ils sont la clé de voûte du partage cross-modules

## Périmètre GitHub (phase-3)
- EN15.1 : Modèle équipe (CRUD équipes couleur membres) — US15.1.1 → **dans pivot-core + pivot-ui**
- EN15.2 : Association équipe aux modules — US15.2.1 → **dans pivot-core**

## Dépendances
- Dépend de : E03 Système de modules

## Statut global
⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint
