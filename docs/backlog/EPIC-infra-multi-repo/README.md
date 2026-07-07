# E17 — Infrastructure multi-repo

## Objectif

Mettre en place les prérequis techniques permettant de créer les repos modules (`pivot-pilotage-*`, `pivot-agilite-*`, `pivot-collaboratif-*`) de manière autonome, sans dupliquer la logique socle.

## Périmètre

- [Enabler EN17.1 : Publication `pivot-core-starter` (Maven artifact, GitHub Packages)](ENABLERS/en-pivot-core-starter.md)
- [Enabler EN17.2 : Publication `@pivot/design-system` (npm package, GitHub Packages)](ENABLERS/en-design-system-package.md)
- [Enabler EN17.3 : Publication `@pivot/ui-core` (npm package, GitHub Packages)](ENABLERS/en-pivot-ui-core-package.md)
- [Enabler EN17.4 : Convention BDD multi-schéma + migration Flyway baseline stabilisée](ENABLERS/en-bdd-multi-schema.md)
- [Enabler EN17.5 : Template repo `pivot-xxx-core`](ENABLERS/en-template-repo-core.md)
- [Enabler EN17.6 : Template repo `pivot-xxx-ui`](ENABLERS/en-template-repo-ui.md)
- [Enabler EN17.7 : nginx API Gateway — routing multi-backend par préfixe URL](ENABLERS/en-nginx-api-gateway.md)
- [Enabler EN17.8 : Incubation du design system dans `pivot-ui`](ENABLERS/en-design-system-incubation.md) — prérequis d'EN17.2

## Phase

🚀 **Socle (reséquencé 2026-07-07)** — condition de déclenchement documentée de longue date
(« Socle non bloquant · déclencher quand E03 est Done ») plutôt qu'une invention nouvelle : E03 est
Done depuis Sprint 2, donc E17 était en réalité déjà déclenchable avant cette correction. Sa
présence dans Sprint 7 (verrouillé post-Socle) était incohérente avec cette condition et avec le
besoin du noyau whiteboard Socle (F08.x/EN08.x, `pivot-collaboratif-core/-ui`, ADR-006) — voir
`sprints/sprint-5.md` §Reséquencement E17. Rapatrié dans **Sprint 5, Vague 0**. Ancienne
classification `phase-3` conservée uniquement comme étiquette de plan produit d'origine — n'a plus
valeur de verrou de sprint.

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 — interface PivotModule) — ✅ Done (Sprint 2)
- Dépend de : E07 Infrastructure (EN07.1 Docker Compose prod) — ✅ Done (Sprint 4, recette confirmée 2026-07-07)

## Statut global

🔄 7/8 Done — EN17.1 reste `In progress` (extraction `pivot-core-starter` incomplète : `modules`/`tenant`/`auth` pas déplacés, `team` jamais implémenté — bloque la convention FK cross-schéma d'EN17.4 ; suivi [`pivot-core#171`](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171)). Voir `sprints/sprint-5.md` pour le détail PR par item.

---

Item Type: Epic · Clé: E17 · Phase: Socle (reséquencé 2026-07-07, ex-phase-3) · Enablers: 8 (EN17.1–8)
Stage: Ready · Priority: Critical
