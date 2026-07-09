# E09 — Module Scrum Poker

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.2).*

## Repo cible (architecture multi-repo)
- Backend : **`pivot-agilite-core`** (schéma Flyway `agilite`, FK → `public.teams.id`)
- Frontend : **`pivot-agilite-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation
## Phase
🚀 **phase-3** — verrou levé (déclaration "Socle terminé" actée Sprint 6, 2026-07-09 ; verrou
Sprint 8 levé 2026-07-10, voir `docs/backlog/sprints/sprint-8.md`)

## Objectif
Planning poker interactif : rooms, tickets, votes temps réel WebSocket, participant anonyme via code.

**Benchmark** ([dossier de synthèse outils agilité](https://github.com/PIVOT-PLATFORM/pivot-benchmarks) — PlanningPoker.com, absorption partielle du segment par TeamRetro) : le scrum poker s'est massivement gratuitisé sur le marché depuis 2020 — le modèle payant dès 10 participants de PlanningPoker.com est un contre-exemple explicite à ne pas suivre, ce module devant rester accessible sans palier dédié dès le socle Agilité. Fonctionnalité de référence chez PlanningPoker.com absente du périmètre actuel : la **distribution des votes à la révélation** (moyenne, médiane, dispersion), utile à l'animateur pour repérer un désaccord fort sans relire chaque carte individuellement.

## Périmètre GitHub (phase-3)
- F09.1 : Rooms planning poker (CRUD + code de rejoint) — US09.1.1, US09.1.2, US09.1.3 jeu de cartes paramétrable par équipe (Fibonacci, T-shirt, suite personnalisée)
- F09.2 : Tickets et votes en temps réel (WebSocket) — US09.2.1, US09.2.2 (révélation simultanée + distribution des votes : moyenne/médiane/dispersion — benchmark PlanningPoker.com)
- F09.3 : Participant anonyme (join par code sans compte) — US09.3.1
- EN09.1 : WebSocket room Scrum Poker isolation

## Dépendances
- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo

## Statut global
🔄 Sprint 8 démarré (2026-07-10) — US09.1.1 Gate 1 = 100/100 (AC détaillées Given/When/Then,
voir `FEATURES/rooms/us-creer-room.md`), implémentation en cours. Reste du périmètre F09.1/F09.2/
F09.3/EN09.1 : Gate 1 à effectuer par vague (voir `sprints/sprint-8.md`)
