# E14 — Module La Roue

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.7).*

## Repo cible (architecture multi-repo)
- Backend : **`pivot-agilite-core`** (schéma Flyway `agilite`, FK → `public.teams.id`)
- Frontend : **`pivot-agilite-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation
## Phase
⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Objectif
Roue de tirage pondéré anti-repeat pour animer des événements : CRUD roues, tirage pondéré, diffusion temps réel du résultat.

**Benchmark** ([dossier de synthèse outils agilité](https://github.com/PIVOT-PLATFORM/pivot-benchmarks) — Wheel of Names) : la référence gratuite du marché réunit déjà pondération et anti-répétition (F14.2), mais sa seule vraie limite est l'absence d'intégration à un référentiel d'équipe — la liste des entrants est toujours ressaisie ou collée manuellement. C'est justement l'avantage structurel immédiat de ce module au sein de PIVOT : importer nativement les membres de l'équipe plutôt que de les faire ressaisir.

## Périmètre GitHub (phase-3)
- F14.1 : Roues CRUD (events avec liste membres) — US14.1.1, US14.1.2 import de la liste depuis les membres de l'équipe (module Agilité) sans ressaisie (benchmark Wheel of Names)
- F14.2 : Tirage pondéré anti-repeat — US14.2.1
- F14.3 : Diffusion temps réel du tirage (WS) — US14.3.1
- EN14.1 : [Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md)

## Dépendances
- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo

## Statut global
⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint
