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

| Dépôt | Rôle | Règles détaillées |
|-------|------|--------------------|
| **pivot-core** | Backend shell — auth, tenant, équipes, API commune · publie `fr.pivot:pivot-core-starter` (Maven) | `pivot-core/CLAUDE.md` |
| **pivot-design-system** | Angular CDK (comportement/a11y) + SCSS BEM custom (visuel), composants UI, Storybook · publie `@pivot/design-system` (npm) | à créer avec le repo — pas de dépendance réelle aujourd'hui (vérifié : absent de `pivot-ui/package.json`). Repo différé, **pas le choix technique** : stack actée par `ADR-007` (`docs/adr/ADR-007-design-system-angular-cdk.md`) — CDK + SCSS custom, aucune lib visuelle tierce (Material/Taiga/PrimeNG/Tailwind explicitement rejetés). Suivi backlog : `EN17.2`, `Stage: Backlog`, `Phase: phase-3` |
| **pivot-ui** | Frontend shell — header/footer, OIDC client, portail admin · publie `@pivot/ui-core` (npm) | `pivot-ui/CLAUDE.md` |
| **pivot-docs** | Documentation, ADR, backlog, audits, workflow — **source de vérité du backlog** | `pivot-docs/CLAUDE.md` |
| **pivot-pilotage-core** / **-ui** | Domaine Pilotage — roadmap/Gantt, portefeuille projets, ADR projet | à créer avec le repo |
| **pivot-agilite-core** / **-ui** | Domaine Agilité — capacity planning, daily standup timer, scrum poker | à créer avec le repo |
| **pivot-collaboratif-core** / **-ui** | Domaine Collaboratif — whiteboard, quiz, session live, formulaire | à créer avec le repo |

Setup complet (clone, WSL, Docker Compose, commits signés) → page précédente de cette section.

## Architecture BDD — schémas PostgreSQL (vue d'ensemble multi-repo)

Une seule instance PostgreSQL partagée. Chaque module-core gère ses migrations Flyway dans son
propre schéma. FK cross-schéma autorisées uniquement vers `public` (entités pivot-core).

| Schéma | Propriétaire | Contenu |
|--------|-------------|---------|
| `public` | pivot-core | tenants, users, teams, team_members, access_tokens, module_access |
| `pilotage` | pivot-pilotage-core | roadmap_projects, roadmap_tasks, portfolio… → FK → `public.teams.id` |
| `agilite` | pivot-agilite-core | capacity_plans, standup_sessions… → FK → `public.teams.id` |
| `collaboratif` | pivot-collaboratif-core | whiteboards, quiz_sessions… → FK → `public.teams.id` |

## Démarrage de session — orchestration multi-repo

Procédure à exécuter **depuis `pivot-platform/`**, avant de basculer dans un repo spécifique :

1. `git pull origin main` dans les repos concernés par le sprint courant — toujours `pivot-core`,
   `pivot-ui`, `pivot-docs` ; + les repos module concernés si le sprint en touche un
2. Lire `pivot-docs/docs/backlog/SPRINTS.md` — identifier le sprint courant et les US éligibles
   (protocole détaillé : `pivot-docs/CLAUDE.md`, skill `pivot-backlog-workflow`)
3. Lancer **un agent par US éligible, en parallèle** — chaque agent :
   - Se place dans **le repo concerné par son US** (`pivot-core` pour du backend, `pivot-ui`
     pour du frontend, un repo module pour une feature métier, etc.)
   - Crée sa branche dans **ce repo**, applique les règles du `CLAUDE.md` **de ce repo**
     (gates, commits, standards — jamais celles d'un autre repo)
   - Ouvre sa propre PR, dans ce repo

## Règle absolue — isolation par repo

| Interdit | Raison |
|----------|--------|
| Un commit ou une branche touchant plusieurs repos à la fois | Chaque repo a son propre historique, ses propres PR, sa propre CI — un changement cross-repo se scinde en une branche + une PR **par repo concerné** |
| Appliquer les règles d'un repo à un autre (ex. gates pivot-core dans une PR pivot-ui) | Chaque repo définit ses propres seuils/standards dans son `CLAUDE.md` — ne jamais supposer qu'ils sont identiques sans vérifier |
