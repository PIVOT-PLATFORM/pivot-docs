# ADR-006 — Architecture multi-repo avec librairies partagées

**Date :** 2026-07-02
**Statut :** Accepté
**Décideurs :** Équipe PIVOT (5 mainteneurs)

---

## Contexte

La plateforme PIVOT grandit. Les modules fonctionnels (pilotage, agilité, collaboratif) ont des cycles de release différents, des équipes potentiellement distinctes et des besoins infra qui peuvent diverger. Une architecture multi-repo par domaine fonctionnel devient pertinente pour la MCO.

Le risque principal d'un multi-repo naïf : duplication de l'auth, du design system, des entités partagées (tenants, teams) dans chaque repo.

---

## Décision

**Architecture multi-repo avec librairies socles publiées.**

### Repos socle

| Repo | Rôle | Artefact publié |
|------|------|-----------------|
| `pivot-core` | Shell backend + entités partagées (auth, tenant, équipes, registre modules) | `fr.pivot:pivot-core-starter` (Maven, GitHub Packages) |
| `pivot-design-system` | **Angular CDK** (comportement/a11y headless) + **SCSS BEM custom** (visuel) · tokens CSS, composants, Storybook | `@pivot/design-system` (npm, GitHub Packages) |
| `pivot-ui` | Shell frontend + portail + OIDC client | `@pivot/ui-core` (npm, GitHub Packages) · consomme `@pivot/design-system` |
| `pivot-docs` | Documentation, ADR, backlog, workflow agentique | — |

### Repos modules

| Repo | Domaine | Dépendances |
|------|---------|-------------|
| `pivot-pilotage-core` | Roadmap, portfolio, projets, ADR projet | `fr.pivot:pivot-core-starter` |
| `pivot-pilotage-ui` | Frontend pilotage | `@pivot/ui-core` + `@pivot/design-system` |
| `pivot-agilite-core` | Capacity planning, standup, scrum poker | `fr.pivot:pivot-core-starter` |
| `pivot-agilite-ui` | Frontend agilité | `@pivot/ui-core` + `@pivot/design-system` |
| `pivot-collaboratif-core` | Whiteboard, quiz, session live, formulaire | `fr.pivot:pivot-core-starter` |
| `pivot-collaboratif-ui` | Frontend collaboratif | `@pivot/ui-core` + `@pivot/design-system` |

### Stratégie BDD — schémas PostgreSQL partagés

Une seule instance PostgreSQL. Chaque module gère son propre schéma Flyway.

| Schéma | Propriétaire | Entités clés |
|--------|-------------|--------------|
| `public` | pivot-core | tenants, users, teams, team_members, access_tokens, module_access |
| `pilotage` | pivot-pilotage-core | roadmap_projects, portfolio_items → FK → `public.teams.id` |
| `agilite` | pivot-agilite-core | capacity_plans, standup_sessions → FK → `public.teams.id` |
| `collaboratif` | pivot-collaboratif-core | whiteboards, quiz_sessions → FK → `public.teams.id` |

**Règle :** FK cross-schéma autorisées uniquement depuis un schéma module vers `public`. Jamais de FK inter-modules (agilite → pilotage, par exemple).

### Principe teams/sharing

- `teams` et `team_members` vivent dans `public` (pivot-core).
- Toute ressource module (whiteboard, roadmap projet, etc.) référence `public.teams.id`.
- L'admin PIVOT peut partager une team entre plusieurs modules sans coordination inter-repos.
- La gestion admin (partage équipe, instances) passe par l'API pivot-core, accessible depuis le shell pivot-ui.

---

## Alternatives considérées

### Option A — Monorepo Maven multi-module / Nx workspace (rejeté pour l'instant)

**Avantages :** commits atomiques cross-module, un pipeline CI, pas de versioning inter-repos.
**Inconvénients :** complexité setup Nx, CI lente sur gros monorepo, moins de flexibilité MCO par domaine.
**Décision :** revisiter si l'équipe dépasse 15 personnes ou si les release cadences se resynchronisent.

### Option B — Multi-repo sans lib partagée (rejeté)

**Risque :** auth copiée dans 3 repos, header/footer dupliqué, vulnérabilités non propagées.
**Décision :** rejeté — trop de dette de sécurité.

---

## Conséquences

### Positives
- Release indépendante par domaine (MCO facilitée)
- Équipes autonomes par domaine quand l'organisation croît
- Design system et auth centralisés — un seul endroit à patcher

### Contraintes
- Tout changement d'API `pivot-core-starter` ou `@pivot/ui-core` = **hard block Gate 4 + coordination tous les repos consommateurs**
- `pivot-design-system` a son propre cycle de release sémantique
- Chaque repo module embarque un `pom.xml` (ou `package.json`) avec la version exacte de la lib socle → mise à jour coordonnée nécessaire

### Prérequis avant création des repos modules
1. `pivot-core-starter` publié dans GitHub Packages (EN17.1)
2. `@pivot/design-system` publié dans GitHub Packages (EN17.2)
3. `@pivot/ui-core` publié dans GitHub Packages (EN17.3)
4. Convention schéma BDD documentée + migration Flyway baseline `public` stabilisée (EN17.4)
5. Templates repos `pivot-xxx-core` et `pivot-xxx-ui` créés (EN17.5 + EN17.6)
