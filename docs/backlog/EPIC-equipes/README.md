# E15 — Équipes transverses (cross-modules)

## Phase
⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Objectif
Modèle d'équipes partagé entre modules : CRUD équipes (couleur, membres), association équipe aux modules.

**Hiérarchie d'équipes (2026-07-08, à spécifier avant décomposition EN15.1)** : une équipe peut
être **orpheline** (aucune équipe parente, niveau racine) ou **rattachée à une équipe parente**
— structure en arbre, à l'image d'un organigramme d'entreprise (une équipe peut avoir des
sous-équipes, elles-mêmes rattachées ou non). Le partage d'un projet/module doit pouvoir cibler
une équipe **à n'importe quel niveau de cette hiérarchie**, ou une équipe orpheline — pas
seulement les équipes racines ou les feuilles. Implique une auto-référence (`parent_team_id`
nullable) sur `teams`, pas juste une liste plate. À traiter dès la modélisation du schéma
`teams`/`team_members` (voir note sur `EN17.1`, `pivot-core#171` — les entités `Team`/`TeamMember`
sont créées en avance de phase comme fondation Socle, cette hiérarchie doit être anticipée dans
leur schéma pour éviter une migration de retrofit une fois E15 déverrouillé).

## Repo cible (architecture multi-repo)
- Backend : **`pivot-core`** — entités `Team`, `TeamMember` dans schéma `public` (partagé par tous les modules)
- Frontend : **`pivot-ui`** — gestion équipes dans `features/admin/`
- **Règle absolue :** `teams` et `team_members` ne peuvent PAS vivre dans un repo module — ils sont la clé de voûte du partage cross-modules

## Périmètre GitHub (phase-3)
- EN15.1 : Modèle équipe (CRUD équipes couleur membres, **hiérarchie parent/orpheline** — voir ci-dessus) — US15.1.1 → **dans pivot-core + pivot-ui**
- EN15.2 : Association équipe aux modules — US15.2.1 → **dans pivot-core**
- EN15.3 (à créer) : Partage d'un projet/module par équipe, à tout niveau de la hiérarchie ou orpheline — **dans pivot-core**

## Dépendances
- Dépend de : E03 Système de modules

## Statut global
⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint
