# E15 — Organisation & Équipes transverses (cross-modules)

## Phase
⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Objectif
Modèle **organisationnel** partagé entre tous les modules : un organigramme d'entreprise/groupe
(unités typées, hiérarchisées, avec responsables et état-major), des équipes de travail rattachées
à ces unités, la délégation d'autorité et le partage de ressources par équipe.

Ce n'est pas un simple annuaire d'équipes plates : c'est la clé de voûte du partage cross-modules
(chaque `pivot-xxx-core` référence `public.teams(id)` par FK cross-schéma) **et** la structure
hiérarchique de management que les modules réutilisent (validation, escalade, reporting).

Modèle détaillé, invariants et alternatives écartées :
**[ADR-027 — Modèle organisationnel : unités & équipes, deux plans](pathname:///pivot-docs/adr/ADR-027-modele-organisationnel-unites-equipes)**.

## Principe directeur — deux plans orthogonaux

La hiérarchie organisationnelle se comporte différemment selon le plan considéré. Les confondre est
la principale source d'erreur de conception ; E15 les sépare explicitement.

| Plan | Direction de propagation | Règle |
|------|--------------------------|-------|
| **Partage de ressources** (accès aux données/projets d'un module) | aucune | **strict par équipe** — seuls les membres directs de l'équipe ciblée accèdent, jamais de cascade vers les sous-unités ni de remontée |
| **Autorité managériale** (responsabilité, validation, escalade) | **cumulative vers le haut** | un responsable couvre **tout son sous-arbre** d'unités ; le responsable d'une unité parente hérite de l'autorité des unités filles (`X` au pôle, `X+Y` à la division…) |

Corollaire : accéder à un document ≠ avoir autorité sur une branche. Un directeur n'a pas
automatiquement accès aux fichiers d'un projet (partage strict), mais il a bien autorité et
escalade sur toute sa direction (management cumulatif). **Déplacer une unité dans l'arbre ne change
jamais silencieusement qui accède à une ressource partagée.**

## Modèle de données (5 entités)

Deux concepts distincts : l'**unité organisationnelle** (structure) et l'**équipe de travail** (les
gens). Détail, colonnes et invariants dans [ADR-027](pathname:///pivot-docs/adr/ADR-027-modele-organisationnel-unites-equipes).

| Entité | Rôle | Points saillants |
|--------|------|------------------|
| **`org_levels`** | échelle de niveaux **configurable par tenant** | ordre par `rank` ; seed par défaut `pôle < département < division < direction < entreprise < groupe` |
| **`org_units`** | nœud de l'organigramme (arbre typé) | `level_id`, `parent_org_unit_id` (self-FK) ; invariants same-tenant, pas de cycle, `enfant.rank < parent.rank` |
| **`teams`** | équipe de travail rattachée à une unité | `org_unit_id` (nullable), `kind ∈ {WORKING, LEADERSHIP}`, `slug/color/description` ; **`LEADERSHIP` = l'état-major de l'unité** |
| **`team_members`** | appartenance | `role ∈ {RESPONSABLE, ADJOINT, MEMBRE}` |
| **`org_delegation`** | délégation d'autorité bornée dans le temps | `org_unit_id`, `delegator/delegate_user_id`, `scope ∈ {UNIT, SUBTREE}`, `from/to_date`, `motif` |

**Responsable d'une unité** = le membre `RESPONSABLE` de son état-major (team `LEADERSHIP`).
**État-major** d'une unité = son `RESPONSABLE` + ses `ADJOINT`.
**Appartenance effective** (double notion, vision seule — jamais accès) =
`effectif(unité) = membres des teams de l'unité ∪ effectif(unités enfants)` (roll-up sur l'arbre `org_units`).

## Repo cible (architecture multi-repo)
- Backend : **`pivot-core`** — `org_levels`, `org_units`, `teams`, `team_members`, `org_delegation` dans le schéma `public` (partagé par tous les modules)
- Frontend : **`pivot-ui`** — organigramme + gestion équipes dans `features/admin/`
- **Règle absolue :** ces tables ne peuvent PAS vivre dans un repo module — elles sont la clé de voûte du partage et de la hiérarchie cross-modules (cf. [ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture), [ADR-027](pathname:///pivot-docs/adr/ADR-027-modele-organisationnel-unites-equipes)).

## Périmètre GitHub (phase-3)

> **Note de séquencement schéma (R4).** Les entités `Team`/`TeamMember` existent déjà en avance de
> phase (EN17.1, `pivot-core#171`, fondation Socle). Les deltas *peu coûteux* déjà justifiés
> (`teams.slug/color/description`, `team_members.role/updated_at`, remplacement de
> `teams.parent_team_id` par `teams.org_unit_id`) sont repliés dans le schéma `V1` dès à présent
> (même logique d'anticipation que `parent_team_id`, tant que la règle « V1 unique avant BETA »
> tient). Les tables **`org_levels` / `org_units` / `org_delegation`** restent en **spec figée**
> (cette EPIC + ADR-027) et ne sont matérialisées qu'au déverrouillage d'E15 — pas d'anticipation
> spéculative d'une machinerie complète pour un epic verrouillé.

- **EN15.1** : Modèle organisationnel — `org_levels` (échelle configurable/tenant) + `org_units` (arbre typé, invariants) → **pivot-core + pivot-ui**
- **EN15.2** : Modèle équipe enrichi — `teams` (`org_unit_id`, `kind`, `slug/color/description`) + `team_members` (`role`) → **pivot-core**
- **EN15.3** : État-major & responsables — team `LEADERSHIP`, responsable = `RESPONSABLE` de l'état-major, visualisation organigramme → **pivot-core + pivot-ui**
- **EN15.4** : Délégations — `org_delegation`, délégataire pair par défaut, bornée dans le temps → **pivot-core + pivot-ui**
- **EN15.5** : Partage d'un projet/module par équipe — **résolution stricte** (membres directs de l'équipe ciblée), niveau de permission `view`/`edit` → **pivot-core**
- **EN15.6** : Appartenance effective (double notion) — agrégation sur l'arbre `org_units`, exposée distinctement des membres directs → **pivot-core**
- **EN15.7** : [Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md) — producteur KpiRef (contrat EN28.14) → **pivot-core**

**Hors périmètre E15 (différé)** : les **droits gradués / seuils d'escalade** (`X`, `X+Y` par
niveau) ne sont pas modélisés ici. La structure (ligne des responsables, niveaux) est posée ; la
graduation des droits et le routage d'escalade relèveront de l'autorisation externalisée
policy-as-code ([ADR-013](pathname:///pivot-docs/adr/ADR-013-autorisation-externalisee-policy-as-code)), à
spécifier dans un enabler dédié le moment venu.

## Dépendances
- Dépend de : E03 Système de modules
- Réconcilié avec : [ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture) (FK cross-schéma vers `public.teams`), [ADR-023](pathname:///pivot-docs/adr/ADR-023-modele-entites-catalogue) (Kind `Team` = projection directe de `public.teams`)
- Différé vers : [ADR-013](pathname:///pivot-docs/adr/ADR-013-autorisation-externalisee-policy-as-code) (escalade graduée)

## Statut global
⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint
