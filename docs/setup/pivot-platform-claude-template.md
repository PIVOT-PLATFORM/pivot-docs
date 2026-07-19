---
sidebar_position: 2
sidebar_label: "CLAUDE.md racine (modèle)"
---

# CLAUDE.md racine — modèle pour `pivot-platform/`

> **À copier tel quel** à la racine de votre dossier de travail local `pivot-platform/`
> (`cp docs/setup/pivot-platform-claude-template.md ../CLAUDE.md` depuis `pivot-docs/`, ou
> copier le contenu ci-dessous). `pivot-platform/` n'est pas un repo — ce fichier n'est **jamais
> versionné**, c'est une commodité locale, régénérable à tout moment depuis cette page.
>
> **Il ne contient que l'orchestration multi-repo.** Toute règle propre à un repo — gates,
> commits, branches, standards de code, skills, agents IA, sécurité — vit dans le `CLAUDE.md` de
> ce repo, complet et autonome. Ne rien dupliquer ici : en cas de doute, ouvrir le repo concerné.

## Dépôts de l'organisation

> **Bascule Spring Modulith ([ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith), mergée 2026-07-17).**
> Les domaines métier ne sont **plus des repos séparés**. `agilite` et `collaboratif` sont des
> **modules internes** de `pivot-core` (`pivot-core/agilite/`, `pivot-core/collaboratif/`, packages
> `fr.pivot.agilite.*` / `fr.pivot.collaboratif.*`) ; le frontend est rapatrié dans le workspace
> unique `pivot-ui/projects/*`. Le domaine **Pilotage est retiré de PIVOT** (extraction, cf.
> `pivot-core/PILOTAGE-HANDOFF.md`). Les anciens repos `pivot-{agilite,collaboratif,pilotage}-{core,ui}`
> et `pivot-design-system` sont **archivés** (lecture seule). [ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture)
> est supersédée pour les domaines métier.

| Dépôt | Rôle | Règles détaillées |
|-------|------|--------------------|
| **pivot-core** | Backend modulith — auth, tenant, équipes, API commune **+ modules internes `agilite` et `collaboratif`** (`fr.pivot.agilite.*` / `fr.pivot.collaboratif.*`), frontières vérifiées par `ApplicationModules.verify()`, artefact et process uniques · publie `fr.pivot:pivot-core-starter` (Maven) | `pivot-core/CLAUDE.md` |
| **pivot-ui** | Frontend shell — header/footer, OIDC client, portail admin **+ workspace unique `projects/*`** rapatriant les libs `agilite-ui`, `collaboratif-ui` et `design-system` (Angular CDK + SCSS BEM custom, ADR-007) · publie `@pivot/ui-core` (npm) | `pivot-ui/CLAUDE.md` |
| **pivot-docs** | Documentation, ADR, backlog, audits, workflow — **source de vérité du backlog** | `pivot-docs/CLAUDE.md` |
| ~~**pivot-{agilite,collaboratif,pilotage}-{core,ui}**~~, ~~**pivot-design-system**~~ | **Archivés (lecture seule)** — internalisés dans `pivot-core` / `pivot-ui` (ADR-030). Pilotage extrait vers un produit distinct (`pivot-core/PILOTAGE-HANDOFF.md`) | — |

Setup complet (clone, WSL, Docker Compose, commits signés) → page précédente de cette section.

## Architecture BDD — schémas PostgreSQL (vue d'ensemble)

Une seule instance PostgreSQL partagée. Chaque module (interne à `pivot-core`) gère ses migrations
Flyway dans son propre schéma, au sein d'une **JVM unique** (modulith). FK cross-schéma autorisées
uniquement vers `public` (entités pivot-core). L'isolation des données par schéma est **conservée**
malgré l'internalisation.

| Schéma | Propriétaire | Contenu |
|--------|-------------|---------|
| `public` | pivot-core (shell) | tenants, users, teams, team_members, access_tokens, module_access |
| `agilite` | pivot-core · module interne `agilite` | capacity_plans, standup_sessions… → FK → `public.teams.id` |
| `collaboratif` | pivot-core · module interne `collaboratif` | whiteboards, quiz_sessions… → FK → `public.teams.id` |

> Le schéma `pilotage` **quitte PIVOT** avec le domaine Pilotage (extraction ADR-030 / EN53.3). Le
> `DROP SCHEMA pilotage` reste une action irréversible en attente de décision explicite du mainteneur.

## Démarrage de session — orchestration multi-repo

Procédure à exécuter **depuis `pivot-platform/`**, avant de basculer dans un repo spécifique :

1. `git pull origin main` dans les repos concernés par le sprint courant — `pivot-core`,
   `pivot-ui`, `pivot-docs` (depuis ADR-030 il n'y a plus de repos module séparés : le backend
   métier vit dans `pivot-core`, le frontend métier dans `pivot-ui`)
2. Lire `pivot-docs/docs/backlog/sprints/README.md` — identifier le sprint courant et les US éligibles
   (protocole détaillé : `pivot-docs/CLAUDE.md`, skill `pivot-backlog-workflow`)
3. Lancer **un agent par US éligible, en parallèle** — chaque agent :
   - Se place dans **le repo concerné par son US** (`pivot-core` pour du backend, y compris une
     feature métier d'un module interne `agilite`/`collaboratif` ; `pivot-ui` pour du frontend)
   - Crée sa branche dans **ce repo**, applique les règles du `CLAUDE.md` **de ce repo**
     (gates, commits, standards — jamais celles d'un autre repo)
   - Ouvre sa propre PR, dans ce repo

## Règle absolue — isolation par repo

| Interdit | Raison |
|----------|--------|
| Un commit ou une branche touchant plusieurs repos à la fois | Chaque repo a son propre historique, ses propres PR, sa propre CI — un changement cross-repo se scinde en une branche + une PR **par repo concerné** |
| Appliquer les règles d'un repo à un autre (ex. gates pivot-core dans une PR pivot-ui) | Chaque repo définit ses propres seuils/standards dans son `CLAUDE.md` — ne jamais supposer qu'ils sont identiques sans vérifier |
